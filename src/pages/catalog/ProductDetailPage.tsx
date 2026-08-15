import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  ArrowLeft,
  Save,
  Trash2,
  Copy,
  Layers,
  Upload,
  Sparkles,
  ExternalLink,
  Plus,
  Info,
  DollarSign,
  Package,
  Globe,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const { showToast } = useApp();
  const { products, addProduct, updateProduct, deleteProduct, warehouses } = useData();

  const existingProduct = products.find((p) => p.id === id);

  // Form State
  const [activeTab, setActiveTab] = useState<'general' | 'pricing' | 'inventory' | 'variants' | 'media' | 'seo' | 'b2b'>('general');
  const [name, setName] = useState(existingProduct?.name || 'Ultra-HD Smart Noise Cancelling Headphones');
  const [sku, setSku] = useState(existingProduct?.sku || 'SKU-ELEC-401');
  const [barcode, setBarcode] = useState(existingProduct?.barcode || '849204918239');
  const [category, setCategory] = useState(existingProduct?.category || 'Electronics');
  const [brand, setBrand] = useState(existingProduct?.brand || 'AcoustiPro');
  const [status, setStatus] = useState<'active' | 'draft' | 'archived'>(existingProduct?.status || 'active');
  const [description, setDescription] = useState('Studio-grade active noise cancellation with 40-hour battery life and spatial audio driver array.');
  
  // Pricing
  const [price, setPrice] = useState(existingProduct?.price.toString() || '349.99');
  const [compareAtPrice, setCompareAtPrice] = useState('399.99');
  const [costPrice, setCostPrice] = useState(existingProduct?.costPrice.toString() || '180.00');
  const [taxRate, setTaxRate] = useState('8.25');

  // Inventory
  const [stock, setStock] = useState(existingProduct?.stock.toString() || '45');
  const [lowStockThreshold, setLowStockThreshold] = useState(existingProduct?.lowStockThreshold.toString() || '10');
  const [skuTracking, setSkuTracking] = useState(true);

  // Media
  const [images, setImages] = useState<string[]>([
    existingProduct?.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&q=80',
  ]);

  // B2B Pricing Tiers
  const [b2bTiers, setB2bTiers] = useState([
    { minQty: 10, price: '299.00' },
    { minQty: 50, price: '265.00' },
    { minQty: 100, price: '240.00' },
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast({ type: 'error', title: 'Validation Error', message: 'Product title is required.' });
      return;
    }

    if (isNew) {
      const newProd = {
        id: `prod_${Date.now()}`,
        name,
        sku,
        barcode,
        price: parseFloat(price) || 0,
        costPrice: parseFloat(costPrice) || 0,
        stock: parseInt(stock) || 0,
        lowStockThreshold: parseInt(lowStockThreshold) || 5,
        status,
        category,
        brand,
        thumbnail: images[0],
        variantsCount: 2,
        unitsSold: 0,
        revenue: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      addProduct(newProd);
      showToast({ type: 'success', title: 'Product Created', message: `Added "${name}" to catalog.` });
      navigate('/catalog/products');
    } else if (existingProduct) {
      updateProduct(existingProduct.id, {
        name,
        sku,
        barcode,
        price: parseFloat(price) || 0,
        costPrice: parseFloat(costPrice) || 0,
        stock: parseInt(stock) || 0,
        lowStockThreshold: parseInt(lowStockThreshold) || 5,
        status,
        category,
        brand,
        thumbnail: images[0],
      });
      showToast({ type: 'success', title: 'Changes Saved', message: `Updated product "${name}".` });
    }
  };

  const handleDelete = () => {
    if (existingProduct) {
      deleteProduct(existingProduct.id);
      showToast({ type: 'success', title: 'Product Removed', message: 'Product has been deleted.' });
      navigate('/catalog/products');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/catalog/products')}
            className="p-2 rounded-lg bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] text-[#6B7280] hover:text-[#111827] shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
                {isNew ? 'Create New Product' : name}
              </h1>
              {!isNew && <StatusBadge status={status} />}
            </div>
            <p className="text-xs text-[#6B7280] font-mono mt-0.5">
              {isNew ? 'Draft SKU Assignment' : `SKU: ${sku} &bull; Barcode: ${barcode}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {!isNew && (
            <>
              <Link
                to={`/catalog/products/${id}/variants`}
                className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>Manage Matrix</span>
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                className="p-2 text-rose-600 bg-white hover:bg-rose-50 border border-[#E5E8F0] rounded-lg shadow-2xs"
                title="Delete Product"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isNew ? 'Publish Product' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E8F0] overflow-x-auto">
        {[
          { id: 'general', label: 'General Info' },
          { id: 'pricing', label: 'Pricing & Taxes' },
          { id: 'inventory', label: 'Inventory & Stock' },
          { id: 'variants', label: 'Variants & Matrix' },
          { id: 'media', label: 'Media Assets' },
          { id: 'seo', label: 'SEO Metadata' },
          { id: 'b2b', label: 'B2B Tier Pricing' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-[#5B6FF5] text-[#5B6FF5]'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Form Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Tab Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
              <h3 className="text-sm font-bold text-[#111827]">Core Details</h3>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">Description & Marketing Copy</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-xs"
                  >
                    <option value="Electronics">Consumer Electronics</option>
                    <option value="Audio">Audio & Acoustics</option>
                    <option value="Furniture">Furniture & Office</option>
                    <option value="Apparel">Apparel & Wearables</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">Brand / Manufacturer</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
              <h3 className="text-sm font-bold text-[#111827]">Financial Margins & Taxes</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">Selling Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">Compare-at Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm font-mono text-[#6B7280]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">Cost of Goods (COGS $)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm font-mono"
                  />
                </div>
              </div>

              {/* Profit Margin Calculator */}
              <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#E5E8F0] flex justify-between text-xs font-mono">
                <div>
                  <span className="text-[#6B7280]">Gross Margin:</span>
                  <span className="ml-2 font-bold text-emerald-600">
                    ${(parseFloat(price) - parseFloat(costPrice)).toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[#6B7280]">Margin %:</span>
                  <span className="ml-2 font-bold text-emerald-600">
                    {(((parseFloat(price) - parseFloat(costPrice)) / parseFloat(price)) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
              <h3 className="text-sm font-bold text-[#111827]">Stock Units & Multi-Warehouse Allocation</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">Total Available Units</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">Low Stock Threshold</label>
                  <input
                    type="number"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <div className="text-xs font-bold text-[#111827] mb-2">Warehouse Breakdown</div>
                <div className="space-y-2">
                  {warehouses.map((wh) => (
                    <div key={wh.id} className="p-3 rounded-lg border border-[#E5E8F0] flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#111827]">{wh.name}</span>
                      <span className="font-mono text-[#6B7280]">{Math.floor(parseInt(stock) / warehouses.length)} units</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'variants' && (
            <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#111827]">Option Matrix (Colors, Sizes, Materials)</h3>
                <Link
                  to={`/catalog/products/${id || 'prod_01'}/variants`}
                  className="text-xs font-semibold text-[#5B6FF5] hover:underline flex items-center gap-1"
                >
                  <Layers className="w-3.5 h-3.5" /> Full Variant Matrix
                </Link>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-lg border border-[#E5E8F0] flex justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#111827]">Color: Matte Black / Size: Standard</span>
                    <div className="text-[11px] text-[#6B7280] font-mono">SKU: {sku}-BLK &bull; Stock: 25</div>
                  </div>
                  <span className="font-mono font-bold">${price}</span>
                </div>
                <div className="p-3 rounded-lg border border-[#E5E8F0] flex justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#111827]">Color: Silver Chrome / Size: Standard</span>
                    <div className="text-[11px] text-[#6B7280] font-mono">SKU: {sku}-SLV &bull; Stock: 20</div>
                  </div>
                  <span className="font-mono font-bold">${price}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
              <h3 className="text-sm font-bold text-[#111827]">CDN Gallery & Product Imagery</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-[#E5E8F0]">
                    <img src={img} alt="Product" className="w-full h-32 object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, i) => i !== idx))}
                      className="absolute top-1.5 right-1.5 p-1 bg-white/90 rounded-full text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-2 border-dashed border-[#E5E8F0] rounded-xl p-6 text-center text-xs text-[#6B7280] hover:border-[#5B6FF5]/50 cursor-pointer">
                <Upload className="w-6 h-6 text-[#9CA3AF] mx-auto mb-2" />
                <span>Drag & drop high-res PNG/WEBP or click to upload</span>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
              <h3 className="text-sm font-bold text-[#111827]">Search Engine Preview & Meta</h3>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">Page Title Tag</label>
                <input
                  type="text"
                  value={`${name} | Buy Online at OmniCommerce`}
                  readOnly
                  className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">Meta Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-xs"
                />
              </div>
            </div>
          )}

          {activeTab === 'b2b' && (
            <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
              <h3 className="text-sm font-bold text-[#111827]">Wholesale & Volume Price Tiers</h3>

              <div className="space-y-2">
                {b2bTiers.map((tier, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-[#E5E8F0] flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#111827]">Tier {idx + 1}: Minimum {tier.minQty} units</span>
                    <span className="font-mono font-bold text-emerald-600">${tier.price} / unit</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Status & Live Preview Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">Publishing Settings</h3>

            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">Product Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-xs"
              >
                <option value="active">Active (Visible in Storefront)</option>
                <option value="draft">Draft (Hidden)</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="pt-2 border-t border-[#E5E8F0]">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#4B5563]">
                <input type="checkbox" defaultChecked className="rounded text-[#5B6FF5]" />
                <span>Show in B2B Wholesale Catalog</span>
              </label>
            </div>
          </div>

          {/* Storefront Preview Mock */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-3">
            <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Storefront Card Preview</div>
            <div className="rounded-xl border border-[#E5E8F0] overflow-hidden">
              <img src={images[0]} alt="Preview" className="w-full h-40 object-cover" />
              <div className="p-3 text-xs space-y-1">
                <div className="font-bold text-[#111827] truncate">{name}</div>
                <div className="text-[#6B7280] text-[11px]">{category} &bull; {brand}</div>
                <div className="font-mono font-bold text-sm text-[#5B6FF5] mt-1">${price}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
