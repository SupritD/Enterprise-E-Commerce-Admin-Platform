import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import {
  DollarSign,
  Building2,
  CheckCircle2,
  Clock,
  Search,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Send,
  Download,
} from 'lucide-react';

interface AffiliatePayoutRecord {
  id: string;
  affiliateName: string;
  affiliateEmail: string;
  payoutMethod: 'PayPal' | 'Stripe Direct' | 'Wire Transfer (ACH)';
  accountDetails: string;
  pendingBalance: number;
  period: string;
  status: 'ready' | 'processing' | 'paid';
}

export const AffiliatePayoutsPage: React.FC = () => {
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const [payouts, setPayouts] = useState<AffiliatePayoutRecord[]>([
    {
      id: 'pay-1',
      affiliateName: 'TechDaily Reviews (Marcus Brody)',
      affiliateEmail: 'marcus@techdaily.io',
      payoutMethod: 'Stripe Direct',
      accountDetails: 'acct_1NZ48102948102',
      pendingBalance: 2480.5,
      period: 'Jul 01 - Jul 31, 2026',
      status: 'ready',
    },
    {
      id: 'pay-2',
      affiliateName: 'ErgoDesk Studio (Lin Chen)',
      affiliateEmail: 'lin@ergodesk.design',
      payoutMethod: 'PayPal',
      accountDetails: 'lin.chen.payouts@paypal.me',
      pendingBalance: 1140.0,
      period: 'Jul 01 - Jul 31, 2026',
      status: 'ready',
    },
    {
      id: 'pay-3',
      affiliateName: 'Audiophile Guild (David Miller)',
      affiliateEmail: 'david@audioguild.com',
      payoutMethod: 'Wire Transfer (ACH)',
      accountDetails: 'Chase Bank (Routing ****4821)',
      pendingBalance: 890.25,
      period: 'Jul 01 - Jul 31, 2026',
      status: 'paid',
    },
  ]);

  const handlePaySingle = (id: string) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'paid' } : p))
    );
    showToast({
      type: 'success',
      title: 'Affiliate Payout Dispatched',
      message: 'Settled via automated direct payout gateway.',
    });
  };

  const handleBatchPayout = () => {
    setPayouts((prev) => prev.map((p) => ({ ...p, status: 'paid' })));
    showToast({
      type: 'success',
      title: 'Batch Payout Completed',
      message: 'Executed ACH & Stripe disbursements for all pending affiliates.',
    });
  };

  const filtered = payouts.filter(
    (p) =>
      p.affiliateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.affiliateEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPending = payouts
    .filter((p) => p.status === 'ready')
    .reduce((s, p) => s + p.pendingBalance, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Affiliate Partner Payouts</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Disburse verified commission earnings via PayPal Payouts API, Stripe Connect, and automated ACH batch files.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleBatchPayout}
            disabled={totalPending === 0}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] disabled:bg-[#E5E8F0] disabled:text-[#9CA3AF] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Disburse All Pending Payouts (${totalPending.toFixed(2)})</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Pending Settlement"
          value={`$${totalPending.toFixed(2)}`}
          change={-8.0}
          icon={<DollarSign className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Affiliates Due"
          value={payouts.filter((p) => p.status === 'ready').length}
          change={-2}
          icon={<Clock className="w-4 h-4 text-amber-500" />}
        />
        <StatCard
          title="YTD Affiliate Disbursed"
          value="$48,910.00"
          change={32.0}
          icon={<Building2 className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Fraud Hold-Back Rate"
          value="0.0% (Clean)"
          change={0}
          icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
        />
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search payout records by affiliate name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>
      </div>

      {/* Payouts Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">Affiliate Partner</th>
              <th className="p-4">Payout Method</th>
              <th className="p-4">Accounting Period</th>
              <th className="p-4">Earned Net Payout</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Execute Settlement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-[#F8F9FC] transition-colors">
                <td className="p-4">
                  <div className="font-bold text-[#111827]">{p.affiliateName}</div>
                  <div className="text-[11px] text-[#6B7280]">{p.affiliateEmail}</div>
                </td>
                <td className="p-4">
                  <div className="font-semibold text-[#111827]">{p.payoutMethod}</div>
                  <div className="text-[10px] text-[#6B7280] font-mono">{p.accountDetails}</div>
                </td>
                <td className="p-4 text-[#6B7280]">{p.period}</td>
                <td className="p-4 font-bold text-sm text-emerald-600 font-mono">
                  ${p.pendingBalance.toFixed(2)}
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      p.status === 'paid'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {p.status === 'ready' ? (
                    <button
                      onClick={() => handlePaySingle(p.id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs ml-auto"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Release Payment</span>
                    </button>
                  ) : (
                    <span className="text-emerald-600 font-semibold flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Settled</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
