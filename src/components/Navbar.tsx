import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PadelBrandLogo } from './PadelBrandLogo';
import { ThemeToggle } from './ThemeToggle';
import { WhatsAppVector, DeveloperVector, PadelRacketOfficialVector } from './BrandEquipmentVectors';
import { 
  Trophy, 
  Menu, 
  X, 
  LogOut, 
  Activity, 
  BookOpen, 
  PlayCircle, 
  TrendingUp, 
  Sparkles, 
  Zap
} from 'lucide-react';
import { PageRoute } from '../types';

export interface HeaderProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

// TOPBAR HEADER COMPONENT - Responsive three-slot flex container with clean alignment
export const Header: React.FC<HeaderProps> = ({
  isMobileMenuOpen = false,
  setIsMobileMenuOpen
}) => {
  const { isAuthenticated, navigateTo } = useApp();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b0b0d] border-b border-[var(--card-border)] px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 transition-colors select-none">
      {/* 1. Far Right (Start in RTL): Official Padel Level Brand Logo */}
      <div className="flex items-center shrink-0 min-w-0">
        <button
          onClick={() => navigateTo('dashboard')}
          className="group flex items-center text-right focus:outline-none cursor-pointer transition-transform shrink-0"
          title="Padel Level Athlete Command Center"
          aria-label="Padel Level الصفحة الرئيسية"
        >
          <PadelBrandLogo size="md" showText={true} />
        </button>
      </div>

      {/* 2. Center Slot: Theme Switcher (Compact icon button on mobile, full dual-pill on desktop/tablet) */}
      <div className="flex items-center justify-center shrink-0">
        <ThemeToggle compactOnMobile={true} />
      </div>

      {/* 3. Far Left (End in RTL): Quick Action & Mobile Menu Toggle */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {isAuthenticated ? (
          <button
            onClick={() => navigateTo('dashboard')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#0b0b0d] font-black bg-[#b2e01e] hover:bg-[#9ec71b] px-3 sm:px-3.5 py-1.5 rounded transition cursor-pointer whitespace-nowrap shrink-0"
          >
            لوحة التحكم
          </button>
        ) : (
          <button
            onClick={() => navigateTo('level-test')}
            className="btn-action text-xs px-3 sm:px-3.5 py-1.5 font-black cursor-pointer whitespace-nowrap shrink-0 mt-0"
          >
            بدء الاختبار
          </button>
        )}

        {setIsMobileMenuOpen && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-white hover:bg-white/10 rounded transition cursor-pointer border border-[var(--card-border)] shrink-0"
            aria-label="القائمة الرئيسية"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-[#b2e01e]" /> : <Menu className="w-5 h-5" />}
          </button>
        )}
      </div>
    </header>
  );
};

export interface NavbarProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMobileMenuOpen: controlledOpen,
  setIsMobileMenuOpen: controlledSetOpen
}) => {
  const { user, isAuthenticated, currentPage, navigateTo, openAuthModal, logout } = useApp();
  const [internalOpen, setInternalOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const isMenuOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setMenuOpen = controlledSetOpen || setInternalOpen;

  // Authenticated athlete navigation starts with Command Center Dashboard (01)
  const navItems: { label: string; page: PageRoute; code: string; icon: React.ReactNode }[] = [
    { label: 'لوحة التحكم القيادية', page: 'dashboard', code: '01', icon: <Activity className="w-4 h-4 text-[#b2e01e]" /> },
    { label: 'اختبار المستوى', page: 'level-test', code: '02', icon: <Sparkles className="w-4 h-4 text-[#b2e01e]" /> },
    { label: 'برنامجي التدريبي', page: 'my-training-program', code: '03', icon: <Trophy className="w-4 h-4 text-[#b2e01e]" /> },
    { label: 'تعلّم البادل والتكنيك', page: 'learn-padel', code: '04', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'فيديوهات التمارين', page: 'video-tutorials', code: '05', icon: <PlayCircle className="w-4 h-4" /> },
    { label: 'متتبع التقدم والتمارين', page: 'progress-tracker', code: '06', icon: <TrendingUp className="w-4 h-4 text-[#b2e01e]" /> },
    { label: 'مضارب البادل المختارة', page: 'rackets', code: '07', icon: <PadelRacketOfficialVector className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageRoute) => {
    navigateTo(page);
    setMenuOpen(false);
  };

  const whatsappCommunityUrl = "https://chat.whatsapp.com/DoB1lDmCQxXKmM49qJEdYg?mode=gi_t";
  const whatsappSupportUrl = "https://wa.me/966500365049";

  return (
    <>
      {/* DESKTOP SIDEBAR - Dynamic Theme Container with Collapse/Expand Toggle and Complete Window Info */}
      <aside className={`hidden lg:flex ${isSidebarExpanded ? 'w-[320px]' : 'w-[84px]'} h-[calc(100vh-61px)] sticky top-[61px] flex-shrink-0 flex-col justify-between p-4 border-l border-[var(--card-border)] bg-[#0b0b0d] z-40 select-none overflow-y-auto transition-all duration-300`}>
        
        <div>
          {/* Header Brand Emblem & Collapse Toggle Button */}
          <div className="flex items-center justify-between mb-4 gap-2">
            {isSidebarExpanded ? (
              <div 
                className="cursor-pointer bg-[#16161a] p-3 rounded border border-[var(--card-border)] hover:border-[#b2e01e] transition-colors group flex-1 min-w-0" 
                onClick={() => handleNavClick('dashboard')}
                title="Padel Level Athlete Command Center"
              >
                <PadelBrandLogo size="md" showText={true} />
              </div>
            ) : (
              <div 
                className="cursor-pointer bg-[#16161a] p-2.5 rounded border border-[var(--card-border)] hover:border-[#b2e01e] transition-colors flex items-center justify-center w-full"
                onClick={() => handleNavClick('dashboard')}
                title="لوحة التحكم"
              >
                <Activity className="w-5 h-5 text-[#b2e01e]" />
              </div>
            )}

            <button
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="p-2.5 bg-[#16161a] text-white hover:text-[#b2e01e] rounded border border-[var(--card-border)] transition-colors cursor-pointer shrink-0 flex items-center justify-center"
              title={isSidebarExpanded ? "طي النافذة" : "توسيع النافذة"}
              aria-label="طي أو توسيع النافذة"
            >
              <svg className={`w-4 h-4 transition-transform ${isSidebarExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Interactive Dual-Theme Selector */}
          {isSidebarExpanded && (
            <div className="mb-4 px-1">
              <p className="text-[10px] font-mono-tag text-[#b2e01e] font-bold mb-1 uppercase tracking-wider">نظـام المظهـر (THEME)</p>
              <ThemeToggle />
            </div>
          )}

          {/* Navigation Links with High-Contrast Lime Green Indicator Bars */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full flex items-center justify-between py-2.5 px-3 rounded text-xs sm:text-sm font-bold transition-colors group relative cursor-pointer ${
                    isActive
                      ? 'text-white bg-[#16161a] border-r-4 border-[#b2e01e]'
                      : 'text-[#f2f7ff]/75 hover:text-white hover:bg-white/[0.05]'
                  }`}
                  title={!isSidebarExpanded ? item.label : undefined}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`${isActive ? 'text-[#b2e01e]' : 'text-white/60 group-hover:text-white'} shrink-0`}>
                      {item.icon}
                    </span>
                    {isSidebarExpanded && <span className="truncate">{item.label}</span>}
                  </div>
                  {isSidebarExpanded && (
                    <span className={`font-mono-tag text-[10px] shrink-0 ${isActive ? 'text-[#b2e01e] font-black' : 'text-[#f2f7ff]/40 group-hover:text-[#f2f7ff]'}`}>
                      [{item.code}]
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM SECTION: Community Card, Profile & Full Window Information Text */}
        <div className="pt-4 border-t border-[var(--card-border)] space-y-3">
          
          {isSidebarExpanded ? (
            <>
              {/* COMPLETE WINDOW INFORMATION PANEL */}
              <div className="bg-[#16161a] p-3.5 rounded border border-[var(--card-border)] space-y-2.5 text-right">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white flex items-center gap-1.5">
                    معلومات المنصة الشاملة
                  </span>
                  <span className="text-[9px] font-mono-tag text-[#b2e01e] font-bold">INFO V2026</span>
                </div>
                <p className="text-[11px] text-[#f2f7ff]/80 leading-relaxed font-medium break-words">
                  منصة PadelLevel Pro هي المرجع العربي الأول لتقييم لاعبي البادل وتطوير المهارات. تتيح لك النظام تسجيل الحصص، متابعة مقاييس اللعب Playtomic، والوصول إلى برامج التدريب والتكنيك المعتمدة بدقة تامة.
                </p>
              </div>

              {/* COMMUNITY & SUPPORT CARD */}
              <div className="bg-[#16161a] p-3 rounded border border-[var(--card-border)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                    مجتمع لاعبي البادل
                  </span>
                  <span className="text-[9px] font-mono-tag text-[#b2e01e] font-bold">24/7 SUPPORT</span>
                </div>
                
                {/* Primary Action Button: WhatsApp Community with Vector SVG */}
                <a
                  href={whatsappCommunityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-[#b2e01e] hover:bg-[#9ec71b] text-[#0b0b0d] rounded font-black text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <WhatsAppVector className="w-4 h-4 fill-[#0b0b0d]" />
                  <span>انضم لمجتمع الواتساب</span>
                </a>

                {/* Secondary Action Button: App Developer Contact with Vector SVG */}
                <a
                  href={whatsappSupportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-[#0b0b0d] hover:bg-white/5 text-white rounded font-bold text-xs flex items-center justify-center gap-2 border border-[var(--card-border)] transition-colors"
                >
                  <DeveloperVector className="w-3.5 h-3.5 text-[#b2e01e]" />
                  <span>تواصل مع مطور التطبيق</span>
                </a>
              </div>

              {/* User Profile or Guest Actions */}
              {isAuthenticated ? (
                <div className="flex items-center justify-between p-2.5 bg-[#16161a] rounded border border-[var(--card-border)]">
                  <div className="flex items-center gap-2 overflow-hidden min-w-0">
                    <div className="w-8 h-8 rounded bg-[#b2e01e] text-[#0b0b0d] font-black flex items-center justify-center text-xs flex-shrink-0">
                      {user?.fullName?.charAt(0) || 'P'}
                    </div>
                    <div className="truncate text-right min-w-0">
                      <p className="text-xs font-bold text-white truncate">{user?.fullName || 'لاعب بادل'}</p>
                      <p className="text-[10px] font-mono-tag text-[#b2e01e]">LEVEL {user?.levelNumber || 1}</p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="p-1.5 text-white/60 hover:text-red-400 hover:bg-white/10 rounded transition cursor-pointer shrink-0"
                    title="تسجيل الخروج"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => handleNavClick('level-test')}
                    className="btn-action w-full py-2.5 text-xs font-black flex items-center justify-center gap-2 cursor-pointer mt-0"
                  >
                    <Zap className="w-4 h-4 fill-[#0b0b0d]" />
                    <span>ابدأ اختبار المستوى</span>
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openAuthModal('login')}
                      className="py-2 text-xs text-[#f2f7ff] hover:text-white bg-[#16161a] rounded font-bold text-center transition border border-[var(--card-border)] cursor-pointer"
                    >
                      دخول
                    </button>
                    <button
                      onClick={() => openAuthModal('register')}
                      className="py-2 text-xs text-[#0b0b0d] bg-[#b2e01e] hover:bg-[#9ec71b] rounded font-black text-center transition cursor-pointer"
                    >
                      حساب جديد
                    </button>
                  </div>
                </div>
              )}

              <p className="text-[10px] font-mono-tag text-white/40 text-center">
                Padel Level Pro © 2026
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => setIsSidebarExpanded(true)}
                className="p-2.5 bg-[#16161a] text-[#b2e01e] rounded border border-[var(--card-border)] hover:bg-[#b2e01e] hover:text-[#0b0b0d] transition-colors"
                title="فتح معلومات المنصة"
              >
                <Activity className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </aside>

      {/* MOBILE DRAWER */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#0b0b0d] p-4 sm:p-6 flex flex-col justify-between animate-in slide-in-from-top-4 duration-200 overflow-y-auto min-w-0">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[var(--card-border)] mb-4">
              <PadelBrandLogo size="md" showText={true} />
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-white hover:text-[#b2e01e] cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-[10px] font-mono-tag text-[#b2e01e] font-bold mb-1">اختر المظهر الرياضي</p>
              <ThemeToggle />
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full flex items-center justify-between py-2.5 px-3 rounded text-sm font-bold text-right cursor-pointer ${
                    currentPage === item.page
                      ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                      : 'text-white/80 hover:bg-[#16161a]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span className="font-mono-tag text-xs opacity-60 shrink-0">[{item.code}]</span>
                </button>
              ))}
            </nav>

            {/* Mobile Community Widget */}
            <div className="mt-5 bg-[#16161a] p-3.5 rounded border border-[var(--card-border)] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">مجتمع لاعبي البادل</span>
                <span className="text-[10px] font-mono-tag text-[#b2e01e] font-bold">24/7 SUPPORT</span>
              </div>
              <a
                href={whatsappCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-[#b2e01e] text-[#0b0b0d] rounded font-black text-xs flex items-center justify-center gap-2"
              >
                <WhatsAppVector className="w-4 h-4 fill-[#0b0b0d]" />
                <span>انضم لمجتمع الواتساب</span>
              </a>
              <a
                href={whatsappSupportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-[#0b0b0d] text-white rounded font-bold text-xs flex items-center justify-center gap-2 border border-[var(--card-border)]"
              >
                <DeveloperVector className="w-3.5 h-3.5 text-[#b2e01e]" />
                <span>تواصل مع مطور التطبيق</span>
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--card-border)] space-y-2">
            {isAuthenticated ? (
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="w-full py-2.5 rounded text-red-300 bg-red-950/40 border border-red-900/50 text-xs font-bold cursor-pointer"
              >
                تسجيل الخروج
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { openAuthModal('login'); setMenuOpen(false); }}
                  className="py-2.5 rounded bg-[#16161a] text-white font-bold text-xs cursor-pointer border border-[var(--card-border)]"
                >
                  تسجيل الدخول
                </button>
                <button
                  onClick={() => { openAuthModal('register'); setMenuOpen(false); }}
                  className="btn-action py-2.5 text-xs justify-center cursor-pointer mt-0"
                >
                  حساب جديد
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
