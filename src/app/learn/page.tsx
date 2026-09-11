'use client';

import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useUserState } from '../../context/UserStateContext';
import { ALL_LESSONS } from '../../data/lessonsData';
import { LEVELS_CONFIG } from '../../data/unlockRequirements';
import { RoadmapLevelNode } from '../../components/roadmap/RoadmapLevelNode';
import { BookOpen, Zap, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LearnRoadmapPage() {
  const { progress } = useUserState();

  const totalLessons = ALL_LESSONS.length;
  const completedCount = progress.completedLessonIds.length;
  const totalXpAvailable = ALL_LESSONS.reduce((acc, l) => acc + l.xpReward, 0);

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Roadmap Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                The Learning Path
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
              Financial Literacy Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Follow the sequential journey. Complete foundational lessons to progressively unlock
              advanced investing.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center min-w-[100px]">
              <p className="text-[11px] text-slate-400 font-medium">Completed</p>
              <p className="text-base font-extrabold text-emerald-400 font-mono">
                {completedCount} / {totalLessons}
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center min-w-[100px]">
              <p className="text-[11px] text-slate-400 font-medium">XP Available</p>
              <p className="text-base font-extrabold text-teal-400 font-mono">
                +{totalXpAvailable} XP
              </p>
            </div>
          </div>
        </div>

        {/* Unlock Rules Explainer Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-white">How Progressive Unlocking Works: </span>
            Level 1 (Money Basics) is unlocked immediately. Completing 2 lessons unlocks Level 2
            (Saving). Completing 4 total lessons unlocks Level 3 (Banking), and continuing through
            Credit, Investing, and Wealth Building.
          </div>
        </div>

        {/* Roadmap Nodes List (Levels 1 to 6) */}
        <div className="space-y-6">
          {LEVELS_CONFIG.map((lvl) => {
            const levelLessons = ALL_LESSONS.filter((l) => l.level === lvl.level);

            return (
              <RoadmapLevelNode
                key={lvl.level}
                levelNumber={lvl.level}
                levelTitle={lvl.name}
                badge={lvl.badge}
                icon={lvl.icon}
                description={lvl.description}
                lessons={levelLessons}
                completedLessonIds={progress.completedLessonIds}
                allLessons={ALL_LESSONS}
              />
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
