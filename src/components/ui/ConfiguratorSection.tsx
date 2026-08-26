import React from 'react';
import { Palette, Check, Sparkles, Shield, Compass } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ConfiguratorSectionProps {
  currentFinish: 'obsidian' | 'aurora' | 'gold' | 'cyber';
  onSelectFinish: (finish: 'obsidian' | 'aurora' | 'gold' | 'cyber') => void;
}

interface FinishOption {
  id: 'obsidian' | 'aurora' | 'gold' | 'cyber';
  name: string;
  subtitle: string;
  badge: string;
  color: string;
  accentHex: string;
  materialDesc: string;
}

const FINISHES: FinishOption[] = [
  {
    id: 'obsidian',
    name: 'Liquid Mercury Chrome',
    subtitle: 'Vapor-deposited optical mirror alloy',
    badge: 'Flagship Chrome',
    color: 'from-neutral-800 via-neutral-900 to-black border-neutral-600',
    accentHex: '#bef264',
    materialDesc: 'DLC mirror coating with 9H diamond hardness and anti-fingerprint nano-texture.'
  },
  {
    id: 'aurora',
    name: 'Acid Cyberpunk Lime',
    subtitle: 'Interference polychromatic anodization',
    badge: 'Electroluminescent',
    color: 'from-lime-950 via-emerald-950 to-neutral-950 border-lime-600',
    accentHex: '#34d399',
    materialDesc: 'Light-refracting crystalline sheen inspired by northern polar electromagnetic storms.'
  },
  {
    id: 'gold',
    name: 'Solar Flare Gold Titanium',
    subtitle: 'Grade 5 forged aerospace titanium alloy',
    badge: 'Bespoke Luxury',
    color: 'from-amber-950 via-yellow-950 to-neutral-950 border-amber-500',
    accentHex: '#fbbf24',
    materialDesc: 'Ion-sputtered gold vapor on CNC-machined titanium for maximum tensile acoustic dampening.'
  },
  {
    id: 'cyber',
    name: 'Ultraviolet Phantom',
    subtitle: 'Photonic reactive ceramic weave',
    badge: 'Neon Core',
    color: 'from-purple-950 via-fuchsia-950 to-black border-purple-500',
    accentHex: '#f43f5e',
    materialDesc: 'Electrically reactive micro-pigments responsive to surrounding audio intensity.'
  }
];

export const ConfiguratorSection: React.FC<ConfiguratorSectionProps> = ({
  currentFinish,
  onSelectFinish,
}) => {
  return (
    <section 
      id="configurator" 
      aria-label="3D Finishes and Material Studio"
      className="relative min-h-screen py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/30">
          <Palette className="w-3.5 h-3.5 text-[#bef264]" />
          REAL-TIME 3D MATERIAL ENGINE
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">
          Sculpted in Rare Elements.
        </h2>
        <p className="mt-4 text-neutral-300 text-base md:text-lg">
          Click any material finish to mutate the live 3D WebGL core shaders and orbital rings in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FINISHES.map((f) => {
          const isSelected = currentFinish === f.id;
          return (
            <button
              key={f.id}
              onClick={() => {
                sound.playClick(isSelected ? 440 : 640);
                onSelectFinish(f.id);
              }}
              onMouseEnter={() => sound.playHover(520)}
              className={`p-6 rounded-3xl text-left transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                isSelected 
                  ? 'glass-card-active border-[#bef264] scale-[1.02] shadow-2xl shadow-[#bef264]/20' 
                  : 'glass-card hover:border-white/20 hover:scale-[1.01]'
              }`}
            >
              {/* Active Indicator Pin */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-neutral-300 font-bold">
                  {f.badge}
                </span>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#bef264] text-black flex items-center justify-center shadow-lg shadow-[#bef264]/50">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Color Swatch Pill */}
              <div 
                className={`w-full h-12 rounded-xl mb-4 bg-gradient-to-r ${f.color} border shadow-inner flex items-center px-4`}
              >
                <div 
                  className="w-4 h-4 rounded-full shadow-md"
                  style={{ backgroundColor: f.accentHex }}
                />
              </div>

              <h3 className="font-display text-lg font-bold text-white group-hover:text-[#bef264] transition-colors">
                {f.name}
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                {f.subtitle}
              </p>
              <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                {f.materialDesc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Material Banner */}
      <div className="mt-12 p-6 rounded-3xl glass-card flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[#bef264]/10 text-[#bef264]">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-base">Acoustic Resonance Damping Factor</h4>
            <p className="text-xs text-neutral-400 mt-0.5 font-mono">Custom metallurgical density minimizes internal harmonic distortion down to &lt; 0.0018% THD.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#bef264] bg-[#bef264]/10 px-4 py-2 rounded-full border border-[#bef264]/30">
            AEROSPACE GRADE 5 TITANIUM
          </span>
        </div>
      </div>
    </section>
  );
};
