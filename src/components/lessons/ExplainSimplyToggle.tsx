'use client';

import React, { useState } from 'react';
import { ExplainSimplyData } from '../../types';
import { Sparkles, Lightbulb } from 'lucide-react';

interface ExplainSimplyToggleProps {
  data: ExplainSimplyData;
}

export function ExplainSimplyToggle({ data }: ExplainSimplyToggleProps) {
  const [isSimpleMode, setIsSimpleMode] = useState(true);

  return (
    <div className="bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-5 shadow-[4px_4px_0px_#171717]">
      {/* Header with Switch */}
      <div className="flex items-center justify-between gap-3 pb-3.5 border-b-2 border-[#171717]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FFD84D] border-2 border-[#171717] flex items-center justify-center shadow-[2px_2px_0px_#171717]">
            <Lightbulb className="w-4 h-4 text-[#171717]" />
          </div>
          <div>
            <span className="font-display font-black text-xs uppercase tracking-wider text-[#171717]">
              DUAL-MODE EXPLANATION
            </span>
            <p className="text-[11px] text-[#6B6B6B] font-medium">Switch between plain English and technical view</p>
          </div>
        </div>

        <button
          onClick={() => setIsSimpleMode(!isSimpleMode)}
          className={`nb-btn text-xs py-1.5 px-3.5 ${
            isSimpleMode
              ? 'nb-btn-primary'
              : 'nb-btn-secondary'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isSimpleMode ? "Explain Like I'm New" : 'Technical View'}</span>
        </button>
      </div>

      {/* Mode Content */}
      <div className="pt-4">
        {isSimpleMode ? (
          <div className="space-y-3.5 animate-in fade-in duration-100">
            <div>
              <span className="nb-tag bg-[#70E000] text-[#171717] mb-2">
                IN PLAIN ENGLISH:
              </span>
              <p className="text-sm sm:text-base text-[#171717] font-medium leading-relaxed mt-2">{data.simple}</p>
            </div>
            <div className="p-3.5 rounded-lg bg-[#FFD84D] border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
              <span className="font-display font-black text-xs text-[#171717] flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Everyday Metaphor
              </span>
              <p className="text-xs text-[#171717] italic leading-relaxed font-medium">{data.analogy}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2 animate-in fade-in duration-100">
            <span className="nb-tag bg-[#6C8CFF] text-[#171717] mb-2">
              FORMAL FINANCIAL SPECIFICATION:
            </span>
            <p className="text-xs sm:text-sm text-[#171717] font-mono leading-relaxed bg-[#FAFAF7] p-4 rounded-lg border-2 border-[#171717] shadow-[2px_2px_0px_#171717] mt-2">
              {data.technical}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
