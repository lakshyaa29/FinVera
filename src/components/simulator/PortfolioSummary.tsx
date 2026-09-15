'use client';

import React from 'react';
import { SimulatedPortfolio } from '../../types';
import { SIMULATED_ASSETS } from '../../data/mockAssetsData';
import { formatINR, formatPercent } from '../../lib/formatters';
import { ShieldCheck, TrendingUp, TrendingDown, Wallet, PieChart } from 'lucide-react';

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

  const cashPercent = totalNetWorth > 0 ? Math.round((portfolio.virtualCash / totalNetWorth) * 100) : 100;
  const investedPercent = 100 - cashPercent;

  return (
    <div className="bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-6 sm:p-7 shadow-[5px_5px_0px_#171717]">
      {/* Simulation Safety Warning */}
      <div className="mb-6 p-3 rounded-lg bg-[#FFD84D] border-2 border-[#171717] flex items-center justify-between gap-3 shadow-[2px_2px_0px_#171717]">
        <div className="flex items-center gap-2 text-xs text-[#171717] font-display font-black">
          <ShieldCheck className="w-4 h-4 text-[#171717] shrink-0" />
          <span>VIRTUAL SIMULATION SANDBOX — 100% RISK-FREE PRACTICE</span>
        </div>
        <span className="hidden sm:inline-block font-mono text-[10px] font-black px-2 py-0.5 rounded bg-[#171717] text-[#FFFFFF] uppercase">
          EDUCATIONAL
        </span>
      </div>

      {/* Main Net Worth Header Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Virtual Net Worth */}
        <div className="p-4 rounded-lg bg-[#FAFAF7] border-2 border-[#171717] shadow-[3px_3px_0px_#171717]">
          <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B] mb-1 font-bold">
            <PieChart className="w-3.5 h-3.5 text-[#171717]" />
            <span>Virtual Net Worth</span>
          </div>
          <p className="text-2xl sm:text-3xl font-display font-black text-[#171717]">{formatINR(totalNetWorth)}</p>
          <p className="font-mono text-[11px] text-[#6B6B6B] mt-1 font-bold">Total Portfolio Value</p>
        </div>

        {/* Liquid Virtual Cash */}
        <div className="p-4 rounded-lg bg-[#FAFAF7] border-2 border-[#171717] shadow-[3px_3px_0px_#171717]">
          <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B] mb-1 font-bold">
            <Wallet className="w-3.5 h-3.5 text-[#70E000]" />
            <span>Virtual Cash Balance</span>
          </div>
          <p className="text-2xl sm:text-3xl font-display font-black text-[#171717]">
            {formatINR(portfolio.virtualCash)}
          </p>
          <p className="font-mono text-[11px] text-[#6B6B6B] mt-1 font-bold">{cashPercent}% Unallocated Cash</p>
        </div>

        {/* Invested Holdings Value */}
        <div className="p-4 rounded-lg bg-[#FAFAF7] border-2 border-[#171717] shadow-[3px_3px_0px_#171717]">
          <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B] mb-1 font-bold">
            <TrendingUp className="w-3.5 h-3.5 text-[#6C8CFF]" />
            <span>Holdings Market Value</span>
          </div>
          <p className="text-2xl sm:text-3xl font-display font-black text-[#171717]">
            {formatINR(totalHoldingsValue)}
          </p>
          <p className="font-mono text-[11px] text-[#6B6B6B] mt-1 font-bold">Cost Basis: {formatINR(totalInvested)}</p>
        </div>

        {/* Unrealized Profit / Loss */}
        <div className="p-4 rounded-lg bg-[#FAFAF7] border-2 border-[#171717] shadow-[3px_3px_0px_#171717]">
          <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B] mb-1 font-bold">
            {isProfit ? (
              <TrendingUp className="w-3.5 h-3.5 text-[#70E000]" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-[#FF6B6B]" />
            )}
            <span>Simulated P&L</span>
          </div>
          <p
            className={`text-2xl sm:text-3xl font-display font-black ${
              isProfit ? 'text-[#171717]' : 'text-[#FF6B6B]'
            }`}
          >
            {isProfit ? '+' : ''}
            {formatINR(unrealizedPnL)}
          </p>
          <p
            className={`font-mono text-[11px] font-bold mt-1 ${
              isProfit ? 'text-[#171717]' : 'text-[#FF6B6B]'
            }`}
          >
            {isProfit ? '▲ +' : '▼ '}
            {formatPercent(pnlPercent)} return
          </p>
        </div>
      </div>

      {/* Asset Allocation Proportion Ribbon */}
      <div className="mt-5 pt-4 border-t-2 border-[#171717] space-y-2">
        <div className="flex justify-between text-xs font-mono font-bold text-[#171717]">
          <span>Asset Allocation</span>
          <span>Cash: {cashPercent}% • Invested: {investedPercent}%</span>
        </div>
        <div className="w-full h-4 bg-[#E5E5DE] border-2 border-[#171717] rounded-sm overflow-hidden flex">
          <div style={{ width: `${cashPercent}%` }} className="h-full bg-[#70E000]" title={`Cash: ${cashPercent}%`} />
          <div style={{ width: `${investedPercent}%` }} className="h-full bg-[#6C8CFF]" title={`Invested: ${investedPercent}%`} />
        </div>
      </div>
    </div>
  );
}
