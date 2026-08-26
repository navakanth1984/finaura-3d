/**
 * Loan Product Configuration & Indian Market Standards
 * Compliant with Consumer Protection Act 2019 and Trade Marks Act 1999 nominative fair use.
 */

export type LoanType =
  | 'home'
  | 'personal'
  | 'car'
  | 'education'
  | 'business';

export type HomePropertyType = 
  | 'villa' 
  | 'bungalow' 
  | 'apartment' 
  | 'rowhouse' 
  | 'plot' 
  | 'commercial';

export interface LoanProduct {
  id: LoanType;
  name: string;
  badge: string;
  icon: string;
  headline: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  defaultAmount: number;
  amountStep: number;
  minRate: number;
  maxRate: number;
  defaultRate: number;
  rateStep: number;
  minTenureYears: number;
  maxTenureYears: number;
  defaultTenureYears: number;
  processingFeePercent: number;
  hasPropertySelector: boolean;
  hasPMAY: boolean;
  hasDefence: boolean;
  hasCollateral: boolean;
  hasCoApplicant: boolean;
  hasMoratorium: boolean;
  productReportTitle: string;
  keywords: string[];
}

export const LOAN_PRODUCTS: Record<LoanType, LoanProduct> = {
  home: {
    id: 'home',
    name: 'Home Loan',
    badge: 'PMAY 2.0 Eligible',
    icon: 'Home',
    headline: 'Acquire, Build, or Expand Your Sanctuary',
    description: 'Indicative interest rates starting from 8.35% with flexible repayment tenures up to 30 years and special subsidies under PMAY 2.0.',
    minAmount: 500000,
    maxAmount: 100000000,
    defaultAmount: 7500000,
    amountStep: 100000,
    minRate: 8.0,
    maxRate: 11.5,
    defaultRate: 8.5,
    rateStep: 0.05,
    minTenureYears: 5,
    maxTenureYears: 30,
    defaultTenureYears: 20,
    processingFeePercent: 0.35,
    hasPropertySelector: true,
    hasPMAY: true,
    hasDefence: true,
    hasCollateral: true,
    hasCoApplicant: true,
    hasMoratorium: false,
    productReportTitle: 'Home Loan Indicative EMI & APR Summary',
    keywords: ['home loan EMI calculator', 'housing finance India', 'PMAY 2.0 subsidy', 'SBI home loan', 'HDFC home loan'],
  },
  personal: {
    id: 'personal',
    name: 'Personal Loan',
    badge: '100% Paperless • Quick Disbursal',
    icon: 'Coins',
    headline: 'Instant Unsecured Capital for Life Goals',
    description: 'Collateral-free liquidity for emergencies, travel, weddings, or debt consolidation subject to lender underwriting criteria.',
    minAmount: 50000,
    maxAmount: 4000000,
    defaultAmount: 1000000,
    amountStep: 25000,
    minRate: 10.25,
    maxRate: 21.0,
    defaultRate: 11.5,
    rateStep: 0.25,
    minTenureYears: 1,
    maxTenureYears: 7,
    defaultTenureYears: 4,
    processingFeePercent: 1.5,
    hasPropertySelector: false,
    hasPMAY: false,
    hasDefence: true,
    hasCollateral: false,
    hasCoApplicant: false,
    hasMoratorium: false,
    productReportTitle: 'Personal Loan Indicative EMI & APR Summary',
    keywords: ['instant personal loan', 'unsecured loan online', 'low interest personal loan India', 'quick cash loan'],
  },
  car: {
    id: 'car',
    name: 'Auto / Car Loan',
    badge: 'EV Special 0.25% Off',
    icon: 'Car',
    headline: 'Drive Your Dream Luxury or Electric Vehicle',
    description: 'Competitive financing for brand new luxury sedans, electric vehicles, and verified pre-owned cars with attractive residual value options.',
    minAmount: 200000,
    maxAmount: 15000000,
    defaultAmount: 2500000,
    amountStep: 50000,
    minRate: 8.65,
    maxRate: 14.5,
    defaultRate: 9.15,
    rateStep: 0.1,
    minTenureYears: 1,
    maxTenureYears: 8,
    defaultTenureYears: 5,
    processingFeePercent: 0.75,
    hasPropertySelector: false,
    hasPMAY: false,
    hasDefence: true,
    hasCollateral: true,
    hasCoApplicant: true,
    hasMoratorium: false,
    productReportTitle: 'Vehicle Financing Indicative EMI & APR Summary',
    keywords: ['car loan EMI calculator', 'electric vehicle financing', 'luxury auto loan', 'zero downpayment car loan'],
  },
  education: {
    id: 'education',
    name: 'Education Loan',
    badge: 'Global Univs • Study Abroad',
    icon: 'GraduationCap',
    headline: 'Fund Ivy League & Premier Global Higher Ed',
    description: 'Coverage for tuition, accommodation, and living costs across USA, UK, Canada, and India with course duration + 12 months moratorium options.',
    minAmount: 200000,
    maxAmount: 15000000,
    defaultAmount: 4500000,
    amountStep: 50000,
    minRate: 8.75,
    maxRate: 13.5,
    defaultRate: 9.85,
    rateStep: 0.15,
    minTenureYears: 5,
    maxTenureYears: 15,
    defaultTenureYears: 10,
    processingFeePercent: 0.5,
    hasPropertySelector: false,
    hasPMAY: false,
    hasDefence: true,
    hasCollateral: true,
    hasCoApplicant: true,
    hasMoratorium: true,
    productReportTitle: 'Higher Education Loan Indicative EMI & APR Summary',
    keywords: ['study abroad loan', 'education loan without collateral', 'student loan calculator India', 'US university loan'],
  },
  business: {
    id: 'business',
    name: 'Business Loan',
    badge: 'MSME & Working Capital',
    icon: 'Briefcase',
    headline: 'Fuel Enterprise Scale & Working Capital',
    description: 'Customized credit lines, machinery financing, and invoice discounting for startups, MSMEs, and established corporate enterprises.',
    minAmount: 500000,
    maxAmount: 50000000,
    defaultAmount: 5000000,
    amountStep: 100000,
    minRate: 11.5,
    maxRate: 22.0,
    defaultRate: 13.5,
    rateStep: 0.25,
    minTenureYears: 1,
    maxTenureYears: 10,
    defaultTenureYears: 5,
    processingFeePercent: 1.25,
    hasPropertySelector: false,
    hasPMAY: false,
    hasDefence: false,
    hasCollateral: true,
    hasCoApplicant: true,
    hasMoratorium: false,
    productReportTitle: 'Commercial & MSME Loan Indicative EMI & APR Summary',
    keywords: ['business loan EMI', 'MSME loan scheme', 'working capital finance', 'collateral free business loan'],
  },
};

export const PROPERTY_CONFIGS: Record<HomePropertyType, { name: string; desc: string; multiplier: number }> = {
  villa: { name: 'Ultra-Luxury Villa', desc: 'Gated independent estate with private landscape', multiplier: 1.5 },
  bungalow: { name: 'Independent Bungalow', desc: 'Freehold residential bungalow with open frontage', multiplier: 1.25 },
  apartment: { name: 'High-Rise Luxury Flat', desc: 'Modern urban gated tower with clubhouse amenities', multiplier: 1.0 },
  rowhouse: { name: 'Premium Row House', desc: 'Duplex architecture with community infrastructure', multiplier: 1.1 },
  plot: { name: 'Residential Plot / Land', desc: 'Clear-title gated plotting development ready for construction', multiplier: 0.8 },
  commercial: { name: 'Commercial Office Space', desc: 'Grade-A retail or IT park commercial unit', multiplier: 1.35 },
};

export interface LenderQuote {
  name: string;
  logoText: string;
  rateRange: string;
  baseRate: number;
  processingFee: string;
  approvalOdds: string;
  tag: string;
}

export const LENDERS: LenderQuote[] = [
  { name: 'State Bank of India', logoText: 'SBI', rateRange: '8.35% - 9.15%', baseRate: 8.35, processingFee: '₹2,500 flat', approvalOdds: 'High (Prime Eligibility)', tag: 'Lowest Rate' },
  { name: 'HDFC Bank', logoText: 'HDFC', rateRange: '8.45% - 9.30%', baseRate: 8.45, processingFee: '0.25% (Max ₹5k)', approvalOdds: 'High (Subject to Underwriting)', tag: 'Digital Flow' },
  { name: 'ICICI Bank', logoText: 'ICICI', rateRange: '8.60% - 9.45%', baseRate: 8.60, processingFee: '0.35%', approvalOdds: 'High (Subject to Underwriting)', tag: 'Instant e-KYC' },
  { name: 'Axis Bank', logoText: 'AXIS', rateRange: '8.65% - 9.60%', baseRate: 8.65, processingFee: '0.40%', approvalOdds: 'Medium (Standard Eligibility)', tag: '12 EMI Waiver' },
  { name: 'Kotak Mahindra', logoText: 'KOTAK', rateRange: '8.70% - 9.50%', baseRate: 8.70, processingFee: '0.30%', approvalOdds: 'Medium (Standard Eligibility)', tag: 'Zero Prepayment' },
  { name: 'Bank of Baroda', logoText: 'BOB', rateRange: '8.40% - 9.20%', baseRate: 8.40, processingFee: 'Zero Fee Offer', approvalOdds: 'Medium (Standard Eligibility)', tag: 'PSU Trust' },
];
