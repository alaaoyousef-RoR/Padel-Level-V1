import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ASSESSMENT_QUESTIONS, 
  ASSESSMENT_PILLARS, 
  calculateTestResults 
} from '../data/assessmentData';
import { AssessmentCategory } from '../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  HelpCircle,
  Activity,
  Shield,
  Zap,
  Info,
  Maximize2,
  Lock,
  User,
  Check
} from 'lucide-react';

const PADEL_TERMS_MAP: Record<number, { term: string; termEn: string; definition: string }[]> = {
  1: [
    { term: 'القطع السفلي', termEn: 'Slice / Cortada', definition: 'ضرب الكرة بحركة مائلة من الأعلى إلى الأسفل لتوليد دوران خلفي يجعل الكرة منخفضة وسريعة بعد الارتداد عن الأرض والزجاج الجانبي.' },
    { term: 'الزجاج الجانبي', termEn: 'Side Glass', definition: 'الجدار الزجاجي الموازي للخط الجانبي؛ ارتداد الكرة منه يربك زاوية الاستقبال لدى الخصم.' }
  ],
  2: [
    { term: 'الخطأ المزدوج', termEn: 'Double Fault', definition: 'خسارة محاولتي الإرسال (الأول والثاني) مما يمنح المنافس نقطة مجانية مباشرة دون لعب.' },
    { term: 'الإرسال الثاني', termEn: 'Second Serve', definition: 'محاولة الإرسال البديلة التي تتطلب أماناً وثباتاً أعلى لتجنب إهداء النقطة للخصم.' }
  ],
  3: [
    { term: 'التشيكيتا', termEn: 'Chiquita', definition: 'ضربة هابطة ناعمة وبطيئة تسقط مباشرة عند أقدام لاعبي الشبكة لإجبارهم على رفع الفولي للأعلى.' },
    { term: 'اللوب', termEn: 'Lob / Globo', definition: 'كرة هوائية عالية ومقوسة تعبر فوق رؤوس لاعبي الشبكة لإعادتهم إلى الخط الخلفي واستعادة الهجوم.' }
  ],
  4: [
    { term: 'توجيه الاستقبال', termEn: 'Return Placement', definition: 'اختيار مسار رد الإرسال بدقة تكتيكية بين كرات اللوب العالية أو الكرات المنخفضة عند الأقدام.' }
  ],
  5: [
    { term: 'الفولي القاطع', termEn: 'Sliced Volley', definition: 'لكم الكرة على الطاير عند الشبكة بقطع سفلي لتبقى منخفضة جداً وملاصقة للأرض بعد ملامستها.' },
    { term: 'القبضة القارية', termEn: 'Continental Grip', definition: 'مسك المضرب بزاوية مستقيمة كمسك المطرقة، وهي القبضة الأساسية الموحدة لجميع ضربات البادل.' }
  ],
  6: [
    { term: 'فولي الصد', termEn: 'Block Volley', definition: 'تثبيت المضرب كجدار صلب أمام الكرات القوية الصاروخية لامتصاص سرعتها وتوجيهها بهدوء.' }
  ],
  7: [
    { term: 'الفولي الساقط', termEn: 'Drop Volley / Dejada', definition: 'لمسة ناعمة جداً تسقط وتموت مباشرة خلف الشبكة قبل تمكن الخصم من الركض إليها.' }
  ],
  8: [
    { term: 'اشتباكات الشبكة', termEn: 'Fast Net Exchanges', definition: 'تبادل متسارع لكرات الفولي بين اللاعبين من مسافات متقاربة جداً عند الشبك.' }
  ],
  9: [
    { term: 'البانديخا', termEn: 'Bandeja ("الصينية")', definition: 'ضربة هوائية تكتيكية دفاعية من منتصف الملعب بقطع جانبي لمنع الخصم من الهجوم واستعادة موقع الشبكة.' }
  ],
  10: [
    { term: 'الفيبورا', termEn: 'Víbora ("الأفعى")', definition: 'ضربة هوائية هجومية مقوسة بدوران جانبي سريع ومباغت يرغم الكرة على الزحف والالتصاق بالزجاج.' }
  ],
  11: [
    { term: 'السماتش', termEn: 'Smash / Remate', definition: 'الضربة الساحقة العلوية لحسم النقطة بقوة ارتداد قصوى.' },
    { term: 'بور 3 وبور 4', termEn: 'Por 3 / Por 4', definition: 'إخراج الكرة بقوة خارج القفص عبر الجدار الجانبي (3 أمتار) أو الجدار الخلفي (4 أمتار).' }
  ],
  12: [
    { term: 'قرار الكرة العالية', termEn: 'Overhead Decision', definition: 'التمييز السريع بين لعب البانديخا أو الفيبورا أو السماتش حسب ارتفاع الكرة وموقعك في الملعب.' }
  ],
  13: [
    { term: 'الزجاج الخلفي', termEn: 'Back Glass Rebound', definition: 'قراءة مسار الكرة بعد ارتدادها من الجدار الخلفي وتوقيت ضربها للأمام بهدوء.' }
  ],
  14: [
    { term: 'الجدار المزدوج', termEn: 'Doble Pared', definition: 'ارتداد الكرة من جدارين متعامدين (الجدار الخلفي ثم الجانبي أو العكس) وتحديد زاوية خروجها.' }
  ],
  15: [
    { term: 'اللوب الدفاعي', termEn: 'Defensive Lob', definition: 'تسديد كرة مقوسة عالية وعميقة فوق لاعبي الشبكة لمنح فريقك وقتاً لالتقاط الأنفاس وإعادة التمركز.' }
  ],
  16: [
    { term: 'الباخادا', termEn: 'Bajada de Pared', definition: 'النزول بالكرة العالية من ارتداد الزجاج الخلفي وضربها بقوة هجومية سريعة كالفورهاند الهجومي.' }
  ],
  17: [
    { term: 'مبدأ الحبل المتصل', termEn: 'The Invisible Rope', definition: 'تناغم حركة الثنائي معاً؛ إذا صعد أحدهما للشبكة صعد الآخر، وإذا تحرك أحدهما لليمين غطى الآخر اليسار.' }
  ],
  18: [
    { term: 'بناء النقطة بصبر', termEn: 'Shot Selection & Patience', definition: 'الصبر التكتيكي في تبادل 15+ ضربة دون ارتكاب خطأ عشوائي حتى تظهر فرصة الهجوم الحقيقي.' }
  ],
  19: [
    { term: 'كرات المنتصف', termEn: 'Center Court Coverage', definition: 'الاتفاق المسبق على من يتولى كرات المنتصف المشتركة (عادة اللاعب ذو الفورهاند بالمنتصف).' }
  ],
  20: [
    { term: 'النقطة الذهبية', termEn: 'Punto de Oro (Golden Point)', definition: 'نقطة حسم الشوط بدون أفضلية (Deuce) عند التعادل 40-40، حيث يحدد الفائز بالشوط بنقطة واحدة حاسمة.' }
  ]
};

export const LevelTestPage: React.FC = () => {
  const { user, saveTestResult, navigateTo, loginWithUsername } = useApp();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [errorMessage, setErrorMessage] = useState('');

  // Inline Save / Login State (Requirement 3)
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  const currentQuestion = ASSESSMENT_QUESTIONS[currentQuestionIndex];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const currentPillar = ASSESSMENT_PILLARS.find(p => p.key === currentQuestion.category) || ASSESSMENT_PILLARS[0];
  const qNum = currentQuestionIndex + 1;
  const terms = PADEL_TERMS_MAP[qNum] || [];

  const handleSelectOption = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
    setErrorMessage('');
  };

  const handleNext = () => {
    if (answers[currentQuestion.id] === undefined) {
      setErrorMessage('يرجى اختيار الإجابة التي تصف مستواك بدقة قبل الانتقال.');
      return;
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const results = calculateTestResults(answers);
      saveTestResult(results);
      navigateTo('test-result');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setErrorMessage('');
    }
  };

  const handleInlineSaveLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginFeedback(null);

    if (!loginUsername.trim() || !loginPassword.trim()) {
      setLoginFeedback({ text: 'يرجى إدخال اسم المستخدم وكلمة المرور.', isError: true });
      return;
    }

    if (loginPassword.length < 6) {
      setLoginFeedback({ text: 'كلمة المرور يجب ألا تقل عن 6 أحرف.', isError: true });
      return;
    }

    setIsLoggingIn(true);
    if (Object.keys(answers).length > 0) {
      const currentResults = calculateTestResults(answers);
      await saveTestResult(currentResults);
    }

    const res = await loginWithUsername(loginUsername.trim(), loginPassword.trim());
    setIsLoggingIn(false);

    if (res.success) {
      setLoginFeedback({ text: '✓ تم حفظ بياناتك بنجاح وتسجيل الدخول!', isError: false });
    } else {
      setLoginFeedback({ text: res.message || 'فشل تسجيل الدخول.', isError: true });
    }
  };

  const getPillarIcon = (category: AssessmentCategory) => {
    switch (category) {
      case 'serve_return': return <Zap className="w-4 h-4 text-[#b2e01e] shrink-0" />;
      case 'net_volleys': return <Activity className="w-4 h-4 text-[#b2e01e] shrink-0" />;
      case 'overhead_shots': return <Sparkles className="w-4 h-4 text-[#b2e01e] shrink-0" />;
      case 'wall_defense': return <Shield className="w-4 h-4 text-[#b2e01e] shrink-0" />;
      case 'tactics_positioning': return <Maximize2 className="w-4 h-4 text-[#b2e01e] shrink-0" />;
      default: return <Zap className="w-4 h-4 text-[#b2e01e] shrink-0" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-2 text-right space-y-4 sm:space-y-6 font-alexandria min-w-0">
      
      {/* 1. Top Header Cockpit Card */}
      <div className="card-dark p-4 sm:p-6 md:p-7 rounded border border-[var(--card-border)] bg-[#16161a] space-y-4 sm:space-y-5 min-w-0">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 min-w-0">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ PLAYTOMIC BENCHMARK SYSTEM ]</span>
              <span className="bg-[#0b0b0d] border border-[#005cd7] text-[#b2e01e] text-[10px] font-mono-tag font-bold px-2 py-0.5 rounded shrink-0">
                20 Q COMPETENCY TEST
              </span>
            </div>
            <h1 className="font-alexandria font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight leading-snug break-words">
              اختبار تقييم مستوى لاعب البادل المعتمد
            </h1>
            <p className="text-xs text-[#f2f7ff]/75 mt-1 leading-relaxed break-words">
              تمت هيكلة هذا الاختبار وفق معايير Playtomic الدولية على 5 محاور تقنية رئيسية لتشخيص مستواك وتوليد برنامجك التدريبي.
            </p>
          </div>

          <div className="flex items-center gap-2.5 font-mono-tag text-xs self-start sm:self-center shrink-0">
            <div className="bg-[#0b0b0d] border border-[var(--card-border)] px-3 py-1.5 sm:py-2 rounded text-center">
              <span className="text-white/50 block text-[9px] sm:text-[10px]">PROGRESS</span>
              <span className="text-[#b2e01e] font-bold text-xs sm:text-sm">{answeredCount} / {totalQuestions}</span>
            </div>
            <div className="bg-[#0b0b0d] border border-[var(--card-border)] px-3 py-1.5 sm:py-2 rounded text-center">
              <span className="text-white/50 block text-[9px] sm:text-[10px]">BENCHMARK</span>
              <span className="text-white font-bold text-xs sm:text-sm">1.0 - 7.0</span>
            </div>
          </div>
        </div>

        {/* 5 Pillars Quick Tracker Indicator */}
        <div className="pt-3 border-t border-[var(--card-border)] space-y-2">
          <div className="text-[11px] font-mono-tag text-white/70 flex flex-wrap items-center justify-between gap-1.5">
            <span className="flex items-center gap-1.5 text-[#b2e01e] font-bold min-w-0">
              {getPillarIcon(currentQuestion.category)}
              <span className="truncate">المحور {currentPillar.pillarNumber} من 5: {currentPillar.shortTitleAr}</span>
            </span>
            <span className="shrink-0 font-jetbrains text-[10px] sm:text-[11px]">السؤال [{qNum}/20] • {progressPercent}%</span>
          </div>

          {/* Pillars Responsive Visual Track */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 sm:gap-2">
            {ASSESSMENT_PILLARS.map((p) => {
              const questionsInPillar = ASSESSMENT_QUESTIONS.filter(q => q.category === p.key);
              const answeredInPillar = questionsInPillar.filter(q => answers[q.id] !== undefined).length;
              const isCurrentPillar = p.key === currentQuestion.category;

              return (
                <div 
                  key={p.key} 
                  className={`p-1.5 sm:p-2 rounded border transition-colors text-center bg-[#0b0b0d] min-w-0 ${
                    isCurrentPillar 
                      ? 'border-[#b2e01e]' 
                      : answeredInPillar === 4 
                      ? 'border-[#005cd7]' 
                      : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold truncate">
                    <span className={isCurrentPillar ? 'text-[#b2e01e]' : answeredInPillar === 4 ? 'text-[#b2e01e]' : 'text-white/40'}>
                      {p.shortTitleAr}
                    </span>
                  </div>
                  <div className="w-full bg-[#16161a] h-1.5 rounded mt-1 overflow-hidden">
                    <div 
                      className="bg-[#b2e01e] h-full transition-all duration-200"
                      style={{ width: `${(answeredInPillar / 4) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Solid Main Progress Bar */}
        <div className="w-full h-1.5 bg-[#0b0b0d] rounded border border-white/10 overflow-hidden">
          <div 
            className="h-full bg-[#b2e01e] transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. Main Question Card */}
      <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] space-y-4 sm:space-y-6 min-w-0">
        
        {/* Category & Step Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[var(--card-border)] pb-3 sm:pb-4 gap-2 min-w-0">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="font-mono-tag text-[11px] text-[#0b0b0d] bg-[#b2e01e] font-black px-2.5 py-1 rounded flex items-center gap-1.5 shrink-0">
              {getPillarIcon(currentQuestion.category)}
              <span>محور {currentPillar.pillarNumber}: {currentQuestion.categoryAr}</span>
            </span>
            <span className="font-mono-tag text-xs text-white/50 shrink-0">
              سؤال #{currentQuestion.id} من 20
            </span>
          </div>

          <span className="font-mono-tag text-[10px] sm:text-[11px] text-[#f2f7ff]/70 bg-[#0b0b0d] border border-[var(--card-border)] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded shrink-0">
            سؤال {((currentQuestionIndex % 4) + 1)} من 4 في هذا المحور
          </span>
        </div>

        {/* Tactical Game Scenario Callout */}
        {currentQuestion.scenarioAr && (
          <div className="bg-[#0b0b0d] border border-[var(--card-border)] p-3 sm:p-3.5 rounded flex items-start gap-2.5 sm:gap-3 text-right min-w-0">
            <Info className="w-4 h-4 text-[#b2e01e] shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono-tag text-[#b2e01e] block uppercase font-bold">
                [ GAME SCENARIO / سيناريو اللعب العملي ]
              </span>
              <p className="text-xs text-[#f2f7ff]/90 leading-relaxed mt-0.5 break-words">
                {currentQuestion.scenarioAr}
              </p>
            </div>
          </div>
        )}

        {/* Question Text */}
        <div className="space-y-1.5 min-w-0">
          <h2 className="font-black text-lg sm:text-xl md:text-2xl text-white leading-relaxed break-words">
            {currentQuestion.questionAr}
          </h2>
          {currentQuestion.hintAr && (
            <p className="text-xs text-[#f2f7ff]/65 flex items-start sm:items-center gap-1.5 font-medium pt-1 break-words">
              <HelpCircle className="w-3.5 h-3.5 text-[#b2e01e] shrink-0 mt-0.5 sm:mt-0" />
              <span>معيار التقييم: {currentQuestion.hintAr}</span>
            </p>
          )}
        </div>

        {/* Intuitive Inline Padel Terms Explanations */}
        {terms.length > 0 && (
          <div className="p-3 sm:p-3.5 rounded bg-[#0b0b0d] border border-[#003b8b] space-y-2 min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#b2e01e]">
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span>شرح مبسط لمصطلحات هذا السؤال (Padel Terms):</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {terms.map((t, idx) => (
                <div key={idx} className="p-2 sm:p-2.5 rounded bg-[#16161a] border border-white/10 text-right min-w-0">
                  <div className="flex items-center justify-between font-bold text-white text-[11px] mb-0.5 gap-2">
                    <span className="text-[#b2e01e] truncate">{t.term}</span>
                    <span className="font-jetbrains text-[10px] text-white/50 shrink-0">{t.termEn}</span>
                  </div>
                  <p className="text-[11px] text-[#f2f7ff]/75 leading-relaxed break-words">{t.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Question Options */}
        <div className="space-y-2.5 sm:space-y-3 min-w-0">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = answers[currentQuestion.id] === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-3.5 sm:p-4 rounded border text-right transition-colors flex items-start gap-3 cursor-pointer bg-[#0b0b0d] min-w-0 ${
                  isSelected
                    ? 'border-[#b2e01e] bg-[#003b8b]/30 text-white'
                    : 'border-[var(--card-border)] hover:border-white/30 text-white/80'
                }`}
              >
                {/* Radio indicator */}
                <div className={`w-5 h-5 rounded shrink-0 mt-0.5 flex items-center justify-center border font-mono-tag text-[10px] font-bold ${
                  isSelected
                    ? 'border-[#b2e01e] bg-[#b2e01e] text-[#0b0b0d]'
                    : 'border-white/20 bg-transparent text-transparent'
                }`}>
                  ✓
                </div>

                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs sm:text-sm font-semibold leading-relaxed break-words ${isSelected ? 'text-[#b2e01e]' : 'text-white'}`}>
                      {option.text}
                    </span>
                  </div>

                  {option.tierTag && (
                    <div className="flex items-center gap-2 pt-1 font-mono-tag text-[10px] flex-wrap">
                      <span className={`px-2 py-0.5 rounded font-bold shrink-0 ${
                        isSelected 
                          ? 'bg-[#b2e01e] text-[#0b0b0d]' 
                          : 'bg-[#16161a] text-white/50 border border-white/10'
                      }`}>
                        {option.tierTag}
                      </span>
                      <span className="text-white/40 shrink-0">
                        [+{option.score} نقطة]
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="bg-red-950 border border-red-800 text-red-200 p-3 rounded text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span className="break-words">{errorMessage}</span>
          </div>
        )}

        {/* Actions Bar */}
        <div className="pt-3 sm:pt-4 border-t border-[var(--card-border)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 min-w-0">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className={`px-4 sm:px-5 py-2.5 rounded text-xs font-mono-tag uppercase transition-colors flex items-center justify-center gap-2 ${
              currentQuestionIndex === 0
                ? 'opacity-30 cursor-not-allowed text-white/40 border border-white/10'
                : 'btn-outline-ink'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            <span>السابق (PREV)</span>
          </button>

          {/* Jump indicators */}
          <div className="hidden sm:flex items-center gap-1 font-mono-tag flex-wrap justify-center">
            {ASSESSMENT_QUESTIONS.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = currentQuestionIndex === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-6 h-6 rounded text-[9px] font-bold transition-colors ${
                    isCurrent
                      ? 'bg-[#b2e01e] text-[#0b0b0d]'
                      : isAnswered
                      ? 'bg-[#003b8b] text-[#b2e01e] border border-[#005cd7]'
                      : 'bg-[#0b0b0d] text-white/30 border border-white/10 hover:border-white/30'
                  }`}
                  title={`سؤال ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="btn-neon px-6 sm:px-7 py-2.5 text-xs font-extrabold flex items-center justify-center gap-2"
          >
            {currentQuestionIndex < totalQuestions - 1 ? (
              <>
                <span>السؤال التالي (NEXT)</span>
                <ArrowLeft className="w-4 h-4 shrink-0" />
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>إصدار تقرير Playtomic المعتمد</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* 3. Streamlined Save / Login Section */}
      <div className="card-dark p-4 sm:p-6 rounded border border-[var(--card-border)] bg-[#16161a] space-y-3.5 sm:space-y-4 min-w-0">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-[#b2e01e] shrink-0"></span>
            <span className="font-jetbrains text-[10px] text-[#b2e01e] font-bold uppercase tracking-wider">
              ACCOUNT & DATA PRESERVATION
            </span>
          </div>
          <h3 className="font-alexandria font-bold text-sm sm:text-base text-white break-words">
            Log in with any username to save your results, track your daily training progress, and access customized drill plans.
          </h3>
          <p className="text-xs text-[#f2f7ff]/70 leading-relaxed break-words">
            سجّل الدخول بأي اسم مستخدم لحفظ نتائجك، وتتبع تقدمك التدريبي اليومي، والوصول إلى خطط التمارين المخصصة.
          </p>
        </div>

        {user ? (
          <div className="p-3 sm:p-3.5 rounded bg-[#0b0b0d] border border-[#005cd7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 min-w-0">
            <div className="text-xs text-[#f2f7ff] min-w-0">
              <span className="text-white/80">أنت مسجّل الدخول كـ: </span>
              <strong className="text-[#b2e01e] font-bold break-words">{user.fullName || user.email}</strong>
              <span className="text-white/60 block text-[11px] mt-0.5">
                نتائج تقييمك ستحفظ وتحدث فورياً في سجلك الرياضي.
              </span>
            </div>
            <button
              onClick={() => navigateTo('dashboard')}
              className="btn-neon text-xs px-4 py-2 font-bold shrink-0 self-stretch sm:self-auto text-center justify-center"
            >
              لوحة التحكم
            </button>
          </div>
        ) : (
          <form onSubmit={handleInlineSaveLogin} className="space-y-3 pt-2 border-t border-[var(--card-border)] min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
              <div className="min-w-0">
                <label className="block text-[11px] text-[#f2f7ff]/80 font-bold mb-1">
                  اسم المستخدم (Username)
                </label>
                <div className="relative min-w-0">
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="مثال: ahmad_padel"
                    dir="ltr"
                    className="w-full bg-[#0b0b0d] border border-[var(--card-border)] rounded py-2 px-3 pr-8 text-xs text-white placeholder-white/30 outline-none focus:border-[#b2e01e] font-jetbrains text-right"
                  />
                  <User className="w-3.5 h-3.5 text-white/40 absolute top-2.5 right-2.5 pointer-events-none" />
                </div>
              </div>
              <div className="min-w-0">
                <label className="block text-[11px] text-[#f2f7ff]/80 font-bold mb-1">
                  كلمة المرور (Password)
                </label>
                <div className="relative min-w-0">
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    dir="ltr"
                    className="w-full bg-[#0b0b0d] border border-[var(--card-border)] rounded py-2 px-3 pr-8 text-xs text-white placeholder-white/30 outline-none focus:border-[#b2e01e] font-jetbrains text-right"
                  />
                  <Lock className="w-3.5 h-3.5 text-white/40 absolute top-2.5 right-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {loginFeedback && (
              <div className={`p-2.5 rounded text-xs flex items-center gap-2 ${loginFeedback.isError ? 'bg-red-950 text-red-200 border border-red-800' : 'bg-green-950 text-green-200 border border-green-800'}`}>
                <span className="break-words">{loginFeedback.text}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 min-w-0">
              <span className="text-[10px] text-[#f2f7ff]/50 leading-relaxed break-words">
                * يدعم تسجيل الدخول المباشر أو إنشاء حساب تلقائي فوري دون تعقيد.
              </span>
              <button
                type="submit"
                disabled={isLoggingIn}
                className="btn-neon px-5 py-2 text-xs font-black rounded cursor-pointer disabled:opacity-50 w-full sm:w-auto shrink-0 text-center justify-center"
              >
                {isLoggingIn ? 'جاري الحفظ والتحقق...' : 'حفظ ومتابعة (Save & Continue)'}
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
