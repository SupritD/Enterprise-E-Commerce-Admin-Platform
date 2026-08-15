import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { BulkActionBar } from '../../components/common/BulkActionBar';
import { Pagination } from '../../components/common/Pagination';
import {
  ShoppingCart,
  Search,
  Filter,
  Plus,
  Download,
  FileText,
  Truck,
  AlertTriangle,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';

export const OrdersListPage: React.FC = () => {
  const { showToast } = useApp();
  const { orders, updateOrderStatus } = useData();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [fulfillmentFilter, setFulfillmentFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(search.toLowerCase());
    const matchesFulfillment = fulfillmentFilter === 'all' || o.fulfillmentStatus === fulfillmentFilter;
    const matchesPayment = paymentFilter === 'all' || o.paymentStatus === paymentFilter;
    const matchesRisk = riskFilter === 'all' || o.riskLevel === riskFilter;
    return matchesSearch && matchesFulfillment && matchesPayment && matchesRisk;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filtered.map((o) => o.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    }
  };

  const handleBulkFulfill = () => {
    selectedIds.forEach((id) => updateOrderStatus(id, 'fulfilled'));
    showToast({
      type: 'success',
      title: 'Orders Marked Fulfilled',
      message: `Updated fulfillment status for ${selectedIds.length} orders. Dispatched carrier tracking webhooks.`,
    });
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Order Management & Fulfillment</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Omni-channel sales processing, fraud evaluation, carrier label generation, and automated fulfillment routing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/orders/invoices"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Batch Invoices</span>
          </Link>
          <Link
            to="/orders/manual/new"
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Phone / Draft Order</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order #, customer name, email, or shipping address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] focus:bg-white focus:border-[#5B6FF5] outline-hidden transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={fulfillmentFilter}
            onChange={(e) => setFulfillmentFilter(e.target.value)}
            className="px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] outline-hidden cursor-pointer"
          >
            <option value="all">All Fulfillment</option>
            <option value="unfulfilled">Unfulfilled</option>
            <option value="partially_fulfilled">Partially Fulfilled</option>
            <option value="fulfilled">Fulfilled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] outline-hidden cursor-pointer"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending Settlement</option>
            <option value="refunded">Refunded</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] outline-hidden cursor-pointer"
          >
            <option value="all">All Risk Tiers</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk (On Hold)</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filtered.length && filtered.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-[#E5E8F0] text-[#5B6FF5]"
                  />
                </th>
                <th className="p-4">Order Number</th>
                <th className="p-4">Customer & Tier</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Items / Qty</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Fulfillment</th>
                <th className="p-4">Fraud Risk</th>
                <th className="p-4 text-right">Total ($)</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E8F0]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-[#6B7280]">
                    No orders matched your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => {
                  const isSelected = selectedIds.includes(order.id);

                  return (
                    <tr
                      key={order.id}
                      onClick={(e) => {
                        // Prevent navigate if clicked checkbox
                        if ((e.target as HTMLElement).tagName.toLowerCase() !== 'input') {
                          navigate(`/orders/${order.id}`);
                        }
                      }}
                      className={`hover:bg-[#F8F9FC] cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#5B6FF5]/5' : ''
                      }`}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectOne(order.id, e.target.checked)}
                          className="rounded border-[#E5E8F0] text-[#5B6FF5]"
                        />
                      </td>

                      <td className="p-4 font-mono font-bold text-[#5B6FF5]">
                        <Link to={`/orders/${order.id}`} className="hover:underline">
                          {order.orderNumber}
                        </Link>
                        <div className="text-[10px] text-[#6B7280] font-normal">
                          {order.channel}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-semibold text-[#111827]">{order.customer.name}</div>
                        <div className="text-[11px] text-[#6B7280]">{order.customer.email}</div>
                      </td>

                      <td className="p-4 font-mono text-[#6B7280]">
                        {order.createdAt}
                      </td>

                      <td className="p-4 font-medium text-[#111827]">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} items ({order.items.length} lines)
                      </td>

                      <td className="p-4">
                        <StatusBadge status={order.paymentStatus} />
                      </td>

                      <td className="p-4">
                        <StatusBadge status={order.fulfillmentStatus} />
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            order.riskLevel === 'high'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : order.riskLevel === 'medium'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          <ShieldCheck className="w-3 h-3" />
                          {order.riskLevel}
                        </span>
                      </td>

                      <td className="p-4 font-mono font-bold text-right text-[#111827]">
                        ${order.grandTotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[#E5E8F0]">
          <Pagination
            currentPage={page}
            totalPages={4}
            totalItems={filtered.length}
            pageSize={10}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Floating Bulk Actions Bar */}
      <BulkActionBar
        selectedCount={selectedIds.length}
        onClearSelection={() => setSelectedIds([])}
        actions={[
          {
            label: 'Mark Fulfilled',
            onClick: handleBulkFulfill,
            variant: 'primary',
          },
          {
            label: 'Download Packing Slips',
            onClick: () => {
              showToast({ type: 'success', title: 'Packing Slips Generated', message: `Prepared PDF for ${selectedIds.length} orders.` });
              setSelectedIds([]);
            },
          },
        ]}
      />
    </div>
  );
};
