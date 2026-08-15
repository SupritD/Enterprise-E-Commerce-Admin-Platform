import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import {
  Truck,
  Printer,
  Barcode,
  Search,
  Download,
  CheckCircle2,
  Clock,
  RotateCcw,
  Scale,
  Box,
  Eye,
  RefreshCw,
  X,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { Order } from '../../types';

export const ShippingLabelsPage: React.FC = () => {
  const { showToast } = useApp();
  const { orders } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [carrierFilter, setCarrierFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.shippingMethod.trackingNumber &&
        order.shippingMethod.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCarrier =
      carrierFilter === 'all' ||
      order.shippingMethod.carrier.toLowerCase() === carrierFilter.toLowerCase();
    return matchesSearch && matchesCarrier;
  });

  const handlePrintThermalLabel = (order: Order) => {
    showToast({
      type: 'success',
      title: 'Dispatched to 4x6 Thermal Label Printer',
      message: `Carrier label for ${order.orderNumber} sent via Zebra ZPL bridge.`,
    });
  };

  const handleBatchPrint = () => {
    showToast({
      type: 'success',
      title: 'Batch Thermal Labels Dispatched',
      message: `Printed 4x6 thermal barcode labels for ${filteredOrders.length} orders.`,
    });
  };

  const handleGenerateReturnLabel = (order: Order) => {
    showToast({
      type: 'info',
      title: 'Prepaid Return Label Generated',
      message: `Created FedEx Ground return manifest for ${order.orderNumber}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Shipping Labels & Manifests</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            4x6 thermal barcode shipping labels (FedEx, UPS, DHL, USPS), return postage labels, and carrier rate shopping.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'Carrier Manifest', message: 'Compiled end-of-day carrier pickup SCAN manifest.' })}
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Generate Daily SCAN Manifest</span>
          </button>
          <button
            onClick={handleBatchPrint}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Batch Print 4x6 Labels</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Shipments"
          value={orders.length}
          change={14.0}
          icon={<Truck className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Generated Labels (24h)"
          value="482 Labels"
          change={8.5}
          icon={<Barcode className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Connected Carriers"
          value="4 (FedEx, UPS, DHL, USPS)"
          change={0}
          icon={<Box className="w-4 h-4 text-indigo-500" />}
        />
        <StatCard
          title="Prepaid Return Labels"
          value="18 Active"
          change={-2.1}
          icon={<RotateCcw className="w-4 h-4 text-amber-500" />}
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order #, tracking #, recipient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B7280]">Filter Carrier:</span>
          <select
            value={carrierFilter}
            onChange={(e) => setCarrierFilter(e.target.value)}
            className="px-3 py-1.5 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] outline-hidden focus:border-[#5B6FF5]"
          >
            <option value="all">All Carriers</option>
            <option value="FedEx">FedEx Express & Ground</option>
            <option value="UPS">UPS Worldwide</option>
            <option value="DHL">DHL Express</option>
            <option value="USPS">USPS Priority</option>
          </select>
        </div>
      </div>

      {/* Shipping Labels Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">Order # & Barcode</th>
              <th className="p-4">Recipient Destination</th>
              <th className="p-4">Carrier & Service</th>
              <th className="p-4">Tracking Code</th>
              <th className="p-4">Weight & Dimensions</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-xs text-[#6B7280]">
                  No matching shipping labels found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order, idx) => {
                const tracking =
                  order.shippingMethod.trackingNumber ||
                  `94001118992231${1000 + idx * 83}`;
                return (
                  <tr key={order.id} className="hover:bg-[#F8F9FC] transition-colors">
                    <td className="p-4">
                      <div className="font-mono font-bold text-[#5B6FF5] flex items-center gap-1.5">
                        <Barcode className="w-4 h-4 text-[#9CA3AF]" />
                        <span>{order.orderNumber}</span>
                      </div>
                      <div className="text-[10px] text-[#6B7280] mt-0.5">
                        {order.items.length} Line Items &bull; {order.itemsCount} total units
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-[#111827]">{order.shippingAddress.name}</div>
                      <div className="text-[11px] text-[#6B7280]">
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-[#111827] flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-[#5B6FF5]" />
                        <span>{order.shippingMethod.carrier}</span>
                      </div>
                      <div className="text-[11px] text-[#6B7280]">{order.shippingMethod.service}</div>
                    </td>
                    <td className="p-4 font-mono font-medium text-[#111827]">
                      <span className="bg-[#F1F3F9] px-2 py-0.5 rounded-sm text-[11px] text-[#4B5563]">
                        {tracking}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-[#111827]">
                        <Scale className="w-3 h-3 text-[#9CA3AF]" />
                        <span>{(1.2 + idx * 0.4).toFixed(1)} lbs</span>
                      </div>
                      <div className="text-[10px] text-[#6B7280]">12 x 8 x 4 in</div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-2.5 py-1 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#5B6FF5]" />
                          <span>Label</span>
                        </button>
                        <button
                          onClick={() => handlePrintThermalLabel(order)}
                          className="px-3 py-1 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print 4x6</span>
                        </button>
                        <button
                          onClick={() => handleGenerateReturnLabel(order)}
                          title="Generate Return Label"
                          className="p-1 hover:bg-[#F1F3F9] rounded-lg text-[#6B7280] hover:text-[#111827]"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 4x6 Thermal Label Modal Preview */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E5E8F0] shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between bg-[#F8F9FC]">
              <div className="flex items-center gap-2">
                <Barcode className="w-4 h-4 text-[#5B6FF5]" />
                <span className="font-bold text-sm text-[#111827]">
                  4x6 Thermal Label: {selectedOrder.orderNumber}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePrintThermalLabel(selectedOrder)}
                  className="px-3 py-1 bg-[#5B6FF5] text-white rounded-lg text-xs font-semibold hover:bg-[#4557E0] flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 text-[#6B7280] hover:text-[#111827] rounded-lg ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Standard 4x6 Thermal Shipping Label Template */}
            <div className="p-6 bg-[#FAFAFA] flex justify-center">
              <div className="w-[340px] bg-white border-2 border-[#111827] rounded-sm p-4 font-mono text-[11px] leading-tight text-[#111827] shadow-md space-y-3">
                {/* Carrier Banner */}
                <div className="flex items-center justify-between border-b-2 border-[#111827] pb-2">
                  <div className="text-base font-black tracking-tighter">
                    {selectedOrder.shippingMethod.carrier.toUpperCase()}
                  </div>
                  <div className="text-[10px] font-bold border border-[#111827] px-1.5 py-0.5">
                    PRIORITY 2-DAY
                  </div>
                </div>

                {/* Origin / Ship From */}
                <div className="text-[9px] border-b border-[#111827] pb-2">
                  <span className="font-bold">SHIP FROM:</span><br />
                  OMNICOMMERCE LOGISTICS HUB #1<br />
                  100 WAREHOUSE WAY, DOCK 4<br />
                  CHICAGO, IL 60607
                </div>

                {/* Destination / Ship To */}
                <div className="py-2 border-b-2 border-[#111827]">
                  <div className="text-[9px] font-bold text-[#4B5563]">SHIP TO:</div>
                  <div className="text-xs font-black uppercase mt-0.5">
                    {selectedOrder.shippingAddress.name}
                  </div>
                  <div className="text-[11px] font-bold">
                    {selectedOrder.shippingAddress.street}<br />
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{' '}
                    {selectedOrder.shippingAddress.postalCode}<br />
                    {selectedOrder.shippingAddress.country}
                  </div>
                </div>

                {/* Routing Matrix Code */}
                <div className="flex items-center justify-between border-b border-[#111827] pb-2 text-[10px]">
                  <div>
                    <span className="font-bold">ORD:</span> {selectedOrder.orderNumber}<br />
                    <span className="font-bold">WT:</span> 1.8 LBS<br />
                    <span className="font-bold">ZONE:</span> 04
                  </div>
                  <div className="w-14 h-14 border border-[#111827] p-1 flex items-center justify-center text-center font-bold text-[8px] bg-[#111827] text-white">
                    [2D DATA MATRIX]
                  </div>
                </div>

                {/* Tracking Barcode */}
                <div className="pt-2 text-center">
                  <div className="h-14 bg-[#111827] text-white flex items-center justify-center font-bold text-xs tracking-widest">
                    ||| ||||| || |||||||| ||| ||||||
                  </div>
                  <div className="font-bold text-xs mt-1.5 tracking-wider">
                    {selectedOrder.shippingMethod.trackingNumber || '9400 1118 9922 3192 8410 23'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
