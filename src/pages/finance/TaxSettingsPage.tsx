import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Percent, Globe, CheckCircle2, ShieldCheck, ToggleRight, ToggleLeft, Plus, Edit2 } from 'lucide-react';

interface TaxClass {
  id: string;
  name: string;
  code: string;
  defaultRate: number;
  description: string;
  isDefault?: boolean;
}

interface TaxJurisdiction {
  id: string;
  country: string;
  stateOrRegion: string;
  nexusType: 'physical' | 'economic' | 'marketplace_facilitator';
  rate: number;
  threshold: string;
}

export const TaxSettingsPage: React.FC = () => {
  const { showToast } = useApp();

  const [taxClasses, setTaxClasses] = useState<TaxClass[]>([
    { id: 'tc_1', name: 'Standard Tangible Goods', code: 'TAX-STD-01', defaultRate: 8.25, isDefault: true, description: 'Standard consumer physical products and hardware.' },
    { id: 'tc_2', name: 'Digital Downloads & SaaS', code: 'TAX-DIG-02', defaultRate: 6.5, description: 'Software subscriptions, ebook downloads, and digital streaming licenses.' },
    { id: 'tc_3', name: 'Apparel & Footwear Exemption', code: 'TAX-APP-03', defaultRate: 0.0, description: 'State-exempt everyday clothing items under $110 thresholds.' },
    { id: 'tc_4', name: 'Reduced Rate Groceries / Essentials', code: 'TAX-ESS-04', defaultRate: 2.0, description: 'Food supplements and essential emergency health products.' },
  ]);

  const [autoNexusEnabled, setAutoNexusEnabled] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Sales Tax, VAT & GST Compliance</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Automatic economic nexus calculation, EU One-Stop-Shop (OSS) VAT rules, and Avalara AvaTax / TaxJar sync.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'New Tax Class', message: 'Opening tax class creation modal...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Tax Class</span>
        </button>
      </div>

      {/* AvaTax Integration Card */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <Percent className="w-6 h-6 text-[#5B6FF5]" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#111827]">Avalara AvaTax Real-Time Engine (Live API)</h3>
            <p className="text-xs text-[#6B7280]">
              Automates rooftop-level address tax calculation across 13,000+ US jurisdictions and 190+ countries.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setAutoNexusEnabled(!autoNexusEnabled);
            showToast({ type: 'success', title: 'Tax Integration', message: 'AvaTax real-time engine toggled.' });
          }}
          className={autoNexusEnabled ? 'text-emerald-600' : 'text-[#6B7280]'}
        >
          {autoNexusEnabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
        </button>
      </div>

      {/* Tax Classes List */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
        <h3 className="font-bold text-sm text-[#111827]">Configured Product Tax Classes</h3>

        <div className="divide-y divide-[#E5E8F0] text-xs">
          {taxClasses.map((tc) => (
            <div key={tc.id} className="py-3.5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#111827]">{tc.name}</span>
                  <span className="font-mono text-[10px] bg-slate-100 text-[#4B5563] px-1.5 py-0.5 rounded font-semibold">
                    {tc.code}
                  </span>
                  {tc.isDefault && (
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
                      DEFAULT
                    </span>
                  )}
                </div>
                <div className="text-[#6B7280] text-[11px] mt-0.5">{tc.description}</div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-sm text-[#111827]">{tc.defaultRate.toFixed(2)}%</span>
                <button
                  onClick={() => showToast({ type: 'info', title: 'Edit Tax Class', message: `Editing ${tc.name}` })}
                  className="p-1 text-[#9CA3AF] hover:text-[#111827]"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
