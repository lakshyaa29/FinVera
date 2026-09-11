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
import { Calculator, TrendingUp, DollarSign, Percent, ShieldAlert, Target } from 'lucide-react';

const CALC_TABS = [
  {
    id: 'compound-interest',
    title: 'Compound Interest',
    desc: 'Exponential growth over time',
    icon: TrendingUp,
  },
  {
    id: 'sip',
    title: 'SIP Calculator',
    desc: 'Monthly mutual fund compounding',
    icon: DollarSign,
  },
  {
    id: 'inflation',
    title: 'Inflation & Purchasing Power',
    desc: 'Cost of living erosion math',
    icon: Percent,
  },
  {
    id: 'emi',
    title: 'Loan EMI & Interest',
    desc: 'Amortization & debt payoffs',
    icon: Calculator,
  },
  {
    id: 'savings-goal',
    title: 'Savings Goal Planner',
    desc: 'Target milestone budgeting',
    icon: Target,
  },
];

function CalculatorsContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'compound-interest';
  const [activeTab, setActiveTab] = useState<string>(initialType);
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
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
            Interactive Financial Engines
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
          Financial Calculator Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Accurate, instant mathematical simulations tailored with Indian Rupee (₹) formatting.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {CALC_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Calculator Component */}
      <div className="animate-in fade-in duration-200">
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
          <div className="p-8 text-center text-slate-400 text-sm">
            Loading Calculator Center...
          </div>
        }
      >
        <CalculatorsContent />
      </Suspense>
    </AppShell>
  );
}
