'use client';

import React, { useState, useMemo } from 'react';
import { calculateCompoundInterest } from '../../lib/calculations';
import { formatINR } from '../../lib/formatters';
import { CalculatorGrowthChart } from './CalculatorGrowthChart';
import { Sparkles, Info, HelpCircle } from 'lucide-react';

interface CompoundInterestCalcProps {
  initialValues?: {
    initialAmount?: number;
    monthlyContribution?: number;
    years?: number;
    expectedReturn?: number;
  };
  compact?: boolean;
}

export function CompoundInterestCalc({
  initialValues,
  compact = false,
}: CompoundInterestCalcProps) {
  const [initialAmount, setInitialAmount] = useState<number>(
    initialValues?.initialAmount ?? 25000
  );
  const [monthlyContribution, setMonthlyContribution] = useState<number>(
    initialValues?.monthlyContribution ?? 2500
  );
  const [years, setYears] = useState<number>(initialValues?.years ?? 10);
  const [expectedReturn, setExpectedReturn] = useState<number>(
    initialValues?.expectedReturn ?? 12
  );

  const result = useMemo(() => {
    return calculateCompoundInterest(
      initialAmount,
      monthlyContribution,
      years,
      expectedReturn
    );
  }, [initialAmount, monthlyContribution, years, expectedReturn]);

  const chartData = useMemo(() => {
    return result.yearlyBreakdown.map((item) => ({
      year: item.year,
      invested: item.totalInvested,
      returns: item.estimatedReturns,
      total: item.totalValue,
    }));
  }, [result]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl">
      {/* Title & Badge */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Compound Interest Calculator
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            See how recurring investments multiply exponentially over time.
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold shrink-0">
          Monthly Compounding
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Inputs Section */}
        <div className="lg:col-span-6 space-y-5">
          {/* Initial Amount */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Initial Investment</label>
              <div className="flex items-center gap-1 font-mono font-bold text-emerald-400 text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="0"
                  max="10000000"
                  step="5000"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Math.max(0, Number(e.target.value)))}
                  className="w-28 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-right text-emerald-300 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="1000000"
              step="5000"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹0</span>
              <span>₹5 L</span>
              <span>₹10 L</span>
            </div>
          </div>

          {/* Monthly Contribution */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Monthly Contribution</label>
              <div className="flex items-center gap-1 font-mono font-bold text-emerald-400 text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="0"
                  max="200000"
                  step="500"
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
              max="50000"
              step="500"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹0</span>
              <span>₹25,000</span>
              <span>₹50,000</span>
            </div>
          </div>

          {/* Duration in Years */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Investment Duration</label>
              <span className="font-mono font-bold text-teal-400 text-sm">{years} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="35"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>1 yr</span>
              <span>15 yrs</span>
              <span>35 yrs</span>
            </div>
          </div>

          {/* Expected Annual Return */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Expected Annual Return (p.a.)</label>
              <span className="font-mono font-bold text-amber-400 text-sm">{expectedReturn}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>1% (Savings)</span>
              <span>7% (FD)</span>
              <span>12% (Nifty 50)</span>
              <span>25%</span>
            </div>
          </div>
        </div>

        {/* Right Output & Results Cards */}
        <div className="lg:col-span-6 space-y-5">
          {/* Main Terminal Value Highlight */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-teal-950/30 border border-emerald-500/30 shadow-lg">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              Estimated Final Value
            </p>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              {formatINR(result.totalValue)}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              In {years} years at {expectedReturn}% expected annual compounding
            </p>

            {/* Split Metrics */}
            <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-800">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Total Invested</p>
                <p className="text-base sm:text-lg font-bold text-teal-300 font-mono">
                  {formatINR(result.totalInvested)}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Estimated Wealth Gain</p>
                <p className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                  +{formatINR(result.estimatedReturns)}
                </p>
              </div>
            </div>

            {/* Wealth Multiplier Pill */}
            {result.totalInvested > 0 && (
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {(result.totalValue / result.totalInvested).toFixed(1)}x Wealth Multiplier
                </span>
              </div>
            )}
          </div>

          {/* Visual Growth Chart */}
          {!compact && <CalculatorGrowthChart data={chartData} />}

          {/* Educational Insight */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">The Power of Compounding: </span>
              Your total estimated gain of {formatINR(result.estimatedReturns)} represents money
              created purely by interest on previous interest, surpassing your original effort.
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
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
