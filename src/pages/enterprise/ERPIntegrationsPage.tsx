import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, ExternalLink, Settings } from 'lucide-react';

export const ERPIntegrationsPage: React.FC = () => {
  const { showToast } = useApp();

  const [integrations, setIntegrations] = useState([
    {
      id: 'erp_sap',
      name: 'SAP S/4HANA Enterprise Cloud',
      type: 'ERP & Master Data',
      status: 'connected',
      syncInterval: 'Real-time Webhook + Hourly Batch',
      lastSync: '4 minutes ago',
      stats: '1,420 orders synced today &bull; 0 payload errors',
      entities: ['Inventory Levels', 'GL Journal Entries', 'Sales Orders', 'Vendor Master'],
    },
    {
      id: 'erp_netsuite',
      name: 'Oracle NetSuite OneWorld',
      type: 'ERP & Multi-Currency Ledger',
      status: 'connected',
      syncInterval: '15 Minutes Bi-directional',
      lastSync: '12 minutes ago',
      stats: 'B2B Corporate Invoices & RMA Credit Memos',
      entities: ['Item Master', 'Purchase Orders', 'Credit Memos', 'Customer Ledger'],
    },
    {
      id: 'erp_salesforce',
      name: 'Salesforce CRM & Marketing Cloud',
      type: 'CRM & Omnichannel Engagement',
      status: 'connected',
      syncInterval: 'Real-Time Streaming API',
      lastSync: 'Just now',
      stats: 'Customer 360 Lifetime Value Sync',
      entities: ['Leads', 'Contact Accounts', 'Opportunities', 'Loyalty Tier Sync'],
    },
    {
      id: 'erp_quickbooks',
      name: 'QuickBooks Enterprise / Desktop',
      type: 'Accounting & Payroll',
      status: 'standby',
      syncInterval: 'Daily Midnight Reconciliation',
      lastSync: 'Yesterday 23:59 UTC',
      stats: 'Daily Gross Merchant Ledger Settlement',
      entities: ['Bank Feed Deposit', 'COGS Tracking', 'Sales Receipts'],
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Enterprise ERP & CRM Connectors</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Bi-directional synchronization pipelines for SAP, NetSuite, Salesforce Commerce Cloud, and general ledger reconciliation.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'success', title: 'Full ERP Sync Dispatched', message: 'Triggered manual sync cycle across SAP S/4HANA & NetSuite...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Trigger Instant Sync All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((erp) => (
          <div key={erp.id} className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#111827]">{erp.name}</h3>
                <div className="text-[11px] font-mono text-[#6B7280] mt-0.5">{erp.type}</div>
              </div>

              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span>Healthy</span>
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="text-[#4B5563] font-mono">Cadence: {erp.syncInterval}</div>
              <div className="text-[11px] text-[#6B7280]">Last synchronized: {erp.lastSync}</div>
            </div>

            <div className="pt-2 border-t border-[#E5E8F0] text-xs">
              <div className="font-semibold text-[#111827] mb-1.5">Synchronized Data Entities:</div>
              <div className="flex flex-wrap gap-1.5">
                {erp.entities.map((e, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#F8F9FC] border border-[#E5E8F0] text-[11px] font-medium text-[#4B5563]">
                    {e}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E8F0] flex items-center justify-between text-xs">
              <span className="text-[#6B7280] font-mono">{erp.stats}</span>
              <button
                onClick={() => showToast({ type: 'info', title: 'Connector Mapping', message: `Opening field mapping schema for ${erp.name}` })}
                className="text-[#5B6FF5] font-semibold hover:underline flex items-center gap-1"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Field Mappings</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
