import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Database, Clock, Download, Play, CheckCircle2, RefreshCw, Plus } from 'lucide-react';

export const BackupsCronPage: React.FC = () => {
  const { showToast } = useApp();

  const backups = [
    { id: 'bk_1', filename: 'omni_prod_db_2026_08_14_0000.sql.zst', size: '1.42 GB', type: 'Full Database & Media Snapshot', createdAt: 'Today at 00:00 UTC', status: 'verified' },
    { id: 'bk_2', filename: 'omni_prod_db_2026_08_13_0000.sql.zst', size: '1.39 GB', type: 'Full Database & Media Snapshot', createdAt: 'Yesterday at 00:00 UTC', status: 'verified' },
    { id: 'bk_3', filename: 'omni_prod_db_2026_08_12_0000.sql.zst', size: '1.38 GB', type: 'Full Database & Media Snapshot', createdAt: 'Aug 12 at 00:00 UTC', status: 'verified' },
  ];

  const cronJobs = [
    { name: 'Abandoned Cart Email Trigger', schedule: '*/15 * * * *', lastRun: '6 mins ago', nextRun: 'in 9 mins', status: 'active' },
    { name: 'Daily ERP Financial Reconciliation', schedule: '0 23 * * *', lastRun: '22 hours ago', nextRun: 'in 2 hours', status: 'active' },
    { name: 'Automated Database Snapshot to S3/GCS', schedule: '0 0 * * *', lastRun: '21 hours ago', nextRun: 'in 3 hours', status: 'active' },
    { name: 'Exchange Rates & Currency Sync', schedule: '0 */6 * * *', lastRun: '1 hour ago', nextRun: 'in 5 hours', status: 'active' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Database Backups & Cron Schedules</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Automated Point-In-Time recovery snapshots, offsite multi-cloud replication, and scheduled background task crons.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'success', title: 'Manual Backup Initiated', message: 'Creating instant Zstandard compressed database snapshot...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Database className="w-3.5 h-3.5" />
          <span>Create Instant Snapshot</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backups List */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-[#111827] flex items-center gap-2">
            <Database className="w-4 h-4 text-[#5B6FF5]" />
            Recent Database Snapshots
          </h3>

          <div className="divide-y divide-[#E5E8F0] text-xs">
            {backups.map((b) => (
              <div key={b.id} className="py-3.5 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-bold font-mono text-[#111827]">{b.filename}</div>
                  <div className="text-[11px] text-[#6B7280]">
                    {b.size} &bull; {b.createdAt}
                  </div>
                </div>

                <button
                  onClick={() => showToast({ type: 'info', title: 'Snapshot Download', message: `Downloading ${b.filename}...` })}
                  className="px-2.5 py-1 bg-[#F8F9FC] hover:bg-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5 text-[#5B6FF5]" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cron Schedules */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-[#111827] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#5B6FF5]" />
            Scheduled Task Crons
          </h3>

          <div className="divide-y divide-[#E5E8F0] text-xs">
            {cronJobs.map((cj, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-bold text-[#111827]">{cj.name}</div>
                  <div className="font-mono text-[11px] text-[#5B6FF5]">
                    Cron: {cj.schedule} &bull; Next: {cj.nextRun}
                  </div>
                </div>

                <button
                  onClick={() => showToast({ type: 'success', title: 'Cron Fired', message: `Executed ${cj.name} manually.` })}
                  className="p-1.5 text-[#6B7280] hover:text-[#111827] hover:bg-[#F8F9FC] rounded-lg"
                  title="Run Now"
                >
                  <Play className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
