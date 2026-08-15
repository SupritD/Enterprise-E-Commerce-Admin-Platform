import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Truck, MapPin, CheckCircle2, Clock, Search, ArrowRight, ExternalLink, RefreshCw } from 'lucide-react';

interface TrackingShipment {
  trackingNumber: string;
  orderNumber: string;
  carrier: string;
  destination: string;
  recipient: string;
  status: 'delivered' | 'in_transit' | 'out_for_delivery' | 'exception';
  eta: string;
  lastCheckpoint: string;
  events: Array<{ time: string; location: string; description: string }>;
}

export const TrackingPage: React.FC = () => {
  const { showToast } = useApp();
  const [search, setSearch] = useState('');

  const shipments: TrackingShipment[] = [
    {
      trackingNumber: '7849-2910-4491',
      orderNumber: 'ORD-2026-9841',
      carrier: 'FedEx Express',
      destination: 'Austin, TX 78701',
      recipient: 'Marcus Aurelius',
      status: 'out_for_delivery',
      eta: 'Today by 4:30 PM',
      lastCheckpoint: 'Austin Sort Facility - Loaded on delivery vehicle',
      events: [
        { time: 'Aug 14, 08:15 AM', location: 'Austin, TX', description: 'On FedEx vehicle for delivery' },
        { time: 'Aug 14, 04:30 AM', location: 'Austin, TX', description: 'At local FedEx facility' },
        { time: 'Aug 13, 11:20 PM', location: 'Memphis, TN', description: 'Departed FedEx Hub' },
        { time: 'Aug 13, 03:45 PM', location: 'Secaucus, NJ', description: 'Picked up by carrier from OmniCommerce NJ Hub' },
      ],
    },
    {
      trackingNumber: '1Z9999999999999999',
      orderNumber: 'ORD-2026-9840',
      carrier: 'UPS Ground',
      destination: 'Seattle, WA 98101',
      recipient: 'Elena Rostova',
      status: 'in_transit',
      eta: 'Aug 16, 2026',
      lastCheckpoint: 'Hodgkins, IL Hub - In Transit',
      events: [
        { time: 'Aug 14, 01:10 AM', location: 'Hodgkins, IL', description: 'Departure scan' },
        { time: 'Aug 13, 06:30 PM', location: 'Secaucus, NJ', description: 'Origin scan' },
      ],
    },
    {
      trackingNumber: 'DHL-8921-9941',
      orderNumber: 'ORD-2026-9839',
      carrier: 'DHL Express',
      destination: 'London, UK EC1A 1BB',
      recipient: 'Arthur Pendelton',
      status: 'delivered',
      eta: 'Delivered Aug 13',
      lastCheckpoint: 'London Heathrow - Delivered and signed by A. Pendelton',
      events: [
        { time: 'Aug 13, 02:15 PM', location: 'London, UK', description: 'Delivered - Signed by Arthur' },
        { time: 'Aug 13, 07:00 AM', location: 'London, UK', description: 'With delivery courier' },
        { time: 'Aug 12, 09:30 PM', location: 'East Midlands, UK', description: 'Customs cleared' },
      ],
    },
  ];

  const [selected, setSelected] = useState<TrackingShipment>(shipments[0]);

  const filtered = shipments.filter(
    (s) =>
      s.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.recipient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Real-Time Parcel Tracking Telemetry</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Monitor active carrier delivery webhooks, transit milestones, SLA performance, and exception alerts.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'Carrier Webhooks Polled', message: 'Syncing live GPS telemetry from FedEx, UPS & DHL...' })}
          className="px-3.5 py-1.5 bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] text-[#111827] rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#5B6FF5]" />
          <span>Refresh All Carrier Telemetry</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tracking # or order..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-xs outline-hidden"
            />
          </div>

          <div className="space-y-2.5">
            {filtered.map((s) => (
              <div
                key={s.trackingNumber}
                onClick={() => setSelected(s)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selected.trackingNumber === s.trackingNumber
                    ? 'bg-white border-[#5B6FF5] shadow-card ring-2 ring-[#5B6FF5]/10'
                    : 'bg-white border-[#E5E8F0] hover:bg-[#F8F9FC]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#111827]">{s.orderNumber}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      s.status === 'delivered'
                        ? 'bg-emerald-50 text-emerald-700'
                        : s.status === 'out_for_delivery'
                        ? 'bg-indigo-50 text-indigo-700 animate-pulse'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {s.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#5B6FF5] font-semibold mt-1">
                  {s.carrier} &bull; {s.trackingNumber}
                </div>
                <div className="text-[11px] text-[#6B7280] mt-1 flex items-center justify-between">
                  <span>To: {s.recipient}</span>
                  <span className="font-semibold text-[#111827]">ETA: {s.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Detail Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-[#E5E8F0]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#111827]">{selected.carrier}</h3>
                  <span className="font-mono text-xs text-[#5B6FF5] font-bold">{selected.trackingNumber}</span>
                </div>
                <div className="text-xs text-[#6B7280] mt-1">
                  Destination: <strong className="text-[#111827]">{selected.destination}</strong> ({selected.recipient})
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-[#6B7280]">Expected Arrival</div>
                <div className="text-sm font-bold font-mono text-[#111827]">{selected.eta}</div>
              </div>
            </div>

            {/* Visual Milestones */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Live Checkpoint History</h4>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E8F0]">
                {selected.events.map((evt, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        idx === 0 ? 'bg-[#5B6FF5] ring-2 ring-[#5B6FF5]/20' : 'bg-[#9CA3AF]'
                      }`}
                    />
                    <div className="text-xs font-bold text-[#111827]">{evt.description}</div>
                    <div className="text-[11px] text-[#6B7280] font-mono mt-0.5">
                      {evt.time} &bull; {evt.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
