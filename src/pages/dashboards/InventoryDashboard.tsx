import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Boxes,
  AlertTriangle,
  ArrowRightLeft,
  ClipboardList,
  Building,
  Plus,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';

export const InventoryDashboard: React.FC = () => {
  const { showToast } = useApp();
  const { products, warehouses, purchaseOrders } = useData();
  const navigate = useNavigate();

  const totalStockUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const totalValuation = products.reduce((acc, p) => acc + p.stock * p.costPrice, 0);
  const lowStockItems = products.filter((p) => p.stock <= p.lowStockThreshold);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Inventory & Stock Intelligence</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Multi-node warehouse distribution, inventory reorder points, valuation metrics, and transfer velocity.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/inventory/transfers/new"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Stock Transfer</span>
          </Link>
          <Link
            to="/inventory/purchase-orders/new"
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Purchase Order</span>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Stock Value"
          value={`$${(totalValuation / 1000).toFixed(1)}k`}
          change={4.2}
          icon={<Boxes className="w-4 h-4 text-[#5B6FF5]" />}
          onClick={() => navigate('/inventory')}
        />
        <StatCard
          title="Total Units on Hand"
          value={totalStockUnits.toLocaleString()}
          change={-1.5}
          icon={<ClipboardList className="w-4 h-4 text-emerald-500" />}
          onClick={() => navigate('/inventory')}
        />
        <StatCard
          title="Low Stock Alerts"
          value={lowStockItems.length}
          change={-10.0}
          icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}
          onClick={() => navigate('/inventory')}
        />
        <StatCard
          title="Out of Stock SKUs"
          value="2 SKUs"
          change={0}
          icon={<TrendingDown className="w-4 h-4 text-rose-500" />}
          onClick={() => navigate('/inventory')}
        />
        <StatCard
          title="Inbound PO Units"
          value="4,500"
          change={12.0}
          icon={<ClipboardList className="w-4 h-4 text-[#8B9AFE]" />}
          onClick={() => navigate('/inventory/purchase-orders')}
        />
        <StatCard
          title="Fulfillment Centers"
          value={warehouses.length}
          change={0}
          icon={<Building className="w-4 h-4 text-indigo-500" />}
          onClick={() => navigate('/inventory/warehouses')}
        />
      </div>

      {/* Reorder Recommendation Table & Warehouse Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reorder Table (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-[#111827]">Low Stock / Urgent Reorders Required</h3>
            </div>
            <Link to="/inventory/purchase-orders/new" className="text-xs font-semibold text-[#5B6FF5] hover:underline">
              Generate Draft PO &rarr;
            </Link>
          </div>

          <div className="divide-y divide-[#E5E8F0]">
            {lowStockItems.map((prod) => (
              <div
                key={prod.id}
                onClick={() => navigate(`/catalog/products/${prod.id}`)}
                className="p-4 hover:bg-[#F8F9FC] cursor-pointer transition-colors flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={prod.thumbnail}
                    alt={prod.name}
                    className="w-10 h-10 rounded-lg object-cover border border-[#E5E8F0]"
                  />
                  <div>
                    <div className="font-semibold text-[#111827]">{prod.name}</div>
                    <div className="text-[11px] text-[#6B7280] font-mono mt-0.5">
                      SKU: {prod.sku} &bull; Cost: ${prod.costPrice.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-rose-600 text-sm">
                    {prod.stock} left in stock
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    Threshold: {prod.lowStockThreshold} units
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Warehouse Allocation */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#111827] pb-3 border-b border-[#E5E8F0]">
              Units Distributed by Node
            </h3>

            <div className="mt-4 space-y-3.5">
              {warehouses.map((wh) => (
                <div key={wh.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-[#111827]">{wh.name}</span>
                    <span className="font-mono text-[#6B7280]">{wh.utilizationPercent}% cap</span>
                  </div>
                  <div className="h-2 bg-[#F8F9FC] rounded-full overflow-hidden border border-[#E5E8F0]">
                    <div
                      style={{ width: `${wh.utilizationPercent}%` }}
                      className="h-full rounded-full bg-[#5B6FF5]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E5E8F0]">
            <Link
              to="/inventory/transfers"
              className="text-xs font-semibold text-[#5B6FF5] hover:underline flex items-center justify-between"
            >
              <span>Balance Stock Transfers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
