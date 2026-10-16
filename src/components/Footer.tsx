import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="border-t border-[var(--card-border)] bg-[#0b0b0d] text-white pt-8 sm:pt-10 pb-8 text-right mt-12 sm:mt-16 min-w-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 min-w-0">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-8 border-b border-[var(--card-border)] min-w-0">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-2.5 min-w-0">
            <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ PLATFORM CORE ]</span>
            <h3 className="font-alexandria font-black text-xl sm:text-2xl text-white tracking-tight uppercase break-words">
              PADEL LEVEL <span className="text-[#b2e01e]">PRO</span>
            </h3>
            <p className="text-xs text-[#f2f7ff]/75 leading-relaxed max-w-sm font-medium break-words">
              المنصة العربية المتخصصة لتقييم مستويات لاعبي البادل وفق المعايير الرياضية الدولية، وتوفير برامج تدريبية مخصصة ومكتبة شاملة للمهارات والتكتيك.
            </p>
            <div className="pt-1">
              <span className="font-mono-tag text-[10px] text-[#b2e01e] bg-[#16161a] border border-[var(--card-border)] px-2 py-0.5 rounded inline-block font-bold">
                SYSTEM VER: 2.4.0 • OFFICIAL COMMAND DASHBOARD
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5 min-w-0">
            <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ NAVIGATION ]</span>
            <ul className="space-y-2 text-xs font-semibold text-[#f2f7ff]/80 font-sans">
              <li>
                <button onClick={() => navigateTo('dashboard')} className="hover:text-[#b2e01e] transition-colors cursor-pointer">
                  لوحة التحكم
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('level-test')} className="hover:text-[#b2e01e] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>اختبار تحديد المستوى</span>
                  <span className="font-mono-tag text-[9px] bg-[#b2e01e] text-[#0b0b0d] px-1 font-black rounded">20Q</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('my-training-program')} className="hover:text-[#b2e01e] transition-colors cursor-pointer">
                  البرامج التدريبية المخصصة
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('learn-padel')} className="hover:text-[#b2e01e] transition-colors cursor-pointer">
                  دليل المهارات والتكتيك
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('video-tutorials')} className="hover:text-[#b2e01e] transition-colors cursor-pointer">
                  فيديوهات التمارين
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('progress-tracker')} className="hover:text-[#b2e01e] transition-colors cursor-pointer">
                  متتبع التقدم والمهارات
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('rackets')} className="hover:text-[#b2e01e] transition-colors cursor-pointer">
                  دليل ومضارب البادل
                </button>
              </li>
            </ul>
          </div>

          {/* Levels Info */}
          <div className="space-y-2.5 min-w-0">
            <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ LEVEL INDEX ]</span>
            <ul className="space-y-1.5 text-xs text-[#f2f7ff]/70 font-mono-tag">
              <li className="flex items-center justify-between">
                <span>STAGE [01]</span>
                <span className="text-white/40">مبتدئ (20-35)</span>
              </li>
              <li className="flex items-center justify-between">
                <span>STAGE [02]</span>
                <span className="text-white/40">متوسط أدنى (36-50)</span>
              </li>
              <li className="flex items-center justify-between text-[#b2e01e] font-bold">
                <span>STAGE [03]</span>
                <span className="text-[#b2e01e]">متوسط (51-62)</span>
              </li>
              <li className="flex items-center justify-between">
                <span>STAGE [04]</span>
                <span className="text-white/40">متقدم (63-72)</span>
              </li>
              <li className="flex items-center justify-between">
                <span>STAGE [05]</span>
                <span className="text-white/40">محترف (73-80)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-tag text-[#f2f7ff]/50 min-w-0">
          <p className="truncate">© 2026 PadelLevel Pro. High-Performance Dashboard.</p>
          <div className="flex items-center gap-3">
            <button onClick={() => navigateTo('about')} className="hover:text-[#b2e01e] cursor-pointer">ABOUT</button>
            <span>/</span>
            <button onClick={() => navigateTo('faq')} className="hover:text-[#b2e01e] cursor-pointer">FAQ</button>
            <span>/</span>
            <button onClick={() => navigateTo('contact')} className="hover:text-[#b2e01e] cursor-pointer">CONTACT</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
