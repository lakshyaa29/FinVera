'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '../../../components/layout/AppShell';
import { useUserState } from '../../../context/UserStateContext';
import { MONEY_MISSIONS } from '../../../data/missionsData';
import { ArrowLeft, Target, CheckCircle2, Zap, Sparkles, HelpCircle } from 'lucide-react';

export default function MissionsPage() {
  const { progress, completeMission } = useUserState();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleSelectOption = (missionId: string, optionId: string, xpReward: number) => {
    setSelectedOptions((prev) => ({ ...prev, [missionId]: optionId }));
    completeMission(missionId, xpReward);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Practice Hub</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Real-Life Money Missions
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive scenario simulations that test your financial decision making in real life.
            </p>
          </div>

          <span className="text-xs font-bold font-mono px-3 py-1.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
            {progress.completedMissions.length} / {MONEY_MISSIONS.length} Completed
          </span>
        </div>

        {/* Missions Cards */}
        <div className="space-y-6">
          {MONEY_MISSIONS.map((mission) => {
            const selectedOptId = selectedOptions[mission.id];
            const isCompleted = progress.completedMissions.includes(mission.id);

            return (
              <div
                key={mission.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {mission.title}
                      </h3>
                      <p className="text-xs text-slate-400">{mission.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {mission.difficulty}
                    </span>
                    <span className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 fill-emerald-400" />+{mission.xpReward} XP
                    </span>
                  </div>
                </div>

                {/* Scenario Prompt & Context */}
                <div className="space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <p className="font-semibold text-white">{mission.prompt}</p>
                  <p className="text-slate-400 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="font-bold text-slate-300">Background Context: </span>
                    {mission.context}
                  </p>
                </div>

                {/* Choices */}
                <div className="space-y-2.5 pt-2">
                  {mission.options.map((opt) => {
                    const isSelected = selectedOptId === opt.id;

                    return (
                      <div key={opt.id} className="space-y-2">
                        <button
                          onClick={() => handleSelectOption(mission.id, opt.id, mission.xpReward)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs sm:text-sm font-medium flex items-center justify-between gap-3 ${
                            isSelected
                              ? opt.isRecommended
                                ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200'
                                : 'bg-amber-950/40 border-amber-500/80 text-amber-200'
                              : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && (
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 ${
                                opt.isRecommended ? 'text-emerald-400' : 'text-amber-400'
                              }`}
                            />
                          )}
                        </button>

                        {/* Detailed feedback */}
                        {isSelected && (
                          <div
                            className={`p-3.5 rounded-xl text-xs leading-relaxed animate-in fade-in duration-150 ${
                              opt.isRecommended
                                ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300'
                                : 'bg-amber-950/30 border border-amber-500/30 text-amber-300'
                            }`}
                          >
                            <span className="font-bold">Financial Analysis: </span>
                            {opt.feedback}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
