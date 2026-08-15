import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import {
  Megaphone,
  Mail,
  Send,
  Plus,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Eye,
} from 'lucide-react';

interface CampaignItem {
  id: string;
  name: string;
  channel: 'Email Newsletter' | 'SMS Blast' | 'Push Notification' | 'Retargeting Ad';
  audienceSegment: string;
  reachCount: number;
  openRate: number; // %
  clickRate: number; // %
  attributedRevenue: number;
  status: 'active' | 'scheduled' | 'draft' | 'completed';
  sendDate: string;
}

export const CampaignsPage: React.FC = () => {
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const [campaigns, setCampaigns] = useState<CampaignItem[]>([
    {
      id: 'cmp-1',
      name: 'Summer Product Lineup Announcement',
      channel: 'Email Newsletter',
      audienceSegment: 'All Subscribed Customers (14.2k)',
      reachCount: 14200,
      openRate: 42.8,
      clickRate: 9.4,
      attributedRevenue: 38400.0,
      status: 'completed',
      sendDate: 'Aug 10, 2026',
    },
    {
      id: 'cmp-2',
      name: 'Abandoned Cart VIP Rescue (15% Off Code)',
      channel: 'SMS Blast',
      audienceSegment: 'Cart Drop-offs ($200+ carts)',
      reachCount: 840,
      openRate: 98.1,
      clickRate: 24.5,
      attributedRevenue: 19850.0,
      status: 'active',
      sendDate: 'Automated Real-time',
    },
    {
      id: 'cmp-3',
      name: 'Back to School Workspace Refresh',
      channel: 'Email Newsletter',
      audienceSegment: 'Tech & Ergonomics Enthusiasts',
      reachCount: 8900,
      openRate: 38.5,
      clickRate: 7.8,
      attributedRevenue: 24900.0,
      status: 'active',
      sendDate: 'Aug 14, 2026',
    },
    {
      id: 'cmp-4',
      name: 'Labor Day Early Access Flash Preview',
      channel: 'Push Notification',
      audienceSegment: 'Mobile App Active Users',
      reachCount: 6200,
      openRate: 0,
      clickRate: 0,
      attributedRevenue: 0,
      status: 'scheduled',
      sendDate: 'Sep 01, 2026 @ 09:00 AM',
    },
  ]);

  const filtered = campaigns.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.audienceSegment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Marketing Campaigns & Omnichannel Blasts</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Orchestrate multi-channel marketing campaigns across Email, SMS broadcasts, web push alerts, and retargeting flows.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'New Campaign', message: 'Opening campaign builder modal...' })}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Campaigns Sent (Mtd)"
          value={campaigns.length}
          change={2}
          icon={<Megaphone className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Total Audience Reach"
          value="30,140 Contacts"
          change={18.0}
          icon={<Users className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Avg Open Rate"
          value="46.8%"
          change={4.2}
          icon={<Eye className="w-4 h-4 text-indigo-500" />}
        />
        <StatCard
          title="Direct Attributed Revenue"
          value="$83,150.00"
          change={29.0}
          icon={<DollarSign className="w-4 h-4 text-amber-500" />}
        />
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search campaigns by name, channel, or audience..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">Campaign Name & Channel</th>
              <th className="p-4">Audience Segment</th>
              <th className="p-4">Engagement (Open / Click)</th>
              <th className="p-4">Attributed Sales</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Schedule / Sent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-[#F8F9FC] transition-colors">
                <td className="p-4">
                  <div className="font-bold text-sm text-[#111827]">{c.name}</div>
                  <div className="text-[11px] text-[#5B6FF5] font-semibold mt-0.5">{c.channel}</div>
                </td>
                <td className="p-4 text-[#4B5563]">
                  <div>{c.audienceSegment}</div>
                  <div className="text-[10px] text-[#9CA3AF] mt-0.5 font-mono">
                    {c.reachCount.toLocaleString()} recipients
                  </div>
                </td>
                <td className="p-4">
                  {c.openRate > 0 ? (
                    <div>
                      <div className="font-bold text-[#111827]">{c.openRate}% Open</div>
                      <div className="text-[11px] text-emerald-600 font-semibold">{c.clickRate}% Click</div>
                    </div>
                  ) : (
                    <span className="text-[#9CA3AF]">Awaiting Send</span>
                  )}
                </td>
                <td className="p-4">
                  {c.attributedRevenue > 0 ? (
                    <div className="font-bold text-sm text-emerald-600 font-mono">
                      ${c.attributedRevenue.toLocaleString()}
                    </div>
                  ) : (
                    <span className="text-[#9CA3AF]">&mdash;</span>
                  )}
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      c.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : c.status === 'completed'
                        ? 'bg-indigo-50 text-[#5B6FF5]'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-right font-medium text-[#6B7280]">
                  {c.sendDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
