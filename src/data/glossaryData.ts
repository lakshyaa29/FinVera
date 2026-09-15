import {
  PlayableConcept,
  ConceptComparison,
  DailyFinanceChallenge,
} from '../types';

export const PLAYABLE_CONCEPTS: PlayableConcept[] = [
  // =================================================================
  // 1. MONEY BASICS
  // =================================================================
  {
    id: 'inflation',
    term: 'Inflation',
    category: 'Money Basics',
    categoryIcon: '🔥',
    difficulty: 'Beginner',
    simpleOneLiner: 'The silent tax that makes everyday items cost more over time.',
    definition:
      'The gradual rate at which the general level of prices for goods and services rises, eroding the purchasing power of money over time.',
    simpleExplanation:
      'The reason a plate of samosas or movie ticket that cost ₹10 a decade ago costs ₹30 today. If your savings do not grow faster than inflation, you are effectively becoming poorer.',
    example: 'At 6% inflation, an expenditure of ₹1,00,000 today will require ₹1,79,084 in 10 years to buy the identical basket of goods.',
    explanations: {
      beginner: 'Imagine keeping ₹100 in a glass jar. After 10 years, it is still ₹100, but prices of groceries doubled. Your money lost half its power.',
      normal: 'Inflation in India typically hovers around 5% to 7% per year, measured by the Consumer Price Index (CPI). Keeping savings in low-interest accounts causes negative real yields.',
      deepDive: 'Central banks like the RBI maintain an inflation target band (4% +/- 2%). When inflation exceeds the tolerance band, RBI raises the Repo Rate to restrict money supply and cool demand.',
    },
    characterScenario: {
      name: 'Rohan (College Student)',
      avatar: '👨‍🎓',
      story: 'Rohan stashed ₹10,000 in his desk drawer in 2018 for a dream gaming console. In 2024, the exact same console model costs ₹16,500 due to inflation.',
      takeaway: 'Cash stored under the mattress loses buying power every day. Invest to outpace inflation.',
    },
    visualDemo: {
      type: 'inflation',
      title: 'Purchasing Power Degradation Model',
      subtitle: 'Watch ₹1,00,000 buying power shrink over 5 to 20 years at Indian inflation averages',
      explanation: 'See how a fixed rupee amount buys fewer baskets of goods every passing year at 6% inflation.',
    },
    interactiveWidget: {
      type: 'inflation-slider',
      title: 'Inflation Cost Calculator',
      instruction: 'Adjust the rate and tenure slider to see the future price of your current lifestyle.',
      defaultValues: { amount: 10000, rate: 6, years: 10 },
    },
    quiz: {
      question: 'If annual inflation is 6% and your bank savings account earns 3%, what is happening to your wealth?',
      scenario: 'You keep ₹5,00,000 in a savings account earning 3% while groceries and rent rise by 6% every year.',
      options: [
        { text: 'Your wealth is growing by 3% every year', isCorrect: false, explanation: 'Nominally you have more rupees, but their real purchasing power is smaller.' },
        { text: 'You are losing roughly 3% real purchasing power every year', isCorrect: true, explanation: 'Correct! Real return = 3% - 6% = -3% per year.' },
        { text: 'Your purchasing power remains completely balanced', isCorrect: false, explanation: 'Because inflation exceeds the return, your real buying power shrinks.' },
      ],
    },
    stillConfused: 'Think of inflation like a treadmill moving backwards at 6 km/h. If you walk at 3 km/h (savings account), you are moving backwards!',
    searchKeywords: ['inflation', 'purchasing power', 'cpi', 'prices rising', 'money losing value'],
    relatedFeature: { label: 'Inflation Calculator', href: '/calculators?tab=inflation' },
    relatedLessonId: 'silent-tax-inflation',
    relatedCalculator: 'inflation',
    order: 1,
  },
  {
    id: 'emergency-fund',
    term: 'Emergency Fund',
    category: 'Money Basics',
    categoryIcon: '🛡️',
    difficulty: 'Beginner',
    simpleOneLiner: 'A 3 to 6 month cash cushion to absorb life’s unpredictable shocks.',
    definition:
      'A dedicated pool of highly liquid cash set aside strictly for unanticipated financial crises, such as job loss, emergency medical bills, or urgent household repairs.',
    simpleExplanation:
      'A financial shock-absorber. Having 3 to 6 months of essential living expenses saved prevents you from taking predatory 40% interest loans or selling investments at a loss.',
    example: 'If your essential monthly expenses (rent + groceries + bills) are ₹30,000, your emergency fund should be between ₹90,000 and ₹1,80,000.',
    explanations: {
      beginner: 'Think of an emergency fund like an umbrella. You hope it never rains, but when a storm hits, you are glad you brought it.',
      normal: 'Keep this money in high-safety liquid instruments like high-interest savings accounts or sweep-in fixed deposits with zero penalty withdrawals.',
      deepDive: 'Never invest emergency funds in volatile equities or locked long-term instruments like PPF or real estate. The primary objective is capital preservation and instant T+0 liquidity, not maximum returns.',
    },
    characterScenario: {
      name: 'Priya (Graphic Designer)',
      avatar: '👩‍💻',
      story: 'Priya lost her laptop to water damage right before a major freelance deadline. Having an emergency fund of ₹60,000 allowed her to replace it within 2 hours without swiping credit card EMIs.',
      takeaway: 'Emergency funds turn a life crisis into a minor temporary inconvenience.',
    },
    visualDemo: {
      type: 'emergency-fund',
      title: 'Emergency Cushion Fortress',
      subtitle: 'Simulating income disruption with vs without a 6-month liquidity buffer',
      explanation: 'See how quickly debt accumulates when unexpected expenses hit an unprotected household.',
    },
    interactiveWidget: {
      type: 'budget-503020',
      title: 'Emergency Fund Blueprint',
      instruction: 'Enter your monthly essentials to calculate your personalized 3-month and 6-month safety targets.',
      defaultValues: { essentials: 25000 },
    },
    quiz: {
      question: 'Where is the optimal place to park your primary emergency fund?',
      scenario: 'You have accumulated ₹1,50,000 for your 6-month emergency reserve.',
      options: [
        { text: 'In high-risk small-cap stocks for maximum returns', isCorrect: false, explanation: 'Stocks can crash 30% right when an emergency strikes, forcing you to sell at the worst time.' },
        { text: 'In a liquid mutual fund or auto-sweep bank FD with instant liquidity', isCorrect: true, explanation: 'Spot on! Emergency reserves prioritize instant accessibility and safety over high returns.' },
        { text: 'In real estate property', isCorrect: false, explanation: 'Real estate takes months or years to liquidate.' },
      ],
    },
    stillConfused: 'Think of your emergency fund like a spare tire in your trunk. It doesn’t make your car go faster, but without it, one puncture ruins your entire journey.',
    searchKeywords: ['emergency fund', 'safety cushion', 'liquid savings', 'contingency fund'],
    relatedFeature: { label: 'Savings Goal Calculator', href: '/calculators?tab=savings-goal' },
    relatedLessonId: 'emergency-funds',
    relatedCalculator: 'savings-goal',
    order: 2,
    prerequisiteId: 'inflation',
  },

  // =================================================================
  // 2. BANKING
  // =================================================================
  {
    id: 'repo-rate',
    term: 'Repo Rate',
    category: 'Banking',
    categoryIcon: '🏛️',
    difficulty: 'Intermediate',
    simpleOneLiner: 'The master interest rate at which the RBI lends money to commercial banks.',
    definition:
      'The benchmark interest rate at which the Reserve Bank of India (RBI) lends short-term funds to commercial banks, directly influencing loan EMIs and fixed deposit rates nationwide.',
    simpleExplanation:
      'When RBI increases Repo Rate, loans (Home, Car, Personal) become more expensive, and FD deposit rates go up. When RBI cuts Repo Rate, borrowing gets cheaper.',
    example: 'When RBI hiked repo rates by 2.50%, a 20-year home loan EMI on ₹50 Lakhs surged from ~₹40,000 to ~₹48,000 per month.',
    explanations: {
      beginner: 'Think of the RBI as the father bank. When it charges more interest to banks like HDFC or SBI, those banks pass the bill directly on to you.',
      normal: 'The Monetary Policy Committee (MPC) meets bi-monthly to calibrate the Repo Rate to balance economic growth with inflation control.',
      deepDive: 'Repo stands for "Repurchasing Option". Banks pledge government securities (G-Secs) to RBI as collateral with an agreement to buy them back. Reverse Repo is the opposite rate when banks park funds with RBI.',
    },
    characterScenario: {
      name: 'Vikram (Home Buyer)',
      avatar: '👨‍💼',
      story: 'Vikram took a floating rate home loan at 6.8%. Over 18 months, RBI raised the repo rate, and his loan interest jumped to 9.1%, adding 6 extra years to his loan tenure!',
      takeaway: 'Floating rate loan borrowers must budget for repo rate hike cycles.',
    },
    visualDemo: {
      type: 'repo-rate',
      title: 'RBI Repo Rate Transmission Mechanism',
      subtitle: 'Toggle the RBI interest rate lever to see loan EMIs and deposit rates react',
      explanation: 'Observe how a 100 bps rate hike flows through commercial banks to consumer wallets.',
    },
    interactiveWidget: {
      type: 'repo-toggle',
      title: 'Repo Rate Impact Explorer',
      instruction: 'Switch between Rate Hike and Rate Cut to see the ripple effect on your home loan EMI.',
      defaultValues: { repoRate: 6.5 },
    },
    quiz: {
      question: 'When the Reserve Bank of India hikes the Repo Rate, what typically happens to your Home Loan EMI?',
      scenario: 'You hold a floating-rate home loan and RBI announces a 50 bps increase in the repo rate.',
      options: [
        { text: 'Your monthly EMI or loan tenure increases', isCorrect: true, explanation: 'Correct! Commercial banks pass the higher borrowing cost to retail floating-rate loans.' },
        { text: 'Your loan balance is automatically forgiven', isCorrect: false, explanation: 'Loans are never forgiven when repo rates rise.' },
        { text: 'Your interest rate permanently drops', isCorrect: false, explanation: 'Hikes increase interest rates rather than dropping them.' },
      ],
    },
    stillConfused: 'The Repo Rate is like the wholesale cost of money. If the wholesaler charges more, the retail shopkeeper (your bank) charges you more.',
    searchKeywords: ['repo rate', 'rbi', 'monetary policy', 'interest rate hike', 'floating loan emi'],
    relatedFeature: { label: 'EMI Calculator', href: '/calculators?tab=emi' },
    relatedLessonId: 'banking-upi-safety',
    relatedCalculator: 'emi',
    order: 3,
  },
  {
    id: 'fixed-deposit',
    term: 'Fixed Deposit (FD)',
    category: 'Banking',
    categoryIcon: '🏦',
    difficulty: 'Beginner',
    simpleOneLiner: 'Lock a lump sum in the bank for a fixed period at a guaranteed interest rate.',
    definition:
      'A low-risk financial instrument provided by banks and NBFCs where an investor deposits a sum of money for a fixed tenure in exchange for a predetermined interest rate.',
    simpleExplanation:
      'You lend your money to the bank for 1, 3, or 5 years. The bank guarantees your principal and pays you a fixed return (e.g. 7% per annum), regardless of stock market swings.',
    example: 'Depositing ₹1,00,000 in a 1-year bank FD at 7.2% gives you ₹1,07,390 at maturity.',
    explanations: {
      beginner: 'A vault with a fixed return contract. You promise not to touch the money for a year, and the bank promises to add interest.',
      normal: 'Under DICGC (RBI subsidiary), each depositor in a registered bank is insured up to ₹5,00,000 (principal + interest) in case of bank failure.',
      deepDive: 'Interest earned on FDs is fully taxable under "Income from Other Sources" according to your income tax slab, reducing the post-tax return for high earners.',
    },
    characterScenario: {
      name: 'Grandmother Shanti',
      avatar: '👵',
      story: 'Shanti deposited her retirement savings in a Senior Citizen FD earning 7.75%. The predictable quarterly interest pays her monthly medicines reliably.',
      takeaway: 'FDs provide peace of mind and steady capital preservation, ideal for senior citizens or near-term goals.',
    },
    visualDemo: {
      type: 'compounding',
      title: 'Fixed Deposit Maturity Growth',
      subtitle: 'Watch guaranteed principal + quarterly compounded interest grow predictably',
      explanation: 'See how compound frequency impacts FD maturity values over 1 to 5 years.',
    },
    interactiveWidget: {
      type: 'compound-sandbox',
      title: 'FD Return Simulator',
      instruction: 'Compare returns between simple interest and quarterly compounded bank FDs.',
      defaultValues: { principal: 100000, rate: 7, tenure: 3 },
    },
    quiz: {
      question: 'Under the RBI’s DICGC insurance scheme, what is the maximum safety insurance per depositor per bank?',
      scenario: 'You hold ₹8,00,000 in a single commercial bank that unfortunately collapses.',
      options: [
        { text: '₹1,00,000 only', isCorrect: false, explanation: 'The insurance cap was upgraded from ₹1 Lakh to ₹5 Lakhs in 2020.' },
        { text: '₹5,00,000 total (principal + interest)', isCorrect: true, explanation: 'Accurate! DICGC guarantees up to ₹5 Lakhs per depositor per licensed bank.' },
        { text: 'Unlimited full government bailout', isCorrect: false, explanation: 'There is a statutory cap of ₹5,00,000.' },
      ],
    },
    stillConfused: 'An FD is like an agreed lease contract. You lease your money to the bank, and they pay you fixed rent on that money.',
    searchKeywords: ['fixed deposit', 'fd', 'dicgc', 'term deposit', 'guaranteed returns'],
    relatedFeature: { label: 'Compound Interest Calculator', href: '/calculators?tab=compound-interest' },
    relatedLessonId: 'simple-vs-compound',
    relatedCalculator: 'compound-interest',
    order: 4,
  },

  // =================================================================
  // 3. CREDIT
  // =================================================================
  {
    id: 'cibil-score',
    term: 'CIBIL Score',
    category: 'Credit',
    categoryIcon: '💳',
    difficulty: 'Beginner',
    simpleOneLiner: 'Your 3-digit financial reputation score (300 to 900) for getting loans.',
    definition:
      'A numerical summary of your credit history, rating, and repayment track record compiled by the TransUnion CIBIL bureau, used by lenders to evaluate loan risk.',
    simpleExplanation:
      'Your borrowing report card. A score above 750 opens the door to instant loan approvals and the lowest possible interest rates. A score below 650 gets your applications rejected.',
    example: 'Maintaining a 790 score lets Amit get a car loan at 8.6%, while someone with 640 is charged 12.5% or rejected entirely.',
    explanations: {
      beginner: 'Think of it like an Uber rider rating, but for borrowing money. If you pay your bills on time, your score goes up and banks trust you.',
      normal: 'Calculated from: Payment History (35%), Credit Utilization Ratio (30%), Credit Age & Mix (25%), and Recent Inquiries (10%).',
      deepDive: 'Hard inquiries occur when lenders pull your score during a loan application, temporarily knocking off 5-10 points. Soft inquiries (checking your own score) have zero impact.',
    },
    characterScenario: {
      name: 'Aman (Software Engineer)',
      avatar: '👨‍💻',
      story: 'Aman always paid his credit card "Minimum Amount Due" thinking it was enough. His utilization hit 85% and his CIBIL score plummeted to 620, blocking his dream apartment loan.',
      takeaway: 'Pay 100% of your credit balance, not just the minimum amount due, to maintain a 750+ score.',
    },
    visualDemo: {
      type: 'cibil-score',
      title: 'Credit Score Spectrum & Tier Impacts',
      subtitle: 'Discover how scores from 300 to 900 change loan interest rates and rejection rates',
      explanation: 'See the four tiers: Poor (300-600), Fair (600-700), Good (700-750), and Excellent (750-900).',
    },
    interactiveWidget: {
      type: 'cibil-simulator',
      title: 'CIBIL Factor Simulator',
      instruction: 'Toggle timely payments, utilization percentage, and credit age to see your simulated score move.',
      defaultValues: { onTime: 1, utilization: 25, inquiries: 1 },
    },
    quiz: {
      question: 'What is the recommended maximum credit card utilization ratio to keep your CIBIL score healthy?',
      scenario: 'You have a credit card with a total credit limit of ₹1,00,000.',
      options: [
        { text: 'Max out the entire ₹1,00,000 every month', isCorrect: false, explanation: 'Using 100% signals credit hunger and hurts your score.' },
        { text: 'Keep spending under 30% (₹30,000)', isCorrect: true, explanation: 'Correct! Keeping utilization below 30% shows lenders you are not dependent on debt.' },
        { text: 'Never use the card even once for 5 years', isCorrect: false, explanation: 'Zero activity means no payment history is reported.' },
      ],
    },
    stillConfused: 'Think of CIBIL like your school attendance and exam record. If you never miss a submission, you get an A grade and top privileges.',
    searchKeywords: ['cibil score', 'credit score', 'credit card limit', 'loan approval', 'transunion'],
    relatedFeature: { label: 'Explore Missions', href: '/practice/missions' },
    relatedLessonId: 'credit-score-cibil',
    order: 5,
  },
  {
    id: 'emi',
    term: 'EMI (Equated Monthly Installment)',
    category: 'Credit',
    categoryIcon: '🔢',
    difficulty: 'Beginner',
    simpleOneLiner: 'A fixed monthly payment that chips away at both your loan principal and interest.',
    definition:
      'A fixed payment amount made by a borrower to a lender at a specified date each calendar month, designed to pay off both loan interest and principal in full over a specified tenure.',
    simpleExplanation:
      'Breaking a huge purchase (like a ₹50,000 smartphone or ₹40 Lakh home) into bite-sized monthly chunks. Early EMIs pay mostly interest; later EMIs pay mostly principal.',
    example: 'A ₹10 Lakh home loan at 9% for 15 years results in an EMI of ₹10,143 per month.',
    explanations: {
      beginner: 'Instead of paying ₹60,000 upfront, you pay ₹5,000 every month for 12 months (plus interest).',
      normal: 'Calculated using the formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1], where P is principal, R is monthly interest rate, and N is number of months.',
      deepDive: 'Amortization curves mean in the initial 30% of your loan tenure, up to 70% of your EMI goes toward bank interest rather than reducing your actual debt.',
    },
    characterScenario: {
      name: 'Sneha (Sales Executive)',
      avatar: '👩‍💼',
      story: 'Sneha stacked three "No-Cost EMI" purchases for shoes, a tablet, and a watch. Together they consumed 45% of her salary, leaving no money for groceries at month end.',
      takeaway: 'Total EMIs across all your loans should ideally never exceed 35-40% of your net monthly income.',
    },
    visualDemo: {
      type: 'generic',
      title: 'Loan Amortization Journey',
      subtitle: 'Watch how interest vs principal portions shift over the life of a loan',
      explanation: 'See how paying extra principal early in your loan tenure saves huge sums in interest.',
    },
    interactiveWidget: {
      type: 'generic',
      title: 'EMI Affordability Check',
      instruction: 'Enter your loan details to calculate exact monthly outflow and total interest paid.',
      defaultValues: { loanAmount: 500000, rate: 9, tenureYears: 5 },
    },
    quiz: {
      question: 'In the early years of a 20-year home loan, what makes up the biggest portion of each EMI?',
      scenario: 'You just paid your 12th monthly EMI on a 20-year mortgage.',
      options: [
        { text: 'Mostly Principal repayment', isCorrect: false, explanation: 'Early on, the principal balance is very high, so interest dominates the payment.' },
        { text: 'Mostly Interest charges', isCorrect: true, explanation: 'Correct! Due to compounding amortization math, initial EMIs pay mostly bank interest.' },
        { text: 'Pure government tax fees', isCorrect: false, explanation: 'EMIs pay principal and interest to the lender, not taxes.' },
      ],
    },
    stillConfused: 'Imagine buying a pizza on credit. The first few bites are just the delivery fee; only at the end do you finally get to eat the actual crust.',
    searchKeywords: ['emi', 'equated monthly installment', 'loan amortization', 'home loan emi', 'car loan'],
    relatedFeature: { label: 'EMI Calculator', href: '/calculators?tab=emi' },
    relatedLessonId: 'demystifying-loans-emi',
    relatedCalculator: 'emi',
    order: 6,
    prerequisiteId: 'cibil-score',
  },

  // =================================================================
  // 4. INVESTING
  // =================================================================
  {
    id: 'compound-interest',
    term: 'Compound Interest',
    category: 'Investing',
    categoryIcon: '🚀',
    difficulty: 'Beginner',
    simpleOneLiner: 'Earning interest on your interest, creating an exponential wealth snowball.',
    definition:
      'The addition of interest to the principal sum of an investment or deposit, such that the accumulated interest also earns interest from that point forward.',
    simpleExplanation:
      'Your money hires little money workers. Then those workers hire more workers. Over 15-20 years, the workers make far more money than you ever deposited yourself.',
    example: 'Investing ₹10,000 monthly at 12% for 25 years: you deposit ₹30 Lakhs, but your final balance becomes a massive ₹1.90 Crores!',
    explanations: {
      beginner: 'Think of a tiny snowball rolling down a snowy mountain. At first it barely grows, but as it rolls further, it doubles in size every few seconds.',
      normal: 'Albert Einstein famously called compound interest the 8th wonder of the world: "He who understands it, earns it; he who doesn’t, pays it."',
      deepDive: 'The Rule of 72 lets you calculate how quickly your money doubles: 72 divided by the annual return rate. At 12%, your wealth doubles roughly every 6 years.',
    },
    characterScenario: {
      name: 'Sameer & Kunal (Age 22 vs 32)',
      avatar: '👬',
      story: 'Sameer started investing ₹5,000/month at age 22. Kunal waited until age 32 and invested ₹10,000/month. By age 55, Sameer had ₹2.8 Crores while Kunal had only ₹1.8 Crores despite putting in twice as much cash!',
      takeaway: 'Time in the market beats timing the market. Start early, even with ₹500.',
    },
    visualDemo: {
      type: 'compounding',
      title: 'The Compounding Flywheel Hockey Stick',
      subtitle: 'Observe how the growth curve explodes upwards after the 10-year mark',
      explanation: 'See the dramatic difference between simple linear interest and compound exponential growth.',
    },
    interactiveWidget: {
      type: 'compound-sandbox',
      title: 'Compounding Sandbox',
      instruction: 'Adjust monthly deposit, annual rate, and time horizon to see the hockey stick curve form.',
      defaultValues: { initial: 25000, monthly: 5000, rate: 12, years: 15 },
    },
    quiz: {
      question: 'Using the Rule of 72, roughly how many years will it take for your investment to double at a 12% annual return?',
      scenario: 'You invest ₹1,00,000 in an index fund generating a steady 12% compound annual return.',
      options: [
        { text: '12 years', isCorrect: false, explanation: '72 / 12 = 6 years, not 12.' },
        { text: '6 years', isCorrect: true, explanation: 'Spot on! 72 divided by 12 equals 6 years to double your capital.' },
        { text: '72 years', isCorrect: false, explanation: '72 is the constant numerator in the formula.' },
      ],
    },
    stillConfused: 'Simple interest is like planting an apple tree and picking apples. Compound interest is planting an apple, taking the seeds, and planting an entire orchard.',
    searchKeywords: ['compound interest', 'compounding', 'rule of 72', 'exponential growth', 'wealth snowball'],
    relatedFeature: { label: 'Compound Interest Calculator', href: '/calculators?tab=compound-interest' },
    relatedLessonId: 'compound-interest',
    relatedCalculator: 'compound-interest',
    order: 7,
  },
  {
    id: 'sip',
    term: 'SIP (Systematic Investment Plan)',
    category: 'Investing',
    categoryIcon: '📈',
    difficulty: 'Beginner',
    simpleOneLiner: 'Investing a set amount every month on autopilot to build massive wealth.',
    definition:
      'A facility offered by mutual funds that allows investors to invest a fixed amount of money at predetermined regular intervals (usually monthly) into an investment scheme.',
    simpleExplanation:
      'Putting your investing on autopilot. On the 5th of every month, ₹2,000 is automatically debited from your bank and invested into a mutual fund without you watching stock charts.',
    example: 'A 24-year-old starting an automated SIP of ₹3,000/month in the Nifty 50 Index builds over ₹1 Crore by age 54 at 12% average returns.',
    explanations: {
      beginner: 'Think of SIP like your Netflix subscription, but instead of streaming movies, it builds a fortune for your future self.',
      normal: 'SIP benefits from Rupee Cost Averaging: when market crashes, your fixed ₹2,000 buys MORE units; when market rises, your existing units become worth more.',
      deepDive: 'A Step-Up SIP automatically raises your monthly investment by 10% each year as your salary grows, often doubling your final retirement corpus compared to a flat SIP.',
    },
    characterScenario: {
      name: 'Ananya (Junior Architect)',
      avatar: '👩‍🎨',
      story: 'Ananya was terrified of the stock market crashing. She set up a ₹2,500 monthly SIP and forgot about it. During the 2020 crash, her SIP bought record cheap units that tripled in value by 2024.',
      takeaway: 'SIP removes emotion and greed from investing, turning volatility into your friend.',
    },
    visualDemo: {
      type: 'sip',
      title: 'Rupee Cost Averaging in Volatile Markets',
      subtitle: 'Watch how regular monthly SIPs acquire more units when the market dips',
      explanation: 'See why market crashes actually accelerate SIP wealth accumulation over long horizons.',
    },
    interactiveWidget: {
      type: 'sip-planner',
      title: 'SIP Wealth Calculator',
      instruction: 'Set your monthly SIP contribution and duration to view your projected corpus.',
      defaultValues: { monthly: 3000, rate: 12, years: 15 },
    },
    quiz: {
      question: 'What is the biggest superpower of a Systematic Investment Plan (SIP) during market crashes?',
      scenario: 'The stock market drops 20% in a month, but your monthly SIP installment is deducted as usual.',
      options: [
        { text: 'It automatically sells all your investments into cash', isCorrect: false, explanation: 'SIP buys units; it never panic sells.' },
        { text: 'It automatically buys MORE units at cheaper discount prices (Rupee Cost Averaging)', isCorrect: true, explanation: 'Bingo! Since NAV is lower, your fixed rupee investment scoops up more units.' },
        { text: 'The government pays you compensation bonus', isCorrect: false, explanation: 'There are no government bonuses for stock dips.' },
      ],
    },
    stillConfused: 'Imagine buying mangoes every month with ₹500. When mangoes are expensive, you get 5. When there is a glut and they are cheap, you get 15. Your average price stays super low.',
    searchKeywords: ['sip', 'systematic investment plan', 'mutual funds', 'rupee cost averaging', 'wealth creation'],
    relatedFeature: { label: 'SIP Calculator', href: '/calculators?tab=sip' },
    relatedLessonId: 'sip-basics',
    relatedCalculator: 'sip',
    order: 8,
    prerequisiteId: 'compound-interest',
  },
  {
    id: 'stock',
    term: 'Stock (Equity Share)',
    category: 'Investing',
    categoryIcon: '🏢',
    difficulty: 'Intermediate',
    simpleOneLiner: 'A legal ownership certificate representing a fractional slice of a company.',
    definition:
      'A financial security that represents fractional equity ownership in a corporation, entitling the stockholder to a proportion of the company’s assets and profits.',
    simpleExplanation:
      'When you buy 1 share of Infosys or Tata Motors, you literally become a co-owner. If the company makes profits and expands, your share price goes up and you receive cash dividends.',
    example: 'Buying 10 shares of Reliance Industries at ₹2,900 makes you an equity shareholder with voting rights and dividend eligibility.',
    explanations: {
      beginner: 'Imagine 4 friends start a cafe costing ₹4,00,000. Each puts in ₹1,00,000 and owns 25%. A stock market share is the exact same thing, but split into millions of tiny pieces.',
      normal: 'Stocks trade on public stock exchanges like NSE and BSE in India. Prices fluctuate based on earnings, corporate governance, economic growth, and supply-demand.',
      deepDive: 'Equities historically deliver the highest real returns of any liquid asset class over 10+ year periods, beating inflation by 6-8%, but carry short-term price volatility.',
    },
    characterScenario: {
      name: 'Kavita (Teacher)',
      avatar: '👩‍🏫',
      story: 'Kavita bought 50 shares of a reputable Indian consumer goods company in 2012. Over 12 years, the company grew profits 5x, paid regular dividends, and funded her daughter’s college degree.',
      takeaway: 'Invest in great businesses and let the promoters work hard to grow your capital.',
    },
    visualDemo: {
      type: 'stock',
      title: 'Fractional Business Ownership Model',
      subtitle: 'See how buying company shares connects directly to real business revenue and dividends',
      explanation: 'Visualize owning a slice of top Indian conglomerates and earning revenue participation.',
    },
    interactiveWidget: {
      type: 'generic',
      title: 'Share Purchase Playground',
      instruction: 'Select a simulated asset and buy shares to track portfolio performance.',
      defaultValues: { shareCount: 10, sharePrice: 1500 },
    },
    quiz: {
      question: 'When you purchase shares of a publicly listed company on the NSE, what are you technically acquiring?',
      scenario: 'You buy 15 shares of Tata Consultancy Services (TCS) on your broker app.',
      options: [
        { text: 'A loan contract that the company must repay with fixed interest', isCorrect: false, explanation: 'That is a corporate bond, not equity shares.' },
        { text: 'Fractional equity ownership and claim on future corporate profits', isCorrect: true, explanation: 'Exactly! You are now a shareholder and partial business owner.' },
        { text: 'An employment contract with the company', isCorrect: false, explanation: 'Shareholders own equity; they are not employees.' },
      ],
    },
    stillConfused: 'Buying stock is not playing lottery numbers. It is partnering with India’s top entrepreneurs and letting their factories and staff make you money.',
    searchKeywords: ['stock', 'equity', 'shares', 'nse', 'bse', 'business ownership'],
    relatedFeature: { label: 'Simulated Practice Market', href: '/practice' },
    relatedLessonId: 'stock-market-basics',
    order: 9,
  },
  {
    id: 'mutual-fund',
    term: 'Mutual Fund',
    category: 'Investing',
    categoryIcon: '🧺',
    difficulty: 'Beginner',
    simpleOneLiner: 'A pooled basket of 50+ stocks managed by professionals for everyday investors.',
    definition:
      'A collective investment vehicle managed by an Asset Management Company (AMC) that pools money from thousands of investors to purchase a diversified portfolio of securities.',
    simpleExplanation:
      'Instead of trying to research and buy 50 different company stocks yourself, you pool your ₹1,000 with thousands of people. A professional fund manager buys a diversified basket for everyone.',
    example: 'An equity mutual fund pooling ₹10,000 Crores and distributing it across TCS, Infosys, ICICI Bank, L&T, and 45 other industry leaders.',
    explanations: {
      beginner: 'Think of it like hiring an Uber driver instead of buying your own bus. You chip in for the ride and a trained professional steers the vehicle.',
      normal: 'Regulated by SEBI in India. Units are valued daily by Net Asset Value (NAV). Types include Equity Funds, Debt Funds, Hybrid Funds, and Index Funds.',
      deepDive: 'Always choose "Direct Plan" over "Regular Plan". Direct plans eliminate third-party broker commissions, saving you 0.5% to 1.5% in expense ratio every single year, adding Lakhs over decades.',
    },
    characterScenario: {
      name: 'Tanmay (Doctor)',
      avatar: '👨‍⚕️',
      story: 'Tanmay works 14-hour hospital shifts and has zero time to read balance sheets. By setting up auto-SIPs in a diversified mutual fund, he beats inflation without touching a financial spreadsheet.',
      takeaway: 'Mutual funds offer instant professional diversification for busy professionals.',
    },
    visualDemo: {
      type: 'diversification',
      title: 'The Pooled Basket Architecture',
      subtitle: 'See how ₹1,000 is automatically split across 50 top companies to eliminate single-stock risk',
      explanation: 'Observe how a collapse in one stock is absorbed easily by gains across 49 other holdings.',
    },
    interactiveWidget: {
      type: 'diversify-basket',
      title: 'Mutual Fund Portfolio Allocator',
      instruction: 'Distribute your funds across equities, debt, gold, and cash to balance risk and reward.',
      defaultValues: { equity: 60, debt: 25, gold: 10, cash: 5 },
    },
    quiz: {
      question: 'Why do financial advisors strongly recommend opting for "Direct" mutual fund plans over "Regular" plans?',
      scenario: 'You are selecting between Scheme A (Direct Plan) with 0.4% fee and Scheme A (Regular Plan) with 1.4% fee.',
      options: [
        { text: 'Direct plans have higher tax deductions', isCorrect: false, explanation: 'Taxation on capital gains is identical for both plans.' },
        { text: 'Direct plans bypass distributor commissions, resulting in a lower expense ratio and higher compounding returns', isCorrect: true, explanation: 'Exactly! Over 20 years, that 1% fee difference compounds into tens of Lakhs in extra wealth.' },
        { text: 'Regular plans guarantee zero market loss', isCorrect: false, explanation: 'Both invest in the exact same underlying portfolio and market risk.' },
      ],
    },
    stillConfused: 'A mutual fund is like a fruit fruit-salad bowl. If one grape goes bad, the entire bowl of apples, bananas, and mangoes is still delicious.',
    searchKeywords: ['mutual fund', 'amc', 'direct vs regular', 'nav', 'diversified portfolio'],
    relatedFeature: { label: 'SIP Calculator', href: '/calculators?tab=sip' },
    relatedLessonId: 'what-is-mutual-fund',
    order: 10,
    prerequisiteId: 'stock',
  },

  // =================================================================
  // 5. MARKETS
  // =================================================================
  {
    id: 'bull-bear',
    term: 'Bull vs Bear Market',
    category: 'Markets',
    categoryIcon: '🐂',
    difficulty: 'Beginner',
    simpleOneLiner: 'A Bull market charges upwards in optimism; a Bear market swipes prices down in fear.',
    definition:
      'Financial market conditions characterized by prolonged rising asset prices and investor optimism (Bull) versus falling prices typically exceeding 20% decline and widespread pessimism (Bear).',
    simpleExplanation:
      'Bull attacks with horns up (market soaring). Bear attacks with claws down (market bleeding). Both cycles are completely normal and essential phases of every healthy economy.',
    example: 'The 2020-2021 post-pandemic recovery was a historic Bull run; early 2008 or March 2020 lockdowns were brutal Bear markets.',
    explanations: {
      beginner: 'Think of the seasons. Bull market is spring and summer with everything blossoming. Bear market is winter where trees shed leaves, preparing for the next spring.',
      normal: 'Bull markets generally last 3 to 5 years, while Bear markets are sharper and typically resolve within 9 to 18 months in growing economies like India.',
      deepDive: 'The biggest wealth creators buy aggressively during Bear markets when quality blue chips trade at 30-50% discounts due to widespread retail panic.',
    },
    characterScenario: {
      name: 'Deepak (First-Time Investor)',
      avatar: '🧑',
      story: 'Deepak entered the market during a raging Bull market and thought investing was easy. When a Bear correction hit, he panicked and sold at the bottom, missing the subsequent 80% rally.',
      takeaway: 'Never panic sell in a Bear market. Stay calm, continue your SIP, and let the cycle play out.',
    },
    visualDemo: {
      type: 'bull-bear',
      title: 'Market Cycle Mood Wheel & Price Volatility',
      subtitle: 'Cycle through Euphoria, Denial, Panic, Depression, and Hope to see how prices rebound',
      explanation: 'See why emotional retail investors buy at the peak of Euphoria and sell at the pit of Depression.',
    },
    interactiveWidget: {
      type: 'generic',
      title: 'Market Sentiment Simulator',
      instruction: 'Simulate portfolio behavior through a 25% bear drawdown followed by a 50% bull recovery.',
      defaultValues: { portfolio: 100000 },
    },
    quiz: {
      question: 'What is the mathematically proven smartest strategy for a retail SIP investor when a Bear Market strikes?',
      scenario: 'The Nifty 50 has fallen 22% over 6 months amid global negative headlines.',
      options: [
        { text: 'Panic and redeem everything into bank cash at a loss', isCorrect: false, explanation: 'Selling locks in temporary paper losses into permanent real losses.' },
        { text: 'Continue your systematic SIP installments to accumulate discounted units', isCorrect: true, explanation: 'Spot on! Bear markets are the ultimate shopping sale for patient long-term wealth builders.' },
        { text: 'Borrow high-interest money to gamble on penny stocks', isCorrect: false, explanation: 'Leverage during volatility leads to catastrophic liquidation.' },
      ],
    },
    stillConfused: 'Think of shopping for clothes. If your favorite luxury jacket goes on 40% discount, do you run away crying or do you buy it happily? That is what a Bear market is for quality stocks.',
    searchKeywords: ['bull market', 'bear market', 'market cycle', 'market crash', 'volatility'],
    relatedFeature: { label: 'Explore Missions', href: '/practice/missions' },
    relatedLessonId: 'stock-market-basics',
    order: 11,
  },

  // =================================================================
  // 6. RISK
  // =================================================================
  {
    id: 'diversification',
    term: 'Diversification',
    category: 'Risk',
    categoryIcon: '⚖️',
    difficulty: 'Beginner',
    simpleOneLiner: 'Spreading your eggs across multiple baskets so no single crash wipes you out.',
    definition:
      'A risk management technique that mixes a wide variety of investments within a portfolio to reduce unsystematic risk and limit exposure to any single asset or industry.',
    simpleExplanation:
      'Never put all your money in one company, one sector, or one asset class. If tech stocks crash, your pharmaceutical shares and gold bonds keep your total net worth protected.',
    example: 'Holding 60% Equity Index Funds, 25% Government Bonds/FDs, and 15% Sovereign Gold Bonds instead of 100% in one cryptocurrency or one hot stock.',
    explanations: {
      beginner: 'If you only sell umbrellas, you make money when it rains but starve in summer. If you sell both umbrellas and ice cream, you make money in all seasons.',
      normal: 'Nobel laureate Harry Markowitz called diversification "the only free lunch in finance" because it reduces overall portfolio risk without sacrificing expected long-term returns.',
      deepDive: 'Correlation is the key metric. Holding assets with zero or negative correlation (like equities vs gold) dampens portfolio volatility and smooths the journey.',
    },
    characterScenario: {
      name: 'Rahul (Tech Enthusiast)',
      avatar: '👨‍🎓',
      story: 'Rahul invested 100% of his savings into a single hot startup stock. The company got embroiled in an accounting scandal and crashed 92%, wiping out 4 years of his life savings.',
      takeaway: 'No matter how promising a single company looks, never sacrifice diversification.',
    },
    visualDemo: {
      type: 'diversification',
      title: 'Single-Asset Catastrophe vs Diversified Shield',
      subtitle: 'Simulate a 50% crash in a specific sector and see how diversified portfolios cushion the blow',
      explanation: 'See how a balanced mix of equities, debt, and gold preserves capital during extreme market turbulence.',
    },
    interactiveWidget: {
      type: 'diversify-basket',
      title: 'Portfolio Stress Tester',
      instruction: 'Allocate your virtual ₹10,000 across stocks, bonds, and gold, then trigger a market shock!',
      defaultValues: { stocks: 50, bonds: 30, gold: 20 },
    },
    quiz: {
      question: 'Why is diversification considered "the only free lunch in finance"?',
      scenario: 'You evaluate two portfolios with equal 12% expected returns: Portfolio A holds 1 stock; Portfolio B holds 50 stocks across 10 sectors.',
      options: [
        { text: 'Portfolio B pays you zero government taxes', isCorrect: false, explanation: 'Taxation rules apply equally.' },
        { text: 'Portfolio B dramatically reduces risk of total capital destruction while delivering the same return', isCorrect: true, explanation: 'Bingo! If 1 company fails, Portfolio B loses only 2%, whereas Portfolio A loses everything.' },
        { text: 'Portfolio A is always safer because it is easier to watch', isCorrect: false, explanation: 'Watching 1 stock does not protect you from fraud or industry bankruptcy.' },
      ],
    },
    stillConfused: 'Think of a table with 4 sturdy legs versus a table with 1 thin leg. If 1 leg breaks on a 4-legged table, the table still stands.',
    searchKeywords: ['diversification', 'asset allocation', 'risk management', 'free lunch', 'portfolio balance'],
    relatedFeature: { label: 'Simulated Practice Market', href: '/practice' },
    relatedLessonId: 'diversification-risk',
    order: 12,
  },

  // =================================================================
  // 7. TAXES
  // =================================================================
  {
    id: 'capital-gains',
    term: 'Capital Gains Tax (LTCG & STCG)',
    category: 'Taxes',
    categoryIcon: '🧾',
    difficulty: 'Intermediate',
    simpleOneLiner: 'The tax you pay to the government on profits made from selling investments.',
    definition:
      'A tax levied on the profit realized on the sale of a non-inventory asset that was purchased at a lower price, categorized into Short-Term (STCG) or Long-Term (LTCG) based on holding period.',
    simpleExplanation:
      'If you buy shares for ₹1,00,000 and sell them later for ₹1,50,000, you made a ₹50,000 capital gain. The government collects tax on this ₹50,000 profit, not on your original ₹1,00,000 capital.',
    example: 'In Indian equities: holding over 12 months is LTCG (taxed at 12.5% on gains exceeding ₹1.25 Lakhs/year). Holding under 12 months is STCG (taxed at 20%).',
    explanations: {
      beginner: 'Think of it as sharing a small slice of your profit pie with the government when you cash out your winning investment.',
      normal: 'Under Budget 2024 revisions, equity LTCG is 12.5% for gains above ₹1.25 Lakh per financial year. STCG for equity held under 1 year is 20%.',
      deepDive: 'Tax loss harvesting allows you to book unrealized losses before March 31 to offset taxable capital gains, legally reducing your net income tax liability.',
    },
    characterScenario: {
      name: 'Meera (Freelancer)',
      avatar: '👩‍💻',
      story: 'Meera sold her mutual funds after 11 months and paid 20% STCG. If she had waited just 31 more days, she would have saved thousands under the lower 12.5% LTCG slab and ₹1.25 Lakh exemption.',
      takeaway: 'Patience pays in investing. Holding past 12 months unlocks favorable tax treatment.',
    },
    visualDemo: {
      type: 'generic',
      title: 'Tax Slabs: Short Term vs Long Term',
      subtitle: 'Compare how holding period transforms your net post-tax take-home returns',
      explanation: 'See how holding equity investments past 365 days significantly reduces tax drag.',
    },
    interactiveWidget: {
      type: 'generic',
      title: 'Capital Gains Tax Calculator',
      instruction: 'Enter buy price, sell price, and holding months to calculate your exact tax bill.',
      defaultValues: { buyPrice: 100000, sellPrice: 160000, months: 14 },
    },
    quiz: {
      question: 'For listed Indian equities, holding an investment for more than 12 months qualifies your profits as what type of gain?',
      scenario: 'You bought shares on January 10, 2023 and sold them on February 15, 2024 at a profit.',
      options: [
        { text: 'Short-Term Capital Gain (STCG)', isCorrect: false, explanation: 'STCG applies when held for 12 months or less.' },
        { text: 'Long-Term Capital Gain (LTCG)', isCorrect: true, explanation: 'Correct! Holding equities past 12 months qualifies for Long-Term Capital Gains.' },
        { text: 'Lottery Windfall Tax', isCorrect: false, explanation: 'Lottery is taxed at flat 30% without indexation.' },
      ],
    },
    stillConfused: 'STCG is like a speeding ticket for rushing to sell. LTCG is a discount reward from the government for being a patient, long-term investor.',
    searchKeywords: ['capital gains tax', 'ltcg', 'stcg', 'income tax india', 'tax loss harvesting'],
    relatedFeature: { label: 'Explore Lessons', href: '/learn' },
    relatedLessonId: 'tax-basics-india',
    order: 13,
  },

  // =================================================================
  // 8. WEALTH
  // =================================================================
  {
    id: 'fire-movement',
    term: 'FIRE (Financial Independence, Retire Early)',
    category: 'Wealth',
    categoryIcon: '💎',
    difficulty: 'Advanced',
    simpleOneLiner: 'Building a portfolio so large that its returns cover 100% of your living costs forever.',
    definition:
      'A financial movement defined by high savings rates, frugal living, and low-cost index investing to accumulate a portfolio equal to 25 to 33 times annual living expenses, enabling early retirement.',
    simpleExplanation:
      'Reaching the point where working a job becomes completely optional. Your investments generate more passive cash flow every month than your household spends.',
    example: 'If your household requires ₹6 Lakhs/year to live comfortably, a FIRE corpus of ₹1.5 Crores to ₹2 Crores (25x to 33x expenses) provides lifelong financial independence.',
    explanations: {
      beginner: 'Working because you love what you do, not because you need to pay the rent on the 1st of next month.',
      normal: 'Built around the Trinity Study "4% Safe Withdrawal Rule": withdrawing 4% of your starting corpus (adjusted for inflation) rarely exhausts a diversified portfolio over 30 years.',
      deepDive: 'Variations include LeanFIRE (minimalist expenses), FatFIRE (luxurious lifestyle corpus), and CoastFIRE (investing enough in your 20s so compound interest handles retirement without further savings).',
    },
    characterScenario: {
      name: 'Aditya & Neha (Tech Couple)',
      avatar: '👫',
      story: 'Aditya and Neha saved 50% of their dual salaries for 14 years. At age 38, their investment dividends surpassed their living costs, allowing Neha to start an NGO and Aditya to write novels.',
      takeaway: 'Financial independence is not about doing nothing; it is about absolute freedom over your time.',
    },
    visualDemo: {
      type: 'compounding',
      title: 'FIRE Runway: Savings Rate vs Years to Freedom',
      subtitle: 'See how boosting your savings rate from 15% to 50% cuts your working career by 20 years',
      explanation: 'Discover the pure math behind why saving percentage matters more than high income.',
    },
    interactiveWidget: {
      type: 'compound-sandbox',
      title: 'FIRE Corpus Estimator',
      instruction: 'Enter your monthly expenses to reverse-engineer your target Financial Independence number.',
      defaultValues: { initial: 500000, monthly: 30000, rate: 12, years: 15 },
    },
    quiz: {
      question: 'According to the standard 25x rule of thumb, how large must your investment portfolio be to achieve FIRE if your annual living expenses are ₹8,00,000?',
      scenario: 'You want your investment returns to cover ₹8 Lakhs per year in expenses indefinitely.',
      options: [
        { text: '₹25,00,000 (₹25 Lakhs)', isCorrect: false, explanation: 'That is only ~3 years of living expenses.' },
        { text: '₹2,00,00,000 (₹2 Crores)', isCorrect: true, explanation: 'Spot on! ₹8,00,000 multiplied by 25 = ₹2.0 Crores.' },
        { text: '₹10,00,00,000 (₹10 Crores)', isCorrect: false, explanation: 'While luxurious, ₹10 Crores represents over 125 years of expenses.' },
      ],
    },
    stillConfused: 'FIRE means buying back your 24 hours every day. Money is no longer a trap; it is your personal employee paying you a salary.',
    searchKeywords: ['fire', 'financial independence', 'retire early', '4 percent rule', 'passive income'],
    relatedFeature: { label: 'Savings Goal Calculator', href: '/calculators?tab=savings-goal' },
    relatedLessonId: 'retirement-corpus-math',
    relatedCalculator: 'savings-goal',
    order: 14,
    prerequisiteId: 'compound-interest',
  },
];

// Backward-compatible export for global search and older components
export const GLOSSARY_TERMS: PlayableConcept[] = PLAYABLE_CONCEPTS;

// =================================================================
// HEAD-TO-HEAD CONCEPT COMPARISONS
// =================================================================
export const CONCEPT_COMPARISONS: ConceptComparison[] = [
  {
    id: 'sip-vs-lumpsum',
    title: 'SIP vs Lumpsum',
    badge: 'INVESTING DEBATE',
    conceptA: {
      name: 'Systematic Investment Plan (SIP)',
      tag: 'Disciplined & Automated',
      description: 'Invest a fixed rupee amount every month on a set date regardless of whether markets are up or down.',
      bestFor: 'Salaried earners, beginners, and volatile market phases.',
      risk: 'Low emotional risk; eliminates bad timing mistakes.',
      example: '₹5,000 auto-debited on the 5th of every month into Nifty 50.',
    },
    conceptB: {
      name: 'Lumpsum Investment',
      tag: 'All-In Single Deposit',
      description: 'Deploying a large sum of cash all at once in a single transaction on a single trading day.',
      bestFor: 'Windfalls, annual bonuses, or deep market crashes (-25% corrections).',
      risk: 'High psychological regret if the market drops 10% the following week.',
      example: 'Investing an entire ₹2,00,000 annual festival bonus at once.',
    },
    verdict:
      'For regular monthly income earners, SIP wins 9 times out of 10 by removing emotion and market timing stress. If you have a large sudden windfall, consider a Systematic Transfer Plan (STP) spreading it over 6-12 months.',
  },
  {
    id: 'fd-vs-debt-fund',
    title: 'Bank FD vs Debt Mutual Fund',
    badge: 'SAFETY & LIQUIDITY',
    conceptA: {
      name: 'Bank Fixed Deposit (FD)',
      tag: 'Guaranteed Nominal Return',
      description: 'Lend money to a scheduled commercial bank for a set period at a fixed, guaranteed interest rate.',
      bestFor: 'Zero risk tolerance, emergency cash, and senior citizen pensions.',
      risk: 'Virtually zero credit risk up to ₹5 Lakhs (DICGC insured); inflation risk.',
      example: '₹1,00,000 locked for 1 year in SBI at 6.8% guaranteed.',
    },
    conceptB: {
      name: 'Debt Mutual Fund (Liquid / Overnight)',
      tag: 'Flexible Market Debt',
      description: 'Pools money to buy ultra-short government treasury bills, certificates of deposit, and AAA corporate bonds.',
      bestFor: 'High liquidity needs (T+1 instant redemption) and parking money between investments.',
      risk: 'Mild interest rate & credit risk; no guaranteed returns, but historically steady.',
      example: 'Parking surplus business cash in an Overnight Fund earning 6.5%.',
    },
    verdict:
      'Bank FDs win for absolute peace of mind and guaranteed returns for conservative savers. Debt/Liquid funds win when you need flexibility to withdraw anytime without breaking an FD penalty.',
  },
  {
    id: 'active-vs-passive',
    title: 'Active Fund vs Index ETF',
    badge: 'PORTFOLIO STRATEGY',
    conceptA: {
      name: 'Active Mutual Fund',
      tag: 'Fund Manager Stock-Picker',
      description: 'A professional fund manager and research team pick select stocks trying to outperform the benchmark index.',
      bestFor: 'Small-cap and mid-cap spaces where informational inefficiencies exist.',
      risk: 'Higher expense ratio (1.0% - 2.0%); risk of underperforming the market index.',
      example: 'A flexi-cap fund charging 1.2% expense ratio.',
    },
    conceptB: {
      name: 'Passive Index Fund / ETF',
      tag: 'Low-Cost Market Mirror',
      description: 'A rule-based fund that automatically buys and holds the exact stocks in an index (e.g. Nifty 50).',
      bestFor: 'Large-cap investing, core long-term retirement portfolios.',
      risk: 'Mirror risk (falls with the market), but has ultra-low expense ratio (0.1% - 0.2%).',
      example: 'UTI Nifty 50 Index Fund charging only 0.18% expense ratio.',
    },
    verdict:
      'Over 80% of active large-cap fund managers fail to beat the Nifty 50 index over 10-year horizons after fees. Low-cost passive Index Funds and ETFs are the proven best foundation for most retail investors.',
  },
  {
    id: 'credit-vs-debit',
    title: 'Credit Card vs Debit Card',
    badge: 'DAILY CASH FLOW',
    conceptA: {
      name: 'Credit Card',
      tag: 'Bank’s Money (30-50 Day Loan)',
      description: 'The bank pays the merchant upfront and bills you at month end. You get reward points, fraud safety, and interest-free float.',
      bestFor: 'Disciplined spenders who pay 100% of their bill every month on time.',
      risk: 'Dangerous debt trap (40%+ APR) if you carry a balance or pay only the minimum.',
      example: 'Paying ₹4,000 for flights, earning 200 reward points, and paying bill 40 days later.',
    },
    conceptB: {
      name: 'Debit Card',
      tag: 'Your Own Bank Balance',
      description: 'Draws funds directly and immediately from your personal savings bank account at the moment of swipe.',
      bestFor: 'People who struggle with impulse spending and want strict budget boundaries.',
      risk: 'If compromised, real cash leaves your bank account immediately; zero credit building.',
      example: 'Swiping at the grocery store, deducting ₹1,500 instantly from your balance.',
    },
    verdict:
      'If you have ironclad discipline to never spend money you do not have in your bank and pay 100% of the bill on time, Credit Cards are mathematically superior due to fraud protection, credit building, and rewards.',
  },
  {
    id: 'term-vs-endowment',
    title: 'Term Insurance vs Endowment Policy',
    badge: 'LIFE PROTECTION',
    conceptA: {
      name: 'Pure Term Insurance',
      tag: '100% Pure Protection',
      description: 'You pay a small annual premium for a massive financial payout (e.g. ₹1 Crore) strictly if you pass away during the term.',
      bestFor: 'Breadwinners with family dependents who need large financial shields.',
      risk: 'Zero money returned if you survive the term (like car insurance).',
      example: 'A 26-year-old securing ₹1 Crore life cover for only ₹850 per month.',
    },
    conceptB: {
      name: 'Traditional Endowment / LIC Plan',
      tag: 'Insurance + Poor Investment Mix',
      description: 'Blends life insurance with a guaranteed payout at maturity, marketed as "Money Back" or "Savings Plan".',
      bestFor: 'Conservative savers who need forced savings and fear losing premium.',
      risk: 'Very low insurance cover (often only 10x premium) and dismal 4-5% annual returns.',
      example: 'Paying ₹50,000/year for 20 years to get only ₹7 Lakhs life cover and 5% return.',
    },
    verdict:
      'Never mix insurance with investments! Buy a pure Term Plan for massive life cover at peanuts cost, and invest the remaining difference into equity mutual funds. You will end up with 5x more wealth and 10x more protection.',
  },
];

// =================================================================
// DAILY FINANCE CHALLENGES
// =================================================================
export const DAILY_CHALLENGES: DailyFinanceChallenge[] = [
  {
    id: 'dc-inflation-shield',
    title: 'The Samosa Price Spike (Inflation Defense)',
    question: 'Your favorite college canteen samosa cost ₹10 in 2015. Today in 2026, it costs ₹25. If your cash savings are earning 3.5% in a basic savings account while food inflation runs at 7%, what is the mathematically sound action?',
    context: 'Headline consumer inflation is running hotter than standard bank deposit interest rates.',
    options: [
      {
        id: 'opt-a',
        text: 'Keep 100% of your net worth in paper cash at home to avoid bank fees',
        isCorrect: false,
        explanation: 'Cash has 0% interest, meaning you lose 7% real purchasing power every single year.',
      },
      {
        id: 'opt-b',
        text: 'Maintain 3-6 months liquid buffer, and allocate long-term surplus into productive equity index funds and gold',
        isCorrect: true,
        explanation: 'Spot on! Productive business equities raise prices alongside inflation, protecting your long-term purchasing power.',
      },
      {
        id: 'opt-c',
        text: 'Borrow money at 14% to buy luxury electronics before they get more expensive',
        isCorrect: false,
        explanation: 'Borrowing at high interest rates for depreciating consumer goods causes severe debt distress.',
      },
    ],
    xpReward: 100,
  },
  {
    id: 'dc-credit-score',
    title: 'The 95% Limit Mistake (Credit Health)',
    question: 'Your bank gave you a brand new credit card with a ₹1,00,000 credit limit. Your friends say you should swipe ₹95,000 this weekend to get maximum reward points. What will this do to your CIBIL score?',
    context: 'Credit bureaus look closely at your Credit Utilization Ratio (CUR) every single billing cycle.',
    options: [
      {
        id: 'opt-a',
        text: 'Your CIBIL score will soar because high spending proves you are wealthy',
        isCorrect: false,
        explanation: 'Lenders view maxing out cards as a sign of financial distress and credit-hungriness, which damages your score.',
      },
      {
        id: 'opt-b',
        text: 'Your CIBIL score will drop because your utilization ratio hit 95% (recommended is under 30%)',
        isCorrect: true,
        explanation: 'Correct! Maintaining credit utilization under 30% (under ₹30,000 on a 1 Lakh limit) keeps your credit score in the prime 750+ zone.',
      },
      {
        id: 'opt-c',
        text: 'Credit utilization has zero mathematical influence on CIBIL ratings',
        isCorrect: false,
        explanation: 'Utilization makes up nearly 30% of your total credit score calculation.',
      },
    ],
    xpReward: 100,
  },
  {
    id: 'dc-sip-dip',
    title: 'Market Drops 15%: Stop or Continue SIP?',
    question: 'The stock market drops 15% in two weeks due to global economic tensions. Your monthly ₹5,000 mutual fund SIP is scheduled to be debited tomorrow. What is the smartest long-term decision?',
    context: 'Many retail beginners panic and stop their SIPs when headlines turn red.',
    options: [
      {
        id: 'opt-a',
        text: 'Pause and cancel your SIP immediately until the market reaches an all-time high again',
        isCorrect: false,
        explanation: 'Pausing in a dip means you miss buying units on sale, and then you end up buying only when prices are expensive at the top.',
      },
      {
        id: 'opt-b',
        text: 'Let the SIP run as normal, or even add a small top-up if you have spare cash',
        isCorrect: true,
        explanation: 'Bingo! Rupee cost averaging means your ₹5,000 purchases MORE mutual fund units at discounted prices, supercharging future returns.',
      },
      {
        id: 'opt-c',
        text: 'Redeem all your units immediately into cash to lock in the paper loss',
        isCorrect: false,
        explanation: 'Redeeming locks in temporary market fluctuations into permanent, unrecoverable capital losses.',
      },
    ],
    xpReward: 100,
  },
];
