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
import { PadelRacketImage } from '../components/PadelRacketImage';
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
    <div className="space-y-10 pb-16 font-sans">
      
      {/* 1. HERO SECTION & HEADER */}
      <div className="relative rounded-3xl p-6 sm:p-10 theme-card-solid border border-white/15 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#b2e01e]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#005cd7]/15 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono-tag text-[#b2e01e]">
              <span>[ EQUIPMENT SHOWCASE & GUIDE ]</span>
              <span aria-hidden="true">·</span>
              <span>مضارب البادل الرسمية 2024 - 2025</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black font-alexandria text-white tracking-tight leading-tight">
              دليل ومضارب البادل المختارة حسب المستوى
            </h1>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              اختر المضرب الأنسب الذي يرفع كفاءة أدائك ويحمي ذراعك. استكشف نخبة مضارب كبرى العلامات العالمية (Bullpadel, Nox, Babolat, Head, Wilson) المصنفة بدقة علمية للاعبين المبتدئين والمتوسطين والمحترفين.
            </p>

            {/* Quick stats indicators */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-white/70">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#b2e01e]" />
                <span>مواصفات رسمية معتمدة</span>
              </div>
              <span aria-hidden="true" className="text-white/30">·</span>
              <div className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#38bdf8]" />
                <span>3 مستويات مهارية دقيقة</span>
              </div>
              <span aria-hidden="true" className="text-white/30">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#fbbf24]" />
                <span>استشارة مباشرة مع الكوتش</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={() => {
                setIsQuizOpen(!isQuizOpen);
                if (!quizResult) handleRunQuiz();
              }}
              className="btn-neon px-5 py-3 text-xs font-black flex items-center justify-center gap-2 shadow-xl cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>{isQuizOpen ? 'إغلاق مساعد الاختيار' : 'مساعد اختيار المضرب المثالي'}</span>
            </button>

            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="px-5 py-3 text-xs font-bold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>مقارنة المضارب المختارة</span>
                <span className="w-5 h-5 rounded-full bg-[#b2e01e] text-[#002661] font-black text-[10px] flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. SMART QUIZ / RACKET FINDER ACCORDION */}
      {isQuizOpen && (
        <div className="card-dark p-6 sm:p-8 rounded-3xl border border-[#b2e01e]/30 shadow-2xl space-y-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#b2e01e]/20 text-[#b2e01e] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-alexandria font-bold text-base text-white">مساعد اختيار المضرب الذكي (Smart Racket Finder)</h2>
                <p className="text-xs text-white/70">أجب على 3 أسئلة سريعة لنرشح لك المضرب الهندسي الأنسب لأسلوب لعبك</p>
              </div>
            </div>
            <button
              onClick={() => setIsQuizOpen(false)}
              className="text-white/60 hover:text-white p-2"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1: Level */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white block">1. ما هو مستواك الحالي في البادل؟</label>
              <div className="space-y-1.5">
                {[
                  { id: 'beginner', label: 'مبتدئ (Level 1-2)', desc: 'أتعلم الأساسيات وضرب الكرة' },
                  { id: 'intermediate', label: 'متوسط (Level 3)', desc: 'ألعب بانتظام وأتحكم في الراليات' },
                  { id: 'advanced', label: 'متقدم / منافسات (Level 4-5)', desc: 'أجيد كافة الضربات وسرعة الإنهاء' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setQuizLevel(opt.id as RacketLevel); }}
                    className={`w-full text-right p-3 rounded-xl border text-xs transition cursor-pointer ${
                      quizLevel === opt.id
                        ? 'border-[#b2e01e] bg-[#b2e01e]/15 text-white font-bold'
                        : 'border-white/10 hover:border-white/20 text-white/70 bg-white/5'
                    }`}
                  >
                    <div className="font-bold text-white">{opt.label}</div>
                    <div className="text-[11px] text-white/60">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Play Style */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white block">2. ما هو أسلوب لعبك وتمركزك المفضل؟</label>
              <div className="space-y-1.5">
                {[
                  { id: 'control', label: 'دفاع وتحكم (Control & Defense)', desc: 'أفضل بناء النقطة وتفادي الأخطاء' },
                  { id: 'balanced', label: 'تكتيكي شامل (All-Round Player)', desc: 'توازن بين الدفاع وسرعة الفولي' },
                  { id: 'power', label: 'هجوم حاسم وسحق (Power & Attack)', desc: 'إنهاء النقاط بالسماش والبانديخا' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setQuizStyle(opt.id as any); }}
                    className={`w-full text-right p-3 rounded-xl border text-xs transition cursor-pointer ${
                      quizStyle === opt.id
                        ? 'border-[#b2e01e] bg-[#b2e01e]/15 text-white font-bold'
                        : 'border-white/10 hover:border-white/20 text-white/70 bg-white/5'
                    }`}
                  >
                    <div className="font-bold text-white">{opt.label}</div>
                    <div className="text-[11px] text-white/60">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Priority */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white block">3. ما هي أولويتك القصوى عند اختيار المضرب؟</label>
              <div className="space-y-1.5">
                {[
                  { id: 'comfort', label: 'راحة الذراع ونقطة ضرب واسعة', desc: 'حماية المرفق وسهولة رد الكرات' },
                  { id: 'versatility', label: 'تعدد الاستخدامات وسرعة الحركة', desc: 'مضرب رشيق يخدمني في كل المواقف' },
                  { id: 'attack', label: 'أقصى طاقة انفجارية وصلابة', desc: 'إخراج الكرة خارج القفص وقوة ساحقة' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setQuizPriority(opt.id as any); }}
                    className={`w-full text-right p-3 rounded-xl border text-xs transition cursor-pointer ${
                      quizPriority === opt.id
                        ? 'border-[#b2e01e] bg-[#b2e01e]/15 text-white font-bold'
                        : 'border-white/10 hover:border-white/20 text-white/70 bg-white/5'
                    }`}
                  >
                    <div className="font-bold text-white">{opt.label}</div>
                    <div className="text-[11px] text-white/60">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <button
              onClick={handleRunQuiz}
              className="btn-neon px-6 py-2.5 text-xs font-black flex items-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <Zap className="w-4 h-4" />
              <span>تحديث النتيجة المقترحة</span>
            </button>

            {quizResult && (
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/10 border border-[#b2e01e]/40 w-full sm:w-auto">
                <div className="text-right">
                  <span className="text-[10px] font-mono-tag text-[#b2e01e] block">المضرب الأنسب لك بنسبة 98%:</span>
                  <span className="text-xs font-bold text-white">{quizResult.brand} {quizResult.modelName}</span>
                </div>
                <button
                  onClick={() => setActiveModalRacket(quizResult)}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#b2e01e] text-[#002661] hover:bg-[#9ec71b] transition whitespace-nowrap cursor-pointer"
                >
                  فحص التفاصيل
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. SHAPE & SPECS GUIDE BANNER (Round vs Teardrop vs Diamond) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-[#b2e01e]" />
            <h2 className="text-lg sm:text-xl font-bold font-alexandria text-white">
              دليل الأشكال الهندسية لمضارب البادل (Racket Shapes 101)
            </h2>
          </div>
          <span className="text-xs font-mono-tag text-white/50 hidden sm:inline">TECHNICAL ARCHITECTURE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {RACKET_SHAPE_GUIDES.map((guide) => {
            const isSelected = selectedShape === guide.shape;
            return (
              <div 
                key={guide.shape}
                onClick={() => setSelectedShape(isSelected ? 'all' : guide.shape)}
                className={`card-dark p-5 rounded-2xl border transition-all cursor-pointer group hover:scale-[1.01] ${
                  isSelected 
                    ? 'border-[#b2e01e] ring-1 ring-[#b2e01e]/50 bg-white/[0.08]' 
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-alexandria font-bold text-sm text-white group-hover:text-[#b2e01e] transition-colors">
                    {guide.titleAr}
                  </span>
                  <span className={`text-[10px] font-mono-tag px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-[#b2e01e] text-[#002661] font-black' : 'bg-white/10 text-white/70'
                  }`}>
                    {guide.shape.toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-[#b2e01e] font-semibold mb-2">{guide.subtitleAr}</p>
                <p className="text-xs text-white/70 leading-relaxed mb-3">{guide.sweetSpotDescAr}</p>

                <div className="space-y-2 pt-2 border-t border-white/10 text-[11px]">
                  <div className="flex items-center justify-between text-white/80">
                    <span className="text-white/50">المستوى الأنسب:</span>
                    <span className="font-semibold text-right">{guide.idealLevelAr}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span className="text-white/50">توزيع التوازن:</span>
                    <span className="font-semibold">{guide.balanceDescAr.split('،')[0]}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-white/60 group-hover:text-white transition">
                    {isSelected ? 'إلغاء الفلترة' : 'عرض مضارب هذا الشكل فقط'}
                  </span>
                  <span className="text-[#b2e01e] font-bold">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. FILTERING & SEARCH CONTROLS */}
      <div className="card-dark p-5 sm:p-6 rounded-2xl border border-white/15 shadow-xl space-y-4">
        
        {/* Row 1: Skill Level Filter Tabs (Buttons) & Search Input */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Level Filter Tabs (Interactive Segmented Control) */}
          <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10 overflow-x-auto">
            {[
              { id: 'all', label: 'جميع المستويات' },
              { id: 'beginner', label: 'مبتدئ (Beginner)' },
              { id: 'intermediate', label: 'متوسط (Intermediate)' },
              { id: 'advanced', label: 'متقدم (Advanced)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedLevel(tab.id as any)}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedLevel === tab.id
                    ? 'bg-[#b2e01e] text-[#002661] shadow font-black'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الموديل، الماركة (Bullpadel, Nox)، أو اللاعب..."
              className="w-full bg-white/5 border border-white/15 focus:border-[#b2e01e] rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder-white/40 outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
              >
                مسح
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Secondary Dropdown Filters (Shape, Brand, Reset) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Shape Select */}
            <div className="flex items-center gap-2">
              <span className="text-white/60">الشكل:</span>
              <select
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value as any)}
                className="bg-black/50 border border-white/15 text-white rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-[#b2e01e]"
              >
                <option value="all">كل الأشكال</option>
                <option value="round">دائري (Round)</option>
                <option value="teardrop">دمعي (Teardrop)</option>
                <option value="diamond">ألماسي (Diamond)</option>
              </select>
            </div>

            {/* Brand Select */}
            <div className="flex items-center gap-2">
              <span className="text-white/60">العلامة التجارية:</span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-black/50 border border-white/15 text-white rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-[#b2e01e]"
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
        <div className="card-dark p-12 rounded-3xl border border-white/10 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/10 text-white/60 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-alexandria font-bold text-lg text-white">لم نجد مضارب تطابق خيارات البحث</h3>
          <p className="text-xs text-white/70 max-w-md mx-auto">
            يرجى تجربة تعديل الكلمات المفتاحية أو إعادة ضبط فلاتر المستوى والشكل والعلامة التجارية.
          </p>
          <button
            onClick={() => {
              setSelectedLevel('all');
              setSelectedShape('all');
              setSelectedBrand('all');
              setSearchQuery('');
            }}
            className="btn-neon px-5 py-2.5 text-xs font-black"
          >
            عرض كافة المضارب
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRackets.map((racket) => {
            const isCompared = compareList.some(r => r.id === racket.id);

            return (
              <div 
                key={racket.id}
                className="card-dark rounded-3xl border border-white/15 overflow-hidden flex flex-col justify-between group hover:border-white/35 transition-all shadow-xl hover:-translate-y-1"
              >
                {/* Upper section: Image, Brand, Badges */}
                <div>
                  {/* Card Visual Header with Clean Metadata (No Pills Discipline) */}
                  <div className="relative h-60 bg-gradient-to-b from-white/[0.08] to-transparent p-5 flex flex-col justify-between overflow-hidden border-b border-white/10">
                    
                    {/* Top Row: Clean Brand & Level Text */}
                    <div className="flex items-center justify-between text-xs relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm tracking-wider uppercase" style={{ color: racket.colorAccent }}>
                          {racket.brand}
                        </span>
                        <span aria-hidden="true" className="text-white/40">·</span>
                        <span className="text-white/80 font-bold">{racket.levelAr.split(' ')[0]}</span>
                      </div>

                      {/* Shape indicator text */}
                      <span className="text-[11px] font-mono-tag text-white/70">
                        {racket.shapeAr.split(' ')[0]}
                      </span>
                    </div>

                    {/* Product Presentation Artwork (Real High-Resolution Product Image with Ambient Glow & Graceful Fallback) */}
                    <PadelRacketImage racket={racket} />

                    {/* Bottom overlay: Pro Endorsement if available */}
                    {racket.proPlayerEndorsed && (
                      <div className="relative z-10 text-[11px] text-white/90 flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-sm self-start">
                        <Sparkles className="w-3 h-3 text-[#b2e01e]" />
                        <span>مضرب النجم: {racket.proPlayerEndorsed}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Title */}
                    <div>
                      <h3 className="font-alexandria font-bold text-base sm:text-lg text-white group-hover:text-[#b2e01e] transition-colors">
                        {racket.modelName}
                      </h3>
                      <p className="text-xs text-white/60 font-mono-tag mt-0.5">
                        {racket.brand} Equipment Series
                      </p>
                    </div>

                    {/* Tier Suitability Summary: "لماذا يناسب هذا المستوى؟" */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                      <span className="text-[10px] font-mono-tag text-[#b2e01e] font-bold block">
                        لماذا يناسب هذا المستوى؟
                      </span>
                      <p className="text-xs text-white/85 leading-relaxed">
                        {racket.tierSummaryAr}
                      </p>
                    </div>

                    {/* Key Technical Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="p-2 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                        <span className="text-white/40 block text-[10px]">الشكل والتوازن</span>
                        <span className="text-white font-medium block truncate">
                          {racket.shapeAr.split(' ')[0]} / {racket.balanceAr.split(' ')[0]}
                        </span>
                      </div>

                      <div className="p-2 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                        <span className="text-white/40 block text-[10px]">الوزن التقريبي</span>
                        <span className="text-white font-medium block truncate">
                          {racket.weight}
                        </span>
                      </div>

                      <div className="p-2 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                        <span className="text-white/40 block text-[10px]">مادة النواة (Core)</span>
                        <span className="text-white font-medium block truncate" title={racket.coreMaterial}>
                          {racket.coreMaterial}
                        </span>
                      </div>

                      <div className="p-2 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                        <span className="text-white/40 block text-[10px]">مادة السطح (Face)</span>
                        <span className="text-white font-medium block truncate" title={racket.faceMaterial}>
                          {racket.faceMaterial}
                        </span>
                      </div>
                    </div>

                    {/* Power vs Control Balance Bars */}
                    <div className="space-y-2 pt-1 border-t border-white/10 text-xs">
                      {/* Control */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-white/70">التحكم والسيطرة (Control)</span>
                          <span className="font-mono-tag text-white font-bold">{racket.controlRating}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#00d26a] rounded-full transition-all duration-500"
                            style={{ width: `${racket.controlRating}%` }}
                          />
                        </div>
                      </div>

                      {/* Power */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-white/70">القوة والسحق (Power)</span>
                          <span className="font-mono-tag text-white font-bold">{racket.powerRating}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#b2e01e] rounded-full transition-all duration-500"
                            style={{ width: `${racket.powerRating}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Price Range & Est Market */}
                    <div className="flex items-center justify-between pt-2 text-xs">
                      <span className="text-white/50">متوسط السعر التقريبي:</span>
                      <span className="font-bold text-[#b2e01e] font-mono-tag">{racket.priceRangeSAR}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveModalRacket(racket)}
                      className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 border border-white/10"
                    >
                      <Info className="w-3.5 h-3.5 text-[#b2e01e]" />
                      <span>عرض التفاصيل</span>
                    </button>

                    <a
                      href={getWhatsAppConsultationUrl(racket)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#b2e01e] hover:bg-[#9ec71b] text-[#002661] font-black text-xs transition shadow flex items-center justify-center gap-1.5"
                    >
                      <WhatsAppVector className="w-3.5 h-3.5 fill-[#002661]" />
                      <span>استشارة الكابتن</span>
                    </a>
                  </div>

                  <button
                    onClick={() => toggleCompare(racket)}
                    className={`w-full py-1.5 rounded-lg text-[11px] font-mono-tag transition flex items-center justify-center gap-1 cursor-pointer ${
                      isCompared 
                        ? 'text-[#b2e01e] bg-[#b2e01e]/15 font-bold' 
                        : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    {isCompared ? (
                      <>
                        <Check className="w-3 h-3" />
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
      <div className="card-dark p-6 sm:p-8 rounded-3xl border border-white/15 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono-tag text-[#25D366]">
              <WhatsAppVector className="w-4 h-4 fill-[#25D366]" />
              <span>[ 1-ON-1 PADEL COACH CONSULTATION ]</span>
            </div>
            <h3 className="font-alexandria font-bold text-lg sm:text-xl text-white">
              محتار بين مضربين؟ استشر مدرب Padel Level Pro مجاناً
            </h3>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl">
              أرسل لنا تصنيفك الحالي ونقاط قوتك في الملعب، وسيقوم الكابتن باقتراح المضرب ذي التوازن والوزن المثالي لحماية ذراعك ومضاعفة متعتك الرياضية.
            </p>
          </div>

          <a
            href="https://wa.me/966500365049?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%A7%D9%84%D9%85%D8%AF%D8%B1%D8%A8%20%D8%AD%D9%88%D9%84%20%D8%A7%D8%AE%D8%AA%D9%8A%D8%A7%D8%B1%20%D9%85%D8%B6%D8%B1%D8%A8%20%D8%A7%D9%84%D8%A8%D8%A7%D8%AF%D9%84%20%D8%A7%D9%84%D9%85%D9%86%D8%A7%D8%B3%D8%A8%20%D9%84%D9%85%D8%B3%D8%AA%D9%88%D8%A7%D9%8A."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon px-6 py-3.5 text-xs font-black flex items-center justify-center gap-2.5 shadow-xl shrink-0 w-full sm:w-auto"
          >
            <WhatsAppVector className="w-4 h-4 fill-current" />
            <span>تواصل مع كابتن البادل الآن (WhatsApp)</span>
          </a>
        </div>
      </div>

      {/* 7. DETAILED RACKET MODAL */}
      {activeModalRacket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="card-dark w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 shadow-2xl relative p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-tag text-[#b2e01e]">
                  <span>{activeModalRacket.brand}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeModalRacket.levelAr}</span>
                </div>
                <h2 className="font-alexandria font-black text-xl sm:text-2xl text-white mt-1">
                  {activeModalRacket.modelName}
                </h2>
              </div>
              <button
                onClick={() => setActiveModalRacket(null)}
                className="p-2 text-white/60 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
                title="إغلاق"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Visual Artwork & Stats */}
              <div className="space-y-4">
                <div className="h-64 rounded-2xl bg-gradient-to-b from-white/10 to-transparent p-4 flex items-center justify-center relative border border-white/10 overflow-hidden">
                  <PadelRacketImage 
                    racket={activeModalRacket} 
                    containerClassName="relative flex items-center justify-center w-full h-full"
                    className="w-full h-56 max-h-56 object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)] relative z-10"
                  />
                  <div 
                    className="absolute bottom-3 right-3 text-[11px] font-mono-tag px-2.5 py-1 rounded-lg bg-black/60 text-white z-20"
                  >
                    {activeModalRacket.weight}
                  </div>
                </div>

                {/* Power / Control / Maneuverability */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-white/70">التحكم والدقة</span>
                      <span className="font-mono-tag font-bold text-[#00d26a]">{activeModalRacket.controlRating}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00d26a]" style={{ width: `${activeModalRacket.controlRating}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-white/70">القوة والإنهاء</span>
                      <span className="font-mono-tag font-bold text-[#b2e01e]">{activeModalRacket.powerRating}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#b2e01e]" style={{ width: `${activeModalRacket.powerRating}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-white/70">سهولة المناورة والسرعة</span>
                      <span className="font-mono-tag font-bold text-[#38bdf8]">{activeModalRacket.maneuverabilityRating}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#38bdf8]" style={{ width: `${activeModalRacket.maneuverabilityRating}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Deep Tech Breakdown */}
              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-white mb-1.5 text-sm">الوصف الهندسي الشامل:</h4>
                  <p className="text-white/80 leading-relaxed">
                    {activeModalRacket.fullDescriptionAr}
                  </p>
                </div>

                {/* Key Features List */}
                <div className="space-y-2">
                  <h4 className="font-bold text-[#b2e01e] text-xs">أبرز المزايا والتقنيات:</h4>
                  <ul className="space-y-1.5">
                    {activeModalRacket.keyFeaturesAr.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/85">
                        <Check className="w-4 h-4 text-[#b2e01e] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specs Table */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/50">الشكل الهندسي:</span>
                    <span className="text-white font-semibold">{activeModalRacket.shapeAr}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/50">نقطة التوازن:</span>
                    <span className="text-white font-semibold">{activeModalRacket.balanceAr}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/50">تركيبة النواة:</span>
                    <span className="text-white font-semibold">{activeModalRacket.coreMaterial}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/50">مادة الوجه:</span>
                    <span className="text-white font-semibold">{activeModalRacket.faceMaterial}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/50">نقطة التأثير (Sweetspot):</span>
                    <span className="text-white font-semibold text-right">{activeModalRacket.sweetSpot}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-white/50">التمركز الأنسب:</span>
                    <span className="text-[#b2e01e] font-semibold text-right">{activeModalRacket.courtPositionAr}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              <div className="text-xs text-white/60">
                السعر التقديري: <span className="text-[#b2e01e] font-bold font-mono-tag">{activeModalRacket.priceRangeSAR}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setActiveModalRacket(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition flex-1 sm:flex-none cursor-pointer"
                >
                  إغلاق النافذة
                </button>

                <a
                  href={getWhatsAppConsultationUrl(activeModalRacket)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon px-5 py-2.5 text-xs font-black flex items-center justify-center gap-2 flex-1 sm:flex-none"
                >
                  <WhatsAppVector className="w-4 h-4 fill-current" />
                  <span>استشارة فورية حول هذا المضرب</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 8. QUICK COMPARISON MODAL */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="card-dark w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="font-alexandria font-bold text-lg text-white">مقارنة المواصفات الفنية المباشرة</h2>
                <p className="text-xs text-white/60 font-mono-tag">COMPARING {compareList.length} RACKETS</p>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-2 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {compareList.map(item => (
                <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{item.brand} {item.modelName}</span>
                    <button
                      onClick={() => toggleCompare(item)}
                      className="text-red-400 hover:text-red-300 text-xs"
                      title="إزالة"
                    >
                      إزالة
                    </button>
                  </div>

                  <div className="h-28 bg-black/40 rounded-xl flex items-center justify-center p-2 relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={`${item.brand} ${item.modelName}`}
                      className="h-24 w-full object-contain drop-shadow-md"
                      loading="lazy"
                    />
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/50">المستوى:</span>
                      <span className="text-white font-bold">{item.levelAr.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/50">الشكل:</span>
                      <span className="text-white font-bold">{item.shapeAr.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/50">التوازن:</span>
                      <span className="text-white font-bold">{item.balanceAr.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/50">التحكم:</span>
                      <span className="text-[#00d26a] font-bold">{item.controlRating}%</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/50">القوة:</span>
                      <span className="text-[#b2e01e] font-bold">{item.powerRating}%</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/50">الوزن:</span>
                      <span className="text-white font-bold">{item.weight}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-white/50">السعر:</span>
                      <span className="text-[#b2e01e] font-bold font-mono-tag">{item.priceRangeSAR}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCompareModalOpen(false);
                      setActiveModalRacket(item);
                    }}
                    className="w-full py-2 rounded-xl bg-[#b2e01e] text-[#002661] font-black text-xs cursor-pointer"
                  >
                    فحص كامل
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10">
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
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
