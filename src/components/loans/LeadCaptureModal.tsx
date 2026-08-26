import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Lock, User, Phone, Mail, Building, CreditCard, Info } from 'lucide-react';
import { LoanProduct } from '../../lib/loan-products';
import { ConsentManager } from '../../lib/consent-manager';
import { formatINR, formatLakhCrore } from '../../lib/emi-engine';
import { sound } from '../../utils/audio';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: LoanProduct;
  amount: number;
  emi: number;
  tenureYears: number;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  product,
  amount,
  emi,
  tenureYears,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [cibilScore, setCibilScore] = useState('750+ (Excellent)');
  
  // DPDP Act 2023 Section 6(1) Compliance: Checkboxes MUST default to FALSE (un-ticked)
  const [consentCibil, setConsentCibil] = useState(false);
  const [consentRouting, setConsentRouting] = useState(false);
  const [consentWhatsapp, setConsentWhatsapp] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [assignedAgent, setAssignedAgent] = useState<{ name: string; title: string; token: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;
    if (!consentRouting) {
      alert('Please provide consent to route your inquiry to RBI-regulated lenders to proceed.');
      return;
    }

    sound.playClick(880);

    // Create DPDP Record without storing plain PII in client localStorage
    const consent = ConsentManager.createConsentRecord(
      product.name,
      amount,
      {
        cibilInquiry: consentCibil,
        lenderRouting: consentRouting,
        whatsappUpdates: consentWhatsapp,
      }
    );

    setAssignedAgent({
      name: 'Priya Sharma, CFA',
      title: 'Senior Banking Arbitrage Specialist',
      token: consent.consentId,
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in">
      <div 
        className="relative w-full max-w-xl p-8 md:p-10 rounded-3xl glass-card-active border border-[#bef264]/40 shadow-2xl bg-[#030305]/95 text-white max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={() => {
            sound.playClick(300);
            onClose();
          }}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/30">
                PRIORITY LENDER DISPATCH // ZERO BROKERAGE
              </span>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-black text-white">
              Unlock Pre-Approved {product.name}
            </h3>
            <p className="mt-2 text-xs md:text-sm text-neutral-300">
              Selected Facility: <strong className="text-[#bef264] font-mono">{formatINR(amount)}</strong> ({formatLakhCrore(amount)}) @ approx <strong className="text-[#22d3ee] font-mono">{formatINR(emi)}/mo</strong>.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-2 font-bold">
                    Full Legal Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-4 top-4" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Navakanth Reddy"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#bef264] font-mono text-xs transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-2 font-bold">
                    10-Digit Mobile Phone
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-4 top-4" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#bef264] font-mono text-xs transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-2 font-bold">
                    Official Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-4 top-4" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#bef264] font-mono text-xs transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-2 font-bold">
                    City of Residence
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#bef264] font-mono text-xs transition-colors cursor-pointer"
                  >
                    <option value="Mumbai">Mumbai / MMR</option>
                    <option value="Bengaluru">Bengaluru / Bangalore</option>
                    <option value="Delhi-NCR">Delhi / Gurgaon / Noida</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Pune">Pune</option>
                    <option value="Other">Other Tier 1/2 Cities</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-2 font-bold">
                  Estimated CIBIL Score Tier
                </label>
                <select
                  value={cibilScore}
                  onChange={(e) => setCibilScore(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#bef264] font-mono text-xs transition-colors cursor-pointer"
                >
                  <option value="750+ (Excellent)">750+ (Excellent — Prime Rates)</option>
                  <option value="700-749 (Good)">700 - 749 (Good — Standard Pre-Qualification)</option>
                  <option value="650-699 (Fair)">650 - 699 (Fair — Subject to Policy)</option>
                  <option value="New to Credit">No Credit History / First-Time Borrower</option>
                </select>
              </div>

              {/* DPDP Act 2023 Section 5 & 6 Affirmative Opt-In Consent Form */}
              <div className="p-4 rounded-2xl bg-black/70 border border-white/10 space-y-2 text-[11px] font-mono text-neutral-300">
                <div className="flex items-center gap-1.5 text-white font-bold mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#bef264]" />
                  <span>DPDP Act 2023 Statutory Consent (Affirmative Opt-In)</span>
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentRouting}
                    onChange={(e) => setConsentRouting(e.target.checked)}
                    className="accent-[#bef264] mt-0.5"
                    required
                  />
                  <span>
                    <strong className="text-white">Required:</strong> I authorize FINAURA (LSP) to transmit my credit request to RBI-regulated Scheduled Commercial Banks for indicative pre-approval.
                  </span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentCibil}
                    onChange={(e) => setConsentCibil(e.target.checked)}
                    className="accent-[#bef264] mt-0.5"
                  />
                  <span>Authorize soft CIBIL inquiry without impacting my credit score.</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentWhatsapp}
                    onChange={(e) => setConsentWhatsapp(e.target.checked)}
                    className="accent-[#bef264] mt-0.5"
                  />
                  <span>Receive rate quotes and updates via end-to-end encrypted WhatsApp.</span>
                </label>

                <div className="pt-2 border-t border-white/10 text-[10px] text-neutral-400">
                  <span>Data stored locally in India. You may withdraw consent anytime via </span>
                  <a href="mailto:grievance-officer@finaura3d.loans" className="text-[#bef264] underline">grievance-officer@finaura3d.loans</a>.
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4.5 rounded-2xl bg-[#bef264] text-black font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#d9f99d] active:scale-95 transition-all shadow-xl shadow-[#bef264]/30 cursor-pointer"
              >
                <span>Generate Verified Pre-Approval Offers</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#bef264]/20 border border-[#bef264]/40 text-[#bef264] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5] text-[#bef264]" />
            </div>
            <h3 className="font-display text-3xl font-black text-white">Application Dispatched!</h3>
            <p className="mt-2 text-xs md:text-sm text-neutral-300 max-w-md mx-auto">
              Your request for <strong className="text-[#bef264]">{product.name}</strong> ({formatINR(amount)}) has been logged with cryptographic DPDP Token:
            </p>
            <div className="mt-4 p-4 rounded-2xl bg-black/60 border border-[#bef264]/40 font-mono text-xs text-[#22d3ee] inline-block">
              {assignedAgent?.token}
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono text-left space-y-1">
              <div className="text-white font-bold">Assigned Portfolio Specialist:</div>
              <div className="text-[#bef264]">{assignedAgent?.name} ({assignedAgent?.title})</div>
              <div className="text-neutral-400">Response SLA: Within 15 minutes during standard banking hours.</div>
            </div>

            <button
              onClick={onClose}
              className="mt-8 px-8 py-3.5 rounded-full bg-white text-black font-display font-black uppercase text-xs hover:bg-[#bef264] transition-colors cursor-pointer"
            >
              Return to Platform
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
