import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="w-full max-w-5xl mx-auto py-2 sm:py-4 text-right space-y-5 sm:space-y-6 font-alexandria min-w-0">
      
      {/* Hero Header */}
      <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] space-y-4 relative overflow-hidden min-w-0">
        <div className="absolute top-0 right-0 w-2 h-full bg-[#b2e01e]"></div>
        <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ ABOUT PADEL LEVEL PRO ]</span>
        <h1 className="font-alexandria font-black text-xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight break-words">
          نحن هنا لنغير طريقة تدريبك <br className="hidden sm:inline" />
          وتطورك في <span className="text-[#b2e01e]">البادل</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#f2f7ff]/80 leading-relaxed max-w-2xl font-medium break-words">
          وُلدت منصة PadelLevel Pro من واقع معاناة ملايين اللاعبين الذين يمارسون البادل بانتظام لشهور وسنوات، ولكنهم يظلون عالقين في نفس المستوى بسبب غياب التقييم الدقيق والتدريب المنهجي المنظم.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 min-w-0">
        <div className="card-dark p-4 sm:p-6 rounded border border-[var(--card-border)] bg-[#16161a] space-y-2.5 min-w-0">
          <span className="label-mono mb-0 truncate" style={{ color: '#b2e01e' }}>[ MISSION OBJECTIVE ]</span>
          <h2 className="font-alexandria font-bold text-base sm:text-lg text-white break-words">رسالتنا</h2>
          <p className="text-xs text-[#f2f7ff]/75 leading-relaxed font-medium break-words">
            تمكين كل لاعب بادل في الوطن العربي من معرفة مستواه الحقيقي بنزاهة علمية، وتزويده بالأدوات التكتيكية والبرامج الأسبوعية التي يحتاجها ليقفز بأدائه ويتفوق في المنافسات والبطولات.
          </p>
        </div>

        <div className="card-dark p-4 sm:p-6 rounded border border-[var(--card-border)] bg-[#16161a] space-y-2.5 min-w-0">
          <span className="label-mono mb-0 truncate" style={{ color: '#b2e01e' }}>[ FUTURE VISION ]</span>
          <h2 className="font-alexandria font-bold text-base sm:text-lg text-white break-words">رؤيتنا</h2>
          <p className="text-xs text-[#f2f7ff]/75 leading-relaxed font-medium break-words">
            أن نكون المرجع الرقمي الرياضي الأول لكل لاعب ومدرب ونادٍ للبادل في العالم العربي، عبر إرساء مقاييس معتمدة لتقييم المستويات وتقديم محتوى تدريبي احترافي باللغة العربية.
          </p>
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] space-y-4 sm:space-y-5 min-w-0">
        <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ THE FOUR FOUNDATIONS ]</span>
        <h2 className="font-alexandria font-black text-lg sm:text-2xl text-white break-words">
          الركائز الأربع التي بنيت عليها المنصة:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 min-w-0">
          <div className="p-3.5 sm:p-4 rounded border border-[var(--card-border)] bg-[#0b0b0d] space-y-1.5 min-w-0">
            <span className="font-mono-tag text-xs text-[#b2e01e] font-bold">PILLAR [01]</span>
            <h3 className="font-bold text-sm text-white break-words">التقييم العلمي الدقيق</h3>
            <p className="text-xs text-[#f2f7ff]/75 leading-relaxed break-words font-medium">
              اختبار متعدد الجوانب يتناول الكفاءة الفنية، الحركة، والتحكم بالضغط العصبي وليس مجرد أسئلة عامة.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded border border-[var(--card-border)] bg-[#0b0b0d] space-y-1.5 min-w-0">
            <span className="font-mono-tag text-xs text-[#b2e01e] font-bold">PILLAR [02]</span>
            <h3 className="font-bold text-sm text-white break-words">برامج تدريب مفصلة للمستويات</h3>
            <p className="text-xs text-[#f2f7ff]/75 leading-relaxed break-words font-medium">
              كل مستوى له أهدافه الخاصة؛ المبتدئ يركز على الثبات والزجاج، بينما المتقدم يركز على الفيبورا والسماتش.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded border border-[var(--card-border)] bg-[#0b0b0d] space-y-1.5 min-w-0">
            <span className="font-mono-tag text-xs text-[#b2e01e] font-bold">PILLAR [03]</span>
            <h3 className="font-bold text-sm text-white break-words">موسوعة تكتيكية مبسطة</h3>
            <p className="text-xs text-[#f2f7ff]/75 leading-relaxed break-words font-medium">
              شرح أسرار ضربات المحترفين باللغة العربية مع التحليل الحركي والخططي وتجنب الأخطاء القاتلة.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded border border-[var(--card-border)] bg-[#0b0b0d] space-y-1.5 min-w-0">
            <span className="font-mono-tag text-xs text-[#b2e01e] font-bold">PILLAR [04]</span>
            <h3 className="font-bold text-sm text-white break-words">الاستمرارية والتوثيق</h3>
            <p className="text-xs text-[#f2f7ff]/75 leading-relaxed break-words font-medium">
              تتبع ساعات اللعب والمهارات المتقنة يحفز اللاعب ويجعله يقيس تطوره بالأرقام والوقائع.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="card-dark p-6 sm:p-8 rounded text-center space-y-3.5 border border-[var(--card-border)] bg-[#16161a] min-w-0">
        <h3 className="font-alexandria font-black text-lg sm:text-2xl text-white break-words">
          انضم لآلاف اللاعبين الذين يتطورون معنا يومياً
        </h3>
        <p className="text-xs text-[#f2f7ff]/70 max-w-lg mx-auto break-words">
          ابدأ باختبار تحديد مستواك في 5 دقائق فقط واكتشف خطة تدريبك المخصصة.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigateTo('level-test')}
            className="btn-neon px-8 py-3 text-xs font-black inline-flex items-center gap-2 cursor-pointer"
          >
            <span>ابدأ اختبار تحديد المستوى</span>
            <ArrowLeft className="w-3.5 h-3.5 text-[#0b0b0d]" />
          </button>
        </div>
      </div>

    </div>
  );
};
