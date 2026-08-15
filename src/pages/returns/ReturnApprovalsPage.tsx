import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Search,
  ShieldCheck,
  AlertTriangle,
  Send,
  Eye,
  DollarSign,
  Package,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { ReturnRequest } from '../../types';

export const ReturnApprovalsPage: React.FC = () => {
  const { showToast } = useApp();
  const { returns, updateReturnStatus } = useData();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRMA, setSelectedRMA] = useState<ReturnRequest | null>(null);

  // Filter returns awaiting triage or review
  const pendingApprovals = returns.filter(
    (r) => r.status === 'awaiting_approval' || r.status === 'new'
  );

  const filteredApprovals = pendingApprovals.filter((r) => {
    const rmaNumber = r.rmaNumber || '';
    const orderNumber = r.orderNumber || '';
    const customerName = r.customer?.name || '';
    const reason = r.reason || '';
    return (
      rmaNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reason.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleApprove = (rma: ReturnRequest) => {
    updateReturnStatus(rma.id, 'approved');
    showToast({
      type: 'success',
      title: 'RMA Authorized & Label Sent',
      message: `Return ${rma.rmaNumber} approved. Prepaid carrier label dispatched to ${rma.customer?.email || 'customer'}.`,
    });
  };

  const handleReject = (rma: ReturnRequest) => {
    updateReturnStatus(rma.id, 'cancelled');
    showToast({
      type: 'error',
      title: 'RMA Request Rejected',
      message: `Return ${rma.rmaNumber} declined due to policy expiration or ineligible category.`,
    });
  };

  const handleBatchApprove = () => {
    pendingApprovals.forEach((r) => updateReturnStatus(r.id, 'approved'));
    showToast({
      type: 'success',
      title: 'Batch Approvals Dispatched',
      message: `Authorized ${pendingApprovals.length} returns and issued return shipping labels.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">RMA Approvals Queue</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Triage inbound customer return requests, evaluate return policy compliance, and generate prepaid return labels.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleBatchApprove}
            disabled={pendingApprovals.length === 0}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] disabled:bg-[#E5E8F0] disabled:text-[#9CA3AF] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Fast-Approve All Low-Risk RMAs</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pending RMA Approvals"
          value={pendingApprovals.length}
          change={-15.0}
          icon={<Clock className="w-4 h-4 text-amber-500" />}
        />
        <StatCard
          title="Avg Triage SLA"
          value="1.8 Hours"
          change={-35.0}
          icon={<Clock className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Approval Rate"
          value="94.2%"
          change={1.5}
          icon={<ShieldCheck className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Total In-Review Value"
          value={`$${pendingApprovals.reduce((s, r) => s + r.refundAmount, 0).toFixed(2)}`}
          change={8.0}
          icon={<DollarSign className="w-4 h-4 text-indigo-500" />}
        />
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pending returns by RMA, order, customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>
        <div className="text-xs text-[#6B7280]">
          Showing <strong className="text-[#111827]">{filteredApprovals.length}</strong> triage requests
        </div>
      </div>

      {/* Approvals Queue Cards */}
      <div className="space-y-4">
        {filteredApprovals.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-12 text-center shadow-card">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <h3 className="font-bold text-sm text-[#111827]">Approvals Queue is Clear!</h3>
            <p className="text-xs text-[#6B7280] mt-1">
              All inbound customer return requests have been reviewed and authorized.
            </p>
          </div>
        ) : (
          filteredApprovals.map((rma) => (
            <div
              key={rma.id}
              className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card hover:border-[#CBD5E1] transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <img
                    src={rma.customer?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80'}
                    alt={rma.customer?.name || 'Customer'}
                    className="w-9 h-9 rounded-full object-cover border border-[#E5E8F0] mt-0.5"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-sm text-[#5B6FF5]">{rma.rmaNumber}</span>
                      <span className="text-[#9CA3AF]">&bull;</span>
                      <span className="font-bold text-xs text-[#111827]">{rma.customer?.name || 'Customer'}</span>
                      <span className="text-[11px] text-[#6B7280]">({rma.customer?.email || 'customer@store.com'})</span>
                      <StatusBadge status={rma.status} />
                    </div>
                    <div className="text-xs text-[#4B5563] mt-1 flex items-center gap-2 flex-wrap">
                      <span>
                        Order Ref:{' '}
                        <strong className="font-mono text-[#111827]">{rma.orderNumber}</strong>
                      </span>
                      <span className="text-[#9CA3AF]">&bull;</span>
                      <span>Requested on: {rma.createdAt}</span>
                      <span className="text-[#9CA3AF]">&bull;</span>
                      <span className="text-amber-600 font-medium">SLA Deadline: {rma.slaDeadline || '2026-08-16 18:00'}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between">
                  <div className="text-sm font-bold text-[#111827]">
                    Refund Total: ${(rma.refundAmount ?? 0).toFixed(2)}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-[#5B6FF5] bg-indigo-50 px-2 py-0.5 rounded-sm mt-1">
                    {(rma.resolution || rma.requestedAction || 'refund').replace('_', ' ')}
                  </div>
                </div>
              </div>

              {/* Items in Return */}
              <div className="bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg p-3 space-y-2">
                <div className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                  Requested Items & Customer Reason
                </div>
                {(rma.products || rma.items || []).map((p: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={p.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&q=80'}
                        alt={p.name}
                        className="w-7 h-7 rounded-md object-cover border border-[#E5E8F0]"
                      />
                      <span className="font-medium text-[#111827]">
                        {p.quantity}x {p.name}
                      </span>
                      <span className="text-[11px] text-[#6B7280] font-mono">({p.sku})</span>
                    </div>
                    <div className="text-xs text-[#6B7280] bg-white px-2 py-1 rounded-md border border-[#E5E8F0]">
                      Reason: <strong className="text-[#111827]">{p.reason || rma.reason}</strong>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-[#E5E8F0]">
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Within 30-day return window &bull; Item eligible for restock</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReject(rma)}
                    className="px-3 py-1.5 bg-white hover:bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Decline Return</span>
                  </button>
                  <button
                    onClick={() => handleApprove(rma)}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Authorize & Issue Prepaid Label</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
