import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pagination } from '../../components/common/Pagination';
import { DollarSign, Search, Download, ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react';

interface LedgerEntry {
  id: string;
  txHash: string;
  orderNumber: string;
  type: 'charge' | 'refund' | 'payout' | 'chargeback' | 'dispute_fee';
  gateway: string;
  grossAmount: number;
  feeAmount: number;
  netAmount: number;
  currency: string;
  status: 'settled' | 'pending' | 'failed' | 'reversed';
  timestamp: string;
}

export const TransactionLedgerPage: React.FC = () => {
  const { showToast } = useApp();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const transactions: LedgerEntry[] = [
    {
      id: 'tx_01',
      txHash: 'ch_3M4k92Jsh219s',
      orderNumber: 'ORD-2026-9841',
      type: 'charge',
      gateway: 'Stripe (Visa 4242)',
      grossAmount: 349.99,
      feeAmount: 10.45,
      netAmount: 339.54,
      currency: 'USD',
      status: 'settled',
      timestamp: '2026-08-14 20:12 UTC',
    },
    {
      id: 'tx_02',
      txHash: 're_882910Jksad',
      orderNumber: 'ORD-2026-9835',
      type: 'refund',
      gateway: 'Stripe',
      grossAmount: -89.0,
      feeAmount: 0.0,
      netAmount: -89.0,
      currency: 'USD',
      status: 'settled',
      timestamp: '2026-08-14 18:40 UTC',
    },
    {
      id: 'tx_03',
      txHash: 'py_9921049182',
      orderNumber: 'ORD-2026-9840',
      type: 'charge',
      gateway: 'PayPal Express',
      grossAmount: 1250.0,
      feeAmount: 44.12,
      netAmount: 1205.88,
      currency: 'USD',
      status: 'settled',
      timestamp: '2026-08-14 16:30 UTC',
    },
    {
      id: 'tx_04',
      txHash: 'kl_29104881',
      orderNumber: 'ORD-2026-9839',
      type: 'charge',
      gateway: 'Klarna Pay in 4',
      grossAmount: 199.99,
      feeAmount: 12.28,
      netAmount: 187.71,
      currency: 'USD',
      status: 'settled',
      timestamp: '2026-08-14 14:15 UTC',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Financial Transaction Ledger</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Double-entry settlement logs, gateway processing interchange fees, chargebacks, and net merchant balances.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'success', title: 'Ledger Exported', message: 'Downloading GAAP/IFRS formatted CSV ledger balance...' })}
          className="px-3.5 py-1.5 bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] text-[#111827] rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5 text-[#5B6FF5]" />
          <span>Export Ledger (CSV/QuickBooks)</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Gross Processing (24h)</div>
          <div className="text-xl font-black text-[#111827] font-mono mt-1">$28,490.50</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Interchange / Gateway Fees</div>
          <div className="text-xl font-black text-rose-600 font-mono mt-1">-$842.10 (2.95%)</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Net Merchant Payout</div>
          <div className="text-xl font-black text-emerald-600 font-mono mt-1">$27,648.40</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Chargeback Dispute Rate</div>
          <div className="text-xl font-black text-emerald-600 font-mono mt-1">0.04%</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by transaction ID, order #, or card..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs outline-hidden"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase">
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Associated Order</th>
                <th className="p-4">Gateway & Rail</th>
                <th className="p-4">Gross</th>
                <th className="p-4">Fee</th>
                <th className="p-4">Net Payout</th>
                <th className="p-4">Settlement Status</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8F0] font-mono">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#F8F9FC]">
                  <td className="p-4 font-bold text-[#5B6FF5]">{tx.txHash}</td>
                  <td className="p-4 text-[#111827] font-semibold">{tx.orderNumber}</td>
                  <td className="p-4 font-sans text-[#4B5563]">{tx.gateway}</td>
                  <td className={`p-4 font-bold ${tx.grossAmount < 0 ? 'text-rose-600' : 'text-[#111827]'}`}>
                    ${tx.grossAmount.toFixed(2)}
                  </td>
                  <td className="p-4 text-rose-600">-${tx.feeAmount.toFixed(2)}</td>
                  <td className="p-4 font-bold text-emerald-600">${tx.netAmount.toFixed(2)}</td>
                  <td className="p-4 font-sans">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700">
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-[#6B7280] text-[11px]">{tx.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
