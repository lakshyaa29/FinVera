'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, BookOpen, Calculator, BookMarked, Target, ArrowRight } from 'lucide-react';
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle handled outside
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            placeholder="Search lessons, calculators, glossary terms, or missions..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-sm focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-200 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono font-medium text-slate-400 bg-slate-800 border border-slate-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {!q ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              <p className="font-medium text-slate-300 mb-1">Quick Search</p>
              <p className="text-xs">Type a keyword like &quot;SIP&quot;, &quot;EMI&quot;, &quot;Compound Interest&quot;, or &quot;Budgeting&quot;</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['SIP', 'Inflation', 'Needs vs Wants', 'Credit Score', 'Emergency Fund'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              <p>No results found for &quot;{query}&quot;</p>
              <p className="text-xs text-slate-500 mt-1">Try a different financial concept or term.</p>
            </div>
          ) : (
            <>
              {/* Calculators */}
              {matchingCalcs.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Calculators</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingCalcs.map((calc) => (
                      <button
                        key={calc.id}
                        onClick={() => navigateTo(`/calculators?type=${calc.id}`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-700"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-100 group-hover:text-emerald-300">
                            {calc.title}
                          </p>
                          <p className="text-xs text-slate-400">{calc.desc}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Lessons */}
              {matchingLessons.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Lessons</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingLessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => navigateTo(`/learn/${lesson.id}`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-700"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300">
                              {lesson.levelName}
                            </span>
                            <p className="text-sm font-semibold text-slate-100 group-hover:text-teal-300">
                              {lesson.title}
                            </p>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{lesson.shortDescription}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Glossary Terms */}
              {matchingGlossary.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                    <BookMarked className="w-3.5 h-3.5" />
                    <span>Glossary Terms</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingGlossary.map((term) => (
                      <button
                        key={term.id}
                        onClick={() => navigateTo(`/glossary?term=${term.id}`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-700"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-100 group-hover:text-amber-300">
                            {term.term}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{term.simpleExplanation}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Missions */}
              {matchingMissions.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
                    <Target className="w-3.5 h-3.5" />
                    <span>Missions</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingMissions.map((mission) => (
                      <button
                        key={mission.id}
                        onClick={() => navigateTo(`/practice/missions`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-700"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-100 group-hover:text-purple-300">
                            {mission.title}
                          </p>
                          <p className="text-xs text-slate-400 line-clamp-1">{mission.prompt}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
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
