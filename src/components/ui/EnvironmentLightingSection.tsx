import React from 'react';
import { Sun, Sparkles, Orbit, Compass, Sliders, Moon } from 'lucide-react';
import { sound } from '../../utils/audio';

interface EnvironmentLightingSectionProps {
  lightAngle: number;
  onLightAngleChange: (angle: number) => void;
  lightPreset: 'clean' | 'sunset' | 'cyber' | 'noir';
  onLightPresetChange: (preset: 'clean' | 'sunset' | 'cyber' | 'noir') => void;
}

export const EnvironmentLightingSection: React.FC<EnvironmentLightingSectionProps> = ({
  lightAngle,
  onLightAngleChange,
  lightPreset,
  onLightPresetChange,
}) => {
  return (
    <section 
      id="environment-lighting" 
      aria-label="360° Studio Environment Light Scrubber (DEPT AstroGL Pattern)"
      className="relative min-h-screen py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/30">
          <Orbit className="w-3.5 h-3.5 text-[#bef264]" />
          360° ASTROGL ENVIRONMENT REFLECTION RIG (DEPT PATTERN)
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">
          Specular Light Kinematics.
        </h2>
        <p className="mt-4 text-neutral-300 text-base md:text-lg">
          Orbit the studio directional key lights across 360° to inspect anisotropic specular highlights and metallic clearcoat reflections on the titanium core.
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full p-8 md:p-10 rounded-3xl glass-card-active border border-[#bef264]/40 shadow-2xl space-y-8">
        {/* Light Angle 360 Slider */}
        <div>
          <div className="flex justify-between items-center text-xs font-mono text-neutral-300 mb-3">
            <span className="uppercase font-bold tracking-wider">Studio Key Light Azimuth Angle</span>
            <span className="text-[#bef264] font-mono font-black text-sm bg-black/60 px-3 py-1 rounded-full border border-[#bef264]/30">
              {Math.round(lightAngle)}° DEGREES
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={lightAngle}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              onLightAngleChange(val);
              sound.playHover(300 + (val / 360) * 500);
            }}
            className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#bef264]"
          />

          <div className="flex justify-between text-[11px] font-mono text-neutral-400 mt-2 font-semibold">
            <span>0° (Front Key)</span>
            <span>90° (Right Rim)</span>
            <span>180° (Back Silhouette)</span>
            <span>270° (Left Rim)</span>
            <span>360°</span>
          </div>
        </div>

        {/* Studio Color Temperature Rigs */}
        <div>
          <label className="block text-xs font-mono text-neutral-300 uppercase mb-3 font-bold tracking-wider">
            Studio Color Temperature Preset
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => {
                onLightPresetChange('clean');
                sound.playClick(600);
              }}
              className={`p-4 rounded-2xl text-xs font-mono font-bold transition-all border text-left cursor-pointer ${
                lightPreset === 'clean'
                  ? 'bg-[#bef264] text-black border-[#bef264] shadow-lg shadow-[#bef264]/20'
                  : 'glass-card text-neutral-300 border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Sun className="w-3.5 h-3.5" />
                <span>6500K Daylight</span>
              </div>
              <p className="text-[10px] opacity-75 font-normal">Clean neutral reflections</p>
            </button>

            <button
              onClick={() => {
                onLightPresetChange('sunset');
                sound.playClick(450);
              }}
              className={`p-4 rounded-2xl text-xs font-mono font-bold transition-all border text-left cursor-pointer ${
                lightPreset === 'sunset'
                  ? 'bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/20'
                  : 'glass-card text-neutral-300 border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>3200K Sunset</span>
              </div>
              <p className="text-[10px] opacity-75 font-normal">Warm gold metallic glints</p>
            </button>

            <button
              onClick={() => {
                onLightPresetChange('cyber');
                sound.playClick(720);
              }}
              className={`p-4 rounded-2xl text-xs font-mono font-bold transition-all border text-left cursor-pointer ${
                lightPreset === 'cyber'
                  ? 'bg-[#22d3ee] text-black border-[#22d3ee] shadow-lg shadow-[#22d3ee]/20'
                  : 'glass-card text-neutral-300 border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#22d3ee]" />
                <span>Cyber Cyan UV</span>
              </div>
              <p className="text-[10px] opacity-75 font-normal">High-contrast neon sheen</p>
            </button>

            <button
              onClick={() => {
                onLightPresetChange('noir');
                sound.playClick(320);
              }}
              className={`p-4 rounded-2xl text-xs font-mono font-bold transition-all border text-left cursor-pointer ${
                lightPreset === 'noir'
                  ? 'bg-[#c084fc] text-black border-[#c084fc] shadow-lg shadow-[#c084fc]/20'
                  : 'glass-card text-neutral-300 border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Moon className="w-3.5 h-3.5 text-[#c084fc]" />
                <span>Ultraviolet Noir</span>
              </div>
              <p className="text-[10px] opacity-75 font-normal">Moody rim-only lighting</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
