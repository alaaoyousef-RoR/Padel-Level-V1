import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PadelBrandLogo } from './PadelBrandLogo';
import { ThemeToggle } from './ThemeToggle';
import { WhatsAppVector, DeveloperVector } from './BrandEquipmentVectors';
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
    <header className="sticky top-0 z-50 w-full theme-subcard backdrop-blur-md border-b border-white/[0.1] px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 shadow-xl transition-colors select-none">
      {/* 1. Far Right (Start in RTL): Official Padel Level Brand Logo */}
      <div className="flex items-center shrink-0 min-w-0">
        <button
          onClick={() => navigateTo('dashboard')}
          className="group flex items-center text-right focus:outline-none cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] shrink-0"
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
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#002661] font-black bg-[#b2e01e] hover:bg-[#9ec71b] px-3 sm:px-3.5 py-1.5 rounded-xl shadow transition cursor-pointer whitespace-nowrap shrink-0"
          >
            لوحة التحكم
          </button>
        ) : (
          <button
            onClick={() => navigateTo('level-test')}
            className="btn-neon text-xs px-3 sm:px-3.5 py-1.5 font-black cursor-pointer shadow whitespace-nowrap shrink-0"
          >
            بدء الاختبار
          </button>
        )}

        {setIsMobileMenuOpen && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition cursor-pointer border border-white/10 shrink-0"
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
  ];

  const handleNavClick = (page: PageRoute) => {
    navigateTo(page);
    setMenuOpen(false);
  };

  const whatsappCommunityUrl = "https://chat.whatsapp.com/DoB1lDmCQxXKmM49qJEdYg?mode=gi_t";
  const whatsappSupportUrl = "https://wa.me/966500365049";

  return (
    <>
      {/* DESKTOP SIDEBAR - Dynamic Theme Container with Crisp White Court-Line Borders */}
      <aside className="hidden lg:flex w-[300px] h-[calc(100vh-61px)] sticky top-[61px] flex-shrink-0 flex-col justify-between p-5 border-l border-white/[0.1] theme-sidebar z-40 select-none shadow-2xl overflow-y-auto">
        
        <div>
          {/* Header Brand Emblem in Sidebar */}
          <div 
            className="mb-4 cursor-pointer theme-subcard p-3 rounded-2xl border border-white/[0.1] shadow-xl hover:border-[#b2e01e]/60 transition-all group" 
            onClick={() => handleNavClick('dashboard')}
            title="Padel Level Athlete Command Center"
          >
            <PadelBrandLogo size="md" showText={true} />
          </div>

          {/* Interactive Dual-Theme Selector */}
          <div className="mb-5 px-1">
            <p className="text-[10px] font-mono-tag text-[#b2e01e] font-bold mb-1.5 uppercase tracking-wider">نظـام المظهـر (THEME)</p>
            <ThemeToggle />
          </div>

          {/* Navigation Links with High-Contrast Lime Green Indicator Bars */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all group relative cursor-pointer ${
                    isActive
                      ? 'text-white theme-card-solid border-r-4 border-[#b2e01e] shadow-[0_0_20px_rgba(178,224,30,0.22)]'
                      : 'text-[#f2f7ff]/75 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`${isActive ? 'text-[#b2e01e]' : 'text-white/60 group-hover:text-white'}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <span className={`font-mono-tag text-[10px] ${isActive ? 'text-[#b2e01e] font-black' : 'text-[#f2f7ff]/40 group-hover:text-[#f2f7ff]'}`}>
                    [{item.code}]
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM SECTION: Community Card, Profile & Footer */}
        <div className="pt-4 border-t border-white/[0.1] space-y-3">
          
          {/* COMMUNITY & SUPPORT CARD */}
          <div className="theme-subcard p-3 rounded-2xl border border-white/[0.1] space-y-2.5 shadow-lg">
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
              className="w-full py-2 px-3 bg-[#b2e01e] hover:bg-[#9ec71b] text-[#002661] rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow"
            >
              <WhatsAppVector className="w-4 h-4 fill-[#002661]" />
              <span>انضم لمجتمع الواتساب</span>
            </a>

            {/* Secondary Action Button: App Developer Contact with Vector SVG */}
            <a
              href={whatsappSupportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 theme-card-solid hover:bg-white/10 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors"
            >
              <DeveloperVector className="w-3.5 h-3.5 text-[#b2e01e]" />
              <span>تواصل مع مطور التطبيق</span>
            </a>
          </div>

          {/* User Profile or Guest Actions */}
          {isAuthenticated ? (
            <div className="flex items-center justify-between p-2.5 theme-subcard rounded-xl border border-white/[0.1]">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-[#b2e01e] text-[#002661] font-black flex items-center justify-center text-xs flex-shrink-0">
                  {user?.fullName?.charAt(0) || 'P'}
                </div>
                <div className="truncate text-right">
                  <p className="text-xs font-bold text-white truncate">{user?.fullName || 'لاعب بادل'}</p>
                  <p className="text-[10px] font-mono-tag text-[#b2e01e]">LEVEL {user?.levelNumber || 1}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-1.5 text-white/60 hover:text-red-400 hover:bg-white/10 rounded-lg transition cursor-pointer"
                title="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => handleNavClick('level-test')}
                className="btn-neon w-full py-2.5 text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-[#002661]" />
                <span>ابدأ اختبار المستوى</span>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="py-2 text-xs text-[#f2f7ff] hover:text-white bg-white/10 hover:bg-white/20 rounded-xl font-bold text-center transition border border-white/10 cursor-pointer"
                >
                  دخول
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="py-2 text-xs text-[#002661] bg-[#b2e01e] hover:bg-[#9ec71b] rounded-xl font-black text-center transition shadow cursor-pointer"
                >
                  حساب جديد
                </button>
              </div>
            </div>
          )}

          <p className="text-[10px] font-mono-tag text-white/40 text-center">
            Padel Level Pro © 2026
          </p>
        </div>

      </aside>

      {/* MOBILE DRAWER */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 theme-sidebar backdrop-blur-xl p-6 flex flex-col justify-between animate-in slide-in-from-top-4 duration-200 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.1] mb-4">
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

            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-sm font-bold text-right cursor-pointer ${
                    currentPage === item.page
                      ? 'bg-[#b2e01e] text-[#002661] shadow-lg font-black'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <span className="font-mono-tag text-xs opacity-60">[{item.code}]</span>
                </button>
              ))}
            </nav>

            {/* Mobile Community Widget */}
            <div className="mt-6 theme-subcard p-4 rounded-2xl border border-white/[0.1] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">مجتمع لاعبي البادل</span>
                <span className="text-[10px] font-mono-tag text-[#b2e01e] font-bold">24/7 SUPPORT</span>
              </div>
              <a
                href={whatsappCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-[#b2e01e] text-[#002661] rounded-xl font-black text-xs flex items-center justify-center gap-2"
              >
                <WhatsAppVector className="w-4 h-4 fill-[#002661]" />
                <span>انضم لمجتمع الواتساب</span>
              </a>
              <a
                href={whatsappSupportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-white/10 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <DeveloperVector className="w-3.5 h-3.5 text-[#b2e01e]" />
                <span>تواصل مع مطور التطبيق</span>
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.1] space-y-3">
            {isAuthenticated ? (
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="w-full py-3 rounded-xl text-red-300 bg-red-950/40 border border-red-900/50 text-xs font-bold cursor-pointer"
              >
                تسجيل الخروج
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { openAuthModal('login'); setMenuOpen(false); }}
                  className="py-3 rounded-xl bg-white/10 text-white font-bold text-xs cursor-pointer"
                >
                  تسجيل الدخول
                </button>
                <button
                  onClick={() => { openAuthModal('register'); setMenuOpen(false); }}
                  className="btn-neon py-3 text-xs justify-center cursor-pointer"
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
