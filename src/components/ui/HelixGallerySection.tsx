import React, { useState } from 'react';
import { Disc, Play, Sparkles, Volume2, Waves, Radio, Sliders, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface PresetCard {
  id: string;
  name: string;
  tag: string;
  freqProfile: string;
  description: string;
  gradient: string;
  toneFreq: number;
}

const PRESETS: PresetCard[] = [
  {
    id: 'imax',
    name: 'IMAX Spatial Cinema 12.1',
    tag: 'Surround Virtualizer',
    freqProfile: '16Hz - 48,000Hz Sub-Bass Curve',
    description: 'Expands virtual soundstage depth by 340% for visceral sub-bass impact and holographic voice clarity.',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent border-amber-500/40',
    toneFreq: 110,
  },
  {
    id: 'mastering',
    name: 'Mastering Studio Reference',
    tag: 'Flat Acoustic Target',
    freqProfile: '±0.15dB Linear Phase Tuning',
    description: 'Zero phase smear and absolute neutral frequency response for mastering engineers and critical mixing.',
    gradient: 'from-[#bef264]/20 via-emerald-500/10 to-transparent border-[#bef264]/40',
    toneFreq: 440,
  },
  {
    id: 'holodeck',
    name: 'Neural Holodeck 6DoF',
    tag: 'Binaural Raytracer',
    freqProfile: '1,000Hz Kalman Space Tracking',
    description: 'Locks virtual audio sources immovably to real-world coordinates with acoustic occlusion modeling.',
    gradient: 'from-[#22d3ee]/20 via-blue-500/10 to-transparent border-[#22d3ee]/40',
    toneFreq: 680,
  },
  {
    id: 'atmos',
    name: 'Hyper-Club Atmos Live',
    tag: 'Transient Punch DSP',
    freqProfile: '4Hz Ultrasonic Kick Extender',
    description: 'Dynamic transient acceleration delivering thunderous tactile slam without muddying midrange vocals.',
    gradient: 'from-[#c084fc]/20 via-fuchsia-500/10 to-transparent border-[#c084fc]/40',
    toneFreq: 880,
  },
];

export const HelixGallerySection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);

  const rotateHelix = (direction: 'next' | 'prev') => {
    sound.playClick(direction === 'next' ? 600 : 450);
    const newIdx = direction === 'next' 
      ? (activeIdx + 1) % PRESETS.length 
      : (activeIdx - 1 + PRESETS.length) % PRESETS.length;
    setActiveIdx(newIdx);
    setRotationAngle((prev) => prev + (direction === 'next' ? 90 : -90));
  };

  const previewPreset = (preset: PresetCard) => {
    sound.playClick(preset.toneFreq);
    sound.playTone(preset.toneFreq, 0.8, 0);
  };

  return (
    <section 
      id="helix-gallery" 
      aria-label="Parametric 3D Acoustic Presets Helix"
      className="relative min-h-screen py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#bef264]" />
          PARAMETRIC 3D ACOUSTIC PRESET MATRIX (TRIONN HELIX PATTERN)
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">
          Acoustic Profiles in Orbit.
        </h2>
        <p className="mt-4 text-neutral-300 text-base md:text-lg">
          Select or rotate between four proprietary DSP tuning targets calibrated for cinema mixing, mastering, and binaural VR.
        </p>
      </div>

      {/* Preset Card Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRESETS.map((p, idx) => {
          const isSelected = activeIdx === idx;
          return (
            <div
              key={p.id}
              onClick={() => {
                setActiveIdx(idx);
                previewPreset(p);
              }}
              onMouseEnter={() => sound.playHover(400 + idx * 100)}
              className={`p-7 rounded-3xl transition-all duration-300 relative overflow-hidden group cursor-pointer border ${
                isSelected 
                  ? 'glass-card-active border-[#bef264] scale-[1.02] shadow-2xl shadow-[#bef264]/20' 
                  : 'glass-card border-white/10 hover:border-white/20 hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-neutral-300 font-bold">
                  {p.tag}
                </span>
                <span className="text-xs font-mono text-neutral-400 font-bold">0{idx + 1}</span>
              </div>

              <h3 className="font-display text-xl font-bold text-white group-hover:text-[#bef264] transition-colors">
                {p.name}
              </h3>
              <p className="text-xs font-mono text-[#bef264] mt-1 font-semibold">
                {p.freqProfile}
              </p>
              <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                {p.description}
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    previewPreset(p);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-[#bef264] hover:text-black transition-all text-xs font-mono font-bold flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Audition Profile</span>
                </button>
                {isSelected && (
                  <span className="text-[11px] font-mono text-[#bef264] font-bold">ACTIVE DSP</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
