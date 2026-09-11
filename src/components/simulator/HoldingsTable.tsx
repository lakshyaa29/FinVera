'use client';

import React, { useState } from 'react';
import { PortfolioHolding, SimulatedTransaction } from '../../types';
import { SIMULATED_ASSETS } from '../../data/mockAssetsData';
import { formatINR, formatPercent } from '../../lib/formatters';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, History, Briefcase } from 'lucide-react';

interface HoldingsTableProps {
  holdings: Record<string, PortfolioHolding>;
  transactions: SimulatedTransaction[];
  onTradeClick: (assetId: string, mode: 'BUY' | 'SELL') => void;
}

export function HoldingsTable({ holdings, transactions, onTradeClick }: HoldingsTableProps) {
  const [activeTab, setActiveTab] = useState<'holdings' | 'history'>('holdings');

  const holdingsList = Object.values(holdings).filter((h) => h.units > 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl">
      {/* Tabs Switcher */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('holdings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'holdings'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Active Holdings ({holdingsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Order History ({transactions.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'holdings' ? (
        holdingsList.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Briefcase className="w-10 h-10 mx-auto text-slate-600 mb-3" />
            <p className="text-sm font-semibold text-slate-300">No active assets in your portfolio</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Use your ₹1,00,000 virtual cash in the Market Assets section below to execute your
              first simulated trade!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Asset</th>
                  <th className="pb-3 font-semibold text-right">Units</th>
                  <th className="pb-3 font-semibold text-right">Avg Price</th>
                  <th className="pb-3 font-semibold text-right">Current</th>
                  <th className="pb-3 font-semibold text-right">Total Value</th>
                  <th className="pb-3 font-semibold text-right">Returns</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {holdingsList.map((h) => {
                  const asset = SIMULATED_ASSETS.find((a) => a.id === h.assetId);
                  const curPrice = asset ? asset.currentPrice : h.avgBuyPrice;
                  const curValue = h.units * curPrice;
                  const pnl = curValue - h.totalInvested;
                  const pnlPercent = h.totalInvested > 0 ? (pnl / h.totalInvested) * 100 : 0;
                  const isProfit = pnl >= 0;

                  return (
                    <tr key={h.assetId} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 pr-2 font-sans">
                        <div className="font-bold text-white text-xs sm:text-sm">
                          {asset?.symbol || h.assetId}
                        </div>
                        <div className="text-[11px] text-slate-400">{asset?.name}</div>
                      </td>
                      <td className="py-3.5 text-right text-slate-200">{h.units}</td>
                      <td className="py-3.5 text-right text-slate-400">{formatINR(h.avgBuyPrice)}</td>
                      <td className="py-3.5 text-right text-slate-200">{formatINR(curPrice)}</td>
                      <td className="py-3.5 text-right font-bold text-white">
                        {formatINR(curValue)}
                      </td>
                      <td
                        className={`py-3.5 text-right font-semibold ${
                          isProfit ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        <div>
                          {isProfit ? '+' : ''}
                          {formatINR(pnl)}
                        </div>
                        <div className="text-[10px]">
                          {isProfit ? '+' : ''}
                          {formatPercent(pnlPercent)}
                        </div>
                      </td>
                      <td className="py-3.5 text-right font-sans">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onTradeClick(h.assetId, 'BUY')}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                          >
                            Buy
                          </button>
                          <button
                            onClick={() => onTradeClick(h.assetId, 'SELL')}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-500/15 text-rose-300 hover:bg-rose-500/30 transition-colors"
                          >
                            Sell
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      ) : transactions.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <History className="w-10 h-10 mx-auto text-slate-600 mb-3" />
          <p className="text-sm font-semibold text-slate-300">No transactions recorded yet</p>
          <p className="text-xs text-slate-500 mt-1">
            Orders you execute will be logged here with timestamps and price details.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Asset</th>
                <th className="pb-3 font-semibold text-right">Units</th>
                <th className="pb-3 font-semibold text-right">Exec Price</th>
                <th className="pb-3 font-semibold text-right">Total Outflow/Inflow</th>
                <th className="pb-3 font-semibold text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {transactions.map((tx) => {
                const isBuy = tx.type === 'BUY';
                const formattedDate = new Date(tx.timestamp).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 font-sans">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md ${
                          isBuy
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {isBuy ? (
                          <ArrowDownLeft className="w-3 h-3" />
                        ) : (
                          <ArrowUpRight className="w-3 h-3" />
                        )}
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 font-sans">
                      <span className="font-bold text-white">{tx.assetSymbol}</span>
                    </td>
                    <td className="py-3 text-right text-slate-200">{tx.units}</td>
                    <td className="py-3 text-right text-slate-400">{formatINR(tx.price)}</td>
                    <td
                      className={`py-3 text-right font-bold ${
                        isBuy ? 'text-slate-200' : 'text-emerald-400'
                      }`}
                    >
                      {formatINR(tx.totalAmount)}
                    </td>
                    <td className="py-3 text-right text-slate-500 text-xs font-sans">
                      {formattedDate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
