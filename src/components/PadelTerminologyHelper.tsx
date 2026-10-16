import React, { useState } from 'react';
import { PADEL_TERMINOLOGY, PadelTerm } from '../data/padelTerminology';
import { 
  HelpCircle, 
  BookOpen, 
  X, 
  Sparkles, 
  Flame, 
  Zap, 
  Target, 
  Shield, 
  Maximize2, 
  CheckCircle2,
  Info,
  ChevronDown
} from 'lucide-react';

interface TerminologyTooltipProps {
  termKey: string;
  label?: string;
  className?: string;
}

export const TerminologyTooltip: React.FC<TerminologyTooltipProps> = ({ 
  termKey, 
  label,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const term = PADEL_TERMINOLOGY[termKey];

  if (!term) return null;

  const displayLabel = label || term.termAr;

  const getIcon = () => {
    switch (term.iconName) {
      case 'Sparkles': return <Sparkles className="w-3.5 h-3.5 text-[#b2e01e]" />;
      case 'Flame': return <Flame className="w-3.5 h-3.5 text-orange-400" />;
      case 'Zap': return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'Target': return <Target className="w-3.5 h-3.5 text-sky-400" />;
      case 'Shield': return <Shield className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Maximize2': return <Maximize2 className="w-3.5 h-3.5 text-[#b2e01e]" />;
      default: return <Info className="w-3.5 h-3.5 text-[#b2e01e]" />;
    }
  };

  return (
    <span className={`relative inline-flex items-center align-middle mx-1 ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 hover:bg-[#b2e01e]/20 hover:border-[#b2e01e]/50 border border-white/15 text-[11px] font-bold text-[#b2e01e] transition cursor-pointer"
        title="انقر لفهم هذا المصطلح البادلي"
      >
        {getIcon()}
        <span>{displayLabel}</span>
        <HelpCircle className="w-3 h-3 text-white/50" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs" 
            onClick={() => setIsOpen(false)} 
          />
          <div 
            className="absolute bottom-full right-0 mb-2 w-80 max-w-[90vw] z-50 p-4 rounded-2xl bg-[#002661] text-white border border-[#b2e01e]/40 shadow-2xl text-right animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--surface, #002661)',
              borderColor: 'var(--accent, #b2e01e)'
            }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <div className="flex items-center gap-1.5">
                {getIcon()}
                <span className="font-bold text-xs text-[#b2e01e]">{term.termEn}</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-white/10 text-white/60 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <h4 className="font-bold text-sm text-white mb-1">{term.termAr}</h4>
            <p className="text-xs text-white/90 leading-relaxed mb-3">
              {term.shortDefinition}
            </p>

            <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-1.5 text-[11px]">
              <div className="text-[#b2e01e] font-bold">💡 نصيحة للمبتدئ:</div>
              <p className="text-white/80 leading-normal">{term.beginnerTip}</p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50">
              <span>الفئة: {term.categoryAr}</span>
              <span className="text-[#b2e01e] font-mono-tag">Playtomic Concept</span>
            </div>
          </div>
        </>
      )}
    </span>
  );
};

export const PadelTerminologyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [selectedTermKey, setSelectedTermKey] = useState<string>('bandeja');

  if (!isOpen) return null;

  const currentTerm = PADEL_TERMINOLOGY[selectedTermKey] || PADEL_TERMINOLOGY['bandeja'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl rounded-3xl border border-white/20 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-right font-alexandria shadow-2xl relative"
        style={{
          background: 'var(--surface-card-solid, #002661)',
          color: '#ffffff'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#b2e01e]/20 border border-[#b2e01e]/40 flex items-center justify-center text-[#b2e01e]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono-tag text-[10px] text-[#b2e01e] font-bold block uppercase tracking-wider">
                [ PADEL GLOSSARY & TACTICAL CONCEPTS ]
              </span>
              <h2 className="font-black text-xl sm:text-2xl text-white">
                دليل مصطلحات البادل التأسيسية
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Intro */}
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
          رياضة البادل تمتاز بمصطلحات إسبانية وتكتيكية فريدة. صممنا هذا الدليل السريع لمساعدة اللاعبين من جميع المستويات على فهم كل مصطلح وارد في التقييم والتدريب بدقة وسهولة.
        </p>

        {/* Term Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {Object.values(PADEL_TERMINOLOGY).map((term) => {
            const isSelected = term.id === selectedTermKey;
            return (
              <button
                key={term.id}
                type="button"
                onClick={() => setSelectedTermKey(term.id)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#b2e01e] bg-[#b2e01e]/20 shadow-md ring-1 ring-[#b2e01e]'
                    : 'border-white/10 bg-black/20 hover:bg-white/5 text-white/70'
                }`}
              >
                <div className={`font-mono-tag text-[10px] uppercase font-bold ${isSelected ? 'text-[#b2e01e]' : 'text-white/50'}`}>
                  {term.termEn}
                </div>
                <div className={`text-xs font-bold mt-1 ${isSelected ? 'text-white' : 'text-white/80'}`}>
                  {term.termAr.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Term Spotlight Card */}
        <div className="p-6 rounded-2xl bg-black/30 border border-white/10 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono-tag text-[#b2e01e] font-bold px-2 py-0.5 rounded bg-[#b2e01e]/15 border border-[#b2e01e]/30">
                {currentTerm.categoryAr} • {currentTerm.termEn}
              </span>
              <h3 className="font-black text-xl text-white mt-1">
                {currentTerm.termAr}
              </h3>
            </div>
            <div className="text-xs text-white/50 font-mono-tag">
              معيار تصنيف Playtomic
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#b2e01e] uppercase font-mono-tag">ما هو هذا المصطلح؟ (DEFINITION)</h4>
            <p className="text-sm text-white/90 leading-relaxed font-medium">
              {currentTerm.detailedExplanation}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>متى تُلعب هذه الضربة؟</span>
              </span>
              <p className="text-xs text-white/80 leading-relaxed">
                {currentTerm.whenToUse}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400" />
                <span>خطأ شائع يقع فيه اللاعبون:</span>
              </span>
              <p className="text-xs text-white/80 leading-relaxed">
                {currentTerm.commonMistake}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#b2e01e]/10 border border-[#b2e01e]/30 space-y-1">
            <span className="text-xs font-bold text-[#b2e01e] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#b2e01e]" />
              <span>نصيحة ذهبية للمبتدئين والمتوسطين:</span>
            </span>
            <p className="text-xs text-white/95 leading-relaxed font-medium">
              {currentTerm.beginnerTip}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="btn-neon px-8 py-3 text-xs font-black shadow-lg"
          >
            فهمت، العودة للاختبار
          </button>
        </div>
      </div>
    </div>
  );
};
