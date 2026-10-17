import React, { useState } from 'react';
import { PADEL_TECHNIQUES } from '../data/techniquesData';
import { PADEL_GLOSSARY_ITEMS, GlossaryTerm } from '../data/glossaryData';
import { PADEL_VIDEOS } from '../data/videoData';
import { useApp } from '../context/AppContext';
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
  Play,
  Youtube
} from 'lucide-react';

export const LearnPadelPage: React.FC = () => {
  const { navigateTo, toggleVideoWatched, isVideoWatched } = useApp();
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
    <div className="w-full max-w-6xl mx-auto py-2 sm:py-4 text-right space-y-5 sm:space-y-6 font-alexandria min-w-0">
      
      {/* Header Banner */}
      <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] space-y-3.5 sm:space-y-4 relative overflow-hidden min-w-0">
        <div className="absolute top-0 right-0 w-2 h-full bg-[#b2e01e]"></div>
        <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ TECHNICAL REPOSITORY & ENCYCLOPEDIA ]</span>
        <h1 className="font-alexandria font-black text-xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase flex items-center gap-3 break-words leading-tight">
          <span>تعلّم تقنيات وتكتيكات <span className="text-[#b2e01e]">ومصطلحات البادل</span></span>
        </h1>
        <p className="text-xs sm:text-sm text-[#f2f7ff]/75 leading-relaxed max-w-2xl break-words">
          دليلك الميكانيكي والتكتيكي الشامل لتنفيذ كل ضربة ومهارة، بالإضافة إلى موسوعة مصطلحات البادل الرسمية لإتقان لغة المحترفين.
        </p>

        {/* Main Section Switcher Tabs */}
        <div className="pt-2 flex flex-wrap gap-2.5 min-w-0">
          <button
            type="button"
            onClick={() => setActiveMainTab('techniques')}
            className={`py-2.5 sm:py-3 px-4 sm:px-6 rounded font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer ${
              activeMainTab === 'techniques'
                ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                : 'bg-[#0b0b0d] text-[#f2f7ff]/80 hover:text-white border border-[var(--card-border)]'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span className="truncate">[01] التقنيات والحركات العملية</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('glossary')}
            className={`py-2.5 sm:py-3 px-4 sm:px-6 rounded font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer ${
              activeMainTab === 'glossary'
                ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                : 'bg-[#0b0b0d] text-[#f2f7ff]/80 hover:text-white border border-[var(--card-border)]'
            }`}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              <line x1="10" y1="6" x2="16" y2="6"/>
              <line x1="10" y1="10" x2="16" y2="10"/>
            </svg>
            <span className="truncate">[02] قاموس مصطلحات البادل الشامل</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('video-tutorials')}
            className="py-2.5 sm:py-3 px-4 sm:px-6 rounded font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer bg-[#0b0b0d] text-[#b2e01e] border border-[#b2e01e]/60 hover:bg-[#b2e01e] hover:text-[#0b0b0d]"
          >
            <Play className="w-4 h-4 shrink-0 fill-current" />
            <span className="truncate">[03] مكتبة التمارين المرئية والفيديوهات (HD)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: TECHNIQUES & DRILLS */}
      {activeMainTab === 'techniques' && (
        <div className="space-y-4 sm:space-y-6 min-w-0">
          
          {/* Filter and Search Bar */}
          <div className="card-dark p-4 sm:p-5 rounded border border-[var(--card-border)] bg-[#16161a] space-y-3.5 min-w-0">
            <div className="relative min-w-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن أي ضربة أو مهارة (مثال: البانديخا، الفيبورا، الفورهاند، الزجاج)..."
                className="w-full bg-[#0b0b0d] border border-[var(--card-border)] focus:border-[#b2e01e] rounded px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-white/35 focus:outline-none pl-10 text-right font-medium"
              />
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3 sm:top-3.5 pointer-events-none" />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-tag text-xs min-w-0">
              {techniqueCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`py-2 px-3.5 rounded whitespace-nowrap transition-colors font-bold cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                        : 'bg-[#0b0b0d] text-[#f2f7ff]/70 hover:text-white border border-[var(--card-border)]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of Techniques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 min-w-0">
            {filteredTechniques.map((tech) => (
              <div
                key={tech.id}
                className="card-dark p-4 sm:p-5 md:p-6 rounded border border-[var(--card-border)] bg-[#16161a] hover:border-[#b2e01e] transition-colors flex flex-col justify-between space-y-3.5 group min-w-0"
              >
                <div className="space-y-2.5 min-w-0">
                  <div className="flex items-center justify-between font-mono-tag gap-2 min-w-0">
                    <span className="text-[10px] text-[#0b0b0d] bg-[#b2e01e] px-2 py-0.5 rounded font-black shrink-0">
                      {tech.categoryAr}
                    </span>
                    <span className="text-[10px] text-[#f2f7ff]/60 border border-[var(--card-border)] bg-[#0b0b0d] px-2 py-0.5 rounded shrink-0">
                      {tech.difficulty}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#b2e01e] transition-colors break-words">
                      {tech.titleAr}
                    </h3>
                    <p className="font-mono-tag text-[10px] text-white/50 mt-0.5 truncate">
                      {tech.titleOriginal} • {tech.courtPositionAr}
                    </p>
                  </div>

                  <p className="text-xs text-[#f2f7ff]/75 leading-relaxed font-medium break-words">
                    {tech.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--card-border)] space-y-2.5 min-w-0">
                  <div className="text-[11px] text-[#f2f7ff]/70 flex items-center gap-1.5 min-w-0">
                    <Zap className="w-3.5 h-3.5 text-[#b2e01e] shrink-0" />
                    <span className="truncate">{tech.proTips}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 min-w-0">
                    <button
                      type="button"
                      onClick={() => handleOpenVideoForTechnique(tech)}
                      className="py-2 btn-neon text-xs font-mono-tag font-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current shrink-0" />
                      <span>شاهد الفيديو</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModalTechnique(tech)}
                      className="py-2 btn-outline-ink text-white text-xs font-mono-tag font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>التفاصيل</span>
                      <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTechniques.length === 0 && (
            <div className="card-dark p-8 sm:p-12 text-center text-white/50 space-y-2 rounded border border-[var(--card-border)] bg-[#16161a] min-w-0">
              <HelpCircle className="w-10 h-10 mx-auto text-white/20" />
              <p className="text-xs font-bold text-white">لم نجد نتائج مطابقة لبحثك.</p>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: PADEL GLOSSARY & TERMINOLOGY ENCYCLOPEDIA */}
      {activeMainTab === 'glossary' && (
        <div className="space-y-4 sm:space-y-6 min-w-0">
          
          {/* Glossary Search & Filters */}
          <div className="card-dark p-4 sm:p-5 rounded border border-[var(--card-border)] bg-[#16161a] space-y-3.5 min-w-0">
            <div className="flex items-center gap-2 text-white min-w-0">
              <svg className="w-5 h-5 text-[#b2e01e] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <h2 className="font-bold text-sm sm:text-base text-white break-words">قاموس مصطلحات البادل والتكتيك (Padel Glossary Encyclopedia)</h2>
            </div>

            <div className="relative min-w-0">
              <input
                type="text"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="ابحث عن مصطلح (مثال: بانديخا، فيبورا، باخادا، تشيكيتا، بور 3)..."
                className="w-full bg-[#0b0b0d] border border-[var(--card-border)] focus:border-[#b2e01e] rounded px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-white/35 focus:outline-none pl-10 text-right font-medium"
              />
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3 sm:top-3.5 pointer-events-none" />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-tag text-xs min-w-0">
              {glossaryCategories.map((cat) => {
                const isSelected = glossaryCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setGlossaryCategory(cat.id)}
                    className={`py-2 px-3.5 rounded whitespace-nowrap transition-colors font-bold cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                        : 'bg-[#0b0b0d] text-[#f2f7ff]/70 hover:text-white border border-[var(--card-border)]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Glossary Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 min-w-0">
            {filteredGlossary.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveGlossaryTerm(item)}
                className="card-dark p-4 sm:p-5 md:p-6 rounded border border-[var(--card-border)] bg-[#16161a] hover:border-[#b2e01e] transition-colors cursor-pointer flex flex-col justify-between space-y-3.5 group min-w-0"
              >
                <div className="space-y-2.5 min-w-0">
                  <div className="flex items-center justify-between font-mono-tag gap-2 min-w-0">
                    <span className="text-[10px] text-[#0b0b0d] bg-[#b2e01e] px-2 py-0.5 rounded font-black shrink-0">
                      {item.categoryAr}
                    </span>
                    <span className="text-[10px] text-[#f2f7ff]/60 border border-[var(--card-border)] bg-[#0b0b0d] px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                      <Compass className="w-3 h-3 text-[#b2e01e] shrink-0" />
                      <span>{item.courtPositionAr}</span>
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#b2e01e] transition-colors break-words">
                      {item.termAr}
                    </h3>
                    <p className="font-mono-tag text-xs text-[#b2e01e] font-bold mt-0.5 truncate">
                      [{item.termOriginal}]
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#f2f7ff]/80 leading-relaxed font-medium break-words">
                    {item.shortDefinition}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--card-border)] space-y-2.5 min-w-0">
                  <div className="bg-[#0b0b0d] p-3 rounded border border-[var(--card-border)] text-xs text-[#f2f7ff]/90 space-y-1 min-w-0">
                    <span className="font-mono-tag text-[10px] text-[#b2e01e] font-bold block uppercase">[ السياق التكتيكي ]</span>
                    <p className="break-words leading-relaxed text-[11px] text-[#f2f7ff]/75">{item.tacticalContext}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono-tag text-[#b2e01e] pt-1">
                    <span>[ اضغط للاطلاع على التفاصيل الكاملة ]</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform shrink-0" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredGlossary.length === 0 && (
            <div className="card-dark p-8 sm:p-12 text-center text-white/50 space-y-2 rounded border border-[var(--card-border)] bg-[#16161a] min-w-0">
              <HelpCircle className="w-10 h-10 mx-auto text-white/20" />
              <p className="text-xs font-bold text-white">لم نجد مصطلحات مطابقة لبحثك.</p>
            </div>
          )}

        </div>
      )}

      {/* Technique Modal Detail View */}
      {activeModalTechnique && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="card-dark rounded max-w-3xl w-full max-h-[88vh] overflow-y-auto border border-[#b2e01e] bg-[#16161a] text-right p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 min-w-0"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex items-start justify-between border-b border-[var(--card-border)] pb-3 sm:pb-4 gap-3 min-w-0">
              <div className="min-w-0 flex-1">
                <span className="font-mono-tag text-[10px] text-[#0b0b0d] bg-[#b2e01e] px-2 py-0.5 rounded font-black inline-block">
                  {activeModalTechnique.categoryAr} • {activeModalTechnique.difficulty}
                </span>
                <h2 className="font-alexandria font-black text-xl sm:text-2xl text-white mt-1.5 break-words">
                  {activeModalTechnique.titleAr}
                </h2>
                <p className="font-mono-tag text-xs text-white/60 mt-0.5 truncate">
                  {activeModalTechnique.titleOriginal} • {activeModalTechnique.courtPositionAr}
                </p>
              </div>

              <button
                onClick={() => setActiveModalTechnique(null)}
                className="text-white/60 hover:text-white p-1.5 rounded bg-[#0b0b0d] border border-[var(--card-border)] shrink-0 cursor-pointer"
                aria-label="إغلاق النافذة"
              >
                <X className="w-5 h-5 text-[#b2e01e]" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#f2f7ff]/90 bg-[#0b0b0d] border border-[var(--card-border)] p-3.5 sm:p-4 rounded leading-relaxed break-words">
              {activeModalTechnique.shortDesc}
            </p>

            {/* Steps */}
            <div className="space-y-2.5 min-w-0">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ EXECUTION SEQUENCE ]</span>
              <ol className="space-y-2 text-xs text-[#f2f7ff]/85 min-w-0">
                {activeModalTechnique.steps.map((step: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-[#0b0b0d] p-3 rounded border border-[var(--card-border)] min-w-0">
                    <span className="font-mono-tag text-[#b2e01e] font-black text-xs shrink-0 mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="leading-relaxed break-words">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Points & Errors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 min-w-0">
              <div className="bg-[#0b0b0d] border border-[var(--card-border)] p-3.5 sm:p-4 rounded space-y-2 text-xs min-w-0">
                <span className="font-mono-tag text-[10px] text-[#b2e01e] uppercase block font-bold">CRITICAL BENCHMARKS</span>
                <ul className="space-y-1.5 text-[#f2f7ff]/80">
                  {activeModalTechnique.keyPoints.map((kp: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5 break-words">
                      <span className="text-[#b2e01e] shrink-0">•</span>
                      <span>{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0b0b0d] border border-red-900/50 p-3.5 sm:p-4 rounded space-y-2 text-xs min-w-0">
                <span className="font-mono-tag text-[10px] text-red-400 uppercase block font-bold">AVOID REPEAT ERRORS</span>
                <ul className="space-y-1.5 text-[#f2f7ff]/80">
                  {activeModalTechnique.commonMistakes.map((cm: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5 break-words">
                      <span className="text-red-400 shrink-0">•</span>
                      <span>{cm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-[#0b0b0d] border border-[#b2e01e] p-3.5 sm:p-4 rounded text-xs text-white min-w-0">
              <span className="font-mono-tag text-[#b2e01e] block text-[10px] mb-1 font-bold uppercase">
                [ PRO DIRECTIVE ]
              </span>
              <p className="leading-relaxed break-words">"{activeModalTechnique.proTips}"</p>
            </div>

            <div className="pt-2 flex justify-end min-w-0">
              <button
                type="button"
                onClick={() => setActiveModalTechnique(null)}
                className="btn-outline-ink px-6 py-2.5 text-xs font-mono-tag cursor-pointer"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Glossary Term Modal Detail View */}
      {activeGlossaryTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="card-dark rounded max-w-2xl w-full max-h-[88vh] overflow-y-auto border border-[#b2e01e] bg-[#16161a] text-right p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 min-w-0"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex items-start justify-between border-b border-[var(--card-border)] pb-3 sm:pb-4 gap-3 min-w-0">
              <div className="min-w-0 flex-1">
                <span className="font-mono-tag text-[10px] text-[#0b0b0d] bg-[#b2e01e] px-2 py-0.5 rounded font-black inline-block">
                  {activeGlossaryTerm.categoryAr}
                </span>
                <h2 className="font-alexandria font-black text-xl sm:text-2xl text-white mt-1.5 break-words">
                  {activeGlossaryTerm.termAr}
                </h2>
                <p className="font-mono-tag text-xs text-[#b2e01e] font-bold mt-0.5 truncate">
                  [{activeGlossaryTerm.termOriginal}] • التمركز: {activeGlossaryTerm.courtPositionAr}
                </p>
              </div>

              <button
                onClick={() => setActiveGlossaryTerm(null)}
                className="text-white/60 hover:text-white p-1.5 rounded bg-[#0b0b0d] border border-[var(--card-border)] shrink-0 cursor-pointer"
                aria-label="إغلاق النافذة"
              >
                <X className="w-5 h-5 text-[#b2e01e]" />
              </button>
            </div>

            <div className="space-y-3.5 min-w-0">
              <div className="bg-[#0b0b0d] border border-[var(--card-border)] p-3.5 sm:p-4 rounded space-y-1.5 min-w-0">
                <span className="font-mono-tag text-[10px] text-[#b2e01e] block font-bold uppercase">[ التعريف الأكاديمي ]</span>
                <p className="text-xs sm:text-sm text-[#f2f7ff]/90 leading-relaxed font-medium break-words">
                  {activeGlossaryTerm.shortDefinition}
                </p>
              </div>

              <div className="bg-[#0b0b0d] border border-[var(--card-border)] p-3.5 sm:p-4 rounded space-y-1.5 min-w-0">
                <span className="font-mono-tag text-[10px] text-[#b2e01e] block font-bold uppercase">[ السياق التكتيكي والاستخدام ]</span>
                <p className="text-xs sm:text-sm text-[#f2f7ff]/90 leading-relaxed font-medium break-words">
                  {activeGlossaryTerm.tacticalContext}
                </p>
              </div>

              <div className="bg-[#0b0b0d] border border-[#b2e01e] p-3.5 sm:p-4 rounded text-xs text-white space-y-1 min-w-0">
                <span className="font-mono-tag text-[#b2e01e] block text-[10px] font-bold uppercase">
                  [ نصيحة المحترفين (PRO TIP) ]
                </span>
                <p className="font-medium break-words leading-relaxed">"{activeGlossaryTerm.proTip}"</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end min-w-0">
              <button
                type="button"
                onClick={() => setActiveGlossaryTerm(null)}
                className="btn-outline-ink px-6 py-2.5 text-xs font-mono-tag cursor-pointer"
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
          onMarkWatched={(vidId) => toggleVideoWatched(vidId)}
          isWatched={isVideoWatched(activeVideoModal.id)}
        />
      )}

    </div>
  );
};
