'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '../../../components/layout/AppShell';
import { useUserState } from '../../../context/UserStateContext';
import { MONEY_MISSIONS } from '../../../data/missionsData';
import { ArrowLeft, Target, Zap, Check } from 'lucide-react';

export default function MissionsPage() {
  const { progress, completeMission } = useUserState();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleSelectOption = (missionId: string, optionId: string, xpReward: number) => {
    setSelectedOptions((prev) => ({ ...prev, [missionId]: optionId }));
    completeMission(missionId, xpReward);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#171717]">
          <div className="space-y-1">
            <Link
              href="/practice"
              className="nb-btn nb-btn-secondary text-xs py-1.5 px-3 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Back to Simulator</span>
            </Link>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-[#171717] tracking-tight">
              REAL-LIFE MONEY MISSIONS
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] font-medium">
              Interactive scenario challenges to stress-test your financial judgment before committing real capital.
            </p>
          </div>

          <span className="nb-tag bg-[#B99CFF] text-[#171717] self-start sm:self-auto">
            {progress.completedMissions.length} / {MONEY_MISSIONS.length} COMPLETED
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
                className="bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-6 sm:p-7 shadow-[5px_5px_0px_#171717] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b-2 border-[#171717]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#B99CFF] border-2 border-[#171717] flex items-center justify-center font-bold text-xs shadow-[2px_2px_0px_#171717]">
                      <Target className="w-5 h-5 text-[#171717] stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-lg sm:text-xl text-[#171717] tracking-tight">
                        {mission.title.toUpperCase()}
                      </h3>
                      <p className="font-mono text-xs text-[#6B6B6B] font-bold">{mission.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAFAF7] border border-[#171717] text-[#171717]">
                      {mission.difficulty.toUpperCase()}
                    </span>
                    <span className="font-mono text-xs font-black text-[#171717] bg-[#70E000] px-2 py-0.5 rounded border border-[#171717] flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 fill-[#171717]" />
                      +{mission.xpReward} XP
                    </span>
                  </div>
                </div>

                {/* Scenario Prompt & Context */}
                <div className="space-y-2 text-xs sm:text-sm text-[#171717] leading-relaxed">
                  <p className="font-display font-black text-base text-[#171717]">{mission.prompt}</p>
                  <div className="text-[#171717] text-xs bg-[#FAFAF7] p-3.5 rounded-lg border-2 border-[#171717] leading-relaxed font-medium">
                    <span className="font-display font-black text-[#171717]">BACKGROUND CONTEXT: </span>
                    {mission.context}
                  </div>
                </div>

                {/* Choices */}
                <div className="space-y-2.5 pt-2">
                  {mission.options.map((opt) => {
                    const isSelected = selectedOptId === opt.id;

                    return (
                      <div key={opt.id} className="space-y-2">
                        <button
                          onClick={() => handleSelectOption(mission.id, opt.id, mission.xpReward)}
                          className={`w-full text-left p-4 rounded-lg border-2 border-[#171717] transition-all text-xs sm:text-sm font-display font-bold flex items-center justify-between gap-3 cursor-pointer ${
                            isSelected
                              ? opt.isRecommended
                                ? 'bg-[#70E000] text-[#171717] shadow-[2px_2px_0px_#171717] translate-x-0.5 translate-y-0.5'
                                : 'bg-[#FFD84D] text-[#171717] shadow-[2px_2px_0px_#171717] translate-x-0.5 translate-y-0.5'
                              : 'bg-[#FAFAF7] hover:bg-[#FFFFFF] shadow-[2px_2px_0px_#171717]'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && (
                            <span className="font-mono text-xs font-black">
                              {opt.isRecommended ? '✓ RECOMMENDED' : '⚠ SUB-OPTIMAL'}
                            </span>
                          )}
                        </button>

                        {/* Detailed Feedback */}
                        {isSelected && (
                          <div
                            className={`p-3.5 rounded-lg border-2 border-[#171717] text-xs leading-relaxed ${
                              opt.isRecommended
                                ? 'bg-[#EBFBF4] text-[#171717]'
                                : 'bg-[#FFF9E0] text-[#171717]'
                            }`}
                          >
                            <span className="font-display font-black">FINANCIAL ANALYSIS: </span>
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
