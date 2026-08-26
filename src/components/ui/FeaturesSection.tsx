import React from 'react';
import { Cpu, Shield, Zap, Sparkles, Radio, Activity, Compass, Layers } from 'lucide-react';
import { sound } from '../../utils/audio';

export const FeaturesSection: React.FC = () => {
  return (
    <section 
      id="features" 
      aria-label="AURA Hardware Innovations"
      className="relative min-h-screen py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/30">
          <Layers className="w-3.5 h-3.5 text-[#bef264]" />
          PATENTED NEURAL ACOUSTIC ENGINE
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">
          Engineered Beyond Physical Limits.
        </h2>
        <p className="mt-4 text-neutral-300 text-base md:text-lg">
          Six breakthroughs in quantum acoustics, biometric sensing, and micro-DSP architecture converge inside AURA X-1.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 (Large 2 cols) */}
        <div 
          className="md:col-span-2 p-8 md:p-10 rounded-3xl glass-card relative overflow-hidden group hover:border-[#bef264]/60 transition-all duration-300 shadow-xl"
          onMouseEnter={() => sound.playHover(580)}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-[#bef264]/10 text-[#bef264]">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-[#bef264] tracking-wider font-bold">CHIP ARCHITECTURE // 0.8MS</span>
          </div>

          <h3 className="font-display text-2xl md:text-4xl font-extrabold text-white">
            Dual-Core NPU @ 1,000Hz Kinematic Sampling
          </h3>
          <p className="mt-3 text-neutral-300 text-sm md:text-base leading-relaxed max-w-xl">
            Custom dedicated Neural Processing Unit processes 6-axis head pose tracking every 1 millisecond. Re-synthesizes head-related transfer functions (HRTF) in real-time, locking sound sources firmly to physical space with zero perceived drift.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs text-neutral-300">
            <span className="px-3.5 py-1.5 rounded-xl bg-black/60 border border-white/10 text-[#bef264] font-bold">0.02° Precision</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-black/60 border border-white/10 text-[#22d3ee] font-bold">Edge AI Model</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-black/60 border border-white/10 text-[#c084fc] font-bold">&lt; 0.8ms Render Loop</span>
          </div>
        </div>

        {/* Card 2 */}
        <div 
          className="p-8 rounded-3xl glass-card relative overflow-hidden group hover:border-[#22d3ee]/60 transition-all duration-300 shadow-xl"
          onMouseEnter={() => sound.playHover(620)}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-[#22d3ee]/10 text-[#22d3ee]">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-[#22d3ee] tracking-wider font-bold">TRANSDUCER</span>
          </div>

          <h3 className="font-display text-xl font-bold text-white">
            45mm Solid Beryllium Acoustic Foil
          </h3>
          <p className="mt-3 text-neutral-300 text-xs md:text-sm leading-relaxed">
            Light as aluminum, 4x stiffer than titanium. Eliminates cone breakup modes across the entire audible and ultrasonic band (4Hz to 52kHz).
          </p>

          <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center text-xs font-mono">
            <span className="text-neutral-400">THD Distortion</span>
            <span className="text-[#22d3ee] font-bold text-sm">0.0018%</span>
          </div>
        </div>

        {/* Card 3 */}
        <div 
          className="p-8 rounded-3xl glass-card relative overflow-hidden group hover:border-[#fbbf24]/60 transition-all duration-300 shadow-xl"
          onMouseEnter={() => sound.playHover(660)}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-[#fbbf24]/10 text-[#fbbf24]">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-[#fbbf24] tracking-wider font-bold">RF WIRELESS</span>
          </div>

          <h3 className="font-display text-xl font-bold text-white">
            1.2ms Zero-Loss RF Dongle
          </h3>
          <p className="mt-3 text-neutral-300 text-xs md:text-sm leading-relaxed">
            Proprietary 2.4GHz ultra-wideband transmission streaming uncompressed 32-bit / 384kHz audio alongside simultaneous Bluetooth 5.4 multi-point LE Audio.
          </p>

          <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center text-xs font-mono">
            <span className="text-neutral-400">Bitrate</span>
            <span className="text-[#fbbf24] font-bold text-sm">4.2 Mbps Lossless</span>
          </div>
        </div>

        {/* Card 4 (Large 2 cols) */}
        <div 
          className="md:col-span-2 p-8 md:p-10 rounded-3xl glass-card relative overflow-hidden group hover:border-[#c084fc]/60 transition-all duration-300 shadow-xl"
          onMouseEnter={() => sound.playHover(700)}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-[#c084fc]/10 text-[#c084fc]">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-[#c084fc] tracking-wider font-bold">BIOMETRIC ACOUSTICS</span>
          </div>

          <h3 className="font-display text-2xl md:text-4xl font-extrabold text-white">
            Oto-Acoustic Biological Ear Profiling
          </h3>
          <p className="mt-3 text-neutral-300 text-sm md:text-base leading-relaxed max-w-xl">
            Inward-facing MEMS microphones emit an ultrasonic chirp during first insertion to measure the exact micro-geometry of your ear canal and concha, adapting the digital parametric EQ to match your anatomical acoustic resonance.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs text-neutral-300">
            <span className="px-3.5 py-1.5 rounded-xl bg-black/60 border border-white/10 text-[#c084fc] font-bold">Personalized HRTF</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-black/60 border border-white/10 text-[#bef264] font-bold">Instant Calibration</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-black/60 border border-white/10 text-[#22d3ee] font-bold">360° Sphere Map</span>
          </div>
        </div>
      </div>
    </section>
  );
};
