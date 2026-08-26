import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Activity, Radio, Volume2, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

export const AudioReactiveSection: React.FC = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [level, setLevel] = useState(0);

  const toggleMic = async () => {
    sound.playClick(600);
    const active = await sound.toggleMicrophone();
    setIsMicOn(active);
  };

  useEffect(() => {
    let animId: number;
    const loop = () => {
      setLevel(sound.getAudioFrequencyData());
      animId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section 
      id="audio-reactive" 
      aria-label="Real-time Audio Reactive 3D Visualizer"
      className="relative min-h-screen py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/30">
          <Activity className="w-3.5 h-3.5 text-[#bef264]" />
          REAL-TIME 64-BIN FFT FREQUENCY SPECTROGRAM
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">
          Acoustic Resonance Engine.
        </h2>
        <p className="mt-4 text-neutral-300 text-base md:text-lg">
          Speak, whistle, or play music to watch the 3D particle vortex and liquid metallic shaders deform to live audio frequencies.
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full p-8 md:p-12 rounded-3xl glass-card-active border border-[#bef264]/40 text-center shadow-2xl relative overflow-hidden">
        {/* Glowing Background Ring */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#bef264]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#22d3ee]/10 blur-3xl pointer-events-none" />

        {/* 32-Bar High-Energy Equalizer */}
        <div className="flex items-end justify-center gap-1.5 sm:gap-2 h-32 mb-8 px-4 bg-black/60 rounded-2xl border border-white/10 py-4 shadow-inner">
          {Array.from({ length: 32 }).map((_, i) => {
            const barHeight = Math.min(
              100,
              Math.max(8, Math.sin(i * 0.35 + level * 6) * 45 + level * 140 + Math.random() * 10)
            );
            return (
              <div
                key={i}
                className="w-full rounded-t-sm transition-all duration-75"
                style={{ 
                  height: `${barHeight}%`,
                  background: i % 3 === 0 
                    ? 'linear-gradient(to top, #bef264, #a3e635)' 
                    : i % 3 === 1 
                    ? 'linear-gradient(to top, #22d3ee, #06b6d4)' 
                    : 'linear-gradient(to top, #c084fc, #9333ea)'
                }}
              />
            );
          })}
        </div>

        {/* Microphone Toggle Button */}
        <button
          onClick={toggleMic}
          className={`px-9 py-4.5 rounded-full text-sm md:text-base font-display font-black uppercase tracking-wider flex items-center justify-center gap-3 mx-auto transition-all shadow-2xl active:scale-95 cursor-pointer ${
            isMicOn 
              ? 'bg-[#bef264] text-black shadow-[#bef264]/50 animate-pulse' 
              : 'bg-white text-black hover:bg-[#bef264] hover:text-black shadow-white/10'
          }`}
        >
          {isMicOn ? <Mic className="w-5 h-5 stroke-[2.5]" /> : <MicOff className="w-5 h-5 stroke-[2.5]" />}
          <span>{isMicOn ? 'Live Microphone Engaged (Speak Now)' : 'Connect Microphone for 3D Reactivity'}</span>
        </button>

        <p className="text-xs font-mono text-neutral-400 mt-4 font-semibold">
          {isMicOn ? '✓ Local FFT analysis running in client memory. Zero audio uploaded.' : '• Click to enable real-time Web Audio FFT stream.'}
        </p>
      </div>
    </section>
  );
};
