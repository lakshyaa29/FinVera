'use client';

import React from 'react';

/**
 * 1. THE GROWTH PATH MOTIF (Signature Brand Visual)
 * ●━━●━━●━━●↗
 */
export function GrowthPathMotif({ className = 'h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} overflow-visible`}
      aria-hidden="true"
    >
      {/* Path Line */}
      <path
        d="M 10 20 L 70 20 L 130 20 L 190 20 L 225 10"
        stroke="#171717"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 215 10 L 225 10 L 225 20"
        stroke="#171717"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Nodes */}
      <circle cx="10" cy="20" r="7" fill="#70E000" stroke="#171717" strokeWidth="3" />
      <circle cx="70" cy="20" r="7" fill="#6C8CFF" stroke="#171717" strokeWidth="3" />
      <circle cx="130" cy="20" r="7" fill="#FFD84D" stroke="#171717" strokeWidth="3" />
      <circle cx="190" cy="20" r="7" fill="#B99CFF" stroke="#171717" strokeWidth="3" />
    </svg>
  );
}

/**
 * 2. NEEDS VS WANTS EDITORIAL GRAPHIC
 * ₹50,000 income divided into Needs (50%), Wants (30%), Future (20%)
 */
export function NeedsVsWantsGraphic() {
  return (
    <div className="w-full bg-[#FAFAF7] border-2 border-[#171717] rounded-xl p-5 shadow-[4px_4px_0px_#171717]">
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#171717] mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#70E000] border border-[#171717] rounded-sm" />
          <span className="font-display font-bold text-xs uppercase tracking-wider text-[#171717]">
            The 50/30/20 Rule
          </span>
        </div>
        <span className="font-mono font-bold text-xs px-2 py-0.5 bg-[#FFD84D] border border-[#171717] rounded">
          Monthly Salary: ₹50,000
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Needs */}
        <div className="bg-[#6C8CFF] text-[#171717] border-2 border-[#171717] rounded-lg p-3.5 shadow-[3px_3px_0px_#171717]">
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-display font-extrabold text-sm">NEEDS</span>
            <span className="font-mono font-black text-lg">50%</span>
          </div>
          <div className="font-mono font-bold text-base mb-2">₹25,000</div>
          <p className="text-[11px] leading-tight font-medium opacity-90">
            Rent, groceries, utilities, transit, medicine. Non-negotiables.
          </p>
        </div>

        {/* Wants */}
        <div className="bg-[#FFD84D] text-[#171717] border-2 border-[#171717] rounded-lg p-3.5 shadow-[3px_3px_0px_#171717]">
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-display font-extrabold text-sm">WANTS</span>
            <span className="font-mono font-black text-lg">30%</span>
          </div>
          <div className="font-mono font-bold text-base mb-2">₹15,000</div>
          <p className="text-[11px] leading-tight font-medium opacity-90">
            Dining out, streaming, travel, hobbies, upgrades.
          </p>
        </div>

        {/* Future */}
        <div className="bg-[#70E000] text-[#171717] border-2 border-[#171717] rounded-lg p-3.5 shadow-[3px_3px_0px_#171717]">
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-display font-extrabold text-sm">FUTURE</span>
            <span className="font-mono font-black text-lg">20%</span>
          </div>
          <div className="font-mono font-bold text-base mb-2">₹10,000</div>
          <p className="text-[11px] leading-tight font-medium opacity-90">
            Emergency savings buffer, index SIPs, retirement wealth.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. EMERGENCY FUND EDITORIAL GRAPHIC
 * Protective shield safeguarding 4 vital cash outflow pillars
 */
export function EmergencyFundGraphic() {
  return (
    <div className="w-full bg-[#FFFFFF] border-2 border-[#171717] rounded-xl p-5 shadow-[4px_4px_0px_#171717]">
      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Shield Icon Graphic */}
        <div className="w-24 h-28 bg-[#FFD84D] border-3 border-[#171717] rounded-b-3xl rounded-t-lg shadow-[4px_4px_0px_#171717] flex flex-col items-center justify-center shrink-0">
          <div className="w-10 h-10 rounded-full bg-[#70E000] border-2 border-[#171717] flex items-center justify-center font-display font-black text-base text-[#171717]">
            ₹
          </div>
          <span className="font-display font-extrabold text-[10px] uppercase mt-1 tracking-wider">
            3-6 Months
          </span>
        </div>

        {/* Protected Items */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="font-display font-extrabold text-xs uppercase tracking-wider text-[#171717]">
              Shielded Essentials
            </span>
            <span className="text-[11px] font-bold text-[#6B6B6B]">Liquid High-Safety Bank FD</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#EEF2FF] border border-[#171717] rounded px-3 py-2 text-xs font-bold text-[#171717]">
              🏠 Home Rent
            </div>
            <div className="bg-[#FFEBEB] border border-[#171717] rounded px-3 py-2 text-xs font-bold text-[#171717]">
              🍲 Food & Groceries
            </div>
            <div className="bg-[#EBFBF4] border border-[#171717] rounded px-3 py-2 text-xs font-bold text-[#171717]">
              💊 Medical Emergency
            </div>
            <div className="bg-[#FFF9E0] border border-[#171717] rounded px-3 py-2 text-xs font-bold text-[#171717]">
              ⚡ Electricity & EMIs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 4. INFLATION EDITORIAL GRAPHIC
 * ₹100 note purchasing power erosion over time
 */
export function InflationGraphic() {
  return (
    <div className="w-full bg-[#FFFFFF] border-2 border-[#171717] rounded-xl p-5 shadow-[4px_4px_0px_#171717]">
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#171717] mb-4">
        <span className="font-display font-bold text-xs uppercase tracking-wider text-[#171717]">
          Purchasing Power Erosion (7% Inflation)
        </span>
        <span className="nb-tag bg-[#FF6B6B] text-[#171717]">Cash Value Shrinks</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-center">
        {/* Year 2014 */}
        <div className="p-3 bg-[#EBFBF4] border-2 border-[#171717] rounded-lg">
          <span className="font-mono font-bold text-xs text-[#6B6B6B]">Year 2014</span>
          <div className="my-2 flex justify-center items-center h-12">
            <div className="w-16 h-10 bg-[#70E000] border-2 border-[#171717] rounded flex items-center justify-center font-black font-display text-sm">
              ₹100
            </div>
          </div>
          <span className="font-bold text-xs text-[#171717]">Full Grocery Basket (10 items)</span>
        </div>

        {/* Year 2024 */}
        <div className="p-3 bg-[#FFF9E0] border-2 border-[#171717] rounded-lg">
          <span className="font-mono font-bold text-xs text-[#6B6B6B]">Year 2024</span>
          <div className="my-2 flex justify-center items-center h-12">
            <div className="w-16 h-10 bg-[#FFD84D] border-2 border-[#171717] rounded flex items-center justify-center font-black font-display text-sm">
              ₹100
            </div>
          </div>
          <span className="font-bold text-xs text-[#171717]">Half Basket (5 items)</span>
        </div>

        {/* Year 2034 */}
        <div className="p-3 bg-[#FFEBEB] border-2 border-[#171717] rounded-lg">
          <span className="font-mono font-bold text-xs text-[#6B6B6B]">Year 2034</span>
          <div className="my-2 flex justify-center items-center h-12">
            <div className="w-16 h-10 bg-[#FF6B6B] border-2 border-[#171717] rounded flex items-center justify-center font-black font-display text-sm">
              ₹100
            </div>
          </div>
          <span className="font-bold text-xs text-[#171717]">Pocket Snack (2 items)</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 5. COMPOUNDING COIN STACK GRAPHIC
 * Scaled coin stacks across 1, 5, 10, and 20 years
 */
export function CompoundingGraphic() {
  return (
    <div className="w-full bg-[#FFFFFF] border-2 border-[#171717] rounded-xl p-5 shadow-[4px_4px_0px_#171717]">
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#171717] mb-5">
        <span className="font-display font-bold text-xs uppercase tracking-wider text-[#171717]">
          Exponential Growth Over Time
        </span>
        <span className="nb-tag bg-[#70E000] text-[#171717]">Compounding Engine</span>
      </div>

      <div className="flex items-end justify-between gap-2 h-36 px-2">
        {/* Year 1 */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <span className="font-mono font-bold text-[11px] text-[#6B6B6B]">₹1.1L</span>
          <div className="w-full max-w-[48px] h-6 bg-[#EEF2FF] border-2 border-[#171717] rounded-t-sm shadow-[2px_2px_0px_#171717]" />
          <span className="font-display font-bold text-xs mt-1">Year 1</span>
        </div>

        {/* Year 5 */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <span className="font-mono font-bold text-[11px] text-[#6B6B6B]">₹1.8L</span>
          <div className="w-full max-w-[48px] h-12 bg-[#FFD84D] border-2 border-[#171717] rounded-t-sm shadow-[2px_2px_0px_#171717]" />
          <span className="font-display font-bold text-xs mt-1">Year 5</span>
        </div>

        {/* Year 10 */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <span className="font-mono font-bold text-[11px] text-[#6B6B6B]">₹3.2L</span>
          <div className="w-full max-w-[48px] h-20 bg-[#6C8CFF] border-2 border-[#171717] rounded-t-sm shadow-[2px_2px_0px_#171717]" />
          <span className="font-display font-bold text-xs mt-1">Year 10</span>
        </div>

        {/* Year 20 */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <div className="flex items-center gap-1 text-[11px] font-mono font-extrabold text-[#70E000] bg-[#171717] px-1.5 py-0.5 rounded">
            ★ ₹10.3L
          </div>
          <div className="w-full max-w-[48px] h-28 bg-[#70E000] border-2 border-[#171717] rounded-t-sm shadow-[3px_3px_0px_#171717]" />
          <span className="font-display font-bold text-xs mt-1 text-[#171717]">Year 20</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 6. DIVERSIFICATION GRAPHIC
 * One fragile basket vs 4 balanced asset containers
 */
export function DiversificationGraphic() {
  return (
    <div className="w-full bg-[#FFFFFF] border-2 border-[#171717] rounded-xl p-5 shadow-[4px_4px_0px_#171717]">
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#171717] mb-4">
        <span className="font-display font-bold text-xs uppercase tracking-wider text-[#171717]">
          Asset Allocation & Diversification
        </span>
        <span className="nb-tag bg-[#6C8CFF] text-[#171717]">Risk Management</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* High Risk Single Asset */}
        <div className="p-3.5 bg-[#FFEBEB] border-2 border-[#171717] rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-display font-bold text-xs text-[#FF6B6B]">⚠️ Concentrated Risk</span>
            <span className="text-[10px] font-mono font-bold">100% in 1 Stock</span>
          </div>
          <div className="h-8 bg-[#FF6B6B] border-2 border-[#171717] rounded flex items-center justify-center font-display font-bold text-xs text-[#171717]">
            Single Company (If it falls -50%, you lose half your savings)
          </div>
        </div>

        {/* Balanced Diversified Asset Containers */}
        <div className="p-3.5 bg-[#EBFBF4] border-2 border-[#171717] rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-display font-bold text-xs text-[#171717]">🛡️ Diversified Portfolio</span>
            <span className="text-[10px] font-mono font-bold text-[#171717]">All-Weather Stability</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <div className="p-2 bg-[#70E000] border border-[#171717] rounded text-center">
              <span className="font-display font-black text-xs block">50%</span>
              <span className="text-[10px] font-bold block">Equity</span>
            </div>
            <div className="p-2 bg-[#FFD84D] border border-[#171717] rounded text-center">
              <span className="font-display font-black text-xs block">20%</span>
              <span className="text-[10px] font-bold block">Gold</span>
            </div>
            <div className="p-2 bg-[#6C8CFF] border border-[#171717] rounded text-center">
              <span className="font-display font-black text-xs block">20%</span>
              <span className="text-[10px] font-bold block">Debt/FD</span>
            </div>
            <div className="p-2 bg-[#FFFFFF] border border-[#171717] rounded text-center">
              <span className="font-display font-black text-xs block">10%</span>
              <span className="text-[10px] font-bold block">Cash</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 7. RULE OF 72 GRAPHIC
 */
export function RuleOf72Graphic() {
  return (
    <div className="w-full bg-[#FAFAF7] border-2 border-[#171717] rounded-xl p-4 shadow-[3px_3px_0px_#171717]">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-[#B99CFF] border-2 border-[#171717] rounded-lg shadow-[2px_2px_0px_#171717] flex items-center justify-center font-display font-black text-xl text-[#171717] shrink-0">
          72
        </div>
        <div>
          <span className="font-display font-bold text-xs uppercase tracking-wider text-[#171717] block">
            The Rule of 72 Doubling Formula
          </span>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            <strong className="text-[#171717]">72 ÷ Expected Annual Return %</strong> = Years required to double your capital.
          </p>
          <div className="flex gap-2 mt-2">
            <span className="text-[10px] font-mono font-bold bg-[#FFFFFF] border border-[#171717] px-2 py-0.5 rounded">
              @ 12% = 6 Yrs
            </span>
            <span className="text-[10px] font-mono font-bold bg-[#FFFFFF] border border-[#171717] px-2 py-0.5 rounded">
              @ 8% = 9 Yrs
            </span>
            <span className="text-[10px] font-mono font-bold bg-[#FFFFFF] border border-[#171717] px-2 py-0.5 rounded">
              @ 4% = 18 Yrs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 8. ASSET TYPE ICONS
 */
export function AssetTypeIcon({ type }: { type: 'equity' | 'gold' | 'debt' | 'cash' | 'etf' }) {
  switch (type) {
    case 'equity':
      return (
        <div className="w-8 h-8 rounded bg-[#70E000] border-2 border-[#171717] flex items-center justify-center shadow-[2px_2px_0px_#171717]">
          <svg className="w-4 h-4 text-[#171717]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 19L9 13L13 17L21 9" />
            <path d="M21 14V9H16" />
          </svg>
        </div>
      );
    case 'gold':
      return (
        <div className="w-8 h-8 rounded bg-[#FFD84D] border-2 border-[#171717] flex items-center justify-center shadow-[2px_2px_0px_#171717]">
          <span className="font-display font-black text-xs text-[#171717]">AU</span>
        </div>
      );
    case 'debt':
      return (
        <div className="w-8 h-8 rounded bg-[#6C8CFF] border-2 border-[#171717] flex items-center justify-center shadow-[2px_2px_0px_#171717]">
          <svg className="w-4 h-4 text-[#171717]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="7" x2="16" y2="7" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </div>
      );
    case 'cash':
      return (
        <div className="w-8 h-8 rounded bg-[#A8F0D0] border-2 border-[#171717] flex items-center justify-center shadow-[2px_2px_0px_#171717]">
          <span className="font-display font-black text-xs text-[#171717]">₹</span>
        </div>
      );
    case 'etf':
    default:
      return (
        <div className="w-8 h-8 rounded bg-[#B99CFF] border-2 border-[#171717] flex items-center justify-center shadow-[2px_2px_0px_#171717]">
          <svg className="w-4 h-4 text-[#171717]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </div>
      );
  }
}
