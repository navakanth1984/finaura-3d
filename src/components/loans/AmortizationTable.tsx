import React, { useState, useMemo } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Download, Filter, Search } from 'lucide-react';
import { AmortizationEntry, formatINR } from '../../lib/emi-engine';
import { sound } from '../../utils/audio';

interface AmortizationTableProps {
  amortization: AmortizationEntry[];
}

export const AmortizationTable: React.FC<AmortizationTableProps> = ({ amortization }) => {
  const [viewMode, setViewMode] = useState<'yearly' | 'monthly'>('yearly');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Group by year for yearly summary
  const yearlySummary = useMemo(() => {
    const years: Record<number, { year: number; principal: number; interest: number; total: number; balance: number }> = {};
    amortization.forEach((entry) => {
      if (!years[entry.year]) {
        years[entry.year] = { year: entry.year, principal: 0, interest: 0, total: 0, balance: entry.outstandingBalance };
      }
      years[entry.year].principal += entry.principalComponent;
      years[entry.year].interest += entry.interestComponent;
      years[entry.year].total += entry.emi;
      years[entry.year].balance = entry.outstandingBalance;
    });
    return Object.values(years);
  }, [amortization]);

  const totalPages = Math.max(1, Math.ceil(amortization.length / itemsPerPage));
  const currentMonthlyData = amortization.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const exportCSV = () => {
    sound.playClick(700);
    const headers = 'Month,Year,EMI (INR),Principal (INR),Interest (INR),Outstanding Balance (INR)\n';
    const rows = amortization
      .map((e) => `${e.month},${e.year},${e.emi},${e.principalComponent},${e.interestComponent},${e.outstandingBalance}`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Amortization-Schedule-${Date.now()}.csv`;
    link.click();
  };

  return (
    <section 
      id="amortization" 
      aria-label="Amortization Schedule"
      className="relative min-h-screen py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#22d3ee] bg-[#22d3ee]/10 border border-[#22d3ee]/30">
          <Calendar className="w-3.5 h-3.5 text-[#22d3ee]" />
          PRINCIPAL &amp; INTEREST ALLOCATION
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">
          Amortization Schedule.
        </h2>
        <p className="mt-4 text-neutral-300 text-base md:text-lg">
          Detailed yearly and monthly schedule outlining principal liquidation, interest allocation, and outstanding balance.
        </p>
      </div>

      <div className="rounded-3xl glass-card-active border border-[#22d3ee]/30 overflow-hidden shadow-2xl p-4 sm:p-6 md:p-8">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-black/60 p-1 sm:p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => {
                sound.playClick(500);
                setViewMode('yearly');
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer min-h-[38px] ${
                viewMode === 'yearly' ? 'bg-[#22d3ee] text-black shadow-lg shadow-[#22d3ee]/20' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Annual Summary
            </button>
            <button
              onClick={() => {
                sound.playClick(550);
                setViewMode('monthly');
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer min-h-[38px] ${
                viewMode === 'monthly' ? 'bg-[#22d3ee] text-black shadow-lg shadow-[#22d3ee]/20' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly Installments
            </button>
          </div>

          <button
            onClick={exportCSV}
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer min-h-[38px]"
          >
            <Download className="w-3.5 h-3.5 text-[#22d3ee]" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
          <table className="w-full text-left border-collapse min-w-[540px] sm:min-w-full">
            <thead>
              <tr className="border-b border-white/10 bg-black/60 text-xs font-mono text-neutral-400">
                <th className="py-3 px-3 sm:py-4 sm:px-6">{viewMode === 'yearly' ? 'Period' : 'Month (Yr)'}</th>
                <th className="py-3 px-3 sm:py-4 sm:px-6">Installment</th>
                <th className="py-3 px-3 sm:py-4 sm:px-6 text-[#bef264]">Principal</th>
                <th className="py-3 px-3 sm:py-4 sm:px-6 text-[#22d3ee]">Interest</th>
                <th className="py-3 px-3 sm:py-4 sm:px-6 text-neutral-300">Ending Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs text-neutral-300">
              {amortization.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-neutral-500 font-mono">
                    No active repayment schedule generated. Enter loan parameters above.
                  </td>
                </tr>
              ) : viewMode === 'yearly'
                ? yearlySummary.map((row) => (
                    <tr key={row.year} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 sm:py-4 sm:px-6 font-bold text-white">Year {row.year}</td>
                      <td className="py-3 px-3 sm:py-4 sm:px-6 font-semibold">{formatINR(row.total)}</td>
                      <td className="py-3 px-3 sm:py-4 sm:px-6 font-bold text-[#bef264]">{formatINR(row.principal)}</td>
                      <td className="py-3 px-3 sm:py-4 sm:px-6 font-bold text-[#22d3ee]">{formatINR(row.interest)}</td>
                      <td className="py-3 px-3 sm:py-4 sm:px-6 text-neutral-400">{formatINR(row.balance)}</td>
                    </tr>
                  ))
                : currentMonthlyData.map((row) => (
                    <tr key={row.month} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 sm:py-4 sm:px-6 font-bold text-white">Mo {row.month} (Y{row.year})</td>
                      <td className="py-3 px-3 sm:py-4 sm:px-6 font-semibold">{formatINR(row.emi)}</td>
                      <td className="py-3 px-3 sm:py-4 sm:px-6 font-bold text-[#bef264]">{formatINR(row.principalComponent)}</td>
                      <td className="py-3 px-3 sm:py-4 sm:px-6 font-bold text-[#22d3ee]">{formatINR(row.interestComponent)}</td>
                      <td className="py-3 px-3 sm:py-4 sm:px-6 text-neutral-400">{formatINR(row.outstandingBalance)}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Monthly Pagination Controls */}
        {viewMode === 'monthly' && totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-white/10 text-xs font-mono">
            <span className="text-neutral-400">
              Page {currentPage} of {totalPages} ({amortization.length} Total Installments)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick(400);
                  setCurrentPage((p) => Math.max(1, p - 1));
                }}
                disabled={currentPage === 1}
                className="px-3.5 py-1.5 rounded-xl bg-black/60 border border-white/10 hover:border-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer min-h-[36px]"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  sound.playClick(400);
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                }}
                disabled={currentPage === totalPages}
                className="px-3.5 py-1.5 rounded-xl bg-black/60 border border-white/10 hover:border-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer min-h-[36px]"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
