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
    <div className="min-h-screen theme-viewport-bg text-[#f2f7ff] flex flex-col justify-between font-alexandria relative overflow-x-hidden">
      {/* Top Navigation / Brand */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between border-b border-[var(--card-border)] relative z-10">
        <div className="flex items-center text-right min-w-0">
          <PadelBrandLogo size="md" showText={true} className="h-8 sm:h-10 lg:h-11 w-auto" />
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono-tag text-white/80 bg-[#16161a] px-3 py-1 rounded border border-[var(--card-border)]">
            <span className="w-2 h-2 rounded-full bg-[#b2e01e]"></span>
            <span>منصة تقييم وتدريب البادل الرسمية</span>
          </div>
        </div>
      </header>

      {/* Main Hero & Authentication Gateway */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 min-w-0">
        
        {/* Left Side: Brand & Feature Highlights */}
        <div className="lg:col-span-7 space-y-6 text-right min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16161a] border border-[#b2e01e] text-[#b2e01e] text-xs font-bold">
            <Activity className="w-4 h-4 flex-shrink-0" />
            <span className="break-words">نظام تقييم وتدريب لاعب البادل الاحترافي</span>
          </div>

          <h1 className="font-alexandria font-black text-3xl sm:text-5xl lg:text-5xl text-white tracking-tight leading-tight break-words">
            طوّر مستواك، سجّل حصصك، <br />
            وأتقن <span className="text-[#b2e01e]">لعبة البادل</span> باحتراف
          </h1>

          <p className="text-sm sm:text-base text-[#f2f7ff]/85 leading-relaxed max-w-2xl font-medium break-words">
            المنصة الأولى المتكاملة لتقييم مستواك وفق معايير Playtomic العالمية، بناء برنامج تدريبي مخصص، وتتبع ساعات وسجلات التدريب بدقة تامة.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
            <div className="card-dark p-4 rounded border border-[var(--card-border)] bg-[#16161a] space-y-2 min-w-0">
              <div className="w-9 h-9 flex items-center justify-center">
                <AngledRacketIllustration className="w-9 h-9" />
              </div>
              <h3 className="font-bold text-white text-sm break-words">تقييم معتمد</h3>
              <p className="text-xs text-[#f2f7ff]/70 leading-relaxed break-words">اختبار من 5 محاور أساسية يحدد تصنيفك بدقة.</p>
            </div>

            <div className="card-dark p-4 rounded border border-[var(--card-border)] bg-[#16161a] space-y-2 min-w-0">
              <div className="w-9 h-9 flex items-center justify-center">
                <WaterBottleVector className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-white text-sm break-words">سجل التدريبات</h3>
              <p className="text-xs text-[#f2f7ff]/70 leading-relaxed break-words">سجل المدة، شدة التدريب، ومجالات التركيز وحفظها سحابياً.</p>
            </div>

            <div className="card-dark p-4 rounded border border-[var(--card-border)] bg-[#16161a] space-y-2 min-w-0">
              <div className="w-9 h-9 flex items-center justify-center">
                <PadelBallVector className="w-9 h-9" />
              </div>
              <h3 className="font-bold text-white text-sm break-words">برنامج مخصص</h3>
              <p className="text-xs text-[#f2f7ff]/70 leading-relaxed break-words">خطط أسبوعية مدعومة بالذكاء الاصطناعي لرفع أدائك.</p>
            </div>

            <a
              href="https://chat.whatsapp.com/CoOQR4oN1jzBrNaLCNOfP5"
              target="_blank"
              rel="noopener noreferrer"
              className="card-dark p-4 rounded border border-[var(--card-border)] bg-[#16161a] space-y-2 block hover:border-[#25D366] transition-colors cursor-pointer group min-w-0"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 flex items-center justify-center rounded bg-[#25D366]/20 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-black transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <span className="text-[10px] text-[#25D366] font-bold bg-[#25D366]/10 px-2 py-0.5 rounded border border-[#25D366]/30">انضم الآن</span>
              </div>
              <h3 className="font-bold text-white text-sm break-words">مجتمع البادل</h3>
              <p className="text-xs text-[#f2f7ff]/70 leading-relaxed break-words">انضم إلى مجتمع وتجمع اللاعبين للمنافسات والتمارين.</p>
            </a>
          </div>
        </div>

        {/* Right Side: Frictionless Username & Password Gateway Card */}
        <div className="lg:col-span-5 min-w-0">
          <div className="card-dark p-6 sm:p-8 rounded border border-[var(--card-border)] bg-[#16161a] relative min-w-0">
            <div className="inline-block mb-4 bg-[#b2e01e] text-[#0b0b0d] text-xs font-black px-3 py-1 rounded uppercase tracking-wider">
              {isRegisterMode ? 'حساب جديد' : 'بوابة الدخول'}
            </div>

            <div className="space-y-1.5 mb-5">
              <h2 className="font-alexandria font-black text-xl sm:text-2xl text-white break-words">
                {isRegisterMode ? 'انضم إلى Padel Level' : 'مرحباً بك مجدداً'}
              </h2>
              <p className="text-xs text-[#f2f7ff]/75 break-words">
                {isRegisterMode ? 'أنشئ حسابك باسم المستخدم وكلمة المرور فقط.' : 'أدخل اسم المستخدم وكلمة المرور للوصول إلى لوحة التحكم.'}
              </p>
            </div>

            {/* Mode Toggle Tabs */}
            <div className="flex bg-[#0b0b0d] p-1 rounded mb-5 border border-[var(--card-border)]">
              <button
                type="button"
                onClick={() => { setIsRegisterMode(false); setErrorMsg(''); }}
                className={`flex-1 py-2 text-xs font-black rounded transition-colors cursor-pointer ${
                  !isRegisterMode ? 'bg-[#b2e01e] text-[#0b0b0d]' : 'text-[#f2f7ff]/70 hover:text-white'
                }`}
              >
                تسجيل الدخول
              </button>
              <button
                type="button"
                onClick={() => { setIsRegisterMode(true); setErrorMsg(''); }}
                className={`flex-1 py-2 text-xs font-black rounded transition-colors cursor-pointer ${
                  isRegisterMode ? 'bg-[#b2e01e] text-[#0b0b0d]' : 'text-[#f2f7ff]/70 hover:text-white'
                }`}
              >
                حساب جديد
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="bg-red-950/80 border border-red-700 text-red-200 p-3 rounded text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                  <span className="break-words">{errorMsg}</span>
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
                      className="w-full bg-[#0b0b0d] border border-[var(--card-border)] focus:border-[#b2e01e] rounded py-2.5 px-3 pr-10 text-xs text-white placeholder-white/30 outline-none transition"
                    />
                    <User className="w-4 h-4 text-white/50 absolute top-3 right-3 pointer-events-none" />
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
                    className="w-full bg-[#0b0b0d] border border-[var(--card-border)] focus:border-[#b2e01e] rounded py-2.5 px-3 pr-10 text-xs text-white placeholder-white/30 outline-none transition text-right font-mono"
                  />
                  <User className="w-4 h-4 text-white/50 absolute top-3 right-3 pointer-events-none" />
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
                    className="w-full bg-[#0b0b0d] border border-[var(--card-border)] focus:border-[#b2e01e] rounded py-2.5 px-3 pr-10 text-xs text-white placeholder-white/30 outline-none transition text-right font-mono"
                  />
                  <Lock className="w-4 h-4 text-white/50 absolute top-3 right-3 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-action py-3 text-xs font-black rounded mt-3 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[#0b0b0d]" />}
                <span>{isRegisterMode ? 'إنشاء حساب جديد' : 'دخول إلى لوحة التحكم'}</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </form>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-5 text-center text-xs text-[#f2f7ff]/70 border-t border-[var(--card-border)] relative z-10 bg-[#0b0b0d]">
        © 2026 Padel Level Brand. جميع الحقوق محفوظة.
      </footer>

      {/* Floating WhatsApp Contact Button */}
      <a
        href="https://wa.me/966500365049?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%C%20%D8%A3%D8%B1%D8%AC%D9%88%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A8%D8%B1%D8%A7%D9%85%D8%AC%20%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%20%D8%A7%D9%84%D8%A8%D8%A7%D8%AF%D9%84%20%D9%88%D8%AA%D8%AD%D8%AF%D9%8A%D8%AF%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%88%D9%89%20%D9%81%D9%8A%20%D9%85%D9%86%D8%B5%D8%A9%20Padel%20Level%20Pro"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-black p-3 sm:p-3.5 rounded flex items-center justify-center transition-colors group border border-white/20"
        title="تواصل معنا عبر واتساب"
        aria-label="تواصل عبر واتساب"
      >
        <span className="absolute -top-9 left-0 bg-[#0b0b0d] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[var(--card-border)] pointer-events-none">
          دعم واتساب الفوري 24/7 💬
        </span>
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-black" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>
    </div>
  );
};
