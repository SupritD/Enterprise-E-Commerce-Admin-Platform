import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Users,
  Eye,
  ShoppingCart,
  CreditCard,
  CheckCircle2,
  Calendar,
  Download,
  Filter,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

export const AnalyticsReportsPage: React.FC = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'sales' | 'funnel' | 'realtime' | 'cohorts'>('funnel');
  const [dateRange, setDateRange] = useState('30d');

  // Funnel Data
  const funnelSteps = [
    { step: '1. Storefront Sessions', count: 184500, dropoff: 0, pctOfTotal: 100 },
    { step: '2. Product Detail Views', count: 98200, dropoff: 46.8, pctOfTotal: 53.2 },
    { step: '3. Added to Cart', count: 24600, dropoff: 74.9, pctOfTotal: 13.3 },
    { step: '4. Initiated Checkout', count: 12800, dropoff: 47.9, pctOfTotal: 6.9 },
    { step: '5. Completed Transactions', count: 8420, dropoff: 34.2, pctOfTotal: 4.56 },
  ];

  // Cohort Matrix Data
  const cohorts = [
    { cohort: 'Mar 2026', size: 1420, m0: '100%', m1: '34.2%', m2: '28.4%', m3: '24.1%', m4: '22.0%', m5: '21.5%' },
    { cohort: 'Apr 2026', size: 1650, m0: '100%', m1: '36.8%', m2: '30.1%', m3: '26.4%', m4: '24.8%', m5: '-' },
    { cohort: 'May 2026', size: 1890, m0: '100%', m1: '38.5%', m2: '31.9%', m3: '28.0%', m4: '-', m5: '-' },
    { cohort: 'Jun 2026', size: 2100, m0: '100%', m1: '40.2%', m2: '33.4%', m3: '-', m4: '-', m5: '-' },
    { cohort: 'Jul 2026', size: 2450, m0: '100%', m1: '42.1%', m2: '-', m3: '-', m4: '-', m5: '-' },
    { cohort: 'Aug 2026', size: 2820, m0: '100%', m1: '-', m2: '-', m3: '-', m4: '-', m5: '-' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Enterprise Analytics & Intelligence</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Full-funnel conversion analysis, cohort retention matrices, customer lifetime value, and real-time storefront stream.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 bg-white border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs outline-hidden"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="ytd">Year to Date (2026)</option>
          </select>

          <button
            onClick={() => showToast({ type: 'success', title: 'Exporting Analytics Report', message: 'Downloading compiled CSV & PDF...' })}
            className="px-3.5 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E8F0] overflow-x-auto">
        {[
          { id: 'funnel', label: 'E-Commerce Conversion Funnel' },
          { id: 'realtime', label: 'Real-Time Storefront Stream (142 Active)' },
          { id: 'cohorts', label: 'Cohort Retention Matrix (LTV)' },
          { id: 'sales', label: 'Gross Margin & P&L Breakdown' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-[#5B6FF5] text-[#5B6FF5]'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Funnel Tab */}
      {activeTab === 'funnel' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#111827]">Multi-Stage Conversion Drop-Off Funnel</h3>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Overall Conversion Rate: 4.56% (+0.8% YoY)
                </span>
              </div>
              <p className="text-xs text-[#6B7280] mt-1">
                Visualizing buyer progression from landing session down to confirmed settlement.
              </p>
            </div>

            {/* Funnel Visual Bars */}
            <div className="space-y-4">
              {funnelSteps.map((s, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#111827]">{s.step}</span>
                    <div className="flex items-center gap-3 font-mono">
                      {s.dropoff > 0 && (
                        <span className="text-rose-500 text-[11px] font-semibold flex items-center">
                          <ArrowDownRight className="w-3 h-3" /> -{s.dropoff}% drop-off
                        </span>
                      )}
                      <span className="font-bold text-[#111827]">{s.count.toLocaleString()} visitors</span>
                      <span className="text-[#6B7280] font-semibold w-12 text-right">{s.pctOfTotal}%</span>
                    </div>
                  </div>

                  {/* Funnel Bar */}
                  <div className="h-7 bg-[#F8F9FC] rounded-lg overflow-hidden border border-[#E5E8F0] p-1 flex items-center">
                    <div
                      style={{ width: `${s.pctOfTotal}%` }}
                      className="h-full bg-gradient-to-r from-[#5B6FF5] to-[#7B8DF7] rounded-md transition-all duration-500 flex items-center justify-end pr-2 text-[10px] font-bold text-white shadow-xs"
                    >
                      {s.pctOfTotal > 15 ? `${s.pctOfTotal}%` : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Realtime Tab */}
      {activeTab === 'realtime' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-base font-bold text-[#111827]">Live Active Shoppers Right Now (142)</h3>
              </div>
              <span className="text-xs font-mono text-[#6B7280]">Updating every 2s</span>
            </div>

            <div className="divide-y divide-[#E5E8F0] text-xs">
              {[
                { user: 'Guest #4819', location: 'New York, US', page: '/products/headphones-pro', action: 'Adding to cart', device: 'iOS Safari' },
                { user: 'B2B Client #102', location: 'London, UK', page: '/checkout/b2b-po', action: 'Entering PO billing', device: 'Chrome Mac' },
                { user: 'Guest #9102', location: 'Frankfurt, DE', page: '/collections/summer-tech', action: 'Browsing catalog', device: 'Firefox Windows' },
                { user: 'VIP Marcus B.', location: 'Tokyo, JP', page: '/orders/ORD-2026-940', action: 'Tracking shipment', device: 'Android Pixel' },
              ].map((act, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#111827]">{act.user} &bull; <span className="font-normal text-[#6B7280]">{act.location}</span></div>
                    <div className="text-[11px] font-mono text-[#5B6FF5]">{act.page}</div>
                  </div>
                  <div className="text-right space-y-0.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                      {act.action}
                    </span>
                    <div className="text-[10px] text-[#9CA3AF]">{act.device}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">Live Geo Distribution</h3>
            <div className="space-y-2.5 text-xs">
              {[
                { country: 'United States', pct: '52%', count: 74 },
                { country: 'United Kingdom', pct: '18%', count: 26 },
                { country: 'Germany', pct: '14%', count: 20 },
                { country: 'Japan & APAC', pct: '16%', count: 22 },
              ].map((c, i) => (
                <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-[#F8F9FC]">
                  <span className="font-semibold text-[#111827]">{c.country}</span>
                  <span className="font-mono font-bold text-[#5B6FF5]">{c.count} users ({c.pct})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cohorts Tab */}
      {activeTab === 'cohorts' && (
        <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
          <div className="p-6 border-b border-[#E5E8F0]">
            <h3 className="text-base font-bold text-[#111827]">Monthly Customer Repeat Purchase Cohorts</h3>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Tracking retention decay curve and secondary transaction rates across signup batches.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase">
                  <th className="p-3.5">Cohort Group</th>
                  <th className="p-3.5">Acquired Users</th>
                  <th className="p-3.5 text-center">Month 0</th>
                  <th className="p-3.5 text-center">Month 1</th>
                  <th className="p-3.5 text-center">Month 2</th>
                  <th className="p-3.5 text-center">Month 3</th>
                  <th className="p-3.5 text-center">Month 4</th>
                  <th className="p-3.5 text-center">Month 5</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E8F0]">
                {cohorts.map((c, i) => (
                  <tr key={i} className="hover:bg-[#F8F9FC]">
                    <td className="p-3.5 font-bold text-[#111827]">{c.cohort}</td>
                    <td className="p-3.5 font-mono text-[#6B7280]">{c.size.toLocaleString()} users</td>
                    <td className="p-3.5 text-center font-mono font-bold bg-[#5B6FF5]/20 text-[#5B6FF5]">{c.m0}</td>
                    <td className="p-3.5 text-center font-mono font-semibold bg-[#5B6FF5]/15 text-[#111827]">{c.m1}</td>
                    <td className="p-3.5 text-center font-mono font-semibold bg-[#5B6FF5]/10 text-[#111827]">{c.m2}</td>
                    <td className="p-3.5 text-center font-mono font-semibold bg-[#5B6FF5]/5 text-[#111827]">{c.m3}</td>
                    <td className="p-3.5 text-center font-mono text-[#111827]">{c.m4}</td>
                    <td className="p-3.5 text-center font-mono text-[#111827]">{c.m5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sales Gross Margin Tab */}
      {activeTab === 'sales' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">Financial P&L Statement (YTD 2026)</h3>
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between font-bold text-[#111827]">
                <span>Gross Merchandise Value (GMV):</span>
                <span>$2,840,290.00</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Returns & Allowances:</span>
                <span>-$42,100.00 (1.48%)</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Cost of Goods Sold (COGS):</span>
                <span>-$1,240,000.00</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Fulfillment & Carrier Shipping:</span>
                <span>-$185,400.00</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Payment Processing Gateway Fees:</span>
                <span>-$62,480.00 (2.2%)</span>
              </div>
              <div className="pt-3 border-t border-[#E5E8F0] flex justify-between text-base font-bold text-emerald-600">
                <span>Net Operating Profit:</span>
                <span>$1,310,310.00 (46.1%)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
