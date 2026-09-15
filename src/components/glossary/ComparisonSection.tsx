'use client';

import React, { useState } from 'react';
import { CONCEPT_COMPARISONS } from '../../data/glossaryData';
import { Scale, Sparkles } from 'lucide-react';

export function ComparisonSection() {
  const [activeComparisonId, setActiveComparisonId] = useState<string>(CONCEPT_COMPARISONS[0].id);

  const activeComparison =
    CONCEPT_COMPARISONS.find((c) => c.id === activeComparisonId) || CONCEPT_COMPARISONS[0];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="nb-sticker bg-[#FFD84D] text-[#171717]">
              <Scale className="w-3.5 h-3.5 text-[#171717]" />
              HEAD-TO-HEAD BATTLE
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-space-grotesk text-[#171717] mt-1">
            Commonly Confused Financial Concepts
          </h3>
          <p className="text-xs sm:text-sm font-medium text-[#171717]/75 mt-0.5">
            Clear, side-by-side breakdowns to help you make informed real-world decisions.
          </p>
        </div>
      </div>

      {/* Comparison Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CONCEPT_COMPARISONS.map((comp) => {
          const isSelected = activeComparisonId === comp.id;
          return (
            <button
              key={comp.id}
              onClick={() => setActiveComparisonId(comp.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-space-grotesk font-black whitespace-nowrap transition-all flex items-center gap-2 shrink-0 border-2 border-[#171717] cursor-pointer ${
                isSelected
                  ? 'bg-[#FFD84D] text-[#171717] shadow-[3px_3px_0px_#171717] -translate-y-0.5'
                  : 'bg-[#FFFFFF] text-[#171717] shadow-[2px_2px_0px_#171717] hover:bg-[#F8F8F3]'
              }`}
            >
              <span>{comp.title}</span>
              {comp.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-mono font-bold border border-[#171717] ${
                    isSelected
                      ? 'bg-[#FFFFFF] text-[#171717]'
                      : 'bg-[#70E000] text-[#171717]'
                  }`}
                >
                  {comp.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Side by Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Concept A */}
        <div className="p-6 rounded-xl bg-[#FFFFFF] border-3 border-[#171717] shadow-[4px_4px_0px_#171717] space-y-4 relative">
          <div>
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#171717] px-2 py-0.5 rounded bg-[#6C8CFF] text-white border-2 border-[#171717] shadow-[1px_1px_0px_#171717]">
              {activeComparison.conceptA.tag}
            </span>
            <h4 className="text-xl font-black font-space-grotesk text-[#171717] mt-2">
              {activeComparison.conceptA.name}
            </h4>
            <p className="text-xs font-medium text-[#171717]/80 mt-1 leading-relaxed">
              {activeComparison.conceptA.description}
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t-2 border-[#171717] text-xs">
            <div>
              <span className="text-[11px] font-bold text-[#6B6B6B] block mb-0.5 uppercase tracking-wide font-mono">Best For:</span>
              <p className="text-[#171717] font-bold">{activeComparison.conceptA.bestFor}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-[#6B6B6B] block mb-0.5 uppercase tracking-wide font-mono">Risk Factor:</span>
              <p className="text-[#171717] font-medium">{activeComparison.conceptA.risk}</p>
            </div>

            <div className="p-3 rounded-lg bg-[#F8F8F3] border-2 border-[#171717]">
              <span className="text-[10px] font-black text-[#171717] uppercase font-mono block mb-1">
                Real-World Indian Example:
              </span>
              <p className="text-[11px] text-[#171717] italic font-medium">{activeComparison.conceptA.example}</p>
            </div>
          </div>
        </div>

        {/* Concept B */}
        <div className="p-6 rounded-xl bg-[#FFFFFF] border-3 border-[#171717] shadow-[4px_4px_0px_#171717] space-y-4 relative">
          <div>
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#171717] px-2 py-0.5 rounded bg-[#70E000] border-2 border-[#171717] shadow-[1px_1px_0px_#171717]">
              {activeComparison.conceptB.tag}
            </span>
            <h4 className="text-xl font-black font-space-grotesk text-[#171717] mt-2">
              {activeComparison.conceptB.name}
            </h4>
            <p className="text-xs font-medium text-[#171717]/80 mt-1 leading-relaxed">
              {activeComparison.conceptB.description}
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t-2 border-[#171717] text-xs">
            <div>
              <span className="text-[11px] font-bold text-[#6B6B6B] block mb-0.5 uppercase tracking-wide font-mono">Best For:</span>
              <p className="text-[#171717] font-bold">{activeComparison.conceptB.bestFor}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-[#6B6B6B] block mb-0.5 uppercase tracking-wide font-mono">Risk Factor:</span>
              <p className="text-[#171717] font-medium">{activeComparison.conceptB.risk}</p>
            </div>

            <div className="p-3 rounded-lg bg-[#F8F8F3] border-2 border-[#171717]">
              <span className="text-[10px] font-black text-[#171717] uppercase font-mono block mb-1">
                Real-World Indian Example:
              </span>
              <p className="text-[11px] text-[#171717] italic font-medium">{activeComparison.conceptB.example}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line Verdict Neo-Brutalist Box */}
      <div className="p-5 rounded-xl bg-[#FFD84D] border-3 border-[#171717] shadow-[4px_4px_0px_#171717] flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-[#171717] shrink-0 mt-0.5" />
        <div>
          <h5 className="text-xs font-black uppercase tracking-wider text-[#171717] font-mono">
            The FinVera Rule of Thumb
          </h5>
          <p className="text-xs sm:text-sm font-bold text-[#171717] mt-1 leading-relaxed">
            {activeComparison.verdict}
          </p>
        </div>
      </div>
    </div>
  );
}
