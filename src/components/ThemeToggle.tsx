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
      {/* 1. Mobile Compact Single-Button Indicator */}
      {compactOnMobile && (
        <button
          type="button"
          onClick={toggleTheme}
          className="sm:hidden w-8 h-8 rounded-lg bg-[#16161a] border border-[#003b8b] flex items-center justify-center p-1 cursor-pointer shrink-0"
          title={`التبديل إلى ${theme === 'court-blue' ? 'بورغندي وروزي' : 'أزرق كورت'}`}
          aria-label="تبديل المظهر"
        >
          {theme === 'court-blue' ? (
            <span className="w-4 h-4 rounded bg-[#005CD7] border border-white flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b2e01e]"></span>
            </span>
          ) : (
            <span className="w-4 h-4 rounded bg-[#850E35] border border-white flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b2e01e]"></span>
            </span>
          )}
        </button>
      )}

      {/* 2. Full Dual-Pill Switcher */}
      <div className={`items-center bg-[#0b0b0d] p-1 rounded-lg border border-[var(--card-border)] gap-1 shrink-0 ${compactOnMobile ? 'hidden sm:flex' : 'flex'}`}>
        <button
          type="button"
          onClick={() => setTheme('court-blue')}
          className={`px-2.5 py-1 rounded text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 ${
            theme === 'court-blue'
              ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
              : 'text-[#f2f7ff]/70 hover:text-white hover:bg-white/5'
          }`}
          title="أزرق الملعب (Deep Blue #005cd7 & Navy #003b8b)"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#005CD7] border border-white shrink-0"></span>
          <span>أزرق كورت</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('athletic-pink')}
          className={`px-2.5 py-1 rounded text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 ${
            theme === 'athletic-pink'
              ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
              : 'text-[#f2f7ff]/70 hover:text-white hover:bg-white/5'
          }`}
          title="بورغندي وروزي (Burgundy #850E35 & Soft Rose #EE6983)"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#850E35] border border-[#EE6983] shrink-0"></span>
          <span>بورغندي روزي</span>
        </button>
      </div>
    </>
  );
};
