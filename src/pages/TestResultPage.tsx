import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PADEL_LEVELS, ASSESSMENT_PILLARS } from '../data/assessmentData';
import { PillarKey } from '../types';
import { AngledRacketIllustration } from '../components/BrandEquipmentVectors';
import { 
  Trophy, 
  CheckCircle, 
  AlertTriangle, 
  ArrowLeft, 
  RotateCcw, 
  TrendingUp, 
  Printer, 
  Zap, 
  Award, 
  Shield, 
  Flame, 
  Activity, 
  Target, 
  Play,
  User,
  Lock
} from 'lucide-react';

export const TestResultPage: React.FC = () => {
  const { testResult, user, navigateTo, loginWithUsername, saveTestResult } = useApp();

  const [saveUsername, setSaveUsername] = useState('');
  const [savePassword, setSavePassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  if (!testResult) {
    return (
      <div className="card-dark max-w-xl mx-auto my-12 p-6 sm:p-8 rounded text-center space-y-4 font-alexandria border border-[var(--card-border)] bg-[#16161a] min-w-0">
        <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ NO DATA AVAILABLE ]</span>
        <h2 className="font-alexandria font-black text-xl sm:text-2xl text-white break-words">لم تقم بإجراء الاختبار بعد!</h2>
        <p className="text-xs text-[#f2f7ff]/70 leading-relaxed break-words">
          خض اختبار المستوى المعتمد المكون من 20 سؤالاً وفق مقياس Playtomic للحصول على تقريرك التشخيصي المعتمد.
        </p>
        <button
          onClick={() => navigateTo('level-test')}
          className="btn-neon px-6 py-2.5 text-xs font-black inline-flex justify-center"
        >
          ابدأ الاختبار الآن
        </button>
      </div>
    );
  }

  const levelInfo = PADEL_LEVELS[testResult.levelNumber] || PADEL_LEVELS[1];
  const code = testResult.levelNumber < 10 ? `0${testResult.levelNumber}` : `${testResult.levelNumber}`;

  const handlePrint = () => {
    window.print();
  };

  const handleSaveResult = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveFeedback(null);

    if (!saveUsername.trim() || !savePassword.trim()) {
      setSaveFeedback({ text: 'يرجى إدخال اسم المستخدم وكلمة المرور.', isError: true });
      return;
    }

    if (savePassword.length < 6) {
      setSaveFeedback({ text: 'كلمة المرور يجب ألا تقل عن 6 أحرف.', isError: true });
      return;
    }

    setIsSaving(true);
    await saveTestResult(testResult);
    const res = await loginWithUsername(saveUsername.trim(), savePassword.trim());
    setIsSaving(false);

    if (res.success) {
      setSaveFeedback({ text: '✓ تم حفظ نتيجتك بنجاح في حسابك الشخصي!', isError: false });
    } else {
      setSaveFeedback({ text: res.message || 'فشل حفظ النتيجة.', isError: true });
    }
  };

  const getPillarIcon = (key: PillarKey) => {
    switch (key) {
      case 'serve_return': return <Zap className="w-4 h-4 text-[#b2e01e] shrink-0" />;
      case 'net_volleys': return <Shield className="w-4 h-4 text-[#b2e01e] shrink-0" />;
      case 'overhead_shots': return <Flame className="w-4 h-4 text-[#b2e01e] shrink-0" />;
      case 'wall_defense': return <Activity className="w-4 h-4 text-[#b2e01e] shrink-0" />;
      case 'tactics_positioning': return <Target className="w-4 h-4 text-[#b2e01e] shrink-0" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-2 text-right space-y-5 sm:space-y-6 font-alexandria min-w-0">
      
      {/* Top Banner Box */}
      <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] space-y-4 sm:space-y-5 min-w-0">
        
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 sm:gap-6 min-w-0">
          
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ OFFICIAL PLAYTOMIC BENCHMARK CERTIFIED ]</span>
              <span className="bg-[#0b0b0d] text-[#b2e01e] text-[10px] font-mono-tag font-bold px-2.5 py-0.5 rounded border border-[#005cd7] shrink-0">
                VERIFIED EVALUATION
              </span>
            </div>
            
            <h1 className="font-alexandria font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight leading-snug break-words uppercase">
              شهادة تقييم <span className="text-[#b2e01e]">مستوى لاعب البادل</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#f2f7ff]/80 leading-relaxed font-medium break-words">
              تم تشخيص كفاءتك الفنية بدقة عبر المحاور الخمسة الأساسية لرياضة البادل. إليك تصنيفك الرقمي المعتمد وفق سلم Playtomic الدولي وبرنامجك التدريبي المقترح.
            </p>

            {/* Playtomic Badge Highlight */}
            <div className="inline-flex items-center gap-2.5 sm:gap-3 p-3 bg-[#0b0b0d] border border-[var(--card-border)] rounded min-w-0 flex-wrap">
              <Award className="w-6 h-6 text-[#b2e01e] shrink-0" />
              <div className="text-right min-w-0">
                <span className="font-mono-tag text-[10px] text-white/60 block uppercase">PLAYTOMIC EQUIVALENT RATING</span>
                <span className="text-sm sm:text-base md:text-lg font-black text-[#b2e01e] break-words">
                  Playtomic Level {testResult.playtomicScore ? testResult.playtomicScore.toFixed(2) : '3.80'} • Tier {testResult.playtomicTier || 'C+'}
                </span>
              </div>
            </div>
          </div>

          {/* Level Badge Block */}
          <div className="bg-[#0b0b0d] border border-[var(--card-border)] p-4 sm:p-5 rounded text-center w-full lg:w-72 shrink-0 space-y-2 relative min-w-0">
            <div className="absolute top-2.5 left-2.5 bg-[#b2e01e] text-[#0b0b0d] font-mono-tag font-black text-[9px] px-2 py-0.5 rounded">
              CERTIFIED PRO
            </div>

            <div className="flex justify-center pt-1">
              <AngledRacketIllustration className="w-14 h-14 shrink-0" />
            </div>

            <span className="font-mono-tag text-[10px] text-white/60 uppercase block">ASSIGNED TRAINING STAGE</span>
            
            <div className="font-alexandria font-black text-3xl sm:text-4xl text-white my-0.5 tracking-tighter">
              {code}
            </div>

            <h3 className="font-bold text-sm sm:text-base text-white break-words">
              {levelInfo.titleAr}
            </h3>
            <p className="text-xs text-[#b2e01e] font-mono-tag font-bold">
              {levelInfo.playtomicTier} • Playtomic {levelInfo.playtomicEquivalent}
            </p>

            <div className="pt-2 border-t border-[var(--card-border)] grid grid-cols-2 gap-2 font-mono-tag text-xs">
              <div>
                <span className="text-white/60 text-[9px] block">TOTAL SCORE</span>
                <span className="text-white font-bold">{testResult.totalScore}/80</span>
              </div>
              <div className="border-r border-[var(--card-border)] pr-2">
                <span className="text-white/60 text-[9px] block">INDEX RATIO</span>
                <span className="text-[#b2e01e] font-bold">{testResult.percentage}%</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 5 Pillars Performance Dashboard */}
      <div className="card-dark p-4 sm:p-6 md:p-7 rounded space-y-4 sm:space-y-5 border border-[var(--card-border)] bg-[#16161a] min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-[var(--card-border)] pb-3">
          <div>
            <span className="label-mono mb-0.5" style={{ color: '#b2e01e' }}>[ 5 PILLARS BENCHMARK BREAKDOWN ]</span>
            <h2 className="font-alexandria font-black text-base sm:text-lg text-white">
              التقرير الفني المفصل للمحاور الخمسة
            </h2>
          </div>
          <span className="text-[10px] sm:text-xs font-mono-tag text-[#f2f7ff]/60">PLAYTOMIC COMPETENCY RADAR</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 min-w-0">
          {ASSESSMENT_PILLARS.map((p) => {
            const detail = testResult.pillarBreakdown?.[p.key] || {
              score: 8,
              maxScore: 16,
              percentage: 50,
              tierAr: 'متوسط'
            };

            return (
              <div 
                key={p.key} 
                className="bg-[#0b0b0d] border border-[var(--card-border)] p-3 sm:p-4 rounded space-y-2 text-right transition-colors min-w-0"
              >
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded bg-[#16161a] border border-[var(--card-border)] flex items-center justify-center shrink-0">
                    {getPillarIcon(p.key)}
                  </div>
                  <span className="font-mono-tag text-[10px] text-[#b2e01e] font-bold">
                    P{p.pillarNumber}
                  </span>
                </div>

                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-white truncate">{p.shortTitleAr}</h4>
                  <div className="flex items-baseline justify-between mt-1 font-mono-tag">
                    <span className="text-sm font-black text-white">{detail.score}/16</span>
                    <span className="text-xs font-bold text-[#b2e01e]">{detail.percentage}%</span>
                  </div>
                </div>

                <div className="w-full bg-[#16161a] h-1.5 rounded overflow-hidden">
                  <div 
                    className="bg-[#b2e01e] h-full"
                    style={{ width: `${detail.percentage}%` }}
                  />
                </div>

                <div className="text-[10px] text-[#f2f7ff]/70 pt-1 border-t border-white/5 flex items-center justify-between">
                  <span>التقييم:</span>
                  <span className="text-white font-bold">{detail.tierAr}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save or Log In Card if Guest */}
      {!user && (
        <div className="card-dark p-4 sm:p-6 rounded border border-[var(--card-border)] bg-[#16161a] space-y-3.5 sm:space-y-4 min-w-0">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-[#b2e01e] shrink-0"></span>
              <span className="font-jetbrains text-[10px] text-[#b2e01e] font-bold uppercase tracking-wider">
                SAVE YOUR CERTIFIED RESULT
              </span>
            </div>
            <h3 className="font-alexandria font-bold text-sm sm:text-base text-white break-words">
              Log in with any username to save your results, track your daily training progress, and access customized drill plans.
            </h3>
            <p className="text-xs text-[#f2f7ff]/75 leading-relaxed break-words">
              سجّل الدخول بأي اسم مستخدم لحفظ نتائجك، وتتبع تقدمك التدريبي اليومي، والوصول إلى خطط التمارين المخصصة.
            </p>
          </div>

          <form onSubmit={handleSaveResult} className="space-y-3 pt-2 border-t border-[var(--card-border)] min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
              <div className="min-w-0">
                <label className="block text-[11px] text-[#f2f7ff]/80 font-bold mb-1">
                  اسم المستخدم (Username)
                </label>
                <div className="relative min-w-0">
                  <input
                    type="text"
                    required
                    value={saveUsername}
                    onChange={(e) => setSaveUsername(e.target.value)}
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
                    value={savePassword}
                    onChange={(e) => setSavePassword(e.target.value)}
                    placeholder="••••••••"
                    dir="ltr"
                    className="w-full bg-[#0b0b0d] border border-[var(--card-border)] rounded py-2 px-3 pr-8 text-xs text-white placeholder-white/30 outline-none focus:border-[#b2e01e] font-jetbrains text-right"
                  />
                  <Lock className="w-3.5 h-3.5 text-white/40 absolute top-2.5 right-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {saveFeedback && (
              <div className={`p-2.5 rounded text-xs flex items-center gap-2 ${saveFeedback.isError ? 'bg-red-950 text-red-200 border border-red-800' : 'bg-green-950 text-green-200 border border-green-800'}`}>
                <span className="break-words">{saveFeedback.text}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 min-w-0">
              <span className="text-[10px] text-[#f2f7ff]/50 leading-relaxed break-words">
                * يمكنك الدخول بحساب سابق أو كتابة اسم جديد لإنشائه وحفظ النتيجة فوراً.
              </span>
              <button
                type="submit"
                disabled={isSaving}
                className="btn-neon px-6 py-2 text-xs font-black rounded cursor-pointer disabled:opacity-50 w-full sm:w-auto shrink-0 text-center justify-center"
              >
                {isSaving ? 'جاري الحفظ...' : 'حفظ النتيجة والبدء (Save & Start)'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Next Actions */}
      <div className="card-dark p-4 sm:p-6 rounded border border-[var(--card-border)] bg-[#16161a] space-y-3.5 min-w-0">
        <h3 className="font-bold text-sm text-white border-b border-[var(--card-border)] pb-2">
          الخطوات التدريبية التالية لمستواك:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-0">
          <button
            onClick={() => navigateTo('my-training-program')}
            className="bg-[#0b0b0d] border border-[var(--card-border)] hover:border-[#b2e01e] p-3.5 rounded flex items-center justify-between text-right transition-colors min-w-0"
          >
            <div className="min-w-0 flex-1">
              <span className="font-bold text-xs text-white block truncate">برنامجي التدريبي المخصص</span>
              <span className="text-[10px] font-mono-tag text-[#b2e01e] block truncate">{levelInfo.recommendedProgramWeeks} أسابيع خطة معتمدة</span>
            </div>
            <Trophy className="w-4 h-4 text-[#b2e01e] shrink-0 mr-2" />
          </button>

          <button
            onClick={() => navigateTo('video-tutorials')}
            className="bg-[#0b0b0d] border border-[var(--card-border)] hover:border-[#b2e01e] p-3.5 rounded flex items-center justify-between text-right transition-colors min-w-0"
          >
            <div className="min-w-0 flex-1">
              <span className="font-bold text-xs text-white block truncate">مكتبة التمارين المرئية</span>
              <span className="text-[10px] font-mono-tag text-[#b2e01e] block truncate">فيديوهات تدريبية لكل محور</span>
            </div>
            <Play className="w-4 h-4 text-[#b2e01e] shrink-0 mr-2" />
          </button>

          <button
            onClick={() => navigateTo('progress-tracker')}
            className="bg-[#0b0b0d] border border-[var(--card-border)] hover:border-[#b2e01e] p-3.5 rounded flex items-center justify-between text-right transition-colors min-w-0"
          >
            <div className="min-w-0 flex-1">
              <span className="font-bold text-xs text-white block truncate">سجل الحصص والمهارات</span>
              <span className="text-[10px] font-mono-tag text-[#b2e01e] block truncate">متابعة التطور ومؤشرات الأداء</span>
            </div>
            <TrendingUp className="w-4 h-4 text-[#b2e01e] shrink-0 mr-2" />
          </button>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between text-xs font-mono-tag text-white/60 gap-2.5 min-w-0">
          <button
            onClick={() => navigateTo('level-test')}
            className="hover:text-[#b2e01e] flex items-center gap-1.5 justify-center sm:justify-start"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            <span>[ إعادة إجراء الاختبار التشخيصي ]</span>
          </button>

          <button
            onClick={handlePrint}
            className="hover:text-white flex items-center gap-1.5 bg-[#0b0b0d] px-3.5 py-1.5 rounded border border-[var(--card-border)] justify-center"
          >
            <Printer className="w-3.5 h-3.5 shrink-0" />
            <span>طباعة شهادة التقييم المعتمدة</span>
          </button>
        </div>

      </div>

    </div>
  );
};
