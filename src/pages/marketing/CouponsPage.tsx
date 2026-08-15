import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import {
  Ticket,
  Percent,
  DollarSign,
  Plus,
  Copy,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Tag,
  ShieldCheck,
} from 'lucide-react';

interface CouponItem {
  id: string;
  code: string;
  type: 'percentage' | 'fixed_amount' | 'free_shipping';
  value: string;
  minOrderValue: number;
  maxUsageCount: number;
  usedCount: number;
  status: 'active' | 'expired' | 'scheduled';
  startDate: string;
  endDate: string;
}

export const CouponsPage: React.FC = () => {
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const [coupons, setCoupons] = useState<CouponItem[]>([
    {
      id: 'coup-1',
      code: 'WELCOME20',
      type: 'percentage',
      value: '20% OFF',
      minOrderValue: 50.0,
      maxUsageCount: 1000,
      usedCount: 742,
      status: 'active',
      startDate: 'Aug 01, 2026',
      endDate: 'Dec 31, 2026',
    },
    {
      id: 'coup-2',
      code: 'FREESHIP100',
      type: 'free_shipping',
      value: 'Free Express Shipping',
      minOrderValue: 100.0,
      maxUsageCount: 500,
      usedCount: 289,
      status: 'active',
      startDate: 'Aug 05, 2026',
      endDate: 'Oct 31, 2026',
    },
    {
      id: 'coup-3',
      code: 'VIP50OFF',
      type: 'fixed_amount',
      value: '$50.00 OFF',
      minOrderValue: 250.0,
      maxUsageCount: 100,
      usedCount: 94,
      status: 'active',
      startDate: 'Aug 10, 2026',
      endDate: 'Aug 25, 2026',
    },
    {
      id: 'coup-4',
      code: 'SUMMEREND',
      type: 'percentage',
      value: '15% OFF',
      minOrderValue: 75.0,
      maxUsageCount: 2000,
      usedCount: 0,
      status: 'scheduled',
      startDate: 'Sep 01, 2026',
      endDate: 'Sep 07, 2026',
    },
  ]);

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast({
      type: 'success',
      title: 'Coupon Code Copied',
      message: `Copied "${code}" to clipboard.`,
    });
  };

  const filtered = coupons.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Promo & Coupon Code Engine</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Create alphanumeric discount vouchers, set per-user redemption limits, customer tier restrictions, and minimum carts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'New Coupon Voucher', message: 'Opening voucher generator modal...' })}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate Coupon Code</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Vouchers"
          value={coupons.filter((c) => c.status === 'active').length}
          change={1}
          icon={<Ticket className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Total Redemptions"
          value="1,125 Times"
          change={22.0}
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Influenced GMV"
          value="$132,490.00"
          change={19.5}
          icon={<DollarSign className="w-4 h-4 text-indigo-500" />}
        />
        <StatCard
          title="Discount Burn Rate"
          value="7.2% of GMV"
          change={-0.4}
          icon={<Percent className="w-4 h-4 text-amber-500" />}
        />
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search coupon vouchers by code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">Coupon Code</th>
              <th className="p-4">Discount Value</th>
              <th className="p-4">Min. Spend Threshold</th>
              <th className="p-4">Redemption Progress</th>
              <th className="p-4">Validity Window</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {filtered.map((c) => {
              const usagePercent = Math.round((c.usedCount / c.maxUsageCount) * 100);
              return (
                <tr key={c.id} className="hover:bg-[#F8F9FC] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#5B6FF5] bg-[#EEF2FF] px-2.5 py-1 rounded-md border border-indigo-100">
                        {c.code}
                      </span>
                      <button
                        onClick={() => copyCoupon(c.code)}
                        className="p-1 hover:bg-[#F8F9FC] rounded-md text-[#9CA3AF] hover:text-[#111827]"
                        title="Copy code"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-[#111827]">{c.value}</td>
                  <td className="p-4 font-mono text-[#4B5563]">${c.minOrderValue.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="space-y-1 w-36">
                      <div className="flex justify-between text-[10px] text-[#6B7280]">
                        <span>
                          {c.usedCount} / {c.maxUsageCount}
                        </span>
                        <span>{usagePercent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E5E8F0] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#5B6FF5] rounded-full"
                          style={{ width: `${usagePercent}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-[#6B7280]">
                    {c.startDate} &mdash; {c.endDate}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        c.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-indigo-50 text-[#5B6FF5]'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => showToast({ type: 'info', title: 'Edit Voucher', message: 'Voucher config opened.' })}
                      className="text-xs font-semibold text-[#5B6FF5] hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
