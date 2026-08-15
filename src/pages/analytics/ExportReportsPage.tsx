import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Download, FileSpreadsheet, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export const ExportReportsPage: React.FC = () => {
  const { showToast } = useApp();

  const [schedules, setSchedules] = useState([
    { id: 'exp_1', title: 'Daily Revenue & Transaction Ledger', format: 'CSV', frequency: 'Daily at 00:00 UTC', recipient: 'finance@omnicommerce.com' },
    { id: 'exp_2', title: 'Weekly Multi-Warehouse Stock Levels', format: 'Excel (XLSX)', frequency: 'Every Monday 06:00', recipient: 'logistics@omnicommerce.com' },
    { id: 'exp_3', title: 'Monthly Tax Compliance Summary', format: 'PDF', frequency: '1st of Month', recipient: 'tax-audit@omnicommerce.com' },
  ]);

  const handleDownloadNow = (title: string) => {
    showToast({
      type: 'success',
      title: 'Generating Report Archive',
      message: `Downloaded compiled report: ${title}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Scheduled Reports & Data Exporter</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Automated email schedules for GAAP financial ledgers, inventory velocity spreadsheets, and custom SQL extracts.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'New Schedule', message: 'Configuring cron data pipeline...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm"
        >
          Create Export Schedule
        </button>
      </div>

      {/* Grid of Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {schedules.map((sch) => (
          <div key={sch.id} className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FileSpreadsheet className="w-5 h-5 text-[#5B6FF5]" />
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 uppercase">{sch.format}</span>
              </div>
              <h3 className="text-sm font-bold text-[#111827]">{sch.title}</h3>
              <div className="text-xs text-[#6B7280] font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                <span>{sch.frequency}</span>
              </div>
              <div className="text-[11px] text-[#6B7280]">Target: {sch.recipient}</div>
            </div>

            <div className="pt-3 border-t border-[#E5E8F0] flex items-center justify-between">
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Active Cron
              </span>
              <button
                onClick={() => handleDownloadNow(sch.title)}
                className="text-xs font-semibold text-[#5B6FF5] hover:underline flex items-center gap-1"
              >
                <Download className="w-3 h-3" /> Download Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
