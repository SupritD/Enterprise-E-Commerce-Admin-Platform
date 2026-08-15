import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
  Percent,
  RotateCcw,
  AlertTriangle,
  ArrowUpRight,
  Download,
  SlidersHorizontal,
  Calendar,
  Package,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const ExecutiveDashboard: React.FC = () => {
  const { currentStore, showToast } = useApp();
  const { products, orders, returns } = useData();
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [comparePeriod, setComparePeriod] = useState(true);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  // Computed metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const lowStockCount = products.filter((p) => p.stock <= p.lowStockThreshold).length;
  const pendingReturns = returns.filter((r) => r.status === 'awaiting_approval' || r.status === 'at_qc').length;
  const onHoldOrders = orders.filter((o) => o.riskLevel === 'high' || o.paymentStatus === 'pending').length;

  const handleExportPDF = () => {
    showToast({
      type: 'success',
      title: 'Executive PDF Generated',
      message: `Downloading Executive Briefing for ${currentStore.name} (${dateRange})...`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Executive Dashboard</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Operational and revenue telemetry for <span className="font-semibold text-[#111827]">{currentStore.name}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Date Range Selector */}
          <div className="flex items-center bg-white border border-[#E5E8F0] rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#111827] shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-[#9CA3AF] mr-2" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent border-none outline-hidden cursor-pointer"
            >
              <option value="Today">Today (Real-time)</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="This Quarter">This Quarter (Q3 2026)</option>
              <option value="Year to Date">Year to Date (2026)</option>
            </select>
          </div>

          <label className="hidden md:flex items-center gap-1.5 bg-white border border-[#E5E8F0] px-2.5 py-1.5 rounded-lg text-xs text-[#6B7280] cursor-pointer shadow-2xs">
            <input
              type="checkbox"
              checked={comparePeriod}
              onChange={(e) => setComparePeriod(e.target.checked)}
              className="rounded border-[#E5E8F0] text-[#5B6FF5]"
            />
            <span>Compare vs prev period</span>
          </label>

          <button
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={() => setCustomizeOpen(!customizeOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] transition-colors shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Customize</span>
          </button>
        </div>
      </div>

      {/* Needs Attention Alert Banner */}
      {(onHoldOrders > 0 || lowStockCount > 0 || pendingReturns > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-900">
                Action Items Requiring Immediate Operator Review
              </div>
              <div className="text-xs text-amber-800 mt-0.5 flex flex-wrap items-center gap-3">
                {onHoldOrders > 0 && (
                  <Link to="/orders" className="underline font-semibold hover:text-amber-950">
                    {onHoldOrders} high-risk orders on hold
                  </Link>
                )}
                {lowStockCount > 0 && (
                  <Link to="/inventory" className="underline font-semibold hover:text-amber-950">
                    {lowStockCount} SKUs below reorder point
                  </Link>
                )}
                {pendingReturns > 0 && (
                  <Link to="/returns" className="underline font-semibold hover:text-amber-950">
                    {pendingReturns} RMAs pending QC inspection
                  </Link>
                )}
              </div>
            </div>
          </div>
          <Link
            to="/dashboard/operations"
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
          >
            Operations Command &rarr;
          </Link>
        </div>
      )}

      {/* KPI Stat Cards (6 cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total GMV"
          value={`$${(totalRevenue * 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change={18.4}
          icon={<DollarSign className="w-4 h-4" />}
          onClick={() => navigate('/dashboard/revenue')}
        />
        <StatCard
          title="Total Orders"
          value={totalOrders * 32}
          change={9.2}
          icon={<ShoppingCart className="w-4 h-4" />}
          onClick={() => navigate('/orders')}
        />
        <StatCard
          title="Average Order (AOV)"
          value={`$${avgOrderValue.toFixed(2)}`}
          change={4.8}
          icon={<TrendingUp className="w-4 h-4" />}
          onClick={() => navigate('/dashboard/revenue')}
        />
        <StatCard
          title="Active Customers"
          value="1,420"
          change={12.0}
          icon={<Users className="w-4 h-4" />}
          onClick={() => navigate('/customers')}
        />
        <StatCard
          title="Conversion Rate"
          value="3.84%"
          change={0.6}
          icon={<Percent className="w-4 h-4" />}
          onClick={() => navigate('/dashboard/marketing')}
        />
        <StatCard
          title="Return Rate"
          value="1.12%"
          change={-0.3}
          icon={<RotateCcw className="w-4 h-4" />}
          onClick={() => navigate('/returns')}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Visualizer (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E8F0]">
            <div>
              <h3 className="text-sm font-bold text-[#111827]">Revenue & Sales Velocity</h3>
              <p className="text-xs text-[#6B7280]">Daily gross settlement breakdown across channels</p>
            </div>
            <Link
              to="/dashboard/revenue"
              className="text-xs font-semibold text-[#5B6FF5] hover:underline flex items-center gap-1"
            >
              <span>Full Reconciliation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Realistic CSS Bar Trend Chart */}
          <div className="mt-6 space-y-2">
            <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
              {[
                { day: 'Aug 01', gmv: 42, b2b: 15 },
                { day: 'Aug 03', gmv: 58, b2b: 22 },
                { day: 'Aug 05', gmv: 49, b2b: 18 },
                { day: 'Aug 07', gmv: 78, b2b: 34 },
                { day: 'Aug 09', gmv: 64, b2b: 28 },
                { day: 'Aug 11', gmv: 88, b2b: 45 },
                { day: 'Aug 13', gmv: 95, b2b: 52 },
                { day: 'Aug 14', gmv: 110, b2b: 60 },
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="w-full flex flex-col items-center justify-end h-full gap-0.5">
                    {/* B2B Segment */}
                    <div
                      style={{ height: `${item.b2b}%` }}
                      className="w-full max-w-[28px] bg-[#8B9AFE] rounded-t-sm transition-all group-hover:brightness-110"
                      title={`B2B: $${item.b2b * 400}`}
                    />
                    {/* Online Store Segment */}
                    <div
                      style={{ height: `${item.gmv - item.b2b}%` }}
                      className="w-full max-w-[28px] bg-[#5B6FF5] rounded-b-sm transition-all group-hover:brightness-110"
                      title={`Storefront: $${(item.gmv - item.b2b) * 400}`}
                    />
                  </div>
                  <span className="text-[10px] text-[#9CA3AF] font-mono">{item.day}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 pt-3 text-xs text-[#6B7280]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-[#5B6FF5]" />
                <span>Web & Mobile Storefronts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-[#8B9AFE]" />
                <span>B2B Portal & Quotes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Orders By Channel (1/3 width) */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E8F0]">
              <h3 className="text-sm font-bold text-[#111827]">Orders by Channel</h3>
              <span className="text-xs font-mono text-[#6B7280]">100% Vol</span>
            </div>

            <div className="mt-4 space-y-3.5">
              {[
                { label: 'Online Storefront', percent: 54, color: 'bg-[#5B6FF5]', val: '$3.3M' },
                { label: 'B2B Wholesale Portal', percent: 28, color: 'bg-[#8B9AFE]', val: '$1.7M' },
                { label: 'Mobile Native App', percent: 12, color: 'bg-emerald-500', val: '$730k' },
                { label: 'Marketplace Vendors', percent: 6, color: 'bg-amber-500', val: '$360k' },
              ].map((channel, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-[#111827]">{channel.label}</span>
                    <span className="font-mono text-[#6B7280]">{channel.val} ({channel.percent}%)</span>
                  </div>
                  <div className="h-2 bg-[#F8F9FC] rounded-full overflow-hidden border border-[#E5E8F0]">
                    <div
                      style={{ width: `${channel.percent}%` }}
                      className={`h-full rounded-full ${channel.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E5E8F0]">
            <Link
              to="/enterprise/headless"
              className="text-xs font-semibold text-[#5B6FF5] hover:underline flex items-center justify-between"
            >
              <span>Manage Headless & API Endpoints</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tables Row: Top Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#5B6FF5]" />
              <h3 className="text-sm font-bold text-[#111827]">Top Velocity Products</h3>
            </div>
            <Link
              to="/catalog/products"
              className="text-xs font-semibold text-[#5B6FF5] hover:underline"
            >
              View Full Catalog &rarr;
            </Link>
          </div>

          <div className="divide-y divide-[#E5E8F0]">
            {products.slice(0, 4).map((prod) => (
              <div
                key={prod.id}
                onClick={() => navigate(`/catalog/products/${prod.id}`)}
                className="p-3.5 hover:bg-[#F8F9FC] cursor-pointer transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={prod.thumbnail}
                    alt={prod.name}
                    className="w-10 h-10 rounded-lg object-cover border border-[#E5E8F0] flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#111827] truncate hover:text-[#5B6FF5]">
                      {prod.name}
                    </div>
                    <div className="text-[11px] text-[#6B7280] font-mono mt-0.5">
                      {prod.sku} &bull; ${prod.price.toFixed(2)} &bull; {prod.category}
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-bold text-[#111827]">
                    ${prod.revenue.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold">
                    {prod.unitsSold} units sold
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#5B6FF5]" />
              <h3 className="text-sm font-bold text-[#111827]">Recent Incoming Orders</h3>
            </div>
            <Link
              to="/orders"
              className="text-xs font-semibold text-[#5B6FF5] hover:underline"
            >
              View All Orders &rarr;
            </Link>
          </div>

          <div className="divide-y divide-[#E5E8F0]">
            {orders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                onClick={() => navigate(`/orders/${order.id}`)}
                className="p-3.5 hover:bg-[#F8F9FC] cursor-pointer transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={order.customer.avatar}
                    alt={order.customer.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#E5E8F0] flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#111827] flex items-center gap-2">
                      <span className="font-mono">{order.orderNumber}</span>
                      <span className="text-[#9CA3AF]">&bull;</span>
                      <span className="truncate">{order.customer.name}</span>
                    </div>
                    <div className="text-[11px] text-[#6B7280] mt-0.5 flex items-center gap-2">
                      <span>${order.grandTotal.toFixed(2)}</span>
                      <span>&bull;</span>
                      <span>{order.createdAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <StatusBadge status={order.fulfillmentStatus} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
