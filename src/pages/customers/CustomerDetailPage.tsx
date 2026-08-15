import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Award,
  DollarSign,
  ShoppingCart,
  Calendar,
  MapPin,
  CreditCard,
  Lock,
  Download,
  Trash2,
  Send,
  Plus,
} from 'lucide-react';

export const CustomerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const { customers, orders } = useData();

  const customer = customers.find((c) => c.id === id) || customers[0];
  const customerOrders = orders.filter((o) => o.customer.id === customer.id);

  const [activeTab, setActiveTab] = useState<'orders' | 'b2b' | 'loyalty' | 'addresses' | 'gdpr'>('orders');
  const [pointsAdjustmentModal, setPointsAdjustmentModal] = useState(false);
  const [pointsAmount, setPointsAmount] = useState('500');

  const handleAdjustPoints = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: 'success',
      title: 'Loyalty Balance Updated',
      message: `Added ${pointsAmount} reward points to ${customer.name}'s wallet.`,
    });
    setPointsAdjustmentModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/customers')}
            className="p-2 rounded-lg bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] text-[#6B7280] shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#111827] tracking-tight">{customer.name}</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {customer.tier} Tier
                </span>
              </div>
              <p className="text-xs text-[#6B7280] font-mono mt-0.5">
                {customer.email} &bull; {customer.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'Email Dispatch', message: `Opened direct email composer for ${customer.email}...` })}
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Send Direct Email</span>
          </button>
          <button
            onClick={() => setPointsAdjustmentModal(true)}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Adjust Loyalty Points</span>
          </button>
        </div>
      </div>

      {/* RFM Intelligence Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card space-y-1">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Lifetime Value (LTV)</div>
          <div className="text-xl font-black text-emerald-600 font-mono">${(customer.totalSpend ?? customer.totalSpent ?? 0).toLocaleString()}</div>
          <div className="text-[10px] text-[#9CA3AF]">Top 2% of customer base</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card space-y-1">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Completed Orders</div>
          <div className="text-xl font-black text-[#111827] font-mono">{customer.totalOrders ?? customer.ordersCount ?? 0} orders</div>
          <div className="text-[10px] text-[#9CA3AF]">AOV: ${(customer.avgOrderValue ?? customer.averageOrderValue ?? 0).toFixed(2)}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card space-y-1">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Reward Points Balance</div>
          <div className="text-xl font-black text-[#5B6FF5] font-mono">{customer.rewardPoints} pts</div>
          <div className="text-[10px] text-[#9CA3AF]">Worth ${(customer.rewardPoints * 0.01).toFixed(2)} store credit</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card space-y-1">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Credit Limit / Terms</div>
          <div className="text-xl font-black text-[#111827] font-mono">${(customer.creditLimit || 25000).toLocaleString()}</div>
          <div className="text-[10px] text-emerald-600 font-semibold">{customer.paymentTerms || 'Net-30 Days'}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E8F0]">
        {[
          { id: 'orders', label: `Purchase History (${customerOrders.length})` },
          { id: 'b2b', label: 'B2B Wholesale & Credit Line' },
          { id: 'loyalty', label: 'Loyalty Rewards Ledger' },
          { id: 'addresses', label: 'Addresses & Delivery Book' },
          { id: 'gdpr', label: 'Privacy & GDPR Compliance' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#5B6FF5] text-[#5B6FF5]'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase">
                  <th className="p-3.5">Order Number</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Items</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Fulfillment</th>
                  <th className="p-3.5 text-right">Total ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E8F0]">
                {customerOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-[#6B7280]">
                      No previous orders recorded for this account.
                    </td>
                  </tr>
                ) : (
                  customerOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#F8F9FC]">
                      <td className="p-3.5 font-mono font-bold text-[#5B6FF5]">
                        <Link to={`/orders/${o.id}`} className="hover:underline">{o.orderNumber}</Link>
                      </td>
                      <td className="p-3.5 font-mono text-[#6B7280]">{o.createdAt}</td>
                      <td className="p-3.5">{o.items.length} item lines</td>
                      <td className="p-3.5"><StatusBadge status={o.paymentStatus} /></td>
                      <td className="p-3.5"><StatusBadge status={o.fulfillmentStatus} /></td>
                      <td className="p-3.5 font-mono font-bold text-right text-[#111827]">${o.grandTotal.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'b2b' && (
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 max-w-2xl text-xs">
          <h3 className="text-sm font-bold text-[#111827]">B2B Corporate Credit Facility</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#111827] mb-1">Assigned Credit Limit ($)</label>
              <input
                type="number"
                defaultValue={customer.creditLimit || 25000}
                className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#111827] mb-1">Invoice Payment Terms</label>
              <select defaultValue={customer.paymentTerms || 'net_30'} className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg">
                <option value="due_on_receipt">Due Upon Receipt</option>
                <option value="net_15">Net-15 Days</option>
                <option value="net_30">Net-30 Days</option>
                <option value="net_60">Net-60 Days</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-[#F8F9FC] rounded-xl border border-[#E5E8F0] space-y-1">
            <div className="font-bold text-[#111827]">Current Credit Utilization</div>
            <div className="text-[#6B7280] font-mono">$1,890.00 outstanding / ${(customer.creditLimit || 25000).toLocaleString()} limit (7.5% utilized)</div>
          </div>

          <button
            onClick={() => showToast({ type: 'success', title: 'Credit Terms Saved', message: 'Updated B2B underwriting parameters.' })}
            className="px-4 py-2 bg-[#5B6FF5] text-white font-semibold rounded-lg shadow-sm"
          >
            Save Credit Parameters
          </button>
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 max-w-2xl text-xs">
          <h3 className="text-sm font-bold text-[#111827]">Primary Delivery Destination</h3>

          <div className="p-4 rounded-xl border border-[#E5E8F0] bg-[#F8F9FC] space-y-1 leading-relaxed">
            <div className="font-bold text-[#111827]">{customer.shippingAddress.name}</div>
            <div className="text-[#4B5563]">{customer.shippingAddress.street}</div>
            <div className="text-[#4B5563]">{customer.shippingAddress.city}, {customer.shippingAddress.state} {customer.shippingAddress.zip}</div>
            <div className="text-[#4B5563]">{customer.shippingAddress.country}</div>
          </div>
        </div>
      )}

      {activeTab === 'gdpr' && (
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 max-w-2xl text-xs">
          <h3 className="text-sm font-bold text-[#111827]">GDPR & CCPA Data Privacy Rights</h3>
          <p className="text-[#6B7280]">
            Export all personal identifiable information (PII), telemetry logs, and purchase ledger data, or execute permanent deletion.
          </p>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => showToast({ type: 'success', title: 'Data Archive Ready', message: 'Downloaded customer_data_export.json' })}
              className="px-4 py-2 bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] rounded-lg font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>Export Full JSON Archive</span>
            </button>
            <button
              onClick={() => showToast({ type: 'error', title: 'GDPR Purge Request', message: 'Anonymization workflow queued for 30-day compliance cycle.' })}
              className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg font-semibold flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Anonymize & Purge PII</span>
            </button>
          </div>
        </div>
      )}

      {/* Adjust Points Modal */}
      {pointsAdjustmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[#E5E8F0]">
              <h3 className="text-base font-bold text-[#111827]">Adjust Loyalty Points</h3>
              <button onClick={() => setPointsAdjustmentModal(false)} className="text-[#9CA3AF]">✕</button>
            </div>

            <form onSubmit={handleAdjustPoints} className="space-y-4">
              <div>
                <label className="block font-semibold text-[#111827] mb-1">Points Amount to Credit</label>
                <input
                  type="number"
                  required
                  value={pointsAmount}
                  onChange={(e) => setPointsAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setPointsAdjustmentModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#5B6FF5] text-white font-semibold rounded-lg">Apply Points Credit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
