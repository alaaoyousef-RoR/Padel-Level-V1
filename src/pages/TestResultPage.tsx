import React from 'react';
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
  Play
} from 'lucide-react';

export const TestResultPage: React.FC = () => {
  const { testResult, navigateTo } = useApp();

  if (!testResult) {
    return (
      <div className="card-dark max-w-xl mx-auto my-20 p-8 rounded-3xl text-center space-y-5 font-alexandria border border-white/20">
        <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ NO DATA AVAILABLE ]</span>
        <h2 className="font-alexandria font-black text-2xl text-white">لم تقم بإجراء الاختبار بعد!</h2>
        <p className="text-xs text-white/70 leading-relaxed">
          خض اختبار المستوى المعتمد المكون من 20 سؤالاً وفق مقياس Playtomic للحصول على تقريرك التشخيصي المعتمد.
        </p>
        <button
          onClick={() => navigateTo('level-test')}
          className="btn-neon px-6 py-3 text-xs font-black"
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

  const getPillarIcon = (key: PillarKey) => {
    switch (key) {
      case 'serve_return': return <Zap className="w-4 h-4 text-[#b2e01e]" />;
      case 'net_volleys': return <Shield className="w-4 h-4 text-[#b2e01e]" />;
      case 'overhead_shots': return <Flame className="w-4 h-4 text-[#b2e01e]" />;
      case 'wall_defense': return <Activity className="w-4 h-4 text-[#b2e01e]" />;
      case 'tactics_positioning': return <Target className="w-4 h-4 text-[#b2e01e]" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-4 text-right space-y-8 font-alexandria">
      
      {/* Top Banner Box - Playtomic Benchmark Certificate with Angled Racket Vector */}
      <div className="card-dark p-6 sm:p-10 rounded-3xl border border-white/20 space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#b2e01e]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          
          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ OFFICIAL PLAYTOMIC BENCHMARK CERTIFIED ]</span>
              <span className="theme-card-solid text-[#b2e01e] text-[10px] font-mono-tag font-bold px-2.5 py-0.5 rounded-full border border-[#b2e01e]/40">
                VERIFIED EVALUATION
              </span>
            </div>
            
            <h1 className="font-alexandria font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight uppercase">
              شهادة تقييم <span className="text-[#b2e01e]">مستوى لاعب البادل</span>
            </h1>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl font-medium">
              تم تشخيص كفاءتك الفنية بدقة عبر المحاور الخمسة الأساسية لرياضة البادل. إليك تصنيفك الرقمي المعتمد وفق سلم Playtomic الدولي وبرنامجك التدريبي المقترح.
            </p>

            {/* Playtomic Badge Highlight */}
            <div className="inline-flex items-center gap-3 p-3.5 theme-card-solid border border-white/15 rounded-2xl shadow">
              <Award className="w-6 h-6 text-[#b2e01e] flex-shrink-0" />
              <div className="text-right">
                <span className="font-mono-tag text-[10px] text-white/70 block uppercase">PLAYTOMIC EQUIVALENT RATING</span>
                <span className="text-base sm:text-lg font-black text-[#b2e01e]">
                  Playtomic Level {testResult.playtomicScore ? testResult.playtomicScore.toFixed(2) : '3.80'} • Tier {testResult.playtomicTier || 'C+'}
                </span>
              </div>
            </div>
          </div>

          {/* Level Badge Block with Official Angled Padel Racket Vector */}
          <div className="theme-card-solid border border-white/20 p-6 rounded-3xl text-center min-w-[270px] space-y-3 shadow-xl relative w-full lg:w-auto">
            <div className="absolute top-3 left-3 bg-[#b2e01e] text-[#002255] font-mono-tag font-black text-[9px] px-2 py-0.5 rounded-full">
              CERTIFIED PRO
            </div>

            <div className="flex justify-center pt-2">
              <AngledRacketIllustration className="w-16 h-16 drop-shadow-lg" />
            </div>

            <span className="font-mono-tag text-[10px] text-white/70 uppercase block">ASSIGNED TRAINING STAGE</span>
            
            <div className="font-alexandria font-black text-5xl text-white my-1 tracking-tighter">
              {code}
            </div>

            <h3 className="font-bold text-base text-white">
              {levelInfo.titleAr}
            </h3>
            <p className="text-xs text-[#b2e01e] font-mono-tag font-bold">
              {levelInfo.playtomicTier} • Playtomic {levelInfo.playtomicEquivalent}
            </p>

            <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-4 font-mono-tag text-xs">
              <div>
                <span className="text-white/60 text-[9px] block">TOTAL SCORE</span>
                <span className="text-white font-bold">{testResult.totalScore}/80</span>
              </div>
              <div className="border-r border-white/10 pr-4">
                <span className="text-white/60 text-[9px] block">INDEX RATIO</span>
                <span className="text-[#b2e01e] font-bold">{testResult.percentage}%</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 5 Pillars Performance Dashboard */}
      <div className="card-dark p-6 sm:p-8 rounded-3xl space-y-6 border border-white/15 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/15 pb-4">
          <div>
            <span className="label-mono mb-1" style={{ color: '#b2e01e' }}>[ TECHNICAL PILLARS BREAKDOWN ]</span>
            <h2 className="font-alexandria font-bold text-xl text-white">تحليل أداء المحاور الخمسة الأساسية (5 Pillars of Padel)</h2>
          </div>
          <span className="font-mono-tag text-xs text-[#b2e01e] font-bold">
            5 / 5 PILLARS EVALUATED
          </span>
        </div>

        {/* Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ASSESSMENT_PILLARS.map((pillar) => {
            const detail = testResult.pillarBreakdown?.[pillar.key] || {
              key: pillar.key,
              nameAr: pillar.shortTitleAr,
              score: Math.round(testResult.totalScore / 5),
              maxScore: 16,
              percentage: testResult.percentage,
              playtomicScore: testResult.playtomicScore || 3.5,
              tier: testResult.playtomicTier || 'C',
              tierAr: `Tier ${testResult.playtomicTier || 'C'}`
            };

            return (
              <div 
                key={pillar.key} 
                className="theme-card-solid border border-white/10 hover:border-white/25 p-5 rounded-2xl space-y-3 transition-colors shadow"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#b2e01e]/15 border border-[#b2e01e]/30 flex items-center justify-center">
                      {getPillarIcon(pillar.key)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">
                        {pillar.shortTitleAr}
                      </h4>
                      <span className="font-mono-tag text-[10px] text-white/70">
                        محور {pillar.pillarNumber} من 5
                      </span>
                    </div>
                  </div>

                  <span className="bg-white/10 border border-white/10 px-2 py-0.5 rounded-md font-mono-tag text-[10px] text-[#b2e01e] font-bold">
                    Tier {detail.tier}
                  </span>
                </div>

                <p className="text-[11px] text-white/70 line-clamp-2 leading-relaxed">
                  {pillar.descriptionAr}
                </p>

                {/* Score & Progress */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono-tag">
                    <span className="text-white/60">SCORE & RATING</span>
                    <span className="text-white font-bold">
                      {detail.score} / 16 PTS • <span className="text-[#b2e01e]">PT {detail.playtomicScore.toFixed(1)}</span>
                    </span>
                  </div>
                  <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className="bg-[#b2e01e] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#b2e01e]"
                      style={{ width: `${detail.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono-tag text-white/60">
                    <span>نسبة الإتقان: {detail.percentage}%</span>
                    <span>{detail.tierAr}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Overall Benchmark Summary Card */}
          <div className="theme-subcard border border-white/20 p-5 rounded-2xl space-y-3 flex flex-col justify-between shadow">
            <div>
              <span className="label-mono mb-1" style={{ color: '#b2e01e' }}>[ PLAYTOMIC SUMMARY ]</span>
              <h4 className="font-bold text-sm text-white mt-1">خلاصة تقييم الأداء التراكمي</h4>
              <p className="text-[11px] text-white/75 mt-1 leading-relaxed">
                معدلك العام يضعك بين صفوف لاعبي {levelInfo.titleAr} مع قدرة تنافسية على خوض مباريات الفئة المحددة.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono-tag text-xs">
              <span className="text-white/60">PLAYTOMIC RATING</span>
              <span className="text-[#b2e01e] font-black text-sm">{testResult.playtomicScore ? testResult.playtomicScore.toFixed(2) : '3.80'} / 7.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnosis & Feedback */}
      <div className="card-dark p-6 sm:p-8 rounded-3xl space-y-6 border border-white/15 shadow-2xl">
        
        <div className="flex items-center justify-between border-b border-white/15 pb-4">
          <div>
            <span className="label-mono mb-1" style={{ color: '#b2e01e' }}>[ DIAGNOSTIC REPORT & COACHING FEEDBACK ]</span>
            <h2 className="font-alexandria font-bold text-xl text-white">تقرير التحليل التكتيكي وتوجيهات الكوتش</h2>
          </div>
          <span className="font-mono-tag text-[11px] text-white/70">
            DATE: {new Date(testResult.takenAt).toLocaleDateString('ar-EG')}
          </span>
        </div>

        {/* Coach Message Card */}
        <div className="theme-card-solid border border-white/15 p-5 rounded-2xl text-xs sm:text-sm text-white leading-relaxed space-y-2">
          <p className="font-mono-tag text-xs font-bold text-[#b2e01e] flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 fill-[#b2e01e]" />
            <span>[ TACTICAL COACH DIRECTIVE / توجيهات المدرب المعتمد ]</span>
          </p>
          <p className="text-white/90 leading-relaxed">{testResult.personalizedMessage}</p>
        </div>

        {/* Strengths and Weaknesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          <div className="theme-card-solid border border-white/10 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-[#b2e01e]">
              <CheckCircle className="w-4 h-4" />
              <h3 className="font-bold text-sm text-white">نقاط القوة التنافسية المكتشفة</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-white/80">
              {testResult.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#b2e01e] font-mono-tag font-bold">✓</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="theme-card-solid border border-white/10 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-amber-300">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="font-bold text-sm text-white">أولويات التدريب ومعالجة الثغرات</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-white/80">
              {testResult.weaknesses.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-amber-300 font-mono-tag font-bold">!</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Main Action Hub - Unlocked Training Program Banner */}
      <div className="card-dark p-6 sm:p-8 rounded-3xl space-y-5 border border-white/20 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ TRAINING PROGRAM UNLOCKED ]</span>
              <span className="bg-[#b2e01e] text-[#002255] font-mono-tag text-[10px] font-black px-2.5 py-0.5 rounded-full">
                STAGE {code} ACTIVE
              </span>
            </div>
            <h3 className="font-alexandria font-bold text-xl text-white mt-1">
              تم تفعيل خطتك التدريبية المخصصة: {levelInfo.titleAr}
            </h3>
            <p className="text-xs text-white/70 mt-1 max-w-xl">
              تم تجهيز برنامج تدريبي مكثف لمدة {levelInfo.recommendedProgramWeeks} أسابيع يركز على معالجة نقاط الضعف وصقل الكفاءات الخمس لبلوغ المستوى التالي.
            </p>
          </div>

          <button
            onClick={() => navigateTo('my-training-program')}
            className="btn-neon px-8 py-4 text-xs font-black flex items-center justify-center gap-2 whitespace-nowrap shadow-xl"
          >
            <Trophy className="w-4 h-4 text-[#002255]" />
            <span>ابدأ البرنامج التدريبي فوراً</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <button
            onClick={() => navigateTo('my-training-program')}
            className="theme-card-solid hover:bg-white/10 border border-white/10 p-4 rounded-2xl flex items-center justify-between text-right transition-colors"
          >
            <div>
              <span className="font-bold text-xs text-white block">جدول الحصص الأسبوعية</span>
              <span className="text-[10px] font-mono-tag text-[#b2e01e]">{levelInfo.recommendedProgramWeeks} أسابيع تدريبية مبرمجة</span>
            </div>
            <ArrowLeft className="w-4 h-4 text-[#b2e01e]" />
          </button>

          <button
            onClick={() => navigateTo('video-tutorials')}
            className="theme-card-solid hover:bg-white/10 border border-white/10 p-4 rounded-2xl flex items-center justify-between text-right transition-colors"
          >
            <div>
              <span className="font-bold text-xs text-white block">مكتبة التمارين المرئية</span>
              <span className="text-[10px] font-mono-tag text-[#b2e01e]">فيديوهات تدريبية لكل محور</span>
            </div>
            <Play className="w-4 h-4 text-[#b2e01e]" />
          </button>

          <button
            onClick={() => navigateTo('progress-tracker')}
            className="theme-card-solid hover:bg-white/10 border border-white/10 p-4 rounded-2xl flex items-center justify-between text-right transition-colors"
          >
            <div>
              <span className="font-bold text-xs text-white block">سجل الحصص والمهارات</span>
              <span className="text-[10px] font-mono-tag text-[#b2e01e]">متابعة التطور ومؤشرات الأداء</span>
            </div>
            <TrendingUp className="w-4 h-4 text-[#b2e01e]" />
          </button>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs font-mono-tag text-white/60">
          <button
            onClick={() => navigateTo('level-test')}
            className="hover:text-[#b2e01e] flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>[ إعادة إجراء الاختبار التشخيصي ]</span>
          </button>

          <button
            onClick={handlePrint}
            className="hover:text-white flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة شهادة التقييم المعتمدة</span>
          </button>
        </div>

      </div>

    </div>
  );
};
