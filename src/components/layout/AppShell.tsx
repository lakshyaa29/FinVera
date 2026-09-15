'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell flex h-screen w-full overflow-hidden bg-[#F8F8F3] text-[#171717]">
      <a className="skip-link" href="#app-main">Skip to content</a>
      {/* Desktop Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header />
        <main id="app-main" tabIndex={-1} className="app-content flex-1 overflow-y-auto pb-28 lg:pb-14 px-5 sm:px-8 lg:px-10 py-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
        {/* Mobile Navigation Bottom Bar */}
        <MobileNav />
      </div>
    </div>
  );
}
