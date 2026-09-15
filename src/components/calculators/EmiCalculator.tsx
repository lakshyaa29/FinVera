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
    <div className="bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-6 sm:p-7 shadow-[5px_5px_0px_#171717]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-[#171717]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#FFD84D] border-2 border-[#171717] rounded-full inline-block" />
            <h3 className="text-xl sm:text-2xl font-black font-space-grotesk text-[#171717] tracking-tight">
              Loan EMI & Interest Calculator
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#171717]/75 mt-1">
            Calculate your exact monthly installments and uncover the true interest cost of loans.
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded bg-[#FFD84D] text-[#171717] border-2 border-[#171717] font-black uppercase tracking-wider shadow-[2px_2px_0px_#171717] shrink-0 self-start sm:self-auto">
          Reducing Balance
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-4">
          {/* Loan Amount */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Loan Principal Amount</label>
              <div className="flex items-center gap-1 font-mono font-black text-[#171717] text-sm">
                <span>₹</span>
                <input
                  type="number"
                  min="10000"
                  max="50000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Math.max(10000, Number(e.target.value)))}
                  className="w-32 bg-[#FFFFFF] border-2 border-[#171717] px-2.5 py-1 rounded-lg text-right text-[#171717] font-bold font-mono focus:outline-none focus:bg-[#FFF9D2] shadow-[1px_1px_0px_#171717]"
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
              className="w-full accent-[#FFD84D] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#171717]/60 font-bold font-mono">
              <span>₹50,000</span>
              <span>₹50 Lakhs</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Annual Interest Rate</label>
              <span className="font-mono font-black text-[#171717] text-sm px-2 py-0.5 bg-[#FFD84D] border border-[#171717] rounded">
                {interestRate}%
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="24"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#FFD84D] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#171717]/60 font-bold font-mono">
              <span>8.5% (Home)</span>
              <span>10.5% (Car)</span>
              <span>15% (Personal)</span>
            </div>
          </div>

          {/* Loan Duration */}
          <div className="space-y-2.5 bg-[#FAFAF7] p-4 rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black uppercase tracking-wider text-[#171717]">Loan Tenure</label>
              <span className="font-mono font-black text-[#171717] text-sm px-2 py-0.5 bg-[#70E000] border border-[#171717] rounded">
                {loanDuration} Years
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={loanDuration}
              onChange={(e) => setLoanDuration(Number(e.target.value))}
              className="w-full accent-[#70E000] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#171717]/60 font-bold font-mono">
              <span>1 yr</span>
              <span>15 yrs</span>
              <span>30 yrs</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-xl bg-[#FAFAF7] border-3 border-[#171717] shadow-[4px_4px_0px_#171717]">
            <p className="text-xs font-black text-[#171717] uppercase tracking-wider mb-1 font-mono">
              ● Monthly EMI Payment
            </p>
            <div className="text-3xl sm:text-4xl font-black text-[#171717] tracking-tight font-space-grotesk">
              {formatINR(result.monthlyEmi)}
              <span className="text-sm font-bold text-[#171717]/60 ml-1">/month</span>
            </div>
            <p className="text-xs font-bold text-[#171717]/70 mt-1">
              For {loanDuration * 12} monthly installments
            </p>

            <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t-2 border-[#171717]">
              <div className="bg-[#FFFFFF] border-2 border-[#171717] p-3 rounded-lg shadow-[2px_2px_0px_#171717]">
                <p className="text-[10px] uppercase tracking-wider font-black text-[#FF5C35]">Total Interest</p>
                <p className="text-base sm:text-lg font-black text-[#FF5C35] font-mono mt-0.5">
                  {formatINR(result.totalInterest)}
                </p>
              </div>
              <div className="bg-[#FFFFFF] border-2 border-[#171717] p-3 rounded-lg shadow-[2px_2px_0px_#171717]">
                <p className="text-[10px] uppercase tracking-wider font-black text-[#171717]/70">Total Repaid</p>
                <p className="text-base sm:text-lg font-black text-[#171717] font-mono mt-0.5">
                  {formatINR(result.totalPayment)}
                </p>
              </div>
            </div>

            {/* Principal vs Interest Ratio Bar */}
            <div className="mt-5 pt-4 border-t-2 border-[#171717]">
              <div className="flex justify-between text-xs mb-1.5 font-black">
                <span className="text-[#171717]">Principal: {Math.round(result.principalPercent)}%</span>
                <span className="text-[#FF5C35]">Interest: {Math.round(result.interestPercent)}%</span>
              </div>
              <div className="w-full h-4 bg-[#FFFFFF] border-2 border-[#171717] rounded-full overflow-hidden flex p-0.5">
                <div
                  style={{ width: `${result.principalPercent}%` }}
                  className="h-full bg-[#70E000] rounded-l-full"
                />
                <div
                  style={{ width: `${result.interestPercent}%` }}
                  className="h-full bg-[#FF5C35] rounded-r-full"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFF9D2] border-2 border-[#171717] text-xs text-[#171717] flex items-start gap-2.5 shadow-[2px_2px_0px_#171717]">
            <Info className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
            <div className="font-medium leading-relaxed">
              <span className="font-black text-[#171717]">Prepayment Advantage: </span>
              Prepaying just 1 extra monthly EMI each year on a 20-year home loan can shave off up to 4
              years of tenure and save multiple lakhs in pure interest.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t-2 border-[#171717] text-[11px] font-bold text-[#171717]/60 flex items-center gap-2">
        <HelpCircle className="w-4 h-4 shrink-0 text-[#171717]" />
        <span>
          Educational estimate based on monthly reducing balance formula. Loan processing fees not included.
        </span>
      </div>
    </div>
  );
}
