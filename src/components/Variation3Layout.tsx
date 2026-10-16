import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageRoute } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { 
  Menu, 
  X, 
  Activity, 
  Sparkles, 
  Trophy, 
  BookOpen, 
  PlayCircle, 
  TrendingUp, 
  ShoppingBag, 
  Mail, 
  LogOut,
  UserCheck,
  LogIn
} from 'lucide-react';

export interface Variation3LayoutProps {
  children: React.ReactNode;
}

export const Variation3Layout: React.FC<Variation3LayoutProps> = ({ children }) => {
  const { user, testResult, trainingSessions, masteredSkills, currentPage, navigateTo, logout, openAuthModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isGuest = !user;
  const playerName = user?.fullName || (isGuest ? 'رياضي جديد (Guest)' : 'كابتن البادل');
  const levelNum = testResult?.levelNumber || user?.levelNumber || 1;

  const railItems: { code: string; label: string; page: PageRoute; icon: React.ReactNode; short: string }[] = [
    { code: 'D', label: 'لوحة التحكم', page: 'dashboard', icon: <Activity className="w-5 h-5" />, short: 'D' },
    { code: 'T', label: 'اختبار المستوى', page: 'level-test', icon: <Sparkles className="w-5 h-5" />, short: 'T' },
    { code: 'P', label: 'البرنامج التدريبي', page: 'my-training-program', icon: <Trophy className="w-5 h-5" />, short: 'P' },
    { code: 'L', label: 'موسوعة التكنيك', page: 'learn-padel', icon: <BookOpen className="w-5 h-5" />, short: 'L' },
    { code: 'V', label: 'فيديوهات التمارين', page: 'video-tutorials', icon: <PlayCircle className="w-5 h-5" />, short: 'V' },
    { code: 'A', label: 'متتبع التقدم', page: 'progress-tracker', icon: <TrendingUp className="w-5 h-5" />, short: 'A' },
    { code: 'E', label: 'مضارب البادل', page: 'rackets', icon: <ShoppingBag className="w-5 h-5" />, short: 'E' },
    { code: 'S', label: 'الدعم والتواصل', page: 'contact', icon: <Mail className="w-5 h-5" />, short: 'S' },
  ];

  const bottomNavItems: { label: string; page: PageRoute; icon: React.ReactNode }[] = [
    { label: 'الرئيسية', page: 'dashboard', icon: <Activity className="w-4 h-4" /> },
    { label: 'الاختبار', page: 'level-test', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'التدريب', page: 'my-training-program', icon: <Trophy className="w-4 h-4" /> },
    { label: 'التكنيك', page: 'learn-padel', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'المضارب', page: 'rackets', icon: <ShoppingBag className="w-4 h-4" /> },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0b0b0d] text-[#f2f7ff] flex flex-col lg:grid lg:grid-cols-[80px_1fr_320px] font-inter select-none relative">
      
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden flex items-center justify-between p-3.5 bg-[#16161a] border-b border-[var(--card-border)] shrink-0 z-30">
        <div className="flex items-center gap-2">
          <div 
            onClick={() => navigateTo('level-test')}
            className="w-8 h-8 rounded bg-[#b2e01e] text-[#0b0b0d] font-syne font-black flex items-center justify-center text-sm cursor-pointer"
          >
            PL
          </div>
          <span className="font-syne font-bold text-sm tracking-wide text-white">PadelLevel Pro</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle compactOnMobile={true} />
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded bg-[#0b0b0d] border border-[var(--card-border)] text-white hover:border-[#b2e01e] transition cursor-pointer"
            aria-label="القائمة الرئيسية"
          >
            <Menu className="w-5 h-5 text-[#b2e01e]" />
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-OUT DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="relative w-80 max-w-[85vw] h-full bg-[#16161a] border-l border-[var(--card-border)] p-5 overflow-y-auto space-y-5 z-10 shadow-2xl flex flex-col text-right">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-[#b2e01e] text-[#0b0b0d] font-syne font-black flex items-center justify-center text-xs">
                  PL
                </div>
                <span className="font-syne font-bold text-sm text-white">PadelLevel Pro Menu</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded bg-[#0b0b0d] border border-[var(--card-border)] text-white/80 hover:text-white"
                aria-label="إغلاق القائمة"
              >
                <X className="w-5 h-5 text-[#b2e01e]" />
              </button>
            </div>

            {/* Athlete Profile Widget in Drawer */}
            <div className="p-3.5 rounded bg-[#0b0b0d] border border-[var(--card-border)] space-y-2">
              <div className="text-[10px] font-jetbrains text-[#b2e01e]">ATHLETE PROFILE</div>
              <div className="font-syne text-base font-bold text-white truncate">{playerName}</div>
              <div className="label-pill-var3 bg-[#b2e01e] text-[#0b0b0d] border-none font-bold">
                {isGuest ? 'مستوى قيد الاختبار' : `Rank: Level ${levelNum}`}
              </div>
              {isGuest && (
                <button
                  onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                  className="w-full mt-2 py-2 rounded bg-[#005cd7] text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>تسجيل الدخول / حفظ</span>
                </button>
              )}
            </div>

            {/* Navigation Items */}
            <div className="space-y-1.5 flex-1">
              <div className="text-[10px] font-jetbrains text-white/50 mb-2">NAVIGATION RAIL</div>
              {railItems.map(item => (
                <button
                  key={item.page}
                  onClick={() => { navigateTo(item.page); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-between p-3 rounded border text-xs font-bold transition cursor-pointer ${
                    currentPage === item.page 
                      ? 'border-[#b2e01e] bg-[#b2e01e] text-[#0b0b0d]' 
                      : 'border-[var(--card-border)] bg-[#0b0b0d] text-[#f2f7ff] hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <span className="font-jetbrains text-[10px]">[{item.code}]</span>
                </button>
              ))}
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-4 border-t border-[var(--card-border)]">
              {!isGuest ? (
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded bg-red-950 text-red-200 border border-red-800 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>تسجيل الخروج</span>
                </button>
              ) : (
                <button
                  onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded bg-[#005cd7] text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>تسجيل الدخول</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 1. RAIL (Desktop Column 1) - Hidden by default on mobile, fixed on desktop */}
      <nav className="rail hidden lg:flex">
        <div 
          onClick={() => navigateTo('level-test')}
          className="w-11 h-11 rounded bg-[#b2e01e] text-[#0b0b0d] font-syne font-black flex items-center justify-center text-base cursor-pointer hover:bg-[#9ec71b] transition"
          title="PadelLevel Pro"
        >
          PL
        </div>
        <div className="flex flex-col gap-2.5 mt-2">
          {railItems.map(item => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={`rail-icon ${isActive ? 'active' : ''}`}
                title={item.label}
              >
                {item.short}
              </button>
            );
          })}
        </div>
        <div className="mt-auto flex flex-col gap-2 items-center">
          {!isGuest ? (
            <button
              onClick={logout}
              className="rail-icon text-red-400 border-red-900 bg-red-950 hover:bg-red-900"
              title="تسجيل الخروج"
            >
              ⎋
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="rail-icon text-[#b2e01e] border-[#b2e01e] hover:bg-[#b2e01e] hover:text-[#0b0b0d]"
              title="تسجيل الدخول"
            >
              <LogIn className="w-4 h-4" />
            </button>
          )}
        </div>
      </nav>

      {/* 2. VIEWPORT (Desktop Column 2 & Mobile Full View) */}
      <main className="viewport-var3 flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        <div className="max-w-5xl w-full mx-auto flex-1">
          {children}
        </div>
      </main>

      {/* 3. SIDEBAR INFO AREA (Desktop Column 3) - Hidden on mobile viewports */}
      <aside className="sidebar-var3 hidden lg:flex">
        {/* Profile Card */}
        <div className="pb-5 border-b border-[var(--card-border)]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-jetbrains text-[10px] text-[#b2e01e] tracking-widest uppercase">Athlete Profile</span>
            {isGuest ? (
              <span className="text-[10px] font-bold text-[#f2f7ff]/50">وضع الضيف</span>
            ) : (
              <span className="text-[10px] font-bold text-[#b2e01e] flex items-center gap-1">
                <UserCheck className="w-3 h-3" />
                <span>حساب موثق</span>
              </span>
            )}
          </div>
          <h2 className="font-syne text-xl font-extrabold text-white truncate">{playerName}</h2>
          
          <div className="flex items-center gap-2 mt-2">
            <div className="label-pill-var3 bg-[#b2e01e] text-[#0b0b0d] border-none font-bold">
              {isGuest ? 'تقييم المستوى قيد الإجراء' : `Rank: Level ${levelNum} Pro`}
            </div>
            {isGuest && (
              <button
                onClick={() => openAuthModal('login')}
                className="text-[10px] text-[#005cd7] hover:underline font-bold"
              >
                تسجيل الدخول
              </button>
            )}
          </div>
        </div>

        {/* Theme Selector */}
        <div className="space-y-1.5">
          <div className="font-jetbrains text-[10px] text-[#b2e01e] tracking-widest uppercase">Color Palette</div>
          <ThemeToggle />
        </div>

        {/* WhatsApp Community Card (100% Solid Flat) */}
        <div className="card-var3 border-[#25d366]/40 bg-[#16161a]">
          <div className="font-jetbrains text-[10px] text-[#25d366] mb-1 font-bold">COMMUNITY ACCESS</div>
          <h3 className="font-syne text-sm font-bold text-white mb-1">مجتمع الواتساب الرسمي</h3>
          <p className="text-[11px] text-[#f2f7ff]/75 mb-3 leading-relaxed">انضم لـ 500+ لاعب بادل لتنسيق المباريات والبطولات في الرياض وجدة.</p>
          <a
            href="https://chat.whatsapp.com/CoOQR4oN1jzBrNaLCNOfP5"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-action-var3 text-xs block text-center border-none"
            style={{ backgroundColor: '#25d366', color: '#0b0b0d', textDecoration: 'none' }}
          >
            JOIN NOW
          </a>
        </div>

        {/* Command Hub Quick Navigation */}
        <div className="space-y-2.5">
          <div className="font-jetbrains text-[10px] text-white/50 tracking-widest uppercase">Command Hub</div>
          <div className="grid gap-2 text-xs">
            <button 
              onClick={() => navigateTo('level-test')}
              className={`card-var3 p-2.5 text-right transition cursor-pointer font-bold flex items-center justify-between ${
                currentPage === 'level-test' ? 'border-[#b2e01e] text-[#b2e01e]' : 'border-[var(--card-border)] text-[#f2f7ff]'
              }`}
            >
              <span>اختبار تقييم المستوى</span>
              <span className="font-jetbrains text-[10px] text-[#b2e01e]">[02]</span>
            </button>
            <button 
              onClick={() => navigateTo('my-training-program')}
              className={`card-var3 p-2.5 text-right transition cursor-pointer font-bold flex items-center justify-between ${
                currentPage === 'my-training-program' ? 'border-[#b2e01e] text-[#b2e01e]' : 'border-[var(--card-border)] text-[#f2f7ff]'
              }`}
            >
              <span>برنامجي التدريبي</span>
              <span className="font-jetbrains text-[10px] text-[#b2e01e]">[03]</span>
            </button>
            <button 
              onClick={() => navigateTo('learn-padel')}
              className={`card-var3 p-2.5 text-right transition cursor-pointer font-bold flex items-center justify-between ${
                currentPage === 'learn-padel' ? 'border-[#b2e01e] text-[#b2e01e]' : 'border-[var(--card-border)] text-[#f2f7ff]'
              }`}
            >
              <span>موسوعة التكنيك والمصطلحات</span>
              <span className="font-jetbrains text-[10px] text-[#b2e01e]">[04]</span>
            </button>
            <button 
              onClick={() => navigateTo('video-tutorials')}
              className={`card-var3 p-2.5 text-right transition cursor-pointer font-bold flex items-center justify-between ${
                currentPage === 'video-tutorials' ? 'border-[#b2e01e] text-[#b2e01e]' : 'border-[var(--card-border)] text-[#f2f7ff]'
              }`}
            >
              <span>فيديوهات التمارين والتحمية</span>
              <span className="font-jetbrains text-[10px] text-[#b2e01e]">[05]</span>
            </button>
            <button 
              onClick={() => navigateTo('rackets')}
              className={`card-var3 p-2.5 text-right transition cursor-pointer font-bold flex items-center justify-between ${
                currentPage === 'rackets' ? 'border-[#b2e01e] text-[#b2e01e]' : 'border-[var(--card-border)] text-[#f2f7ff]'
              }`}
            >
              <span>مضارب البادل المختارة</span>
              <span className="font-jetbrains text-[10px] text-[#b2e01e]">[07]</span>
            </button>
          </div>
        </div>

        {/* Evaluation Pending Meter */}
        <div className="mt-auto pt-5 border-t border-[var(--card-border)]">
          <div className="font-jetbrains text-[10px] text-white/60 mb-2">EVALUATION METRIC</div>
          <div className="h-2 w-full bg-[#0b0b0d] border border-[var(--card-border)] rounded overflow-hidden">
            <div className="h-full bg-[#b2e01e]" style={{ width: testResult ? '100%' : '20%' }} />
          </div>
          <p className="text-[10px] text-[#f2f7ff]/70 mt-2">
            {testResult ? 'التصنيف الرسمي مفعل ومكتمل بنجاح.' : 'أكمل الـ 20 سؤالاً لتفعيل التصنيف الرسمي.'}
          </p>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#16161a] border-t border-[var(--card-border)] py-2 px-2 flex items-center justify-around shadow-2xl">
        {bottomNavItems.map(item => {
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => navigateTo(item.page)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded transition cursor-pointer ${
                isActive ? 'text-[#b2e01e]' : 'text-white/60 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-bold mt-1">{item.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
};
