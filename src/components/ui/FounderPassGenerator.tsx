import React, { useState, useRef } from 'react';
import { Download, Sparkles, ShieldCheck, QrCode, Cpu, User, ArrowUpRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface FounderPassGeneratorProps {
  finish: 'obsidian' | 'aurora' | 'gold' | 'cyber';
}

export const FounderPassGenerator: React.FC<FounderPassGeneratorProps> = ({ finish }) => {
  const [callsign, setCallsign] = useState('CYBER_AUDIOPHILE');
  const [serialNumber] = useState(`AUR-2026-${Math.floor(100000 + Math.random() * 900000)}`);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateAndDownloadPass = () => {
    sound.playClick(780);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 630;

    // 1. Background Deep Space Obsidian
    const bgGradient = ctx.createLinearGradient(0, 0, 1200, 630);
    bgGradient.addColorStop(0, '#030305');
    bgGradient.addColorStop(1, '#0c0e18');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1200, 630);

    // 2. Neon Grid Lines
    ctx.strokeStyle = 'rgba(190, 242, 100, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1200; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 630);
      ctx.stroke();
    }
    for (let y = 0; y < 630; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1200, y);
      ctx.stroke();
    }

    // 3. Acid Hologram Border
    ctx.strokeStyle = '#bef264';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(40, 40, 1120, 550);

    // 4. Header & Branding
    ctx.fillStyle = '#bef264';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('AURA NEURAL LABORATORIES // FOUNDER ALLOCATION', 70, 95);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 64px sans-serif';
    ctx.fillText('VIP ACCESS PASS', 70, 175);

    // 5. Callsign & Finish Details
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '18px monospace';
    ctx.fillText('FOUNDER CALLSIGN / NAME', 70, 240);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px monospace';
    ctx.fillText(callsign.toUpperCase() || 'ANONYMOUS VIP', 70, 285);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '18px monospace';
    ctx.fillText('HARDWARE FINISH SPECIFICATION', 70, 350);

    ctx.fillStyle = '#bef264';
    ctx.font = 'bold 32px monospace';
    ctx.fillText(`${finish.toUpperCase()} TITANIUM EDITION`, 70, 395);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '18px monospace';
    ctx.fillText('CRYPTOGRAPHIC SECURITY SERIAL', 70, 460);

    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 26px monospace';
    ctx.fillText(serialNumber, 70, 500);

    // 6. Right Barcode Box
    ctx.fillStyle = '#08090e';
    ctx.fillRect(840, 95, 280, 450);
    ctx.strokeStyle = 'rgba(190, 242, 100, 0.4)';
    ctx.strokeRect(840, 95, 280, 450);

    ctx.fillStyle = '#bef264';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('FOUNDER TOKEN 01', 865, 140);

    // Barcode stripes
    for (let bx = 865; bx < 1080; bx += 8) {
      const w = (bx % 3 === 0) ? 5 : 2;
      ctx.fillStyle = (bx % 2 === 0) ? '#bef264' : '#ffffff';
      ctx.fillRect(bx, 170, w, 330);
    }

    // Trigger Download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `AURA-VIP-${callsign.replace(/\s+/g, '-')}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <section 
      id="founder-pass" 
      aria-label="Generate Custom VIP Founder Access Card"
      className="relative min-h-screen py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#bef264]" />
          HOLOGRAPHIC VIP ACCESS CARD ENGINE
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">
          Claim Your Founder Allocation.
        </h2>
        <p className="mt-4 text-neutral-300 text-base md:text-lg">
          Generate an encrypted, high-resolution digital pass for your AURA X-1 reservation.
        </p>
      </div>

      <div className="max-w-2xl mx-auto w-full p-8 md:p-10 rounded-3xl glass-card-active border border-[#bef264]/40 shadow-2xl relative overflow-hidden">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-neutral-300 uppercase mb-2 font-bold tracking-wider">
              Audiophile Callsign / Full Name
            </label>
            <input
              type="text"
              value={callsign}
              onChange={(e) => setCallsign(e.target.value)}
              placeholder="e.g. CYBER_AUDIOPHILE"
              className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#bef264] font-mono transition-colors"
            />
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">Selected Hardware Finish:</span>
            <span className="text-[#bef264] font-bold capitalize">{finish} Titanium Edition</span>
          </div>

          <button
            onClick={generateAndDownloadPass}
            className="w-full py-4.5 rounded-2xl bg-[#bef264] text-black font-display font-black text-sm md:text-base uppercase tracking-wider flex items-center justify-center gap-2.5 active:scale-95 transition-all shadow-xl shadow-[#bef264]/30 hover:bg-[#d9f99d] cursor-pointer"
          >
            <Download className="w-5 h-5 stroke-[2.5]" />
            <span>Generate & Download 4K Founder Pass (PNG)</span>
          </button>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </section>
  );
};
