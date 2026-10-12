import React from 'react';
import { useApp } from '../context/AppContext';

export interface ThemeToggleProps {
  compactOnMobile?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ compactOnMobile = false }) => {
  const { theme, setTheme } = useApp();

  const toggleTheme = () => {
    setTheme(theme === 'court-blue' ? 'athletic-pink' : 'court-blue');
  };

  return (
    <>
      {/* 1. Mobile Compact Single-Button Indicator (When compactOnMobile is true) */}
      {compactOnMobile && (
        <button
          type="button"
          onClick={toggleTheme}
          className="sm:hidden w-8 h-8 rounded-full bg-black/40 border border-white/20 flex items-center justify-center p-1 shadow-md hover:border-[#b2e01e]/60 transition-all cursor-pointer shrink-0"
          title={`التبديل إلى ${theme === 'court-blue' ? 'وردي رياضي' : 'أزرق الملعب'}`}
          aria-label="تبديل المظهر الرياضي"
        >
          {theme === 'court-blue' ? (
            <span className="w-4 h-4 rounded-full bg-[#005CD7] border-2 border-white shadow-[0_0_8px_rgba(0,92,215,0.6)] flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-[#b2e01e]"></span>
            </span>
          ) : (
            <span className="w-4 h-4 rounded-full bg-[#C2185B] border-2 border-white shadow-[0_0_8px_rgba(194,24,91,0.6)] flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-[#b2e01e]"></span>
            </span>
          )}
        </button>
      )}

      {/* 2. Full Dual-Pill Switcher (Shown always if compactOnMobile=false, or only on sm+ if compactOnMobile=true) */}
      <div className={`items-center bg-black/25 p-1 rounded-xl border border-white/10 gap-1 shadow-inner shrink-0 ${compactOnMobile ? 'hidden sm:flex' : 'flex'}`}>
        <button
          type="button"
          onClick={() => setTheme('court-blue')}
          className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            theme === 'court-blue'
              ? 'bg-[#b2e01e] text-[#002661] shadow font-black'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
          title="أزرق الملعب (Court Blue)"
        >
          <span className="w-2 h-2 rounded-full bg-[#005CD7] border border-white shadow-sm shrink-0"></span>
          <span>أزرق الملعب</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('athletic-pink')}
          className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            theme === 'athletic-pink'
              ? 'bg-[#b2e01e] text-[#002661] shadow font-black'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
          title="وردي رياضي (Athletic Pink)"
        >
          <span className="w-2 h-2 rounded-full bg-[#C2185B] border border-white shadow-sm shrink-0"></span>
          <span>وردي رياضي</span>
        </button>
      </div>
    </>
  );
};
