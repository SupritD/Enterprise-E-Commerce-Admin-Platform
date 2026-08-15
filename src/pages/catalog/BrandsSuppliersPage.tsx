import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Plus, Globe, Mail, Phone, Clock, Package } from 'lucide-react';

export const BrandsSuppliersPage: React.FC = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'brands' | 'suppliers'>('brands');

  const [brands, setBrands] = useState([
    { id: 'b_1', name: 'AcoustiPro Audio', website: 'https://acoustipro.audio', products: 18, logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&q=80' },
    { id: 'b_2', name: 'ErgoMotion Labs', website: 'https://ergomotion.design', products: 12, logo: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop&q=80' },
    { id: 'b_3', name: 'Apex Industrial', website: 'https://apexindustrial.com', products: 34, logo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop&q=80' },
  ]);

  const [suppliers, setSuppliers] = useState([
    { id: 'sup_1', name: 'Shenzhen Precision Acoustics Co.', contact: 'David Zhang', email: 'sales@szacoustics.cn', leadTime: '14 Days', moq: 200, rating: '4.9/5' },
    { id: 'sup_2', name: 'Bavaria Motorized Drives GmbH', contact: 'Klaus Schmidt', email: 'b2b@bavariadrives.de', leadTime: '21 Days', moq: 50, rating: '4.8/5' },
    { id: 'sup_3', name: 'Midwest Steel & Hardware Corp', contact: 'Sarah Miller', email: 'orders@midweststeel.com', leadTime: '5 Days', moq: 500, rating: '4.95/5' },
  ]);

  const handleAddSupplier = () => {
    showToast({
      type: 'info',
      title: 'Supplier Onboarding',
      message: 'Opening supplier master registration form...',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Brands & Supplier Master</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Manage authorized manufacturer brands, supplier lead-times, minimum order quantities (MOQ), and procurement contacts.
          </p>
        </div>

        <button
          onClick={handleAddSupplier}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add {activeTab === 'brands' ? 'Brand' : 'Supplier'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E8F0]">
        <button
          onClick={() => setActiveTab('brands')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'brands'
              ? 'border-[#5B6FF5] text-[#5B6FF5]'
              : 'border-transparent text-[#6B7280] hover:text-[#111827]'
          }`}
        >
          Brands Directory ({brands.length})
        </button>
        <button
          onClick={() => setActiveTab('suppliers')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'suppliers'
              ? 'border-[#5B6FF5] text-[#5B6FF5]'
              : 'border-transparent text-[#6B7280] hover:text-[#111827]'
          }`}
        >
          Procurement Suppliers ({suppliers.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === 'brands' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div key={brand.id} className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card flex items-center gap-4">
              <img src={brand.logo} alt={brand.name} className="w-12 h-12 rounded-xl object-cover border border-[#E5E8F0]" />
              <div className="text-xs space-y-1">
                <h3 className="font-bold text-[#111827]">{brand.name}</h3>
                <div className="text-[#6B7280] font-mono text-[11px] truncate max-w-[180px]">{brand.website}</div>
                <div className="text-[#5B6FF5] font-semibold">{brand.products} active products</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
          <div className="divide-y divide-[#E5E8F0]">
            {suppliers.map((sup) => (
              <div key={sup.id} className="p-4 hover:bg-[#F8F9FC] transition-colors flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#111827] flex items-center gap-2">
                    <span>{sup.name}</span>
                    <span className="font-normal text-[#6B7280]">({sup.contact})</span>
                  </div>
                  <div className="text-[#6B7280] text-[11px] mt-1 flex items-center gap-4 font-mono">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {sup.email}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Lead Time: {sup.leadTime}</span>
                    <span className="flex items-center gap-1"><Package className="w-3 h-3" /> MOQ: {sup.moq}</span>
                  </div>
                </div>

                <div className="text-right font-semibold text-emerald-600">
                  Rating: {sup.rating} ★
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
