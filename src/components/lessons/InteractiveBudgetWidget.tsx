'use client';

import React, { useState } from 'react';
import { formatINR } from '../../lib/formatters';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function InteractiveBudgetWidget() {
  const [income, setIncome] = useState(40000);
  const [needsPercent, setNeedsPercent] = useState(50);
  const [wantsPercent, setWantsPercent] = useState(30);

  const savingsPercent = Math.max(0, 100 - needsPercent - wantsPercent);

  const needsAmount = (income * needsPercent) / 100;
  const wantsAmount = (income * wantsPercent) / 100;
  const savingsAmount = (income * savingsPercent) / 100;

  return (
    <div className="bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-5 sm:p-6 shadow-[4px_4px_0px_#171717]">
      <div className="flex items-center justify-between pb-3.5 border-b-2 border-[#171717] mb-5">
        <div>
          <span className="nb-tag bg-[#FFD84D] text-[#171717] mb-1">
            BUDGET SANDBOX
          </span>
          <h4 className="font-display font-black text-lg text-[#171717]">50/30/20 LIVE ALLOCATOR</h4>
          <p className="text-xs text-[#6B6B6B] font-medium">Calibrate your take-home pay across the 3 buckets.</p>
        </div>
        <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-[#70E000] border-2 border-[#171717]">
          LIVE
        </span>
      </div>

      <div className="space-y-4">
        {/* Monthly Income Input */}
        <div className="bg-[#FAFAF7] p-4 rounded-lg border-2 border-[#171717]">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-display font-bold text-xs uppercase tracking-wider text-[#171717]">
              Monthly Net Take-Home
            </span>
            <span className="font-mono font-black text-[#171717] text-base bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#171717]">
              {formatINR(income)}
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="200000"
            step="5000"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full accent-[#70E000] cursor-pointer"
          />
        </div>

        {/* Sliders for Needs & Wants */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-[#FAFAF7] p-3.5 rounded-lg border-2 border-[#171717]">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-display font-black text-[#171717] bg-[#6C8CFF] px-1.5 py-0.2 rounded border border-[#171717]">
                NEEDS ({needsPercent}%)
              </span>
              <span className="font-mono font-bold text-[#171717]">{formatINR(needsAmount)}</span>
            </div>
            <input
              type="range"
              min="30"
              max="70"
              value={needsPercent}
              onChange={(e) => setNeedsPercent(Number(e.target.value))}
              className="w-full accent-[#6C8CFF] cursor-pointer"
            />
          </div>

          <div className="bg-[#FAFAF7] p-3.5 rounded-lg border-2 border-[#171717]">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-display font-black text-[#171717] bg-[#FFD84D] px-1.5 py-0.2 rounded border border-[#171717]">
                WANTS ({wantsPercent}%)
              </span>
              <span className="font-mono font-bold text-[#171717]">{formatINR(wantsAmount)}</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={wantsPercent}
              onChange={(e) => setWantsPercent(Number(e.target.value))}
              className="w-full accent-[#FFD84D] cursor-pointer"
            />
          </div>
        </div>

        {/* Proportion Bar Visualization */}
        <div className="space-y-1.5 pt-1">
          <div className="w-full h-4 bg-[#E5E5DE] border-2 border-[#171717] rounded-sm overflow-hidden flex">
            <div style={{ width: `${needsPercent}%` }} className="h-full bg-[#6C8CFF]" title={`Needs: ${needsPercent}%`} />
            <div style={{ width: `${wantsPercent}%` }} className="h-full bg-[#FFD84D]" title={`Wants: ${wantsPercent}%`} />
            <div style={{ width: `${savingsPercent}%` }} className="h-full bg-[#70E000]" title={`Savings: ${savingsPercent}%`} />
          </div>
          <div className="flex justify-between text-[11px] font-mono font-bold text-[#171717]">
            <span>Needs {needsPercent}%</span>
            <span>Wants {wantsPercent}%</span>
            <span>Savings {savingsPercent}%</span>
          </div>
        </div>

        {/* Savings Result Banner */}
        <div className="p-4 rounded-lg bg-[#70E000] border-2 border-[#171717] shadow-[3px_3px_0px_#171717]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] text-[#171717] font-black uppercase tracking-wider">
                MONTHLY WEALTH & SAVINGS POOL ({savingsPercent}%)
              </p>
              <p className="text-2xl font-display font-black text-[#171717] mt-0.5">
                {formatINR(savingsAmount)}
                <span className="text-xs font-mono font-bold ml-1">/month</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-[#171717] font-bold">Yearly Savings</p>
              <p className="text-sm font-mono font-black text-[#171717] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#171717]">
                {formatINR(savingsAmount * 12, true)}/yr
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t-2 border-[#171717]/30 text-xs font-bold text-[#171717] flex items-center gap-1.5">
            {savingsPercent >= 20 ? (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Healthy allocation! Meets the 20% minimum wealth-building rule.
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> Savings below 20%. Try reducing discretionary wants.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
