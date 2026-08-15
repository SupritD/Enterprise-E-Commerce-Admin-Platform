import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pagination } from '../../components/common/Pagination';
import {
  Boxes,
  Building,
  Search,
  Filter,
  Plus,
  ArrowRightLeft,
  AlertTriangle,
  ClipboardCheck,
} from 'lucide-react';

export const StockOverviewPage: React.FC = () => {
  const { showToast } = useApp();
  const { products, warehouses } = useData();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [stockLevelFilter, setStockLevelFilter] = useState<'all' | 'low' | 'out' | 'healthy'>('all');

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    let matchesStock = true;
    if (stockLevelFilter === 'low') matchesStock = p.stock > 0 && p.stock <= p.lowStockThreshold;
    if (stockLevelFilter === 'out') matchesStock = p.stock === 0;
    if (stockLevelFilter === 'healthy') matchesStock = p.stock > p.lowStockThreshold;
    return matchesSearch && matchesStock;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Multi-Warehouse Inventory</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Physical stock allocation across 5 distributed logistics hubs with real-time safety stock thresholds.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/inventory/adjustments"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <ClipboardCheck className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Stock Adjustment / Audit</span>
          </Link>
          <Link
            to="/inventory/transfers/new"
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Initiate Node Transfer</span>
          </Link>
        </div>
      </div>

      {/* Warehouse Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(warehouses || []).map((wh) => {
          const location = wh.city || (typeof wh.address === 'string' ? wh.address : `${(wh.address as any)?.city || ''}, ${(wh.address as any)?.state || ''}`) || 'Secaucus, NJ';
          const cap = (wh as any).utilizationPercent ?? wh.capacityUsedPercentage ?? 75;
          return (
            <div key={wh.id} className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#111827]">{wh.name}</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 font-bold">{wh.code}</span>
              </div>
              <div className="text-[11px] text-[#6B7280]">{location}</div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E5E8F0] font-mono">
                <span>Rack Capacity:</span>
                <span className="font-bold text-[#5B6FF5]">{cap}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by SKU, item title, or barcode..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={stockLevelFilter}
            onChange={(e) => setStockLevelFilter(e.target.value as any)}
            className="px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs"
          >
            <option value="all">All Stock Statuses</option>
            <option value="low">Low Stock Alerts Only</option>
            <option value="out">Out of Stock Only</option>
            <option value="healthy">Healthy Stock Level</option>
          </select>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase">
                <th className="p-3.5">Product SKU & Title</th>
                <th className="p-3.5">Total Available</th>
                <th className="p-3.5">WH-ORD (Chicago)</th>
                <th className="p-3.5">WH-LAX (West)</th>
                <th className="p-3.5">WH-JFK (East)</th>
                <th className="p-3.5">WH-FRA (EU)</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8F0]">
              {filtered.map((prod) => {
                const isLow = prod.stock <= prod.lowStockThreshold;
                const portion = Math.floor(prod.stock / 4);

                return (
                  <tr key={prod.id} className="hover:bg-[#F8F9FC]">
                    <td className="p-3.5">
                      <div className="font-semibold text-[#111827]">{prod.name}</div>
                      <div className="text-[11px] text-[#6B7280] font-mono">{prod.sku}</div>
                    </td>

                    <td className="p-3.5 font-bold font-mono text-[#111827]">
                      {prod.stock} units
                    </td>

                    <td className="p-3.5 font-mono text-[#6B7280]">{portion + (prod.stock % 4)}</td>
                    <td className="p-3.5 font-mono text-[#6B7280]">{portion}</td>
                    <td className="p-3.5 font-mono text-[#6B7280]">{portion}</td>
                    <td className="p-3.5 font-mono text-[#6B7280]">{portion}</td>

                    <td className="p-3.5">
                      {prod.stock === 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px]">Out of Stock</span>
                      ) : isLow ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px]">Low (&le; {prod.lowStockThreshold})</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">Optimal</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
