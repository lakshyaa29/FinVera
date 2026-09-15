'use client';

import React, { useState, useMemo } from 'react';
import { calculateSavingsGoal } from '../../lib/calculations';
import { formatINR } from '../../lib/formatters';
import { CheckCircle2, AlertCircle, HelpCircle, Info, Target, Sparkles } from 'lucide-react';

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
    <div className="bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-6 sm:p-7 shadow-[5px_5px_0px_#171717]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-[#171717]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#70E000] border-2 border-[#171717] rounded-full inline-block" />
            <h3 className="text-xl sm:text-2xl font-black font-space-grotesk text-[#171717] tracking-tight">
              Savings Goal & Target Planner
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#171717]/75 mt-1">
            Reverse-engineer your milestones and calculate your required monthly investment.
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded bg-[#70E000] text-[#171717] border-2 border-[#171717] font-black uppercase tracking-wider shadow-[2px_2px_0px_#171717] shrink-0 self-start sm:self-auto">
          Target-Date Math
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-4">
          {/* Target Amount */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Target Goal Amount</label>
              <div className="flex items-center gap-1 font-mono font-black text-[#171717] text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="5000"
                  max="100000000"
                  step="25000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Math.max(5000, Number(e.target.value)))}
                  className="w-32 bg-[#FFFFFF] border-2 border-[#171717] px-2.5 py-1 rounded-lg text-right text-[#171717] font-bold font-mono focus:outline-none focus:bg-[#FFF9D2] shadow-[1px_1px_0px_#171717]"
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
              className="w-full accent-[#70E000] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#171717]/60 font-bold font-mono">
              <span>₹50,000</span>
              <span>₹25 Lakh</span>
              <span>₹50 Lakh</span>
            </div>
          </div>

          {/* Current Savings */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Current Savings Today</label>
              <div className="flex items-center gap-1 font-mono font-black text-[#171717] text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="0"
                  max="20000000"
                  step="10000"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Math.max(0, Number(e.target.value)))}
                  className="w-32 bg-[#FFFFFF] border-2 border-[#171717] px-2.5 py-1 rounded-lg text-right text-[#171717] font-bold font-mono focus:outline-none focus:bg-[#FFF9D2] shadow-[1px_1px_0px_#171717]"
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
              className="w-full accent-[#6C8CFF] cursor-pointer"
            />
          </div>

          {/* Monthly Contribution */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Planned Monthly Contribution</label>
              <div className="flex items-center gap-1 font-mono font-black text-[#171717] text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="0"
                  max="500000"
                  step="1000"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
                  className="w-28 bg-[#FFFFFF] border-2 border-[#171717] px-2.5 py-1 rounded-lg text-right text-[#171717] font-bold font-mono focus:outline-none focus:bg-[#FFF9D2] shadow-[1px_1px_0px_#171717]"
                />
                <span className="text-[#171717]/60 text-xs font-bold">/mo</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full accent-[#70E000] cursor-pointer"
            />
          </div>

          {/* Timeline in Years */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Target Horizon</label>
              <span className="font-mono font-black text-[#171717] text-sm px-2 py-0.5 bg-[#6C8CFF]/20 border border-[#171717] rounded">
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
              className="w-full accent-[#6C8CFF] cursor-pointer"
            />
          </div>

          {/* Expected Return */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Expected Annual Return</label>
              <span className="font-mono font-black text-[#171717] text-sm px-2 py-0.5 bg-[#FFD84D] border border-[#171717] rounded">
                {expectedReturn}%
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="18"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full accent-[#FF5C35] cursor-pointer"
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className={`p-6 rounded-xl border-3 border-[#171717] shadow-[4px_4px_0px_#171717] ${
              result.isOnTrack
                ? 'bg-[#70E000]'
                : 'bg-[#FFD84D]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#171717]">
                ● Goal Readiness
              </span>
              {result.isOnTrack ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFFFFF] text-[#171717] border-2 border-[#171717] text-xs font-black shadow-[2px_2px_0px_#171717]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#171717]" />
                  ON TRACK
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FF5C35] text-[#FFFFFF] border-2 border-[#171717] text-xs font-black shadow-[2px_2px_0px_#171717]">
                  <AlertCircle className="w-3.5 h-3.5 text-[#FFFFFF]" />
                  SHORTFALL GAP
                </span>
              )}
            </div>

            <p className="text-xs font-black uppercase tracking-wider text-[#171717]/70">Projected Accumulated Corpus</p>
            <div className="text-3xl sm:text-4xl font-black text-[#171717] tracking-tight font-space-grotesk mt-1">
              {formatINR(result.projectedSavings)}
            </div>
            <p className="text-xs font-bold text-[#171717]/80 mt-1">
              Target: <span className="font-black underline">{formatINR(targetAmount)}</span> in {targetDuration} years
            </p>

            {/* Required Monthly Contribution Callout */}
            <div className="mt-5 pt-4 border-t-2 border-[#171717]">
              <p className="text-xs text-[#171717] font-black uppercase tracking-wider">
                Required Monthly Investment to Hit Goal Exactly:
              </p>
              <div className="flex items-baseline gap-1 mt-1 bg-[#FFFFFF] border-2 border-[#171717] p-3 rounded-lg shadow-[2px_2px_0px_#171717]">
                <span className="text-2xl sm:text-3xl font-black text-[#171717] font-space-grotesk">
                  {formatINR(result.requiredMonthlyContribution)}
                </span>
                <span className="text-xs font-bold text-[#171717]/60">/month</span>
              </div>

              {!result.isOnTrack && (
                <div className="mt-3 p-3 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] text-xs text-[#171717] leading-relaxed font-bold shadow-[2px_2px_0px_#171717]">
                  Increase your monthly contribution by{' '}
                  <span className="font-black bg-[#FF5C35] text-[#FFFFFF] px-1 py-0.5 rounded">
                    {formatINR(result.requiredMonthlyContribution - monthlyContribution)}/mo
                  </span>{' '}
                  to achieve this goal on schedule.
                </div>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFF9D2] border-2 border-[#171717] text-xs text-[#171717] flex items-start gap-2.5 shadow-[2px_2px_0px_#171717]">
            <Info className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
            <div className="font-medium leading-relaxed">
              <span className="font-black text-[#171717]">Goal Architecture Tip: </span>
              Tagging specific investments to named milestones (such as &quot;Home Down Payment&quot; or &quot;Higher Education&quot;) dramatically improves savings consistency and protects retirement reserves.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t-2 border-[#171717] text-[11px] font-bold text-[#171717]/60 flex items-center gap-2">
        <HelpCircle className="w-4 h-4 shrink-0 text-[#171717]" />
        <span>
          Educational estimate only. Actual returns, interest rates, compounding frequency and market conditions may vary.
        </span>
      </div>
    </div>
  );
}
