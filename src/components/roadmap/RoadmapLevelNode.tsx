'use client';

import React from 'react';
import Link from 'next/link';
import { Lesson, LessonLevel } from '../../types';
import { evaluateLevelUnlock } from '../../data/unlockRequirements';
import { Lock, CheckCircle2, ArrowRight, Sparkles, BookOpen, Clock, Zap } from 'lucide-react';

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

export function RoadmapLevelNode({
  levelNumber,
  levelTitle,
  badge,
  icon,
  description,
  lessons,
  completedLessonIds,
  allLessons,
}: RoadmapLevelNodeProps) {
  const unlockState = evaluateLevelUnlock(levelNumber, completedLessonIds, allLessons);
  const isComplete =
    unlockState.completedInThisLevel === unlockState.totalInThisLevel &&
    unlockState.totalInThisLevel > 0;

  return (
    <div
      className={`rounded-3xl border transition-all duration-300 relative overflow-hidden ${
        unlockState.isUnlocked
          ? 'bg-slate-900/90 border-slate-700/80 shadow-xl'
          : 'bg-slate-950/60 border-slate-800/60 opacity-80'
      }`}
    >
      {/* Top Banner Header */}
      <div className="p-5 sm:p-6 border-b border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg ${
                unlockState.isUnlocked
                  ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/30 border border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-900 border border-slate-800 text-slate-500'
              }`}
            >
              {icon}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 uppercase font-mono">
                  {badge}
                </span>
                {isComplete && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Completed
                  </span>
                )}
                {!unlockState.isUnlocked && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5 tracking-tight">
                {levelTitle}
              </h3>
            </div>
          </div>

          {/* Status Text & Progress Bar */}
          <div className="sm:text-right min-w-[160px]">
            <div className="text-xs font-semibold text-slate-300 mb-1.5 flex sm:justify-end items-center gap-1">
              {!unlockState.isUnlocked ? (
                <span className="text-amber-400 flex items-center gap-1 font-medium">
                  <Lock className="w-3.5 h-3.5" />
                  {unlockState.statusText}
                </span>
              ) : isComplete ? (
                <span className="text-emerald-400 font-bold">100% Completed</span>
              ) : (
                <span>
                  {unlockState.completedInThisLevel} / {unlockState.totalInThisLevel} Lessons (
                  {unlockState.progressPercent}%)
                </span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full sm:w-40 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                style={{ width: `${unlockState.progressPercent}%` }}
                className={`h-full rounded-full transition-all duration-500 ${
                  isComplete
                    ? 'bg-emerald-400'
                    : unlockState.isUnlocked
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-400'
                    : 'bg-slate-700'
                }`}
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-3">{description}</p>
      </div>

      {/* Lessons List inside this Level */}
      <div className="p-4 sm:p-6 divide-y divide-slate-800/60 space-y-2 sm:space-y-0">
        {lessons.map((lesson, idx) => {
          const isLessonDone = completedLessonIds.includes(lesson.id);
          const canAccessLesson = unlockState.isUnlocked;

          return (
            <div
              key={lesson.id}
              className={`py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl transition-colors ${
                canAccessLesson
                  ? 'hover:bg-slate-800/40 sm:px-3 -mx-1 sm:mx-0'
                  : 'opacity-60 cursor-not-allowed sm:px-3'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    isLessonDone
                      ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm'
                      : canAccessLesson
                      ? 'bg-slate-800 text-slate-300 border border-slate-700'
                      : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}
                >
                  {isLessonDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm font-semibold tracking-tight ${
                        isLessonDone
                          ? 'text-slate-200 line-through decoration-slate-600'
                          : canAccessLesson
                          ? 'text-white'
                          : 'text-slate-400'
                      }`}
                    >
                      {lesson.title}
                    </h4>
                    {lesson.interactiveType !== 'quiz-only' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/15 text-teal-400 border border-teal-500/25 font-mono">
                        Interactive
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                    {lesson.shortDescription}
                  </p>
                </div>
              </div>

              {/* Lesson Meta + CTA */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pl-10 sm:pl-0">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {lesson.estimatedMinutes}m
                  </span>
                  <span className="flex items-center gap-1 font-mono text-emerald-400 font-bold">
                    <Zap className="w-3 h-3 fill-emerald-400" />+{lesson.xpReward} XP
                  </span>
                </div>

                {canAccessLesson ? (
                  <Link
                    href={`/learn/${lesson.id}`}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isLessonDone
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                        : 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20 hover:scale-105 active:scale-95'
                    }`}
                  >
                    <span>{isLessonDone ? 'Review' : 'Start'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800/80">
                    <Lock className="w-3 h-3 text-slate-600" />
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
