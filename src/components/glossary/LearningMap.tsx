'use client';

import React from 'react';
import { PlayableConcept, GlossaryCategory, ConceptMasteryStatus } from '../../types';
import { Lock, Star, CheckCircle2, Play, Sparkles, Award } from 'lucide-react';

interface LearningMapProps {
  concepts: PlayableConcept[];
  masteryMap: Record<string, ConceptMasteryStatus>;
  onSelectConcept: (concept: PlayableConcept) => void;
}

const CATEGORY_ORDER: { category: GlossaryCategory; title: string; emoji: string; accentBg: string; desc: string }[] = [
  {
    category: 'Money Basics',
    title: 'Level 1: Money Basics',
    emoji: '💰',
    accentBg: 'bg-[#FFD84D]',
    desc: 'Foundational money rules, inflation survival, and emergency funds.',
  },
  {
    category: 'Banking',
    title: 'Level 2: Banking & Central Bank',
    emoji: '🏦',
    accentBg: 'bg-[#6C8CFF]',
    desc: 'How RBI controls rates, fixed deposits, and bank safety insurance.',
  },
  {
    category: 'Credit',
    title: 'Level 3: Credit & Borrowing',
    emoji: '💳',
    accentBg: 'bg-[#FF8FAB]',
    desc: 'Mastering CIBIL scores, loan EMIs, and debt traps.',
  },
  {
    category: 'Investing',
    title: 'Level 4: Long-Term Investing',
    emoji: '📈',
    accentBg: 'bg-[#70E000]',
    desc: 'Compounding miracles, equity ownership, mutual funds, and automated SIPs.',
  },
  {
    category: 'Markets',
    title: 'Level 5: Market Dynamics',
    emoji: '📊',
    accentBg: 'bg-[#FFD84D]',
    desc: 'Bull vs bear cycles, market capitalization, and volatility.',
  },
  {
    category: 'Risk',
    title: 'Level 6: Risk Management',
    emoji: '⚖️',
    accentBg: 'bg-[#FF8FAB]',
    desc: 'Asset allocation, avoiding concentration catastrophe, and risk resilience.',
  },
  {
    category: 'Taxes',
    title: 'Level 7: Taxes & Optimization',
    emoji: '🧾',
    accentBg: 'bg-[#6C8CFF]',
    desc: 'Capital gains rules, Budget 2024 thresholds, and tax-saving.',
  },
  {
    category: 'Wealth',
    title: 'Level 8: Wealth & Freedom',
    emoji: '💎',
    accentBg: 'bg-[#70E000]',
    desc: 'Net worth calculations, financial independence, and generational security.',
  },
];

export function LearningMap({ concepts, masteryMap, onSelectConcept }: LearningMapProps) {
  return (
    <div className="space-y-12 max-w-3xl mx-auto py-4">
      {CATEGORY_ORDER.map((tier, tierIdx) => {
        const tierConcepts = concepts
          .filter((c) => c.category === tier.category)
          .sort((a, b) => a.order - b.order);

        if (tierConcepts.length === 0) return null;

        const masteredInTier = tierConcepts.filter(
          (c) => masteryMap[c.id] === 'mastered'
        ).length;
        const isTierComplete = masteredInTier === tierConcepts.length;

        return (
          <div key={tier.category} className="relative">
            {/* Connecting solid black line to next tier */}
            {tierIdx < CATEGORY_ORDER.length - 1 && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1 h-12 bg-[#171717] z-0 translate-y-full" />
            )}

            {/* Tier Header Neo-Brutalist Card */}
            <div className="relative z-10 p-5 rounded-xl bg-[#FFFFFF] border-3 border-[#171717] shadow-[4px_4px_0px_#171717] mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg border-2 border-[#171717] ${tier.accentBg} flex items-center justify-center text-2xl shadow-[2px_2px_0px_#171717] text-[#171717] font-black shrink-0`}
                  >
                    {tier.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-black font-space-grotesk text-[#171717]">
                        {tier.title}
                      </h3>
                      {isTierComplete && (
                        <span className="flex items-center gap-1 text-[10px] font-black font-mono px-2 py-0.5 rounded bg-[#70E000] text-[#171717] border border-[#171717] shadow-[1px_1px_0px_#171717]">
                          <CheckCircle2 className="w-3 h-3 text-[#171717]" />
                          <span>TIER MASTERED</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-[#171717]/75 mt-0.5">{tier.desc}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-black text-[#171717] bg-[#F8F8F3] px-2 py-0.5 border border-[#171717] rounded">
                    {masteredInTier} / {tierConcepts.length} Mastered
                  </span>
                  <div className="w-28 bg-[#E5E5DE] border-2 border-[#171717] rounded-full h-3 mt-1.5 overflow-hidden">
                    <div
                      style={{ width: `${(masteredInTier / tierConcepts.length) * 100}%` }}
                      className="bg-[#70E000] h-full transition-all duration-300 border-r border-[#171717]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Concept Nodes - Winding Path */}
            <div className="relative z-10 flex flex-col items-center space-y-4">
              {tierConcepts.map((concept, cIdx) => {
                const status = masteryMap[concept.id] || 'learning';
                const isMastered = status === 'mastered';

                const offsetClass =
                  cIdx % 3 === 1
                    ? 'sm:translate-x-8'
                    : cIdx % 3 === 2
                    ? 'sm:-translate-x-8'
                    : 'sm:translate-x-0';

                return (
                  <button
                    key={concept.id}
                    onClick={() => onSelectConcept(concept)}
                    className={`group relative flex items-center gap-4 p-4 pr-5 rounded-xl border-3 border-[#171717] transition-all duration-150 w-full max-w-md text-left cursor-pointer hover:-translate-y-1 hover:shadow-[5px_5px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#171717] ${offsetClass} ${
                      isMastered
                        ? 'bg-[#E7F9D1] shadow-[4px_4px_0px_#171717]'
                        : 'bg-[#FFFFFF] shadow-[3px_3px_0px_#171717]'
                    }`}
                  >
                    {/* Node Box Icon */}
                    <div
                      className={`w-11 h-11 rounded-lg border-2 border-[#171717] flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_#171717] shrink-0 transition-transform group-hover:scale-105 ${
                        isMastered
                          ? 'bg-[#70E000] text-[#171717]'
                          : 'bg-[#F8F8F3] text-[#171717]'
                      }`}
                    >
                      {isMastered ? <Star className="w-5 h-5 fill-[#171717] text-[#171717]" /> : concept.categoryIcon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black font-space-grotesk text-[#171717] tracking-tight group-hover:underline truncate">
                          {concept.term}
                        </span>
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border border-[#171717] shrink-0 ${
                            concept.difficulty === 'Beginner'
                              ? 'bg-[#70E000] text-[#171717]'
                              : concept.difficulty === 'Intermediate'
                              ? 'bg-[#FFD84D] text-[#171717]'
                              : 'bg-[#FF8FAB] text-[#171717]'
                          }`}
                        >
                          {concept.difficulty}
                        </span>
                      </div>
                      <p className="text-[11px] font-medium text-[#171717]/75 truncate mt-0.5">
                        {concept.simpleOneLiner}
                      </p>
                    </div>

                    {/* Right Play Indicator */}
                    <div className="shrink-0 flex items-center gap-1.5">
                      {isMastered ? (
                        <span className="w-7 h-7 rounded-lg bg-[#70E000] border-2 border-[#171717] flex items-center justify-center shadow-[1px_1px_0px_#171717]">
                          <CheckCircle2 className="w-4 h-4 text-[#171717]" />
                        </span>
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] group-hover:bg-[#70E000] flex items-center justify-center text-[#171717] shadow-[1px_1px_0px_#171717] transition-colors">
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
