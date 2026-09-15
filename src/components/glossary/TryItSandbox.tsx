'use client';

import React, { useState } from 'react';
import { PlayableConcept } from '../../types';
import { formatINR } from '../../lib/formatters';
import {
  Calculator,
  Sliders,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  RotateCcw,
  Shield,
  ArrowRight,
} from 'lucide-react';

interface TryItSandboxProps {
  concept: PlayableConcept;
  onActivityComplete?: () => void;
}

export function TryItSandbox({ concept, onActivityComplete }: TryItSandboxProps) {
  const widgetType = concept.interactiveWidget.type;

  // 1. Inflation States
  const [infAmount, setInfAmount] = useState(10000);
  const [infRate, setInfRate] = useState(6);
  const [infYears, setInfYears] = useState(10);

  // 2. Compounding States
  const [compInitial, setCompInitial] = useState(25000);
  const [compMonthly, setCompMonthly] = useState(5000);
  const [compRate, setCompRate] = useState(12);
  const [compYears, setCompYears] = useState(15);

  // 3. Diversification States (Total ₹10,000)
  const [stocksPct, setStocksPct] = useState(50);
  const [bondsPct, setBondsPct] = useState(25);
  const [goldPct, setGoldPct] = useState(15);
  const [cashPct, setCashPct] = useState(10);
  const [shockActive, setShockActive] = useState(false);

  // 4. SIP Planner State
  const [sipMonthly, setSipMonthly] = useState(2000);
  const [sipYears, setSipYears] = useState(15);
  const [sipRate, setSipRate] = useState(12);

  // 5. CIBIL Simulator
  const [onTimePay, setOnTimePay] = useState(true);
  const [lowUtil, setLowUtil] = useState(true);
  const [oldCard, setOldCard] = useState(true);
  const [tooManyLoans, setTooManyLoans] = useState(false);

  // Trigger completion callback
  const [hasInteracted, setHasInteracted] = useState(false);

  const markInteracted = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      if (onActivityComplete) onActivityComplete();
    }
  };

  return (
    <div className="p-5 sm:p-7 rounded-xl bg-[#FFFFFF] border-2 border-[#171717] space-y-6 shadow-sm">
      {/* Sandbox Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#171717]">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
            <Sliders className="w-4 h-4" />
          </span>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 font-mono">
              Hands-On Simulation Sandbox
            </span>
            <h4 className="text-base sm:text-lg font-extrabold text-[#171717] mt-0.5">
              {concept.interactiveWidget.title}
            </h4>
          </div>
        </div>
        <span className="text-[11px] font-mono text-[#6B6B6B] hidden sm:inline-block">
          Interactive Math Model
        </span>
      </div>

      <p className="text-xs text-[#171717]/80">{concept.interactiveWidget.instruction}</p>

      {/* ========================================================= */}
      {/* WIDGET: 1. INFLATION SLIDER */}
      {/* ========================================================= */}
      {widgetType === 'inflation-slider' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-[#171717]/80 font-semibold block mb-1">
                Current Basket Cost: {formatINR(infAmount)}
              </label>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={infAmount}
                onChange={(e) => {
                  setInfAmount(Number(e.target.value));
                  markInteracted();
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
            </div>
            <div>
              <label className="text-xs text-[#171717]/80 font-semibold block mb-1">
                Annual Inflation: {infRate}%
              </label>
              <input
                type="range"
                min="3"
                max="12"
                step="0.5"
                value={infRate}
                onChange={(e) => {
                  setInfRate(Number(e.target.value));
                  markInteracted();
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
            </div>
            <div>
              <label className="text-xs text-[#171717]/80 font-semibold block mb-1">
                Time Horizon: {infYears} Years
              </label>
              <input
                type="range"
                min="1"
                max="25"
                value={infYears}
                onChange={(e) => {
                  setInfYears(Number(e.target.value));
                  markInteracted();
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
            </div>
          </div>

          {(() => {
            const futureCost = Math.round(infAmount * Math.pow(1 + infRate / 100, infYears));
            const purchasingLoss = Math.round(((futureCost - infAmount) / futureCost) * 100);

            return (
              <div className="p-4 rounded-lg bg-[#F8F8F3] border-2 border-[#171717] flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <span className="text-xs text-[#6B6B6B]">Future Cost for Same Goods</span>
                  <h3 className="text-2xl font-extrabold text-amber-600 font-mono">
                    {formatINR(futureCost)}
                  </h3>
                </div>
                <div className="text-right text-xs space-y-0.5">
                  <p className="text-[#171717]/80">
                    Additional Money Needed:{' '}
                    <span className="text-rose-600 font-bold font-mono">
                      +{formatINR(futureCost - infAmount)}
                    </span>
                  </p>
                  <p className="text-[#6B6B6B]">
                    Purchasing Power Eroded:{' '}
                    <span className="font-mono text-amber-600 font-bold">~{purchasingLoss}%</span>
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================= */}
      {/* WIDGET: 2. COMPOUNDING SANDBOX */}
      {/* ========================================================= */}
      {widgetType === 'compound-sandbox' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-[#171717]/80 font-semibold block mb-1">
                Initial: {formatINR(compInitial)}
              </label>
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={compInitial}
                onChange={(e) => {
                  setCompInitial(Number(e.target.value));
                  markInteracted();
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-[#171717]/80 font-semibold block mb-1">
                Monthly SIP: {formatINR(compMonthly)}
              </label>
              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={compMonthly}
                onChange={(e) => {
                  setCompMonthly(Number(e.target.value));
                  markInteracted();
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-[#171717]/80 font-semibold block mb-1">
                Expected Return: {compRate}%
              </label>
              <input
                type="range"
                min="6"
                max="18"
                step="1"
                value={compRate}
                onChange={(e) => {
                  setCompRate(Number(e.target.value));
                  markInteracted();
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-[#171717]/80 font-semibold block mb-1">
                Tenure: {compYears} Years
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={compYears}
                onChange={(e) => {
                  setCompYears(Number(e.target.value));
                  markInteracted();
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          {(() => {
            const months = compYears * 12;
            const r = compRate / 12 / 100;
            const fvPrincipal = compInitial * Math.pow(1 + r, months);
            const fvSip = r > 0 ? compMonthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r) : compMonthly * months;
            const totalWealth = Math.round(fvPrincipal + fvSip);
            const totalInvested = compInitial + compMonthly * months;
            const gains = Math.max(0, totalWealth - totalInvested);

            return (
              <div className="p-4 rounded-lg bg-[#F8F8F3] border-2 border-[#171717] flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <span className="text-xs text-[#6B6B6B]">Projected Future Wealth</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
                    {formatINR(totalWealth)}
                  </h3>
                </div>
                <div className="text-right text-xs space-y-1">
                  <p className="text-[#6B6B6B]">
                    Total Deposited:{' '}
                    <span className="text-[#171717] font-mono font-bold">
                      {formatINR(totalInvested)}
                    </span>
                  </p>
                  <p className="text-teal-600">
                    Estimated Wealth Gains:{' '}
                    <span className="font-mono font-bold">+{formatINR(gains)}</span>
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================= */}
      {/* WIDGET: 3. DIVERSIFICATION BASKET SHOCK */}
      {/* ========================================================= */}
      {widgetType === 'diversify-basket' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-[#F8F8F3] border-2 border-[#171717] text-center">
              <span className="text-xs text-[#171717]/80 block mb-1 font-semibold">📈 Stocks ({stocksPct}%)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={stocksPct}
                onChange={(e) => {
                  setStocksPct(Number(e.target.value));
                  markInteracted();
                }}
                className="w-full h-1.5 bg-slate-200 rounded appearance-none cursor-pointer accent-teal-500"
              />
              <span className="text-xs font-mono font-bold text-[#171717] mt-1 block">
                {formatINR((10000 * stocksPct) / 100)}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#F8F8F3] border-2 border-[#171717] text-center">
              <span className="text-xs text-[#171717]/80 block mb-1 font-semibold">🏦 Bonds ({bondsPct}%)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={bondsPct}
                onChange={(e) => {
                  setBondsPct(Number(e.target.value));
                  markInteracted();
                }}
                className="w-full h-1.5 bg-slate-200 rounded appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-xs font-mono font-bold text-[#171717] mt-1 block">
                {formatINR((10000 * bondsPct) / 100)}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#F8F8F3] border-2 border-[#171717] text-center">
              <span className="text-xs text-[#171717]/80 block mb-1 font-semibold">🥇 Gold ({goldPct}%)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={goldPct}
                onChange={(e) => {
                  setGoldPct(Number(e.target.value));
                  markInteracted();
                }}
                className="w-full h-1.5 bg-slate-200 rounded appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-xs font-mono font-bold text-[#171717] mt-1 block">
                {formatINR((10000 * goldPct) / 100)}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#F8F8F3] border-2 border-[#171717] text-center">
              <span className="text-xs text-[#171717]/80 block mb-1 font-semibold">💰 Cash ({cashPct}%)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={cashPct}
                onChange={(e) => {
                  setCashPct(Number(e.target.value));
                  markInteracted();
                }}
                className="w-full h-1.5 bg-slate-200 rounded appearance-none cursor-pointer accent-emerald-500"
              />
              <span className="text-xs font-mono font-bold text-[#171717] mt-1 block">
                {formatINR((10000 * cashPct) / 100)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-lg bg-[#F8F8F3] border-2 border-[#171717]">
            <div>
              <p className="text-xs text-[#6B6B6B]">Total Portfolio Value (Initial: ₹10,000)</p>
              {(() => {
                // Scenario: Stock crash (-30%), Bonds (+4%), Gold (+10%), Cash (0%)
                const stockVal = shockActive ? (10000 * (stocksPct / 100)) * 0.70 : (10000 * stocksPct) / 100;
                const bondVal = shockActive ? (10000 * (bondsPct / 100)) * 1.04 : (10000 * bondsPct) / 100;
                const goldVal = shockActive ? (10000 * (goldPct / 100)) * 1.10 : (10000 * goldPct) / 100;
                const cashVal = (10000 * cashPct) / 100;
                const currentTotal = Math.round(stockVal + bondVal + goldVal + cashVal);
                const pnl = currentTotal - 10000;

                return (
                  <h3
                    className={`text-2xl font-extrabold font-mono ${
                      shockActive ? (pnl >= 0 ? 'text-emerald-600' : 'text-amber-600') : 'text-[#171717]'
                    }`}
                  >
                    {formatINR(currentTotal)}{' '}
                    {shockActive && (
                      <span className="text-sm font-normal">
                        ({pnl >= 0 ? '+' : ''}
                        {((pnl / 10000) * 100).toFixed(1)}%)
                      </span>
                    )}
                  </h3>
                );
              })()}
            </div>

            <button
              onClick={() => {
                setShockActive(!shockActive);
                markInteracted();
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                shockActive
                  ? 'bg-slate-100 text-[#171717] hover:bg-slate-200:bg-slate-700'
                  : 'bg-rose-500 text-white shadow-md shadow-rose-500/20 hover:scale-105'
              }`}
            >
              {shockActive ? 'Reset Market Shock' : 'Simulate Stock Market Crash (-30%)'}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* WIDGET: 4. SIP PLANNER */}
      {/* ========================================================= */}
      {widgetType === 'sip-planner' && (
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs text-[#171717]/80 font-semibold block">
              Choose Monthly SIP Amount:
            </label>
            <div className="flex flex-wrap gap-2">
              {[500, 1000, 2000, 5000, 10000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setSipMonthly(amt);
                    markInteracted();
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    sipMonthly === amt
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm'
                      : 'bg-slate-100 text-[#171717] hover:bg-slate-200:bg-slate-700'
                  }`}
                >
                  {formatINR(amt)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#171717]/80 font-semibold block mb-1">
                Duration: {sipYears} Years
              </label>
              <input
                type="range"
                min="3"
                max="30"
                value={sipYears}
                onChange={(e) => {
                  setSipYears(Number(e.target.value));
                  markInteracted();
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-[#171717]/80 font-semibold block mb-1">
                Expected Annual Return: {sipRate}%
              </label>
              <input
                type="range"
                min="8"
                max="16"
                step="0.5"
                value={sipRate}
                onChange={(e) => {
                  setSipRate(Number(e.target.value));
                  markInteracted();
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          {(() => {
            const months = sipYears * 12;
            const r = sipRate / 12 / 100;
            const totalWealth = Math.round(
              sipMonthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
            );
            const totalInvested = sipMonthly * months;

            return (
              <div className="p-4 rounded-lg bg-[#F8F8F3] border-2 border-[#171717] flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <span className="text-xs text-[#6B6B6B]">Total Accumulated Corpus</span>
                  <h3 className="text-2xl font-extrabold text-emerald-600 font-mono">
                    {formatINR(totalWealth)}
                  </h3>
                </div>
                <div className="text-right text-xs space-y-1">
                  <p className="text-[#6B6B6B]">
                    Your Total Contribution: <strong className="text-[#171717] font-mono">{formatINR(totalInvested)}</strong>
                  </p>
                  <p className="text-teal-600">
                    Net Wealth Gains: <strong className="font-mono font-bold">+{formatINR(totalWealth - totalInvested)}</strong>
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================= */}
      {/* WIDGET: 5. CIBIL SCORE SIMULATOR */}
      {/* ========================================================= */}
      {widgetType === 'cibil-simulator' && (
        <div className="space-y-5">
          <p className="text-xs text-[#171717]/80">
            Toggle personal credit habits to see the resulting CIBIL score:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                setOnTimePay(!onTimePay);
                markInteracted();
              }}
              className={`p-3.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                onTimePay
                  ? 'bg-emerald-50 border-[#171717] text-emerald-800'
                  : 'bg-rose-50 border-[#171717] text-rose-800'
              }`}
            >
              <span>100% On-Time Repayments</span>
              <span className="font-bold">{onTimePay ? '✅ Yes (+70 pts)' : '❌ Missed (-90 pts)'}</span>
            </button>

            <button
              onClick={() => {
                setLowUtil(!lowUtil);
                markInteracted();
              }}
              className={`p-3.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                lowUtil
                  ? 'bg-emerald-50 border-[#171717] text-emerald-800'
                  : 'bg-rose-50 border-[#171717] text-rose-800'
              }`}
            >
              <span>Credit Card Utilization &lt; 30%</span>
              <span className="font-bold">{lowUtil ? '✅ Yes (+40 pts)' : '❌ Maxed Out (-60 pts)'}</span>
            </button>

            <button
              onClick={() => {
                setOldCard(!oldCard);
                markInteracted();
              }}
              className={`p-3.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                oldCard
                  ? 'bg-emerald-50 border-[#171717] text-emerald-800'
                  : 'bg-[#F8F8F3] border-[#171717] text-[#171717]/80'
              }`}
            >
              <span>Long Credit History (5+ Yrs)</span>
              <span className="font-bold">{oldCard ? '✅ Active (+30 pts)' : '❌ Brand New'}</span>
            </button>

            <button
              onClick={() => {
                setTooManyLoans(!tooManyLoans);
                markInteracted();
              }}
              className={`p-3.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                !tooManyLoans
                  ? 'bg-emerald-50 border-[#171717] text-emerald-800'
                  : 'bg-rose-50 border-[#171717] text-rose-800'
              }`}
            >
              <span>Multiple Simultaneous Loan Enquiries</span>
              <span className="font-bold">{tooManyLoans ? '❌ Yes (-40 pts)' : '✅ None (+10 pts)'}</span>
            </button>
          </div>

          {(() => {
            let score = 650;
            if (onTimePay) score += 70; else score -= 90;
            if (lowUtil) score += 40; else score -= 60;
            if (oldCard) score += 30;
            if (tooManyLoans) score -= 40; else score += 10;
            score = Math.min(900, Math.max(300, score));

            const isPrime = score >= 750;

            return (
              <div className="p-4 rounded-lg bg-[#F8F8F3] border-2 border-[#171717] flex justify-between items-center">
                <div>
                  <span className="text-xs text-[#6B6B6B]">Simulated CIBIL Score</span>
                  <h3
                    className={`text-3xl font-extrabold font-mono ${
                      isPrime ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {score}
                  </h3>
                </div>
                <div className="text-right text-xs">
                  <span
                    className={`px-3 py-1 rounded-full font-bold inline-block mb-1 ${
                      isPrime
                        ? 'bg-emerald-50 text-emerald-700 border-2 border-[#171717]'
                        : 'bg-amber-50 text-amber-700 border-2 border-[#171717]'
                    }`}
                  >
                    {isPrime ? 'Prime / Instant Approvals' : 'High Risk / Higher EMI'}
                  </span>
                  <p className="text-[11px] text-[#6B6B6B]">
                    {isPrime ? 'Eligible for lowest home loan rates' : 'Banks may ask for extra collateral'}
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================= */}
      {/* GENERIC / DEFAULT SANDBOX */}
      {/* ========================================================= */}
      {widgetType === 'generic' && (
        <div className="p-6 rounded-lg bg-[#F8F8F3] text-center space-y-4 border-2 border-[#171717]">
          <div className="w-12 h-12 rounded-lg bg-teal-50 text-teal-600 mx-auto flex items-center justify-center font-bold text-xl">
            {concept.categoryIcon}
          </div>
          <div>
            <h5 className="font-bold text-[#171717] text-sm">{concept.interactiveWidget.title}</h5>
            <p className="text-xs text-[#171717]/80 mt-1 max-w-md mx-auto">
              {concept.interactiveWidget.instruction}
            </p>
          </div>
          <button
            onClick={markInteracted}
            className="px-4 py-2 rounded-xl bg-teal-500 text-white font-bold text-xs hover:scale-105 transition-transform shadow-xs"
          >
            Mark Activity Completed
          </button>
        </div>
      )}
    </div>
  );
}
