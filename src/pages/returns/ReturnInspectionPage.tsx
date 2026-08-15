import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import {
  QrCode,
  Barcode,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Package,
  Layers,
  Sparkles,
  Printer,
  Boxes,
  Camera,
  ShieldCheck,
} from 'lucide-react';
import { ReturnRequest } from '../../types';

export const ReturnInspectionPage: React.FC = () => {
  const { showToast } = useApp();
  const { returns, updateReturnStatus } = useData();

  const [scanCode, setScanCode] = useState('');
  const [selectedRMA, setSelectedRMA] = useState<ReturnRequest>(returns[0] || null);

  const [grade, setGrade] = useState<'Grade A (Like New)' | 'Grade B (Minor Wear)' | 'Grade C (Damaged)' | 'Defective'>('Grade A (Like New)');
  const [disposition, setDisposition] = useState<'Restock' | 'Liquidate' | 'Scrap' | 'Return to Vendor'>('Restock');
  const [restockFee, setRestockFee] = useState('0.00');
  const [notes, setNotes] = useState('Item inspected at Chicago Central Hub dock. All accessories intact.');

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanCode) return;
    const found = returns.find(
      (r) =>
        r.rmaNumber.toLowerCase().includes(scanCode.toLowerCase()) ||
        r.orderNumber.toLowerCase().includes(scanCode.toLowerCase())
    );
    if (found) {
      setSelectedRMA(found);
      showToast({
        type: 'success',
        title: 'RMA Package Found',
        message: `Loaded ${found.rmaNumber} for QC inspection grading.`,
      });
    } else {
      showToast({
        type: 'error',
        title: 'Barcode Not Found',
        message: `No active RMA package matching "${scanCode}".`,
      });
    }
  };

  const handleCompleteQC = () => {
    if (!selectedRMA) return;
    updateReturnStatus(selectedRMA.id, 'resolved');
    showToast({
      type: 'success',
      title: 'QC Inspection Complete',
      message: `Graded as ${grade}. Disposition: ${disposition}. Inventory restocked to Bin A-14.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Warehouse QC & Inspection Station</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Physical receiving dock terminal, barcode parcel scanning, item condition grading, and inventory dispositioning.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'Dock Calibration', message: 'Barcode laser scanner calibrated on COM4.' })}
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <Barcode className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Scanner Ready (Active)</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Parcels at Receiving Dock"
          value={returns.length}
          change={-5.0}
          icon={<Package className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Avg QC Turnaround"
          value="12 Mins"
          change={-22.0}
          icon={<RotateCcw className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Restock Yield Rate"
          value="88.4%"
          change={4.1}
          icon={<Boxes className="w-4 h-4 text-indigo-500" />}
        />
        <StatCard
          title="Scrap / Liquidate"
          value="11.6%"
          change={-3.2}
          icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}
        />
      </div>

      {/* Quick Scanner Search */}
      <div className="bg-[#1A1F36] text-white rounded-xl p-5 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#5B6FF5]" />
            <span className="font-bold text-sm">Dock Parcel Barcode Scanner</span>
          </div>
          <span className="text-[11px] text-[#A5B4FC] font-mono">Input RMA or Package Barcode</span>
        </div>

        <form onSubmit={handleScanSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Barcode className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Scan return shipping barcode (e.g. RMA-2024-001 or #ORD-9821)..."
              value={scanCode}
              onChange={(e) => setScanCode(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#252D4A] border border-[#374169] rounded-lg text-xs text-white placeholder-[#8B9AFE] focus:outline-hidden focus:border-[#5B6FF5]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Lookup Parcel</span>
          </button>
        </form>
      </div>

      {/* Inspection Workspace Grid */}
      {selectedRMA && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Package & Item Identification */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E8F0] pb-3">
              <div>
                <span className="font-mono font-bold text-sm text-[#5B6FF5]">
                  {selectedRMA.rmaNumber}
                </span>
                <div className="text-[11px] text-[#6B7280]">
                  Order: <strong className="text-[#111827]">{selectedRMA.orderNumber}</strong>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-sm bg-indigo-50 text-[#5B6FF5] font-bold text-[10px] uppercase">
                {selectedRMA.status.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-[#111827]">Returned SKUs in Parcel</div>
              {(selectedRMA.products || selectedRMA.items || []).map((item: any, idx: number) => (
                <div key={idx} className="bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&q=80'}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover border border-[#E5E8F0]"
                    />
                    <div>
                      <div className="font-bold text-xs text-[#111827]">{item.name}</div>
                      <div className="text-[10px] text-[#6B7280] font-mono">SKU: {item.sku}</div>
                      <div className="text-[11px] text-[#5B6FF5] font-bold mt-0.5">
                        Qty: {item.quantity} unit(s)
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#4B5563] pt-2 border-t border-[#E5E8F0]">
                    Customer Stated Reason: <em>"{item.reason || selectedRMA.reason}"</em>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E5E8F0] pt-3 text-xs space-y-1">
              <div className="text-[10px] font-bold text-[#6B7280] uppercase">Customer Contact</div>
              <div className="font-bold text-[#111827]">{selectedRMA.customer?.name || 'Customer'}</div>
              <div className="text-[#6B7280]">{selectedRMA.customer?.email || 'support@buyer.com'}</div>
            </div>
          </div>

          {/* Column 2 & 3: Grading & Disposition Controls */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-6">
            <div>
              <h3 className="text-sm font-bold text-[#111827]">Quality Control Assessment</h3>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Inspect physical product integrity, verify seal condition, and select inventory disposition.
              </p>
            </div>

            {/* Condition Grading Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#111827]">Physical Condition Grade</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'Grade A (Like New)', desc: 'Unopened / Pristine', badge: 'bg-emerald-50 text-emerald-700' },
                  { id: 'Grade B (Minor Wear)', desc: 'Opened Box / Scuffs', badge: 'bg-indigo-50 text-[#5B6FF5]' },
                  { id: 'Grade C (Damaged)', desc: 'Damaged / Missing Parts', badge: 'bg-amber-50 text-amber-700' },
                  { id: 'Defective', desc: 'Hardware Failure / DOA', badge: 'bg-rose-50 text-rose-700' },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGrade(g.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      grade === g.id
                        ? 'border-[#5B6FF5] bg-[#EEF2FF] shadow-xs ring-2 ring-[#5B6FF5]/20'
                        : 'border-[#E5E8F0] hover:bg-[#F8F9FC]'
                    }`}
                  >
                    <div className="font-bold text-xs text-[#111827]">{g.id}</div>
                    <div className="text-[10px] text-[#6B7280] mt-0.5">{g.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Disposition Routing */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#111827]">Inventory Disposition Routing</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'Restock', action: 'Return to Sellable Stock', icon: Boxes },
                  { id: 'Liquidate', action: 'Route to B-Stock Outlet', icon: Sparkles },
                  { id: 'Return to Vendor', action: 'Ship back to Supplier', icon: RotateCcw },
                  { id: 'Scrap', action: 'Recycle / Write-off Loss', icon: AlertTriangle },
                ].map((d) => {
                  const Icon = d.icon;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDisposition(d.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        disposition === d.id
                          ? 'border-[#5B6FF5] bg-[#EEF2FF] shadow-xs ring-2 ring-[#5B6FF5]/20'
                          : 'border-[#E5E8F0] hover:bg-[#F8F9FC]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-xs text-[#111827]">
                        <Icon className="w-3.5 h-3.5 text-[#5B6FF5]" />
                        <span>{d.id}</span>
                      </div>
                      <div className="text-[10px] text-[#6B7280] mt-0.5">{d.action}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Restocking Fee & Inspector Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827]">Restocking Fee ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={restockFee}
                  onChange={(e) => setRestockFee(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
                  placeholder="0.00"
                />
                <span className="text-[10px] text-[#6B7280]">Deducted from final refund if damaged.</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827]">Assigned Warehouse Bin</label>
                <input
                  type="text"
                  defaultValue="Zone A - Bin 14 (Sellable)"
                  className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-mono text-[#111827] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
                />
                <span className="text-[10px] text-[#6B7280]">Destination bin tag.</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827]">Inspector QC Log Notes</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E5E8F0]">
              <button
                type="button"
                onClick={() => showToast({ type: 'info', title: 'Barcode Printed', message: 'Restock SKU barcode printed for tote.' })}
                className="px-3 py-2 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>Print Bin Label</span>
              </button>

              <button
                type="button"
                onClick={handleCompleteQC}
                className="px-5 py-2 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sign-Off & Complete QC</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
