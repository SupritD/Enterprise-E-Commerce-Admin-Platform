import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import {
  Percent,
  DollarSign,
  Building2,
  Settings,
  Search,
  Plus,
  CheckCircle2,
  TrendingUp,
  Store,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface CommissionTier {
  id: string;
  category: string;
  defaultRate: number; // %
  b2bRate: number;
  fixedFeePerOrder: number;
  activeSellersCount: number;
  totalVolumeCollected: number;
}

export const VendorCommissionsPage: React.FC = () => {
  const { showToast } = useApp();
  const { vendors } = useData();

  const [searchQuery, setSearchQuery] = useState('');

  const [tiers, setTiers] = useState<CommissionTier[]>([
    {
      id: 'tier-1',
      category: 'Electronics & Audio Hardware',
      defaultRate: 15.0,
      b2bRate: 8.5,
      fixedFeePerOrder: 0.99,
      activeSellersCount: 14,
      totalVolumeCollected: 142500.0,
    },
    {
      id: 'tier-2',
      category: 'Ergonomic Office Furniture',
      defaultRate: 12.5,
      b2bRate: 7.0,
      fixedFeePerOrder: 2.5,
      activeSellersCount: 8,
      totalVolumeCollected: 89400.0,
    },
    {
      id: 'tier-3',
      category: 'Home & Lighting Decor',
      defaultRate: 18.0,
      b2bRate: 10.0,
      fixedFeePerOrder: 0.49,
      activeSellersCount: 22,
      totalVolumeCollected: 54100.0,
    },
    {
      id: 'tier-4',
      category: 'Apparel & Accessories',
      defaultRate: 20.0,
      b2bRate: 12.0,
      fixedFeePerOrder: 0.35,
      activeSellersCount: 31,
      totalVolumeCollected: 76800.0,
    },
  ]);

  const handleUpdateTier = (id: string, newRate: number) => {
    setTiers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, defaultRate: newRate } : t))
    );
    showToast({
      type: 'success',
      title: 'Commission Rule Updated',
      message: `Updated default marketplace commission rate to ${newRate}%.`,
    });
  };

  const filtered = tiers.filter((t) =>
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCommissionsCaptured = tiers.reduce((s, t) => s + t.totalVolumeCollected, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Vendor Commission Engine</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Configure category commission rates, fixed per-order merchant take-rates, and enterprise seller overrides.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'New Rate Rule', message: 'Opening custom category commission creator...' })}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Commission Plan</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Commissions Earned"
          value={`$${(totalCommissionsCaptured / 1000).toFixed(1)}k`}
          change={19.4}
          icon={<DollarSign className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Blended Take Rate"
          value="14.8%"
          change={0.6}
          icon={<Percent className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Active Category Rules"
          value={tiers.length}
          change={0}
          icon={<Layers className="w-4 h-4 text-indigo-500" />}
        />
        <StatCard
          title="Custom Seller Contracts"
          value="6 Overrides"
          change={12.0}
          icon={<Building2 className="w-4 h-4 text-amber-500" />}
        />
      </div>

      {/* Commission Rules Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between">
          <div className="font-bold text-xs text-[#111827]">Category Commission Rate Rules</div>
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] focus:outline-hidden focus:border-[#5B6FF5]"
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">Taxonomy Category</th>
              <th className="p-4">Standard Take Rate</th>
              <th className="p-4">B2B Wholesale Rate</th>
              <th className="p-4">Fixed Order Handling</th>
              <th className="p-4">Enrolled Sellers</th>
              <th className="p-4">Gross Fees Captured</th>
              <th className="p-4 text-right">Edit Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {filtered.map((tier) => (
              <tr key={tier.id} className="hover:bg-[#F8F9FC] transition-colors">
                <td className="p-4 font-bold text-[#111827]">{tier.category}</td>
                <td className="p-4">
                  <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                    {tier.defaultRate}%
                  </span>
                </td>
                <td className="p-4">
                  <span className="font-mono font-bold text-[#5B6FF5] bg-indigo-50 px-2 py-0.5 rounded-sm">
                    {tier.b2bRate}%
                  </span>
                </td>
                <td className="p-4 font-mono text-[#111827]">+${tier.fixedFeePerOrder.toFixed(2)}</td>
                <td className="p-4">{tier.activeSellersCount} sellers</td>
                <td className="p-4 font-bold text-sm text-[#111827]">
                  ${tier.totalVolumeCollected.toLocaleString()}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleUpdateTier(tier.id, tier.defaultRate + 1)}
                    className="px-2.5 py-1 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] text-[#5B6FF5] rounded-lg text-xs font-semibold"
                  >
                    Adjust Rate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
