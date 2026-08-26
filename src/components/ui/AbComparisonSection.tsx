import React, { useState } from 'react';
import { Volume2, Play, Square, Headphones, Zap, Radio, Sliders, ArrowUpRight } from 'lucide-react';
import { sound } from '../../utils/audio';

export const AbComparisonSection: React.FC = () => {
  const [activeTier, setActiveTier] = useState<'standard' | 'lossless'>('lossless');
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (tier: 'standard' | 'lossless') => {
    setActiveTier(tier);
    setIsPlaying(true);
    sound.playClick(tier === 'lossless' ? 680 : 380);
    sound.playAbDemo(tier);
    setTimeout(() => setIsPlaying(false), 2500);
  };

  return (
    <section 
      id="ab-benchmark" 
      aria-label="Lossless Audio Benchmark Playground"
      className="relative min-h-screen py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/30">
          <Headphones className="w-3.5 h-3.5 text-[#bef264]" />
          A/B AUDIOPHILE SIGNAL GENERATOR
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">
          Hear What Compression Erases.
        </h2>
        <p className="mt-4 text-neutral-300 text-base md:text-lg">
          Audition the stark difference between lossy 128kbps stereo MP3 and AURA's full-spectrum 384kHz 32-bit acoustic feed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        {/* Tier A: Standard Compressed */}
        <div 
          className={`p-8 rounded-3xl transition-all duration-300 border ${
            activeTier === 'standard' 
              ? 'glass-card-active border-rose-500/60 scale-[1.01] shadow-xl shadow-rose-500/10' 
              : 'glass-card border-white/10 opacity-75 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-rose-950/80 text-rose-400 border border-rose-800/40">
              TIER A // STANDARD COMPRESSED
            </span>
            <span className="text-xs font-mono text-neutral-400 font-semibold">128 kbps MP3/AAC</span>
          </div>

          <h3 className="font-display text-2xl font-black text-white">Lossy Stereo</h3>
          <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
            High-frequency cutoff at 14kHz. Audible phase smear across spatial channels collapses the 360° soundstage.
          </p>

          <div className="mt-6 p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-neutral-400 space-y-2">
            <div className="flex justify-between">
              <span>Dynamic Range:</span>
              <span className="text-rose-400 font-bold">88 dB</span>
            </div>
            <div className="flex justify-between">
              <span>Sampling Rate:</span>
              <span className="text-rose-400 font-bold">44.1 kHz / 16-bit</span>
            </div>
            <div className="flex justify-between">
              <span>Harmonic Extension:</span>
              <span className="text-rose-400 font-bold">Truncated &lt; 14kHz</span>
            </div>
          </div>

          <button
            onClick={() => handlePlay('standard')}
            className="w-full mt-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 text-rose-400" />
            <span>Audition Standard 128kbps Stream</span>
          </button>
        </div>

        {/* Tier B: AURA 384kHz Neural Lossless */}
        <div 
          className={`p-8 rounded-3xl transition-all duration-300 border ${
            activeTier === 'lossless' 
              ? 'glass-card-active border-[#bef264] scale-[1.01] shadow-2xl shadow-[#bef264]/20' 
              : 'glass-card border-white/10 opacity-75 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#bef264]/20 text-[#bef264] border border-[#bef264]/40">
              TIER B // AURA NEURAL LOSSLESS
            </span>
            <span className="text-xs font-mono text-[#bef264] font-black">384 kHz / 32-bit</span>
          </div>

          <h3 className="font-display text-2xl font-black text-white">Full-Spectrum Neural Holograph</h3>
          <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
            Preserves ultrasonic harmonics to 52kHz. Neural time-alignment reconstructs individual sound reflections with 0.02° spatial accuracy.
          </p>

          <div className="mt-6 p-4 rounded-2xl bg-black/60 border border-[#bef264]/30 font-mono text-xs text-neutral-200 space-y-2">
            <div className="flex justify-between">
              <span>Dynamic Range:</span>
              <span className="text-[#bef264] font-bold">134 dB (Mastering Studio)</span>
            </div>
            <div className="flex justify-between">
              <span>Sampling Rate:</span>
              <span className="text-[#bef264] font-bold">384 kHz / 32-bit Quad DAC</span>
            </div>
            <div className="flex justify-between">
              <span>Harmonic Extension:</span>
              <span className="text-[#bef264] font-bold">Ultrasonic 4Hz - 52,000Hz</span>
            </div>
          </div>

          <button
            onClick={() => handlePlay('lossless')}
            className="w-full mt-6 py-4 rounded-2xl bg-[#bef264] text-black font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-[#bef264]/30 hover:bg-[#d9f99d] cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-black" />
            <span>Audition 384kHz Neural Holograph</span>
          </button>
        </div>
      </div>
    </section>
  );
};
