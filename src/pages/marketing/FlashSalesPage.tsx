import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import {
  Zap,
  Clock,
  Flame,
  Plus,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Package,
} from 'lucide-react';

interface FlashSaleEvent {
  id: string;
  title: string;
  discountPercentage: number;
  featuredProduct: string;
  productImage: string;
  originalPrice: number;
  salePrice: number;
  allocatedInventory: number;
  claimedUnits: number;
  status: 'live' | 'upcoming' | 'ended';
  remainingTime: string;
}

export const FlashSalesPage: React.FC = () => {
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const [sales, setSales] = useState<FlashSaleEvent[]>([
    {
      id: 'fs-1',
      title: 'Midnight Lightning Drop: Pro Keyboards',
      discountPercentage: 40,
      featuredProduct: 'Mechanical Studio Pro Wireless Keyboard (Limited Edition)',
      productImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150&auto=format&fit=crop&q=60',
      originalPrice: 189.99,
      salePrice: 113.99,
      allocatedInventory: 100,
      claimedUnits: 78,
      status: 'live',
      remainingTime: '04h : 22m : 18s',
    },
    {
      id: 'fs-2',
      title: '2-Hour Power Hour: Studio Monitors',
      discountPercentage: 35,
      featuredProduct: 'Ultra-Wide 34" Curved Studio Monitor 144Hz',
      productImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&auto=format&fit=crop&q=60',
      originalPrice: 649.99,
      salePrice: 422.49,
      allocatedInventory: 50,
      claimedUnits: 46,
      status: 'live',
      remainingTime: '01h : 08m : 42s',
    },
    {
      id: 'fs-3',
      title: 'Weekend Mega Drop: Audiophile ANC Headsets',
      discountPercentage: 50,
      featuredProduct: 'Acoustic Studio Pro ANC Headphones',
      productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=60',
      originalPrice: 249.99,
      salePrice: 124.99,
      allocatedInventory: 200,
      claimedUnits: 0,
      status: 'upcoming',
      remainingTime: 'Starts tomorrow @ 10:00 AM EST',
    },
  ]);

  const filtered = sales.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.featuredProduct.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Flash Sales & Countdown Drops</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Launch time-limited scarcity flash events, reserved unit inventory buckets, and real-time urgency banners.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'Schedule Drop', message: 'Configuring time-boxed inventory drop...' })}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule New Flash Sale</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Flash Drops"
          value={sales.filter((s) => s.status === 'live').length}
          change={1}
          icon={<Zap className="w-4 h-4 text-amber-500" />}
        />
        <StatCard
          title="Units Claimed Today"
          value="124 Units"
          change={44.0}
          icon={<Flame className="w-4 h-4 text-rose-500" />}
        />
        <StatCard
          title="Drop Sell-Through Rate"
          value="82.6%"
          change={9.5}
          icon={<TrendingUp className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Flash Gross Revenue"
          value="$28,340.00"
          change={36.0}
          icon={<DollarSign className="w-4 h-4 text-[#5B6FF5]" />}
        />
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search flash sales by campaign or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>
      </div>

      {/* Flash Sale Event Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const claimPercent = Math.round((item.claimedUnits / item.allocatedInventory) * 100);
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-4 hover:border-[#5B6FF5] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                    <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{item.discountPercentage}% OFF</span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.status === 'live'
                        ? 'bg-emerald-50 text-emerald-700 animate-pulse'
                        : 'bg-indigo-50 text-[#5B6FF5]'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-[#111827] leading-snug">{item.title}</h3>

                <div className="flex items-center gap-3 bg-[#F8F9FC] p-3 rounded-xl border border-[#E5E8F0]">
                  <img
                    src={item.productImage}
                    alt={item.featuredProduct}
                    className="w-12 h-12 rounded-lg object-cover border border-[#E5E8F0]"
                  />
                  <div>
                    <div className="font-bold text-xs text-[#111827] line-clamp-1">{item.featuredProduct}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-sm text-rose-600">${item.salePrice.toFixed(2)}</span>
                      <span className="text-xs text-[#9CA3AF] line-through">${item.originalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Scarcity Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-[#6B7280]">
                    <span>
                      Claimed: <strong className="text-[#111827]">{item.claimedUnits}</strong> / {item.allocatedInventory} units
                    </span>
                    <span className="font-bold text-rose-600">{claimPercent}% Sold</span>
                  </div>
                  <div className="w-full h-2 bg-[#E5E8F0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-amber-500 to-rose-500 rounded-full"
                      style={{ width: `${claimPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Countdown Footer */}
              <div className="pt-3 border-t border-[#E5E8F0] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[#111827] font-mono font-bold">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{item.remainingTime}</span>
                </div>
                <button
                  onClick={() => showToast({ type: 'info', title: 'Edit Inventory Cap', message: 'Allocated +25 additional units.' })}
                  className="text-xs font-semibold text-[#5B6FF5] hover:underline"
                >
                  Adjust Allocation &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
