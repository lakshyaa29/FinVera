import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, Check, Compass, ShieldCheck, TrendingUp, Wallet, Layers, Target, Award, Sparkles } from 'lucide-react';
import { ALL_LESSONS } from '../data/lessonsData';

const journey = [
  { title: 'Money basics', description: 'Build a budget, understand your spending, and make room for saving.', icon: Wallet, color: 'var(--lime-light)', tag: 'Start here' },
  { title: 'Your safety net', description: 'Learn how to prepare for unexpected expenses with an emergency fund.', icon: ShieldCheck, color: 'var(--blue-light)', tag: 'Save with purpose' },
  { title: 'Banking & UPI', description: 'Get comfortable with bank accounts, everyday payments, and digital safety.', icon: Layers, color: 'var(--lavender-light)', tag: 'Everyday essentials' },
  { title: 'Credit & borrowing', description: 'Understand credit scores, loan costs, and how to borrow responsibly.', icon: Target, color: 'var(--yellow-light)', tag: 'Borrow thoughtfully' },
  { title: 'Investing & SIPs', description: 'Explore funds and regular investing, then try it with virtual money.', icon: TrendingUp, color: 'var(--mint-light)', tag: 'Put learning to work' },
  { title: 'Long-term wealth', description: 'Bring it all together with a plan for your bigger financial goals.', icon: Award, color: 'var(--coral-light)', tag: 'Look ahead' },
];

export default function LandingPage() {
  return (
    <div className="landing-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="landing-nav">
        <div className="site-container flex items-center justify-between gap-4">
          <Link href="/" className="brand-lockup" aria-label="FinVera home"><span className="brand-mark">₹</span><span className="font-display font-bold text-xl tracking-tight">FINVERA<span className="brand-label">EDU</span></span></Link>
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7 text-sm font-semibold"><a href="#how-it-works" className="quiet-link">How it works</a><a href="#learning-path" className="quiet-link">Learning path</a><Link href="/glossary" className="quiet-link">Money glossary</Link></nav>
          <div className="flex items-center gap-4 sm:gap-6"><Link href="/login" className="quiet-link text-sm font-semibold hidden sm:block">Sign in</Link><Link href="/onboarding" className="nb-btn nb-btn-primary">Get started <ArrowRight size={16} /></Link></div>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        <section className="landing-hero site-container">
          <div className="hero-copy">
            <span className="eyebrow"><span className="status-dot" /> A little learning. A lot more confidence.</span>
            <h1>Get better<br />with money.<br /><span className="hero-highlight">One step at a time.</span></h1>
            <p className="hero-description">Money doesn’t have to feel complicated. Learn the basics, try things out, and build everyday confidence—with lessons made for life in India.</p>
            <div className="flex flex-wrap gap-4 mt-8"><Link href="/onboarding" className="nb-btn nb-btn-primary hero-button">Start learning for free <ArrowRight size={18} /></Link><a href="#learning-path" className="nb-btn nb-btn-secondary hero-button">Explore the learning path</a></div>
            <div className="hero-reassurance"><span><Check size={15} /> Beginner friendly</span><span><Check size={15} /> Learn at your pace</span><span><Check size={15} /> No real money at risk</span></div>
          </div>
          <div className="hero-preview" aria-label="Preview of the FinVera learning experience">
            <div className="preview-decoration" aria-hidden="true" />
            <div className="preview-label"><Sparkles size={15} /> Small steps. Real understanding.</div>
            <div className="preview-card">
              <div className="flex justify-between items-center gap-3 mb-6"><span className="eyebrow">Your money playground</span><span className="preview-badge">Preview</span></div>
              <div className="flex items-center gap-3 mb-6"><div className="feature-icon bg-[#F0FDD4]"><Wallet size={23} /></div><div><p className="text-sm text-[#6B6B6B]">Start with virtual money</p><p className="font-display text-4xl font-bold tracking-tight mt-1">₹1,00,000</p></div></div>
              <div className="preview-chart" aria-hidden="true">
                {[25, 37, 33, 52, 47, 66, 79, 94].map((height, i) => <div key={i} style={{ height: `${height}%` }} />)}
                <span className="chart-sticker"><TrendingUp size={16} /> Room to grow</span>
              </div>
              <div className="flex justify-between text-xs text-[#6B6B6B] mt-3"><span>Try. Learn. Repeat.</span><span>Illustrative example</span></div>
              <div className="preview-lesson"><span className="feature-icon bg-[#FFF9E0]"><BookOpen size={21} /></span><div className="flex-1"><p className="text-xs text-[#6B6B6B] mb-1">Your first step</p><p className="font-display font-bold">Understand your money</p></div><ArrowRight size={19} /></div>
            </div>
            <div className="preview-note"><ShieldCheck size={19} /><span>Practice with virtual cash.<br /><strong>Build confidence for real life.</strong></span></div>
          </div>
        </section>
        <section className="facts-strip" aria-label="What is included"><div className="site-container grid grid-cols-2 lg:grid-cols-4 gap-6">{[['06', 'levels, one clear path'], [String(ALL_LESSONS.length), 'bite-sized lessons'], ['05', 'hands-on calculators'], ['₹1L', 'virtual money to practice']].map(([value, label]) => <div key={label} className="fact-item"><span>{value}</span><p>{label}</p></div>)}</div></section>
        <section id="how-it-works" className="site-container landing-section">
          <div className="section-heading"><span className="eyebrow">Made for the way you learn</span><h2>A simple way to make money make sense.</h2><p>No experience needed. Just a little curiosity.</p></div>
          <div className="grid md:grid-cols-3 gap-6">{[
            { icon: BookOpen, title: 'Learn a little', text: 'Short lessons turn big money topics into everyday examples you can understand.', color: 'bg-[#F0FDD4]' },
            { icon: Compass, title: 'Try it yourself', text: 'Move a slider, work through a challenge, or explore investing with virtual cash.', color: 'bg-[#F5F0FF]' },
            { icon: TrendingUp, title: 'Build your confidence', text: 'See your progress, unlock the next level, and keep growing one lesson at a time.', color: 'bg-[#FFF9E0]' },
          ].map((item, index) => <article className="how-card" key={item.title}><div className="flex justify-between items-center mb-6"><span className={`feature-icon ${item.color}`}><item.icon size={23} /></span><span className="step-number">0{index + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </section>
        <section id="learning-path" className="path-section"><div className="site-container landing-section">
          <div className="section-heading flex flex-col md:flex-row md:items-end justify-between gap-6"><div><span className="eyebrow">Your learning path</span><h2>Start with the basics.<br />Grow from there.</h2><p>Six clear levels. Each one builds on what you’ve learned.</p></div><Link href="/learn" className="nb-btn nb-btn-secondary self-start shrink-0">View full roadmap <ArrowUpRight size={17} /></Link></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{journey.map((item, index) => <Link href="/learn" key={item.title} className="journey-card group"><div className="flex justify-between items-center mb-6"><span className="feature-icon" style={{ background: item.color }}><item.icon size={23} /></span><span className="text-xs font-semibold text-[#6B6B6B]">LEVEL 0{index + 1}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="journey-card-footer"><span>{item.tag}</span><ArrowUpRight size={17} className="group-hover:translate-x-0.5 transition-transform" /></div></Link>)}</div>
        </div></section>
        <section className="site-container landing-section"><div className="landing-cta"><div><span className="eyebrow">Your future self will thank you</span><h2>A good money habit<br />starts with one small step.</h2><p>Find your starting point. We’ll help you take it from there.</p></div><Link href="/onboarding" className="nb-btn nb-btn-dark hero-button shrink-0">Let’s get started <ArrowRight size={18} /></Link></div></section>
      </main>
      <footer className="landing-footer"><div className="site-container flex flex-col sm:flex-row justify-between gap-6"><div><Link href="/" className="font-display font-bold text-lg">FINVERA</Link><p className="text-xs text-[#6B6B6B] mt-2">© 2026 FinVera. Learn money, one step at a time.</p></div><nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-5 text-sm font-medium"><Link href="/learn">Learning path</Link><Link href="/calculators">Calculators</Link><Link href="/glossary">Glossary</Link><Link href="/login">Sign in</Link></nav></div></footer>
    </div>
  );
}
