import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import {
  ArrowRightLeft,
  Package,
  CheckCircle2,
  Clock,
  RotateCcw,
  Search,
  Truck,
  Plus,
  DollarSign,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface ExchangeItem {
  id: string;
  exchangeNumber: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  originalItem: string;
  originalSku: string;
  replacementItem: string;
  replacementSku: string;
  priceDifference: number; // positive = customer owes, negative = refund difference
  status: 'pending_inbound' | 'replacement_picked' | 'dispatched' | 'completed';
  date: string;
}

export const ReturnExchangesPage: React.FC = () => {
  const { showToast } = useApp();
  const { orders } = useData();

  const [searchQuery, setSearchQuery] = useState('');

  const [exchanges, setExchanges] = useState<ExchangeItem[]>([
    {
      id: 'exc-1',
      exchangeNumber: 'EXC-2024-881',
      orderNumber: '#ORD-9821',
      customerName: 'Sarah Jenkins',
      customerEmail: 'sarah.j@example.com',
      originalItem: 'Mechanical Studio Pro Keyboard (Blue Switches)',
      originalSku: 'SKU-KB-01-BLU',
      replacementItem: 'Mechanical Studio Pro Keyboard (Brown Tactile Switches)',
      replacementSku: 'SKU-KB-01-BRN',
      priceDifference: 0.0,
      status: 'pending_inbound',
      date: 'Aug 14, 2026',
    },
    {
      id: 'exc-2',
      exchangeNumber: 'EXC-2024-882',
      orderNumber: '#ORD-9818',
      customerName: 'David Kim',
      customerEmail: 'david.k@enterprise.io',
      originalItem: 'Wireless Noise-Cancelling Headphones (Standard)',
      originalSku: 'SKU-AUD-02-STD',
      replacementItem: 'Wireless Noise-Cancelling Headphones (Audiophile Edition)',
      replacementSku: 'SKU-AUD-02-PRO',
      priceDifference: 45.0,
      status: 'replacement_picked',
      date: 'Aug 13, 2026',
    },
    {
      id: 'exc-3',
      exchangeNumber: 'EXC-2024-883',
      orderNumber: '#ORD-9816',
      customerName: 'Amara Okafor',
      customerEmail: 'amara.o@techcorp.co',
      originalItem: 'Ultra-Wide 34" Curved Studio Monitor',
      originalSku: 'SKU-MON-34-CRV',
      replacementItem: 'Ultra-Wide 34" Curved Studio Monitor (Same Model Replacement)',
      replacementSku: 'SKU-MON-34-CRV',
      priceDifference: 0.0,
      status: 'dispatched',
      date: 'Aug 12, 2026',
    },
  ]);

  const handleDispatchReplacement = (id: string) => {
    setExchanges((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'dispatched' } : e))
    );
    showToast({
      type: 'success',
      title: 'Replacement Dispatched',
      message: 'Created priority cross-dock shipping order with FedEx Express.',
    });
  };

  const filtered = exchanges.filter(
    (e) =>
      e.exchangeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.replacementItem.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Exchanges & Replacements</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Manage customer product exchanges, cross-shipment replacement orders, size/variant swaps, and price differences.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'New Exchange', message: 'Initiating manual customer exchange flow...' })}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Manual Exchange</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Exchanges"
          value={exchanges.length}
          change={6.0}
          icon={<ArrowRightLeft className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Cross-Dock Dispatches"
          value="18 Orders"
          change={12.5}
          icon={<Truck className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Same-Day Dispatch Rate"
          value="96.4%"
          change={2.1}
          icon={<ShieldCheck className="w-4 h-4 text-indigo-500" />}
        />
        <StatCard
          title="Upsell Price Upgrades"
          value="+$1,420"
          change={28.0}
          icon={<DollarSign className="w-4 h-4 text-amber-500" />}
        />
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search exchange by number, order, customer, SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>
      </div>

      {/* Exchanges List */}
      <div className="space-y-4">
        {filtered.map((exc) => (
          <div
            key={exc.id}
            className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-4 hover:border-[#CBD5E1] transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#5B6FF5]">{exc.exchangeNumber}</span>
                  <span className="text-[#9CA3AF]">&bull;</span>
                  <span className="font-bold text-xs text-[#111827]">{exc.customerName}</span>
                  <span className="text-[11px] text-[#6B7280]">({exc.customerEmail})</span>
                </div>
                <div className="text-xs text-[#6B7280] mt-0.5">
                  Original Order: <strong className="font-mono text-[#111827]">{exc.orderNumber}</strong> &bull; Requested: {exc.date}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                    exc.status === 'dispatched'
                      ? 'bg-emerald-50 text-emerald-700'
                      : exc.status === 'replacement_picked'
                      ? 'bg-indigo-50 text-[#5B6FF5]'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {exc.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Swap Comparison Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F8F9FC] border border-[#E5E8F0] rounded-xl p-4 text-xs">
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-[#6B7280] uppercase">Original Inbound Item</div>
                <div className="font-bold text-[#111827]">{exc.originalItem}</div>
                <div className="font-mono text-[11px] text-[#6B7280]">{exc.originalSku}</div>
              </div>

              <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#E5E8F0] md:pl-4 pt-2 md:pt-0">
                <div className="text-[10px] font-bold text-[#5B6FF5] uppercase">Target Replacement Item</div>
                <div className="font-bold text-[#111827]">{exc.replacementItem}</div>
                <div className="font-mono text-[11px] text-[#5B6FF5]">{exc.replacementSku}</div>
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E5E8F0]">
              <div className="text-xs">
                Price Variance:{' '}
                {exc.priceDifference === 0 ? (
                  <span className="font-bold text-[#111827]">Even Exchange ($0.00)</span>
                ) : exc.priceDifference > 0 ? (
                  <span className="font-bold text-amber-600">
                    +${exc.priceDifference.toFixed(2)} (Customer Charged Difference)
                  </span>
                ) : (
                  <span className="font-bold text-emerald-600">
                    -${Math.abs(exc.priceDifference).toFixed(2)} (Partial Credit Issued)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {exc.status !== 'dispatched' && (
                  <button
                    onClick={() => handleDispatchReplacement(exc.id)}
                    className="px-4 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Dispatch Cross-Dock Shipment</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
