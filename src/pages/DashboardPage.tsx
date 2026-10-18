import React from 'react';
import { useApp } from '../context/AppContext';
import { PADEL_LEVELS } from '../data/assessmentData';
import { CoachFeedbackSection } from '../components/CoachFeedbackSection';
import { 
  PadelRacketOfficialVector,
  WaterBottleVector,
  PadelBallVector,
  AngledRacketIllustration,
  Icons02Vector
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
    <div className="w-full max-w-7xl mx-auto py-2 sm:py-4 text-right space-y-5 sm:space-y-6 font-alexandria min-w-0">
      
      {/* 1. Hero Greeting Banner */}
      <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] space-y-4 relative overflow-hidden min-w-0">
        <div className="absolute top-0 right-0 w-2 h-full bg-[#b2e01e]"></div>
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 relative z-10 min-w-0">
          <div className="space-y-2 max-w-2xl min-w-0 flex-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0b0b0d] border border-white/15 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#b2e01e]"></span>
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>ATHLETE COMMAND CENTER</span>
            </div>

            <h1 className="font-alexandria font-black text-xl sm:text-3xl md:text-4xl text-white tracking-tight leading-snug break-words">
              مرحباً بك مجدداً، <span className="text-[#b2e01e]">{playerName}</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-[#f2f7ff]/80 leading-relaxed font-medium break-words">
              لوحة التحكم الشاملة لمتابعة مسارك الفني، ساعات تدريبك على أرض الملعب، وتوصيات التكتيك الأسبوعية المعتمدة وفق معايير Padel Level Pro.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={() => navigateTo('my-training-program')}
              className="btn-neon px-4 sm:px-5 py-3 text-xs font-black flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <Trophy className="w-4 h-4 text-[#0b0b0d] shrink-0" />
              <span>متابعة خطة التدريب</span>
            </button>
            <button
              onClick={() => navigateTo('progress-tracker')}
              className="btn-outline-ink px-4 sm:px-5 py-3 text-xs font-bold flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <Flame className="w-4 h-4 text-[#b2e01e] shrink-0" />
              <span>+ تسجيل حصة</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Metric Widgets Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 min-w-0">
        
        {/* Match / Training Sessions Widget */}
        <div className="card-dark p-4 sm:p-5 rounded border border-[var(--card-border)] bg-[#16161a] relative overflow-hidden transition-colors min-w-0 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 min-w-0">
            <span className="label-mono mb-0 truncate" style={{ color: '#b2e01e' }}>[ MATCH SESSIONS ]</span>
            <div className="p-2 rounded bg-[#0b0b0d] border border-white/10 flex items-center justify-center shrink-0">
              <PadelBallVector className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
          </div>
          <div className="space-y-1 min-w-0">
            <p className="font-alexandria font-black text-2xl sm:text-3xl text-white tracking-tight">
              {totalSessions}
            </p>
            <div className="flex items-center justify-between text-xs text-[#f2f7ff]/70 pt-1 border-t border-white/10 gap-2">
              <span className="truncate">حصة تدريبية ومباراة مسجلة</span>
              <span className="font-mono-tag text-[#b2e01e] font-bold shrink-0">TOTAL</span>
            </div>
          </div>
        </div>

        {/* Training Hours Widget */}
        <div className="card-dark p-4 sm:p-5 rounded border border-[var(--card-border)] bg-[#16161a] relative overflow-hidden transition-colors min-w-0 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 min-w-0">
            <span className="label-mono mb-0 truncate" style={{ color: '#b2e01e' }}>[ TRAINING HOURS ]</span>
            <div className="p-2 rounded bg-[#0b0b0d] border border-white/10 flex items-center justify-center shrink-0">
              <WaterBottleVector className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
          </div>
          <div className="space-y-1 min-w-0">
            <p className="font-alexandria font-black text-2xl sm:text-3xl text-[#b2e01e] tracking-tight">
              {totalHours}
            </p>
            <div className="flex items-center justify-between text-xs text-[#f2f7ff]/70 pt-1 border-t border-white/10 gap-2">
              <span className="truncate">ساعة تدريب وبناء لياقة</span>
              <span className="font-mono-tag text-[#b2e01e] font-bold shrink-0">HOURS</span>
            </div>
          </div>
        </div>

        {/* Mastered Skills Widget */}
        <div className="card-dark p-4 sm:p-5 rounded border border-[var(--card-border)] bg-[#16161a] relative overflow-hidden transition-colors min-w-0 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3 min-w-0">
            <span className="label-mono mb-0 truncate" style={{ color: '#b2e01e' }}>[ SKILLS MASTERED ]</span>
            <div className="p-2 rounded bg-[#0b0b0d] border border-white/10 flex items-center justify-center shrink-0">
              <Trophy className="w-7 h-7 text-[#b2e01e]" />
            </div>
          </div>
          <div className="space-y-1 min-w-0">
            <p className="font-alexandria font-black text-2xl sm:text-3xl text-white tracking-tight">
              {masteredSkills.length}<span className="text-xl text-white/50">/12</span>
            </p>
            <div className="flex items-center justify-between text-xs text-[#f2f7ff]/70 pt-1 border-t border-white/10 gap-2">
              <span className="truncate">مهارة فنية وتكتيكية معتمدة</span>
              <span className="font-mono-tag text-[#b2e01e] font-bold shrink-0">{Math.round((masteredSkills.length / 12) * 100)}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start min-w-0">
        
        {/* Left Column (5 cols): Active Level Classification Card */}
        <div className="lg:col-span-5 card-dark p-4 sm:p-6 rounded border border-[var(--card-border)] bg-[#16161a] space-y-5 min-w-0">
          
          <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-3 gap-2">
            <div>
              <span className="label-mono mb-0.5" style={{ color: '#b2e01e' }}>[ ACTIVE CLASSIFICATION ]</span>
              <h2 className="font-alexandria font-bold text-base sm:text-lg text-white">تصنيف المستوى المعتمد</h2>
            </div>
            <span className="font-mono-tag text-xs px-2.5 py-1 rounded bg-[#0b0b0d] text-[#b2e01e] border border-[#005cd7] font-black shrink-0">
              {hasTakenTest ? 'CERTIFIED PRO' : 'EVALUATION PENDING'}
            </span>
          </div>

          {hasTakenTest ? (
            <div className="space-y-5 min-w-0">
              <div className="bg-[#0b0b0d] p-4 sm:p-5 rounded border border-[var(--card-border)] text-center space-y-4 min-w-0">
                <div className="flex justify-center items-center py-1">
                  <div className="flex items-center justify-center gap-3">
                    <Icons02Vector className="w-16 h-16 sm:w-20 sm:h-20 shrink-0" />
                    <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded bg-[#16161a] border-2 border-[#b2e01e]">
                      <span className="text-[10px] font-mono-tag text-[#b2e01e] font-bold">LEVEL</span>
                      <span className="font-alexandria font-black text-2xl sm:text-3xl text-white leading-none">
                        {code}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-alexandria font-black text-base sm:text-lg text-white break-words">
                    {levelInfo.titleAr}
                  </h3>
                  <p className="text-xs text-[#b2e01e] font-mono-tag font-bold">
                    {levelInfo.playtomicTier} • Playtomic {levelInfo.playtomicEquivalent}
                  </p>
                  <p className="text-xs text-[#f2f7ff]/75 leading-relaxed pt-1 break-words">
                    {levelInfo.descriptionAr}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--card-border)] space-y-3">
                  <div className="space-y-1 text-right">
                    <div className="flex justify-between text-xs font-mono-tag">
                      <span className="text-white/70">TOTAL SCORE</span>
                      <span className="text-white font-bold">{totalScoreVal} / 80</span>
                    </div>
                    <div className="w-full h-2 bg-[#16161a] rounded overflow-hidden border border-white/10">
                      <div 
                        className="h-full bg-[#b2e01e] transition-all duration-300" 
                        style={{ width: `${(totalScoreVal / 80) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-right">
                    <div className="flex justify-between text-xs font-mono-tag">
                      <span className="text-white/70">TECHNICAL ACCURACY</span>
                      <span className="text-[#b2e01e] font-bold">{accuracyPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#16161a] rounded overflow-hidden border border-white/10">
                      <div 
                        className="h-full bg-[#b2e01e] transition-all duration-300" 
                        style={{ width: `${accuracyPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 font-mono-tag">
                <button
                  onClick={() => navigateTo('test-result')}
                  className="btn-outline-ink py-2.5 text-center text-xs font-bold justify-center"
                >
                  تقرير التحليل الفني
                </button>
                <button
                  onClick={() => navigateTo('level-test')}
                  className="btn-neon py-2.5 text-center text-xs font-black justify-center"
                >
                  إعادة الاختبار
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#0b0b0d] border border-[var(--card-border)] p-6 rounded text-center space-y-4 min-w-0">
              <div className="flex justify-center">
                <AngledRacketIllustration className="w-16 h-16 opacity-70" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-alexandria font-bold text-white text-sm sm:text-base break-words">
                  مرحباً بك! ابدأ رحلتك الاحترافية في البادل
                </h3>
                <p className="text-xs text-[#f2f7ff]/70 leading-relaxed max-w-xs mx-auto break-words">
                  أكمل اختبار تحديد المستوى المكون من 20 سؤالاً تشخيصياً لفتح تصنيفك الرسمي المعتمد، وتحرير برنامجك التدريبي المخصص.
                </p>
              </div>
              <button
                onClick={() => navigateTo('level-test')}
                className="btn-neon w-full py-3 text-xs font-black justify-center"
              >
                <Zap className="w-4 h-4 fill-[#0b0b0d]" />
                <span>ابدأ اختبار تحديد المستوى</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column (7 cols): Quick Hub Navigation */}
        <div className="lg:col-span-7 space-y-5 min-w-0">
          
          {/* Quick Hub Navigation Cards */}
          <div className="card-dark p-4 sm:p-6 rounded border border-[var(--card-border)] bg-[#16161a] space-y-4 min-w-0">
            <div className="border-b border-[var(--card-border)] pb-2.5">
              <span className="label-mono mb-0.5" style={{ color: '#b2e01e' }}>[ QUICK COMMAND HUB ]</span>
              <h3 className="font-alexandria font-bold text-sm sm:text-base text-white">الوصول السريع إلى الأقسام الفنية:</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
              <button
                onClick={() => navigateTo('my-training-program')}
                className="p-3.5 rounded bg-[#0b0b0d] hover:border-[#b2e01e] border border-[var(--card-border)] text-right transition-colors flex items-center justify-between group min-w-0"
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e] truncate">برنامجي التدريبي المخصص</h4>
                  <p className="text-[11px] text-[#f2f7ff]/70 truncate">جدول التمارين وإرشادات الكوتش</p>
                </div>
                <div className="w-8 h-8 rounded bg-[#16161a] text-[#b2e01e] border border-[var(--card-border)] flex items-center justify-center shrink-0 mr-2 group-hover:bg-[#b2e01e] group-hover:text-[#0b0b0d] transition-colors">
                  <Trophy className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={() => navigateTo('learn-padel')}
                className="p-3.5 rounded bg-[#0b0b0d] hover:border-[#b2e01e] border border-[var(--card-border)] text-right transition-colors flex items-center justify-between group min-w-0"
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e] truncate">موسوعة المهارات والتكنيك</h4>
                  <p className="text-[11px] text-[#f2f7ff]/70 truncate">البانديخا، الفيبورا وقراءة الزجاج</p>
                </div>
                <div className="w-8 h-8 rounded bg-[#16161a] text-[#b2e01e] border border-[var(--card-border)] flex items-center justify-center shrink-0 mr-2 group-hover:bg-[#b2e01e] group-hover:text-[#0b0b0d] transition-colors">
                  <BookOpen className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={() => navigateTo('progress-tracker')}
                className="p-3.5 rounded bg-[#0b0b0d] hover:border-[#b2e01e] border border-[var(--card-border)] text-right transition-colors flex items-center justify-between group min-w-0"
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e] truncate">متتبع التقدم وسجل التمارين</h4>
                  <p className="text-[11px] text-[#f2f7ff]/70 truncate">تسجيل مدة وشدة الحصص وحفظها</p>
                </div>
                <div className="w-8 h-8 rounded bg-[#16161a] text-[#b2e01e] border border-[var(--card-border)] flex items-center justify-center shrink-0 mr-2 group-hover:bg-[#b2e01e] group-hover:text-[#0b0b0d] transition-colors">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={() => navigateTo('video-tutorials')}
                className="p-3.5 rounded bg-[#0b0b0d] hover:border-[#b2e01e] border border-[var(--card-border)] text-right transition-colors flex items-center justify-between group min-w-0"
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e] truncate">مكتبة الفيديو التدريبية</h4>
                  <p className="text-[11px] text-[#f2f7ff]/70 truncate">تمارين عملية ومحاكاة مواقف اللعب</p>
                </div>
                <div className="w-8 h-8 rounded bg-[#16161a] text-[#b2e01e] border border-[var(--card-border)] flex items-center justify-center shrink-0 mr-2 group-hover:bg-[#b2e01e] group-hover:text-[#0b0b0d] transition-colors">
                  <Play className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={() => navigateTo('rackets')}
                className="p-3.5 rounded bg-[#0b0b0d] hover:border-[#b2e01e] border border-[var(--card-border)] text-right transition-colors flex items-center justify-between group sm:col-span-2 cursor-pointer min-w-0"
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e] truncate">دليل ومضارب البادل المختارة</h4>
                    <span className="text-[9px] font-mono-tag bg-[#b2e01e] text-[#0b0b0d] px-2 py-0.5 rounded font-black shrink-0">18 RACKETS</span>
                  </div>
                  <p className="text-[11px] text-[#f2f7ff]/70 break-words">أفضل المضارب المصنفة لمستواك ومقارنة تقنية واستشارات الشراء</p>
                </div>
                <div className="w-8 h-8 rounded bg-[#16161a] text-[#b2e01e] border border-[var(--card-border)] flex items-center justify-center shrink-0 mr-2 group-hover:bg-[#b2e01e] group-hover:text-[#0b0b0d] transition-colors">
                  <PadelRacketOfficialVector className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          {/* WhatsApp Community Card */}
          <div className="card-dark p-4 sm:p-6 rounded border border-[#25d366]/40 bg-[#16161a] space-y-4 min-w-0">
            <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-3 gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="label-mono mb-0 truncate" style={{ color: '#b2e01e' }}>[ OFFICIAL COMMUNITY ]</span>
                  <h3 className="font-alexandria font-bold text-sm sm:text-base text-white truncate">مجتمع البادل على واتساب</h3>
                </div>
              </div>
              <span className="font-mono-tag text-xs px-2 py-0.5 rounded bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 font-black shrink-0">
                ACTIVE
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#f2f7ff]/80 leading-relaxed font-medium break-words">
              انضم إلى التجمع الرسمي للاعبي ومحترفي البادل في المملكة. تواصل مع مئات اللاعبين، نسق مبارياتك، واكتشف أفضل فرص اقتناء المعدات واستشارات الكوتش.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono-tag min-w-0">
              <div className="p-3 rounded bg-[#0b0b0d] border border-white/10 space-y-1 min-w-0">
                <span className="text-[#b2e01e] font-bold block truncate">📍 تنسيق المباريات</span>
                <p className="text-[11px] text-[#f2f7ff]/70 break-words">مباريات وتحديات يومية في الرياض، جدة والخبر.</p>
              </div>
              <div className="p-3 rounded bg-[#0b0b0d] border border-white/10 space-y-1 min-w-0">
                <span className="text-[#b2e01e] font-bold block truncate">🎾 سوق المضارب</span>
                <p className="text-[11px] text-[#f2f7ff]/70 break-words">بيع ومقايضة المضارب وأفضل عروض المتاجر.</p>
              </div>
              <div className="p-3 rounded bg-[#0b0b0d] border border-white/10 space-y-1 min-w-0">
                <span className="text-[#b2e01e] font-bold block truncate">💬 نقاشات التكنيك</span>
                <p className="text-[11px] text-[#f2f7ff]/70 break-words">استشارات مباشرة وتحليلات فنية مع الكوتش.</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 min-w-0">
              <span className="text-xs text-[#f2f7ff]/70 font-mono-tag break-words">
                انضم لأكثر من 500+ لاعب وبطل بادل نشط ⚡
              </span>
              <a
                href="https://chat.whatsapp.com/CoOQR4oN1jzBrNaLCNOfP5"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon px-5 py-2.5 text-xs font-black flex items-center justify-center gap-2 shrink-0"
              >
                <span>انضم إلى مجموعة الواتساب</span>
              </a>
            </div>
          </div>

          {/* Recommended Next Tactical Steps */}
          <div className="card-dark p-4 sm:p-6 rounded border border-[var(--card-border)] bg-[#16161a] space-y-3.5 min-w-0">
            <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-2.5">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ ACTIVE ACTION ITEMS ]</span>
              <span className="text-[10px] font-mono-tag text-white/70">WEEKLY FOCUS</span>
            </div>
            <h3 className="font-alexandria font-bold text-sm sm:text-base text-white">المهام التدريبية الموصى بها لهذا الأسبوع:</h3>

            <div className="space-y-2 font-mono-tag text-xs min-w-0">
              <div className="p-3 rounded bg-[#0b0b0d] border border-white/15 flex items-center justify-between text-white gap-2 min-w-0">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <CheckCircle2 className="w-4 h-4 text-[#b2e01e] shrink-0" />
                  <span className="font-sans font-semibold break-words">التدرب على الفولي القاطع مع توجيهه للزجاج الجانبي</span>
                </div>
                <span className="text-[#b2e01e] font-bold px-2 py-0.5 rounded bg-[#b2e01e]/10 shrink-0">20 MIN</span>
              </div>

              <div className="p-3 rounded bg-[#0b0b0d] border border-white/15 flex items-center justify-between text-white gap-2 min-w-0">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <CheckCircle2 className="w-4 h-4 text-[#b2e01e] shrink-0" />
                  <span className="font-sans font-semibold break-words">تطبيق مبدأ الحبل المتصل مع زميلك في مباريات نهاية الأسبوع</span>
                </div>
                <span className="text-white/80 font-bold px-2 py-0.5 rounded bg-white/10 shrink-0">TACTICS</span>
              </div>
            </div>
          </div>

          {/* Latest Logged Session Quick Widget */}
          {trainingSessions.length > 0 && (
            <div className="card-dark p-4 sm:p-5 rounded border border-[var(--card-border)] bg-[#16161a] space-y-3 min-w-0">
              <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-2">
                <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ LATEST LOGGED SESSION ]</span>
                <button
                  onClick={() => navigateTo('progress-tracker')}
                  className="text-xs text-[#b2e01e] hover:underline font-bold flex items-center gap-1 shrink-0"
                >
                  <span>عرض السجل كاملاً</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b0b0d] p-3.5 rounded border border-white/10 min-w-0">
                <div className="space-y-1 min-w-0 flex-1">
                  <h4 className="text-white text-xs sm:text-sm font-bold truncate">{trainingSessions[0].focus}</h4>
                  <div className="flex items-center gap-2.5 font-mono-tag text-[10px] text-white/70 flex-wrap">
                    <span className="flex items-center gap-1 shrink-0">
                      <Calendar className="w-3 h-3 text-[#b2e01e]" />
                      {trainingSessions[0].date}
                    </span>
                    <span>•</span>
                    <span className="shrink-0">{trainingSessions[0].durationMinutes} دقيقة</span>
                    {trainingSessions[0].intensity && (
                      <span className="text-[#b2e01e] font-bold shrink-0">({trainingSessions[0].intensity})</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('progress-tracker')}
                  className="btn-neon text-[11px] px-3.5 py-1.5 font-black shrink-0 self-stretch sm:self-auto text-center justify-center"
                >
                  + تسجيل حصة جديدة
                </button>
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
