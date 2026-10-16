import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TestResultData } from '../types';
import { PADEL_LEVELS } from '../data/assessmentData';
import { ThemeToggle } from './ThemeToggle';
import { PadelBrandLogo } from './PadelBrandLogo';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Lock, 
  User, 
  Sparkles, 
  Trophy, 
  TrendingUp, 
  BookOpen, 
  Compass, 
  ShieldCheck, 
  AlertCircle, 
  Loader2,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';

interface PostAssessmentRegisterScreenProps {
  testResult: TestResultData;
  onContinueAsGuest: () => void;
}

export const PostAssessmentRegisterScreen: React.FC<PostAssessmentRegisterScreenProps> = ({
  testResult,
  onContinueAsGuest
}) => {
  const { registerWithUsername, loginWithUsername, saveAssessmentResult, navigateTo } = useApp();

  const [isLoginMode, setIsLoginMode] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const levelInfo = PADEL_LEVELS[testResult.levelNumber] || PADEL_LEVELS[1];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage('يرجى إدخال اسم المستخدم لحفظ نتيجتك وتخصيص ملفك.');
      return;
    }

    if (!password.trim() || password.length < 6) {
      setErrorMessage('كلمة المرور يجب ألا تقل عن 6 أحرف.');
      return;
    }

    setIsLoading(true);

    try {
      let authResult;
      if (isLoginMode) {
        authResult = await loginWithUsername(username.trim(), password);
      } else {
        const displayName = fullName.trim() || username.trim();
        authResult = await registerWithUsername(username.trim(), displayName, password);
      }

      if (authResult.success) {
        // Save test result with the authenticated account
        await saveAssessmentResult(testResult);
        // Navigate to the test result / certificate page
        navigateTo('test-result');
      } else {
        setErrorMessage(authResult.message || 'حدث خطأ أثناء حفظ الحساب، يرجى المحاولة مجدداً.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'تعذر إتمام العملية.');
    } finally {
      setIsLoading(false);
    }
  };

  const unlockedFeatures = [
    {
      icon: <Trophy className="w-5 h-5 text-[#b2e01e]" />,
      title: 'برامج وتمارين تدريبية مخصصة',
      titleEn: 'Personalized Training Drills',
      desc: 'خطة تدريب أسبوعية مصممة خصيصاً وفق نقاط ضعفك المشخصة في الاختبار (كالبانديخا، ارتداد الجدران، أو الفولي) لرفع مستواك بفعالية.'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-sky-400" />,
      title: 'تتبع مستمر لتطور الأداء',
      titleEn: 'Ongoing Progress Tracking',
      desc: 'سجل رقمي ذكي لحصص تدريبك ومبارياتك، وتتبع ساعات اللعب الأسبوعية ومؤشرات تصاعد مستواك على مقياس Playtomic الدولي.'
    },
    {
      icon: <BookOpen className="w-5 h-5 text-amber-400" />,
      title: 'مكتبة تكنيكات البادل الاحترافية',
      titleEn: 'Technique Libraries',
      desc: 'شروحات حركية ومقاطع فيديو احترافية عالية الجودة لكل ضربة وقانون تكتيكي في الملعب من الإرسال حتى الفيبورا والسماتش.'
    },
    {
      icon: <Compass className="w-5 h-5 text-emerald-400" />,
      title: 'مسارات المهارات المرحلية المعتمدة',
      titleEn: 'Level-Specific Skill Pathways',
      desc: 'قائمة المهارات الـ 12 المعتمدة ومسارات إتقان واضحة تمنحك خارطة طريق محددة للانتقال من مستواك الحالي نحو المستوى المتقدم.'
    }
  ];

  return (
    <div className="min-h-screen theme-viewport-bg text-white flex flex-col justify-between font-alexandria py-8 px-4 sm:px-6 relative overflow-hidden text-right">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#b2e01e]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-black/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
        <PadelBrandLogo size="md" showText={true} />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b2e01e]/15 border border-[#b2e01e]/30 text-[#b2e01e] text-xs font-mono-tag font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>اكتمل التقييم بنجاح</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-6xl mx-auto my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left (or Right in RTL): Form & Score Card (Cols 5) */}
        <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
          
          {/* Assessment Score Badge */}
          <div className="card-dark p-6 rounded-3xl border-2 border-[#b2e01e]/50 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-3 left-6 bg-[#b2e01e] text-[#002661] text-[10px] font-mono-tag font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
              OFFICIAL BENCHMARK
            </div>

            <div className="space-y-3 pt-1">
              <span className="text-[10px] font-mono-tag text-white/60 uppercase block">
                [ ASSESSMENT COMPLETE • تم احتساب درجتك بنجاح ]
              </span>
              
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {levelInfo.titleAr}
                  </h3>
                  <p className="text-xs text-[#b2e01e] font-mono-tag font-bold mt-0.5">
                    {levelInfo.playtomicTier} • Playtomic {levelInfo.playtomicEquivalent}
                  </p>
                </div>
                <div className="text-left font-mono-tag">
                  <span className="text-2xl sm:text-3xl font-black text-[#b2e01e]">
                    {testResult.playtomicScore.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-white/50 block">PLAYTOMIC</span>
                </div>
              </div>

              {/* Progress Bar of Score */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono-tag text-white/80">
                <span>مجموع النقاط: <strong className="text-white">{testResult.totalScore}/80</strong></span>
                <span className="text-[#b2e01e] font-bold">نسبة الكفاءة {testResult.percentage}%</span>
              </div>
            </div>
          </div>

          {/* Account Creation / Login Box */}
          <div className="card-dark p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl space-y-5">
            <div>
              <h2 className="font-alexandria font-black text-xl text-white">
                {isLoginMode ? 'تسجيل الدخول لربط تقييمك' : 'احفظ نتيجتك وأنشئ ملفك الرياضي'}
              </h2>
              <p className="text-xs text-white/70 mt-1 leading-relaxed">
                {isLoginMode
                  ? 'سجّل دخولك لحفظ نتيجة هذا الاختبار وتحديث تصنيفك في ملفك الشخصي.'
                  : 'اختر اسم مستخدم مخصص لحفظ تصنيفك، تفعيل خطتك التدريبية، ومتابعة تطورك.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/90 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#b2e01e]" />
                  <span>اسم المستخدم (Username)</span>
                  <span className="text-[#b2e01e]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="مثال: khalid_padel أو alaa.padel"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/30 text-xs focus:border-[#b2e01e] focus:outline-none focus:ring-1 focus:ring-[#b2e01e] transition"
                  dir="ltr"
                />
              </div>

              {/* Full Name Input (Only in Register Mode) */}
              {!isLoginMode && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/90 flex items-center gap-1.5">
                    <span>الاسم المعروض (اختياري)</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: كابتن خالد الأحمد"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/30 text-xs focus:border-[#b2e01e] focus:outline-none focus:ring-1 focus:ring-[#b2e01e] transition text-right"
                  />
                </div>
              )}

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/90 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#b2e01e]" />
                  <span>كلمة المرور (Password)</span>
                  <span className="text-[#b2e01e]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="6 أحرف على الأقل"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/30 text-xs focus:border-[#b2e01e] focus:outline-none focus:ring-1 focus:ring-[#b2e01e] transition"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-950/70 border border-red-700 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-neon w-full py-4 text-xs font-black shadow-xl flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري حفظ الحساب والتقييم...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isLoginMode ? 'تسجيل الدخول وحفظ التقييم' : 'حفظ التقييم وتفعيل ملفي الشخصي'}</span>
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Switch Mode & Guest Preview */}
            <div className="pt-4 border-t border-white/10 space-y-3 text-center text-xs">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginMode(!isLoginMode);
                    setErrorMessage('');
                  }}
                  className="text-white/70 hover:text-[#b2e01e] font-bold transition"
                >
                  {isLoginMode 
                    ? 'ليس لديك حساب بعد؟ اضغط هنا لإنشاء حساب جديد' 
                    : 'لديك حساب بالفعل؟ اضغط هنا لتسجيل الدخول'}
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={onContinueAsGuest}
                  className="text-white/50 hover:text-white text-[11px] font-mono-tag transition underline underline-offset-4"
                >
                  [ متابعة كزائر مؤقت واستعراض الشهادة بدون تسجيل ]
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right (or Left in RTL): Engaging Feature Overview (Cols 7) */}
        <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b2e01e]/20 border border-[#b2e01e]/40 text-[#b2e01e] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>امتيازات ملف لاعب البادل المعتمد</span>
            </div>

            <h1 className="font-alexandria font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              ماذا تفتح عند <span className="text-[#b2e01e]">حفظ حسابك الرياضي</span>؟
            </h1>

            <p className="text-sm text-white/80 leading-relaxed font-medium max-w-xl">
              بمجرد ربط تقييمك بحساب شخصي، تتحول أرقام اختبارك إلى خطة تدريبية عملية متكاملة ترتقي بمهاراتك وتدعم مسيرتك على أرض الملعب.
            </p>
          </div>

          {/* 4 Feature Unlocks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {unlockedFeatures.map((feat, idx) => (
              <div 
                key={idx} 
                className="card-dark p-5 rounded-2xl border border-white/15 hover:border-[#b2e01e]/50 transition-all space-y-2.5 shadow-lg group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <span className="font-mono-tag text-[9px] text-white/40 uppercase font-bold">
                    [ UNLOCKED ]
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-white group-hover:text-[#b2e01e] transition-colors">
                    {feat.title}
                  </h3>
                  <span className="text-[10px] font-mono-tag text-white/50 block">
                    {feat.titleEn}
                  </span>
                </div>

                <p className="text-xs text-white/70 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Social Proof & Playtomic Benchmark note */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#b2e01e] shrink-0 mt-0.5" />
            <div className="text-xs text-white/80 space-y-1">
              <span className="font-bold text-white block">معايير تقييم دولية معتمدة</span>
              <p className="text-white/70 leading-relaxed">
                يعتمد نظام PadelLevel Pro خوارزميات تصنيف مبنية على كفاءات Playtomic الدولية، مما يتيح لك مقارنة مستواك مع لاعبي الأندية والمنافسات الرسمية بدقة تامة.
              </p>
            </div>
          </div>

        </div>

      </main>

      {/* Footer Branding */}
      <footer className="w-full max-w-6xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-mono-tag gap-2 relative z-10">
        <div>PADEL LEVEL PRO • ATHLETE PERFORMANCE HUB</div>
        <div>PLAYTOMIC BENCHMARK SYSTEM // RIYADH & JEDDAH</div>
      </footer>

    </div>
  );
};
