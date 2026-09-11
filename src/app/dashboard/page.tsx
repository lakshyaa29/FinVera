'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { useUserState } from '../../context/UserStateContext';
import { ALL_LESSONS } from '../../data/lessonsData';
import { AGE_CURRICULUM_DATA } from '../../data/ageCurriculumData';
import { LEVELS_CONFIG, evaluateLevelUnlock } from '../../data/unlockRequirements';
import { formatINR } from '../../lib/formatters';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Zap,
  BookOpen,
  Calculator,
  TrendingUp,
  Activity,
  BookMarked,
  CheckCircle2,
  Lock,
  ChevronRight,
  User,
} from 'lucide-react';

export default function DashboardPage() {
  const { profile, progress, portfolio, isLoaded } = useUserState();

  // Find next uncompleted lesson
  const nextLesson =
    ALL_LESSONS.find((l) => !progress.completedLessonIds.includes(l.id)) || ALL_LESSONS[0];

  // Age cohort configuration
  const ageConfig = AGE_CURRICULUM_DATA[profile.ageGroup] || AGE_CURRICULUM_DATA['18-24'];

  // Current Level info for the user's next lesson
  const currentLevelConfig =
    LEVELS_CONFIG.find((l) => l.level === nextLesson.level) || LEVELS_CONFIG[0];
  const lessonsInCurrentLevel = ALL_LESSONS.filter((l) => l.level === nextLesson.level);
  const completedInCurrentLevel = lessonsInCurrentLevel.filter((l) =>
    progress.completedLessonIds.includes(l.id)
  ).length;

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-200">
        {/* Top Greeting Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Good day, {profile.name}!
              </h1>
              <span className="text-xl">👋</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Welcome back to your financial mastery path.
            </p>
          </div>

          {/* Top Quick Badges */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs">
              <Flame className="w-4 h-4 fill-amber-400 animate-pulse" />
              <span>{progress.streakDays} Day Streak</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
              <Zap className="w-4 h-4 fill-emerald-400" />
              <span>{progress.xp} XP</span>
            </div>
          </div>
        </div>

        {/* 1. AGE-BASED PERSONALIZATION CARD */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  Your FinVera Journey
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-semibold">
                  Personalized for ages {profile.ageGroup}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                {ageConfig.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                {ageConfig.tagline} Based on your age group, we&apos;ve prioritized these core topics for you.
              </p>
            </div>

            <Link
              href="/profile"
              className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors self-start md:self-auto shrink-0 flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>Change Age in Settings</span>
            </Link>
          </div>

          {/* Prioritized Topics Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
            {ageConfig.focusTopics.map((topic) => (
              <span
                key={topic}
                className="text-xs px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300 font-medium"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="mt-3 text-[10px] text-slate-500 italic">
            * {ageConfig.disclaimer}
          </div>
        </div>

        {/* 2. CONTINUE LEARNING MAIN ACTION CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Continue Learning Card */}
          <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/30 border border-teal-500/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
                  Continue Your Journey
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  +{nextLesson.xpReward} XP
                </span>
              </div>

              <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                <span>Current Section:</span>
                <span className="font-semibold text-slate-200">{currentLevelConfig.name}</span>
                <span className="text-slate-600">•</span>
                <span>
                  {completedInCurrentLevel} / {lessonsInCurrentLevel.length} Lessons
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1 mb-2">
                {nextLesson.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {nextLesson.shortDescription}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="text-xs text-slate-400">
                  Estimated: <span className="font-mono text-white">{nextLesson.estimatedMinutes} mins</span>
                </div>
                <span className="text-slate-700">•</span>
                <div className="text-xs text-slate-400">
                  Concept: <span className="text-teal-300 font-medium">{nextLesson.concept}</span>
                </div>
              </div>

              <Link
                href={`/learn/${nextLesson.id}`}
                className="px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue Learning</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Today's Concept Card */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                Today&apos;s Concept
              </span>
              <h3 className="text-lg font-bold text-white mt-2 mb-1.5">
                The Power of Compounding
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                &quot;Compound interest is the eighth wonder of the world. He who understands it,
                earns it; he who doesn&apos;t, pays it.&quot;
              </p>

              <div className="mt-4 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300">
                <p className="text-slate-400 text-[11px] mb-1">Rule of 72 Quick Tip:</p>
                Divide 72 by your annual expected return to estimate how many years it takes your
                money to double.
              </div>
            </div>

            <Link
              href="/calculators?type=compound-interest"
              className="mt-5 w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Launch Calculator</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3. YOUR JOURNEY ROADMAP PROGRESS OVERVIEW */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Your Learning Journey</h3>
              <p className="text-xs text-slate-400">
                Complete lessons to progressively unlock higher financial tiers.
              </p>
            </div>
            <Link
              href="/learn"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View Full Roadmap</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEVELS_CONFIG.map((lvl) => {
              const unlockState = evaluateLevelUnlock(
                lvl.level,
                progress.completedLessonIds,
                ALL_LESSONS
              );
              const isComplete =
                unlockState.completedInThisLevel === unlockState.totalInThisLevel &&
                unlockState.totalInThisLevel > 0;

              return (
                <div
                  key={lvl.level}
                  className={`p-4 rounded-2xl border transition-all ${
                    unlockState.isUnlocked
                      ? 'bg-slate-950/70 border-slate-800'
                      : 'bg-slate-950/30 border-slate-900 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{lvl.icon}</span>
                      <span className="text-xs font-bold text-slate-200">{lvl.name}</span>
                    </div>

                    {isComplete ? (
                      <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Done
                      </span>
                    ) : unlockState.isUnlocked ? (
                      <span className="text-teal-400 text-xs font-mono font-bold">
                        {unlockState.progressPercent}%
                      </span>
                    ) : (
                      <span className="text-slate-500 text-xs font-medium flex items-center gap-1">
                        <Lock className="w-3 h-3 text-slate-500" />
                      </span>
                    )}
                  </div>

                  {/* Progress bar or lock message */}
                  {unlockState.isUnlocked ? (
                    <div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-1.5">
                        <div
                          style={{ width: `${unlockState.progressPercent}%` }}
                          className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {unlockState.completedInThisLevel} of {unlockState.totalInThisLevel} Lessons completed
                      </p>
                    </div>
                  ) : (
                    <div className="text-[11px] text-amber-400 font-medium">
                      🔒 Complete {unlockState.remainingLessons} more lessons to unlock
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. QUICK ACTIONS HUB */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/calculators"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Calculators</h4>
            <p className="text-xs text-slate-400 mt-0.5">5 interactive tools</p>
          </Link>

          <Link
            href="/practice"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Virtual Trading</h4>
            <p className="text-xs text-slate-400 mt-0.5">{formatINR(portfolio.virtualCash)} Cash</p>
          </Link>

          <Link
            href="/glossary"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BookMarked className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Glossary</h4>
            <p className="text-xs text-slate-400 mt-0.5">25+ simple definitions</p>
          </Link>

          <Link
            href="/health"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Money Health</h4>
            <p className="text-xs text-slate-400 mt-0.5">Confidence checkup</p>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
