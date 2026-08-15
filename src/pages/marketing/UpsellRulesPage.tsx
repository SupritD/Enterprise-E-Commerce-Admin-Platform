import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import {
  TrendingUp,
  ShoppingBag,
  Plus,
  Search,
  CheckCircle2,
  Layers,
  Sparkles,
  ArrowRight,
  DollarSign,
  Package,
  ArrowUpRight,
} from 'lucide-react';

interface UpsellRule {
  id: string;
  name: string;
  triggerType: 'Cart Threshold' | 'Product Page Cross-sell' | 'Post-Purchase 1-Click' | 'Checkout Drawer';
  triggerProduct: string;
  offeredProduct: string;
  discountOffer: string;
  takeRate: number; // %
  addedRevenue: number;
  status: 'active' | 'paused';
}

export const UpsellRulesPage: React.FC = () => {
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const [rules, setRules] = useState<UpsellRule[]>([
    {
      id: 'up-1',
      name: 'Mechanical Keyboard Coiled Cable & Switch Puller Bundle',
      triggerType: 'Product Page Cross-sell',
      triggerProduct: 'Mechanical Studio Pro Wireless Keyboard',
      offeredProduct: 'Audiophile Custom Braided Silver Cable + Switch Key Puller',
      discountOffer: '25% OFF addon',
      takeRate: 28.4,
      addedRevenue: 14890.0,
      status: 'active',
    },
    {
      id: 'up-2',
      name: 'Desk Pad & Cable Spine Cross-Sell with Standing Desk',
      triggerType: 'Checkout Drawer',
      triggerProduct: 'Carbon Fiber Motorized Standing Desk',
      offeredProduct: 'Full Desk Felt Wool Mat (36x18")',
      discountOffer: 'Save $20',
      takeRate: 34.1,
      addedRevenue: 22400.0,
      status: 'active',
    },
    {
      id: 'up-3',
      name: 'Post-Purchase 1-Click Extended Warranty Protection',
      triggerType: 'Post-Purchase 1-Click',
      triggerProduct: 'All Electronics & Hardware above $150',
      offeredProduct: '2-Year Full Hardware Accidental Damage Warranty',
      discountOffer: '$29 flat add-on',
      takeRate: 19.8,
      addedRevenue: 31200.0,
      status: 'active',
    },
    {
      id: 'up-4',
      name: 'Free Shipping Threshold Booster Bar',
      triggerType: 'Cart Threshold',
      triggerProduct: 'Carts between $65 and $99',
      offeredProduct: 'Smart Ambient RGB Desk Bar Light',
      discountOffer: 'Spend $10 more for Free Next-Day Air',
      takeRate: 42.0,
      addedRevenue: 48900.0,
      status: 'active',
    },
  ]);

  const filtered = rules.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.triggerProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.offeredProduct.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Upsell & Cross-Sell Engine</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Configure cart drawer product recommendations, post-purchase 1-click upsells, and threshold booster incentives.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'New Upsell Rule', message: 'Opening recommendation builder...' })}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Upsell Trigger</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Recommendation Triggers"
          value={rules.length}
          change={1}
          icon={<ShoppingBag className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Avg Upsell Take Rate"
          value="31.1%"
          change={4.8}
          icon={<TrendingUp className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Incremental GMV Added"
          value="$117,390.00"
          change={28.0}
          icon={<DollarSign className="w-4 h-4 text-indigo-500" />}
        />
        <StatCard
          title="AOV Expansion"
          value="+$24.80 / cart"
          change={8.5}
          icon={<Sparkles className="w-4 h-4 text-amber-500" />}
        />
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search upsell rules or recommended items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>
      </div>

      {/* Upsell Rules Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">Rule Name & Type</th>
              <th className="p-4">Trigger Condition</th>
              <th className="p-4">Upsell / Recommended Item</th>
              <th className="p-4">Take Rate (%)</th>
              <th className="p-4">Incremental GMV</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-[#F8F9FC] transition-colors">
                <td className="p-4">
                  <div className="font-bold text-[#111827]">{r.name}</div>
                  <div className="text-[11px] text-[#5B6FF5] font-semibold mt-0.5">{r.triggerType}</div>
                </td>
                <td className="p-4 text-[#4B5563]">{r.triggerProduct}</td>
                <td className="p-4">
                  <div className="font-bold text-[#111827]">{r.offeredProduct}</div>
                  <span className="inline-block mt-0.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-sm font-bold text-[10px]">
                    {r.discountOffer}
                  </span>
                </td>
                <td className="p-4 font-mono font-bold text-sm text-[#111827]">{r.takeRate}%</td>
                <td className="p-4 font-mono font-bold text-sm text-emerald-600">
                  +${r.addedRevenue.toLocaleString()}
                </td>
                <td className="p-4 text-right">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      r.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-[#F1F3F9] text-[#6B7280]'
                    }`}
                  >
                    {r.status}
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
