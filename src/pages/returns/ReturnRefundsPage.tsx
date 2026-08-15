import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  DollarSign,
  CreditCard,
  Wallet,
  Gift,
  CheckCircle2,
  Clock,
  RotateCcw,
  Search,
  ArrowRight,
  ShieldCheck,
  Building2,
  AlertCircle,
} from 'lucide-react';
import { ReturnRequest } from '../../types';

export const ReturnRefundsPage: React.FC = () => {
  const { showToast } = useApp();
  const { returns, updateReturnStatus } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [method, setMethod] = useState<'original' | 'store_credit' | 'gift_card'>('original');

  const pendingRefunds = returns.filter(
    (r) => r.status === 'at_qc' || r.status === 'approved' || r.status === 'resolved'
  );

  const filtered = pendingRefunds.filter((r) => {
    const rmaNumber = r.rmaNumber || '';
    const orderNumber = r.orderNumber || '';
    const customerName = r.customer?.name || '';
    return (
      rmaNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalRefundAmount = pendingRefunds.reduce((sum, r) => sum + (r.refundAmount ?? 0), 0);

  const handleIssueRefund = (rma: ReturnRequest, refundMethod: string) => {
    updateReturnStatus(rma.id, 'resolved');
    showToast({
      type: 'success',
      title: 'Refund Successfully Dispatched',
      message: `Processed $${(rma.refundAmount ?? 0).toFixed(2)} payout to ${rma.customer?.name || 'Customer'} via ${refundMethod}.`,
    });
  };

  const handleBatchProcess = () => {
    pendingRefunds.forEach((r) => updateReturnStatus(r.id, 'resolved'));
    showToast({
      type: 'success',
      title: 'Batch Payout Dispatched',
      message: `Disbursed $${totalRefundAmount.toFixed(2)} across ${pendingRefunds.length} returns.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Refund Processing Center</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Execute payment gateway refunds (Stripe, PayPal), issue instant store wallet credit, or generate digital gift cards.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleBatchProcess}
            disabled={pendingRefunds.length === 0}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] disabled:bg-[#E5E8F0] disabled:text-[#9CA3AF] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Process All Pending Refunds</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pending Refund Volume"
          value={`$${totalRefundAmount.toFixed(2)}`}
          change={-12.0}
          icon={<DollarSign className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Eligible RMAs"
          value={pendingRefunds.length}
          change={-2}
          icon={<RotateCcw className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Store Credit Conversion"
          value="42% (with +10% bonus)"
          change={15.0}
          icon={<Wallet className="w-4 h-4 text-indigo-500" />}
        />
        <StatCard
          title="Avg Payout Speed"
          value="< 4 seconds"
          change={99.9}
          icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
        />
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by RMA #, order #, or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>
        <div className="text-xs text-[#6B7280]">
          Total ready for disbursement: <strong className="text-emerald-600 font-bold">${totalRefundAmount.toFixed(2)}</strong>
        </div>
      </div>

      {/* Refunds Ledger Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">RMA & Order #</th>
              <th className="p-4">Customer & Method</th>
              <th className="p-4">Items / Condition</th>
              <th className="p-4">Calculated Refund</th>
              <th className="p-4">Recommended Resolution</th>
              <th className="p-4 text-right">Execute Payout</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-xs text-[#6B7280]">
                  No pending refunds in queue.
                </td>
              </tr>
            ) : (
              filtered.map((rma) => (
                <tr key={rma.id} className="hover:bg-[#F8F9FC] transition-colors">
                  <td className="p-4">
                    <div className="font-mono font-bold text-[#5B6FF5]">{rma.rmaNumber}</div>
                    <div className="text-[11px] text-[#6B7280] mt-0.5">Order: {rma.orderNumber}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-[#111827]">{rma.customer?.name || 'Customer'}</div>
                    <div className="text-[11px] text-[#6B7280]">{rma.customer?.email || 'support@buyer.com'}</div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      {(rma.products || rma.items || []).map((p: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                          <span className="font-semibold text-[#111827]">
                            {p.quantity}x {p.name}
                          </span>
                          <span className="text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded-xs font-bold text-[10px]">
                            Grade A (Passed)
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-sm text-emerald-600">
                      ${(rma.refundAmount ?? 0).toFixed(2)}
                    </div>
                    <div className="text-[10px] text-[#6B7280]">No restocking fee</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#EEF2FF] text-[#5B6FF5] font-bold text-[11px] uppercase">
                      {(rma.resolution || rma.requestedAction || 'refund').replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleIssueRefund(rma, 'Store Wallet Credit (+10% Bonus)')}
                        title="Issue Store Credit with 10% Bonus"
                        className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-[#5B6FF5] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Wallet className="w-3.5 h-3.5" />
                        <span>Wallet (+10%)</span>
                      </button>
                      <button
                        onClick={() => handleIssueRefund(rma, 'Original Payment Method (Stripe/PayPal)')}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs transition-colors"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Direct Gateway Refund</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
