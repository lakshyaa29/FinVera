'use client';

import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useUserState } from '../../context/UserStateContext';
import { ALL_LESSONS } from '../../data/lessonsData';
import { LEVELS_CONFIG } from '../../data/unlockRequirements';
import { RoadmapLevelNode } from '../../components/roadmap/RoadmapLevelNode';
import { GrowthPathMotif } from '../../components/graphics/FinVeraGraphics';

export default function LearnRoadmapPage() {
  const { progress } = useUserState();

  const totalLessons = ALL_LESSONS.length;
  const completedCount = progress.completedLessonIds.length;
  const totalXpAvailable = ALL_LESSONS.reduce((acc, l) => acc + l.xpReward, 0);

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto pb-12">
        {/* Roadmap Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#171717]">
          <div>
            <span className="nb-tag bg-[#70E000] text-[#171717] mb-2">
              ONE STEP AT A TIME
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-[#171717] tracking-tight">
              Your money learning path
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
              Start with everyday money skills. Complete lessons to unlock the next level and build your confidence.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] text-center min-w-[110px] shadow-[3px_3px_0px_#171717]">
              <p className="font-mono text-[10px] text-[#6B6B6B] uppercase font-bold">Progress</p>
              <p className="font-display font-black text-lg text-[#171717]">
                {completedCount} <span className="text-xs text-[#6B6B6B]">/ {totalLessons}</span>
              </p>
            </div>
            <div className="px-4 py-2.5 rounded-lg bg-[#70E000] border-2 border-[#171717] text-center min-w-[110px] shadow-[3px_3px_0px_#171717]">
              <p className="font-mono text-[10px] text-[#171717] uppercase font-bold">XP to discover</p>
              <p className="font-display font-black text-lg text-[#171717]">
                +{totalXpAvailable} XP
              </p>
            </div>
          </div>
        </div>

        {/* Growth Path brand motif banner */}
        <div className="bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-4 shadow-[4px_4px_0px_#171717] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-display font-bold text-[#171717]">
            <span className="bg-[#FFD84D] px-2 py-0.5 border border-[#171717] rounded mr-2">
              HOW IT WORKS
            </span>
            Finish the lessons in each level to open up the next part of your path.
          </div>
          <GrowthPathMotif className="w-48 h-5 shrink-0" />
        </div>

        {/* Roadmap Nodes List (Levels 1 to 6) */}
        <div className="space-y-6 relative">
          {LEVELS_CONFIG.map((lvl, index) => {
            const levelLessons = ALL_LESSONS.filter((l) => l.level === lvl.level);

            return (
              <div key={lvl.level} className="relative">
                {/* Thick black connecting line between levels */}
                {index < LEVELS_CONFIG.length - 1 && (
                  <div className="hidden sm:block absolute left-9 top-full h-6 w-1 bg-[#171717] z-10 -ml-0.5" />
                )}

                <RoadmapLevelNode
                  levelNumber={lvl.level}
                  levelTitle={lvl.name}
                  badge={lvl.badge}
                  icon={lvl.icon}
                  description={lvl.description}
                  lessons={levelLessons}
                  completedLessonIds={progress.completedLessonIds}
                  allLessons={ALL_LESSONS}
                />
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
