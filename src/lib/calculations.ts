/**
 * Accurate financial calculation engines for FinVera
 * Educational estimates based on industry standard financial formulas.
 */

export interface GrowthDataPoint {
  year: number;
  totalInvested: number;
  estimatedReturns: number;
  totalValue: number;
}

export interface CompoundInterestResult {
  totalInvested: number;
  estimatedReturns: number;
  totalValue: number;
  yearlyBreakdown: GrowthDataPoint[];
}

/**
 * Compound Interest Calculator
 * Compounded monthly with optional monthly recurring contribution.
 * A = P*(1 + r/n)^(n*t) + PMT * [((1 + r/n)^(n*t) - 1) / (r/n)] * (1 + r/n)
 */
export function calculateCompoundInterest(
  initialAmount: number,
  monthlyContribution: number,
  years: number,
  expectedReturnPercent: number
): CompoundInterestResult {
  const p = Math.max(0, initialAmount);
  const pmt = Math.max(0, monthlyContribution);
  const t = Math.max(1, Math.min(50, years));
  const r = Math.max(0, expectedReturnPercent) / 100;
  const n = 12; // Monthly compounding
  const monthlyRate = r / n;

  const yearlyBreakdown: GrowthDataPoint[] = [];

  for (let y = 1; y <= t; y++) {
    const totalMonths = y * n;
    const invested = p + pmt * totalMonths;

    let fvPrincipal = p;
    let fvMonthly = 0;

    if (monthlyRate === 0) {
      fvPrincipal = p;
      fvMonthly = pmt * totalMonths;
    } else {
      fvPrincipal = p * Math.pow(1 + monthlyRate, totalMonths);
      fvMonthly =
        pmt *
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
        (1 + monthlyRate);
    }

    const totalVal = Math.round(fvPrincipal + fvMonthly);
    const returns = Math.max(0, totalVal - invested);

    yearlyBreakdown.push({
      year: y,
      totalInvested: Math.round(invested),
      estimatedReturns: Math.round(returns),
      totalValue: totalVal,
    });
  }

  const final = yearlyBreakdown[yearlyBreakdown.length - 1];

  return {
    totalInvested: final.totalInvested,
    estimatedReturns: final.estimatedReturns,
    totalValue: final.totalValue,
    yearlyBreakdown,
  };
}

export interface SipResult {
  totalInvested: number;
  estimatedReturns: number;
  totalValue: number;
  yearlyBreakdown: GrowthDataPoint[];
}

/**
 * SIP Calculator (Systematic Investment Plan)
 * Standard mutual fund SIP compounding monthly.
 * M = P * ((1 + i)^n - 1) / i * (1 + i)
 */
export function calculateSIP(
  monthlySip: number,
  years: number,
  expectedReturnPercent: number
): SipResult {
  const p = Math.max(100, monthlySip);
  const t = Math.max(1, Math.min(40, years));
  const annualRate = Math.max(0.1, expectedReturnPercent) / 100;
  const i = annualRate / 12;

  const yearlyBreakdown: GrowthDataPoint[] = [];

  for (let y = 1; y <= t; y++) {
    const n = y * 12;
    const invested = p * n;
    let totalValue = 0;

    if (i === 0) {
      totalValue = invested;
    } else {
      totalValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    }

    const val = Math.round(totalValue);
    const returns = Math.max(0, val - invested);

    yearlyBreakdown.push({
      year: y,
      totalInvested: Math.round(invested),
      estimatedReturns: Math.round(returns),
      totalValue: val,
    });
  }

  const final = yearlyBreakdown[yearlyBreakdown.length - 1];

  return {
    totalInvested: final.totalInvested,
    estimatedReturns: final.estimatedReturns,
    totalValue: final.totalValue,
    yearlyBreakdown,
  };
}

export interface InflationResult {
  futureCost: number;
  purchasingPowerLossPercent: number;
  equivalentTodayPower: number;
  yearlyBreakdown: { year: number; futureCost: number; purchasingPower: number }[];
}

/**
 * Inflation Calculator
 * FV = PV * (1 + r)^t
 */
export function calculateInflation(
  currentAmount: number,
  inflationRatePercent: number,
  years: number
): InflationResult {
  const pv = Math.max(0, currentAmount);
  const r = Math.max(0, inflationRatePercent) / 100;
  const t = Math.max(1, Math.min(50, years));

  const yearlyBreakdown: { year: number; futureCost: number; purchasingPower: number }[] = [];

  for (let y = 1; y <= t; y++) {
    const fv = pv * Math.pow(1 + r, y);
    const pp = pv / Math.pow(1 + r, y);
    yearlyBreakdown.push({
      year: y,
      futureCost: Math.round(fv),
      purchasingPower: Math.round(pp),
    });
  }

  const final = yearlyBreakdown[yearlyBreakdown.length - 1];
  const lossPercent = pv > 0 ? ((pv - final.purchasingPower) / pv) * 100 : 0;

  return {
    futureCost: final.futureCost,
    purchasingPowerLossPercent: Math.min(100, Math.max(0, Math.round(lossPercent))),
    equivalentTodayPower: final.purchasingPower,
    yearlyBreakdown,
  };
}

export interface EmiResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  principalPercent: number;
  interestPercent: number;
  yearlyBreakdown: { year: number; balance: number; principalPaid: number; interestPaid: number }[];
}

/**
 * EMI Calculator
 * EMI = P * r * (1+r)^n / ((1+r)^n - 1)
 */
export function calculateEMI(
  loanAmount: number,
  interestRatePercent: number,
  tenureYears: number
): EmiResult {
  const p = Math.max(1000, loanAmount);
  const annualRate = Math.max(0.1, interestRatePercent);
  const tenureMonths = Math.max(1, Math.min(40, tenureYears)) * 12;
  const r = annualRate / (12 * 100);

  const emi =
    r === 0
      ? p / tenureMonths
      : (p * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);

  const totalPayment = emi * tenureMonths;
  const totalInterest = Math.max(0, totalPayment - p);

  // Amortization breakdown per year
  const yearlyBreakdown: { year: number; balance: number; principalPaid: number; interestPaid: number }[] = [];
  let remainingBalance = p;

  for (let y = 1; y <= Math.ceil(tenureMonths / 12); y++) {
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (let m = 1; m <= 12; m++) {
      if (remainingBalance <= 0) break;
      const interestForMonth = remainingBalance * r;
      const principalForMonth = Math.min(remainingBalance, emi - interestForMonth);
      yearInterest += interestForMonth;
      yearPrincipal += principalForMonth;
      remainingBalance -= principalForMonth;
    }

    yearlyBreakdown.push({
      year: y,
      balance: Math.max(0, Math.round(remainingBalance)),
      principalPaid: Math.round(yearPrincipal),
      interestPaid: Math.round(yearInterest),
    });
  }

  const principalPercent = totalPayment > 0 ? (p / totalPayment) * 100 : 100;
  const interestPercent = 100 - principalPercent;

  return {
    monthlyEmi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    principalPercent: Math.round(principalPercent),
    interestPercent: Math.round(interestPercent),
    yearlyBreakdown,
  };
}

export interface SavingsGoalResult {
  projectedSavings: number;
  targetAmount: number;
  isOnTrack: boolean;
  shortfallOrSurplus: number;
  requiredMonthlyContribution: number;
  currentMonthlyContribution: number;
}

/**
 * Savings Goal Calculator
 * Solves whether current savings + monthly contributions at expected return reach the target.
 * Also calculates the exact monthly contribution required to hit the target.
 */
export function calculateSavingsGoal(
  targetAmount: number,
  currentSavings: number,
  monthlyContribution: number,
  expectedReturnPercent: number,
  targetDurationYears: number
): SavingsGoalResult {
  const target = Math.max(1000, targetAmount);
  const current = Math.max(0, currentSavings);
  const pmt = Math.max(0, monthlyContribution);
  const years = Math.max(1, Math.min(40, targetDurationYears));
  const r = Math.max(0, expectedReturnPercent) / 100;
  const n = years * 12;
  const i = r / 12;

  // FV of initial savings
  const fvCurrent = i === 0 ? current : current * Math.pow(1 + i, n);

  // FV of planned monthly contributions
  let fvPmt = 0;
  if (i === 0) {
    fvPmt = pmt * n;
  } else {
    fvPmt = pmt * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  }

  const projectedSavings = Math.round(fvCurrent + fvPmt);
  const isOnTrack = projectedSavings >= target;
  const shortfallOrSurplus = Math.round(projectedSavings - target);

  // Calculate required monthly contribution to reach target
  const remainingNeededFromSip = target - fvCurrent;
  let requiredMonthlyContribution = 0;

  if (remainingNeededFromSip <= 0) {
    requiredMonthlyContribution = 0; // Existing principal will already exceed target
  } else {
    if (i === 0) {
      requiredMonthlyContribution = Math.ceil(remainingNeededFromSip / n);
    } else {
      const annuityFactor = ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      requiredMonthlyContribution = Math.ceil(remainingNeededFromSip / annuityFactor);
    }
  }

  return {
    projectedSavings,
    targetAmount: target,
    isOnTrack,
    shortfallOrSurplus,
    requiredMonthlyContribution,
    currentMonthlyContribution: pmt,
  };
}
