import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, User, AlertCircle, Loader2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    login, 
    register,
    loginWithUsername 
  } = useApp();
  
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedIdentifier = identifier.trim();
    const trimmedPassword = password.trim();

    if (!trimmedIdentifier || !trimmedPassword) {
      setErrorMsg('يرجى إدخال اسم المستخدم (أو البريد) وكلمة المرور.');
      return;
    }

    if (trimmedPassword.length < 6) {
      setErrorMsg('كلمة المرور يجب ألا تقل عن 6 أحرف.');
      return;
    }

    setIsLoading(true);

    try {
      if (trimmedIdentifier.includes('@')) {
        // Direct email login or fallback register
        const res = await login(trimmedIdentifier, trimmedPassword);
        if (!res.success) {
          // If login fails, attempt seamless account creation for this email
          const regRes = await register(
            trimmedIdentifier.split('@')[0], 
            trimmedIdentifier, 
            trimmedPassword
          );
          if (!regRes.success) {
            setErrorMsg(res.message || regRes.message || 'فشل تسجيل الدخول أو إنشاء الحساب.');
          } else {
            closeAuthModal();
          }
        } else {
          closeAuthModal();
        }
      } else {
        // Direct username login with automatic fallback
        const res = await loginWithUsername(trimmedIdentifier, trimmedPassword);
        if (!res.success) {
          setErrorMsg(res.message || 'فشل تسجيل الدخول. يرجى التأكد من البيانات.');
        } else {
          closeAuthModal();
        }
      }
    } catch {
      setErrorMsg('حدث خطأ غير متوقع أثناء تسجيل الدخول. حاول مجدداً.');
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
        className="card-dark rounded max-w-sm sm:max-w-md w-full border border-[#b2e01e] bg-[#16161a] overflow-hidden relative text-right min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Minimal Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--card-border)] bg-[#16161a] relative min-w-0">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 left-4 text-white/60 hover:text-white p-1.5 rounded bg-[#0b0b0d] border border-[var(--card-border)] transition-colors cursor-pointer"
            title="إغلاق"
            aria-label="إغلاق النافذة"
          >
            <X className="w-4 h-4 text-[#b2e01e]" />
          </button>

          <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ ATHLETE ACCESS ]</span>
          <h3 className="font-alexandria font-black text-lg sm:text-xl text-white mt-1">
            تسجيل الدخول <span className="text-[#b2e01e]">Login</span>
          </h3>
          <p className="text-xs text-[#f2f7ff]/75 mt-0.5 font-medium break-words">
            أدخل اسم المستخدم أو البريد الإلكتروني وكلمة المرور للمتابعة.
          </p>
        </div>

        {/* Minimal Form Body: strictly Username/Email & Password & Submit */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 min-w-0">
          {errorMsg && (
            <div className="bg-red-950/80 border border-red-700 text-red-200 p-2.5 rounded text-xs flex items-center gap-2 min-w-0">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span className="break-words">{errorMsg}</span>
            </div>
          )}

          {/* Username / Email field */}
          <div className="space-y-1.5 min-w-0">
            <label className="text-xs text-[#f2f7ff]/80 font-bold block font-mono-tag">
              اسم المستخدم أو البريد الإلكتروني
            </label>
            <div className="relative min-w-0">
              <input
                type="text"
                required
                autoFocus
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="مثال: captain_padel أو name@mail.com"
                dir="ltr"
                className="w-full bg-[#0b0b0d] border border-[var(--card-border)] focus:border-[#b2e01e] rounded py-2.5 px-3 pr-9 text-xs text-white placeholder-white/30 outline-none transition text-right font-medium"
              />
              <User className="w-4 h-4 text-white/50 absolute top-3 right-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5 min-w-0">
            <label className="text-xs text-[#f2f7ff]/80 font-bold block font-mono-tag">
              كلمة المرور
            </label>
            <div className="relative min-w-0">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                className="w-full bg-[#0b0b0d] border border-[var(--card-border)] focus:border-[#b2e01e] rounded py-2.5 px-3 pr-9 text-xs text-white placeholder-white/30 outline-none transition text-right font-mono"
              />
              <Lock className="w-4 h-4 text-white/50 absolute top-3 right-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-neon py-2.5 text-xs font-black rounded flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[#0b0b0d]" />}
              <span>تسجيل الدخول / متابعة</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
