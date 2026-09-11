'use client';

import React, { useState, useMemo } from 'react';
import { calculateInflation } from '../../lib/calculations';
import { formatINR } from '../../lib/formatters';
import { TrendingDown, HelpCircle, Info, Flame } from 'lucide-react';

interface InflationCalculatorProps {
  initialValues?: {
    currentAmount?: number;
    inflationRate?: number;
    years?: number;
  };
}

export function InflationCalculator({ initialValues }: InflationCalculatorProps) {
  const [currentAmount, setCurrentAmount] = useState<number>(
    initialValues?.currentAmount ?? 100000
  );
  const [inflationRate, setInflationRate] = useState<number>(
    initialValues?.inflationRate ?? 6
  );
  const [years, setYears] = useState<number>(initialValues?.years ?? 10);

  const result = useMemo(() => {
    return calculateInflation(currentAmount, inflationRate, years);
  }, [currentAmount, inflationRate, years]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl">
      <div className="flex items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping" />
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Inflation & Purchasing Power Calculator
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Discover why uninvested money silently evaporates over the years.
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 font-semibold shrink-0">
          The Silent Tax
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-5">
          {/* Current Cost / Amount */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Current Cost / Living Expense</label>
              <div className="flex items-center gap-1 font-mono font-bold text-rose-400 text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="1000"
                  max="10000000"
                  step="5000"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(Math.max(1000, Number(e.target.value)))}
                  className="w-28 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-right text-rose-300 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="5000"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹10,000</span>
              <span>₹5,00,000</span>
              <span>₹10,00,000</span>
            </div>
          </div>

          {/* Inflation Rate */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Annual Inflation Rate</label>
              <span className="font-mono font-bold text-amber-400 text-sm">{inflationRate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>3% (Low)</span>
              <span>6% (India Avg)</span>
              <span>10% (Lifestyle/Medical)</span>
            </div>
          </div>

          {/* Time in Years */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Time Horizon</label>
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
        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-amber-950/30 border border-rose-500/30 shadow-lg">
            <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
              Estimated Future Cost
            </p>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              {formatINR(result.futureCost)}
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              What costs <span className="font-bold text-white">{formatINR(currentAmount)}</span> today
              will require approximately{' '}
              <span className="font-bold text-rose-400">{formatINR(result.futureCost)}</span> in{' '}
              {years} years at {inflationRate}% annual inflation.
            </p>

            {/* Purchasing Power Loss Meter */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">Purchasing Power Lost</span>
                <span className="text-rose-400 font-bold font-mono">
                  -{result.purchasingPowerLossPercent}%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  style={{ width: `${result.purchasingPowerLossPercent}%` }}
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Uninvested cash of {formatINR(currentAmount)} will buy only{' '}
                <span className="font-bold text-amber-300 font-mono">
                  {formatINR(result.equivalentTodayPower)}
                </span>{' '}
                worth of goods in {years} years.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">The Inflation Defense: </span>
              To protect your family’s purchasing power, your long-term investments must generate
              returns higher than inflation (i.e. positive &quot;real returns&quot;) through equity
              mutual funds, real productive assets, and gold.
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
