'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PlayableConcept } from '../../types';
import { useUserState } from '../../context/UserStateContext';
import { VisualDemoViewer } from './VisualDemoViewer';
import { TryItSandbox } from './TryItSandbox';
import {
  X,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ExternalLink,
} from 'lucide-react';

interface ConceptViewerModalProps {
  concept: PlayableConcept;
  isOpen: boolean;
  onClose: () => void;
  onNextConcept?: () => void;
  onConceptMastered: (conceptId: string) => void;
}

type StageNumber = 1 | 2 | 3 | 4;

export function ConceptViewerModal({
  concept,
  isOpen,
  onClose,
  onNextConcept,
  onConceptMastered,
}: ConceptViewerModalProps) {
  const { awardGlossaryXp } = useUserState();

  // Active Stage: 1 = Understand, 2 = Show Me, 3 = Try It, 4 = Test Me
  const [stage, setStage] = useState<StageNumber>(1);

  // Explanation Level: 'beginner' | 'normal' | 'deepDive'
  const [explanationLevel, setExplanationLevel] = useState<'beginner' | 'normal' | 'deepDive'>('beginner');

  // Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState(false);

  // Still Confused State
  const [showAnalogy, setShowAnalogy] = useState(false);

  // XP tracking for this session
  const [earnedXpStages, setEarnedXpStages] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const claimStageXp = (stageName: string, xpAmount: number) => {
    if (!earnedXpStages[stageName]) {
      setEarnedXpStages((prev) => ({ ...prev, [stageName]: true }));
      awardGlossaryXp(concept.id, stageName, xpAmount);
    }
  };

  const handleNextStage = (targetStage: StageNumber) => {
    if (stage === 1) claimStageXp('understand', 5);
    if (stage === 2) claimStageXp('visual', 10);
    if (stage === 3) claimStageXp('interactive', 10);
    setStage(targetStage);
  };

  const handleQuizAnswer = (idx: number) => {
    if (isQuizSubmitted) return;
    setSelectedQuizOption(idx);
    setIsQuizSubmitted(true);

    const isCorrect = concept.quiz.options[idx].isCorrect;
    setIsQuizCorrect(isCorrect);

    if (isCorrect) {
      claimStageXp('quiz', 20);
      claimStageXp('mastery', 30);
      onConceptMastered(concept.id);
    }
  };

  const handleRetryQuiz = () => {
    setSelectedQuizOption(null);
    setIsQuizSubmitted(false);
    setIsQuizCorrect(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#171717]/80 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#FFFFFF] border-3 border-[#171717] rounded-xl shadow-[8px_8px_0px_#171717] overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Stepper Bar */}
        <div className="bg-[#F8F8F3] border-b-3 border-[#171717] px-5 sm:px-7 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl w-8 h-8 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] flex items-center justify-center shadow-[1px_1px_0px_#171717]">
              {concept.categoryIcon}
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#171717] font-mono">
                {concept.category}
              </span>
              <h2 className="text-base sm:text-lg font-black font-space-grotesk text-[#171717] tracking-tight leading-none">
                {concept.term}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center justify-center hover:bg-[#FF8FAB] text-[#171717] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* 4-Stage Interactive Progress Bar */}
        <div className="bg-[#FFFFFF] px-5 sm:px-7 pt-3 pb-3 border-b-2 border-[#171717]">
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono font-black mb-2">
            <button
              onClick={() => handleNextStage(1)}
              className={`py-1 rounded border-2 transition-all cursor-pointer ${
                stage === 1
                  ? 'bg-[#70E000] text-[#171717] border-[#171717] shadow-[2px_2px_0px_#171717]'
                  : 'bg-[#F8F8F3] text-[#6B6B6B] border-transparent hover:border-[#171717]'
              }`}
            >
              1. UNDERSTAND
            </button>
            <button
              onClick={() => handleNextStage(2)}
              className={`py-1 rounded border-2 transition-all cursor-pointer ${
                stage === 2
                  ? 'bg-[#70E000] text-[#171717] border-[#171717] shadow-[2px_2px_0px_#171717]'
                  : 'bg-[#F8F8F3] text-[#6B6B6B] border-transparent hover:border-[#171717]'
              }`}
            >
              2. SHOW ME
            </button>
            <button
              onClick={() => handleNextStage(3)}
              className={`py-1 rounded border-2 transition-all cursor-pointer ${
                stage === 3
                  ? 'bg-[#70E000] text-[#171717] border-[#171717] shadow-[2px_2px_0px_#171717]'
                  : 'bg-[#F8F8F3] text-[#6B6B6B] border-transparent hover:border-[#171717]'
              }`}
            >
              3. TRY IT
            </button>
            <button
              onClick={() => handleNextStage(4)}
              className={`py-1 rounded border-2 transition-all cursor-pointer ${
                stage === 4
                  ? 'bg-[#70E000] text-[#171717] border-[#171717] shadow-[2px_2px_0px_#171717]'
                  : 'bg-[#F8F8F3] text-[#6B6B6B] border-transparent hover:border-[#171717]'
              }`}
            >
              4. TEST ME
            </button>
          </div>

          <div className="w-full bg-[#E5E5DE] border-2 border-[#171717] rounded-full h-2.5 overflow-hidden">
            <div
              style={{ width: `${(stage / 4) * 100}%` }}
              className="bg-[#70E000] h-full transition-all duration-200 border-r border-[#171717]"
            />
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* ========================================================= */}
          {/* STAGE 1: UNDERSTAND */}
          {/* ========================================================= */}
          {stage === 1 && (
            <div className="space-y-6">
              {/* Punchy One-Liner Box */}
              <div className="p-5 rounded-xl bg-[#FFF9E6] border-3 border-[#171717] shadow-[4px_4px_0px_#171717] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#171717] font-mono">
                    THE 5-SECOND SUMMARY
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFFFFF] text-[#171717] border border-[#171717]">
                    {concept.difficulty}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black font-space-grotesk text-[#171717] leading-snug">
                  &ldquo;{concept.simpleOneLiner}&rdquo;
                </h3>
              </div>

              {/* Explain It Differently: 3 Difficulty Levels */}
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-black text-[#171717] font-mono uppercase tracking-wider">
                    EXPLAIN IT DIFFERENTLY:
                  </span>
                  <div className="flex gap-1 p-1 rounded-lg bg-[#F8F8F3] border-2 border-[#171717]">
                    <button
                      onClick={() => setExplanationLevel('beginner')}
                      className={`px-2.5 py-1 rounded text-xs font-space-grotesk font-black border transition-all cursor-pointer ${
                        explanationLevel === 'beginner'
                          ? 'bg-[#70E000] text-[#171717] border-[#171717] shadow-[1px_1px_0px_#171717]'
                          : 'bg-transparent text-[#6B6B6B] border-transparent'
                      }`}
                    >
                      BEGINNER
                    </button>
                    <button
                      onClick={() => setExplanationLevel('normal')}
                      className={`px-2.5 py-1 rounded text-xs font-space-grotesk font-black border transition-all cursor-pointer ${
                        explanationLevel === 'normal'
                          ? 'bg-[#FFD84D] text-[#171717] border-[#171717] shadow-[1px_1px_0px_#171717]'
                          : 'bg-transparent text-[#6B6B6B] border-transparent'
                      }`}
                    >
                      NORMAL
                    </button>
                    <button
                      onClick={() => setExplanationLevel('deepDive')}
                      className={`px-2.5 py-1 rounded text-xs font-space-grotesk font-black border transition-all cursor-pointer ${
                        explanationLevel === 'deepDive'
                          ? 'bg-[#FF8FAB] text-[#171717] border-[#171717] shadow-[1px_1px_0px_#171717]'
                          : 'bg-transparent text-[#6B6B6B] border-transparent'
                      }`}
                    >
                      DEEP DIVE
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FFFFFF] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] text-xs font-medium text-[#171717] leading-relaxed">
                  {concept.explanations[explanationLevel]}
                </div>
              </div>

              {/* Character Scenario */}
              {concept.characterScenario && (
                <div className="p-5 rounded-xl bg-[#F8F8F3] border-3 border-[#171717] shadow-[3px_3px_0px_#171717] space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{concept.characterScenario.avatar}</span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#171717] font-mono">
                        REAL-LIFE INDIAN SCENARIO
                      </span>
                      <h4 className="text-sm font-black font-space-grotesk text-[#171717]">
                        {concept.characterScenario.name}&apos;s Situation
                      </h4>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] text-xs text-[#171717] leading-relaxed">
                    <p className="font-bold text-[#171717] mb-1">
                      Story: {concept.characterScenario.story}
                    </p>
                    <p className="text-[#171717]/80">
                      💡 Takeaway: {concept.characterScenario.takeaway}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* STAGE 2: SHOW ME (VISUAL DEMO) */}
          {/* ========================================================= */}
          {stage === 2 && (
            <div className="space-y-4">
              <VisualDemoViewer concept={concept} />
            </div>
          )}

          {/* ========================================================= */}
          {/* STAGE 3: TRY IT (INTERACTIVE SANDBOX) */}
          {/* ========================================================= */}
          {stage === 3 && (
            <div className="space-y-4">
              <TryItSandbox concept={concept} onActivityComplete={() => claimStageXp('interactive', 10)} />
            </div>
          )}

          {/* ========================================================= */}
          {/* STAGE 4: TEST ME (QUIZ) */}
          {/* ========================================================= */}
          {stage === 4 && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-[#FFF9E6] border-3 border-[#171717] shadow-[4px_4px_0px_#171717] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#171717] font-mono">
                    CONCEPT MASTERY QUIZ
                  </span>
                  <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-[#70E000] text-[#171717] border border-[#171717]">
                    +50 XP ON COMPLETION
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black font-space-grotesk text-[#171717]">
                  {concept.quiz.question}
                </h3>
              </div>

              {/* Quiz Options */}
              <div className="space-y-2.5">
                {concept.quiz.options.map((option, idx) => {
                  const isSelected = selectedQuizOption === idx;
                  let optionClass = 'bg-[#FFFFFF] border-2 border-[#171717] text-[#171717] shadow-[2px_2px_0px_#171717] hover:bg-[#F8F8F3]';

                  if (isQuizSubmitted) {
                    if (option.isCorrect) {
                      optionClass = 'bg-[#70E000] border-2 border-[#171717] text-[#171717] font-black shadow-[3px_3px_0px_#171717]';
                    } else if (isSelected) {
                      optionClass = 'bg-[#FF8FAB] border-2 border-[#171717] text-[#171717] font-bold shadow-[2px_2px_0px_#171717]';
                    } else {
                      optionClass = 'bg-[#F8F8F3] border-2 border-[#171717]/40 text-[#6B6B6B] opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      disabled={isQuizSubmitted}
                      className={`w-full p-4 rounded-xl text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${optionClass}`}
                    >
                      <span className="font-mono font-black text-xs w-6 h-6 rounded bg-[#F8F8F3] border border-[#171717] flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 font-medium leading-relaxed">{option.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quiz Result Banner */}
              {isQuizSubmitted && (
                <div
                  className={`p-4 rounded-xl border-3 border-[#171717] shadow-[4px_4px_0px_#171717] text-xs flex items-center justify-between ${
                    isQuizCorrect
                      ? 'bg-[#E7F9D1] text-[#171717]'
                      : 'bg-[#FFD4DF] text-[#171717]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isQuizCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-[#171717] shrink-0" />
                    ) : (
                      <HelpCircle className="w-6 h-6 text-[#171717] shrink-0" />
                    )}
                    <div>
                      <p className="font-black font-space-grotesk text-sm">
                        {isQuizCorrect
                          ? '🎉 Correct! You Mastered this Concept!'
                          : 'Not quite. Review the explanation above.'}
                      </p>
                      <p className="text-[11px] font-medium text-[#171717]/80 mt-0.5">
                        {isQuizCorrect
                          ? '+50 Total XP Earned & Concept Mastered!'
                          : 'Try again to master this concept.'}
                      </p>
                    </div>
                  </div>

                  {!isQuizCorrect && (
                    <button
                      onClick={handleRetryQuiz}
                      className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] text-[#171717] font-black font-space-grotesk text-xs shadow-[2px_2px_0px_#171717] hover:bg-[#F8F8F3] transition-colors cursor-pointer"
                    >
                      TRY AGAIN
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Connected Feature Promotion (If Mastered or Stage 4) */}
          {concept.relatedFeature && (
            <div className="p-4 rounded-xl bg-[#F8F8F3] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-[#171717]" />
                <span className="text-[#171717] font-bold">Ready to put this into practice?</span>
              </div>
              <Link
                href={concept.relatedFeature.href}
                className="font-black font-space-grotesk text-[#171717] bg-[#70E000] px-3 py-1 rounded border-2 border-[#171717] shadow-[1px_1px_0px_#171717] hover:bg-[#FFD84D] flex items-center gap-1 transition-colors"
              >
                <span>{concept.relatedFeature.label}</span>
                <ArrowRight className="w-3 h-3 stroke-[3]" />
              </Link>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-[#F8F8F3] border-t-3 border-[#171717] px-5 sm:px-7 py-3.5 flex items-center justify-between">
          {/* Still Confused Button */}
          <button
            onClick={() => setShowAnalogy(!showAnalogy)}
            className="text-xs font-black font-space-grotesk text-[#171717] hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Lightbulb className="w-4 h-4 text-[#171717]" />
            <span>😵 Still confused?</span>
          </button>

          {/* Forward / Back Navigation */}
          <div className="flex items-center gap-2">
            {stage > 1 && (
              <button
                onClick={() => setStage((prev) => (prev - 1) as StageNumber)}
                className="px-3.5 py-2 rounded-lg text-xs font-black font-space-grotesk bg-[#FFFFFF] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] text-[#171717] hover:bg-[#E5E5DE] transition-colors cursor-pointer"
              >
                BACK
              </button>
            )}

            {stage < 4 ? (
              <button
                onClick={() => handleNextStage((stage + 1) as StageNumber)}
                className="px-5 py-2 rounded-lg text-xs font-black font-space-grotesk bg-[#70E000] text-[#171717] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>
                  {stage === 1 && '👁️ SHOW ME (VISUAL)'}
                  {stage === 2 && '🎮 TRY IT (SANDBOX)'}
                  {stage === 3 && '🧠 TEST ME (QUIZ)'}
                </span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            ) : (
              onNextConcept && (
                <button
                  onClick={() => {
                    setStage(1);
                    setSelectedQuizOption(null);
                    setIsQuizSubmitted(false);
                    onNextConcept();
                  }}
                  className="px-5 py-2 rounded-lg text-xs font-black font-space-grotesk bg-[#FFD84D] text-[#171717] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] hover:-translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>NEXT CONCEPT</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              )
            )}
          </div>
        </div>

        {/* Still Confused Analogy Drawer */}
        {showAnalogy && (
          <div className="bg-[#FFF9E6] border-t-3 border-[#171717] p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#171717] font-mono">
                  EVERYDAY INDIAN ANALOGY
                </span>
                <p className="text-xs text-[#171717] leading-relaxed font-bold">
                  {concept.stillConfused}
                </p>
              </div>
              <button
                onClick={() => setShowAnalogy(false)}
                className="px-3 py-1 rounded-lg bg-[#FFD84D] border-2 border-[#171717] text-[#171717] text-xs font-black font-space-grotesk shadow-[2px_2px_0px_#171717] hover:bg-[#FFFFFF] transition-colors shrink-0 cursor-pointer"
              >
                GOT IT!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
