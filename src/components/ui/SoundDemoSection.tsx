import React, { useState } from 'react';
import { Volume2, Play, Sliders, Waves, Activity, Headset } from 'lucide-react';
import { sound } from '../../utils/audio';

export const SoundDemoSection: React.FC = () => {
  const [pan, setPan] = useState(0);
  const [frequencyTier, setFrequencyTier] = useState<'sub' | 'mid' | 'high'>('mid');
  const [isPlaying, setIsPlaying] = useState(false);

  const triggerSpatialPulse = () => {
    setIsPlaying(true);
    let freq = 440;
    if (frequencyTier === 'sub') freq = 120;
    if (frequencyTier === 'high') freq = 1200;

    sound.playTone(freq, 0.6, pan);
    setTimeout(() => setIsPlaying(false), 600);
  };

  return (
    <section 
      id="experience" 
      aria-label="Interactive Binaural Audio Simulator"
      className="relative min-h-screen py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-sky-400 bg-sky-950/60 border border-sky-800/40">
          <Waves className="w-3.5 h-3.5" />
          WEB AUDIO API ACOUSTIC TEST BENCH
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
          Interactive Neural Wave Simulator.
        </h2>
        <p className="mt-4 text-neutral-400 text-base md:text-lg">
          Audition the spatial 3D audio panning engine directly in your browser. Plug in headphones for full binaural localization.
        </p>
      </div>

      <div className="max-w-4xl mx-auto w-full p-8 md:p-12 rounded-3xl glass-panel-glow border border-sky-500/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Spatial Visualizer Radar */}
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-black/50 border border-white/5 relative overflow-hidden">
            <div className="w-48 h-48 rounded-full border border-sky-500/20 flex items-center justify-center relative">
              {/* Radar Rings */}
              <div className="w-36 h-36 rounded-full border border-sky-500/30 absolute" />
              <div className="w-24 h-24 rounded-full border border-sky-500/40 absolute" />
              
              {/* Center Head */}
              <div className="w-12 h-12 rounded-full bg-sky-950 border border-sky-400 flex items-center justify-center z-10 shadow-lg shadow-sky-500/40">
                <Headset className="w-6 h-6 text-sky-400" />
              </div>

              {/* Dynamic Sound Source Dot */}
              <div 
                className={`w-5 h-5 rounded-full bg-white absolute shadow-lg transition-all duration-150 ${
                  isPlaying ? 'scale-150 bg-sky-400 shadow-sky-400' : 'bg-neutral-400'
                }`}
                style={{
                  transform: `translateX(${pan * 70}px) translateY(-40px)`,
                }}
              />
            </div>

            <div className="flex justify-between w-full mt-6 text-xs font-mono text-neutral-400 px-4">
              <span>LEFT EAR (90° L)</span>
              <span className="text-sky-400 font-bold">{pan === 0 ? 'CENTER' : pan < 0 ? `${Math.abs(Math.round(pan * 100))}% L` : `${Math.round(pan * 100)}% R`}</span>
              <span>RIGHT EAR (90° R)</span>
            </div>
          </div>

          {/* Controls Hub */}
          <div className="flex flex-col gap-6">
            <div>
              <label className="text-xs font-mono text-neutral-300 uppercase flex items-center justify-between">
                <span>Spatial 360° Panning Angle</span>
                <span className="text-sky-400">{pan.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.05"
                value={pan}
                onChange={(e) => {
                  setPan(parseFloat(e.target.value));
                  sound.playHover(500 + parseFloat(e.target.value) * 100);
                }}
                className="w-full mt-3 accent-sky-400 cursor-pointer"
              />
            </div>

            {/* Frequency Selection */}
            <div>
              <label className="text-xs font-mono text-neutral-300 uppercase block mb-3">
                Acoustic Frequency Band
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setFrequencyTier('sub');
                    sound.playClick(220);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-mono transition-all border ${
                    frequencyTier === 'sub'
                      ? 'bg-sky-500 text-black font-bold border-sky-400'
                      : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  Sub Bass (120Hz)
                </button>
                <button
                  onClick={() => {
                    setFrequencyTier('mid');
                    sound.playClick(440);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-mono transition-all border ${
                    frequencyTier === 'mid'
                      ? 'bg-sky-500 text-black font-bold border-sky-400'
                      : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  Mid Vocal (440Hz)
                </button>
                <button
                  onClick={() => {
                    setFrequencyTier('high');
                    sound.playClick(880);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-mono transition-all border ${
                    frequencyTier === 'high'
                      ? 'bg-sky-500 text-black font-bold border-sky-400'
                      : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  Air Spark (1.2kHz)
                </button>
              </div>
            </div>

            {/* Play Sound Button */}
            <button
              onClick={triggerSpatialPulse}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 text-black font-extrabold text-sm md:text-base flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-sky-500/20"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Synthesize Binaural Spatial Wave</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
