import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Users, Plus, DollarSign, ExternalLink, Copy, CheckCircle2 } from 'lucide-react';

export const AffiliatesPage: React.FC = () => {
  const { showToast } = useApp();
  const { affiliates } = useData();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Affiliate & Influencer Network</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Partner referral attribution tracking, custom tracking slugs, revenue share commission payouts, and conversion logs.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Affiliate Partner</span>
        </button>
      </div>

      {/* Affiliates Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase">
                <th className="p-3.5">Partner Name</th>
                <th className="p-3.5">Referral Code & Link</th>
                <th className="p-3.5">Commission Rate</th>
                <th className="p-3.5">Total Referrals</th>
                <th className="p-3.5">Attributed Revenue</th>
                <th className="p-3.5">Total Earned</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8F0]">
              {affiliates.map((aff) => (
                <tr key={aff.id} className="hover:bg-[#F8F9FC]">
                  <td className="p-3.5 font-bold text-[#111827]">{aff.name}</td>
                  <td className="p-3.5 font-mono text-[#5B6FF5]">
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">{aff.code}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`https://store.omnicommerce.com/?ref=${aff.code}`);
                          showToast({ type: 'success', title: 'Copied', message: 'Copied referral link.' });
                        }}
                        className="text-[#9CA3AF] hover:text-[#111827]"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono font-semibold text-[#111827]">{aff.commissionRate}%</td>
                  <td className="p-3.5 font-mono">{aff.totalReferrals} orders</td>
                  <td className="p-3.5 font-mono font-bold text-emerald-600">${aff.totalRevenue.toLocaleString()}</td>
                  <td className="p-3.5 font-mono font-semibold text-[#111827]">${aff.totalCommission.toLocaleString()}</td>
                  <td className="p-3.5">
                    <StatusBadge status={aff.status} />
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => showToast({ type: 'success', title: 'Commission Payout', message: `Queued PayPal/ACH payout for ${aff.name}.` })}
                      className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-semibold"
                    >
                      Issue Payout
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[#E5E8F0]">
              <h3 className="text-base font-bold text-[#111827]">Onboard Affiliate Partner</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#9CA3AF]">✕</button>
            </div>
            <p className="text-[#6B7280]">
              Create custom partner referral code and revenue share percentage.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button
                onClick={() => {
                  showToast({ type: 'success', title: 'Partner Onboarded', message: 'Partner invite email dispatched.' });
                  setModalOpen(false);
                }}
                className="px-4 py-2 bg-[#5B6FF5] text-white font-semibold rounded-lg"
              >
                Create Partner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
