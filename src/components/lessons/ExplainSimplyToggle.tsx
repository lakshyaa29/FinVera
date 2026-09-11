'use client';

import React, { useState } from 'react';
import { ExplainSimplyData } from '../../types';
import { Sparkles, BookOpen, Lightbulb } from 'lucide-react';

interface ExplainSimplyToggleProps {
  data: ExplainSimplyData;
}

export function ExplainSimplyToggle({ data }: ExplainSimplyToggleProps) {
  const [isSimpleMode, setIsSimpleMode] = useState(true);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-md">
      {/* Header with Switch */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Concept Breakdown
            </span>
            <p className="text-[11px] text-slate-400">Toggle beginner vs technical mode</p>
          </div>
        </div>

        <button
          onClick={() => setIsSimpleMode(!isSimpleMode)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
            isSimpleMode
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              : 'bg-slate-800 text-slate-300 border-slate-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isSimpleMode ? "Explain Like I'm New" : 'Technical View'}</span>
        </button>
      </div>

      {/* Mode Content */}
      <div className="pt-3">
        {isSimpleMode ? (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-emerald-400">In plain English:</span>
              <p className="text-sm text-slate-200 mt-1 leading-relaxed">{data.simple}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Everyday Metaphor
              </span>
              <p className="text-xs text-slate-300 italic">{data.analogy}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2 animate-in fade-in duration-200">
            <span className="text-xs font-bold text-teal-400">Formal Financial Definition:</span>
            <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              {data.technical}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
