import { AgeGroup } from '../types';

export interface AgeCohortConfig {
  ageGroup: AgeGroup;
  title: string;
  tagline: string;
  focusTopics: string[];
  recommendedLessonIds: string[];
  exampleContext: string;
  badgeColor: string;
  disclaimer: string;
}

export const AGE_CURRICULUM_DATA: Record<AgeGroup, AgeCohortConfig> = {
  '13-17': {
    ageGroup: '13-17',
    title: 'Teen & Student Track',
    tagline: 'Master the money essentials before stepping into adulthood.',
    focusTopics: [
      'Money Basics',
      'Needs vs Wants',
      'Pocket Money Budgeting',
      'Saving for Gadgets',
      'Banking Basics',
      'Compound Interest Magic',
    ],
    recommendedLessonIds: [
      'money-101',
      'needs-vs-wants',
      'income-expenses',
      'how-budgeting-works',
      'power-of-saving',
      'compound-interest',
    ],
    exampleContext:
      'Contextualized with school/college life, managing pocket money, saving for video games/smartphones, and understanding basic bank accounts.',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    disclaimer:
      'Educational focus tailored for young minds building early financial discipline. Never considered investment advice.',
  },
  '18-24': {
    ageGroup: '18-24',
    title: 'First-Job & Young Adult Track',
    tagline: 'Build rock-solid financial foundations from your very first paycheck.',
    focusTopics: [
      'Money Basics',
      'UPI & Digital Security',
      'First Salary Allocation',
      'Credit Cards & CIBIL',
      'Mutual Funds & SIPs',
      'Intro to Stocks & ETFs',
    ],
    recommendedLessonIds: [
      'money-101',
      'banking-upi-safety',
      'first-credit-card',
      'sip-basics',
      'what-is-mutual-fund',
      'stock-market-basics',
    ],
    exampleContext:
      'Focuses on starting your career, managing college loans, using UPI securely, credit cards with zero debt traps, and kickstarting your first ₹1,000 SIP.',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
    disclaimer:
      'Curated educational path for early career builders. All investment content is purely conceptual.',
  },
  '25-34': {
    ageGroup: '25-34',
    title: 'Wealth Acceleration & Life Milestones Track',
    tagline: 'Optimize taxes, safeguard loved ones, and scale your investment portfolio.',
    focusTopics: [
      'Emergency Fund Architecture',
      'Home & Auto Loans (EMI)',
      'Income Tax Optimization (New vs Old)',
      'Term & Health Insurance',
      'Equity & Index Investing',
      'Wealth Building Flywheels',
    ],
    recommendedLessonIds: [
      'emergency-funds',
      'demystifying-loans-emi',
      'tax-basics-india',
      'insurance-fundamentals',
      'index-funds-etfs',
      'asset-allocation-flywheel',
    ],
    exampleContext:
      'Geared towards growing income, balancing family responsibilities, home loan planning, term/health cover, and aggressive long-term compounding.',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300',
    disclaimer:
      'High-impact financial literacy for career growth and family milestone readiness. No specific investment products recommended.',
  },
  '35+': {
    ageGroup: '35+',
    title: 'Mastery, Capital Preservation & Retirement Track',
    tagline: 'Preserve purchasing power, plan retirement corpus, and build generational wealth.',
    focusTopics: [
      'Retirement Corpus Planning',
      'Portfolio Rebalancing',
      'Debt vs Equity Allocation',
      'Inflation Hedging & Gold',
      'Tax-Efficient Withdrawals',
      'Estate & Legacy Planning',
    ],
    recommendedLessonIds: [
      'silent-tax-inflation',
      'asset-allocation-flywheel',
      'debt-funds-bonds',
      'retirement-corpus-math',
      'diversification-risk',
      'wealth-preservation-legacy',
    ],
    exampleContext:
      'Emphasizes balancing higher returns with risk management, inflation protection, child higher education funds, and bulletproof retirement readiness.',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300',
    disclaimer:
      'Advanced financial education for wealth preservation and retirement planning. Consult a SEBI-registered advisor for personal portfolio advice.',
  },
};
