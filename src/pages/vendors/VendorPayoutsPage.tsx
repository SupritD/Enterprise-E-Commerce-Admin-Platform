import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { DollarSign, CheckCircle2, Clock, Building, Download } from 'lucide-react';

export const VendorPayoutsPage: React.FC = () => {
  const { showToast } = useApp();
  const { vendors } = useData();

  const handleDisburseAll = () => {
    showToast({
      type: 'success',
      title: 'Batch Payouts Dispatched',
      message: 'Triggered Stripe Connect ACH batch payout for all eligible seller escrow balances.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Vendor Settlement & Commission Engine</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Automated Stripe Connect escrow disbursements, marketplace commission deductions, and tax withholdings.
          </p>
        </div>

        <button
          onClick={handleDisburseAll}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Disburse All Pending Escrow</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase">
                <th className="p-3.5">Vendor Store</th>
                <th className="p-3.5">Bank Routing / Account</th>
                <th className="p-3.5">Gross Sales</th>
                <th className="p-3.5">Commission Deducted</th>
                <th className="p-3.5">Pending Escrow Payout</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8F0]">
              {vendors.map((v) => {
                const storeName = v.storeName || v.name || 'Vendor Store';
                const totalSales = v.totalSales ?? v.gmv ?? 0;
                const commissionRate = v.commissionRate ?? 12;
                const commissionAmt = (totalSales * commissionRate) / 100;
                const balance = v.balance ?? v.payoutDue ?? 0;
                const bankName = v.payoutMethod?.bankName || 'JPMorgan Chase ACH Escrow';
                const acctLast4 = v.payoutMethod?.accountNumber ? v.payoutMethod.accountNumber.slice(-4) : '8819';

                return (
                  <tr key={v.id} className="hover:bg-[#F8F9FC]">
                    <td className="p-3.5 font-bold text-[#111827]">{storeName}</td>
                    <td className="p-3.5 font-mono text-[#6B7280]">
                      {bankName} (&bull;&bull;&bull;&bull; {acctLast4})
                    </td>
                    <td className="p-3.5 font-mono font-semibold text-[#111827]">${totalSales.toLocaleString()}</td>
                    <td className="p-3.5 font-mono text-rose-600">-${commissionAmt.toLocaleString()} ({commissionRate}%)</td>
                    <td className="p-3.5 font-mono font-bold text-emerald-600">${balance.toLocaleString()}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => showToast({ type: 'success', title: 'Payout Scheduled', message: `Dispatched $${balance.toLocaleString()} to ${storeName}.` })}
                        className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-semibold"
                      >
                        Release Funds
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
