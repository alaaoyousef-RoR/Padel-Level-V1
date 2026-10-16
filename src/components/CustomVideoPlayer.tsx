import React, { useState, useRef, useEffect } from 'react';
import { PadelVideoTutorial } from '../types';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  RotateCcw, 
  RotateCw, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  Youtube, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  FastForward, 
  Clock, 
  Award,
  ListVideo
} from 'lucide-react';

interface CustomVideoPlayerProps {
  video: PadelVideoTutorial;
  playlist?: PadelVideoTutorial[];
  onSelectVideo?: (vid: PadelVideoTutorial) => void;
  onClose?: () => void;
  onMarkWatched?: (videoId: string) => void;
  isWatched?: boolean;
}

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  video,
  playlist = [],
  onSelectVideo,
  onClose,
  onMarkWatched,
  isWatched = false
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(300); // 5 mins default estimate for simulated scrub if embed
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);
  const [watchedState, setWatchedState] = useState<boolean>(isWatched);
  const [activeTab, setActiveTab] = useState<'takeaways' | 'playlist'>('takeaways');

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsPlaying(true);
    setCurrentTime(0);
    setWatchedState(isWatched);
  }, [video.id, isWatched]);

  // Handle Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleMarkWatchedToggle = () => {
    const next = !watchedState;
    setWatchedState(next);
    if (onMarkWatched) {
      onMarkWatched(video.id);
    }
  };

  const currentIndex = playlist.findIndex(v => v.id === video.id);
  const prevVideo = currentIndex > 0 ? playlist[currentIndex - 1] : null;
  const nextVideo = currentIndex >= 0 && currentIndex < playlist.length - 1 ? playlist[currentIndex + 1] : null;

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        ref={containerRef}
        className="card-dark rounded-3xl max-w-5xl w-full max-h-[96vh] overflow-y-auto border-2 border-white/20 shadow-2xl text-right p-4 sm:p-7 space-y-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header bar */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4 gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono-tag text-[10px] text-[#002255] bg-[#b2e01e] font-black px-2.5 py-0.5 rounded-full">
                {video.categoryAr}
              </span>
              <span className="font-mono-tag text-[10px] text-white/80 bg-white/10 px-2 py-0.5 rounded-full">
                المستوى: {video.level}
              </span>
              {watchedState ? (
                <span className="font-mono-tag text-[10px] text-[#b2e01e] bg-[#b2e01e]/15 border border-[#b2e01e]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>تم إتقان الدرس</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleMarkWatchedToggle}
                  className="font-mono-tag text-[10px] text-white/70 hover:text-[#b2e01e] bg-white/5 border border-white/15 px-2.5 py-0.5 rounded-full transition-colors"
                >
                  [ تعليم كمكتمل ✓ ]
                </button>
              )}
            </div>
            <h2 className="font-alexandria font-black text-lg sm:text-2xl text-white mt-1 leading-snug">
              {video.titleAr}
            </h2>
            <p className="font-mono-tag text-xs text-white/50">
              المدرب المحترف: {video.coachName} • المدة الرسمية: {video.duration}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleMarkWatchedToggle}
              title="تعليم كمكتمل"
              className={`p-2.5 rounded-xl border transition-all ${
                watchedState 
                  ? 'bg-[#b2e01e] text-[#002255] border-[#b2e01e]' 
                  : 'theme-card-solid text-white/80 hover:text-[#b2e01e] border-white/15'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق المشغل"
                className="text-white/60 hover:text-[#b2e01e] hover:bg-white/10 p-2.5 rounded-xl transition-colors border border-white/15"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Custom Video Player Stage with YouTube Embed & Overlay Controls */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border-2 border-[#b2e01e]/40 shadow-[0_0_30px_rgba(178,224,30,0.15)] group">
          
          <iframe
            className="w-full h-full border-0 absolute inset-0 pointer-events-auto"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1&rel=0&playbackRate=${playbackSpeed}`}
            title={video.titleAr}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />

          {/* Custom Overlay Bottom Bar for Enhanced Aesthetic */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end space-y-2 pointer-events-none">
            
            {/* Scrub Bar */}
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden relative cursor-pointer pointer-events-auto">
              <div 
                className="bg-[#b2e01e] h-full transition-all duration-300"
                style={{ width: '45%' }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs text-white pointer-events-auto">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-lg bg-[#b2e01e] text-[#002255] flex items-center justify-center font-bold shadow hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white/80 hover:text-[#b2e01e] transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono-tag text-[10px] text-white/85">
                  HD 1080p • {video.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Speed Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="px-2.5 py-1 rounded-lg theme-card-solid border border-white/20 text-[10px] font-mono-tag text-[#b2e01e] font-bold flex items-center gap-1"
                  >
                    <span>{playbackSpeed}x</span>
                  </button>

                  {showSpeedMenu && (
                    <div className="absolute bottom-full right-0 mb-2 theme-card-solid rounded-xl border border-white/20 p-1.5 shadow-2xl flex flex-col gap-1 min-w-[70px] z-30">
                      {speeds.map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setPlaybackSpeed(s);
                            setShowSpeedMenu(false);
                          }}
                          className={`px-2 py-1 rounded text-center text-xs font-mono-tag font-bold transition-colors ${
                            playbackSpeed === s ? 'bg-[#b2e01e] text-[#002255]' : 'text-white/80 hover:bg-white/10'
                          }`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="text-white/80 hover:text-[#b2e01e] transition-colors p-1"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Tab Switcher: Key Takeaways vs Playlist Queue */}
        <div className="flex items-center gap-2 border-b border-white/15 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('takeaways')}
            className={`py-2 px-4 rounded-xl text-xs font-mono-tag font-bold transition-all flex items-center gap-2 ${
              activeTab === 'takeaways'
                ? 'bg-[#b2e01e] text-[#002255] font-black'
                : 'theme-card-solid text-white/70 hover:text-white border border-white/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ نقاط الإتقان والتحليل الفني ]</span>
          </button>

          {playlist.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab('playlist')}
              className={`py-2 px-4 rounded-xl text-xs font-mono-tag font-bold transition-all flex items-center gap-2 ${
                activeTab === 'playlist'
                  ? 'bg-[#b2e01e] text-[#002255] font-black'
                  : 'theme-card-solid text-white/70 hover:text-white border border-white/10'
              }`}
            >
              <ListVideo className="w-3.5 h-3.5" />
              <span>[ قائمة التشغيل والدورات ({playlist.length}) ]</span>
            </button>
          )}
        </div>

        {/* Tab 1: Takeaways & Breakdown */}
        {activeTab === 'takeaways' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="theme-card-solid p-4 rounded-2xl border border-white/15 space-y-2">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ DRILL COACHING SUMMARY ]</span>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                {video.descriptionAr}
              </p>
            </div>

            <div className="space-y-3">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ KEY TECHNICAL TAKEAWAYS // أهم نقاط المهارة ]</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {video.keyTakeaways.map((point: string, idx: number) => (
                  <div 
                    key={idx} 
                    className="theme-card-solid p-3.5 rounded-2xl border border-white/15 flex items-start gap-3 shadow"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#b2e01e] shrink-0 mt-0.5" />
                    <span className="text-xs text-white/90 leading-relaxed font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Playlist Queue */}
        {activeTab === 'playlist' && (
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 animate-in fade-in duration-200">
            {playlist.map((item) => {
              const isCurrent = item.id === video.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (onSelectVideo) onSelectVideo(item);
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-[#b2e01e]/15 border-[#b2e01e] text-white shadow'
                      : 'theme-card-solid border-white/10 hover:border-white/30 text-white/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 aspect-video rounded bg-black overflow-hidden relative shrink-0">
                      <img
                        src={item.thumbnailUrl || `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                        alt={item.titleAr}
                        className="w-full h-full object-cover"
                      />
                      {isCurrent && (
                        <div className="absolute inset-0 bg-[#b2e01e]/30 flex items-center justify-center">
                          <Play className="w-4 h-4 fill-[#b2e01e] text-[#002255]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="font-mono-tag text-[9px] text-[#b2e01e] font-bold block">{item.categoryAr}</span>
                      <h4 className="font-bold text-xs line-clamp-1">{item.titleAr}</h4>
                    </div>
                  </div>

                  <span className="font-mono-tag text-[10px] text-white/60 shrink-0">{item.duration}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Footer Navigation */}
        <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {prevVideo && onSelectVideo && (
              <button
                type="button"
                onClick={() => onSelectVideo(prevVideo)}
                className="btn-outline-ink px-4 py-2 text-xs font-mono-tag font-bold flex items-center gap-1.5"
              >
                <ChevronRight className="w-3.5 h-3.5" />
                <span>الدرس السابق</span>
              </button>
            )}

            {nextVideo && onSelectVideo && (
              <button
                type="button"
                onClick={() => onSelectVideo(nextVideo)}
                className="btn-outline-ink px-4 py-2 text-xs font-mono-tag font-bold flex items-center gap-1.5"
              >
                <span>الدرس التالي</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-ink px-4 py-2 text-xs font-mono-tag font-bold flex items-center gap-1.5 hover:text-red-400 hover:border-red-500"
            >
              <Youtube className="w-3.5 h-3.5 text-red-500" />
              <span>فتح في YouTube</span>
            </a>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="btn-neon px-6 py-2 text-xs font-bold"
              >
                إغلاق المشغل
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
