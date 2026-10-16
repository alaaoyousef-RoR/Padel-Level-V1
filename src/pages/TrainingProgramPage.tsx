import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TRAINING_PROGRAMS } from '../data/trainingData';
import { PADEL_LEVELS } from '../data/assessmentData';
import { PADEL_VIDEOS } from '../data/videoData';
import { PadelLevelNumber, PadelVideoTutorial } from '../types';
import { CustomVideoPlayer } from '../components/CustomVideoPlayer';
import { 
  Trophy, 
  Calendar, 
  Clock, 
  Printer, 
  Activity,
  Play
} from 'lucide-react';

export const TrainingProgramPage: React.FC = () => {
  const { testResult, user, navigateTo } = useApp();

  const initialLevel: PadelLevelNumber = testResult?.levelNumber || user?.levelNumber || 1;
  const [selectedLevel, setSelectedLevel] = useState<PadelLevelNumber>(initialLevel);
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState<PadelVideoTutorial | null>(null);

  const handleOpenVideoForDrill = (drillName: string) => {
    const matched = PADEL_VIDEOS.find(v => 
      drillName.includes(v.titleAr) || 
      v.titleAr.includes(drillName) ||
      v.keyTakeaways.some(k => drillName.includes(k) || k.includes(drillName))
    ) || PADEL_VIDEOS[0];
    setActiveVideoModal(matched);
  };

  const currentProgram = TRAINING_PROGRAMS[selectedLevel] || TRAINING_PROGRAMS[1];
  const levelInfo = PADEL_LEVELS[selectedLevel] || PADEL_LEVELS[1];
  const currentWeek = currentProgram.weeks[activeWeekIndex] || currentProgram.weeks[0];
  const code = selectedLevel < 10 ? `0${selectedLevel}` : `${selectedLevel}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-2 sm:py-4 text-right space-y-5 sm:space-y-6 font-alexandria min-w-0">
      
      {/* Notice if unassessed */}
      {!testResult && (
        <div className="card-dark p-4 sm:p-5 rounded border border-[var(--card-border)] bg-[#16161a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono-tag text-xs text-[#b2e01e] bg-[#0b0b0d] border border-[#005cd7] px-2.5 py-1 rounded font-black shrink-0">
              EVALUATION PENDING
            </span>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-white break-words">لم تقم بإجراء اختبار المستوى بعد</h4>
              <p className="text-xs text-[#f2f7ff]/70 break-words mt-0.5">
                خض الاختبار لتفعيل برنامجك المخصص تلقائياً. يمكنك تصفح خطط المستويات الـ 5 يدوياً أدناه.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('level-test')}
            className="btn-neon text-xs px-5 py-2.5 shrink-0 self-stretch sm:self-auto text-center justify-center font-black"
          >
            خض الاختبار الآن
          </button>
        </div>
      )}

      {/* Program Header */}
      <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] space-y-4 sm:space-y-6 relative overflow-hidden min-w-0">
        <div className="absolute top-0 right-0 w-2 h-full bg-[#b2e01e]"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 min-w-0">
          
          <div className="space-y-2.5 max-w-2xl min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ PROGRAM STAGE {code} ]</span>
              <span className="font-mono-tag text-[10px] bg-[#0b0b0d] border border-[var(--card-border)] text-[#b2e01e] font-bold px-2.5 py-0.5 rounded shrink-0">
                Playtomic {levelInfo.playtomicEquivalent} • {levelInfo.playtomicTier}
              </span>
              {testResult?.levelNumber === selectedLevel && (
                <span className="font-mono-tag text-[9px] bg-[#b2e01e] text-[#0b0b0d] font-black px-2 py-0.5 rounded shrink-0">
                  YOUR ACTIVE LEVEL
                </span>
              )}
            </div>

            <h1 className="font-alexandria font-black text-xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase break-words leading-tight">
              {currentProgram.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#f2f7ff]/80 leading-relaxed font-medium break-words">
              {currentProgram.goal}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 font-mono-tag text-xs text-[#f2f7ff]/70 pt-1">
              <div className="flex items-center gap-1.5 bg-[#0b0b0d] px-3 py-1.5 rounded border border-[var(--card-border)] shrink-0">
                <Calendar className="w-3.5 h-3.5 text-[#b2e01e] shrink-0" />
                <span>DURATION: {currentProgram.durationWeeks} WEEKS</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0b0b0d] px-3 py-1.5 rounded border border-[var(--card-border)] shrink-0">
                <Clock className="w-3.5 h-3.5 text-[#b2e01e] shrink-0" />
                <span>FREQUENCY: {currentProgram.sessionsPerWeekText}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0">
            <button
              onClick={() => navigateTo('progress-tracker')}
              className="btn-neon px-5 py-3 text-xs justify-center font-black flex items-center gap-2"
            >
              <Activity className="w-3.5 h-3.5 shrink-0" />
              <span>تسجيل حصة اليوم</span>
            </button>
            <button
              onClick={handlePrint}
              className="btn-outline-ink px-4 py-2.5 text-xs justify-center font-mono-tag flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5 shrink-0" />
              <span>PRINT PLAN (PDF)</span>
            </button>
          </div>

        </div>
      </div>

      {/* Level Selector Tabs */}
      <div className="card-dark p-2 rounded border border-[var(--card-border)] bg-[#16161a] flex items-center gap-1.5 overflow-x-auto font-mono-tag min-w-0">
        {([1, 2, 3, 4, 5] as const).map((lvl) => {
          const isSelected = selectedLevel === lvl;
          const isUserLevel = (testResult?.levelNumber === lvl) || (user?.levelNumber === lvl);
          return (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded text-xs font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                  : 'bg-[#0b0b0d] text-[#f2f7ff]/70 hover:text-white border border-[var(--card-border)]'
              }`}
            >
              <span>STAGE [0{lvl}]</span>
              {isUserLevel && (
                <span className={`text-[8px] px-1.5 py-0.2 rounded font-black shrink-0 ${
                  isSelected ? 'bg-[#0b0b0d] text-[#b2e01e]' : 'bg-[#b2e01e] text-[#0b0b0d]'
                }`}>
                  YOU
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Focus Areas */}
      <div className="card-dark p-4 sm:p-6 md:p-7 rounded space-y-3.5 border border-[var(--card-border)] bg-[#16161a] min-w-0">
        <div>
          <span className="label-mono mb-0.5" style={{ color: '#b2e01e' }}>[ CORE COMPETENCIES ]</span>
          <h3 className="font-alexandria font-bold text-sm sm:text-base text-white">محاور التركيز الرئيسية للبرنامج:</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 font-mono-tag text-xs min-w-0">
          {currentProgram.focusAreas.map((area, idx) => (
            <div key={idx} className="bg-[#0b0b0d] border border-[var(--card-border)] p-3 rounded text-[#f2f7ff]/90 flex items-start gap-2 min-w-0">
              <span className="text-[#b2e01e] font-bold shrink-0">•</span>
              <span className="font-sans text-xs break-words">{area}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Breakdown Navigation */}
      <div className="space-y-4 sm:space-y-5 min-w-0">
        <div>
          <span className="label-mono mb-0.5" style={{ color: '#b2e01e' }}>[ WEEKLY CURRICULUM ]</span>
          <h2 className="font-alexandria font-black text-xl sm:text-2xl text-white break-words">الجدول التدريبي الأسبوعي المفصل</h2>
        </div>

        {/* Week Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono-tag min-w-0">
          {currentProgram.weeks.map((week, idx) => {
            const isWeekActive = activeWeekIndex === idx;
            return (
              <button
                key={week.weekNumber}
                onClick={() => setActiveWeekIndex(idx)}
                className={`py-2 px-4 rounded text-xs transition-colors whitespace-nowrap font-bold cursor-pointer shrink-0 ${
                  isWeekActive
                    ? 'bg-[#b2e01e] text-[#0b0b0d] font-black'
                    : 'bg-[#0b0b0d] text-[#f2f7ff]/70 hover:text-white border border-[var(--card-border)]'
                }`}
              >
                WEEK [{week.weekNumber < 10 ? `0${week.weekNumber}` : week.weekNumber}]
              </button>
            );
          })}
        </div>

        {/* Selected Week Card */}
        {currentWeek && (
          <div className="card-dark rounded border border-[var(--card-border)] bg-[#16161a] overflow-hidden min-w-0 divide-y divide-[var(--card-border)]">
            
            <div className="p-4 sm:p-6 bg-[#0b0b0d]">
              <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
                <span className="font-mono-tag text-[10px] text-[#b2e01e] font-bold">
                  WEEK {currentWeek.weekNumber} OF {currentProgram.durationWeeks}
                </span>
                <span className="font-mono-tag text-xs text-[#f2f7ff]/70">
                  {currentWeek.sessionsPerWeek} SESSIONS / WEEK
                </span>
              </div>
              <h3 className="font-alexandria font-bold text-lg sm:text-xl text-white break-words">
                {currentWeek.theme}
              </h3>
              <p className="text-xs text-[#f2f7ff]/75 mt-1 break-words">
                الهدف الفني: {currentWeek.focus}
              </p>
            </div>

            <div className="p-4 sm:p-6 md:p-7 space-y-6 sm:space-y-7 min-w-0">
              
              {/* 1. Warm-up */}
              <div className="space-y-2.5 min-w-0">
                <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ 01 • WARM-UP • 10 MIN ]</span>
                <div className="bg-[#0b0b0d] border border-[var(--card-border)] p-3.5 sm:p-4 rounded text-xs text-[#f2f7ff]/90 space-y-1.5 min-w-0">
                  {currentWeek.sessionSummary.warmUp.map((w, idx) => (
                    <p key={idx} className="flex items-start gap-2 break-words">
                      <span className="text-[#b2e01e] shrink-0">•</span>
                      <span>{w}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* 2. Technical Drills */}
              <div className="space-y-3 min-w-0">
                <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ 02 • TECHNICAL DRILLS ]</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 min-w-0">
                  {currentWeek.sessionSummary.technicalDrills.map((drill, idx) => (
                    <div key={idx} className="bg-[#0b0b0d] p-4 rounded border border-[var(--card-border)] space-y-2.5 text-xs flex flex-col justify-between min-w-0">
                      <div className="space-y-2 min-w-0">
                        <div className="flex justify-between items-center gap-2">
                          <h4 className="font-bold text-white text-xs sm:text-sm truncate break-words">{drill.name}</h4>
                          <span className="font-mono-tag text-[10px] text-[#b2e01e] font-bold shrink-0">{drill.duration}</span>
                        </div>
                        <p className="text-[#f2f7ff]/70 font-semibold break-words">{drill.goal}</p>
                        <ul className="space-y-1 text-[#f2f7ff]/80 list-disc list-inside break-words">
                          {drill.instructions.map((inst, i) => (
                            <li key={i}>{inst}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-3 border-t border-[var(--card-border)] flex flex-wrap items-center justify-between gap-2 min-w-0">
                        <div className="text-[#b2e01e] text-[11px] font-semibold truncate max-w-[200px]">
                          نصيحة الكوتش: {drill.tips}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleOpenVideoForDrill(drill.name)}
                          className="btn-neon px-3 py-1.5 text-[10px] font-mono-tag font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>فيديو الشرح</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Tactical Drills */}
              <div className="space-y-3 min-w-0">
                <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ 03 • TACTICAL DRILLS ]</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 min-w-0">
                  {currentWeek.sessionSummary.tacticalDrills.map((drill, idx) => (
                    <div key={idx} className="bg-[#0b0b0d] p-4 rounded border border-[var(--card-border)] space-y-2.5 text-xs flex flex-col justify-between min-w-0">
                      <div className="space-y-2 min-w-0">
                        <div className="flex justify-between items-center gap-2">
                          <h4 className="font-bold text-white text-xs sm:text-sm truncate break-words">{drill.name}</h4>
                          <span className="font-mono-tag text-[10px] text-[#b2e01e] font-bold shrink-0">{drill.duration}</span>
                        </div>
                        <p className="text-[#f2f7ff]/70 font-semibold break-words">{drill.goal}</p>
                        <ul className="space-y-1 text-[#f2f7ff]/80 list-disc list-inside break-words">
                          {drill.instructions.map((inst, i) => (
                            <li key={i}>{inst}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-3 border-t border-[var(--card-border)] flex justify-end min-w-0">
                        <button
                          type="button"
                          onClick={() => handleOpenVideoForDrill(drill.name)}
                          className="btn-neon px-3 py-1.5 text-[10px] font-mono-tag font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>فيديو التكتيك المرئي</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Match Practice */}
              <div className="space-y-2.5 min-w-0">
                <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ 04 • MATCH PRACTICE • 20 MIN ]</span>
                <div className="bg-[#0b0b0d] border border-[var(--card-border)] p-3.5 sm:p-4 rounded text-xs text-[#f2f7ff]/90 min-w-0">
                  <p className="break-words leading-relaxed">{currentWeek.sessionSummary.gamePractice}</p>
                </div>
              </div>

              {/* 5. Coach Directive */}
              <div className="bg-[#0b0b0d] border border-[#b2e01e] p-3.5 sm:p-4 rounded text-xs text-white min-w-0">
                <span className="font-mono-tag text-[#b2e01e] block text-[10px] mb-1 font-bold uppercase">
                  [ COACH DIRECTIVE ]
                </span>
                <p className="leading-relaxed break-words">"{currentWeek.sessionSummary.coachAdvice}"</p>
              </div>

            </div>

          </div>
        )}
      </div>

      {/* Custom Video Player Modal */}
      {activeVideoModal && (
        <CustomVideoPlayer
          video={activeVideoModal}
          playlist={PADEL_VIDEOS}
          onSelectVideo={(vid) => setActiveVideoModal(vid)}
          onClose={() => setActiveVideoModal(null)}
        />
      )}

    </div>
  );
};
