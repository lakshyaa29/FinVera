import { MoneyMission } from '../types';

export const MONEY_MISSIONS: MoneyMission[] = [
  {
    id: 'mission-first-salary',
    title: 'First ₹25,000 Salary Allocation',
    category: 'Budgeting & Cash Flow',
    difficulty: 'Beginner',
    xpReward: 100,
    prompt:
      'Your first monthly salary of ₹25,000 just arrived in your bank account! How will you partition this money before temptation strikes?',
    context:
      'You have basic living expenses of roughly ₹12,000 (rent share, groceries, phone). You also have social temptations and want to start investing.',
    options: [
      {
        id: 'opt-a',
        label: 'Classic 50/30/20: ₹12,500 Needs, ₹7,500 Wants, ₹5,000 Savings & SIP',
        isRecommended: true,
        feedback:
          'Excellent allocation! You comfortably cover your ₹12,000 essentials, preserve ₹7,500 for guilt-free social dinners, and immediately build a ₹5,000 monthly investing habit (₹60,000/year!).',
      },
      {
        id: 'opt-b',
        label: 'Extreme Frugality: Spend ₹12,000 on essentials and lock all remaining ₹13,000 in long-term investments',
        isRecommended: false,
        feedback:
          'While saving 52% looks heroic on paper, zero entertainment budget often leads to emotional binge-spending within 3 months. Balance is more sustainable.',
      },
      {
        id: 'opt-c',
        label: 'Spend freely on gadgets and dining first; invest whatever remains on the 29th',
        isRecommended: false,
        feedback:
          'Parkinson’s Law states that expenses expand to fill all available money. If you don’t pay yourself first on day 1, zero rupees will remain by day 29.',
      },
    ],
  },
  {
    id: 'mission-friend-loan',
    title: 'The "Friend Asks for a Loan" Dilemma',
    category: 'Credit & Social Money',
    difficulty: 'Intermediate',
    xpReward: 100,
    prompt:
      'A close friend asks you to take a ₹50,000 personal loan or credit card cash advance in YOUR name on their behalf, promising to pay you back monthly.',
    context:
      'They were rejected by banks due to a poor credit score. They insist "I am good for it, bro!"',
    options: [
      {
        id: 'opt-a',
        label: 'Politely refuse to take debt in your name; offer a small gift amount you can afford to lose if you want to help',
        isRecommended: true,
        feedback:
          'Rule #1 of credit: NEVER co-sign or take debt for someone else. If they miss payments, YOUR CIBIL score is ruined and debt collectors legally pursue YOU.',
      },
      {
        id: 'opt-b',
        label: 'Take the loan on your credit card because friendships matter more than financial technicalities',
        isRecommended: false,
        feedback:
          'If commercial banks with legal teams refused them due to high default risk, taking that risk on yourself without collateral is financial Russian roulette.',
      },
    ],
  },
  {
    id: 'mission-ten-thousand-saved',
    title: 'You Have ₹10,000 Saved: What First?',
    category: 'Saving vs Investing',
    difficulty: 'Beginner',
    xpReward: 100,
    prompt:
      'You managed to accumulate your very first ₹10,000 in savings. Everyone on social media is talking about options trading and small-cap stocks.',
    context:
      'You currently have zero emergency fund buffer and one active credit card with a ₹8,000 balance at 42% interest.',
    options: [
      {
        id: 'opt-a',
        label: 'Pay off the ₹8,000 credit card balance immediately, keep ₹2,000 as emergency cash',
        isRecommended: true,
        feedback:
          'Mathematical brilliance! Eliminating a 42% interest debt is equivalent to a GUARANTEED, risk-free 42% post-tax return. No stock market trade can consistently beat that.',
      },
      {
        id: 'opt-b',
        label: 'Put the whole ₹10,000 into a high-risk trading option to double it fast',
        isRecommended: false,
        feedback:
          'Gambling your only savings while credit card interest bleeds at 42% leads straight to debt distress. SEBI data shows 93% of retail option traders lose capital.',
      },
    ],
  },
  {
    id: 'mission-inflation-spike',
    title: 'Inflation Climbs from 5% to 7%',
    category: 'Macroeconomics & Strategy',
    difficulty: 'Advanced',
    xpReward: 120,
    prompt:
      'Headline inflation increases from 5% to 7% due to rising energy and food costs. Your savings are currently 100% in a standard bank savings account earning 3.5%.',
    context:
      'Your purchasing power is now visibly eroding by 3.5% annually. What strategic rebalancing preserves your real wealth?',
    options: [
      {
        id: 'opt-a',
        label: 'Keep 3-6 months liquid emergency funds, and redirect long-term surplus into diversified equity index funds and sovereign gold',
        isRecommended: true,
        feedback:
          'Textbook inflation defense! Productive equities increase prices along with inflation, and gold acts as a historical monetary hedge over multi-year cycles.',
      },
      {
        id: 'opt-b',
        label: 'Withdraw everything in physical cash to keep it completely safe',
        isRecommended: false,
        feedback:
          'Paper cash guarantees a 100% loss of purchasing power against inflation. You lose 7% real value every single year.',
      },
    ],
  },
];
