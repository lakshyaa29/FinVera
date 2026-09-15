'use client';

import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useUserState } from '../../context/UserStateContext';
import { HEALTH_QUESTIONS } from '../../data/healthData';
import { Activity, ShieldCheck, CheckCircle2, AlertCircle, Sparkles, HelpCircle, HeartPulse, Check } from 'lucide-react';

export default function MoneyHealthPage() {
  const { healthScores, setHealthScore } = useUserState();

  // Calculate overall score (sum of 5 questions, max 100)
  const totalScore = Object.values(healthScores).reduce((acc, score) => acc + (score || 0), 0);

  let healthLabel = 'Needs Attention';
  let badgeColor = 'bg-[#FF5C35] text-[#FFFFFF]';
  let scoreBg = 'bg-[#FFF9D2]';

  if (totalScore >= 80) {
    healthLabel = 'Elite Financial Hygiene';
    badgeColor = 'bg-[#70E000] text-[#171717]';
    scoreBg = 'bg-[#70E000]/20';
  } else if (totalScore >= 60) {
    healthLabel = 'Strong Foundations';
    badgeColor = 'bg-[#6C8CFF] text-[#FFFFFF]';
    scoreBg = 'bg-[#6C8CFF]/20';
  } else if (totalScore >= 40) {
    healthLabel = 'Moderate Habits';
    badgeColor = 'bg-[#FFD84D] text-[#171717]';
    scoreBg = 'bg-[#FFD84D]/20';
  }

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto pb-12">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="nb-sticker bg-[#FFD84D] text-[#171717]">
              <HeartPulse className="w-3.5 h-3.5 text-[#171717]" />
              SELF-DIAGNOSTIC HEALTH
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-space-grotesk text-[#171717] tracking-tight">
            Financial Health Diagnostic
          </h1>
          <p className="text-sm font-medium text-[#171717]/75 mt-1 max-w-2xl">
            Evaluate your personal balance sheet resilience across 5 core pillars to uncover structural blind spots.
          </p>
        </div>

        {/* Overall Score Highlight Card */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#FFFFFF] border-3 border-[#171717] shadow-[5px_5px_0px_#171717] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#171717]/70 font-mono">
              ● Composite Hygiene Score
            </span>
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black font-space-grotesk tracking-tight text-[#171717]">
                {totalScore}
              </span>
              <span className="text-xl font-bold font-mono text-[#171717]/50">/ 100</span>
              <span className={`text-xs font-black px-3 py-1 rounded border-2 border-[#171717] uppercase tracking-wider shadow-[2px_2px_0px_#171717] ${badgeColor}`}>
                {healthLabel}
              </span>
            </div>
            <p className="text-xs font-medium text-[#171717]/75 max-w-md leading-relaxed">
              Based on your liquid emergency fund reserves, debt-to-income discipline, retirement savings velocity, and insurance safety nets.
            </p>
          </div>

          <div className="sm:text-right p-4 rounded-xl bg-[#FAFAF7] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] shrink-0">
            <p className="text-xs font-black text-[#171717] mb-1 flex items-center sm:justify-end gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#171717]" />
              Actionable Priority
            </p>
            <p className="text-xs text-[#171717] font-medium max-w-[240px] leading-relaxed">
              {totalScore < 60
                ? 'Establish a strict 3-month liquid emergency reserve before pursuing speculative equity opportunities.'
                : 'Automate a 15% monthly index SIP and audit your term life coverage.'}
            </p>
          </div>
        </div>

        {/* 5 Pillar Questions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#171717] tracking-tight flex items-center gap-2 font-space-grotesk">
              <Activity className="w-4 h-4 text-[#171717]" />
              <span>5 Core Financial Pillars</span>
            </h3>
            <span className="text-xs font-bold text-[#171717]/60">Click any option to recalculate</span>
          </div>

          <div className="space-y-6">
            {HEALTH_QUESTIONS.map((q, qIdx) => {
              const currentScore = healthScores[q.id];

              return (
                <div
                  key={q.id}
                  className="p-6 rounded-xl bg-[#FFFFFF] border-3 border-[#171717] shadow-[4px_4px_0px_#171717] space-y-4"
                >
                  <div className="flex items-center justify-between gap-2 pb-3 border-b-2 border-[#171717]">
                    <span className="text-xs font-black text-[#171717] uppercase tracking-wider px-2 py-0.5 rounded bg-[#6C8CFF]/20 border border-[#171717]">
                      Pillar {qIdx + 1}: {q.categoryLabel}
                    </span>
                    <span className="text-xs font-mono font-black text-[#171717] px-2 py-0.5 rounded bg-[#FAFAF7] border border-[#171717]">
                      Score: <span className="text-[#171717] font-black">{currentScore || 0}</span>/20
                    </span>
                  </div>

                  <p className="text-base font-black text-[#171717] leading-snug font-space-grotesk">{q.question}</p>

                  <div className="space-y-2.5">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = currentScore === opt.points;

                      return (
                        <button
                          key={oIdx}
                          onClick={() => setHealthScore(q.id, opt.points)}
                          className={`w-full text-left p-4 rounded-xl border-2 border-[#171717] transition-all text-xs sm:text-sm flex items-center justify-between gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-[#70E000] text-[#171717] shadow-[3px_3px_0px_#171717] translate-x-[-1px] translate-y-[-1px]'
                              : 'bg-[#FAFAF7] text-[#171717] hover:bg-[#FFF9D2] shadow-[2px_2px_0px_#171717]'
                          }`}
                        >
                          <div>
                            <p className="font-black text-[#171717]">
                              {opt.label}
                            </p>
                            <p className="text-xs text-[#171717]/80 mt-0.5 font-medium">{opt.description}</p>
                          </div>
                          <div
                            className={`w-6 h-6 rounded border-2 border-[#171717] flex items-center justify-center shrink-0 transition-colors shadow-[1px_1px_0px_#171717] ${
                              isSelected
                                ? 'bg-[#171717] text-white'
                                : 'bg-[#FFFFFF]'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-[#FFF9D2] border-2 border-[#171717] text-xs text-[#171717] flex items-center gap-2.5 shadow-[2px_2px_0px_#171717]">
          <HelpCircle className="w-4 h-4 shrink-0 text-[#171717]" />
          <span className="font-medium">
            Educational self-assessment only. This tool is calibrated to promote fundamental personal finance habits and does not constitute individual fiduciary advice.
          </span>
        </div>
      </div>
    </AppShell>
  );
}
