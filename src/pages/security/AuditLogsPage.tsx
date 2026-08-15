import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Search, Download, Filter, Eye } from 'lucide-react';

interface AuditLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  ipAddress: string;
  timestamp: string;
  status: 'success' | 'denied' | 'warn';
  diffSummary: string;
}

export const AuditLogsPage: React.FC = () => {
  const { showToast } = useApp();
  const [search, setSearch] = useState('');

  const logs: AuditLog[] = [
    { id: 'log_1', actor: 'Alex Vance', action: 'DISPATCH_REFUND', target: 'Order #ORD-2026-9835 ($89.00)', ipAddress: '198.51.100.42 (US-East)', timestamp: '2026-08-14 21:12:04 UTC', status: 'success', diffSummary: 'refundStatus: pending -> processed, settledVia: Stripe' },
    { id: 'log_2', actor: 'Marcus Sterling', action: 'UPDATE_STOCK_THRESHOLD', target: 'SKU CHRONO-AERO-01 (Qty +50)', ipAddress: '198.51.100.18 (US-East)', timestamp: '2026-08-14 20:45:19 UTC', status: 'success', diffSummary: 'stock: 12 -> 62, warehouse: WH-NJ-01' },
    { id: 'log_3', actor: 'Elena Rostova', action: 'RESOLVE_TICKET', target: 'Ticket #TCK-2026-104', ipAddress: '203.0.113.88 (EU-West)', timestamp: '2026-08-14 19:30:11 UTC', status: 'success', diffSummary: 'status: in_progress -> resolved' },
    { id: 'log_4', actor: 'Unknown (Attempt)', action: 'ADMIN_LOGIN_FAILED', target: 'User admin@omnicommerce.io', ipAddress: '185.220.101.5 (TOR Exit)', timestamp: '2026-08-14 18:14:02 UTC', status: 'denied', diffSummary: 'Invalid 2FA TOTP code entered (3 attempts)' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Immutable Activity Audit Trail</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Cryptographically sealed audit logs, sensitive mutation diffs, IP geolocation tracking, and SOC2 compliance records.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'success', title: 'Audit Trail Exported', message: 'Downloading SOC2 compliance audit log archive (JSON/CSV)...' })}
          className="px-3.5 py-1.5 bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] text-[#111827] rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5 text-[#5B6FF5]" />
          <span>Export Audit Trail (CSV)</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <div className="p-4 border-b border-[#E5E8F0]">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by actor, action, or IP address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs outline-hidden"
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">Timestamp</th>
              <th className="p-4">Actor</th>
              <th className="p-4">Event Action</th>
              <th className="p-4">Target Entity</th>
              <th className="p-4">IP & Location</th>
              <th className="p-4">Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0] font-mono">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-[#F8F9FC]">
                <td className="p-4 text-[#6B7280] text-[11px]">{log.timestamp}</td>
                <td className="p-4 font-sans font-bold text-[#111827]">{log.actor}</td>
                <td className="p-4">
                  <span className="bg-slate-100 text-[#111827] px-2 py-0.5 rounded text-[10px] font-bold">
                    {log.action}
                  </span>
                </td>
                <td className="p-4 font-sans text-[#4B5563]">
                  <div className="font-semibold">{log.target}</div>
                  <div className="text-[10px] text-[#6B7280] font-mono mt-0.5">{log.diffSummary}</div>
                </td>
                <td className="p-4 text-[#6B7280] text-[11px]">{log.ipAddress}</td>
                <td className="p-4 font-sans">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      log.status === 'success'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
