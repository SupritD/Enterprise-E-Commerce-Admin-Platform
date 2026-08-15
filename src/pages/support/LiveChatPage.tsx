import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Send, User, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';

export const LiveChatPage: React.FC = () => {
  const { showToast } = useApp();

  const [activeSession, setActiveSession] = useState({
    id: 'chat_991',
    customerName: 'Victoria Sterling',
    customerEmail: 'victoria.s@sterlingholdings.com',
    location: 'Zurich, Switzerland',
    cartValue: '$1,299.00 (Aerospace Titanium Chrono in Cart)',
    status: 'active',
  });

  const [messages, setMessages] = useState([
    { id: '1', sender: 'customer', text: 'Hi, I am looking to purchase 5 units of the Titanium Chronometer for our corporate board. Do you provide engraved customization and B2B invoice terms?', time: '2:14 PM' },
    { id: '2', sender: 'agent', text: 'Hello Victoria! Absolutely. We offer laser engraving and can generate a custom B2B corporate invoice with Net-30 terms right now.', time: '2:15 PM' },
  ]);

  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { id: Date.now().toString(), sender: 'agent', text: input, time: 'Just now' }]);
    setInput('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">OmniChat Live Agent Console</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Real-time customer messaging, live cart inspection, co-browsing, and AI sales assistance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Chat Thread */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E8F0] shadow-card flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between bg-[#F8F9FC]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-xs text-[#111827]">{activeSession.customerName}</span>
              <span className="text-[11px] text-[#6B7280]">({activeSession.location})</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              CONNECTED
            </span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`p-3 rounded-xl max-w-md text-xs ${
                  m.sender === 'agent'
                    ? 'ml-auto bg-[#5B6FF5] text-white'
                    : 'mr-auto bg-[#F8F9FC] border border-[#E5E8F0] text-[#111827]'
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
                <div className={`text-[10px] font-mono mt-1 ${m.sender === 'agent' ? 'text-indigo-200' : 'text-[#9CA3AF]'}`}>
                  {m.time}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-[#E5E8F0] bg-white flex gap-2">
            <input
              type="text"
              placeholder="Type message to visitor..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs outline-hidden"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>

        {/* Live Visitor Context */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 text-xs">
          <h3 className="font-bold text-sm text-[#111827]">Live Customer Telemetry</h3>
          <div className="space-y-1">
            <div className="font-bold text-[#111827]">{activeSession.customerName}</div>
            <div className="text-[#6B7280]">{activeSession.customerEmail}</div>
          </div>

          <div className="pt-3 border-t border-[#E5E8F0] space-y-2">
            <div className="text-[#6B7280] font-semibold flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-[#5B6FF5]" />
              <span>Active Cart Status:</span>
            </div>
            <div className="p-2.5 bg-[#F8F9FC] rounded-lg border border-[#E5E8F0] font-mono font-bold text-[#111827]">
              {activeSession.cartValue}
            </div>
          </div>

          <button
            onClick={() => showToast({ type: 'success', title: 'Coupon Pushed', message: 'Dispatched 10% VIP corporate discount directly into visitor browser cart.' })}
            className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-[#5B6FF5] font-bold rounded-lg flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Push 10% Closing Discount</span>
          </button>
        </div>
      </div>
    </div>
  );
};
