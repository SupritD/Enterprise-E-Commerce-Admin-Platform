import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingCart, Send, Clock, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AbandonedCartPage: React.FC = () => {
  const { showToast } = useApp();

  const [carts, setCarts] = useState([
    {
      id: 'cart_1',
      customer: 'David K. (david.k@gmail.com)',
      items: 'Ultra-HD Smart Noise Cancelling Headphones (1x)',
      cartValue: 349.99,
      abandonedAt: '2 hours ago',
      recoveryStatus: 'email_1_sent',
    },
    {
      id: 'cart_2',
      customer: 'Rachel Green (rachel.g@company.org)',
      items: 'Ergonomic Standing Desk Pro + Lumbar Mesh Chair (1x)',
      cartValue: 1249.00,
      abandonedAt: '14 hours ago',
      recoveryStatus: 'pending_email_2',
    },
    {
      id: 'cart_3',
      customer: 'Alex Turner (aturner@arctic.io)',
      items: 'Wireless Qi2 Fast Charging Dock (2x)',
      cartValue: 179.98,
      abandonedAt: '1 day ago',
      recoveryStatus: 'recovered',
    },
  ]);

  const handleSendRecovery = (id: string) => {
    showToast({
      type: 'success',
      title: 'Recovery Email Sent',
      message: 'Dispatched dynamic 10% discount checkout link to customer.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Abandoned Cart Recovery & Drip Sequences</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Automated multi-stage checkout recovery emails, SMS nudges, and special timed incentive coupon generators.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'Automation Pipeline', message: 'Configuring multi-step drip automation delay triggers...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm"
        >
          Configure Drip Steps
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card space-y-1">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Abandoned Value (30d)</div>
          <div className="text-xl font-black text-rose-600 font-mono">$48,290.00</div>
          <div className="text-[10px] text-[#9CA3AF]">142 checkout sessions</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card space-y-1">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Recovered Revenue</div>
          <div className="text-xl font-black text-emerald-600 font-mono">$16,840.00</div>
          <div className="text-[10px] text-emerald-600 font-semibold">34.8% recovery win rate</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card space-y-1">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Automated Sequences</div>
          <div className="text-xl font-black text-[#5B6FF5] font-mono">3 Active Steps</div>
          <div className="text-[10px] text-[#9CA3AF]">1hr, 24hr, 72hr drip intervals</div>
        </div>
      </div>

      {/* Cart Queue */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="p-4 border-b border-[#E5E8F0]">
          <h3 className="text-sm font-bold text-[#111827]">Recent Abandoned Checkouts</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase">
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Items in Abandoned Cart</th>
                <th className="p-3.5">Value ($)</th>
                <th className="p-3.5">Abandoned At</th>
                <th className="p-3.5">Recovery Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8F0]">
              {carts.map((c) => (
                <tr key={c.id} className="hover:bg-[#F8F9FC]">
                  <td className="p-3.5 font-bold text-[#111827]">{c.customer}</td>
                  <td className="p-3.5 text-[#4B5563]">{c.items}</td>
                  <td className="p-3.5 font-mono font-bold text-[#111827]">${c.cartValue.toFixed(2)}</td>
                  <td className="p-3.5 font-mono text-[#6B7280]">{c.abandonedAt}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      c.recoveryStatus === 'recovered'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {c.recoveryStatus.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    {c.recoveryStatus !== 'recovered' && (
                      <button
                        onClick={() => handleSendRecovery(c.id)}
                        className="px-2.5 py-1 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded text-xs font-semibold flex items-center gap-1 ml-auto shadow-sm"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send Nudge</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
