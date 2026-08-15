import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import {
  DollarSign,
  TrendingDown,
  Receipt,
  CreditCard,
  Building,
  Download,
  Calendar,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export const RevenueDashboard: React.FC = () => {
  const { currentStore, showToast } = useApp();
  const { orders } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'methods' | 'channels' | 'currencies' | 'taxes' | 'payouts'>('overview');

  const grossSales = 6110700;
  const discounts = 340200;
  const returnsRefunds = 84500;
  const taxesCollected = 412000;
  const gatewayFees = 142000;
  const netRevenue = grossSales - discounts - returnsRefunds;

  const handleExport = (format: string) => {
    showToast({
      type: 'success',
      title: 'Report Queued',
      message: `Exporting financial statement in ${format} format...`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Revenue & Financial Intelligence</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Gross-to-net accounting waterfall, merchant fees, tax liabilities, and gateway reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('CSV')}
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs"
          >
            Export CSV
          </button>
          <button
            onClick={() => handleExport('Excel')}
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs"
          >
            Export Excel
          </button>
          <button
            onClick={() => handleExport('PDF')}
            className="px-3 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Audit PDF</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E8F0] overflow-x-auto">
        {[
          { id: 'overview', label: 'Waterfall Overview' },
          { id: 'methods', label: 'Payment Gateways' },
          { id: 'channels', label: 'Channel Breakdown' },
          { id: 'currencies', label: 'Multi-Currency Settlement' },
          { id: 'taxes', label: 'Tax & Nexus' },
          { id: 'payouts', label: 'Vendor Payouts' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-[#5B6FF5] text-[#5B6FF5]'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Financial Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Gross Sales"
          value={`$${(grossSales / 1000000).toFixed(2)}M`}
          change={14.2}
          icon={<DollarSign className="w-4 h-4" />}
        />
        <StatCard
          title="Discounts Applied"
          value={`-$${(discounts / 1000).toFixed(0)}k`}
          change={-2.1}
          icon={<TrendingDown className="w-4 h-4 text-amber-500" />}
        />
        <StatCard
          title="Returns & Refunds"
          value={`-$${(returnsRefunds / 1000).toFixed(0)}k`}
          change={-5.8}
          icon={<TrendingDown className="w-4 h-4 text-rose-500" />}
        />
        <StatCard
          title="Net Revenue"
          value={`$${(netRevenue / 1000000).toFixed(2)}M`}
          change={16.5}
          icon={<DollarSign className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Tax Collected"
          value={`$${(taxesCollected / 1000).toFixed(0)}k`}
          change={8.4}
          icon={<Receipt className="w-4 h-4" />}
        />
        <StatCard
          title="Gateway Processing"
          value={`$${(gatewayFees / 1000).toFixed(0)}k`}
          change={1.2}
          icon={<CreditCard className="w-4 h-4 text-[#8B9AFE]" />}
        />
      </div>

      {/* Waterfall & Reconciliation Component */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E8F0]">
            <div>
              <h3 className="text-sm font-bold text-[#111827]">Financial Waterfall (Gross to Settlement)</h3>
              <p className="text-xs text-[#6B7280]">Audited line-item deductions and net realized cash flow</p>
            </div>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Balanced: 0 Discrepancy
            </span>
          </div>

          <div className="space-y-3">
            {[
              { label: '1. Gross Merchandising Value (GMV)', val: '$6,110,700.00', pct: '100.0%', color: 'bg-emerald-500', isPos: true },
              { label: '2. Promotional Codes & Bulk Discounts', val: '-$340,200.00', pct: '-5.56%', color: 'bg-amber-500', isPos: false },
              { label: '3. Approved RMAs & Customer Refunds', val: '-$84,500.00', pct: '-1.38%', color: 'bg-rose-500', isPos: false },
              { label: '4. Realized Net Revenue', val: '$5,686,000.00', pct: '93.05%', color: 'bg-[#5B6FF5]', isPos: true, isBold: true },
              { label: '5. Sales Tax & VAT Collected (Liability)', val: '+$412,000.00', pct: '+6.74%', color: 'bg-indigo-400', isPos: true },
              { label: '6. Gateway Interchange & Merchant Fees', val: '-$142,000.00', pct: '-2.32%', color: 'bg-slate-400', isPos: false },
              { label: '7. Net Merchant Bank Settlement', val: '$5,956,000.00', pct: '97.47%', color: 'bg-emerald-600', isPos: true, isBold: true },
            ].map((step, idx) => (
              <div key={idx} className={`p-3 rounded-lg flex items-center justify-between text-xs ${step.isBold ? 'bg-[#F8F9FC] border border-[#E5E8F0] font-bold text-[#111827]' : 'text-[#4B5563]'}`}>
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${step.color}`} />
                  <span>{step.label}</span>
                </div>
                <div className="flex items-center gap-4 font-mono">
                  <span className={step.isPos ? 'text-emerald-700' : 'text-rose-600'}>{step.val}</span>
                  <span className="text-[#9CA3AF] text-[11px] w-12 text-right">{step.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gateway Distribution */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E8F0]">
              <h3 className="text-sm font-bold text-[#111827]">Volume by Gateway</h3>
              <Link to="/payments/gateways" className="text-xs font-semibold text-[#5B6FF5] hover:underline">
                Gateways &rarr;
              </Link>
            </div>

            <div className="mt-4 space-y-4">
              {[
                { name: 'Stripe Payments (Cards/Apple Pay)', vol: '$3,820,000', fee: '2.9% + 30¢', share: '62.5%' },
                { name: 'PayPal Commerce & Credit', vol: '$1,410,000', fee: '3.49% + 49¢', share: '23.1%' },
                { name: 'Razorpay UPI & NetBanking', vol: '$540,000', fee: '2.00%', share: '8.8%' },
                { name: 'Adyen Global Merchant', vol: '$340,700', fee: 'IC++ (1.1%)', share: '5.6%' },
              ].map((gw, i) => (
                <div key={i} className="p-3 rounded-lg border border-[#E5E8F0] bg-[#F8F9FC] text-xs">
                  <div className="flex justify-between font-semibold text-[#111827]">
                    <span>{gw.name}</span>
                    <span className="text-[#5B6FF5]">{gw.share}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#6B7280] mt-1 font-mono">
                    <span>Vol: {gw.vol}</span>
                    <span>Fee: {gw.fee}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E5E8F0]">
            <Link
              to="/tax/reports"
              className="text-xs font-semibold text-[#5B6FF5] hover:underline flex items-center justify-between"
            >
              <span>View Tax & Economic Nexus Liability</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
