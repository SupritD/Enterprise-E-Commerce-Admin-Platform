import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Building2,
  Package,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Store,
  DollarSign,
  Percent,
  Layers,
  Sparkles,
  Eye,
} from 'lucide-react';

interface VendorProductItem {
  id: string;
  vendorName: string;
  vendorLogo: string;
  productName: string;
  sku: string;
  category: string;
  price: number;
  costPrice: number;
  commissionRate: number; // %
  stock: number;
  status: 'approved' | 'pending_moderation' | 'rejected';
  submittedDate: string;
  thumbnail: string;
}

export const VendorProductsPage: React.FC = () => {
  const { showToast } = useApp();
  const { vendors } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending_moderation' | 'approved' | 'rejected'>('all');

  const [vendorProducts, setVendorProducts] = useState<VendorProductItem[]>([
    {
      id: 'vp-1',
      vendorName: 'Apex Audio Dynamics',
      vendorLogo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=60',
      productName: 'Studio Pro Balanced XLR Interface DAC',
      sku: 'SKU-APX-DAC-01',
      category: 'Audio Equipment',
      price: 349.99,
      costPrice: 210.0,
      commissionRate: 15.0,
      stock: 40,
      status: 'pending_moderation',
      submittedDate: 'Aug 14, 2026',
      thumbnail: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=150&auto=format&fit=crop&q=60',
    },
    {
      id: 'vp-2',
      vendorName: 'Vanguard Ergonomics',
      vendorLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60',
      productName: 'Carbon Fiber Motorized Standing Desk (60x30")',
      sku: 'SKU-VNG-DSK-02',
      category: 'Office Furniture',
      price: 799.0,
      costPrice: 520.0,
      commissionRate: 12.5,
      stock: 15,
      status: 'approved',
      submittedDate: 'Aug 10, 2026',
      thumbnail: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=150&auto=format&fit=crop&q=60',
    },
    {
      id: 'vp-3',
      vendorName: 'Nordic Luminaires',
      vendorLogo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60',
      productName: 'Smart Ambient RGB Desk Bar Light',
      sku: 'SKU-NRD-LGT-05',
      category: 'Lighting',
      price: 89.99,
      costPrice: 42.0,
      commissionRate: 18.0,
      stock: 120,
      status: 'approved',
      submittedDate: 'Aug 08, 2026',
      thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=150&auto=format&fit=crop&q=60',
    },
    {
      id: 'vp-4',
      vendorName: 'Apex Audio Dynamics',
      vendorLogo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=60',
      productName: 'Audiophile Custom Braided Silver Cable',
      sku: 'SKU-APX-CBL-09',
      category: 'Accessories',
      price: 59.99,
      costPrice: 20.0,
      commissionRate: 15.0,
      stock: 0,
      status: 'rejected',
      submittedDate: 'Aug 05, 2026',
      thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop&q=60',
    },
  ]);

  const handleApprove = (id: string) => {
    setVendorProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'approved' } : p))
    );
    showToast({
      type: 'success',
      title: 'Vendor Product Approved',
      message: 'Product is now live on marketplace storefront.',
    });
  };

  const handleReject = (id: string) => {
    setVendorProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'rejected' } : p))
    );
    showToast({
      type: 'error',
      title: 'Vendor Product Rejected',
      message: 'Feedback and compliance guidelines emailed to seller.',
    });
  };

  const filtered = vendorProducts.filter((p) => {
    const matchesSearch =
      p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Vendor Products & Moderation</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Audit seller-submitted product listings, approve marketplace SKUs, calibrate commission cuts, and regulate catalog quality.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'Catalog Sync', message: 'Synchronized seller inventory feeds.' })}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sync All Vendor Feeds</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Vendor SKUs"
          value={vendorProducts.length}
          change={18.0}
          icon={<Package className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Pending Moderation"
          value={vendorProducts.filter((p) => p.status === 'pending_moderation').length}
          change={-2}
          icon={<Clock className="w-4 h-4 text-amber-500" />}
        />
        <StatCard
          title="Avg Commission Cut"
          value="15.2%"
          change={1.2}
          icon={<Percent className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Approved Marketplace GMV"
          value="$1.48M"
          change={24.0}
          icon={<DollarSign className="w-4 h-4 text-indigo-500" />}
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search vendor products by name, vendor, SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>

        <div className="flex items-center bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg p-1 text-xs">
          {(['all', 'pending_moderation', 'approved', 'rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-md capitalize font-medium transition-colors ${
                statusFilter === st
                  ? 'bg-white text-[#5B6FF5] shadow-2xs font-semibold'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">Product Details</th>
              <th className="p-4">Seller / Vendor</th>
              <th className="p-4">Listing Price</th>
              <th className="p-4">Marketplace Cut</th>
              <th className="p-4">Stock On Hand</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-[#F8F9FC] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.thumbnail}
                      alt={item.productName}
                      className="w-10 h-10 rounded-lg object-cover border border-[#E5E8F0]"
                    />
                    <div>
                      <div className="font-bold text-[#111827]">{item.productName}</div>
                      <div className="text-[10px] text-[#6B7280] font-mono">
                        {item.sku} &bull; {item.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.vendorLogo}
                      alt={item.vendorName}
                      className="w-6 h-6 rounded-full object-cover border border-[#E5E8F0]"
                    />
                    <span className="font-bold text-[#111827]">{item.vendorName}</span>
                  </div>
                </td>
                <td className="p-4 font-bold text-sm text-[#111827]">${item.price.toFixed(2)}</td>
                <td className="p-4">
                  <div className="font-bold text-emerald-600 font-mono">{item.commissionRate}%</div>
                  <div className="text-[10px] text-[#6B7280]">
                    Cut: ${((item.price * item.commissionRate) / 100).toFixed(2)}
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-mono font-bold text-[#111827]">{item.stock} units</span>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700'
                        : item.status === 'pending_moderation'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {item.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {item.status !== 'approved' && (
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    )}
                    {item.status !== 'rejected' && (
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-2.5 py-1 bg-white hover:bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-xs font-semibold flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Decline</span>
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
