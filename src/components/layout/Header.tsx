'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Flame, Zap, ShieldAlert, Sparkles } from 'lucide-react';
import { useUserState } from '../../context/UserStateContext';
import { GlobalSearchModal } from './GlobalSearchModal';

export function Header() {
  const { progress, profile } = useUserState();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        {/* Mobile Brand / Search Button */}
        <div className="flex items-center gap-3">
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-bold text-slate-950 text-sm">
              ₹
            </div>
            <span className="font-extrabold text-base text-white tracking-tight">FINVERA</span>
          </div>

          {/* Search Trigger Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-colors shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span>Search topics, SIP, EMI, lessons...</span>
            <kbd className="ml-4 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-800 rounded border border-slate-700">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right Status Actions: Streak, XP, Age Group, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile search icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className="sm:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Streak Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-400 animate-pulse" />
            <span>{progress.streakDays}</span>
            <span className="hidden sm:inline font-normal text-amber-500/80">days</span>
          </div>

          {/* XP Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            <span>{progress.xp}</span>
            <span className="hidden sm:inline font-normal text-emerald-500/80">XP</span>
          </div>

          {/* Age Cohort Pill */}
          <Link
            href="/profile"
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium hover:border-slate-700 transition-colors"
          >
            <span className="text-slate-500 text-[10px] uppercase font-semibold">Age</span>
            <span className="text-emerald-400 font-bold">{profile.ageGroup}</span>
          </Link>

          {/* Profile Circle */}
          <Link
            href="/profile"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center font-bold text-slate-950 text-xs shadow hover:scale-105 transition-transform"
            title="View Profile & Settings"
          >
            {profile.name ? profile.name[0].toUpperCase() : 'U'}
          </Link>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
