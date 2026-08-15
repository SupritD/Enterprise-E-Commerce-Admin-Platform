import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { BulkActionBar } from '../../components/common/BulkActionBar';
import { Pagination } from '../../components/common/Pagination';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Layers,
  Edit2,
  Trash2,
  Copy,
  Eye,
  SlidersHorizontal,
  Package,
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { showToast } = useApp();
  const { products, deleteProduct, updateProduct } = useData();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  // Filter products
  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filtered.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteModalId) {
      deleteProduct(deleteModalId);
      showToast({ type: 'success', title: 'Product Deleted', message: 'The item was removed from catalog.' });
      setDeleteModalId(null);
    }
  };

  const handleBulkStatusChange = (status: 'active' | 'draft' | 'archived') => {
    selectedIds.forEach((id) => updateProduct(id, { status }));
    showToast({
      type: 'success',
      title: 'Bulk Update Completed',
      message: `Updated status to "${status}" for ${selectedIds.length} products.`,
    });
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Product Catalog</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Manage SKUs, matrices, inventory levels, dynamic pricing tiers, and omni-channel distribution.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/catalog/import"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Import CSV</span>
          </Link>
          <Link
            to="/catalog/export"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Export</span>
          </Link>
          <Link
            to="/catalog/products/new"
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name, SKU, or barcode..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] focus:bg-white focus:border-[#5B6FF5] outline-hidden transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] outline-hidden cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] outline-hidden cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filtered.length && filtered.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-[#E5E8F0] text-[#5B6FF5]"
                  />
                </th>
                <th className="p-4">Product Details</th>
                <th className="p-4">SKU & Barcode</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price / Cost</th>
                <th className="p-4">Stock Level</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E8F0] text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-[#6B7280]">
                    No products matched your search or filters.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => {
                  const isSelected = selectedIds.includes(product.id);
                  const isLowStock = product.stock <= product.lowStockThreshold;

                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-[#F8F9FC] transition-colors ${
                        isSelected ? 'bg-[#5B6FF5]/5' : ''
                      }`}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectOne(product.id, e.target.checked)}
                          className="rounded border-[#E5E8F0] text-[#5B6FF5]"
                        />
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="w-11 h-11 rounded-lg object-cover border border-[#E5E8F0] flex-shrink-0"
                          />
                          <div>
                            <Link
                              to={`/catalog/products/${product.id}`}
                              className="font-semibold text-[#111827] hover:text-[#5B6FF5] transition-colors"
                            >
                              {product.name}
                            </Link>
                            <div className="text-[11px] text-[#6B7280] mt-0.5">
                              Brand: {product.brand} &bull; {product.variantsCount} variants
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-mono text-[#6B7280]">
                        <div className="text-[#111827] font-semibold">{product.sku}</div>
                        <div className="text-[10px]">{product.barcode}</div>
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                          {product.category}
                        </span>
                      </td>

                      <td className="p-4 font-mono">
                        <div className="font-semibold text-[#111827]">
                          ${product.price.toFixed(2)}
                        </div>
                        <div className="text-[11px] text-[#6B7280]">
                          Cost: ${product.costPrice.toFixed(2)}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              product.stock === 0
                                ? 'bg-rose-500'
                                : isLowStock
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                          />
                          <span
                            className={`font-semibold ${
                              isLowStock ? 'text-amber-700 font-bold' : 'text-[#111827]'
                            }`}
                          >
                            {product.stock} units
                          </span>
                        </div>
                        {isLowStock && (
                          <div className="text-[10px] text-amber-600 font-medium mt-0.5">
                            Low stock alert (&le; {product.lowStockThreshold})
                          </div>
                        )}
                      </td>

                      <td className="p-4">
                        <StatusBadge status={product.status} />
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/catalog/products/${product.id}`}
                            className="p-1.5 text-[#6B7280] hover:text-[#5B6FF5] hover:bg-white rounded-lg border border-transparent hover:border-[#E5E8F0] transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            to={`/catalog/products/${product.id}/variants`}
                            className="p-1.5 text-[#6B7280] hover:text-indigo-600 hover:bg-white rounded-lg border border-transparent hover:border-[#E5E8F0] transition-colors"
                            title="Manage Variants"
                          >
                            <Layers className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => setDeleteModalId(product.id)}
                            className="p-1.5 text-[#6B7280] hover:text-rose-600 hover:bg-white rounded-lg border border-transparent hover:border-[#E5E8F0] transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-[#E5E8F0]">
          <Pagination
            currentPage={page}
            totalPages={3}
            totalItems={filtered.length}
            pageSize={10}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Floating Bulk Actions Bar */}
      <BulkActionBar
        selectedCount={selectedIds.length}
        onClearSelection={() => setSelectedIds([])}
        actions={[
          {
            label: 'Mark Active',
            onClick: () => handleBulkStatusChange('active'),
            variant: 'primary',
          },
          {
            label: 'Mark Draft',
            onClick: () => handleBulkStatusChange('draft'),
          },
          {
            label: 'Archive Items',
            onClick: () => handleBulkStatusChange('archived'),
            variant: 'danger',
          },
        ]}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteModalId}
        title="Delete Product from Catalog"
        message="Are you sure you want to permanently delete this product? All active orders with this product will maintain historic references, but future orders will be blocked."
        confirmText="Delete Product"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModalId(null)}
      />
    </div>
  );
};
