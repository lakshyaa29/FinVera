'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Calculator, BookMarked, Target, ArrowRight, Compass } from 'lucide-react';
import { ALL_LESSONS } from '../../data/lessonsData';
import { GLOSSARY_TERMS } from '../../data/glossaryData';
import { MONEY_MISSIONS } from '../../data/missionsData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector('input')?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>('button:not(:disabled), input, a[href], [tabindex="0"]'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    dialog?.addEventListener('keydown', trapFocus);
    return () => {
      dialog?.removeEventListener('keydown', trapFocus);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingLessons = q
    ? ALL_LESSONS.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.concept.toLowerCase().includes(q) ||
          l.shortDescription.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchingGlossary = q
    ? GLOSSARY_TERMS.filter(
        (g) =>
          g.term.toLowerCase().includes(q) ||
          g.definition.toLowerCase().includes(q) ||
          g.simpleExplanation.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchingMissions = q
    ? MONEY_MISSIONS.filter(
        (m) => m.title.toLowerCase().includes(q) || m.prompt.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const CALCULATOR_ITEMS = [
    { id: 'compound-interest', title: 'Compound Interest Calculator', desc: 'Exponential growth & Rule of 72' },
    { id: 'sip', title: 'SIP Calculator', desc: 'Systematic mutual fund wealth compounding' },
    { id: 'inflation', title: 'Inflation Calculator', desc: 'Purchasing power loss & future cost' },
    { id: 'emi', title: 'EMI Calculator', desc: 'Loan monthly payments & amortization schedule' },
    { id: 'savings-goal', title: 'Savings Goal Calculator', desc: 'Reverse-engineer monthly required savings' },
  ];

  const matchingCalcs = q
    ? CALCULATOR_ITEMS.filter((c) => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q))
    : [];

  const totalResults =
    matchingLessons.length + matchingGlossary.length + matchingCalcs.length + matchingMissions.length;

  const navigateTo = (url: string) => {
    router.push(url);
    onClose();
  };

  return (
    <div onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#171717]/40 backdrop-blur-xs animate-in fade-in duration-100">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Search FinVera" className="w-full max-w-2xl bg-[#FFFFFF] border-2 border-[#171717] rounded-xl shadow-[4px_4px_0px_#171717] overflow-hidden flex flex-col max-h-[75dvh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b-2 border-[#171717] gap-3 bg-[#FAFAF7]">
          <Search className="w-5 h-5 text-[#171717] stroke-[2.5] shrink-0" />
          <input
            type="text"
            aria-label="Search lessons, calculators, glossary, or missions"
            placeholder="Search lessons, calculators, glossary, or missions..."
            className="w-full bg-transparent text-[#171717] placeholder-[#6B6B6B] text-sm font-display font-bold focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="text-[#171717] hover:bg-[#E5E5DE] p-1 rounded border border-[#171717]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono font-bold text-[#171717] bg-[#FFD84D] border border-[#171717] rounded">
            ESC
          </kbd>
          <button onClick={onClose} aria-label="Close search" className="w-11 h-11 shrink-0 flex items-center justify-center rounded-lg hover:bg-[#E5E5DE] cursor-pointer"><X size={20} /></button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!q ? (
            <div className="text-center py-8 text-[#6B6B6B] text-sm">
              <p className="font-display font-extrabold text-base text-[#171717] mb-1">Quick Search</p>
              <p className="text-xs text-[#6B6B6B]">Select a financial concept to jump directly:</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['SIP', 'Inflation', 'Needs vs Wants', 'Credit Score', 'Emergency Fund', 'EMI'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="nb-tag bg-[#FFFFFF] hover:bg-[#70E000] text-[#171717] transition-all cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-10 text-[#6B6B6B] text-sm">
              <p className="font-display font-extrabold text-[#171717]">No results found for &quot;{query}&quot;</p>
              <p className="text-xs text-[#6B6B6B] mt-1">Try another financial topic or calculator name.</p>
            </div>
          ) : (
            <>
              {/* Calculators */}
              {matchingCalcs.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-display font-extrabold text-[#171717] uppercase tracking-wider mb-2">
                    <Calculator className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Calculators</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingCalcs.map((calc) => (
                      <button
                        key={calc.id}
                        onClick={() => navigateTo(`/calculators?type=${calc.id}`)}
                        className="w-full text-left p-3 rounded-lg border-2 border-[#171717] bg-[#FFFFFF] hover:bg-[#70E000] hover:shadow-[3px_3px_0px_#171717] transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <p className="text-sm font-display font-extrabold text-[#171717]">
                            {calc.title}
                          </p>
                          <p className="text-xs text-[#6B6B6B] group-hover:text-[#171717]">{calc.desc}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#171717] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Lessons */}
              {matchingLessons.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-display font-extrabold text-[#171717] uppercase tracking-wider mb-2">
                    <Compass className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Interactive Lessons</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingLessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => navigateTo(`/learn/${lesson.id}`)}
                        className="w-full text-left p-3 rounded-lg border-2 border-[#171717] bg-[#FFFFFF] hover:bg-[#6C8CFF] hover:shadow-[3px_3px_0px_#171717] transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-black text-[#171717] bg-[#FFD84D] px-1.5 py-0.2 rounded border border-[#171717]">
                              L{lesson.level}
                            </span>
                            <p className="text-sm font-display font-extrabold text-[#171717]">
                              {lesson.title}
                            </p>
                          </div>
                          <p className="text-xs text-[#6B6B6B] group-hover:text-[#171717] mt-0.5 line-clamp-1">
                            {lesson.shortDescription}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#171717] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Glossary */}
              {matchingGlossary.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-display font-extrabold text-[#171717] uppercase tracking-wider mb-2">
                    <BookMarked className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Glossary Terms</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingGlossary.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => navigateTo(`/glossary?term=${g.id}`)}
                        className="w-full text-left p-3 rounded-lg border-2 border-[#171717] bg-[#FFFFFF] hover:bg-[#FFD84D] hover:shadow-[3px_3px_0px_#171717] transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-display font-extrabold text-[#171717]">
                              {g.term}
                            </p>
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#E5E5DE] border border-[#171717] text-[#171717]">
                              {g.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#6B6B6B] group-hover:text-[#171717] line-clamp-1 mt-0.5">
                            {g.definition}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#171717] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Missions */}
              {matchingMissions.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-display font-extrabold text-[#171717] uppercase tracking-wider mb-2">
                    <Target className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Money Missions</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingMissions.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => navigateTo('/practice/missions')}
                        className="w-full text-left p-3 rounded-lg border-2 border-[#171717] bg-[#FFFFFF] hover:bg-[#B99CFF] hover:shadow-[3px_3px_0px_#171717] transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <p className="text-sm font-display font-extrabold text-[#171717]">
                            {m.title}
                          </p>
                          <p className="text-xs text-[#6B6B6B] group-hover:text-[#171717] line-clamp-1">
                            {m.prompt}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#171717] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
