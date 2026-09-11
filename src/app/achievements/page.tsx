'use client';

import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useUserState } from '../../context/UserStateContext';
import { ALL_ACHIEVEMENTS } from '../../data/achievementsData';
import { Award, Lock, CheckCircle2, Zap, Flame, Trophy, Sparkles } from 'lucide-react';

export default function AchievementsPage() {
  const { progress } = useUserState();

  const earnedCount = progress.achievements.length;
  const totalBadges = ALL_ACHIEVEMENTS.length;

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                Gamification & Milestones
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
              Badges & Achievements
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Earn XP and unlock badges by mastering lessons, passing quizzes, and practicing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center min-w-[100px]">
              <p className="text-[11px] text-slate-400 font-medium">Unlocked</p>
              <p className="text-base font-extrabold text-amber-400 font-mono">
                {earnedCount} / {totalBadges}
              </p>
            </div>
          </div>
        </div>

        {/* Current Tier Rank Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 shadow-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-3xl shadow-lg border border-amber-500/30">
              👑
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase text-amber-400 tracking-wider">
                Current Learning Rank
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                {progress.levelTitle}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Total Knowledge XP: <span className="font-bold text-white font-mono">{progress.xp}</span>
              </p>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>{progress.streakDays} Day Streak</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Keep learning daily</p>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_ACHIEVEMENTS.map((badge) => {
            const isUnlocked = progress.achievements.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-3 ${
                  isUnlocked
                    ? 'bg-slate-900 border-amber-500/30 shadow-lg shadow-amber-500/5'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                        isUnlocked
                          ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400'
                          : 'bg-slate-900 border border-slate-800 grayscale'
                      }`}
                    >
                      {badge.icon}
                    </div>

                    {isUnlocked ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1">{badge.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{badge.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 text-[11px]">Reward</span>
                  <span className="font-bold text-amber-400">+{badge.xpReward} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
