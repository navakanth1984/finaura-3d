import React, { useState, useMemo, Suspense, lazy } from 'react';
import { Calculator, Calendar, Landmark, ArrowRight } from 'lucide-react';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/ui/HeroSection';
import { LoanCalculatorSection } from './components/loans/LoanCalculatorSection';
import { AmortizationTable } from './components/loans/AmortizationTable';
import { LenderComparisonMatrix } from './components/loans/LenderComparisonMatrix';
import { PrepaymentSimulator } from './components/loans/PrepaymentSimulator';
import { LeadCaptureModal } from './components/loans/LeadCaptureModal';
import { KfsPdfReportGenerator } from './components/loans/KfsPdfReportGenerator';
import { FaqSection } from './components/ui/FaqSection';
import { Footer } from './components/ui/Footer';
import { LOAN_PRODUCTS, LoanProduct, LenderQuote } from './lib/loan-products';
import { calculateEMI } from './lib/emi-engine';
import { sound } from './utils/audio';

const AuraCanvas = lazy(() =>
  import('./components/3d/AuraCanvas').then((m) => ({ default: m.AuraCanvas }))
);

export function App() {
  const [calcState, setCalcState] = useState<{
    product: LoanProduct;
    amount: number;
    rate: number;
    tenureYears: number;
    emi: number;
  }>({
    product: LOAN_PRODUCTS.home,
    amount: LOAN_PRODUCTS.home.defaultAmount,
    rate: LOAN_PRODUCTS.home.defaultRate,
    tenureYears: LOAN_PRODUCTS.home.defaultTenureYears,
    emi: calculateEMI({
      principal: LOAN_PRODUCTS.home.defaultAmount,
      annualInterestRate: LOAN_PRODUCTS.home.defaultRate,
      tenureYears: LOAN_PRODUCTS.home.defaultTenureYears,
    }).emi,
  });
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // Download Trigger State
  const [kfsData, setKfsData] = useState<{
    product: LoanProduct;
    amount: number;
    rate: number;
    tenure: number;
  }>({
    product: LOAN_PRODUCTS.home,
    amount: LOAN_PRODUCTS.home.defaultAmount,
    rate: LOAN_PRODUCTS.home.defaultRate,
    tenure: LOAN_PRODUCTS.home.defaultTenureYears,
  });

  const emiResult = useMemo(() => {
    return calculateEMI({
      principal: calcState.amount,
      annualInterestRate: calcState.rate,
      tenureYears: calcState.tenureYears,
    }, calcState.product.processingFeePercent);
  }, [calcState.amount, calcState.rate, calcState.tenureYears, calcState.product.processingFeePercent]);

  const scrollToSection = (id: string) => {
    sound.playClick(500);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyClick = (product: LoanProduct, amount: number, emi: number, tenure: number) => {
    setCalcState((prev) => ({ ...prev, product, amount, emi, tenureYears: tenure }));
    setIsLeadModalOpen(true);
  };

  const handleDownloadKfs = (product: LoanProduct, amount: number, rate: number, tenure: number) => {
    setKfsData({ product, amount, rate, tenure });
    setTimeout(() => {
      const trigger = document.getElementById('kfs-downloader');
      if (trigger) trigger.click();
    }, 100);
  };

  const handleSelectLender = (lender: LenderQuote) => {
    const lenderEmi = calculateEMI({
      principal: calcState.amount,
      annualInterestRate: lender.baseRate,
      tenureYears: calcState.tenureYears,
    }).emi;
    setCalcState((prev) => ({ ...prev, rate: lender.baseRate, emi: lenderEmi }));
    setIsLeadModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#030305] text-[#f4f4f6] selection:bg-[#bef264] selection:text-black pb-20 md:pb-0">
      {/* Background 3D WebGL Canvas Layer (Decoupled 120 FPS Lerped Scroll) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <Suspense fallback={<div className="fixed inset-0 bg-[#030305]" />}>
          <AuraCanvas finish="obsidian" />
        </Suspense>
      </div>

      {/* Foreground Content Layer */}
      <div className="relative z-10">
        <Navbar onPreOrderClick={() => setIsLeadModalOpen(true)} />

        <main>
          <HeroSection 
            onExploreClick={() => scrollToSection('loan-calculator')}
            onApplyClick={() => setIsLeadModalOpen(true)}
          />

          <LoanCalculatorSection 
            onApplyLeadClick={handleApplyClick}
            onDownloadKfsClick={handleDownloadKfs}
            onStateChange={setCalcState}
          />

          <AmortizationTable amortization={emiResult.amortization} />

          <LenderComparisonMatrix 
            amount={calcState.amount}
            tenureYears={calcState.tenureYears}
            onSelectLender={handleSelectLender}
          />

          <PrepaymentSimulator 
            amount={calcState.amount}
            rate={calcState.rate}
            tenureYears={calcState.tenureYears}
          />

          <FaqSection />
        </main>

        <Footer />
      </div>

      {/* Mobile Sticky Thumb Action Bar (Active on < md screens) */}
      <aside 
        aria-label="Mobile Quick Navigation"
        className="fixed bottom-3 left-3 right-3 z-40 md:hidden pointer-events-auto"
      >
        <div className="flex items-center justify-around p-1.5 rounded-2xl glass-card-active border border-white/20 shadow-2xl backdrop-blur-2xl bg-black/85">
          <button
            onClick={() => scrollToSection('loan-calculator')}
            className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl text-[10px] font-mono font-bold text-neutral-300 hover:text-[#bef264] active:scale-95 transition-all min-h-[44px] justify-center cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-[#bef264]" />
            <span>Calculator</span>
          </button>

          <button
            onClick={() => scrollToSection('amortization')}
            className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl text-[10px] font-mono font-bold text-neutral-300 hover:text-[#22d3ee] active:scale-95 transition-all min-h-[44px] justify-center cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#22d3ee]" />
            <span>Schedule</span>
          </button>

          <button
            onClick={() => scrollToSection('lenders')}
            className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl text-[10px] font-mono font-bold text-neutral-300 hover:text-[#fbbf24] active:scale-95 transition-all min-h-[44px] justify-center cursor-pointer"
          >
            <Landmark className="w-4 h-4 text-[#fbbf24]" />
            <span>Lenders</span>
          </button>

          <button
            onClick={() => {
              sound.playClick(620);
              setIsLeadModalOpen(true);
            }}
            className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-[#bef264] text-black text-[11px] font-display font-black tracking-wider uppercase active:scale-95 transition-all shadow-md shadow-[#bef264]/25 min-h-[44px] cursor-pointer"
          >
            <span>Pre-Qualify</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </aside>

      {/* DPDP Compliant Priority Lead Capture Dialog */}
      <LeadCaptureModal 
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        product={calcState.product}
        amount={calcState.amount}
        emi={calcState.emi}
        tenureYears={calcState.tenureYears}
      />

      {/* Hidden 4K KFS Report Canvas Generator */}
      <KfsPdfReportGenerator 
        product={kfsData.product}
        amount={kfsData.amount}
        rate={kfsData.rate}
        tenureYears={kfsData.tenure}
      />
    </div>
  );
}

export default App;
