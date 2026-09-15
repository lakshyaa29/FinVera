'use client';

import React, { useState } from 'react';
import { SimulatedAsset, PortfolioHolding } from '../../types';
import { formatINR } from '../../lib/formatters';
import { X, ArrowRight, AlertCircle } from 'lucide-react';

interface TradeModalProps {
  isOpen: boolean;
  asset: SimulatedAsset | null;
  mode: 'BUY' | 'SELL';
  virtualCash: number;
  existingHolding?: PortfolioHolding;
  onClose: () => void;
  onExecute: (units: number) => void;
}

export function TradeModal({
  isOpen,
  asset,
  mode,
  virtualCash,
  existingHolding,
  onClose,
  onExecute,
}: TradeModalProps) {
  const [units, setUnits] = useState<number>(1);

  if (!isOpen || !asset) return null;

  const totalCost = units * asset.currentPrice;
  const maxCanBuy = Math.floor(virtualCash / asset.currentPrice);
  const maxCanSell = existingHolding ? existingHolding.units : 0;

  const isBuy = mode === 'BUY';
  const isValid =
    isBuy ? units > 0 && totalCost <= virtualCash : units > 0 && units <= maxCanSell;

  const handleConfirm = () => {
    if (!isValid) return;
    onExecute(units);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-xs animate-in fade-in duration-100">
      <div className="w-full max-w-md bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-6 shadow-[8px_8px_0px_#171717] relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#171717] mb-5">
          <div className="flex items-center gap-2.5">
            <span
              className={`font-mono text-xs font-black px-2.5 py-0.5 rounded border-2 border-[#171717] ${
                isBuy
                  ? 'bg-[#70E000] text-[#171717]'
                  : 'bg-[#FF6B6B] text-[#171717]'
              }`}
            >
              {mode} ORDER
            </span>
            <span className="font-display font-black text-lg text-[#171717]">{asset.symbol}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded border-2 border-[#171717] hover:bg-[#E5E5DE] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-[#171717]" />
          </button>
        </div>

        {/* Asset Details Card */}
        <div className="p-4 rounded-lg bg-[#FAFAF7] border-2 border-[#171717] mb-5 shadow-[2px_2px_0px_#171717]">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-display font-black text-sm text-[#171717]">{asset.name}</p>
              <p className="text-xs text-[#6B6B6B] font-bold">{asset.category.toUpperCase()}</p>
            </div>
            <div className="text-right">
              <p className="text-base font-mono font-black text-[#171717]">
                {formatINR(asset.currentPrice)}
              </p>
              <p
                className={`font-mono text-xs font-bold ${
                  asset.changePercent >= 0 ? 'text-[#171717]' : 'text-[#FF6B6B]'
                }`}
              >
                {asset.changePercent >= 0 ? '▲ +' : '▼ '}
                {asset.changePercent}%
              </p>
            </div>
          </div>

          {existingHolding && (
            <div className="text-xs text-[#171717] pt-2 border-t border-[#171717]/20 flex justify-between font-bold">
              <span>Owned Position:</span>
              <span className="font-mono">
                {existingHolding.units} units (Avg {formatINR(existingHolding.avgBuyPrice)})
              </span>
            </div>
          )}
        </div>

        {/* Units Input & Quick Buttons */}
        <div className="space-y-3 mb-5">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-display font-bold text-[#171717]">
              <label>Number of Units</label>
              <span className="font-mono text-[11px] text-[#6B6B6B]">
                {isBuy ? `Max Buy: ${maxCanBuy} units` : `Max Sell: ${maxCanSell} units`}
              </span>
            </div>
            <input
              type="number"
              min="1"
              max={isBuy ? maxCanBuy : maxCanSell}
              value={units}
              onChange={(e) => setUnits(Math.max(1, Number(e.target.value)))}
              className="nb-input w-full p-2.5 font-mono font-bold text-base"
            />
          </div>

          {/* Quick Presets */}
          <div className="flex gap-2">
            {[1, 5, 10, 25].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setUnits(preset)}
                className="flex-1 py-1.5 text-xs font-mono font-bold rounded border-2 border-[#171717] bg-[#FFFFFF] hover:bg-[#FAFAF7] shadow-[2px_2px_0px_#171717] transition-all cursor-pointer"
              >
                +{preset}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setUnits(isBuy ? Math.max(1, maxCanBuy) : Math.max(1, maxCanSell))}
              className="flex-1 py-1.5 text-xs font-mono font-black rounded border-2 border-[#171717] bg-[#FFD84D] text-[#171717] shadow-[2px_2px_0px_#171717] transition-all cursor-pointer"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Total Cost & Validation */}
        <div className="p-3.5 rounded-lg bg-[#FAFAF7] border-2 border-[#171717] mb-5 space-y-1 shadow-[2px_2px_0px_#171717]">
          <div className="flex justify-between text-xs text-[#171717] font-bold">
            <span>{isBuy ? 'Total Investment Outflow' : 'Total Proceeds'}</span>
            <span className="text-base font-mono font-black">
              {formatINR(totalCost)}
            </span>
          </div>
          <div className="flex justify-between text-xs text-[#6B6B6B] font-mono">
            <span>Virtual Cash Available</span>
            <span className="font-bold text-[#171717]">{formatINR(virtualCash)}</span>
          </div>

          {!isValid && (
            <div className="pt-2 text-xs text-[#FF6B6B] flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>
                {isBuy
                  ? 'Insufficient virtual cash for this purchase.'
                  : 'Insufficient units owned to sell this quantity.'}
              </span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleConfirm}
          disabled={!isValid}
          className={`nb-btn w-full py-3.5 text-sm ${
            isValid
              ? isBuy
                ? 'nb-btn-primary'
                : 'nb-btn-coral'
              : 'bg-[#E5E5DE] text-[#6B6B6B] border-2 border-[#171717] shadow-none cursor-not-allowed'
          }`}
        >
          <span>{isBuy ? `CONFIRM BUY • ${units} UNITS` : `CONFIRM SELL • ${units} UNITS`}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <p className="text-[11px] font-mono text-[#6B6B6B] text-center mt-3">
          Virtual simulation order • Zero real funds involved
        </p>
      </div>
    </div>
  );
}
