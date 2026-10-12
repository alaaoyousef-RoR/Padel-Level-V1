import React, { useState } from 'react';
import { PADEL_VIDEOS } from '../data/videoData';
import { PadelVideoTutorial } from '../types';
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
    <div className="max-w-7xl mx-auto py-4 text-right space-y-8 font-alexandria">
      
      {/* Header Banner */}
      <div className="card-dark p-8 sm:p-10 rounded-2xl border border-white/20 space-y-3 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#b2e01e]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center gap-2">
          <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ VISUAL DRILL & TUTORIAL LIBRARY ]</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono-tag bg-[#b2e01e]/15 text-[#b2e01e] border border-[#b2e01e]/30 px-2.5 py-0.5 rounded-full font-bold">
            <Youtube className="w-3 h-3 text-[#b2e01e]" />
            YOUTUBE HD POWERED
          </span>
        </div>
        <h1 className="font-alexandria font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
          مكتبة تمارين وتكنيك <span className="text-[#b2e01e]">البادل المرئية</span>
        </h1>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-2xl">
          أضخم مكتبة مرئية شاملة لحركات البادل؛ ابتداءً من التحمية والإحماء البدني قبل المباراة وحتى ضربات البانديخا، الفولي، الفيبورا، والدفاع الزجاجي.
        </p>
      </div>

      {/* Dedicated Pre-Match Warmup Spotlight Section */}
      <div className="card-dark p-6 sm:p-8 rounded-2xl border border-[#b2e01e]/30 bg-gradient-to-r from-[#b2e01e]/10 via-transparent to-transparent space-y-5 relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#b2e01e]/20 border border-[#b2e01e]/40 flex items-center justify-center text-[#b2e01e]">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-mono-tag text-[10px] text-[#b2e01e] font-bold block">[ القسم المخصص الرئيسي ]</span>
              <h2 className="font-alexandria font-black text-xl text-white">إحماء وتجهيز ما قبل المباراة (Warmup & Mobility)</h2>
            </div>
          </div>
          <button
            onClick={() => setSelectedCategoryFilter('warmup')}
            className="btn-neon px-4 py-2 text-xs font-bold self-start sm:self-auto flex items-center gap-2"
          >
            <span>عرض كل تمارين التحمية ({warmupVideos.length})</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
          الخطوة الأهم قبل الدخول للقفزات التنافسية؛ تفادي الإصابات وتنشيط عضلات الكتف والمعصم والركض السريع ببرامج معتمدة من المدربين المحترفين.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {warmupVideos.slice(0, 2).map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideoModal(vid)}
              className="theme-card-solid rounded-xl border border-white/15 hover:border-[#b2e01e]/60 overflow-hidden flex flex-col sm:flex-row group cursor-pointer transition-all duration-200"
            >
              <div className="relative w-full sm:w-48 aspect-video sm:aspect-auto bg-black shrink-0 overflow-hidden">
                <img
                  src={vid.thumbnailUrl || `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.titleAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#b2e01e] text-[#002255] flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 fill-[#002255]" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono-tag text-[#b2e01e] font-bold">
                  {vid.duration}
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow space-y-2">
                <div className="space-y-1">
                  <span className="font-mono-tag text-[9px] text-[#b2e01e] bg-[#b2e01e]/15 px-2 py-0.5 rounded font-bold">
                    {vid.categoryAr}
                  </span>
                  <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#b2e01e] transition-colors line-clamp-2">
                    {vid.titleAr}
                  </h3>
                </div>
                <span className="text-[10px] font-mono-tag text-white/50">
                  المدرب: {vid.coachName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bars */}
      <div className="card-dark p-5 rounded-2xl border border-white/15 space-y-4 font-mono-tag text-xs shadow-xl">
        
        {/* Level Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-white/50 ml-2 whitespace-nowrap font-bold">المستوى:</span>
          {levelFilters.map((lvl) => {
            const isSelected = selectedLevelFilter === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevelFilter(lvl)}
                className={`py-1.5 px-3.5 rounded-xl whitespace-nowrap transition-colors font-bold ${
                  isSelected
                    ? 'bg-[#b2e01e] text-[#002255] shadow font-black'
                    : 'theme-card-solid text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3 border-t border-white/10 pb-1">
          <span className="text-white/50 ml-2 whitespace-nowrap font-bold">التصنيف:</span>
          {categoryFilters.map((cat) => {
            const isSelected = selectedCategoryFilter === cat.id;
            const IconComp = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-colors font-bold flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#b2e01e] text-[#002255] shadow font-black'
                    : 'theme-card-solid text-white/70 hover:text-white'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-[#002255]' : 'text-[#b2e01e]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setActiveVideoModal(vid)}
            className="card-dark rounded-2xl border border-white/15 hover:border-[#b2e01e]/60 overflow-hidden flex flex-col justify-between group transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-2xl"
          >
            <div>
              {/* Dynamic YouTube Thumbnail Area */}
              <div className="relative aspect-video bg-black overflow-hidden border-b border-white/10">
                <img
                  src={vid.thumbnailUrl || `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.titleAr}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${vid.youtubeId}/0.jpg`;
                  }}
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 group-hover:via-black/10 transition-colors"></div>

                {/* Centered Neon Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#b2e01e] text-[#002255] flex items-center justify-center shadow-[0_0_20px_rgba(178,224,30,0.5)] group-hover:scale-110 transition-transform duration-200 pl-0.5">
                    <Play className="w-6 h-6 fill-[#002255]" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 left-2.5 bg-black/85 backdrop-blur-sm px-2 py-0.5 rounded-lg text-[10px] font-mono-tag font-bold text-[#b2e01e] flex items-center gap-1 z-10 border border-white/10">
                  <Clock className="w-3 h-3 text-[#b2e01e]" />
                  <span>{vid.duration}</span>
                </div>

                {/* Level Badge */}
                <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-lg text-[10px] font-mono-tag z-10 border border-white/10">
                  {vid.level}
                </div>

                {/* YouTube Pill */}
                <div className="absolute top-2.5 left-2.5 bg-red-600/90 text-white px-1.5 py-0.5 rounded-lg text-[9px] font-mono-tag font-bold flex items-center gap-1 z-10">
                  <Youtube className="w-2.5 h-2.5" />
                  <span>HD</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-2 text-right">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tag text-[9px] text-[#b2e01e] bg-[#b2e01e]/15 border border-[#b2e01e]/30 px-2 py-0.5 rounded-full font-bold">
                    {vid.categoryAr}
                  </span>
                  <span className="text-[10px] font-mono-tag text-white/50">
                    {vid.coachName}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white group-hover:text-[#b2e01e] transition-colors leading-snug line-clamp-2">
                  {vid.titleAr}
                </h3>

                <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                  {vid.descriptionAr}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                type="button"
                className="w-full py-2.5 btn-outline-ink group-hover:bg-[#b2e01e] group-hover:text-[#002255] text-white rounded-xl text-xs font-mono-tag font-bold transition-all text-center flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>[ تشغيل التمرين المرئي ]</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive YouTube Video Player Modal */}
      {activeVideoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveVideoModal(null)}
        >
          <div 
            className="card-dark rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border-2 border-white/20 shadow-2xl text-right p-5 sm:p-7 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/15 pb-4 gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono-tag text-[10px] text-[#002255] bg-[#b2e01e] font-black px-2.5 py-0.5 rounded-full">
                    {activeVideoModal.categoryAr}
                  </span>
                  <span className="font-mono-tag text-[10px] text-white/80 bg-white/10 px-2 py-0.5 rounded-full">
                    المستوى: {activeVideoModal.level}
                  </span>
                  <span className="font-mono-tag text-[10px] text-red-400 bg-red-950/40 border border-red-800/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Youtube className="w-3 h-3 text-red-500" />
                    <span>YouTube Embed</span>
                  </span>
                </div>
                <h2 className="font-alexandria font-black text-lg sm:text-2xl text-white mt-1 leading-snug">
                  {activeVideoModal.titleAr}
                </h2>
                <p className="font-mono-tag text-xs text-white/50">
                  المدرب: {activeVideoModal.coachName} • المدة: {activeVideoModal.duration}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                aria-label="إغلاق مشغل الفيديو"
                className="text-white/60 hover:text-[#b2e01e] hover:bg-white/10 p-2 rounded-lg transition-colors border border-white/10 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Responsive YouTube Player */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-[#b2e01e]/30 shadow-2xl">
              <iframe
                className="w-full h-full border-0 absolute inset-0"
                src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideoModal.titleAr}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Drill Details & Coaching Takeaways */}
            <div className="space-y-4">
              <div className="theme-card-solid p-4 rounded-xl border border-white/10 space-y-2">
                <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ DRILL BREAKDOWN & TACTICS ]</span>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  {activeVideoModal.descriptionAr}
                </p>
              </div>

              <div className="space-y-2.5">
                <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ KEY DRILL TAKEAWAYS // أهم نقاط الإتقان ]</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {activeVideoModal.keyTakeaways.map((point: string, idx: number) => (
                    <div 
                      key={idx} 
                      className="theme-card-solid p-3 rounded-xl border border-white/10 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#b2e01e] shrink-0 mt-0.5" />
                      <span className="text-xs text-white/85 leading-relaxed font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <a
                href={activeVideoModal.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-ink px-4 py-2 text-xs font-bold flex items-center gap-2 hover:border-red-500 hover:text-red-400"
              >
                <Youtube className="w-3.5 h-3.5 text-red-500" />
                <span>فتح في YouTube مباشرة</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="btn-neon px-6 py-2 text-xs font-bold"
                >
                  إغلاق المشغل
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
