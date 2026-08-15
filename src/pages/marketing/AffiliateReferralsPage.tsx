import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import {
  Share2,
  TrendingUp,
  MousePointer,
  DollarSign,
  Search,
  Globe,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Users,
  Smartphone,
  Laptop,
} from 'lucide-react';

interface ReferralHit {
  id: string;
  affiliateName: string;
  affiliateCode: string;
  visitorIp: string;
  device: 'desktop' | 'mobile';
  landingPage: string;
  referrerSource: string;
  conversionStatus: 'converted' | 'browsing' | 'bounced';
  attributedOrder?: string;
  attributedRevenue?: number;
  timestamp: string;
}

export const AffiliateReferralsPage: React.FC = () => {
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const [hits, setHits] = useState<ReferralHit[]>([
    {
      id: 'ref-1',
      affiliateName: 'TechDaily Reviews (Marcus Brody)',
      affiliateCode: 'TECHDAILY15',
      visitorIp: '172.56.21.98',
      device: 'desktop',
      landingPage: '/storefront/products/mechanical-keyboard',
      referrerSource: 'youtube.com/watch?v=tech2026',
      conversionStatus: 'converted',
      attributedOrder: '#ORD-9821',
      attributedRevenue: 189.99,
      timestamp: '14 mins ago',
    },
    {
      id: 'ref-2',
      affiliateName: 'ErgoDesk Studio (Lin Chen)',
      affiliateCode: 'ERGOLIN10',
      visitorIp: '98.210.44.12',
      device: 'mobile',
      landingPage: '/storefront/collections/office-chairs',
      referrerSource: 'instagram.com/p/ergo_lifestyle',
      conversionStatus: 'converted',
      attributedOrder: '#ORD-9819',
      attributedRevenue: 499.0,
      timestamp: '42 mins ago',
    },
    {
      id: 'ref-3',
      affiliateName: 'Audiophile Guild (David Miller)',
      affiliateCode: 'AUDIOPRO20',
      visitorIp: '204.14.88.19',
      device: 'desktop',
      landingPage: '/storefront/products/acoustic-headphones',
      referrerSource: 'reddit.com/r/audiophile',
      conversionStatus: 'browsing',
      timestamp: '1 hour ago',
    },
    {
      id: 'ref-4',
      affiliateName: 'TechDaily Reviews (Marcus Brody)',
      affiliateCode: 'TECHDAILY15',
      visitorIp: '64.233.160.1',
      device: 'mobile',
      landingPage: '/storefront',
      referrerSource: 'twitter.com/techdaily',
      conversionStatus: 'bounced',
      timestamp: '2 hours ago',
    },
  ]);

  const filtered = hits.filter(
    (h) =>
      h.affiliateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.affiliateCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.referrerSource.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Affiliate Referral Tracking</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Real-time clickstream attribution logs, 30-day cookie window tracking, and affiliate-driven order conversions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Tracking Pixel Active (99.98% SLA)</span>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Referral Clicks (24h)"
          value="12,490 Clicks"
          change={18.5}
          icon={<MousePointer className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Conversion Rate"
          value="3.82%"
          change={0.4}
          icon={<TrendingUp className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Affiliate Attributed Sales"
          value="$148,200.00"
          change={26.0}
          icon={<DollarSign className="w-4 h-4 text-indigo-500" />}
        />
        <StatCard
          title="Active Tracking Links"
          value="84 Links"
          change={4}
          icon={<Share2 className="w-4 h-4 text-amber-500" />}
        />
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search referral by affiliate, UTM source, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>
      </div>

      {/* Referral Logs Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">Affiliate & Tracking Code</th>
              <th className="p-4">Referrer Domain / Source</th>
              <th className="p-4">Landing Destination</th>
              <th className="p-4">Device & IP</th>
              <th className="p-4">Conversion Status</th>
              <th className="p-4 text-right">Attributed Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {filtered.map((hit) => (
              <tr key={hit.id} className="hover:bg-[#F8F9FC] transition-colors">
                <td className="p-4">
                  <div className="font-bold text-[#111827]">{hit.affiliateName}</div>
                  <div className="font-mono text-[11px] text-[#5B6FF5] mt-0.5">{hit.affiliateCode}</div>
                </td>
                <td className="p-4 font-mono text-[#111827]">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    <span>{hit.referrerSource}</span>
                  </div>
                </td>
                <td className="p-4 font-mono text-[11px] text-[#6B7280]">
                  {hit.landingPage}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-[#111827]">
                    {hit.device === 'desktop' ? (
                      <Laptop className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    ) : (
                      <Smartphone className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    )}
                    <span className="capitalize">{hit.device}</span>
                  </div>
                  <div className="text-[10px] text-[#9CA3AF] font-mono">{hit.visitorIp}</div>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      hit.conversionStatus === 'converted'
                        ? 'bg-emerald-50 text-emerald-700'
                        : hit.conversionStatus === 'browsing'
                        ? 'bg-indigo-50 text-[#5B6FF5]'
                        : 'bg-[#F1F3F9] text-[#6B7280]'
                    }`}
                  >
                    {hit.conversionStatus}
                  </span>
                  <div className="text-[10px] text-[#9CA3AF] mt-0.5">{hit.timestamp}</div>
                </td>
                <td className="p-4 text-right">
                  {hit.attributedRevenue ? (
                    <div>
                      <div className="font-bold text-sm text-emerald-600 font-mono">
                        +${hit.attributedRevenue.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-[#6B7280] font-mono">{hit.attributedOrder}</div>
                    </div>
                  ) : (
                    <span className="text-[#9CA3AF] font-mono">&mdash;</span>
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
