'use client';

import React, { useState, useMemo } from 'react';
import { calculateInflation } from '../../lib/calculations';
import { formatINR } from '../../lib/formatters';
import { TrendingDown, HelpCircle, Info } from 'lucide-react';

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
    <div className="bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-6 sm:p-7 shadow-[5px_5px_0px_#171717]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-[#171717]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#FF5C35] border-2 border-[#171717] rounded-full inline-block" />
            <h3 className="text-xl sm:text-2xl font-black font-space-grotesk text-[#171717] tracking-tight">
              Inflation & Purchasing Power Calculator
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#171717]/75 mt-1">
            Discover why uninvested cash silently loses value over the years.
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded bg-[#FF5C35] text-[#FFFFFF] border-2 border-[#171717] font-black uppercase tracking-wider shadow-[2px_2px_0px_#171717] shrink-0 self-start sm:self-auto">
          The Silent Tax
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-4">
          {/* Current Cost / Amount */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Current Cost / Living Expense</label>
              <div className="flex items-center gap-1 font-mono font-black text-[#171717] text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="1000"
                  max="10000000"
                  step="5000"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(Math.max(1000, Number(e.target.value)))}
                  className="w-32 bg-[#FFFFFF] border-2 border-[#171717] px-2.5 py-1 rounded-lg text-right text-[#171717] font-bold font-mono focus:outline-none focus:bg-[#FFF9D2] shadow-[1px_1px_0px_#171717]"
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
              className="w-full accent-[#FF5C35] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#171717]/60 font-bold font-mono">
              <span>₹10,000</span>
              <span>₹5 Lakhs</span>
              <span>₹10 Lakhs</span>
            </div>
          </div>

          {/* Inflation Rate */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Annual Inflation Rate</label>
              <span className="font-mono font-black text-[#171717] text-sm px-2 py-0.5 bg-[#FF5C35]/20 border border-[#171717] rounded">
                {inflationRate}%
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full accent-[#FF5C35] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#171717]/60 font-bold font-mono">
              <span>3% (Low)</span>
              <span>6% (India Avg)</span>
              <span>10% (Lifestyle)</span>
            </div>
          </div>

          {/* Time in Years */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Time Horizon</label>
              <span className="font-mono font-black text-[#171717] text-sm px-2 py-0.5 bg-[#70E000] border border-[#171717] rounded">
                {years} Years
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="35"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-[#70E000] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#171717]/60 font-bold font-mono">
              <span>1 yr</span>
              <span>15 yrs</span>
              <span>35 yrs</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-xl bg-[#FFF9D2] border-3 border-[#171717] shadow-[4px_4px_0px_#171717]">
            <p className="text-xs font-black text-[#FF5C35] uppercase tracking-wider mb-1 font-mono">
              ● Estimated Future Cost
            </p>
            <div className="text-3xl sm:text-4xl font-black text-[#171717] tracking-tight font-space-grotesk">
              {formatINR(result.futureCost)}
            </div>
            <p className="text-xs font-medium text-[#171717] mt-2 leading-relaxed">
              What costs <span className="font-black underline">{formatINR(currentAmount)}</span> today
              will require approximately{' '}
              <span className="font-black text-[#FF5C35]">{formatINR(result.futureCost)}</span> in{' '}
              {years} years at {inflationRate}% annual inflation.
            </p>

            {/* Purchasing Power Loss Meter */}
            <div className="mt-5 pt-4 border-t-2 border-[#171717]">
              <div className="flex justify-between text-xs mb-1.5 font-black">
                <span className="text-[#171717] uppercase tracking-wider">Purchasing Power Lost</span>
                <span className="text-[#FF5C35] font-mono font-black">
                  -{result.purchasingPowerLossPercent}%
                </span>
              </div>
              <div className="w-full h-4 bg-[#FFFFFF] border-2 border-[#171717] rounded-full overflow-hidden p-0.5">
                <div
                  style={{ width: `${result.purchasingPowerLossPercent}%` }}
                  className="h-full bg-[#FF5C35] rounded-full transition-all duration-500"
                />
              </div>
              <p className="text-xs font-bold text-[#171717]/80 mt-2">
                Uninvested cash of {formatINR(currentAmount)} will buy only{' '}
                <span className="font-black text-[#171717] bg-[#FFD84D] px-1 py-0.5 rounded border border-[#171717] font-mono">
                  {formatINR(result.equivalentTodayPower)}
                </span>{' '}
                worth of goods in {years} years.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border-2 border-[#171717] text-xs text-[#171717] flex items-start gap-2.5 shadow-[2px_2px_0px_#171717]">
            <Info className="w-4 h-4 text-[#FF5C35] shrink-0 mt-0.5" />
            <div className="font-medium leading-relaxed">
              <span className="font-black text-[#171717]">The Inflation Defense: </span>
              To protect your family&apos;s purchasing power, long-term savings must compound faster than
              inflation through diversified equities, index funds, and productive assets.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t-2 border-[#171717] text-[11px] font-bold text-[#171717]/60 flex items-center gap-2">
        <HelpCircle className="w-4 h-4 shrink-0 text-[#171717]" />
        <span>
          Educational estimate only. Actual inflation rates vary by consumer category.
        </span>
      </div>
    </div>
  );
}
