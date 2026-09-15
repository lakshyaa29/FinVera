'use client';

import React, { useState, useEffect } from 'react';
import { DailyFinanceChallenge } from '../../types';
import { useUserState } from '../../context/UserStateContext';
import { Flame, CheckCircle2, XCircle, Sparkles, Award } from 'lucide-react';

interface DailyChallengeBannerProps {
  challenge: DailyFinanceChallenge;
}

export function DailyChallengeBanner({ challenge }: DailyChallengeBannerProps) {
  const { awardGlossaryXp } = useUserState();
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasClaimedXp, setHasClaimedXp] = useState(false);

  // Check localStorage for today's challenge completion
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const key = `finvera_daily_challenge_${challenge.id}_${today}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSelectedOptionId(parsed.selectedId);
        setIsAnswered(true);
        setIsCorrect(parsed.isCorrect);
        setHasClaimedXp(true);
      } catch {
        // ignore parse error
      }
    }
  }, [challenge.id]);

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    const option = challenge.options.find((o) => o.id === optionId);
    if (!option) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);
    const correct = option.isCorrect;
    setIsCorrect(correct);

    const today = new Date().toISOString().split('T')[0];
    const key = `finvera_daily_challenge_${challenge.id}_${today}`;
    localStorage.setItem(key, JSON.stringify({ selectedId: optionId, isCorrect: correct }));

    if (correct && !hasClaimedXp) {
      awardGlossaryXp(challenge.id, 'daily-challenge', challenge.xpReward);
      setHasClaimedXp(true);
    }
  };

  const selectedOption = challenge.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#FFF9E6] border-3 border-[#171717] p-5 sm:p-6 shadow-[4px_4px_0px_#171717]">
      <div className="relative z-10 space-y-4">
        {/* Banner Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#FFD84D] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] font-black text-[#171717]">
              <Flame className="w-5 h-5 fill-[#171717]" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#171717] font-mono">
                  DAILY DILEMMA CHALLENGE
                </span>
                <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-[#70E000] text-[#171717] border border-[#171717]">
                  +{challenge.xpReward} XP
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black font-space-grotesk text-[#171717] tracking-tight">
                {challenge.title}
              </h3>
            </div>
          </div>

          {isAnswered && (
            <span
              className={`text-xs font-black font-space-grotesk px-3 py-1 rounded-lg border-2 border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center gap-1.5 ${
                isCorrect
                  ? 'bg-[#70E000] text-[#171717]'
                  : 'bg-[#FF8FAB] text-[#171717]'
              }`}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#171717]" />
                  <span>SOLVED (+{challenge.xpReward} XP)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-[#171717]" />
                  <span>LEARNED FOR TOMORROW</span>
                </>
              )}
            </span>
          )}
        </div>

        {/* Question text */}
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-bold text-[#171717] leading-relaxed">
            {challenge.question}
          </p>
          {challenge.context && (
            <p className="text-[11px] text-[#6B6B6B] font-medium italic">Context: {challenge.context}</p>
          )}
        </div>

        {/* Option buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {challenge.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            let btnStyle = 'bg-[#FFFFFF] border-[#171717] text-[#171717] shadow-[2px_2px_0px_#171717] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#171717]';

            if (isAnswered) {
              if (opt.isCorrect) {
                btnStyle = 'bg-[#70E000] border-[#171717] text-[#171717] font-black shadow-[3px_3px_0px_#171717]';
              } else if (isSelected) {
                btnStyle = 'bg-[#FF8FAB] border-[#171717] text-[#171717] font-bold shadow-[2px_2px_0px_#171717]';
              } else {
                btnStyle = 'bg-[#F8F8F3] border-[#171717]/40 text-[#6B6B6B] opacity-60';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isAnswered}
                className={`p-3 rounded-lg border-2 text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
              >
                <span className="font-mono font-black uppercase text-[10px] w-5 h-5 rounded bg-[#F8F8F3] border border-[#171717] text-[#171717] flex items-center justify-center shrink-0 mt-0.5">
                  {opt.id}
                </span>
                <span className="leading-snug font-medium">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation Banner when answered */}
        {isAnswered && selectedOption && (
          <div
            className={`p-3.5 rounded-lg border-2 border-[#171717] shadow-[2px_2px_0px_#171717] text-xs leading-relaxed flex items-start gap-2.5 ${
              isCorrect
                ? 'bg-[#E7F9D1] text-[#171717]'
                : 'bg-[#FFFFFF] text-[#171717]'
            }`}
          >
            {isCorrect ? (
              <Sparkles className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
            ) : (
              <Award className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-black font-space-grotesk mb-0.5">
                {isCorrect ? '🎉 Correct Answer!' : '💡 Educational Takeaway:'}
              </p>
              <p className="text-[11px] font-medium text-[#171717]/80">{selectedOption.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
