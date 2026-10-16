import React from 'react';
import { useApp } from '../context/AppContext';
import { PADEL_LEVELS } from '../data/assessmentData';
import { AngledRacketIllustration } from '../components/BrandEquipmentVectors';
import { 
  Trophy, 
  ArrowLeft, 
  Activity, 
  Calendar, 
  BookOpen, 
  PlayCircle,
  Zap,
  Target
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, user, testResult } = useApp();

  return (
    <div className="w-full max-w-7xl mx-auto py-2 sm:py-4 text-right font-alexandria space-y-10 sm:space-y-12 min-w-0">
      
      {/* 1. HERO COCKPIT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-w-0">
        
        {/* Left Column (Hero Content) */}
        <div className="lg:col-span-7 space-y-5 text-right min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16161a] border border-[#b2e01e]">
            <span className="w-2 h-2 rounded-full bg-[#b2e01e]"></span>
            <span className="mono text-[10px] text-[#b2e01e] font-black">PADEL LEVEL BENCHMARK SYSTEM</span>
          </div>

          <h1 className="font-alexandria font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight break-words">
            ما هو مستواك الحقيقي <br />
            في <span className="text-[#b2e01e]">لعبة البادل؟</span>
          </h1>

          <p className="text-sm sm:text-base text-[#f2f7ff]/80 leading-relaxed max-w-xl font-medium break-words">
            اختبار تحديد المستوى الأول المعتمد في الوطن العربي وفق معايير مقياس Playtomic الدولي. قيّم مهاراتك الهجومية والدفاعية وتمركزك التكتيكي واحصل على برنامج تدريبي مصمم خصيصاً لمستواك.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigateTo('level-test')}
              className="btn-action px-6 sm:px-8 py-3.5 text-xs font-black flex items-center justify-center gap-2 cursor-pointer mt-0"
            >
              <span>ابدأ اختبار المستوى الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('my-training-program')}
              className="px-5 sm:px-6 py-3.5 text-xs font-bold bg-[#16161a] hover:bg-[#202025] text-white border border-[var(--card-border)] rounded transition-colors cursor-pointer"
            >
              <span>تصفح البرامج التدريبية المخصصة</span>
            </button>
          </div>
        </div>

        {/* Right Column (Skill Index Card with Official Angled Padel Racket SVG) */}
        <div className="lg:col-span-5 min-w-0">
          <div className="card-dark p-4 sm:p-6 rounded border border-[var(--card-border)] bg-[#16161a] space-y-4 min-w-0">
            
            <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-3">
              <div className="min-w-0">
                <span className="mono text-[10px] text-[#b2e01e] font-bold block">[ SKILL INDEX CARD ]</span>
                <h3 className="font-alexandria font-bold text-base sm:text-lg text-white truncate">بطاقة التقييم الفني</h3>
              </div>
              <span className="font-mono-tag text-[10px] bg-[#0b0b0d] text-[#b2e01e] border border-[#b2e01e] px-2.5 py-1 rounded font-black shrink-0">
                OFFICIAL 2026
              </span>
            </div>

            {/* Official Angled Padel Racket Illustration & Metric Highlight */}
            <div className="bg-[#0b0b0d] p-4 rounded border border-[var(--card-border)] flex items-center justify-between gap-3 min-w-0">
              <div className="min-w-0">
                <p className="text-[10px] font-mono-tag text-white/70 uppercase">CURRENT RATING TIER</p>
                <p className="text-base sm:text-lg font-bold text-white mt-0.5 truncate">المستوى 3: متوسط معتمد</p>
                <p className="text-xs font-mono-tag text-[#b2e01e] mt-0.5 font-bold">Playtomic Level 4.0</p>
              </div>
              <div className="relative flex items-center justify-center shrink-0">
                <AngledRacketIllustration className="w-14 h-14 sm:w-16 sm:h-16" />
              </div>
            </div>

            {/* Numeric Score & Index Accuracy */}
            <div className="flex justify-between items-end pt-1">
              <div>
                <p className="text-[11px] font-mono-tag text-white/70 uppercase">TOTAL SCORE</p>
                <p className="font-alexandria font-black text-2xl sm:text-4xl text-[#b2e01e]">
                  58<span className="text-base sm:text-lg text-white/40">/80</span>
                </p>
              </div>
              <div className="text-left font-mono-tag">
                <span className="text-[11px] text-white/70 block">INDEX ACCURACY</span>
                <span className="text-base text-[#b2e01e] font-black">72.5%</span>
              </div>
            </div>

            {/* Lime Accent Progress bar */}
            <div>
              <div className="h-2 w-full bg-[#0b0b0d] rounded-full overflow-hidden border border-[var(--card-border)]">
                <div className="h-full w-[72.5%] bg-[#b2e01e]"></div>
              </div>
            </div>

            {/* Technical Pillars Breakdown */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs py-1.5 border-b border-[var(--card-border)]">
                <span className="text-white/80">الفولي والشبكة (Volleys)</span>
                <span className="font-mono-tag text-[#b2e01e] font-bold">85%</span>
              </div>
              <div className="flex justify-between text-xs py-1.5 border-b border-[var(--card-border)]">
                <span className="text-white/80">ضربة البانديخا (Bandeja)</span>
                <span className="font-mono-tag text-[#b2e01e] font-bold">65%</span>
              </div>
              <div className="flex justify-between text-xs py-1.5 border-b border-[var(--card-border)]">
                <span className="text-white/80">استخدام الجدران (Glass Walls)</span>
                <span className="font-mono-tag text-[#b2e01e] font-bold">78%</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('level-test')}
              className="btn-action w-full py-3 text-xs font-black flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>ابدأ اختبار تحديد المستوى الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

          </div>
        </div>

      </section>

      {/* 2. STAT-GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-[var(--card-border)] pt-6 sm:pt-8 gap-4 sm:gap-6 text-right">
        <div className="space-y-1 p-3 bg-[#16161a] rounded border border-[var(--card-border)] sm:bg-transparent sm:p-0 sm:border-0">
          <h3 className="font-alexandria font-black text-2xl sm:text-4xl text-white">20</h3>
          <p className="mono text-xs text-[#b2e01e]">سؤالاً فنياً وتكتيكياً</p>
        </div>
        <div className="space-y-1 p-3 bg-[#16161a] rounded border border-[var(--card-border)] sm:bg-transparent sm:p-0 sm:border-0 sm:border-r sm:border-[var(--card-border)] sm:pr-6">
          <h3 className="font-alexandria font-black text-2xl sm:text-4xl text-[#b2e01e]">05</h3>
          <p className="mono text-xs text-[#b2e01e]">مستويات معتمدة رسمياً</p>
        </div>
        <div className="space-y-1 p-3 bg-[#16161a] rounded border border-[var(--card-border)] sm:bg-transparent sm:p-0 sm:border-0 sm:border-r sm:border-[var(--card-border)] sm:pr-6">
          <h3 className="font-alexandria font-black text-2xl sm:text-4xl text-white">100%</h3>
          <p className="mono text-xs text-[#b2e01e]">برامج مخصصة للارتقاء</p>
        </div>
      </div>

      {/* 3. STAGES [01-05] SECTION */}
      <section className="space-y-4 sm:space-y-6">
        <div>
          <span className="mono text-xs text-[#b2e01e] font-bold block mb-1">STAGES [01-05]</span>
          <h2 className="font-alexandria font-black text-xl sm:text-3xl text-white tracking-tight break-words">
            سلم المستويات المعتمد في المنصة
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl break-words">
            المعايير الفنية المطبقة لتصنيف وتقييم لاعبي البادل من التأسيس وحتى الاحتراف التنافسي.
          </p>
        </div>

        <div className="card-dark border border-[var(--card-border)] bg-[#16161a] rounded overflow-hidden divide-y divide-[var(--card-border)]">
          {([1, 2, 3, 4, 5] as const).map((lvl) => {
            const info = PADEL_LEVELS[lvl];
            const code = lvl < 10 ? `0${lvl}` : `${lvl}`;
            const isHighlighted = lvl === 3;
            return (
              <div 
                key={lvl} 
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 transition-colors gap-3 sm:gap-4 ${
                  isHighlighted ? 'bg-[#1a1a20] border-r-4 border-[#b2e01e]' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="font-alexandria font-black text-2xl sm:text-3xl text-white/20 select-none shrink-0">
                    {code}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm sm:text-base text-white break-words">
                        {info.titleAr}
                      </h4>
                      {isHighlighted && (
                        <span className="font-mono-tag text-[9px] text-[#0b0b0d] bg-[#b2e01e] font-black px-2 py-0.5 rounded">
                          POPULAR TIER
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/60 mt-0.5 leading-relaxed break-words">
                      {info.subtitleAr} • خطة {info.recommendedProgramWeeks} أسابيع مكثفة
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <span className="font-mono-tag text-xs font-black px-2.5 py-1 bg-[#0b0b0d] text-[#b2e01e] border border-[var(--card-border)] rounded">
                    {info.minScore}-{info.maxScore} نقطة
                  </span>
                  <button
                    onClick={() => navigateTo('level-test')}
                    className="p-2 rounded bg-[#0b0b0d] hover:bg-[#b2e01e] hover:text-[#0b0b0d] text-white border border-[var(--card-border)] transition-colors cursor-pointer"
                    title="بدء الاختبار لهذا المستوى"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="space-y-4 sm:space-y-6">
        <div>
          <span className="mono text-xs text-[#b2e01e] font-bold block mb-1">FRAMEWORK [3 STEPS]</span>
          <h2 className="font-alexandria font-black text-xl sm:text-3xl text-white break-words">
            كيف ترتقي بمستواك عبر المنصة؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="card-dark p-4 sm:p-5 rounded space-y-3 border border-[var(--card-border)] bg-[#16161a] min-w-0">
            <span className="font-alexandria font-black text-2xl sm:text-3xl text-[#b2e01e]">01</span>
            <h3 className="font-bold text-sm sm:text-base text-white break-words">خض اختبار المستوى التفاعلي</h3>
            <p className="text-xs text-white/70 leading-relaxed break-words">
              20 سؤالاً تخصصياً يقيم كل جانب من ضرباتك الأرضية والهوائية وحركة القدمين وقراءة الزجاج.
            </p>
          </div>

          <div className="card-dark p-4 sm:p-5 rounded space-y-3 border border-[var(--card-border)] bg-[#16161a] min-w-0">
            <span className="font-alexandria font-black text-2xl sm:text-3xl text-[#b2e01e]">02</span>
            <h3 className="font-bold text-sm sm:text-base text-white break-words">اعرف تصنيفك ونقاطك الفنية</h3>
            <p className="text-xs text-white/70 leading-relaxed break-words">
              احصل على رقم مستواك من 1 إلى 5 مع تقرير مفصل لنقاط القوة وأولويات التطوير الفني الأسبوعي.
            </p>
          </div>

          <div className="card-dark p-4 sm:p-5 rounded space-y-3 border border-[var(--card-border)] bg-[#16161a] min-w-0">
            <span className="font-alexandria font-black text-2xl sm:text-3xl text-[#b2e01e]">03</span>
            <h3 className="font-bold text-sm sm:text-base text-white break-words">اتبع خطتك التدريبية وسجّل حصصك</h3>
            <p className="text-xs text-white/70 leading-relaxed break-words">
              برنامج تدريبي متكامل مقسم إلى تكنيك، تكتيك، ومحاكاة مباريات، مع سجل سحابي متصل لحفظ إنجازاتك.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
