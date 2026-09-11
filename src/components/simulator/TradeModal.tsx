'use client';

import React, { useState } from 'react';
import { SimulatedAsset, PortfolioHolding } from '../../types';
import { formatINR } from '../../lib/formatters';
import { X, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <span
              className={`text-xs font-extrabold px-2.5 py-1 rounded-lg uppercase ${
                isBuy ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {mode} Order
            </span>
            <span className="font-bold text-white text-base">{asset.symbol}</span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Asset details card */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 mb-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm font-bold text-white">{asset.name}</p>
              <p className="text-xs text-slate-400">{asset.category}</p>
            </div>
            <div className="text-right">
              <p className="text-base font-extrabold text-white font-mono">
                {formatINR(asset.currentPrice)}
              </p>
              <p
                className={`text-xs font-semibold font-mono ${
                  asset.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {asset.changePercent >= 0 ? '+' : ''}
                {asset.changePercent}% today
              </p>
            </div>
          </div>

          {existingHolding && (
            <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80 flex justify-between">
              <span>You currently own:</span>
              <span className="font-bold text-teal-300 font-mono">
                {existingHolding.units} units (Avg {formatINR(existingHolding.avgBuyPrice)})
              </span>
            </div>
          )}
        </div>

        {/* Units Input & Quick Buttons */}
        <div className="space-y-4 mb-6">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-medium text-slate-300">
              <label>Number of Units</label>
              <span className="text-slate-500 font-mono text-[11px]">
                {isBuy ? `Max Buy: ${maxCanBuy} units` : `Max Sell: ${maxCanSell} units`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max={isBuy ? maxCanBuy : maxCanSell}
                value={units}
                onChange={(e) => setUnits(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 px-4 py-2.5 rounded-xl text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex gap-2">
            {[1, 5, 10, 25].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setUnits(preset)}
                className="flex-1 py-1 text-xs font-mono font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                +{preset}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setUnits(isBuy ? Math.max(1, maxCanBuy) : Math.max(1, maxCanSell))}
              className="flex-1 py-1 text-xs font-mono font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-400 transition-colors"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Total Cost & Validation */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6 space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>{isBuy ? 'Estimated Total Amount' : 'Estimated Total Proceeds'}</span>
            <span className="text-base font-extrabold text-white font-mono">
              {formatINR(totalCost)}
            </span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Virtual Cash Available</span>
            <span className="font-mono text-emerald-400">{formatINR(virtualCash)}</span>
          </div>

          {!isValid && (
            <div className="pt-2 text-xs text-rose-400 flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>
                {isBuy
                  ? 'Insufficient virtual cash to complete this order.'
                  : 'You do not own enough units to sell this quantity.'}
              </span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleConfirm}
          disabled={!isValid}
          className={`w-full py-3 px-5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            isValid
              ? isBuy
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gradient-to-r from-rose-500 to-amber-600 text-white shadow-lg shadow-rose-500/25 hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>{isBuy ? `Confirm Buy ${units} Units` : `Confirm Sell ${units} Units`}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[10px] text-slate-500 text-center mt-3">
          Virtual simulation trade. No real money or bank account involved.
        </p>
      </div>
    </div>
  );
}
