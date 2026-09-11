'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  TrendingUp,
  Calculator,
  BookMarked,
  Activity,
  Award,
  User,
  Sparkles,
  Flame,
  Zap,
} from 'lucide-react';
import { useUserState } from '../../context/UserStateContext';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: Sparkles },
  { href: '/learn', label: 'Learn & Roadmap', icon: BookOpen, badge: '6 Levels' },
  { href: '/practice', label: 'Practice & Simulator', icon: TrendingUp, badge: '₹1L Cash' },
  { href: '/calculators', label: 'Calculators', icon: Calculator, badge: '5 Tools' },
  { href: '/glossary', label: 'Glossary', icon: BookMarked },
  { href: '/health', label: 'Money Health', icon: Activity },
  { href: '/achievements', label: 'Achievements', icon: Award },
  { href: '/profile', label: 'Profile & Settings', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { progress, profile } = useUserState();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-950 text-slate-100 border-r border-slate-800/80 p-5 shrink-0 select-none">
      {/* Brand Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="group block">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">₹</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">FINVERA</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                  Edu
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Learn money. Build wealth.</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Gamification Status Banner */}
      <div className="mb-6 p-3 rounded-xl bg-slate-900/90 border border-slate-800/90">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs">
            <Flame className="w-4 h-4 fill-amber-400 animate-pulse" />
            <span>{progress.streakDays} Day Streak</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            <span>{progress.xp} XP</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
          <span>Rank:</span>
          <span className="font-semibold text-slate-200">{progress.levelTitle}</span>
        </div>
      </div>

      {/* Nav Menu Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? 'bg-emerald-500/30 text-emerald-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Pill */}
      <div className="pt-4 mt-auto border-t border-slate-800/80">
        <Link
          href="/profile"
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-900 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center font-bold text-slate-950 text-xs shadow">
            {profile.name ? profile.name[0].toUpperCase() : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate group-hover:text-white">
              {profile.name}
            </p>
            <p className="text-[10px] text-slate-400 font-medium">Age {profile.ageGroup}</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
