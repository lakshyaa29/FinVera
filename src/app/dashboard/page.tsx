'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, Check, Clock3, Flame, Sparkles, TrendingUp, Calculator, Activity, Target, Wallet } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { useUserState } from '../../context/UserStateContext';
import { ALL_LESSONS } from '../../data/lessonsData';
import { AGE_CURRICULUM_DATA } from '../../data/ageCurriculumData';
import { LEVELS_CONFIG } from '../../data/unlockRequirements';
import { formatINR } from '../../lib/formatters';

const shortcuts = [
  { href: '/calculators?type=sip', title: 'SIP calculator', description: 'Explore what monthly investing could look like.', icon: TrendingUp, color: 'var(--lime-light)' },
  { href: '/calculators?type=emi', title: 'Loan EMI calculator', description: 'Understand your monthly loan payments.', icon: Calculator, color: 'var(--blue-light)' },
  { href: '/calculators?type=savings-goal', title: 'Savings goal', description: 'Break a big goal into smaller monthly steps.', icon: Target, color: 'var(--yellow-light)' },
  { href: '/health', title: 'Money health check', description: 'Find out which money habits to work on next.', icon: Activity, color: 'var(--coral-light)' },
];

export default function DashboardPage() {
  const { profile, progress, portfolio } = useUserState();
  const nextLesson = ALL_LESSONS.find((lesson) => !progress.completedLessonIds.includes(lesson.id));
  const lesson = nextLesson || ALL_LESSONS[ALL_LESSONS.length - 1];
  const level = LEVELS_CONFIG.find((item) => item.level === lesson.level) || LEVELS_CONFIG[0];
  const levelLessons = ALL_LESSONS.filter((item) => item.level === lesson.level);
  const completedInLevel = levelLessons.filter((item) => progress.completedLessonIds.includes(item.id)).length;
  const completedCount = ALL_LESSONS.filter((item) => progress.completedLessonIds.includes(item.id)).length;
  const percent = Math.round(completedInLevel / levelLessons.length * 100);
  const ageConfig = AGE_CURRICULUM_DATA[profile.ageGroup] || AGE_CURRICULUM_DATA['18-24'];
  const invested = Object.values(portfolio.holdings).reduce((total, holding) => total + holding.units * holding.avgBuyPrice, 0);
  const total = portfolio.virtualCash + invested;
  const cashPercent = total > 0 ? Math.min(100, Math.max(0, portfolio.virtualCash / total * 100)) : 0;

  return (
    <AppShell>
      <div className="space-y-7 pb-6">
        <div className="dashboard-heading flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div><span className="eyebrow text-[#6B6B6B] mb-2">Your learning space</span><h1>A little wiser, every day.<br className="sm:hidden" /> Welcome, {profile.name || 'learner'}.</h1><p>Pick up where you left off. Your next small step is ready.</p></div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card"><span><BookOpen size={15} /> Lessons completed</span><strong>{completedCount} <small>of {ALL_LESSONS.length} lessons</small></strong></div>
          <div className="stat-card"><span><Flame size={15} /> Learning streak</span><strong>{progress.streakDays} <small>{progress.streakDays === 1 ? 'day' : 'days'} in a row</small></strong></div>
          <div className="stat-card"><span><Sparkles size={15} /> Experience earned</span><strong>{progress.xp} <small>XP · {progress.levelTitle}</small></strong></div>
        </div>

        <section className="lesson-feature" aria-labelledby="next-lesson-heading">
          <div>
            <div className="flex flex-wrap items-center gap-3"><span className="nb-tag bg-white">{nextLesson ? 'Your next lesson' : 'Learning path complete'}</span><span className="text-xs font-medium text-[#575e4f]">Level {lesson.level} · {level.name}</span></div>
            <h2 id="next-lesson-heading">{nextLesson ? lesson.title : 'Look how far you’ve come.'}</h2>
            <p>{nextLesson ? lesson.shortDescription : 'You’ve completed every lesson. Revisit a favourite or put your knowledge into practice.'}</p>
            <div className="flex flex-wrap items-center gap-4 mt-5 text-xs font-semibold"><span className="flex items-center gap-1.5"><Clock3 size={14} /> {lesson.estimatedMinutes} min lesson</span><span className="flex items-center gap-1.5"><Sparkles size={14} /> {nextLesson ? `Earn ${lesson.xpReward} XP` : 'Ready to review'}</span></div>
            <div className="max-w-lg mt-6">
              <div className="flex justify-between gap-3 text-xs mb-2"><span>Level {lesson.level} progress</span><span className="font-semibold">{completedInLevel} of {levelLessons.length} lessons</span></div>
              <div role="progressbar" aria-label={`Level ${lesson.level} completion`} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} className="h-2.5 rounded-full bg-white border border-[#171717] overflow-hidden"><div style={{ width: `${percent}%` }} className="h-full bg-[#70E000] border-r border-[#171717]" /></div>
            </div>
          </div>
          <div className="lesson-feature-aside"><div className="lesson-illustration" aria-hidden="true"><BookOpen size={38} strokeWidth={1.5} /></div><Link href={`/learn/${lesson.id}`} className="nb-btn nb-btn-primary w-full">{nextLesson ? 'Continue lesson' : 'Review lesson'} <ArrowRight size={16} /></Link><Link href="/learn" className="text-xs font-semibold underline underline-offset-4">View your learning path</Link></div>
        </section>

        <div className="grid xl:grid-cols-2 gap-6">
          <section className="dashboard-panel flex flex-col" aria-labelledby="portfolio-heading">
            <div className="panel-heading"><h2 id="portfolio-heading">Your practice portfolio</h2><span className="text-[11px] px-2 py-1 rounded-md bg-[#F5F0FF] border border-[#ded5ed]">Virtual money</span></div>
            <div className="flex items-center gap-3"><span className="feature-icon bg-[#F0FDD4]"><Wallet size={22} /></span><div><p className="text-xs text-[#6B6B6B]">Cash + amount invested</p><p className="font-display text-3xl font-bold tracking-tight">{formatINR(total)}</p></div></div>
            <p className="text-sm text-[#6B6B6B] mt-5 leading-relaxed">{invested === 0 ? 'Your practice money is ready. Explore an investment and see how a portfolio works, without risking real money.' : 'Keep exploring and learning. This summary shows your holdings at their purchase cost.'}</p>
            <div className="mt-6 mb-2 h-3 rounded-full border border-[#171717] bg-[#B99CFF] overflow-hidden" role="img" aria-label={`Available cash ${formatINR(portfolio.virtualCash)}, invested at cost ${formatINR(invested)}`}><div style={{ width: `${cashPercent}%` }} className="h-full bg-[#b8e98b]" /></div>
            <div className="flex flex-wrap justify-between gap-2 text-xs mb-6"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#b8e98b] border border-[#171717]" />Cash: {formatINR(portfolio.virtualCash)}</span><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#B99CFF] border border-[#171717]" />Invested: {formatINR(invested)}</span></div>
            <Link href="/practice" className="nb-btn nb-btn-secondary w-full mt-auto">Explore the simulator <ArrowUpRight size={17} /></Link>
          </section>
          <section className="dashboard-panel" aria-labelledby="tools-heading"><div className="panel-heading"><h2 id="tools-heading">Make it practical</h2><Link href="/calculators">All calculators</Link></div>{shortcuts.map((item) => <Link href={item.href} className="tool-shortcut" key={item.href}><span className="feature-icon" style={{ background: item.color }}><item.icon size={20} /></span><div className="flex-1"><h3>{item.title}</h3><p>{item.description}</p></div><ArrowUpRight size={16} className="shrink-0" /></Link>)}</section>
        </div>

        <section className="rounded-xl border border-[#dcd3eb] bg-[#F5F0FF] p-5 sm:p-6 flex flex-col sm:flex-row justify-between gap-5" aria-labelledby="track-heading"><div><span className="eyebrow text-[#655578]">Learning that fits your life</span><h2 id="track-heading" className="font-display text-xl font-bold mt-2">{ageConfig.title}</h2><p className="text-sm text-[#655578] mt-1">{ageConfig.tagline}</p><div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">{ageConfig.focusTopics.slice(0, 3).map((topic) => <span key={topic} className="text-xs flex items-center gap-1.5"><Check size={13} />{topic}</span>)}</div></div><Link href="/profile" className="text-sm font-semibold underline underline-offset-4 shrink-0 self-start">Adjust your track</Link></section>
      </div>
    </AppShell>
  );
}
