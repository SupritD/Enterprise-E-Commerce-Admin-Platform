import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, Code2, Key, Copy, CheckCircle2, RefreshCw, Plus, ExternalLink } from 'lucide-react';

export const HeadlessApiPage: React.FC = () => {
  const { showToast } = useApp();

  const [keys, setKeys] = useState([
    { id: 'key_1', name: 'Next.js Consumer Mobile App', key: 'omni_pk_live_9921094810294812', permissions: 'Storefront Read, Cart R/W, Checkout', rateLimit: '10,000 req/min', createdAt: '2 months ago' },
    { id: 'key_2', name: 'iOS Swift Native Storefront', key: 'omni_pk_live_3840192840192841', permissions: 'Storefront Read, Cart R/W, Apple Pay Tokenize', rateLimit: '10,000 req/min', createdAt: '1 month ago' },
    { id: 'key_3', name: 'POS Retail Terminal Sync', key: 'omni_sk_live_8820194810928401', permissions: 'Full Admin Inventory & Order R/W', rateLimit: '5,000 req/min', createdAt: '3 weeks ago' },
  ]);

  const [activeTab, setActiveTab] = useState<'graphql' | 'rest'>('graphql');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Headless Storefront APIs & Sandbox</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Ultra-low latency edge GraphQL and REST APIs powering Next.js, Nuxt, iOS, Android, and smart POS retail checkouts.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'success', title: 'API Key Created', message: 'Generated new scoped storefront public key.' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Generate API Key</span>
        </button>
      </div>

      {/* Active API Keys */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card p-6 space-y-4">
        <h3 className="font-bold text-sm text-[#111827]">Active API Clients & Rate Limits</h3>

        <div className="divide-y divide-[#E5E8F0] text-xs">
          {keys.map((k) => (
            <div key={k.id} className="py-3.5 flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-bold text-[#111827]">{k.name}</div>
                <div className="font-mono text-[#6B7280] flex items-center gap-2">
                  <span className="bg-[#F8F9FC] px-2 py-0.5 rounded border border-[#E5E8F0] text-[#111827]">
                    {k.key}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(k.key);
                      showToast({ type: 'success', title: 'Copied', message: 'API key copied to clipboard.' });
                    }}
                    className="text-[#5B6FF5] hover:underline"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[11px] text-[#6B7280]">
                  Scopes: {k.permissions} &bull; Limit: {k.rateLimit}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast({ type: 'info', title: 'Revoke Key', message: `Revoking ${k.name}` })}
                  className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded text-xs font-semibold"
                >
                  Revoke
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive GraphQL / REST Sandbox Code Preview */}
      <div className="bg-[#111827] rounded-xl border border-slate-800 p-6 text-white space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Code2 className="w-5 h-5 text-[#5B6FF5]" />
            <span className="font-mono font-bold text-xs">GraphQL Edge Endpoint: https://api.omnicommerce.io/v1/graphql</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast({ type: 'success', title: 'Query Executed', message: 'HTTP 200 OK (24ms response from Edge)' })}
              className="px-3 py-1 bg-[#5B6FF5] hover:bg-[#4557E0] rounded text-xs font-bold font-mono"
            >
              Run Query
            </button>
          </div>
        </div>

        <pre className="font-mono text-xs text-indigo-200 overflow-x-auto p-3 bg-slate-950 rounded-lg">
{`query GetStorefrontCatalog {
  products(first: 10, status: ACTIVE) {
    edges {
      node {
        id
        name
        slug
        price
        stock
        variants {
          id
          sku
          price
        }
      }
    }
  }
}`}
        </pre>
      </div>
    </div>
  );
};
