'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle, Award } from 'lucide-react';

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
      // Finished all questions
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
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl">
      {/* Quiz Progress Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold text-xs">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">Knowledge Check</h4>
            <p className="text-xs text-slate-400">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>
        </div>

        {/* Step indicator pills */}
        <div className="flex items-center gap-1.5">
          {questions.map((_, idx) => (
            <span
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-emerald-400 scale-125'
                  : idx < currentIndex
                  ? 'bg-emerald-600'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-5 leading-snug">
        {currentQ.question}
      </h3>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          let buttonStyle = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/60';

          if (isAnswerSubmitted) {
            if (idx === currentQ.correctIndex) {
              buttonStyle = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200';
            } else if (isSelected && !isCorrect) {
              buttonStyle = 'bg-rose-950/40 border-rose-500/80 text-rose-200';
            } else {
              buttonStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
            }
          } else if (isSelected) {
            buttonStyle = 'bg-emerald-500/15 border-emerald-400 text-white shadow-sm';
          }

          return (
            <button
              key={idx}
              onClick={() => !isAnswerSubmitted && setSelectedOption(idx)}
              disabled={isAnswerSubmitted}
              className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm font-medium flex items-center justify-between gap-3 ${buttonStyle}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                    isSelected
                      ? 'bg-emerald-400 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>

              {isAnswerSubmitted && idx === currentQ.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {isAnswerSubmitted && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation banner upon submit */}
      {isAnswerSubmitted && (
        <div
          className={`p-4 rounded-2xl border mb-6 text-xs sm:text-sm leading-relaxed animate-in fade-in duration-200 ${
            isCorrect
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold mb-1">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Well done! That is correct.</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Not quite. Here is why:</span>
              </>
            )}
          </div>
          <p className="text-slate-300 mt-1">{currentQ.explanation}</p>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-end">
        {!isAnswerSubmitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              selectedOption !== null
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <span>{isLastQuestion ? 'Complete Lesson' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
