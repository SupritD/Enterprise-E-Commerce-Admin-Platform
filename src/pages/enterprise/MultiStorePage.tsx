import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, Plus, CheckCircle2, ArrowRight, Store, Settings, ExternalLink } from 'lucide-react';

export const MultiStorePage: React.FC = () => {
  const { stores, currentStore, setCurrentStore, showToast } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Multi-Store & Tenant Manager</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Manage regional storefront domains, distinct currencies, separate catalog partitions, and centralized inventory hubs.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'Provision Storefront', message: 'Opening multi-region store deployment wizard...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Provision New Regional Store</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stores.map((st) => (
          <div
            key={st.id}
            className={`bg-white rounded-xl border p-6 shadow-card space-y-4 transition-all ${
              currentStore.id === st.id ? 'border-[#5B6FF5] ring-2 ring-[#5B6FF5]/10' : 'border-[#E5E8F0]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img src={st.logo} alt={st.name} className="w-12 h-12 rounded-xl object-cover border border-[#E5E8F0]" />
                <div>
                  <h3 className="font-bold text-sm text-[#111827]">{st.name}</h3>
                  <div className="text-[11px] font-mono text-[#5B6FF5] flex items-center gap-1">
                    <span>{st.domain}</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {currentStore.id === st.id ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                  CURRENT ACTIVE
                </span>
              ) : (
                <button
                  onClick={() => {
                    setCurrentStore(st);
                    showToast({ type: 'success', title: 'Store Switched', message: `Active workspace switched to ${st.name}` });
                  }}
                  className="px-3 py-1 bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs"
                >
                  Switch To
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E5E8F0] text-xs font-mono">
              <div className="p-3 bg-[#F8F9FC] rounded-lg">
                <div className="text-[10px] text-[#6B7280]">Currency & Locale</div>
                <div className="font-bold text-[#111827]">{st.currency} (Primary)</div>
              </div>
              <div className="p-3 bg-[#F8F9FC] rounded-lg">
                <div className="text-[10px] text-[#6B7280]">Revenue (30d)</div>
                <div className="font-bold text-emerald-600">${st.revenue.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#6B7280]">{st.ordersCount.toLocaleString()} lifetime orders</span>
              <button
                onClick={() => showToast({ type: 'info', title: 'Store Settings', message: `Opening localized settings for ${st.name}` })}
                className="text-[#5B6FF5] font-semibold hover:underline flex items-center gap-1"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Configure Domain & Theme</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
