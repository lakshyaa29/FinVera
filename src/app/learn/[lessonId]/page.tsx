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
  BookOpen,
  Sparkles,
  Zap,
  Lock,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Target,
  Clock,
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
          <h2 className="text-xl font-bold text-white">Lesson Not Found</h2>
          <p className="text-sm text-slate-400">The lesson you are looking for does not exist.</p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
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
        <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
            Section Locked
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-1 mb-2">
            {lesson.levelName} is Locked
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
            {unlockState.statusText}. Complete prerequisite lessons to earn access to this topic.
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20"
          >
            <span>Go to Active Lessons</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </AppShell>
    );
  }

  // Next lesson identification
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
      <div className="max-w-3xl mx-auto space-y-8 pb-12">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Roadmap</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
              Level {lesson.level}: {lesson.levelName}
            </span>
            <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              +{lesson.xpReward} XP
            </span>
          </div>
        </div>

        {/* Lesson Header Banner */}
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>{lesson.estimatedMinutes} min read</span>
            <span>•</span>
            <span className="text-teal-400 font-semibold">{lesson.concept}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {lesson.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            {lesson.shortDescription}
          </p>

          {isAlreadyCompleted && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>You have completed this lesson! (Reviewing)</span>
            </div>
          )}
        </div>

        {/* 1. LEARN STEP: Written Concepts */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
            <BookOpen className="w-4 h-4" />
            <span>1. Learn the Core Principles</span>
          </div>

          <div className="space-y-4">
            {lesson.contentSections.map((section, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-3"
              >
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {section.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>

                {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5">
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                      Key Takeaways:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {section.keyTakeaways.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                          <span>{point}</span>
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
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
            <Sparkles className="w-4 h-4" />
            <span>2. Concept Translation</span>
          </div>
          <ExplainSimplyToggle data={lesson.explainSimply} />
        </div>

        {/* 3. TRY IT STEP: CONTEXTUAL IN-LESSON CALCULATOR / WIDGET */}
        {lesson.interactiveType !== 'quiz-only' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                <Target className="w-4 h-4" />
                <span>3. Try It Yourself & Test the Math</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">
                Learn → Try → Change Numbers
              </span>
            </div>

            {lesson.interactivePrompt && (
              <p className="text-xs text-slate-400 italic mb-2">
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
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              <TrendingUp className="w-4 h-4" />
              <span>4. Real-World Decision Challenge</span>
            </div>

            <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md">
              <h3 className="text-base font-bold text-white mb-2">
                {lesson.realLifeScenario.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                {lesson.realLifeScenario.scenario}
              </p>

              <div className="space-y-2.5">
                {lesson.realLifeScenario.choices.map((choice, cIdx) => {
                  const isSelected = selectedScenarioChoice === cIdx;
                  return (
                    <div key={cIdx} className="space-y-2">
                      <button
                        onClick={() => setSelectedScenarioChoice(cIdx)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs sm:text-sm font-medium flex items-center justify-between gap-3 ${
                          isSelected
                            ? choice.isOptimal
                              ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200'
                              : 'bg-amber-950/40 border-amber-500/80 text-amber-200'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span>{choice.text}</span>
                        {isSelected && (
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 ${
                              choice.isOptimal ? 'text-emerald-400' : 'text-amber-400'
                            }`}
                          />
                        )}
                      </button>

                      {isSelected && (
                        <div
                          className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                            choice.isOptimal
                              ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300'
                              : 'bg-amber-950/30 border border-amber-500/30 text-amber-300'
                          }`}
                        >
                          <span className="font-bold">Feedback: </span>
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
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
            <Zap className="w-4 h-4" />
            <span>5. Knowledge Check & XP Reward</span>
          </div>

          <QuizComponent questions={lesson.quiz} onComplete={handleQuizComplete} />
        </div>

        {/* Completion Modal */}
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
