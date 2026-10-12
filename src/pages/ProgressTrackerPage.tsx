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
    <div className="max-w-7xl mx-auto py-6 text-right space-y-8">
      
      {/* Header Hero Banner */}
      <div className="card-dark p-8 sm:p-10 rounded-2xl border-2 border-white/20 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-3 h-full bg-[#b2e01e]"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#b2e01e]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="label-mono" style={{ color: '#b2e01e' }}>[ ATHLETE TRAINING LOG & FIRESTORE CLOUD ]</span>
            <h1 className="font-alexandria font-black text-3xl sm:text-5xl text-white tracking-tight">
              سجل التدريبات <span className="text-[#b2e01e]">ومتتبع التقدم</span>
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl font-medium">
              سجل ساعات تدريبك في الملعب، شدة التمرين، ومجال التركيز الفني. تُحفظ بياناتك تلقائياً في السحابة لمراقبة تطورك نحو تصنيف معتمد.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-neon px-6 py-4 text-xs font-black flex items-center justify-center gap-2.5 whitespace-nowrap shadow-xl"
          >
            <Plus className="w-4 h-4 text-[#002255]" />
            <span>تسجيل حصة تدريبية جديدة</span>
          </button>
        </div>
      </div>

      {/* Metrics Row: 6 Sports Key Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 font-mono-tag">
        
        <div className="card-dark p-5 rounded-xl border border-white/15 space-y-1 shadow-lg text-right">
          <span className="label-mono mb-1" style={{ color: '#b2e01e' }}>SESSIONS</span>
          <p className="font-alexandria font-black text-3xl text-white">{totalSessions}</p>
          <span className="text-[10px] text-white/60">حصة مسجلة</span>
        </div>

        <div className="card-dark p-5 rounded-xl border border-white/15 space-y-1 shadow-lg text-right">
          <span className="label-mono mb-1" style={{ color: '#b2e01e' }}>HOURS LOGGED</span>
          <p className="font-alexandria font-black text-3xl text-[#b2e01e]">{totalHours}</p>
          <span className="text-[10px] text-white/60">ساعة تدريب فعلية</span>
        </div>

        <div className="card-dark p-5 rounded-xl border border-white/15 space-y-1 shadow-lg text-right">
          <span className="label-mono mb-1" style={{ color: '#b2e01e' }}>MASTERY</span>
          <p className="font-alexandria font-black text-3xl text-white">{masteredCount}<span className="text-xs text-white/50">/12</span></p>
          <span className="text-[10px] text-[#b2e01e] font-bold">{skillsPercent}% مكتمل</span>
        </div>

        <div className="card-dark p-5 rounded-xl border border-white/15 space-y-1 shadow-lg text-right">
          <span className="label-mono mb-1" style={{ color: '#b2e01e' }}>ACTIVE DAYS</span>
          <p className="font-alexandria font-black text-3xl text-white">{uniqueDays}</p>
          <span className="text-[10px] text-white/60">يوماً رياضياً</span>
        </div>

        <div className="card-dark p-5 rounded-xl border border-white/15 space-y-1 shadow-lg text-right">
          <span className="label-mono mb-1" style={{ color: '#b2e01e' }}>STAGE</span>
          <p className="font-alexandria font-black text-3xl text-[#b2e01e]">0{currentLevelNum}</p>
          <span className="text-[10px] text-white/60">تصنيف معتمد</span>
        </div>

        <div className="card-dark p-5 rounded-xl border border-white/15 space-y-1 shadow-lg text-right">
          <span className="label-mono mb-1" style={{ color: '#b2e01e' }}>EFFICIENCY</span>
          <p className="font-alexandria font-black text-3xl text-white">+{improvementRate}%</p>
          <span className="text-[10px] text-[#b2e01e] font-bold">معدل التحسن</span>
        </div>

      </div>

      {/* Main Grid: 12 Competencies Checklist + Log Entries History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Skills Checklist */}
        <div className="lg:col-span-5 card-dark p-6 sm:p-8 rounded-2xl border border-white/15 space-y-6 shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="label-mono" style={{ color: '#b2e01e' }}>[ 12 CORE COMPETENCIES ]</span>
              <span className="text-xs font-mono-tag text-[#b2e01e] font-bold">{skillsPercent}%</span>
            </div>
            <h2 className="font-alexandria font-bold text-lg text-white">قائمة المهارات الفنية المكتملة</h2>
            <p className="text-xs text-white/70 mt-1">
              حدد المهارات التي أتقنتها وثبتت في أسلوب لعبك:
            </p>

            {/* Progress bar */}
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10 mt-3">
              <div 
                className="h-full bg-[#b2e01e] rounded-full transition-all duration-300 shadow-[0_0_10px_#b2e01e]"
                style={{ width: `${skillsPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {MASTER_SKILLS_LIST.map((skill) => {
              const isChecked = masteredSkills.includes(skill.id);
              return (
                <div
                  key={skill.id}
                  onClick={() => toggleSkillMastered(skill.id)}
                  className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer theme-card-solid ${
                    isChecked
                      ? 'border-[#b2e01e] text-white shadow-md'
                      : 'border-white/10 hover:border-white/30 text-white/80'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-[#b2e01e]" />
                    ) : (
                      <Square className="w-4 h-4 text-white/40" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isChecked ? 'text-[#b2e01e]' : 'text-white'}`}>
                        {skill.nameAr}
                      </span>
                      <span className="text-[10px] font-mono-tag px-2 py-0.5 rounded bg-white/5 text-white/60">
                        {skill.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
                      {skill.descriptionAr}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sessions History with Full Intensity & Focus Highlights */}
        <div className="lg:col-span-7 card-dark p-6 sm:p-8 rounded-2xl border border-white/15 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/15 pb-4">
            <div>
              <span className="label-mono" style={{ color: '#b2e01e' }}>[ CLOUD LOG ENTRIES ]</span>
              <h2 className="font-alexandria font-bold text-lg text-white">سجل الحصص التدريبية المسجلة</h2>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-neon text-xs px-3.5 py-2 font-black flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-[#002255]" />
              <span>إضافة حصة</span>
            </button>
          </div>

          {trainingSessions.length > 0 ? (
            <div className="space-y-3.5">
              {trainingSessions.map((session) => (
                <div 
                  key={session.id}
                  className="theme-card-solid border border-white/15 hover:border-[#b2e01e]/60 p-4 sm:p-5 rounded-xl space-y-3 transition-all shadow-md group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-alexandria font-bold text-white text-sm sm:text-base">{session.focus}</h4>
                        {getIntensityBadge(session.intensity)}
                      </div>

                      <div className="flex items-center gap-3 font-mono-tag text-[11px] text-white/70">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#b2e01e]" />
                          <span>{session.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#b2e01e]" />
                          <span>{session.durationMinutes} دقيقة</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center font-mono-tag text-xs">
                      <span className="text-[#002255] bg-[#b2e01e] px-2.5 py-1 rounded-lg font-black shadow">
                        التقييم: {session.rating}/10
                      </span>

                      <button
                        onClick={() => deleteTrainingSession(session.id)}
                        className="text-white/40 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition"
                        title="حذف الحصة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {session.skillsWorkedOn && session.skillsWorkedOn.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {session.skillsWorkedOn.map((skillId) => {
                        const skillDef = MASTER_SKILLS_LIST.find(s => s.id === skillId);
                        return (
                          <span 
                            key={skillId} 
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md theme-subcard text-white/80 border border-white/10"
                          >
                            ✓ {skillDef ? skillDef.nameAr.split('(')[0] : skillId}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {session.notes && (
                    <p className="text-xs text-white/85 theme-subcard p-3 rounded-xl border border-white/10 leading-relaxed font-sans">
                      "{session.notes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-white/50 space-y-3 font-mono-tag theme-card-solid rounded-2xl border border-dashed border-white/15">
              <Calendar className="w-10 h-10 mx-auto text-[#b2e01e]/60" />
              <p className="text-sm text-white font-bold font-alexandria">لا توجد حصص مسجلة حتى الآن</p>
              <p className="text-xs text-white/60">ابدأ بتسجيل أول تمرين لك لتتبع إحصائياتك في الملعب.</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="btn-neon text-xs px-4 py-2 mt-2"
              >
                + تسجيل أول حصة الآن
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Comprehensive Add Training Session Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="card-dark rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border-2 border-white/20 text-right p-6 sm:p-8 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <span className="label-mono" style={{ color: '#b2e01e' }}>[ RECORD TRAINING SESSION ]</span>
                <h3 className="font-alexandria font-black text-xl text-white">تسجيل حصة تدريبية جديدة</h3>
                <p className="text-xs text-white/70 mt-0.5">تُحفظ في قاعدة بيانات Firestore لحسابك الشخصي</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSession} className="space-y-5">
              
              {/* Row 1: Date & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/80 font-bold mb-1.5 font-mono-tag">
                    التاريخ (DATE)
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    required
                    className="w-full theme-card-solid border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#b2e01e] focus:ring-1 focus:ring-[#b2e01e]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/80 font-bold mb-1.5 font-mono-tag">
                    المدة بالدقائق (DURATION)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="15"
                      max="300"
                      value={formDuration}
                      onChange={(e) => setFormDuration(Number(e.target.value))}
                      required
                      className="w-full theme-card-solid border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#b2e01e] focus:ring-1 focus:ring-[#b2e01e] text-right font-mono font-bold"
                    />
                  </div>
                  {/* Quick pills */}
                  <div className="flex gap-1.5 mt-1.5">
                    {[45, 60, 90, 120].map((mins) => (
                      <button
                        type="button"
                        key={mins}
                        onClick={() => setFormDuration(mins)}
                        className={`text-[10px] font-mono-tag px-2 py-0.5 rounded border transition-colors ${
                          formDuration === mins
                            ? 'bg-[#b2e01e] text-[#002255] border-[#b2e01e] font-black'
                            : 'theme-card-solid text-white/70 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {mins} د
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 2: Intensity Level Selector */}
              <div>
                <label className="block text-xs text-white/80 font-bold mb-2 font-mono-tag">
                  شدة التدريب (INTENSITY)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {INTENSITIES.map((intensity) => {
                    const isSelected = formIntensity === intensity.id;
                    return (
                      <button
                        type="button"
                        key={intensity.id}
                        onClick={() => setFormIntensity(intensity.id as 'low' | 'medium' | 'high' | 'match')}
                        className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? `theme-card-solid ${intensity.borderClass} ring-2 ring-[#b2e01e]/60 shadow-lg`
                            : 'theme-card-solid border-white/10 hover:border-white/25 text-white/70'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: intensity.dotColor }}></span>
                        <span className="text-xs font-bold text-white">{intensity.shortLabel}</span>
                        <span className="text-[9px] text-white/50">{intensity.id.toUpperCase()}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Focus Area */}
              <div>
                <label className="block text-xs text-white/80 font-bold mb-1.5 font-mono-tag">
                  مجال التركيز الفني (FOCUS AREA)
                </label>
                <input
                  type="text"
                  value={formFocus}
                  onChange={(e) => setFormFocus(e.target.value)}
                  placeholder="مثال: الفولي والكرات الهوائية، البانديخا، الدفاع عن الزجاج..."
                  required
                  className="w-full theme-card-solid border border-white/20 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#b2e01e] focus:ring-1 focus:ring-[#b2e01e] text-right font-medium"
                />

                {/* Suggestions chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {SUGGESTED_FOCUS_AREAS.slice(0, 4).map((suggestion) => (
                    <button
                      type="button"
                      key={suggestion}
                      onClick={() => setFormFocus(suggestion)}
                      className="text-[10px] px-2.5 py-1 rounded-lg theme-card-solid hover:bg-white/10 border border-white/10 text-white/75 transition"
                    >
                      {suggestion.split('(')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 4: Rating */}
              <div className="theme-card-solid p-3.5 rounded-xl border border-white/15">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-white/80 font-bold font-mono-tag">
                    تقييم الأداء الشخصي (RATING):
                  </label>
                  <span className="text-[#002255] bg-[#b2e01e] px-2.5 py-0.5 rounded-lg font-mono-tag font-black text-xs shadow">
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
                <div className="flex justify-between text-[10px] font-mono-tag text-white/40 mt-1">
                  <span>1 (ضعيف)</span>
                  <span>5 (متوسط)</span>
                  <span>10 (مثالي / بطولة)</span>
                </div>
              </div>

              {/* Row 5: Skills Worked On */}
              <div>
                <label className="block text-xs text-white/80 font-bold mb-2 font-mono-tag">
                  المهارات التي تم التركيز عليها (SKILLS WORKED ON):
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
                  {MASTER_SKILLS_LIST.map((skill) => {
                    const isSelected = formSelectedSkills.includes(skill.id);
                    return (
                      <button
                        type="button"
                        key={skill.id}
                        onClick={() => handleToggleFormSkill(skill.id)}
                        className={`text-right p-2 rounded-lg border text-[11px] transition flex items-center justify-between ${
                          isSelected
                            ? 'theme-card-solid border-[#b2e01e] text-white font-bold'
                            : 'theme-card-solid border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{skill.nameAr.split('(')[0]}</span>
                        {isSelected && <span className="text-[#b2e01e] font-black mr-1">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 6: Observations & Coach Notes */}
              <div>
                <label className="block text-xs text-white/80 font-bold mb-1.5 font-mono-tag">
                  ملاحظات اللاعب والكوتش (COACH & ATHLETE OBSERVATIONS)
                </label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="سجل أخطاء لاحظتها، نصائح من الكوتش أو الزميل، نقاط القوة التي شعرت بها..."
                  rows={3}
                  className="w-full theme-card-solid border border-white/20 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#b2e01e] focus:ring-1 focus:ring-[#b2e01e] text-right font-sans"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="btn-neon flex-1 py-3.5 text-xs font-black justify-center shadow-xl"
                >
                  حفظ الحصة التدريبية في السحابة
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-outline-ink px-6 py-3.5 text-xs font-mono-tag"
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
