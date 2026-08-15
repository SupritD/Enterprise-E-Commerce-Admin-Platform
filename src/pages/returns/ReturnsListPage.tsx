import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pagination } from '../../components/common/Pagination';
import {
  RotateCcw,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Package,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export const ReturnsListPage: React.FC = () => {
  const { showToast } = useApp();
  const { returns, updateReturnStatus } = useData();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = returns.filter((r) => {
    const matchesSearch =
      r.rmaNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.customer.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Returns & RMA Management</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Omni-channel return authorizations, automated warehouse receiving, QC grading, and instant refund disbursements.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/returns/approvals"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Approvals Queue</span>
          </Link>
          <Link
            to="/returns/inspection"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#5B6FF5]" />
            <span>QC Inspection Station</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card space-y-1">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Pending RMA Review</div>
          <div className="text-xl font-black text-amber-500 font-mono">
            {returns.filter((r) => r.status === 'pending' || r.status === 'authorized').length} Requests
          </div>
          <div className="text-[10px] text-[#9CA3AF]">Avg approval SLA: 4.2 hrs</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card space-y-1">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">In Transit to Hub</div>
          <div className="text-xl font-black text-[#5B6FF5] font-mono">
            {returns.filter((r) => r.status === 'in_transit').length || 2} Parcels
          </div>
          <div className="text-[10px] text-[#9CA3AF]">Prepaid label return tracking</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card space-y-1">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Awaiting QC Inspection</div>
          <div className="text-xl font-black text-[#111827] font-mono">
            {returns.filter((r) => r.status === 'received').length || 1} In Dock
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold">Ready for grading</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card space-y-1">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Settled / Refunded (30d)</div>
          <div className="text-xl font-black text-emerald-600 font-mono">$1,420.50</div>
          <div className="text-[10px] text-[#9CA3AF]">Return rate: 1.8%</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by RMA #, Order #, customer name, or item SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] outline-hidden"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] outline-hidden"
        >
          <option value="all">All RMA Statuses</option>
          <option value="pending">Pending Authorization</option>
          <option value="authorized">Authorized (Label Issued)</option>
          <option value="in_transit">In Transit</option>
          <option value="received">Received at Warehouse</option>
          <option value="refunded">Refunded / Closed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                <th className="p-4">RMA Number</th>
                <th className="p-4">Original Order</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Return Reason</th>
                <th className="p-4">Requested Action</th>
                <th className="p-4">Refund Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E8F0]">
              {filtered.map((rma) => (
                <tr
                  key={rma.id}
                  onClick={() => navigate(`/returns/${rma.id}`)}
                  className="hover:bg-[#F8F9FC] cursor-pointer transition-colors"
                >
                  <td className="p-4 font-mono font-bold text-[#5B6FF5]">
                    {rma.rmaNumber}
                    <div className="text-[10px] text-[#6B7280] font-normal mt-0.5">{rma.createdAt}</div>
                  </td>

                  <td className="p-4 font-mono font-semibold text-[#111827]">
                    <Link
                      to={`/orders/${rma.orderId}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline text-[#5B6FF5]"
                    >
                      {rma.orderNumber}
                    </Link>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-[#111827]">{rma.customer.name}</div>
                    <div className="text-[11px] text-[#6B7280]">{rma.customer.email}</div>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-[#111827]">{rma.reason}</span>
                    {rma.customerNote && (
                      <div className="text-[10px] text-[#6B7280] truncate max-w-xs mt-0.5 italic">
                        "{rma.customerNote}"
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-800">
                      {rma.requestedAction.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="p-4 font-mono font-bold text-[#111827]">
                    ${rma.refundAmount.toFixed(2)}
                  </td>

                  <td className="p-4">
                    <StatusBadge status={rma.status} />
                  </td>

                  <td className="p-4 text-right">
                    <Link
                      to={`/returns/${rma.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs"
                    >
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[#E5E8F0]">
          <Pagination
            currentPage={page}
            totalPages={2}
            totalItems={filtered.length}
            pageSize={10}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};
