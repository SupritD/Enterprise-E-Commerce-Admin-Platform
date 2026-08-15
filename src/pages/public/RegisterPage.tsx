import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sparkles, Check, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { login, showToast } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [fullName, setFullName] = useState('Alex Vance');
  const [email, setEmail] = useState('alex.vance@company.com');
  const [password, setPassword] = useState('Password@2026!');
  const [confirmPassword, setConfirmPassword] = useState('Password@2026!');

  const [storeName, setStoreName] = useState('Apex Global Direct');
  const [storeSlug, setStoreSlug] = useState('apex-global-direct');
  const [industry, setIndustry] = useState('Electronics & Hardware');
  const [country, setCountry] = useState('United States');

  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'growth' | 'enterprise'>('enterprise');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (password !== confirmPassword) {
        showToast({ type: 'error', title: 'Passwords do not match', message: 'Please ensure both password fields are identical.' });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleFinish = () => {
    login(email);
    showToast({
      type: 'success',
      title: 'Store Provisioned',
      message: `Welcome to ${storeName}! Starting quick onboarding wizard...`,
    });
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] py-12 px-4 sm:px-6 flex flex-col justify-center items-center">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#1A1F36] text-white flex items-center justify-center font-bold text-xl shadow-md">
          <Sparkles className="w-6 h-6 text-[#5B6FF5]" />
        </div>
        <div className="text-left">
          <span className="text-xl font-bold tracking-tight text-[#111827]">OmniCommerce</span>
          <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#5B6FF5]/10 text-[#5B6FF5]">
            Store Setup Wizard
          </span>
        </div>
      </div>

      <div className="bg-white max-w-2xl w-full rounded-2xl border border-[#E5E8F0] shadow-card overflow-hidden">
        {/* Step Progress Bar */}
        <div className="bg-[#1A1F36] px-6 py-4 text-white">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#5B6FF5] text-white' : 'bg-white/20'}`}>1</span>
              Account
            </span>
            <span className="text-white/30">&rarr;</span>
            <span className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#5B6FF5] text-white' : 'bg-white/20'}`}>2</span>
              Store Details
            </span>
            <span className="text-white/30">&rarr;</span>
            <span className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#5B6FF5] text-white' : 'bg-white/20'}`}>3</span>
              Plan
            </span>
            <span className="text-white/30">&rarr;</span>
            <span className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 4 ? 'bg-emerald-500 text-white' : 'bg-white/20'}`}>4</span>
              Complete
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#111827]">Create Administrator Account</h3>
                <p className="text-xs text-[#6B7280] mt-1">
                  You will have super-administrator privileges over all regional stores.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm text-[#111827] focus:border-[#5B6FF5] focus:ring-2 focus:ring-[#5B6FF5]/20 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm text-[#111827] focus:border-[#5B6FF5] focus:ring-2 focus:ring-[#5B6FF5]/20 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm text-[#111827] focus:border-[#5B6FF5] outline-hidden font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm text-[#111827] focus:border-[#5B6FF5] outline-hidden font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#E5E8F0]">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2"
                >
                  <span>Continue to Store Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#111827]">Store & Business Info</h3>
                <p className="text-xs text-[#6B7280] mt-1">
                  Configure the primary domain, industry vertical, and base operating currency.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">Store / Organization Name</label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => {
                    setStoreName(e.target.value);
                    setStoreSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }}
                  className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm text-[#111827] focus:border-[#5B6FF5] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">Store URL Handle</label>
                <div className="flex items-center rounded-lg border border-[#E5E8F0] bg-[#F8F9FC] px-3 py-2 text-xs font-mono text-[#6B7280]">
                  <span>https://</span>
                  <input
                    type="text"
                    required
                    value={storeSlug}
                    onChange={(e) => setStoreSlug(e.target.value)}
                    className="bg-transparent border-none outline-hidden text-[#111827] font-semibold px-1 flex-1"
                  />
                  <span>.omnicommerce.io</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">Industry Vertical</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm text-[#111827] focus:border-[#5B6FF5] outline-hidden"
                  >
                    <option value="Electronics & Hardware">Consumer Electronics & Hardware</option>
                    <option value="Apparel & Fashion">Apparel & Luxury Fashion</option>
                    <option value="Home & Furniture">Home, Furniture & Office</option>
                    <option value="B2B Industrial">B2B Industrial & Manufacturing</option>
                    <option value="Software & Digital">Software & SaaS Downloads</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">Headquarters Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-sm text-[#111827] focus:border-[#5B6FF5] outline-hidden"
                  >
                    <option value="United States">United States (USD)</option>
                    <option value="United Kingdom">United Kingdom (GBP)</option>
                    <option value="Germany">Germany / EU (EUR)</option>
                    <option value="Japan">Japan (JPY)</option>
                    <option value="India">India (INR)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-between gap-3 border-t border-[#E5E8F0]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-sm font-medium text-[#4B5563] hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2"
                >
                  <span>Select Infrastructure Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#111827]">Select Deployment Plan</h3>
                <p className="text-xs text-[#6B7280] mt-1">
                  14-day full feature trial with sandbox test credentials.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: 'starter',
                    name: 'Starter Cloud',
                    price: '$299',
                    features: ['Single Store', '5 Warehouses', 'Standard Gateways', '50k Orders/mo'],
                  },
                  {
                    id: 'growth',
                    name: 'Growth Scale',
                    price: '$899',
                    features: ['3 Multi-Stores', '15 Warehouses', 'B2B Quotes & RFQs', '250k Orders/mo'],
                  },
                  {
                    id: 'enterprise',
                    name: 'Global Enterprise',
                    price: '$2,499',
                    features: ['Unlimited Stores', 'Dedicated Clusters', 'Custom Fraud AI', 'Unlimited Headless'],
                    badge: 'Recommended',
                  },
                ].map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id as any)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all relative ${
                      selectedPlan === plan.id
                        ? 'border-[#5B6FF5] bg-[#5B6FF5]/5 shadow-sm'
                        : 'border-[#E5E8F0] hover:border-[#5B6FF5]/40'
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-2.5 right-3 text-[10px] font-bold uppercase tracking-wider bg-[#5B6FF5] text-white px-2 py-0.5 rounded-full">
                        {plan.badge}
                      </span>
                    )}
                    <div className="text-sm font-bold text-[#111827]">{plan.name}</div>
                    <div className="text-xl font-bold text-[#5B6FF5] mt-1">{plan.price}<span className="text-xs text-[#6B7280]">/mo</span></div>
                    <ul className="mt-3 space-y-1.5 text-xs text-[#4B5563]">
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between gap-3 border-t border-[#E5E8F0]">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-sm font-medium text-[#4B5563] hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2"
                >
                  <span>Provision Cloud Cluster</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#111827]">Store Platform Ready!</h3>
                <p className="text-sm text-[#6B7280] mt-1 max-w-md mx-auto leading-relaxed">
                  Your enterprise environment <span className="font-semibold text-[#111827]">{storeName}</span> has been provisioned with standard sandbox data and API keys.
                </p>
              </div>

              <div className="bg-[#F8F9FC] rounded-xl p-4 border border-[#E5E8F0] text-left text-xs space-y-2 max-w-md mx-auto font-mono">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Instance Cluster:</span>
                  <span className="font-semibold text-[#111827]">us-east-cluster-04</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Primary Admin:</span>
                  <span className="font-semibold text-[#111827]">{email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Selected Tier:</span>
                  <span className="font-semibold text-[#5B6FF5] capitalize">{selectedPlan} Tier</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="px-8 py-3 bg-[#5B6FF5] hover:bg-[#4557E0] text-white text-sm font-semibold rounded-xl shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Launch Onboarding Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-[#6B7280]">
        Already have a store account?{' '}
        <Link to="/login" className="font-semibold text-[#5B6FF5] hover:underline">
          Sign In &rarr;
        </Link>
      </div>
    </div>
  );
};
