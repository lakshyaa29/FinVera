'use client';

import React, { useState } from 'react';
import { PortfolioHolding, SimulatedTransaction } from '../../types';
import { SIMULATED_ASSETS } from '../../data/mockAssetsData';
import { formatINR, formatPercent } from '../../lib/formatters';
import { ArrowUpRight, ArrowDownLeft, History, Briefcase, Plus, Minus } from 'lucide-react';

interface HoldingsTableProps {
  holdings: Record<string, PortfolioHolding>;
  transactions: SimulatedTransaction[];
  onTradeClick: (assetId: string, mode: 'BUY' | 'SELL') => void;
}

export function HoldingsTable({ holdings, transactions, onTradeClick }: HoldingsTableProps) {
  const [activeTab, setActiveTab] = useState<'holdings' | 'history'>('holdings');

  const holdingsList = Object.values(holdings).filter((h) => h.units > 0);

  return (
    <div className="bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-5 sm:p-7 shadow-[4px_4px_0px_#171717]">
      {/* Tabs Switcher */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-[#171717] mb-5">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('holdings')}
            className={`nb-btn text-xs py-1.5 px-3.5 ${
              activeTab === 'holdings' ? 'nb-btn-primary' : 'nb-btn-secondary'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Active Holdings ({holdingsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`nb-btn text-xs py-1.5 px-3.5 ${
              activeTab === 'history' ? 'nb-btn-primary' : 'nb-btn-secondary'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Order History ({transactions.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'holdings' ? (
        holdingsList.length === 0 ? (
          <div className="text-center py-10 text-[#6B6B6B]">
            <div className="w-12 h-12 rounded-lg bg-[#E5E5DE] border-2 border-[#171717] text-[#171717] flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_#171717]">
              <Briefcase className="w-6 h-6" />
            </div>
            <p className="font-display font-black text-base text-[#171717]">No active positions yet</p>
            <p className="text-xs text-[#6B6B6B] mt-1 max-w-sm mx-auto font-medium">
              Explore the asset catalog below and use your ₹1,00,000 cash balance to execute your first virtual trade!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-[#171717] text-[#171717] text-[10px] uppercase font-mono font-bold tracking-wider">
                  <th className="pb-3">Asset</th>
                  <th className="pb-3 text-right">Units</th>
                  <th className="pb-3 text-right">Avg Buy Price</th>
                  <th className="pb-3 text-right">Current Market</th>
                  <th className="pb-3 text-right">Total Value</th>
                  <th className="pb-3 text-right">Simulated Return</th>
                  <th className="pb-3 text-right">Quick Order</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 border-b-2 border-[#171717] divide-[#171717]/20 font-mono">
                {holdingsList.map((h) => {
                  const asset = SIMULATED_ASSETS.find((a) => a.id === h.assetId);
                  const curPrice = asset ? asset.currentPrice : h.avgBuyPrice;
                  const curValue = h.units * curPrice;
                  const pnl = curValue - h.totalInvested;
                  const pnlPercent = h.totalInvested > 0 ? (pnl / h.totalInvested) * 100 : 0;
                  const isProfit = pnl >= 0;

                  return (
                    <tr key={h.assetId} className="hover:bg-[#FAFAF7] transition-colors">
                      <td className="py-3.5 pr-2 font-sans">
                        <div className="font-display font-black text-[#171717] text-sm">
                          {asset?.symbol || h.assetId}
                        </div>
                        <div className="text-[11px] text-[#6B6B6B] font-medium">{asset?.name}</div>
                      </td>
                      <td className="py-3.5 text-right font-bold text-[#171717]">{h.units}</td>
                      <td className="py-3.5 text-right text-[#6B6B6B]">{formatINR(h.avgBuyPrice)}</td>
                      <td className="py-3.5 text-right font-bold text-[#171717]">{formatINR(curPrice)}</td>
                      <td className="py-3.5 text-right font-black text-[#171717]">
                        {formatINR(curValue)}
                      </td>
                      <td
                        className={`py-3.5 text-right font-bold ${
                          isProfit ? 'text-[#171717]' : 'text-[#FF6B6B]'
                        }`}
                      >
                        <div>
                          {isProfit ? '+' : ''}
                          {formatINR(pnl)}
                        </div>
                        <div className="text-[10px]">
                          {isProfit ? '▲ +' : '▼ '}
                          {formatPercent(pnlPercent)}
                        </div>
                      </td>
                      <td className="py-3.5 text-right font-sans">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onTradeClick(h.assetId, 'BUY')}
                            className="px-2.5 py-1 rounded bg-[#70E000] border-2 border-[#171717] text-[#171717] font-display font-bold text-xs shadow-[2px_2px_0px_#171717] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#171717] transition-all cursor-pointer flex items-center gap-0.5"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Buy</span>
                          </button>
                          <button
                            onClick={() => onTradeClick(h.assetId, 'SELL')}
                            className="px-2.5 py-1 rounded bg-[#FF6B6B] border-2 border-[#171717] text-[#171717] font-display font-bold text-xs shadow-[2px_2px_0px_#171717] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#171717] transition-all cursor-pointer flex items-center gap-0.5"
                          >
                            <Minus className="w-3 h-3" />
                            <span>Sell</span>
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
        <div className="text-center py-10 text-[#6B6B6B]">
          <div className="w-12 h-12 rounded-lg bg-[#E5E5DE] border-2 border-[#171717] text-[#171717] flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_#171717]">
            <History className="w-6 h-6" />
          </div>
          <p className="font-display font-black text-base text-[#171717]">No transaction records yet</p>
          <p className="text-xs text-[#6B6B6B] mt-1 font-medium">
            Every buy/sell order you trigger will be logged here with price and timestamp.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-[#171717] text-[#171717] text-[10px] uppercase font-mono font-bold tracking-wider">
                <th className="pb-3">Type</th>
                <th className="pb-3">Asset</th>
                <th className="pb-3 text-right">Units</th>
                <th className="pb-3 text-right">Exec Price</th>
                <th className="pb-3 text-right">Total Outflow/Inflow</th>
                <th className="pb-3 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 border-b-2 border-[#171717] divide-[#171717]/20 font-mono">
              {transactions.map((tx) => {
                const isBuy = tx.type === 'BUY';
                const formattedDate = new Date(tx.timestamp).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <tr key={tx.id} className="hover:bg-[#FAFAF7] transition-colors">
                    <td className="py-3 font-sans">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-display font-black px-2 py-0.5 rounded border-2 border-[#171717] ${
                          isBuy
                            ? 'bg-[#70E000] text-[#171717]'
                            : 'bg-[#FF6B6B] text-[#171717]'
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
                      <span className="font-display font-black text-[#171717]">{tx.assetSymbol}</span>
                    </td>
                    <td className="py-3 text-right font-bold text-[#171717]">{tx.units}</td>
                    <td className="py-3 text-right text-[#6B6B6B]">{formatINR(tx.price)}</td>
                    <td className="py-3 text-right font-black text-[#171717]">
                      {formatINR(tx.totalAmount)}
                    </td>
                    <td className="py-3 text-right text-[#6B6B6B] text-xs font-mono">
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
