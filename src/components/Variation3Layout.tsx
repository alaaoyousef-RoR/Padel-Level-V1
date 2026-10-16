import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageRoute } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { PadelBrandLogo } from './PadelBrandLogo';
import { 
  Menu, 
  X, 
  ChevronRight,
  ChevronLeft,
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
  LogIn,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export interface Variation3LayoutProps {
  children: React.ReactNode;
}

export const Variation3Layout: React.FC<Variation3LayoutProps> = ({ children }) => {
  const { user, testResult, currentPage, navigateTo, logout, openAuthModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

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
    <div className="h-screen w-screen overflow-hidden bg-[#0b0b0d] text-[#f2f7ff] flex flex-col lg:flex-row font-inter select-none relative">
      
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
              <div className="text-[10px] font-jetbrains text-white/50 mb-1.5 tracking-wider uppercase">NAVIGATION MENU</div>
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

            {/* Official WhatsApp Community Access Link */}
            <div className="p-3 rounded bg-[#0b0b0d] border border-[#25d366]/40 space-y-1.5 min-w-0">
              <div className="flex items-center justify-between gap-1 text-[10px] font-jetbrains text-[#25d366] font-bold">
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>WHATSAPP COMMUNITY</span>
                </span>
                <span className="text-[9px] bg-[#25d366]/20 px-1.5 py-0.5 rounded text-[#25d366]">500+ لاعب</span>
              </div>
              <p className="text-[11px] text-[#f2f7ff]/75 leading-tight">
                مجتمع لاعبي البادل لتنسيق المباريات والبطولات.
              </p>
              <a
                href="https://chat.whatsapp.com/CoOQR4oN1jzBrNaLCNOfP5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1.5 rounded font-black text-xs flex items-center justify-center gap-1.5 transition mt-1"
                style={{ backgroundColor: '#25d366', color: '#0b0b0d', textDecoration: 'none' }}
              >
                <span>الانضمام للمجتمع</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
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

      {/* 1. COLLAPSIBLE / EXPANDABLE DRAWER PANEL (Desktop Left Nav) */}
      <nav 
        className={`hidden lg:flex flex-col h-full overflow-y-auto border-l border-[var(--card-border)] bg-[#0b0b0d] transition-all duration-300 z-30 shrink-0 select-none ${
          isNavExpanded ? 'w-72 p-4' : 'w-[74px] py-4 px-2.5 items-center'
        }`}
      >
        {/* Toggle & Brand Header */}
        <div className={`flex items-center shrink-0 mb-4 ${isNavExpanded ? 'justify-between w-full border-b border-[var(--card-border)] pb-3' : 'flex-col gap-3'}`}>
          <div 
            onClick={() => navigateTo('level-test')}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
            title="PadelLevel Pro"
          >
            <div className="w-10 h-10 rounded bg-[#b2e01e] text-[#0b0b0d] font-syne font-black flex items-center justify-center text-sm hover:bg-[#9ec71b] transition shrink-0">
              PL
            </div>
            {isNavExpanded && (
              <div className="min-w-0">
                <div className="font-syne font-black text-sm text-white tracking-wider">PADEL LEVEL</div>
                <div className="text-[10px] font-jetbrains text-[#b2e01e]">BENCHMARK PRO</div>
              </div>
            )}
          </div>

          {/* Clean Expand/Collapse Toggle Button */}
          <button
            onClick={() => setIsNavExpanded(!isNavExpanded)}
            className={`rounded border border-[var(--card-border)] bg-[#16161a] hover:border-[#b2e01e] hover:text-[#b2e01e] text-white flex items-center justify-center transition cursor-pointer shrink-0 ${
              isNavExpanded ? 'px-2.5 py-1.5 text-xs gap-1.5' : 'w-10 h-10'
            }`}
            title={isNavExpanded ? "تصغير القائمة (إغلاق)" : "توسيع القائمة (فتح)"}
            aria-label={isNavExpanded ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isNavExpanded ? (
              <>
                <X className="w-4 h-4 text-[#b2e01e] shrink-0" />
                <span className="text-[11px] font-bold">إغلاق القائمة</span>
              </>
            ) : (
              <Menu className="w-5 h-5 text-[#b2e01e] shrink-0" />
            )}
          </button>
        </div>

        {/* Athlete Quick Status Widget (when expanded) */}
        {isNavExpanded && (
          <div className="w-full mb-4 p-3 rounded bg-[#16161a] border border-[var(--card-border)] space-y-1.5 shrink-0 min-w-0">
            <div className="flex items-center justify-between text-[10px] font-jetbrains text-[#b2e01e]">
              <span>ATHLETE</span>
              <span className="text-white/50">{isGuest ? 'GUEST' : 'PRO'}</span>
            </div>
            <div className="font-syne font-bold text-sm text-white truncate break-words">{playerName}</div>
            <div className="flex items-center justify-between gap-2 pt-1">
              <span className="label-pill-var3 bg-[#b2e01e] text-[#0b0b0d] border-none font-bold">
                {isGuest ? 'تقييم غير مكتمل' : `Level ${levelNum} Pro`}
              </span>
              {isGuest && (
                <button
                  onClick={() => openAuthModal('login')}
                  className="text-[11px] text-[#005cd7] hover:underline font-bold shrink-0 cursor-pointer"
                >
                  تسجيل الدخول
                </button>
              )}
            </div>
          </div>
        )}

        {/* Navigation Items List */}
        <div className={`flex flex-col gap-2 flex-1 w-full min-w-0 ${isNavExpanded ? '' : 'items-center'}`}>
          {isNavExpanded && (
            <div className="text-[10px] font-jetbrains text-white/50 mb-1 tracking-wider uppercase">NAVIGATION</div>
          )}

          {railItems.map(item => {
            const isActive = currentPage === item.page;
            
            if (isNavExpanded) {
              return (
                <button
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className={`w-full flex items-center justify-between p-2.5 rounded border text-xs font-bold transition cursor-pointer min-w-0 ${
                    isActive 
                      ? 'border-[#b2e01e] bg-[#b2e01e] text-[#0b0b0d]' 
                      : 'border-[var(--card-border)] bg-[#16161a] text-[#f2f7ff] hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="shrink-0">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span className="font-jetbrains text-[10px] shrink-0">[{item.code}]</span>
                </button>
              );
            }

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

        {/* WhatsApp Official Community Access Button (Expanded) */}
        {isNavExpanded && (
          <div className="w-full my-3 p-3 rounded bg-[#16161a] border border-[#25d366]/40 space-y-1.5 shrink-0 min-w-0">
            <div className="flex items-center justify-between text-[10px] font-jetbrains text-[#25d366] font-bold">
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>WHATSAPP COMMUNITY</span>
              </span>
              <span className="text-[9px] bg-[#25d366]/20 px-1 py-0.5 rounded text-[#25d366]">500+</span>
            </div>
            <p className="text-[10px] text-[#f2f7ff]/70 leading-tight">
              مجتمع لاعبي البادل لتنسيق المباريات والبطولات.
            </p>
            <a
              href="https://chat.whatsapp.com/CoOQR4oN1jzBrNaLCNOfP5"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-1.5 rounded font-black text-xs flex items-center justify-center gap-1.5 transition mt-1"
              style={{ backgroundColor: '#25d366', color: '#0b0b0d', textDecoration: 'none' }}
            >
              <span>انضم للمجتمع</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </div>
        )}

        {/* Theme Toggle & Bottom Actions */}
        <div className={`mt-auto pt-3 border-t border-[var(--card-border)] flex flex-col gap-2 shrink-0 ${isNavExpanded ? 'w-full' : 'items-center'}`}>
          {isNavExpanded ? (
            <div className="space-y-1.5 w-full">
              <div className="text-[10px] font-jetbrains text-white/50 tracking-wider uppercase">PALETTE</div>
              <ThemeToggle />
            </div>
          ) : (
            <ThemeToggle compactOnMobile={true} />
          )}

          {!isGuest ? (
            <button
              onClick={logout}
              className={
                isNavExpanded
                  ? "w-full py-2 px-3 rounded bg-red-950 text-red-200 border border-red-800 font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-900 transition cursor-pointer"
                  : "rail-icon text-red-400 border-red-900 bg-red-950 hover:bg-red-900"
              }
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {isNavExpanded && <span>تسجيل الخروج</span>}
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className={
                isNavExpanded
                  ? "w-full py-2 px-3 rounded bg-[#005cd7] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#004bb0] transition cursor-pointer"
                  : "rail-icon text-[#b2e01e] border-[#b2e01e] hover:bg-[#b2e01e] hover:text-[#0b0b0d]"
              }
              title="تسجيل الدخول"
            >
              <LogIn className="w-4 h-4 shrink-0" />
              {isNavExpanded && <span>تسجيل الدخول</span>}
            </button>
          )}
        </div>
      </nav>

      {/* 2. VIEWPORT MAIN CONTENT (Responsive vertical scrolling container with complete freedom from overlaps) */}
      <main className="viewport-var3 flex-1 flex flex-col min-w-0 w-full overflow-y-auto px-3.5 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-6 pb-24 lg:pb-8">
        <div className="max-w-5xl w-full mx-auto flex-1 min-w-0">
          {children}
        </div>
      </main>

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

