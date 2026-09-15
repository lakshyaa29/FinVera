import { Lesson } from '../types';

export const ALL_LESSONS: Lesson[] = [
  // ==========================================
  // LEVEL 1: MONEY BASICS
  // ==========================================
  {
    id: 'money-101',
    level: 1,
    levelName: 'Money Basics',
    order: 1,
    title: 'What Is Money & How Does It Work?',
    shortDescription: 'Discover why paper and digital digits hold value and how currency circulates.',
    xpReward: 100,
    estimatedMinutes: 4,
    concept: 'Medium of Exchange & Store of Value',
    explainSimply: {
      technical:
        'Money is a universally acknowledged social construct functioning as a standardized medium of exchange, unit of account, and store of economic value.',
      simple:
        'Instead of trading 10 chickens for a bicycle, we trade green paper or UPI tokens everyone agrees is worth goods and services.',
      analogy:
        'Think of money like arcade tokens. An arcade token is useless plastic outside, but inside the arcade, everyone accepts it because they trust the prize counter will honor it.',
    },
    interactiveType: 'needs-vs-wants',
    interactivePrompt: 'Classify common everyday expenditures into Needs vs Wants to feel how money flows.',
    contentSections: [
      {
        title: 'The Origin of Value',
        body: 'Before currency, humans used barter. If you had rice and wanted shoes, you had to find a cobbler who also happened to want rice at that exact moment. Money solved this double coincidence of wants.',
        keyTakeaways: [
          'Money is trust solidified into numbers.',
          'Fiat currency has value because the government guarantees it and society accepts it.',
          'Money is a tool to trade your time and energy today for someone else’s goods tomorrow.',
        ],
      },
      {
        title: 'The Three Roles of Money',
        body: '1. Medium of Exchange: Enables frictionless buying and selling.\n2. Unit of Account: Allows us to measure and compare the cost of completely different items.\n3. Store of Value: Allows you to preserve your work today and spend it 10 years later.',
      },
    ],
    realLifeScenario: {
      title: 'First Paycheck Dilemma',
      scenario: 'You receive your first internship stipend of ₹15,000. Your friends invite you to an upscale cafe celebration costing ₹4,000.',
      choices: [
        {
          text: 'Spend the ₹4,000 immediately to celebrate; you earned it!',
          explanation: 'Celebrating is fine, but spending over 25% of your total monthly income on one meal establishes an instant lifestyle inflation habit.',
          isOptimal: false,
        },
        {
          text: 'Suggest an enjoyable, budget-friendly celebration and allocate ₹1,000, reserving the rest.',
          explanation: 'Perfect balance! You honor social connection while protecting 93% of your stipend for future leverage.',
          isOptimal: true,
        },
        {
          text: 'Stay home alone and save every single rupee.',
          explanation: 'Too extreme. Extreme deprivation causes financial burnout. Healthy financial plans leave room for intentional fun.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'What fundamental economic problem did the invention of money solve?',
        options: [
          'The lack of gold mines in modern countries',
          'The double coincidence of wants in barter systems',
          'High interest rates charged by banks',
          'Excessive government taxation',
        ],
        correctIndex: 1,
        explanation: 'Barter required both parties to desire what the other possessed simultaneously. Money eliminates this constraint.',
      },
      {
        question: 'Which of the following is NOT one of the 3 traditional functions of money?',
        options: [
          'Medium of exchange',
          'Unit of account',
          'Guaranteed return generator',
          'Store of value',
        ],
        correctIndex: 2,
        explanation: 'Money itself does not guarantee returns; in fact, uninvested cash loses purchasing power to inflation over time.',
      },
    ],
  },
  {
    id: 'needs-vs-wants',
    level: 1,
    levelName: 'Money Basics',
    order: 2,
    title: 'Needs vs Wants: The 50/30/20 Framework',
    shortDescription: 'Learn to separate survival essentials from lifestyle upgrades without feeling miserable.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Needs vs Wants & The 50/30/20 Rule',
    explainSimply: {
      technical:
        'The 50/30/20 rule is a structural budgeting allocation designating 50% of net income to inelastic essentials, 30% to discretionary utility, and 20% to savings/debt retirement.',
      simple:
        'Divide your money into three buckets: half for living, a third for enjoyment, and a fifth to make your future self rich.',
      analogy:
        'Think of your monthly income like a 3-legged stool. If you spend everything on wants and neglect savings, the stool wobbles and crashes at the first surprise bill.',
    },
    interactiveType: 'needs-vs-wants',
    interactivePrompt: 'Adjust the split between Needs, Wants, and Savings to see how your balance shifts.',
    contentSections: [
      {
        title: 'Defining a Real Need',
        body: 'A Need is something you genuinely cannot survive or function at work without: rent/shelter, basic groceries, electricity, essential medications, and basic commuting.',
        keyTakeaways: [
          'Food is a need; dining out at an upscale sushi bar is a want.',
          'A reliable phone for work is a need; upgrading to the latest flagship phone every September is a want.',
        ],
      },
      {
        title: 'The 50/30/20 Benchmark',
        body: '50% Needs: Keeps the lights on.\n30% Wants: Hobbies, streaming subscriptions, weekend dinners, weekend getaways.\n20% Wealth: Emergency fund, SIPs, debt payoffs.',
      },
    ],
    realLifeScenario: {
      title: 'The Gadget Temptation',
      scenario: 'Your phone works fine, but a new model launched with a 10% faster processor for ₹45,000 on no-cost EMI.',
      choices: [
        {
          text: 'Buy it on EMI since monthly outflow is only ₹3,750.',
          explanation: 'No-cost EMIs trap your future discretionary cash flow for a marginal upgrade you do not need.',
          isOptimal: false,
        },
        {
          text: 'Wait 30 days. If you still crave it, budget for it within your 30% Wants bucket.',
          explanation: 'The 30-day rule filters impulse purchases and keeps your savings bucket intact.',
          isOptimal: true,
        },
      ],
    },
    quiz: [
      {
        question: 'In the classic 50/30/20 budgeting rule, what does the 20% represent?',
        options: [
          'Rent and utilities',
          'Entertainment and dining out',
          'Savings, investments, and debt reduction',
          'Taxes and insurance',
        ],
        correctIndex: 2,
        explanation: '20% is reserved for building assets, emergency safety nets, or retiring non-mortgage debts.',
      },
    ],
  },
  {
    id: 'income-expenses',
    level: 1,
    levelName: 'Money Basics',
    order: 3,
    title: 'Income, Cash Flow & The First Law of Wealth',
    shortDescription: 'Why earning ₹1,00,000/month means nothing if you spend ₹1,05,000.',
    xpReward: 100,
    estimatedMinutes: 4,
    concept: 'Positive Net Cash Flow',
    explainSimply: {
      technical:
        'Net cash flow equals total liquidity inflows minus outflows across a reporting cycle. Positive cash flow is the prerequisite for capital accumulation.',
      simple:
        'Wealth is what you do not spend. It does not matter how wide the water pipe is if the bucket has a hole at the bottom.',
      analogy:
        'Earning high income while spending everything is like driving a Ferrari at 200 km/h with zero fuel in reserve.',
    },
    interactiveType: 'interactive-budget',
    interactivePrompt: 'Test different income and expense scenarios to calculate your monthly surplus.',
    contentSections: [
      {
        title: 'The Golden Equation',
        body: 'Wealth = Income - Expenses.\nIf Income is ₹50,000 and Expenses are ₹40,000, your Wealth Velocity is +₹10,000/month.\nIf Income is ₹2,00,000 and Expenses are ₹2,05,000, you are bleeding wealth despite a high salary.',
      },
    ],
    realLifeScenario: {
      title: 'The Salary Hike Trap',
      scenario: 'You received a 20% annual salary hike from ₹40,000 to ₹48,000/month.',
      choices: [
        {
          text: 'Move into a bigger apartment that costs exactly ₹8,000 more per month.',
          explanation: 'Classic lifestyle creep: your surplus remains zero despite working harder.',
          isOptimal: false,
        },
        {
          text: 'Automate a ₹4,000 monthly SIP increase and enjoy the remaining ₹4,000.',
          explanation: 'The 50% split rule on raises accelerates your wealth without feeling deprived.',
          isOptimal: true,
        },
      ],
    },
    quiz: [
      {
        question: 'What is lifestyle inflation (lifestyle creep)?',
        options: [
          'Government price indices rising every quarter',
          'Increasing personal expenditures proportionally or faster as income grows',
          'Investing more money into index funds every year',
          'The inflation of health insurance premiums',
        ],
        correctIndex: 1,
        explanation: 'Lifestyle creep occurs when higher earnings are immediately consumed by upgraded lifestyles, preventing wealth creation.',
      },
    ],
  },
  {
    id: 'how-budgeting-works',
    level: 1,
    levelName: 'Money Basics',
    order: 4,
    title: 'Practical Budgeting Without Deprivation',
    shortDescription: 'Learn zero-based budgeting and pay-yourself-first strategies that actually stick.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Zero-Based Budgeting & Pay Yourself First',
    explainSimply: {
      technical:
        'Zero-based budgeting assigns every currency unit an explicit purpose prior to expenditure, ensuring total income minus allocated outflows equals zero.',
      simple:
        'Tell your money where to go on day 1 of the month instead of wondering where it all disappeared by day 28.',
      analogy:
        'A budget is not a prison sentence for your wallet; it is a GPS navigation system that lets you spend guilt-free on things you care about.',
    },
    interactiveType: 'interactive-budget',
    interactivePrompt: 'Assign categories to a ₹30,000 monthly budget until every rupee has a mission.',
    contentSections: [
      {
        title: 'Why Traditional Diets & Budgets Fail',
        body: 'Tracking every ₹10 tea in a spreadsheet is tedious. The modern method is "Pay Yourself First":\n1. Income arrives on the 1st.\n2. Scheduled automated SIP & savings transfer instantly on the 2nd.\n3. The remainder is yours to spend freely.',
      },
    ],
    realLifeScenario: {
      title: 'Weekend Impulse Splurge',
      scenario: 'It is Friday night and you have ₹3,000 left in your "Guilt-free dining" budget for the rest of the month.',
      choices: [
        {
          text: 'Spend ₹2,500 tonight and cook delicious meals next weekend.',
          explanation: 'Proactive budgeting allows you to make conscious trade-offs.',
          isOptimal: true,
        },
        {
          text: 'Dip into your emergency fund for weekend dining.',
          explanation: 'Never deplete emergency reserves for discretionary lifestyle luxuries.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'What does the "Pay Yourself First" financial rule mean?',
        options: [
          'Buying luxury items as soon as your salary credits',
          'Diverting savings and investments before spending on discretionary items',
          'Paying off credit card minimums first',
          'Asking your employer for daily paychecks',
        ],
        correctIndex: 1,
        explanation: 'Automating your savings the moment your paycheck arrives ensures wealth accumulation happens by default.',
      },
    ],
  },
  {
    id: 'power-of-saving',
    level: 1,
    levelName: 'Money Basics',
    order: 5,
    title: 'Why Saving Matters: The Psychology of Freedom',
    shortDescription: 'Money saved buys something far more valuable than things: optionality and peace of mind.',
    xpReward: 100,
    estimatedMinutes: 4,
    concept: 'Financial Optionality',
    explainSimply: {
      technical:
        'Capital accumulation yields non-monetary utility in the form of risk mitigation, career bargaining power, and reduced cognitive stress.',
      simple:
        'Having money in the bank lets you say "no" to a toxic job, sleep peacefully during emergencies, and take bold career leaps.',
      analogy:
        'Savings are like oxygen tanks for a deep-sea diver. You do not notice them when swimming comfortably, but they save your life the moment a crisis hits.',
    },
    interactiveType: 'quiz-only',
    contentSections: [
      {
        title: 'Things vs. Freedom',
        body: 'Most people spend money to show other people how much money they have. True wealth is the luxury cars you didn’t buy, the expensive watches you passed on, and the 6 months of freedom sitting safely in your bank.',
      },
    ],
    realLifeScenario: {
      title: 'Career Pivot Opportunity',
      scenario: 'You are offered an exciting role at an early-stage startup with massive learning potential, but they need you to start immediately with a 2-month probation buffer.',
      choices: [
        {
          text: 'Take the leap confidently because you have 6 months of savings tucked away.',
          explanation: 'Your savings provided the courage to take a high-upside career risk.',
          isOptimal: true,
        },
        {
          text: 'Pass on the opportunity because living paycheck-to-paycheck makes any gap impossible.',
          explanation: 'Lack of savings traps people in stagnant situations regardless of talent.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'According to behavioural finance, what is the greatest psychological dividend of saving money?',
        options: [
          'Impressing colleagues with luxury brands',
          'Total independence and control over your time and decisions',
          'Higher social media engagement',
          'Guaranteed lottery winnings',
        ],
        correctIndex: 1,
        explanation: 'The highest form of wealth is the ability to wake up every morning and say: "I can do whatever I want today."',
      },
    ],
  },

  // ==========================================
  // LEVEL 2: SAVING
  // ==========================================
  {
    id: 'emergency-funds',
    level: 2,
    levelName: 'Saving',
    order: 1,
    title: 'Emergency Funds: The Financial Bulletproof Shield',
    shortDescription: 'Build the 3 to 6 month survival fund before you ever risk ₹1 in the stock market.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Liquidity & Contingency Reserves',
    explainSimply: {
      technical:
        'A dedicated liquid buffer of 3 to 6 months of non-negotiable operational living expenditures held in low-volatility, immediate-access instruments.',
      simple:
        'A cash cushion that prevents a medical bill or sudden job loss from forcing you into high-interest credit card debt or selling your investments at a loss.',
      analogy:
        'An emergency fund is like the spare tire in your car trunk. You hope you never need it, but you would be crazy to drive on the highway without one.',
    },
    interactiveType: 'savings-goal',
    interactivePrompt: 'Calculate how much you need to save for a 6-month safety net based on your monthly expenses.',
    interactiveInitialValues: {
      targetAmount: 180000,
      currentSavings: 30000,
      monthlyContribution: 10000,
      expectedReturn: 6,
      targetDuration: 2,
    },
    contentSections: [
      {
        title: 'Where to Store Emergency Money',
        body: 'Do NOT put your emergency fund in volatile stocks or locked real estate! Keep it in:\n- High-yield savings bank account\n- Sweep-in Fixed Deposits (instant liquidity)\n- Ultra-short term or liquid mutual funds.',
        keyTakeaways: [
          'Target: 3-6 months of basic living costs (rent + food + loan EMIs).',
          'Priority: Safety and liquidity matter 100x more than high returns for this bucket.',
        ],
      },
    ],
    realLifeScenario: {
      title: 'Laptop Crash Before Freelance Deadline',
      scenario: 'Your laptop motherboard fries. A repair or replacement costs ₹40,000 immediately to continue working.',
      choices: [
        {
          text: 'Withdraw ₹40,000 from your emergency fund calmly.',
          explanation: 'This is textbook emergency usage: an unexpected, urgent, and necessary expense.',
          isOptimal: true,
        },
        {
          text: 'Swipe a credit card and pay only the 5% minimum due next month.',
          explanation: 'Carrying a balance triggers 36% to 42% annual interest on credit cards, worsening the crisis.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'Where is the ideal location to park an emergency fund?',
        options: [
          'High-risk cryptocurrency tokens for maximum upside',
          'Liquid funds or sweep-in fixed deposits with instant liquidity',
          'Physical real estate land parcels',
          '10-year locked tax-saver ELSS mutual funds',
        ],
        correctIndex: 1,
        explanation: 'Emergency money must be instantly accessible without penalty or market risk when trouble strikes.',
      },
    ],
  },
  {
    id: 'simple-vs-compound',
    level: 2,
    levelName: 'Saving',
    order: 2,
    title: 'Simple Interest vs Compound Interest',
    shortDescription: 'See the mathematical divergence when your interest starts earning its own interest.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Exponential Compounding Curves',
    explainSimply: {
      technical:
        'Simple interest accrues linearly exclusively on the initial principal (I = P*r*t). Compound interest generates returns on accumulated prior yields, yielding geometric growth.',
      simple:
        'With simple interest, only your original money works. With compound interest, your money has little baby coins that grow up and have baby coins of their own.',
      analogy:
        'Simple interest is a lone worker doing daily shifts. Compound interest is that worker cloning themselves every month so an entire army is working for you.',
    },
    interactiveType: 'compound-interest',
    interactivePrompt: 'Compare 5, 10, and 20 year horizons to see compounding take off into an exponential hockey stick.',
    interactiveInitialValues: {
      initialAmount: 25000,
      monthlyContribution: 2000,
      years: 15,
      expectedReturn: 12,
    },
    contentSections: [
      {
        title: 'The Great Divergence',
        body: 'If you invest ₹1,00,000 at 10%:\n- Simple interest yields ₹10,000 each year forever. In 30 years you have ₹4,00,000.\n- Compound interest reinvests gains. In 30 years your ₹1,00,000 becomes ₹17,44,940!',
      },
    ],
    realLifeScenario: {
      title: 'Start at 20 vs Start at 30',
      scenario: 'Arjun starts investing ₹3,000/mo at age 20. Rahul starts investing ₹6,000/mo at age 30. Both retire at 60 at 12% return.',
      choices: [
        {
          text: 'Arjun ends up with substantially more wealth despite contributing half the monthly money.',
          explanation: 'Correct! Arjun contributes ₹14.4 Lakhs and reaches ₹3.56 Crores. Rahul invests ₹21.6 Lakhs but only reaches ₹2.11 Crores. Time in the market beats raw money.',
          isOptimal: true,
        },
        {
          text: 'Rahul wins because he invested double the monthly cash.',
          explanation: 'Incorrect! Compounding requires time. Missing out on the first 10 years cannot easily be bought back.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'What is the most potent input in the compound interest formula?',
        options: [
          'The brokerage platform you pick',
          'Time (tenure of investment)',
          'The day of the month you invest',
          'Watching financial news daily',
        ],
        correctIndex: 1,
        explanation: 'Time is the exponent in compounding. Doubling the time horizon exponentially multiplies the terminal corpus.',
      },
    ],
  },
  {
    id: 'compound-interest',
    level: 2,
    levelName: 'Saving',
    order: 3,
    title: 'How Compound Interest Truly Multiplies Wealth',
    shortDescription: 'Master the Rule of 72 and play with interactive compounding engines directly.',
    xpReward: 120,
    estimatedMinutes: 6,
    concept: 'Rule of 72 & In-Depth Compounding',
    explainSimply: {
      technical:
        'The Rule of 72 estimates doubling time: Years to double ≈ 72 / annual interest rate percentage.',
      simple:
        'Divide the number 72 by your annual interest rate to find out how many years it takes your money to double without doing anything.',
      analogy:
        'At a 12% return, 72 / 12 = 6 years. Your ₹1 Lakh becomes ₹2 Lakhs in 6 years, ₹4 Lakhs in 12 years, and ₹8 Lakhs in 18 years!',
    },
    interactiveType: 'compound-interest',
    interactivePrompt: 'Adjust monthly contributions and expected return to see your future corpus calculated in real-time.',
    interactiveInitialValues: {
      initialAmount: 50000,
      monthlyContribution: 5000,
      years: 12,
      expectedReturn: 12,
    },
    contentSections: [
      {
        title: 'The Snowball Effect',
        body: 'In the first 3 years, compounding feels painfully slow. Your gains look tiny compared to what you deposited. But by year 10 and 15, your annual investment returns will surpass your entire annual salary!',
        keyTakeaways: [
          'Patience is the currency that pays for compound interest.',
          'Rule of 72 gives quick mental calculations on doubling timelines.',
        ],
      },
    ],
    realLifeScenario: {
      title: 'FD at 6% vs Index Fund at 12%',
      scenario: 'Using the Rule of 72, how long does it take your money to double at 6% vs 12%?',
      choices: [
        {
          text: '12 years at 6%, and 6 years at 12%.',
          explanation: 'Spot on! 72 / 6 = 12 years. 72 / 12 = 6 years. Over a 30-year span, the 12% asset doubles 5 times vs 2.5 times!',
          isOptimal: true,
        },
        {
          text: '6 years at 6%, and 3 years at 12%.',
          explanation: 'Calculation error. 72 / 6 is 12, not 6.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'If an investment generates an estimated 9% annual return, approximately how many years will it take to double?',
        options: ['4 years', '8 years', '12 years', '18 years'],
        correctIndex: 1,
        explanation: '72 divided by 9 equals 8 years.',
      },
    ],
  },
  {
    id: 'silent-tax-inflation',
    level: 2,
    levelName: 'Saving',
    order: 4,
    title: 'The Silent Thief: Understanding Inflation',
    shortDescription: 'Why keeping cash hidden under a mattress is a guaranteed financial loss.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Purchasing Power Degradation',
    explainSimply: {
      technical:
        'Inflation represents the systemic annualized rate at which the aggregate price level of goods and services escalates, inversely degrading the purchasing power of unit currency.',
      simple:
        'Inflation means ₹100 buys fewer eggs and cinema tickets each year. If your money doesn’t grow faster than inflation, you are becoming poorer quietly.',
      analogy:
        'Keeping money in cash is like leaving an ice cream cone outside on a warm day. You still have the cone, but the ice cream melts away every hour.',
    },
    interactiveType: 'inflation',
    interactivePrompt: 'Slide through 5, 10, and 20 years at 6% inflation to see what today’s ₹1,00,000 will actually cost in the future.',
    interactiveInitialValues: {
      currentAmount: 100000,
      inflationRate: 6,
      years: 10,
    },
    contentSections: [
      {
        title: 'Real Returns vs Nominal Returns',
        body: 'Nominal Return = What the bank says you earned (e.g. 6% on an FD).\nInflation = Price increases in goods (e.g. 6%).\nReal Return = Nominal Return - Inflation - Taxes.\nIf your FD pays 6% and inflation is 6%, your real gain is 0% (or negative after 30% tax slab!).',
      },
    ],
    realLifeScenario: {
      title: 'Grandmother’s Secret Cash Stash',
      scenario: 'Your relative hid ₹50,000 in cash inside a steel almirah in the year 2004 and gives it to you today.',
      choices: [
        {
          text: 'The ₹50,000 can buy the exact same goods today as it did 20 years ago.',
          explanation: 'False. With historical Indian inflation around 6-7%, ₹50,000 in 2004 bought roughly what requires ₹1,80,000+ today.',
          isOptimal: false,
        },
        {
          text: 'The paper bills survived, but purchasing power has eroded by more than 65%.',
          explanation: 'Exactly right. Cash storage is not a safe long-term preservation strategy.',
          isOptimal: true,
        },
      ],
    },
    quiz: [
      {
        question: 'If your savings account yields 3.5% interest and annual consumer inflation is 6%, what is your real annual return before tax?',
        options: ['+9.5%', '+2.5%', '-2.5%', '0%'],
        correctIndex: 2,
        explanation: '3.5% minus 6.0% equals -2.5%. Your purchasing power is shrinking by 2.5% each year.',
      },
    ],
  },
  {
    id: 'savings-goal-strategy',
    level: 2,
    levelName: 'Saving',
    order: 5,
    title: 'Reverse-Engineering Dreams with Goal Planning',
    shortDescription: 'Turn vague aspirations into exact monthly contribution targets.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Target-Date Capital Sizing',
    explainSimply: {
      technical:
        'Discounting a future targeted liability into periodic present-value annuity contributions calibrated by expected asset class CAGR and target horizon.',
      simple:
        'Instead of hoping you have enough for a master’s degree or wedding, calculate the exact rupee amount you must save every month to hit it on time.',
      analogy:
        'Planning a road trip without knowing your destination or fuel consumption means you will run out of gas in the middle of nowhere.',
    },
    interactiveType: 'savings-goal',
    interactivePrompt: 'Set a target amount (e.g. ₹5,00,000) and target years to discover your required monthly investment.',
    interactiveInitialValues: {
      targetAmount: 500000,
      currentSavings: 50000,
      monthlyContribution: 10000,
      expectedReturn: 10,
      targetDuration: 3,
    },
    contentSections: [
      {
        title: 'The SMART Financial Goal Framework',
        body: 'Specific: "Buy a MacBook Pro" vs "Save some money".\nMeasurable: ₹1,50,000.\nAchievable: Within your cash flow.\nRelevant: Aligns with career growth.\nTime-bound: In 18 months.\nMonthly target = ₹1,50,000 / 18 = ₹8,333/month.',
      },
    ],
    realLifeScenario: {
      title: 'Targeting a Down Payment',
      scenario: 'You want to build a ₹6,00,000 car down payment in 3 years.',
      choices: [
        {
          text: 'Set up an automated monthly recurring investment calculated specifically for that 3-year date.',
          explanation: 'Goal-based investing separates short-term funds from long-term retirement capital.',
          isOptimal: true,
        },
        {
          text: 'Invest in speculative penny stocks hoping to double your money in 3 months.',
          explanation: 'Speculation on a fixed-date capital requirement risks losing your principal right when you need it.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'For a short-term goal with a deadline under 2 years, which investment vehicle is safest?',
        options: [
          'High-beta small-cap equity mutual funds',
          'High-yield short-term FDs or liquid debt funds',
          'Cryptocurrency altcoins',
          'Options and futures derivatives',
        ],
        correctIndex: 1,
        explanation: 'For horizons under 2-3 years, capital preservation and liquidity take precedence over equity growth.',
      },
    ],
  },

  // ==========================================
  // LEVEL 3: BANKING
  // ==========================================
  {
    id: 'modern-banking-101',
    level: 3,
    levelName: 'Banking',
    order: 1,
    title: 'How Modern Banks Make Money & Manage Accounts',
    shortDescription: 'Savings vs Current accounts, fractional reserve banking, and DICGC insurance.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Net Interest Margin & Account Types',
    explainSimply: {
      technical:
        'Commercial banks operate on fractional reserves, borrowing short-term via deposits at lower rates and lending long-term at higher yields to capture the Net Interest Margin (NIM).',
      simple:
        'The bank pays you 3.5% on your savings account, lends that exact same money to someone for a car loan at 9.5%, and pockets the 6% difference.',
      analogy:
        'Think of a bank like a wholesale grain merchant. They buy grain from depositors at ₹3.50/kg and sell it to borrowers at ₹9.50/kg.',
    },
    interactiveType: 'quiz-only',
    contentSections: [
      {
        title: 'Is Your Bank Deposit Safe in India?',
        body: 'Under RBI’s DICGC (Deposit Insurance and Credit Guarantee Corporation), every depositor is insured up to ₹5,00,000 per bank across principal and interest across all branches.',
      },
    ],
    realLifeScenario: {
      title: 'Keeping ₹15 Lakhs in One Cooperative Bank',
      scenario: 'A small unrated cooperative bank offers 9% on savings accounts, but you have ₹15 Lakhs in savings.',
      choices: [
        {
          text: 'Put the entire ₹15 Lakhs in that one bank for higher returns.',
          explanation: 'Risky. Any amount above ₹5,00,000 is unprotected if the bank faces insolvency.',
          isOptimal: false,
        },
        {
          text: 'Diversify across two systemically important banks (D-SIBs like SBI, HDFC, ICICI) to maintain safety within the DICGC cap.',
          explanation: 'Prudent banking practice keeps large cash reserves safe.',
          isOptimal: true,
        },
      ],
    },
    quiz: [
      {
        question: 'What is the maximum bank deposit insurance coverage provided per depositor per bank in India by DICGC?',
        options: ['₹1,00,000', '₹5,00,000', '₹10,00,000', 'Unlimited'],
        correctIndex: 1,
        explanation: 'DICGC insures up to ₹5,00,000 per depositor per bank covering principal plus accrued interest.',
      },
    ],
  },
  {
    id: 'banking-upi-safety',
    level: 3,
    levelName: 'Banking',
    order: 2,
    title: 'UPI, Digital Payments & Defending Against Fraud',
    shortDescription: 'How NPCI transformed payments and the golden rules of never losing money to scams.',
    xpReward: 100,
    estimatedMinutes: 4,
    concept: 'UPI Architecture & Cybersecurity Hygiene',
    explainSimply: {
      technical:
        'UPI (Unified Payments Interface) is a real-time payment protocol engineered by NPCI leveraging virtual payment addresses (VPA) atop IMPS rails.',
      simple:
        'Instead of sharing your 16-digit account number and IFSC code, you send money via your phone number or QR code in 2 seconds.',
      analogy:
        'Sharing your account number is like giving someone your postal address. UPI is like texting them a secure digital postcard.',
    },
    interactiveType: 'quiz-only',
    contentSections: [
      {
        title: 'THE GOLDEN UPI RULE',
        body: 'YOU NEVER NEED TO ENTER YOUR UPI PIN TO RECEIVE MONEY. EVER.\nIf someone says "Enter your PIN to receive your lottery/cashback/refund", it is 100% a scam designed to debit your account.',
        keyTakeaways: [
          'PIN is only entered when money leaves your bank account.',
          'Never scan a QR code sent on WhatsApp to "receive payment".',
        ],
      },
    ],
    realLifeScenario: {
      title: 'OLX Buyer Sends QR Code',
      scenario: 'You post a bicycle on OLX for ₹5,000. A buyer claims they are in the army and sends a QR code: "Scan this and enter your UPI PIN to receive the ₹5,000 advance."',
      choices: [
        {
          text: 'Scan the QR and enter your PIN quickly to secure the money.',
          explanation: 'Fraud alert! Entering your PIN will immediately debit ₹5,000 from your account to the scammer.',
          isOptimal: false,
        },
        {
          text: 'Refuse immediately and report the user. PIN is only for paying, never for receiving.',
          explanation: '100% correct. You protected your capital from the most common UPI scam in India.',
          isOptimal: true,
        },
      ],
    },
    quiz: [
      {
        question: 'When should you enter your 4-digit or 6-digit UPI PIN?',
        options: [
          'Whenever someone is sending you a cash prize',
          'Only when YOU are transferring money OUT of your bank account',
          'Whenever you receive an SMS with a bank confirmation',
          'When verifying your Aadhaar on WhatsApp',
        ],
        correctIndex: 1,
        explanation: 'A UPI PIN is an authorization key to transfer money OUT. It is never needed to receive money.',
      },
    ],
  },
  {
    id: 'fixed-recurring-deposits',
    level: 3,
    levelName: 'Banking',
    order: 3,
    title: 'Fixed Deposits (FD) vs Recurring Deposits (RD)',
    shortDescription: 'Guaranteed returns, compounding frequency, and tax deductions under TDS.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Fixed-Term Contractual Yields & TDS',
    explainSimply: {
      technical:
        'Time deposits locking principal for contracted durations at fixed nominal yields, subject to Section 194A TDS on interest accrued above statutory thresholds.',
      simple:
        'An FD locks a lump sum of money for a set time (e.g. 1 year). An RD lets you deposit a fixed amount every month like an automated savings plan.',
      analogy:
        'FD is planting a full-grown fruit tree all at once. RD is planting one seed every month until you have an entire orchard.',
    },
    interactiveType: 'compound-interest',
    interactivePrompt: 'Simulate a 3-year FD or RD at 7% annual interest to see guaranteed growth.',
    interactiveInitialValues: {
      initialAmount: 100000,
      monthlyContribution: 5000,
      years: 3,
      expectedReturn: 7,
    },
    contentSections: [
      {
        title: 'FD vs RD: When to Pick Which',
        body: '- Got a lump sum (e.g. bonus or gift)? -> Fixed Deposit (FD).\n- Earning a monthly salary and want to save for next year’s trip? -> Recurring Deposit (RD).\nRemember: FD interest is fully taxable according to your personal income tax slab.',
      },
    ],
    realLifeScenario: {
      title: 'Tax on High FD Returns',
      scenario: 'You are in the 30% tax slab and earn ₹1,00,000 interest from an FD offering 7.5%.',
      choices: [
        {
          text: 'You get to keep the entire ₹1,00,000 as pure profit.',
          explanation: 'Incorrect. Bank FDs are taxed at your marginal slab rate, reducing your net yield to ~5.25%.',
          isOptimal: false,
        },
        {
          text: 'Your post-tax return drops to roughly 5.25% after factoring in your 30% slab rate.',
          explanation: 'Accurate financial awareness. Always calculate post-tax returns on debt instruments.',
          isOptimal: true,
        },
      ],
    },
    quiz: [
      {
        question: 'How is interest earned on bank Fixed Deposits taxed for an individual in India?',
        options: [
          'Completely tax-free up to ₹10 Lakhs',
          'At a flat 10% rate with no other taxes',
          'At the individual’s applicable income tax slab rate',
          'Only when the FD matures after 5 years',
        ],
        correctIndex: 2,
        explanation: 'FD interest is treated as "Income from Other Sources" and taxed at your applicable slab rate.',
      },
    ],
  },
  {
    id: 'demystifying-kyc-pan',
    level: 3,
    levelName: 'Banking',
    order: 4,
    title: 'Demystifying PAN, Aadhaar, KYC & Bank Fees',
    shortDescription: 'The legal IDs powering Indian finance and avoiding minimum balance penalties.',
    xpReward: 100,
    estimatedMinutes: 4,
    concept: 'Financial Identity & KYC Compliance',
    explainSimply: {
      technical:
        'Know Your Customer (KYC) is a regulatory compliance framework mandated by RBI and SEBI to prevent anti-money laundering (PMLA) using PAN and Aadhaar identity stacks.',
      simple:
        'KYC is how banks and mutual funds verify you are a real person and not a fake identity laundering illegal money.',
      analogy:
        'Your PAN card is like your financial fingerprint in India. Every major transaction, salary, and stock trade connects back to this single 10-character code.',
    },
    interactiveType: 'quiz-only',
    contentSections: [
      {
        title: 'Hidden Bank Fees to Watch Out For',
        body: '1. Non-maintenance of Minimum Average Balance (MAB).\n2. ATM withdrawal charges beyond 5 free transactions.\n3. Annual debit card fees (₹150 to ₹500+ GST).\nTip: You can request a "Zero Balance Basic Savings Account (BSBDA)" if you do not want to maintain minimum balance requirements.',
      },
    ],
    realLifeScenario: {
      title: 'Opening an Investment Account',
      scenario: 'You want to start your first mutual fund SIP. The app asks for PAN verification and video KYC.',
      choices: [
        {
          text: 'Complete the KYC process; it is legally required by SEBI to invest in Indian securities.',
          explanation: 'Yes, CKYC (Central KYC) is standard and mandatory across all legitimate SEBI-regulated platforms.',
          isOptimal: true,
        },
        {
          text: 'Look for an unregulated app that promises investing without PAN or KYC.',
          explanation: 'Dangerous! Platforms offering investing without KYC in India are illegal or offshore scams.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'Which permanent 10-digit alphanumeric identifier is mandatory for opening a Demat account or investing in mutual funds in India?',
        options: ['Driving License', 'PAN (Permanent Account Number)', 'Ration Card', 'Voter ID'],
        correctIndex: 1,
        explanation: 'PAN is the statutory tax and financial identity requirement for all capital market investments in India.',
      },
    ],
  },
  {
    id: 'central-banks-repo-rate',
    level: 3,
    levelName: 'Banking',
    order: 5,
    title: 'What Is the RBI & How Do Repo Rates Impact You?',
    shortDescription: 'Understand how RBI interest rate changes make your home loans and FDs dance.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Monetary Policy & Repo Rates',
    explainSimply: {
      technical:
        'The Repo Rate is the benchmark rate at which the Reserve Bank of India lends liquidity to commercial banks. Changes transmit across the economy affecting loan borrowing costs and deposit yields.',
      simple:
        'When the RBI raises the repo rate, loans become more expensive and FDs pay more. When RBI cuts rates, borrowing gets cheaper.',
      analogy:
        'The RBI is the water supply station for the entire city. When they turn down the main water valve, everyone’s home tap experiences lower pressure.',
    },
    interactiveType: 'emi',
    interactivePrompt: 'Change interest rates from 8.5% to 9.5% to witness how a 1% RBI rate hike inflates home loan EMIs.',
    interactiveInitialValues: {
      loanAmount: 3000000,
      interestRate: 8.5,
      loanDuration: 20,
    },
    contentSections: [
      {
        title: 'How Repo Rates Control Inflation',
        body: 'When prices rise too fast, the RBI raises interest rates. This makes borrowing costly, which slows down spending and cools inflation. When economic growth slows, the RBI cuts rates to encourage businesses to borrow and hire.',
      },
    ],
    realLifeScenario: {
      title: 'Floating Home Loan Rate Increase',
      scenario: 'You have an active floating home loan and the RBI raises the benchmark repo rate by 0.50%.',
      choices: [
        {
          text: 'Your bank will likely raise your interest rate, increasing your monthly EMI or extending loan tenure.',
          explanation: 'Correct. Floating rate loans automatically adjust with the external benchmark rate (EBLR).',
          isOptimal: true,
        },
        {
          text: 'Your loan rate remains completely frozen forever regardless of RBI policy.',
          explanation: 'Only true for strictly fixed-rate loans, which are rare for Indian home mortgages.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'What is the direct consequence when the RBI increases the Repo Rate?',
        options: [
          'Commercial banks generally increase lending and loan interest rates',
          'Stock dividends become completely tax-free',
          'Gold imports are prohibited',
          'Income tax brackets are eliminated',
        ],
        correctIndex: 0,
        explanation: 'Higher borrowing costs for banks get passed directly to retail consumers in the form of higher loan EMIs.',
      },
    ],
  },

  // ==========================================
  // LEVEL 4: CREDIT
  // ==========================================
  {
    id: 'credit-score-cibil',
    level: 4,
    levelName: 'Credit',
    order: 1,
    title: 'CIBIL Score Explained: The Key to Cheap Capital',
    shortDescription: 'How your 300-900 score determines whether banks grant you loans at 8% or 16%.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Credit Bureaus & Credit Utilization Ratio',
    explainSimply: {
      technical:
        'A numerical three-digit summary (300 to 900) compiled by credit rating bureaus (TransUnion CIBIL, Experian, CRIF) scoring your probability of default based on historical repayment conduct.',
      simple:
        'A report card for borrowing money. If you always pay bills on time, you get a 750+ score and banks beg to give you low-interest loans.',
      analogy:
        'Your credit score is like your reputation in a tight-knit village. If you always return borrowed tools clean and on time, everyone lends to you with a smile.',
    },
    interactiveType: 'quiz-only',
    contentSections: [
      {
        title: 'The Ingredients of an 800+ Score',
        body: '1. On-time payments (35% impact): Never miss an EMI or credit card bill.\n2. Credit Utilization Ratio (30% impact): Keep credit card spending below 30% of your total limit.\n3. Credit age (15% impact): Do not cancel your oldest credit card.\n4. Credit mix (10%): Healthy blend of secured vs unsecured credit.',
      },
    ],
    realLifeScenario: {
      title: 'Credit Limit Maxed Out',
      scenario: 'You have a credit card with a ₹1,00,000 limit. You regularly spend ₹90,000 every month but pay the entire bill in full every time.',
      choices: [
        {
          text: 'Your credit score might still drop because your credit utilization ratio is 90% (well above 30%).',
          explanation: 'True! Credit bureaus view utilization above 30% as a signal of credit hunger or financial stress.',
          isOptimal: true,
        },
        {
          text: 'Your score will automatically be 900 because you paid before the due date.',
          explanation: 'Paying in full is great, but high utilization before bill generation hurts your score.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'What is generally considered an excellent CIBIL credit score range by major Indian lenders?',
        options: ['300 to 500', '500 to 650', '750 to 900', '900 to 1200'],
        correctIndex: 2,
        explanation: 'Scores above 750 represent low credit risk and unlock the best loan terms and credit cards.',
      },
    ],
  },
  {
    id: 'first-credit-card',
    level: 4,
    levelName: 'Credit',
    order: 2,
    title: 'Credit Cards: High-Yield Tool vs. Debt Trap',
    shortDescription: 'Enjoy up to 50 days of interest-free credit while avoiding 42% annualized interest rates.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Interest-Free Grace Periods & Revolving Credit APR',
    explainSimply: {
      technical:
        'Unsecured revolving credit facilities offering 45–50 day interest-free float, but imposing punitive 36%–45% APR plus GST upon failure to clear the Total Amount Due.',
      simple:
        'A credit card is free short-term credit and reward points IF you pay 100% of the bill every month. If you pay only the "minimum due", it is financial suicide.',
      analogy:
        'A credit card is like a sharp kitchen knife. In a chef’s hands, it prepares a gourmet dinner. Handled carelessly, it cuts you badly.',
    },
    interactiveType: 'quiz-only',
    contentSections: [
      {
        title: 'The "Minimum Amount Due" Mirage',
        body: 'The minimum due is usually just 5% of your bill. If you owe ₹50,000 and pay the ₹2,500 minimum, the bank charges ~3.5% monthly interest (~42% per year) on the remaining ₹47,500 PLUS interest on every new purchase from day 1!',
      },
    ],
    realLifeScenario: {
      title: 'Credit Card Bill Arrives',
      scenario: 'Your credit card statement shows Total Due: ₹32,000. Minimum Due: ₹1,600. You have ₹45,000 in your bank account.',
      choices: [
        {
          text: 'Pay the full ₹32,000 immediately.',
          explanation: 'Outstanding financial discipline! You pay zero interest and earn rewards for free.',
          isOptimal: true,
        },
        {
          text: 'Pay ₹1,600 and spend the remaining balance on leisure.',
          explanation: 'Disastrous move. The remaining balance will accumulate astronomical compounding interest.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'What happens if you pay only the Minimum Amount Due on a credit card statement?',
        options: [
          'The bank waives all future interest as a courtesy',
          'Heavy interest (up to 36%-45% annualized) is levied on the entire unpaid balance',
          'Your credit score automatically reaches 850',
          'Your credit limit doubles',
        ],
        correctIndex: 1,
        explanation: 'Paying only the minimum due avoids late fee penalties but incurs ruinous revolving interest rates.',
      },
    ],
  },
  {
    id: 'good-debt-vs-bad-debt',
    level: 4,
    levelName: 'Credit',
    order: 3,
    title: 'Good Debt vs Bad Debt: Leveraging Responsibly',
    shortDescription: 'Distinguish between debt that builds assets and debt that destroys cash flow.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Leverage ROI vs Depreciating Consumption Debt',
    explainSimply: {
      technical:
        'Good debt acquires assets whose projected internal rate of return (IRR) or cash flow exceeds the after-tax cost of borrowing. Bad debt finances depreciating consumption.',
      simple:
        'Borrowing to acquire something that increases your earnings or net worth is good debt. Borrowing to buy shoes or vacations is bad debt.',
      analogy:
        'Good debt is like taking a loan to build a factory that produces revenue. Bad debt is taking a loan to light fireworks on New Year’s Eve.',
    },
    interactiveType: 'quiz-only',
    contentSections: [
      {
        title: 'Examples of Debt Types',
        body: '- Good/Productive Debt: Education loan for marketable STEM/MBA degree, reasonable home mortgage, business expansion loan.\n- Bad/Toxic Debt: Credit card balances, personal loans for vacations, payday loans, financing a luxury watch on high interest.',
      },
    ],
    realLifeScenario: {
      title: 'Financing an International Vacation',
      scenario: 'You want to go to Europe with friends. A fintech lender offers an instant ₹2,00,000 personal loan at 16% interest over 3 years.',
      choices: [
        {
          text: 'Take the loan; memories are priceless and you can pay ₹7,000/month.',
          explanation: 'Taking a 16% loan for a 1-week holiday means paying over ₹50,000 in pure interest long after the trip is forgotten.',
          isOptimal: false,
        },
        {
          text: 'Save up ₹15,000/month in a short-term RD for 14 months and take the trip debt-free.',
          explanation: 'Traveling on saved cash gives you 100% joy with zero post-trip financial anxiety.',
          isOptimal: true,
        },
      ],
    },
    quiz: [
      {
        question: 'Which of the following is an example of potentially productive ("good") debt?',
        options: [
          'A personal loan to gamble on intraday stock options',
          'An education loan to acquire high-income marketable engineering skills',
          'A credit card EMI on designer clothing',
          'A loan to purchase expensive electronics that lose 50% value in one year',
        ],
        correctIndex: 1,
        explanation: 'An education loan enhances human capital and lifetime earning power, creating a high return on investment.',
      },
    ],
  },
  {
    id: 'demystifying-loans-emi',
    level: 4,
    levelName: 'Credit',
    order: 4,
    title: 'Demystifying Loans & EMIs: The True Cost of Borrowing',
    shortDescription: 'Unpack the reducing balance formula and discover how much interest you actually pay.',
    xpReward: 120,
    estimatedMinutes: 6,
    concept: 'Amortization Schedules & Reducing Balance',
    explainSimply: {
      technical:
        'An Equated Monthly Installment (EMI) is an amortized repayment comprising diminishing interest and accelerating principal components calculated via reducing balance formulas.',
      simple:
        'In the early years of any loan, most of your monthly EMI goes toward the bank’s interest profit, not paying down your actual debt.',
      analogy:
        'A 20-year loan is like climbing a steep sand dune. In the first few steps, you slide back almost as much as you step forward.',
    },
    interactiveType: 'emi',
    interactivePrompt: 'Simulate a ₹25,00,000 home loan over 15 vs 25 years to see how loan duration explodes total interest paid.',
    interactiveInitialValues: {
      loanAmount: 2500000,
      interestRate: 9,
      loanDuration: 20,
    },
    contentSections: [
      {
        title: 'The Shock of Long Tenures',
        body: 'On a ₹50,00,000 home loan at 9% for 20 years:\n- Total Principal: ₹50 Lakhs\n- Total Interest: ₹57.9 Lakhs!\nYou end up paying the bank MORE than double what you originally borrowed.',
        keyTakeaways: [
          'Making just 1 extra EMI payment per year can cut 4 to 5 years off a 20-year mortgage.',
          'Always opt for the shortest tenure your monthly cash flow comfortably supports.',
        ],
      },
    ],
    realLifeScenario: {
      title: 'Extra Prepayment Strategy',
      scenario: 'You receive an annual festival bonus of ₹1,00,000 while holding an active 9% personal loan.',
      choices: [
        {
          text: 'Prepay ₹1,00,000 toward the principal immediately to slash future compounding interest.',
          explanation: 'Excellent move! Prepaying high-interest debt provides a guaranteed risk-free 9% return.',
          isOptimal: true,
        },
        {
          text: 'Leave the loan untouched because the monthly EMI feels manageable.',
          explanation: 'Failing to prepay leaves high compound interest eating away at your future earnings.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'In the early months of a 20-year home loan, what constitutes the largest portion of your monthly EMI?',
        options: [
          'Principal repayment',
          'Interest charges paid to the bank',
          'Property tax',
          'Maintenance fees',
        ],
        correctIndex: 1,
        explanation: 'Due to amortization mechanics, initial payments are heavily skewed toward interest on the large outstanding balance.',
      },
    ],
  },
  {
    id: 'debt-snowball-avalanche',
    level: 4,
    levelName: 'Credit',
    order: 5,
    title: 'The Debt Escape Plan: Snowball vs Avalanche',
    shortDescription: 'Two proven mathematical and psychological methods to eliminate outstanding debt forever.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Debt Snowball vs Debt Avalanche',
    explainSimply: {
      technical:
        'Debt Avalanche prioritizes liabilities by descending nominal APR (minimizing total interest expenditure). Debt Snowball prioritizes by ascending balance size (maximizing psychological momentum).',
      simple:
        'Avalanche saves you the most math money by attacking high interest first. Snowball gives quick emotional wins by knocking out smallest loans first.',
      analogy:
        'Avalanche is wearing down the tallest boss monster first. Snowball is defeating small minions first to clear room on the battlefield.',
    },
    interactiveType: 'quiz-only',
    contentSections: [
      {
        title: 'Which Strategy Should You Choose?',
        body: '1. If you are analytical and disciplined: Choose Avalanche (target credit cards at 42% first, then personal loans at 14%, then car loan at 9%).\n2. If you feel overwhelmed and need motivation: Choose Snowball (pay off the tiny ₹10,000 phone EMI first for an immediate psychological high).',
      },
    ],
    realLifeScenario: {
      title: 'Three Active Loans',
      scenario: 'You have: A) ₹15,000 Credit card at 40%, B) ₹80,000 Personal loan at 15%, C) ₹10,000 Appliance loan at 12%.',
      choices: [
        {
          text: 'Under Debt Avalanche, pay extra money toward the 40% Credit card first.',
          explanation: 'Correct! The 40% loan is burning the most capital every single day.',
          isOptimal: true,
        },
        {
          text: 'Under Debt Snowball, pay extra money toward the ₹10,000 Appliance loan first.',
          explanation: 'Also valid! Snowball knocks out the smallest loan first to eliminate one monthly payment quickly.',
          isOptimal: true,
        },
      ],
    },
    quiz: [
      {
        question: 'Which debt elimination method is mathematically optimal in saving the absolute maximum amount of interest?',
        options: [
          'Debt Snowball (smallest balance first)',
          'Debt Avalanche (highest interest rate first)',
          'Equal split across all loans',
          'Ignoring all loans until retirement',
        ],
        correctIndex: 1,
        explanation: 'Debt Avalanche minimizes interest costs by ruthlessly attacking the highest APR debts first.',
      },
    ],
  },

  // ==========================================
  // LEVEL 5: INVESTING
  // ==========================================
  {
    id: 'stock-market-basics',
    level: 5,
    levelName: 'Investing',
    order: 1,
    title: 'The Stock Market: Buying Real Business Ownership',
    shortDescription: 'Stocks are not casino lottery chips; they are fractional deeds to cash-generating companies.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Equity Ownership & Capital Allocation',
    explainSimply: {
      technical:
        'Common equity shares represent residual fractional ownership claims in a corporate enterprise’s underlying physical assets and operational cash flows.',
      simple:
        'When you buy 1 share of TCS or Infosys, you own a tiny slice of that company. When thousands of engineers work hard and generate profits, you share in that success.',
      analogy:
        'Imagine your friend opens a successful bakery. You give them ₹50,000 for a 10% share of the bakery. Every month, you receive 10% of the profits.',
    },
    interactiveType: 'quiz-only',
    contentSections: [
      {
        title: 'Two Ways Stocks Make You Money',
        body: '1. Capital Appreciation: The company expands revenues and profits, making the share price rise from ₹500 to ₹1,200.\n2. Dividends: The company distributes a portion of quarterly profits directly into your bank account.',
      },
    ],
    realLifeScenario: {
      title: 'Market Crash Panic',
      scenario: 'The stock market drops 15% in two weeks due to global macroeconomic news. You own shares in solid, profitable companies.',
      choices: [
        {
          text: 'Sell everything in a panic to prevent further drops.',
          explanation: 'Panic selling locks in temporary paper losses into permanent financial destruction.',
          isOptimal: false,
        },
        {
          text: 'Stay calm and continue your regular investment plan; market dips are discount sales on great businesses.',
          explanation: 'Historically, patient long-term investors are rewarded when staying invested through volatility.',
          isOptimal: true,
        },
      ],
    },
    quiz: [
      {
        question: 'What do you fundamentally own when you buy a share of stock in a publicly listed company?',
        options: [
          'A government loan certificate',
          'A fractional ownership interest in the business and its earnings',
          'A guaranteed lottery ticket with monthly payouts',
          'A personal guarantee from the company CEO',
        ],
        correctIndex: 1,
        explanation: 'Stock represents actual legal equity ownership in the corporation.',
      },
    ],
  },
  {
    id: 'what-is-mutual-fund',
    level: 5,
    levelName: 'Investing',
    order: 2,
    title: 'What Is a Mutual Fund? Pooled Capital & NAV',
    shortDescription: 'How professional managers diversify money across 50+ companies for as little as ₹500.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Collective Investment Vehicles & Net Asset Value',
    explainSimply: {
      technical:
        'A professionally managed trust pooling capital from millions of investors into a diversified portfolio of securities evaluated daily via Net Asset Value (NAV).',
      simple:
        'Instead of buying 50 individual stocks yourself, you and thousands of investors pool money together. A professional fund manager buys all 50 stocks for the group.',
      analogy:
        'Think of a mutual fund like a fruit basket. Instead of buying an entire crate of mangoes, an entire crate of apples, and a crate of grapes, you buy one mixed fruit salad bowl.',
    },
    interactiveType: 'sip',
    interactivePrompt: 'See how a modest ₹2,500 monthly mutual fund SIP compounds across 10 years.',
    interactiveInitialValues: {
      monthlySip: 2500,
      years: 10,
      expectedReturn: 12,
    },
    contentSections: [
      {
        title: 'What is NAV (Net Asset Value)?',
        body: 'NAV is simply the price of 1 unit of a mutual fund.\nNAV = (Total Market Value of all stocks owned - fund expenses) / Total number of units.\nIf NAV is ₹100 and you invest ₹1,000, you are allotted 10 units.',
      },
    ],
    realLifeScenario: {
      title: 'Picking Mutual Funds: Expense Ratio',
      scenario: 'Fund A charges a 2.0% Expense Ratio (Regular Plan via broker). Fund B charges a 0.5% Expense Ratio (Direct Plan). Both hold the exact same portfolio.',
      choices: [
        {
          text: 'Pick Fund B (Direct Plan) because lower fees compound to lakhs of extra wealth over decades.',
          explanation: 'Always prefer Direct Mutual Funds to save on distributor commissions.',
          isOptimal: true,
        },
        {
          text: 'Pick Fund A because 2% feels like a negligible number.',
          explanation: 'A 1.5% annual fee difference can eat up over 25% of your final portfolio value over 25 years!',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'What is the primary difference between a "Direct" and a "Regular" mutual fund plan in India?',
        options: [
          'Direct plans invest in gold, while Regular plans invest in real estate',
          'Direct plans do not pay distributor commissions, resulting in lower expense ratios and higher returns',
          'Regular plans are guaranteed by the government',
          'Direct plans are only available to corporate banks',
        ],
        correctIndex: 1,
        explanation: 'Direct plans eliminate intermediary commissions, resulting in a lower expense ratio that boosts net returns.',
      },
    ],
  },
  {
    id: 'sip-basics',
    level: 5,
    levelName: 'Investing',
    order: 3,
    title: 'The Magic of SIPs (Systematic Investment Plans)',
    shortDescription: 'Master Rupee Cost Averaging and turn market volatility into your greatest ally.',
    xpReward: 120,
    estimatedMinutes: 6,
    concept: 'Rupee Cost Averaging & Behavioral Automation',
    explainSimply: {
      technical:
        'An automated algorithmic execution discipline allocating fixed capital quanta at periodic intervals, achieving dollar/rupee cost averaging across market cycles.',
      simple:
        'You invest a set amount (say ₹3,000) on the 5th of every month automatically. When markets fall, your ₹3,000 buys MORE units. When markets rise, you get richer.',
      analogy:
        'Imagine buying tomatoes every week with ₹100. When tomatoes are cheap, you get 5 kg. When tomatoes are expensive, you get 2 kg. Over time, your average cost stays low.',
    },
    interactiveType: 'sip',
    interactivePrompt: 'Adjust monthly SIP amount from ₹2,000 to ₹10,000 to see the compounding growth curve.',
    interactiveInitialValues: {
      monthlySip: 5000,
      years: 15,
      expectedReturn: 12,
    },
    contentSections: [
      {
        title: 'Why SIP Beats Trying to "Time the Market"',
        body: 'Even Wall Street professionals cannot consistently predict market highs and lows. SIP takes human emotion, greed, and panic out of investing by automating discipline.',
        keyTakeaways: [
          'Rupee Cost Averaging automatically buys more when shares are on sale.',
          'Consistency in investing always outperforms sporadic genius.',
        ],
      },
    ],
    realLifeScenario: {
      title: 'Market Crash During Active SIP',
      scenario: 'The stock market drops 25% during a recession. Your monthly ₹5,000 SIP is scheduled to deduct tomorrow.',
      choices: [
        {
          text: 'Stop your SIP because the market is falling.',
          explanation: 'Stopping your SIP during a crash is the single biggest rookie mistake. You miss buying units at massive discount prices.',
          isOptimal: false,
        },
        {
          text: 'Let the SIP continue; you are acquiring more fund units at discounted prices.',
          explanation: 'Masterful mindset! Accumulating units during market downturns accelerates wealth during subsequent recoveries.',
          isOptimal: true,
        },
      ],
    },
    quiz: [
      {
        question: 'What is the primary benefit of Rupee Cost Averaging achieved through an SIP?',
        options: [
          'It guarantees you will never experience temporary market drawdowns',
          'It automatically buys more units when prices are low and fewer when prices are high',
          'It eliminates all taxes on capital gains',
          'It lets you borrow money from the mutual fund interest-free',
        ],
        correctIndex: 1,
        explanation: 'Fixed recurring investments purchase more units when prices dip, lowering your average cost per unit over time.',
      },
    ],
  },
  {
    id: 'index-funds-etfs',
    level: 5,
    levelName: 'Investing',
    order: 4,
    title: 'Index Funds & ETFs: Low-Cost Investing for Everyone',
    shortDescription: 'Why buying the 50 biggest companies in India beats 85% of active fund managers.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Passive Investing & Market Beta',
    explainSimply: {
      technical:
        'Passively indexed instruments replicating benchmark market indices (e.g. NIFTY 50, S&P BSE Sensex) with minimal portfolio turnover and ultra-low tracking errors.',
      simple:
        'Instead of trying to find the 1 winning stock, buy a fund that holds the 50 biggest companies in India (like the Nifty 50) for rock-bottom fees.',
      analogy:
        'Instead of betting on which single horse will win the race, an index fund lets you bet on the entire racetrack and take a slice of all ticket sales.',
    },
    interactiveType: 'quiz-only',
    contentSections: [
      {
        title: 'The Power of the Nifty 50',
        body: 'The Nifty 50 represents India’s top 50 corporate giants across banking, IT, energy, and retail. As India’s economy grows, these 50 leaders drive that growth. Over 10-15 year horizons, broad market index funds have historically delivered ~11-13% annualized CAGR.',
      },
    ],
    realLifeScenario: {
      title: 'Active Manager vs Index Fund',
      scenario: 'A hot active fund charges 2.2% expense ratio and had 1 great year. A Nifty 50 Index fund charges 0.1% expense ratio.',
      choices: [
        {
          text: 'Invest in the low-cost Index Fund for long-term consistency.',
          explanation: 'SPIVA research proves over 80% of active funds fail to beat their benchmark index over 10-year horizons after fees.',
          isOptimal: true,
        },
        {
          text: 'Chase last year’s top-performing active mutual fund.',
          explanation: 'Past short-term performance rarely persists. High fees consistently drag down future returns.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'What does the Nifty 50 index represent in the Indian stock market?',
        options: [
          'The 50 smallest start-ups on the exchange',
          'The 50 largest, most actively traded blue-chip companies listed on the National Stock Exchange',
          '50 government-owned banks only',
          'The top 50 gold traders in Mumbai',
        ],
        correctIndex: 1,
        explanation: 'The NIFTY 50 reflects the performance of India’s top 50 large-cap corporate leaders.',
      },
    ],
  },
  {
    id: 'risk-reward-volatility',
    level: 5,
    levelName: 'Investing',
    order: 5,
    title: 'Market Volatility vs Real Risk: Diamond Hands',
    shortDescription: 'Learn why price fluctuations are the price of admission for superior returns.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Volatility vs Permanent Impairment of Capital',
    explainSimply: {
      technical:
        'Volatility measures standard deviation of price oscillations. True economic risk is permanent impairment of invested capital.',
      simple:
        'Stock prices bouncing up and down day-to-day is volatility. Losing all your money in a bankrupt fraud company is real risk.',
      analogy:
        'Going on a flight with occasional turbulence is volatility. The plane crashing is real risk. Don’t confuse temporary bumps with disaster.',
    },
    interactiveType: 'quiz-only',
    contentSections: [
      {
        title: 'Volatility is the Fee, Not the Fine',
        body: 'If stocks went up smoothly every single day like an FD, everyone would invest and the return would drop to 4%. The reason equities deliver 12%+ over decades is precisely because you must endure scary headlines and temporary drops along the way.',
      },
    ],
    realLifeScenario: {
      title: 'Checking Portfolio Every 10 Minutes',
      scenario: 'You just started investing and find yourself opening your broker app 15 times a day, feeling anxious with every red candle.',
      choices: [
        {
          text: 'Delete the trading app notifications and check your portfolio once a quarter.',
          explanation: 'Brilliant habit. Daily market noise causes emotional over-trading. Long-term wealth is built on years, not hours.',
          isOptimal: true,
        },
        {
          text: 'Stare at live tickers all day to try day-trading market swings.',
          explanation: 'Day-trading is a high-stress zero-sum game where 93% of retail traders lose money (SEBI study).',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'According to legendary investors like Warren Buffett, what is the true definition of investment risk?',
        options: [
          'A stock price dropping 3% on a Tuesday',
          'The permanent loss of purchasing power or capital',
          'Not checking financial news every morning',
          'Holding index funds for more than 5 years',
        ],
        correctIndex: 1,
        explanation: 'Volatility is temporary fluctuation; permanent impairment of capital is the true risk.',
      },
    ],
  },

  // ==========================================
  // LEVEL 6: WEALTH BUILDING
  // ==========================================
  {
    id: 'asset-allocation-flywheel',
    level: 6,
    levelName: 'Wealth Building',
    order: 1,
    title: 'Asset Allocation: The True Engine of Returns',
    shortDescription: 'Balance Equity, Debt, and Gold to ride market storms without losing sleep.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Modern Portfolio Theory & Uncorrelated Assets',
    explainSimply: {
      technical:
        'Strategic allocation of portfolio capital across non-correlated asset classes (Equities, Fixed Income, Commodities) to maximize Sharpe Ratio.',
      simple:
        'Don’t put all your eggs in one basket. Blend stocks (for growth), debt/FDs (for stability), and gold (for crisis protection).',
      analogy:
        'Think of your portfolio like a cricket team. You need aggressive batsmen (equities), reliable bowlers (fixed income), and an alert wicket-keeper (gold).',
    },
    interactiveType: 'quiz-only',
    contentSections: [
      {
        title: 'A Classic 60/30/10 Portfolio for Young Investors',
        body: '- 60% Equities (Nifty 50, Flexi-cap, International)\n- 30% Debt (Liquid funds, EPF/PPF, Short-duration bonds)\n- 10% Gold (Sovereign Gold Bonds or Gold ETFs)',
      },
    ],
    realLifeScenario: {
      title: 'Equity Market Peaks',
      scenario: 'After a multi-year bull run, your equity allocation has grown from 60% to 80% of your net worth.',
      choices: [
        {
          text: 'Rebalance by trimming some equity profits and moving them into debt/gold to restore your 60/30/10 target.',
          explanation: 'Rebalancing systematically buys low and sells high without emotion.',
          isOptimal: true,
        },
        {
          text: 'Pour 100% of your savings into equities because they only go up.',
          explanation: 'Leaving an over-concentrated portfolio exposed to sudden market corrections violates risk management.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'What is the primary objective of periodic portfolio rebalancing?',
        options: [
          'To generate maximum brokerage commissions',
          'To restore your target risk profile by systematically selling assets that have grown over-allocated and buying under-allocated ones',
          'To gamble on momentum penny stocks',
          'To avoid paying all forms of taxes',
        ],
        correctIndex: 1,
        explanation: 'Rebalancing controls portfolio risk and enforces a disciplined buy-low, sell-high mechanism.',
      },
    ],
  },
  {
    id: 'diversification-risk',
    level: 6,
    levelName: 'Wealth Building',
    order: 2,
    title: 'The Only Free Lunch: Diversification & Rebalancing',
    shortDescription: 'Why owning 30 uncorrelated companies protects you from company-specific scandals.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Eliminating Idiosyncratic Risk',
    explainSimply: {
      technical:
        'Diversification eliminates unsystematic (idiosyncratic) company risk through statistical covariance minimization without lowering expected portfolio returns.',
      simple:
        'If you own 1 company and its CEO commits fraud, you lose everything. If you own 100 companies and 1 goes bust, you barely notice.',
      analogy:
        'If you only sell ice cream, a rainy summer bankrupts you. If you sell both ice cream AND umbrellas, you profit in every weather.',
    },
    interactiveType: 'quiz-only',
    contentSections: [
      {
        title: 'Systematic vs Unsystematic Risk',
        body: '- Unsystematic Risk: A strike at a specific auto plant, or a CEO resigning. (Eliminated by diversification).\n- Systematic Risk: A global pandemic or interest rate cycle that impacts the whole world. (Cannot be eliminated, only managed with asset allocation).',
      },
    ],
    realLifeScenario: {
      title: 'Hot Stock Tip from Uncle',
      scenario: 'Your relative insists a specific penny stock is "guaranteed to 10x" and advises putting all your savings into it.',
      choices: [
        {
          text: 'Politely pass and stay diversified across broad market index funds.',
          explanation: 'Individual stock tips are often pumped-and-dumped. Diversified funds protect capital.',
          isOptimal: true,
        },
        {
          text: 'Put 100% of your savings into the tip.',
          explanation: 'Putting all capital into a single unverified stock is pure gambling, not investing.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'Why is diversification called "the only free lunch in finance"?',
        options: [
          'Because investment brokers offer free meals to large accounts',
          'It reduces risk/volatility without necessarily reducing expected portfolio returns',
          'It guarantees zero income tax liabilities',
          'It doubles your money in 30 days',
        ],
        correctIndex: 1,
        explanation: 'Nobel laureate Harry Markowitz proved that combining uncorrelated assets dampens portfolio risk without sacrificing long-term returns.',
      },
    ],
  },
  {
    id: 'insurance-fundamentals',
    level: 6,
    levelName: 'Wealth Building',
    order: 3,
    title: 'Term Life & Health Insurance: Protect Before You Project',
    shortDescription: 'Why you should never mix investment with insurance (avoiding ULIPs and endowment plans).',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Pure Risk Transfer & Pure Term Cover',
    explainSimply: {
      technical:
        'Insurance is an actuarial risk transfer instrument hedging against low-probability, catastrophic financial liabilities, not a wealth generation mechanism.',
      simple:
        'Insurance is not an investment to make you money; it is a financial seatbelt to keep your family from financial ruin if disaster strikes.',
      analogy:
        'Buying a phone cover is insurance. You don’t expect the phone case to pay you interest every month; you buy it so dropping the phone doesn’t shatter your ₹70,000 screen.',
    },
    interactiveType: 'quiz-only',
    contentSections: [
      {
        title: 'The Two Must-Have Policies',
        body: '1. Pure Term Life Insurance: If you have financial dependents, buy pure term cover (15-20x your annual income) for a tiny annual premium.\n2. Comprehensive Health Insurance: Protects your investment portfolio from being wiped out by a single hospital bill.\nRULE: NEVER buy traditional endowment or ULIP plans that mix insurance and investment; they give terrible life cover and subpar returns.',
      },
    ],
    realLifeScenario: {
      title: 'Bank Relationship Manager Pushes "Guaranteed" Plan',
      scenario: 'Your bank manager promises an endowment plan: "Pay ₹1 Lakh every year for 10 years and get ₹20 Lakhs guaranteed plus life insurance!"',
      choices: [
        {
          text: 'Calculate the internal return (IRR) first; traditional plans often yield just 4-5% (barely matching inflation).',
          explanation: 'Correct! Separate your insurance from your investments. Buy pure term insurance and invest the rest in index funds.',
          isOptimal: true,
        },
        {
          text: 'Sign up immediately because "guaranteed" sounds safe.',
          explanation: 'Guaranteed 4.5% returns over 10 years will lose purchasing power against real-world inflation.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'Why do independent financial advisors strongly recommend pure Term Life insurance over traditional Endowment/Money-Back policies?',
        options: [
          'Term insurance gives maximum financial life cover at the lowest possible cost, allowing surplus capital to be invested productively elsewhere',
          'Term insurance gives free airline miles',
          'Endowment plans are illegal in India',
          'Term insurance is only for billionaires',
        ],
        correctIndex: 0,
        explanation: 'Pure term cover decouples protection from investment, giving high cover for affordable premiums.',
      },
    ],
  },
  {
    id: 'tax-basics-india',
    level: 6,
    levelName: 'Wealth Building',
    order: 4,
    title: 'Income Tax Essentials in India (New vs Old Regime)',
    shortDescription: 'Understand tax slabs, capital gains (LTCG/STCG), and keeping more of what you earn legally.',
    xpReward: 100,
    estimatedMinutes: 5,
    concept: 'Capital Gains Taxation & Tax Regimes',
    explainSimply: {
      technical:
        'Distinguishing between ordinary income tax regimes (concessional slab rates vs deductions under Ch. VI-A) and capital gains tax brackets (Section 111A STCG vs Section 112A LTCG).',
      simple:
        'Tax is the price we pay for civilized society, but paying more tax than legally required is an unnecessary penalty. Learn how long-term investments get preferential tax rates.',
      analogy:
        'Income tax is like the delivery fee on your meal order. Knowing the coupon codes (tax exemptions) legally lowers the delivery fee.',
    },
    interactiveType: 'quiz-only',
    contentSections: [
      {
        title: 'Equity Capital Gains Tax in India',
        body: '- Short-Term Capital Gains (STCG): If you hold equity shares or equity mutual funds for less than 12 months before selling -> Taxed at 20%.\n- Long-Term Capital Gains (LTCG): If you hold for more than 12 months -> Taxed at 12.5% on gains exceeding ₹1.25 Lakhs per financial year.',
      },
    ],
    realLifeScenario: {
      title: 'Selling Shares at Month 11 vs Month 13',
      scenario: 'You bought shares and have ₹1,00,000 in profit. You are considering selling at month 11 vs waiting until month 13.',
      choices: [
        {
          text: 'Holding past 12 months qualifies the profit for long-term capital gains (LTCG) with favorable tax treatment.',
          explanation: 'Waiting until 12+ months allows equity gains to qualify for LTCG with the ₹1.25L annual exemption.',
          isOptimal: true,
        },
        {
          text: 'Selling at month 11 has zero tax implications.',
          explanation: 'Selling under 12 months incurs a 20% Short Term Capital Gains tax on equities.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'In Indian equity taxation, how long must you hold equity shares or equity mutual funds to qualify for Long-Term Capital Gains (LTCG)?',
        options: ['More than 12 months', 'More than 36 months', 'More than 5 years', 'Exactly 30 days'],
        correctIndex: 0,
        explanation: 'Equities held for more than 12 months qualify as Long-Term Capital Assets.',
      },
    ],
  },
  {
    id: 'retirement-corpus-math',
    level: 6,
    levelName: 'Wealth Building',
    order: 5,
    title: 'The FI/RE Math: Calculating Your Freedom Number',
    shortDescription: 'Master the 25x Rule and the 4% Safe Withdrawal Rate to retire on your own terms.',
    xpReward: 150,
    estimatedMinutes: 6,
    concept: 'The 25x Rule & Safe Withdrawal Rate (SWR)',
    explainSimply: {
      technical:
        'The 4% Safe Withdrawal Rate (based on the Trinity Study) posits that an appropriately diversified equity/debt corpus sized at 25 to 30 times annual expenditure sustains perpetual inflation-adjusted withdrawals.',
      simple:
        'Multiply your annual living expenses by 25 to 30. Once your investment portfolio hits that number, the returns alone can pay for your life forever without you having to work.',
      analogy:
        'Your retirement corpus is a golden goose. If the goose lays 4 golden eggs every year, and your family only eats 4 eggs, you never have to kill the goose.',
    },
    interactiveType: 'savings-goal',
    interactivePrompt: 'Calculate your target retirement corpus and the monthly investment required to reach financial independence.',
    interactiveInitialValues: {
      targetAmount: 30000000,
      currentSavings: 500000,
      monthlyContribution: 25000,
      expectedReturn: 12,
      targetDuration: 20,
    },
    contentSections: [
      {
        title: 'The 25x Rule in Practice',
        body: 'If your family needs ₹60,000/month to live comfortably:\n- Annual expenses = ₹7,20,000.\n- Your 25x Freedom Number = ₹7,20,000 * 25 = ₹1.8 Crores.\n- A 30x conservative buffer = ₹2.16 Crores.\nOnce you accumulate this diversified corpus, work becomes an optional joy rather than an economic survival necessity.',
      },
    ],
    realLifeScenario: {
      title: 'Financial Independence Mindset',
      scenario: 'You reach your 25x Freedom Number at age 42. Does financial independence mean you must sit on a couch doing nothing?',
      choices: [
        {
          text: 'No; it means you can work on projects you love, start businesses, volunteer, or teach without worrying about a boss’s approval or paycheck.',
          explanation: 'True Financial Independence (FI) is about autonomy, purpose, and control of your time.',
          isOptimal: true,
        },
        {
          text: 'Yes; you are legally prohibited from ever earning money again.',
          explanation: 'Nonsense. Most financially independent people continue creating value on their own terms.',
          isOptimal: false,
        },
      ],
    },
    quiz: [
      {
        question: 'Under the classic 25x Financial Independence rule, if your expected annual living expense is ₹10 Lakhs, what is your target corpus?',
        options: ['₹50 Lakhs', '₹1 Crore', '₹2.5 Crores', '₹10 Crores'],
        correctIndex: 2,
        explanation: '₹10,00,000 multiplied by 25 equals ₹2.5 Crores.',
      },
    ],
  },
];
