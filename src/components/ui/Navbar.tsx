import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Landmark, 
  Calculator, 
  Calendar, 
  TrendingDown, 
  ArrowRight, 
  Menu, 
  X, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface NavbarProps {
  onPreOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onPreOrderClick }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMuteToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playClick(580);
    }
  };

  const handleNavClick = () => {
    sound.playClick(500);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 py-3 sm:px-6 sm:py-4 md:px-8">
      <nav 
        aria-label="Financial Platform Navigation"
        className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 rounded-full glass-card border border-white/10 shadow-2xl backdrop-blur-2xl transition-all duration-300 relative"
      >
        {/* Brand Logo */}
        <a 
          href="#top" 
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
          onMouseEnter={() => sound.playHover(720)}
          onClick={() => sound.playClick(600)}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#bef264] flex items-center justify-center shadow-lg shadow-[#bef264]/20 group-hover:scale-105 transition-all">
            <Landmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black stroke-[2.5]" />
          </div>
          <span className="font-display font-black tracking-tight text-lg sm:text-xl text-white">
            FINAURA <span className="text-neutral-400 font-mono text-[9px] sm:text-[10px] font-normal tracking-wider uppercase ml-1 hidden xs:inline">Credit Intelligence</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center gap-7 text-xs font-mono tracking-wider uppercase text-neutral-400">
          <a 
            href="#loan-calculator" 
            className="hover:text-[#bef264] transition-colors flex items-center gap-1.5 group py-1"
            onMouseEnter={() => sound.playHover(500)}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#bef264]/40 group-hover:bg-[#bef264] transition-colors" />
            Credit Calculator
          </a>
          <a 
            href="#amortization" 
            className="hover:text-[#bef264] transition-colors flex items-center gap-1.5 group py-1"
            onMouseEnter={() => sound.playHover(520)}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]/40 group-hover:bg-[#22d3ee] transition-colors" />
            Amortization
          </a>
          <a 
            href="#lenders" 
            className="hover:text-[#bef264] transition-colors flex items-center gap-1.5 group py-1"
            onMouseEnter={() => sound.playHover(540)}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]/40 group-hover:bg-[#fbbf24] transition-colors" />
            Lender Index
          </a>
          <a 
            href="#prepayment" 
            className="hover:text-[#bef264] transition-colors flex items-center gap-1.5 group py-1"
            onMouseEnter={() => sound.playHover(560)}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]/40 group-hover:bg-[#c084fc] transition-colors" />
            Prepayment
          </a>
          <a 
            href="#faq" 
            className="hover:text-[#bef264] transition-colors flex items-center gap-1.5 group py-1"
            onMouseEnter={() => sound.playHover(580)}
          >
            Advisory &amp; FAQ
          </a>
        </div>

        {/* Desktop & Mobile Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Repo Rate Pill (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#bef264] animate-pulse" />
            <span className="text-neutral-400">REPO:</span>
            <strong className="text-white">6.50%</strong>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleMuteToggle}
            className="p-2 sm:p-2.5 rounded-full glass-card border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#bef264]" />}
          </button>

          {/* Pre-Qualify CTA (Desktop & Tablet) */}
          <button
            onClick={() => {
              sound.playClick(620);
              onPreOrderClick();
            }}
            className="hidden xs:flex px-4 sm:px-5 py-2 rounded-full bg-[#bef264] text-black font-display font-black text-xs uppercase tracking-wider hover:bg-[#d9f99d] active:scale-95 transition-all shadow-lg shadow-[#bef264]/20 cursor-pointer items-center gap-1.5 min-h-[36px]"
          >
            <span>Pre-Qualify</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              sound.playClick(540);
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="xl:hidden p-2 sm:p-2.5 rounded-full glass-card border border-white/15 text-white hover:text-[#bef264] transition-colors cursor-pointer min-w-[38px] min-h-[38px] flex items-center justify-center"
            aria-label={isMobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 text-[#bef264]" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden mt-2 max-w-7xl mx-auto rounded-3xl glass-card-active border border-white/15 shadow-2xl p-5 backdrop-blur-3xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <span className="text-[11px] font-mono font-bold tracking-wider text-neutral-400 uppercase">
              Navigation Menu
            </span>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#bef264] animate-pulse" />
              <span className="text-neutral-400">RBI REPO:</span>
              <strong className="text-white">6.50%</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 font-mono text-xs uppercase tracking-wider">
            <a
              href="#loan-calculator"
              onClick={handleNavClick}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/10 hover:border-[#bef264]/40 hover:bg-[#bef264]/10 text-neutral-200 hover:text-white transition-all min-h-[48px]"
            >
              <div className="flex items-center gap-3">
                <Calculator className="w-4 h-4 text-[#bef264]" />
                <span className="font-bold">Credit Calculator</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
            </a>

            <a
              href="#amortization"
              onClick={handleNavClick}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/10 hover:border-[#22d3ee]/40 hover:bg-[#22d3ee]/10 text-neutral-200 hover:text-white transition-all min-h-[48px]"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#22d3ee]" />
                <span className="font-bold">Amortization Schedule</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
            </a>

            <a
              href="#lenders"
              onClick={handleNavClick}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/10 hover:border-[#fbbf24]/40 hover:bg-[#fbbf24]/10 text-neutral-200 hover:text-white transition-all min-h-[48px]"
            >
              <div className="flex items-center gap-3">
                <Landmark className="w-4 h-4 text-[#fbbf24]" />
                <span className="font-bold">Lender Benchmark Matrix</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
            </a>

            <a
              href="#prepayment"
              onClick={handleNavClick}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/10 hover:border-[#c084fc]/40 hover:bg-[#c084fc]/10 text-neutral-200 hover:text-white transition-all min-h-[48px]"
            >
              <div className="flex items-center gap-3">
                <TrendingDown className="w-4 h-4 text-[#c084fc]" />
                <span className="font-bold">Prepayment Optimization</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
            </a>

            <a
              href="#faq"
              onClick={handleNavClick}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/25 text-neutral-200 hover:text-white transition-all min-h-[48px]"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-[#bef264]" />
                <span className="font-bold">Advisory &amp; Regulatory FAQ</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
            </a>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10">
            <button
              onClick={() => {
                sound.playClick(620);
                setIsMobileMenuOpen(false);
                onPreOrderClick();
              }}
              className="w-full py-3.5 rounded-2xl bg-[#bef264] text-black font-display font-black text-xs uppercase tracking-wider hover:bg-[#d9f99d] active:scale-95 transition-all shadow-xl shadow-[#bef264]/20 flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
            >
              <span>Instant Pre-Qualification</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
