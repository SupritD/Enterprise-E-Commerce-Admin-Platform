import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  ArrowLeft,
  Send,
  Headphones,
  User,
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  Package,
  RotateCcw,
} from 'lucide-react';

export const TicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const { tickets, addTicketMessage, updateTicketStatus } = useData();

  const ticket = tickets.find((t) => t.id === id) || tickets[0];
  const [replyText, setReplyText] = useState('');

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    addTicketMessage(ticket.id, replyText, 'agent');
    setReplyText('');
    showToast({ type: 'success', title: 'Reply Sent', message: 'Customer notified via email & webhook.' });
  };

  const handleResolve = () => {
    updateTicketStatus(ticket.id, 'resolved');
    showToast({ type: 'success', title: 'Ticket Resolved', message: 'Ticket closed and CSAT survey dispatched.' });
  };

  const handleAiSuggest = () => {
    setReplyText(
      `Hello ${ticket.customer.name},\n\nThank you for contacting OmniCommerce Support. I have looked into your order and verified the tracking details. The package is scheduled for delivery today by 4:30 PM. Please let us know if there is anything else we can assist you with!\n\nBest regards,\nOmniCommerce Lead Support`
    );
    showToast({ type: 'info', title: 'AI Copilot Drafted', message: 'Generated contextual solution based on order tracking telemetry.' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/support/tickets')}
            className="p-2 rounded-lg bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] text-[#6B7280] shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold text-[#111827] tracking-tight">{ticket.ticketNumber}</h1>
              <StatusBadge status={ticket.status} />
            </div>
            <p className="text-xs text-[#6B7280] mt-0.5 font-medium">{ticket.subject}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {ticket.status !== 'resolved' && (
            <button
              onClick={handleResolve}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark as Resolved</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Conversation Thread */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">Message Thread</h3>

            <div className="space-y-4">
              {ticket.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                    msg.senderRole === 'agent'
                      ? 'bg-indigo-50/60 border-indigo-100 ml-6'
                      : 'bg-[#F8F9FC] border-[#E5E8F0] mr-6'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#111827] flex items-center gap-1.5">
                      {msg.senderRole === 'agent' ? (
                        <Headphones className="w-3.5 h-3.5 text-[#5B6FF5]" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-[#6B7280]" />
                      )}
                      <span>{msg.senderName}</span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-white text-[#6B7280]">
                        {msg.senderRole}
                      </span>
                    </span>
                    <span className="text-[10px] text-[#6B7280] font-mono">{msg.timestamp}</span>
                  </div>

                  <p className="text-[#374151] whitespace-pre-line leading-relaxed">{msg.message}</p>
                </div>
              ))}
            </div>

            {/* Reply Composer */}
            <form onSubmit={handleSendReply} className="pt-4 border-t border-[#E5E8F0] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#111827]">Agent Reply</span>
                <button
                  type="button"
                  onClick={handleAiSuggest}
                  className="px-2.5 py-1 rounded bg-indigo-50 text-[#5B6FF5] text-[11px] font-bold flex items-center gap-1 hover:bg-indigo-100"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI Copilot Smart Reply</span>
                </button>
              </div>

              <textarea
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your official support response or paste internal macros..."
                className="w-full p-3 bg-[#F8F9FC] border border-[#E5E8F0] rounded-xl text-xs text-[#111827] outline-hidden focus:border-[#5B6FF5]"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Response</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Customer Summary */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#111827]">Customer 360 Context</h3>
            <div className="space-y-1">
              <div className="font-bold text-[#111827]">{ticket.customer.name}</div>
              <div className="text-[#6B7280]">{ticket.customer.email}</div>
            </div>

            {ticket.orderNumber && (
              <div className="pt-3 border-t border-[#E5E8F0] space-y-1">
                <div className="text-[#6B7280]">Associated Order:</div>
                <Link to={`/orders`} className="font-mono font-bold text-[#5B6FF5] hover:underline">
                  {ticket.orderNumber}
                </Link>
              </div>
            )}

            <div className="pt-3 border-t border-[#E5E8F0] space-y-2">
              <Link
                to="/orders/manual/new"
                className="w-full py-2 bg-[#F8F9FC] hover:bg-[#E5E8F0] rounded-lg font-semibold text-[#111827] flex items-center justify-center gap-1.5"
              >
                <Package className="w-3.5 h-3.5 text-[#5B6FF5]" />
                <span>Issue Replacement Order</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
