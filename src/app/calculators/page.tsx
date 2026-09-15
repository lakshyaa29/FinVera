'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppShell } from '../../components/layout/AppShell';
import { useUserState } from '../../context/UserStateContext';
import { CompoundInterestCalc } from '../../components/calculators/CompoundInterestCalc';
import { SipCalculator } from '../../components/calculators/SipCalculator';
import { InflationCalculator } from '../../components/calculators/InflationCalculator';
import { EmiCalculator } from '../../components/calculators/EmiCalculator';
import { SavingsGoalCalc } from '../../components/calculators/SavingsGoalCalc';
import { Calculator, TrendingUp, IndianRupee, Percent, Target, Sparkles } from 'lucide-react';

const CALC_TABS = [
  {
    id: 'compound-interest',
    title: 'Compound Growth',
    desc: 'See how savings grow over time',
    icon: TrendingUp,
  },
  {
    id: 'sip',
    title: 'Monthly SIP',
    desc: 'Explore regular monthly investing',
    icon: IndianRupee,
  },
  {
    id: 'inflation',
    title: 'Inflation',
    desc: 'Understand changing prices',
    icon: Percent,
  },
  {
    id: 'emi',
    title: 'Loan EMI & Interest',
    desc: 'Estimate monthly loan payments',
    icon: Calculator,
  },
  {
    id: 'savings-goal',
    title: 'Savings Goal',
    desc: 'Plan how to reach your target',
    icon: Target,
  },
];

function CalculatorsContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'compound-interest';
  const [activeTab, setActiveTab] = useState<string>(CALC_TABS.some((tab) => tab.id === initialType) ? initialType : 'compound-interest');
  const { exploreCalculator } = useUserState();

  useEffect(() => {
    if (initialType && CALC_TABS.some((t) => t.id === initialType)) {
      setActiveTab(initialType);
    }
  }, [initialType]);

  useEffect(() => {
    exploreCalculator(activeTab);
  }, [activeTab, exploreCalculator]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="nb-sticker bg-[#FFD84D] text-[#171717]">
            <Sparkles className="w-3.5 h-3.5 text-[#171717]" />
            TRY THE POSSIBILITIES
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-space-grotesk text-[#171717] tracking-tight">
          Make your money plans clearer
        </h1>
        <p className="text-sm font-medium text-[#171717]/75 mt-1 max-w-2xl">
          Choose a calculator, adjust the numbers, and see what changes. Explore savings, investments, and loans in rupees.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div aria-label="Choose a calculator" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {CALC_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={isActive}
              aria-controls="calculator-content"
              className={`py-4 px-3 rounded-xl text-sm font-semibold transition-all flex flex-col items-start justify-start gap-2 cursor-pointer text-left border ${
                isActive
                  ? 'bg-[#F0FDD4] border-[#171717] text-[#171717] shadow-[3px_3px_0px_#171717]'
                  : 'bg-[#FFFFFF] border-[#d6d6cc] text-[#171717] hover:bg-[#FFF9E0]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#171717]' : 'text-[#171717]/70'}`} />
              <span className="font-space-grotesk tracking-tight leading-tight">{tab.title}</span>
              <span className="text-xs font-normal text-[#6B6B6B] leading-relaxed">{tab.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Active Calculator Component */}
      <div id="calculator-content" className="animate-in fade-in duration-200">
        {activeTab === 'compound-interest' && <CompoundInterestCalc />}
        {activeTab === 'sip' && <SipCalculator />}
        {activeTab === 'inflation' && <InflationCalculator />}
        {activeTab === 'emi' && <EmiCalculator />}
        {activeTab === 'savings-goal' && <SavingsGoalCalc />}
      </div>
    </div>
  );
}

export default function CalculatorsPage() {
  return (
    <AppShell>
      <Suspense
        fallback={
          <div className="p-12 text-center text-slate-400 text-sm">
            Loading Calculator Suite...
          </div>
        }
      >
        <CalculatorsContent />
      </Suspense>
    </AppShell>
  );
}
