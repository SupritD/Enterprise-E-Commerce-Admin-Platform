import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Tag,
  Plus,
  Search,
  Percent,
  DollarSign,
  Truck,
  Gift,
  Copy,
  Calendar,
} from 'lucide-react';

export const DiscountsPage: React.FC = () => {
  const { showToast } = useApp();
  const { discounts, addDiscount } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newType, setNewType] = useState<'percentage' | 'fixed_amount' | 'free_shipping'>('percentage');
  const [newValue, setNewValue] = useState('15');
  const [newMinSubtotal, setNewMinSubtotal] = useState('50');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newDisc = {
      id: `disc_${Date.now()}`,
      code: newCode.toUpperCase(),
      type: newType,
      value: parseFloat(newValue) || 0,
      minSubtotal: parseFloat(newMinSubtotal) || 0,
      usageLimit: 1000,
      usageCount: 0,
      startsAt: new Date().toISOString().split('T')[0],
      endsAt: '2026-12-31',
      status: 'active' as const,
    };
    addDiscount(newDisc);
    showToast({ type: 'success', title: 'Promo Code Created', message: `Coupon "${newDisc.code}" is now live.` });
    setModalOpen(false);
    setNewCode('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Discounts & Coupon Rules</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Create percentage markdowns, fixed cart subsidies, automatic free shipping promotions, and volume thresholds.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Promo Code</span>
        </button>
      </div>

      {/* Discounts Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase">
                <th className="p-3.5">Coupon Code</th>
                <th className="p-3.5">Discount Type</th>
                <th className="p-3.5">Value / Benefit</th>
                <th className="p-3.5">Min. Cart Spend</th>
                <th className="p-3.5">Redemption Velocity</th>
                <th className="p-3.5">Validity Range</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E8F0]">
              {discounts.map((d) => (
                <tr key={d.id} className="hover:bg-[#F8F9FC]">
                  <td className="p-3.5 font-mono font-bold text-[#111827] flex items-center gap-2">
                    <span className="bg-indigo-50 text-[#5B6FF5] px-2 py-1 rounded border border-indigo-200">
                      {d.code}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(d.code);
                        showToast({ type: 'success', title: 'Copied', message: `Copied ${d.code} to clipboard.` });
                      }}
                      className="text-[#9CA3AF] hover:text-[#111827]"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </td>

                  <td className="p-3.5 uppercase font-mono text-[11px] text-[#6B7280]">
                    {d.type.replace('_', ' ')}
                  </td>

                  <td className="p-3.5 font-mono font-bold text-emerald-600">
                    {d.type === 'percentage' ? `${d.value}% OFF` : d.type === 'fixed_amount' ? `$${d.value}.00 OFF` : 'Free Shipping'}
                  </td>

                  <td className="p-3.5 font-mono text-[#6B7280]">
                    ${d.minSubtotal.toFixed(2)}
                  </td>

                  <td className="p-3.5 font-mono text-[#111827]">
                    {d.usageCount} / {d.usageLimit || '∞'} used
                  </td>

                  <td className="p-3.5 font-mono text-[#6B7280]">
                    {d.startsAt} &rarr; {d.endsAt || 'No expiry'}
                  </td>

                  <td className="p-3.5">
                    <StatusBadge status={d.status} />
                  </td>

                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => showToast({ type: 'info', title: 'Edit Coupon', message: `Editing rule ${d.code}` })}
                      className="text-xs font-semibold text-[#5B6FF5] hover:underline"
                    >
                      Configure
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
              <h3 className="text-base font-bold text-[#111827]">Create Promotional Code</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#9CA3AF]">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block font-semibold text-[#111827] mb-1">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLASH25"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-mono uppercase"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Discount Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="percentage">Percentage Markdown (%)</option>
                  <option value="fixed_amount">Fixed Amount Subsidy ($)</option>
                  <option value="free_shipping">Free Shipping Guarantee</option>
                </select>
              </div>

              {newType !== 'free_shipping' && (
                <div>
                  <label className="block font-semibold text-[#111827] mb-1">Discount Value</label>
                  <input
                    type="number"
                    required
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg font-mono"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Minimum Cart Subtotal ($)</label>
                <input
                  type="number"
                  value={newMinSubtotal}
                  onChange={(e) => setNewMinSubtotal(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#5B6FF5] text-white font-semibold rounded-lg">Publish Discount</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
