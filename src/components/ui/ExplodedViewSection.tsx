import React from 'react';
import { Layers, Disc, Cpu, Compass, Radio, Sparkles, Sliders } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ExplodedViewSectionProps {
  explodedProgress: number;
  onExplodedChange: (val: number) => void;
}

export const ExplodedViewSection: React.FC<ExplodedViewSectionProps> = ({
  explodedProgress,
  onExplodedChange,
}) => {
  return (
    <section 
      id="exploded-view" 
      aria-label="3D Kinematic Component Disassembly Stage"
      className="relative min-h-screen py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/30">
          <Layers className="w-3.5 h-3.5 text-[#bef264]" />
          KINEMATIC 3D TEARDOWN
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">
          Deconstruct the Machine.
        </h2>
        <p className="mt-4 text-neutral-300 text-base md:text-lg">
          Drag the tactile slider to pull apart the 4 internal acoustic & micro-DSP stages in real-time 3D space.
        </p>
      </div>

      {/* Disassembly Slider Control Box */}
      <div className="max-w-xl mx-auto w-full p-6 rounded-3xl glass-card-active border border-[#bef264]/40 mb-12 shadow-2xl">
        <div className="flex justify-between items-center text-xs font-mono text-neutral-300 mb-3">
          <span className="uppercase tracking-wider font-bold">Kinematic Disassembly Offset</span>
          <span className="text-[#bef264] font-black text-sm bg-black/60 px-3 py-1 rounded-full border border-[#bef264]/30">
            {Math.round(explodedProgress * 100)}% EXPANDED
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={explodedProgress}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            onExplodedChange(val);
            sound.playHover(400 + val * 400);
          }}
          className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#bef264]"
        />

        <div className="flex justify-between text-[11px] font-mono text-neutral-400 mt-3 font-semibold">
          <span>0% [ASSEMBLED]</span>
          <span>50% [SUB-ASSEMBLY]</span>
          <span>100% [FULL TEARDOWN]</span>
        </div>
      </div>

      {/* 4 Layer Callout Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Layer 1 */}
        <div 
          className={`p-6 rounded-3xl glass-card border transition-all duration-300 ${
            explodedProgress > 0.2 ? 'border-[#bef264] bg-[#bef264]/5 shadow-lg shadow-[#bef264]/10' : 'border-white/10 opacity-70'
          }`}
          onMouseEnter={() => sound.playHover(600)}
        >
          <div className="flex items-center gap-2 mb-3 text-[#bef264]">
            <Disc className="w-4 h-4" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">STAGE 01 // ACOUSTICS</span>
          </div>
          <h3 className="font-display text-lg font-bold text-white">45mm Beryllium Foil</h3>
          <p className="text-xs text-neutral-300 mt-2 leading-relaxed">Solid vapor-deposited beryllium dome eliminating harmonic distortion up to 52kHz.</p>
        </div>

        {/* Layer 2 */}
        <div 
          className={`p-6 rounded-3xl glass-card border transition-all duration-300 ${
            explodedProgress > 0.4 ? 'border-[#22d3ee] bg-[#22d3ee]/5 shadow-lg shadow-[#22d3ee]/10' : 'border-white/10 opacity-70'
          }`}
          onMouseEnter={() => sound.playHover(640)}
        >
          <div className="flex items-center gap-2 mb-3 text-[#22d3ee]">
            <Radio className="w-4 h-4" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">STAGE 02 // SENSORS</span>
          </div>
          <h3 className="font-display text-lg font-bold text-white">6DoF Gyro IMU Ring</h3>
          <p className="text-xs text-neutral-300 mt-2 leading-relaxed">1,000Hz dual kinematic tracking with Kalman edge filters for zero-drift positioning.</p>
        </div>

        {/* Layer 3 */}
        <div 
          className={`p-6 rounded-3xl glass-card border transition-all duration-300 ${
            explodedProgress > 0.6 ? 'border-[#c084fc] bg-[#c084fc]/5 shadow-lg shadow-[#c084fc]/10' : 'border-white/10 opacity-70'
          }`}
          onMouseEnter={() => sound.playHover(680)}
        >
          <div className="flex items-center gap-2 mb-3 text-[#c084fc]">
            <Cpu className="w-4 h-4" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">STAGE 03 // COMPUTE</span>
          </div>
          <h3 className="font-display text-lg font-bold text-white">Dual-Core Neural NPU</h3>
          <p className="text-xs text-neutral-300 mt-2 leading-relaxed">Runs anatomical wave field synthesis in under 0.8ms without cloud dependence.</p>
        </div>

        {/* Layer 4 */}
        <div 
          className={`p-6 rounded-3xl glass-card border transition-all duration-300 ${
            explodedProgress > 0.8 ? 'border-[#fbbf24] bg-[#fbbf24]/5 shadow-lg shadow-[#fbbf24]/10' : 'border-white/10 opacity-70'
          }`}
          onMouseEnter={() => sound.playHover(720)}
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <Compass className="w-4 h-4" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">STAGE 04 // CHASSIS</span>
          </div>
          <h3 className="font-display text-lg font-bold text-white">CNC Titanium Cage</h3>
          <p className="text-xs text-neutral-300 mt-2 leading-relaxed">Acoustic resonance damping chamber CNC-machined from single-billet aerospace titanium.</p>
        </div>
      </div>
    </section>
  );
};
