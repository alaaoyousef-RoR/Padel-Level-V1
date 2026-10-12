import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TRAINING_PROGRAMS } from '../data/trainingData';
import { PADEL_LEVELS } from '../data/assessmentData';
import { PadelLevelNumber } from '../types';
import { 
  Trophy, 
  Calendar, 
  Clock, 
  Printer, 
  Activity
} from 'lucide-react';

export const TrainingProgramPage: React.FC = () => {
  const { testResult, user, navigateTo } = useApp();

  const initialLevel: PadelLevelNumber = testResult?.levelNumber || user?.levelNumber || 1;
  const [selectedLevel, setSelectedLevel] = useState<PadelLevelNumber>(initialLevel);
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);

  useEffect(() => {
    setActiveWeekIndex(0);
  }, [selectedLevel]);

  const currentProgram = TRAINING_PROGRAMS[selectedLevel] || TRAINING_PROGRAMS[1];
  const levelInfo = PADEL_LEVELS[selectedLevel] || PADEL_LEVELS[1];
  const currentWeek = currentProgram.weeks[activeWeekIndex] || currentProgram.weeks[0];
  const code = selectedLevel < 10 ? `0${selectedLevel}` : `${selectedLevel}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto py-4 text-right space-y-8 font-alexandria">
      
      {/* Notice if unassessed */}
      {!testResult && (
        <div className="card-dark border-white/20 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="font-mono-tag text-xs text-[#b2e01e] bg-[#b2e01e]/15 border border-[#b2e01e]/30 px-2.5 py-1 rounded-full font-black">
              EVALUATION PENDING
            </span>
            <div>
              <h4 className="text-sm font-bold text-white">لم تقم بإجراء اختبار المستوى بعد</h4>
              <p className="text-xs text-white/70">
                خض الاختبار لتفعيل برنامجك المخصص تلقائياً. يمكنك تصفح خطط المستويات الـ 5 يدوياً أدناه.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('level-test')}
            className="btn-neon text-xs px-5 py-2.5 whitespace-nowrap shadow"
          >
            خض الاختبار الآن
          </button>
        </div>
      )}

      {/* Program Header */}
      <div className="card-dark p-6 sm:p-10 rounded-3xl border border-white/20 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ PROGRAM STAGE {code} ]</span>
              <span className="font-mono-tag text-[10px] bg-white/10 border border-white/15 text-[#b2e01e] font-bold px-2.5 py-0.5 rounded-full">
                Playtomic {levelInfo.playtomicEquivalent} • {levelInfo.playtomicTier}
              </span>
              {testResult?.levelNumber === selectedLevel && (
                <span className="font-mono-tag text-[9px] bg-[#b2e01e] text-[#002255] font-black px-2 py-0.5 rounded-full">
                  YOUR ACTIVE LEVEL
                </span>
              )}
            </div>

            <h1 className="font-alexandria font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
              {currentProgram.title}
            </h1>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
              {currentProgram.goal}
            </p>

            <div className="flex flex-wrap items-center gap-3 font-mono-tag text-xs text-white/70 pt-2">
              <div className="flex items-center gap-1.5 theme-card-solid px-3.5 py-1.5 rounded-xl border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-[#b2e01e]" />
                <span>DURATION: {currentProgram.durationWeeks} WEEKS</span>
              </div>
              <div className="flex items-center gap-1.5 theme-card-solid px-3.5 py-1.5 rounded-xl border border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#b2e01e]" />
                <span>FREQUENCY: {currentProgram.sessionsPerWeekText}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto">
            <button
              onClick={() => navigateTo('progress-tracker')}
              className="btn-neon px-5 py-3 text-xs justify-center font-black shadow-lg"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>تسجيل حصة اليوم</span>
            </button>
            <button
              onClick={handlePrint}
              className="btn-outline-ink px-4 py-2.5 text-xs justify-center font-mono-tag"
            >
              <Printer className="w-3.5 h-3.5 inline ml-1.5" />
              <span>PRINT PLAN (PDF)</span>
            </button>
          </div>

        </div>
      </div>

      {/* Level Selector Tabs */}
      <div className="card-dark p-2 rounded-2xl border border-white/15 flex items-center gap-1.5 overflow-x-auto font-mono-tag shadow-xl">
        {([1, 2, 3, 4, 5] as const).map((lvl) => {
          const isSelected = selectedLevel === lvl;
          const isUserLevel = (testResult?.levelNumber === lvl) || (user?.levelNumber === lvl);
          return (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                isSelected
                  ? 'bg-[#b2e01e] text-[#002255] shadow-lg font-black'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>STAGE [0{lvl}]</span>
              {isUserLevel && (
                <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-black ${
                  isSelected ? 'bg-[#002255] text-[#b2e01e]' : 'bg-[#b2e01e] text-[#002255]'
                }`}>
                  YOU
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Focus Areas */}
      <div className="card-dark p-6 sm:p-8 rounded-3xl space-y-4 border border-white/15 shadow-xl">
        <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ CORE COMPETENCIES ]</span>
        <h3 className="font-alexandria font-bold text-base text-white">محاور التركيز الرئيسية للبرنامج:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono-tag text-xs">
          {currentProgram.focusAreas.map((area, idx) => (
            <div key={idx} className="theme-card-solid border border-white/10 p-3.5 rounded-xl text-white/90 flex items-start gap-2 shadow">
              <span className="text-[#b2e01e] font-bold">•</span>
              <span className="font-sans text-xs">{area}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Breakdown Navigation */}
      <div className="space-y-6">
        <div>
          <span className="label-mono mb-1" style={{ color: '#b2e01e' }}>[ WEEKLY CURRICULUM ]</span>
          <h2 className="font-alexandria font-black text-2xl text-white">الجدول التدريبي الأسبوعي المفصل</h2>
        </div>

        {/* Week Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono-tag">
          {currentProgram.weeks.map((week, idx) => {
            const isWeekActive = activeWeekIndex === idx;
            return (
              <button
                key={week.weekNumber}
                onClick={() => setActiveWeekIndex(idx)}
                className={`py-2 px-4 rounded-xl text-xs transition-all whitespace-nowrap font-bold ${
                  isWeekActive
                    ? 'bg-[#b2e01e] text-[#002255] shadow font-black'
                    : 'theme-card-solid text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                WEEK [{week.weekNumber < 10 ? `0${week.weekNumber}` : week.weekNumber}]
              </button>
            );
          })}
        </div>

        {/* Selected Week Card */}
        {currentWeek && (
          <div className="card-dark rounded-3xl border border-white/15 divide-y divide-white/10 shadow-2xl overflow-hidden">
            
            <div className="p-6 theme-card-solid">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono-tag text-[10px] text-[#b2e01e] font-bold">
                  WEEK {currentWeek.weekNumber} OF {currentProgram.durationWeeks}
                </span>
                <span className="font-mono-tag text-xs text-white/70">
                  {currentWeek.sessionsPerWeek} SESSIONS / WEEK
                </span>
              </div>
              <h3 className="font-alexandria font-bold text-xl text-white">
                {currentWeek.theme}
              </h3>
              <p className="text-xs text-white/70 mt-1">
                الهدف الفني: {currentWeek.focus}
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              
              {/* 1. Warm-up */}
              <div className="space-y-2.5">
                <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ 01 • WARM-UP • 10 MIN ]</span>
                <div className="theme-card-solid border border-white/10 p-4 rounded-2xl text-xs text-white/90 space-y-1.5 shadow">
                  {currentWeek.sessionSummary.warmUp.map((w, idx) => (
                    <p key={idx} className="flex items-start gap-2">
                      <span className="text-[#b2e01e]">•</span>
                      <span>{w}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* 2. Technical Drills */}
              <div className="space-y-3">
                <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ 02 • TECHNICAL DRILLS ]</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentWeek.sessionSummary.technicalDrills.map((drill, idx) => (
                    <div key={idx} className="theme-card-solid p-4 rounded-2xl border border-white/10 space-y-2 text-xs shadow">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-white text-sm">{drill.name}</h4>
                        <span className="font-mono-tag text-[10px] text-[#b2e01e] font-bold">{drill.duration}</span>
                      </div>
                      <p className="text-white/70 font-semibold">{drill.goal}</p>
                      <ul className="space-y-1 text-white/80 list-disc list-inside">
                        {drill.instructions.map((inst, i) => (
                          <li key={i}>{inst}</li>
                        ))}
                      </ul>
                      <div className="pt-2 border-t border-white/10 text-[#b2e01e] text-[11px] font-semibold">
                        نصيحة الكوتش: {drill.tips}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Tactical Drills */}
              <div className="space-y-3">
                <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ 03 • TACTICAL DRILLS ]</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentWeek.sessionSummary.tacticalDrills.map((drill, idx) => (
                    <div key={idx} className="theme-card-solid p-4 rounded-2xl border border-white/10 space-y-2 text-xs shadow">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-white text-sm">{drill.name}</h4>
                        <span className="font-mono-tag text-[10px] text-[#b2e01e] font-bold">{drill.duration}</span>
                      </div>
                      <p className="text-white/70 font-semibold">{drill.goal}</p>
                      <ul className="space-y-1 text-white/80 list-disc list-inside">
                        {drill.instructions.map((inst, i) => (
                          <li key={i}>{inst}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Match Practice */}
              <div className="space-y-2.5">
                <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ 04 • MATCH PRACTICE • 20 MIN ]</span>
                <div className="theme-card-solid border border-white/10 p-4 rounded-2xl text-xs text-white/90 shadow">
                  <p>{currentWeek.sessionSummary.gamePractice}</p>
                </div>
              </div>

              {/* 5. Coach Directive */}
              <div className="theme-subcard border border-[#b2e01e]/30 p-4 rounded-2xl text-xs text-white shadow">
                <span className="font-mono-tag text-[#b2e01e] block text-[10px] mb-1 font-bold">
                  [ COACH DIRECTIVE ]
                </span>
                <p className="leading-relaxed">"{currentWeek.sessionSummary.coachAdvice}"</p>
              </div>

            </div>

          </div>
        )}
      </div>

    </div>
  );
};
