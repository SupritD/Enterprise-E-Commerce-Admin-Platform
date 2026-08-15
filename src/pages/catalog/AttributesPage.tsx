import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Edit2, Trash2, Tag, Check, SlidersHorizontal } from 'lucide-react';

export const AttributesPage: React.FC = () => {
  const { showToast } = useApp();
  const [attributes, setAttributes] = useState([
    { id: 'attr_1', name: 'Material', type: 'select', values: ['Aluminum', 'Leather', 'Polycarbonate', 'Titanium'], required: true },
    { id: 'attr_2', name: 'Battery Capacity', type: 'text', values: ['40 Hours', '24 Hours', '60 Hours'], required: false },
    { id: 'attr_3', name: 'Connectivity', type: 'multi-select', values: ['Bluetooth 5.3', 'Wi-Fi 6E', 'USB-C Lossless', '3.5mm Jack'], required: true },
    { id: 'attr_4', name: 'Warranty Period', type: 'select', values: ['1 Year Limited', '2 Year ProCare', 'Lifetime Hardware'], required: true },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newAttrName, setNewAttrName] = useState('');
  const [newAttrType, setNewAttrType] = useState('select');
  const [newAttrValues, setNewAttrValues] = useState('Option 1, Option 2');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newAttr = {
      id: `attr_${Date.now()}`,
      name: newAttrName,
      type: newAttrType,
      values: newAttrValues.split(',').map((v) => v.trim()),
      required: false,
    };
    setAttributes([...attributes, newAttr]);
    showToast({ type: 'success', title: 'Attribute Added', message: `Created attribute "${newAttrName}".` });
    setModalOpen(false);
    setNewAttrName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Product Attributes & Sets</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Define custom metadata dimensions, faceted search filters, and technical specification schemas.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Attribute</span>
        </button>
      </div>

      {/* Attributes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attributes.map((attr) => (
          <div key={attr.id} className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#5B6FF5]" />
                <h3 className="text-sm font-bold text-[#111827]">{attr.name}</h3>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                {attr.type}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {attr.values.map((val, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md bg-[#F8F9FC] border border-[#E5E8F0] text-xs text-[#111827] font-medium">
                  {val}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E5E8F0] text-xs text-[#6B7280]">
              <span>{attr.required ? 'Mandatory for all categories' : 'Optional specification'}</span>
              <button
                onClick={() => setAttributes(attributes.filter((a) => a.id !== attr.id))}
                className="text-rose-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center pb-2 border-b border-[#E5E8F0]">
              <h3 className="text-base font-bold text-[#111827]">New Attribute Definition</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#9CA3AF]">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#111827] mb-1">Attribute Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Water Resistance Rating"
                  value={newAttrName}
                  onChange={(e) => setNewAttrName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Input Field Type</label>
                <select
                  value={newAttrType}
                  onChange={(e) => setNewAttrType(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg"
                >
                  <option value="select">Dropdown Select</option>
                  <option value="multi-select">Multi-Select Tags</option>
                  <option value="text">Freeform Text</option>
                  <option value="boolean">Boolean Switch</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Available Options (Comma separated)</label>
                <input
                  type="text"
                  placeholder="IP67, IP68, 5ATM, Water Resistant"
                  value={newAttrValues}
                  onChange={(e) => setNewAttrValues(e.target.value)}
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
                  Create Attribute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
