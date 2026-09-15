'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '../../../components/layout/AppShell';
import { useUserState } from '../../../context/UserStateContext';
import { ALL_LESSONS } from '../../../data/lessonsData';
import { evaluateLevelUnlock } from '../../../data/unlockRequirements';
import { ExplainSimplyToggle } from '../../../components/lessons/ExplainSimplyToggle';
import { InteractiveNeedsVsWants } from '../../../components/lessons/InteractiveNeedsVsWants';
import { InteractiveBudgetWidget } from '../../../components/lessons/InteractiveBudgetWidget';
import { CompoundInterestCalc } from '../../../components/calculators/CompoundInterestCalc';
import { SipCalculator } from '../../../components/calculators/SipCalculator';
import { InflationCalculator } from '../../../components/calculators/InflationCalculator';
import { EmiCalculator } from '../../../components/calculators/EmiCalculator';
import { SavingsGoalCalc } from '../../../components/calculators/SavingsGoalCalc';
import { QuizComponent } from '../../../components/lessons/QuizComponent';
import { CompletionModal } from '../../../components/lessons/CompletionModal';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Zap,
  Lock,
  Clock,
  Target,
  Check,
} from 'lucide-react';

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params?.lessonId as string;
  const { progress, completeLesson, recordQuizPass } = useUserState();

  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [selectedScenarioChoice, setSelectedScenarioChoice] = useState<number | null>(null);

  const lesson = ALL_LESSONS.find((l) => l.id === lessonId);

  if (!lesson) {
    return (
      <AppShell>
        <div className="text-center py-20 space-y-4">
          <h2 className="font-display font-black text-2xl text-[#171717]">Lesson Not Found</h2>
          <p className="text-sm text-[#6B6B6B]">The lesson you are looking for does not exist.</p>
          <Link
            href="/learn"
            className="nb-btn nb-btn-secondary text-sm"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Return to Roadmap</span>
          </Link>
        </div>
      </AppShell>
    );
  }

  // Check if level is locked
  const unlockState = evaluateLevelUnlock(lesson.level, progress.completedLessonIds, ALL_LESSONS);

  if (!unlockState.isUnlocked) {
    return (
      <AppShell>
        <div className="max-w-md mx-auto my-16 p-8 rounded-xl bg-[#FFFFFF] border-3 border-[#171717] text-center shadow-[6px_6px_0px_#171717]">
          <div className="w-14 h-14 mx-auto rounded-lg bg-[#FFD84D] border-2 border-[#171717] flex items-center justify-center mb-4 shadow-[3px_3px_0px_#171717]">
            <Lock className="w-6 h-6 text-[#171717]" />
          </div>
          <span className="nb-tag bg-[#FF6B6B] text-[#171717]">
            SECTION LOCKED
          </span>
          <h2 className="font-display font-black text-2xl text-[#171717] mt-3 mb-2 tracking-tight">
            {lesson.levelName.toUpperCase()} IS LOCKED
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mb-6 leading-relaxed font-medium">
            {unlockState.statusText}. Complete prerequisite foundational modules to earn access.
          </p>
          <Link
            href="/learn"
            className="nb-btn nb-btn-primary text-sm w-full py-3"
          >
            <span>Go to Active Roadmap</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </AppShell>
    );
  }

  const currentIndex = ALL_LESSONS.findIndex((l) => l.id === lesson.id);
  const nextLesson = ALL_LESSONS[currentIndex + 1];

  const handleQuizComplete = (allPassed: boolean) => {
    if (allPassed) {
      recordQuizPass();
    }
    const res = completeLesson(lesson.id, lesson.xpReward);
    setNewAchievements(res.newAchievements);
    setIsCompletedModalOpen(true);
  };

  const isAlreadyCompleted = progress.completedLessonIds.includes(lesson.id);

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-8 pb-14">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b-2 border-[#171717]">
          <Link
            href="/learn"
            className="nb-btn nb-btn-secondary text-xs py-1.5 px-3"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Roadmap</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FFFFFF] border-2 border-[#171717] text-[#171717]">
              L0{lesson.level}: {lesson.levelName}
            </span>
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-[#70E000] border-2 border-[#171717] text-[#171717]">
              +{lesson.xpReward} XP
            </span>
          </div>
        </div>

        {/* Lesson Header Banner */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#6B6B6B]">
            <Clock className="w-3.5 h-3.5" />
            <span>{lesson.estimatedMinutes} MIN READ</span>
            <span>•</span>
            <span className="text-[#171717]">{lesson.concept.toUpperCase()}</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[#171717] tracking-tight leading-[1.05]">
            {lesson.title.toUpperCase()}
          </h1>
          <p className="text-sm sm:text-base text-[#171717] font-medium leading-relaxed">
            {lesson.shortDescription}
          </p>

          {isAlreadyCompleted && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#70E000] border-2 border-[#171717] text-xs font-display font-black text-[#171717] shadow-[2px_2px_0px_#171717]">
              <span>✓ YOU HAVE COMPLETED THIS MODULE (REVIEW MODE)</span>
            </div>
          )}
        </div>

        {/* 1. LEARN STEP: Written Concepts */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="nb-tag bg-[#70E000] text-[#171717]">
              STEP 1
            </span>
            <span className="font-display font-black text-xs uppercase tracking-wider text-[#171717]">
              CORE PRINCIPLES
            </span>
          </div>

          <div className="space-y-4">
            {lesson.contentSections.map((section, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#FFFFFF] border-3 border-[#171717] shadow-[4px_4px_0px_#171717] space-y-3"
              >
                <h3 className="font-display font-black text-lg sm:text-xl text-[#171717] tracking-tight">
                  {section.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#171717] font-medium leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>

                {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                  <div className="mt-4 pt-3.5 border-t-2 border-[#171717] space-y-2 bg-[#FAFAF7] p-3 rounded-lg border">
                    <span className="font-display font-black text-xs uppercase tracking-wider text-[#171717]">
                      KEY TAKEAWAYS:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#171717] font-medium">
                      {section.keyTakeaways.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="font-bold text-[#70E000] text-sm leading-none mt-0.5">●</span>
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. UNDERSTAND STEP: Explain Simply Mode */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="nb-tag bg-[#6C8CFF] text-[#171717]">
              STEP 2
            </span>
            <span className="font-display font-black text-xs uppercase tracking-wider text-[#171717]">
              CONCEPT TRANSLATION
            </span>
          </div>
          <ExplainSimplyToggle data={lesson.explainSimply} />
        </div>

        {/* 3. TRY IT STEP: CONTEXTUAL IN-LESSON CALCULATOR / WIDGET */}
        {lesson.interactiveType !== 'quiz-only' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="nb-tag bg-[#FFD84D] text-[#171717]">
                  STEP 3
                </span>
                <span className="font-display font-black text-xs uppercase tracking-wider text-[#171717]">
                  TRY IT YOURSELF & TEST THE MATH
                </span>
              </div>
            </div>

            {lesson.interactivePrompt && (
              <p className="text-xs font-mono font-bold text-[#6B6B6B] mb-2">
                💡 {lesson.interactivePrompt}
              </p>
            )}

            {/* Render Contextual Component */}
            {lesson.interactiveType === 'compound-interest' && (
              <CompoundInterestCalc
                initialValues={lesson.interactiveInitialValues}
                compact={false}
              />
            )}
            {lesson.interactiveType === 'sip' && (
              <SipCalculator initialValues={lesson.interactiveInitialValues} compact={false} />
            )}
            {lesson.interactiveType === 'inflation' && (
              <InflationCalculator initialValues={lesson.interactiveInitialValues} />
            )}
            {lesson.interactiveType === 'emi' && (
              <EmiCalculator initialValues={lesson.interactiveInitialValues} />
            )}
            {lesson.interactiveType === 'savings-goal' && (
              <SavingsGoalCalc initialValues={lesson.interactiveInitialValues} />
            )}
            {lesson.interactiveType === 'needs-vs-wants' && <InteractiveNeedsVsWants />}
            {lesson.interactiveType === 'interactive-budget' && <InteractiveBudgetWidget />}
          </div>
        )}

        {/* 4. REAL-LIFE SCENARIO STEP */}
        {lesson.realLifeScenario && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="nb-tag bg-[#B99CFF] text-[#171717]">
                STEP 4
              </span>
              <span className="font-display font-black text-xs uppercase tracking-wider text-[#171717]">
                REAL-WORLD DECISION CHALLENGE
              </span>
            </div>

            <div className="p-6 rounded-xl bg-[#FFFFFF] border-3 border-[#171717] shadow-[4px_4px_0px_#171717]">
              <h3 className="font-display font-black text-lg text-[#171717] mb-2">
                {lesson.realLifeScenario.title.toUpperCase()}
              </h3>
              <p className="text-xs sm:text-sm text-[#171717] font-medium leading-relaxed mb-5">
                {lesson.realLifeScenario.scenario}
              </p>

              <div className="space-y-3">
                {lesson.realLifeScenario.choices.map((choice, cIdx) => {
                  const isSelected = selectedScenarioChoice === cIdx;
                  return (
                    <div key={cIdx} className="space-y-2">
                      <button
                        onClick={() => setSelectedScenarioChoice(cIdx)}
                        className={`w-full text-left p-4 rounded-lg border-2 border-[#171717] transition-all text-xs sm:text-sm font-display font-bold flex items-center justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? choice.isOptimal
                              ? 'bg-[#70E000] text-[#171717] shadow-[2px_2px_0px_#171717] translate-x-0.5 translate-y-0.5'
                              : 'bg-[#FF6B6B] text-[#171717] shadow-[2px_2px_0px_#171717] translate-x-0.5 translate-y-0.5'
                            : 'bg-[#FAFAF7] hover:bg-[#FFFFFF] shadow-[2px_2px_0px_#171717]'
                        }`}
                      >
                        <span>{choice.text}</span>
                        {isSelected && (
                          <span className="font-mono text-xs font-black">
                            {choice.isOptimal ? '✓ OPTIMAL' : '✕ SUB-OPTIMAL'}
                          </span>
                        )}
                      </button>

                      {isSelected && (
                        <div
                          className={`p-3.5 rounded-lg border-2 border-[#171717] text-xs leading-relaxed ${
                            choice.isOptimal
                              ? 'bg-[#EBFBF4] text-[#171717]'
                              : 'bg-[#FFEBEB] text-[#171717]'
                          }`}
                        >
                          <span className="font-bold">Financial Analysis: </span>
                          {choice.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 5. TEST STEP: Knowledge Check Quiz */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="nb-tag bg-[#FF6B6B] text-[#171717]">
              STEP 5
            </span>
            <span className="font-display font-black text-xs uppercase tracking-wider text-[#171717]">
              KNOWLEDGE CHECK & XP REWARD
            </span>
          </div>

          <QuizComponent questions={lesson.quiz} onComplete={handleQuizComplete} />
        </div>

        {/* Completion Celebration Modal */}
        <CompletionModal
          isOpen={isCompletedModalOpen}
          lessonTitle={lesson.title}
          xpEarned={lesson.xpReward}
          streakDays={progress.streakDays}
          nextLessonId={nextLesson ? nextLesson.id : undefined}
          newAchievements={newAchievements}
          onClose={() => setIsCompletedModalOpen(false)}
        />
      </div>
    </AppShell>
  );
}
