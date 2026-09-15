'use client';

import React, { useState } from 'react';
import { Check, X, RefreshCw } from 'lucide-react';

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
    explanation: 'Basic shelter is an absolute necessity for survival and livelihood.',
  },
  {
    id: 'streaming',
    name: 'Netflix & Spotify Premium',
    correctCategory: 'Want',
    explanation: 'Digital entertainment brings joy, but is non-essential for basic living.',
  },
  {
    id: 'groceries',
    name: 'Weekly Rice, Dal, Veggies & Milk',
    correctCategory: 'Need',
    explanation: 'Basic nutritious groceries are essential to stay healthy and productive.',
  },
  {
    id: 'cafe',
    name: '₹350 Daily Caramel Macchiato at Starbucks',
    correctCategory: 'Want',
    explanation: 'Daily cafe coffee is a luxury lifestyle upgrade compounding to ₹10,500/month.',
  },
  {
    id: 'mobile-plan',
    name: 'Basic 4G/5G Connectivity for Work',
    correctCategory: 'Need',
    explanation: 'Mobile data connectivity in modern India is essential for work, UPI, and banking.',
  },
  {
    id: 'designer-sneakers',
    name: 'Limited Edition Sneakers (₹14,000)',
    correctCategory: 'Want',
    explanation: 'Footwear is a necessity, but collector luxury sneakers are purely discretionary.',
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
    <div className="bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-5 shadow-[4px_4px_0px_#171717]">
      <div className="flex items-center justify-between pb-3.5 border-b-2 border-[#171717] mb-4">
        <div>
          <span className="nb-tag bg-[#FFD84D] text-[#171717] mb-1">
            PRACTICE CHALLENGE
          </span>
          <h4 className="font-display font-black text-lg text-[#171717]">CLASSIFY: NEED VS WANT</h4>
          <p className="text-xs text-[#6B6B6B] font-medium">Click Need or Want for each expenditure item.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-black text-[#171717] bg-[#70E000] px-2.5 py-1 rounded border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
            {totalCorrect} / {ITEMS.length} Correct
          </span>
          {totalAnswered > 0 && (
            <button
              onClick={resetAll}
              className="p-1.5 bg-[#FFFFFF] border-2 border-[#171717] rounded shadow-[2px_2px_0px_#171717] hover:bg-[#E5E5DE] transition-colors cursor-pointer"
              title="Reset"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#171717]" />
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
              className={`p-3.5 rounded-lg border-2 border-[#171717] transition-all ${
                isAnswered
                  ? isCorrect
                    ? 'bg-[#EBFBF4]'
                    : 'bg-[#FFEBEB]'
                  : 'bg-[#FAFAF7]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-display font-bold text-xs sm:text-sm text-[#171717]">{item.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSelect(item.id, 'Need')}
                    className={`px-3 py-1 rounded border-2 border-[#171717] font-display font-black text-xs transition-all cursor-pointer ${
                      userChoice === 'Need'
                        ? 'bg-[#6C8CFF] text-[#171717] shadow-[1px_1px_0px_#171717] translate-x-0.5 translate-y-0.5'
                        : 'bg-[#FFFFFF] text-[#171717] shadow-[2px_2px_0px_#171717] hover:shadow-[3px_3px_0px_#171717]'
                    }`}
                  >
                    NEED
                  </button>
                  <button
                    onClick={() => handleSelect(item.id, 'Want')}
                    className={`px-3 py-1 rounded border-2 border-[#171717] font-display font-black text-xs transition-all cursor-pointer ${
                      userChoice === 'Want'
                        ? 'bg-[#FFD84D] text-[#171717] shadow-[1px_1px_0px_#171717] translate-x-0.5 translate-y-0.5'
                        : 'bg-[#FFFFFF] text-[#171717] shadow-[2px_2px_0px_#171717] hover:shadow-[3px_3px_0px_#171717]'
                    }`}
                  >
                    WANT
                  </button>
                </div>
              </div>

              {isAnswered && (
                <div className="mt-2.5 pt-2 border-t-2 border-[#171717]/20 flex items-start gap-2 text-xs">
                  {isCorrect ? (
                    <div className="w-4 h-4 rounded-full bg-[#70E000] border border-[#171717] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black">
                      ✓
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-[#FF6B6B] border border-[#171717] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black text-white">
                      ✕
                    </div>
                  )}
                  <span className="font-medium text-[#171717]">
                    <strong className="font-display uppercase mr-1">{isCorrect ? 'Correct:' : 'Review:'}</strong>
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
