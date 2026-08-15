import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FolderTree, Plus, ChevronRight, Edit2, Trash2, Layers } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { showToast } = useApp();
  const [categories, setCategories] = useState([
    {
      id: 'cat_1',
      name: 'Consumer Electronics',
      slug: 'electronics',
      productsCount: 42,
      subcategories: [
        { id: 'cat_1_1', name: 'Smart Audio & Headphones', slug: 'smart-audio', productsCount: 18 },
        { id: 'cat_1_2', name: 'Smart Watches & Wearables', slug: 'wearables', productsCount: 14 },
        { id: 'cat_1_3', name: 'Laptops & Workstations', slug: 'laptops', productsCount: 10 },
      ],
    },
    {
      id: 'cat_2',
      name: 'Ergonomic Office Furniture',
      slug: 'office-furniture',
      productsCount: 28,
      subcategories: [
        { id: 'cat_2_1', name: 'Motorized Standing Desks', slug: 'standing-desks', productsCount: 12 },
        { id: 'cat_2_2', name: 'Lumbar Mesh Chairs', slug: 'lumbar-chairs', productsCount: 16 },
      ],
    },
    {
      id: 'cat_3',
      name: 'Industrial & B2B Hardware',
      slug: 'industrial-hardware',
      productsCount: 65,
      subcategories: [
        { id: 'cat_3_1', name: 'Heavy Duty Fasteners', slug: 'fasteners', productsCount: 35 },
        { id: 'cat_3_2', name: 'Power Assemblies', slug: 'assemblies', productsCount: 30 },
      ],
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCat = {
      id: `cat_${Date.now()}`,
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      productsCount: 0,
      subcategories: [],
    };
    setCategories([...categories, newCat]);
    showToast({ type: 'success', title: 'Category Created', message: `Added "${newCatName}".` });
    setModalOpen(false);
    setNewCatName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Category Taxonomy</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Nested multi-tier navigation hierarchies, facet filters, and breadcrumb trees.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Root Category</span>
        </button>
      </div>

      {/* Tree View Cards */}
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-[#5B6FF5]" />
                <h3 className="text-sm font-bold text-[#111827]">{cat.name}</h3>
                <span className="text-[11px] font-mono text-[#6B7280]">/{cat.slug}</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {cat.productsCount} products
              </span>
            </div>

            {/* Subcategories */}
            <div className="pl-6 border-l-2 border-[#E5E8F0] space-y-2 mt-2">
              {cat.subcategories.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between p-2 rounded-lg bg-[#F8F9FC] text-xs">
                  <div className="flex items-center gap-2 font-medium text-[#111827]">
                    <ChevronRight className="w-3 h-3 text-[#9CA3AF]" />
                    <span>{sub.name}</span>
                    <span className="text-[10px] text-[#6B7280] font-mono">/{sub.slug}</span>
                  </div>
                  <span className="font-mono text-[#6B7280] text-[11px]">{sub.productsCount} items</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center pb-2 border-b border-[#E5E8F0]">
              <h3 className="text-base font-bold text-[#111827]">Create Category</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#9CA3AF]">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#111827] mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Home Security"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg"
                />
              </div>

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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
