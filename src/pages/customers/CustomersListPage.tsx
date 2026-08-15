import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pagination } from '../../components/common/Pagination';
import {
  Users,
  Search,
  Filter,
  Plus,
  Mail,
  Building,
  ShieldCheck,
  Award,
  DollarSign,
  Download,
} from 'lucide-react';

export const CustomersListPage: React.FC = () => {
  const { showToast } = useApp();
  const { customers } = useData();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(search.toLowerCase()));
    const matchesTier = tierFilter === 'all' || c.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Customer CRM & Accounts</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Omni-channel customer master records, RFM segmentation scores, lifetime value (LTV), and loyalty tiers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/customers/segments"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs"
          >
            Dynamic Segments
          </Link>
          <Link
            to="/customers/b2b-accounts"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs"
          >
            B2B Credit Accounts
          </Link>
          <button
            onClick={() => showToast({ type: 'info', title: 'New Customer Profile', message: 'Opening customer registration modal...' })}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, company, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827]"
          />
        </div>

        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs"
        >
          <option value="all">All Loyalty Tiers</option>
          <option value="standard">Standard</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="platinum">Platinum VIP</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                <th className="p-4">Customer Name</th>
                <th className="p-4">Loyalty Tier</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Lifetime Spend (LTV)</th>
                <th className="p-4">AOV</th>
                <th className="p-4">Last Active</th>
                <th className="p-4">Reward Balance</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E8F0]">
              {filtered.map((cust) => (
                <tr
                  key={cust.id}
                  onClick={() => navigate(`/customers/${cust.id}`)}
                  className="hover:bg-[#F8F9FC] cursor-pointer transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={cust.avatar}
                        alt={cust.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#E5E8F0]"
                      />
                      <div>
                        <div className="font-bold text-[#111827]">{cust.name}</div>
                        <div className="text-[11px] text-[#6B7280]">{cust.email}</div>
                        {cust.company && (
                          <div className="text-[10px] text-[#5B6FF5] font-semibold flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3" /> {cust.company}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {cust.tier}
                    </span>
                  </td>

                  <td className="p-4 font-mono font-semibold text-[#111827]">
                    {cust.ordersCount} orders
                  </td>

                  <td className="p-4 font-mono font-bold text-emerald-600 text-sm">
                    ${cust.totalSpent.toLocaleString()}
                  </td>

                  <td className="p-4 font-mono text-[#6B7280]">
                    ${cust.averageOrderValue.toFixed(2)}
                  </td>

                  <td className="p-4 font-mono text-[#6B7280]">
                    {cust.lastOrderDate}
                  </td>

                  <td className="p-4 font-mono font-semibold text-[#5B6FF5]">
                    {cust.rewardPoints} pts
                  </td>

                  <td className="p-4 text-right">
                    <Link
                      to={`/customers/${cust.id}`}
                      className="px-3 py-1 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827]"
                    >
                      View Profile
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
            totalPages={3}
            totalItems={filtered.length}
            pageSize={10}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};
