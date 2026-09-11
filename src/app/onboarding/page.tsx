'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserState } from '../../context/UserStateContext';
import { AgeGroup, Occupation, KnowledgeLevel, RiskComfort } from '../../types';
import { AGE_CURRICULUM_DATA } from '../../data/ageCurriculumData';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Zap,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';

const TOPIC_CHOICES = [
  'Money Basics',
  'Saving & Emergency Funds',
  'UPI & Banking Safety',
  'Credit Cards & CIBIL',
  'Mutual Funds & SIP',
  'Stocks & ETFs',
  'Loan EMIs & Debt Payoff',
  'Income Tax Basics',
  'Wealth Building Flywheels',
];

export default function OnboardingPage() {
  const router = useRouter();
  const { updateProfile } = useUserState();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('Aarav');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('18-24');
  const [occupation, setOccupation] = useState<Occupation>('student');
  const [knowledgeLevel, setKnowledgeLevel] = useState<KnowledgeLevel>('beginner');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Money Basics',
    'Mutual Funds & SIP',
    'Saving & Emergency Funds',
  ]);
  const [learningGoal, setLearningGoal] = useState('Start my first investment and build wealth.');
  const [riskComfort, setRiskComfort] = useState<RiskComfort>('balanced');

  const totalSteps = 7;

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleFinish = () => {
    updateProfile({
      name: name.trim() || 'Learner',
      ageGroup,
      occupation,
      knowledgeLevel,
      learningGoals: selectedTopics,
      riskComfort,
      onboarded: true,
    });
    setStep(8); // Finish Screen
  };

  const selectedAgeCohort = AGE_CURRICULUM_DATA[ageGroup];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
        {/* Brand Logo Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-bold text-slate-950 text-base shadow-md">
              ₹
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">FINVERA</span>
              <p className="text-[10px] text-slate-400 font-mono">Personalized Learning Setup</p>
            </div>
          </div>

          {step <= 7 && (
            <span className="text-xs font-mono font-bold text-slate-400">
              Step {step} of {totalSteps}
            </span>
          )}
        </div>

        {/* Step Progress Bar */}
        {step <= 7 && (
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
            <div
              style={{ width: `${(step / totalSteps) * 100}%` }}
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300 rounded-full"
            />
          </div>
        )}

        {/* STEP 1: Name */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Welcome to FinVera
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">What should we call you?</h2>
              <p className="text-xs text-slate-400 mt-1">
                We will personalize your daily greetings, streak badges, and learning certificates.
              </p>
            </div>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name or nickname"
              className="w-full bg-slate-950 border border-slate-700 px-4 py-3 rounded-2xl text-base text-white focus:outline-none focus:border-emerald-500"
              autoFocus
            />

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Age Range (13–17, 18–24, 25–34, 35+) */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Cohort Personalization
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">What&apos;s your age?</h2>
              <p className="text-xs text-slate-400 mt-1">
                We use this to recommend the most relevant examples and educational focus. (You can
                change this later).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { range: '13-17' as AgeGroup, label: '13–17', sub: 'Teen & Student' },
                { range: '18-24' as AgeGroup, label: '18–24', sub: 'First Job & College' },
                { range: '25-34' as AgeGroup, label: '25–34', sub: 'Career & Family Milestones' },
                { range: '35+' as AgeGroup, label: '35+', sub: 'Capital Growth & Retirement' },
              ].map((item) => {
                const isSelected = ageGroup === item.range;
                return (
                  <button
                    key={item.range}
                    type="button"
                    onClick={() => setAgeGroup(item.range)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg font-extrabold block font-mono">{item.label}</span>
                    <span className="text-xs text-slate-400 mt-0.5 block">{item.sub}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Occupation */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
                Life Stage
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">What is your current occupation?</h2>
              <p className="text-xs text-slate-400 mt-1">
                Helps us frame salary and cash-flow scenarios realistically.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'student' as Occupation, title: 'Student', desc: 'School, college, or university' },
                { id: 'working' as Occupation, title: 'Working Professional', desc: 'Salaried employee in private or public sector' },
                { id: 'entrepreneur' as Occupation, title: 'Entrepreneur / Freelancer', desc: 'Running a business or independent contractor' },
                { id: 'other' as Occupation, title: 'Other / Homemaker / Explorer', desc: 'Exploring financial management' },
              ].map((occ) => {
                const isSelected = occupation === occ.id;
                return (
                  <button
                    key={occ.id}
                    type="button"
                    onClick={() => setOccupation(occ.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-teal-500/20 border-teal-400 text-teal-200 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold">{occ.title}</p>
                      <p className="text-xs text-slate-400">{occ.desc}</p>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Current Financial Knowledge */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                Knowledge Baseline
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                How would you rate your financial knowledge?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero judgment! We start from first principles for everyone.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  id: 'beginner' as KnowledgeLevel,
                  title: 'Complete Beginner 🌱',
                  desc: 'I know very little about how money, banks, or investing work.',
                },
                {
                  id: 'intermediate' as KnowledgeLevel,
                  title: 'Intermediate Learner 📈',
                  desc: 'I have a bank account and know about FDs and stocks, but lack a clear strategy.',
                },
                {
                  id: 'advanced' as KnowledgeLevel,
                  title: 'Experienced Investor 💎',
                  desc: 'I already invest in mutual funds and want to sharpen tax, asset allocation, and FI/RE math.',
                },
              ].map((lvl) => {
                const isSelected = knowledgeLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setKnowledgeLevel(lvl.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold">{lvl.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{lvl.desc}</p>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex-1 py-3 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Topics to Learn */}
        {step === 5 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
                Curriculum Focus
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">What topics interest you most?</h2>
              <p className="text-xs text-slate-400 mt-1">Select all that apply.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TOPIC_CHOICES.map((topic) => {
                const isSelected = selectedTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => toggleTopic(topic)}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-500/20 border-purple-400 text-purple-200 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>{topic}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(4)}
                className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={() => setStep(6)}
                className="flex-1 py-3 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Primary Financial Goal */}
        {step === 6 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                Primary Objective
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                What is your #1 financial learning goal?
              </h2>
              <p className="text-xs text-slate-400 mt-1">We align your roadmap milestones with this.</p>
            </div>

            <div className="space-y-2.5">
              {[
                'Start my first mutual fund SIP with confidence',
                'Build a 6-month emergency cash safety net',
                'Understand how the stock market works without gambling',
                'Avoid credit card debt traps and master CIBIL scores',
                'Learn long-term wealth building & retirement math',
              ].map((goal) => {
                const isSelected = learningGoal === goal;
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setLearningGoal(goal)}
                    className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-500/20 border-blue-400 text-blue-200 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{goal}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(5)}
                className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={() => setStep(7)}
                className="flex-1 py-3 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: Risk Comfort */}
        {step === 7 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Risk Temperament
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                How comfortable are you with market volatility?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Educational profiling only; FinVera does not provide investment advisory.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  id: 'cautious' as RiskComfort,
                  title: 'Cautious / Conservative',
                  desc: 'I prioritize safety and hate seeing temporary portfolio dips.',
                },
                {
                  id: 'balanced' as RiskComfort,
                  title: 'Balanced / Pragmatic',
                  desc: 'I can tolerate modest fluctuations for better long-term compounding.',
                },
                {
                  id: 'growth' as RiskComfort,
                  title: 'Growth / High Horizon',
                  desc: 'I have 10+ years ahead and welcome volatility as buying opportunities.',
                },
              ].map((r) => {
                const isSelected = riskComfort === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRiskComfort(r.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold">{r.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{r.desc}</p>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(6)}
                className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-3 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Generate My Path</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* FINISH SCREEN: "Your FinVera journey starts now." */}
        {step === 8 && (
          <div className="text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-bold text-slate-950 text-2xl shadow-xl shadow-emerald-500/30">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Setup Complete
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Your FinVera journey starts now.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Here&apos;s where we&apos;ll start: customized for {name} ({selectedAgeCohort.title}).
              </p>
            </div>

            {/* Personalized Curriculum Preview */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300">
                  Recommended Priority Focus:
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Age {ageGroup}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {selectedAgeCohort.focusTopics.map((topic) => (
                  <span
                    key={topic}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-emerald-300 font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 italic pt-1">
                {selectedAgeCohort.exampleContext}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-500 text-center">
              Educational estimate & curriculum ordering only. Never considered personalized financial advice.
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-4 px-6 rounded-2xl font-extrabold text-base bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Enter FinVera</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
