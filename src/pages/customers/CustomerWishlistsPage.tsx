import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import {
  Heart,
  Search,
  Bell,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  Mail,
  Send,
  Eye,
  CheckCircle2,
  DollarSign,
  Package,
  Layers,
} from 'lucide-react';

interface WishlistItem {
  id: string;
  productName: string;
  sku: string;
  thumbnail: string;
  price: number;
  category: string;
  savedByCustomersCount: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  stockCount: number;
  priceDropNotificationTriggered: boolean;
  backInStockAlertsPending: number;
}

export const CustomerWishlistsPage: React.FC = () => {
  const { showToast } = useApp();
  const { products } = useData();

  const [searchQuery, setSearchQuery] = useState('');

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 'wish-1',
      productName: 'Mechanical Studio Pro Wireless Keyboard',
      sku: 'SKU-TECH-01',
      thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150&auto=format&fit=crop&q=60',
      price: 189.99,
      category: 'Electronics',
      savedByCustomersCount: 142,
      stockStatus: 'in_stock',
      stockCount: 48,
      priceDropNotificationTriggered: false,
      backInStockAlertsPending: 0,
    },
    {
      id: 'wish-2',
      productName: 'Acoustic Studio Pro ANC Headphones',
      sku: 'SKU-TECH-02',
      thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=60',
      price: 249.99,
      category: 'Audio',
      savedByCustomersCount: 284,
      stockStatus: 'low_stock',
      stockCount: 6,
      priceDropNotificationTriggered: false,
      backInStockAlertsPending: 18,
    },
    {
      id: 'wish-3',
      productName: 'Ergonomic Executive Mesh Chair',
      sku: 'SKU-FURN-01',
      thumbnail: 'https://images.unsplash.com/photo-1580481077114-1e0f065a6c3f?w=150&auto=format&fit=crop&q=60',
      price: 499.0,
      category: 'Furniture',
      savedByCustomersCount: 95,
      stockStatus: 'out_of_stock',
      stockCount: 0,
      priceDropNotificationTriggered: false,
      backInStockAlertsPending: 42,
    },
    {
      id: 'wish-4',
      productName: 'Ultra-Wide 34" Curved Studio Monitor',
      sku: 'SKU-TECH-03',
      thumbnail: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&auto=format&fit=crop&q=60',
      price: 649.99,
      category: 'Electronics',
      savedByCustomersCount: 310,
      stockStatus: 'in_stock',
      stockCount: 24,
      priceDropNotificationTriggered: false,
      backInStockAlertsPending: 0,
    },
  ]);

  const handleBroadcastPriceDrop = (item: WishlistItem) => {
    setWishlistItems((prev) =>
      prev.map((w) =>
        w.id === item.id ? { ...w, priceDropNotificationTriggered: true } : w
      )
    );
    showToast({
      type: 'success',
      title: 'Price Drop Promo Dispatched',
      message: `Sent personalized 10% discount notification to ${item.savedByCustomersCount} customers.`,
    });
  };

  const handleBroadcastBackInStock = (item: WishlistItem) => {
    showToast({
      type: 'success',
      title: 'Back in Stock Broadcast Sent',
      message: `Triggered SMS and Push alerts to ${item.backInStockAlertsPending} waitlist shoppers.`,
    });
  };

  const filtered = wishlistItems.filter((w) =>
    w.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Customer Wishlists & Registries</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Monitor high-intent customer wishlisted items, trigger back-in-stock alerts, and convert saves into sales.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'Automated Triggers', message: 'Configured automated price drop email trigger rules.' })}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Wishlist Automation Rules</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Wishlist Saves"
          value="831 Saves"
          change={24.0}
          icon={<Heart className="w-4 h-4 text-rose-500" />}
        />
        <StatCard
          title="Conversion to Cart"
          value="18.2%"
          change={5.4}
          icon={<ShoppingBag className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Pending Stock Alerts"
          value="60 Waitlisted"
          change={12.0}
          icon={<Bell className="w-4 h-4 text-amber-500" />}
        />
        <StatCard
          title="Wishlist Pipeline Value"
          value="$284.5k"
          change={18.0}
          icon={<DollarSign className="w-4 h-4 text-emerald-500" />}
        />
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search wishlisted products by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>
      </div>

      {/* Wishlist Items Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">Product Details</th>
              <th className="p-4">Unit Price</th>
              <th className="p-4">Customer Saves Count</th>
              <th className="p-4">Current Stock Status</th>
              <th className="p-4">Back-in-Stock Queue</th>
              <th className="p-4 text-right">Marketing Triggers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-[#F8F9FC] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.thumbnail}
                      alt={item.productName}
                      className="w-10 h-10 rounded-lg object-cover border border-[#E5E8F0]"
                    />
                    <div>
                      <div className="font-bold text-[#111827]">{item.productName}</div>
                      <div className="text-[10px] text-[#6B7280] font-mono">
                        {item.sku} &bull; {item.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-bold text-[#111827]">${item.price.toFixed(2)}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5 font-bold text-[#5B6FF5]">
                    <Heart className="w-4 h-4 fill-rose-100 text-rose-500" />
                    <span>{item.savedByCustomersCount} customers</span>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.stockStatus === 'in_stock'
                        ? 'bg-emerald-50 text-emerald-700'
                        : item.stockStatus === 'low_stock'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {item.stockStatus.replace('_', ' ')} ({item.stockCount} left)
                  </span>
                </td>
                <td className="p-4">
                  {item.backInStockAlertsPending > 0 ? (
                    <span className="font-bold text-amber-600">
                      {item.backInStockAlertsPending} shoppers waiting
                    </span>
                  ) : (
                    <span className="text-[#9CA3AF]">None</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {item.backInStockAlertsPending > 0 && (
                      <button
                        onClick={() => handleBroadcastBackInStock(item)}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs"
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>Notify Waitlist</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleBroadcastPriceDrop(item)}
                      disabled={item.priceDropNotificationTriggered}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs ${
                        item.priceDropNotificationTriggered
                          ? 'bg-[#F1F3F9] text-[#9CA3AF]'
                          : 'bg-[#5B6FF5] hover:bg-[#4557E0] text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>
                        {item.priceDropNotificationTriggered
                          ? 'Campaign Sent'
                          : 'Trigger 10% Discount Drop'}
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
