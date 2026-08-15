import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, Plus, ToggleLeft, ToggleRight, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

interface ShippingRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  status: 'active' | 'inactive';
  priority: number;
}

export const ShippingRulesPage: React.FC = () => {
  const { showToast } = useApp();

  const [rules, setRules] = useState<ShippingRule[]>([
    {
      id: 'rule_1',
      name: 'Free Standard Ground over $99',
      condition: 'Order Subtotal >= $99.00 USD AND Destination in US Lower 48',
      action: 'Override Shipping Fee to $0.00 (Standard Ground)',
      status: 'active',
      priority: 1,
    },
    {
      id: 'rule_2',
      name: 'Hazardous Goods / Lithium Battery Surcharge',
      condition: 'Contains item tagged "lithium-ion" or "hazardous"',
      action: 'Force Surface Carrier Only (Exclude Air Freight) + Add $15 Hazardous Surcharge',
      status: 'active',
      priority: 2,
    },
    {
      id: 'rule_3',
      name: 'Heavy Freight Pallet Routing (> 70kg)',
      condition: 'Combined Package Weight > 70.0 kg',
      action: 'Route to Freight LTL Carrier (XPO / R+L Carriers) with Liftgate Required',
      status: 'active',
      priority: 3,
    },
    {
      id: 'rule_4',
      name: 'B2B Enterprise Free Express Priority',
      condition: 'Customer Tag equals "VIP-B2B" or "Enterprise Tier 1"',
      action: 'Upgrade to FedEx 2-Day Air at Standard Ground Rate',
      status: 'active',
      priority: 4,
    },
  ]);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' } : r))
    );
    showToast({ type: 'success', title: 'Rule Status Toggled', message: 'Shipping rules recalculated.' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Automated Shipping Rules & Surcharges</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Conditional logic engine for dimensional surcharges, hazmat constraints, free shipping subsidies, and freight routing.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'Rule Builder', message: 'Opening conditional rule wizard...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Shipping Rule</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card divide-y divide-[#E5E8F0]">
        {rules.map((rule) => (
          <div key={rule.id} className="p-5 flex items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-[#6B7280] font-mono text-[10px] flex items-center justify-center font-bold">
                  {rule.priority}
                </span>
                <h3 className="font-bold text-sm text-[#111827]">{rule.name}</h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    rule.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-[#6B7280]'
                  }`}
                >
                  {rule.status.toUpperCase()}
                </span>
              </div>

              <div className="text-xs font-mono text-[#4B5563] bg-[#F8F9FC] p-2.5 rounded-lg border border-[#E5E8F0] space-y-1">
                <div>
                  <span className="text-[#6B7280] font-semibold">IF:</span> {rule.condition}
                </div>
                <div>
                  <span className="text-[#5B6FF5] font-semibold">THEN:</span> {rule.action}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleRule(rule.id)}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                  rule.status === 'active' ? 'text-emerald-600 hover:bg-emerald-50' : 'text-[#6B7280] hover:bg-slate-100'
                }`}
              >
                {rule.status === 'active' ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
