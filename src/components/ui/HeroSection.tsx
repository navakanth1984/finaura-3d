import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp, Landmark, Calculator, Lock, Server } from 'lucide-react';
import { sound } from '../../utils/audio';

interface HeroSectionProps {
  onExploreClick: () => void;
  onApplyClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onApplyClick,
}) => {
  return (
    <section 
      id="top" 
      aria-label="Institutional Credit Discovery Platform"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-12 pt-36 sm:pt-40 md:pt-44 pb-20 max-w-7xl mx-auto z-10 pointer-events-none"
    >
      {/* Refined Status Badges */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8 pointer-events-auto">
        <span className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono tracking-wider text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/30 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 stroke-[2]" />
          REGULATED DIGITAL LENDING GATEWAY
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono tracking-wider text-[#22d3ee] bg-[#22d3ee]/10 border border-[#22d3ee]/30 backdrop-blur-md">
          <Landmark className="w-3.5 h-3.5" />
          MULTI-INSTITUTION RATE INDEX
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono tracking-wider text-neutral-300 bg-white/5 border border-white/10 backdrop-blur-md">
          <Server className="w-3.5 h-3.5 text-[#bef264]" />
          SOVEREIGN DATA RESIDENCY
        </span>
      </div>

      {/* Main Display Headline (Syne Typography with Responsive Scaling) */}
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white max-w-5xl leading-[1.05] sm:leading-[1.02] md:leading-[0.98] pointer-events-auto">
        INSTITUTIONAL CREDIT. <br />
        <span className="text-acid-gradient">PRECISION ENGINEERED.</span>
      </h1>

      {/* Subheading */}
      <p className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-neutral-300 font-sans leading-relaxed pointer-events-auto">
        Comprehensive credit structuring for Home, Automobile, Enterprise, and Academic financing. Model amortized schedules, simulate liquidity dynamics, and benchmark institutional spreads.
      </p>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-wrap items-center gap-4 pointer-events-auto">
        <button
          onClick={() => {
            sound.playClick(640);
            onApplyClick();
          }}
          onMouseEnter={() => sound.playHover(540)}
          className="px-8 py-4.5 rounded-full bg-[#bef264] text-black font-display font-black text-sm uppercase tracking-wider flex items-center gap-3 shadow-xl shadow-[#bef264]/20 hover:bg-[#d9f99d] active:scale-95 transition-all cursor-pointer"
        >
          <span>Check Pre-Qualification</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>

        <button
          onClick={() => {
            sound.playClick(440);
            onExploreClick();
          }}
          onMouseEnter={() => sound.playHover(480)}
          className="px-8 py-4.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 border border-white/15 backdrop-blur-md active:scale-95 transition-all cursor-pointer"
        >
          <Calculator className="w-4 h-4 text-[#bef264]" />
          <span>Open Credit Calculator</span>
        </button>
      </div>

      {/* Trust & Market Metrics */}
      <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 pointer-events-auto">
        <div className="space-y-1">
          <div className="text-xs font-mono text-neutral-400">BENCHMARK SPREAD</div>
          <div className="text-2xl md:text-3xl font-display font-black text-[#bef264]">8.35% <span className="text-xs font-mono text-neutral-400">p.a.</span></div>
          <div className="text-[11px] text-neutral-400 font-mono">Repo-linked external benchmark</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-mono text-neutral-400">DISBURSAL WORKFLOW</div>
          <div className="text-2xl md:text-3xl font-display font-black text-[#22d3ee]">100% e-KYC</div>
          <div className="text-[11px] text-neutral-400 font-mono">Direct institutional settlement</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-mono text-neutral-400">LENDING PARTNERS</div>
          <div className="text-2xl md:text-3xl font-display font-black text-[#c084fc]">30+ Lenders</div>
          <div className="text-[11px] text-neutral-400 font-mono">Scheduled commercial banks</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-mono text-neutral-400">DATA GOVERNANCE</div>
          <div className="text-2xl md:text-3xl font-display font-black text-white">DPDP 2023</div>
          <div className="text-[11px] text-neutral-400 font-mono">Affirmative borrower consent</div>
        </div>
      </div>
    </section>
  );
};
