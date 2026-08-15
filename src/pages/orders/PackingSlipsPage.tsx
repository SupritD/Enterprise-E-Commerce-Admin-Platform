import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import {
  Package,
  Printer,
  Barcode,
  Search,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  CheckSquare,
  Square,
  AlertCircle,
  Truck,
  Eye,
  Download,
  X,
} from 'lucide-react';
import { Order } from '../../types';

export const PackingSlipsPage: React.FC = () => {
  const { showToast } = useApp();
  const { orders, warehouses } = useData();

  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const pendingPacking = orders.filter(
    (o) => o.fulfillmentStatus === 'unfulfilled' || o.fulfillmentStatus === 'partially_fulfilled'
  );

  const filteredOrders = pendingPacking.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const toggleItemCheck = (itemId: string) => {
    setCheckedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handlePrintSlip = (order: Order) => {
    showToast({
      type: 'success',
      title: 'Dispatched to Warehouse Thermal Printer',
      message: `Printed packing slip for order ${order.orderNumber} (Zone A-12).`,
    });
  };

  const handleBatchPrint = () => {
    showToast({
      type: 'success',
      title: 'Batch Picklist & Slips Generated',
      message: `Generated unified packing list for ${filteredOrders.length} pending orders.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Packing Slips & Picklists</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Warehouse fulfillment picking slips, SKU bin locations, batch pick lists, and quality check sign-offs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'Exporting Picklist', message: 'Compiled multi-SKU bin routing manifest.' })}
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Download Master Picklist</span>
          </button>
          <button
            onClick={handleBatchPrint}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print All Pending Slips</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Orders Awaiting Packing"
          value={pendingPacking.length}
          change={-8.5}
          icon={<Package className="w-4 h-4 text-amber-500" />}
        />
        <StatCard
          title="SKUs in Picking Queue"
          value={pendingPacking.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0)}
          change={12.0}
          icon={<Layers className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Active Warehouse Hubs"
          value={warehouses.length}
          change={0}
          icon={<MapPin className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Average Pack Speed"
          value="4.2 mins / order"
          change={18.0}
          icon={<Clock className="w-4 h-4 text-indigo-500" />}
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order #, customer, or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B7280]">Warehouse Hub:</span>
          <select
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
            className="px-3 py-1.5 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] outline-hidden focus:border-[#5B6FF5]"
          >
            <option value="all">All Warehouse Nodes</option>
            {warehouses.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name} ({w.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Packing Slips Queue Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">Order # / Slip ID</th>
              <th className="p-4">Customer Destination</th>
              <th className="p-4">Items / SKU Bin Locations</th>
              <th className="p-4">Fulfillment Channel</th>
              <th className="p-4">Carrier Service</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-xs text-[#6B7280]">
                  All packing slips have been printed and dispatched!
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#F8F9FC] transition-colors">
                  <td className="p-4">
                    <div className="font-mono font-bold text-[#5B6FF5] flex items-center gap-1.5">
                      <Barcode className="w-4 h-4 text-[#9CA3AF]" />
                      <span>{order.orderNumber}</span>
                    </div>
                    <div className="text-[11px] text-[#6B7280] mt-0.5">SLIP-{order.orderNumber.replace('#', '')}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-[#111827]">{order.shippingAddress.name}</div>
                    <div className="text-[11px] text-[#6B7280]">
                      {order.shippingAddress.city}, {order.shippingAddress.state} ({order.shippingAddress.country})
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={item.id} className="flex items-center gap-2 text-[11px]">
                          <span className="font-mono font-bold text-[#5B6FF5] bg-indigo-50 px-1.5 py-0.5 rounded-sm">
                            Bin A-{10 + idx * 4}
                          </span>
                          <span className="font-medium text-[#111827]">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-[#9CA3AF] font-mono">({item.sku})</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F1F3F9] text-[#4B5563] text-[11px] font-medium capitalize">
                      {order.channel.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-[#111827] flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#5B6FF5]" />
                      <span>{order.shippingMethod.carrier}</span>
                    </div>
                    <div className="text-[10px] text-[#6B7280]">{order.shippingMethod.service}</div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-2.5 py-1 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#5B6FF5]" />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => handlePrintSlip(order)}
                        className="px-3 py-1 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Slip</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Packing Slip Detailed Modal Preview */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E5E8F0] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between bg-[#F8F9FC]">
              <div className="flex items-center gap-2">
                <Barcode className="w-4 h-4 text-[#5B6FF5]" />
                <span className="font-bold text-sm text-[#111827]">
                  Warehouse Picking & Packing Slip: {selectedOrder.orderNumber}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePrintSlip(selectedOrder)}
                  className="px-3 py-1 bg-[#5B6FF5] text-white rounded-lg text-xs font-semibold hover:bg-[#4557E0] flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 text-[#6B7280] hover:text-[#111827] rounded-lg ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Rendered Slip */}
            <div className="p-8 space-y-6 text-xs text-[#111827] bg-white">
              <div className="flex justify-between items-start border-b border-[#E5E8F0] pb-6">
                <div>
                  <div className="text-xl font-black text-[#5B6FF5]">OMNICOMMERCE WMS</div>
                  <div className="text-[11px] text-[#6B7280] mt-0.5">
                    Central Distribution Center &bull; Bay 4 Picking Line
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#111827]">PACKING MANIFEST</div>
                  <div className="font-mono text-sm font-bold text-[#5B6FF5] mt-0.5">{selectedOrder.orderNumber}</div>
                  <div className="text-[11px] text-[#6B7280] mt-0.5">Generated: {selectedOrder.createdAt}</div>
                </div>
              </div>

              {/* Barcode & Routing info */}
              <div className="bg-[#F8F9FC] border border-[#E5E8F0] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-[#6B7280] uppercase">Fulfillment Station</div>
                  <div className="text-xs font-bold text-[#111827] mt-0.5">Chicago Central Hub #1 (Zone 3)</div>
                  <div className="text-[11px] text-[#6B7280]">
                    Carrier: {selectedOrder.shippingMethod.carrier} &bull; Service: {selectedOrder.shippingMethod.service}
                  </div>
                </div>
                <div className="text-center font-mono text-[10px] text-[#6B7280]">
                  <div className="h-10 w-36 bg-[#111827] text-white flex items-center justify-center font-bold tracking-widest text-xs rounded-sm">
                    |||| || ||||| ||||
                  </div>
                  <div className="mt-1">{selectedOrder.orderNumber.replace('#', 'PKG-')}</div>
                </div>
              </div>

              {/* Ship-To Section */}
              <div className="border border-[#E5E8F0] rounded-xl p-4 bg-white">
                <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">
                  Deliver To Customer
                </div>
                <div className="font-bold text-sm text-[#111827]">{selectedOrder.shippingAddress.name}</div>
                <div className="text-xs text-[#6B7280] mt-0.5">
                  {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city},{' '}
                  {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode} (
                  {selectedOrder.shippingAddress.country})
                </div>
              </div>

              {/* Picking Checklist Table */}
              <div>
                <div className="text-xs font-bold text-[#111827] mb-2 flex items-center justify-between">
                  <span>Picked SKU Checklist</span>
                  <span className="text-[11px] text-[#6B7280] font-normal">Click checkmark when verified in tote</span>
                </div>
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F8F9FC] border-y border-[#E5E8F0] text-[10px] font-bold text-[#6B7280] uppercase">
                      <th className="py-2.5 px-3">Verified</th>
                      <th className="py-2.5 px-3">Warehouse Bin</th>
                      <th className="py-2.5 px-3">SKU & Item Name</th>
                      <th className="py-2.5 px-3 text-center">Qty to Pack</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E8F0]">
                    {selectedOrder.items.map((item, idx) => {
                      const isChecked = !!checkedItems[item.id];
                      return (
                        <tr key={item.id} className={isChecked ? 'bg-emerald-50/50' : ''}>
                          <td className="py-2.5 px-3">
                            <button
                              onClick={() => toggleItemCheck(item.id)}
                              className="text-[#5B6FF5] hover:text-[#4557E0]"
                            >
                              {isChecked ? (
                                <CheckSquare className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Square className="w-4 h-4 text-[#9CA3AF]" />
                              )}
                            </button>
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-[#5B6FF5]">
                            A-{12 + idx * 3}
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="font-semibold text-[#111827]">{item.name}</div>
                            <div className="text-[10px] text-[#6B7280] font-mono">{item.sku}</div>
                          </td>
                          <td className="py-2.5 px-3 text-center font-bold text-sm text-[#111827]">
                            {item.quantity}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Sign-Off Footer */}
              <div className="pt-4 border-t border-[#E5E8F0] grid grid-cols-2 gap-4 text-xs text-[#6B7280]">
                <div>
                  <span className="font-medium text-[#111827]">Packed By:</span> ___________________
                </div>
                <div className="text-right">
                  <span className="font-medium text-[#111827]">QC Inspected By:</span> ___________________
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
