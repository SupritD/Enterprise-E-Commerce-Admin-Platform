import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Package,
  Truck,
  CreditCard,
  UserPlus,
  CheckCircle2,
  ArrowRight,
  Plus,
  Trash2,
} from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { currentStore, showToast } = useApp();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 2: Product State
  const [productName, setProductName] = useState('Flagship Wireless Acoustic Earbuds');
  const [productPrice, setProductPrice] = useState('199.99');
  const [productStock, setProductStock] = useState('150');

  // Step 4: Gateway State
  const [gateways, setGateways] = useState({
    stripe: true,
    paypal: true,
    razorpay: false,
  });

  // Step 5: Invites State
  const [invites, setInvites] = useState([
    { email: 'operations@company.com', role: 'Inventory Manager' },
    { email: 'finance@company.com', role: 'Order Manager' },
  ]);

  const addInviteRow = () => {
    setInvites([...invites, { email: '', role: 'Support Agent' }]);
  };

  const removeInviteRow = (idx: number) => {
    setInvites(invites.filter((_, i) => i !== idx));
  };

  const handleComplete = () => {
    showToast({
      type: 'success',
      title: 'Store Launch Initialized',
      message: 'All core settings configured. Welcome to your Executive Dashboard!',
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] py-10 px-4 sm:px-6 flex flex-col items-center">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#1A1F36] text-white flex items-center justify-center font-bold text-xl shadow-md">
          <Sparkles className="w-6 h-6 text-[#5B6FF5]" />
        </div>
        <div>
          <span className="text-xl font-bold tracking-tight text-[#111827]">OmniCommerce</span>
          <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#5B6FF5]/10 text-[#5B6FF5]">
            Quick Launch Wizard
          </span>
        </div>
      </div>

      <div className="bg-white max-w-3xl w-full rounded-2xl border border-[#E5E8F0] shadow-card overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-[#1A1F36] px-6 py-4 border-b border-white/10 text-white">
          <div className="flex items-center justify-between text-xs font-semibold overflow-x-auto gap-2">
            {[
              { num: 1, label: 'Overview' },
              { num: 2, label: 'First Product' },
              { num: 3, label: 'Shipping' },
              { num: 4, label: 'Payments' },
              { num: 5, label: 'Team' },
              { num: 6, label: 'Launch' },
            ].map((s) => (
              <div
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                  currentStep === s.num ? 'text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    currentStep >= s.num ? 'bg-[#5B6FF5] text-white font-bold' : 'bg-white/20'
                  }`}
                >
                  {s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          {/* Step 1: Review */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#111827]">Welcome to {currentStore.name}!</h3>
                <p className="text-sm text-[#6B7280] mt-1">
                  Let's configure your basic store parameters in less than 2 minutes. You can skip any step and adjust later in settings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F8F9FC] p-4 rounded-xl border border-[#E5E8F0] text-xs">
                <div>
                  <span className="text-[#6B7280]">Store Name:</span>
                  <div className="font-semibold text-sm text-[#111827] mt-0.5">{currentStore.name}</div>
                </div>
                <div>
                  <span className="text-[#6B7280]">Domain URL:</span>
                  <div className="font-mono text-sm text-[#5B6FF5] mt-0.5">{currentStore.domain}</div>
                </div>
                <div>
                  <span className="text-[#6B7280]">Base Currency:</span>
                  <div className="font-semibold text-sm text-[#111827] mt-0.5">{currentStore.currency} (Standard)</div>
                </div>
                <div>
                  <span className="text-[#6B7280]">Status:</span>
                  <div className="font-semibold text-emerald-600 mt-0.5">Provisioned & Healthy</div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E8F0]">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2"
                >
                  <span>Begin Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: First Product */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5B6FF5]/10 text-[#5B6FF5] flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111827]">Add Your First Product</h3>
                  <p className="text-xs text-[#6B7280]">Create an initial inventory record or import via CSV later.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">Product Title</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-1">Regular Price ($)</label>
                    <input
                      type="number"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-1">Initial Stock Units</label>
                    <input
                      type="number"
                      value={productStock}
                      onChange={(e) => setProductStock(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-3 pt-4 border-t border-[#E5E8F0]">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827]"
                >
                  Skip this step
                </button>
                <button
                  onClick={() => {
                    showToast({ type: 'success', title: 'Product Saved', message: `Added "${productName}"` });
                    setCurrentStep(3);
                  }}
                  className="px-6 py-2.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2"
                >
                  <span>Save & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Shipping */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5B6FF5]/10 text-[#5B6FF5] flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111827]">Configure Shipping Zones</h3>
                  <p className="text-xs text-[#6B7280]">Default standard rules have been initialized for North America & Global.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-[#E5E8F0] bg-[#F8F9FC] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#111827]">Domestic Express (US 48 States)</div>
                    <div className="text-[11px] text-[#6B7280]">FedEx & UPS &bull; Free above $100 &bull; $9.99 flat standard</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                    Active
                  </span>
                </div>

                <div className="p-3.5 rounded-xl border border-[#E5E8F0] bg-[#F8F9FC] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#111827]">International Priority (EU, UK, APAC)</div>
                    <div className="text-[11px] text-[#6B7280]">DHL Express Worldwide &bull; DDP duties pre-calculated</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                    Active
                  </span>
                </div>
              </div>

              <div className="flex justify-between gap-3 pt-4 border-t border-[#E5E8F0]">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827]"
                >
                  Skip
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-2.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2"
                >
                  <span>Confirm Shipping Rules</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Payments */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5B6FF5]/10 text-[#5B6FF5] flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111827]">Payment Gateway Connectors</h3>
                  <p className="text-xs text-[#6B7280]">Select the gateways you want enabled in test mode.</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'stripe', name: 'Stripe Payments & Radar', desc: 'Credit Cards, Apple Pay, Google Pay, 3D-Secure 2.0' },
                  { id: 'paypal', name: 'PayPal Commerce Platform', desc: 'PayPal Checkout, Pay in 4 installment financing' },
                  { id: 'razorpay', name: 'Razorpay Enterprise', desc: 'UPI, NetBanking, RuPay, Local Wallets' },
                ].map((gw) => (
                  <label
                    key={gw.id}
                    className="p-4 rounded-xl border border-[#E5E8F0] hover:border-[#5B6FF5]/50 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="text-sm font-semibold text-[#111827]">{gw.name}</div>
                      <div className="text-xs text-[#6B7280] mt-0.5">{gw.desc}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={gateways[gw.id as keyof typeof gateways]}
                      onChange={(e) =>
                        setGateways({ ...gateways, [gw.id]: e.target.checked })
                      }
                      className="w-4 h-4 text-[#5B6FF5] rounded border-[#E5E8F0]"
                    />
                  </label>
                ))}
              </div>

              <div className="flex justify-between gap-3 pt-4 border-t border-[#E5E8F0]">
                <button
                  onClick={() => setCurrentStep(5)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827]"
                >
                  Skip
                </button>
                <button
                  onClick={() => setCurrentStep(5)}
                  className="px-6 py-2.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2"
                >
                  <span>Save Gateways</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Invite Team */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5B6FF5]/10 text-[#5B6FF5] flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111827]">Invite Operations Team</h3>
                  <p className="text-xs text-[#6B7280]">Dispatch invitations with pre-configured RBAC roles.</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {invites.map((invite, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="email"
                      placeholder="teammate@company.com"
                      value={invite.email}
                      onChange={(e) => {
                        const updated = [...invites];
                        updated[idx].email = e.target.value;
                        setInvites(updated);
                      }}
                      className="flex-1 px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-xs"
                    />
                    <select
                      value={invite.role}
                      onChange={(e) => {
                        const updated = [...invites];
                        updated[idx].role = e.target.value;
                        setInvites(updated);
                      }}
                      className="px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-xs"
                    >
                      <option value="Inventory Manager">Inventory Manager</option>
                      <option value="Order Manager">Order Manager</option>
                      <option value="Support Agent">Support Agent</option>
                      <option value="Store Admin">Store Admin</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeInviteRow(idx)}
                      className="p-2 text-[#9CA3AF] hover:text-rose-600 rounded-lg hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addInviteRow}
                className="text-xs font-semibold text-[#5B6FF5] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add another teammate
              </button>

              <div className="flex justify-between gap-3 pt-4 border-t border-[#E5E8F0]">
                <button
                  onClick={() => setCurrentStep(6)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827]"
                >
                  Skip
                </button>
                <button
                  onClick={() => {
                    showToast({ type: 'success', title: 'Invitations Queued', message: `${invites.length} teammate invites dispatched.` });
                    setCurrentStep(6);
                  }}
                  className="px-6 py-2.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2"
                >
                  <span>Send Invites & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Launch */}
          {currentStep === 6 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#111827]">You're Ready to Launch!</h3>
                <p className="text-sm text-[#6B7280] mt-1 max-w-md mx-auto leading-relaxed">
                  Your store environment is configured with live catalog mockups, multi-warehouse routing, and operational queues.
                </p>
              </div>

              <div className="flex justify-center gap-4 pt-2">
                <button
                  onClick={handleComplete}
                  className="px-8 py-3 bg-[#5B6FF5] hover:bg-[#4557E0] text-white text-sm font-semibold rounded-xl shadow-md transition-all inline-flex items-center gap-2"
                >
                  <span>Enter Executive Console</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
