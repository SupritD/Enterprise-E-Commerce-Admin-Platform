import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save, Globe, DollarSign, Image, Lock, ShieldCheck } from 'lucide-react';

export const GeneralSettingsPage: React.FC = () => {
  const { currentStore, showToast } = useApp();

  const [storeName, setStoreName] = useState(currentStore.name);
  const [storeDomain, setStoreDomain] = useState(currentStore.domain);
  const [currency, setCurrency] = useState(currentStore.currency);
  const [timezone, setTimezone] = useState('America/New_York (EST/EDT)');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [guestCheckout, setGuestCheckout] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: 'success',
      title: 'Store Settings Saved',
      message: 'Global tenant configuration propagated to CDN and edge caches.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Store Identity & General Settings</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Storefront branding, canonical apex domains, default base currency, timezone formats, and customer checkout policies.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Identity Card */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#111827]">Store Branding & Domain</h3>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-[#111827] mb-1">Official Store Name</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Primary Custom Apex Domain</label>
                <div className="flex">
                  <span className="px-3 py-2 bg-[#E5E8F0] border border-r-0 border-[#E5E8F0] rounded-l-lg text-[#6B7280] font-mono">
                    https://
                  </span>
                  <input
                    type="text"
                    value={storeDomain}
                    onChange={(e) => setStoreDomain(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-r-lg text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Regional & Financial Card */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#111827]">Localization & Currencies</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#111827] mb-1">Base Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg"
                >
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="EUR">EUR (€) - Euro</option>
                  <option value="GBP">GBP (£) - British Pound</option>
                  <option value="CAD">CAD ($) - Canadian Dollar</option>
                  <option value="AUD">AUD ($) - Australian Dollar</option>
                  <option value="JPY">JPY (¥) - Japanese Yen</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Store Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg font-mono text-xs"
                >
                  <option value="America/New_York (EST/EDT)">America/New_York (UTC-5)</option>
                  <option value="America/Los_Angeles (PST/PDT)">America/Los_Angeles (UTC-8)</option>
                  <option value="Europe/London (GMT/BST)">Europe/London (UTC+0)</option>
                  <option value="Europe/Paris (CET/CEST)">Europe/Paris (UTC+1)</option>
                  <option value="Asia/Tokyo (JST)">Asia/Tokyo (UTC+9)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Policies */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#111827]">Customer Checkout Policies</h3>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={guestCheckout}
                onChange={(e) => setGuestCheckout(e.target.checked)}
                className="rounded text-[#5B6FF5] focus:ring-0"
              />
              <span className="font-semibold text-[#111827]">Enable 1-Click Guest Checkout</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="rounded text-[#5B6FF5] focus:ring-0"
              />
              <span className="font-semibold text-[#111827]">Storefront Maintenance Mode</span>
            </label>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 text-[11px]">
              When Maintenance Mode is active, only authenticated staff with role permissions can view the live storefront.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
