import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Plus, Sparkles, Filter, ArrowRight } from 'lucide-react';

export const CustomerSegmentsPage: React.FC = () => {
  const { showToast } = useApp();
  const [segments, setSegments] = useState([
    { id: 'seg_1', name: 'High-Value VIPs (LTV > $2,000)', rule: 'Total Spend >= 2000 AND Orders >= 3', size: 142, aov: '$420.50' },
    { id: 'seg_2', name: 'At-Risk Churn (Inactive > 90 Days)', rule: 'Last Order > 90 Days AND Orders >= 2', size: 310, aov: '$180.20' },
    { id: 'seg_3', name: 'B2B Enterprise Wholesalers', rule: 'Account Type = B2B AND Credit Limit > 10000', size: 48, aov: '$2,450.00' },
    { id: 'seg_4', name: 'First-Time Shoppers (Last 30 Days)', rule: 'Orders = 1 AND Created < 30 Days', size: 520, aov: '$85.00' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [rule, setRule] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newSeg = {
      id: `seg_${Date.now()}`,
      name,
      rule,
      size: Math.floor(Math.random() * 200) + 20,
      aov: '$210.00',
    };
    setSegments([...segments, newSeg]);
    showToast({ type: 'success', title: 'Segment Created', message: `Computed segment "${name}".` });
    setModalOpen(false);
    setName('');
    setRule('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Dynamic Customer Segments</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Automated behavioral cohorts, RFM scoring rules, and marketing audience synchronizers.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Cohort Segment</span>
        </button>
      </div>

      {/* Segments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {segments.map((seg) => (
          <div key={seg.id} className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#111827]">{seg.name}</h3>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                {seg.size} members
              </span>
            </div>

            <div className="text-xs font-mono text-[#5B6FF5] bg-[#F8F9FC] p-2.5 rounded-lg border border-[#E5E8F0]">
              Rule: {seg.rule}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E5E8F0] text-xs text-[#6B7280]">
              <span>Cohort AOV: <strong className="text-[#111827]">{seg.aov}</strong></span>
              <button
                onClick={() => showToast({ type: 'info', title: 'Exporting Cohort', message: `Syncing ${seg.size} contacts to Klaviyo/Mailchimp...` })}
                className="text-[#5B6FF5] font-semibold hover:underline"
              >
                Sync Audience &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[#E5E8F0]">
              <h3 className="text-base font-bold text-[#111827]">New Customer Segment Rule</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#9CA3AF]">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block font-semibold text-[#111827] mb-1">Segment Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Repeat Buyers"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Condition Expression</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Total Spend > 500 AND Orders > 2"
                  value={rule}
                  onChange={(e) => setRule(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#5B6FF5] text-white font-semibold rounded-lg">Compute Cohort</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
