import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, CheckCircle2, ShieldCheck, ToggleLeft, ToggleRight, Settings2, Key, RefreshCw } from 'lucide-react';

interface PaymentGateway {
  id: string;
  name: string;
  type: 'credit_card' | 'wallet' | 'bnpl' | 'crypto' | 'b2b_credit';
  status: 'active' | 'test_mode' | 'disabled';
  fee: string;
  settlementPeriod: string;
  description: string;
  currencies: string[];
}

export const PaymentGatewaysPage: React.FC = () => {
  const { showToast } = useApp();

  const [gateways, setGateways] = useState<PaymentGateway[]>([
    {
      id: 'gw_stripe',
      name: 'Stripe Payments & Elements (Custom Flow)',
      type: 'credit_card',
      status: 'active',
      fee: '2.9% + $0.30',
      settlementPeriod: '2 Business Days (Rolling)',
      description: 'Accepts Visa, Mastercard, AMEX, Discover, Diners, JCB, and 135+ global currencies.',
      currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
    },
    {
      id: 'gw_paypal',
      name: 'PayPal Complete Payments & Venmo',
      type: 'wallet',
      status: 'active',
      fee: '3.49% + $0.49',
      settlementPeriod: 'Instant Settlement to Wallet',
      description: 'One-click checkout for 400M+ active global PayPal and Venmo consumer accounts.',
      currencies: ['USD', 'EUR', 'GBP', 'AUD'],
    },
    {
      id: 'gw_apple_pay',
      name: 'Apple Pay & Google Pay Express Checkout',
      type: 'wallet',
      status: 'active',
      fee: 'Included via Stripe',
      settlementPeriod: 'Direct via Acquirer',
      description: 'Biometric 1-touch purchasing directly in mobile Safari and Chrome browser sessions.',
      currencies: ['USD', 'EUR', 'GBP', 'CAD'],
    },
    {
      id: 'gw_klarna',
      name: 'Klarna Buy Now Pay Later (BNPL)',
      type: 'bnpl',
      status: 'active',
      fee: '5.99% + $0.30',
      settlementPeriod: '1 Business Day Upfront',
      description: 'Pay in 4 interest-free installments or 30-day invoice financing. Boosts AOV by +34%.',
      currencies: ['USD', 'EUR', 'GBP'],
    },
    {
      id: 'gw_b2b_terms',
      name: 'B2B Net 30/60 Trade Credit & Wire Transfer',
      type: 'b2b_credit',
      status: 'active',
      fee: '0.00% (Manual Clearing)',
      settlementPeriod: 'Net-30 Invoice Due Date',
      description: 'Purchase orders and corporate account trade credit for verified B2B customer accounts.',
      currencies: ['USD', 'EUR', 'GBP'],
    },
  ]);

  const toggleStatus = (id: string) => {
    setGateways((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const next = g.status === 'active' ? 'disabled' : 'active';
          return { ...g, status: next };
        }
        return g;
      })
    );
    showToast({ type: 'success', title: 'Gateway Updated', message: 'Payment routing configuration saved.' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Payment Gateways & Methods</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Configure merchant processing accounts, 3D-Secure 2.0 fraud protection, BNPL financing, and B2B credit terms.
          </p>
        </div>

        <button
          onClick={() => showToast({ type: 'info', title: 'Payment Setup', message: 'Opening additional gateway connector...' })}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Connect New Provider</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gateways.map((gw) => (
          <div key={gw.id} className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#F8F9FC] border border-[#E5E8F0] flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-[#5B6FF5]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#111827]">{gw.name}</h3>
                  <div className="text-[11px] font-mono text-[#6B7280]">Fee: {gw.fee}</div>
                </div>
              </div>

              <button
                onClick={() => toggleStatus(gw.id)}
                className={gw.status === 'active' ? 'text-emerald-600' : 'text-[#6B7280]'}
              >
                {gw.status === 'active' ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
              </button>
            </div>

            <p className="text-xs text-[#4B5563]">{gw.description}</p>

            <div className="pt-3 border-t border-[#E5E8F0] flex items-center justify-between text-xs font-mono">
              <span className="text-[#6B7280]">Settlement: {gw.settlementPeriod}</span>
              <button
                onClick={() => showToast({ type: 'info', title: 'API Keys', message: `Managing webhook secret and public keys for ${gw.name}` })}
                className="text-[#5B6FF5] hover:underline font-bold flex items-center gap-1"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Configure Keys</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
