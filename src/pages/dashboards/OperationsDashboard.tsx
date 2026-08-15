import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Clock,
  Truck,
  RotateCcw,
  LifeBuoy,
  AlertTriangle,
  PackageCheck,
  Building2,
  ArrowRight,
  Filter,
  CheckCircle2,
} from 'lucide-react';

export const OperationsDashboard: React.FC = () => {
  const { showToast } = useApp();
  const { orders, returns, supportTickets, warehouses } = useData();
  const navigate = useNavigate();

  const [selectedWarehouse, setSelectedWarehouse] = useState('all');

  const pendingFulfillment = orders.filter((o) => o.fulfillmentStatus === 'unfulfilled' || o.fulfillmentStatus === 'partially_fulfilled');
  const openReturns = returns.filter((r) => r.status === 'awaiting_approval' || r.status === 'at_qc');
  const urgentTickets = supportTickets.filter((t) => t.priority === 'urgent' && t.status !== 'closed');

  const handleBulkAssign = () => {
    showToast({
      type: 'success',
      title: 'Batch Picklist Dispatched',
      message: 'Assigned 14 priority orders to Chicago Central Hub picking queue.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Operations Command Center</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Real-time warehouse fulfillment queues, carrier SLAs, return QC lines, and support triage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-[#E5E8F0] rounded-lg px-2.5 py-1.5 text-xs text-[#111827]">
            <Building2 className="w-3.5 h-3.5 text-[#9CA3AF] mr-2" />
            <select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              className="bg-transparent border-none outline-hidden"
            >
              <option value="all">All 5 Warehouses</option>
              {warehouses.map((w) => (
                <option key={w.id} value={w.id}>{w.name} ({w.code})</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleBulkAssign}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Generate Picklists</span>
          </button>
        </div>
      </div>

      {/* Counter Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Awaiting Picking"
          value={pendingFulfillment.length}
          change={-12.4}
          icon={<Clock className="w-4 h-4 text-amber-500" />}
          onClick={() => navigate('/orders')}
        />
        <StatCard
          title="In Transit / Tracking"
          value="482"
          change={8.1}
          icon={<Truck className="w-4 h-4 text-[#5B6FF5]" />}
          onClick={() => navigate('/shipping/tracking')}
        />
        <StatCard
          title="RMAs in QC"
          value={openReturns.length}
          change={-2.0}
          icon={<RotateCcw className="w-4 h-4 text-indigo-500" />}
          onClick={() => navigate('/returns/approvals')}
        />
        <StatCard
          title="Urgent Tickets"
          value={urgentTickets.length}
          change={-50.0}
          icon={<LifeBuoy className="w-4 h-4 text-rose-500" />}
          onClick={() => navigate('/support/tickets')}
        />
        <StatCard
          title="SLA Breach Risk"
          value="3 Orders"
          change={0}
          icon={<AlertTriangle className="w-4 h-4 text-rose-600" />}
          onClick={() => navigate('/orders')}
        />
        <StatCard
          title="On-Time Dispatch"
          value="99.4%"
          change={0.2}
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          onClick={() => navigate('/shipping/rules')}
        />
      </div>

      {/* Fulfillment Pipeline / Funnel */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E8F0]">
          <div>
            <h3 className="text-sm font-bold text-[#111827]">Order Fulfillment Pipeline</h3>
            <p className="text-xs text-[#6B7280]">Active flow of customer shipments across warehouse stages</p>
          </div>
          <Link to="/orders" className="text-xs font-semibold text-[#5B6FF5] hover:underline">
            View All Order Stages &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-6">
          {[
            { stage: '1. Received & Payment Cleared', count: 18, color: 'border-blue-300 bg-blue-50/40 text-blue-900', target: '/orders' },
            { stage: '2. Assigned to Picking Batch', count: 12, color: 'border-indigo-300 bg-indigo-50/40 text-indigo-900', target: '/orders' },
            { stage: '3. Packed & Weighed', count: 9, color: 'border-purple-300 bg-purple-50/40 text-purple-900', target: '/orders/packing-slips' },
            { stage: '4. Shipping Label Printed', count: 24, color: 'border-emerald-300 bg-emerald-50/40 text-emerald-900', target: '/orders/shipping-labels' },
            { stage: '5. Carrier Manifest Scanned', count: 154, color: 'border-slate-300 bg-slate-50/40 text-slate-900', target: '/shipping/tracking' },
          ].map((col, idx) => (
            <Link
              key={idx}
              to={col.target}
              className={`p-4 rounded-xl border-2 ${col.color} hover:scale-[1.02] transition-transform`}
            >
              <div className="text-xs font-semibold">{col.stage}</div>
              <div className="text-2xl font-bold mt-2">{col.count}</div>
              <div className="text-[11px] opacity-75 mt-1">Active items</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Warehouse Status & Expedited Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Warehouse Node Latencies */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111827]">Warehouse Node Capacities</h3>
            <Link to="/inventory/warehouses" className="text-xs font-semibold text-[#5B6FF5] hover:underline">
              Manage Nodes &rarr;
            </Link>
          </div>

          <div className="divide-y divide-[#E5E8F0]">
            {warehouses.map((wh) => (
              <div key={wh.id} className="p-4 hover:bg-[#F8F9FC] transition-colors flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-[#111827] flex items-center gap-2">
                    <span>{wh.name}</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                      {wh.code}
                    </span>
                    {wh.isDefault && (
                      <span className="text-[10px] px-1.5 py-0.2 bg-indigo-50 text-indigo-700 rounded-full font-bold">
                        Primary Hub
                      </span>
                    )}
                  </div>
                  <div className="text-[#6B7280] text-[11px] mt-0.5">
                    {wh.address.city}, {wh.address.state} &bull; Manager: {wh.manager}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold text-[#111827]">
                    {wh.activeOrders} orders queue
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
                    {wh.utilizationPercent}% rack capacity
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority SLA Watchlist */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-[#111827]">Expedited / Same-Day SLA Orders</h3>
            </div>
            <Link to="/orders" className="text-xs font-semibold text-[#5B6FF5] hover:underline">
              Orders &rarr;
            </Link>
          </div>

          <div className="divide-y divide-[#E5E8F0]">
            {orders.slice(0, 3).map((o) => (
              <div
                key={o.id}
                onClick={() => navigate(`/orders/${o.id}`)}
                className="p-3.5 hover:bg-[#F8F9FC] cursor-pointer transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-[#111827] flex items-center gap-2">
                    <span className="font-mono text-[#5B6FF5]">{o.orderNumber}</span>
                    <span>&bull;</span>
                    <span>{o.customer.name}</span>
                  </div>
                  <div className="text-[11px] text-[#6B7280] mt-0.5">
                    {o.items.length} line items &bull; Method: FedEx Priority Overnight
                  </div>
                </div>

                <div className="text-right flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px] border border-rose-200">
                    SLA: 2h 15m left
                  </span>
                  <StatusBadge status={o.fulfillmentStatus} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
