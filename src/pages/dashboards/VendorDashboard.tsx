import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Store,
  DollarSign,
  Percent,
  Clock,
  UserCheck,
  Building2,
  Plus,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const VendorDashboard: React.FC = () => {
  const { showToast } = useApp();
  const { vendors } = useData();
  const navigate = useNavigate();

  const totalGMV = vendors.reduce((sum, v) => sum + v.totalSales, 0);
  const totalCommission = vendors.reduce((sum, v) => sum + (v.totalSales * v.commissionRate) / 100, 0);
  const pendingPayouts = vendors.reduce((sum, v) => sum + v.pendingPayout, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Marketplace & Vendor Command</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Multi-vendor seller onboarding, commission split reconciliation, rating governance, and automated batch payouts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/vendors/approval"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Applications (2)</span>
          </Link>
          <Link
            to="/vendors/payouts"
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Process Batch Payouts</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Active Sellers"
          value={vendors.length}
          change={12.0}
          icon={<Store className="w-4 h-4 text-[#5B6FF5]" />}
          onClick={() => navigate('/vendors')}
        />
        <StatCard
          title="Marketplace GMV"
          value={`$${(totalGMV / 1000000).toFixed(2)}M`}
          change={18.5}
          icon={<DollarSign className="w-4 h-4 text-emerald-500" />}
          onClick={() => navigate('/vendors')}
        />
        <StatCard
          title="Commission Cut"
          value={`$${(totalCommission / 1000).toFixed(0)}k`}
          change={14.2}
          icon={<Percent className="w-4 h-4 text-amber-500" />}
          onClick={() => navigate('/vendors/commissions')}
        />
        <StatCard
          title="Pending Payouts"
          value={`$${(pendingPayouts / 1000).toFixed(0)}k`}
          change={-5.0}
          icon={<Clock className="w-4 h-4 text-indigo-500" />}
          onClick={() => navigate('/vendors/payouts')}
        />
        <StatCard
          title="Avg Seller Rating"
          value="4.88 / 5.0"
          change={0.1}
          icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
          onClick={() => navigate('/vendors')}
        />
        <StatCard
          title="Product Catalog"
          value="240 Items"
          change={25.0}
          icon={<Building2 className="w-4 h-4 text-[#8B9AFE]" />}
          onClick={() => navigate('/vendors/products')}
        />
      </div>

      {/* Vendor Leaderboard Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#111827]">Vendor Performance Leaderboard</h3>
          <Link to="/vendors" className="text-xs font-semibold text-[#5B6FF5] hover:underline">
            View All Vendors &rarr;
          </Link>
        </div>

        <div className="divide-y divide-[#E5E8F0]">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              onClick={() => navigate(`/vendors/${vendor.id}`)}
              className="p-4 hover:bg-[#F8F9FC] cursor-pointer transition-colors flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <img
                  src={vendor.logo}
                  alt={vendor.storeName}
                  className="w-10 h-10 rounded-xl object-cover border border-[#E5E8F0]"
                />
                <div>
                  <div className="font-semibold text-[#111827] flex items-center gap-2">
                    <span>{vendor.storeName}</span>
                    <span className="text-[11px] text-[#6B7280] font-normal">({vendor.contactName})</span>
                  </div>
                  <div className="text-[11px] text-[#6B7280] mt-0.5">
                    {vendor.productsCount} catalog items &bull; Commission: {vendor.commissionRate}% &bull; Rating: {vendor.rating} ★
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-[#111827] text-sm">
                  ${vendor.totalSales.toLocaleString()} GMV
                </div>
                <div className="text-[11px] text-amber-600 font-semibold mt-0.5">
                  ${vendor.pendingPayout.toLocaleString()} pending payout
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
