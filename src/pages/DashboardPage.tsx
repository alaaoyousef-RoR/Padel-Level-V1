import React from 'react';
import { useApp } from '../context/AppContext';
import { PADEL_LEVELS } from '../data/assessmentData';
import { CoachFeedbackSection } from '../components/CoachFeedbackSection';
import { 
  PadelRacketOfficialVector,
  WaterBottleVector,
  PadelBallVector,
  AngledRacketIllustration
} from '../components/BrandEquipmentVectors';
import { 
  Trophy, 
  Activity, 
  BookOpen, 
  TrendingUp, 
  Play,
  ArrowLeft,
  Calendar,
  Flame,
  Award,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, testResult, trainingSessions, masteredSkills, navigateTo } = useApp();

  const playerName = user?.fullName || 'كابتن البادل';
  const hasTakenTest = !!testResult || !!user?.testTaken;
  const levelNum = testResult?.levelNumber || user?.levelNumber || 1;
  const levelInfo = PADEL_LEVELS[levelNum] || PADEL_LEVELS[1];
  const code = levelNum < 10 ? `0${levelNum}` : `${levelNum}`;

  const totalSessions = trainingSessions.length;
  const totalMinutes = trainingSessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const accuracyPercent = testResult?.percentage ?? (user?.testScore ? Math.round((user.testScore / 80) * 100) : 0);
  const totalScoreVal = testResult?.totalScore ?? user?.testScore ?? 0;

  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-6 text-right space-y-8">
      
      {/* 1. Hero Greeting Banner with Physical Court-Line Accents */}
      <div className="card-dark p-6 sm:p-10 rounded-3xl border border-white/20 space-y-4 relative overflow-hidden shadow-2xl">
        {/* Subtle white court line divider accents */}
        <div className="absolute top-0 right-0 w-2.5 h-full bg-[#b2e01e]"></div>
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/[0.08] pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-[#b2e01e]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-card-solid border border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#b2e01e] animate-ping"></span>
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>ATHLETE COMMAND CENTER</span>
            </div>

            <h1 className="font-alexandria font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              مرحباً بك مجدداً، <span className="text-[#b2e01e]">{playerName}</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
              لوحة التحكم الشاملة لمتابعة مسارك الفني، ساعات تدريبك على أرض الملعب، وتوصيات التكتيك الأسبوعية المعتمدة وفق معايير Padel Level Pro.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full lg:w-auto">
            <button
              onClick={() => navigateTo('my-training-program')}
              className="btn-neon px-5 py-3.5 text-xs font-black flex items-center justify-center gap-2 flex-1 sm:flex-none shadow-xl"
            >
              <Trophy className="w-4 h-4 text-[#002255]" />
              <span>متابعة خطة التدريب</span>
            </button>
            <button
              onClick={() => navigateTo('progress-tracker')}
              className="btn-outline-ink px-5 py-3.5 text-xs font-bold flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <Flame className="w-4 h-4 text-[#b2e01e]" />
              <span>+ تسجيل حصة</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Metric Widgets Row with Official Brand Equipment SVGs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Match / Training Sessions Widget (Signature Electric Lime Padel Ball Vector) */}
        <div className="card-dark p-5 sm:p-6 rounded-2xl border border-white/15 shadow-xl relative overflow-hidden group hover:border-white/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ MATCH SESSIONS ]</span>
            <div className="p-2 rounded-xl theme-card-solid border border-white/10 group-hover:scale-105 transition-transform flex items-center justify-center">
              <PadelBallVector className="w-10 h-10 drop-shadow" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-alexandria font-black text-3xl sm:text-4xl text-white tracking-tight">
              {totalSessions}
            </p>
            <div className="flex items-center justify-between text-xs text-white/70 pt-1 border-t border-white/10">
              <span>حصة تدريبية ومباراة مسجلة</span>
              <span className="font-mono-tag text-[#b2e01e] font-bold">TOTAL</span>
            </div>
          </div>
        </div>

        {/* Training Hours Widget (Athletic Lime Sports Water Bottle Graphic) */}
        <div className="card-dark p-5 sm:p-6 rounded-2xl border border-white/15 shadow-xl relative overflow-hidden group hover:border-white/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ TRAINING HOURS ]</span>
            <div className="p-2 rounded-xl theme-card-solid border border-white/10 group-hover:scale-105 transition-transform flex items-center justify-center">
              <WaterBottleVector className="w-10 h-10 drop-shadow" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-alexandria font-black text-3xl sm:text-4xl text-[#b2e01e] tracking-tight">
              {totalHours}
            </p>
            <div className="flex items-center justify-between text-xs text-white/70 pt-1 border-t border-white/10">
              <span>ساعة تدريب وبناء لياقة</span>
              <span className="font-mono-tag text-[#b2e01e] font-bold">HOURS</span>
            </div>
          </div>
        </div>

        {/* Mastered Skills Widget (Official White Perforated Padel Racket Illustration) */}
        <div className="card-dark p-5 sm:p-6 rounded-2xl border border-white/15 shadow-xl relative overflow-hidden group hover:border-white/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ SKILLS MASTERED ]</span>
            <div className="p-2 rounded-xl theme-card-solid border border-white/10 group-hover:scale-105 transition-transform flex items-center justify-center">
              <PadelRacketOfficialVector className="w-10 h-10 drop-shadow" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-alexandria font-black text-3xl sm:text-4xl text-white tracking-tight">
              {masteredSkills.length}<span className="text-xl text-white/50">/12</span>
            </p>
            <div className="flex items-center justify-between text-xs text-white/70 pt-1 border-t border-white/10">
              <span>مهارة فنية وتكتيكية معتمدة</span>
              <span className="font-mono-tag text-[#b2e01e] font-bold">{Math.round((masteredSkills.length / 12) * 100)}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Main Split Grid: Active Level Classification Showcase & Quick Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5 cols): Active Level Classification Card with Angled Padel Racket Illustration */}
        <div className="lg:col-span-5 card-dark p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6 relative overflow-hidden shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-white/15 pb-4">
            <div>
              <span className="label-mono mb-1" style={{ color: '#b2e01e' }}>[ ACTIVE CLASSIFICATION ]</span>
              <h2 className="font-alexandria font-bold text-lg text-white">تصنيف المستوى المعتمد</h2>
            </div>
            <span className="font-mono-tag text-xs px-2.5 py-1 rounded-full bg-[#b2e01e]/15 text-[#b2e01e] border border-[#b2e01e]/30 font-black">
              {hasTakenTest ? 'CERTIFIED PRO' : 'EVALUATION PENDING'}
            </span>
          </div>

          {hasTakenTest ? (
            <div className="space-y-6">
              {/* Badge & Angled Padel Racket Container */}
              <div className="theme-card-solid p-6 rounded-2xl border border-white/15 text-center space-y-4 relative shadow-inner overflow-hidden">
                
                {/* Decorative angled racket SVG with lavender mesh bevels */}
                <div className="flex justify-center items-center py-2 relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                    <div className="w-32 h-32 rounded-full bg-[#b2e01e]/20 blur-xl"></div>
                  </div>
                  <div className="relative z-10 flex items-center justify-center gap-4">
                    <AngledRacketIllustration className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-xl" />
                    <div className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-2xl theme-subcard border-2 border-[#b2e01e] shadow-lg">
                      <span className="text-[10px] font-mono-tag text-[#b2e01e] font-bold">LEVEL</span>
                      <span className="font-alexandria font-black text-3xl text-white leading-none">
                        {code}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-alexandria font-black text-xl text-white">
                    {levelInfo.titleAr}
                  </h3>
                  <p className="font-mono-tag text-xs text-[#b2e01e] mt-1 font-bold">
                    {levelInfo.subtitleAr}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 theme-subcard border border-white/20 rounded-full text-xs font-mono-tag text-white font-bold">
                  <span>Playtomic Level {testResult?.playtomicScore ? testResult.playtomicScore.toFixed(2) : (user?.playtomicScore ? user.playtomicScore.toFixed(2) : levelInfo.playtomicEquivalent)}</span>
                  <span className="text-[#b2e01e]">•</span>
                  <span>Tier {testResult?.playtomicTier || user?.playtomicTier || levelInfo.playtomicTier}</span>
                </div>

                {/* Score & Accuracy Progress Meters */}
                <div className="pt-4 border-t border-white/15 space-y-3.5">
                  <div className="space-y-1.5 text-right">
                    <div className="flex justify-between text-xs font-mono-tag">
                      <span className="text-white/70">TOTAL SCORE (إجمالي النقاط)</span>
                      <span className="text-white font-bold">{totalScoreVal} / 80</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/10">
                      <div 
                        className="h-full bg-gradient-to-r from-white/40 to-[#b2e01e] rounded-full transition-all duration-500" 
                        style={{ width: `${(totalScoreVal / 80) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-right">
                    <div className="flex justify-between text-xs font-mono-tag">
                      <span className="text-white/70">TECHNICAL ACCURACY (دقة الأداء)</span>
                      <span className="text-[#b2e01e] font-bold">{accuracyPercent}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/10">
                      <div 
                        className="h-full bg-[#b2e01e] rounded-full shadow-[0_0_12px_#b2e01e] transition-all duration-500" 
                        style={{ width: `${accuracyPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Diagnostic Report vs Retake Test */}
              <div className="grid grid-cols-2 gap-3 font-mono-tag">
                <button
                  onClick={() => navigateTo('test-result')}
                  className="btn-outline-ink py-3 text-center text-xs font-bold justify-center"
                >
                  تقرير التحليل الفني
                </button>
                <button
                  onClick={() => navigateTo('level-test')}
                  className="btn-neon py-3 text-center text-xs font-black justify-center shadow-lg"
                >
                  إعادة الاختبار
                </button>
              </div>
            </div>
          ) : (
            <div className="theme-card-solid border border-white/15 p-8 rounded-2xl text-center space-y-5">
              <div className="flex justify-center">
                <AngledRacketIllustration className="w-20 h-20 opacity-70" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-alexandria font-bold text-white text-base">مرحباً بك! ابدأ رحلتك الاحترافية في البادل</h3>
                <p className="text-xs text-white/70 leading-relaxed max-w-xs mx-auto">
                  أكمل اختبار تحديد المستوى المكون من 20 سؤالاً تشخيصياً لفتح تصنيفك الرسمي المعتمد، وتحرير برنامجك التدريبي المخصص.
                </p>
              </div>
              <button
                onClick={() => navigateTo('level-test')}
                className="btn-neon w-full py-3.5 text-xs font-black justify-center shadow-lg"
              >
                <Zap className="w-4 h-4 fill-[#002255]" />
                <span>ابدأ اختبار تحديد المستوى</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column (7 cols): Quick Hub Navigation & Action Items */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Quick Hub Navigation Cards */}
          <div className="card-dark p-6 sm:p-8 rounded-3xl border border-white/15 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div>
                <span className="label-mono mb-1" style={{ color: '#b2e01e' }}>[ QUICK COMMAND HUB ]</span>
                <h3 className="font-alexandria font-bold text-base text-white">الوصول السريع إلى الأقسام الفنية:</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => navigateTo('my-training-program')}
                className="p-4 rounded-2xl theme-card-solid hover:bg-white/10 border border-white/15 hover:border-white/30 text-right transition-all flex items-center justify-between group shadow-md"
              >
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e]">برنامجي التدريبي المخصص</h4>
                  <p className="text-[11px] text-white/70">جدول التمارين وإرشادات الكوتش</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#b2e01e]/15 text-[#b2e01e] border border-[#b2e01e]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#b2e01e] group-hover:text-[#002255] transition-colors">
                  <Trophy className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={() => navigateTo('learn-padel')}
                className="p-4 rounded-2xl theme-card-solid hover:bg-white/10 border border-white/15 hover:border-white/30 text-right transition-all flex items-center justify-between group shadow-md"
              >
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e]">موسوعة المهارات والتكنيك</h4>
                  <p className="text-[11px] text-white/70">البانديخا، الفيبورا وقراءة الزجاج</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#b2e01e]/15 text-[#b2e01e] border border-[#b2e01e]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#b2e01e] group-hover:text-[#002255] transition-colors">
                  <BookOpen className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={() => navigateTo('progress-tracker')}
                className="p-4 rounded-2xl theme-card-solid hover:bg-white/10 border border-white/15 hover:border-white/30 text-right transition-all flex items-center justify-between group shadow-md"
              >
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e]">متتبع التقدم وسجل التمارين</h4>
                  <p className="text-[11px] text-white/70">تسجيل مدة وشدة الحصص وحفظها</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#b2e01e]/15 text-[#b2e01e] border border-[#b2e01e]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#b2e01e] group-hover:text-[#002255] transition-colors">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={() => navigateTo('video-tutorials')}
                className="p-4 rounded-2xl theme-card-solid hover:bg-white/10 border border-white/15 hover:border-white/30 text-right transition-all flex items-center justify-between group shadow-md"
              >
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e]">مكتبة الفيديو التدريبية</h4>
                  <p className="text-[11px] text-white/70">تمارين عملية ومحاكاة مواقف اللعب</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#b2e01e]/15 text-[#b2e01e] border border-[#b2e01e]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#b2e01e] group-hover:text-[#002255] transition-colors">
                  <Play className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          {/* Recommended Next Tactical Steps */}
          <div className="card-dark p-6 sm:p-8 rounded-3xl border border-white/15 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ ACTIVE ACTION ITEMS ]</span>
              <span className="text-[10px] font-mono-tag text-white/70">WEEKLY FOCUS</span>
            </div>
            <h3 className="font-alexandria font-bold text-base text-white">المهام التدريبية الموصى بها لهذا الأسبوع:</h3>

            <div className="space-y-2.5 font-mono-tag text-xs">
              <div className="p-3.5 rounded-2xl theme-card-solid border border-white/15 flex items-center justify-between text-white shadow">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#b2e01e] flex-shrink-0" />
                  <span className="font-sans font-semibold">التدرب على الفولي القاطع مع توجيهه للزجاج الجانبي</span>
                </div>
                <span className="text-[#b2e01e] font-bold px-2 py-0.5 rounded bg-[#b2e01e]/10">20 MIN</span>
              </div>

              <div className="p-3.5 rounded-2xl theme-card-solid border border-white/15 flex items-center justify-between text-white shadow">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#b2e01e] flex-shrink-0" />
                  <span className="font-sans font-semibold">تطبيق مبدأ الحبل المتصل مع زميلك في مباريات نهاية الأسبوع</span>
                </div>
                <span className="text-white/80 font-bold px-2 py-0.5 rounded bg-white/10">TACTICS</span>
              </div>
            </div>
          </div>

          {/* Latest Logged Session Quick Widget */}
          {trainingSessions.length > 0 && (
            <div className="card-dark p-6 rounded-3xl border border-white/15 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ LATEST LOGGED SESSION ]</span>
                <button
                  onClick={() => navigateTo('progress-tracker')}
                  className="text-xs text-[#b2e01e] hover:underline font-bold flex items-center gap-1"
                >
                  <span>عرض السجل كاملاً</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 theme-card-solid p-4 rounded-2xl border border-white/10">
                <div className="space-y-1">
                  <h4 className="text-white text-xs sm:text-sm font-bold">{trainingSessions[0].focus}</h4>
                  <div className="flex items-center gap-3 font-mono-tag text-[10px] text-white/70">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#b2e01e]" />
                      {trainingSessions[0].date}
                    </span>
                    <span>•</span>
                    <span>{trainingSessions[0].durationMinutes} دقيقة</span>
                    {trainingSessions[0].intensity && (
                      <span className="text-[#b2e01e] font-bold">({trainingSessions[0].intensity})</span>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => navigateTo('progress-tracker')}
                    className="btn-neon text-[11px] px-3.5 py-2 font-black whitespace-nowrap shadow"
                  >
                    + تسجيل حصة جديدة
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* 4. Coach Feedback Section */}
      <CoachFeedbackSection />

    </div>
  );
};
