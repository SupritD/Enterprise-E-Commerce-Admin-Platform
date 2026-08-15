import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Store,
  Plus,
  Search,
  DollarSign,
  Star,
  CheckCircle2,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

export const VendorsListPage: React.FC = () => {
  const { showToast } = useApp();
  const { vendors } = useData();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = vendors.filter((v) => {
    const matchesSearch = v.storeName.toLowerCase().includes(search.toLowerCase()) || v.legalEntity.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Marketplace Vendors & Sellers</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Third-party merchant directory, automated KYC compliance onboarding, revenue commissions, and escrow balances.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/vendors/applications"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <FileCheck className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>KYC Applications</span>
          </Link>
          <Link
            to="/vendors/payouts"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs"
          >
            Vendor Payouts
          </Link>
          <button
            onClick={() => showToast({ type: 'info', title: 'Vendor Invitation', message: 'Generating merchant onboarding registration link...' })}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Invite Vendor</span>
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by store name, business entity, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs"
        >
          <option value="all">All Vendor Statuses</option>
          <option value="approved">Approved / Active</option>
          <option value="pending">Pending KYC Review</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                <th className="p-4">Merchant Store</th>
                <th className="p-4">Commission %</th>
                <th className="p-4">Total Sales (GMV)</th>
                <th className="p-4">Escrow Balance</th>
                <th className="p-4">Store Rating</th>
                <th className="p-4">KYC Status</th>
                <th className="p-4">Vendor Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E8F0]">
              {filtered.map((v) => (
                <tr
                  key={v.id}
                  onClick={() => navigate(`/vendors/${v.id}`)}
                  className="hover:bg-[#F8F9FC] cursor-pointer transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={v.logo}
                        alt={v.storeName}
                        className="w-10 h-10 rounded-xl object-cover border border-[#E5E8F0]"
                      />
                      <div>
                        <div className="font-bold text-[#111827]">{v.storeName}</div>
                        <div className="text-[11px] text-[#6B7280]">{v.legalEntity} &bull; {v.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-mono font-semibold text-[#111827]">
                    {v.commissionRate}%
                  </td>

                  <td className="p-4 font-mono font-bold text-emerald-600">
                    ${v.totalSales.toLocaleString()}
                  </td>

                  <td className="p-4 font-mono text-[#5B6FF5] font-semibold">
                    ${v.balance.toLocaleString()}
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-[#111827] flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {v.rating} / 5.0
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {v.kycStatus}
                    </span>
                  </td>

                  <td className="p-4">
                    <StatusBadge status={v.status} />
                  </td>

                  <td className="p-4 text-right">
                    <Link
                      to={`/vendors/${v.id}`}
                      className="px-3 py-1 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827]"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
