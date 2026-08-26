import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/audio';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How does the RBI-compliant reducing-balance EMI calculation work?",
    answer: "Our engine uses the standard reducing-balance method where monthly interest is calculated only on the remaining outstanding principal. As you repay principal every month, the interest charge shrinks progressively."
  },
  {
    question: "What is an Annual Percentage Rate (APR) and why is it important?",
    answer: "Pursuant to RBI Digital Lending guidelines, APR reflects the true annualized cost of borrowing, incorporating not just the nominal interest rate but also upfront processing charges, documentation fees, and insurance costs calculated via Newton-Raphson Internal Rate of Return (IRR)."
  },
  {
    question: "How does the PMAY 2.0 Interest Subsidy Scheme apply to Home Loans?",
    answer: "Under Pradhan Mantri Awas Yojana (PMAY 2.0 Urban), eligible first-time homebuyers in EWS/LIG/MIG categories can claim interest subsidies up to ₹1.80 Lakhs crediting directly against their home loan principal, reducing monthly EMIs."
  },
  {
    question: "Does checking pre-approval on FINAURA impact my CIBIL credit score?",
    answer: "No. Initial pre-approval checks perform a 'Soft Credit Inquiry' which does not negatively affect your CIBIL or Experian credit rating in any way."
  },
  {
    question: "How is my personal information protected under the DPDP Act 2023?",
    answer: "FINAURA operates as a licensed Data Fiduciary under the Digital Personal Data Protection (DPDP) Act 2023. Your contact and financial details are encrypted, purpose-bound, and never shared with unauthorized third-party telemarketers."
  }
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    sound.playClick(openIdx === idx ? 400 : 560);
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section 
      id="faq" 
      aria-label="Frequently Asked Financial Questions"
      className="relative min-h-screen py-24 px-4 md:px-12 max-w-4xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/30">
          <HelpCircle className="w-3.5 h-3.5 text-[#bef264]" />
          REGULATORY & LENDING KNOWLEDGE BASE
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">
          Frequently Asked Questions.
        </h2>
        <p className="mt-4 text-neutral-300 text-base md:text-lg">
          Essential details on interest rates, tax benefits under Section 24(b)/80C, and borrower data protection.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx}
              className={`rounded-3xl transition-all duration-300 overflow-hidden border ${
                isOpen 
                  ? 'glass-card-active border-[#bef264]/60 shadow-xl shadow-[#bef264]/10' 
                  : 'glass-card border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                onMouseEnter={() => sound.playHover(520)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-display font-bold text-white text-base md:text-lg">
                  {faq.question}
                </span>
                <div className={`p-2.5 rounded-full bg-white/5 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#bef264] text-black font-black' : 'text-neutral-400'}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-sm md:text-base text-neutral-300 leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
