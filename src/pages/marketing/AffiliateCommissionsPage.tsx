import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import {
  Percent,
  DollarSign,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Award,
  Layers,
} from 'lucide-react';

interface AffiliateCommissionTier {
  tierName: string;
  minMonthlySales: number;
  commissionPercentage: number;
  bonusReward: string;
  activeAffiliatesCount: number;
}

export const AffiliateCommissionsPage: React.FC = () => {
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const [tiers, setTiers] = useState<AffiliateCommissionTier[]>([
    {
      tierName: 'Standard Starter Tier',
      minMonthlySales: 0,
      commissionPercentage: 8.0,
      bonusReward: 'Standard tracking link dashboard',
      activeAffiliatesCount: 42,
    },
    {
      tierName: 'Silver Growth Tier',
      minMonthlySales: 5000,
      commissionPercentage: 12.0,
      bonusReward: 'Free review unit sampling on new product drops',
      activeAffiliatesCount: 18,
    },
    {
      tierName: 'Gold Elite Partner',
      minMonthlySales: 20000,
      commissionPercentage: 16.0,
      bonusReward: '$500 monthly bonus + dedicated affiliate manager',
      activeAffiliatesCount: 9,
    },
    {
      tierName: 'Platinum VIP Ambassador',
      minMonthlySales: 50000,
      commissionPercentage: 20.0,
      bonusReward: 'Custom branded landing page + co-marketing budget',
      activeAffiliatesCount: 3,
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Affiliate Commission Structures</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Tiered performance incentive ladders, reward kickbacks, recurring monthly volume bonuses, and custom promoter contracts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'Save Tiers', message: 'Commission tiers saved and published to affiliate portal.' })}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Publish Tier Rules</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Affiliates Enrolled"
          value="72 Partners"
          change={14.0}
          icon={<Award className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Blended Commission Rate"
          value="11.4%"
          change={-0.8}
          icon={<Percent className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Monthly Performance Bonuses"
          value="$4,500.00"
          change={20.0}
          icon={<DollarSign className="w-4 h-4 text-indigo-500" />}
        />
        <StatCard
          title="ROI Multiplier"
          value="8.4x Gross GMV"
          change={2.1}
          icon={<TrendingUp className="w-4 h-4 text-amber-500" />}
        />
      </div>

      {/* Tier Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-4 hover:border-[#5B6FF5] transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  Tier Level 0{idx + 1}
                </span>
                <span className="text-xs font-bold text-[#5B6FF5] bg-indigo-50 px-2 py-0.5 rounded-full">
                  {tier.activeAffiliatesCount} active
                </span>
              </div>
              <h3 className="font-bold text-sm text-[#111827]">{tier.tierName}</h3>
              <div className="text-2xl font-black text-[#5B6FF5]">{tier.commissionPercentage}%</div>
              <div className="text-xs text-[#6B7280]">
                Monthly Sales Target: <strong className="text-[#111827]">${tier.minMonthlySales.toLocaleString()}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E8F0] text-xs text-[#4B5563] space-y-1">
              <div className="font-semibold text-[11px] text-[#111827]">Tier Perks:</div>
              <div>{tier.bonusReward}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
