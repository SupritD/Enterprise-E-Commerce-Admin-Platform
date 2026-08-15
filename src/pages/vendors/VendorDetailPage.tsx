import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  ArrowLeft,
  Store,
  DollarSign,
  Star,
  CheckCircle2,
  FileText,
  Mail,
  ShieldCheck,
  Package,
  Layers,
  Send,
  AlertTriangle,
} from 'lucide-react';

export const VendorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const { vendors } = useData();

  const vendor = vendors.find((v) => v.id === id) || vendors[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'payouts' | 'kyc'>('overview');
  const [commissionRate, setCommissionRate] = useState(vendor.commissionRate.toString());

  const handleSaveCommission = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: 'success',
      title: 'Commission Updated',
      message: `Updated take-rate to ${commissionRate}% for ${vendor.storeName}.`,
    });
  };

  const handleReleasePayout = () => {
    showToast({
      type: 'success',
      title: 'Payout Released',
      message: `Dispatched $${vendor.balance.toLocaleString()} to ${vendor.payoutMethod.bankName} (Acct: ${vendor.payoutMethod.accountNumber}).`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/vendors')}
            className="p-2 rounded-lg bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] text-[#6B7280] shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <img
              src={vendor.logo}
              alt={vendor.storeName}
              className="w-12 h-12 rounded-xl object-cover border border-[#E5E8F0]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#111827] tracking-tight">{vendor.storeName}</h1>
                <StatusBadge status={vendor.status} />
              </div>
              <p className="text-xs text-[#6B7280] font-mono mt-0.5">
                Legal Entity: {vendor.legalEntity} &bull; Joined: {vendor.joinedDate}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleReleasePayout}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Disburse Escrow (${vendor.balance.toLocaleString()})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card space-y-1">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Gross Seller GMV</div>
          <div className="text-xl font-black text-emerald-600 font-mono">${vendor.totalSales.toLocaleString()}</div>
          <div className="text-[10px] text-[#9CA3AF]">142 completed orders</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card space-y-1">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Commission Rate</div>
          <div className="text-xl font-black text-[#5B6FF5] font-mono">{vendor.commissionRate}%</div>
          <div className="text-[10px] text-[#9CA3AF]">Platform take-rate</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card space-y-1">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Escrow Balance</div>
          <div className="text-xl font-black text-[#111827] font-mono">${vendor.balance.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-600 font-semibold">Ready for settlement</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card space-y-1">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Customer Satisfaction</div>
          <div className="text-xl font-black text-amber-500 font-mono flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-500" />
            {vendor.rating} / 5.0
          </div>
          <div className="text-[10px] text-[#9CA3AF]">Based on 84 reviews</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E8F0]">
        {[
          { id: 'overview', label: 'Commercial Terms & Banking' },
          { id: 'kyc', label: 'KYC & Anti-Money Laundering (AML)' },
          { id: 'payouts', label: 'Historical Settlement Logs' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#5B6FF5] text-[#5B6FF5]'
                : 'border-transparent text-[#6B7280]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contents */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#111827]">Commission Agreement</h3>

            <form onSubmit={handleSaveCommission} className="space-y-4">
              <div>
                <label className="block font-semibold text-[#111827] mb-1">Take-Rate Percentage (%)</label>
                <input
                  type="number"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg font-mono text-sm"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-[#5B6FF5] text-white font-semibold rounded-lg shadow-sm"
              >
                Save Commission Rate
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#111827]">Disbursement Bank Account</h3>

            <div className="p-4 bg-[#F8F9FC] rounded-xl border border-[#E5E8F0] space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Bank Name:</span>
                <span className="font-bold text-[#111827]">{vendor.payoutMethod.bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Routing Number:</span>
                <span className="text-[#111827]">{vendor.payoutMethod.routingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Account Number:</span>
                <span className="text-[#111827]">{vendor.payoutMethod.accountNumber}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'kyc' && (
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 max-w-2xl text-xs">
          <h3 className="text-sm font-bold text-[#111827]">Merchant Identity Verification Documents</h3>

          <div className="space-y-3">
            {[
              { doc: 'Certificate of Corporate Incorporation', status: 'verified', date: 'Aug 01, 2026' },
              { doc: 'IRS Form W-9 / EIN Validation', status: 'verified', date: 'Aug 01, 2026' },
              { doc: 'Government ID of Authorized Signatory', status: 'verified', date: 'Aug 02, 2026' },
            ].map((d, idx) => (
              <div key={idx} className="p-3.5 rounded-lg border border-[#E5E8F0] bg-[#F8F9FC] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#5B6FF5]" />
                  <span className="font-semibold text-[#111827]">{d.doc}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {d.status}
                  </span>
                  <span className="text-[#9CA3AF] text-[11px] font-mono">{d.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'payouts' && (
        <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden text-xs">
          <div className="p-4 border-b border-[#E5E8F0]">
            <h3 className="text-sm font-bold text-[#111827]">Past Disbursed Settlements</h3>
          </div>
          <div className="p-4 text-[#6B7280]">
            No previous payouts recorded in the current billing cycle.
          </div>
        </div>
      )}
    </div>
  );
};
