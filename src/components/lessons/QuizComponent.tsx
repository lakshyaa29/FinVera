'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { ArrowRight } from 'lucide-react';

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (allCorrect: boolean) => void;
}

export function QuizComponent({ questions, onComplete }: QuizComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const isCorrect = selectedOption === currentQ.correctIndex;
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    setUserAnswers((prev) => [...prev, selectedOption]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalAnswers = [...userAnswers];
      const allPassed = questions.every((q, idx) => finalAnswers[idx] === q.correctIndex);
      onComplete(allPassed);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    }
  };

  return (
    <div className="bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-6 sm:p-7 shadow-[5px_5px_0px_#171717]">
      {/* Quiz Progress Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-[#171717] mb-6">
        <div>
          <span className="nb-tag bg-[#FFD84D] text-[#171717] mb-1">
            KNOWLEDGE CHECK
          </span>
          <h4 className="font-display font-black text-lg text-[#171717]">
            QUESTION {currentIndex + 1} OF {questions.length}
          </h4>
        </div>

        {/* Step Indicator Pills */}
        <div className="flex items-center gap-1.5">
          {questions.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded border-2 border-[#171717] transition-all ${
                idx === currentIndex
                  ? 'bg-[#70E000] scale-110 shadow-[1px_1px_0px_#171717]'
                  : idx < currentIndex
                  ? 'bg-[#171717]'
                  : 'bg-[#E5E5DE]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Text */}
      <h3 className="font-display font-black text-lg sm:text-xl text-[#171717] mb-6 leading-snug">
        {currentQ.question}
      </h3>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          let buttonClass = 'bg-[#FFFFFF] hover:bg-[#FAFAF7] shadow-[3px_3px_0px_#171717]';

          if (isAnswerSubmitted) {
            if (idx === currentQ.correctIndex) {
              buttonClass = 'bg-[#70E000] shadow-[2px_2px_0px_#171717] translate-x-0.5 translate-y-0.5 font-bold';
            } else if (isSelected && !isCorrect) {
              buttonClass = 'bg-[#FF6B6B] text-[#171717] shadow-[2px_2px_0px_#171717] translate-x-0.5 translate-y-0.5 font-bold';
            } else {
              buttonClass = 'bg-[#F8F8F3] opacity-50 shadow-none';
            }
          } else if (isSelected) {
            buttonClass = 'bg-[#FFD84D] shadow-[2px_2px_0px_#171717] translate-x-0.5 translate-y-0.5 font-bold';
          }

          return (
            <button
              key={idx}
              onClick={() => !isAnswerSubmitted && setSelectedOption(idx)}
              disabled={isAnswerSubmitted}
              className={`w-full text-left p-4 rounded-lg border-2 border-[#171717] transition-all text-xs sm:text-sm flex items-center justify-between gap-3 cursor-pointer ${buttonClass}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded border-2 border-[#171717] flex items-center justify-center font-display font-black text-xs shrink-0 ${
                    isSelected
                      ? 'bg-[#171717] text-white'
                      : 'bg-[#FFFFFF] text-[#171717]'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="font-display font-bold text-[#171717]">{option}</span>
              </div>

              {isAnswerSubmitted && idx === currentQ.correctIndex && (
                <span className="font-mono text-xs font-black text-[#171717] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#171717]">
                  ✓ CORRECT
                </span>
              )}
              {isAnswerSubmitted && isSelected && !isCorrect && (
                <span className="font-mono text-xs font-black text-[#171717] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#171717]">
                  ✕ INCORRECT
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner Upon Submit */}
      {isAnswerSubmitted && (
        <div
          className={`p-4 rounded-lg border-2 border-[#171717] mb-6 text-xs sm:text-sm leading-relaxed shadow-[3px_3px_0px_#171717] animate-in fade-in duration-100 ${
            isCorrect
              ? 'bg-[#EBFBF4]'
              : 'bg-[#FFEBEB]'
          }`}
        >
          <div className="flex items-center gap-1.5 font-display font-black text-sm mb-1 text-[#171717]">
            {isCorrect ? (
              <span>✓ Well done! That is correct.</span>
            ) : (
              <span>✕ Review the concept:</span>
            )}
          </div>
          <p className="text-[#171717] font-medium mt-1">{currentQ.explanation}</p>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-end">
        {!isAnswerSubmitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
            className={`nb-btn ${
              selectedOption !== null
                ? 'nb-btn-primary'
                : 'bg-[#E5E5DE] text-[#6B6B6B] border-2 border-[#171717] shadow-none cursor-not-allowed'
            }`}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="nb-btn nb-btn-primary"
          >
            <span>{isLastQuestion ? 'Complete Lesson' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}
      </div>
    </div>
  );
}
