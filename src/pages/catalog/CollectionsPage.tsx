import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Sparkles, Layers, Search, Edit2, Trash2, ArrowRight } from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  const { showToast } = useApp();
  const [collections, setCollections] = useState([
    {
      id: 'col_1',
      title: 'Summer 2026 High Velocity Tech',
      slug: 'summer-2026-tech',
      type: 'automated',
      condition: 'Price > $150 AND Category = Electronics',
      productsCount: 14,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=200&fit=crop&q=80',
    },
    {
      id: 'col_2',
      title: 'Executive Ergonomic Workspace',
      slug: 'executive-ergonomic',
      type: 'manual',
      condition: 'Manually curated by Merchandiser',
      productsCount: 8,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=200&fit=crop&q=80',
    },
    {
      id: 'col_3',
      title: 'B2B High Volume Overstock Specials',
      slug: 'b2b-overstock',
      type: 'automated',
      condition: 'Stock > 100 units AND Discount >= 20%',
      productsCount: 22,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=200&fit=crop&q=80',
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'automated' | 'manual'>('automated');
  const [newCondition, setNewCondition] = useState('Price > $100');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCol = {
      id: `col_${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type: newType,
      condition: newCondition,
      productsCount: 5,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=200&fit=crop&q=80',
    };
    setCollections([...collections, newCol]);
    showToast({ type: 'success', title: 'Collection Published', message: `Created collection "${newTitle}".` });
    setModalOpen(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Smart Collections & Curations</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Automated dynamic rule-based sets and editorial product groupings with custom SEO URLs.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Collection</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div key={col.id} className="bg-white rounded-xl border border-[#E5E8F0] overflow-hidden shadow-card hover:border-[#5B6FF5]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="h-32 bg-slate-100 relative overflow-hidden">
                <img src={col.image} alt={col.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/90 text-[#111827] shadow-xs">
                  {col.type}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-[#111827]">{col.title}</h3>
                <div className="text-[11px] font-mono text-[#5B6FF5]">/{col.slug}</div>
                <p className="text-xs text-[#6B7280] font-mono bg-[#F8F9FC] p-2 rounded border border-[#E5E8F0]">
                  Rule: {col.condition}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-[#E5E8F0] mt-2 flex items-center justify-between text-xs text-[#6B7280]">
              <span className="font-semibold text-[#111827]">{col.productsCount} products</span>
              <button
                onClick={() => setCollections(collections.filter((c) => c.id !== col.id))}
                className="text-rose-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center pb-2 border-b border-[#E5E8F0]">
              <h3 className="text-base font-bold text-[#111827]">Create Collection</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#9CA3AF]">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#111827] mb-1">Collection Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Best Sellers 2026"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Collection Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg"
                >
                  <option value="automated">Smart Automated (Rule-based)</option>
                  <option value="manual">Manual Selection</option>
                </select>
              </div>

              {newType === 'automated' && (
                <div>
                  <label className="block font-semibold text-[#111827] mb-1">Inclusion Condition</label>
                  <input
                    type="text"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    placeholder="e.g. Category = Electronics AND Price > 50"
                    className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg font-mono"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E8F0] rounded-lg text-[#6B7280]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5B6FF5] text-white font-semibold rounded-lg shadow-sm"
                >
                  Publish Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
