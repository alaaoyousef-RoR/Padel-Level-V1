import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PadelBrandLogo } from './PadelBrandLogo';
import { ThemeToggle } from './ThemeToggle';
import { 
  AngledRacketIllustration, 
  WaterBottleVector, 
  PadelBallVector 
} from './BrandEquipmentVectors';
import { User, Lock, Loader2, AlertCircle, ArrowRight, Activity } from 'lucide-react';

export const LoginLandingGateway: React.FC = () => {
  const { loginWithUsername, registerWithUsername } = useApp();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('يرجى إدخال اسم المستخدم وكلمة المرور.');
      return;
    }

    if (isRegisterMode && !fullName.trim()) {
      setErrorMsg('يرجى إدخال اسمك الكامل.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('كلمة المرور يجب ألا تقل عن 6 أحرف.');
      return;
    }

    setIsLoading(true);
    let result;
    if (isRegisterMode) {
      result = await registerWithUsername(username, fullName, password);
    } else {
      result = await loginWithUsername(username, password);
    }
    setIsLoading(false);

    if (!result.success && result.message) {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="min-h-screen theme-viewport-bg text-[#f2f7ff] flex flex-col justify-between font-alexandria relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#b2e01e]/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-black/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Top Navigation / Brand */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-white/[0.12] relative z-10">
        <div className="flex items-center text-right">
          <PadelBrandLogo size="md" showText={true} className="h-9 sm:h-10 lg:h-12 w-auto" />
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono-tag text-white/80 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/[0.12]">
            <span className="w-2 h-2 rounded-full bg-[#b2e01e] animate-pulse"></span>
            <span>منصة تقييم وتدريب البادل الرسمية</span>
          </div>
        </div>
      </header>

      {/* Main Hero & Authentication Gateway */}
      <main className="w-full max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Brand & Feature Highlights */}
        <div className="lg:col-span-7 space-y-8 text-right">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b2e01e]/20 border border-[#b2e01e]/40 text-[#b2e01e] text-xs font-bold">
            <Activity className="w-4 h-4" />
            <span>نظام تقييم وتدريب لاعب البادل الاحترافي</span>
          </div>

          <h1 className="font-alexandria font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight drop-shadow-lg">
            طوّر مستواك، سجّل حصصك، <br />
            وأتقن <span className="text-[#b2e01e]">لعبة البادل</span> باحتراف
          </h1>

          <p className="text-sm sm:text-base text-[#f2f7ff]/85 leading-relaxed max-w-2xl font-medium">
            المنصة الأولى المتكاملة لتقييم مستواك وفق معايير Playtomic العالمية، بناء برنامج تدريبي مخصص، وتتبع ساعات وسجلات التدريب بدقة تامة.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="card-dark p-5 rounded-2xl space-y-2 shadow-xl">
              <div className="w-10 h-10 flex items-center justify-center">
                <AngledRacketIllustration className="w-10 h-10 drop-shadow" />
              </div>
              <h3 className="font-bold text-white text-sm">تقييم معتمد</h3>
              <p className="text-xs text-[#f2f7ff]/70">اختبار من 5 محاور أساسية يحدد تصنيفك بدقة.</p>
            </div>

            <div className="card-dark p-5 rounded-2xl space-y-2 shadow-xl">
              <div className="w-10 h-10 flex items-center justify-center">
                <WaterBottleVector className="w-9 h-9 drop-shadow" />
              </div>
              <h3 className="font-bold text-white text-sm">سجل التدريبات</h3>
              <p className="text-xs text-[#f2f7ff]/70">سجل المدة، شدة التدريب، ومجالات التركيز وحفظها سحابياً.</p>
            </div>

            <div className="card-dark p-5 rounded-2xl space-y-2 shadow-xl">
              <div className="w-10 h-10 flex items-center justify-center">
                <PadelBallVector className="w-9 h-9 drop-shadow" />
              </div>
              <h3 className="font-bold text-white text-sm">برنامج مخصص</h3>
              <p className="text-xs text-[#f2f7ff]/70">خطط أسبوعية مدعومة بالذكاء الاصطناعي لرفع أدائك.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Frictionless Username & Password Gateway Card */}
        <div className="lg:col-span-5">
          <div className="card-dark p-8 sm:p-10 rounded-2xl border-2 border-white/25 shadow-2xl relative backdrop-blur-xl">
            <div className="absolute -top-3.5 right-6 bg-[#b2e01e] text-[#002255] text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
              {isRegisterMode ? 'حساب جديد' : 'بوابة الدخول الآمنة'}
            </div>

            <div className="space-y-2 mb-6">
              <h2 className="font-alexandria font-black text-2xl text-white">
                {isRegisterMode ? 'انضم إلى Padel Level' : 'مرحباً بك مجدداً'}
              </h2>
              <p className="text-xs text-[#f2f7ff]/75">
                {isRegisterMode ? 'أنشئ حسابك باسم المستخدم وكلمة المرور فقط.' : 'أدخل اسم المستخدم وكلمة المرور للوصول إلى لوحة التحكم.'}
              </p>
            </div>

            {/* Mode Toggle Tabs */}
            <div className="flex theme-card-solid p-1.5 rounded-xl mb-6 border border-white/20">
              <button
                type="button"
                onClick={() => { setIsRegisterMode(false); setErrorMsg(''); }}
                className={`flex-1 py-2.5 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  !isRegisterMode ? 'bg-[#b2e01e] text-[#002255] shadow' : 'text-[#f2f7ff]/70 hover:text-white'
                }`}
              >
                تسجيل الدخول
              </button>
              <button
                type="button"
                onClick={() => { setIsRegisterMode(true); setErrorMsg(''); }}
                className={`flex-1 py-2.5 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  isRegisterMode ? 'bg-[#b2e01e] text-[#002255] shadow' : 'text-[#f2f7ff]/70 hover:text-white'
                }`}
              >
                حساب جديد
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="bg-red-950/80 border border-red-700 text-red-200 p-3 rounded-xl text-xs flex items-center gap-2 shadow-md">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {isRegisterMode && (
                <div className="space-y-1.5">
                  <label className="text-xs text-[#f2f7ff]/80 font-bold block">
                    الاسم الكامل (للملف الشخصي)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="مثال: تركي الصالح"
                      className="w-full theme-card-solid border border-white/20 focus:border-[#b2e01e] focus:ring-1 focus:ring-[#b2e01e] rounded-xl py-3 px-3 pr-10 text-xs text-white placeholder-white/30 outline-none transition"
                    />
                    <User className="w-4 h-4 text-white/50 absolute top-3.5 right-3 pointer-events-none" />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs text-[#f2f7ff]/80 font-bold block">
                  اسم المستخدم (Username)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="مثال: ahmad_padel"
                    dir="ltr"
                    className="w-full theme-card-solid border border-white/20 focus:border-[#b2e01e] focus:ring-1 focus:ring-[#b2e01e] rounded-xl py-3 px-3 pr-10 text-xs text-white placeholder-white/30 outline-none transition text-right font-mono"
                  />
                  <User className="w-4 h-4 text-white/50 absolute top-3.5 right-3 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-[#f2f7ff]/80 font-bold block">
                  كلمة المرور (Password)
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    dir="ltr"
                    className="w-full theme-card-solid border border-white/20 focus:border-[#b2e01e] focus:ring-1 focus:ring-[#b2e01e] rounded-xl py-3 px-3 pr-10 text-xs text-white placeholder-white/30 outline-none transition text-right font-mono"
                  />
                  <Lock className="w-4 h-4 text-white/50 absolute top-3.5 right-3 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-neon py-4 text-xs font-black rounded-xl mt-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[#002255]" />}
                <span>{isRegisterMode ? 'إنشاء حساب جديد' : 'دخول إلى لوحة التحكم'}</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </form>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-[#f2f7ff]/70 border-t border-white/20 relative z-10 theme-subcard backdrop-blur">
        © 2026 Padel Level Brand. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
};
