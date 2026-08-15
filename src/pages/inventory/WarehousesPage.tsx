import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { Building2, Plus, MapPin, Mail, Phone, User, CheckCircle2, SlidersHorizontal } from 'lucide-react';

export const WarehousesPage: React.FC = () => {
  const { showToast } = useApp();
  const { warehouses } = useData();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Fulfillment Centers & Warehouses</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Configure physical fulfillment nodes, geo-routing priorities, rack space capacity, and local facility managers.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Warehouse Node</span>
        </button>
      </div>

      {/* Grid of Warehouses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {warehouses.map((wh) => (
          <div key={wh.id} className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#111827]">{wh.name}</h3>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                    {wh.code}
                  </span>
                  {wh.isDefault && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      Primary Node
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#6B7280] mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  <span>
                    {typeof wh.address === 'string'
                      ? `${wh.address}, ${wh.city || ''} (${wh.country || 'USA'})`
                      : `${(wh.address as any)?.street || 'Main Warehouse Rd'}, ${(wh.address as any)?.city || wh.city || 'Secaucus'}, ${(wh.address as any)?.state || 'NJ'} ${(wh.address as any)?.zip || '07094'}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-[#F8F9FC] p-3 rounded-lg border border-[#E5E8F0] text-xs font-mono">
              <div>
                <span className="text-[#6B7280]">Facility Lead:</span>
                <div className="font-semibold text-[#111827] mt-0.5">{wh.manager || 'Sarah Jenkins'}</div>
              </div>
              <div>
                <span className="text-[#6B7280]">Active Queue:</span>
                <div className="font-semibold text-[#5B6FF5] mt-0.5">{(wh as any).activeOrders ?? 14} orders awaiting pick</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#6B7280]">Rack Storage Capacity:</span>
                <span className="font-mono font-bold text-[#111827]">
                  {(wh as any).utilizationPercent ?? wh.capacityUsedPercentage ?? 75}%
                </span>
              </div>
              <div className="h-2 bg-[#F8F9FC] rounded-full overflow-hidden border border-[#E5E8F0]">
                <div
                  style={{ width: `${(wh as any).utilizationPercent ?? wh.capacityUsedPercentage ?? 75}%` }}
                  className={`h-full rounded-full ${
                    ((wh as any).utilizationPercent ?? wh.capacityUsedPercentage ?? 75) > 85 ? 'bg-rose-500' : 'bg-[#5B6FF5]'
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[#E5E8F0]">
              <h3 className="text-base font-bold text-[#111827]">Add Warehouse Node</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#9CA3AF]">✕</button>
            </div>
            <p className="text-[#6B7280]">
              New facility will be added to the global order routing and inventory fulfillment engine.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button
                onClick={() => {
                  showToast({ type: 'success', title: 'Warehouse Node Registered', message: 'Added new fulfillment hub.' });
                  setModalOpen(false);
                }}
                className="px-4 py-2 bg-[#5B6FF5] text-white font-semibold rounded-lg"
              >
                Register Hub
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
