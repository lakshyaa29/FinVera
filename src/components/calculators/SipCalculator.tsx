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
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl">
      {/* Title */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              SIP (Systematic Investment Plan) Calculator
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Calculate your mutual fund wealth accumulation through disciplined monthly investing.
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/30 font-semibold shrink-0">
          Rupee Cost Averaging
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-5">
          {/* Monthly SIP Amount */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Monthly SIP Amount</label>
              <div className="flex items-center gap-1 font-mono font-bold text-teal-400 text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="100"
                  max="500000"
                  step="500"
                  value={monthlySip}
                  onChange={(e) => setMonthlySip(Math.max(100, Number(e.target.value)))}
                  className="w-24 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-right text-teal-300 focus:outline-none focus:border-teal-500"
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
              className="w-full accent-teal-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹500</span>
              <span>₹25,000</span>
              <span>₹50,000</span>
            </div>
          </div>

          {/* Investment Duration */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Investment Period</label>
              <span className="font-mono font-bold text-emerald-400 text-sm">{years} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="35"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
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
              <label className="font-semibold text-slate-300">Expected Annual Return (CAGR)</label>
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
              <span>7% (Conservative)</span>
              <span>12% (Nifty 50)</span>
              <span>15% (Aggressive)</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-950/40 via-slate-900 to-emerald-950/30 border border-teal-500/30 shadow-lg">
            <p className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-1">
              Estimated Final Corpus
            </p>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              {formatINR(result.totalValue)}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              From {formatINR(monthlySip)} invested every month across {years * 12} installments
            </p>

            <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-800">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Total Amount Invested</p>
                <p className="text-base sm:text-lg font-bold text-slate-200 font-mono">
                  {formatINR(result.totalInvested)}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Estimated Wealth Gained</p>
                <p className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                  +{formatINR(result.estimatedReturns)}
                </p>
              </div>
            </div>

            {result.totalInvested > 0 && (
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  Gain makes up{' '}
                  {Math.round((result.estimatedReturns / result.totalValue) * 100)}% of your total
                  wealth
                </span>
              </div>
            )}
          </div>

          {!compact && <CalculatorGrowthChart data={chartData} />}

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">SIP Discipline Advantage: </span>
              Investing ₹{monthlySip.toLocaleString('en-IN')} each month removes market-timing
              anxiety and automatically accumulates more mutual fund units when prices are down.
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
