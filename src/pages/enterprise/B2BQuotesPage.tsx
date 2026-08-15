import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Building2, FileSpreadsheet, CheckCircle2, XCircle, DollarSign, Send, Eye } from 'lucide-react';

export const B2BQuotesPage: React.FC = () => {
  const { showToast } = useApp();
  const { b2bRFQs, updateRFQStatus } = useData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">B2B Request for Quotes (RFQ)</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Manage volume pricing requests, tiered quote negotiations, credit terms, and custom wholesale contract generation.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'New RFQ Entry', message: 'Creating manual wholesale sales quote draft...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Create Sales Quote</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">RFQ Number</th>
              <th className="p-4">Corporate Account</th>
              <th className="p-4">Items Requested</th>
              <th className="p-4">Target Budget</th>
              <th className="p-4">Offered Quote</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {b2bRFQs.map((rfq) => (
              <tr key={rfq.id} className="hover:bg-[#F8F9FC] transition-colors">
                <td className="p-4 font-mono font-bold text-[#5B6FF5]">
                  {rfq.rfqNumber}
                  <div className="text-[10px] text-[#6B7280] font-normal mt-0.5">{rfq.createdAt}</div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-[#111827]">{rfq.companyName}</div>
                  <div className="text-[11px] text-[#6B7280]">Contact: {rfq.contactPerson}</div>
                </td>
                <td className="p-4">
                  <div className="font-semibold text-[#111827]">{rfq.items.length} Product Lines</div>
                  <div className="text-[11px] text-[#6B7280] font-mono">
                    Total units: {rfq.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </div>
                </td>
                <td className="p-4 font-mono font-bold text-[#111827]">
                  ${rfq.targetBudget.toLocaleString()}
                </td>
                <td className="p-4 font-mono font-bold text-emerald-600">
                  {rfq.quotedTotal ? `$${rfq.quotedTotal.toLocaleString()}` : <span className="text-[#9CA3AF]">Pending Review</span>}
                </td>
                <td className="p-4">
                  <StatusBadge status={rfq.status} />
                </td>
                <td className="p-4 text-right">
                  {rfq.status === 'pending_review' ? (
                    <button
                      onClick={() => {
                        updateRFQStatus(rfq.id, 'quote_sent', rfq.targetBudget * 0.95);
                        showToast({ type: 'success', title: 'Quote Dispatched', message: `Official sales offer sent to ${rfq.companyName}.` });
                      }}
                      className="px-3 py-1 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-2xs"
                    >
                      Issue Quote
                    </button>
                  ) : (
                    <button
                      onClick={() => showToast({ type: 'info', title: 'View Quote', message: `Opening PDF quote contract for ${rfq.rfqNumber}` })}
                      className="px-3 py-1 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs"
                    >
                      View PDF
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
