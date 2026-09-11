'use client';

import React, { useState, useMemo } from 'react';
import { calculateEMI } from '../../lib/calculations';
import { formatINR } from '../../lib/formatters';
import { HelpCircle, Info, CreditCard } from 'lucide-react';

interface EmiCalculatorProps {
  initialValues?: {
    loanAmount?: number;
    interestRate?: number;
    loanDuration?: number;
  };
}

export function EmiCalculator({ initialValues }: EmiCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState<number>(initialValues?.loanAmount ?? 2500000);
  const [interestRate, setInterestRate] = useState<number>(initialValues?.interestRate ?? 8.5);
  const [loanDuration, setLoanDuration] = useState<number>(initialValues?.loanDuration ?? 20);

  const result = useMemo(() => {
    return calculateEMI(loanAmount, interestRate, loanDuration);
  }, [loanAmount, interestRate, loanDuration]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl">
      <div className="flex items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Loan EMI & Interest Calculator
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Calculate your exact monthly installments and uncover the true interest cost of loans.
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold shrink-0">
          Reducing Balance
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-5">
          {/* Loan Amount */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Loan Principal Amount</label>
              <div className="flex items-center gap-1 font-mono font-bold text-amber-400 text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="10000"
                  max="50000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Math.max(10000, Number(e.target.value)))}
                  className="w-28 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-right text-amber-300 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="50000"
              max="10000000"
              step="50000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹50k</span>
              <span>₹50 L</span>
              <span>₹1 Cr</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Annual Interest Rate</label>
              <span className="font-mono font-bold text-amber-400 text-sm">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="24"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>8.5% (Home)</span>
              <span>10.5% (Car)</span>
              <span>15% (Personal)</span>
            </div>
          </div>

          {/* Loan Duration */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Loan Tenure</label>
              <span className="font-mono font-bold text-teal-400 text-sm">{loanDuration} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={loanDuration}
              onChange={(e) => setLoanDuration(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>1 yr</span>
              <span>15 yrs</span>
              <span>30 yrs</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 shadow-lg">
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              Monthly EMI Payment
            </p>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              {formatINR(result.monthlyEmi)}
              <span className="text-sm font-normal text-slate-400 ml-1">/month</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              For {loanDuration * 12} monthly installments
            </p>

            <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-800">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Total Interest Payable</p>
                <p className="text-base sm:text-lg font-bold text-rose-400 font-mono">
                  {formatINR(result.totalInterest)}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Total Amount Payable</p>
                <p className="text-base sm:text-lg font-bold text-slate-200 font-mono">
                  {formatINR(result.totalPayment)}
                </p>
              </div>
            </div>

            {/* Principal vs Interest Ratio Bar */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-teal-400">Principal: {Math.round(result.principalPercent)}%</span>
                <span className="text-amber-400">Interest: {Math.round(result.interestPercent)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${result.principalPercent}%` }}
                  className="h-full bg-teal-500"
                />
                <div
                  style={{ width: `${result.interestPercent}%` }}
                  className="h-full bg-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">Prepayment Pro Tip: </span>
              Prepaying just 1 extra monthly EMI each year on a 20-year loan can shave off up to 4
              years of loan tenure and save lakhs of rupees in interest.
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
