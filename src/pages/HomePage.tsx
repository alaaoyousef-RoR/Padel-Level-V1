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
    <div className="space-y-16 py-4 text-right font-alexandria">
      
      {/* 1. HERO COCKPIT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column (Hero Content) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-card-solid border border-white/15">
            <span className="w-2 h-2 rounded-full bg-[#b2e01e] animate-ping"></span>
            <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>PADEL LEVEL BENCHMARK SYSTEM</span>
          </div>

          <h1 className="font-alexandria font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
            ما هو مستواك الحقيقي <br />
            في <span className="text-[#b2e01e]">لعبة البادل؟</span>
          </h1>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl font-medium">
            اختبار تحديد المستوى الأول المعتمد في الوطن العربي وفق معايير مقياس Playtomic الدولي. قيّم مهاراتك الهجومية والدفاعية وتمركزك التكتيكي واحصل على برنامج تدريبي مصمم خصيصاً لمستواك.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => navigateTo('level-test')}
              className="btn-neon px-8 py-4 text-xs font-black flex items-center justify-center gap-2 shadow-xl"
            >
              <span>ابدأ اختبار المستوى الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('my-training-program')}
              className="btn-outline-ink px-6 py-4 text-xs font-bold"
            >
              <span>تصفح البرامج التدريبية المخصصة</span>
            </button>
          </div>
        </div>

        {/* Right Column (Skill Index Card with Official Angled Padel Racket SVG) */}
        <div className="lg:col-span-5">
          <div className="card-dark p-6 sm:p-8 rounded-3xl relative overflow-hidden space-y-6 border border-white/20 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <span className="label-mono mb-1" style={{ color: '#b2e01e' }}>[ SKILL INDEX CARD ]</span>
                <h3 className="font-alexandria font-bold text-lg text-white">بطاقة التقييم الفني</h3>
              </div>
              <span className="font-mono-tag text-[10px] bg-[#b2e01e]/15 text-[#b2e01e] border border-[#b2e01e]/30 px-2.5 py-1 rounded-full font-black">
                OFFICIAL 2026
              </span>
            </div>

            {/* Official Angled Padel Racket Illustration & Metric Highlight */}
            <div className="theme-card-solid p-5 rounded-2xl border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono-tag text-white/70 uppercase">CURRENT RATING TIER</p>
                <p className="text-lg font-bold text-white mt-0.5">المستوى 3: متوسط معتمد</p>
                <p className="text-xs font-mono-tag text-[#b2e01e] mt-0.5">Playtomic Level 4.0</p>
              </div>
              <div className="relative flex items-center justify-center">
                <AngledRacketIllustration className="w-16 h-16 drop-shadow-lg" />
              </div>
            </div>

            {/* Numeric Score & Index Accuracy */}
            <div className="flex justify-between items-end pt-1">
              <div>
                <p className="text-[11px] font-mono-tag text-white/70 uppercase">TOTAL SCORE</p>
                <p className="font-alexandria font-black text-3xl sm:text-4xl text-[#b2e01e]">
                  58<span className="text-lg text-white/40">/80</span>
                </p>
              </div>
              <div className="text-left font-mono-tag">
                <span className="text-[11px] text-white/70 block">INDEX ACCURACY</span>
                <span className="text-base text-[#b2e01e] font-black">72.5%</span>
              </div>
            </div>

            {/* Lime Accent Progress bar */}
            <div>
              <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/10">
                <div className="h-full w-[72.5%] bg-[#b2e01e] rounded-full shadow-[0_0_12px_#b2e01e]"></div>
              </div>
            </div>

            {/* Technical Pillars Breakdown */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs py-2 border-b border-white/10">
                <span className="text-white/80">الفولي والشبكة (Volleys)</span>
                <span className="font-mono-tag text-[#b2e01e] font-bold">85%</span>
              </div>
              <div className="flex justify-between text-xs py-2 border-b border-white/10">
                <span className="text-white/80">ضربة البانديخا (Bandeja)</span>
                <span className="font-mono-tag text-[#b2e01e] font-bold">65%</span>
              </div>
              <div className="flex justify-between text-xs py-2 border-b border-white/10">
                <span className="text-white/80">استخدام الجدران (Glass Walls)</span>
                <span className="font-mono-tag text-[#b2e01e] font-bold">78%</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('level-test')}
              className="btn-neon w-full py-3.5 text-xs font-black justify-center shadow-lg"
            >
              <span>ابدأ اختبار تحديد المستوى الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

          </div>
        </div>

      </section>

      {/* 2. STAT-GRID */}
      <div className="grid grid-cols-3 border-t border-white/15 pt-8 gap-6 text-right">
        <div className="space-y-1">
          <h3 className="font-alexandria font-black text-3xl sm:text-4xl text-white">20</h3>
          <p className="label-mono mb-0" style={{ color: '#b2e01e' }}>سؤالاً فنياً وتكتيكياً</p>
        </div>
        <div className="space-y-1 border-r border-white/15 pr-6">
          <h3 className="font-alexandria font-black text-3xl sm:text-4xl text-[#b2e01e]">05</h3>
          <p className="label-mono mb-0" style={{ color: '#b2e01e' }}>مستويات معتمدة رسمياً</p>
        </div>
        <div className="space-y-1 border-r border-white/15 pr-6">
          <h3 className="font-alexandria font-black text-3xl sm:text-4xl text-white">100%</h3>
          <p className="label-mono mb-0" style={{ color: '#b2e01e' }}>برامج مخصصة للارتقاء</p>
        </div>
      </div>

      {/* 3. STAGES [01-05] SECTION */}
      <section className="space-y-6">
        <div>
          <span className="label-mono" style={{ color: '#b2e01e' }}>STAGES [01-05]</span>
          <h2 className="font-alexandria font-black text-2xl sm:text-3xl text-white tracking-tight">
            سلم المستويات المعتمد في المنصة
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl">
            المعايير الفنية المطبقة لتصنيف وتقييم لاعبي البادل من التأسيس وحتى الاحتراف التنافسي.
          </p>
        </div>

        <div className="card-dark border border-white/15 rounded-3xl overflow-hidden divide-y divide-white/10 shadow-2xl">
          {([1, 2, 3, 4, 5] as const).map((lvl) => {
            const info = PADEL_LEVELS[lvl];
            const code = lvl < 10 ? `0${lvl}` : `${lvl}`;
            const isHighlighted = lvl === 3;
            return (
              <div 
                key={lvl} 
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 transition-all hover:bg-white/[0.04] gap-4 ${
                  isHighlighted ? 'theme-card-solid border-r-4 border-[#b2e01e]' : ''
                }`}
              >
                <div className="flex items-center gap-5">
                  <span className="font-alexandria font-black text-3xl sm:text-4xl text-white/20 select-none">
                    {code}
                  </span>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h4 className="font-bold text-sm sm:text-base text-white">
                        {info.titleAr}
                      </h4>
                      {isHighlighted && (
                        <span className="font-mono-tag text-[9px] text-[#002255] bg-[#b2e01e] font-black px-2 py-0.5 rounded-full">
                          POPULAR TIER
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/60 mt-1 leading-relaxed">
                      {info.subtitleAr} • خطة {info.recommendedProgramWeeks} أسابيع مكثفة
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="font-mono-tag text-xs font-black px-3 py-1 theme-card-solid text-[#b2e01e] border border-white/15 rounded-lg">
                    {info.minScore}-{info.maxScore} نقطة
                  </span>
                  <button
                    onClick={() => navigateTo('level-test')}
                    className="btn-outline-ink text-xs p-2.5 rounded-lg"
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
      <section className="space-y-6">
        <div>
          <span className="label-mono" style={{ color: '#b2e01e' }}>FRAMEWORK [3 STEPS]</span>
          <h2 className="font-alexandria font-black text-2xl sm:text-3xl text-white">
            كيف ترتقي بمستواك عبر المنصة؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-dark p-6 rounded-3xl space-y-4 border border-white/15 shadow-xl">
            <span className="font-alexandria font-black text-3xl text-[#b2e01e]">01</span>
            <h3 className="font-bold text-base text-white">خض اختبار المستوى التفاعلي</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              20 سؤالاً تخصصياً يقيم كل جانب من ضرباتك الأرضية والهوائية وحركة القدمين وقراءة الزجاج.
            </p>
          </div>

          <div className="card-dark p-6 rounded-3xl space-y-4 border border-white/15 shadow-xl">
            <span className="font-alexandria font-black text-3xl text-[#b2e01e]">02</span>
            <h3 className="font-bold text-base text-white">اعرف تصنيفك ونقاطك الفنية</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              احصل على رقم مستواك من 1 إلى 5 مع تقرير مفصل لنقاط القوة وأولويات التطوير الفني الأسبوعي.
            </p>
          </div>

          <div className="card-dark p-6 rounded-3xl space-y-4 border border-white/15 shadow-xl">
            <span className="font-alexandria font-black text-3xl text-[#b2e01e]">03</span>
            <h3 className="font-bold text-base text-white">اتبع خطتك التدريبية وسجّل حصصك</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              برنامج تدريبي متكامل مقسم إلى تكنيك، تكتيك، ومحاكاة مباريات، مع سجل سحابي متصل لحفظ إنجازاتك.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
