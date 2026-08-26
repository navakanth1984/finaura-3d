import React from 'react';
import { Sparkles, Landmark, ArrowUp, ShieldCheck, Mail, Server } from 'lucide-react';
import { sound } from '../../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick(600);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#020204] z-10 text-neutral-400 text-sm py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#bef264] flex items-center justify-center text-black shadow-lg shadow-[#bef264]/20">
              <Landmark className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-display font-black tracking-tight text-xl text-white">
              FINAURA <span className="text-[#bef264] font-mono text-xs font-bold">FINANCIAL TECHNOLOGIES</span>
            </span>
          </div>
          <p className="mt-3 text-xs max-w-sm text-neutral-400 leading-relaxed font-mono">
            Independent Lending Service Provider (LSP) and technology facilitator connecting borrowers with RBI-regulated Scheduled Commercial Banks and NBFCs.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono font-bold tracking-wider uppercase">
          <a 
            href="#loan-calculator" 
            className="hover:text-[#bef264] transition-colors"
            onMouseEnter={() => sound.playHover(500)}
          >
            3D EMI Engine
          </a>
          <a 
            href="#amortization" 
            className="hover:text-[#bef264] transition-colors"
            onMouseEnter={() => sound.playHover(520)}
          >
            Amortization
          </a>
          <a 
            href="#lenders" 
            className="hover:text-[#bef264] transition-colors"
            onMouseEnter={() => sound.playHover(540)}
          >
            Lender Matrix
          </a>
          <a 
            href="#prepayment" 
            className="hover:text-[#bef264] transition-colors"
            onMouseEnter={() => sound.playHover(560)}
          >
            Prepayment ROI
          </a>
          <a 
            href="#faq" 
            className="hover:text-[#bef264] transition-colors"
            onMouseEnter={() => sound.playHover(580)}
          >
            RBI &amp; DPDP FAQ
          </a>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => sound.playHover(600)}
          className="p-3.5 rounded-full bg-white/5 hover:bg-[#bef264] border border-white/10 hover:border-[#bef264] text-neutral-300 hover:text-black transition-all flex items-center gap-2 text-xs font-mono font-bold cursor-pointer"
        >
          <span>TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Statutory Regulatory & Data Fiduciary Disclosure Box */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 space-y-4 text-xs text-neutral-400 font-mono leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/40 p-6 rounded-2xl border border-white/5">
          <div>
            <strong className="text-white flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#bef264]" />
              Statutory LSP &amp; Non-Lender Disclaimer:
            </strong>
            <p className="text-[11px] text-neutral-400">
              FINAURA Financial Advisory Technologies Inc. operates solely as an independent Lending Service Provider (LSP) under RBI Digital Lending Guidelines (RBI/2022-23/111 &amp; Directions 2025). FINAURA is NOT a Bank, NBFC, or direct credit issuer. All loan sanctions, interest rate decisions, credit underwriting, and disbursals are executed exclusively by partner Regulated Entities (REs). FINAURA does not collect, hold, or deduct any processing fees or loan funds.
            </p>
          </div>

          <div>
            <strong className="text-white flex items-center gap-2 mb-1">
              <Server className="w-4 h-4 text-[#22d3ee]" />
              Data Fiduciary &amp; Grievance Redressal Officer (GRO):
            </strong>
            <p className="text-[11px] text-neutral-400">
              In compliance with Section 8(9) of the Digital Personal Data Protection (DPDP) Act 2023 and RBI Local Data Hosting directives, all borrower personal information is stored on encrypted MeitY-empaneled servers in Mumbai, India.
            </p>
            <p className="text-[11px] text-neutral-300 mt-2">
              <strong>Designated GRO:</strong> Mr. Arvind R. Nambiar, Advocate &amp; Data Protection Officer<br />
              <strong>Grievance Email:</strong> <a href="mailto:grievance-officer@finaura3d.loans" className="text-[#bef264] underline">grievance-officer@finaura3d.loans</a> | Response SLA: 48 Hours.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-500 text-[11px]">
          <p>© 2026 FINAURA Financial Advisory Technologies Inc. All rights reserved.</p>
          <p className="text-neutral-400">Fully Compliant with Trade Marks Act 1999 §30(1), RBI/2022-23/111, and DPDP Act 2023.</p>
        </div>
      </div>
    </footer>
  );
};
