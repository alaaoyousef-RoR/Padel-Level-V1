import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  PADEL_RACKETS, 
  RACKET_SHAPE_GUIDES, 
  PadelRacket, 
  RacketLevel, 
  RacketShape 
} from '../data/racketsData';
import { 
  PadelRacketOfficialVector, 
  AngledRacketIllustration, 
  WhatsAppVector,
  PadelBallVector
} from '../components/BrandEquipmentVectors';
import { 
  Search, 
  SlidersHorizontal, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  ArrowUpRight, 
  Zap, 
  Info, 
  X, 
  HelpCircle,
  ExternalLink,
  RotateCcw,
  Target
} from 'lucide-react';

export const RacketsPage: React.FC = () => {
  const { user, navigateTo } = useApp();

  // Filter state
  const [selectedLevel, setSelectedLevel] = useState<RacketLevel | 'all'>('all');
  const [selectedShape, setSelectedShape] = useState<RacketShape | 'all'>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active modal details
  const [activeModalRacket, setActiveModalRacket] = useState<PadelRacket | null>(null);

  // Compare mode
  const [compareList, setCompareList] = useState<PadelRacket[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Smart Finder / Quiz Wizard
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizLevel, setQuizLevel] = useState<RacketLevel>('intermediate');
  const [quizStyle, setQuizStyle] = useState<'control' | 'balanced' | 'power'>('balanced');
  const [quizPriority, setQuizPriority] = useState<'comfort' | 'versatility' | 'attack'>('versatility');
  const [quizResult, setQuizResult] = useState<PadelRacket | null>(null);

  // Unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(PADEL_RACKETS.map(r => r.brand)));
    return list.sort();
  }, []);

  // Filtered rackets
  const filteredRackets = useMemo(() => {
    return PADEL_RACKETS.filter(racket => {
      // Level filter
      if (selectedLevel !== 'all' && racket.level !== selectedLevel) return false;
      // Shape filter
      if (selectedShape !== 'all' && racket.shape !== selectedShape) return false;
      // Brand filter
      if (selectedBrand !== 'all' && racket.brand !== selectedBrand) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = racket.modelName.toLowerCase().includes(q);
        const matchesBrand = racket.brand.toLowerCase().includes(q);
        const matchesPlayer = racket.proPlayerEndorsed?.toLowerCase().includes(q);
        const matchesDesc = racket.tierSummaryAr.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesPlayer && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [selectedLevel, selectedShape, selectedBrand, searchQuery]);

  // Handle Smart Match calculation
  const handleRunQuiz = () => {
    const matched = PADEL_RACKETS.find(r => {
      if (quizLevel === 'beginner') {
        if (quizPriority === 'comfort') return r.id === 'babolat-reflex' || r.id === 'adidas-drive-33';
        return r.id === 'bullpadel-indiga-ctr';
      }
      if (quizLevel === 'intermediate') {
        if (quizStyle === 'control') return r.id === 'nox-ml10-pro-cup-luxury-2024' || r.id === 'kuikma-pr-990-precision-soft';
        if (quizStyle === 'power') return r.id === 'bullpadel-vertex-04-comfort-2024' || r.id === 'adidas-metalbone-team';
        return r.id === 'head-speed-motion' || r.id === 'babolat-counter-veron-2024';
      }
      // Advanced
      if (quizStyle === 'power') return r.id === 'bullpadel-hack-03' || r.id === 'babolat-technical-viper' || r.id === 'adidas-metalbone-hrd-plus';
      return r.id === 'nox-at10-genius-18k-agustin-tapia' || r.id === 'bullpadel-vertex-04';
    }) || PADEL_RACKETS[0];

    setQuizResult(matched);
  };

  const toggleCompare = (racket: PadelRacket) => {
    if (compareList.some(r => r.id === racket.id)) {
      setCompareList(compareList.filter(r => r.id !== racket.id));
    } else {
      if (compareList.length >= 3) {
        alert('يمكنك مقارنة حتى 3 مضارب بحد أقصى.');
        return;
      }
      setCompareList([...compareList, racket]);
    }
  };

  const getWhatsAppConsultationUrl = (racket: PadelRacket) => {
    const text = encodeURIComponent(
      `مرحباً كابتن، أود استشارتكم حول مضرب (${racket.brand} ${racket.modelName}) وملاءمته لمستواي في البادل (${racket.levelAr}).`
    );
    return `https://wa.me/966500365049?text=${text}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-2 sm:py-4 text-right space-y-5 sm:space-y-6 font-alexandria min-w-0">
      
      {/* 1. HERO SECTION & HEADER */}
      <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] space-y-4 relative overflow-hidden min-w-0">
        <div className="absolute top-0 right-0 w-2 h-full bg-[#b2e01e]"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10 min-w-0">
          <div className="space-y-2 max-w-2xl min-w-0 flex-1">
            <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ EQUIPMENT SHOWCASE & GUIDE ]</span>

            <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight break-words">
              دليل ومضارب البادل <span className="text-[#b2e01e]">المختارة حسب المستوى</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#f2f7ff]/80 leading-relaxed font-medium break-words">
              اختر المضرب الأنسب الذي يرفع كفاءة أدائك ويحمي ذراعك. استكشف نخبة مضارب كبرى العلامات العالمية (Bullpadel, Nox, Babolat, Head, Wilson) المصنفة بدقة علمية للاعبين المبتدئين والمتوسطين والمحترفين.
            </p>

            {/* Quick stats indicators */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#f2f7ff]/70 font-mono-tag min-w-0">
              <div className="flex items-center gap-1.5 shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#b2e01e]" />
                <span>مواصفات رسمية معتمدة</span>
              </div>
              <span aria-hidden="true" className="text-white/30">·</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <Target className="w-4 h-4 text-[#b2e01e]" />
                <span>3 مستويات مهارية دقيقة</span>
              </div>
              <span aria-hidden="true" className="text-white/30">·</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <Sparkles className="w-4 h-4 text-[#b2e01e]" />
                <span>استشارة مباشرة مع الكوتش</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={() => {
                setIsQuizOpen(!isQuizOpen);
                if (!quizResult) handleRunQuiz();
              }}
              className="btn-neon px-5 py-3 text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#0b0b0d] shrink-0" />
              <span>{isQuizOpen ? 'إغلاق مساعد الاختيار' : 'مساعد اختيار المضرب المثالي'}</span>
            </button>

            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="btn-outline-ink px-5 py-2.5 text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>مقارنة المضارب المختارة</span>
                <span className="w-5 h-5 rounded bg-[#b2e01e] text-[#0b0b0d] font-black text-[10px] flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. SMART QUIZ / RACKET FINDER ACCORDION */}
      {isQuizOpen && (
        <div className="card-dark p-4 sm:p-6 md:p-7 rounded border border-[#b2e01e] bg-[#16161a] space-y-5 min-w-0">
          <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-3 min-w-0 gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded bg-[#b2e01e] text-[#0b0b0d] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h2 className="font-alexandria font-bold text-sm sm:text-base text-white truncate">مساعد اختيار المضرب الذكي (Smart Racket Finder)</h2>
                <p className="text-xs text-[#f2f7ff]/70 truncate">أجب على 3 أسئلة سريعة لنرشح لك المضرب الهندسي الأنسب لأسلوب لعبك</p>
              </div>
            </div>
            <button
              onClick={() => setIsQuizOpen(false)}
              className="text-white/60 hover:text-white p-1.5 rounded bg-[#0b0b0d] border border-[var(--card-border)] cursor-pointer shrink-0"
              title="إغلاق"
            >
              <X className="w-4 h-4 text-[#b2e01e]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0">
            {/* Step 1: Level */}
            <div className="space-y-2 min-w-0">
              <label className="text-xs font-bold text-white block font-mono-tag">1. ما هو مستواك الحالي في البادل؟</label>
              <div className="space-y-1.5 min-w-0">
                {[
                  { id: 'beginner', label: 'مبتدئ (Level 1-2)', desc: 'أتعلم الأساسيات وضرب الكرة' },
                  { id: 'intermediate', label: 'متوسط (Level 3)', desc: 'ألعب بانتظام وأتحكم في الراليات' },
                  { id: 'advanced', label: 'متقدم / منافسات (Level 4-5)', desc: 'أجيد كافة الضربات وسرعة الإنهاء' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setQuizLevel(opt.id as RacketLevel); }}
                    className={`w-full text-right p-2.5 rounded border text-xs transition cursor-pointer min-w-0 ${
                      quizLevel === opt.id
                        ? 'border-[#b2e01e] bg-[#0b0b0d] text-white font-bold'
                        : 'border-[var(--card-border)] hover:border-white/30 text-white/70 bg-[#0b0b0d]'
                    }`}
                  >
                    <div className="font-bold text-white truncate">{opt.label}</div>
                    <div className="text-[11px] text-[#f2f7ff]/60 break-words">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Play Style */}
            <div className="space-y-2 min-w-0">
              <label className="text-xs font-bold text-white block font-mono-tag">2. ما هو أسلوب لعبك وتمركزك المفضل؟</label>
              <div className="space-y-1.5 min-w-0">
                {[
                  { id: 'control', label: 'دفاع وتحكم (Control & Defense)', desc: 'أفضل بناء النقطة وتفادي الأخطاء' },
                  { id: 'balanced', label: 'تكتيكي شامل (All-Round Player)', desc: 'توازن بين الدفاع وسرعة الفولي' },
                  { id: 'power', label: 'هجوم حاسم وسحق (Power & Attack)', desc: 'إنهاء النقاط بالسماش والبانديخا' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setQuizStyle(opt.id as any); }}
                    className={`w-full text-right p-2.5 rounded border text-xs transition cursor-pointer min-w-0 ${
                      quizStyle === opt.id
                        ? 'border-[#b2e01e] bg-[#0b0b0d] text-white font-bold'
                        : 'border-[var(--card-border)] hover:border-white/30 text-white/70 bg-[#0b0b0d]'
                    }`}
                  >
                    <div className="font-bold text-white truncate">{opt.label}</div>
                    <div className="text-[11px] text-[#f2f7ff]/60 break-words">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Priority */}
            <div className="space-y-2 min-w-0">
              <label className="text-xs font-bold text-white block font-mono-tag">3. ما هي أولويتك القصوى عند اختيار المضرب؟</label>
              <div className="space-y-1.5 min-w-0">
                {[
                  { id: 'comfort', label: 'راحة الذراع ونقطة ضرب واسعة', desc: 'حماية المرفق وسهولة رد الكرات' },
                  { id: 'versatility', label: 'تعدد الاستخدامات وسرعة الحركة', desc: 'مضرب رشيق يخدمني في كل المواقف' },
                  { id: 'attack', label: 'أقصى طاقة انفجارية وصلابة', desc: 'إخراج الكرة خارج القفص وقوة ساحقة' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setQuizPriority(opt.id as any); }}
                    className={`w-full text-right p-2.5 rounded border text-xs transition cursor-pointer min-w-0 ${
                      quizPriority === opt.id
                        ? 'border-[#b2e01e] bg-[#0b0b0d] text-white font-bold'
                        : 'border-[var(--card-border)] hover:border-white/30 text-white/70 bg-[#0b0b0d]'
                    }`}
                  >
                    <div className="font-bold text-white truncate">{opt.label}</div>
                    <div className="text-[11px] text-[#f2f7ff]/60 break-words">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[var(--card-border)] min-w-0">
            <button
              onClick={handleRunQuiz}
              className="btn-neon px-5 py-2.5 text-xs font-black flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto shrink-0"
            >
              <Zap className="w-4 h-4 text-[#0b0b0d] shrink-0" />
              <span>تحديث النتيجة المقترحة</span>
            </button>

            {quizResult && (
              <div className="flex items-center gap-3 p-2.5 rounded border border-[#b2e01e] bg-[#0b0b0d] w-full sm:w-auto min-w-0 justify-between sm:justify-start">
                <div className="text-right min-w-0">
                  <span className="text-[10px] font-mono-tag text-[#b2e01e] block truncate">المضرب الأنسب لك بنسبة 98%:</span>
                  <span className="text-xs font-bold text-white truncate block">{quizResult.brand} {quizResult.modelName}</span>
                </div>
                <button
                  onClick={() => setActiveModalRacket(quizResult)}
                  className="px-3 py-1.5 text-xs font-black rounded bg-[#b2e01e] text-[#0b0b0d] transition whitespace-nowrap cursor-pointer shrink-0"
                >
                  فحص التفاصيل
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. SHAPE & SPECS GUIDE BANNER (Round vs Teardrop vs Diamond) */}
      <div className="space-y-3 min-w-0">
        <div className="flex items-center justify-between min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <Info className="w-4 h-4 text-[#b2e01e] shrink-0" />
            <h2 className="text-base sm:text-lg font-bold font-alexandria text-white truncate">
              دليل الأشكال الهندسية لمضارب البادل (Racket Shapes 101)
            </h2>
          </div>
          <span className="text-xs font-mono-tag text-[#b2e01e] hidden sm:inline shrink-0">[ TECHNICAL ARCHITECTURE ]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 min-w-0">
          {RACKET_SHAPE_GUIDES.map((guide) => {
            const isSelected = selectedShape === guide.shape;
            return (
              <div 
                key={guide.shape}
                onClick={() => setSelectedShape(isSelected ? 'all' : guide.shape)}
                className={`card-dark p-4 sm:p-5 rounded border transition-colors cursor-pointer group bg-[#16161a] min-w-0 ${
                  isSelected 
                    ? 'border-[#b2e01e]' 
                    : 'border-[var(--card-border)] hover:border-[#b2e01e]'
                }`}
              >
                <div className="flex items-center justify-between mb-2 gap-2 min-w-0">
                  <span className="font-alexandria font-bold text-sm text-white group-hover:text-[#b2e01e] transition-colors truncate">
                    {guide.titleAr}
                  </span>
                  <span className={`text-[10px] font-mono-tag px-2 py-0.5 rounded shrink-0 ${
                    isSelected ? 'bg-[#b2e01e] text-[#0b0b0d] font-black' : 'bg-[#0b0b0d] text-white/70 border border-[var(--card-border)]'
                  }`}>
                    {guide.shape.toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-[#b2e01e] font-semibold mb-1.5 truncate">{guide.subtitleAr}</p>
                <p className="text-xs text-[#f2f7ff]/75 leading-relaxed mb-3 break-words">{guide.sweetSpotDescAr}</p>

                <div className="space-y-1.5 pt-2 border-t border-[var(--card-border)] text-[11px] min-w-0">
                  <div className="flex items-center justify-between text-white/80 gap-2 min-w-0">
                    <span className="text-white/50 shrink-0">المستوى الأنسب:</span>
                    <span className="font-semibold text-right truncate">{guide.idealLevelAr}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/80 gap-2 min-w-0">
                    <span className="text-white/50 shrink-0">توزيع التوازن:</span>
                    <span className="font-semibold truncate">{guide.balanceDescAr.split('،')[0]}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[var(--card-border)] flex items-center justify-between text-xs">
                  <span className="text-white/60 group-hover:text-white transition truncate">
                    {isSelected ? 'إلغاء الفلترة' : 'عرض مضارب هذا الشكل فقط'}
                  </span>
                  <span className="text-[#b2e01e] font-bold shrink-0">←</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. FILTERING & SEARCH CONTROLS */}
      <div className="card-dark p-4 sm:p-5 rounded border border-[var(--card-border)] bg-[#16161a] space-y-3.5 min-w-0">
        
        {/* Row 1: Skill Level Filter Tabs (Buttons) & Search Input */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 min-w-0">
          
          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0b0b0d] rounded border border-[var(--card-border)] overflow-x-auto min-w-0">
            {[
              { id: 'all', label: 'جميع المستويات' },
              { id: 'beginner', label: 'مبتدئ (Beginner)' },
              { id: 'intermediate', label: 'متوسط (Intermediate)' },
              { id: 'advanced', label: 'متقدم (Advanced)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedLevel(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-bold rounded transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                  selectedLevel === tab.id
                    ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                    : 'text-[#f2f7ff]/70 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md min-w-0">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الموديل، الماركة (Bullpadel, Nox)، أو اللاعب..."
              className="w-full bg-[#0b0b0d] border border-[var(--card-border)] focus:border-[#b2e01e] rounded pr-9 pl-4 py-2 text-xs text-white placeholder-white/40 outline-none transition font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs cursor-pointer"
              >
                مسح
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Secondary Dropdown Filters (Shape, Brand, Reset) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--card-border)] text-xs min-w-0">
          
          <div className="flex flex-wrap items-center gap-3 min-w-0">
            {/* Shape Select */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[#f2f7ff]/60">الشكل:</span>
              <select
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value as any)}
                className="bg-[#0b0b0d] border border-[var(--card-border)] text-white rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#b2e01e] cursor-pointer"
              >
                <option value="all">كل الأشكال</option>
                <option value="round">دائري (Round)</option>
                <option value="teardrop">دمعي (Teardrop)</option>
                <option value="diamond">ألماسي (Diamond)</option>
              </select>
            </div>

            {/* Brand Select */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[#f2f7ff]/60">العلامة التجارية:</span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-[#0b0b0d] border border-[var(--card-border)] text-white rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#b2e01e] cursor-pointer"
              >
                <option value="all">جميع الماركات</option>
                {brands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            {(selectedLevel !== 'all' || selectedShape !== 'all' || selectedBrand !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedLevel('all');
                  setSelectedShape('all');
                  setSelectedBrand('all');
                  setSearchQuery('');
                }}
                className="flex items-center gap-1 text-[#b2e01e] hover:underline text-xs cursor-pointer font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط الفلاتر</span>
              </button>
            )}
          </div>

          {/* Result Count */}
          <div className="text-white/60 text-xs font-mono-tag">
            عرض <span className="text-[#b2e01e] font-black">{filteredRackets.length}</span> من أصل {PADEL_RACKETS.length} مضرب
          </div>
        </div>
      </div>

      {/* 5. RACKETS GRID SHOWCASE */}
      {filteredRackets.length === 0 ? (
        <div className="card-dark p-8 sm:p-12 rounded border border-[var(--card-border)] bg-[#16161a] text-center space-y-4 min-w-0">
          <div className="w-12 h-12 rounded bg-[#0b0b0d] border border-[var(--card-border)] text-white/60 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6 text-[#b2e01e]" />
          </div>
          <h3 className="font-alexandria font-bold text-base sm:text-lg text-white">لم نجد مضارب تطابق خيارات البحث</h3>
          <p className="text-xs text-[#f2f7ff]/70 max-w-md mx-auto break-words">
            يرجى تجربة تعديل الكلمات المفتاحية أو إعادة ضبط فلاتر المستوى والشكل والعلامة التجارية.
          </p>
          <button
            onClick={() => {
              setSelectedLevel('all');
              setSelectedShape('all');
              setSelectedBrand('all');
              setSearchQuery('');
            }}
            className="btn-neon px-5 py-2 text-xs font-black cursor-pointer"
          >
            عرض كافة المضارب
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 min-w-0">
          {filteredRackets.map((racket) => {
            const isCompared = compareList.some(r => r.id === racket.id);

            return (
              <div 
                key={racket.id}
                className="card-dark rounded border border-[var(--card-border)] bg-[#16161a] overflow-hidden flex flex-col justify-between group transition-colors hover:border-[#b2e01e] min-w-0"
              >
                {/* Upper section: Image, Brand, Badges */}
                <div className="min-w-0">
                  {/* Card Visual Header with Clean Metadata */}
                  <div className="relative min-h-[200px] sm:min-h-[220px] bg-[#0b0b0d] p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden border-b border-[var(--card-border)] min-w-0">
                    
                    {/* Top Row: Clean Brand & Level Text */}
                    <div className="flex items-center justify-between text-xs relative z-10 gap-2 min-w-0">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-black text-xs sm:text-sm tracking-wider uppercase truncate" style={{ color: racket.colorAccent }}>
                          {racket.brand}
                        </span>
                        <span aria-hidden="true" className="text-white/40">·</span>
                        <span className="text-white/80 font-bold truncate">{racket.levelAr.split(' ')[0]}</span>
                      </div>

                      {/* Shape indicator text */}
                      <span className="text-[10px] sm:text-[11px] font-mono-tag text-white/70 shrink-0">
                        {racket.shapeAr.split(' ')[0]}
                      </span>
                    </div>

                    {/* Product Presentation Artwork (Real High-Resolution Product Image) */}
                    <div className="relative flex-1 flex items-center justify-center my-1.5 w-full min-h-[120px] max-h-40 overflow-hidden">
                      <img
                        src={racket.imageUrl}
                        alt={`${racket.brand} ${racket.modelName}`}
                        className="w-full h-32 sm:h-36 max-h-36 object-contain z-10 relative pointer-events-none group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = 'https://cdn.shopify.com/s/files/1/0646/3671/5163/files/8410.jpg';
                        }}
                      />
                    </div>

                    {/* Bottom overlay: Pro Endorsement if available */}
                    {racket.proPlayerEndorsed && (
                      <div className="relative z-10 text-[10px] text-white/90 flex items-center gap-1.5 bg-[#16161a] border border-[var(--card-border)] px-2 py-0.5 rounded self-start max-w-full truncate font-mono-tag">
                        <Sparkles className="w-3 h-3 text-[#b2e01e] shrink-0" />
                        <span className="truncate">نجم: {racket.proPlayerEndorsed}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 space-y-3.5 min-w-0">
                    {/* Title */}
                    <div className="min-w-0">
                      <h3 className="font-alexandria font-bold text-sm sm:text-base text-white group-hover:text-[#b2e01e] transition-colors break-words leading-snug">
                        {racket.modelName}
                      </h3>
                      <p className="text-[11px] text-[#f2f7ff]/60 font-mono-tag mt-0.5 truncate">
                        {racket.brand} Equipment Series
                      </p>
                    </div>

                    {/* Tier Suitability Summary: "لماذا يناسب هذا المستوى؟" */}
                    <div className="p-3 rounded bg-[#0b0b0d] border border-[var(--card-border)] space-y-1 min-w-0">
                      <span className="text-[10px] font-mono-tag text-[#b2e01e] font-bold block truncate">
                        لماذا يناسب هذا المستوى؟
                      </span>
                      <p className="text-xs text-[#f2f7ff]/80 leading-relaxed break-words font-medium">
                        {racket.tierSummaryAr}
                      </p>
                    </div>

                    {/* Key Technical Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-0.5 min-w-0">
                      <div className="p-2 rounded bg-[#0b0b0d] border border-[var(--card-border)] space-y-0.5 min-w-0">
                        <span className="text-white/40 block text-[10px] truncate">الشكل والتوازن</span>
                        <span className="text-white font-medium block truncate">
                          {racket.shapeAr.split(' ')[0]} / {racket.balanceAr.split(' ')[0]}
                        </span>
                      </div>

                      <div className="p-2 rounded bg-[#0b0b0d] border border-[var(--card-border)] space-y-0.5 min-w-0">
                        <span className="text-white/40 block text-[10px] truncate">الوزن التقريبي</span>
                        <span className="text-white font-medium block truncate font-mono-tag">
                          {racket.weight}
                        </span>
                      </div>

                      <div className="p-2 rounded bg-[#0b0b0d] border border-[var(--card-border)] space-y-0.5 min-w-0">
                        <span className="text-white/40 block text-[10px] truncate">مادة النواة (Core)</span>
                        <span className="text-white font-medium block truncate" title={racket.coreMaterial}>
                          {racket.coreMaterial}
                        </span>
                      </div>

                      <div className="p-2 rounded bg-[#0b0b0d] border border-[var(--card-border)] space-y-0.5 min-w-0">
                        <span className="text-white/40 block text-[10px] truncate">مادة السطح (Face)</span>
                        <span className="text-white font-medium block truncate" title={racket.faceMaterial}>
                          {racket.faceMaterial}
                        </span>
                      </div>
                    </div>

                    {/* Power vs Control Balance Bars */}
                    <div className="space-y-2 pt-1 border-t border-[var(--card-border)] text-xs min-w-0">
                      {/* Control */}
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center justify-between text-[11px] min-w-0">
                          <span className="text-[#f2f7ff]/70 truncate">التحكم والسيطرة (Control)</span>
                          <span className="font-mono-tag text-white font-bold shrink-0">{racket.controlRating}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#0b0b0d] rounded-full overflow-hidden border border-[var(--card-border)]">
                          <div 
                            className="h-full bg-[#00d26a] transition-all duration-300"
                            style={{ width: `${racket.controlRating}%` }}
                          />
                        </div>
                      </div>

                      {/* Power */}
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center justify-between text-[11px] min-w-0">
                          <span className="text-[#f2f7ff]/70 truncate">القوة والسحق (Power)</span>
                          <span className="font-mono-tag text-white font-bold shrink-0">{racket.powerRating}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#0b0b0d] rounded-full overflow-hidden border border-[var(--card-border)]">
                          <div 
                            className="h-full bg-[#b2e01e] transition-all duration-300"
                            style={{ width: `${racket.powerRating}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Price Range & Est Market */}
                    <div className="flex items-center justify-between pt-1 text-xs min-w-0">
                      <span className="text-white/50 truncate">متوسط السعر التقريبي:</span>
                      <span className="font-bold text-[#b2e01e] font-mono-tag shrink-0">{racket.priceRangeSAR}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 sm:p-5 pt-0 space-y-2 min-w-0">
                  <div className="grid grid-cols-2 gap-2 min-w-0">
                    <button
                      onClick={() => setActiveModalRacket(racket)}
                      className="btn-outline-ink py-2 px-2.5 rounded text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Info className="w-3.5 h-3.5 text-[#b2e01e] shrink-0" />
                      <span className="truncate">عرض التفاصيل</span>
                    </button>

                    <a
                      href={getWhatsAppConsultationUrl(racket)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-neon py-2 px-2.5 rounded text-[#0b0b0d] font-black text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <WhatsAppVector className="w-3.5 h-3.5 fill-[#0b0b0d] shrink-0" />
                      <span className="truncate">استشارة الكابتن</span>
                    </a>
                  </div>

                  <button
                    onClick={() => toggleCompare(racket)}
                    className={`w-full py-1.5 rounded text-[11px] font-mono-tag transition flex items-center justify-center gap-1 cursor-pointer ${
                      isCompared 
                        ? 'text-[#0b0b0d] bg-[#b2e01e] font-black' 
                        : 'text-white/50 hover:text-white bg-[#0b0b0d] border border-[var(--card-border)]'
                    }`}
                  >
                    {isCompared ? (
                      <>
                        <Check className="w-3 h-3 text-[#0b0b0d] shrink-0" />
                        <span>مضاف للمقارنة (اضغط للإلغاء)</span>
                      </>
                    ) : (
                      <span>+ إضافة للمقارنة السريعة</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 6. WHATSAPP & EXPERT CONSULTATION BANNER */}
      <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] relative overflow-hidden min-w-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 relative z-10 min-w-0">
          <div className="space-y-2 text-center lg:text-right min-w-0 flex-1">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono-tag text-[#25D366]">
              <WhatsAppVector className="w-4 h-4 fill-[#25D366] shrink-0" />
              <span>[ 1-ON-1 PADEL COACH CONSULTATION ]</span>
            </div>
            <h3 className="font-alexandria font-bold text-base sm:text-xl text-white break-words">
              محتار بين مضربين؟ استشر مدرب Padel Level Pro مجاناً
            </h3>
            <p className="text-xs sm:text-sm text-[#f2f7ff]/80 max-w-xl font-medium break-words">
              أرسل لنا تصنيفك الحالي ونقاط قوتك في الملعب، وسيقوم الكابتن باقتراح المضرب ذي التوازن والوزن المثالي لحماية ذراعك ومضاعفة متعتك الرياضية.
            </p>
          </div>

          <a
            href="https://wa.me/966500365049?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%A7%D9%84%D9%85%D8%AF%D8%B1%D8%A8%20%D8%AD%D9%88%D9%84%20%D8%A7%D8%AE%D8%AA%D9%8A%D8%A7%D8%B1%20%D9%85%D8%B6%D8%B1%D8%A8%20%D8%A7%D9%84%D8%A8%D8%A7%D8%AF%D9%84%20%D8%A7%D9%84%D9%85%D9%86%D8%A7%D8%B3%D8%A8%20%D9%84%D9%85%D8%B3%D8%AA%D9%88%D8%A7%D9%8A."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon px-6 py-3 text-xs font-black flex items-center justify-center gap-2.5 shrink-0 w-full sm:w-auto cursor-pointer"
          >
            <WhatsAppVector className="w-4 h-4 fill-[#0b0b0d] shrink-0" />
            <span>تواصل مع كابتن البادل الآن (WhatsApp)</span>
          </a>
        </div>
      </div>

      {/* 7. DETAILED RACKET MODAL */}
      {activeModalRacket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="card-dark w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded border border-[#b2e01e] bg-[#16161a] text-right p-4 sm:p-6 md:p-7 space-y-5 min-w-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[var(--card-border)] pb-3 min-w-0 gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono-tag text-[#b2e01e] truncate">
                  <span>{activeModalRacket.brand}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeModalRacket.levelAr}</span>
                </div>
                <h2 className="font-alexandria font-black text-lg sm:text-2xl text-white mt-1 break-words">
                  {activeModalRacket.modelName}
                </h2>
              </div>
              <button
                onClick={() => setActiveModalRacket(null)}
                className="p-1.5 text-white/60 hover:text-white rounded bg-[#0b0b0d] border border-[var(--card-border)] cursor-pointer shrink-0"
                title="إغلاق"
              >
                <X className="w-5 h-5 text-[#b2e01e]" />
              </button>
            </div>

            {/* Modal Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-w-0">
              
              {/* Left Column: Visual Artwork & Stats */}
              <div className="space-y-4 min-w-0">
                <div className="min-h-[180px] max-h-56 rounded bg-[#0b0b0d] p-4 flex items-center justify-center relative border border-[var(--card-border)] overflow-hidden min-w-0">
                  <img 
                    src={activeModalRacket.imageUrl} 
                    alt={`${activeModalRacket.brand} ${activeModalRacket.modelName}`}
                    className="w-full h-44 max-h-48 object-contain relative z-10"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = 'https://cdn.shopify.com/s/files/1/0646/3671/5163/files/8410.jpg';
                    }}
                  />
                  <div 
                    className="absolute bottom-2.5 right-2.5 text-[11px] font-mono-tag px-2 py-0.5 rounded bg-[#16161a] border border-[var(--card-border)] text-[#b2e01e] font-bold z-20"
                  >
                    {activeModalRacket.weight}
                  </div>
                </div>

                {/* Power / Control / Maneuverability */}
                <div className="p-3.5 sm:p-4 rounded bg-[#0b0b0d] border border-[var(--card-border)] space-y-3 text-xs min-w-0">
                  <div className="space-y-1 min-w-0">
                    <div className="flex justify-between text-[11px] min-w-0">
                      <span className="text-[#f2f7ff]/70 truncate">التحكم والدقة</span>
                      <span className="font-mono-tag font-bold text-[#00d26a] shrink-0">{activeModalRacket.controlRating}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#16161a] rounded overflow-hidden border border-[var(--card-border)]">
                      <div className="h-full bg-[#00d26a]" style={{ width: `${activeModalRacket.controlRating}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex justify-between text-[11px] min-w-0">
                      <span className="text-[#f2f7ff]/70 truncate">القوة والإنهاء</span>
                      <span className="font-mono-tag font-bold text-[#b2e01e] shrink-0">{activeModalRacket.powerRating}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#16161a] rounded overflow-hidden border border-[var(--card-border)]">
                      <div className="h-full bg-[#b2e01e]" style={{ width: `${activeModalRacket.powerRating}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex justify-between text-[11px] min-w-0">
                      <span className="text-[#f2f7ff]/70 truncate">سهولة المناورة والسرعة</span>
                      <span className="font-mono-tag font-bold text-[#38bdf8] shrink-0">{activeModalRacket.maneuverabilityRating}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#16161a] rounded overflow-hidden border border-[var(--card-border)]">
                      <div className="h-full bg-[#38bdf8]" style={{ width: `${activeModalRacket.maneuverabilityRating}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Deep Tech Breakdown */}
              <div className="space-y-3.5 text-xs min-w-0">
                <div className="min-w-0">
                  <h4 className="font-bold text-white mb-1 text-sm font-alexandria truncate">الوصف الهندسي الشامل:</h4>
                  <p className="text-[#f2f7ff]/80 leading-relaxed break-words font-medium">
                    {activeModalRacket.fullDescriptionAr}
                  </p>
                </div>

                {/* Key Features List */}
                <div className="space-y-1.5 min-w-0">
                  <h4 className="font-bold text-[#b2e01e] text-xs font-mono-tag truncate">أبرز المزايا والتقنيات:</h4>
                  <ul className="space-y-1 min-w-0">
                    {activeModalRacket.keyFeaturesAr.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#f2f7ff]/85 min-w-0">
                        <Check className="w-3.5 h-3.5 text-[#b2e01e] shrink-0 mt-0.5" />
                        <span className="break-words">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specs Table */}
                <div className="p-3 rounded bg-[#0b0b0d] border border-[var(--card-border)] space-y-1.5 text-[11px] min-w-0">
                  <div className="flex justify-between py-0.5 border-b border-[var(--card-border)] min-w-0">
                    <span className="text-white/50 truncate">الشكل الهندسي:</span>
                    <span className="text-white font-semibold truncate">{activeModalRacket.shapeAr}</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-[var(--card-border)] min-w-0">
                    <span className="text-white/50 truncate">نقطة التوازن:</span>
                    <span className="text-white font-semibold truncate">{activeModalRacket.balanceAr}</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-[var(--card-border)] min-w-0">
                    <span className="text-white/50 truncate">تركيبة النواة:</span>
                    <span className="text-white font-semibold truncate">{activeModalRacket.coreMaterial}</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-[var(--card-border)] min-w-0">
                    <span className="text-white/50 truncate">مادة الوجه:</span>
                    <span className="text-white font-semibold truncate">{activeModalRacket.faceMaterial}</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-[var(--card-border)] min-w-0">
                    <span className="text-white/50 truncate">نقطة التأثير (Sweetspot):</span>
                    <span className="text-white font-semibold text-right truncate">{activeModalRacket.sweetSpot}</span>
                  </div>
                  <div className="flex justify-between py-0.5 min-w-0">
                    <span className="text-white/50 truncate">التمركز الأنسب:</span>
                    <span className="text-[#b2e01e] font-semibold text-right truncate">{activeModalRacket.courtPositionAr}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[var(--card-border)] min-w-0">
              <div className="text-xs text-[#f2f7ff]/70 min-w-0">
                السعر التقديري: <span className="text-[#b2e01e] font-bold font-mono-tag">{activeModalRacket.priceRangeSAR}</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto min-w-0">
                <button
                  onClick={() => setActiveModalRacket(null)}
                  className="btn-outline-ink px-4 py-2 text-xs font-mono-tag text-white transition flex-1 sm:flex-none cursor-pointer"
                >
                  إغلاق النافذة
                </button>

                <a
                  href={getWhatsAppConsultationUrl(activeModalRacket)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon px-5 py-2 text-xs font-black flex items-center justify-center gap-2 flex-1 sm:flex-none cursor-pointer"
                >
                  <WhatsAppVector className="w-3.5 h-3.5 fill-[#0b0b0d] shrink-0" />
                  <span>استشارة فورية حول هذا المضرب</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 8. QUICK COMPARISON MODAL */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="card-dark w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded border border-[#b2e01e] bg-[#16161a] text-right p-4 sm:p-6 md:p-7 space-y-4 min-w-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-3 min-w-0 gap-2">
              <div className="min-w-0">
                <h2 className="font-alexandria font-bold text-base sm:text-lg text-white truncate">مقارنة المواصفات الفنية المباشرة</h2>
                <p className="text-xs text-[#b2e01e] font-mono-tag truncate">COMPARING {compareList.length} RACKETS</p>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1.5 text-white/60 hover:text-white rounded bg-[#0b0b0d] border border-[var(--card-border)] cursor-pointer shrink-0"
              >
                <X className="w-5 h-5 text-[#b2e01e]" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 min-w-0">
              {compareList.map(item => (
                <div key={item.id} className="p-3.5 rounded bg-[#0b0b0d] border border-[var(--card-border)] space-y-3 text-xs min-w-0">
                  <div className="flex items-center justify-between min-w-0 gap-2">
                    <span className="font-bold text-sm text-white truncate">{item.brand} {item.modelName}</span>
                    <button
                      onClick={() => toggleCompare(item)}
                      className="text-red-400 hover:text-red-300 text-xs shrink-0 cursor-pointer font-bold"
                      title="إزالة"
                    >
                      إزالة
                    </button>
                  </div>

                  <div className="min-h-[100px] max-h-28 bg-[#16161a] rounded flex items-center justify-center p-2 relative overflow-hidden border border-[var(--card-border)] min-w-0">
                    <img
                      src={item.imageUrl}
                      alt={`${item.brand} ${item.modelName}`}
                      className="h-20 sm:h-24 w-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="space-y-1.5 text-[11px] min-w-0">
                    <div className="flex justify-between py-1 border-b border-[var(--card-border)] min-w-0">
                      <span className="text-white/50 truncate">المستوى:</span>
                      <span className="text-white font-bold truncate">{item.levelAr.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[var(--card-border)] min-w-0">
                      <span className="text-white/50 truncate">الشكل:</span>
                      <span className="text-white font-bold truncate">{item.shapeAr.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[var(--card-border)] min-w-0">
                      <span className="text-white/50 truncate">التوازن:</span>
                      <span className="text-white font-bold truncate">{item.balanceAr.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[var(--card-border)] min-w-0">
                      <span className="text-white/50 truncate">التحكم:</span>
                      <span className="text-[#00d26a] font-bold shrink-0">{item.controlRating}%</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[var(--card-border)] min-w-0">
                      <span className="text-white/50 truncate">القوة:</span>
                      <span className="text-[#b2e01e] font-bold shrink-0">{item.powerRating}%</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[var(--card-border)] min-w-0">
                      <span className="text-white/50 truncate">الوزن:</span>
                      <span className="text-white font-bold font-mono-tag shrink-0">{item.weight}</span>
                    </div>
                    <div className="flex justify-between py-1 min-w-0">
                      <span className="text-white/50 truncate">السعر:</span>
                      <span className="text-[#b2e01e] font-bold font-mono-tag shrink-0">{item.priceRangeSAR}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCompareModalOpen(false);
                      setActiveModalRacket(item);
                    }}
                    className="w-full py-2 rounded btn-neon text-[#0b0b0d] font-black text-xs cursor-pointer"
                  >
                    فحص كامل
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-[var(--card-border)] min-w-0">
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="btn-outline-ink px-5 py-2 text-xs font-mono-tag text-white cursor-pointer"
              >
                إغلاق المقارنة
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
