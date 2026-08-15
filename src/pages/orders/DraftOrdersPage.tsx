import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { FileEdit, Plus, Search, Send, Trash2, ArrowRight } from 'lucide-react';

export const DraftOrdersPage: React.FC = () => {
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [drafts, setDrafts] = useState([
    {
      id: 'dft_1',
      draftNumber: 'DFT-2026-001',
      customer: 'Apex Global Logistics (Corporate)',
      itemsCount: 15,
      total: 4890.00,
      createdAt: '2026-08-14 09:30',
      status: 'invoice_sent',
    },
    {
      id: 'dft_2',
      draftNumber: 'DFT-2026-002',
      customer: 'Sophia Chen',
      itemsCount: 2,
      total: 349.99,
      createdAt: '2026-08-13 16:20',
      status: 'draft',
    },
  ]);

  const handleSendInvoice = (id: string) => {
    showToast({
      type: 'success',
      title: 'Invoice Sent',
      message: 'Payment checkout link emailed with Net-30 credit terms.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Draft Orders & Custom Quotes</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Pending wholesale bids, unconfirmed telephone sales, and dynamic checkout invoice links.
          </p>
        </div>

        <Link
          to="/orders/manual/new"
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Draft / Quote</span>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase">
                <th className="p-3.5">Draft Number</th>
                <th className="p-3.5">Customer / Organization</th>
                <th className="p-3.5">Items</th>
                <th className="p-3.5">Created Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Total ($)</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8F0]">
              {drafts.map((d) => (
                <tr key={d.id} className="hover:bg-[#F8F9FC]">
                  <td className="p-3.5 font-mono font-bold text-[#5B6FF5]">{d.draftNumber}</td>
                  <td className="p-3.5 font-semibold text-[#111827]">{d.customer}</td>
                  <td className="p-3.5 font-mono text-[#6B7280]">{d.itemsCount} units</td>
                  <td className="p-3.5 font-mono text-[#6B7280]">{d.createdAt}</td>
                  <td className="p-3.5">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="p-3.5 font-mono font-bold text-right text-[#111827]">${d.total.toFixed(2)}</td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleSendInvoice(d.id)}
                        className="px-2.5 py-1 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded text-xs font-semibold text-[#111827] flex items-center gap-1 shadow-2xs"
                      >
                        <Send className="w-3 h-3 text-[#5B6FF5]" />
                        <span>Send Link</span>
                      </button>
                      <button
                        onClick={() => {
                          showToast({ type: 'success', title: 'Draft Converted', message: 'Order converted to active sales record.' });
                          setDrafts(drafts.filter((item) => item.id !== d.id));
                        }}
                        className="px-2.5 py-1 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded text-xs font-semibold"
                      >
                        Convert
                      </button>
                    </div>
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
