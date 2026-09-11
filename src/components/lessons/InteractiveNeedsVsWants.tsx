'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

interface ItemToClassify {
  id: string;
  name: string;
  correctCategory: 'Need' | 'Want';
  explanation: string;
}

const ITEMS: ItemToClassify[] = [
  {
    id: 'rent',
    name: 'Shared Apartment Rent',
    correctCategory: 'Need',
    explanation: 'Basic shelter is an absolute necessity for survival and employment.',
  },
  {
    id: 'streaming',
    name: 'Netflix & Spotify Premium',
    correctCategory: 'Want',
    explanation: 'Digital entertainment brings joy, but is non-essential for survival.',
  },
  {
    id: 'groceries',
    name: 'Weekly Rice, Dal, Veggies & Milk',
    correctCategory: 'Need',
    explanation: 'Basic nutritious home groceries keep you alive and healthy.',
  },
  {
    id: 'cafe',
    name: '₹350 Daily Caramel Macchiato at Starbucks',
    correctCategory: 'Want',
    explanation: 'Daily cafe coffee is a luxury lifestyle upgrade that compounds to ₹10,500/month.',
  },
  {
    id: 'mobile-plan',
    name: 'Basic 4G/5G Connectivity for Work',
    correctCategory: 'Need',
    explanation: 'Having data connectivity in modern India is essential for livelihood and banking.',
  },
  {
    id: 'designer-sneakers',
    name: 'Limited Edition Sneakers (₹14,000)',
    correctCategory: 'Want',
    explanation: 'Footwear is a need, but luxury collector sneakers are purely discretionary.',
  },
];

export function InteractiveNeedsVsWants() {
  const [userChoices, setUserChoices] = useState<Record<string, 'Need' | 'Want'>>({});

  const handleSelect = (itemId: string, choice: 'Need' | 'Want') => {
    setUserChoices((prev) => ({ ...prev, [itemId]: choice }));
  };

  const resetAll = () => setUserChoices({});

  const totalAnswered = Object.keys(userChoices).length;
  const totalCorrect = ITEMS.filter((item) => userChoices[item.id] === item.correctCategory).length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div>
          <h4 className="text-sm font-bold text-white">Interactive Exercise: Needs vs Wants</h4>
          <p className="text-xs text-slate-400">Classify each expenditure accurately.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-emerald-400">
            {totalCorrect} / {ITEMS.length} Correct
          </span>
          {totalAnswered > 0 && (
            <button
              onClick={resetAll}
              className="text-xs text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
              title="Reset"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {ITEMS.map((item) => {
          const userChoice = userChoices[item.id];
          const isAnswered = !!userChoice;
          const isCorrect = userChoice === item.correctCategory;

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all ${
                isAnswered
                  ? isCorrect
                    ? 'bg-emerald-950/30 border-emerald-500/40'
                    : 'bg-rose-950/30 border-rose-500/40'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <span className="text-xs font-semibold text-slate-200">{item.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSelect(item.id, 'Need')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                      userChoice === 'Need'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    Need
                  </button>
                  <button
                    onClick={() => handleSelect(item.id, 'Want')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                      userChoice === 'Want'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    Want
                  </button>
                </div>
              </div>

              {isAnswered && (
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-start gap-1.5 text-xs">
                  {isCorrect ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span className={isCorrect ? 'text-emerald-300' : 'text-rose-300'}>
                    {item.explanation}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
