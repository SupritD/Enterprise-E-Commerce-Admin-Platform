import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import {
  Activity,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  CreditCard,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Package,
  Send,
  User,
  ArrowRight,
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  orderNumber: string;
  orderId: string;
  customerName: string;
  type: 'payment' | 'fulfillment' | 'shipping' | 'return' | 'fraud' | 'support';
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

export const OrderTimelinePage: React.FC = () => {
  const { showToast } = useApp();
  const { orders } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');

  // Synthesize realistic live event stream from orders
  const events: TimelineEvent[] = [
    {
      id: 'evt-1',
      orderNumber: '#ORD-9821',
      orderId: orders[0]?.id || '1',
      customerName: 'Sarah Jenkins',
      type: 'shipping',
      title: 'Carrier Out for Delivery',
      description: 'FedEx courier scanned package onto final delivery van in Austin, TX.',
      timestamp: '10 mins ago',
      user: 'FedEx Webhook API',
    },
    {
      id: 'evt-2',
      orderNumber: '#ORD-9820',
      orderId: orders[1]?.id || '2',
      customerName: 'Michael Chen',
      type: 'fulfillment',
      title: 'Warehouse Picking Completed',
      description: 'Items gathered from Zone B-14 and verified into Packing Station #4.',
      timestamp: '24 mins ago',
      user: 'WMS Robot Station 03',
    },
    {
      id: 'evt-3',
      orderNumber: '#ORD-9819',
      orderId: orders[2]?.id || '3',
      customerName: 'Elena Rostova',
      type: 'payment',
      title: 'Payment Settled via Stripe',
      description: 'Captured $480.00 via 3D Secure 2.0 (Visa ending in 4242).',
      timestamp: '42 mins ago',
      user: 'Stripe Gateway Ingress',
    },
    {
      id: 'evt-4',
      orderNumber: '#ORD-9818',
      orderId: orders[3]?.id || '4',
      customerName: 'David Kim',
      type: 'fraud',
      title: 'AI Fraud Check Passed',
      description: 'Heuristic risk score: 12/100 (Low Risk, clean IP geo-match).',
      timestamp: '1 hour ago',
      user: 'Risk Engine AI',
    },
    {
      id: 'evt-5',
      orderNumber: '#ORD-9817',
      orderId: orders[0]?.id || '1',
      customerName: 'Lucas Vance',
      type: 'return',
      title: 'RMA Return Request Opened',
      description: 'Customer requested size exchange for SKU-TECH-01 (Awaiting QC).',
      timestamp: '2 hours ago',
      user: 'Self-Serve Customer Portal',
    },
    {
      id: 'evt-6',
      orderNumber: '#ORD-9816',
      orderId: orders[1]?.id || '2',
      customerName: 'Amara Okafor',
      type: 'shipping',
      title: 'Package Dispatched from Central Dock',
      description: 'Tendered to UPS Worldwide Express manifest #MN-48201.',
      timestamp: '3 hours ago',
      user: 'Carrier Dock Scanner',
    },
  ];

  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = eventTypeFilter === 'all' || evt.type === eventTypeFilter;
    return matchesSearch && matchesType;
  });

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="w-4 h-4 text-emerald-500" />;
      case 'fulfillment':
        return <Package className="w-4 h-4 text-[#5B6FF5]" />;
      case 'shipping':
        return <Truck className="w-4 h-4 text-indigo-500" />;
      case 'return':
        return <RotateCcw className="w-4 h-4 text-amber-500" />;
      case 'fraud':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      default:
        return <Activity className="w-4 h-4 text-[#6B7280]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Order Activity & Audit Timeline</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Real-time streaming chronological ledger of order state transitions, carrier webhooks, and payment logs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Stream Connected</span>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Recorded Events (24h)"
          value="1,492 Events"
          change={12.4}
          icon={<Activity className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Carrier Webhooks Processed"
          value="840 Hits"
          change={6.1}
          icon={<Truck className="w-4 h-4 text-indigo-500" />}
        />
        <StatCard
          title="Avg Transition Time"
          value="18 mins"
          change={-24.0}
          icon={<Clock className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Fraud/Policy Flags"
          value="0 Blocked"
          change={0}
          icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-4 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order #, customer, event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
          />
        </div>

        <div className="flex items-center bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg p-1 text-xs">
          {(['all', 'payment', 'fulfillment', 'shipping', 'return', 'fraud'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setEventTypeFilter(type)}
              className={`px-3 py-1 rounded-md capitalize font-medium transition-colors ${
                eventTypeFilter === type
                  ? 'bg-white text-[#5B6FF5] shadow-2xs font-semibold'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Activity Timeline */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card">
        <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E8F0]">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="relative group">
              {/* Event Dot */}
              <div className="absolute -left-[30px] top-0 w-6 h-6 rounded-full bg-white border-2 border-[#5B6FF5] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                {getEventIcon(evt.type)}
              </div>

              {/* Event Content Card */}
              <div className="bg-[#F8F9FC] group-hover:bg-white border border-[#E5E8F0] rounded-xl p-4 transition-all duration-150 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/orders/${evt.orderId}`}
                      className="font-mono font-bold text-xs text-[#5B6FF5] hover:underline"
                    >
                      {evt.orderNumber}
                    </Link>
                    <span className="text-[#9CA3AF]">&bull;</span>
                    <span className="font-bold text-xs text-[#111827]">{evt.title}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm bg-[#EEF2FF] text-[#5B6FF5]">
                      {evt.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-[#6B7280]">
                    <div className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                      <span>{evt.timestamp}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">{evt.description}</p>

                <div className="mt-3 pt-3 border-t border-[#E5E8F0] flex items-center justify-between text-[11px] text-[#6B7280]">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    <span>Customer: <strong className="text-[#111827]">{evt.customerName}</strong></span>
                  </div>
                  <div className="font-mono text-[10px] text-[#9CA3AF]">
                    Triggered by: {evt.user}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
