import React from 'react';
import { useApp } from '../../context/AppContext';
import { Download, FileSpreadsheet, Calendar, Percent } from 'lucide-react';

export const TaxReportsPage: React.FC = () => {
  const { showToast } = useApp();

  const liabilities = [
    { jurisdiction: 'California CDTFA', taxableSales: 412500, taxCollected: 38156.25, rate: '9.25% (Avg)', status: 'Remitted' },
    { jurisdiction: 'New York DTF', taxableSales: 284000, taxCollected: 25205.00, rate: '8.875%', status: 'Due in 5 Days' },
    { jurisdiction: 'Texas Comptroller', taxableSales: 195000, taxCollected: 16087.50, rate: '8.25%', status: 'Due in 12 Days' },
    { jurisdiction: 'European Union (OSS VAT)', taxableSales: 340000, taxCollected: 68000.00, rate: '20.0% (Avg)', status: 'Remitted' },
    { jurisdiction: 'United Kingdom HMRC', taxableSales: 120000, taxCollected: 24000.00, rate: '20.0%', status: 'Remitted' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Tax Liability & Remittance Reports</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Jurisdiction-by-jurisdiction nexus breakdown, quarterly filing liabilities, and export packages for CPA audit.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'success', title: 'Tax Package Downloaded', message: 'Generated zip file containing CSV & PDF state filings.' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Filing Package (Q3 2026)</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase">
              <th className="p-4">Tax Authority / Jurisdiction</th>
              <th className="p-4">Gross Taxable Sales</th>
              <th className="p-4">Effective Rate</th>
              <th className="p-4">Net Tax Collected</th>
              <th className="p-4">Remittance Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0] font-mono">
            {liabilities.map((item, idx) => (
              <tr key={idx} className="hover:bg-[#F8F9FC]">
                <td className="p-4 font-sans font-bold text-[#111827]">{item.jurisdiction}</td>
                <td className="p-4 text-[#111827]">${item.taxableSales.toLocaleString()}</td>
                <td className="p-4 text-[#6B7280]">{item.rate}</td>
                <td className="p-4 font-bold text-emerald-600">${item.taxCollected.toLocaleString()}</td>
                <td className="p-4 font-sans">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.status === 'Remitted'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
