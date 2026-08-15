import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  Plus,
  Truck,
  DollarSign,
  MapPin,
  CheckCircle2,
  Trash2,
  Edit2,
} from 'lucide-react';

interface ShippingRate {
  id: string;
  name: string;
  type: 'flat' | 'weight_based' | 'price_based' | 'carrier_calculated';
  price: number;
  deliveryEstimate: string;
  minCondition?: number;
  maxCondition?: number;
}

interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  rates: ShippingRate[];
}

export const ShippingZonesPage: React.FC = () => {
  const { showToast } = useApp();

  const [zones, setZones] = useState<ShippingZone[]>([
    {
      id: 'zone_domestic',
      name: 'United States (Domestic 50 States)',
      countries: ['United States'],
      rates: [
        { id: 'rate_1', name: 'Standard Ground (Free > $100)', type: 'price_based', price: 0.0, deliveryEstimate: '3-5 Business Days', minCondition: 100 },
        { id: 'rate_2', name: 'Standard Ground Shipping', type: 'flat', price: 8.99, deliveryEstimate: '3-5 Business Days' },
        { id: 'rate_3', name: 'FedEx 2-Day Air Express', type: 'flat', price: 18.5, deliveryEstimate: '2 Business Days' },
        { id: 'rate_4', name: 'Priority Overnight (Next-Day Morning)', type: 'flat', price: 34.0, deliveryEstimate: 'Next Business Morning' },
      ],
    },
    {
      id: 'zone_eu',
      name: 'European Union & United Kingdom',
      countries: ['Germany', 'France', 'United Kingdom', 'Italy', 'Spain', 'Netherlands', 'Sweden'],
      rates: [
        { id: 'rate_eu_1', name: 'DHL Express Worldwide (DDP Taxes Paid)', type: 'weight_based', price: 28.0, deliveryEstimate: '2-4 Business Days' },
        { id: 'rate_eu_2', name: 'Standard International Postal', type: 'flat', price: 14.5, deliveryEstimate: '7-12 Business Days' },
      ],
    },
    {
      id: 'zone_apac',
      name: 'Asia-Pacific (APAC Zone 1)',
      countries: ['Japan', 'Singapore', 'Australia', 'South Korea', 'New Zealand'],
      rates: [
        { id: 'rate_apac_1', name: 'DHL International Priority', type: 'carrier_calculated', price: 35.0, deliveryEstimate: '3-5 Business Days' },
      ],
    },
  ]);

  const [selectedZone, setSelectedZone] = useState<ShippingZone>(zones[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newRateName, setNewRateName] = useState('');
  const [newRatePrice, setNewRatePrice] = useState('12.00');
  const [newDelivery, setNewDelivery] = useState('2-3 Business Days');

  const handleAddRate = (e: React.FormEvent) => {
    e.preventDefault();
    const newRate: ShippingRate = {
      id: `rate_${Date.now()}`,
      name: newRateName,
      type: 'flat',
      price: parseFloat(newRatePrice) || 0,
      deliveryEstimate: newDelivery,
    };

    const updated = zones.map((z) => {
      if (z.id === selectedZone.id) {
        return { ...z, rates: [...z.rates, newRate] };
      }
      return z;
    });

    setZones(updated);
    setSelectedZone({ ...selectedZone, rates: [...selectedZone.rates, newRate] });
    showToast({ type: 'success', title: 'Rate Added', message: `Added ${newRateName} to ${selectedZone.name}.` });
    setModalOpen(false);
    setNewRateName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Shipping Zones & Delivery Rates</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Configure country/regional delivery tiers, weight matrices, cart subsidy rules, and real-time carrier calculations.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'New Geographic Zone', message: 'Opening geographic boundary selector...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Shipping Zone</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Zones List */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider px-1">Configured Geographic Zones</div>
          {zones.map((z) => (
            <div
              key={z.id}
              onClick={() => setSelectedZone(z)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedZone.id === z.id
                  ? 'bg-white border-[#5B6FF5] shadow-card ring-2 ring-[#5B6FF5]/10'
                  : 'bg-white border-[#E5E8F0] hover:bg-[#F8F9FC]'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs text-[#111827]">{z.name}</h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  {z.rates.length} rates
                </span>
              </div>
              <div className="text-[11px] text-[#6B7280] mt-1 truncate">
                {z.countries.join(', ')}
              </div>
            </div>
          ))}
        </div>

        {/* Right Rates for Selected Zone */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E8F0]">
              <div>
                <h3 className="text-base font-bold text-[#111827]">{selectedZone.name}</h3>
                <div className="text-xs text-[#6B7280] mt-0.5">
                  Applied to {selectedZone.countries.length} countries & territories
                </div>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="px-3 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Rate Option</span>
              </button>
            </div>

            {/* Rates Table */}
            <div className="divide-y divide-[#E5E8F0] text-xs">
              {selectedZone.rates.map((rate) => (
                <div key={rate.id} className="py-3.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#111827] flex items-center gap-2">
                      <span>{rate.name}</span>
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 text-[#4B5563]">
                        {rate.type.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#6B7280] font-mono">
                      Transit: {rate.deliveryEstimate}
                      {rate.minCondition && ` &bull; Requires Min. $${rate.minCondition} Cart`}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="font-mono font-bold text-sm text-[#111827]">
                      {rate.price === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${rate.price.toFixed(2)}`}
                    </div>
                    <button
                      onClick={() => showToast({ type: 'info', title: 'Edit Rate', message: `Editing rate ${rate.name}` })}
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
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[#E5E8F0]">
              <h3 className="text-base font-bold text-[#111827]">Add Shipping Rate Tier</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#9CA3AF]">✕</button>
            </div>

            <form onSubmit={handleAddRate} className="space-y-4">
              <div>
                <label className="block font-semibold text-[#111827] mb-1">Rate Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Express 2-Day Air"
                  value={newRateName}
                  onChange={(e) => setNewRateName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Rate Fee ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newRatePrice}
                  onChange={(e) => setNewRatePrice(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Estimated Transit Time</label>
                <input
                  type="text"
                  required
                  value={newDelivery}
                  onChange={(e) => setNewDelivery(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#5B6FF5] text-white font-semibold rounded-lg">Add Shipping Rate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
