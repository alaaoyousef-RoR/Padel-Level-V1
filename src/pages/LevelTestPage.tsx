import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ASSESSMENT_QUESTIONS, 
  ASSESSMENT_PILLARS, 
  calculateTestResults 
} from '../data/assessmentData';
import { AssessmentCategory } from '../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  HelpCircle,
  Activity,
  Shield,
  Zap,
  Info,
  Maximize2
} from 'lucide-react';

export const LevelTestPage: React.FC = () => {
  const { saveTestResult, navigateTo } = useApp();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [errorMessage, setErrorMessage] = useState('');

  const currentQuestion = ASSESSMENT_QUESTIONS[currentQuestionIndex];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const currentPillar = ASSESSMENT_PILLARS.find(p => p.key === currentQuestion.category) || ASSESSMENT_PILLARS[0];
  const qNum = currentQuestionIndex + 1;

  const handleSelectOption = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
    setErrorMessage('');
  };

  const handleNext = () => {
    if (answers[currentQuestion.id] === undefined) {
      setErrorMessage('يرجى اختيار الإجابة التي تصف مستواك بدقة قبل الانتقال.');
      return;
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate and save results
      const results = calculateTestResults(answers);
      saveTestResult(results);
      navigateTo('test-result');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setErrorMessage('');
    }
  };

  const getPillarIcon = (category: AssessmentCategory) => {
    switch (category) {
      case 'serve_return': return <Zap className="w-4 h-4 text-[#b2e01e]" />;
      case 'net_volleys': return <Activity className="w-4 h-4 text-[#b2e01e]" />;
      case 'overhead_shots': return <Sparkles className="w-4 h-4 text-[#b2e01e]" />;
      case 'wall_defense': return <Shield className="w-4 h-4 text-[#b2e01e]" />;
      case 'tactics_positioning': return <Maximize2 className="w-4 h-4 text-[#b2e01e]" />;
      default: return <Zap className="w-4 h-4 text-[#b2e01e]" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 text-right space-y-8 font-alexandria">
      
      {/* Top Header Cockpit Card */}
      <div className="card-dark p-6 sm:p-8 rounded-2xl border border-white/15 space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#b2e01e]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ PLAYTOMIC BENCHMARK SYSTEM ]</span>
              <span className="bg-[#b2e01e]/15 border border-[#b2e01e]/30 text-[#b2e01e] text-[10px] font-mono-tag font-bold px-2 py-0.5 rounded">
                20 Q COMPETENCY TEST
              </span>
            </div>
            <h1 className="font-alexandria font-black text-2xl sm:text-3xl text-white tracking-tight">
              اختبار تقييم مستوى لاعب البادل المعتمد
            </h1>
            <p className="text-xs text-white/70 mt-1 max-w-xl">
              تمت هيكلة هذا الاختبار وفق معايير Playtomic الدولية على 5 محاور تقنية رئيسية لتشخيص مستواك وتوليد برنامجك التدريبي.
            </p>
          </div>

          <div className="flex items-center gap-4 font-mono-tag text-xs self-start sm:self-center">
            <div className="theme-card-solid border border-white/15 px-3 py-2 rounded-xl">
              <span className="text-white/50 block text-[10px]">PROGRESS</span>
              <span className="text-[#b2e01e] font-bold">{answeredCount} / {totalQuestions} Q</span>
            </div>
            <div className="theme-card-solid border border-white/15 px-3 py-2 rounded-xl">
              <span className="text-white/50 block text-[10px]">BENCHMARK</span>
              <span className="text-white font-bold">PLAYTOMIC 1.0 - 7.0</span>
            </div>
          </div>
        </div>

        {/* 5 Pillars Quick Tracker Indicator */}
        <div className="pt-3 border-t border-white/10">
          <div className="text-[11px] font-mono-tag text-white/70 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#b2e01e] font-bold">
              {getPillarIcon(currentQuestion.category)}
              <span>المحور {currentPillar.pillarNumber} من 5: {currentPillar.shortTitleAr}</span>
            </span>
            <span>السؤال [{qNum}/20] • {progressPercent}%</span>
          </div>

          {/* Pillars Visual Track */}
          <div className="grid grid-cols-5 gap-2">
            {ASSESSMENT_PILLARS.map((p) => {
              const questionsInPillar = ASSESSMENT_QUESTIONS.filter(q => q.category === p.key);
              const answeredInPillar = questionsInPillar.filter(q => answers[q.id] !== undefined).length;
              const isCurrentPillar = p.key === currentQuestion.category;

              return (
                <div 
                  key={p.key} 
                  className={`p-1.5 rounded-xl border transition-all text-center theme-card-solid ${
                    isCurrentPillar 
                      ? 'border-[#b2e01e] bg-[#b2e01e]/15' 
                      : answeredInPillar === 4 
                      ? 'border-[#b2e01e]/40' 
                      : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold">
                    <span className={isCurrentPillar ? 'text-[#b2e01e]' : answeredInPillar === 4 ? 'text-[#b2e01e]' : 'text-white/40'}>
                      {p.shortTitleAr}
                    </span>
                  </div>
                  <div className="w-full bg-black/40 h-1 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="bg-[#b2e01e] h-full transition-all duration-300"
                      style={{ width: `${(answeredInPillar / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Neon Main Progress Bar */}
        <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#b2e01e] rounded-full transition-all duration-300 shadow-[0_0_12px_#b2e01e]"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Main Question Box */}
      <div className="card-dark p-6 sm:p-10 rounded-2xl border border-white/15 space-y-8 relative shadow-2xl">
        
        {/* Category & Step Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono-tag text-[11px] text-[#002255] bg-[#b2e01e] font-black px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              {getPillarIcon(currentQuestion.category)}
              <span>محور {currentPillar.pillarNumber}: {currentQuestion.categoryAr}</span>
            </span>
            <span className="font-mono-tag text-xs text-white/50">
              سؤال #{currentQuestion.id} من 20
            </span>
          </div>

          <span className="font-mono-tag text-[11px] text-white/60 theme-card-solid border border-white/10 px-2.5 py-1 rounded-lg">
            سؤال {((currentQuestionIndex % 4) + 1)} من 4 في هذا المحور
          </span>
        </div>

        {/* Tactical Game Scenario Callout */}
        {currentQuestion.scenarioAr && (
          <div className="theme-card-solid border border-white/15 p-4 rounded-xl flex items-start gap-3 text-right">
            <Info className="w-4 h-4 text-[#b2e01e] flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono-tag text-[#b2e01e] block uppercase font-bold">
                [ GAME SCENARIO / سيناريو اللعب العملي ]
              </span>
              <p className="text-xs text-white/90 leading-relaxed mt-0.5">
                {currentQuestion.scenarioAr}
              </p>
            </div>
          </div>
        )}

        {/* Question Text */}
        <div className="space-y-2">
          <h2 className="font-black text-xl sm:text-2xl text-white leading-relaxed">
            {currentQuestion.questionAr}
          </h2>
          {currentQuestion.hintAr && (
            <p className="text-xs text-white/60 flex items-center gap-1.5 font-medium pt-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#b2e01e] flex-shrink-0" />
              <span>معيار التقييم: {currentQuestion.hintAr}</span>
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3.5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = answers[currentQuestion.id] === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 sm:p-5 rounded-xl border text-right transition-all flex items-start gap-4 cursor-pointer relative theme-card-solid ${
                  isSelected
                    ? 'border-[#b2e01e] bg-[#b2e01e]/15 text-white shadow-[0_0_20px_rgba(178,224,30,0.18)] ring-1 ring-[#b2e01e]/50'
                    : 'border-white/10 hover:border-white/30 text-white/80'
                }`}
              >
                {/* Radio indicator */}
                <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-1 flex items-center justify-center border font-mono-tag text-[10px] font-bold ${
                  isSelected
                    ? 'border-[#b2e01e] bg-[#b2e01e] text-[#002255]'
                    : 'border-white/20 bg-transparent text-transparent'
                }`}>
                  ✓
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm font-semibold leading-relaxed ${isSelected ? 'text-[#b2e01e]' : 'text-white'}`}>
                      {option.text}
                    </span>
                  </div>

                  {option.tierTag && (
                    <div className="flex items-center gap-2 pt-1 font-mono-tag text-[10px]">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        isSelected 
                          ? 'bg-[#b2e01e]/20 text-[#b2e01e] border border-[#b2e01e]/40' 
                          : 'bg-white/5 text-white/50 border border-white/10'
                      }`}>
                        {option.tierTag}
                      </span>
                      <span className="text-white/40">
                        [+{option.score} نقطة]
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="bg-red-950/60 border border-red-700 text-red-200 p-3.5 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Actions Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-mono-tag uppercase transition-colors flex items-center justify-center gap-2 ${
              currentQuestionIndex === 0
                ? 'opacity-30 cursor-not-allowed text-white/40 border border-white/5'
                : 'btn-outline-ink'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>السابق (PREV)</span>
          </button>

          {/* Quick jump indicators */}
          <div className="hidden lg:flex items-center gap-1 font-mono-tag">
            {ASSESSMENT_QUESTIONS.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = currentQuestionIndex === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-6 h-6 rounded-lg text-[9px] font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#b2e01e] text-[#002255]'
                      : isAnswered
                      ? 'bg-[#b2e01e]/30 text-[#b2e01e] border border-[#b2e01e]/50'
                      : 'bg-white/5 text-white/30 hover:bg-white/10'
                  }`}
                  title={`سؤال ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="btn-neon w-full sm:w-auto px-8 py-3.5 text-xs font-extrabold flex items-center justify-center gap-2 shadow-xl"
          >
            {currentQuestionIndex < totalQuestions - 1 ? (
              <>
                <span>السؤال التالي (NEXT)</span>
                <ArrowLeft className="w-4 h-4" />
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>إصدار تقرير Playtomic المعتمد</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
