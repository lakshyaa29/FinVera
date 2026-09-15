'use client';

import React, { useState } from 'react';
import { PlayableConcept } from '../../types';
import { formatINR } from '../../lib/formatters';
import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  AlertTriangle,
  Flame,
  PieChart,
  ArrowRight,
  Layers,
  Sparkles,
  RefreshCw,
  Zap,
} from 'lucide-react';

interface VisualDemoViewerProps {
  concept: PlayableConcept;
}

export function VisualDemoViewer({ concept }: VisualDemoViewerProps) {
  const visualType = concept.visualDemo.type;

  // 1. Inflation Visual State
  const [inflationYear, setInflationYear] = useState<number>(10);

  // 2. Diversification Shock State
  const [shockTriggered, setShockTriggered] = useState(false);

  // 3. Compounding Tenure State
  const [compoundYear, setCompoundYear] = useState<number>(20);

  // 4. Repo Rate State
  const [repoHiked, setRepoHiked] = useState(false);

  // 5. Stock shares state
  const [purchasedShares, setPurchasedShares] = useState(5);

  return (
    <div className="p-5 sm:p-7 rounded-xl bg-[#F8F8F3]/50 border-2 border-[#171717] space-y-6">
      {/* Demo Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#171717]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 font-mono">
            Interactive Visual Model
          </span>
          <h4 className="text-base sm:text-lg font-extrabold text-[#171717] mt-0.5">
            {concept.visualDemo.title}
          </h4>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border-2 border-[#171717] font-semibold">
          Live Interactive
        </span>
      </div>

      {/* ========================================================= */}
      {/* RENDER DIVERSE VISUALS ACCORDING TO CONCEPT TYPE */}
      {/* ========================================================= */}

      {/* 1. INFLATION VISUAL */}
      {visualType === 'inflation' && (
        <div className="space-y-6">
          <p className="text-xs text-[#171717]/80">
            Slide the timeline to see what ₹100 buys over time assuming average 6% inflation:
          </p>

          <div className="flex items-center justify-between text-xs font-mono text-[#6B6B6B]">
            <span>Today (Year 0)</span>
            <span className="text-emerald-600 font-bold">Year {inflationYear}</span>
            <span>Year 20</span>
          </div>

          <input
            type="range"
            min="0"
            max="20"
            value={inflationYear}
            onChange={(e) => setInflationYear(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />

          {/* Visual comparison cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Today */}
            <div className="p-4 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] space-y-3 shadow-xs">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#6B6B6B] font-semibold">YEAR 0 (TODAY)</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono font-bold">
                  ₹100
                </span>
              </div>
              <div className="text-4xl text-center py-2">🍔 🍟 🥤</div>
              <p className="text-xs text-[#171717] text-center font-semibold">
                Buys 1 Full Burger Combo Meal
              </p>
              <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-full w-full" />
              </div>
              <p className="text-[11px] text-[#6B6B6B] text-center">100% Purchasing Power</p>
            </div>

            {/* In Future */}
            {(() => {
              const futureCost = Math.round(100 * Math.pow(1 + 0.06, inflationYear));
              const purchasingPowerPercent = Math.max(15, Math.round((100 / futureCost) * 100));
              return (
                <div className="p-4 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] space-y-3 shadow-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#6B6B6B] font-semibold">YEAR {inflationYear}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-mono font-bold">
                      ₹100
                    </span>
                  </div>
                  <div className="text-4xl text-center py-2">
                    {inflationYear === 0 ? '🍔 🍟 🥤' : inflationYear < 10 ? '🍔 🍟' : '🍔'}
                  </div>
                  <p className="text-xs text-[#171717] text-center font-semibold">
                    Same meal now costs {formatINR(futureCost)}
                  </p>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      style={{ width: `${purchasingPowerPercent}%` }}
                      className="bg-amber-500 h-full transition-all duration-300"
                    />
                  </div>
                  <p className="text-[11px] text-amber-700 text-center font-mono">
                    {purchasingPowerPercent}% of meal covered by ₹100
                  </p>
                </div>
              );
            })()}
          </div>

          <div className="p-3.5 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] text-xs text-[#171717]/80 flex items-start gap-2.5 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#171717]">The Core Lesson:</strong> Your ₹100 banknote never
              shrinks in size, but what it can buy definitely does. That&apos;s why investing in
              assets that beat 6% inflation is essential for financial survival.
            </p>
          </div>
        </div>
      )}

      {/* 2. COMPOUNDING VISUAL */}
      {visualType === 'compounding' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-[#6B6B6B]">
            <span>Invested: ₹1,00,000 @ 12% Return</span>
            <span className="text-emerald-600 font-bold">Tenure: {compoundYear} Years</span>
          </div>

          <input
            type="range"
            min="1"
            max="30"
            value={compoundYear}
            onChange={(e) => setCompoundYear(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />

          {(() => {
            const principal = 100000;
            const rate = 0.12;
            const total = Math.round(principal * Math.pow(1 + rate, compoundYear));
            const simpleInterest = Math.round(principal * rate * compoundYear);
            const compoundExtra = Math.max(0, total - principal - simpleInterest);

            const principalPct = Math.max(5, Math.round((principal / total) * 100));
            const simplePct = Math.max(10, Math.round((simpleInterest / total) * 100));
            const compoundPct = Math.max(5, 100 - principalPct - simplePct);

            return (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xs">
                  <div>
                    <span className="text-xs text-[#6B6B6B]">Total Accumulated Wealth</span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
                      {formatINR(total)}
                    </h3>
                  </div>
                  <div className="text-right text-xs space-y-1">
                    <p className="text-[#6B6B6B]">
                      Original Capital:{' '}
                      <span className="text-[#171717] font-mono font-bold">
                        {formatINR(principal)}
                      </span>
                    </p>
                    <p className="text-teal-600">
                      Pure Compounding Bonus:{' '}
                      <span className="font-mono font-bold">{formatINR(total - principal)}</span>
                    </p>
                  </div>
                </div>

                {/* Growth Composition Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-[#6B6B6B]">
                    <span>Capital Breakdown</span>
                    <span>{compoundYear} Years Compounding</span>
                  </div>
                  <div className="w-full h-6 rounded-xl bg-slate-100 overflow-hidden flex shadow-inner">
                    <div
                      style={{ width: `${principalPct}%` }}
                      className="bg-blue-500 h-full flex items-center justify-center text-[10px] font-bold text-white font-mono"
                      title="Principal"
                    >
                      P
                    </div>
                    <div
                      style={{ width: `${simplePct}%` }}
                      className="bg-teal-400 h-full flex items-center justify-center text-[10px] font-bold text-slate-950 font-mono"
                      title="Simple Interest"
                    >
                      SI
                    </div>
                    <div
                      style={{ width: `${compoundPct}%` }}
                      className="bg-emerald-500 h-full flex items-center justify-center text-[10px] font-bold text-slate-950 font-mono"
                      title="Compounding Interest on Interest"
                    >
                      Snowball
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-[11px] pt-1">
                    <span className="flex items-center gap-1 text-blue-600 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      Principal ({principalPct}%)
                    </span>
                    <span className="flex items-center gap-1 text-teal-600 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                      Simple Return ({simplePct}%)
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      Compound Bonus ({compoundPct}%)
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 3. DIVERSIFICATION VISUAL */}
      {visualType === 'diversification' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-[#171717]/80">
              Test how a concentrated vs diversified portfolio handles a surprise market shock:
            </p>
            <button
              onClick={() => setShockTriggered(!shockTriggered)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                shockTriggered
                  ? 'bg-slate-100 text-[#171717] hover:bg-slate-200:bg-slate-700'
                  : 'bg-rose-500 text-white shadow-md shadow-rose-500/25 hover:scale-105 active:scale-95'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{shockTriggered ? 'Reset Market Shock' : 'Trigger Market Crash (-35%)'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Basket A: Concentrated */}
            <div
              className={`p-5 rounded-lg border transition-all space-y-3 ${
                shockTriggered
                  ? 'bg-rose-50/70 border-[#171717]'
                  : 'bg-[#FFFFFF] border-[#171717]'
              }`}
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#171717]">Basket A: 100% in 1 Stock</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-[#6B6B6B] text-[10px] font-mono">
                  Concentrated
                </span>
              </div>
              <div className="text-center py-2 text-4xl">🧺 💥</div>
              <div className="space-y-1 text-center">
                <p className="text-xs text-[#6B6B6B]">Portfolio Value</p>
                <p
                  className={`text-xl font-extrabold font-mono ${
                    shockTriggered ? 'text-rose-600' : 'text-[#171717]'
                  }`}
                >
                  {shockTriggered ? '₹6,500 (-35%)' : '₹10,000 (Initial)'}
                </p>
              </div>
              {shockTriggered && (
                <div className="p-2.5 rounded-xl bg-rose-50 border-2 border-[#171717] text-[11px] text-rose-700 text-center">
                  ⚠️ Heavy loss! The single company stumbled and took all your money down with it.
                </div>
              )}
            </div>

            {/* Basket B: Diversified */}
            <div
              className={`p-5 rounded-lg border transition-all space-y-3 ${
                shockTriggered
                  ? 'bg-emerald-50/70 border-[#171717]'
                  : 'bg-[#FFFFFF] border-[#171717]'
              }`}
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#171717]">Basket B: 4 Balanced Baskets</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold">
                  Diversified
                </span>
              </div>
              <div className="flex justify-center gap-2 py-2 text-2xl">
                <span>📈</span>
                <span>🏦</span>
                <span>🥇</span>
                <span>💰</span>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-xs text-[#6B6B6B]">Portfolio Value</p>
                <p
                  className={`text-xl font-extrabold font-mono ${
                    shockTriggered ? 'text-emerald-600' : 'text-[#171717]'
                  }`}
                >
                  {shockTriggered ? '₹9,450 (-5.5%)' : '₹10,000 (Initial)'}
                </p>
              </div>
              {shockTriggered && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border-2 border-[#171717] text-[11px] text-emerald-700 text-center">
                  🛡️ Protected! While stocks fell, Gold (+8%) and Fixed Income (+3%) cushioned your
                  wealth.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. STOCK VISUAL */}
      {visualType === 'stock' && (
        <div className="space-y-6">
          <p className="text-xs text-[#171717]/80">
            See how buying company shares grants fractional legal ownership in corporate profits:
          </p>

          <div className="p-4 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] text-[#6B6B6B]">Company: Tata Motors Ltd.</span>
              <p className="text-sm font-bold text-[#171717]">Total Shares Issued: 10,000 Shares</p>
              <p className="text-xs text-teal-600 font-mono">Current Share Price: ₹950</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#6B6B6B]">Shares you own:</span>
              <div className="flex items-center gap-2">
                {[1, 5, 10, 25].map((s) => (
                  <button
                    key={s}
                    onClick={() => setPurchasedShares(s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      purchasedShares === s
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-slate-100 text-[#171717] hover:bg-slate-200:bg-slate-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Grid representing slices */}
          <div className="p-5 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] space-y-4 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#171717] font-semibold">
                Ownership Claim: {purchasedShares} Shares ={' '}
                {((purchasedShares / 10000) * 100).toFixed(2)}% of the Company
              </span>
              <span className="text-emerald-600 font-mono font-bold">
                Investment Value: {formatINR(purchasedShares * 950)}
              </span>
            </div>

            {/* Mini visual tiles */}
            <div className="grid grid-cols-10 sm:grid-cols-20 gap-1.5 p-3 rounded-xl bg-slate-100">
              {Array.from({ length: 40 }).map((_, i) => {
                const isOwned = i < purchasedShares;
                return (
                  <div
                    key={i}
                    className={`h-4 rounded transition-all ${
                      isOwned
                        ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-sm scale-105'
                        : 'bg-slate-200'
                    }`}
                    title={isOwned ? 'Your Share!' : 'Other Shareholder'}
                  />
                );
              })}
            </div>

            <p className="text-[11px] text-[#6B6B6B] italic">
              When Tata Motors sells cars globally and declares a ₹15/share dividend, you receive{' '}
              <strong className="text-emerald-600 font-mono">
                {formatINR(purchasedShares * 15)}
              </strong>{' '}
              deposited straight into your bank account!
            </p>
          </div>
        </div>
      )}

      {/* 5. SIP VISUAL */}
      {visualType === 'sip' && (
        <div className="space-y-6">
          <p className="text-xs text-[#171717]/80">
            How Rupee-Cost Averaging works when you invest a fixed ₹2,500 every single month:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] space-y-2 text-center shadow-xs">
              <span className="text-[10px] font-mono text-[#6B6B6B] font-bold">MONTH 1 (PEAK)</span>
              <p className="text-sm font-bold text-rose-600 font-mono">NAV = ₹50 / unit</p>
              <div className="py-2 text-2xl">📈</div>
              <p className="text-xs text-[#171717] font-semibold">₹2,500 buys 50 Units</p>
              <p className="text-[10px] text-[#6B6B6B]">Market was expensive</p>
            </div>

            <div className="p-4 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] space-y-2 text-center shadow-sm shadow-emerald-500/5">
              <span className="text-[10px] font-mono text-emerald-600 font-bold">
                MONTH 2 (CRASH)
              </span>
              <p className="text-sm font-bold text-emerald-600 font-mono">NAV = ₹25 / unit</p>
              <div className="py-2 text-2xl">📉 🛒</div>
              <p className="text-xs text-emerald-700 font-bold">₹2,500 buys 100 Units!</p>
              <p className="text-[10px] text-emerald-600">Discount sale! Acquired 2x units</p>
            </div>

            <div className="p-4 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] space-y-2 text-center shadow-xs">
              <span className="text-[10px] font-mono text-[#6B6B6B] font-bold">
                MONTH 3 (RECOVERY)
              </span>
              <p className="text-sm font-bold text-teal-600 font-mono">NAV = ₹40 / unit</p>
              <div className="py-2 text-2xl">🚀</div>
              <p className="text-xs text-[#171717] font-semibold">₹2,500 buys 62.5 Units</p>
              <p className="text-[10px] text-[#6B6B6B]">Total Units Owned: 212.5</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs shadow-xs">
            <span className="text-[#171717]/80">
              Total Invested: <strong className="text-[#171717] font-mono">₹7,500</strong> across 3
              months
            </span>
            <span className="text-emerald-600 font-bold font-mono">
              Portfolio Value at Month 3: {formatINR(212.5 * 40)} (+₹1,000 Profit!)
            </span>
          </div>
        </div>
      )}

      {/* 6. REPO RATE VISUAL */}
      {visualType === 'repo-rate' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#171717]/80">
              Watch the domino effect of RBI policy interest rate decisions:
            </p>
            <button
              onClick={() => setRepoHiked(!repoHiked)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                repoHiked
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-100 text-[#171717] hover:bg-slate-200:bg-slate-700'
              }`}
            >
              {repoHiked ? 'Current: +0.50% Rate Hike' : 'Click to Simulate +0.50% Hike'}
            </button>
          </div>

          {/* Flow Dominoes */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="p-3 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] space-y-1 shadow-xs">
              <span className="text-[10px] font-mono text-[#6B6B6B] font-bold">STEP 1</span>
              <p className="font-bold text-amber-600">RBI Hikes Rate</p>
              <p className="text-[10px] text-[#6B6B6B]">
                {repoHiked ? 'Repo moves to 6.50%' : 'Repo at baseline 6.00%'}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] space-y-1 shadow-xs">
              <span className="text-[10px] font-mono text-[#6B6B6B] font-bold">STEP 2</span>
              <p className="font-bold text-[#171717]">Bank Costs Rise</p>
              <p className="text-[10px] text-[#6B6B6B]">Banks pay higher interest to RBI</p>
            </div>
            <div className="p-3 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] space-y-1 shadow-xs">
              <span className="text-[10px] font-mono text-[#6B6B6B] font-bold">STEP 3</span>
              <p className="font-bold text-rose-600">Loan EMIs Rise</p>
              <p className="text-[10px] text-[#6B6B6B]">
                {repoHiked ? 'Home loan rate: 9.0%' : 'Home loan rate: 8.5%'}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] space-y-1 shadow-xs">
              <span className="text-[10px] font-mono text-[#6B6B6B] font-bold">STEP 4</span>
              <p className="font-bold text-[#171717]">Spending Cools</p>
              <p className="text-[10px] text-[#6B6B6B]">People borrow less for cars/homes</p>
            </div>
            <div className="p-3 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] space-y-1 shadow-xs">
              <span className="text-[10px] font-mono text-emerald-600 font-bold">STEP 5</span>
              <p className="font-bold text-emerald-700">Inflation Drops</p>
              <p className="text-[10px] text-[#6B6B6B]">Consumer price pressure eases</p>
            </div>
          </div>
        </div>
      )}

      {/* 7. BULL VS BEAR VISUAL */}
      {visualType === 'bull-bear' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-lg bg-emerald-50/70 border-2 border-[#171717] space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐂</span>
                <h5 className="font-extrabold text-emerald-700">BULL MARKET (HORNS UP)</h5>
              </div>
              <p className="text-xs text-[#171717] leading-relaxed">
                Characterized by strong corporate earnings, economic expansion, optimism, and rising
                stock indices over years.
              </p>
              <div className="p-2.5 rounded-xl bg-[#FFFFFF] text-[11px] text-emerald-800 font-mono border border-emerald-100">
                Historical Average Duration: 3 to 5 Years
              </div>
            </div>

            <div className="p-5 rounded-lg bg-rose-50/70 border-2 border-[#171717] space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐻</span>
                <h5 className="font-extrabold text-rose-700">BEAR MARKET (PAWS DOWN)</h5>
              </div>
              <p className="text-xs text-[#171717] leading-relaxed">
                A market drop of 20%+ from recent highs driven by panic, recessions, or geopolitical
                shocks. Temporary but scary.
              </p>
              <div className="p-2.5 rounded-xl bg-[#FFFFFF] text-[11px] text-rose-800 font-mono border border-rose-100">
                Historical Average Duration: 9 to 14 Months
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. CIBIL SCORE GAUGE */}
      {visualType === 'cibil-score' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
            <div className="p-3 rounded-lg bg-rose-50 border-2 border-[#171717]">
              <span className="font-mono font-bold text-rose-600">300 - 649</span>
              <p className="text-[11px] text-[#171717] font-semibold mt-1">Poor / High Risk</p>
              <p className="text-[10px] text-[#6B6B6B]">Loans rejected</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 border-2 border-[#171717]">
              <span className="font-mono font-bold text-amber-600">650 - 699</span>
              <p className="text-[11px] text-[#171717] font-semibold mt-1">Fair</p>
              <p className="text-[10px] text-[#6B6B6B]">High loan interest</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 border-2 border-[#171717]">
              <span className="font-mono font-bold text-blue-600">700 - 749</span>
              <p className="text-[11px] text-[#171717] font-semibold mt-1">Good</p>
              <p className="text-[10px] text-[#6B6B6B]">Standard approvals</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 border-2 border-[#171717]">
              <span className="font-mono font-bold text-emerald-600">750 - 900</span>
              <p className="text-[11px] text-emerald-800 font-bold mt-1">Prime / Excellent</p>
              <p className="text-[10px] text-emerald-600">Lowest interest rates</p>
            </div>
          </div>
        </div>
      )}

      {/* FALLBACK / GENERIC VISUAL */}
      {visualType === 'generic' && (
        <div className="p-6 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center font-bold text-xl">
            {concept.categoryIcon}
          </div>
          <h5 className="font-bold text-[#171717] text-sm">{concept.visualDemo.title}</h5>
          <p className="text-xs text-[#171717]/80 max-w-md mx-auto">{concept.visualDemo.explanation}</p>
        </div>
      )}

      {/* Explanatory takeaway footer */}
      <div className="pt-2 text-xs text-[#6B6B6B] italic">
        💡 {concept.visualDemo.explanation}
      </div>
    </div>
  );
}
