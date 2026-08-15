import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import {
  Link as LinkIcon,
  Copy,
  Plus,
  QrCode,
  ExternalLink,
  Search,
  CheckCircle2,
  MousePointer,
  Sparkles,
  Percent,
} from 'lucide-react';

interface AffiliateLinkRecord {
  id: string;
  affiliateName: string;
  affiliateCode: string;
  targetUrl: string;
  shortUrl: string;
  clicks: number;
  conversions: number;
  conversionRate: number;
  commissionCut: number; // %
  createdAt: string;
}

export const AffiliateLinksPage: React.FC = () => {
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const [links, setLinks] = useState<AffiliateLinkRecord[]>([
    {
      id: 'lnk-1',
      affiliateName: 'TechDaily Reviews (Marcus Brody)',
      affiliateCode: 'TECHDAILY15',
      targetUrl: 'https://store.omnichannel.io/products/mechanical-keyboard?ref=TECHDAILY15',
      shortUrl: 'https://omni.link/techdaily',
      clicks: 4820,
      conversions: 184,
      conversionRate: 3.81,
      commissionCut: 12.0,
      createdAt: 'Jul 15, 2026',
    },
    {
      id: 'lnk-2',
      affiliateName: 'ErgoDesk Studio (Lin Chen)',
      affiliateCode: 'ERGOLIN10',
      targetUrl: 'https://store.omnichannel.io/collections/office-chairs?ref=ERGOLIN10',
      shortUrl: 'https://omni.link/ergolin',
      clicks: 2190,
      conversions: 92,
      conversionRate: 4.2,
      commissionCut: 10.0,
      createdAt: 'Jul 20, 2026',
    },
    {
      id: 'lnk-3',
      affiliateName: 'Audiophile Guild (David Miller)',
      affiliateCode: 'AUDIOPRO20',
      targetUrl: 'https://store.omnichannel.io/products/acoustic-headphones?ref=AUDIOPRO20',
      shortUrl: 'https://omni.link/audiopro',
      clicks: 3410,
      conversions: 110,
      conversionRate: 3.22,
      commissionCut: 15.0,
      createdAt: 'Aug 01, 2026',
    },
  ]);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast({
      type: 'success',
      title: 'Link Copied to Clipboard',
      message: url,
    });
  };

  const filtered = links.filter(
    (l) =>
      l.affiliateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.affiliateCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.shortUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Affiliate Deep Links & Tracking URLs</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Generate custom vanity affiliate short links, QR codes, campaign UTM parameters, and track real-time click metrics.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'New Tracking Link', message: 'Opening affiliate link builder modal...' })}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate Tracking Link</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Short URLs"
          value={links.length}
          change={12.0}
          icon={<LinkIcon className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Total Lifetime Clicks"
          value="10,420 Clicks"
          change={21.4}
          icon={<MousePointer className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Avg Link Conversion"
          value="3.74%"
          change={0.8}
          icon={<Percent className="w-4 h-4 text-indigo-500" />}
        />
        <StatCard
          title="QR Scans (Retail Displays)"
          value="1,490 Scans"
          change={15.0}
          icon={<QrCode className="w-4 h-4 text-amber-500" />}
        />
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tracking links by affiliate or URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>
      </div>

      {/* Links List */}
      <div className="space-y-4">
        {filtered.map((link) => (
          <div
            key={link.id}
            className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-4 hover:border-[#CBD5E1] transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#111827]">{link.affiliateName}</span>
                  <span className="text-[#9CA3AF]">&bull;</span>
                  <span className="font-mono text-xs text-[#5B6FF5] bg-indigo-50 px-2 py-0.5 rounded-sm font-bold">
                    {link.affiliateCode}
                  </span>
                </div>
                <div className="text-xs text-[#6B7280] mt-0.5">Created on {link.createdAt}</div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {link.commissionCut}% Commission
                </span>
              </div>
            </div>

            {/* URL Display Box */}
            <div className="bg-[#F8F9FC] border border-[#E5E8F0] rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#111827] truncate w-full">
                <LinkIcon className="w-4 h-4 text-[#5B6FF5] shrink-0" />
                <span className="font-bold text-[#5B6FF5]">{link.shortUrl}</span>
                <span className="text-[#9CA3AF] hidden md:inline">&rarr;</span>
                <span className="text-[#6B7280] truncate hidden md:inline text-[11px]">{link.targetUrl}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => copyToClipboard(link.shortUrl)}
                  className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] text-[#111827] rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                >
                  <Copy className="w-3.5 h-3.5 text-[#6B7280]" />
                  <span>Copy Short URL</span>
                </button>
                <button
                  onClick={() => showToast({ type: 'info', title: 'QR Code Ready', message: 'Generated vector QR code image for print media.' })}
                  className="p-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] text-[#111827] rounded-lg shadow-2xs"
                  title="Generate QR Code"
                >
                  <QrCode className="w-4 h-4 text-[#6B7280]" />
                </button>
              </div>
            </div>

            {/* Performance Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#E5E8F0] text-center text-xs">
              <div>
                <div className="text-[10px] uppercase font-bold text-[#6B7280]">Total Clicks</div>
                <div className="font-bold text-sm text-[#111827] mt-0.5">{link.clicks.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#6B7280]">Orders Generated</div>
                <div className="font-bold text-sm text-emerald-600 mt-0.5">{link.conversions} orders</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#6B7280]">Conversion Rate</div>
                <div className="font-bold text-sm text-[#5B6FF5] mt-0.5">{link.conversionRate}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
