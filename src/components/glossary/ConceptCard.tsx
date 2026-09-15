'use client';

import React from 'react';
import { PlayableConcept, ConceptMasteryStatus } from '../../types';
import { ArrowRight, Star } from 'lucide-react';

interface ConceptCardProps {
  concept: PlayableConcept;
  status: ConceptMasteryStatus;
  onSelect: (concept: PlayableConcept) => void;
}

export function ConceptCard({ concept, status, onSelect }: ConceptCardProps) {
  const isMastered = status === 'mastered';

  return (
    <div
      onClick={() => onSelect(concept)}
      className={`group cursor-pointer p-5 rounded-xl border-3 border-[#171717] transition-all duration-150 flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#171717] ${
        isMastered
          ? 'bg-[#F2FBE8] shadow-[4px_4px_0px_#171717]'
          : 'bg-[#FFFFFF] shadow-[4px_4px_0px_#171717]'
      }`}
    >
      <div className="space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg w-8 h-8 rounded-lg bg-[#F8F8F3] border-2 border-[#171717] flex items-center justify-center shadow-[1px_1px_0px_#171717]">
              {concept.categoryIcon}
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#171717] font-mono">
              {concept.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`text-[10px] font-mono font-black px-2 py-0.5 rounded border border-[#171717] shadow-[1px_1px_0px_#171717] ${
                concept.difficulty === 'Beginner'
                  ? 'bg-[#70E000] text-[#171717]'
                  : concept.difficulty === 'Intermediate'
                  ? 'bg-[#FFD84D] text-[#171717]'
                  : 'bg-[#FF8FAB] text-[#171717]'
              }`}
            >
              {concept.difficulty}
            </span>

            {isMastered && (
              <span className="flex items-center gap-1 text-[10px] font-mono font-black px-2 py-0.5 rounded bg-[#FFD84D] text-[#171717] border border-[#171717] shadow-[1px_1px_0px_#171717]">
                <Star className="w-3 h-3 fill-[#171717] text-[#171717]" />
                <span>MASTERED</span>
              </span>
            )}
          </div>
        </div>

        {/* Term Name */}
        <div>
          <h3 className="text-base sm:text-lg font-black font-space-grotesk text-[#171717] tracking-tight group-hover:underline">
            {concept.term}
          </h3>
          <p className="text-xs font-medium text-[#171717]/80 mt-1 leading-relaxed line-clamp-2">
            &ldquo;{concept.simpleOneLiner}&rdquo;
          </p>
        </div>

        {/* Character Story Snippet */}
        {concept.characterScenario && (
          <div className="p-2.5 rounded-lg bg-[#F8F8F3] border-2 border-[#171717] text-[11px] font-medium text-[#171717] flex items-center gap-2">
            <span className="text-base">{concept.characterScenario.avatar}</span>
            <span className="truncate"><strong>{concept.characterScenario.name}</strong>&apos;s story inside</span>
          </div>
        )}
      </div>

      {/* Footer Actions & Status */}
      <div className="pt-3 border-t-2 border-[#171717] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#171717]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#70E000] border border-[#171717]" />
          <span>4 Stages</span>
          <span className="text-[#171717]/40">•</span>
          <span className="text-[#171717] bg-[#FFD84D] px-1 py-0.2 rounded border border-[#171717]">+75 XP</span>
        </div>

        <button
          type="button"
          className="px-3 py-1.5 rounded-lg font-space-grotesk font-black text-xs bg-[#70E000] text-[#171717] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] group-hover:bg-[#FFD84D] transition-colors flex items-center gap-1"
        >
          <span>PLAY</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
