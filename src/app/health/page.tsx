'use client';

import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useUserState } from '../../context/UserStateContext';
import { HEALTH_QUESTIONS } from '../../data/healthData';
import { Activity, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

export default function MoneyHealthPage() {
  const { healthScores, setHealthScore } = useUserState();

  // Calculate overall score (sum of 5 questions, max 100)
  const totalScore = Object.values(healthScores).reduce((acc, score) => acc + (score || 0), 0);

  let healthLabel = 'Needs Building';
  let badgeColor = 'text-amber-400 bg-amber-500/15 border-amber-500/30';

  if (totalScore >= 80) {
    healthLabel = 'Elite Financial Hygiene';
    badgeColor = 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
  } else if (totalScore >= 60) {
    healthLabel = 'Strong Foundations';
    badgeColor = 'text-teal-400 bg-teal-500/15 border-teal-500/30';
  } else if (totalScore >= 40) {
    healthLabel = 'Moderate Habits';
    badgeColor = 'text-blue-400 bg-blue-500/15 border-blue-500/30';
  }

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
              Self-Diagnostic Assessment
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            Money Health Checkup
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Evaluate your financial resilience across 5 core pillars and discover blind spots.
          </p>
        </div>

        {/* Overall Score Highlight Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 border border-blue-500/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Financial Confidence Score
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-6xl font-extrabold text-white font-mono tracking-tight">
                {totalScore}
              </span>
              <span className="text-lg text-slate-500 font-mono">/ 100</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badgeColor}`}>
                {healthLabel}
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              Based on your liquid emergency buffers, credit discipline, savings rate, and asset
              protection against inflation.
            </p>
          </div>

          <div className="sm:text-right p-4 rounded-2xl bg-slate-950/70 border border-slate-800 shrink-0">
            <p className="text-xs font-semibold text-slate-400 mb-1">Key Recommendation</p>
            <p className="text-xs text-emerald-300 font-medium max-w-[220px]">
              {totalScore < 60
                ? 'Prioritize building 3 months of emergency expenses before taking high equity risk.'
                : 'Automate a 15% monthly index fund SIP and review term insurance coverage.'}
            </p>
          </div>
        </div>

        {/* 5 Pillar Questions */}
        <div className="space-y-6">
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span>5 Core Hygiene Pillars</span>
          </h3>

          <div className="space-y-6">
            {HEALTH_QUESTIONS.map((q, qIdx) => {
              const currentScore = healthScores[q.id];

              return (
                <div
                  key={q.id}
                  className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-4"
                >
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-blue-400 font-mono uppercase">
                      Pillar {qIdx + 1}: {q.categoryLabel}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      Score: <span className="text-white font-bold">{currentScore || 0}</span>/20
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-white leading-relaxed">{q.question}</p>

                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = currentScore === opt.points;

                      return (
                        <button
                          key={oIdx}
                          onClick={() => setHealthScore(q.id, opt.points)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs sm:text-sm flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-blue-500/15 border-blue-400 text-white shadow-sm'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <p className="font-semibold">{opt.label}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{opt.description}</p>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-blue-400 bg-blue-500'
                                : 'border-slate-600'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
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
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-500 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>
            Educational self-assessment only. This tool is designed to highlight basic financial
            literacy concepts and does not constitute formal financial underwriting or fiduciary
            advice.
          </span>
        </div>
      </div>
    </AppShell>
  );
}
