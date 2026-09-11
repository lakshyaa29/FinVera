'use client';

import React, { useState } from 'react';
import { formatINR } from '../../lib/formatters';
import { Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export function InteractiveBudgetWidget() {
  const [income, setIncome] = useState(40000);
  const [needsPercent, setNeedsPercent] = useState(50);
  const [wantsPercent, setWantsPercent] = useState(30);

  const savingsPercent = Math.max(0, 100 - needsPercent - wantsPercent);

  const needsAmount = (income * needsPercent) / 100;
  const wantsAmount = (income * wantsPercent) / 100;
  const savingsAmount = (income * savingsPercent) / 100;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div>
          <h4 className="text-sm font-bold text-white">Interactive Budget Sandbox</h4>
          <p className="text-xs text-slate-400">Play with the 50/30/20 framework on your monthly income.</p>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
          Live Allocator
        </span>
      </div>

      <div className="space-y-4">
        {/* Monthly Income Input */}
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-semibold text-slate-300">Monthly Net Income</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">{formatINR(income)}</span>
          </div>
          <input
            type="range"
            min="10000"
            max="200000"
            step="5000"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Sliders for Needs & Wants */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-teal-300 font-semibold">Needs ({needsPercent}%)</span>
              <span className="font-mono font-bold text-white">{formatINR(needsAmount)}</span>
            </div>
            <input
              type="range"
              min="30"
              max="70"
              value={needsPercent}
              onChange={(e) => setNeedsPercent(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-amber-300 font-semibold">Wants ({wantsPercent}%)</span>
              <span className="font-mono font-bold text-white">{formatINR(wantsAmount)}</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={wantsPercent}
              onChange={(e) => setWantsPercent(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Savings Result Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-teal-950/40 border border-emerald-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">
                Savings & Wealth Acceleration ({savingsPercent}%)
              </p>
              <p className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5">
                {formatINR(savingsAmount)}
                <span className="text-xs font-normal text-slate-400 ml-1">/month</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-400">Yearly Wealth Built</p>
              <p className="text-sm font-bold text-teal-300 font-mono">
                {formatINR(savingsAmount * 12, true)}/yr
              </p>
            </div>
          </div>

          {/* Allocation Quality Assessment */}
          <div className="mt-3 pt-2.5 border-t border-slate-800 text-xs flex items-center gap-1.5">
            {savingsPercent >= 20 ? (
              <span className="text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Excellent healthy allocation. Compounding will be rapid!
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> Savings below 20%. Try reducing discretionary wants.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
