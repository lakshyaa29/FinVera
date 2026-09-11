'use client';

import React from 'react';
import { SimulatedPortfolio } from '../../types';
import { SIMULATED_ASSETS } from '../../data/mockAssetsData';
import { formatINR, formatPercent } from '../../lib/formatters';
import { ShieldAlert, TrendingUp, TrendingDown, Wallet, PieChart, Sparkles } from 'lucide-react';

interface PortfolioSummaryProps {
  portfolio: SimulatedPortfolio;
}

export function PortfolioSummary({ portfolio }: PortfolioSummaryProps) {
  // Calculate total current holdings value
  let totalHoldingsValue = 0;
  let totalInvested = 0;

  Object.values(portfolio.holdings).forEach((h) => {
    const asset = SIMULATED_ASSETS.find((a) => a.id === h.assetId);
    const currentPrice = asset ? asset.currentPrice : h.avgBuyPrice;
    totalHoldingsValue += h.units * currentPrice;
    totalInvested += h.totalInvested;
  });

  const totalNetWorth = portfolio.virtualCash + totalHoldingsValue;
  const unrealizedPnL = totalHoldingsValue - totalInvested;
  const pnlPercent = totalInvested > 0 ? (unrealizedPnL / totalInvested) * 100 : 0;
  const isProfit = unrealizedPnL >= 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl">
      {/* Prominent Safety & Simulation Warning */}
      <div className="mb-6 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>SIMULATION PLAYGROUND — VIRTUAL EDUCATIONAL CAPITAL ONLY</span>
        </div>
        <span className="hidden sm:inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950 uppercase">
          Zero Real Risk
        </span>
      </div>

      {/* Main Net Worth Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Virtual Net Worth */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <PieChart className="w-3.5 h-3.5 text-teal-400" />
            <span>Total Virtual Net Worth</span>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{formatINR(totalNetWorth)}</p>
          <p className="text-[11px] text-slate-500 mt-1">Cash + Stock Portfolio</p>
        </div>

        {/* Liquid Virtual Cash */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Virtual Cash Available</span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">
            {formatINR(portfolio.virtualCash)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Ready for practice trades</p>
        </div>

        {/* Invested Holdings Value */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Holdings Current Value</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-100 font-mono">
            {formatINR(totalHoldingsValue)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Invested: {formatINR(totalInvested)}</p>
        </div>

        {/* Unrealized Profit / Loss */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            {isProfit ? (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span>Unrealized Returns (P&L)</span>
          </div>
          <p
            className={`text-2xl font-extrabold font-mono ${
              isProfit ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isProfit ? '+' : ''}
            {formatINR(unrealizedPnL)}
          </p>
          <p
            className={`text-[11px] font-semibold font-mono mt-1 ${
              isProfit ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isProfit ? '+' : ''}
            {formatPercent(pnlPercent)} total return
          </p>
        </div>
      </div>
    </div>
  );
}
