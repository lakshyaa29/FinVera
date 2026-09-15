'use client';

import React from 'react';
import Link from 'next/link';
import { Lesson, LessonLevel } from '../../types';
import { evaluateLevelUnlock } from '../../data/unlockRequirements';
import {
  Lock,
  ArrowRight,
  Clock,
  Zap,
  Wallet,
  ShieldCheck,
  Layers,
  CreditCard,
  TrendingUp,
  Award,
} from 'lucide-react';

interface RoadmapLevelNodeProps {
  levelNumber: LessonLevel;
  levelTitle: string;
  badge: string;
  icon: string;
  description: string;
  lessons: Lesson[];
  completedLessonIds: string[];
  allLessons: Lesson[];
}

const LEVEL_THEMES: Record<
  LessonLevel,
  {
    icon: React.ComponentType<{ className?: string }>;
    accentBg: string;
  }
> = {
  1: { icon: Wallet, accentBg: 'bg-[#70E000]' },
  2: { icon: ShieldCheck, accentBg: 'bg-[#6C8CFF]' },
  3: { icon: Layers, accentBg: 'bg-[#B99CFF]' },
  4: { icon: CreditCard, accentBg: 'bg-[#FFD84D]' },
  5: { icon: TrendingUp, accentBg: 'bg-[#A8F0D0]' },
  6: { icon: Award, accentBg: 'bg-[#FF6B6B]' },
};

export function RoadmapLevelNode({
  levelNumber,
  levelTitle,
  badge,
  description,
  lessons,
  completedLessonIds,
  allLessons,
}: RoadmapLevelNodeProps) {
  const unlockState = evaluateLevelUnlock(levelNumber, completedLessonIds, allLessons);
  const isComplete =
    unlockState.completedInThisLevel === unlockState.totalInThisLevel &&
    unlockState.totalInThisLevel > 0;
  const isCurrentActive = unlockState.isUnlocked && !isComplete;

  const theme = LEVEL_THEMES[levelNumber] || LEVEL_THEMES[1];
  const LevelIcon = theme.icon;

  return (
    <div
      className={`rounded-xl border-3 border-[#171717] transition-all bg-[#FFFFFF] overflow-hidden ${
        isCurrentActive
          ? 'shadow-[6px_6px_0px_#171717] ring-4 ring-[#70E000]/40'
          : unlockState.isUnlocked
          ? 'shadow-[4px_4px_0px_#171717]'
          : 'opacity-70 bg-[#F8F8F3] shadow-[2px_2px_0px_#171717]'
      }`}
    >
      {/* Top Banner Header */}
      <div className="p-5 sm:p-6 border-b-2 border-[#171717] bg-[#FAFAF7]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Level Icon Node */}
            <div
              className={`w-12 h-12 rounded-lg border-2 border-[#171717] flex items-center justify-center shadow-[3px_3px_0px_#171717] shrink-0 ${
                unlockState.isUnlocked ? theme.accentBg : 'bg-[#E5E5DE] text-[#6B6B6B]'
              }`}
            >
              <LevelIcon className="w-6 h-6 stroke-[2.5] text-[#171717]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="nb-tag bg-[#FFFFFF] text-[#171717]">
                  {badge}
                </span>

                {isComplete && (
                  <span className="nb-tag bg-[#70E000] text-[#171717]">
                    ✓ COMPLETED
                  </span>
                )}
                {isCurrentActive && (
                  <span className="nb-tag bg-[#FFD84D] text-[#171717]">
                    ● ACTIVE
                  </span>
                )}
                {!unlockState.isUnlocked && (
                  <span className="nb-tag bg-[#E5E5DE] text-[#6B6B6B]">
                    <Lock className="w-3 h-3 text-[#171717]" /> LOCKED
                  </span>
                )}
              </div>

              <h3 className="font-display font-black text-xl sm:text-2xl text-[#171717] mt-1 tracking-tight">
                {levelTitle.toUpperCase()}
              </h3>
            </div>
          </div>

          {/* Status Text & Progress Bar */}
          <div className="sm:text-right min-w-[180px]">
            <div className="text-xs font-mono font-bold text-[#171717] mb-1.5 flex sm:justify-end items-center gap-1">
              {!unlockState.isUnlocked ? (
                <span className="text-[#FF6B6B] flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  {unlockState.statusText}
                </span>
              ) : isComplete ? (
                <span className="text-[#171717] bg-[#70E000] px-2 py-0.5 rounded border border-[#171717]">
                  100% COMPLETE
                </span>
              ) : (
                <span>
                  {unlockState.completedInThisLevel} / {unlockState.totalInThisLevel} Lessons ({unlockState.progressPercent}%)
                </span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full sm:w-44 h-3 bg-[#E5E5DE] border-2 border-[#171717] rounded-full overflow-hidden">
              <div
                style={{ width: `${unlockState.progressPercent}%` }}
                className="h-full bg-[#171717] transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-[#6B6B6B] font-medium mt-2.5 leading-relaxed">{description}</p>
      </div>

      {/* Lessons List inside this Level */}
      <div className="p-4 space-y-2.5">
        {lessons.map((lesson, idx) => {
          const isLessonDone = completedLessonIds.includes(lesson.id);
          const canAccessLesson = unlockState.isUnlocked;

          return (
            <div
              key={lesson.id}
              className={`p-3 sm:p-3.5 rounded-lg border-2 border-[#171717] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                canAccessLesson
                  ? 'bg-[#FFFFFF] hover:bg-[#FAFAF7] shadow-[2px_2px_0px_#171717]'
                  : 'bg-[#F8F8F3] opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-7 h-7 rounded-md border-2 border-[#171717] flex items-center justify-center font-display font-black text-xs shrink-0 mt-0.5 ${
                    isLessonDone
                      ? 'bg-[#70E000] text-[#171717]'
                      : canAccessLesson
                      ? 'bg-[#FFD84D] text-[#171717]'
                      : 'bg-[#E5E5DE] text-[#6B6B6B]'
                  }`}
                >
                  {isLessonDone ? '✓' : idx + 1}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4
                      className={`font-display font-bold text-sm tracking-tight ${
                        isLessonDone
                          ? 'text-[#6B6B6B] line-through'
                          : 'text-[#171717]'
                      }`}
                    >
                      {lesson.title}
                    </h4>
                    {lesson.interactiveType !== 'quiz-only' && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#B99CFF] text-[#171717] border border-[#171717]">
                        Interactive
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6B6B6B] mt-0.5 line-clamp-1">
                    {lesson.shortDescription}
                  </p>
                </div>
              </div>

              {/* Lesson Meta + CTA Button */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pl-10 sm:pl-0">
                <div className="flex items-center gap-3 text-xs font-mono font-bold text-[#171717]">
                  <span className="flex items-center gap-1 text-[#6B6B6B]">
                    <Clock className="w-3.5 h-3.5" />
                    {lesson.estimatedMinutes}m
                  </span>
                  <span className="flex items-center gap-1 bg-[#70E000] px-1.5 py-0.5 rounded border border-[#171717]">
                    <Zap className="w-3 h-3 fill-[#171717]" />
                    +{lesson.xpReward} XP
                  </span>
                </div>

                {canAccessLesson ? (
                  <Link
                    href={`/learn/${lesson.id}`}
                    className={`nb-btn text-xs py-1.5 px-3.5 ${
                      isLessonDone
                        ? 'nb-btn-secondary'
                        : 'nb-btn-primary'
                    }`}
                  >
                    <span>{isLessonDone ? 'Review' : 'Start'}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B] font-bold px-3 py-1 rounded bg-[#E5E5DE] border border-[#171717]">
                    <Lock className="w-3 h-3 text-[#171717]" />
                    <span>Locked</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
