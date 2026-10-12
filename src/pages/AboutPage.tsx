import React from 'react';
import { useApp } from '../context/AppContext';
import { Target, Trophy, ArrowLeft, Zap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto py-4 text-right space-y-12 font-alexandria">
      
      {/* Hero Header */}
      <div className="card-dark p-8 sm:p-12 rounded-2xl border border-white/20 space-y-4 shadow-2xl">
        <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ ABOUT PADEL LEVEL PRO ]</span>
        <h1 className="font-alexandria font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
          نحن هنا لنغير طريقة تدريبك <br />
          وتطورك في <span className="text-[#b2e01e]">البادل</span>
        </h1>
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl font-medium">
          وُلدت منصة PadelLevel Pro من واقع معاناة ملايين اللاعبين الذين يمارسون البادل بانتظام لشهور وسنوات، ولكنهم يظلون عالقين في نفس المستوى بسبب غياب التقييم الدقيق والتدريب المنهجي المنظم.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-dark p-8 rounded-2xl border border-white/15 space-y-3 shadow-xl">
          <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ MISSION OBJECTIVE ]</span>
          <h2 className="font-alexandria font-bold text-xl text-white">رسالتنا</h2>
          <p className="text-xs text-white/70 leading-relaxed">
            تمكين كل لاعب بادل في الوطن العربي من معرفة مستواه الحقيقي بنزاهة علمية، وتزويده بالأدوات التكتيكية والبرامج الأسبوعية التي يحتاجها ليقفز بأدائه ويتفوق في المنافسات والبطولات.
          </p>
        </div>

        <div className="card-dark p-8 rounded-2xl border border-white/15 space-y-3 shadow-xl">
          <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ FUTURE VISION ]</span>
          <h2 className="font-alexandria font-bold text-xl text-white">رؤيتنا</h2>
          <p className="text-xs text-white/70 leading-relaxed">
            أن نكون المرجع الرقمي الرياضي الأول لكل لاعب ومدرب ونادٍ للبادل في العالم العربي، عبر إرساء مقاييس معتمدة لتقييم المستويات وتقديم محتوى تدريبي احترافي باللغة العربية.
          </p>
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="card-dark p-8 rounded-2xl border border-white/15 space-y-6 shadow-xl">
        <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ THE FOUR FOUNDATIONS ]</span>
        <h2 className="font-alexandria font-black text-2xl text-white">
          الركائز الأربع التي بنيت عليها المنصة:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="theme-card-solid p-5 rounded-xl border border-white/10 space-y-2">
            <span className="font-mono-tag text-xs text-[#b2e01e] font-bold">PILLAR [01]</span>
            <h3 className="font-bold text-sm text-white">التقييم العلمي الدقيق</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              اختبار متعدد الجوانب يتناول الكفاءة الفنية، الحركة، والتحكم بالضغط العصبي وليس مجرد أسئلة عامة.
            </p>
          </div>

          <div className="theme-card-solid p-5 rounded-xl border border-white/10 space-y-2">
            <span className="font-mono-tag text-xs text-[#b2e01e] font-bold">PILLAR [02]</span>
            <h3 className="font-bold text-sm text-white">برامج تدريب مفصلة للمستويات</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              كل مستوى له أهدافه الخاصة؛ المبتدئ يركز على الثبات والزجاج، بينما المتقدم يركز على الفيبورا والسماتش.
            </p>
          </div>

          <div className="theme-card-solid p-5 rounded-xl border border-white/10 space-y-2">
            <span className="font-mono-tag text-xs text-[#b2e01e] font-bold">PILLAR [03]</span>
            <h3 className="font-bold text-sm text-white">موسوعة تكتيكية مبسطة</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              شرح أسرار ضربات المحترفين باللغة العربية مع التحليل الحركي والخططي وتجنب الأخطاء القاتلة.
            </p>
          </div>

          <div className="theme-card-solid p-5 rounded-xl border border-white/10 space-y-2">
            <span className="font-mono-tag text-xs text-[#b2e01e] font-bold">PILLAR [04]</span>
            <h3 className="font-bold text-sm text-white">الاستمرارية والتوثيق</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              تتبع ساعات اللعب والمهارات المتقنة يحفز اللاعب ويجعله يقيس تطوره بالأرقام والوقائع.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="card-dark p-8 rounded-2xl text-center space-y-4 border border-white/20 shadow-2xl">
        <h3 className="font-alexandria font-black text-2xl text-white">
          انضم لآلاف اللاعبين الذين يتطورون معنا يومياً
        </h3>
        <p className="text-xs text-white/70">
          ابدأ باختبار تحديد مستواك في 5 دقائق فقط واكتشف خطة تدريبك المخصصة.
        </p>
        <button
          onClick={() => navigateTo('level-test')}
          className="btn-neon px-8 py-3.5 text-xs font-black shadow-xl"
        >
          <span>ابدأ اختبار تحديد المستوى</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
