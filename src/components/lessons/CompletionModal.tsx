'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { Sparkles, Zap, Flame, ArrowRight, CheckCircle2, Trophy, RotateCcw } from 'lucide-react';

interface CompletionModalProps {
  isOpen: boolean;
  lessonTitle: string;
  xpEarned: number;
  streakDays: number;
  nextLessonId?: string;
  newAchievements?: string[];
  onClose: () => void;
}

export function CompletionModal({
  isOpen,
  lessonTitle,
  xpEarned,
  streakDays,
  nextLessonId,
  newAchievements = [],
  onClose,
}: CompletionModalProps) {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#14b8a6', '#f59e0b', '#3b82f6'],
        });
      } catch {
        // Fallback gracefully if canvas-confetti is not loaded
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Background ambient glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Big Trophy Icon */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 shadow-xl shadow-emerald-500/30 mb-5 animate-bounce">
          <Trophy className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
          Lesson Completed!
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1 mb-2 tracking-tight">
          {lessonTitle}
        </h2>
        <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6">
          Great job! You took another structured step forward on your path to financial freedom.
        </p>

        {/* Stats Badges */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-extrabold text-lg font-mono">
              <Zap className="w-5 h-5 fill-emerald-400" />
              <span>+{xpEarned} XP</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Knowledge XP Earned</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 font-extrabold text-lg font-mono">
              <Flame className="w-5 h-5 fill-amber-400" />
              <span>{streakDays} Days</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Streak Maintained</p>
          </div>
        </div>

        {/* New Badge Unlocked Notice if any */}
        {newAchievements.length > 0 && (
          <div className="mb-6 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">New Badge Unlocked in Achievements!</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {nextLessonId ? (
            <Link
              href={`/learn/${nextLessonId}`}
              className="w-full py-3 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to Next Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/learn"
              className="w-full py-3 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          <Link
            href="/learn"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors block"
          >
            Back to Learning Roadmap
          </Link>
        </div>
      </div>
    </div>
  );
}
