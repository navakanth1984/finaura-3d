import React, { useState, useMemo, useEffect, Suspense, lazy } from 'react';
import { 
  Home, 
  Coins, 
  Car, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Sliders, 
  ArrowRight, 
  FileText, 
  TrendingUp, 
  Percent, 
  Clock, 
  Download,
  Info
} from 'lucide-react';
import { 
  LOAN_PRODUCTS, 
  LoanType, 
  HomePropertyType, 
  PROPERTY_CONFIGS, 
  LoanProduct 
} from '../../lib/loan-products';
import { calculateEMI, formatINR, formatLakhCrore } from '../../lib/emi-engine';
import { sound } from '../../utils/audio';

const LoanSceneCanvas = lazy(() =>
  import('../3d/LoanSceneCanvas').then((m) => ({ default: m.LoanSceneCanvas }))
);

interface LoanCalculatorSectionProps {
  onApplyLeadClick: (product: LoanProduct, amount: number, emi: number, tenure: number) => void;
  onDownloadKfsClick: (product: LoanProduct, amount: number, rate: number, tenure: number) => void;
  onStateChange?: (state: {
    product: LoanProduct;
    amount: number;
    rate: number;
    tenureYears: number;
    emi: number;
  }) => void;
}

export const LoanCalculatorSection: React.FC<LoanCalculatorSectionProps> = ({
  onApplyLeadClick,
  onDownloadKfsClick,
  onStateChange,
}) => {
  const [selectedType, setSelectedType] = useState<LoanType>('home');
  const [propertyType, setPropertyType] = useState<HomePropertyType>('villa');
  const [hasPMAY, setHasPMAY] = useState(false);
  const [hasDefence, setHasDefence] = useState(false);
  const [cibilScore, setCibilScore] = useState<number>(780);

  const currentProduct = LOAN_PRODUCTS[selectedType];
  const isPrime = cibilScore >= 750;

  const [amount, setAmount] = useState(currentProduct.defaultAmount);
  const [rate, setRate] = useState(currentProduct.defaultRate);
  const [tenureYears, setTenureYears] = useState(currentProduct.defaultTenureYears);

  // Switch product and reset defaults
  const handleSelectProduct = (type: LoanType) => {
    sound.playClick(620);
    setSelectedType(type);
    const prod = LOAN_PRODUCTS[type];
    setAmount(prod.defaultAmount);
    setRate(prod.defaultRate);
    setTenureYears(prod.defaultTenureYears);
  };

  // Compute live EMI, APR, and Totals
  const emiResult = useMemo(() => {
    return calculateEMI({
      principal: amount,
      annualInterestRate: rate,
      tenureYears,
    }, currentProduct.processingFeePercent);
  }, [amount, rate, tenureYears, currentProduct.processingFeePercent]);

  // Sync state upward to parent (eliminating dual source of truth)
  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        product: currentProduct,
        amount,
        rate,
        tenureYears,
        emi: emiResult.emi,
      });
    }
  }, [currentProduct, amount, rate, tenureYears, emiResult.emi, onStateChange]);

  return (
    <section 
      id="loan-calculator" 
      aria-label="Structured Credit Facility Calculator"
      className="relative min-h-screen py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#bef264]" />
          STRUCTURED CREDIT ANALYTICS
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">
          Loan Structuring Engine.
        </h2>
        <p className="mt-4 text-neutral-300 text-base md:text-lg">
          Configure facility parameters, evaluate reducing-balance schedules, and benchmark indicative institutional spreads.
        </p>
      </div>

      {/* Product Selector Ribbon */}
      <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-3 overflow-x-auto pb-3 mb-8 sm:mb-10 no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0 scroll-smooth snap-x touch-pan-x">
        {(['home', 'personal', 'car', 'education', 'business'] as LoanType[]).map((type) => {
          const prod = LOAN_PRODUCTS[type];
          const isSelected = selectedType === type;
          return (
            <button
              key={type}
              onClick={() => handleSelectProduct(type)}
              className={`px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl font-display font-bold text-xs md:text-sm tracking-wider uppercase flex items-center gap-2 sm:gap-2.5 whitespace-nowrap transition-all duration-300 cursor-pointer min-h-[44px] snap-start ${
                isSelected
                  ? 'bg-[#bef264] text-black shadow-xl shadow-[#bef264]/20 scale-[1.02] sm:scale-105'
                  : 'glass-card text-neutral-300 border border-white/10 hover:border-white/25 hover:text-white'
              }`}
            >
              {type === 'home' && <Home className="w-4 h-4" />}
              {type === 'personal' && <Coins className="w-4 h-4" />}
              {type === 'car' && <Car className="w-4 h-4" />}
              {type === 'education' && <GraduationCap className="w-4 h-4" />}
              {type === 'business' && <Briefcase className="w-4 h-4" />}
              <span>{prod.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Sliders and Controls (7 cols) */}
        <div className="lg:col-span-7 p-5 sm:p-8 md:p-10 rounded-3xl glass-card-active border border-[#bef264]/40 shadow-2xl space-y-6 sm:space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono text-[#bef264] font-bold uppercase tracking-wider">{currentProduct.badge}</span>
              <h3 className="font-display text-2xl font-black text-white mt-1">{currentProduct.headline}</h3>
            </div>
            <span className="text-xs font-mono bg-black/60 px-3 py-1 rounded-full border border-white/10 text-neutral-300">
              Computed APR: <strong className="text-[#22d3ee]">{emiResult.apr}%</strong>
            </span>
          </div>

          {/* Property Selector for Home Loan */}
          {currentProduct.hasPropertySelector && (
            <div>
              <label className="block text-xs font-mono text-neutral-300 uppercase mb-3 font-bold tracking-wider">
                Property Classification
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(['villa', 'bungalow', 'apartment', 'rowhouse', 'plot', 'commercial'] as HomePropertyType[]).map((prop) => (
                  <button
                    key={prop}
                    onClick={() => {
                      sound.playClick(500);
                      setPropertyType(prop);
                    }}
                    className={`p-3 rounded-xl text-left text-xs font-mono transition-all cursor-pointer border ${
                      propertyType === prop
                        ? 'bg-[#bef264]/20 border-[#bef264] text-white font-bold'
                        : 'bg-black/40 border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-white capitalize font-semibold">{PROPERTY_CONFIGS[prop].name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Subsidy Toggles */}
          {(currentProduct.hasPMAY || currentProduct.hasDefence) && (
            <div className="flex flex-wrap gap-4 pt-2">
              {currentProduct.hasPMAY && (
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10 cursor-pointer text-xs font-mono">
                  <input
                    type="checkbox"
                    checked={hasPMAY}
                    onChange={(e) => {
                      sound.playClick(550);
                      setHasPMAY(e.target.checked);
                      if (e.target.checked) setRate((r) => Math.max(currentProduct.minRate, r - 0.5));
                    }}
                    className="accent-[#bef264] w-4 h-4 rounded cursor-pointer"
                  />
                  <span className="text-white font-bold">PMAY Interest Subsidy (-0.50%)</span>
                </label>
              )}

              {currentProduct.hasDefence && (
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10 cursor-pointer text-xs font-mono">
                  <input
                    type="checkbox"
                    checked={hasDefence}
                    onChange={(e) => {
                      sound.playClick(550);
                      setHasDefence(e.target.checked);
                      if (e.target.checked) setRate((r) => Math.max(currentProduct.minRate, r - 0.25));
                    }}
                    className="accent-[#bef264] w-4 h-4 rounded cursor-pointer"
                  />
                  <span className="text-white font-bold">Defence Personnel Concession (-0.25%)</span>
                </label>
              )}
            </div>
          )}

          {/* Slider 1: Loan Amount */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-400 uppercase font-bold tracking-wider">Facility Amount</span>
              <span className="text-2xl font-display font-black text-[#bef264] bg-black/60 px-4 py-1 rounded-xl border border-[#bef264]/30">
                {formatLakhCrore(amount)}
              </span>
            </div>
            <input
              type="range"
              min={currentProduct.minAmount}
              max={currentProduct.maxAmount}
              step={selectedType === 'home' ? 100000 : 25000}
              value={amount}
              onChange={(e) => {
                setAmount(parseInt(e.target.value));
                sound.playHover(400);
              }}
              className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#bef264]"
            />
            <div className="flex justify-between text-[11px] font-mono text-neutral-400">
              <span>{formatLakhCrore(currentProduct.minAmount)}</span>
              <span>{formatLakhCrore(currentProduct.maxAmount)}</span>
            </div>
          </div>

          {/* Slider 2: Interest Rate */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-400 uppercase font-bold tracking-wider">Indicative Annual Rate</span>
              <span className="text-2xl font-display font-black text-[#22d3ee] bg-black/60 px-4 py-1 rounded-xl border border-[#22d3ee]/30">
                {rate.toFixed(2)}% <span className="text-xs text-neutral-400 font-mono">p.a.</span>
              </span>
            </div>
            <input
              type="range"
              min={currentProduct.minRate}
              max={currentProduct.maxRate}
              step={0.05}
              value={rate}
              onChange={(e) => {
                setRate(parseFloat(e.target.value));
                sound.playHover(500);
              }}
              className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#22d3ee]"
            />
            <div className="flex justify-between text-[11px] font-mono text-neutral-400">
              <span>{currentProduct.minRate}%</span>
              <span>{currentProduct.maxRate}%</span>
            </div>
          </div>

          {/* Slider 3: Loan Tenure */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-400 uppercase font-bold tracking-wider">Repayment Tenure</span>
              <span className="text-xl font-display font-black text-[#c084fc] bg-black/60 px-4 py-1 rounded-xl border border-[#c084fc]/30">
                {tenureYears} Years <span className="text-xs text-neutral-400 font-mono">({tenureYears * 12} Mos)</span>
              </span>
            </div>
            <input
              type="range"
              min={currentProduct.minTenureYears}
              max={currentProduct.maxTenureYears}
              step={1}
              value={tenureYears}
              onChange={(e) => {
                setTenureYears(parseInt(e.target.value));
                sound.playHover(600);
              }}
              className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#c084fc]"
            />
            <div className="flex justify-between text-[11px] font-mono text-neutral-400">
              <span>{currentProduct.minTenureYears} Yr</span>
              <span>{currentProduct.maxTenureYears} Yrs</span>
            </div>
          </div>

          {/* Credit Profile Tier Selector */}
          <div className="pt-2 border-t border-white/10 space-y-2.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono text-neutral-300 uppercase font-bold tracking-wider">
                Borrower Credit Profile
              </label>
              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                isPrime ? 'bg-[#bef264]/10 text-[#bef264] border-[#bef264]/30' : 'bg-neutral-800 text-neutral-400 border-neutral-700'
              }`}>
                {isPrime ? 'PRIME ELIGIBILITY' : 'STANDARD ELIGIBILITY'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { score: 780, label: '750+ CIBIL', desc: 'Prime Spread' },
                { score: 720, label: '700–749 CIBIL', desc: 'Benchmark' },
                { score: 680, label: '<700 CIBIL', desc: 'Advisory' },
              ].map((tier) => (
                <button
                  key={tier.score}
                  type="button"
                  onClick={() => {
                    sound.playClick(600);
                    setCibilScore(tier.score);
                    if (tier.score >= 750) {
                      setRate((r) => Math.max(currentProduct.minRate, currentProduct.defaultRate - 0.25));
                    } else if (tier.score < 700) {
                      setRate((r) => Math.min(currentProduct.maxRate, currentProduct.defaultRate + 1.2));
                    } else {
                      setRate(currentProduct.defaultRate);
                    }
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    cibilScore === tier.score
                      ? 'bg-[#bef264]/20 border-[#bef264] text-white shadow-lg shadow-[#bef264]/10'
                      : 'bg-black/40 border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="font-mono text-xs font-bold text-white">{tier.label}</div>
                  <div className="text-[10px] font-mono text-neutral-400 truncate">{tier.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 3D Visualization & Action Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 3D Scene Viewport */}
          <div className="p-4 rounded-3xl glass-card-active border border-[#bef264]/30 shadow-2xl relative overflow-hidden bg-black/40 min-h-[300px]">
            <Suspense
              fallback={
                <div className="w-full h-80 flex flex-col items-center justify-center gap-2 text-neutral-500 font-mono text-xs">
                  <div className="w-6 h-6 border-2 border-[#bef264] border-t-transparent rounded-full animate-spin" />
                  <span>LOADING SCENE ASSETS...</span>
                </div>
              }
            >
              <LoanSceneCanvas
                loanType={selectedType}
                propertyType={propertyType}
                hasPMAY={hasPMAY}
                hasDefence={hasDefence}
                loanAmount={amount}
                isPrimeProfile={isPrime}
              />
            </Suspense>
            <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-1.5">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-black/70 text-[#bef264] border border-[#bef264]/40 backdrop-blur-md">
                COLLATERAL ASSET MODEL
              </span>
              {isPrime && (
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                  PRIME FACILITY ACTIVE
                </span>
              )}
            </div>
          </div>

          {/* EMI Calculation Summary Card */}
          <div className="p-8 rounded-3xl glass-card border border-white/10 shadow-2xl space-y-6">
            <div className="text-center pb-6 border-b border-white/10">
              <span className="text-xs font-mono text-neutral-400 uppercase font-bold tracking-wider">Estimated Monthly EMI</span>
              <div className="font-display text-4xl sm:text-5xl font-black text-[#bef264] mt-2">
                {formatINR(emiResult.emi)}
              </div>
              <span className="text-xs font-mono text-neutral-400 mt-1 block">/ month for {tenureYears * 12} installments</span>
            </div>

            {/* Financial Breakdown Table */}
            <div className="space-y-3 font-mono text-xs text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-400">Principal Borrowed:</span>
                <span className="font-bold text-white">{formatINR(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Total Interest Payable:</span>
                <span className="font-bold text-[#22d3ee]">{formatINR(emiResult.totalInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Total Amount Payable:</span>
                <span className="font-bold text-white">{formatINR(emiResult.totalPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Estimated Processing Fee:</span>
                <span className="font-bold text-neutral-400">{formatINR(emiResult.processingFee)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick(800);
                  onApplyLeadClick(currentProduct, amount, emiResult.emi, tenureYears);
                }}
                className="w-full py-4.5 rounded-2xl bg-[#bef264] text-black font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#d9f99d] active:scale-95 transition-all shadow-xl shadow-[#bef264]/20 cursor-pointer"
              >
                <span>Proceed to Pre-Qualification</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => {
                  sound.playClick(680);
                  onDownloadKfsClick(currentProduct, amount, rate, tenureYears);
                }}
                className="w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#bef264]" />
                <span>Export Facility Summary (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
