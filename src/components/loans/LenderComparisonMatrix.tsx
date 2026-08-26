import React from 'react';
import { Landmark, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { LENDERS, LenderQuote } from '../../lib/loan-products';
import { calculateEMI, formatINR } from '../../lib/emi-engine';
import { sound } from '../../utils/audio';

interface LenderComparisonMatrixProps {
  amount: number;
  tenureYears: number;
  onSelectLender: (lender: LenderQuote) => void;
}

export const LenderComparisonMatrix: React.FC<LenderComparisonMatrixProps> = ({
  amount,
  tenureYears,
  onSelectLender,
}) => {
  return (
    <section 
      id="lenders" 
      aria-label="Institutional Lender Index"
      className="relative min-h-screen py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/30">
          <Landmark className="w-3.5 h-3.5 text-[#bef264]" />
          INSTITUTIONAL LENDER INDEX
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">
          Lender Comparison Benchmark.
        </h2>
        <p className="mt-4 text-neutral-300 text-base md:text-lg">
          Indicative commercial bank offerings and published tariff schedules for comparative evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LENDERS.map((lender, idx) => {
          const customEmi = calculateEMI({
            principal: amount,
            annualInterestRate: lender.baseRate,
            tenureYears,
          });

          return (
            <div
              key={lender.name}
              className="p-7 rounded-3xl glass-card hover:glass-card-active border border-white/10 hover:border-[#bef264]/60 transition-all duration-300 relative overflow-hidden group shadow-xl"
              onMouseEnter={() => sound.playHover(450 + idx * 50)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 font-mono font-bold text-xs text-[#bef264] shadow-inner">
                  {lender.logoText}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/30">
                  {lender.tag}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-white group-hover:text-[#bef264] transition-colors">
                {lender.name}
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                Indicative Rate: <strong className="text-white">{lender.rateRange}</strong>
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 font-mono text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Monthly EMI:</span>
                  <span className="font-bold text-[#bef264]">{formatINR(customEmi.emi)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Processing Fee:</span>
                  <span className="font-semibold text-white">{lender.processingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Pre-Qualification:</span>
                  <span className="font-bold text-[#22d3ee]">{lender.approvalOdds}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick(750);
                  onSelectLender(lender);
                }}
                className="w-full mt-6 py-3.5 rounded-2xl bg-white/10 hover:bg-[#bef264] hover:text-black border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <span>Request Quotes from {lender.logoText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Mandatory Statutory Trademark & Nominative Fair Use Citation */}
      <div className="mt-12 p-6 rounded-3xl glass-card border border-white/10 text-xs font-mono text-neutral-400 leading-relaxed flex items-start gap-4">
        <Info className="w-5 h-5 text-[#bef264] shrink-0 mt-0.5" />
        <div>
          <strong className="text-neutral-200">Statutory Trade Marks Act 1999 §30(1) &amp; ASCI Disclaimer:</strong>
          <p className="mt-1">
            Data benchmarked as of August 2026. Source: Publicly published scheduled commercial bank retail tariff schedules and external benchmark repo rates. Trademarks (SBI, HDFC, ICICI, Axis, Kotak, BOB) belong to their respective registered owners and are referenced solely for nominative fair use to identify corresponding lending facilities. FINAURA is an independent Lending Service Provider (LSP) / technology aggregator and does not claim official endorsement, sponsorship, or corporate affiliation with these institutions. Final terms are determined solely by lender credit underwriting.
          </p>
        </div>
      </div>
    </section>
  );
};
