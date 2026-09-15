'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppShell } from '../../components/layout/AppShell';
import { useUserState } from '../../context/UserStateContext';
import {
  PLAYABLE_CONCEPTS,
  DAILY_CHALLENGES,
} from '../../data/glossaryData';
import { PlayableConcept, GlossaryCategory, ConceptMasteryStatus } from '../../types';
import { DailyChallengeBanner } from '../../components/glossary/DailyChallengeBanner';
import { LearningMap } from '../../components/glossary/LearningMap';
import { ConceptCard } from '../../components/glossary/ConceptCard';
import { ComparisonSection } from '../../components/glossary/ComparisonSection';
import { ConceptViewerModal } from '../../components/glossary/ConceptViewerModal';
import {
  Search,
  BookMarked,
  Map,
  Grid,
  Scale,
  Star,
  Zap,
  Sparkles,
} from 'lucide-react';

const CATEGORIES: { label: string; cat: 'All' | GlossaryCategory; emoji: string }[] = [
  { label: 'All', cat: 'All', emoji: '🌟' },
  { label: 'Money Basics', cat: 'Money Basics', emoji: '💰' },
  { label: 'Banking', cat: 'Banking', emoji: '🏦' },
  { label: 'Credit', cat: 'Credit', emoji: '💳' },
  { label: 'Investing', cat: 'Investing', emoji: '📈' },
  { label: 'Markets', cat: 'Markets', emoji: '📊' },
  { label: 'Risk', cat: 'Risk', emoji: '⚖️' },
  { label: 'Taxes', cat: 'Taxes', emoji: '🧾' },
  { label: 'Wealth', cat: 'Wealth', emoji: '💎' },
];

const SEARCH_SUGGESTIONS = [
  { label: 'money growing', query: 'money growing' },
  { label: 'putting money every month', query: 'putting money every month' },
  { label: 'own part of company', query: 'own part of company' },
  { label: 'central bank rate', query: 'central bank' },
];

function PlayableGlossaryContent() {
  const searchParams = useSearchParams();
  const initialTermParam = searchParams.get('term') || '';

  const { progress } = useUserState();

  // Active View Mode: 'map' | 'cards' | 'compare'
  const [viewMode, setViewMode] = useState<'map' | 'cards' | 'compare'>('map');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | GlossaryCategory>('All');

  // Selected Concept for Modal
  const [selectedConcept, setSelectedConcept] = useState<PlayableConcept | null>(null);

  // Concept Mastery Map: { [conceptId]: 'learning' | 'practicing' | 'tested' | 'mastered' }
  const [masteryMap, setMasteryMap] = useState<Record<string, ConceptMasteryStatus>>({});

  // Load mastery from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('finvera_glossary_mastery');
      if (saved) {
        setMasteryMap(JSON.parse(saved));
      } else {
        const initial: Record<string, ConceptMasteryStatus> = {};
        PLAYABLE_CONCEPTS.forEach((c) => {
          initial[c.id] = 'learning';
        });
        setMasteryMap(initial);
      }
    } catch {
      // fallback
    }
  }, []);

  // Check URL term param
  useEffect(() => {
    if (initialTermParam) {
      const found = PLAYABLE_CONCEPTS.find(
        (c) => c.id === initialTermParam || c.term.toLowerCase().includes(initialTermParam.toLowerCase())
      );
      if (found) {
        setSelectedConcept(found);
      }
    }
  }, [initialTermParam]);

  const handleConceptMastered = (conceptId: string) => {
    setMasteryMap((prev) => {
      const next = { ...prev, [conceptId]: 'mastered' as ConceptMasteryStatus };
      try {
        localStorage.setItem('finvera_glossary_mastery', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleNextConcept = () => {
    if (!selectedConcept) return;
    const currentIndex = PLAYABLE_CONCEPTS.findIndex((c) => c.id === selectedConcept.id);
    const nextConcept = PLAYABLE_CONCEPTS[(currentIndex + 1) % PLAYABLE_CONCEPTS.length];
    setSelectedConcept(nextConcept);
  };

  // Smart Search matching
  const q = searchQuery.toLowerCase().trim();

  const filteredConcepts = useMemo(() => {
    return PLAYABLE_CONCEPTS.filter((concept) => {
      const matchesCategory = selectedCategory === 'All' || concept.category === selectedCategory;

      if (!q) return matchesCategory;

      const inTerm = concept.term.toLowerCase().includes(q);
      const inOneLiner = concept.simpleOneLiner.toLowerCase().includes(q);
      const inDefinition = concept.definition.toLowerCase().includes(q);
      const inKeywords = concept.searchKeywords?.some((k) => k.toLowerCase().includes(q));

      return matchesCategory && (inTerm || inOneLiner || inDefinition || inKeywords);
    });
  }, [selectedCategory, q]);

  // Total Mastery Calculation
  const totalConceptsCount = PLAYABLE_CONCEPTS.length;
  const masteredCount = Object.values(masteryMap).filter((s) => s === 'mastered').length;
  const masteryPercentage = Math.round((masteredCount / totalConceptsCount) * 100);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b-3 border-[#171717]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="nb-sticker bg-[#70E000] text-[#171717]">
              <Sparkles className="w-3.5 h-3.5" />
              MONEY WORDS, MADE SIMPLE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-space-grotesk text-[#171717] tracking-tight">
            Make sense of money terms
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#171717]/80 mt-1 max-w-2xl">
            Find a term, see how it works, and try it yourself. Everyday examples make new concepts easier to remember.
          </p>
        </div>

        {/* Global Progress Metrics Card */}
        <div className="p-4 rounded-xl bg-[#FFFFFF] border-3 border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center gap-5 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#171717] mb-1">
              <Star className="w-4 h-4 fill-[#FFD84D] text-[#171717]" />
              <span>MASTERY: {masteredCount} / {totalConceptsCount}</span>
            </div>
            <div className="w-36 bg-[#E5E5DE] border-2 border-[#171717] rounded-full h-3 overflow-hidden">
              <div
                style={{ width: `${masteryPercentage}%` }}
                className="bg-[#70E000] h-full transition-all duration-300 border-r border-[#171717]"
              />
            </div>
          </div>

          <div className="border-l-2 border-[#171717] pl-4 space-y-0.5 text-right">
            <span className="text-[10px] text-[#6B6B6B] font-mono font-bold uppercase block">Total XP</span>
            <span className="text-sm font-black font-space-grotesk text-[#171717] bg-[#FFD84D] px-2 py-0.5 rounded border border-[#171717] flex items-center justify-end gap-1">
              <Zap className="w-3.5 h-3.5 fill-[#171717]" />
              {progress.xp} XP
            </span>
          </div>
        </div>
      </div>

      {/* 2. Daily Finance Challenge */}
      <DailyChallengeBanner challenge={DAILY_CHALLENGES[0]} />

      {/* 3. Controls & View Switcher Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Smart Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#171717] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts or try 'money growing', 'putting money every month'..."
              className="w-full bg-[#FFFFFF] border-3 border-[#171717] pl-11 pr-14 py-3 rounded-xl text-xs sm:text-sm font-medium text-[#171717] placeholder-[#6B6B6B] shadow-[3px_3px_0px_#171717] focus:outline-none focus:bg-[#FFF9E6] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold bg-[#E5E5DE] px-2 py-0.5 rounded border border-[#171717] text-[#171717] hover:bg-[#FF8FAB] cursor-pointer"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex p-1 rounded-xl bg-[#F8F8F3] border-3 border-[#171717] shadow-[3px_3px_0px_#171717] self-start sm:self-auto shrink-0 gap-1">
            <button
              onClick={() => setViewMode('map')}
              className={`px-3.5 py-2 rounded-lg text-xs font-space-grotesk font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-[#70E000] text-[#171717] border-2 border-[#171717] shadow-[2px_2px_0px_#171717]'
                  : 'text-[#171717] hover:bg-[#FFFFFF] border-2 border-transparent'
              }`}
            >
              <Map className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>LEARNING MAP</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3.5 py-2 rounded-lg text-xs font-space-grotesk font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-[#70E000] text-[#171717] border-2 border-[#171717] shadow-[2px_2px_0px_#171717]'
                  : 'text-[#171717] hover:bg-[#FFFFFF] border-2 border-transparent'
              }`}
            >
              <Grid className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>PLAYABLE CARDS</span>
            </button>
            <button
              onClick={() => setViewMode('compare')}
              className={`px-3.5 py-2 rounded-lg text-xs font-space-grotesk font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'compare'
                  ? 'bg-[#70E000] text-[#171717] border-2 border-[#171717] shadow-[2px_2px_0px_#171717]'
                  : 'text-[#171717] hover:bg-[#FFFFFF] border-2 border-transparent'
              }`}
            >
              <Scale className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>COMPARE</span>
            </button>
          </div>
        </div>

        {/* Smart Search Suggestion Chips */}
        {!searchQuery && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#171717] pt-0.5">
            <span className="text-[11px] font-mono font-bold text-[#6B6B6B]">Try searching:</span>
            {SEARCH_SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                onClick={() => setSearchQuery(s.query)}
                className="px-2.5 py-1 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] shadow-[1px_1px_0px_#171717] text-[#171717] hover:bg-[#FFD84D] text-[11px] font-bold transition-all cursor-pointer"
              >
                &ldquo;{s.label}&rdquo;
              </button>
            ))}
          </div>
        )}

        {/* Category Filters (Visible for Map and Cards) */}
        {viewMode !== 'compare' && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
            {CATEGORIES.map((c) => {
              const isSelected = selectedCategory === c.cat;
              const count =
                c.cat === 'All'
                  ? PLAYABLE_CONCEPTS.length
                  : PLAYABLE_CONCEPTS.filter((p) => p.category === c.cat).length;

              return (
                <button
                  key={c.label}
                  onClick={() => setSelectedCategory(c.cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-space-grotesk font-black whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 border-2 border-[#171717] cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFD84D] text-[#171717] shadow-[2px_2px_0px_#171717] -translate-y-0.5'
                      : 'bg-[#FFFFFF] text-[#171717] shadow-[1px_1px_0px_#171717] hover:bg-[#F8F8F3]'
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span>{c.label}</span>
                  <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-[#F8F8F3] border border-[#171717]">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Main View Renders */}
      {viewMode === 'map' && (
        <LearningMap
          concepts={filteredConcepts}
          masteryMap={masteryMap}
          onSelectConcept={(c) => setSelectedConcept(c)}
        />
      )}

      {viewMode === 'cards' && (
        <div>
          {filteredConcepts.length === 0 ? (
            <div className="p-12 rounded-xl bg-[#FFFFFF] border-3 border-[#171717] shadow-[4px_4px_0px_#171717] text-center space-y-3">
              <BookMarked className="w-10 h-10 text-[#171717] mx-auto stroke-[2]" />
              <p className="text-base font-black font-space-grotesk text-[#171717]">No financial concepts match your search</p>
              <p className="text-xs text-[#6B6B6B] font-medium">
                Try searching for &apos;SIP&apos;, &apos;Inflation&apos;, &apos;Compounding&apos;, or &apos;Diversification&apos;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-2 px-4 py-2 rounded-lg bg-[#FFD84D] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] text-xs font-black font-space-grotesk text-[#171717] hover:bg-[#70E000] transition-colors cursor-pointer"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredConcepts.map((concept) => (
                <ConceptCard
                  key={concept.id}
                  concept={concept}
                  status={masteryMap[concept.id] || 'learning'}
                  onSelect={(c) => setSelectedConcept(c)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {viewMode === 'compare' && <ComparisonSection />}

      {/* 5. Playable Concept Modal Player */}
      {selectedConcept && (
        <ConceptViewerModal
          concept={selectedConcept}
          isOpen={Boolean(selectedConcept)}
          onClose={() => setSelectedConcept(null)}
          onNextConcept={handleNextConcept}
          onConceptMastered={handleConceptMastered}
        />
      )}
    </div>
  );
}

export default function GlossaryPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="text-[#171717] font-mono text-sm">Loading Playable Glossary...</div>}>
        <PlayableGlossaryContent />
      </Suspense>
    </AppShell>
  );
}
