'use client';

import React, { useState } from 'react';
import { formatINR } from '../../lib/formatters';

export interface ChartDataPoint {
  year: number;
  invested: number;
  returns: number;
  total: number;
}

interface CalculatorGrowthChartProps {
  data: ChartDataPoint[];
  title?: string;
  investedLabel?: string;
  returnsLabel?: string;
}

export function CalculatorGrowthChart({
  data,
  title = 'Wealth Growth Projection',
  investedLabel = 'Invested Principal',
  returnsLabel = 'Estimated Returns',
}: CalculatorGrowthChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  // Filter or sample data points if there are too many (e.g. max 15 bars for readability)
  const displayPoints =
    data.length > 15
      ? data.filter((_, i) => i === 0 || (i + 1) % Math.ceil(data.length / 10) === 0 || i === data.length - 1)
      : data;

  const maxTotal = Math.max(...displayPoints.map((d) => d.total), 1);
  const activePoint = hoveredIndex !== null ? displayPoints[hoveredIndex] : displayPoints[displayPoints.length - 1];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-semibold text-slate-200">{title}</h4>
          <p className="text-xs text-slate-400">
            Year {activePoint.year} Breakdown: Total {formatINR(activePoint.total, true)}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-teal-500" />
            <span className="text-slate-300">{investedLabel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-400" />
            <span className="text-slate-300">{returnsLabel}</span>
          </div>
        </div>
      </div>

      {/* SVG / Stacked Bar Visualization */}
      <div className="h-48 sm:h-56 flex items-end gap-1 sm:gap-2 pt-6 px-1">
        {displayPoints.map((d, index) => {
          const investedHeight = (d.invested / maxTotal) * 100;
          const returnsHeight = (d.returns / maxTotal) * 100;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={d.year}
              className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip on hover */}
              {isHovered && (
                <div className="absolute -top-12 z-20 px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-[11px] whitespace-nowrap shadow-xl pointer-events-none">
                  <div className="font-bold text-emerald-400">Yr {d.year}: {formatINR(d.total)}</div>
                  <div className="text-[10px] text-slate-400">
                    Invested: {formatINR(d.invested, true)} | Gain: {formatINR(d.returns, true)}
                  </div>
                </div>
              )}

              {/* Stacked Bars */}
              <div className="w-full max-w-[32px] flex flex-col justify-end h-full">
                {/* Returns portion */}
                <div
                  style={{ height: `${returnsHeight}%` }}
                  className={`w-full bg-emerald-400 rounded-t-sm transition-all duration-300 ${
                    isHovered ? 'brightness-125' : 'opacity-90'
                  }`}
                />
                {/* Invested portion */}
                <div
                  style={{ height: `${investedHeight}%` }}
                  className={`w-full bg-teal-600 transition-all duration-300 ${
                    isHovered ? 'brightness-125' : 'opacity-90'
                  }`}
                />
              </div>

              {/* Year Label */}
              <span
                className={`text-[10px] mt-2 font-mono ${
                  isHovered ? 'text-emerald-400 font-bold' : 'text-slate-500'
                }`}
              >
                Y{d.year}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-[11px] text-slate-500 text-center border-t border-slate-800/70 pt-2">
        Hover over any bar to inspect annual compounding milestones.
      </div>
    </div>
  );
}
