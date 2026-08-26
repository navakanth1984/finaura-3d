import React, { useRef } from 'react';
import { LoanProduct } from '../../lib/loan-products';
import { calculateEMI, formatINR, formatLakhCrore } from '../../lib/emi-engine';
import { sound } from '../../utils/audio';

interface KfsPdfReportGeneratorProps {
  product: LoanProduct;
  amount: number;
  rate: number;
  tenureYears: number;
}

export const KfsPdfReportGenerator: React.FC<KfsPdfReportGeneratorProps> = ({
  product,
  amount,
  rate,
  tenureYears,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateReport = () => {
    sound.playClick(750);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 1650;

    const emiResult = calculateEMI({ principal: amount, annualInterestRate: rate, tenureYears });

    // Background
    ctx.fillStyle = '#030305';
    ctx.fillRect(0, 0, 1200, 1650);

    // Accent Border
    ctx.strokeStyle = '#bef264';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1120, 1570);

    // High-Contrast Red/Amber Watermark (RBI Compliance Safe Harbor)
    ctx.save();
    ctx.translate(600, 825);
    ctx.rotate(-Math.PI / 5);
    ctx.font = '900 32px sans-serif';
    ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
    ctx.textAlign = 'center';
    ctx.fillText('INDICATIVE SUMMARY ONLY — NOT AN OFFICIAL RBI KFS', 0, -40);
    ctx.fillText('OFFICIAL KFS ISSUED ONLY BY REGULATED LENDER', 0, 40);
    ctx.restore();

    // Header
    ctx.fillStyle = '#bef264';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('FINAURA FINANCIAL ADVISORY // INDICATIVE COMPUTATION SHEET', 80, 110);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 44px sans-serif';
    ctx.fillText(product.productReportTitle.toUpperCase(), 80, 175);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '16px monospace';
    ctx.fillText(`DOCUMENT REF: FIN-INDICATIVE-${Date.now()}`, 80, 215);
    ctx.fillText(`DATE OF GENERATION: ${new Date().toLocaleDateString('en-IN')}`, 80, 240);

    // Summary Box
    ctx.fillStyle = '#0c0e18';
    ctx.fillRect(80, 280, 1040, 420);
    ctx.strokeStyle = 'rgba(190, 242, 100, 0.4)';
    ctx.strokeRect(80, 280, 1040, 420);

    ctx.fillStyle = '#bef264';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('I. INDICATIVE CREDIT TERMS & COMPUTED APR', 110, 325);

    const rows = [
      ['Loan Facility Type:', product.name],
      ['Principal Loan Amount:', `${formatINR(amount)} (${formatLakhCrore(amount)})`],
      ['Effective Rate of Interest:', `${rate.toFixed(2)}% per annum (Reducing Balance)`],
      ['Indicative APR:', `${emiResult.apr}% (Includes estimated processing fees)`],
      ['Repayment Tenure:', `${tenureYears} Years (${tenureYears * 12} Monthly Installments)`],
      ['Estimated Monthly EMI:', `${formatINR(emiResult.emi)} / month`],
      ['Total Interest Payable:', formatINR(emiResult.totalInterest)],
      ['Total Amount Repayable:', formatINR(emiResult.totalPayment)],
    ];

    rows.forEach((row, i) => {
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '16px monospace';
      ctx.fillText(row[0], 110, 370 + i * 36);

      ctx.fillStyle = i === 5 ? '#bef264' : '#ffffff';
      ctx.font = i === 5 ? 'bold 18px monospace' : '16px monospace';
      ctx.fillText(row[1], 550, 370 + i * 36);
    });

    // Schedule Summary
    ctx.fillStyle = '#0c0e18';
    ctx.fillRect(80, 730, 1040, 460);
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.4)';
    ctx.strokeRect(80, 730, 1040, 460);

    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('II. 5-YEAR AMORTIZATION PROJECTION SAMPLE', 110, 775);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = 'bold 15px monospace';
    ctx.fillText('YEAR', 110, 820);
    ctx.fillText('TOTAL EMI (INR)', 260, 820);
    ctx.fillText('PRINCIPAL (INR)', 520, 820);
    ctx.fillText('INTEREST (INR)', 780, 820);
    ctx.fillText('BALANCE (INR)', 960, 820);

    for (let yr = 1; yr <= Math.min(5, tenureYears); yr++) {
      const yearEntries = emiResult.amortization.filter((e) => e.year === yr);
      const yrPrincipal = yearEntries.reduce((sum, e) => sum + e.principalComponent, 0);
      const yrInterest = yearEntries.reduce((sum, e) => sum + e.interestComponent, 0);
      const yrBalance = yearEntries[yearEntries.length - 1]?.outstandingBalance || 0;

      ctx.fillStyle = '#ffffff';
      ctx.font = '15px monospace';
      ctx.fillText(`Year 0${yr}`, 110, 865 + (yr - 1) * 44);
      ctx.fillText(formatINR(emiResult.emi * 12), 260, 865 + (yr - 1) * 44);
      ctx.fillText(formatINR(yrPrincipal), 520, 865 + (yr - 1) * 44);
      ctx.fillText(formatINR(yrInterest), 780, 865 + (yr - 1) * 44);
      ctx.fillText(formatINR(yrBalance), 960, 865 + (yr - 1) * 44);
    }

    // Statutory Regulatory Disclaimer (RBI Safe Harbor)
    ctx.fillStyle = '#f87171';
    ctx.font = 'bold 15px monospace';
    ctx.fillText('III. STATUTORY REGULATORY NOTICE (RBI/2022-23/111 & DIRECTIONS 2025)', 80, 1240);

    ctx.fillStyle = '#d4d4d8';
    ctx.font = '13px sans-serif';
    ctx.fillText(
      '1. FINAURA is an independent Lending Service Provider (LSP) / technology aggregator and NOT a Bank or NBFC.',
      80,
      1270
    );
    ctx.fillText(
      '2. THIS DOCUMENT IS NOT A KEY FACT STATEMENT (KFS). Statutory KFS is issued solely by the Regulated Entity (Lender).',
      80,
      1295
    );
    ctx.fillText(
      '3. Final interest rates, processing charges, and loan terms remain subject to individual lender credit underwriting.',
      80,
      1320
    );
    ctx.fillText(
      '4. All borrower data is protected under the DPDP Act 2023 and stored on secure servers located in Mumbai, India.',
      80,
      1345
    );

    // Download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `FINAURA-Indicative-Summary-${product.id.toUpperCase()}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      <div id="kfs-downloader" onClick={generateReport} className="hidden" />
    </>
  );
};
