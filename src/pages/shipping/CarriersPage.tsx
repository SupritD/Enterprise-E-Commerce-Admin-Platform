import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Truck, CheckCircle2, XCircle, ShieldCheck, Key, RefreshCw, Plus, ExternalLink } from 'lucide-react';

interface CarrierIntegration {
  id: string;
  name: string;
  code: string;
  logo: string;
  status: 'connected' | 'error' | 'disconnected';
  accountNumber: string;
  activeServices: string[];
  autoGenerateLabels: boolean;
  insuranceEnabled: boolean;
}

export const CarriersPage: React.FC = () => {
  const { showToast } = useApp();

  const [carriers, setCarriers] = useState<CarrierIntegration[]>([
    {
      id: 'c_fedex',
      name: 'FedEx Web Services & REST API',
      code: 'FEDEX',
      logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop&q=80',
      status: 'connected',
      accountNumber: '9281-9920-11',
      activeServices: ['FedEx Ground', 'FedEx 2Day', 'FedEx Priority Overnight', 'FedEx Home Delivery'],
      autoGenerateLabels: true,
      insuranceEnabled: true,
    },
    {
      id: 'c_ups',
      name: 'UPS Worldwide & Next Day Air',
      code: 'UPS',
      logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop&q=80',
      status: 'connected',
      accountNumber: 'X82-019-UPS',
      activeServices: ['UPS Ground', 'UPS Next Day Air Saver', 'UPS Worldwide Expedited'],
      autoGenerateLabels: true,
      insuranceEnabled: false,
    },
    {
      id: 'c_dhl',
      name: 'DHL Express International',
      code: 'DHL',
      logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop&q=80',
      status: 'connected',
      accountNumber: 'DHL-GLOBAL-8831',
      activeServices: ['DHL Express Worldwide', 'DHL Medical Express'],
      autoGenerateLabels: true,
      insuranceEnabled: true,
    },
    {
      id: 'c_usps',
      name: 'USPS / EasyPost API Partner',
      code: 'USPS',
      logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop&q=80',
      status: 'connected',
      accountNumber: 'EASYPOST-KEY-LIVE',
      activeServices: ['USPS Priority Mail', 'USPS Ground Advantage', 'USPS Priority Mail Express'],
      autoGenerateLabels: true,
      insuranceEnabled: true,
    },
  ]);

  const toggleAutoLabels = (id: string) => {
    setCarriers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, autoGenerateLabels: !c.autoGenerateLabels } : c))
    );
    showToast({ type: 'info', title: 'Carrier Settings Saved', message: 'Updated label dispatch configuration.' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Carrier Integrations & Shipping APIs</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Manage live rate calculation APIs, automated shipping label generation, tracking webhooks, and contracted corporate discounts.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'Carrier Credentials', message: 'Opening API key & secret configuration modal...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Connect New Carrier API</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {carriers.map((carrier) => (
          <div key={carrier.id} className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#F8F9FC] border border-[#E5E8F0] flex items-center justify-center">
                  <Truck className="w-6 h-6 text-[#5B6FF5]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#111827]">{carrier.name}</h3>
                  <div className="text-[11px] font-mono text-[#6B7280]">Account: {carrier.accountNumber}</div>
                </div>
              </div>

              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span>Connected</span>
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E5E8F0] text-xs">
              <div className="font-semibold text-[#111827]">Active Negotiated Service Levels:</div>
              <div className="flex flex-wrap gap-1.5">
                {carrier.activeServices.map((srv, idx) => (
                  <span key={idx} className="px-2 py-1 rounded bg-[#F8F9FC] border border-[#E5E8F0] text-[11px] text-[#4B5563]">
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E8F0] flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={carrier.autoGenerateLabels}
                  onChange={() => toggleAutoLabels(carrier.id)}
                  className="rounded text-[#5B6FF5] focus:ring-0"
                />
                <span className="text-[#111827] font-medium">Auto-generate label on order fulfillment</span>
              </label>

              <button
                onClick={() => showToast({ type: 'info', title: 'Carrier Sync', message: `Refetched live rate table from ${carrier.name}.` })}
                className="p-1.5 hover:bg-[#F8F9FC] rounded-lg text-[#6B7280]"
                title="Refresh Rates"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
