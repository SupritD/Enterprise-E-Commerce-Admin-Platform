import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import {
  ArrowLeft,
  Printer,
  RotateCcw,
  Truck,
  CreditCard,
  User,
  MapPin,
  ShieldCheck,
  Package,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Send,
  Sparkles,
} from 'lucide-react';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const { orders, updateOrderStatus } = useData();

  const order = orders.find((o) => o.id === id) || orders[0];

  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || '1Z9999999999999999');
  const [internalNote, setInternalNote] = useState('');
  const [notesList, setNotesList] = useState([
    { author: 'System Bot', time: '2026-08-14 10:15', text: 'Fraud Risk AI Scored 12/100 (Safe). Address AVS match verified.' },
    { author: 'Alex Vance', time: '2026-08-14 10:30', text: 'Customer requested gift packaging in order comments.' },
  ]);

  const handleFulfill = () => {
    updateOrderStatus(order.id, 'fulfilled');
    showToast({
      type: 'success',
      title: 'Order Fulfilled',
      message: `Carrier label created (${order.shippingMethod}) and tracking email dispatched to ${order.customer.email}.`,
    });
  };

  const handleRefund = () => {
    updateOrderStatus(order.id, undefined, 'refunded');
    showToast({
      type: 'success',
      title: 'Refund Processed',
      message: `Issued $${order.grandTotal.toFixed(2)} refund via Stripe Payment Gateway.`,
    });
    setRefundModalOpen(false);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalNote.trim()) return;
    setNotesList([...notesList, { author: 'Alex Vance (Admin)', time: 'Just now', text: internalNote }]);
    setInternalNote('');
    showToast({ type: 'success', title: 'Internal Note Added', message: 'Staff note appended to order audit trail.' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/orders')}
            className="p-2 rounded-lg bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] text-[#6B7280] shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold text-[#111827] tracking-tight">{order.orderNumber}</h1>
              <StatusBadge status={order.paymentStatus} />
              <StatusBadge status={order.fulfillmentStatus} />
            </div>
            <p className="text-xs text-[#6B7280] font-mono mt-0.5">
              Placed on {order.createdAt} &bull; Channel: {order.channel}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/orders/invoices"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Print Invoice</span>
          </Link>

          <button
            onClick={() => setRefundModalOpen(true)}
            className="px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-[#E5E8F0] rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Issue Refund</span>
          </button>

          {order.fulfillmentStatus !== 'fulfilled' && (
            <button
              onClick={handleFulfill}
              className="px-4 py-2 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Fulfill & Print Label</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Line items, Timeline, Notes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items Table */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
            <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#111827]">Order Line Items ({order.items.length})</h3>
              <span className="text-xs text-[#6B7280] font-mono">Fulfillment: {order.warehouse || 'Chicago Central Hub'}</span>
            </div>

            <div className="divide-y divide-[#E5E8F0]">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.thumbnail}
                      alt={item.productName}
                      className="w-12 h-12 rounded-lg object-cover border border-[#E5E8F0]"
                    />
                    <div>
                      <Link
                        to={`/catalog/products/${item.productId}`}
                        className="font-semibold text-[#111827] hover:text-[#5B6FF5]"
                      >
                        {item.productName}
                      </Link>
                      <div className="text-[11px] text-[#6B7280] font-mono mt-0.5">
                        SKU: {item.sku} {item.variantTitle && `&bull; ${item.variantTitle}`}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-[#111827]">
                      ${item.total.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-[#6B7280] font-mono">
                      ${item.unitPrice.toFixed(2)} &times; {item.quantity} units
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Reconciliation Summary */}
            <div className="p-5 bg-[#F8F9FC] border-t border-[#E5E8F0] space-y-2 text-xs">
              <div className="flex justify-between text-[#6B7280]">
                <span>Subtotal:</span>
                <span className="font-mono">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discountTotal > 0 && (
                <div className="flex justify-between text-amber-600">
                  <span>Promo Code Discount:</span>
                  <span className="font-mono">-${order.discountTotal.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6B7280]">
                <span>Shipping ({order.shippingMethod}):</span>
                <span className="font-mono">${order.shippingTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>Sales Tax (State / VAT):</span>
                <span className="font-mono">${order.taxTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#111827] pt-2 border-t border-[#E5E8F0]">
                <span>Total Paid:</span>
                <span className="font-mono text-[#5B6FF5]">${order.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Timeline Audit Logs */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">Order Audit Trail & Carrier Timeline</h3>

            <div className="space-y-4 text-xs">
              {[
                { time: 'Aug 14, 2026 - 10:14 AM', title: 'Order Placed by Customer', desc: 'Authorized $699.98 on Visa card ending in 4242' },
                { time: 'Aug 14, 2026 - 10:15 AM', title: 'Fraud AI Evaluation Completed', desc: 'Risk Score: 12/100 (Safe). Passed 3D-Secure challenge.' },
                { time: 'Aug 14, 2026 - 10:20 AM', title: 'Allocated to Chicago Fulfillment Hub', desc: 'Reserved 2 units in Zone B, Rack 14' },
                { time: 'Aug 14, 2026 - 10:45 AM', title: 'Carrier Dispatch Label Printed', desc: `Assigned FedEx Priority Overnight tracking: ${trackingNumber}` },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-3 relative">
                  <div className="w-6 flex flex-col items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5B6FF5] ring-4 ring-[#5B6FF5]/20 mt-1" />
                    {idx < 3 && <span className="w-px h-full bg-[#E5E8F0] my-1" />}
                  </div>
                  <div className="pb-2">
                    <div className="font-bold text-[#111827]">{step.title}</div>
                    <div className="text-[11px] text-[#6B7280] mt-0.5">{step.desc}</div>
                    <div className="text-[10px] text-[#9CA3AF] font-mono mt-0.5">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Staff Notes */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">Internal Staff Notes</h3>

            <div className="space-y-2.5">
              {notesList.map((n, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#F8F9FC] border border-[#E5E8F0] text-xs">
                  <div className="flex justify-between font-semibold text-[#111827]">
                    <span>{n.author}</span>
                    <span className="text-[#9CA3AF] text-[10px] font-normal">{n.time}</span>
                  </div>
                  <div className="text-[#4B5563] mt-1">{n.text}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Append an internal operator note..."
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-xs"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#5B6FF5] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right 1 Col: Customer Card, Shipping Address, Risk Evaluation */}
        <div className="space-y-6">
          {/* Customer Profile Card */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E8F0]">
              <h3 className="text-sm font-bold text-[#111827]">Customer Details</h3>
              <Link
                to={`/customers/${order.customer.id}`}
                className="text-xs font-semibold text-[#5B6FF5] hover:underline"
              >
                Profile &rarr;
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={order.customer.avatar}
                alt={order.customer.name}
                className="w-10 h-10 rounded-full object-cover border border-[#E5E8F0]"
              />
              <div>
                <div className="font-semibold text-xs text-[#111827]">{order.customer.name}</div>
                <div className="text-[11px] text-[#6B7280]">{order.customer.email}</div>
                <div className="text-[11px] text-[#6B7280]">{order.customer.phone}</div>
              </div>
            </div>
          </div>

          {/* Shipping & Delivery Address */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-[#111827] pb-2 border-b border-[#E5E8F0]">
              <MapPin className="w-4 h-4 text-[#5B6FF5]" />
              <span>Shipping & Billing Address</span>
            </div>

            <div className="text-[#4B5563] space-y-1">
              <div className="font-semibold text-[#111827]">{order.shippingAddress.name}</div>
              <div>{order.shippingAddress.street}</div>
              <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</div>
              <div>{order.shippingAddress.country}</div>
            </div>

            <div className="pt-2 border-t border-[#E5E8F0] text-[11px] text-[#6B7280]">
              Carrier Method: <span className="font-semibold text-[#111827]">{order.shippingMethod}</span>
            </div>
          </div>

          {/* Fraud & Risk Evaluation */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E8F0]">
              <div className="flex items-center gap-2 font-bold text-[#111827]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Fraud Radar Score</span>
              </div>
              <span className="font-mono font-bold text-emerald-600">12 / 100</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">AVS Street Check:</span>
                <span className="font-semibold text-emerald-600">Match Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">CVV Check:</span>
                <span className="font-semibold text-emerald-600">Pass</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">IP Distance:</span>
                <span className="font-semibold text-[#111827]">0.4 miles from billing</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Tor / Proxy Node:</span>
                <span className="font-semibold text-emerald-600">Clean Residential IP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refund Modal */}
      <ConfirmModal
        isOpen={refundModalOpen}
        title="Issue Customer Refund"
        message={`Are you sure you want to reverse the $${order.grandTotal.toFixed(2)} charge for ${order.orderNumber}? Funds will be automatically credited back to the customer card.`}
        confirmText="Confirm Refund"
        variant="danger"
        onConfirm={handleRefund}
        onCancel={() => setRefundModalOpen(false)}
      />
    </div>
  );
};
