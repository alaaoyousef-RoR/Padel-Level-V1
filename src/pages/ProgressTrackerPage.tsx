import React, { useState } from 'react';
import { useApp, MASTER_SKILLS_LIST } from '../context/AppContext';
import { TrainingSession } from '../types';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  CheckSquare, 
  Square, 
  X,
  Target,
  Flame,
  Award
} from 'lucide-react';

const INTENSITIES = [
  { id: 'low', label: 'خفيفة / استشفاء', shortLabel: 'خفيفة', dotColor: '#38bdf8', borderClass: 'border-sky-400/40 text-sky-200' },
  { id: 'medium', label: 'متوسطة / تكنيك', shortLabel: 'متوسطة', dotColor: '#fbbf24', borderClass: 'border-amber-400/40 text-amber-200' },
  { id: 'high', label: 'عالية / لياقة ومباريات', shortLabel: 'عالية', dotColor: '#fb923c', borderClass: 'border-orange-400/40 text-orange-200' },
  { id: 'match', label: 'مباراة رسمية / تنافسية', shortLabel: 'تنافسية', dotColor: '#f87171', borderClass: 'border-red-400/40 text-red-200' },
];

const SUGGESTED_FOCUS_AREAS = [
  'الفولي والكرات الهوائية (Volley & Bandeja)',
  'الدفاع عن الزجاج الخلفي والمزدوج (Pared)',
  'الإرسال والاستقبال التكتيكي (Serve & Return)',
  'التمركز وتغطية المساحات مع الزميل (Positioning)',
  'الكرات الساقطة والضربات المنخفضة (Chiquita)',
  'ضربات الفيبورا والحسم السريع (Víbora & Smash)',
];

export const ProgressTrackerPage: React.FC = () => {
  const { 
    trainingSessions, 
    addTrainingSession, 
    deleteTrainingSession,
    masteredSkills,
    toggleSkillMastered,
    testResult,
    user
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [formDate, setFormDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [formDuration, setFormDuration] = useState(60);
  const [formIntensity, setFormIntensity] = useState<'low' | 'medium' | 'high' | 'match'>('medium');
  const [formFocus, setFormFocus] = useState('');
  const [formRating, setFormRating] = useState(8);
  const [formNotes, setFormNotes] = useState('');
  const [formSelectedSkills, setFormSelectedSkills] = useState<string[]>([]);

  // Calculate high-performance metrics
  const totalSessions = trainingSessions.length;
  const totalMinutes = trainingSessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const masteredCount = masteredSkills.length;
  const skillsPercent = Math.round((masteredCount / 12) * 100);

  // Unique active days
  const uniqueDays = new Set(trainingSessions.map(s => s.date)).size;

  // Level classification
  const currentLevelNum = testResult?.levelNumber || user?.levelNumber || 1;
  const improvementRate = totalSessions > 0 ? (totalSessions * 1.5).toFixed(0) : '0';

  const handleToggleFormSkill = (skillId: string) => {
    setFormSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleSaveSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFocus.trim()) return;

    const newSession: Omit<TrainingSession, 'id' | 'createdAt'> = {
      date: formDate,
      durationMinutes: Number(formDuration),
      intensity: formIntensity,
      focus: formFocus.trim(),
      rating: Number(formRating),
      notes: formNotes.trim(),
      skillsWorkedOn: formSelectedSkills
    };

    await addTrainingSession(newSession);

    // Reset & Close
    setFormFocus('');
    setFormNotes('');
    setFormSelectedSkills([]);
    setIsAddModalOpen(false);
  };

  const getIntensityBadge = (intensity?: string) => {
    const matched = INTENSITIES.find(i => i.id === intensity) || INTENSITIES[1];
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono-tag font-bold border ${matched.borderClass}`}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: matched.dotColor }}></span>
        <span>{matched.shortLabel}</span>
      </span>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-2 sm:py-4 text-right space-y-5 sm:space-y-6 font-alexandria min-w-0">
      
      {/* Header Hero Banner */}
      <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] space-y-4 relative overflow-hidden min-w-0">
        <div className="absolute top-0 right-0 w-2 h-full bg-[#b2e01e]"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 relative z-10 min-w-0">
          <div className="space-y-2 min-w-0 flex-1">
            <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ ATHLETE TRAINING LOG & FIRESTORE CLOUD ]</span>
            <h1 className="font-alexandria font-black text-xl sm:text-3xl md:text-4xl text-white tracking-tight break-words leading-tight">
              سجل التدريبات <span className="text-[#b2e01e]">ومتتبع التقدم</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#f2f7ff]/80 leading-relaxed max-w-xl font-medium break-words">
              سجل ساعات تدريبك في الملعب، شدة التمرين، ومجال التركيز الفني. تُحفظ بياناتك تلقائياً في السحابة لمراقبة تطورك نحو تصنيف معتمد.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-neon px-5 py-3 text-xs font-black flex items-center justify-center gap-2.5 shrink-0 self-stretch sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#0b0b0d] shrink-0" />
            <span>تسجيل حصة تدريبية جديدة</span>
          </button>
        </div>
      </div>

      {/* Metrics Row: 6 Sports Key Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 font-mono-tag min-w-0">
        
        <div className="card-dark p-3.5 sm:p-4 rounded border border-[var(--card-border)] bg-[#16161a] space-y-1 text-right min-w-0 flex flex-col justify-between">
          <span className="label-mono mb-0.5 truncate" style={{ color: '#b2e01e' }}>SESSIONS</span>
          <p className="font-alexandria font-black text-2xl sm:text-3xl text-white tracking-tight">{totalSessions}</p>
          <span className="text-[10px] text-[#f2f7ff]/60 truncate">حصة مسجلة</span>
        </div>

        <div className="card-dark p-3.5 sm:p-4 rounded border border-[var(--card-border)] bg-[#16161a] space-y-1 text-right min-w-0 flex flex-col justify-between">
          <span className="label-mono mb-0.5 truncate" style={{ color: '#b2e01e' }}>HOURS LOGGED</span>
          <p className="font-alexandria font-black text-2xl sm:text-3xl text-[#b2e01e] tracking-tight">{totalHours}</p>
          <span className="text-[10px] text-[#f2f7ff]/60 truncate">ساعة تدريب فعلية</span>
        </div>

        <div className="card-dark p-3.5 sm:p-4 rounded border border-[var(--card-border)] bg-[#16161a] space-y-1 text-right min-w-0 flex flex-col justify-between">
          <span className="label-mono mb-0.5 truncate" style={{ color: '#b2e01e' }}>MASTERY</span>
          <p className="font-alexandria font-black text-2xl sm:text-3xl text-white tracking-tight">{masteredCount}<span className="text-xs text-white/50">/12</span></p>
          <span className="text-[10px] text-[#b2e01e] font-bold truncate">{skillsPercent}% مكتمل</span>
        </div>

        <div className="card-dark p-3.5 sm:p-4 rounded border border-[var(--card-border)] bg-[#16161a] space-y-1 text-right min-w-0 flex flex-col justify-between">
          <span className="label-mono mb-0.5 truncate" style={{ color: '#b2e01e' }}>ACTIVE DAYS</span>
          <p className="font-alexandria font-black text-2xl sm:text-3xl text-white tracking-tight">{uniqueDays}</p>
          <span className="text-[10px] text-[#f2f7ff]/60 truncate">يوماً رياضياً</span>
        </div>

        <div className="card-dark p-3.5 sm:p-4 rounded border border-[var(--card-border)] bg-[#16161a] space-y-1 text-right min-w-0 flex flex-col justify-between">
          <span className="label-mono mb-0.5 truncate" style={{ color: '#b2e01e' }}>STAGE</span>
          <p className="font-alexandria font-black text-2xl sm:text-3xl text-[#b2e01e] tracking-tight">0{currentLevelNum}</p>
          <span className="text-[10px] text-[#f2f7ff]/60 truncate">تصنيف معتمد</span>
        </div>

        <div className="card-dark p-3.5 sm:p-4 rounded border border-[var(--card-border)] bg-[#16161a] space-y-1 text-right min-w-0 flex flex-col justify-between">
          <span className="label-mono mb-0.5 truncate" style={{ color: '#b2e01e' }}>EFFICIENCY</span>
          <p className="font-alexandria font-black text-2xl sm:text-3xl text-white tracking-tight">+{improvementRate}%</p>
          <span className="text-[10px] text-[#b2e01e] font-bold truncate">معدل التحسن</span>
        </div>

      </div>

      {/* Main Grid: 12 Competencies Checklist + Log Entries History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start min-w-0">
        
        {/* Left Column: Skills Checklist */}
        <div className="lg:col-span-5 card-dark p-4 sm:p-6 rounded border border-[var(--card-border)] bg-[#16161a] space-y-4 min-w-0">
          <div>
            <div className="flex items-center justify-between mb-1 gap-2">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ 12 CORE COMPETENCIES ]</span>
              <span className="text-xs font-mono-tag text-[#b2e01e] font-bold shrink-0">{skillsPercent}%</span>
            </div>
            <h2 className="font-alexandria font-bold text-base sm:text-lg text-white break-words">قائمة المهارات الفنية المكتملة</h2>
            <p className="text-xs text-[#f2f7ff]/70 mt-1 break-words">
              حدد المهارات التي أتقنتها وثبتت في أسلوب لعبك:
            </p>

            {/* Progress bar */}
            <div className="w-full h-2 bg-[#0b0b0d] rounded overflow-hidden border border-[var(--card-border)] mt-3">
              <div 
                className="h-full bg-[#b2e01e] transition-all duration-300"
                style={{ width: `${skillsPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-2 max-h-[480px] sm:max-h-[580px] overflow-y-auto pr-1 min-w-0">
            {MASTER_SKILLS_LIST.map((skill) => {
              const isChecked = masteredSkills.includes(skill.id);
              return (
                <div
                  key={skill.id}
                  onClick={() => toggleSkillMastered(skill.id)}
                  className={`p-3 rounded border transition-colors flex items-start gap-2.5 cursor-pointer bg-[#0b0b0d] min-w-0 ${
                    isChecked
                      ? 'border-[#b2e01e] text-white'
                      : 'border-[var(--card-border)] hover:border-white/30 text-white/80'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-[#b2e01e]" />
                    ) : (
                      <Square className="w-4 h-4 text-white/40" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 min-w-0">
                      <span className={`text-xs font-bold truncate ${isChecked ? 'text-[#b2e01e]' : 'text-white'}`}>
                        {skill.nameAr}
                      </span>
                      <span className="text-[10px] font-mono-tag px-1.5 py-0.5 rounded bg-[#16161a] border border-[var(--card-border)] text-[#f2f7ff]/60 shrink-0">
                        {skill.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#f2f7ff]/60 mt-1 leading-relaxed break-words">
                      {skill.descriptionAr}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sessions History with Full Intensity & Focus Highlights */}
        <div className="lg:col-span-7 card-dark p-4 sm:p-6 rounded border border-[var(--card-border)] bg-[#16161a] space-y-4 min-w-0">
          <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-3 min-w-0 gap-2">
            <div className="min-w-0">
              <span className="label-mono mb-0 truncate" style={{ color: '#b2e01e' }}>[ CLOUD LOG ENTRIES ]</span>
              <h2 className="font-alexandria font-bold text-base sm:text-lg text-white truncate">سجل الحصص التدريبية المسجلة</h2>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-neon text-xs px-3.5 py-2 font-black flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#0b0b0d] shrink-0" />
              <span>إضافة حصة</span>
            </button>
          </div>

          {trainingSessions.length > 0 ? (
            <div className="space-y-3 min-w-0">
              {trainingSessions.map((session) => (
                <div 
                  key={session.id}
                  className="bg-[#0b0b0d] border border-[var(--card-border)] hover:border-[#b2e01e] p-3.5 sm:p-4 rounded space-y-2.5 transition-colors group min-w-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 min-w-0">
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 min-w-0">
                        <h4 className="font-alexandria font-bold text-white text-xs sm:text-sm break-words">{session.focus}</h4>
                        {getIntensityBadge(session.intensity)}
                      </div>

                      <div className="flex items-center gap-2.5 font-mono-tag text-[11px] text-[#f2f7ff]/70 flex-wrap">
                        <span className="flex items-center gap-1 shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-[#b2e01e]" />
                          <span>{session.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 shrink-0">
                          <Clock className="w-3.5 h-3.5 text-[#b2e01e]" />
                          <span>{session.durationMinutes} دقيقة</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-end sm:self-center font-mono-tag text-xs shrink-0">
                      <span className="text-[#0b0b0d] bg-[#b2e01e] px-2.5 py-1 rounded font-black">
                        التقييم: {session.rating}/10
                      </span>

                      <button
                        onClick={() => deleteTrainingSession(session.id)}
                        className="text-white/40 hover:text-red-400 p-1.5 rounded hover:bg-white/5 transition cursor-pointer"
                        title="حذف الحصة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {session.skillsWorkedOn && session.skillsWorkedOn.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1 min-w-0">
                      {session.skillsWorkedOn.map((skillId) => {
                        const skillDef = MASTER_SKILLS_LIST.find(s => s.id === skillId);
                        return (
                          <span 
                            key={skillId} 
                            className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#16161a] text-[#f2f7ff]/80 border border-[var(--card-border)] shrink-0"
                          >
                            ✓ {skillDef ? skillDef.nameAr.split('(')[0] : skillId}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {session.notes && (
                    <p className="text-xs text-[#f2f7ff]/80 bg-[#16161a] p-2.5 rounded border border-[var(--card-border)] leading-relaxed font-sans break-words">
                      "{session.notes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-white/50 space-y-2.5 font-mono-tag bg-[#0b0b0d] rounded border border-[var(--card-border)] p-4 min-w-0">
              <Calendar className="w-8 h-8 mx-auto text-[#b2e01e]" />
              <p className="text-sm text-white font-bold font-alexandria">لا توجد حصص مسجلة حتى الآن</p>
              <p className="text-xs text-[#f2f7ff]/60">ابدأ بتسجيل أول تمرين لك لتتبع إحصائياتك في الملعب.</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="btn-neon text-xs px-4 py-2 mt-2 cursor-pointer"
              >
                + تسجيل أول حصة الآن
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Comprehensive Add Training Session Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="card-dark rounded max-w-xl w-full max-h-[88vh] overflow-y-auto border border-[#b2e01e] bg-[#16161a] text-right p-4 sm:p-6 md:p-7 space-y-4 min-w-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-3 min-w-0 gap-2">
              <div className="min-w-0">
                <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ RECORD TRAINING SESSION ]</span>
                <h3 className="font-alexandria font-black text-lg sm:text-xl text-white truncate">تسجيل حصة تدريبية جديدة</h3>
                <p className="text-xs text-[#f2f7ff]/70 mt-0.5 truncate">تُحفظ في قاعدة بيانات Firestore لحسابك الشخصي</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-white/60 hover:text-white p-1.5 rounded bg-[#0b0b0d] border border-[var(--card-border)] cursor-pointer shrink-0"
                aria-label="إغلاق النافذة"
              >
                <X className="w-5 h-5 text-[#b2e01e]" />
              </button>
            </div>

            <form onSubmit={handleSaveSession} className="space-y-4 min-w-0">
              
              {/* Row 1: Date & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
                <div className="min-w-0">
                  <label className="block text-xs text-[#f2f7ff]/80 font-bold mb-1.5 font-mono-tag">
                    التاريخ (DATE)
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    required
                    className="w-full bg-[#0b0b0d] border border-[var(--card-border)] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#b2e01e] font-mono"
                  />
                </div>

                <div className="min-w-0">
                  <label className="block text-xs text-[#f2f7ff]/80 font-bold mb-1.5 font-mono-tag">
                    المدة بالدقائق (DURATION)
                  </label>
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="number"
                      min="15"
                      max="300"
                      value={formDuration}
                      onChange={(e) => setFormDuration(Number(e.target.value))}
                      required
                      className="w-full bg-[#0b0b0d] border border-[var(--card-border)] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#b2e01e] text-right font-mono font-bold"
                    />
                  </div>
                  {/* Quick pills */}
                  <div className="flex gap-1.5 mt-1.5 min-w-0">
                    {[45, 60, 90, 120].map((mins) => (
                      <button
                        type="button"
                        key={mins}
                        onClick={() => setFormDuration(mins)}
                        className={`text-[10px] font-mono-tag px-2 py-0.5 rounded border transition-colors cursor-pointer shrink-0 ${
                          formDuration === mins
                            ? 'bg-[#b2e01e] text-[#0b0b0d] border-[#b2e01e] font-black'
                            : 'bg-[#0b0b0d] text-[#f2f7ff]/70 border-[var(--card-border)] hover:border-white/30'
                        }`}
                      >
                        {mins} د
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 2: Intensity Level Selector */}
              <div className="min-w-0">
                <label className="block text-xs text-[#f2f7ff]/80 font-bold mb-1.5 font-mono-tag">
                  شدة التدريب (INTENSITY)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 min-w-0">
                  {INTENSITIES.map((intensity) => {
                    const isSelected = formIntensity === intensity.id;
                    return (
                      <button
                        type="button"
                        key={intensity.id}
                        onClick={() => setFormIntensity(intensity.id as 'low' | 'medium' | 'high' | 'match')}
                        className={`p-2 rounded border text-center transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer bg-[#0b0b0d] min-w-0 ${
                          isSelected
                            ? `border-[#b2e01e] text-white`
                            : 'border-[var(--card-border)] hover:border-white/30 text-white/70'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: intensity.dotColor }}></span>
                        <span className="text-xs font-bold text-white truncate">{intensity.shortLabel}</span>
                        <span className="text-[9px] text-[#f2f7ff]/50 font-mono-tag">{intensity.id.toUpperCase()}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Focus Area */}
              <div className="min-w-0">
                <label className="block text-xs text-[#f2f7ff]/80 font-bold mb-1.5 font-mono-tag">
                  مجال التركيز الفني (FOCUS AREA)
                </label>
                <input
                  type="text"
                  value={formFocus}
                  onChange={(e) => setFormFocus(e.target.value)}
                  placeholder="مثال: الفولي والكرات الهوائية، البانديخا، الدفاع عن الزجاج..."
                  required
                  className="w-full bg-[#0b0b0d] border border-[var(--card-border)] rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#b2e01e] text-right font-medium"
                />

                {/* Suggestions chips */}
                <div className="flex flex-wrap gap-1.5 mt-1.5 min-w-0">
                  {SUGGESTED_FOCUS_AREAS.slice(0, 4).map((suggestion) => (
                    <button
                      type="button"
                      key={suggestion}
                      onClick={() => setFormFocus(suggestion)}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#0b0b0d] hover:border-white/30 border border-[var(--card-border)] text-[#f2f7ff]/75 transition cursor-pointer shrink-0"
                    >
                      {suggestion.split('(')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 4: Rating */}
              <div className="bg-[#0b0b0d] p-3 rounded border border-[var(--card-border)] min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-[#f2f7ff]/80 font-bold font-mono-tag">
                    تقييم الأداء الشخصي (RATING):
                  </label>
                  <span className="text-[#0b0b0d] bg-[#b2e01e] px-2 py-0.5 rounded font-mono-tag font-black text-xs">
                    {formRating} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formRating}
                  onChange={(e) => setFormRating(Number(e.target.value))}
                  className="w-full accent-[#b2e01e] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono-tag text-[#f2f7ff]/50 mt-1">
                  <span>1 (ضعيف)</span>
                  <span>5 (متوسط)</span>
                  <span>10 (مثالي / بطولة)</span>
                </div>
              </div>

              {/* Row 5: Skills Worked On */}
              <div className="min-w-0">
                <label className="block text-xs text-[#f2f7ff]/80 font-bold mb-1.5 font-mono-tag">
                  المهارات التي تم التركيز عليها (SKILLS WORKED ON):
                </label>
                <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto pr-1 min-w-0">
                  {MASTER_SKILLS_LIST.map((skill) => {
                    const isSelected = formSelectedSkills.includes(skill.id);
                    return (
                      <button
                        type="button"
                        key={skill.id}
                        onClick={() => handleToggleFormSkill(skill.id)}
                        className={`text-right p-2 rounded border text-[11px] transition flex items-center justify-between cursor-pointer min-w-0 ${
                          isSelected
                            ? 'bg-[#0b0b0d] border-[#b2e01e] text-white font-bold'
                            : 'bg-[#0b0b0d] border-[var(--card-border)] text-[#f2f7ff]/60 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{skill.nameAr.split('(')[0]}</span>
                        {isSelected && <span className="text-[#b2e01e] font-black mr-1 shrink-0">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 6: Observations & Coach Notes */}
              <div className="min-w-0">
                <label className="block text-xs text-[#f2f7ff]/80 font-bold mb-1.5 font-mono-tag">
                  ملاحظات اللاعب والكوتش (COACH & ATHLETE OBSERVATIONS)
                </label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="سجل أخطاء لاحظتها، نصائح من الكوتش أو الزميل، نقاط القوة التي شعرت بها..."
                  rows={2}
                  className="w-full bg-[#0b0b0d] border border-[var(--card-border)] rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#b2e01e] text-right font-sans"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="pt-1 flex items-center gap-2.5 min-w-0">
                <button
                  type="submit"
                  className="btn-neon flex-1 py-3 text-xs font-black justify-center cursor-pointer"
                >
                  حفظ الحصة التدريبية في السحابة
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-outline-ink px-5 py-3 text-xs font-mono-tag cursor-pointer shrink-0"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
