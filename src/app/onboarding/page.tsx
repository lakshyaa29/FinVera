'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserState } from '../../context/UserStateContext';
import { AgeGroup, Occupation, KnowledgeLevel, RiskComfort } from '../../types';
import { AGE_CURRICULUM_DATA } from '../../data/ageCurriculumData';
import {
  ArrowRight,
  Check,
  Flame,
  Zap,
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
    setStep(8);
  };

  const selectedAgeCohort = AGE_CURRICULUM_DATA[ageGroup];

  return (
    <div className="min-h-screen bg-[#F8F8F3] text-[#171717] flex flex-col justify-center items-center p-4 sm:p-6 nb-pattern-grid selection:bg-[#70E000] selection:text-[#171717]">
      <div className="w-full max-w-xl bg-[#FFFFFF] border-3 border-[#171717] rounded-xl p-6 sm:p-9 shadow-[6px_6px_0px_#171717] relative z-10">
        {/* Brand Logo Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#171717] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#70E000] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center justify-center font-display font-black text-lg text-[#171717]">
              ₹
            </div>
            <div>
              <span className="font-display font-black text-base tracking-tight text-[#171717]">
                FINVERA
              </span>
              <p className="font-mono text-[10px] text-[#6B6B6B] font-bold">Personalized Onboarding</p>
            </div>
          </div>

          {step <= 7 && (
            <span className="nb-tag bg-[#FFD84D] text-[#171717]">
              STEP {step} / {totalSteps}
            </span>
          )}
        </div>

        {/* Step Progress Bar */}
        {step <= 7 && (
          <div className="w-full h-3 bg-[#E5E5DE] border-2 border-[#171717] rounded-full overflow-hidden mb-6">
            <div
              style={{ width: `${(step / totalSteps) * 100}%` }}
              className="h-full bg-[#70E000] transition-all duration-200"
            />
          </div>
        )}

        {/* STEP 1: NAME */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="nb-tag bg-[#6C8CFF] text-[#171717] mb-2">LET&apos;S GET STARTED</span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#171717] mt-1">
                WHAT SHOULD WE CALL YOU?
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
                Your name will appear on your learning dashboard, certificate rank, and simulation holdings.
              </p>
            </div>

            <div>
              <label className="font-display font-bold text-xs uppercase tracking-wider text-[#171717] block mb-2">
                Your First Name / Nickname
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav, Priya, Rohan"
                className="nb-input w-full p-3.5 font-display font-extrabold text-lg"
                autoFocus
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="nb-btn nb-btn-primary w-full py-3.5 text-base"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        )}

        {/* STEP 2: AGE COHORT */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="nb-tag bg-[#B99CFF] text-[#171717] mb-2">PERSONALIZED COHORT</span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#171717] mt-1">
                WHAT&apos;S YOUR LIFE STAGE?
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
                We calibrate curriculum priorities, tax regimes, and simulations to your stage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(
                [
                  { id: '13-17', label: '13–17 Years', desc: 'Teens & School Students' },
                  { id: '18-24', label: '18–24 Years', desc: 'College Students & First Job' },
                  { id: '25-34', label: '25–34 Years', desc: 'Working Professionals' },
                  { id: '35+', label: '35+ Years', desc: 'Capital Growth & FI/RE' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setAgeGroup(opt.id)}
                  className={`p-4 rounded-lg border-2 border-[#171717] text-left transition-all cursor-pointer ${
                    ageGroup === opt.id
                      ? 'bg-[#70E000] shadow-[4px_4px_0px_#171717] translate-x-[-1px] translate-y-[-1px]'
                      : 'bg-[#FFFFFF] hover:bg-[#FAFAF7]'
                  }`}
                >
                  <p className="font-display font-black text-base text-[#171717]">{opt.label}</p>
                  <p className="text-xs text-[#171717] opacity-80 mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>

            {/* Preview Banner */}
            <div className="p-3.5 bg-[#FAFAF7] border-2 border-[#171717] rounded-lg text-xs">
              <span className="font-display font-bold text-[#171717] block mb-1">
                Target Pathway: {selectedAgeCohort.title}
              </span>
              <p className="text-[#6B6B6B]">{selectedAgeCohort.tagline}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="nb-btn nb-btn-secondary flex-1 py-3"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="nb-btn nb-btn-primary flex-2 py-3"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: OCCUPATION */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <span className="nb-tag bg-[#FFD84D] text-[#171717] mb-2">CASH FLOW SOURCE</span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#171717] mt-1">
                WHAT IS YOUR CURRENT STATUS?
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
                Helps us explain emergency funds, salary slips, or variable freelance revenue.
              </p>
            </div>

            <div className="space-y-2.5">
              {(
                [
                  { id: 'student', title: 'Student', desc: 'Managing allowance, part-time income, or campus grants' },
                  { id: 'working', title: 'Salaried Professional', desc: 'Receiving monthly paycheck, TDS, and EPF' },
                  { id: 'entrepreneur', title: 'Freelancer / Founder', desc: 'Managing irregular cash flow and GST' },
                  { id: 'other', title: 'Other / Homemaker', desc: 'Household budgeting and personal wealth' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setOccupation(opt.id)}
                  className={`w-full p-3.5 rounded-lg border-2 border-[#171717] text-left transition-all flex items-center justify-between cursor-pointer ${
                    occupation === opt.id
                      ? 'bg-[#FFD84D] shadow-[3px_3px_0px_#171717]'
                      : 'bg-[#FFFFFF] hover:bg-[#FAFAF7]'
                  }`}
                >
                  <div>
                    <p className="font-display font-black text-sm text-[#171717]">{opt.title}</p>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">{opt.desc}</p>
                  </div>
                  {occupation === opt.id && <Check className="w-5 h-5 text-[#171717] stroke-[3]" />}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="nb-btn nb-btn-secondary flex-1 py-3"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="nb-btn nb-btn-primary flex-2 py-3"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: KNOWLEDGE LEVEL */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <span className="nb-tag bg-[#6C8CFF] text-[#171717] mb-2">STARTING LINE</span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#171717] mt-1">
                HOW FAMILIAR ARE YOU WITH FINANCE?
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
                Zero shame. We calibrate plain-English explanations accordingly.
              </p>
            </div>

            <div className="space-y-3">
              {(
                [
                  { id: 'beginner', title: 'Total Beginner', desc: 'I know cash, but terms like SIP, ETF, or NAV sound confusing.' },
                  { id: 'intermediate', title: 'Some Exposure', desc: 'I have a bank account and know about FDs, but want to invest in equities.' },
                  { id: 'advanced', title: 'Active Investor', desc: 'I understand PE ratio, index funds, and want capital allocation mastery.' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setKnowledgeLevel(opt.id)}
                  className={`w-full p-4 rounded-lg border-2 border-[#171717] text-left transition-all flex items-center justify-between cursor-pointer ${
                    knowledgeLevel === opt.id
                      ? 'bg-[#70E000] shadow-[4px_4px_0px_#171717]'
                      : 'bg-[#FFFFFF] hover:bg-[#FAFAF7]'
                  }`}
                >
                  <div>
                    <p className="font-display font-black text-base text-[#171717]">{opt.title}</p>
                    <p className="text-xs text-[#171717] opacity-80 mt-0.5">{opt.desc}</p>
                  </div>
                  {knowledgeLevel === opt.id && <Check className="w-5 h-5 text-[#171717] stroke-[3]" />}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="nb-btn nb-btn-secondary flex-1 py-3"
              >
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="nb-btn nb-btn-primary flex-2 py-3"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: TOPIC SELECTION */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <span className="nb-tag bg-[#B99CFF] text-[#171717] mb-2">CURRICULUM PRIORITIES</span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#171717] mt-1">
                WHAT WOULD YOU LIKE TO MASTER FIRST?
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
                Select as many as you like. We will prioritize these modules on your dashboard.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {TOPIC_CHOICES.map((topic) => {
                const isSelected = selectedTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`px-3.5 py-2 rounded-lg border-2 border-[#171717] text-xs font-display font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#70E000] text-[#171717] shadow-[3px_3px_0px_#171717] translate-x-[-1px] translate-y-[-1px]'
                        : 'bg-[#FFFFFF] text-[#6B6B6B] hover:text-[#171717]'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {topic}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(4)}
                className="nb-btn nb-btn-secondary flex-1 py-3"
              >
                Back
              </button>
              <button
                onClick={() => setStep(6)}
                className="nb-btn nb-btn-primary flex-2 py-3"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: RISK COMFORT */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <span className="nb-tag bg-[#FF6B6B] text-[#171717] mb-2">VOLATILITY DISCIPLINE</span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#171717] mt-1">
                HOW DO YOU REACT TO VOLATILITY?
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
                If the stock market falls 10% in a week, what is your instinct?
              </p>
            </div>

            <div className="space-y-3">
              {(
                [
                  { id: 'cautious', title: 'Conservative', desc: 'Safety first. I prefer fixed deposits, sovereign gold bonds, and capital preservation.' },
                  { id: 'balanced', title: 'Balanced Explorer', desc: 'I accept normal market fluctuations for 12-14% index fund compounding.' },
                  { id: 'growth', title: 'Growth Maximizer', desc: 'I view market dips as discounts to accumulate more equity units long term.' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setRiskComfort(opt.id)}
                  className={`w-full p-4 rounded-lg border-2 border-[#171717] text-left transition-all flex items-center justify-between cursor-pointer ${
                    riskComfort === opt.id
                      ? 'bg-[#FFD84D] shadow-[4px_4px_0px_#171717]'
                      : 'bg-[#FFFFFF] hover:bg-[#FAFAF7]'
                  }`}
                >
                  <div>
                    <p className="font-display font-black text-base text-[#171717]">{opt.title}</p>
                    <p className="text-xs text-[#171717] opacity-80 mt-0.5">{opt.desc}</p>
                  </div>
                  {riskComfort === opt.id && <Check className="w-5 h-5 text-[#171717] stroke-[3]" />}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(5)}
                className="nb-btn nb-btn-secondary flex-1 py-3"
              >
                Back
              </button>
              <button
                onClick={() => setStep(7)}
                className="nb-btn nb-btn-primary flex-2 py-3"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: REVIEW & CONFIRM */}
        {step === 7 && (
          <div className="space-y-6">
            <div>
              <span className="nb-tag bg-[#70E000] text-[#171717] mb-2">READY TO LAUNCH</span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#171717] mt-1">
                YOUR LEARNER PROFILE
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
                Everything is personalized and ready for your first financial milestone.
              </p>
            </div>

            <div className="bg-[#FAFAF7] border-2 border-[#171717] rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-[#171717]/20">
                <span className="font-medium text-[#6B6B6B]">Display Name:</span>
                <span className="font-display font-extrabold text-[#171717]">{name}</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-[#171717]/20">
                <span className="font-medium text-[#6B6B6B]">Age Cohort:</span>
                <span className="font-display font-extrabold text-[#171717]">{ageGroup}</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-[#171717]/20">
                <span className="font-medium text-[#6B6B6B]">Starting Capital:</span>
                <span className="font-mono font-black text-[#70E000] bg-[#171717] px-2 py-0.5 rounded">
                  ₹1,00,000 Virtual Cash
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-[#6B6B6B]">Starting XP:</span>
                <span className="font-mono font-bold text-[#171717]">50 Bonus XP</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(6)}
                className="nb-btn nb-btn-secondary flex-1 py-3"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="nb-btn nb-btn-primary flex-2 py-3.5 text-base"
              >
                <span>Launch FinVera</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 8: CELEBRATION / FINISHED */}
        {step === 8 && (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-xl bg-[#70E000] border-3 border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center font-display font-black text-3xl mx-auto">
              ✓
            </div>

            <div>
              <span className="nb-sticker bg-[#FFD84D] text-[#171717]">
                PROFILE ACTIVATED!
              </span>
              <h2 className="font-display font-black text-3xl text-[#171717] mt-2">
                WELCOME ABOARD, {name.toUpperCase()}!
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 max-w-sm mx-auto font-medium">
                Your ₹1,00,000 virtual portfolio has been credited, and Level 1 lessons are unlocked.
              </p>
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="nb-btn nb-btn-primary w-full py-4 text-base shadow-[5px_5px_0px_#171717]"
            >
              <span>ENTER YOUR DASHBOARD</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
