import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Share2, Plus, CheckCircle2, AlertTriangle, Send, RefreshCw, Key } from 'lucide-react';

interface WebhookEndpoint {
  id: string;
  url: string;
  description: string;
  events: string[];
  status: 'active' | 'failing';
  successRate: number;
  lastFired: string;
}

export const WebhooksPage: React.FC = () => {
  const { showToast } = useApp();

  const [endpoints, setEndpoints] = useState<WebhookEndpoint[]>([
    {
      id: 'wh_1',
      url: 'https://warehouse.3pl-partner.com/api/v2/orders/inbound',
      description: '3PL Logistics Warehouse Dispatch Pipeline',
      events: ['order.created', 'order.paid', 'order.cancelled'],
      status: 'active',
      successRate: 99.98,
      lastFired: '2 mins ago (HTTP 200 OK)',
    },
    {
      id: 'wh_2',
      url: 'https://hooks.slack.com/services/T00/B00/X992109',
      description: 'Internal #vip-orders Slack Alert Bot',
      events: ['order.created (subtotal >= $500)', 'fraud.flagged'],
      status: 'active',
      successRate: 100.0,
      lastFired: '18 mins ago (HTTP 200 OK)',
    },
    {
      id: 'wh_3',
      url: 'https://taxjar.integration.omnicommerce.io/v1/sync',
      description: 'TaxJar Real-time Remittance Ingest',
      events: ['order.paid', 'refund.processed'],
      status: 'active',
      successRate: 99.9,
      lastFired: '35 mins ago (HTTP 200 OK)',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Outbound Webhooks & Event Streams</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Deliver signed HMAC-SHA256 event payloads to third-party endpoints with automated exponential backoff retries.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'New Webhook Endpoint', message: 'Opening webhook subscriber creation form...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Webhook Endpoint</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card divide-y divide-[#E5E8F0] text-xs">
        {endpoints.map((wh) => (
          <div key={wh.id} className="p-5 flex items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-sm font-mono text-[#5B6FF5]">{wh.url}</span>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  {wh.status.toUpperCase()}
                </span>
              </div>
              <div className="text-[#4B5563]">{wh.description}</div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {wh.events.map((evt, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#F8F9FC] border border-[#E5E8F0] font-mono text-[10px] text-[#111827]">
                    {evt}
                  </span>
                ))}
              </div>
              <div className="text-[11px] text-[#6B7280] font-mono pt-0.5">
                Last delivered: {wh.lastFired} &bull; Success rate: {wh.successRate}%
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast({ type: 'success', title: 'Test Ping Sent', message: `Dispatched test order.created payload to ${wh.url}. (HTTP 200)` })}
                className="px-3 py-1.5 bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] rounded-lg font-semibold text-[#111827] flex items-center gap-1.5 shadow-2xs"
              >
                <Send className="w-3 h-3 text-[#5B6FF5]" />
                <span>Send Test Ping</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
