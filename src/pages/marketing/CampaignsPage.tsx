import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Mail, Plus, Sparkles, Send, Users, BarChart3, Clock } from 'lucide-react';

export const CampaignsPage: React.FC = () => {
  const { showToast } = useApp();
  const { campaigns } = useData();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Marketing Campaigns & Newsletters</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Automated lifecycle email blasts, SMS promotional notifications, open/click telemetry, and attribution revenue.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Blast Campaign</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((camp) => (
          <div key={camp.id} className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#111827]">{camp.name}</h3>
                  <StatusBadge status={camp.status} />
                </div>
                <div className="text-xs text-[#6B7280] mt-1 flex items-center gap-2">
                  <span className="uppercase font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100">{camp.channel}</span>
                  <span>&bull; Target: {camp.targetAudience}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 bg-[#F8F9FC] p-3 rounded-lg border border-[#E5E8F0] text-center font-mono">
              <div>
                <div className="text-[10px] text-[#6B7280] uppercase">Recipients</div>
                <div className="font-bold text-xs text-[#111827] mt-0.5">{camp.sentCount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#6B7280] uppercase">Open Rate</div>
                <div className="font-bold text-xs text-[#5B6FF5] mt-0.5">{camp.openRate}%</div>
              </div>
              <div>
                <div className="text-[10px] text-[#6B7280] uppercase">CTR</div>
                <div className="font-bold text-xs text-[#5B6FF5] mt-0.5">{camp.clickRate}%</div>
              </div>
              <div>
                <div className="text-[10px] text-[#6B7280] uppercase">Revenue</div>
                <div className="font-bold text-xs text-emerald-600 mt-0.5">${camp.attributedRevenue.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#6B7280] pt-1">
              <span>Scheduled / Sent: <strong className="text-[#111827] font-mono">{camp.scheduledDate}</strong></span>
              <button
                onClick={() => showToast({ type: 'info', title: 'Telemetry Deep-Dive', message: 'Opening heatmaps & link attribution click logs...' })}
                className="text-[#5B6FF5] font-semibold hover:underline"
              >
                View Analytics &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[#E5E8F0]">
              <h3 className="text-base font-bold text-[#111827]">Draft Broadcast Campaign</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#9CA3AF]">✕</button>
            </div>
            <p className="text-[#6B7280]">
              Specify subject line, target audience segment, and delivery schedule.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button
                onClick={() => {
                  showToast({ type: 'success', title: 'Campaign Queued', message: 'Blast scheduled for delivery.' });
                  setModalOpen(false);
                }}
                className="px-4 py-2 bg-[#5B6FF5] text-white font-semibold rounded-lg"
              >
                Queue Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
