import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Upload,
  Download,
  Image as ImageIcon,
  Star,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  Layers,
  Sparkles,
} from 'lucide-react';

export const MediaImportExportPage: React.FC = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'media' | 'import' | 'export' | 'reviews'>('import');

  // Customer Reviews Moderation Queue
  const [reviews, setReviews] = useState([
    {
      id: 'rev_1',
      productName: 'Ultra-HD Smart Noise Cancelling Headphones',
      author: 'Marcus Brody',
      rating: 5,
      title: 'Flawless spatial audio and battery life',
      comment: 'Used these on a 14-hour flight. Noise cancellation is superior to everything on the market.',
      date: '2026-08-12',
      status: 'pending',
      verified: true,
    },
    {
      id: 'rev_2',
      productName: 'Ergonomic Standing Desk Pro',
      author: 'Elena Vance',
      rating: 5,
      title: 'Ultra quiet motor and solid bamboo top',
      comment: 'Very easy to assemble with pre-drilled holes. Fits two 32-inch monitors effortlessly.',
      date: '2026-08-10',
      status: 'approved',
      verified: true,
    },
    {
      id: 'rev_3',
      productName: 'Wireless Qi2 Fast Charging Dock',
      author: 'Unknown Guest',
      rating: 1,
      title: 'Spam promotional link attached',
      comment: 'Visit free-crypto-bonuses.biz for special discounts on electronics.',
      date: '2026-08-14',
      status: 'pending',
      verified: false,
    },
  ]);

  const handleReviewAction = (id: string, status: 'approved' | 'rejected') => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status } : r)));
    showToast({
      type: status === 'approved' ? 'success' : 'info',
      title: `Review ${status.toUpperCase()}`,
      message: `The review has been marked as ${status}.`,
    });
  };

  const handleRunImport = () => {
    showToast({
      type: 'success',
      title: 'Import Pipeline Initialized',
      message: 'Processing 450 SKU rows with automated barcode & image synchronization.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Catalog Operations & Content Hub</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            CSV/JSON catalog batch importer, media asset CDN library, export engine, and user review moderation.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E8F0] overflow-x-auto">
        {[
          { id: 'import', label: 'CSV / JSON Importer' },
          { id: 'export', label: 'Catalog Exporter' },
          { id: 'media', label: 'Media CDN Library' },
          { id: 'reviews', label: `Review Moderation (${reviews.filter((r) => r.status === 'pending').length} Pending)` },
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

      {/* Import Tab */}
      {activeTab === 'import' && (
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-6 max-w-2xl">
          <div>
            <h3 className="text-base font-bold text-[#111827]">Bulk Product Importer</h3>
            <p className="text-xs text-[#6B7280] mt-1">
              Upload standard Shopify, Magento, WooCommerce, or custom CSV/JSON files. Existing SKUs will be updated.
            </p>
          </div>

          <div className="border-2 border-dashed border-[#E5E8F0] rounded-xl p-8 text-center space-y-3 hover:border-[#5B6FF5]/50 cursor-pointer">
            <FileSpreadsheet className="w-10 h-10 text-[#5B6FF5] mx-auto" />
            <div className="text-xs text-[#111827] font-semibold">Drop catalog CSV or JSON file here</div>
            <div className="text-[11px] text-[#6B7280]">Supports up to 50,000 SKUs per file batch</div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs text-[#111827] cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-[#5B6FF5]" />
              <span>Automatically map variants based on Option1/Option2 columns</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-[#111827] cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-[#5B6FF5]" />
              <span>Download and cache external CDN image URLs</span>
            </label>
          </div>

          <button
            onClick={handleRunImport}
            className="w-full py-2.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            Run Import Pipeline
          </button>
        </div>
      )}

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-6 max-w-2xl">
          <div>
            <h3 className="text-base font-bold text-[#111827]">Export Product Catalog</h3>
            <p className="text-xs text-[#6B7280] mt-1">
              Generate structured exports for Google Merchant Center, Meta Catalog, ERPs, or backup archives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-[#E5E8F0] bg-[#F8F9FC] space-y-2">
              <div className="font-bold text-xs text-[#111827]">Complete Catalog (Full CSV)</div>
              <div className="text-[11px] text-[#6B7280]">Includes all SKUs, costs, tags, and variants</div>
              <button
                onClick={() => showToast({ type: 'success', title: 'Exporting', message: 'Downloading full catalog CSV...' })}
                className="mt-2 text-xs font-semibold text-[#5B6FF5] hover:underline"
              >
                Download CSV &rarr;
              </button>
            </div>

            <div className="p-4 rounded-xl border border-[#E5E8F0] bg-[#F8F9FC] space-y-2">
              <div className="font-bold text-xs text-[#111827]">Google Shopping XML Feed</div>
              <div className="text-[11px] text-[#6B7280]">Formatted with GTIN, brand, and condition tags</div>
              <button
                onClick={() => showToast({ type: 'success', title: 'Exporting', message: 'Generating live XML feed URL...' })}
                className="mt-2 text-xs font-semibold text-[#5B6FF5] hover:underline"
              >
                Generate XML Feed &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media CDN Tab */}
      {activeTab === 'media' && (
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#111827]">Global Cloud CDN Media Gallery</h3>
              <p className="text-xs text-[#6B7280]">High availability edge asset storage with automatic WebP/AVIF compression.</p>
            </div>
            <button
              onClick={() => showToast({ type: 'info', title: 'Media Upload', message: 'Select files to upload to Cloud CDN...' })}
              className="px-3.5 py-1.5 bg-[#5B6FF5] text-white text-xs font-semibold rounded-lg shadow-sm"
            >
              Upload Assets
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {[
              'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&q=80',
              'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&q=80',
              'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&q=80',
              'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop&q=80',
              'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop&q=80',
              'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop&q=80',
            ].map((img, i) => (
              <div key={i} className="rounded-xl border border-[#E5E8F0] overflow-hidden group relative">
                <img src={img} alt="CDN Asset" className="w-full h-28 object-cover" />
                <div className="p-2 text-[10px] text-[#6B7280] font-mono truncate bg-white">
                  asset_img_{i + 1}.webp
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Moderation Tab */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#E5E8F0]">
            <h3 className="text-sm font-bold text-[#111827]">Customer Product Reviews Moderation Queue</h3>
          </div>

          <div className="divide-y divide-[#E5E8F0]">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-5 space-y-2 hover:bg-[#F8F9FC] transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#111827]">{rev.author}</span>
                    {rev.verified && (
                      <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 rounded text-[10px] font-semibold border border-emerald-200">
                        Verified Buyer
                      </span>
                    )}
                    <span className="text-[#9CA3AF]">&bull;</span>
                    <span className="text-[#6B7280] font-medium">{rev.productName}</span>
                  </div>
                  <span className="text-[#9CA3AF] font-mono">{rev.date}</span>
                </div>

                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                  <span className="text-xs font-bold text-[#111827] ml-1">{rev.title}</span>
                </div>

                <p className="text-xs text-[#4B5563] leading-relaxed">{rev.comment}</p>

                <div className="flex items-center justify-between pt-2">
                  <span className={`text-[11px] font-semibold uppercase ${
                    rev.status === 'approved' ? 'text-emerald-600' : rev.status === 'rejected' ? 'text-rose-600' : 'text-amber-600'
                  }`}>
                    Status: {rev.status}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReviewAction(rev.id, 'approved')}
                      className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-semibold flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => handleReviewAction(rev.id, 'rejected')}
                      className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-xs font-semibold flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject / Spam
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
