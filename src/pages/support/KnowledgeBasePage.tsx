import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Search, Plus, Edit2, FileText, Eye, CheckCircle2 } from 'lucide-react';

interface KBArticle {
  id: string;
  title: string;
  category: string;
  views: number;
  helpfulCount: number;
  status: 'published' | 'draft';
  lastUpdated: string;
}

export const KnowledgeBasePage: React.FC = () => {
  const { showToast } = useApp();
  const [search, setSearch] = useState('');

  const [articles, setArticles] = useState<KBArticle[]>([
    { id: 'kb_1', title: 'OmniCommerce Global Returns & Refund Processing Policy', category: 'Returns & Exchanges', views: 14200, helpfulCount: 1390, status: 'published', lastUpdated: '2 days ago' },
    { id: 'kb_2', title: 'How to Redeem B2B Net-30 Trade Credit and Volume Invoicing', category: 'B2B & Wholesale', views: 8400, helpfulCount: 810, status: 'published', lastUpdated: '1 week ago' },
    { id: 'kb_3', title: 'Carrier Tracking, International Customs & Duty Fees (DDP/DDU)', category: 'Shipping & Delivery', views: 22100, helpfulCount: 2040, status: 'published', lastUpdated: '3 days ago' },
    { id: 'kb_4', title: 'Two-Factor Authentication Setup & Hardware Security Keys', category: 'Security & Account', views: 5300, helpfulCount: 490, status: 'published', lastUpdated: '2 weeks ago' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Help Center & Knowledge Base</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Self-service customer articles, policy guidelines, and AI indexing for instant chat deflection.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'New Article Editor', message: 'Opening Markdown article composer...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="p-4 border-b border-[#E5E8F0]">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search help articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs outline-hidden"
            />
          </div>
        </div>

        <div className="divide-y divide-[#E5E8F0] text-xs">
          {articles.map((art) => (
            <div key={art.id} className="p-4 flex items-center justify-between hover:bg-[#F8F9FC] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#5B6FF5]" />
                </div>
                <div>
                  <div className="font-bold text-[#111827] text-sm">{art.title}</div>
                  <div className="text-[11px] text-[#6B7280] mt-0.5">
                    Category: <span className="font-semibold text-[#4B5563]">{art.category}</span> &bull; Updated {art.lastUpdated}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right font-mono text-[11px] text-[#6B7280]">
                  <div>{art.views.toLocaleString()} reads</div>
                  <div className="text-emerald-600 font-semibold">{art.helpfulCount} found helpful</div>
                </div>

                <button
                  onClick={() => showToast({ type: 'info', title: 'Edit Article', message: `Editing article ${art.title}` })}
                  className="p-1.5 hover:bg-white rounded-lg text-[#6B7280] hover:text-[#111827] border border-transparent hover:border-[#E5E8F0]"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
