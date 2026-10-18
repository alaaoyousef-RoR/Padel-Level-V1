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
  const [activeTab, setActiveTab] = useState<'takeaways' | 'drills' | 'playlist'>('takeaways');

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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        ref={containerRef}
        className="card-dark rounded max-w-5xl w-full max-h-[94vh] overflow-y-auto border border-[#b2e01e] bg-[#16161a] text-right p-4 sm:p-6 space-y-4 flex flex-col min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header bar */}
        <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-3 gap-3 min-w-0">
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 min-w-0">
              <span className="font-mono-tag text-[10px] text-[#0b0b0d] bg-[#b2e01e] font-black px-2 py-0.5 rounded shrink-0">
                {video.categoryAr}
              </span>
              <span className="font-mono-tag text-[10px] text-white/80 bg-[#0b0b0d] border border-[var(--card-border)] px-2 py-0.5 rounded shrink-0">
                المستوى: {video.level}
              </span>
              {watchedState ? (
                <span className="font-mono-tag text-[10px] text-[#b2e01e] bg-[#0b0b0d] border border-[#b2e01e] px-2 py-0.5 rounded flex items-center gap-1 font-bold shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-[#b2e01e]" />
                  <span>تم إتقان الدرس</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleMarkWatchedToggle}
                  className="font-mono-tag text-[10px] text-white/70 hover:text-[#b2e01e] bg-[#0b0b0d] border border-[var(--card-border)] px-2 py-0.5 rounded transition-colors cursor-pointer shrink-0"
                >
                  [ تعليم كمكتمل ✓ ]
                </button>
              )}
            </div>
            <h2 className="font-alexandria font-black text-base sm:text-xl text-white mt-1 leading-snug break-words">
              {video.titleAr}
            </h2>
            <p className="font-mono-tag text-xs text-[#f2f7ff]/60 truncate">
              المدرب المحترف: {video.coachName} • المدة الرسمية: {video.duration}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleMarkWatchedToggle}
              title="تعليم كمكتمل"
              className={`p-2 rounded border transition-colors cursor-pointer ${
                watchedState 
                  ? 'bg-[#b2e01e] text-[#0b0b0d] border-[#b2e01e]' 
                  : 'bg-[#0b0b0d] text-white/80 hover:text-[#b2e01e] border-[var(--card-border)]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق المشغل"
                className="text-white/60 hover:text-[#b2e01e] p-2 rounded bg-[#0b0b0d] transition-colors border border-[var(--card-border)] cursor-pointer"
              >
                <X className="w-4 h-4 text-[#b2e01e]" />
              </button>
            )}
          </div>
        </div>

        {/* Responsive 16:9 Video Embed Player Stage */}
        <div className="relative aspect-video w-full rounded overflow-hidden bg-black border border-[var(--card-border)] min-w-0">
          <iframe
            className="w-full h-full border-0 absolute inset-0 pointer-events-auto"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&controls=1&modestbranding=1&rel=0`}
            title={video.titleAr}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Player Helper Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 p-2.5 sm:p-3 bg-[#0b0b0d] rounded border border-[var(--card-border)] min-w-0 text-xs text-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-mono-tag text-[10px] sm:text-xs text-[#b2e01e] font-bold shrink-0">
              HD 1080p • {video.duration}
            </span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="text-white/70 text-[11px] truncate hidden sm:inline">
              المدرب: {video.coachName}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Speed Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="px-2.5 py-1 rounded bg-[#16161a] border border-[var(--card-border)] text-[10px] font-mono-tag text-[#b2e01e] font-bold flex items-center gap-1 cursor-pointer hover:border-[#b2e01e] transition-colors"
                title="سرعة التشغيل"
              >
                <span>السرعة: {playbackSpeed}x</span>
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-1.5 bg-[#16161a] rounded border border-[var(--card-border)] p-1 flex flex-col gap-1 min-w-[75px] z-30 shadow-xl">
                  {speeds.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setPlaybackSpeed(s);
                        setShowSpeedMenu(false);
                      }}
                      className={`px-2 py-1 rounded text-center text-xs font-mono-tag font-bold transition-colors cursor-pointer ${
                        playbackSpeed === s ? 'bg-[#b2e01e] text-[#0b0b0d]' : 'text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct YouTube Link */}
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded bg-[#16161a] border border-[var(--card-border)] text-[10px] font-mono-tag text-white/80 hover:text-white hover:border-red-500 transition-colors flex items-center gap-1 cursor-pointer"
              title="مشاهدة على YouTube مباشرة"
            >
              <Youtube className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="hidden sm:inline">YouTube</span>
              <Share2 className="w-3 h-3 shrink-0" />
            </a>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 rounded bg-[#16161a] border border-[var(--card-border)] text-white/80 hover:text-[#b2e01e] hover:border-[#b2e01e] transition-colors cursor-pointer"
              title={isFullscreen ? "تصغير الشاشة" : "ملء الشاشة"}
            >
              {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Tab Switcher: Key Takeaways vs Court Drill Steps vs Playlist Queue */}
        <div className="flex items-center gap-2 border-b border-[var(--card-border)] pb-2.5 min-w-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('takeaways')}
            className={`py-1.5 px-3 rounded text-xs font-mono-tag font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'takeaways'
                ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                : 'bg-[#0b0b0d] text-white/70 hover:text-white border border-[var(--card-border)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ نقاط الإتقان والتحليل الفني ]</span>
          </button>

          {video.drillSteps && video.drillSteps.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab('drills')}
              className={`py-1.5 px-3 rounded text-xs font-mono-tag font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'drills'
                  ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                  : 'bg-[#0b0b0d] text-white/70 hover:text-white border border-[var(--card-border)]'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>[ خطوات التطبيق الميداني والروتين ]</span>
            </button>
          )}

          {playlist.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab('playlist')}
              className={`py-1.5 px-3 rounded text-xs font-mono-tag font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'playlist'
                  ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                  : 'bg-[#0b0b0d] text-white/70 hover:text-white border border-[var(--card-border)]'
              }`}
            >
              <ListVideo className="w-3.5 h-3.5" />
              <span>[ قائمة التشغيل ({playlist.length}) ]</span>
            </button>
          )}
        </div>

        {/* Tab 1: Takeaways & Breakdown */}
        {activeTab === 'takeaways' && (
          <div className="space-y-3 min-w-0">
            <div className="bg-[#0b0b0d] p-3.5 rounded border border-[var(--card-border)] space-y-1.5 min-w-0">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ DRILL COACHING SUMMARY ]</span>
              <p className="text-xs sm:text-sm text-[#f2f7ff]/80 leading-relaxed font-medium break-words">
                {video.descriptionAr}
              </p>
            </div>

            <div className="space-y-2 min-w-0">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ KEY TECHNICAL TAKEAWAYS // أهم نقاط المهارة ]</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 min-w-0">
                {video.keyTakeaways.map((point: string, idx: number) => (
                  <div 
                    key={idx} 
                    className="bg-[#0b0b0d] p-3 rounded border border-[var(--card-border)] flex items-start gap-2 min-w-0"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#b2e01e] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#f2f7ff]/85 leading-relaxed font-medium break-words">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Court Practice Routines */}
        {activeTab === 'drills' && video.drillSteps && (
          <div className="space-y-3 min-w-0">
            <div className="bg-[#0b0b0d] p-3.5 rounded border border-[var(--card-border)] space-y-2.5 min-w-0">
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                <span className="label-mono mb-0 text-[#b2e01e] text-[10px]">
                  [ STEP-BY-STEP COURT PRACTICE ROUTINE // خطة التطبيق الميداني ]
                </span>
                {video.equipmentNeeded && (
                  <span className="text-[10px] text-white/60 font-mono-tag">
                    الأدوات: <strong className="text-[#b2e01e]">{video.equipmentNeeded}</strong>
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {video.drillSteps.map((step: string, sIdx: number) => (
                  <div key={sIdx} className="flex items-start gap-2.5 p-2 rounded bg-[#16161a] border border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#b2e01e] text-[#0b0b0d] text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <p className="text-xs text-white/90 leading-relaxed font-medium">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Playlist Queue */}
        {activeTab === 'playlist' && (
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1 min-w-0">
            {playlist.map((item) => {
              const isCurrent = item.id === video.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (onSelectVideo) onSelectVideo(item);
                  }}
                  className={`p-2.5 rounded border flex items-center justify-between gap-3 cursor-pointer transition-colors min-w-0 ${
                    isCurrent
                      ? 'bg-[#0b0b0d] border-[#b2e01e] text-white'
                      : 'bg-[#0b0b0d] border-[var(--card-border)] hover:border-white/30 text-white/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-14 aspect-video rounded bg-black overflow-hidden relative shrink-0 border border-[var(--card-border)]">
                      <img
                        src={item.thumbnailUrl || `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                        alt={item.titleAr}
                        className="w-full h-full object-cover"
                      />
                      {isCurrent && (
                        <div className="absolute inset-0 bg-[#b2e01e]/30 flex items-center justify-center">
                          <Play className="w-3.5 h-3.5 fill-[#b2e01e] text-[#0b0b0d]" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono-tag text-[9px] text-[#b2e01e] font-bold block truncate">{item.categoryAr}</span>
                      <h4 className="font-bold text-xs truncate">{item.titleAr}</h4>
                    </div>
                  </div>

                  <span className="font-mono-tag text-[10px] text-white/60 shrink-0">{item.duration}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Footer Navigation */}
        <div className="pt-2.5 border-t border-[var(--card-border)] flex flex-wrap items-center justify-between gap-3 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            {prevVideo && onSelectVideo && (
              <button
                type="button"
                onClick={() => onSelectVideo(prevVideo)}
                className="btn-outline-ink px-3.5 py-1.5 text-xs font-mono-tag font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
                <span>الدرس السابق</span>
              </button>
            )}

            {nextVideo && onSelectVideo && (
              <button
                type="button"
                onClick={() => onSelectVideo(nextVideo)}
                className="btn-outline-ink px-3.5 py-1.5 text-xs font-mono-tag font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>الدرس التالي</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-ink px-3.5 py-1.5 text-xs font-mono-tag font-bold flex items-center gap-1.5 hover:text-red-400 hover:border-red-500"
            >
              <Youtube className="w-3.5 h-3.5 text-red-500" />
              <span>YouTube</span>
            </a>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="btn-neon px-5 py-1.5 text-xs font-black cursor-pointer"
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
