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
    <div className="bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-6 sm:p-7 shadow-[5px_5px_0px_#171717]">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-[#171717]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#70E000] border-2 border-[#171717] rounded-full inline-block" />
            <h3 className="text-xl sm:text-2xl font-black font-space-grotesk text-[#171717] tracking-tight">
              Compound Interest Calculator
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#171717]/75 mt-1">
            See how recurring investments multiply exponentially over time through compounding.
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded bg-[#FFD84D] text-[#171717] border-2 border-[#171717] font-black uppercase tracking-wider shadow-[2px_2px_0px_#171717] shrink-0 self-start sm:self-auto">
          Monthly Compounding
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Inputs Section */}
        <div className="lg:col-span-6 space-y-4">
          {/* Initial Amount */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Initial Principal</label>
              <div className="flex items-center gap-1 font-mono font-black text-[#171717] text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="0"
                  max="10000000"
                  step="5000"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Math.max(0, Number(e.target.value)))}
                  className="w-32 bg-[#FFFFFF] border-2 border-[#171717] px-2.5 py-1 rounded-lg text-right text-[#171717] font-bold font-mono focus:outline-none focus:bg-[#FFF9D2] shadow-[1px_1px_0px_#171717]"
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
              className="w-full accent-[#70E000] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#171717]/60 font-bold font-mono">
              <span>₹0</span>
              <span>₹5 Lakhs</span>
              <span>₹10 Lakhs</span>
            </div>
          </div>

          {/* Monthly Contribution */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Monthly Contribution</label>
              <div className="flex items-center gap-1 font-mono font-black text-[#171717] text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="0"
                  max="200000"
                  step="500"
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
              max="50000"
              step="500"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full accent-[#70E000] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#171717]/60 font-bold font-mono">
              <span>₹0</span>
              <span>₹25,000</span>
              <span>₹50,000</span>
            </div>
          </div>

          {/* Duration in Years */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Investment Horizon</label>
              <span className="font-mono font-black text-[#171717] text-sm px-2 py-0.5 bg-[#6C8CFF]/20 border border-[#171717] rounded">
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
              className="w-full accent-[#6C8CFF] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#171717]/60 font-bold font-mono">
              <span>1 yr</span>
              <span>15 yrs</span>
              <span>35 yrs</span>
            </div>
          </div>

          {/* Expected Annual Return */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Expected Annual Return (CAGR)</label>
              <span className="font-mono font-black text-[#171717] text-sm px-2 py-0.5 bg-[#FFD84D] border border-[#171717] rounded">
                {expectedReturn}%
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full accent-[#FF5C35] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#171717]/60 font-bold font-mono">
              <span>3% (Savings)</span>
              <span>7% (FD)</span>
              <span>12% (Nifty 50)</span>
              <span>25%</span>
            </div>
          </div>
        </div>

        {/* Right Output & Results Cards */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Terminal Value Highlight */}
          <div className="p-6 rounded-xl bg-[#70E000] border-3 border-[#171717] shadow-[4px_4px_0px_#171717]">
            <p className="text-xs font-black text-[#171717] uppercase tracking-wider mb-1 font-mono">
              ● Estimated Final Maturity Value
            </p>
            <div className="text-3xl sm:text-4xl font-black text-[#171717] tracking-tight font-space-grotesk">
              {formatINR(result.totalValue)}
            </div>
            <p className="text-xs font-bold text-[#171717]/80 mt-1">
              In {years} years at {expectedReturn}% expected compounding
            </p>

            {/* Split Metrics */}
            <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t-2 border-[#171717]">
              <div className="bg-[#FFFFFF] border-2 border-[#171717] p-3 rounded-lg shadow-[2px_2px_0px_#171717]">
                <p className="text-[10px] uppercase tracking-wider font-black text-[#171717]/70">Total Principal</p>
                <p className="text-base sm:text-lg font-black text-[#171717] font-mono mt-0.5">
                  {formatINR(result.totalInvested)}
                </p>
              </div>
              <div className="bg-[#FFFFFF] border-2 border-[#171717] p-3 rounded-lg shadow-[2px_2px_0px_#171717]">
                <p className="text-[10px] uppercase tracking-wider font-black text-[#171717]/70">Wealth Gained</p>
                <p className="text-base sm:text-lg font-black text-[#047857] font-mono mt-0.5">
                  +{formatINR(result.estimatedReturns)}
                </p>
              </div>
            </div>

            {/* Wealth Multiplier Pill */}
            {result.totalInvested > 0 && (
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFFFFF] text-[#171717] border-2 border-[#171717] text-xs font-black shadow-[2px_2px_0px_#171717]">
                <Sparkles className="w-3.5 h-3.5 text-[#171717]" />
                <span>
                  {(result.totalValue / result.totalInvested).toFixed(1)}x Wealth Multiplier
                </span>
              </div>
            )}
          </div>

          {/* Visual Growth Chart */}
          {!compact && <CalculatorGrowthChart data={chartData} />}

          {/* Educational Insight */}
          <div className="p-4 rounded-xl bg-[#FFF9D2] border-2 border-[#171717] text-xs text-[#171717] flex items-start gap-2.5 shadow-[2px_2px_0px_#171717]">
            <Info className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
            <div className="font-medium leading-relaxed">
              <span className="font-black text-[#171717]">The Power of Compounding: </span>
              Your total estimated gain of {formatINR(result.estimatedReturns)} represents wealth created
              purely by return-on-returns, working for you while you sleep.
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="mt-6 pt-4 border-t-2 border-[#171717] text-[11px] font-bold text-[#171717]/60 flex items-center gap-2">
        <HelpCircle className="w-4 h-4 shrink-0 text-[#171717]" />
        <span>
          Educational mathematical estimate only. Actual market returns, interest rates, and tax outcomes
          will vary.
        </span>
      </div>
    </div>
  );
}
