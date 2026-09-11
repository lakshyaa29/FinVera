'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AppShell } from '../../components/layout/AppShell';
import { GLOSSARY_TERMS } from '../../data/glossaryData';
import { Search, BookMarked, Sparkles, ArrowRight, Lightbulb, Calculator, BookOpen } from 'lucide-react';

const CATEGORIES = ['All', 'Investing', 'Banking', 'Credit', 'Tax', 'General'] as const;

function GlossaryContent() {
  const searchParams = useSearchParams();
  const initialTerm = searchParams.get('term') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    if (initialTerm) {
      const termObj = GLOSSARY_TERMS.find((t) => t.id === initialTerm);
      if (termObj) {
        setSearchQuery(termObj.term.split(' ')[0]);
      }
    }
  }, [initialTerm]);

  const q = searchQuery.toLowerCase().trim();

  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    const matchesCat = selectedCategory === 'All' || term.category === selectedCategory;
    const matchesQuery =
      !q ||
      term.term.toLowerCase().includes(q) ||
      term.definition.toLowerCase().includes(q) ||
      term.simpleExplanation.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
            Plain-English Reference
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
          Financial Glossary
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Demystify Wall Street and Dalal Street jargon with simple definitions and real-world analogies.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search any financial term (e.g. SIP, ETF, EMI, NAV, Demat)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 pl-12 pr-4 py-3.5 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-md"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-slate-400">
            <BookMarked className="w-10 h-10 mx-auto text-slate-600 mb-3" />
            <p className="text-sm font-semibold text-slate-300">No glossary terms match your search</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for SIP, ETF, or Inflation.</p>
          </div>
        ) : (
          filteredTerms.map((term) => (
            <div
              key={term.id}
              className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-extrabold text-white tracking-tight">{term.term}</h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700 shrink-0">
                    {term.category}
                  </span>
                </div>

                {/* Plain English explanation */}
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>In Simple Terms:</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">{term.simpleExplanation}</p>
                </div>

                {/* Formal definition */}
                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  <span className="font-semibold text-slate-300">Technical: </span>
                  {term.definition}
                </p>

                {/* Real life example */}
                <div className="text-[11px] text-slate-400 italic">
                  <span className="font-semibold not-italic text-teal-400">Example: </span>
                  {term.example}
                </div>
              </div>

              {/* Related lesson or calculator link */}
              {(term.relatedLessonId || term.relatedCalculator) && (
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                  {term.relatedLessonId && (
                    <Link
                      href={`/learn/${term.relatedLessonId}`}
                      className="text-[11px] font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Take Lesson</span>
                    </Link>
                  )}
                  {term.relatedCalculator && (
                    <Link
                      href={`/calculators?type=${term.relatedCalculator}`}
                      className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      <Calculator className="w-3 h-3" />
                      <span>Open Calculator</span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function GlossaryPage() {
  return (
    <AppShell>
      <Suspense
        fallback={
          <div className="p-8 text-center text-slate-400 text-sm">
            Loading Glossary...
          </div>
        }
      >
        <GlossaryContent />
      </Suspense>
    </AppShell>
  );
}
