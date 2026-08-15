import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { ShieldAlert, Sparkles, CheckCircle2, XCircle, AlertTriangle, ToggleLeft, ToggleRight, Plus } from 'lucide-react';

export const FraudDetectionPage: React.FC = () => {
  const { showToast } = useApp();
  const { fraudRules } = useData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">AI Fraud Detection & Risk Scoring</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Machine learning behavioral anomaly detection, proxy/VPN scrutiny, card velocity thresholds, and automatic hold queues.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'New Fraud Rule', message: 'Opening fraud heuristics builder...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Add Custom Heuristic Rule</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Orders Scanned (30d)</div>
          <div className="text-xl font-black text-[#111827] font-mono mt-1">19,820</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Blocked Fraud Volume</div>
          <div className="text-xl font-black text-emerald-600 font-mono mt-1">$41,200.00</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">Manual Review Queue</div>
          <div className="text-xl font-black text-amber-500 font-mono mt-1">2 Orders</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E5E8F0] shadow-card">
          <div className="text-[11px] font-bold text-[#6B7280] uppercase">False Positive Rate</div>
          <div className="text-xl font-black text-[#5B6FF5] font-mono mt-1">&lt; 0.02%</div>
        </div>
      </div>

      {/* Fraud Rules List */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card divide-y divide-[#E5E8F0] text-xs">
        {fraudRules.map((rule) => (
          <div key={rule.id} className="p-4 flex items-center justify-between hover:bg-[#F8F9FC] transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#111827]">{rule.name}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-100 text-[#4B5563]">
                  Score +{rule.riskScoreIncrement ?? rule.riskScoreContribution ?? 25} pts
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    rule.action === 'auto_block'
                      ? 'bg-rose-50 text-rose-700'
                      : rule.action === 'flag_for_review'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-indigo-50 text-indigo-700'
                  }`}
                >
                  Action: {(rule.action || 'review').replace('_', ' ')}
                </span>
              </div>
              <div className="text-[11px] text-[#6B7280] font-mono">Condition: {rule.condition}</div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] font-mono text-[#6B7280]">{(rule.triggered24h ?? 12)} triggers (24h)</span>
              <button className="text-emerald-600">
                <ToggleRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
