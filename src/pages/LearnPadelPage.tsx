import React, { useState } from 'react';
import { PADEL_TECHNIQUES } from '../data/techniquesData';
import { PADEL_GLOSSARY_ITEMS, GlossaryTerm } from '../data/glossaryData';
import { PADEL_VIDEOS } from '../data/videoData';
import { PadelTechnique, PadelVideoTutorial } from '../types';
import { CustomVideoPlayer } from '../components/CustomVideoPlayer';
import { 
  BookOpen, 
  Search, 
  ArrowLeft, 
  X, 
  Zap, 
  HelpCircle,
  BookMarked,
  ShieldCheck,
  Compass,
  Play
} from 'lucide-react';

export const LearnPadelPage: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<'techniques' | 'glossary'>('techniques');
  
  // Techniques state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalTechnique, setActiveModalTechnique] = useState<PadelTechnique | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<PadelVideoTutorial | null>(null);

  const handleOpenVideoForTechnique = (tech: PadelTechnique) => {
    const matched = PADEL_VIDEOS.find(v => 
      v.titleAr.includes(tech.titleAr) || 
      v.category === tech.category ||
      v.titleAr.includes(tech.titleOriginal)
    ) || PADEL_VIDEOS[0];
    setActiveVideoModal(matched);
  };

  // Glossary state
  const [glossarySearch, setGlossarySearch] = useState('');
  const [glossaryCategory, setGlossaryCategory] = useState<string>('all');
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<GlossaryTerm | null>(null);

  const techniqueCategories = [
    { id: 'all', label: 'جميع الضربات والمهارات' },
    { id: 'attacking', label: 'الضربات الهجومية (Attacking)' },
    { id: 'defensive', label: 'الضربات الدفاعية (Defensive)' },
    { id: 'walls', label: 'اللعب على الزجاج (Walls)' },
    { id: 'tactics', label: 'التكتيك والتمركز (Tactics)' },
  ];

  const glossaryCategories = [
    { id: 'all', label: 'جميع المصطلحات' },
    { id: 'overhead', label: 'الضربات الهوائية والإنهاء (Overhead)' },
    { id: 'walls', label: 'الدفاع والجدار الزجاجي (Walls)' },
    { id: 'tactics', label: 'التكتيك والتمركز (Tactics)' },
  ];

  const filteredTechniques = PADEL_TECHNIQUES.filter((tech) => {
    const matchesSearch = 
      tech.titleAr.includes(searchQuery) || 
      tech.titleOriginal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.shortDesc.includes(searchQuery);

    const matchesCategory = selectedCategory === 'all' || tech.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const filteredGlossary = PADEL_GLOSSARY_ITEMS.filter((item) => {
    const matchesSearch =
      item.termAr.includes(glossarySearch) ||
      item.termOriginal.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.shortDefinition.includes(glossarySearch);

    const matchesCategory = glossaryCategory === 'all' || item.category === glossaryCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto py-4 text-right space-y-8 font-alexandria">
      
      {/* Header Banner */}
      <div className="card-dark p-8 sm:p-10 rounded-2xl border border-white/20 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-[#b2e01e]/10 rounded-full blur-2xl pointer-events-none" />
        <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ TECHNICAL REPOSITORY & ENCYCLOPEDIA ]</span>
        <h1 className="font-alexandria font-black text-3xl sm:text-4xl text-white tracking-tight uppercase flex items-center gap-3">
          <span>تعلّم تقنيات وتكتيكات <span className="text-[#b2e01e]">ومصطلحات البادل</span></span>
        </h1>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-2xl">
          دليلك الميكانيكي والتكتيكي الشامل لتنفيذ كل ضربة ومهارة، بالإضافة إلى موسوعة مصطلحات البادل الرسمية لإتقان لغة المحترفين.
        </p>

        {/* Main Section Switcher Tabs */}
        <div className="pt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveMainTab('techniques')}
            className={`py-3 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeMainTab === 'techniques'
                ? 'bg-[#b2e01e] text-[#002255] font-black shadow-lg scale-105'
                : 'theme-card-solid text-white/80 hover:text-white border border-white/15'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>[01] التقنيات والحركات العملية</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('glossary')}
            className={`py-3 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeMainTab === 'glossary'
                ? 'bg-[#b2e01e] text-[#002255] font-black shadow-lg scale-105'
                : 'theme-card-solid text-white/80 hover:text-white border border-white/15'
            }`}
          >
            {/* Prominent Book/Dictionary SVG Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              <line x1="10" y1="6" x2="16" y2="6"/>
              <line x1="10" y1="10" x2="16" y2="10"/>
            </svg>
            <span>[02] قاموس مصطلحات البادل الشامل</span>
          </button>
        </div>
      </div>

      {/* TAB 1: TECHNIQUES & DRILLS */}
      {activeMainTab === 'techniques' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Filter and Search Bar */}
          <div className="card-dark p-4 sm:p-6 rounded-2xl border border-white/15 space-y-4 shadow-xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن أي ضربة أو مهارة (مثال: البانديخا، الفيبورا، الفورهاند، الزجاج)..."
                className="w-full theme-card-solid border border-white/20 focus:border-[#b2e01e] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none pl-10 text-right"
              />
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-tag text-xs">
              {techniqueCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`py-2 px-4 rounded-xl whitespace-nowrap transition-colors font-bold ${
                      isSelected
                        ? 'bg-[#b2e01e] text-[#002255] shadow font-black'
                        : 'theme-card-solid text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of Techniques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTechniques.map((tech) => (
              <div
                key={tech.id}
                className="card-dark p-6 rounded-2xl border border-white/15 hover:border-[#b2e01e]/60 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono-tag">
                    <span className="text-[10px] text-[#b2e01e] bg-[#b2e01e]/15 border border-[#b2e01e]/30 px-2.5 py-0.5 rounded-full font-bold">
                      {tech.categoryAr}
                    </span>
                    <span className="text-[10px] text-white/60 border border-white/10 px-2 py-0.5 rounded-md theme-card-solid">
                      {tech.difficulty}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#b2e01e] transition-colors">
                      {tech.titleAr}
                    </h3>
                    <p className="font-mono-tag text-[10px] text-white/50 mt-0.5">
                      {tech.titleOriginal} • {tech.courtPositionAr}
                    </p>
                  </div>

                  <p className="text-xs text-white/70 leading-relaxed line-clamp-3 font-medium">
                    {tech.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  <div className="text-[11px] text-white/60 flex items-center gap-1.5 truncate">
                    <Zap className="w-3.5 h-3.5 text-[#b2e01e] flex-shrink-0" />
                    <span className="truncate">{tech.proTips}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenVideoForTechnique(tech)}
                      className="py-2.5 btn-neon text-xs font-mono-tag font-black transition-all flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>شاهد الفيديو</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModalTechnique(tech)}
                      className="py-2.5 btn-outline-ink hover:bg-white/10 text-white rounded-xl text-xs font-mono-tag font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>التفاصيل</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTechniques.length === 0 && (
            <div className="card-dark p-12 text-center text-white/50 space-y-2 rounded-2xl">
              <HelpCircle className="w-10 h-10 mx-auto text-white/20" />
              <p className="text-xs font-bold text-white">لم نجد نتائج مطابقة لبحثك.</p>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: PADEL GLOSSARY & TERMINOLOGY ENCYCLOPEDIA */}
      {activeMainTab === 'glossary' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Glossary Search & Filters */}
          <div className="card-dark p-4 sm:p-6 rounded-2xl border border-white/15 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-[#b2e01e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <h2 className="font-bold text-base sm:text-lg text-white">قاموس مصطلحات البادل والتكتيك (Padel Glossary Encyclopedia)</h2>
            </div>

            <div className="relative">
              <input
                type="text"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="ابحث عن مصطلح (مثال: بانديخا، فيبورا، باخادا، تشيكيتا، بور 3)..."
                className="w-full theme-card-solid border border-white/20 focus:border-[#b2e01e] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none pl-10 text-right"
              />
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-tag text-xs">
              {glossaryCategories.map((cat) => {
                const isSelected = glossaryCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setGlossaryCategory(cat.id)}
                    className={`py-2 px-4 rounded-xl whitespace-nowrap transition-colors font-bold ${
                      isSelected
                        ? 'bg-[#b2e01e] text-[#002255] shadow font-black'
                        : 'theme-card-solid text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Glossary Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGlossary.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveGlossaryTerm(item)}
                className="card-dark p-6 rounded-2xl border border-white/15 hover:border-[#b2e01e]/60 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono-tag">
                    <span className="text-[10px] text-[#b2e01e] bg-[#b2e01e]/15 border border-[#b2e01e]/30 px-2.5 py-0.5 rounded-full font-bold">
                      {item.categoryAr}
                    </span>
                    <span className="text-[10px] text-white/60 border border-white/10 px-2.5 py-0.5 rounded-md theme-card-solid flex items-center gap-1">
                      <Compass className="w-3 h-3 text-[#b2e01e]" />
                      {item.courtPositionAr}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-white group-hover:text-[#b2e01e] transition-colors">
                      {item.termAr}
                    </h3>
                    <p className="font-mono-tag text-xs text-[#b2e01e]/80 font-bold mt-0.5">
                      [{item.termOriginal}]
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
                    {item.shortDefinition}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="theme-subcard p-3 rounded-xl text-xs text-white/90 space-y-1">
                    <span className="font-mono-tag text-[10px] text-[#b2e01e] font-bold block">[ السياق التكتيكي ]</span>
                    <p className="line-clamp-2">{item.tacticalContext}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono-tag text-[#b2e01e]">
                    <span>[ اضغط للاطلاع على التفاصيل الكاملة ]</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredGlossary.length === 0 && (
            <div className="card-dark p-12 text-center text-white/50 space-y-2 rounded-2xl">
              <HelpCircle className="w-10 h-10 mx-auto text-white/20" />
              <p className="text-xs font-bold text-white">لم نجد مصطلحات مطابقة لبحثك.</p>
            </div>
          )}

        </div>
      )}

      {/* Technique Modal Detail View */}
      {activeModalTechnique && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="card-dark rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-white/20 text-right p-6 sm:p-8 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex items-start justify-between border-b border-white/15 pb-4">
              <div>
                <span className="font-mono-tag text-[10px] text-[#b2e01e] bg-[#b2e01e]/15 border border-[#b2e01e]/30 px-2.5 py-0.5 rounded-full font-bold">
                  {activeModalTechnique.categoryAr} • {activeModalTechnique.difficulty}
                </span>
                <h2 className="font-alexandria font-black text-2xl text-white mt-1.5">
                  {activeModalTechnique.titleAr}
                </h2>
                <p className="font-mono-tag text-xs text-white/60 mt-0.5">
                  {activeModalTechnique.titleOriginal} • {activeModalTechnique.courtPositionAr}
                </p>
              </div>

              <button
                onClick={() => setActiveModalTechnique(null)}
                className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-white/90 theme-card-solid border border-white/15 p-4 rounded-xl leading-relaxed">
              {activeModalTechnique.shortDesc}
            </p>

            {/* Steps */}
            <div className="space-y-3">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ EXECUTION SEQUENCE ]</span>
              <ol className="space-y-2 text-xs text-white/80">
                {activeModalTechnique.steps.map((step: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5 theme-card-solid p-3 rounded-xl border border-white/10">
                    <span className="font-mono-tag text-[#b2e01e] font-black text-xs mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Points & Errors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="theme-card-solid border border-white/15 p-4 rounded-xl space-y-2 text-xs">
                <span className="font-mono-tag text-[10px] text-[#b2e01e] uppercase block font-bold">CRITICAL BENCHMARKS</span>
                <ul className="space-y-1.5 text-white/80">
                  {activeModalTechnique.keyPoints.map((kp: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#b2e01e]">•</span>
                      <span>{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="theme-card-solid border border-red-900/40 p-4 rounded-xl space-y-2 text-xs">
                <span className="font-mono-tag text-[10px] text-red-400 uppercase block font-bold">AVOID REPEAT ERRORS</span>
                <ul className="space-y-1.5 text-white/80">
                  {activeModalTechnique.commonMistakes.map((cm: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-red-400">•</span>
                      <span>{cm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="theme-subcard border border-[#b2e01e]/30 p-4 rounded-xl text-xs text-white">
              <span className="font-mono-tag text-[#b2e01e] block text-[10px] mb-1 font-bold">
                [ PRO DIRECTIVE ]
              </span>
              <p>"{activeModalTechnique.proTips}"</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModalTechnique(null)}
                className="btn-outline-ink px-6 py-2.5 text-xs font-mono-tag"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Glossary Term Modal Detail View */}
      {activeGlossaryTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="card-dark rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-white/20 text-right p-6 sm:p-8 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex items-start justify-between border-b border-white/15 pb-4">
              <div>
                <span className="font-mono-tag text-[10px] text-[#b2e01e] bg-[#b2e01e]/15 border border-[#b2e01e]/30 px-2.5 py-0.5 rounded-full font-bold">
                  {activeGlossaryTerm.categoryAr}
                </span>
                <h2 className="font-alexandria font-black text-2xl text-white mt-1.5">
                  {activeGlossaryTerm.termAr}
                </h2>
                <p className="font-mono-tag text-xs text-[#b2e01e] font-bold mt-0.5">
                  [{activeGlossaryTerm.termOriginal}] • التمركز: {activeGlossaryTerm.courtPositionAr}
                </p>
              </div>

              <button
                onClick={() => setActiveGlossaryTerm(null)}
                className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="theme-card-solid border border-white/15 p-4 rounded-xl space-y-2">
                <span className="font-mono-tag text-[10px] text-[#b2e01e] block font-bold">[ التعريف الأكاديمي ]</span>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                  {activeGlossaryTerm.shortDefinition}
                </p>
              </div>

              <div className="theme-card-solid border border-white/15 p-4 rounded-xl space-y-2">
                <span className="font-mono-tag text-[10px] text-[#b2e01e] block font-bold">[ السياق التكتيكي والاستخدام ]</span>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                  {activeGlossaryTerm.tacticalContext}
                </p>
              </div>

              <div className="theme-subcard border border-[#b2e01e]/30 p-4 rounded-xl text-xs text-white space-y-1">
                <span className="font-mono-tag text-[#b2e01e] block text-[10px] font-bold">
                  [ نصيحة المحترفين (PRO TIP) ]
                </span>
                <p className="font-medium">"{activeGlossaryTerm.proTip}"</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveGlossaryTerm(null)}
                className="btn-outline-ink px-6 py-2.5 text-xs font-mono-tag"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Custom Video Player Modal */}
      {activeVideoModal && (
        <CustomVideoPlayer
          video={activeVideoModal}
          playlist={PADEL_VIDEOS}
          onSelectVideo={(vid) => setActiveVideoModal(vid)}
          onClose={() => setActiveVideoModal(null)}
        />
      )}

    </div>
  );
};
