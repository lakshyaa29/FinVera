'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Compass,
  TrendingUp,
  Calculator,
  BookOpen,
  Activity,
  Award,
  User,
  Flame,
  Zap,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useUserState } from '../../context/UserStateContext';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/learn', label: 'Learning path', icon: Compass, badge: '6 Levels' },
  { href: '/practice', label: 'Simulator', icon: TrendingUp, badge: '₹1L' },
  { href: '/calculators', label: 'Calculators', icon: Calculator, badge: '5 Tools' },
  { href: '/glossary', label: 'Glossary', icon: BookOpen },
  { href: '/health', label: 'Money Health', icon: Activity },
  { href: '/achievements', label: 'Achievements', icon: Award },
  { href: '/profile', label: 'Profile & Settings', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { progress, profile, logout } = useUserState();

  return (
    <aside className="app-sidebar hidden lg:flex flex-col w-64 border-r p-5 shrink-0 z-20">
      {/* Brand Header */}
      <div className="mb-6 px-1">
        <Link href="/dashboard" className="group block">
          <div className="flex items-center gap-2.5">
            {/* FinVera Neo-Brutalist Emblem */}
            <div className="w-10 h-10 rounded-lg bg-[#70E000] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center font-display font-black text-xl text-[#171717] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_#171717] transition-all">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg tracking-tight text-[#171717]">
                  FINVERA
                </span>
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 bg-[#FFD84D] text-[#171717] border border-[#171717] rounded">
                  EDU
                </span>
              </div>
              <p className="font-mono text-[10px] text-[#6B6B6B] font-bold uppercase tracking-wider">
                Financial Learning
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Gamification Status Widget */}
      <div className="mb-4 p-3.5 bg-[#FFFFFF] border border-[#d9d9cf] rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-[#171717] font-display font-extrabold text-xs">
            <Flame className="w-4 h-4 fill-[#FFD84D] text-[#171717]" />
            <span>{progress.streakDays} Day Streak</span>
          </div>
          <div className="flex items-center gap-1 font-mono font-black text-xs text-[#171717] bg-[#70E000] px-1.5 py-0.5 border border-[#171717] rounded">
            <Zap className="w-3 h-3 fill-[#171717]" />
            <span>{progress.xp} XP</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#171717]/20">
          <span className="font-medium text-[#6B6B6B]">Your level</span>
          <span className="font-display font-bold text-[#171717]">
            {progress.levelTitle}
          </span>
        </div>
      </div>

      {/* Nav Menu Items */}
      <nav aria-label="Main navigation" className="flex-1 space-y-1.5 overflow-y-auto pr-1 pb-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-display font-semibold transition-all duration-100 ${
                isActive
                  ? 'bg-[#70E000] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] translate-x-0.5'
                  : 'text-[#171717] hover:bg-[#E5E5DE] border-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'stroke-[2.5px] text-[#171717]' : 'stroke-2 text-[#6B6B6B]'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold border ${
                    isActive
                      ? 'bg-[#FFFFFF] text-[#171717] border-[#171717]'
                      : 'bg-[#E5E5DE] text-[#6B6B6B] border-transparent'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Widget */}
      <div className="pt-4 mt-auto border-t border-[#d6d6cb] flex items-center gap-2">
        <Link
          href="/profile"
          className="flex-1 flex items-center gap-2.5 p-2 bg-[#FFFFFF] border-2 border-[#171717] rounded-lg shadow-[2px_2px_0px_#171717] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#171717] transition-all group min-w-0"
        >
          <div className="w-8 h-8 rounded-md bg-[#dcd2f1] border border-[#171717] flex items-center justify-center font-display font-black text-[#171717] text-xs shrink-0">
            {profile.name ? profile.name[0].toUpperCase() : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-display font-extrabold text-[#171717] truncate">
              {profile.name}
            </p>
            <p className="font-mono text-[10px] text-[#6B6B6B]">Age: {profile.ageGroup}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#171717] shrink-0" />
        </Link>

        <button
          onClick={() => logout()}
          className="w-9 h-9 rounded-lg bg-[#FFFFFF] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] hover:bg-[#FF8FAB] flex items-center justify-center text-[#171717] transition-colors shrink-0 cursor-pointer"
          title="Logout"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </aside>
  );
}
