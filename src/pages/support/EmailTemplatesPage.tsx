import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Edit2, Send, Eye, CheckCircle2, Copy } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  trigger: string;
  subject: string;
  channel: 'email' | 'sms' | 'whatsapp';
  status: 'active' | 'draft';
}

export const EmailTemplatesPage: React.FC = () => {
  const { showToast } = useApp();

  const [templates, setTemplates] = useState<EmailTemplate[]>([
    { id: 'tmpl_1', name: 'Order Confirmation & Invoice', trigger: 'orders/created', subject: 'Your OmniCommerce Order #{{order_number}} is confirmed!', channel: 'email', status: 'active' },
    { id: 'tmpl_2', name: 'Fulfillment & Carrier Tracking', trigger: 'orders/fulfilled', subject: 'Your package is on its way via {{carrier}} (Tracking: {{tracking_code}})', channel: 'email', status: 'active' },
    { id: 'tmpl_3', name: 'RMA Return Authorized & Label', trigger: 'rma/authorized', subject: 'Your Return RMA #{{rma_number}} has been approved - Print your label', channel: 'email', status: 'active' },
    { id: 'tmpl_4', name: 'Abandoned Cart 1-Hour Recovery', trigger: 'cart/abandoned_1h', subject: 'Still thinking about it? Complete your checkout with free express shipping', channel: 'email', status: 'active' },
    { id: 'tmpl_5', name: 'SMS Out For Delivery Notification', trigger: 'shipment/out_for_delivery', subject: 'OmniCommerce Alert: Your parcel will arrive today before 5pm.', channel: 'sms', status: 'active' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Transactional Notification Templates</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            HTML email blueprints, SMS alerts, Liquid merge variables, and SendGrid/Postmark dispatch configurations.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'Template Designer', message: 'Opening visual Drag & Drop HTML email composer...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Create New Template</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card divide-y divide-[#E5E8F0] text-xs">
        {templates.map((tmpl) => (
          <div key={tmpl.id} className="p-4 flex items-center justify-between hover:bg-[#F8F9FC] transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#111827]">{tmpl.name}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-100 text-[#4B5563]">
                  {tmpl.channel}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-indigo-50 text-indigo-700">
                  {tmpl.trigger}
                </span>
              </div>
              <div className="text-[11px] text-[#6B7280] font-mono">Subject: "{tmpl.subject}"</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast({ type: 'success', title: 'Test Email Dispatched', message: `Sent test preview of ${tmpl.name} to admin email.` })}
                className="px-2.5 py-1 bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] rounded-lg text-xs font-semibold text-[#111827] flex items-center gap-1 shadow-2xs"
              >
                <Send className="w-3 h-3 text-[#5B6FF5]" />
                <span>Send Test</span>
              </button>
              <button
                onClick={() => showToast({ type: 'info', title: 'Edit Template', message: `Opening editor for ${tmpl.name}` })}
                className="p-1.5 hover:bg-white rounded-lg text-[#6B7280] border border-transparent hover:border-[#E5E8F0]"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
