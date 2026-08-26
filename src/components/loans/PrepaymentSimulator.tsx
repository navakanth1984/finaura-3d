import React, { useState, useMemo } from 'react';
import { TrendingDown, Zap, Sparkles, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { calculatePrepayment, formatINR, formatLakhCrore } from '../../lib/emi-engine';
import { sound } from '../../utils/audio';

interface PrepaymentSimulatorProps {
  amount: number;
  rate: number;
  tenureYears: number;
}

export const PrepaymentSimulator: React.FC<PrepaymentSimulatorProps> = ({
  amount,
  rate,
  tenureYears,
}) => {
  const [extraMonthly, setExtraMonthly] = useState(5000);
  const [oneTimeLumpSum, setOneTimeLumpSum] = useState(100000);

  const prepayResult = useMemo(() => {
    return calculatePrepayment(
      { principal: amount, annualInterestRate: rate, tenureYears },
      extraMonthly,
      oneTimeLumpSum,
      12
    );
  }, [amount, rate, tenureYears, extraMonthly, oneTimeLumpSum]);

  return (
    <section 
      id="prepayment" 
      aria-label="Prepayment Optimization Calculator"
      className="relative min-h-screen py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/30">
          <TrendingDown className="w-3.5 h-3.5 text-[#bef264]" />
          CAPITAL EFFICIENCY SIMULATOR
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">
          Prepayment Optimization.
        </h2>
        <p className="mt-4 text-neutral-300 text-base md:text-lg">
          Model the financial impact of supplementary monthly principal amortization and lump-sum capital injections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto w-full">
        {/* Sliders (6 cols) */}
        <div className="lg:col-span-6 p-8 md:p-10 rounded-3xl glass-card border border-white/10 shadow-2xl space-y-6">
          <h3 className="font-display text-2xl font-black text-white">Acceleration Parameters</h3>

          {/* Slider 1: Extra Monthly Payment */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-400 uppercase font-bold">Extra Monthly Contribution</span>
              <span className="text-base font-display font-black text-[#bef264] bg-black/60 px-3 py-1 rounded-xl border border-[#bef264]/30">
                +{formatINR(extraMonthly)} / mo
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={50000}
              step={1000}
              value={extraMonthly}
              onChange={(e) => {
                setExtraMonthly(parseFloat(e.target.value));
                sound.playHover(450);
              }}
              className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#bef264]"
            />
            <div className="flex justify-between text-[11px] font-mono text-neutral-400">
              <span>₹0</span>
              <span>₹50,000 / mo</span>
            </div>
          </div>

          {/* Slider 2: One-Time Lump Sum in Month 12 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-400 uppercase font-bold">Annual Bonus Lump Sum (Yr 1)</span>
              <span className="text-base font-display font-black text-[#22d3ee] bg-black/60 px-3 py-1 rounded-xl border border-[#22d3ee]/30">
                {formatINR(oneTimeLumpSum)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1000000}
              step={25000}
              value={oneTimeLumpSum}
              onChange={(e) => {
                setOneTimeLumpSum(parseFloat(e.target.value));
                sound.playHover(550);
              }}
              className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#22d3ee]"
            />
            <div className="flex justify-between text-[11px] font-mono text-neutral-400">
              <span>₹0</span>
              <span>₹10 Lakhs</span>
            </div>
          </div>
        </div>

        {/* Savings Result Card (6 cols) */}
        <div className="lg:col-span-6 p-8 md:p-10 rounded-3xl glass-card-active border border-[#bef264]/40 shadow-2xl space-y-6">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/30">
              PROJECTED ROI IMPACT
            </span>
          </div>

          <div>
            <span className="text-xs font-mono text-neutral-400 uppercase font-bold">Total Interest Saved</span>
            <div className="font-display text-4xl sm:text-5xl font-black text-[#bef264] mt-2">
              {formatINR(prepayResult.interestSaved)}
            </div>
            <span className="text-xs font-mono text-neutral-300 mt-1 block">
              Reduces total interest from {formatLakhCrore(prepayResult.originalTotalInterest)} down to {formatLakhCrore(prepayResult.newTotalInterest)}.
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs text-neutral-300">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Original Loan Tenure:</span>
              <span className="font-semibold text-white">{tenureYears} Years ({prepayResult.originalTenureMonths} Months)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">New Accelerated Tenure:</span>
              <span className="font-bold text-[#22d3ee]">{(prepayResult.newTenureMonths / 12).toFixed(1)} Years ({prepayResult.newTenureMonths} Months)</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-white/10">
              <span className="text-neutral-400">Time Saved from Debt:</span>
              <span className="font-black text-[#bef264] text-sm">{prepayResult.yearsSaved} Years Shaved Off!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
