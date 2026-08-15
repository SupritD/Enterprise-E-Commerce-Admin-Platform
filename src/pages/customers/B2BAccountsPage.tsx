import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Plus, DollarSign, FileText, CheckCircle2 } from 'lucide-react';

export const B2BAccountsPage: React.FC = () => {
  const { showToast } = useApp();
  const [accounts, setAccounts] = useState([
    {
      id: 'b2b_1',
      company: 'Apex Global Logistics Corp',
      taxId: 'US-84920419',
      creditLimit: 50000,
      outstandingBalance: 12450.00,
      paymentTerms: 'Net-30 Days',
      status: 'active',
      contactName: 'James Wilson',
    },
    {
      id: 'b2b_2',
      company: 'Vanguard Industrial Supply',
      taxId: 'US-99201942',
      creditLimit: 25000,
      outstandingBalance: 3200.00,
      paymentTerms: 'Net-60 Days',
      status: 'active',
      contactName: 'Elena Rostova',
    },
    {
      id: 'b2b_3',
      company: 'Solstice Tech Labs',
      taxId: 'US-10294821',
      creditLimit: 15000,
      outstandingBalance: 14890.00,
      paymentTerms: 'Net-15 Days',
      status: 'near_limit',
      contactName: 'Michael Chang',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">B2B Corporate Credit Facilities</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Corporate wholesale accounts, tax exemption certificates, net payment terms, and credit risk limits.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'Corporate Application', message: 'Opening B2B account onboarding wizard...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Corporate Account</span>
        </button>
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase">
                <th className="p-3.5">Company & Primary Contact</th>
                <th className="p-3.5">Tax EIN ID</th>
                <th className="p-3.5">Credit Line</th>
                <th className="p-3.5">Outstanding Balance</th>
                <th className="p-3.5">Payment Terms</th>
                <th className="p-3.5">Credit Health</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8F0]">
              {accounts.map((acc) => {
                const util = (acc.outstandingBalance / acc.creditLimit) * 100;
                return (
                  <tr key={acc.id} className="hover:bg-[#F8F9FC]">
                    <td className="p-3.5">
                      <div className="font-bold text-[#111827]">{acc.company}</div>
                      <div className="text-[11px] text-[#6B7280]">{acc.contactName}</div>
                    </td>
                    <td className="p-3.5 font-mono text-[#6B7280]">{acc.taxId}</td>
                    <td className="p-3.5 font-mono font-bold text-[#111827]">${acc.creditLimit.toLocaleString()}</td>
                    <td className="p-3.5 font-mono text-rose-600 font-semibold">${acc.outstandingBalance.toLocaleString()}</td>
                    <td className="p-3.5 font-semibold text-[#111827]">{acc.paymentTerms}</td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${util}%` }}
                            className={`h-full ${util > 80 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-[#6B7280]">{util.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => showToast({ type: 'success', title: 'Invoice Dispatched', message: `Dispatched statement of account to ${acc.company}.` })}
                        className="px-2.5 py-1 bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] rounded text-xs font-semibold text-[#111827] shadow-2xs"
                      >
                        Statement
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
