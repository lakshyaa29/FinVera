'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { useUserState } from '../../context/UserStateContext';
import { SIMULATED_ASSETS } from '../../data/mockAssetsData';
import { PortfolioSummary } from '../../components/simulator/PortfolioSummary';
import { HoldingsTable } from '../../components/simulator/HoldingsTable';
import { TradeModal } from '../../components/simulator/TradeModal';
import { formatINR } from '../../lib/formatters';
import {
  TrendingUp,
  Target,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Plus,
  Minus,
  CheckCircle2,
} from 'lucide-react';

export default function PracticePage() {
  const { portfolio, buyAsset, sellAsset } = useUserState();
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [tradeMode, setTradeMode] = useState<'BUY' | 'SELL'>('BUY');
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const activeAsset = SIMULATED_ASSETS.find((a) => a.id === selectedAssetId) || null;
  const activeHolding = selectedAssetId ? portfolio.holdings[selectedAssetId] : undefined;

  const handleOpenTrade = (assetId: string, mode: 'BUY' | 'SELL') => {
    setSelectedAssetId(assetId);
    setTradeMode(mode);
    setIsTradeModalOpen(true);
    setFeedbackMessage(null);
  };

  const handleExecuteTrade = (units: number) => {
    if (!activeAsset) return;

    if (tradeMode === 'BUY') {
      const res = buyAsset(
        activeAsset.id,
        activeAsset.symbol,
        activeAsset.name,
        units,
        activeAsset.currentPrice
      );
      setFeedbackMessage(res.message);
    } else {
      const res = sellAsset(activeAsset.id, units, activeAsset.currentPrice);
      setFeedbackMessage(res.message);
    }
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Hands-On Practice Sandbox
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
              Simulated Investing & Missions
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Test your investment skills with ₹1,00,000 in virtual funds and real-life scenario
              missions.
            </p>
          </div>

          <Link
            href="/practice/missions"
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold hover:bg-purple-500/25 transition-colors flex items-center gap-2"
          >
            <Target className="w-4 h-4 text-purple-400" />
            <span>View Real-Life Money Missions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Feedback Alert if trade executed */}
        {feedbackMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* 1. Portfolio Net Worth Summary */}
        <PortfolioSummary portfolio={portfolio} />

        {/* 2. Active Holdings & Transactions Table */}
        <HoldingsTable
          holdings={portfolio.holdings}
          transactions={portfolio.transactions}
          onTradeClick={handleOpenTrade}
        />

        {/* 3. Market Assets Catalog */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Explore Market Assets</h3>
              <p className="text-xs text-slate-400">
                Simulated Indian equities, index funds, commodities, and government bonds.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-teal-400">
              {SIMULATED_ASSETS.length} Assets
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SIMULATED_ASSETS.map((asset) => {
              const holding = portfolio.holdings[asset.id];
              const isProfit = asset.changePercent >= 0;

              return (
                <div
                  key={asset.id}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-xs font-extrabold text-white font-mono">
                          {asset.symbol}
                        </span>
                        <h4 className="text-xs text-slate-300 font-medium line-clamp-1">
                          {asset.name}
                        </h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        {asset.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                      {asset.description}
                    </p>

                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-800/80 mb-3 font-mono">
                      <div>
                        <span className="text-base font-extrabold text-white">
                          {formatINR(asset.currentPrice)}
                        </span>
                        <span
                          className={`text-xs ml-2 font-semibold ${
                            isProfit ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isProfit ? '+' : ''}
                          {asset.changePercent}%
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">{asset.navOrPe}</span>
                    </div>

                    {holding && holding.units > 0 && (
                      <div className="mb-3 text-[11px] text-teal-300 bg-teal-950/40 px-2.5 py-1 rounded-lg border border-teal-500/20 flex justify-between">
                        <span>Owned:</span>
                        <span className="font-mono font-bold">{holding.units} units</span>
                      </div>
                    )}
                  </div>

                  {/* Buy / Sell Quick Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => handleOpenTrade(asset.id, 'BUY')}
                      className="flex-1 py-1.5 px-3 rounded-xl text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-all flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Buy</span>
                    </button>

                    {holding && holding.units > 0 && (
                      <button
                        onClick={() => handleOpenTrade(asset.id, 'SELL')}
                        className="flex-1 py-1.5 px-3 rounded-xl text-xs font-bold bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition-all flex items-center justify-center gap-1"
                      >
                        <Minus className="w-3.5 h-3.5" />
                        <span>Sell</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trade Execution Modal */}
        <TradeModal
          isOpen={isTradeModalOpen}
          asset={activeAsset}
          mode={tradeMode}
          virtualCash={portfolio.virtualCash}
          existingHolding={activeHolding}
          onClose={() => setIsTradeModalOpen(false)}
          onExecute={handleExecuteTrade}
        />
      </div>
    </AppShell>
  );
}
