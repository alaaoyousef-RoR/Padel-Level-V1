import React, { useState, useMemo } from 'react';
import { PADEL_VIDEOS } from '../data/videoData';
import { PadelVideoTutorial, PadelLevelNumber } from '../types';
import { CustomVideoPlayer } from '../components/CustomVideoPlayer';
import { useApp } from '../context/AppContext';
import { 
  Play, 
  Clock, 
  CheckCircle2, 
  Youtube, 
  Flame,
  Activity,
  Shield,
  Zap,
  Target,
  Search,
  RotateCcw,
  Users,
  UserCheck,
  Trophy,
  ExternalLink,
  SlidersHorizontal,
  BookmarkCheck,
  Check,
  Sparkles,
  Award
} from 'lucide-react';

export const VideoTutorialsPage: React.FC = () => {
  const { 
    user, 
    testResult, 
    watchedVideoIds, 
    toggleVideoWatched, 
    isVideoWatched,
    videoCompletionStats 
  } = useApp();

  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'watched' | 'unwatched'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideoModal, setActiveVideoModal] = useState<PadelVideoTutorial | null>(null);

  const userLevel = (testResult?.levelNumber || user?.levelNumber || null) as PadelLevelNumber | null;

  // Filter definitions
  const levelFilterOptions = [
    { id: 'all', label: 'جميع المستويات', short: 'الكل' },
    { id: '1', label: 'المستوى 1 (مبتدئ)', short: 'L1', num: 1 },
    { id: '2', label: 'المستوى 2 (متوسط أولي)', short: 'L2', num: 2 },
    { id: '3', label: 'المستوى 3 (متوسط)', short: 'L3', num: 3 },
    { id: '4', label: 'المستوى 4 (متقدم)', short: 'L4', num: 4 },
    { id: '5', label: 'المستوى 5 (احترافي)', short: 'L5', num: 5 },
  ];

  const categoryFilterOptions = [
    { id: 'all', label: 'جميع المواضيع', icon: Target },
    { id: 'fundamentals', label: 'الأساسيات والميكانيكا', icon: Zap },
    { id: 'partner', label: 'تمارين ثنائية للشركاء', icon: Users },
    { id: 'solo', label: 'تدريب فردي ورشاقة', icon: UserCheck },
    { id: 'net_tactics', label: 'اللعب عند الشبكة والتكتيك', icon: Trophy },
    { id: 'walls', label: 'الجدران الزجاجية والدفاع', icon: Shield },
    { id: 'warmup', label: 'التحمية والإحماء البدني', icon: Flame },
  ];

  // Curated 4 Core Modules requested
  const starterSeriesVideos = PADEL_VIDEOS.filter(v => v.topicCategory === 'fundamentals');
  const pairDrillsVideo = PADEL_VIDEOS.find(v => v.id === 'vid-pair-essential-drills') || PADEL_VIDEOS[3];
  const soloFootworkVideo = PADEL_VIDEOS.find(v => v.id === 'vid-solo-practice-footwork') || PADEL_VIDEOS[5];
  const netMasteryVideo = PADEL_VIDEOS.find(v => v.id === 'vid-net-game-mastery') || PADEL_VIDEOS[7];

  // Filtering logic
  const filteredVideos = useMemo(() => {
    return PADEL_VIDEOS.filter((video) => {
      // Level filter
      if (selectedLevelFilter !== 'all') {
        const lvlNum = parseInt(selectedLevelFilter, 10) as PadelLevelNumber;
        if (!video.levelNumbers.includes(lvlNum)) {
          return false;
        }
      }

      // Category filter
      if (selectedCategoryFilter !== 'all') {
        if (video.topicCategory !== selectedCategoryFilter && video.category !== selectedCategoryFilter) {
          return false;
        }
      }

      // Status filter
      if (selectedStatusFilter === 'watched' && !isVideoWatched(video.id)) {
        return false;
      }
      if (selectedStatusFilter === 'unwatched' && isVideoWatched(video.id)) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchTitle = video.titleAr.toLowerCase().includes(q) || (video.titleEn && video.titleEn.toLowerCase().includes(q));
        const matchCoach = video.coachName.toLowerCase().includes(q);
        const matchDesc = video.descriptionAr.toLowerCase().includes(q);
        const matchTakeaways = video.keyTakeaways.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchCoach && !matchDesc && !matchTakeaways) {
          return false;
        }
      }

      return true;
    });
  }, [selectedLevelFilter, selectedCategoryFilter, selectedStatusFilter, searchQuery, isVideoWatched]);

  const handleResetFilters = () => {
    setSelectedLevelFilter('all');
    setSelectedCategoryFilter('all');
    setSelectedStatusFilter('all');
    setSearchQuery('');
  };

  const handleFilterMyLevel = () => {
    if (userLevel) {
      setSelectedLevelFilter(String(userLevel));
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-2 sm:py-4 text-right space-y-6 sm:space-y-8 font-alexandria min-w-0">
      
      {/* 1. Header Banner & Dynamic Progress Tracking */}
      <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] space-y-5 relative overflow-hidden min-w-0">
        <div className="absolute top-0 right-0 w-2 h-full bg-[#b2e01e]"></div>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--card-border)] pb-4 min-w-0">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <span className="label-mono mb-0 text-[10px]" style={{ color: '#b2e01e' }}>
                [ INTERACTIVE VIDEO DRILL LIBRARY • LEVELS 1 TO 5 ]
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono-tag bg-[#0b0b0d] text-[#b2e01e] border border-[#005cd7] px-2.5 py-0.5 rounded font-bold shrink-0">
                <Youtube className="w-3 h-3 text-[#b2e01e] shrink-0" />
                <span>THE PADEL SCHOOL & CURATED DRILLS</span>
              </span>
            </div>
            <h1 className="font-alexandria font-black text-xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase break-words leading-tight">
              مكتبة تمارين وتكنيك <span className="text-[#b2e01e]">البادل المرئية</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#f2f7ff]/75 leading-relaxed max-w-3xl break-words">
              مجموعة منظمة وتفاعلية من الفيديوهات التدريبية المخصصة لمستويات البادل (من المستوى 1 إلى 5). تتضمن ميكانيكا التأسيس، التمارين الثنائية للشركاء، التدريب الفردي ورشاقة القدمين، وإتقان الهيمنة على الشبكة وحسم النقاط.
            </p>
          </div>

          {/* Quick Level Recommendation Chip */}
          {userLevel && (
            <div className="bg-[#0b0b0d] p-3 rounded border border-[#b2e01e] shrink-0 space-y-1.5 min-w-[200px]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-jetbrains text-white/60">مستواك الحالي:</span>
                <span className="text-xs font-black text-[#b2e01e]">Level {userLevel}</span>
              </div>
              <button
                type="button"
                onClick={handleFilterMyLevel}
                className="w-full btn-neon py-1.5 px-3 text-[11px] font-bold rounded flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>عرض تمارين مستواي الموصى بها</span>
              </button>
            </div>
          )}
        </div>

        {/* Global Video Progress Tracker Bar */}
        <div className="bg-[#0b0b0d] p-4 rounded border border-[var(--card-border)] space-y-2.5 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs min-w-0">
            <div className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-[#b2e01e] shrink-0" />
              <span className="font-bold text-white">إجمالي إنجاز التمارين المرئية:</span>
              <span className="text-[#b2e01e] font-jetbrains font-bold">
                {videoCompletionStats.watchedCount} من {videoCompletionStats.totalCount} تمريناً
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/70 font-jetbrains text-[11px]">
              <span>نسبة الإتقان والمشاهدة:</span>
              <span className="text-[#b2e01e] font-black">{videoCompletionStats.percentage}%</span>
            </div>
          </div>

          {/* Progress track */}
          <div className="w-full bg-[#16161a] h-2.5 rounded-full overflow-hidden border border-white/10">
            <div 
              className="bg-[#b2e01e] h-full transition-all duration-500 rounded-full shadow-[0_0_12px_rgba(178,224,30,0.5)]"
              style={{ width: `${videoCompletionStats.percentage}%` }}
            />
          </div>
          <p className="text-[10px] text-white/50 leading-relaxed">
            * يمكنك النقر على زر «تحديد كمنجز / مكتمل» في أي تمرين لتوثيق إتقانك للدرس وتحديث نسبة تقدمك التدريبي.
          </p>
        </div>
      </div>

      {/* 2. Four Core Curated Modules Showcase */}
      <div className="space-y-3 min-w-0">
        <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-2 min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#b2e01e]"></span>
            <h2 className="font-alexandria font-bold text-sm sm:text-base text-white">
              المحاور التدريبية الرئيسية الأربعة (Core Video Curriculum)
            </h2>
          </div>
          <span className="text-[10px] font-mono-tag text-white/50">4 MODULES • ACCREDITED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 min-w-0">
          
          {/* Module 1: Starter Series */}
          <div 
            onClick={() => setSelectedCategoryFilter('fundamentals')}
            className="p-4 rounded bg-[#16161a] border border-[var(--card-border)] hover:border-[#b2e01e] transition-colors cursor-pointer space-y-2.5 min-w-0 flex flex-col justify-between group"
          >
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-jetbrains text-[9px] text-[#0b0b0d] bg-[#b2e01e] font-black px-2 py-0.5 rounded">
                  LEVEL 1–2
                </span>
                <span className="text-[10px] text-white/50 font-jetbrains">Starter</span>
              </div>
              <h3 className="font-alexandria font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e] transition-colors leading-snug break-words">
                1. سلسلة المبتدئين والأساسيات
              </h3>
              <p className="text-[11px] text-[#f2f7ff]/70 leading-relaxed line-clamp-3">
                قبضة المضرب القارية (Continental Grip)، وضعية الاستعداد المنخفضة، ومناطق الأمان في عمق الملعب وتجنب No-man's land.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#b2e01e] font-jetbrains font-bold">
              <span>{starterSeriesVideos.length} دروس تأسيسية</span>
              <a 
                href="https://www.youtube.com/playlist?list=PLB5mO0D8A5B3JkXbH" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:underline flex items-center gap-1 text-white/60 hover:text-[#b2e01e]"
                title="فتح قائمة تشغيل The Padel School على يوتيوب"
              >
                <span>قائمة التشغيل</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Module 2: Pair Drills */}
          <div 
            onClick={() => {
              setSelectedCategoryFilter('partner');
              if (pairDrillsVideo) setActiveVideoModal(pairDrillsVideo);
            }}
            className="p-4 rounded bg-[#16161a] border border-[var(--card-border)] hover:border-[#b2e01e] transition-colors cursor-pointer space-y-2.5 min-w-0 flex flex-col justify-between group"
          >
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-jetbrains text-[9px] text-[#0b0b0d] bg-[#b2e01e] font-black px-2 py-0.5 rounded">
                  LEVEL 2–3
                </span>
                <span className="text-[10px] text-white/50 font-jetbrains">Pairs</span>
              </div>
              <h3 className="font-alexandria font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e] transition-colors leading-snug break-words">
                2. تمارين ثنائية لشركاء البادل
              </h3>
              <p className="text-[11px] text-[#f2f7ff]/70 leading-relaxed line-clamp-3">
                تمارين تبادل الفولي السريع عند الشبكة، ارتدادات الزجاج المشتركة، والتحرك التزامني كحبل واحد لسد ثغرات الوسط.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#b2e01e] font-jetbrains font-bold">
              <span>Essential Pair Drills</span>
              <span className="flex items-center gap-1 text-[#b2e01e]">
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>تشغيل الفيديو</span>
              </span>
            </div>
          </div>

          {/* Module 3: Solo Practice */}
          <div 
            onClick={() => {
              setSelectedCategoryFilter('solo');
              if (soloFootworkVideo) setActiveVideoModal(soloFootworkVideo);
            }}
            className="p-4 rounded bg-[#16161a] border border-[var(--card-border)] hover:border-[#b2e01e] transition-colors cursor-pointer space-y-2.5 min-w-0 flex flex-col justify-between group"
          >
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-jetbrains text-[9px] text-[#0b0b0d] bg-[#b2e01e] font-black px-2 py-0.5 rounded">
                  ALL LEVELS
                </span>
                <span className="text-[10px] text-white/50 font-jetbrains">Solo</span>
              </div>
              <h3 className="font-alexandria font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e] transition-colors leading-snug break-words">
                3. التدريب الفردي ورشاقة القدمين
              </h3>
              <p className="text-[11px] text-[#f2f7ff]/70 leading-relaxed line-clamp-3">
                تمارين الجدار الزجاجي الفردية للتحكم بالكرة ورد الفعل، تمارين السلم الحركي، وتطوير سرعة القفزة التحضيرية.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#b2e01e] font-jetbrains font-bold">
              <span>Solo Footwork & Glass</span>
              <span className="flex items-center gap-1 text-[#b2e01e]">
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>تشغيل الفيديو</span>
              </span>
            </div>
          </div>

          {/* Module 4: Net Game Mastery */}
          <div 
            onClick={() => {
              setSelectedCategoryFilter('net_tactics');
              if (netMasteryVideo) setActiveVideoModal(netMasteryVideo);
            }}
            className="p-4 rounded bg-[#16161a] border border-[var(--card-border)] hover:border-[#b2e01e] transition-colors cursor-pointer space-y-2.5 min-w-0 flex flex-col justify-between group"
          >
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-jetbrains text-[9px] text-[#0b0b0d] bg-[#b2e01e] font-black px-2 py-0.5 rounded">
                  LEVEL 3–5
                </span>
                <span className="text-[10px] text-white/50 font-jetbrains">Tactics</span>
              </div>
              <h3 className="font-alexandria font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e] transition-colors leading-snug break-words">
                4. إتقان الهيمنة على الشبكة والتكتيك
              </h3>
              <p className="text-[11px] text-[#f2f7ff]/70 leading-relaxed line-clamp-3">
                أسرار تنفيذ البانديخا والفيبورا تحت الضغط، كرات الدروب شوت والتشكيكا الساقطة، وتكتيكات استغلال نقطة الإرسال.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#b2e01e] font-jetbrains font-bold">
              <span>Winning The Net Tactics</span>
              <span className="flex items-center gap-1 text-[#b2e01e]">
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>تشغيل الفيديو</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Interactive Filter Tabs & Search Controls */}
      <div className="card-dark p-4 sm:p-5 rounded border border-[var(--card-border)] bg-[#16161a] space-y-4 font-mono-tag text-xs min-w-0">
        
        {/* Search input + Status Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 min-w-0">
          
          {/* Search Input */}
          <div className="relative flex-1 min-w-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن مهارة أو تمرين (مثال: البانديخا، ارتداد الزجاج، فولي، إرسال)..."
              className="w-full bg-[#0b0b0d] border border-[var(--card-border)] focus:border-[#b2e01e] rounded py-2.5 px-3 pr-9 text-xs text-white placeholder-white/30 outline-none transition text-right font-alexandria"
            />
            <Search className="w-4 h-4 text-white/40 absolute top-3 right-3 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute top-2.5 left-2.5 text-white/40 hover:text-white p-0.5 cursor-pointer"
                title="مسح البحث"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Filter Toggle */}
          <div className="flex items-center gap-1 p-1 bg-[#0b0b0d] border border-[var(--card-border)] rounded shrink-0">
            <button
              type="button"
              onClick={() => setSelectedStatusFilter('all')}
              className={`py-1.5 px-2.5 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                selectedStatusFilter === 'all'
                  ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              الكل ({PADEL_VIDEOS.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatusFilter('watched')}
              className={`py-1.5 px-2.5 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                selectedStatusFilter === 'watched'
                  ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              المكتملة ✓ ({videoCompletionStats.watchedCount})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatusFilter('unwatched')}
              className={`py-1.5 px-2.5 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                selectedStatusFilter === 'unwatched'
                  ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              غير المكتملة ({PADEL_VIDEOS.length - videoCompletionStats.watchedCount})
            </button>
          </div>

          {/* Reset Filters */}
          {(selectedLevelFilter !== 'all' || selectedCategoryFilter !== 'all' || selectedStatusFilter !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn-outline-ink py-2 px-3 text-[11px] font-bold rounded flex items-center justify-center gap-1 shrink-0 cursor-pointer"
              title="إعادة تعيين الفلاتر"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط</span>
            </button>
          )}

        </div>

        {/* Level Filters (Levels 1 to 5) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-[var(--card-border)] min-w-0">
          <span className="text-white/50 ml-2 whitespace-nowrap font-bold shrink-0 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#b2e01e]" />
            <span>المستوى:</span>
          </span>
          {levelFilterOptions.map((lvl) => {
            const isSelected = selectedLevelFilter === lvl.id;
            return (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevelFilter(lvl.id)}
                className={`py-1.5 px-3 rounded whitespace-nowrap transition-colors font-bold cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#b2e01e] text-[#0b0b0d] font-black shadow-sm'
                    : 'bg-[#0b0b0d] text-[#f2f7ff]/70 hover:text-white border border-[var(--card-border)]'
                }`}
              >
                {lvl.label}
              </button>
            );
          })}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-[var(--card-border)] pb-1 min-w-0">
          <span className="text-white/50 ml-2 whitespace-nowrap font-bold shrink-0">الموضوع:</span>
          {categoryFilterOptions.map((cat) => {
            const isSelected = selectedCategoryFilter === cat.id;
            const IconComp = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`py-1.5 px-3 rounded whitespace-nowrap transition-colors font-bold flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#b2e01e] text-[#0b0b0d] font-black shadow-sm'
                    : 'bg-[#0b0b0d] text-[#f2f7ff]/70 hover:text-white border border-[var(--card-border)]'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#0b0b0d]' : 'text-[#b2e01e]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* 4. Active Results Count Bar */}
      <div className="flex items-center justify-between text-xs text-white/60 font-mono-tag px-1 min-w-0">
        <span>عرض {filteredVideos.length} من أصل {PADEL_VIDEOS.length} تمريناً تدريبياً</span>
        {userLevel && selectedLevelFilter === 'all' && (
          <span className="text-[#b2e01e]">
            * مستواك هو Level {userLevel}؛ يمكنك التصفية لرؤية التمارين الأنسب لك
          </span>
        )}
      </div>

      {/* 5. Sleek Interactive Video Cards Grid */}
      {filteredVideos.length === 0 ? (
        <div className="card-dark p-8 rounded border border-[var(--card-border)] bg-[#16161a] text-center space-y-3 min-w-0">
          <p className="text-sm text-white/70">لم يتم العثور على تمارين تطابق معايير البحث الحالية.</p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="btn-neon px-5 py-2 text-xs font-bold rounded cursor-pointer"
          >
            إعادة تعيين الفلاتر وعرض كافة التمارين
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 min-w-0">
          {filteredVideos.map((vid) => {
            const isWatched = isVideoWatched(vid.id);

            return (
              <div
                key={vid.id}
                className={`card-dark rounded-lg border overflow-hidden flex flex-col justify-between group transition-all duration-200 min-w-0 shadow-lg ${
                  isWatched 
                    ? 'border-[#b2e01e]/80 bg-[#16161a]/95' 
                    : 'border-[var(--card-border)] bg-[#16161a] hover:border-[#b2e01e]/60'
                }`}
              >
                <div className="min-w-0">
                  {/* Aspect-video 16:9 Thumbnail Stage */}
                  <div 
                    onClick={() => setActiveVideoModal(vid)}
                    className="relative aspect-video bg-black overflow-hidden border-b border-[var(--card-border)] cursor-pointer group min-w-0"
                  >
                    <img
                      src={vid.thumbnailUrl || `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                      alt={vid.titleAr}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${vid.youtubeId}/0.jpg`;
                      }}
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 group-hover:via-black/10 transition-colors"></div>

                    {/* Centered Neon Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#b2e01e] text-[#0b0b0d] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-[#0b0b0d] ml-0.5" />
                      </div>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                      <span className="bg-[#0b0b0d]/90 text-[#b2e01e] border border-[#b2e01e]/50 px-2 py-0.5 rounded text-[10px] font-mono-tag font-bold shadow-sm">
                        {vid.levelBadgeText}
                      </span>
                    </div>

                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                      {isWatched && (
                        <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-500 px-2 py-0.5 rounded text-[10px] font-mono-tag font-bold flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>مكتمل</span>
                        </span>
                      )}
                      <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-[9px] font-mono-tag font-bold flex items-center gap-1 shadow-sm">
                        <Youtube className="w-2.5 h-2.5 shrink-0" />
                        <span>HD</span>
                      </span>
                    </div>

                    {/* Bottom Badges */}
                    <div className="absolute bottom-2.5 left-2.5 bg-[#0b0b0d]/90 px-2 py-0.5 rounded text-[10px] font-mono-tag font-bold text-[#b2e01e] flex items-center gap-1 border border-white/10">
                      <Clock className="w-3 h-3 text-[#b2e01e] shrink-0" />
                      <span>{vid.duration}</span>
                    </div>

                    {vid.sourceSeries && (
                      <div className="absolute bottom-2.5 right-2.5 bg-[#0b0b0d]/90 px-2 py-0.5 rounded text-[9px] font-jetbrains text-white/70 border border-white/10 truncate max-w-[180px]">
                        {vid.sourceSeries}
                      </div>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4 sm:p-5 space-y-3.5 min-w-0">
                    
                    {/* Category & Coach Header */}
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <span className="font-mono-tag text-[9px] text-[#0b0b0d] bg-[#b2e01e] px-2 py-0.5 rounded font-black shrink-0">
                        {vid.topicCategoryAr}
                      </span>
                      <span className="text-[10px] font-mono-tag text-white/50 truncate">
                        المدرب: {vid.coachName}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="space-y-1 min-w-0">
                      <h3 
                        onClick={() => setActiveVideoModal(vid)}
                        className="font-alexandria font-bold text-sm sm:text-base text-white group-hover:text-[#b2e01e] transition-colors leading-snug break-words cursor-pointer"
                      >
                        {vid.titleAr}
                      </h3>
                      {vid.titleEn && (
                        <p className="font-jetbrains text-[10px] text-white/40 truncate">
                          {vid.titleEn}
                        </p>
                      )}
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-[#f2f7ff]/75 leading-relaxed break-words font-medium line-clamp-2">
                      {vid.descriptionAr}
                    </p>

                    {/* Key Bullet Points / Takeaways */}
                    <div className="bg-[#0b0b0d] p-3 rounded border border-[var(--card-border)] space-y-1.5 min-w-0">
                      <span className="font-jetbrains text-[9px] text-[#b2e01e] font-bold block uppercase tracking-wider">
                        [ KEY TECHNICAL TAKEAWAYS // نقاط التركيز ]
                      </span>
                      <ul className="space-y-1 min-w-0">
                        {vid.keyTakeaways.slice(0, 3).map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-1.5 text-[11px] text-[#f2f7ff]/85 leading-relaxed min-w-0">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#b2e01e] shrink-0 mt-0.5" />
                            <span className="break-words line-clamp-2">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 pt-0 space-y-2 min-w-0">
                  
                  {/* Mark as Watched / Completed Toggle */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoWatched(vid.id);
                    }}
                    className={`w-full py-2 px-3 text-xs font-bold rounded flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                      isWatched
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500 hover:bg-emerald-900/80 font-black'
                        : 'bg-[#0b0b0d] text-white/80 hover:text-[#b2e01e] border border-[var(--card-border)] hover:border-[#b2e01e]'
                    }`}
                  >
                    {isWatched ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>✓ تم إنجاز وتطبيق هذا التمرين (مكتمل)</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white/50" />
                        <span>[ تحديد كمنجز ومكتمل ✓ ]</span>
                      </>
                    )}
                  </button>

                  {/* Open Modal Player Button */}
                  <button
                    type="button"
                    onClick={() => setActiveVideoModal(vid)}
                    className="w-full py-2 btn-neon text-xs font-black rounded flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#0b0b0d]" />
                    <span>مشاهدة الدرس بالفيديو المضمن</span>
                  </button>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* 6. Embedded Video Modal Player */}
      {activeVideoModal && (
        <CustomVideoPlayer
          video={activeVideoModal}
          playlist={filteredVideos}
          onSelectVideo={(vid) => setActiveVideoModal(vid)}
          onClose={() => setActiveVideoModal(null)}
          onMarkWatched={(videoId) => toggleVideoWatched(videoId)}
          isWatched={isVideoWatched(activeVideoModal.id)}
        />
      )}

    </div>
  );
};
