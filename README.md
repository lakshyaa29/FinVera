# FINVERA — Learn Money. Build Wealth.

> **"The Duolingo of investing."**  
> *Understand how money works before you put it to work.*

FinVera is a production-quality financial education and investing web application built from scratch with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons**. It is designed to teach young adults, students, and first-time investors sound financial habits, banking essentials, credit mechanics, and investing principles before they risk real capital.

---

## 🌟 Core Features

### 1. Age-Based Personalization
- **4 Age Cohorts**: `13–17`, `18–24`, `25–34`, and `35+`.
- **Customized Learning Tracks**:
  - `13–17`: Pocket money budgeting, needs vs. wants, saving for gadgets, basic bank accounts, simple & compound interest.
  - `18–24`: First salary management, UPI & cybersecurity hygiene, starter credit cards, CIBIL scores, mutual fund SIPs, beginner stocks.
  - `25–34`: Emergency fund architecture, home loan EMIs, income tax planning (New vs Old regime), term/health insurance, asset allocation.
  - `35+`: Retirement corpus math (25x rule / 4% SWR), portfolio rebalancing, debt funds, inflation defense, wealth preservation.
- **Dynamic Dashboard**: Displays *"Your FinVera Journey — Personalized for ages 18–24"* with prioritized focus topics.
- **Settings Switcher**: Users can adjust their age group anytime from Settings without losing completed progress.

### 2. Progressive Section Unlocking
- **Level 1: Money Basics** → Unlocked by default (5 lessons).
- **Level 2: Saving** → Unlocks after completing 2 Money Basics lessons (5 lessons).
- **Level 3: Banking** → Unlocks after completing 4 total lessons (5 lessons).
- **Level 4: Credit** → Unlocks after completing 6 total lessons (5 lessons).
- **Level 5: Investing** → Unlocks after completing 8 total lessons (5 lessons).
- **Level 6: Wealth Building** → Unlocks after completing 12 total lessons (5 lessons).
- **Dynamic Countdown Badges**: Displays exact count needed (e.g. `🔒 Complete 3 more lessons to unlock Investing`).

### 3. Active Learning Loop (Learn → See → Try → Test → Reward)
- **30 Structured Modules** across all 6 levels.
- **"Explain Like I'm New"**: Interactive toggle contrasting plain-English metaphors against formal financial definitions.
- **Contextual In-Lesson Calculators**: Embedded directly within lessons (Compound Interest, SIP, Inflation, EMI, Savings Goal).
- **Real-Life Scenario Challenges**: Branching decisions with immediate diagnostic feedback.
- **Rapid Knowledge Checks**: Interactive quizzes rewarding XP.
- **Celebration Modals**: Confetti animations (`canvas-confetti`) with streak & unlock alerts.

### 4. Dedicated Calculator Center
1. **Compound Interest Calculator**: Initial principal, monthly additions, tenure, expected return, visual yearly growth chart.
2. **SIP Calculator**: Monthly SIP, duration, return percentage, visual capital growth.
3. **Inflation Calculator**: Current cost, inflation rate, years, purchasing power loss percentage.
4. **EMI Calculator**: Loan principal, interest rate, tenure, monthly installment, total interest, principal vs. interest breakdown.
5. **Savings Goal Calculator**: Target amount, current savings, monthly contribution, required monthly SIP to hit target on time.
- All with responsive sliders, precision numeric inputs, and Indian Rupee (`₹`) formatting.

### 5. Simulated Investing Playground
- **₹1,00,000 Virtual Cash** provided to every learner.
- **Prominent Banner**: `"SIMULATION — NOT REAL MONEY"`.
- **Mock Indian Market Assets**: Nifty 50 Index Fund, Nifty Next 50 ETF, TCS, Reliance, HDFC Bank, Nippon Gold ETF, and Government Liquid Bond Fund.
- Real-time Buy/Sell modal, holdings breakdown, unrealized returns (P&L in ₹ and %), and order transaction logs.

### 6. Gamification, Streaks & Badges
- **6 Rank Tiers**: `Money Beginner` (0-250 XP) to `Wealth Builder` (4,500+ XP).
- **Daily Streaks**: Active day counter with flame animation and weekly activity tracking.
- **12 Milestone Badges**: Unlockable achievements rewarding bonus XP.

### 7. Search & Reference
- **Global Search (`Ctrl+K` / `⌘K`)**: Searches across lessons, calculators, glossary, and missions simultaneously.
- **25+ Term Glossary**: Plain-English definitions, everyday analogies, and jump links.
- **Money Health Checkup**: 5-pillar diagnostic yielding an overall Financial Confidence Score (0–100).

---

## 🚀 Quick Start

### Prerequisites
- Node.js LTS (v20+ or v24+)
- npm (v10+ or v11+)

### Installation & Running Locally

```bash
# Navigate to project directory
cd FinVera

# Install dependencies (already completed)
npm install

# Start development server
npm run dev
```

Open your browser at:
**[http://localhost:3000](http://localhost:3000)**

### Production Build

```bash
# Run production build
npm run build

# Start production server
npm run start
```

---

## 🗄️ Database & Supabase Ready

FinVera is architected with complete offline-first `localStorage` persistence that works seamlessly without any API keys or network connection.

If you wish to synchronize data with **Supabase**, the application models (`UserProfile`, `UserProgress`, `SimulatedPortfolio`, `SimulatedTransaction`) map 1:1 to SQL tables. See `supabase_schema.sql` in this directory for the ready-to-run PostgreSQL migration script.

---

## ⚖️ Financial Safety & Disclaimer

FinVera is an **educational platform** designed to teach financial literacy principles. It does not provide personalized investment advice, sell securities, or guarantee financial returns. All calculation engines provide educational estimates based on standard financial formulas.
