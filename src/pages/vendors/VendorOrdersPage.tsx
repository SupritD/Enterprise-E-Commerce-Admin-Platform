import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Truck,
  Building2,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Package,
  Eye,
  Store,
  DollarSign,
  Send,
} from 'lucide-react';

interface VendorOrderItem {
  id: string;
  orderNumber: string;
  vendorName: string;
  vendorLogo: string;
  customerName: string;
  items: Array<{ name: string; sku: string; quantity: number; price: number }>;
  vendorPayoutAmount: number;
  marketplaceFee: number;
  fulfillmentStatus: 'unfulfilled' | 'shipped' | 'delivered';
  trackingNumber?: string;
  carrier?: string;
  orderDate: string;
  slaDeadline: string;
}

export const VendorOrdersPage: React.FC = () => {
  const { showToast } = useApp();
  const { vendors } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('all');

  const [vendorOrders, setVendorOrders] = useState<VendorOrderItem[]>([
    {
      id: 'vo-1',
      orderNumber: '#ORD-9821',
      vendorName: 'Apex Audio Dynamics',
      vendorLogo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=60',
      customerName: 'Sarah Jenkins',
      items: [{ name: 'Acoustic Studio Pro ANC Headphones', sku: 'SKU-AUD-02-PRO', quantity: 1, price: 249.99 }],
      vendorPayoutAmount: 212.49,
      marketplaceFee: 37.5,
      fulfillmentStatus: 'unfulfilled',
      orderDate: 'Aug 14, 2026',
      slaDeadline: 'Within 18 Hours',
    },
    {
      id: 'vo-2',
      orderNumber: '#ORD-9819',
      vendorName: 'Vanguard Ergonomics',
      vendorLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60',
      customerName: 'Elena Rostova',
      items: [{ name: 'Ergonomic Executive Mesh Chair', sku: 'SKU-FURN-01', quantity: 1, price: 499.0 }],
      vendorPayoutAmount: 436.62,
      marketplaceFee: 62.38,
      fulfillmentStatus: 'shipped',
      trackingNumber: '1Z9999999999999999',
      carrier: 'UPS Ground',
      orderDate: 'Aug 13, 2026',
      slaDeadline: 'On Time',
    },
    {
      id: 'vo-3',
      orderNumber: '#ORD-9818',
      vendorName: 'Nordic Luminaires',
      vendorLogo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60',
      customerName: 'David Kim',
      items: [{ name: 'Smart Ambient RGB Desk Bar Light', sku: 'SKU-NRD-LGT-05', quantity: 2, price: 89.99 }],
      vendorPayoutAmount: 147.58,
      marketplaceFee: 32.4,
      fulfillmentStatus: 'delivered',
      trackingNumber: '9400111899223192841023',
      carrier: 'USPS Priority',
      orderDate: 'Aug 11, 2026',
      slaDeadline: 'Delivered',
    },
  ]);

  const handleRemindVendor = (order: VendorOrderItem) => {
    showToast({
      type: 'info',
      title: 'Dispatch SLA Reminder Sent',
      message: `Notified ${order.vendorName} to fulfill ${order.orderNumber} within SLA.`,
    });
  };

  const filtered = vendorOrders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVendor = selectedVendor === 'all' || o.vendorName === selectedVendor;
    return matchesSearch && matchesVendor;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Vendor Dropship & Split Orders</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Monitor merchant dropship fulfillment performance, multi-seller split orders, and seller dispatch SLAs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'Exporting Dispatch Report', message: 'Compiled merchant shipping ledger.' })}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Export Dropship Ledger</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Vendor Split Orders"
          value={vendorOrders.length}
          change={14.0}
          icon={<Package className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Awaiting Seller Dispatch"
          value={vendorOrders.filter((o) => o.fulfillmentStatus === 'unfulfilled').length}
          change={-1}
          icon={<Clock className="w-4 h-4 text-amber-500" />}
        />
        <StatCard
          title="Seller SLA Compliance"
          value="97.8%"
          change={0.8}
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Marketplace Fee Captured"
          value={`$${vendorOrders.reduce((s, o) => s + o.marketplaceFee, 0).toFixed(2)}`}
          change={18.0}
          icon={<DollarSign className="w-4 h-4 text-indigo-500" />}
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search vendor orders by order #, vendor, customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B7280]">Select Seller:</span>
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            className="px-3 py-1.5 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] outline-hidden focus:border-[#5B6FF5]"
          >
            <option value="all">All Vendors</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">Order # & Customer</th>
              <th className="p-4">Merchant / Seller</th>
              <th className="p-4">Assigned Items</th>
              <th className="p-4">Seller Payout & Cut</th>
              <th className="p-4">Dispatch Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {filtered.map((order) => (
              <tr key={order.id} className="hover:bg-[#F8F9FC] transition-colors">
                <td className="p-4">
                  <div className="font-mono font-bold text-[#5B6FF5]">{order.orderNumber}</div>
                  <div className="text-[11px] text-[#6B7280] mt-0.5">{order.customerName}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={order.vendorLogo}
                      alt={order.vendorName}
                      className="w-6 h-6 rounded-full object-cover border border-[#E5E8F0]"
                    />
                    <span className="font-bold text-[#111827]">{order.vendorName}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="text-xs">
                        <span className="font-medium text-[#111827]">
                          {item.quantity}x {item.name}
                        </span>
                        <div className="text-[10px] text-[#6B7280] font-mono">${item.price.toFixed(2)} ea</div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-[#111827]">
                    Payout: ${order.vendorPayoutAmount.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">
                    Platform Fee: +${order.marketplaceFee.toFixed(2)}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      order.fulfillmentStatus === 'delivered'
                        ? 'bg-emerald-50 text-emerald-700'
                        : order.fulfillmentStatus === 'shipped'
                        ? 'bg-indigo-50 text-[#5B6FF5]'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {order.fulfillmentStatus}
                  </span>
                  <div className="text-[10px] text-[#6B7280] mt-1">SLA: {order.slaDeadline}</div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {order.fulfillmentStatus === 'unfulfilled' && (
                      <button
                        onClick={() => handleRemindVendor(order)}
                        className="px-2.5 py-1 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] text-[#5B6FF5] rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Ping</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
