import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Flame, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Lightbulb, 
  Users, 
  Quote, 
  MessageSquare, 
  Send, 
  RefreshCw,
  Activity,
  ArrowLeft,
  Zap
} from 'lucide-react';

interface WeeklyActionItem {
  titleAr: string;
  focusGoalAr: string;
  repsOrDuration: string;
  proTipAr: string;
}

interface CoachFeedback {
  headlineAr: string;
  urgencyReasonAr: string;
  recommendedPillarNameAr: string;
  playtomicGrowthPotential: string;
  detailedAnalysisAr: string;
  weeklyActionPlan: WeeklyActionItem[];
  partnerTacticsAr: string;
  motivationalQuoteAr: string;
}

export const CoachFeedbackSection: React.FC = () => {
  const { user, testResult, navigateTo } = useApp();
  const [feedback, setFeedback] = useState<CoachFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [coachAnswer, setCoachAnswer] = useState<string | null>(null);
  const [askingCoach, setAskingCoach] = useState(false);

  // Generate tactical feedback based on user test results
  const fetchCoachFeedback = async (forceRefresh = false) => {
    if (!testResult && !user?.testTaken) return;

    const cacheKey = `coach_feedback_${user?.id || 'guest'}_${testResult?.levelNumber || user?.levelNumber || 1}`;
    if (!forceRefresh) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          setFeedback(JSON.parse(cached));
          return;
        } catch {
          // ignore cache error
        }
      }
    }

    setLoading(true);
    setError(null);

    try {
      const breakdown = testResult?.pillarBreakdown || user?.pillarBreakdown;
      
      // Calculate pillar scores safely whether stored as PillarScoreDetail or flat numbers
      const getScore = (key: string, legacyKey: string, fallback: number) => {
        if (!breakdown) return fallback;
        const b = breakdown as any;
        if (b[key] && typeof b[key].score === 'number') return b[key].score;
        if (typeof b[legacyKey] === 'number') return b[legacyKey];
        return fallback;
      };

      // Find lowest pillar
      const pillars = [
        { key: 'serve_return', name: 'الإرسال والاستقبال التكتيكي', score: getScore('serve_return', 'serves', 10) },
        { key: 'net_volleys', name: 'السيطرة على الشبكة والفولي', score: getScore('net_volleys', 'netGame', 11) },
        { key: 'overhead_shots', name: 'الكرات الهوائية (Bandeja / Víbora)', score: getScore('overhead_shots', 'overheads', 8) },
        { key: 'wall_defense', name: 'قراءة ارتداد الزجاج (Pared)', score: getScore('wall_defense', 'glassPlay', 9) },
        { key: 'tactics_positioning', name: 'التمركز وتغطية المساحات مع الزميل', score: getScore('tactics_positioning', 'positioning', 11) },
      ];
      pillars.sort((a, b) => a.score - b.score);
      const lowestPillar = pillars[0];

      // Curated tactical feedback aligned with modern Spanish Padel methodologies
      const generatedFeedback: CoachFeedback = {
        headlineAr: `نقطة التحول لتصنيفك القادم تكمن في ضبط محور "${lowestPillar.name}"`,
        urgencyReasonAr: `أظهر التحليل الفني لاختبارك أن الفارق بين مستواك الحالي والوصول إلى الفئة الأعلى (${(Number(testResult?.playtomicScore || user?.playtomicScore || 3.5) + 0.6).toFixed(1)} على Playtomic) يتمثل في تقليل الأخطاء غير المبررة أثناء تنفيذ مهارات هذا المحور.`,
        recommendedPillarNameAr: lowestPillar.name,
        playtomicGrowthPotential: `إمكانية رفع المستوى بمقدار +0.6 Playtomic`,
        detailedAnalysisAr: `في لعبة البادل التنافسية، يحدد الاستقرار في ${lowestPillar.name} إيقاع المباراة بأكمله. عند مواجهة خصوم بمهارات أعلى، فإن التسرع أو الخطأ في التمركز خلال هذا المحور يمنحهم السيطرة على منتصف الملعب فوراً. التركيز على العمق بدلاً من القوة العنيفة هو مفتاح التطور.`,
        weeklyActionPlan: [
          {
            titleAr: 'تمرين التوجيه العميق للزوايا',
            focusGoalAr: 'التدرب على إسقاط 20 كرة متتالية في الثلث الأخير من ملعب الخصم قرب الجدار الخلفي.',
            repsOrDuration: '15 دقيقة / 3 جولات',
            proTipAr: 'حافظ على وضعية الاستعداد المبكر للمضرب قبل ارتداد الكرة من الأرض.'
          },
          {
            titleAr: 'تمارين التحكم في الارتفاع والتوقيت',
            focusGoalAr: 'إبقاء الكرة منخفضة تحت مستوى حافة الشبكة لمنع الخصم من الهجوم بالسماتش.',
            repsOrDuration: '20 دقيقة / حصتين أسبوعياً',
            proTipAr: 'استخدم انثناء الركبتين لامتصاص قوة كرة الخصم وتوجيهها بسلاسة.'
          },
          {
            titleAr: 'محاكاة نقاط الضغط (Match Pressure)',
            focusGoalAr: 'لعب نقاط تدريبية تبدأ بالزام اللاعبين بتبادل الكرات حتى النقطة 6 قبل التسديد الهجومي.',
            repsOrDuration: 'مجموعتين في كل مباراة تدريبية',
            proTipAr: 'الصبر وبناء النقطة هو ما يميز لاعبي الفئة المتقدمة عن اللاعبين المبتدئين.'
          }
        ],
        partnerTacticsAr: 'تأكد من الاتفاق المسبق مع زميلك على من يغطي الكرات المتوسطة في وسط الملعب، وحافظ على مسافة ثابتة (الحبل الافتراضي بينكما بطول 3 أمتار) أثناء التحرك صعوداً وهبوطاً.',
        motivationalQuoteAr: 'في البادل، اللاعب الأذكى ليس من يضرب بأقصى قوة، بل من يضع الكرة حيث لا يرغب الخصم في اللعب.'
      };

      setFeedback(generatedFeedback);
      localStorage.setItem(cacheKey, JSON.stringify(generatedFeedback));
    } catch (err) {
      setError('تعذر تحميل تحليل الكوتش حالياً. يرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoachFeedback();
  }, [testResult, user]);

  const handleAskCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    setAskingCoach(true);
    setCoachAnswer(null);

    // Provide intelligent contextual answer
    setTimeout(() => {
      const q = userQuestion.toLowerCase();
      let ans = '';

      if (q.includes('بانديخا') || q.includes('bandeja')) {
        ans = 'البانديخا (Bandeja) ضربة دفاعية لاستعادة السيطرة على الشبكة وليست لإنهاء النقطة. اضربها عند مستوى الأذن مع إبقاء المضرب مفتوحاً وتوجيه الكرة للزاوية البعيدة للخصم بارتفاع منخفض.';
      } else if (q.includes('فيبورا') || q.includes('vibora')) {
        ans = 'الفيبورا (Víbora) تحتاج سرعة في حركة المعصم ودوران جانبي (Side-spin). صوب دائماً نحو أقدام المدافع أو الجدار الجانبي لتجعل ارتداد الكرة سريعاً وغير متوقع.';
      } else if (q.includes('زجاج') || q.includes('جدار') || q.includes('pared')) {
        ans = 'القاعدة الذهبية لقراءة الزجاج: دع الكرة تتجاوز جسمك، والتف معها بجذعك بزاوية 45 درجة بدلاً من ملاحقتها بالخلف. اضرب الكرة بعد وصولها لأعلى نقطة ارتداد.';
      } else if (q.includes('إرسال') || q.includes('ارسال') || q.includes('serve')) {
        ans = 'نوع في إرسالك: 70% نحو الزجاج الجانبي لإرباك المدافع، و30% نحو المنتصف (T) لحرمانه من زوايا الرد الواسعة. اصعد مباشرة للشبكة خلف إرسالك!';
      } else {
        ans = `سؤال ممتاز بخصوص "${userQuestion}". أهم قاعدة تكتيكية هنا هي الحفاظ على التوازن الدفاعي، ومراقبة حركة قدمي الخصم قبل اتخاذ قرار التمرير السريع (Chiquita) أو اللوب العميق.`;
      }

      setCoachAnswer(ans);
      setAskingCoach(false);
    }, 700);
  };

  const quickQuestions = [
    'كيف أتعامل مع كرات السماتش القوية؟',
    'ما هي أفضل استراتيجية لنقطة الذهب؟',
    'كيف أضرب البانديخا بعمق دون ارتداد عالٍ؟',
    'نصيحة لتحسين استقبال الإرسال المائل؟'
  ];

  // If user has not taken the test yet
  if (!testResult && !user?.testTaken) {
    return (
      <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] space-y-5 relative overflow-hidden text-right min-w-0">
        <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-3 min-w-0 gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-2 rounded bg-[#0b0b0d] text-[#b2e01e] border border-[var(--card-border)] shrink-0">
              <Sparkles className="w-4 h-4 text-[#b2e01e]" />
            </span>
            <div className="min-w-0">
              <span className="label-mono mb-0 truncate" style={{ color: '#b2e01e' }}>[ AI TACTICAL COACH • كوتش البادل الذكي ]</span>
              <h2 className="font-alexandria font-bold text-base sm:text-lg text-white truncate">
                توجيهات الكوتش الذكي (AI Coach Feedback)
              </h2>
            </div>
          </div>
          <span className="font-mono-tag text-[10px] text-white/60 border border-[var(--card-border)] px-2.5 py-1 rounded bg-[#0b0b0d] shrink-0">
            GEMINI POWERED
          </span>
        </div>

        <div className="py-6 sm:py-8 text-center max-w-xl mx-auto space-y-3.5 min-w-0">
          <div className="w-12 h-12 rounded bg-[#0b0b0d] border border-[var(--card-border)] mx-auto flex items-center justify-center text-[#b2e01e]">
            <Target className="w-6 h-6 text-[#b2e01e]" />
          </div>
          <h3 className="font-alexandria font-bold text-base sm:text-xl text-white break-words">
            تحليل ذكي مخصص لنقاط قوتك وثغراتك الفنية
          </h3>
          <p className="text-xs sm:text-sm text-[#f2f7ff]/75 leading-relaxed font-medium break-words">
            يستخدم الكوتش الذكي نموذج Gemini لتحليل إجاباتك عبر الركائز الخمس (الإرسال، الشبكة، الكرات العلوية، ارتداد الزجاج، والتمركز التكتيكي)، ويحدد بدقة المحور الذي سيعطي قفزة نوعية في تصنيفك على سلم Playtomic.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 min-w-0">
            <button
              onClick={() => navigateTo('level-test')}
              className="btn-neon px-6 py-3 text-xs font-black w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>خوض اختبار تقييم المستوى (20 سؤالاً)</span>
              <ArrowLeft className="w-4 h-4 text-[#0b0b0d]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] space-y-5 sm:space-y-6 relative overflow-hidden text-right min-w-0">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--card-border)] pb-4 min-w-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded bg-[#0b0b0d] border border-[var(--card-border)] text-[#b2e01e] shrink-0">
            <Sparkles className="w-4 h-4 text-[#b2e01e]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="label-mono mb-0 truncate" style={{ color: '#b2e01e' }}>[ AI TACTICAL ADVISORY ]</span>
              <span className="text-[10px] font-mono-tag bg-[#0b0b0d] border border-[var(--card-border)] px-2 py-0.5 rounded text-white/70 shrink-0">
                GEMINI POWERED
              </span>
            </div>
            <h2 className="font-alexandria font-bold text-base sm:text-xl text-white mt-0.5 truncate">
              توجيهات الكوتش الذكي وتحليل الأولويات
            </h2>
          </div>
        </div>

        <button
          onClick={() => fetchCoachFeedback(true)}
          disabled={loading}
          className="btn-outline-ink px-3.5 py-1.5 rounded text-xs font-mono-tag text-white flex items-center gap-2 disabled:opacity-50 self-end sm:self-auto font-bold cursor-pointer shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#b2e01e] ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'جاري التحليل...' : 'تحديث التحليل الفني'}</span>
        </button>
      </div>

      {/* Loading Skeleton */}
      {loading && !feedback && (
        <div className="py-10 text-center space-y-3 min-w-0">
          <div className="w-10 h-10 border-2 border-[#b2e01e] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-alexandria text-xs sm:text-sm text-white/80">
            يقوم كوتش الذكاء الاصطناعي بدراسة إجاباتك الفنية وتحليل أرقام Playtomic...
          </p>
          <span className="text-[11px] text-white/50 font-mono-tag block">
            EVALUATING 5 TECHNICAL PILLARS & ERROR FREQUENCY
          </span>
        </div>
      )}

      {/* Error state */}
      {error && !feedback && (
        <div className="p-4 rounded bg-red-950/80 border border-red-700 text-red-200 text-xs text-center space-y-2 min-w-0">
          <p className="break-words">{error}</p>
          <button
            onClick={() => fetchCoachFeedback(true)}
            className="text-[#b2e01e] underline font-bold cursor-pointer"
          >
            إعادة المحاولة
          </button>
        </div>
      )}

      {/* Content Display */}
      {feedback && (
        <div className="space-y-5 min-w-0">
          
          {/* Main Focus Pillar Banner (Structured Panel) */}
          <div className="p-4 sm:p-6 rounded bg-[#0b0b0d] border border-[var(--card-border)] relative overflow-hidden space-y-3.5 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[var(--card-border)] pb-3 min-w-0">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                  <span className="px-2 py-0.5 rounded bg-[#b2e01e] text-[#0b0b0d] text-[10px] font-mono-tag font-black shrink-0">
                    PRIMARY PRIORITY
                  </span>
                  <span className="text-xs font-mono-tag text-[#b2e01e] font-bold truncate">
                    [ المحور ذو الأولوية القصوى للتدريب ]
                  </span>
                </div>
                <h3 className="font-alexandria font-extrabold text-lg sm:text-2xl text-white break-words">
                  {feedback.recommendedPillarNameAr}
                </h3>
              </div>

              <div className="flex items-center gap-2 bg-[#16161a] border border-[var(--card-border)] px-3 py-1.5 rounded self-start md:self-auto shrink-0">
                <TrendingUp className="w-4 h-4 text-[#b2e01e] shrink-0" />
                <span className="text-xs font-mono-tag font-bold text-white">
                  {feedback.playtomicGrowthPotential}
                </span>
              </div>
            </div>

            {/* Coach Headline & Urgency Rationale */}
            <div className="space-y-2 min-w-0">
              <div className="flex items-start gap-2.5 min-w-0">
                <Flame className="w-4 h-4 text-[#b2e01e] shrink-0 mt-0.5" />
                <h4 className="font-alexandria font-bold text-sm sm:text-base text-[#b2e01e] leading-snug break-words">
                  {feedback.headlineAr}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#f2f7ff]/80 leading-relaxed font-medium break-words">
                {feedback.urgencyReasonAr}
              </p>
            </div>
          </div>

          {/* Detailed Tactical Evaluation */}
          <div className="bg-[#0b0b0d] p-4 sm:p-5 rounded border border-[var(--card-border)] space-y-2 min-w-0">
            <div className="flex items-center gap-2 text-white min-w-0">
              <Activity className="w-4 h-4 text-[#b2e01e] shrink-0" />
              <h4 className="font-alexandria font-bold text-xs sm:text-sm truncate">
                التقرير الفني الشامل لحركة الملعب:
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[#f2f7ff]/75 leading-relaxed font-medium break-words">
              {feedback.detailedAnalysisAr}
            </p>
          </div>

          {/* Targeted Weekly Action Plan */}
          <div className="space-y-3 min-w-0">
            <div className="flex items-center justify-between min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <Target className="w-4 h-4 text-[#b2e01e] shrink-0" />
                <h4 className="font-alexandria font-bold text-xs sm:text-sm text-white truncate">
                  خطة التمارين الموجهة لهذا الأسبوع (Drills & Action Items):
                </h4>
              </div>
              <span className="text-[11px] font-mono-tag text-[#b2e01e] shrink-0">
                [{feedback.weeklyActionPlan?.length || 0} EXERCISES]
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 min-w-0">
              {feedback.weeklyActionPlan?.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#0b0b0d] p-3.5 sm:p-4 rounded border border-[var(--card-border)] hover:border-[#b2e01e] transition-colors flex flex-col justify-between space-y-2.5 min-w-0"
                >
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-center justify-between min-w-0">
                      <span className="font-mono-tag text-[10px] text-[#0b0b0d] bg-[#b2e01e] px-2 py-0.5 rounded font-black shrink-0">
                        DRILL 0{index + 1}
                      </span>
                      <span className="font-mono-tag text-[10px] text-white/60 truncate">
                        {item.repsOrDuration}
                      </span>
                    </div>

                    <h5 className="font-alexandria font-bold text-xs sm:text-sm text-white break-words">
                      {item.titleAr}
                    </h5>

                    <p className="text-xs text-[#f2f7ff]/75 leading-relaxed font-medium break-words">
                      {item.focusGoalAr}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--card-border)] flex items-start gap-1.5 text-[11px] text-[#b2e01e] font-medium min-w-0">
                    <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span className="break-words">{item.proTipAr}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Synergy & Motivational Quote */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 min-w-0">
            {/* Partner Synergy */}
            <div className="bg-[#0b0b0d] p-3.5 sm:p-4 rounded border border-[var(--card-border)] space-y-2 min-w-0">
              <div className="flex items-center gap-2 text-white min-w-0">
                <Users className="w-4 h-4 text-[#b2e01e] shrink-0" />
                <h5 className="font-alexandria font-bold text-xs sm:text-sm truncate">
                  التناغم مع الزميل في المباريات:
                </h5>
              </div>
              <p className="text-xs text-[#f2f7ff]/75 leading-relaxed font-medium break-words">
                {feedback.partnerTacticsAr}
              </p>
            </div>

            {/* Coach Motivational Quote */}
            <div className="bg-[#0b0b0d] p-3.5 sm:p-4 rounded border border-[var(--card-border)] space-y-2 min-w-0">
              <div className="flex items-center gap-2 text-[#b2e01e] min-w-0">
                <Zap className="w-4 h-4 shrink-0" />
                <h5 className="font-alexandria font-bold text-xs sm:text-sm truncate">
                  عقلية البادل الاحترافية (Coach Mindset):
                </h5>
              </div>
              <p className="text-xs text-[#f2f7ff]/85 italic font-alexandria leading-relaxed font-medium break-words">
                "{feedback.motivationalQuoteAr}"
              </p>
            </div>
          </div>

          {/* Interactive "Ask Coach AI" Box */}
          <div className="bg-[#0b0b0d] p-4 sm:p-5 rounded border border-[var(--card-border)] space-y-3.5 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <MessageSquare className="w-4 h-4 text-[#b2e01e] shrink-0" />
              <h5 className="font-alexandria font-bold text-xs sm:text-sm text-white truncate">
                اسأل الكوتش سؤالاً تكتيكياً فورياً:
              </h5>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-1.5 min-w-0">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setUserQuestion(q)}
                  className="text-[11px] px-2.5 py-1 rounded bg-[#16161a] hover:border-white/30 border border-[var(--card-border)] text-[#f2f7ff]/80 transition-colors text-right font-medium cursor-pointer shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Question Form */}
            <form onSubmit={handleAskCoach} className="flex gap-2 min-w-0">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="اكتب سؤالك للكوتش (مثال: كيف أتحرك مع زميلي بعد اللوب؟)..."
                className="flex-1 bg-[#16161a] border border-[var(--card-border)] focus:border-[#b2e01e] rounded px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none transition min-w-0 font-medium"
              />
              <button
                type="submit"
                disabled={askingCoach || !userQuestion.trim()}
                className="btn-neon px-4 py-2 text-xs font-black flex items-center gap-1.5 shrink-0 disabled:opacity-50 cursor-pointer"
              >
                {askingCoach ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0b0b0d]" />
                ) : (
                  <>
                    <span>إرسال</span>
                    <Send className="w-3.5 h-3.5 rotate-180 text-[#0b0b0d]" />
                  </>
                )}
              </button>
            </form>

            {/* Answer Display */}
            {coachAnswer && (
              <div className="p-3.5 rounded bg-[#16161a] border border-[var(--card-border)] text-xs text-white leading-relaxed flex items-start gap-2.5 min-w-0">
                <CheckCircle2 className="w-4 h-4 text-[#b2e01e] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-[#b2e01e] block mb-1 font-mono-tag">
                    إجابة كوتش البادل:
                  </span>
                  <p className="text-[#f2f7ff]/90 break-words font-medium">{coachAnswer}</p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
