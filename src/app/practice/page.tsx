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
import { Target, ArrowRight, Plus, Minus, Check } from 'lucide-react';
import { AssetTypeIcon } from '../../components/graphics/FinVeraGraphics';

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
      <div className="space-y-8 max-w-6xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#171717]">
          <div>
            <span className="nb-tag bg-[#70E000] text-[#171717] mb-2">
              SIMULATED INVESTING PLAYGROUND
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-[#171717] tracking-tight">
              Your investing playground
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
              Try investing with ₹1,00,000 in virtual money. Explore assets, make practice trades, and learn as you go.
            </p>
          </div>

          <Link
            href="/practice/missions"
            className="nb-btn nb-btn-yellow text-xs self-start sm:self-auto py-2.5 px-4"
          >
            <Target className="w-4 h-4 text-[#171717]" />
            <span>Money Missions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Feedback Alert if trade executed */}
        {feedbackMessage && (
          <div className="p-3.5 rounded-lg bg-[#70E000] border-2 border-[#171717] text-[#171717] text-xs font-display font-black flex items-center gap-2 shadow-[3px_3px_0px_#171717]">
            <Check className="w-4 h-4 stroke-[3]" />
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
        <div className="bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-6 sm:p-7 shadow-[4px_4px_0px_#171717] space-y-5">
          <div className="flex items-center justify-between pb-3.5 border-b-2 border-[#171717]">
            <div>
              <h3 className="font-display font-black text-xl text-[#171717]">MARKET ASSET CATALOG</h3>
              <p className="text-xs text-[#6B6B6B] font-medium">
                Simulated Indian equities, sovereign gold bonds, and index funds with live price math.
              </p>
            </div>
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-[#FFD84D] border-2 border-[#171717]">
              {SIMULATED_ASSETS.length} Assets
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SIMULATED_ASSETS.map((asset) => {
              const holding = portfolio.holdings[asset.id];
              const isProfit = asset.changePercent >= 0;
              const assetIconType =
                asset.category.toLowerCase().includes('gold')
                  ? 'gold'
                  : asset.category.toLowerCase().includes('debt')
                  ? 'debt'
                  : asset.category.toLowerCase().includes('etf') || asset.category.toLowerCase().includes('index')
                  ? 'etf'
                  : 'equity';

              return (
                <div
                  key={asset.id}
                  className="p-5 rounded-lg bg-[#FAFAF7] border-2 border-[#171717] hover:bg-[#FFFFFF] shadow-[3px_3px_0px_#171717] hover:shadow-[5px_5px_0px_#171717] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <AssetTypeIcon type={assetIconType} />
                        <div>
                          <span className="font-display font-black text-sm text-[#171717]">
                            {asset.symbol}
                          </span>
                          <h4 className="text-xs text-[#6B6B6B] font-bold line-clamp-1">
                            {asset.name}
                          </h4>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#FFFFFF] border border-[#171717] text-[#171717]">
                        {asset.category}
                      </span>
                    </div>

                    <p className="text-xs text-[#6B6B6B] leading-relaxed line-clamp-2 mb-3 font-medium">
                      {asset.description}
                    </p>

                    <div className="flex items-baseline justify-between pt-2.5 border-t-2 border-[#171717]/20 mb-3 font-mono">
                      <div>
                        <span className="text-lg font-black text-[#171717]">
                          {formatINR(asset.currentPrice)}
                        </span>
                        <span
                          className={`text-xs ml-2 font-black ${
                            isProfit ? 'text-[#171717]' : 'text-[#FF6B6B]'
                          }`}
                        >
                          {isProfit ? '▲ +' : '▼ '}
                          {asset.changePercent}%
                        </span>
                      </div>
                      <span className="text-[11px] text-[#6B6B6B] font-bold">{asset.navOrPe}</span>
                    </div>

                    {holding && holding.units > 0 && (
                      <div className="mb-3 text-[11px] text-[#171717] bg-[#70E000] px-2.5 py-1 rounded border-2 border-[#171717] flex justify-between font-bold">
                        <span>Owned:</span>
                        <span className="font-mono">{holding.units} units</span>
                      </div>
                    )}
                  </div>

                  {/* Buy / Sell Quick Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => handleOpenTrade(asset.id, 'BUY')}
                      className="flex-1 py-1.5 px-3 rounded bg-[#70E000] text-[#171717] border-2 border-[#171717] font-display font-bold text-xs shadow-[2px_2px_0px_#171717] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#171717] transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Buy</span>
                    </button>

                    {holding && holding.units > 0 && (
                      <button
                        onClick={() => handleOpenTrade(asset.id, 'SELL')}
                        className="flex-1 py-1.5 px-3 rounded bg-[#FF6B6B] text-[#171717] border-2 border-[#171717] font-display font-bold text-xs shadow-[2px_2px_0px_#171717] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#171717] transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5 stroke-[3]" />
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
