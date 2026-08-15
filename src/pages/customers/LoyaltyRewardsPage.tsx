import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Plus, Gift, Sparkles, SlidersHorizontal, ShieldCheck, Download, Trash2 } from 'lucide-react';

export const LoyaltyRewardsPage: React.FC = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'tiers' | 'rules' | 'gdpr'>('tiers');

  const [tiers, setTiers] = useState([
    { name: 'Bronze Standard', minSpend: 0, multiplier: '1x Points', perks: 'Standard shipping, Birthday reward' },
    { name: 'Silver Member', minSpend: 500, multiplier: '1.25x Points', perks: 'Free expedited ground shipping, early sale access' },
    { name: 'Gold VIP', minSpend: 1500, multiplier: '1.5x Points', perks: 'Free 2-day air shipping, dedicated VIP concierge, 10% anniversary coupon' },
    { name: 'Platinum Executive', minSpend: 5000, multiplier: '2x Points', perks: 'Same-day delivery, custom monogramming, invitations to private showroom events' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Loyalty Rewards & Governance</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Configure tiered point multipliers, redemption thresholds, cash-back rewards, and GDPR data subject request compliance.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'success', title: 'Rules Saved', message: 'Published loyalty program settings.' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm"
        >
          Save Configurations
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E8F0]">
        <button
          onClick={() => setActiveTab('tiers')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'tiers' ? 'border-[#5B6FF5] text-[#5B6FF5]' : 'border-transparent text-[#6B7280]'
          }`}
        >
          Tier Structure & Multipliers
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'rules' ? 'border-[#5B6FF5] text-[#5B6FF5]' : 'border-transparent text-[#6B7280]'
          }`}
        >
          Redemption & Point Economics
        </button>
        <button
          onClick={() => setActiveTab('gdpr')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'gdpr' ? 'border-[#5B6FF5] text-[#5B6FF5]' : 'border-transparent text-[#6B7280]'
          }`}
        >
          Global GDPR & Data Requests
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'tiers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiers.map((tier, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#111827]">{tier.name}</h3>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  {tier.multiplier}
                </span>
              </div>
              <div className="text-xs text-[#6B7280]">
                Qualifying spend threshold: <strong className="text-[#111827] font-mono">${tier.minSpend.toLocaleString()} / year</strong>
              </div>
              <div className="text-xs bg-[#F8F9FC] p-3 rounded-lg border border-[#E5E8F0] text-[#4B5563]">
                {tier.perks}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 max-w-xl text-xs">
          <h3 className="text-sm font-bold text-[#111827]">Point Valuation & Rules</h3>

          <div>
            <label className="block font-semibold text-[#111827] mb-1">Standard Earn Rate</label>
            <div className="flex items-center gap-2">
              <input type="number" defaultValue={1} className="w-20 px-3 py-2 border rounded-lg font-mono" />
              <span className="text-[#6B7280]">Points per $1.00 spent</span>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#111827] mb-1">Redemption Cash Equivalent</label>
            <div className="flex items-center gap-2">
              <input type="number" defaultValue={100} className="w-24 px-3 py-2 border rounded-lg font-mono" />
              <span className="text-[#6B7280]">Points = $1.00 discount credit</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'gdpr' && (
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 max-w-2xl text-xs">
          <h3 className="text-sm font-bold text-[#111827]">Global Privacy & Subject Access Requests (SAR)</h3>
          <p className="text-[#6B7280]">
            Audit table of all pending right-to-be-forgotten and data export requests in accordance with GDPR Article 17 and CCPA.
          </p>

          <div className="p-4 rounded-xl border border-[#E5E8F0] bg-[#F8F9FC] space-y-2">
            <div className="flex justify-between items-center font-bold">
              <span>SAR-2026-0811 &bull; Robert Langdon</span>
              <span className="text-amber-600 uppercase text-[10px]">Processing (Due in 18 days)</span>
            </div>
            <div className="text-[#6B7280]">Request: Full archive export of purchase telemetry & telemetry cookies.</div>
          </div>
        </div>
      )}
    </div>
  );
};
