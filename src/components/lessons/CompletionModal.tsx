'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { Zap, Flame, ArrowRight, Trophy, Award } from 'lucide-react';

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
}: CompletionModalProps) {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#70E000', '#6C8CFF', '#FFD84D', '#171717'],
        });
      } catch {
        // Fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-xs animate-in fade-in duration-100">
      <div className="w-full max-w-md bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-6 sm:p-8 shadow-[8px_8px_0px_#171717] text-center relative overflow-hidden">
        {/* Trophy Stamp Icon */}
        <div className="w-16 h-16 mx-auto rounded-xl bg-[#70E000] border-3 border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center text-[#171717] mb-4 rotate-[-2deg]">
          <Trophy className="w-8 h-8 stroke-[2.5]" />
        </div>

        <span className="nb-sticker bg-[#FFD84D] text-[#171717] mb-2">
          LESSON COMPLETED!
        </span>
        <h2 className="font-display font-black text-2xl text-[#171717] mt-2 mb-1 tracking-tight">
          {lessonTitle.toUpperCase()}
        </h2>
        <p className="text-xs text-[#6B6B6B] font-medium max-w-xs mx-auto mb-5">
          Great discipline. Another verified milestone checked off your wealth journey.
        </p>

        {/* Stats Badges */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 bg-[#EBFBF4] border-2 border-[#171717] rounded-lg shadow-[2px_2px_0px_#171717]">
            <div className="flex items-center justify-center gap-1 text-[#171717] font-display font-black text-lg">
              <Zap className="w-4 h-4 fill-[#171717]" />
              <span>+{xpEarned} XP</span>
            </div>
            <p className="font-mono text-[10px] text-[#6B6B6B] font-bold uppercase mt-0.5">Knowledge XP</p>
          </div>

          <div className="p-3 bg-[#FFF9E0] border-2 border-[#171717] rounded-lg shadow-[2px_2px_0px_#171717]">
            <div className="flex items-center justify-center gap-1 text-[#171717] font-display font-black text-lg">
              <Flame className="w-4 h-4 fill-[#171717]" />
              <span>{streakDays} Days</span>
            </div>
            <p className="font-mono text-[10px] text-[#6B6B6B] font-bold uppercase mt-0.5">Active Streak</p>
          </div>
        </div>

        {/* New Badge Notice if any */}
        {newAchievements.length > 0 && (
          <div className="mb-5 p-2.5 rounded-lg bg-[#FFD84D] border-2 border-[#171717] text-[#171717] text-xs font-display font-black flex items-center justify-center gap-2">
            <Award className="w-4 h-4" />
            <span>NEW MILESTONE BADGE UNLOCKED!</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {nextLessonId ? (
            <Link
              href={`/learn/${nextLessonId}`}
              className="nb-btn nb-btn-primary w-full py-3.5 text-sm"
            >
              <span>CONTINUE TO NEXT LESSON</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          ) : (
            <Link
              href="/learn"
              className="nb-btn nb-btn-primary w-full py-3.5 text-sm"
            >
              <span>EXPLORE ROADMAP</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          )}

          <Link
            href="/learn"
            className="text-xs font-display font-bold text-[#6B6B6B] hover:text-[#171717] block py-1.5"
          >
            Back to Learning Roadmap
          </Link>
        </div>
      </div>
    </div>
  );
}
