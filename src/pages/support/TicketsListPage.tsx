import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Headphones, Search, Filter, MessageSquare, Clock, Plus, CheckCircle2 } from 'lucide-react';

export const TicketsListPage: React.FC = () => {
  const { showToast } = useApp();
  const { tickets } = useData();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = tickets.filter((t) => {
    const matchesSearch =
      t.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.customer.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Customer Support & Helpdesk</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            SLA prioritization queue, customer order context, omnichannel messages, and AI agent deflection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/support/chat"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#5B6FF5]" />
            <span>Live Chat Console</span>
          </Link>
          <Link
            to="/support/kb"
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs"
          >
            Knowledge Base
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Open Tickets</div>
          <div className="text-xl font-black text-amber-500 font-mono mt-1">
            {tickets.filter((t) => t.status === 'open' || t.status === 'in_progress').length} Active
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">First Response SLA</div>
          <div className="text-xl font-black text-emerald-600 font-mono mt-1">11 Mins</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Resolution CSAT</div>
          <div className="text-xl font-black text-[#5B6FF5] font-mono mt-1">4.9 / 5.0 ★</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">AI Auto-Deflection</div>
          <div className="text-xl font-black text-[#111827] font-mono mt-1">42.8%</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tickets by subject, #ID, or customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs outline-hidden"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] outline-hidden"
        >
          <option value="all">All Statuses</option>
          <option value="open">Open (Unassigned/New)</option>
          <option value="in_progress">In Progress</option>
          <option value="waiting_customer">Waiting on Customer</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">Ticket</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Channel</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {filtered.map((ticket) => (
              <tr
                key={ticket.id}
                onClick={() => navigate(`/support/tickets/${ticket.id}`)}
                className="hover:bg-[#F8F9FC] cursor-pointer transition-colors"
              >
                <td className="p-4 font-mono font-bold text-[#5B6FF5]">
                  {ticket.ticketNumber}
                  <div className="text-[10px] text-[#6B7280] font-normal mt-0.5">{ticket.createdAt}</div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-[#111827]">{ticket.subject}</div>
                  <div className="text-[11px] text-[#6B7280] mt-0.5 truncate max-w-sm">
                    {ticket.messages[ticket.messages.length - 1]?.message}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-semibold text-[#111827]">{ticket.customer.name}</div>
                  <div className="text-[11px] text-[#6B7280]">{ticket.customer.email}</div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      ticket.priority === 'urgent'
                        ? 'bg-rose-50 text-rose-700'
                        : ticket.priority === 'high'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-slate-100 text-[#4B5563]'
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </td>
                <td className="p-4 capitalize text-[#4B5563]">{ticket.channel}</td>
                <td className="p-4">
                  <StatusBadge status={ticket.status} />
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/support/tickets/${ticket.id}`);
                    }}
                    className="px-3 py-1 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs"
                  >
                    Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
