import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { StatCard } from '../../components/common/StatCard';
import {
  FileText,
  Download,
  Printer,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  DollarSign,
  Send,
  Building2,
  Calendar,
  X,
  ExternalLink,
} from 'lucide-react';
import { Order } from '../../types';

export const InvoicesPage: React.FC = () => {
  const { showToast } = useApp();
  const { orders } = useData();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'refunded'>('all');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalInvoiced = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const paidInvoices = orders.filter((o) => o.paymentStatus === 'paid');
  const pendingInvoices = orders.filter((o) => o.paymentStatus === 'pending');
  const totalTaxCollected = orders.reduce((sum, o) => sum + o.taxTotal, 0);

  const handlePrint = (order: Order) => {
    showToast({
      type: 'success',
      title: 'Invoice Sent to Printer',
      message: `Tax invoice for ${order.orderNumber} sent to queue.`,
    });
  };

  const handleDownloadPDF = (order: Order) => {
    showToast({
      type: 'info',
      title: 'Downloading Invoice PDF',
      message: `Generated TAX-INV-${order.orderNumber.replace('#', '')}.pdf`,
    });
  };

  const handleSendEmail = (order: Order) => {
    showToast({
      type: 'success',
      title: 'Invoice Dispatched',
      message: `PDF invoice with tax breakdown sent to ${order.customer.email}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Commercial Invoices</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Audit-ready B2B and B2C commercial tax invoices, multi-currency VAT/GST breakdowns, and export records.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'Exporting Batch', message: 'Generating CSV tax invoice registry report...' })}
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Export Invoices Log</span>
          </button>
          <button
            onClick={() => {
              if (orders.length > 0) setSelectedInvoiceOrder(orders[0]);
            }}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Batch Print Invoices</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Invoiced Value"
          value={`$${totalInvoiced.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change={14.8}
          icon={<DollarSign className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Settled Invoices"
          value={`${paidInvoices.length} Paid`}
          change={8.2}
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Pending Receivables"
          value={`${pendingInvoices.length} Pending`}
          change={-4.5}
          icon={<Clock className="w-4 h-4 text-amber-500" />}
        />
        <StatCard
          title="Tax/VAT Collected"
          value={`$${totalTaxCollected.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change={12.0}
          icon={<FileText className="w-4 h-4 text-indigo-500" />}
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by invoice #, order, customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg p-1 text-xs">
            {(['all', 'paid', 'pending', 'refunded'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-md capitalize font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-white text-[#5B6FF5] shadow-2xs font-semibold'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">Invoice / Order #</th>
              <th className="p-4">Billed Customer</th>
              <th className="p-4">Date Issued</th>
              <th className="p-4">Payment Method</th>
              <th className="p-4">Subtotal & Tax</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-xs text-[#6B7280]">
                  No matching invoice records found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#F8F9FC] transition-colors">
                  <td className="p-4">
                    <div className="font-mono font-bold text-[#5B6FF5]">
                      INV-{order.orderNumber.replace('#', '')}
                    </div>
                    <div className="text-[11px] text-[#6B7280] flex items-center gap-1 mt-0.5">
                      <span>Ref:</span>
                      <Link to={`/orders/${order.id}`} className="hover:underline font-mono text-[#111827]">
                        {order.orderNumber}
                      </Link>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={order.customer.avatar}
                        alt={order.customer.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#E5E8F0]"
                      />
                      <div>
                        <div className="font-bold text-[#111827]">{order.customer.name}</div>
                        <div className="text-[11px] text-[#6B7280]">{order.customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-[#111827]">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#9CA3AF]" />
                      <span>{order.createdAt}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F1F3F9] text-[#4B5563] text-[11px] font-medium font-mono">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-[#111827]">Sub: ${order.subtotal.toFixed(2)}</div>
                    <div className="text-[11px] text-[#6B7280]">Tax: ${order.taxTotal.toFixed(2)}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-sm text-[#111827]">
                      ${order.grandTotal.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-[#6B7280] uppercase font-mono">{order.currency}</div>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={order.paymentStatus} />
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedInvoiceOrder(order)}
                        title="Quick Preview"
                        className="p-1.5 hover:bg-[#F1F3F9] rounded-lg text-[#5B6FF5] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePrint(order)}
                        title="Print Invoice"
                        className="p-1.5 hover:bg-[#F1F3F9] rounded-lg text-[#6B7280] hover:text-[#111827] transition-colors"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadPDF(order)}
                        title="Download PDF"
                        className="p-1.5 hover:bg-[#F1F3F9] rounded-lg text-[#6B7280] hover:text-[#111827] transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSendEmail(order)}
                        title="Email to Customer"
                        className="p-1.5 hover:bg-[#F1F3F9] rounded-lg text-[#6B7280] hover:text-[#111827] transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Invoice Modal / Drawer */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E5E8F0] shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between bg-[#F8F9FC]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#5B6FF5]" />
                <span className="font-bold text-sm text-[#111827]">
                  Tax Invoice Preview: INV-{selectedInvoiceOrder.orderNumber.replace('#', '')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePrint(selectedInvoiceOrder)}
                  className="px-3 py-1 bg-white border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] hover:bg-[#F8F9FC] flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => handleDownloadPDF(selectedInvoiceOrder)}
                  className="px-3 py-1 bg-[#5B6FF5] text-white rounded-lg text-xs font-semibold hover:bg-[#4557E0] flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
                <button
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="p-1 text-[#6B7280] hover:text-[#111827] rounded-lg ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Rendered Invoice Paper */}
            <div className="p-8 space-y-6 text-xs text-[#111827] bg-white">
              <div className="flex justify-between items-start border-b border-[#E5E8F0] pb-6">
                <div>
                  <div className="text-xl font-black text-[#5B6FF5] tracking-tight">OMNICOMMERCE GLOBAL</div>
                  <div className="text-[11px] text-[#6B7280] mt-1 leading-relaxed">
                    OmniCommerce Enterprise Inc.<br />
                    100 Market Street, Suite 400<br />
                    San Francisco, CA 94105 &bull; EIN: 84-2910492<br />
                    VAT/Tax Reg: US-9283710-X
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#111827]">COMMERCIAL TAX INVOICE</div>
                  <div className="text-xs font-mono font-semibold text-[#5B6FF5] mt-0.5">
                    INV-{selectedInvoiceOrder.orderNumber.replace('#', '')}
                  </div>
                  <div className="text-[11px] text-[#6B7280] mt-1">
                    Invoice Date: {selectedInvoiceOrder.createdAt}<br />
                    Order Ref: {selectedInvoiceOrder.orderNumber}<br />
                    Payment Status: <span className="uppercase font-bold text-emerald-600">{selectedInvoiceOrder.paymentStatus}</span>
                  </div>
                </div>
              </div>

              {/* Bill To & Ship To */}
              <div className="grid grid-cols-2 gap-8 border-b border-[#E5E8F0] pb-6 text-xs">
                <div>
                  <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">
                    Billed To
                  </div>
                  <div className="font-bold text-[#111827]">{selectedInvoiceOrder.customer.name}</div>
                  <div className="text-[#6B7280] leading-relaxed mt-0.5">
                    {selectedInvoiceOrder.billingAddress.street}<br />
                    {selectedInvoiceOrder.billingAddress.city}, {selectedInvoiceOrder.billingAddress.state}{' '}
                    {selectedInvoiceOrder.billingAddress.postalCode}<br />
                    {selectedInvoiceOrder.billingAddress.country}<br />
                    {selectedInvoiceOrder.customer.email}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">
                    Delivered / Ship To
                  </div>
                  <div className="font-bold text-[#111827]">{selectedInvoiceOrder.shippingAddress.name}</div>
                  <div className="text-[#6B7280] leading-relaxed mt-0.5">
                    {selectedInvoiceOrder.shippingAddress.street}<br />
                    {selectedInvoiceOrder.shippingAddress.city}, {selectedInvoiceOrder.shippingAddress.state}{' '}
                    {selectedInvoiceOrder.shippingAddress.postalCode}<br />
                    {selectedInvoiceOrder.shippingAddress.country}<br />
                    Carrier: {selectedInvoiceOrder.shippingMethod.carrier} ({selectedInvoiceOrder.shippingMethod.service})
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F8F9FC] border-y border-[#E5E8F0] text-[10px] font-bold text-[#6B7280] uppercase">
                    <th className="py-2.5 px-3">Item / Description</th>
                    <th className="py-2.5 px-3">SKU</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Unit Price</th>
                    <th className="py-2.5 px-3 text-right">Tax Rate</th>
                    <th className="py-2.5 px-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E8F0]">
                  {selectedInvoiceOrder.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 px-3 font-semibold text-[#111827]">
                        {item.name}
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-[#6B7280]">{item.sku}</td>
                      <td className="py-3 px-3 text-center font-bold">{item.quantity}</td>
                      <td className="py-3 px-3 text-right">${item.price.toFixed(2)}</td>
                      <td className="py-3 px-3 text-right text-[#6B7280]">8.25%</td>
                      <td className="py-3 px-3 text-right font-bold text-[#111827]">
                        ${item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Financial Totals Calculation */}
              <div className="flex justify-end pt-2 border-t border-[#E5E8F0]">
                <div className="w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Item Subtotal</span>
                    <span className="font-mono text-[#111827]">${selectedInvoiceOrder.subtotal.toFixed(2)}</span>
                  </div>
                  {selectedInvoiceOrder.discountTotal > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount Savings</span>
                      <span className="font-mono">-${selectedInvoiceOrder.discountTotal.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Shipping Freight</span>
                    <span className="font-mono text-[#111827]">${selectedInvoiceOrder.shippingTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B7280]">
                    <span>State & Local Tax (VAT/GST)</span>
                    <span className="font-mono text-[#111827]">${selectedInvoiceOrder.taxTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#E5E8F0] font-bold text-sm text-[#111827]">
                    <span>Invoice Total ({selectedInvoiceOrder.currency})</span>
                    <span className="font-mono text-[#5B6FF5]">${selectedInvoiceOrder.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Compliance Footer */}
              <div className="pt-6 border-t border-[#E5E8F0] text-[10px] text-[#9CA3AF] text-center">
                This commercial tax invoice is digitally generated and compliant with electronic invoicing standards.
                Thank you for your enterprise business partnership.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
