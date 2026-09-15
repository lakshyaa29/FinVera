'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Flame } from 'lucide-react';
import { useUserState } from '../../context/UserStateContext';
import { GlobalSearchModal } from './GlobalSearchModal';

export function Header() {
  const { progress, profile } = useUserState();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const openSearch = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', openSearch);
    return () => window.removeEventListener('keydown', openSearch);
  }, []);

  return (
    <>
      <header className="h-[76px] shrink-0 border-b border-[#dcdcd2] bg-[#FAFAF7] px-5 sm:px-8 lg:px-10 flex items-center justify-between gap-4 z-30">
        <div className="lg:hidden"><Link href="/dashboard" className="brand-lockup" aria-label="FinVera dashboard"><span className="brand-mark">₹</span><span className="font-display font-bold text-base hidden min-[400px]:inline">FINVERA</span></Link></div>
        <button onClick={() => setSearchOpen(true)} className="hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white border border-[#d6d6ca] hover:border-[#171717] text-sm transition-colors cursor-pointer w-full max-w-sm text-left" aria-label="Search lessons, concepts, and calculators"><Search size={17} className="text-[#6B6B6B] shrink-0" /><span className="text-[#6B6B6B] flex-1">What would you like to learn?</span><kbd className="text-[10px] rounded border border-[#deded4] bg-[#F8F8F3] px-1.5 py-0.5 whitespace-nowrap">Ctrl K</kbd></button>
        <div className="flex items-center gap-3 sm:gap-5">
          <button onClick={() => setSearchOpen(true)} className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg border border-[#d6d6ca] bg-white cursor-pointer" aria-label="Search"><Search size={19} /></button>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#595952]" title="Consecutive days of learning"><Flame size={17} className="text-[#8b601b]" />{progress.streakDays}-day streak</div>
          <span className="hidden xl:inline text-xs text-[#6B6B6B]">Small steps add up.</span>
          <Link href="/profile" aria-label="Your profile and settings" className="w-10 h-10 rounded-xl bg-[#e6ddf4] border border-[#171717] shadow-[2px_2px_0_#171717] flex items-center justify-center font-display font-bold text-[#171717] hover:bg-[#d9c9ef] transition-colors">{profile.name ? profile.name[0].toUpperCase() : 'U'}</Link>
        </div>
      </header>
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
