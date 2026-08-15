import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import {
  Tag,
  Percent,
  Plus,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Package,
} from 'lucide-react';

interface AutomaticDiscountRule {
  id: string;
  title: string;
  type: 'percentage' | 'fixed_amount' | 'bogo' | 'tiered_volume';
  value: string;
  condition: string;
  status: 'active' | 'scheduled' | 'expired';
  ordersApplied: number;
  totalSavingsGranted: number;
  startDate: string;
  endDate: string;
}

export const DiscountsPage: React.FC = () => {
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const [discounts, setDiscounts] = useState<AutomaticDiscountRule[]>([
    {
      id: 'disc-1',
      title: 'Summer Audio Hardware Sale',
      type: 'percentage',
      value: '15% OFF',
      condition: 'Applies automatically to Audio & Headphones collection',
      status: 'active',
      ordersApplied: 342,
      totalSavingsGranted: 12450.0,
      startDate: 'Aug 01, 2026',
      endDate: 'Aug 31, 2026',
    },
    {
      id: 'disc-2',
      title: 'Buy 2 Ergonomic Accessories, Get 1 Free',
      type: 'bogo',
      value: 'BOGO Free',
      condition: 'Add 3 qualifying desk accessories to cart',
      status: 'active',
      ordersApplied: 180,
      totalSavingsGranted: 5400.0,
      startDate: 'Aug 10, 2026',
      endDate: 'Aug 25, 2026',
    },
    {
      id: 'disc-3',
      title: 'Tiered Cart Volume Discount',
      type: 'tiered_volume',
      value: 'Up to $100 OFF',
      condition: 'Spend $300 get $30 off; Spend $600 get $100 off',
      status: 'active',
      ordersApplied: 410,
      totalSavingsGranted: 28900.0,
      startDate: 'Jul 01, 2026',
      endDate: 'Sep 30, 2026',
    },
    {
      id: 'disc-4',
      title: 'Labor Day Early Bird Promo',
      type: 'fixed_amount',
      value: '$50 OFF $250+',
      condition: 'Sitewide automatic reduction on checkout',
      status: 'scheduled',
      ordersApplied: 0,
      totalSavingsGranted: 0,
      startDate: 'Sep 01, 2026',
      endDate: 'Sep 07, 2026',
    },
  ]);

  const filtered = discounts.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Automatic Promotions & Discounts</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Configure checkout automatic discounts, BOGO rules, tiered threshold volume savings, and catalog sales.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'New Promotion', message: 'Opening automated discount builder modal...' })}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Automatic Discount</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Live Rules"
          value={discounts.filter((d) => d.status === 'active').length}
          change={2}
          icon={<Tag className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Total Orders Discounted"
          value="932 Orders"
          change={18.4}
          icon={<Package className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Total Customer Savings"
          value="$46,750.00"
          change={24.0}
          icon={<DollarSign className="w-4 h-4 text-indigo-500" />}
        />
        <StatCard
          title="AOV Lift with Tiered Rules"
          value="+34.2%"
          change={6.1}
          icon={<TrendingUp className="w-4 h-4 text-amber-500" />}
        />
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search automatic discounts by title or conditions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>
      </div>

      {/* Discount Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((rule) => (
          <div
            key={rule.id}
            className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-4 hover:border-[#CBD5E1] transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#5B6FF5] bg-indigo-50 px-2.5 py-0.5 rounded-full font-mono">
                  {rule.value}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    rule.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-indigo-50 text-[#5B6FF5]'
                  }`}
                >
                  {rule.status}
                </span>
              </div>

              <h3 className="font-bold text-sm text-[#111827]">{rule.title}</h3>
              <p className="text-xs text-[#6B7280]">{rule.condition}</p>
            </div>

            <div className="pt-3 border-t border-[#E5E8F0] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6B7280]">Campaign Window:</span>
                <span className="font-medium text-[#111827]">
                  {rule.startDate} &mdash; {rule.endDate}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6B7280]">Orders Applied:</span>
                <span className="font-bold text-[#111827]">{rule.ordersApplied} orders</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6B7280]">Total Discount Given:</span>
                <span className="font-bold text-emerald-600 font-mono">
                  ${rule.totalSavingsGranted.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
