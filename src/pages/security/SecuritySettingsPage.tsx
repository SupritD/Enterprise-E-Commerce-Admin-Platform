import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Key, Lock, Smartphone, Globe, AlertTriangle, CheckCircle2, ToggleRight, ToggleLeft } from 'lucide-react';

export const SecuritySettingsPage: React.FC = () => {
  const { showToast } = useApp();

  const [mfaMandatory, setMfaMandatory] = useState(true);
  const [ssoEnabled, setSsoEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [ipRestriction, setIpRestriction] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Security Policies & SAML / 2FA</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Enterprise authentication policies, Okta SAML 2.0 Single Sign-On, FIDO2 WebAuthn keys, and IP allowlists.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'success', title: 'Security Policies Enforced', message: 'Updated global tenant security controls.' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Save Security Policies</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 2FA Enforce */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-[#5B6FF5]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#111827]">Mandatory Multi-Factor (MFA)</h3>
                <p className="text-xs text-[#6B7280]">Require TOTP Authenticator or WebAuthn hardware keys on login.</p>
              </div>
            </div>
            <button onClick={() => setMfaMandatory(!mfaMandatory)} className={mfaMandatory ? 'text-emerald-600' : 'text-[#6B7280]'}>
              {mfaMandatory ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* SAML SSO */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#5B6FF5]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#111827]">Okta & Azure AD SAML 2.0 SSO</h3>
                <p className="text-xs text-[#6B7280]">Enforce corporate identity provider login and auto-provisioning.</p>
              </div>
            </div>
            <button onClick={() => setSsoEnabled(!ssoEnabled)} className={ssoEnabled ? 'text-emerald-600' : 'text-[#6B7280]'}>
              {ssoEnabled ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Session Inactivity */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 text-xs">
          <div className="font-bold text-sm text-[#111827]">Idle Session Auto-Timeout</div>
          <p className="text-[#6B7280]">Automatically revoke active tokens and lock console after inactivity.</p>
          <select
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(e.target.value)}
            className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg font-mono text-xs"
          >
            <option value="15">15 Minutes</option>
            <option value="30">30 Minutes (Recommended)</option>
            <option value="60">60 Minutes</option>
            <option value="120">2 Hours</option>
          </select>
        </div>

        {/* IP Allowlists */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div className="font-bold text-sm text-[#111827]">Corporate IP Allowlist / CIDR</div>
            <button onClick={() => setIpRestriction(!ipRestriction)} className={ipRestriction ? 'text-emerald-600' : 'text-[#6B7280]'}>
              {ipRestriction ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
            </button>
          </div>
          <p className="text-[#6B7280]">Restrict admin portal login exclusively to corporate VPN IP ranges.</p>
          <input
            type="text"
            disabled={!ipRestriction}
            placeholder="192.168.1.0/24, 10.0.0.0/16"
            className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg font-mono text-xs disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
};
