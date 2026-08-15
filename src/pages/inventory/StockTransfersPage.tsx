import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ArrowRightLeft, Plus, Truck, CheckCircle2, Clock } from 'lucide-react';

export const StockTransfersPage: React.FC = () => {
  const { showToast } = useApp();
  const { stockTransfers } = useData();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Inter-Warehouse Stock Transfers</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Logistics balance transfers, freight bill of ladings (BOL), in-transit inventory tracking, and receiving audits.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Transfer Order</span>
        </button>
      </div>

      {/* Transfers Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase">
                <th className="p-3.5">Transfer Number</th>
                <th className="p-3.5">Origin Facility</th>
                <th className="p-3.5">Destination Hub</th>
                <th className="p-3.5">Total Quantity</th>
                <th className="p-3.5">Carrier / Freight</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Est. Arrival</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8F0]">
              {stockTransfers.map((tr) => (
                <tr key={tr.id} className="hover:bg-[#F8F9FC]">
                  <td className="p-3.5 font-mono font-bold text-[#5B6FF5]">{tr.transferNumber}</td>
                  <td className="p-3.5 font-semibold text-[#111827]">{tr.sourceWarehouse}</td>
                  <td className="p-3.5 font-semibold text-[#111827]">{tr.destinationWarehouse}</td>
                  <td className="p-3.5 font-mono">{tr.totalUnits} units ({tr.items.length} SKUs)</td>
                  <td className="p-3.5 font-mono text-[#6B7280]">FedEx Freight &bull; #940291</td>
                  <td className="p-3.5">
                    <StatusBadge status={tr.status} />
                  </td>
                  <td className="p-3.5 font-mono text-[#6B7280]">{tr.expectedArrival}</td>
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
              <h3 className="text-base font-bold text-[#111827]">Create Stock Transfer Order</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#9CA3AF]">✕</button>
            </div>
            <p className="text-[#6B7280]">
              Specify source origin hub and destination node to allocate picking manifests.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button
                onClick={() => {
                  showToast({ type: 'success', title: 'Transfer Dispatched', message: 'Manifest sent to warehouse pick queue.' });
                  setModalOpen(false);
                }}
                className="px-4 py-2 bg-[#5B6FF5] text-white font-semibold rounded-lg"
              >
                Dispatch Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
