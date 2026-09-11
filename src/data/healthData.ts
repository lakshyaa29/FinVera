export interface HealthQuestion {
  id: string;
  category: 'savingHabits' | 'budgetAwareness' | 'creditKnowledge' | 'investingReadiness' | 'emergencyFund';
  categoryLabel: string;
  question: string;
  options: {
    label: string;
    points: number; // 0 to 20
    description: string;
  }[];
}

export const HEALTH_QUESTIONS: HealthQuestion[] = [
  {
    id: 'hq-1',
    category: 'emergencyFund',
    categoryLabel: 'Emergency Preparedness',
    question: 'If you suffered an unexpected income disruption today, how long could your liquid savings sustain you?',
    options: [
      { label: 'Less than 2 weeks', points: 4, description: 'High vulnerability to surprise expenses.' },
      { label: '1 to 2 months', points: 10, description: 'Modest buffer, still exposed to major disruptions.' },
      { label: '3 to 6 months in liquid savings or FDs', points: 18, description: 'Solid safety cushion matching recommended hygiene.' },
      { label: '6+ months of living expenses safely banked', points: 20, description: 'Exceptional liquidity shield.' },
    ],
  },
  {
    id: 'hq-2',
    category: 'budgetAwareness',
    categoryLabel: 'Budget Awareness',
    question: 'How accurately do you track where your money goes every month?',
    options: [
      { label: 'I have no idea; money just vanishes', points: 4, description: 'No visibility into personal cash flows.' },
      { label: 'Rough mental estimate, but frequent end-of-month surprises', points: 10, description: 'Loose awareness without system.' },
      { label: 'I follow a 50/30/20 split or automate savings first', points: 18, description: 'Strong intentional spending habits.' },
      { label: 'Zero-based budgeting with clear categorical tracking', points: 20, description: 'Mastery over personal cash flow.' },
    ],
  },
  {
    id: 'hq-3',
    category: 'savingHabits',
    categoryLabel: 'Saving Discipline',
    question: 'What percentage of your net monthly earnings do you consistently save or invest?',
    options: [
      { label: '0% (spending everything or carrying debt)', points: 2, description: 'Capital is evaporating each month.' },
      { label: '5% to 10%', points: 10, description: 'Good start, with room to scale.' },
      { label: '15% to 25%', points: 17, description: 'Healthy accumulation rate above national average.' },
      { label: '30%+ automated every single month', points: 20, description: 'Elite wealth acceleration velocity.' },
    ],
  },
  {
    id: 'hq-4',
    category: 'creditKnowledge',
    categoryLabel: 'Credit & Debt Discipline',
    question: 'How do you handle your credit cards and personal liabilities?',
    options: [
      { label: 'I only pay the Minimum Amount Due each month', points: 2, description: 'High-risk revolving debt incurring 40%+ interest.' },
      { label: 'I have multiple BNPL/EMIs eating over 40% of my salary', points: 8, description: 'Heavy debt-to-income burden.' },
      { label: 'I always pay 100% of my credit card bills on time in full', points: 18, description: 'Using credit as an interest-free tool.' },
      { label: '800+ credit score, zero bad debt, utilization under 20%', points: 20, description: 'Flawless institutional credit health.' },
    ],
  },
  {
    id: 'hq-5',
    category: 'investingReadiness',
    categoryLabel: 'Investing Readiness',
    question: 'How is your money deployed against inflation?',
    options: [
      { label: 'All sitting in a 3% savings bank account or cash', points: 4, description: 'Losing purchasing power to inflation daily.' },
      { label: 'Only in fixed deposits and traditional insurance endowments', points: 10, description: 'Safe nominal returns, but low real returns.' },
      { label: 'Active monthly equity SIPs + debt buffer', points: 18, description: 'Productive compounding portfolio.' },
      { label: 'Diversified asset allocation (Equities, Debt, Gold) with rebalancing', points: 20, description: 'Comprehensive modern wealth strategy.' },
    ],
  },
];
