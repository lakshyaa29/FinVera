import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Flame,
  CheckCircle2,
  Lock,
  TrendingUp,
  Calculator,
  Award,
  BookOpen,
  PieChart,
} from 'lucide-react';

export default function LandingPage() {
  const JOURNEY_STEPS = [
    { level: '1', title: 'Money', icon: '💰', color: 'border-emerald-500 text-emerald-400' },
    { level: '2', title: 'Saving', icon: '🏦', color: 'border-blue-500 text-blue-400' },
    { level: '3', title: 'Banking', icon: '🏛️', color: 'border-indigo-500 text-indigo-400' },
    { level: '4', title: 'Credit', icon: '💳', color: 'border-amber-500 text-amber-400' },
    { level: '5', title: 'Investing', icon: '📈', color: 'border-teal-500 text-teal-400' },
    { level: '6', title: 'Wealth', icon: '💎', color: 'border-purple-500 text-purple-400' },
  ];

  const HOW_IT_WORKS_STEPS = [
    {
      num: '01',
      title: 'Learn',
      desc: 'Master fundamental money concepts in 4-minute interactive modules with plain-English breakdowns.',
      icon: BookOpen,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      num: '02',
      title: 'Practice',
      desc: 'Interact with live financial calculators and realistic scenario challenges right inside the lesson.',
      icon: Calculator,
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    },
    {
      num: '03',
      title: 'Test',
      desc: 'Check your knowledge with rapid, scenario-based quizzes that reinforce lifelong financial habits.',
      icon: Zap,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      num: '04',
      title: 'Unlock',
      desc: 'Progress through 6 structured tiers. Complete prerequisite lessons to unlock Banking, Credit, and Investing.',
      icon: Lock,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      num: '05',
      title: 'Build',
      desc: 'Practice buying and selling real Indian market assets using ₹1,00,000 in virtual simulation capital.',
      icon: TrendingUp,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      num: '06',
      title: 'Grow',
      desc: 'Build genuine financial confidence, earn XP, maintain streaks, and make smart real-world money choices.',
      icon: Award,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-emerald-500/20">
              ₹
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white">FINVERA</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                Fintech Education
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-xl hover:bg-slate-900 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/onboarding"
              className="text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 px-6 border-b border-slate-800/60">
        {/* Glow Effects */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge: THE DUOLINGO OF INVESTING */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>THE DUOLINGO OF INVESTING</span>
          </div>

          {/* Main Title & Tagline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Learn money. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
              Build wealth.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Understand how money works before you put it to work. Bite-sized interactive lessons,
            progressive unlockable learning paths, and simulated investing built for the next
            generation of wealth builders.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-base bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
            >
              <span>Start Learning Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/learn"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-base bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <span>Explore the Journey</span>
            </Link>
          </div>

          {/* Hero Visual: The Financial Learning Journey */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-sm">
            <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-6 text-center">
              FinVera turns financial education into a progressive journey
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {JOURNEY_STEPS.map((step, idx) => (
                <div
                  key={step.title}
                  className="flex flex-col items-center p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all group"
                >
                  <span className="text-2xl sm:text-3xl mb-1.5 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">
                    Level {step.level}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-200 mt-0.5">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: WHY FINVERA */}
      <section className="py-16 sm:py-24 px-6 border-b border-slate-800/60 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Why FinVera
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              &quot;Most people learn investing before they understand money.&quot;
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3">
              Jumping straight into stock trading without understanding cash flow, credit, and
              banking leads straight to expensive mistakes. FinVera builds foundational strength
              step by step:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'How Money Works',
                desc: 'Needs vs wants, positive net cash flow, and budgeting without deprivation.',
                icon: '💰',
              },
              {
                title: 'How Banks Work',
                desc: 'Savings accounts, UPI security, DICGC guarantees, and repo rate cycles.',
                icon: '🏛️',
              },
              {
                title: 'How Credit Works',
                desc: 'CIBIL scores, credit card 50-day floats, and avoiding 42% debt traps.',
                icon: '💳',
              },
              {
                title: 'How Loans Work',
                desc: 'Amortization schedules, reducing balance interest, and smart prepayment math.',
                icon: '📑',
              },
              {
                title: 'How Investing Works',
                desc: 'Fractional ownership in real companies, mutual funds, SIPs, and index funds.',
                icon: '📈',
              },
              {
                title: 'How Wealth Grows',
                desc: 'Asset allocation across equity, debt, and gold, tax planning, and FI/RE math.',
                icon: '💎',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-base font-bold text-white mb-1.5">{card.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: HOW IT WORKS */}
      <section className="py-16 sm:py-24 px-6 border-b border-slate-800/60 bg-slate-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              The Learning Loop
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              How FinVera Works
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Every lesson is engineered around an active pedagogical loop: Learn → See → Try →
              Test → Reward.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOW_IT_WORKS_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl border ${step.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section: AGE-BASED PERSONALIZATION HIGHLIGHT */}
      <section className="py-16 sm:py-24 px-6 border-b border-slate-800/60 bg-slate-950">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Tailored To Your Life Stage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
            Personalized For Your Age Group
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-xl mx-auto">
            A 16-year-old student needs different financial frameworks than a 32-year-old managing
            family loans and retirement plans.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 text-left">
            {[
              {
                age: '13–17',
                title: 'Teen & Student',
                focus: 'Pocket money, needs vs wants, gadget saving, banking basics, interest.',
              },
              {
                age: '18–24',
                title: 'Young Adult',
                focus: 'First salary, UPI security, starter credit cards, SIPs, beginner equities.',
              },
              {
                age: '25–34',
                title: 'Wealth Builder',
                focus: 'Emergency funds, home loans, income tax optimization, mutual funds, insurance.',
              },
              {
                age: '35+',
                title: 'Capital Mastery',
                focus: 'Asset allocation, portfolio rebalancing, retirement corpus, wealth preservation.',
              },
            ].map((cohort) => (
              <div
                key={cohort.age}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-extrabold text-emerald-400 font-mono">
                    {cohort.age}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">Track</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{cohort.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{cohort.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 sm:py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Your FinVera journey starts today.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mb-8 max-w-lg mx-auto">
            100% free educational platform. No credit card required. Master money before putting
            real capital at risk.
          </p>

          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-extrabold text-base bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Start Learning Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">FINVERA</span>
            <span>— Educational financial literacy platform.</span>
          </div>
          <div>
            Educational estimate only. FinVera does not offer investment advice or guarantee
            returns.
          </div>
        </div>
      </footer>
    </div>
  );
}
