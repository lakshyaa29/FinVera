'use client';

import React, { useState, useMemo } from 'react';
import { calculateSIP } from '../../lib/calculations';
import { formatINR } from '../../lib/formatters';
import { CalculatorGrowthChart } from './CalculatorGrowthChart';
import { Sparkles, Info, HelpCircle } from 'lucide-react';

interface SipCalculatorProps {
  initialValues?: {
    monthlySip?: number;
    years?: number;
    expectedReturn?: number;
  };
  compact?: boolean;
}

export function SipCalculator({ initialValues, compact = false }: SipCalculatorProps) {
  const [monthlySip, setMonthlySip] = useState<number>(initialValues?.monthlySip ?? 5000);
  const [years, setYears] = useState<number>(initialValues?.years ?? 10);
  const [expectedReturn, setExpectedReturn] = useState<number>(
    initialValues?.expectedReturn ?? 12
  );

  const result = useMemo(() => {
    return calculateSIP(monthlySip, years, expectedReturn);
  }, [monthlySip, years, expectedReturn]);

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
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-[#171717]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#6C8CFF] border-2 border-[#171717] rounded-full inline-block" />
            <h3 className="text-xl sm:text-2xl font-black font-space-grotesk text-[#171717] tracking-tight">
              SIP (Systematic Investment Plan) Calculator
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#171717]/75 mt-1">
            Calculate your mutual fund wealth accumulation through disciplined monthly compounding.
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded bg-[#6C8CFF] text-[#FFFFFF] border-2 border-[#171717] font-black uppercase tracking-wider shadow-[2px_2px_0px_#171717] shrink-0 self-start sm:self-auto">
          Rupee Cost Averaging
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-4">
          {/* Monthly SIP Amount */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Monthly SIP Amount</label>
              <div className="flex items-center gap-1 font-mono font-black text-[#171717] text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="100"
                  max="500000"
                  step="500"
                  value={monthlySip}
                  onChange={(e) => setMonthlySip(Math.max(100, Number(e.target.value)))}
                  className="w-28 bg-[#FFFFFF] border-2 border-[#171717] px-2.5 py-1 rounded-lg text-right text-[#171717] font-bold font-mono focus:outline-none focus:bg-[#FFF9D2] shadow-[1px_1px_0px_#171717]"
                />
              </div>
            </div>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={monthlySip}
              onChange={(e) => setMonthlySip(Number(e.target.value))}
              className="w-full accent-[#6C8CFF] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#171717]/60 font-bold font-mono">
              <span>₹500</span>
              <span>₹25,000</span>
              <span>₹50,000</span>
            </div>
          </div>

          {/* Investment Duration */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Investment Horizon</label>
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
              <span>7% (Conservative)</span>
              <span>12% (Nifty 50)</span>
              <span>15% (Aggressive)</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-xl bg-[#6C8CFF] border-3 border-[#171717] shadow-[4px_4px_0px_#171717]">
            <p className="text-xs font-black text-[#FFFFFF] uppercase tracking-wider mb-1 font-mono">
              ● Estimated Final Corpus
            </p>
            <div className="text-3xl sm:text-4xl font-black text-[#FFFFFF] tracking-tight font-space-grotesk">
              {formatINR(result.totalValue)}
            </div>
            <p className="text-xs font-bold text-[#FFFFFF]/90 mt-1">
              From {formatINR(monthlySip)} invested every month across {years * 12} installments
            </p>

            <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t-2 border-[#171717]">
              <div className="bg-[#FFFFFF] border-2 border-[#171717] p-3 rounded-lg shadow-[2px_2px_0px_#171717]">
                <p className="text-[10px] uppercase tracking-wider font-black text-[#171717]/70">Amount Invested</p>
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

            {result.totalInvested > 0 && (
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD84D] text-[#171717] border-2 border-[#171717] text-xs font-black shadow-[2px_2px_0px_#171717]">
                <Sparkles className="w-3.5 h-3.5 text-[#171717]" />
                <span>
                  Gain represents{' '}
                  {Math.round((result.estimatedReturns / result.totalValue) * 100)}% of your total wealth
                </span>
              </div>
            )}
          </div>

          {!compact && <CalculatorGrowthChart data={chartData} />}

          <div className="p-4 rounded-xl bg-[#FFF9D2] border-2 border-[#171717] text-xs text-[#171717] flex items-start gap-2.5 shadow-[2px_2px_0px_#171717]">
            <Info className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
            <div className="font-medium leading-relaxed">
              <span className="font-black text-[#171717]">SIP Averaging Advantage: </span>
              Investing ₹{monthlySip.toLocaleString('en-IN')} automatically removes market-timing
              anxiety and buys more mutual fund units whenever markets take a dip.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t-2 border-[#171717] text-[11px] font-bold text-[#171717]/60 flex items-center gap-2">
        <HelpCircle className="w-4 h-4 shrink-0 text-[#171717]" />
        <span>
          Educational estimate only. Actual mutual fund returns and taxations will differ.
        </span>
      </div>
    </div>
  );
}
