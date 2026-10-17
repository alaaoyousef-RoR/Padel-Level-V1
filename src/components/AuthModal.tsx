import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Lock, 
  User, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    authModalTab,
    closeAuthModal, 
    openAuthModal,
    login, 
    registerWithUsername
  } = useApp();
  
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  // Login form state (Pure Username & Password)
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state (Pure Username, optional Display Name, Password)
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerFullName, setRegisterFullName] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync mode with authModalTab when modal opens
  useEffect(() => {
    if (isAuthModalOpen) {
      setMode(authModalTab || 'login');
      setErrorMsg('');
      setSuccessMsg('');
    }
  }, [isAuthModalOpen, authModalTab]);

  if (!isAuthModalOpen) return null;

  const handleModeSwitch = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setErrorMsg('');
    setSuccessMsg('');
    openAuthModal(newMode);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const trimmedUser = loginUsername.trim();
    const trimmedPass = loginPassword.trim();

    if (!trimmedUser || !trimmedPass) {
      setErrorMsg('يرجى إدخال اسم المستخدم وكلمة المرور.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(trimmedUser, trimmedPass);
      if (!res.success) {
        setErrorMsg(res.message || 'اسم المستخدم أو كلمة المرور غير صحيحة. يرجى التحقق أو إنشاء حساب جديد.');
      } else {
        setSuccessMsg('تم تسجيل الدخول بنجاح! جاري تحميل ملفك الرياضي...');
        setTimeout(() => {
          closeAuthModal();
        }, 500);
      }
    } catch {
      setErrorMsg('حدث خطأ غير متوقع أثناء تسجيل الدخول. يرجى المحاولة مجدداً.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const trimmedUser = registerUsername.trim().toLowerCase().replace(/\s+/g, '_');
    const trimmedFullName = registerFullName.trim();
    const trimmedPass = registerPassword.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedUser || !trimmedPass) {
      setErrorMsg('يرجى إدخال اسم المستخدم وكلمة المرور لإنشاء حسابك الرياضي.');
      return;
    }

    if (trimmedUser.length < 3) {
      setErrorMsg('اسم المستخدم يجب ألا يقل عن 3 أحرف أو أرقام.');
      return;
    }

    if (trimmedPass.length < 6) {
      setErrorMsg('كلمة المرور يجب ألا تقل عن 6 خانات.');
      return;
    }

    if (trimmedPass !== trimmedConfirm) {
      setErrorMsg('كلمتا المرور غير متطابقتين. يرجى إعادة التأكيد بدقة.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await registerWithUsername(
        trimmedUser, 
        trimmedFullName || trimmedUser, 
        trimmedPass
      );

      if (!res.success) {
        setErrorMsg(res.message || 'فشل إنشاء الحساب. يرجى التأكد من البيانات أو اختيار اسم مستخدم آخر.');
      } else {
        setSuccessMsg('تم إنشاء حسابك الرياضي وتوثيق ملفك بنجاح!');
        setTimeout(() => {
          closeAuthModal();
        }, 600);
      }
    } catch {
      setErrorMsg('حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مجدداً.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 font-alexandria"
      onClick={closeAuthModal}
    >
      <div 
        className="card-dark rounded-lg max-w-sm sm:max-w-md w-full border border-[#b2e01e] bg-[#16161a] overflow-hidden relative text-right min-w-0 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--card-border)] bg-[#16161a] relative min-w-0">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 left-4 text-white/60 hover:text-white p-1.5 rounded bg-[#0b0b0d] border border-[var(--card-border)] hover:border-white/30 transition-colors cursor-pointer"
            title="إغلاق النافذة"
            aria-label="إغلاق النافذة"
          >
            <X className="w-4 h-4 text-[#b2e01e]" />
          </button>

          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#b2e01e]"></span>
            <span className="label-mono mb-0 text-[10px]" style={{ color: '#b2e01e' }}>
              [ ATHLETE AUTHENTICATION ]
            </span>
          </div>

          <h3 className="font-alexandria font-black text-lg sm:text-xl text-white tracking-tight">
            {mode === 'login' ? 'تسجيل الدخول' : 'تسجيل لاعب جديد'}{' '}
            <span className="text-[#b2e01e] text-sm sm:text-base font-jetbrains">
              {mode === 'login' ? '/ LOGIN' : '/ SIGN UP'}
            </span>
          </h3>
          <p className="text-xs text-[#f2f7ff]/75 mt-1 font-medium leading-relaxed break-words">
            {mode === 'login'
              ? 'أدخل اسم المستخدم وكلمة المرور لمتابعة برامجك وسجلاتك الرياضية.'
              : 'اختر اسم مستخدم وكلمة مرور لحفظ نتائج تقييمك وبرامجك التدريبية الدائمة.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#0b0b0d] border border-[var(--card-border)] rounded mt-3.5">
            <button
              type="button"
              onClick={() => handleModeSwitch('login')}
              className={`py-2 text-xs font-bold rounded transition-colors cursor-pointer text-center ${
                mode === 'login'
                  ? 'bg-[#b2e01e] text-[#0b0b0d] font-black shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              تسجيل الدخول (Login)
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch('register')}
              className={`py-2 text-xs font-bold rounded transition-colors cursor-pointer text-center ${
                mode === 'register'
                  ? 'bg-[#b2e01e] text-[#0b0b0d] font-black shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              لاعب جديد (Sign Up)
            </button>
          </div>
        </div>

        {/* Feedback Message Box */}
        {errorMsg && (
          <div className="mx-4 sm:mx-6 mt-4 bg-red-950/80 border border-red-700 text-red-200 p-3 rounded text-xs flex items-center gap-2.5 min-w-0">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span className="break-words font-medium leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mx-4 sm:mx-6 mt-4 bg-emerald-950/80 border border-emerald-500 text-emerald-200 p-3 rounded text-xs flex items-center gap-2.5 min-w-0">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span className="break-words font-medium leading-relaxed">{successMsg}</span>
          </div>
        )}

        {/* Form Body */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="p-4 sm:p-6 space-y-4 min-w-0">
            {/* Username field */}
            <div className="space-y-1.5 min-w-0">
              <label className="text-xs text-[#f2f7ff]/90 font-bold block font-mono-tag">
                اسم المستخدم (Username)
              </label>
              <div className="relative min-w-0">
                <input
                  type="text"
                  required
                  autoFocus
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="مثال: captain_padel أو ahmad"
                  dir="ltr"
                  className="w-full bg-[#0b0b0d] border border-[var(--card-border)] focus:border-[#b2e01e] rounded py-2.5 px-3 pr-9 text-xs text-white placeholder-white/30 outline-none transition text-right font-medium"
                />
                <User className="w-4 h-4 text-white/50 absolute top-3 right-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5 min-w-0">
              <label className="text-xs text-[#f2f7ff]/90 font-bold block font-mono-tag">
                كلمة المرور (Password)
              </label>
              <div className="relative min-w-0">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                  className="w-full bg-[#0b0b0d] border border-[var(--card-border)] focus:border-[#b2e01e] rounded py-2.5 px-9 pr-9 text-xs text-white placeholder-white/30 outline-none transition text-right font-mono"
                />
                <Lock className="w-4 h-4 text-white/50 absolute top-3 right-2.5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute top-2.5 left-2.5 text-white/50 hover:text-[#b2e01e] p-0.5 cursor-pointer"
                  title={showLoginPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Benefits Note */}
            <div className="flex items-center gap-2 p-2 rounded bg-[#0b0b0d] border border-[var(--card-border)] text-[11px] text-white/70">
              <ShieldCheck className="w-3.5 h-3.5 text-[#b2e01e] shrink-0" />
              <span className="truncate">تسجيل آمن ومشفر يحفظ بياناتك وجدول تدريبك فورياً</span>
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-neon py-2.5 text-xs font-black rounded flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[#0b0b0d]" />}
                <span>تسجيل الدخول (Sign In)</span>
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => handleModeSwitch('register')}
                  className="text-xs text-[#f2f7ff]/70 hover:text-[#b2e01e] font-medium transition-colors cursor-pointer"
                >
                  ليس لديك حساب لاعب بعد؟{' '}
                  <span className="text-[#b2e01e] font-bold underline">سجّل الآن باسم مستخدم جديد</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="p-4 sm:p-6 space-y-3.5 min-w-0">
            {/* Athlete Username */}
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center justify-between">
                <label className="text-xs text-[#f2f7ff]/90 font-bold block font-mono-tag">
                  اسم المستخدم (المعرّف الرياضي)
                </label>
                <span className="text-[10px] text-white/50 font-mono-tag">3 أحرف كحد أدنى</span>
              </div>
              <div className="relative min-w-0">
                <input
                  type="text"
                  required
                  autoFocus
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  placeholder="مثال: captain_turki أو padel_pro"
                  dir="ltr"
                  className="w-full bg-[#0b0b0d] border border-[var(--card-border)] focus:border-[#b2e01e] rounded py-2.5 px-3 pr-9 text-xs text-white placeholder-white/30 outline-none transition text-right font-jetbrains font-medium"
                />
                <User className="w-4 h-4 text-white/50 absolute top-3 right-2.5 pointer-events-none" />
              </div>
              <p className="text-[10px] text-white/60">
                هذا هو اسم الدخول الخاص بك ولن تحتاج إلى بريد إلكتروني.
              </p>
            </div>

            {/* Athlete Full Name (Optional Display Name) */}
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center justify-between">
                <label className="text-xs text-[#f2f7ff]/90 font-bold block font-mono-tag">
                  الاسم الرياضي أو الكامل (اختياري)
                </label>
                <span className="text-[10px] text-[#b2e01e]/80 font-mono-tag">اختياري</span>
              </div>
              <div className="relative min-w-0">
                <input
                  type="text"
                  value={registerFullName}
                  onChange={(e) => setRegisterFullName(e.target.value)}
                  placeholder="مثال: تركي الصالح (يظهر على الشهادة)"
                  className="w-full bg-[#0b0b0d] border border-[var(--card-border)] focus:border-[#b2e01e] rounded py-2.5 px-3 pr-9 text-xs text-white placeholder-white/30 outline-none transition text-right font-medium"
                />
                <Sparkles className="w-4 h-4 text-white/50 absolute top-3 right-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center justify-between">
                <label className="text-xs text-[#f2f7ff]/90 font-bold block font-mono-tag">
                  كلمة المرور
                </label>
                <span className="text-[10px] text-white/50 font-mono-tag">6 خانات كحد أدنى</span>
              </div>
              <div className="relative min-w-0">
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  required
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                  className="w-full bg-[#0b0b0d] border border-[var(--card-border)] focus:border-[#b2e01e] rounded py-2.5 px-9 pr-9 text-xs text-white placeholder-white/30 outline-none transition text-right font-mono"
                />
                <Lock className="w-4 h-4 text-white/50 absolute top-3 right-2.5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  className="absolute top-2.5 left-2.5 text-white/50 hover:text-[#b2e01e] p-0.5 cursor-pointer"
                  title={showRegisterPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5 min-w-0">
              <label className="text-xs text-[#f2f7ff]/90 font-bold block font-mono-tag">
                تأكيد كلمة المرور
              </label>
              <div className="relative min-w-0">
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                  className="w-full bg-[#0b0b0d] border border-[var(--card-border)] focus:border-[#b2e01e] rounded py-2.5 px-3 pr-9 text-xs text-white placeholder-white/30 outline-none transition text-right font-mono"
                />
                <Lock className="w-4 h-4 text-white/50 absolute top-3 right-2.5 pointer-events-none" />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-neon py-2.5 text-xs font-black rounded flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[#0b0b0d]" />}
                <span>إنشاء الحساب وتفعيل الملف الرياضي</span>
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => handleModeSwitch('login')}
                  className="text-xs text-[#f2f7ff]/70 hover:text-[#b2e01e] font-medium transition-colors cursor-pointer"
                >
                  لديك حساب لاعب بالفعل؟{' '}
                  <span className="text-[#b2e01e] font-bold underline">سجّل دخولك الآن</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
