import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ClipboardList, Plus, Building, CheckCircle2, Clock, DollarSign } from 'lucide-react';

export const PurchaseOrdersPage: React.FC = () => {
  const { showToast } = useApp();
  const { purchaseOrders, suppliers } = useData();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Procurement & Purchase Orders (PO)</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Vendor procurement contracts, expected receiving dates, customs duties, and inbound inventory allocation.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Generate Purchase Order</span>
        </button>
      </div>

      {/* Purchase Orders Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase">
                <th className="p-3.5">PO Identifier</th>
                <th className="p-3.5">Supplier / Manufacturer</th>
                <th className="p-3.5">Destination Hub</th>
                <th className="p-3.5">Total Value ($)</th>
                <th className="p-3.5">Expected Delivery</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8F0]">
              {purchaseOrders.map((po) => (
                <tr key={po.id} className="hover:bg-[#F8F9FC]">
                  <td className="p-3.5 font-mono font-bold text-[#5B6FF5]">{po.poNumber}</td>
                  <td className="p-3.5 font-semibold text-[#111827]">{po.supplierName}</td>
                  <td className="p-3.5 font-medium text-[#6B7280]">{po.warehouse}</td>
                  <td className="p-3.5 font-mono font-bold text-[#111827]">${po.totalAmount.toLocaleString()}</td>
                  <td className="p-3.5 font-mono text-[#6B7280]">{po.expectedDate}</td>
                  <td className="p-3.5">
                    <StatusBadge status={po.status} />
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => showToast({ type: 'success', title: 'Receiving Dock Station', message: `Opening barcode scanner for ${po.poNumber}...` })}
                      className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-semibold"
                    >
                      Receive Units
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
              <h3 className="text-base font-bold text-[#111827]">Draft New Purchase Order</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#9CA3AF]">✕</button>
            </div>
            <p className="text-[#6B7280]">
              Specify vendor, unit quantities, and receiving warehouse destination.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button
                onClick={() => {
                  showToast({ type: 'success', title: 'Purchase Order Issued', message: 'PO-2026-08 dispatched to supplier EDI.' });
                  setModalOpen(false);
                }}
                className="px-4 py-2 bg-[#5B6FF5] text-white font-semibold rounded-lg"
              >
                Issue Purchase Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
