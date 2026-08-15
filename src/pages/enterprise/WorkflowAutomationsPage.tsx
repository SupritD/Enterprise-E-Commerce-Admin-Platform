import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { Zap, Plus, ToggleLeft, ToggleRight, CheckCircle2, AlertCircle, ArrowRight, Play } from 'lucide-react';

export const WorkflowAutomationsPage: React.FC = () => {
  const { showToast } = useApp();
  const { workflows, toggleWorkflow } = useData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Enterprise Workflow Automations</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Event-driven triggers, conditional business logic, order routing, fraud holds, and ERP sync automation.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'Workflow Builder', message: 'Opening visual node automation builder canvas...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>New Workflow Automation</span>
        </button>
      </div>

      <div className="space-y-4">
        {workflows.map((wf) => (
          <div key={wf.id} className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#5B6FF5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#111827]">{wf.name}</h3>
                    <div className="text-[11px] text-[#6B7280]">{wf.description}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    toggleWorkflow(wf.id);
                    showToast({ type: 'info', title: 'Workflow Toggled', message: `${wf.name} status changed.` });
                  }}
                  className={wf.status === 'active' ? 'text-emerald-600' : 'text-[#6B7280]'}
                >
                  {wf.status === 'active' ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
                </button>
              </div>
            </div>

            {/* Visual Node Chain */}
            <div className="p-3 bg-[#F8F9FC] rounded-lg border border-[#E5E8F0] flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-100 text-[#5B6FF5] font-bold">
                ⚡ ON: {wf.trigger}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
              <span className="px-2.5 py-1 rounded bg-amber-50 border border-amber-100 text-amber-800 font-medium">
                IF: {wf.conditions.join(' & ')}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
              <span className="px-2.5 py-1 rounded bg-emerald-50 border border-emerald-100 text-emerald-800 font-bold">
                DO: {wf.actions.join(', ')}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#6B7280] font-mono">
                {wf.runs24h.toLocaleString()} executions in last 24h &bull; {wf.successRate}% success rate
              </span>
              <button
                onClick={() => showToast({ type: 'success', title: 'Manual Run Dispatched', message: `Triggered test run for ${wf.name}` })}
                className="px-3 py-1 bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] rounded-lg font-semibold text-[#111827] flex items-center gap-1.5 shadow-2xs"
              >
                <Play className="w-3 h-3 text-emerald-600" />
                <span>Test Execution</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
