import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { ClipboardCheck, Plus, CheckCircle2, AlertTriangle, FileSpreadsheet } from 'lucide-react';

export const StockAdjustmentsPage: React.FC = () => {
  const { showToast } = useApp();
  const { products } = useData();

  const [adjustments, setAdjustments] = useState([
    {
      id: 'adj_1',
      date: '2026-08-14',
      sku: 'SKU-ELEC-401',
      productName: 'Ultra-HD Smart Noise Cancelling Headphones',
      warehouse: 'Chicago Central Hub',
      change: -2,
      reason: 'Damaged in transit packaging',
      author: 'Alex Vance (Admin)',
    },
    {
      id: 'adj_2',
      date: '2026-08-12',
      sku: 'SKU-FURN-102',
      productName: 'Ergonomic Standing Desk Pro',
      warehouse: 'Los Angeles Logistics',
      change: +10,
      reason: 'Physical cycle count variance discovery',
      author: 'Carlos Rivera (Wh Mgr)',
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSku, setSelectedSku] = useState(products[0]?.sku || '');
  const [qtyChange, setQtyChange] = useState('1');
  const [reason, setReason] = useState('Physical cycle count discovery');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find((p) => p.sku === selectedSku);
    const newAdj = {
      id: `adj_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      sku: selectedSku,
      productName: prod?.name || 'Selected Item',
      warehouse: 'Chicago Central Hub',
      change: parseInt(qtyChange) || 0,
      reason,
      author: 'Alex Vance (Admin)',
    };
    setAdjustments([newAdj, ...adjustments]);
    showToast({ type: 'success', title: 'Inventory Ledger Adjusted', message: `Applied ${qtyChange} unit adjustment to ${selectedSku}.` });
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Stock Adjustments & Cycle Count Audits</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Immutable physical audit log for inventory write-offs, shrinkage reconciliation, and cycle count discrepancies.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Stock Adjustment</span>
        </button>
      </div>

      {/* Adjustments Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase">
                <th className="p-3.5">Audit Date</th>
                <th className="p-3.5">Product & SKU</th>
                <th className="p-3.5">Facility Location</th>
                <th className="p-3.5">Adjustment Units</th>
                <th className="p-3.5">Documented Reason</th>
                <th className="p-3.5">Authorized By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8F0]">
              {adjustments.map((adj) => (
                <tr key={adj.id} className="hover:bg-[#F8F9FC]">
                  <td className="p-3.5 font-mono text-[#6B7280]">{adj.date}</td>
                  <td className="p-3.5">
                    <div className="font-semibold text-[#111827]">{adj.productName}</div>
                    <div className="text-[11px] text-[#6B7280] font-mono">{adj.sku}</div>
                  </td>
                  <td className="p-3.5 font-medium text-[#111827]">{adj.warehouse}</td>
                  <td className="p-3.5 font-mono font-bold">
                    <span className={adj.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                      {adj.change >= 0 ? `+${adj.change}` : adj.change} units
                    </span>
                  </td>
                  <td className="p-3.5 text-[#6B7280]">{adj.reason}</td>
                  <td className="p-3.5 text-[#111827] font-medium">{adj.author}</td>
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
              <h3 className="text-base font-bold text-[#111827]">Record Stock Adjustment</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#9CA3AF]">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block font-semibold text-[#111827] mb-1">Select Product SKU</label>
                <select
                  value={selectedSku}
                  onChange={(e) => setSelectedSku(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.sku}>{p.name} ({p.sku})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Adjustment Quantity (Use minus for write-off)</label>
                <input
                  type="number"
                  required
                  value={qtyChange}
                  onChange={(e) => setQtyChange(e.target.value)}
                  placeholder="e.g. -5 or +10"
                  className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Audit Reason</label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Damaged in dock handling, shrinkage, etc."
                  className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#5B6FF5] text-white font-semibold rounded-lg">Apply Adjustment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
