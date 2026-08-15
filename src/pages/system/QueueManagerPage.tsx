import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Server, RefreshCw, Play, Pause, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export const QueueManagerPage: React.FC = () => {
  const { showToast } = useApp();

  const queues = [
    { name: 'orders:fulfillment:dispatch', workers: 8, pending: 14, processing: 4, completed24h: 18420, failed: 0, status: 'healthy' },
    { name: 'notifications:email:sendgrid', workers: 12, pending: 2, processing: 1, completed24h: 42900, failed: 1, status: 'healthy' },
    { name: 'erp:sap:inventory_sync', workers: 4, pending: 0, processing: 0, completed24h: 2400, failed: 0, status: 'idle' },
    { name: 'analytics:clickstream:ingest', workers: 16, pending: 88, processing: 12, completed24h: 1840900, failed: 0, status: 'healthy' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Async Queues & Redis Background Workers</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            BullMQ job processors, dead-letter retry queues, concurrent concurrency tuning, and worker memory metrics.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'success', title: 'Redis Cache Flushed', message: 'Flushed system worker caches and restarted stalled workers.' })}
          className="px-3.5 py-1.5 bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] text-[#111827] rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#5B6FF5]" />
          <span>Flush Worker Stalls</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {queues.map((q, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-sm font-mono text-[#111827]">{q.name}</h3>
                <div className="text-[11px] text-[#6B7280] mt-0.5">{q.workers} Concurrent Node.js Workers</div>
              </div>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                {q.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E5E8F0] text-center font-mono">
              <div className="p-2 bg-[#F8F9FC] rounded-lg">
                <div className="text-[10px] text-[#6B7280]">Pending</div>
                <div className="font-bold text-xs text-[#111827]">{q.pending}</div>
              </div>
              <div className="p-2 bg-[#F8F9FC] rounded-lg">
                <div className="text-[10px] text-[#6B7280]">Processing</div>
                <div className="font-bold text-xs text-[#5B6FF5]">{q.processing}</div>
              </div>
              <div className="p-2 bg-[#F8F9FC] rounded-lg">
                <div className="text-[10px] text-[#6B7280]">24h Completed</div>
                <div className="font-bold text-xs text-emerald-600">{q.completed24h.toLocaleString()}</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => showToast({ type: 'info', title: 'Queue Paused', message: `Paused queue ${q.name}` })}
                className="px-2.5 py-1 bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] rounded text-[11px] font-semibold text-[#111827]"
              >
                Pause Queue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
