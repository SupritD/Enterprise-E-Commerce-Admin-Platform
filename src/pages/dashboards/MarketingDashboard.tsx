import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Megaphone,
  Tag,
  ShoppingBag,
  Percent,
  Sparkles,
  Plus,
  ArrowRight,
  TrendingUp,
  Mail,
  MessageSquare,
  Smartphone,
} from 'lucide-react';

export const MarketingDashboard: React.FC = () => {
  const { showToast } = useApp();
  const { campaigns, coupons } = useData();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Marketing & Growth Intelligence</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Omni-channel marketing campaigns, coupon conversions, abandoned cart recovery, and customer loyalty telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/marketing/coupons/new"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <Tag className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>New Coupon</span>
          </Link>
          <Link
            to="/marketing/campaigns/new"
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Campaign</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Attributed Revenue"
          value="$1.24M"
          change={22.4}
          icon={<Megaphone className="w-4 h-4 text-[#5B6FF5]" />}
          onClick={() => navigate('/marketing/campaigns')}
        />
        <StatCard
          title="ROAS (Blended)"
          value="4.82x"
          change={8.0}
          icon={<TrendingUp className="w-4 h-4 text-emerald-500" />}
          onClick={() => navigate('/marketing/campaigns')}
        />
        <StatCard
          title="Coupons Redeemed"
          value="4,820"
          change={12.5}
          icon={<Tag className="w-4 h-4 text-amber-500" />}
          onClick={() => navigate('/marketing/coupons')}
        />
        <StatCard
          title="Carts Abandoned"
          value="3,210"
          change={-3.1}
          icon={<ShoppingBag className="w-4 h-4 text-[#8B9AFE]" />}
          onClick={() => navigate('/marketing/abandoned-cart')}
        />
        <StatCard
          title="Cart Recovery Rate"
          value="18.6%"
          change={2.4}
          icon={<Sparkles className="w-4 h-4 text-emerald-500" />}
          onClick={() => navigate('/marketing/abandoned-cart')}
        />
        <StatCard
          title="Loyalty Points Used"
          value="142k"
          change={15.0}
          icon={<Percent className="w-4 h-4 text-indigo-500" />}
          onClick={() => navigate('/marketing/loyalty')}
        />
      </div>

      {/* Channel Attribution & Abandoned Cart Recovery Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Campaigns Table (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111827]">Active Marketing Campaigns</h3>
            <Link to="/marketing/campaigns" className="text-xs font-semibold text-[#5B6FF5] hover:underline">
              View All Campaigns &rarr;
            </Link>
          </div>

          <div className="divide-y divide-[#E5E8F0]">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                onClick={() => navigate(`/marketing/campaigns/${camp.id}`)}
                className="p-4 hover:bg-[#F8F9FC] cursor-pointer transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-[#111827] flex items-center gap-2">
                    <span>{camp.name}</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 uppercase">
                      {camp.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6B7280] mt-1 flex items-center gap-3">
                    <span>Spend: ${camp.spend.toLocaleString()}</span>
                    <span>&bull;</span>
                    <span>Channel: {camp.channel}</span>
                    <span>&bull;</span>
                    <span>ROAS: {(camp.revenue / camp.spend).toFixed(1)}x</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-emerald-600 text-sm">
                    ${camp.revenue.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    {camp.orders} orders
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Breakdown */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#111827] pb-3 border-b border-[#E5E8F0]">
              Channel Conversion Share
            </h3>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#5B6FF5]" />
                  <span className="font-semibold text-[#111827]">Email Klaviyo Flows</span>
                </div>
                <span className="font-mono font-bold">$640k (51%)</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold text-[#111827]">SMS Broadcasts</span>
                </div>
                <span className="font-mono font-bold">$380k (30%)</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-purple-500" />
                  <span className="font-semibold text-[#111827]">Push Notifications</span>
                </div>
                <span className="font-mono font-bold">$220k (19%)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E5E8F0]">
            <Link
              to="/marketing/abandoned-cart"
              className="text-xs font-semibold text-[#5B6FF5] hover:underline flex items-center justify-between"
            >
              <span>Automated Recovery Triggers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
