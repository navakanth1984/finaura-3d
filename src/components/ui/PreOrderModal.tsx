import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Zap, ArrowRight, Lock, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  finish: 'obsidian' | 'aurora' | 'gold' | 'cyber';
}

export const PreOrderModal: React.FC<PreOrderModalProps> = ({ isOpen, onClose, finish }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sound.playClick(880);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in">
      <div 
        className="relative w-full max-w-lg p-8 md:p-10 rounded-3xl glass-card-active border border-[#bef264]/40 shadow-2xl bg-[#030305]/95 text-white"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={() => {
            sound.playClick(300);
            onClose();
          }}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/30">
                BATCH 01 // FOUNDER PRIORITY
              </span>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-black text-white">
              Reserve AURA X-1
            </h3>
            <p className="mt-2 text-sm text-neutral-300">
              Selected Finish: <span className="font-mono text-[#bef264] capitalize font-bold">{finish} Titanium Edition</span>
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-2 font-bold">
                  VIP Priority Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#bef264] font-mono transition-colors"
                />
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">Reserve Deposit</span>
                <span className="text-[#bef264] font-bold text-sm">$0.00 (Risk Free)</span>
              </div>

              <button
                type="submit"
                className="w-full py-4.5 rounded-2xl bg-[#bef264] text-black font-display font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#d9f99d] active:scale-95 transition-all shadow-xl shadow-[#bef264]/30 cursor-pointer"
              >
                <span>Confirm Priority Founder Access</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-neutral-400 font-mono">
              <Lock className="w-3.5 h-3.5 text-[#bef264]" />
              <span>30-Day Studio Trial • Global Expedited Freight</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#bef264]/20 border border-[#bef264]/40 text-[#bef264] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="font-display text-3xl font-black text-white">Priority Spot Locked!</h3>
            <p className="mt-2 text-sm text-neutral-300">
              Encrypted token sent to <span className="font-mono text-[#bef264]">{email}</span>.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-8 py-3 rounded-full bg-white text-black font-display font-black uppercase text-xs hover:bg-[#bef264] transition-colors cursor-pointer"
            >
              Return to Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
