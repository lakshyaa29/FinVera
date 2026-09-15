'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Compass, TrendingUp, Calculator, User } from 'lucide-react';

const MOBILE_NAV_ITEMS = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/learn', label: 'Learn', icon: Compass },
  { href: '/practice', label: 'Practice', icon: TrendingUp },
  { href: '/calculators', label: 'Tools', icon: Calculator },
  { href: '/profile', label: 'Profile', icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Mobile navigation" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAFAF7] border-t border-[#b7b7ac] px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-around">
      {MOBILE_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center py-1 px-3 transition-all duration-100 ${
              isActive
                ? 'text-[#171717] font-display font-extrabold'
                : 'text-[#6B6B6B] hover:text-[#171717]'
            }`}
          >
            <div
              className={`p-1.5 rounded-md transition-all ${
                isActive
                  ? 'bg-[#70E000] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] text-[#171717]'
                  : 'text-[#6B6B6B]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            </div>
            <span className="text-[11px] mt-1 font-display font-semibold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
