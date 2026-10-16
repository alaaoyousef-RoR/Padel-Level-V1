import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageRoute } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { PadelBrandLogo } from './PadelBrandLogo';
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
    { code: 'D', label: 'لوحة التحكم', page: 'dashboard', icon: <Activity className="w-5 h-5 shrink-0" />, short: 'D' },
    { code: 'T', label: 'اختبار المستوى', page: 'level-test', icon: <Sparkles className="w-5 h-5 shrink-0" />, short: 'T' },
    { code: 'P', label: 'البرنامج التدريبي', page: 'my-training-program', icon: <Trophy className="w-5 h-5 shrink-0" />, short: 'P' },
    { code: 'L', label: 'موسوعة التكنيك', page: 'learn-padel', icon: <BookOpen className="w-5 h-5 shrink-0" />, short: 'L' },
    { code: 'V', label: 'فيديوهات التمارين', page: 'video-tutorials', icon: <PlayCircle className="w-5 h-5 shrink-0" />, short: 'V' },
    { code: 'A', label: 'متتبع التقدم', page: 'progress-tracker', icon: <TrendingUp className="w-5 h-5 shrink-0" />, short: 'A' },
    { code: 'E', label: 'مضارب البادل', page: 'rackets', icon: <ShoppingBag className="w-5 h-5 shrink-0" />, short: 'E' },
    { code: 'S', label: 'الدعم والتواصل', page: 'contact', icon: <Mail className="w-5 h-5 shrink-0" />, short: 'S' },
  ];

  const bottomNavItems: { label: string; page: PageRoute; icon: React.ReactNode }[] = [
    { label: 'الرئيسية', page: 'dashboard', icon: <Activity className="w-4 h-4 shrink-0" /> },
    { label: 'الاختبار', page: 'level-test', icon: <Sparkles className="w-4 h-4 shrink-0" /> },
    { label: 'التدريب', page: 'my-training-program', icon: <Trophy className="w-4 h-4 shrink-0" /> },
    { label: 'التكنيك', page: 'learn-padel', icon: <BookOpen className="w-4 h-4 shrink-0" /> },
    { label: 'المضارب', page: 'rackets', icon: <ShoppingBag className="w-4 h-4 shrink-0" /> },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0b0b0d] text-[#f2f7ff] flex flex-col lg:grid lg:grid-cols-[80px_1fr_320px] font-inter select-none relative">
      
      {/* MOBILE TOP BAR */}
      <header className="lg:hidden flex items-center justify-between px-3.5 py-2.5 bg-[#16161a] border-b border-[var(--card-border)] shrink-0 z-30 min-w-0">
        <button 
          onClick={() => navigateTo('level-test')}
          className="flex items-center gap-2 min-w-0 focus:outline-none cursor-pointer"
        >
          <PadelBrandLogo size="sm" showText={true} />
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle compactOnMobile={true} />
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded bg-[#0b0b0d] border border-[var(--card-border)] text-white hover:border-[#b2e01e] transition cursor-pointer"
            aria-label="القائمة الرئيسية"
          >
            <Menu className="w-5 h-5 text-[#b2e01e]" />
          </button>
        </div>
      </header>

      {/* MOBILE SLIDE-OUT DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="relative w-80 max-w-[85vw] h-full bg-[#16161a] border-r border-[var(--card-border)] p-4 sm:p-5 overflow-y-auto space-y-4 z-10 flex flex-col text-right animate-in slide-in-from-right duration-200">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-3">
              <PadelBrandLogo size="sm" showText={true} />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded bg-[#0b0b0d] border border-[var(--card-border)] text-white/80 hover:text-white"
                aria-label="إغلاق القائمة"
              >
                <X className="w-5 h-5 text-[#b2e01e]" />
              </button>
            </div>

            {/* Athlete Profile Widget in Drawer */}
            <div className="p-3.5 rounded bg-[#0b0b0d] border border-[var(--card-border)] space-y-2 min-w-0">
              <div className="text-[10px] font-jetbrains text-[#b2e01e] tracking-wider uppercase">ATHLETE PROFILE</div>
              <div className="font-syne text-base font-bold text-white truncate break-words">{playerName}</div>
              <div className="label-pill-var3 bg-[#b2e01e] text-[#0b0b0d] border-none font-bold">
                {isGuest ? 'مستوى قيد الاختبار' : `Rank: Level ${levelNum}`}
              </div>
              {isGuest && (
                <button
                  onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                  className="w-full mt-2 py-2 rounded bg-[#005cd7] hover:bg-[#004bb0] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <LogIn className="w-4 h-4 shrink-0" />
                  <span>تسجيل الدخول / حفظ</span>
                </button>
              )}
            </div>

            {/* Theme Toggle in Mobile Drawer */}
            <div className="space-y-1.5 border-b border-[var(--card-border)] pb-3">
              <div className="text-[10px] font-jetbrains text-white/50 tracking-wider uppercase">Color Palette</div>
              <ThemeToggle />
            </div>

            {/* Navigation Items */}
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="text-[10px] font-jetbrains text-white/50 mb-1.5 tracking-wider uppercase">NAVIGATION RAIL</div>
              {railItems.map(item => (
                <button
                  key={item.page}
                  onClick={() => { navigateTo(item.page); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded border text-xs font-bold transition cursor-pointer min-w-0 ${
                    currentPage === item.page 
                      ? 'border-[#b2e01e] bg-[#b2e01e] text-[#0b0b0d]' 
                      : 'border-[var(--card-border)] bg-[#0b0b0d] text-[#f2f7ff] hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span className="font-jetbrains text-[10px] shrink-0">[{item.code}]</span>
                </button>
              ))}
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-3 border-t border-[var(--card-border)] shrink-0">
              {!isGuest ? (
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded bg-red-950 text-red-200 border border-red-800 font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-900 transition"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>تسجيل الخروج</span>
                </button>
              ) : (
                <button
                  onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded bg-[#005cd7] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#004bb0] transition"
                >
                  <LogIn className="w-4 h-4 shrink-0" />
                  <span>تسجيل الدخول</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 1. RAIL (Desktop Column 1) */}
      <nav className="rail hidden lg:flex h-full overflow-y-auto">
        <div 
          onClick={() => navigateTo('level-test')}
          className="w-11 h-11 rounded bg-[#b2e01e] text-[#0b0b0d] font-syne font-black flex items-center justify-center text-base cursor-pointer hover:bg-[#9ec71b] transition shrink-0"
          title="PadelLevel Pro"
        >
          PL
        </div>
        <div className="flex flex-col gap-2.5 mt-2 flex-1">
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
        <div className="mt-auto flex flex-col gap-2 items-center shrink-0">
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

      {/* 2. VIEWPORT (Middle Column & Mobile Main Content) */}
      <main className="viewport-var3 flex-1 flex flex-col min-w-0 w-full overflow-y-auto px-3.5 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-6 pb-24 lg:pb-8">
        <div className="max-w-5xl w-full mx-auto flex-1 min-w-0">
          {children}
        </div>
      </main>

      {/* 3. SIDEBAR INFO AREA (Desktop Column 3) */}
      <aside className="sidebar-var3 hidden lg:flex h-full overflow-y-auto">
        {/* Profile Card */}
        <div className="pb-4 border-b border-[var(--card-border)] min-w-0">
          <div className="flex items-center justify-between mb-2 gap-2">
            <span className="font-jetbrains text-[10px] text-[#b2e01e] tracking-widest uppercase">Athlete Profile</span>
            {isGuest ? (
              <span className="text-[10px] font-bold text-[#f2f7ff]/50 shrink-0">وضع الضيف</span>
            ) : (
              <span className="text-[10px] font-bold text-[#b2e01e] flex items-center gap-1 shrink-0">
                <UserCheck className="w-3 h-3" />
                <span>حساب موثق</span>
              </span>
            )}
          </div>
          <h2 className="font-syne text-xl font-extrabold text-white truncate break-words">{playerName}</h2>
          
          <div className="flex items-center gap-2 mt-2 flex-wrap">
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
        <div className="space-y-1.5 min-w-0">
          <div className="font-jetbrains text-[10px] text-[#b2e01e] tracking-widest uppercase">Color Palette</div>
          <ThemeToggle />
        </div>

        {/* WhatsApp Community Card */}
        <div className="card-var3 border-[#25d366]/40 bg-[#16161a] min-w-0">
          <div className="font-jetbrains text-[10px] text-[#25d366] mb-1 font-bold">COMMUNITY ACCESS</div>
          <h3 className="font-syne text-sm font-bold text-white mb-1">مجتمع الواتساب الرسمي</h3>
          <p className="text-[11px] text-[#f2f7ff]/75 mb-3 leading-relaxed break-words">
            انضم لـ 500+ لاعب بادل لتنسيق المباريات والبطولات في الرياض وجدة.
          </p>
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
        <div className="space-y-2 min-w-0">
          <div className="font-jetbrains text-[10px] text-white/50 tracking-widest uppercase">Command Hub</div>
          <div className="grid gap-2 text-xs">
            <button 
              onClick={() => navigateTo('level-test')}
              className={`card-var3 p-2.5 text-right transition cursor-pointer font-bold flex items-center justify-between min-w-0 ${
                currentPage === 'level-test' ? 'border-[#b2e01e] text-[#b2e01e]' : 'border-[var(--card-border)] text-[#f2f7ff]'
              }`}
            >
              <span className="truncate">اختبار تقييم المستوى</span>
              <span className="font-jetbrains text-[10px] text-[#b2e01e] shrink-0 mr-2">[02]</span>
            </button>
            <button 
              onClick={() => navigateTo('my-training-program')}
              className={`card-var3 p-2.5 text-right transition cursor-pointer font-bold flex items-center justify-between min-w-0 ${
                currentPage === 'my-training-program' ? 'border-[#b2e01e] text-[#b2e01e]' : 'border-[var(--card-border)] text-[#f2f7ff]'
              }`}
            >
              <span className="truncate">برنامجي التدريبي</span>
              <span className="font-jetbrains text-[10px] text-[#b2e01e] shrink-0 mr-2">[03]</span>
            </button>
            <button 
              onClick={() => navigateTo('learn-padel')}
              className={`card-var3 p-2.5 text-right transition cursor-pointer font-bold flex items-center justify-between min-w-0 ${
                currentPage === 'learn-padel' ? 'border-[#b2e01e] text-[#b2e01e]' : 'border-[var(--card-border)] text-[#f2f7ff]'
              }`}
            >
              <span className="truncate">موسوعة التكنيك والمصطلحات</span>
              <span className="font-jetbrains text-[10px] text-[#b2e01e] shrink-0 mr-2">[04]</span>
            </button>
            <button 
              onClick={() => navigateTo('video-tutorials')}
              className={`card-var3 p-2.5 text-right transition cursor-pointer font-bold flex items-center justify-between min-w-0 ${
                currentPage === 'video-tutorials' ? 'border-[#b2e01e] text-[#b2e01e]' : 'border-[var(--card-border)] text-[#f2f7ff]'
              }`}
            >
              <span className="truncate">فيديوهات التمارين والتحمية</span>
              <span className="font-jetbrains text-[10px] text-[#b2e01e] shrink-0 mr-2">[05]</span>
            </button>
            <button 
              onClick={() => navigateTo('rackets')}
              className={`card-var3 p-2.5 text-right transition cursor-pointer font-bold flex items-center justify-between min-w-0 ${
                currentPage === 'rackets' ? 'border-[#b2e01e] text-[#b2e01e]' : 'border-[var(--card-border)] text-[#f2f7ff]'
              }`}
            >
              <span className="truncate">مضارب البادل المختارة</span>
              <span className="font-jetbrains text-[10px] text-[#b2e01e] shrink-0 mr-2">[07]</span>
            </button>
          </div>
        </div>

        {/* Evaluation Pending Meter */}
        <div className="mt-auto pt-4 border-t border-[var(--card-border)] shrink-0 min-w-0">
          <div className="font-jetbrains text-[10px] text-white/60 mb-1.5">EVALUATION METRIC</div>
          <div className="h-2 w-full bg-[#0b0b0d] border border-[var(--card-border)] rounded overflow-hidden">
            <div className="h-full bg-[#b2e01e]" style={{ width: testResult ? '100%' : '20%' }} />
          </div>
          <p className="text-[10px] text-[#f2f7ff]/70 mt-1.5 leading-relaxed break-words">
            {testResult ? 'التصنيف الرسمي مفعل ومكتمل بنجاح.' : 'أكمل الـ 20 سؤالاً لتفعيل التصنيف الرسمي.'}
          </p>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#16161a] border-t border-[var(--card-border)] py-1.5 px-2 flex items-center justify-around">
        {bottomNavItems.map(item => {
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => navigateTo(item.page)}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded transition cursor-pointer min-w-0 flex-1 ${
                isActive ? 'text-[#b2e01e]' : 'text-white/60 hover:text-white'
              }`}
            >
              <div className="shrink-0">{item.icon}</div>
              <span className="text-[10px] font-bold mt-1 truncate max-w-[58px] leading-tight text-center">{item.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
};
