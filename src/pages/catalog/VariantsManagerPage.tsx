import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Barcode,
  Layers,
  Sparkles,
} from 'lucide-react';

export const VariantsManagerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const { products } = useData();

  const product = products.find((p) => p.id === id) || products[0];

  const [options, setOptions] = useState([
    { name: 'Color', values: ['Matte Black', 'Silver Chrome', 'Midnight Blue'] },
    { name: 'Size / Fit', values: ['Standard', 'Compact Travel'] },
  ]);

  const [variants, setVariants] = useState([
    { id: 'var_1', title: 'Matte Black / Standard', sku: `${product.sku}-BLK-STD`, price: product.price, stock: 25, barcode: '849204918239' },
    { id: 'var_2', title: 'Matte Black / Compact Travel', sku: `${product.sku}-BLK-CMP`, price: product.price - 20, stock: 15, barcode: '849204918240' },
    { id: 'var_3', title: 'Silver Chrome / Standard', sku: `${product.sku}-SLV-STD`, price: product.price, stock: 20, barcode: '849204918241' },
    { id: 'var_4', title: 'Midnight Blue / Standard', sku: `${product.sku}-BLU-STD`, price: product.price + 10, stock: 18, barcode: '849204918242' },
  ]);

  const handleSave = () => {
    showToast({
      type: 'success',
      title: 'Variant Matrix Saved',
      message: `Updated ${variants.length} variant SKUs for ${product.name}.`,
    });
  };

  const generateSKUs = () => {
    showToast({
      type: 'info',
      title: 'Matrix SKUs Generated',
      message: 'Generated clean GS1 standardized barcode & SKU identifiers.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/catalog/products/${product.id}`)}
            className="p-2 rounded-lg bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] text-[#6B7280] shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Variant Matrix Manager</h1>
            <p className="text-xs text-[#6B7280]">
              Configuring multi-axis SKU variations for <span className="font-semibold text-[#111827]">{product.name}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={generateSKUs}
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <Barcode className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Regenerate Barcodes</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Matrix</span>
          </button>
        </div>
      </div>

      {/* Option Dimensions */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
        <h3 className="text-sm font-bold text-[#111827]">Option Axes</h3>

        <div className="space-y-3">
          {options.map((opt, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#E5E8F0] bg-[#F8F9FC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-[#111827]">{opt.name}:</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {opt.values.map((val, vIdx) => (
                    <span key={vIdx} className="px-2 py-0.5 rounded bg-white border border-[#E5E8F0] font-semibold text-[#111827]">
                      {val}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Variants Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#111827]">Matrix SKUs ({variants.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase">
                <th className="p-3.5">Variant Title</th>
                <th className="p-3.5">SKU Identifier</th>
                <th className="p-3.5">Barcode</th>
                <th className="p-3.5">Price ($)</th>
                <th className="p-3.5">Stock Level</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8F0]">
              {variants.map((v, idx) => (
                <tr key={v.id} className="hover:bg-[#F8F9FC]">
                  <td className="p-3.5 font-semibold text-[#111827]">{v.title}</td>
                  <td className="p-3.5 font-mono text-[#6B7280]">
                    <input
                      type="text"
                      value={v.sku}
                      onChange={(e) => {
                        const updated = [...variants];
                        updated[idx].sku = e.target.value;
                        setVariants(updated);
                      }}
                      className="px-2 py-1 bg-white border border-[#E5E8F0] rounded text-xs"
                    />
                  </td>
                  <td className="p-3.5 font-mono text-[#6B7280]">
                    <input
                      type="text"
                      value={v.barcode}
                      onChange={(e) => {
                        const updated = [...variants];
                        updated[idx].barcode = e.target.value;
                        setVariants(updated);
                      }}
                      className="px-2 py-1 bg-white border border-[#E5E8F0] rounded text-xs"
                    />
                  </td>
                  <td className="p-3.5 font-mono">
                    <input
                      type="number"
                      step="0.01"
                      value={v.price}
                      onChange={(e) => {
                        const updated = [...variants];
                        updated[idx].price = parseFloat(e.target.value) || 0;
                        setVariants(updated);
                      }}
                      className="w-24 px-2 py-1 bg-white border border-[#E5E8F0] rounded text-xs"
                    />
                  </td>
                  <td className="p-3.5 font-mono">
                    <input
                      type="number"
                      value={v.stock}
                      onChange={(e) => {
                        const updated = [...variants];
                        updated[idx].stock = parseInt(e.target.value) || 0;
                        setVariants(updated);
                      }}
                      className="w-20 px-2 py-1 bg-white border border-[#E5E8F0] rounded text-xs"
                    />
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => setVariants(variants.filter((item) => item.id !== v.id))}
                      className="p-1.5 text-[#9CA3AF] hover:text-rose-600 rounded-lg hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
