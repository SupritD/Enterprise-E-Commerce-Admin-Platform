import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Plus, CheckCircle2, Lock, Save } from 'lucide-react';

interface PermissionModule {
  module: string;
  permissions: Array<{ id: string; name: string; description: string }>;
}

export const RolesPermissionsPage: React.FC = () => {
  const { showToast } = useApp();

  const [selectedRole, setSelectedRole] = useState('Store Administrator');

  const modules: PermissionModule[] = [
    {
      module: 'Catalog & Products',
      permissions: [
        { id: 'cat_view', name: 'View Catalog & Inventory', description: 'Read-only access to products, categories, attributes, and stock.' },
        { id: 'cat_edit', name: 'Create & Edit Products', description: 'Modify pricing, descriptions, images, variants, and SEO tags.' },
        { id: 'cat_delete', name: 'Delete & Archive Products', description: 'Permanently remove or archive SKU records.' },
      ],
    },
    {
      module: 'Orders & Settlements',
      permissions: [
        { id: 'ord_view', name: 'View Customer Orders', description: 'Access order history, shipping addresses, and items ordered.' },
        { id: 'ord_fulfill', name: 'Fulfill & Dispatch Shipping Labels', description: 'Generate carrier tracking barcodes and mark parcels fulfilled.' },
        { id: 'ord_refund', name: 'Issue Customer Refunds & RMA Credits', description: 'Disburse financial refunds and cancel payment transactions.' },
      ],
    },
    {
      module: 'Finance & Tax Filings',
      permissions: [
        { id: 'fin_view', name: 'View Gross Revenue & Merchant Fees', description: 'Inspect ledger balances, interchange fees, and payouts.' },
        { id: 'fin_tax', name: 'Modify Tax Rules & Rates', description: 'Adjust state economic nexus, VAT rules, and Avalara configs.' },
      ],
    },
  ];

  const [enabledPermissions, setEnabledPermissions] = useState<Record<string, boolean>>({
    cat_view: true,
    cat_edit: true,
    cat_delete: false,
    ord_view: true,
    ord_fulfill: true,
    ord_refund: true,
    fin_view: true,
    fin_tax: false,
  });

  const togglePerm = (id: string) => {
    setEnabledPermissions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    showToast({ type: 'success', title: 'RBAC Policy Saved', message: `Permissions for ${selectedRole} updated across all active sessions.` });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Granular RBAC Roles & Permissions</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Define role-based access control matrix with strict least-privilege boundaries and audit-enforced segregation of duties.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Role Matrix</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Roles List */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider px-1">Configured Roles</div>
          {['Super Administrator', 'Store Administrator', 'Inventory & Supply Manager', 'Customer Support Lead', 'Finance Auditor'].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold transition-all ${
                selectedRole === r
                  ? 'bg-white border-[#5B6FF5] text-[#5B6FF5] shadow-card ring-2 ring-[#5B6FF5]/10'
                  : 'bg-white border-[#E5E8F0] text-[#111827] hover:bg-[#F8F9FC]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Permissions Grid */}
        <div className="lg:col-span-3 space-y-6">
          {modules.map((m) => (
            <div key={m.module} className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
              <h3 className="font-bold text-sm text-[#111827] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5B6FF5]" />
                {m.module}
              </h3>

              <div className="divide-y divide-[#E5E8F0] text-xs">
                {m.permissions.map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#111827]">{p.name}</div>
                      <div className="text-[11px] text-[#6B7280]">{p.description}</div>
                    </div>

                    <input
                      type="checkbox"
                      checked={!!enabledPermissions[p.id]}
                      onChange={() => togglePerm(p.id)}
                      className="w-4 h-4 rounded text-[#5B6FF5] focus:ring-0 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
