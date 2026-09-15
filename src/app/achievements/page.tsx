'use client';

import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useUserState } from '../../context/UserStateContext';
import { ALL_ACHIEVEMENTS } from '../../data/achievementsData';
import {
  Award,
  Lock,
  CheckCircle2,
  Zap,
  Flame,
  Trophy,
  Sparkles,
  Sprout,
  Target,
  Calculator,
  Coins,
  Landmark,
  CreditCard,
  TrendingUp,
  Rocket,
  Crown,
} from 'lucide-react';

// Map achievement IDs to clean Lucide icons
const BADGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'first-lesson': Sprout,
  'first-quiz': Target,
  'calculator-explorer': Calculator,
  'streak-3-days': Flame,
  'streak-7-days': Zap,
  'money-basics-complete': Coins,
  'banking-unlocked': Landmark,
  'credit-unlocked': CreditCard,
  'investing-unlocked': TrendingUp,
  'first-simulation': Rocket,
  'lessons-10-complete': Award,
  'lessons-25-complete': Crown,
};

export default function AchievementsPage() {
  const { progress } = useUserState();

  const earnedCount = progress.achievements.length;
  const totalBadges = ALL_ACHIEVEMENTS.length;
  const completionPercent = Math.round((earnedCount / totalBadges) * 100);

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#171717]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="nb-sticker bg-[#FFD84D] text-[#171717]">
                <Trophy className="w-3.5 h-3.5 text-[#171717]" />
                MILESTONE MASTERY
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-space-grotesk text-[#171717] tracking-tight">
              Badges & Milestones
            </h1>
            <p className="text-sm font-medium text-[#171717]/75 mt-1 max-w-2xl">
              Earn validated knowledge badges, build consecutive streaks, and level up your investor rank.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-4 shadow-[4px_4px_0px_#171717]">
            <div className="text-left">
              <p className="text-[10px] uppercase font-black tracking-wider text-[#171717]/70">Badges Unlocked</p>
              <p className="text-2xl font-black text-[#171717] font-space-grotesk">
                {earnedCount} <span className="text-xs text-[#171717]/50 font-mono">/ {totalBadges}</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl border-2 border-[#171717] flex items-center justify-center font-mono font-black text-xs text-[#171717] bg-[#70E000] shadow-[2px_2px_0px_#171717]">
              {completionPercent}%
            </div>
          </div>
        </div>

        {/* Current Tier Rank Banner */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#FFD84D] border-3 border-[#171717] shadow-[5px_5px_0px_#171717] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-[#FFFFFF] border-2 border-[#171717] text-[#171717] flex items-center justify-center shadow-[3px_3px_0px_#171717] shrink-0">
              <Crown className="w-8 h-8 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#171717] font-mono">
                ● Current Investor Rank
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-space-grotesk text-[#171717] tracking-tight mt-0.5">
                {progress.levelTitle}
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5 text-xs text-[#171717] font-bold">
                <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#171717] rounded">XP: <strong className="font-mono">{progress.xp} XP</strong></span>
                <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#171717] rounded">Lessons: <strong className="font-mono">{progress.completedLessonIds.length} Done</strong></span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 p-3 sm:p-0 bg-[#FFFFFF] sm:bg-transparent rounded-xl border-2 border-[#171717] sm:border-0 shadow-[2px_2px_0px_#171717] sm:shadow-none">
            <div className="flex items-center gap-1.5 text-[#171717] font-black text-sm bg-[#FFFFFF] px-3.5 py-1.5 rounded-lg border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
              <Flame className="w-4 h-4 fill-[#FF5C35] text-[#171717]" />
              <span>{progress.streakDays} Day Streak</span>
            </div>
            <p className="text-xs text-[#171717]/80 font-bold sm:mt-1">Daily consistency multiplier active</p>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ALL_ACHIEVEMENTS.map((badge) => {
            const isUnlocked = progress.achievements.includes(badge.id);
            const IconComponent = BADGE_ICONS[badge.id] || Trophy;

            return (
              <div
                key={badge.id}
                className={`p-6 rounded-xl border-3 border-[#171717] transition-all flex flex-col justify-between space-y-4 ${
                  isUnlocked
                    ? 'bg-[#FFFFFF] shadow-[4px_4px_0px_#171717] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#171717]'
                    : 'bg-[#FAFAF7] opacity-75 shadow-[2px_2px_0px_#171717]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl border-2 border-[#171717] flex items-center justify-center transition-transform shadow-[2px_2px_0px_#171717] ${
                        isUnlocked
                          ? 'bg-[#70E000] text-[#171717]'
                          : 'bg-[#E8E8E0] text-[#171717]/40'
                      }`}
                    >
                      <IconComponent className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#70E000] text-[#171717] border-2 border-[#171717] text-xs font-black uppercase tracking-wider shadow-[1px_1px_0px_#171717]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#171717]" /> UNLOCKED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FAFAF7] text-[#171717]/60 border border-[#171717] text-xs font-bold">
                        <Lock className="w-3 h-3 text-[#171717]/60" /> LOCKED
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-black font-space-grotesk text-[#171717] mb-1">{badge.title}</h3>
                  <p className="text-xs text-[#171717]/75 leading-relaxed font-medium">{badge.description}</p>
                </div>

                <div className="pt-3 border-t-2 border-[#171717] flex items-center justify-between text-xs">
                  <span className="text-[#171717]/60 font-bold uppercase tracking-wider text-[10px]">XP Reward</span>
                  <span className={`font-black font-mono px-2 py-0.5 rounded border border-[#171717] ${isUnlocked ? 'bg-[#FFD84D] text-[#171717]' : 'bg-[#FAFAF7] text-[#171717]/50'}`}>
                    +{badge.xpReward} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
