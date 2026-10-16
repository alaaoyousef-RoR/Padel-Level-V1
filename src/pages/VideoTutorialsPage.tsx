import React, { useState, useEffect } from 'react';
import { PADEL_VIDEOS } from '../data/videoData';
import { PadelVideoTutorial } from '../types';
import { CustomVideoPlayer } from '../components/CustomVideoPlayer';
import { 
  Play, 
  Clock, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  Youtube, 
  Flame,
  Activity,
  Shield,
  Zap,
  Target
} from 'lucide-react';

export const VideoTutorialsPage: React.FC = () => {
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('الكل');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<PadelVideoTutorial | null>(null);
  const [watchedVideoIds, setWatchedVideoIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('padel_watched_videos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('padel_watched_videos', JSON.stringify(watchedVideoIds));
    } catch {
      // ignore
    }
  }, [watchedVideoIds]);

  const handleMarkWatched = (videoId: string) => {
    setWatchedVideoIds(prev => 
      prev.includes(videoId) ? prev.filter(id => id !== videoId) : [...prev, videoId]
    );
  };

  const levelFilters = ['الكل', 'مبتدئ', 'متوسط', 'متقدم'];
  const categoryFilters = [
    { id: 'all', label: 'جميع التمارين', icon: Target },
    { id: 'warmup', label: 'التحمية والإحماء البدني', icon: Flame },
    { id: 'net', label: 'الفولي والشبكة', icon: Zap },
    { id: 'overhead', label: 'البانديخا والفيبورا', icon: Activity },
    { id: 'walls', label: 'الجدران الزجاجية', icon: Shield },
    { id: 'serve_return', label: 'الإرسال والاستقبال', icon: Target },
    { id: 'footwork', label: 'حركة القدمين', icon: Activity },
    { id: 'tactics', label: 'التكتيك والتمركز', icon: Zap },
  ];

  const filteredVideos = PADEL_VIDEOS.filter((video) => {
    const matchesLevel = selectedLevelFilter === 'الكل' || video.level === selectedLevelFilter || video.level === 'الكل';
    const matchesCat = selectedCategoryFilter === 'all' || video.category === selectedCategoryFilter;
    return matchesLevel && matchesCat;
  });

  const warmupVideos = PADEL_VIDEOS.filter(v => v.category === 'warmup');

  return (
    <div className="w-full max-w-7xl mx-auto py-2 sm:py-4 text-right space-y-5 sm:space-y-6 font-alexandria min-w-0">
      
      {/* Header Banner */}
      <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] space-y-3 relative overflow-hidden min-w-0">
        <div className="absolute top-0 right-0 w-2 h-full bg-[#b2e01e]"></div>
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ VISUAL DRILL & TUTORIAL LIBRARY ]</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono-tag bg-[#0b0b0d] text-[#b2e01e] border border-[#005cd7] px-2.5 py-0.5 rounded font-bold shrink-0">
            <Youtube className="w-3 h-3 text-[#b2e01e] shrink-0" />
            <span>YOUTUBE HD POWERED</span>
          </span>
        </div>
        <h1 className="font-alexandria font-black text-xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase break-words leading-tight">
          مكتبة تمارين وتكنيك <span className="text-[#b2e01e]">البادل المرئية</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#f2f7ff]/75 leading-relaxed max-w-2xl break-words">
          أضخم مكتبة مرئية شاملة لحركات البادل؛ ابتداءً من التحمية والإحماء البدني قبل المباراة وحتى ضربات البانديخا، الفولي، الفيبورا، والدفاع الزجاجي.
        </p>
      </div>

      {/* Dedicated Pre-Match Warmup Spotlight Section */}
      <div className="card-dark p-4 sm:p-6 md:p-7 rounded border border-[#b2e01e] bg-[#16161a] space-y-4 relative overflow-hidden min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--card-border)] pb-3 min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded bg-[#0b0b0d] border border-[#b2e01e] flex items-center justify-center text-[#b2e01e] shrink-0">
              <Flame className="w-5 h-5 text-[#b2e01e]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-mono-tag text-[10px] text-[#b2e01e] font-bold block uppercase">[ القسم المخصص الرئيسي ]</span>
              <h2 className="font-alexandria font-black text-base sm:text-lg text-white break-words">إحماء وتجهيز ما قبل المباراة (Warmup & Mobility)</h2>
            </div>
          </div>
          <button
            onClick={() => setSelectedCategoryFilter('warmup')}
            className="btn-neon px-4 py-2 text-xs font-bold self-start sm:self-auto flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>عرض كل تمارين التحمية ({warmupVideos.length})</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#f2f7ff]/80 leading-relaxed break-words">
          الخطوة الأهم قبل الدخول للقفزات التنافسية؛ تفادي الإصابات وتنشيط عضلات الكتف والمعصم والركض السريع ببرامج معتمدة من المدربين المحترفين.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 min-w-0">
          {warmupVideos.slice(0, 2).map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideoModal(vid)}
              className="bg-[#0b0b0d] rounded border border-[var(--card-border)] hover:border-[#b2e01e] overflow-hidden flex flex-col sm:flex-row group cursor-pointer transition-colors min-w-0"
            >
              <div className="relative w-full sm:w-44 aspect-video sm:aspect-auto bg-black shrink-0 overflow-hidden">
                <img
                  src={vid.thumbnailUrl || `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.titleAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-9 h-9 rounded bg-[#b2e01e] text-[#0b0b0d] flex items-center justify-center font-bold">
                    <Play className="w-4 h-4 fill-[#0b0b0d]" />
                  </div>
                </div>
                <div className="absolute bottom-1.5 left-1.5 bg-[#0b0b0d] px-2 py-0.5 rounded text-[10px] font-mono-tag text-[#b2e01e] font-bold border border-[var(--card-border)]">
                  {vid.duration}
                </div>
              </div>
              <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-grow space-y-2 min-w-0">
                <div className="space-y-1 min-w-0">
                  <span className="font-mono-tag text-[9px] text-[#0b0b0d] bg-[#b2e01e] px-2 py-0.5 rounded font-black inline-block">
                    {vid.categoryAr}
                  </span>
                  <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e] transition-colors break-words">
                    {vid.titleAr}
                  </h3>
                </div>
                <span className="text-[10px] font-mono-tag text-white/50 truncate">
                  المدرب: {vid.coachName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bars */}
      <div className="card-dark p-4 sm:p-5 rounded border border-[var(--card-border)] bg-[#16161a] space-y-3.5 font-mono-tag text-xs min-w-0">
        
        {/* Level Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 min-w-0">
          <span className="text-white/50 ml-2 whitespace-nowrap font-bold shrink-0">المستوى:</span>
          {levelFilters.map((lvl) => {
            const isSelected = selectedLevelFilter === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevelFilter(lvl)}
                className={`py-1.5 px-3 rounded whitespace-nowrap transition-colors font-bold cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                    : 'bg-[#0b0b0d] text-[#f2f7ff]/70 hover:text-white border border-[var(--card-border)]'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2.5 border-t border-[var(--card-border)] pb-1 min-w-0">
          <span className="text-white/50 ml-2 whitespace-nowrap font-bold shrink-0">التصنيف:</span>
          {categoryFilters.map((cat) => {
            const isSelected = selectedCategoryFilter === cat.id;
            const IconComp = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`py-2 px-3 rounded whitespace-nowrap transition-colors font-bold flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                    : 'bg-[#0b0b0d] text-[#f2f7ff]/70 hover:text-white border border-[var(--card-border)]'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#0b0b0d]' : 'text-[#b2e01e]'}`} />
                <span className="truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 min-w-0">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setActiveVideoModal(vid)}
            className="card-dark rounded border border-[var(--card-border)] bg-[#16161a] hover:border-[#b2e01e] overflow-hidden flex flex-col justify-between group transition-colors cursor-pointer min-w-0"
          >
            <div className="min-w-0">
              {/* Dynamic YouTube Thumbnail Area */}
              <div className="relative aspect-video bg-black overflow-hidden border-b border-[var(--card-border)] min-w-0">
                <img
                  src={vid.thumbnailUrl || `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.titleAr}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${vid.youtubeId}/0.jpg`;
                  }}
                />

                {/* Subtle dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>

                {/* Centered Neon Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded bg-[#b2e01e] text-[#0b0b0d] flex items-center justify-center transition-transform duration-200">
                    <Play className="w-5 h-5 fill-[#0b0b0d]" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 left-2 bg-[#0b0b0d] px-2 py-0.5 rounded text-[10px] font-mono-tag font-bold text-[#b2e01e] flex items-center gap-1 z-10 border border-[var(--card-border)]">
                  <Clock className="w-3 h-3 text-[#b2e01e] shrink-0" />
                  <span>{vid.duration}</span>
                </div>

                {/* Level Badge */}
                <div className="absolute top-2 right-2 bg-[#0b0b0d] text-white px-2 py-0.5 rounded text-[10px] font-mono-tag z-10 border border-[var(--card-border)]">
                  {vid.level}
                </div>

                {/* YouTube Pill */}
                <div className="absolute top-2 left-2 bg-red-600 text-white px-1.5 py-0.5 rounded text-[9px] font-mono-tag font-bold flex items-center gap-1 z-10">
                  <Youtube className="w-2.5 h-2.5 shrink-0" />
                  <span>HD</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2 text-right min-w-0">
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <span className="font-mono-tag text-[9px] text-[#0b0b0d] bg-[#b2e01e] px-2 py-0.5 rounded font-black shrink-0">
                    {vid.categoryAr}
                  </span>
                  <span className="text-[10px] font-mono-tag text-white/50 truncate">
                    {vid.coachName}
                  </span>
                </div>

                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e] transition-colors leading-snug break-words">
                  {vid.titleAr}
                </h3>

                <p className="text-xs text-[#f2f7ff]/75 leading-relaxed break-words font-medium">
                  {vid.descriptionAr}
                </p>
              </div>
            </div>

            <div className="p-3.5 pt-0 min-w-0">
              <button
                type="button"
                className="w-full py-2 btn-outline-ink group-hover:bg-[#b2e01e] group-hover:text-[#0b0b0d] text-white rounded text-xs font-mono-tag font-bold transition-colors text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                <span>[ تشغيل التمرين المرئي ]</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Custom Video Player Modal */}
      {activeVideoModal && (
        <CustomVideoPlayer
          video={activeVideoModal}
          playlist={filteredVideos}
          onSelectVideo={(vid) => setActiveVideoModal(vid)}
          onClose={() => setActiveVideoModal(null)}
          onMarkWatched={handleMarkWatched}
          isWatched={watchedVideoIds.includes(activeVideoModal.id)}
        />
      )}

    </div>
  );
};
