import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="border-t border-white/15 theme-subcard text-white pt-12 pb-10 text-right mt-16 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <span className="label-mono" style={{ color: '#b2e01e' }}>[ PLATFORM CORE ]</span>
            <h3 className="font-alexandria font-black text-2xl text-white tracking-tight uppercase">
              PADEL LEVEL <span className="text-[#b2e01e]">PRO</span>
            </h3>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              المنصة العربية المتخصصة لتقييم مستويات لاعبي البادل وفق المعايير الرياضية الدولية، وتوفير برامج تدريبية مخصصة ومكتبة شاملة للمهارات والتكتيك.
            </p>
            <div className="pt-2">
              <span className="font-mono-tag text-[10px] text-[#b2e01e] bg-[#b2e01e]/15 border border-[#b2e01e]/30 px-2.5 py-1 rounded inline-block font-bold">
                SYSTEM VER: 2.4.0 • OFFICIAL BRAND EDITION
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span className="label-mono" style={{ color: '#b2e01e' }}>[ NAVIGATION ]</span>
            <ul className="space-y-2 text-xs font-semibold text-white/75">
              <li>
                <button onClick={() => navigateTo('dashboard')} className="hover:text-[#b2e01e] transition-colors">
                  لوحة التحكم
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('level-test')} className="hover:text-[#b2e01e] transition-colors flex items-center gap-1.5">
                  <span>اختبار تحديد المستوى</span>
                  <span className="font-mono-tag text-[9px] bg-[#b2e01e] text-[#002255] px-1 font-bold rounded">20Q</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('my-training-program')} className="hover:text-[#b2e01e] transition-colors">
                  البرامج التدريبية المخصصة
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('learn-padel')} className="hover:text-[#b2e01e] transition-colors">
                  دليل المهارات والتكتيك
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('video-tutorials')} className="hover:text-[#b2e01e] transition-colors">
                  فيديوهات التمارين
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('progress-tracker')} className="hover:text-[#b2e01e] transition-colors">
                  متتبع التقدم والمهارات
                </button>
              </li>
            </ul>
          </div>

          {/* Levels Info */}
          <div className="space-y-3">
            <span className="label-mono" style={{ color: '#b2e01e' }}>[ LEVEL INDEX ]</span>
            <ul className="space-y-1.5 text-xs text-white/70 font-mono-tag">
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tag text-white/50">
          <p>© 2026 PadelLevel Pro. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('about')} className="hover:text-white">ABOUT</button>
            <span>/</span>
            <button onClick={() => navigateTo('faq')} className="hover:text-white">FAQ</button>
            <span>/</span>
            <button onClick={() => navigateTo('contact')} className="hover:text-white">CONTACT</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
