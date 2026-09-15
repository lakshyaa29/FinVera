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
  returnsLabel = 'Estimated Gains',
}: CalculatorGrowthChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const displayPoints =
    data.length > 15
      ? data.filter((_, i) => i === 0 || (i + 1) % Math.ceil(data.length / 10) === 0 || i === data.length - 1)
      : data;

  const maxTotal = Math.max(...displayPoints.map((d) => d.total), 1);
  const activePoint = hoveredIndex !== null ? displayPoints[hoveredIndex] : displayPoints[displayPoints.length - 1];

  return (
    <div className="bg-[#FAFAF7] border-2 border-[#171717] rounded-xl p-4 sm:p-5 shadow-[3px_3px_0px_#171717]">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-[#171717]">
        <div>
          <h4 className="font-display font-black text-base text-[#171717]">{title.toUpperCase()}</h4>
          <p className="text-xs text-[#6B6B6B] font-medium mt-0.5">
            Year {activePoint.year} Total: <span className="font-mono font-black text-[#171717]">{formatINR(activePoint.total, true)}</span>
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-mono font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#6C8CFF] border border-[#171717]" />
            <span className="text-[#171717]">{investedLabel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#70E000] border border-[#171717]" />
            <span className="text-[#171717]">{returnsLabel}</span>
          </div>
        </div>
      </div>

      {/* Stacked Bar Visualization */}
      <div className="h-48 sm:h-56 flex items-end gap-1.5 sm:gap-2.5 pt-6 px-1">
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
                <div className="absolute -top-12 z-20 px-2.5 py-1 bg-[#171717] text-white border border-[#171717] rounded text-[11px] font-mono whitespace-nowrap shadow-[2px_2px_0px_#70E000] pointer-events-none">
                  <div className="font-bold text-[#70E000]">Yr {d.year}: {formatINR(d.total)}</div>
                  <div className="text-[10px] text-[#E5E5DE]">
                    Cost: {formatINR(d.invested, true)} | Gain: {formatINR(d.returns, true)}
                  </div>
                </div>
              )}

              {/* Stacked Bars with border */}
              <div className="w-full max-w-[32px] flex flex-col justify-end h-full border-2 border-[#171717] rounded-t-sm overflow-hidden shadow-[1px_1px_0px_#171717]">
                {/* Returns portion */}
                <div
                  style={{ height: `${returnsHeight}%` }}
                  className="w-full bg-[#70E000] transition-all duration-200"
                />
                {/* Invested portion */}
                <div
                  style={{ height: `${investedHeight}%` }}
                  className="w-full bg-[#6C8CFF] border-t border-[#171717] transition-all duration-200"
                />
              </div>

              {/* Year Label */}
              <span
                className={`text-[10px] mt-2 font-mono font-bold ${
                  isHovered ? 'text-[#171717] underline' : 'text-[#6B6B6B]'
                }`}
              >
                Y{d.year}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-[11px] font-mono text-[#6B6B6B] text-center border-t-2 border-[#171717]/20 pt-2">
        Hover over bar columns to inspect annual compounding splits.
      </div>
    </div>
  );
}
