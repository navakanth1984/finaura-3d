import React from 'react';
import { SlidersHorizontal, Check, Zap, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/audio';

interface SpecRow {
  category: string;
  feature: string;
  auraSpec: string;
  standardSpec: string;
}

const SPECS_DATA: SpecRow[] = [
  {
    category: 'Transducer',
    feature: 'Driver Architecture',
    auraSpec: '45mm Pure Beryllium Solid Vapor Dome',
    standardSpec: '40mm Titanium/Polymer Dynamic',
  },
  {
    category: 'Acoustics',
    feature: 'Frequency Range',
    auraSpec: '4 Hz – 52,000 Hz (Ultrasonic)',
    standardSpec: '20 Hz – 20,000 Hz',
  },
  {
    category: 'Digital Engine',
    feature: 'Internal DAC / Processing',
    auraSpec: 'Quad 32-bit / 384kHz Neural DSP',
    standardSpec: 'Single 24-bit / 48kHz Codec',
  },
  {
    category: 'Spatial Tracking',
    feature: 'Kinematic 6DoF Refresh',
    auraSpec: '1,000 Hz Dual IMU with Edge Kalman AI',
    standardSpec: '100 Hz Bluetooth Gyro',
  },
  {
    category: 'Wireless Link',
    feature: 'Transceiver Latency',
    auraSpec: '1.2ms Ultra-Wideband RF Bridge',
    standardSpec: '45ms – 120ms standard AAC/SBC',
  },
  {
    category: 'Battery & Power',
    feature: 'Active Spatial Playback',
    auraSpec: '48 Hours (Fast Charge: 15m = 10 hrs)',
    standardSpec: '24–30 Hours',
  },
];

export const SpecsMatrix: React.FC = () => {
  return (
    <section 
      id="specs" 
      aria-label="Acoustic Technical Specifications"
      className="relative min-h-screen py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/30">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#bef264]" />
          BENCHMARK MATRIX
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">
          Acoustic Precision Matrix.
        </h2>
        <p className="mt-4 text-neutral-300 text-base md:text-lg">
          Benchmarked against industry reference studio monitors and spatial flagships.
        </p>
      </div>

      <div className="rounded-3xl glass-card-active border border-[#bef264]/30 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/60 text-xs font-mono text-neutral-400">
                <th className="py-5 px-6">Domain</th>
                <th className="py-5 px-6">Specification</th>
                <th className="py-5 px-6 text-[#bef264] font-black bg-[#bef264]/10">AURA X-1 (Neural Reference)</th>
                <th className="py-5 px-6 text-neutral-400">Standard Flagship Wireless</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-sans">
              {SPECS_DATA.map((row, idx) => (
                <tr 
                  key={idx} 
                  className="hover:bg-white/5 transition-colors group"
                  onMouseEnter={() => sound.playHover(500 + idx * 40)}
                >
                  <td className="py-5 px-6 font-mono text-xs text-neutral-400">{row.category}</td>
                  <td className="py-5 px-6 font-bold text-white">{row.feature}</td>
                  <td className="py-5 px-6 font-extrabold text-[#bef264] bg-[#bef264]/5 group-hover:bg-[#bef264]/10 transition-colors flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#bef264] stroke-[3] shrink-0" />
                    <span>{row.auraSpec}</span>
                  </td>
                  <td className="py-5 px-6 text-neutral-400 font-mono text-xs">{row.standardSpec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
