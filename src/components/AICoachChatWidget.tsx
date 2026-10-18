import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bot, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  RotateCcw, 
  Sparkles, 
  User, 
  CheckCircle2, 
  HelpCircle, 
  Activity, 
  Shield, 
  Trophy, 
  Zap, 
  MessageSquare,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export const AICoachChatWidget: React.FC = () => {
  const { user, testResult, videoCompletionStats } = useApp();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Safety watchdog: ensure loading state never hangs indefinitely
  useEffect(() => {
    if (!isStreaming) return;
    const watchdog = setTimeout(() => {
      if (isStreaming) {
        console.warn('Safety watchdog: clearing stalled streaming state');
        if (abortControllerRef.current) {
          try { abortControllerRef.current.abort('watchdog_timeout'); } catch {}
        }
        setIsStreaming(false);
        setErrorMessage('استغرقت الاستجابة وقتاً أطول من المتوقع. تم إيقاف التحميل تلقائياً لتفادي تجميد الواجهة.');
      }
    }, 14000);

    return () => clearTimeout(watchdog);
  }, [isStreaming]);

  const playerName = user?.fullName || user?.username || 'كابتن البادل';
  const playerLevel = testResult?.levelNumber || user?.levelNumber || 1;
  const levelTitle = testResult?.levelTitle || (playerLevel === 1 ? 'مبتدئ' : playerLevel === 2 ? 'متوسط أولي' : playerLevel === 3 ? 'متوسط' : playerLevel === 4 ? 'متقدم' : 'احترافي');
  const playtomicRating = testResult?.playtomicScore 
    ? `${testResult.playtomicScore} (${testResult.playtomicBadge || ''})` 
    : (user?.playtomicScore ? String(user.playtomicScore) : '1.0 - 2.0');
  const progressPercentage = videoCompletionStats.percentage;

  // Initialize coach welcome message tailored to user
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-msg',
          role: 'model',
          text: `أهلاً بك يا **${playerName}** في قفص التدريب! 🎾\n\nأنا **كوتش بادل برو (Coach PadelPro)** مدربك الشخصي الذكي. أتابع تدريبك في المنصة وأرى أنك مسجل حالياً في **المستوى ${playerLevel} (${levelTitle})** بنسبة إتقان للمكتبة المرئية **${progressPercentage}%**.\n\nيسعدني تقديم نصائح تكتيكية لضرباتك (مثل البانديخا والفيبورا ودفاع الزجاج)، أو بناء خطة للارتقاء بمستوى Playtomic وتطوير التناغم مع زميلك. بمَ نبدأ اليوم؟`,
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [playerName, playerLevel, levelTitle, progressPercentage]);

  // Auto-scroll on new message or stream chunk
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isStreaming]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  const quickPrompts = [
    `كيف أحسن مستواي من Level ${playerLevel} إلى المستوى التالي؟`,
    'ما هي أسرار ضربة البانديخا (Bandeja) وتوقيتها الصحيح؟',
    'كيف أتعامل مع كرات ارتداد الزجاج المزدوج (Doble Pared)؟',
    'نصائح تكتيكية لتنسيق التمركز مع زميلي وسد ثغرة الوسط',
  ];

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend || isStreaming) return;

    setInputMessage('');
    setErrorMessage(null);

    const userMsgId = `user-${Date.now()}`;
    const botMsgId = `bot-${Date.now()}`;

    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        role: 'user',
        text: textToSend,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: botMsgId,
        role: 'model',
        text: '',
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setMessages(newMessages);
    setIsStreaming(true);

    // Prepare history for multi-turn chat (excluding the empty bot placeholder)
    const historyPayload = messages.map(m => ({
      role: m.role,
      text: m.text
    }));

    // Abort controller with 12s client timeout
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const timeoutId = setTimeout(() => {
      controller.abort('timeout');
    }, 12000);

    let accumulatedText = '';

    try {
      const response = await fetch('/api/coach-chat-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          userContext: {
            playerName,
            currentLevel: playerLevel,
            levelTitle,
            playtomicRating,
            progressPercentage,
            watchedVideosCount: videoCompletionStats.watchedCount,
            totalVideos: videoCompletionStats.totalCount,
            pillarBreakdown: testResult?.pillarBreakdown
          }
        })
      });

      if (!response.ok || !response.body) {
        throw new Error(`Failed to connect to AI Coach stream (status: ${response.status})`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let isStreamCompleted = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6);
            if (dataStr === '[DONE]') {
              isStreamCompleted = true;
              break;
            }
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                accumulatedText += parsed.text;
                setMessages(prev => 
                  prev.map(m => m.id === botMsgId ? { ...m, text: accumulatedText } : m)
                );
              }
            } catch (e) {
              // Ignore malformed chunk
            }
          }
        }

        if (isStreamCompleted) {
          try { await reader.cancel(); } catch {}
          break;
        }
      }

      if (!accumulatedText) {
        setMessages(prev => 
          prev.map(m => m.id === botMsgId ? { ...m, text: 'أحسنت السؤال! ركز على التمركز الصحيح وثني الركبتين لمتابعة الكرة بدقة، وشاركني أي استفسار آخر.' } : m)
        );
      }

    } catch (err: any) {
      console.warn('Coach streaming notice / handled interruption:', err);
      const isTimeout = err === 'timeout' || err?.name === 'AbortError' || String(err?.message || '').toLowerCase().includes('timeout');
      const errorNotice = isTimeout
        ? 'تجاوز الطلب مهلة الاستجابة المحددة (Timeout). تم إيقاف التحميل بنجاح لتجنب تجميد الواجهة.'
        : 'تعذر الاتصال المباشر بخدمة الذكاء الاصطناعي حالياً. تم تحرير الواجهة بنجاح.';

      setErrorMessage(errorNotice);
      setLastFailedPrompt(textToSend);

      setMessages(prev => 
        prev.map(m => m.id === botMsgId 
          ? { 
              ...m, 
              text: accumulatedText 
                ? accumulatedText + '\n\n*(تم إنهاء التدفق لمنع تعليق المحادثة)*' 
                : `⚠️ **${errorNotice}**\n\n💡 **نصيحة الكوتش السريعة**: تذكر دائماً خفض مركز الثقل وثني الركبتين وتجهيز المضرب مبكراً قبل وصول الكرة.\n\nاضغط على **"إعادة المحاولة"** أدناه لإعادة إرسال سؤالك.`
            } 
          : m
        )
      );
    } finally {
      clearTimeout(timeoutId);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleClearHistory = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsStreaming(false);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: `تم بدء جلسة تدريب جديدة! مرحباً بك مجدداً يا **${playerName}** (Level ${playerLevel}). ما هي الضربة أو التكتيك الذي ترغب في تحليله الآن؟`,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Simple Markdown renderer for coach text (supports bold **text**, bullet points, and paragraphs)
  const renderFormattedText = (rawText: string) => {
    if (!rawText) return null;

    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} className="h-2" />;
      }

      // Check if bullet point
      const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed);

      // Render bold segments
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="text-[#b2e01e] font-bold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <p key={idx} className={`leading-relaxed ${isBullet ? 'pr-2 my-1' : 'my-1'} text-xs sm:text-[13px]`}>
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* 1. Floating Action Trigger Button (Bottom-Corner) */}
      {!isOpen && (
        <div className="fixed bottom-5 left-5 z-40 sm:bottom-6 sm:left-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#16161a] border-2 border-[#b2e01e] rounded-full shadow-[0_0_20px_rgba(178,224,30,0.35)] hover:shadow-[0_0_25px_rgba(178,224,30,0.6)] hover:bg-[#1f2416] transition-all cursor-pointer font-alexandria text-right"
            title="مساعد كوتش البادل الذكي (Gemini)"
            aria-label="فتح محادثة كوتش البادل"
          >
            {/* Live pulsing beacon */}
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b2e01e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#b2e01e]"></span>
            </span>

            {/* Coach Icon */}
            <div className="w-7 h-7 rounded-full bg-[#b2e01e] text-[#0b0b0d] flex items-center justify-center font-black shadow-inner">
              <Bot className="w-4 h-4 fill-[#0b0b0d]" />
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-white group-hover:text-[#b2e01e] transition-colors">
                  كوتش البادل الذكي
                </span>
                <span className="font-jetbrains text-[9px] bg-[#b2e01e] text-[#0b0b0d] px-1.5 py-0.2 rounded font-black">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-white/60 font-mono-tag">
                Level {playerLevel} • مدعوم بـ Gemini
              </p>
            </div>
          </button>
        </div>
      )}

      {/* 2. Floating Chat Modal Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-4 left-4 z-50 sm:bottom-6 sm:left-6 w-[94vw] sm:w-[420px] bg-[#16161a] border-2 border-[#b2e01e] rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden font-alexandria text-right transition-all duration-300 ${
            isMinimized ? 'h-16' : 'h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Top Header Bar */}
          <div className="p-3.5 bg-[#0b0b0d] border-b border-[var(--card-border)] flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-8 h-8 rounded-full bg-[#b2e01e] text-[#0b0b0d] flex items-center justify-center shrink-0 shadow-md">
                <Bot className="w-5 h-5 fill-[#0b0b0d]" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#0b0b0d]"></span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-alexandria font-bold text-xs sm:text-sm text-white truncate">
                    كوتش بادل برو (Coach PadelPro)
                  </h3>
                  <span className="text-[9px] font-mono-tag bg-[#1f2416] text-[#b2e01e] border border-[#b2e01e]/40 px-1.5 py-0.2 rounded font-bold shrink-0">
                    L{playerLevel}
                  </span>
                </div>
                <p className="text-[10px] text-white/50 truncate font-mono-tag flex items-center gap-1">
                  <span>Gemini 3.8 Flash</span>
                  <span>•</span>
                  <span>اللاعب: {playerName}</span>
                </p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleClearHistory}
                className="p-1.5 text-white/50 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer"
                title="بدء جلسة جديدة وإفراغ المحادثة"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 text-white/50 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer"
                title={isMinimized ? 'تكبير النافذة' : 'تصغير'}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/50 hover:text-[#b2e01e] rounded hover:bg-white/5 transition-colors cursor-pointer"
                title="إغلاق المحادثة"
              >
                <X className="w-4 h-4 text-[#b2e01e]" />
              </button>
            </div>
          </div>

          {/* When not minimized: Body, suggestions & input */}
          {!isMinimized && (
            <>
              {/* Context Player Badge Strip */}
              <div className="px-3.5 py-1.5 bg-[#121316] border-b border-white/5 flex items-center justify-between text-[10px] font-mono-tag text-white/70">
                <span className="text-[#b2e01e] font-bold">
                  سياقك: المستوى {playerLevel} • {levelTitle}
                </span>
                <span>إنجاز التمارين: {progressPercentage}%</span>
              </div>

              {/* Messages Thread */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 min-w-0 bg-[#16161a]">
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {/* Avatar */}
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        isUser 
                          ? 'bg-[#005cd7] text-white border border-[#005cd7]' 
                          : 'bg-[#b2e01e] text-[#0b0b0d]'
                      }`}>
                        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-4 h-4 fill-current" />}
                      </div>

                      {/* Bubble */}
                      <div className={`max-w-[85%] rounded-lg p-3 space-y-1 ${
                        isUser
                          ? 'bg-[#005cd7]/20 border border-[#005cd7]/60 text-white rounded-tr-none'
                          : 'bg-[#0b0b0d] border border-[var(--card-border)] text-white/90 rounded-tl-none shadow-sm'
                      }`}>
                        <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-1 mb-1 text-[9px] font-mono-tag text-white/40">
                          <span>{isUser ? playerName : 'كوتش بادل برو'}</span>
                          <span>{msg.timestamp}</span>
                        </div>

                        <div className="text-white/90 leading-relaxed font-alexandria">
                          {renderFormattedText(msg.text)}
                          {!msg.text && isStreaming && (
                            <span className="inline-flex items-center gap-1 text-[#b2e01e] text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#b2e01e] animate-bounce"></span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#b2e01e] animate-bounce [animation-delay:0.2s]"></span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#b2e01e] animate-bounce [animation-delay:0.4s]"></span>
                              <span className="font-mono-tag mr-1 text-[10px]">جاري التحليل والكتابة...</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              {/* User-facing Alert Banner */}
              {errorMessage && (
                <div className="mx-3 my-2 p-2.5 bg-red-950/80 border border-red-500/70 rounded-lg text-xs text-red-200 flex items-start justify-between gap-2 animate-in fade-in shrink-0">
                  <div className="flex items-start gap-2 min-w-0">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div className="space-y-1.5 min-w-0">
                      <p className="text-[11px] leading-relaxed font-bold text-red-100">{errorMessage}</p>
                      {lastFailedPrompt && (
                        <button
                          type="button"
                          onClick={() => {
                            const promptToRetry = lastFailedPrompt;
                            setErrorMessage(null);
                            handleSendMessage(promptToRetry);
                          }}
                          className="text-[10px] bg-red-900 hover:bg-red-800 text-white px-2.5 py-1 rounded font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5 border border-red-400/40"
                        >
                          <RotateCcw className="w-3 h-3 text-[#b2e01e]" />
                          <span>إعادة محاولة إرسال السؤال الآن</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="text-red-300 hover:text-white p-1 rounded hover:bg-red-900/50 cursor-pointer shrink-0"
                    title="إغلاق التنبيه"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Quick Suggested Prompt Chips */}
              <div className="px-3 pt-2 pb-1 bg-[#0b0b0d] border-t border-[var(--card-border)] overflow-x-auto flex items-center gap-1.5 shrink-0 scrollbar-none">
                <span className="text-[10px] text-[#b2e01e] font-jetbrains shrink-0 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#b2e01e]" />
                  <span>اقتراحات:</span>
                </span>
                {quickPrompts.map((promptText, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => handleSendMessage(promptText)}
                    disabled={isStreaming}
                    className="text-[11px] font-mono-tag whitespace-nowrap bg-[#16161a] hover:bg-[#1f2416] text-white/80 hover:text-[#b2e01e] border border-white/10 hover:border-[#b2e01e] px-2.5 py-1 rounded transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    {promptText}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-2.5 bg-[#0b0b0d] flex items-center gap-2 shrink-0 border-t border-white/5"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="اسأل الكوتش عن ضربة، خطة تكتيكية، أو تحليل لمستواك..."
                  disabled={isStreaming}
                  className="flex-1 bg-[#16161a] border border-[var(--card-border)] focus:border-[#b2e01e] text-xs text-white placeholder-white/35 px-3 py-2.5 rounded outline-none transition font-alexandria text-right disabled:opacity-50"
                />

                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isStreaming}
                  className="btn-neon px-3.5 py-2.5 rounded font-black text-xs flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  title="إرسال"
                >
                  <Send className="w-3.5 h-3.5 fill-[#0b0b0d] -rotate-90" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};
