'use client';

import React, { useState, useMemo } from 'react';
import { calculateSavingsGoal } from '../../lib/calculations';
import { formatINR } from '../../lib/formatters';
import { CheckCircle2, AlertCircle, HelpCircle, Info, Target } from 'lucide-react';

interface SavingsGoalCalcProps {
  initialValues?: {
    targetAmount?: number;
    currentSavings?: number;
    monthlyContribution?: number;
    expectedReturn?: number;
    targetDuration?: number;
  };
}

export function SavingsGoalCalc({ initialValues }: SavingsGoalCalcProps) {
  const [targetAmount, setTargetAmount] = useState<number>(
    initialValues?.targetAmount ?? 500000
  );
  const [currentSavings, setCurrentSavings] = useState<number>(
    initialValues?.currentSavings ?? 50000
  );
  const [monthlyContribution, setMonthlyContribution] = useState<number>(
    initialValues?.monthlyContribution ?? 10000
  );
  const [expectedReturn, setExpectedReturn] = useState<number>(
    initialValues?.expectedReturn ?? 10
  );
  const [targetDuration, setTargetDuration] = useState<number>(
    initialValues?.targetDuration ?? 3
  );

  const result = useMemo(() => {
    return calculateSavingsGoal(
      targetAmount,
      currentSavings,
      monthlyContribution,
      expectedReturn,
      targetDuration
    );
  }, [targetAmount, currentSavings, monthlyContribution, expectedReturn, targetDuration]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl">
      <div className="flex items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Savings Goal & Target Planner
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Reverse-engineer your financial goals and find out your exact required monthly savings.
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 font-semibold shrink-0">
          Target-Date Math
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-5">
          {/* Target Amount */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Target Goal Amount</label>
              <div className="flex items-center gap-1 font-mono font-bold text-blue-400 text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="5000"
                  max="100000000"
                  step="25000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Math.max(5000, Number(e.target.value)))}
                  className="w-28 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-right text-blue-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="50000"
              max="5000000"
              step="25000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹50,000</span>
              <span>₹25 L</span>
              <span>₹50 L</span>
            </div>
          </div>

          {/* Current Savings */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Current Savings Today</label>
              <div className="flex items-center gap-1 font-mono font-bold text-teal-400 text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="0"
                  max="20000000"
                  step="10000"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Math.max(0, Number(e.target.value)))}
                  className="w-28 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-right text-teal-300 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="1000000"
              step="10000"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          {/* Monthly Contribution */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Planned Monthly Contribution</label>
              <div className="flex items-center gap-1 font-mono font-bold text-emerald-400 text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="0"
                  max="500000"
                  step="1000"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
                  className="w-24 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-right text-emerald-300 focus:outline-none focus:border-emerald-500"
                />
                <span className="text-slate-500 text-xs">/mo</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Timeline in Years */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Target Deadline</label>
              <span className="font-mono font-bold text-purple-400 text-sm">
                {targetDuration} Years
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={targetDuration}
              onChange={(e) => setTargetDuration(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          {/* Expected Return */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Expected Annual Return</label>
              <span className="font-mono font-bold text-amber-400 text-sm">{expectedReturn}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="18"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-5">
          <div
            className={`p-5 rounded-2xl border shadow-lg ${
              result.isOnTrack
                ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-teal-950/30 border-emerald-500/30'
                : 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/30'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Goal Status
              </span>
              {result.isOnTrack ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  On Track!
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Shortfall Warning
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400">Projected Accumulated Corpus</p>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono mt-1">
              {formatINR(result.projectedSavings)}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Target: {formatINR(targetAmount)} in {targetDuration} years
            </p>

            {/* Required Monthly Contribution Callout */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-400 font-medium">
                Required Monthly SIP to Hit Goal Exactly:
              </p>
              <p className="text-2xl font-bold text-blue-400 font-mono mt-0.5">
                {formatINR(result.requiredMonthlyContribution)}
                <span className="text-xs font-normal text-slate-400 ml-1">/month</span>
              </p>

              {!result.isOnTrack && (
                <p className="text-xs text-amber-400 mt-2">
                  Increase your monthly contribution by{' '}
                  <span className="font-bold">
                    {formatINR(result.requiredMonthlyContribution - monthlyContribution)}/mo
                  </span>{' '}
                  to reach your target on time.
                </p>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">Goal Architecture: </span>
              Tagging specific investments to named milestones (e.g. &quot;Car Down Payment&quot;,
              &quot;Emergency Fund&quot;) dramatically increases adherence and prevents dipping into
              retirement funds prematurely.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center gap-2">
        <HelpCircle className="w-3.5 h-3.5 shrink-0" />
        <span>
          Educational estimate only. Actual returns, interest rates, taxes and investment outcomes
          may differ.
        </span>
      </div>
    </div>
  );
}
