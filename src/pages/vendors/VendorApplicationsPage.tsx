import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileCheck, CheckCircle2, XCircle, Clock, Building, Mail, ShieldCheck } from 'lucide-react';

export const VendorApplicationsPage: React.FC = () => {
  const { showToast } = useApp();

  const [applications, setApplications] = useState([
    {
      id: 'app_1',
      businessName: 'Nordic Acoustic Crafts Oy',
      category: 'Audio & Acoustics',
      country: 'Finland',
      contactEmail: 'contact@nordicacoustics.fi',
      submittedAt: '2026-08-14 08:30',
      status: 'under_review',
      expectedGMV: '$50,000 / mo',
    },
    {
      id: 'app_2',
      businessName: 'Kyoto Artisan Ceramics Ltd',
      category: 'Home & Kitchen',
      country: 'Japan',
      contactEmail: 'export@kyoto-ceramics.jp',
      submittedAt: '2026-08-13 14:15',
      status: 'documents_pending',
      expectedGMV: '$20,000 / mo',
    },
  ]);

  const handleDecision = (id: string, decision: 'approved' | 'rejected') => {
    setApplications(applications.filter((a) => a.id !== id));
    showToast({
      type: decision === 'approved' ? 'success' : 'info',
      title: `Merchant Application ${decision.toUpperCase()}`,
      message: `Merchant account status updated. Onboarding credentials emailed.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Merchant KYC Applications Queue</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Evaluate incoming third-party seller registrations, tax documentation, and merchant underwriting criteria.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#111827]">{app.businessName}</h3>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    {app.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-xs text-[#6B7280] mt-1">
                  Category: {app.category} &bull; Origin: {app.country} &bull; Email: {app.contactEmail}
                </div>
              </div>

              <div className="text-right font-mono text-xs text-[#6B7280]">
                Submitted: {app.submittedAt}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#E5E8F0] text-xs">
              <span className="font-mono text-[#111827]">Estimated Run-Rate: <strong>{app.expectedGMV}</strong></span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecision(app.id, 'rejected')}
                  className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg font-semibold flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" /> Reject
                </button>
                <button
                  onClick={() => handleDecision(app.id, 'approved')}
                  className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg font-semibold shadow-sm flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve Merchant
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
