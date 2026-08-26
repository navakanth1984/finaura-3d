/**
 * Advanced EMI & Financial Computation Engine
 * Complies with Reserve Bank of India (RBI) circulars for APR & Key Fact Statements (KFS).
 */

export interface EMISettings {
  principal: number;
  annualInterestRate: number;
  tenureYears: number;
}

export interface AmortizationEntry {
  month: number;
  year: number;
  emi: number;
  principalComponent: number;
  interestComponent: number;
  outstandingBalance: number;
}

export interface EMIResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  monthlyRate: number;
  apr: number;
  processingFee: number;
  amortization: AmortizationEntry[];
}

export interface PrepaymentResult {
  originalTotalInterest: number;
  newTotalInterest: number;
  interestSaved: number;
  originalTenureMonths: number;
  newTenureMonths: number;
  monthsSaved: number;
  yearsSaved: number;
}

export function calculateEMI(settings: EMISettings, processingFeePercent: number = 0.5): EMIResult {
  const { principal, annualInterestRate, tenureYears } = settings;

  if (!Number.isFinite(tenureYears) || tenureYears <= 0) {
    throw new RangeError(`tenureYears must be a positive number, received ${tenureYears}`);
  }
  if (!Number.isFinite(principal) || principal < 0) {
    throw new RangeError(`principal must be a non-negative number, received ${principal}`);
  }
  if (!Number.isFinite(annualInterestRate) || annualInterestRate < 0) {
    throw new RangeError(`annualInterestRate must be a non-negative number, received ${annualInterestRate}`);
  }
  if (!Number.isFinite(processingFeePercent) || processingFeePercent < 0) {
    throw new RangeError(`processingFeePercent must be a non-negative number, received ${processingFeePercent}`);
  }

  // Edge case: zero principal → zero EMI
  if (principal === 0) {
    return {
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
      monthlyRate: 0,
      apr: 0,
      processingFee: 0,
      amortization: [],
    };
  }

  const monthlyRate = annualInterestRate / 12 / 100;
  const tenureMonths = tenureYears * 12;

  const processingFee = Math.round((principal * processingFeePercent) / 100);

  if (monthlyRate === 0) {
    const emi = principal / tenureMonths;
    return {
      emi: Math.round(emi),
      totalInterest: 0,
      totalPayment: principal,
      monthlyRate: 0,
      apr: 0,
      processingFee,
      amortization: generateSchedule(principal, 0, emi, tenureMonths),
    };
  }

  const onePlusRN = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * onePlusRN) / (onePlusRN - 1);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;
  const effectivePrincipal = principal - processingFee;
  const apr = effectivePrincipal > 0 ? calculateAPR(effectivePrincipal, emi, tenureMonths) : 0;

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    monthlyRate,
    apr: Math.round(apr * 100) / 100,
    processingFee,
    amortization: generateSchedule(principal, monthlyRate, emi, tenureMonths),
  };
}

function generateSchedule(
  principal: number,
  monthlyRate: number,
  emi: number,
  tenureMonths: number
): AmortizationEntry[] {
  const schedule: AmortizationEntry[] = [];
  let outstanding = principal;

  for (let month = 1; month <= tenureMonths; month++) {
    const interestComponent = outstanding * monthlyRate;
    const principalComponent = emi - interestComponent;
    outstanding -= principalComponent;

    schedule.push({
      month,
      year: Math.ceil(month / 12),
      emi: Math.round(emi),
      principalComponent: Math.round(principalComponent),
      interestComponent: Math.round(interestComponent),
      outstandingBalance: Math.max(0, Math.round(outstanding)),
    });
  }

  return schedule;
}

/**
 * Newton-Raphson Internal Rate of Return (IRR) to calculate RBI Annual Percentage Rate (APR)
 */
function calculateAPR(netPrincipal: number, emi: number, tenureMonths: number): number {
  if (!Number.isFinite(tenureMonths) || tenureMonths <= 0) {
    throw new RangeError('tenureMonths must be positive');
  }
  if (!Number.isFinite(netPrincipal) || netPrincipal <= 0) {
    throw new RangeError('netPrincipal must be positive');
  }
  if (!Number.isFinite(emi) || emi <= 0) {
    throw new RangeError('emi must be positive');
  }

  let monthlyRate = emi / netPrincipal;
  const tolerance = 0.0000001;

  for (let i = 0; i < 100; i++) {
    let f = 0;
    let fPrime = 0;
    for (let t = 1; t <= tenureMonths; t++) {
      const discount = Math.pow(1 + monthlyRate, t);
      f += emi / discount;
      fPrime -= (t * emi) / (discount * (1 + monthlyRate));
    }
    f -= netPrincipal;
    if (Math.abs(f) < tolerance) break;
    if (fPrime === 0) break;
    monthlyRate = monthlyRate - f / fPrime;
    if (monthlyRate <= 0) {
      monthlyRate = 0.001;
      break;
    }
  }

  return monthlyRate * 12 * 100;
}

/**
 * Prepayment & Tenure Reduction Simulator
 */
export function calculatePrepayment(
  settings: EMISettings,
  extraMonthlyPayment: number = 0,
  oneTimeLumpSum: number = 0,
  lumpSumMonth: number = 12
): PrepaymentResult {
  const { principal, annualInterestRate, tenureYears } = settings;

  if (!Number.isFinite(tenureYears) || tenureYears <= 0) {
    throw new RangeError(`tenureYears must be a positive number, received ${tenureYears}`);
  }
  if (!Number.isFinite(principal) || principal < 0) {
    throw new RangeError(`principal must be a non-negative number, received ${principal}`);
  }
  if (!Number.isFinite(annualInterestRate) || annualInterestRate < 0) {
    throw new RangeError(`annualInterestRate must be a non-negative number, received ${annualInterestRate}`);
  }
  if (!Number.isFinite(extraMonthlyPayment) || extraMonthlyPayment < 0) {
    throw new RangeError(`extraMonthlyPayment must be a non-negative number, received ${extraMonthlyPayment}`);
  }
  if (!Number.isFinite(oneTimeLumpSum) || oneTimeLumpSum < 0) {
    throw new RangeError(`oneTimeLumpSum must be a non-negative number, received ${oneTimeLumpSum}`);
  }
  if (!Number.isFinite(lumpSumMonth) || lumpSumMonth <= 0) {
    throw new RangeError(`lumpSumMonth must be a positive integer, received ${lumpSumMonth}`);
  }

  if (principal === 0) {
    return {
      originalTotalInterest: 0,
      newTotalInterest: 0,
      interestSaved: 0,
      originalTenureMonths: tenureYears * 12,
      newTenureMonths: 0,
      monthsSaved: tenureYears * 12,
      yearsSaved: tenureYears,
    };
  }

  const monthlyRate = annualInterestRate / 12 / 100;
  const originalTenureMonths = tenureYears * 12;

  if (monthlyRate === 0) {
    const baseEmi = principal / originalTenureMonths;
    let outstanding = principal;
    let newTenureMonths = 0;
    while (outstanding > 0 && newTenureMonths < originalTenureMonths * 2) {
      newTenureMonths++;
      let emiPaid = baseEmi + extraMonthlyPayment;
      if (newTenureMonths === lumpSumMonth) {
        emiPaid += oneTimeLumpSum;
      }
      outstanding -= emiPaid;
      if (outstanding <= 0) break;
    }
    const monthsSaved = Math.max(0, originalTenureMonths - newTenureMonths);
    return {
      originalTotalInterest: 0,
      newTotalInterest: 0,
      interestSaved: 0,
      originalTenureMonths,
      newTenureMonths,
      monthsSaved,
      yearsSaved: Math.round((monthsSaved / 12) * 10) / 10,
    };
  }

  const onePlusRN = Math.pow(1 + monthlyRate, originalTenureMonths);
  const baseEmi = (principal * monthlyRate * onePlusRN) / (onePlusRN - 1);
  const originalTotalInterest = baseEmi * originalTenureMonths - principal;

  let outstanding = principal;
  let newTotalInterest = 0;
  let newTenureMonths = 0;

  while (outstanding > 0 && newTenureMonths < originalTenureMonths * 2) {
    newTenureMonths++;
    const interest = outstanding * monthlyRate;
    newTotalInterest += interest;

    let emiPaid = baseEmi + extraMonthlyPayment;
    if (newTenureMonths === lumpSumMonth) {
      emiPaid += oneTimeLumpSum;
    }

    const principalPaid = emiPaid - interest;
    outstanding -= principalPaid;

    if (outstanding <= 0) break;
  }

  const interestSaved = Math.max(0, originalTotalInterest - newTotalInterest);
  const monthsSaved = Math.max(0, originalTenureMonths - newTenureMonths);
  const yearsSaved = Math.round((monthsSaved / 12) * 10) / 10;

  return {
    originalTotalInterest: Math.round(originalTotalInterest),
    newTotalInterest: Math.round(newTotalInterest),
    interestSaved: Math.round(interestSaved),
    originalTenureMonths,
    newTenureMonths,
    monthsSaved,
    yearsSaved,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatLakhCrore(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return formatINR(amount);
}
