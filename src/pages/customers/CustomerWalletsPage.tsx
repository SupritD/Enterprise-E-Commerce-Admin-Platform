import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import {
  Wallet,
  DollarSign,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  CheckCircle2,
  Clock,
  Gift,
  RefreshCw,
  X,
  CreditCard,
  Send,
  User,
} from 'lucide-react';
import { Customer } from '../../types';

interface WalletTransaction {
  id: string;
  customerId: string;
  customerName: string;
  type: 'credit' | 'debit' | 'bonus' | 'refund';
  amount: number;
  description: string;
  date: string;
  status: 'settled' | 'pending';
}

export const CustomerWalletsPage: React.FC = () => {
  const { showToast } = useApp();
  const { customers } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [topUpAmount, setTopUpAmount] = useState('50.00');
  const [topUpReason, setTopUpReason] = useState('VIP Loyalty Reward Bonus');

  const [transactions, setTransactions] = useState<WalletTransaction[]>([
    {
      id: 'tx-101',
      customerId: customers[0]?.id || '1',
      customerName: 'Sarah Jenkins',
      type: 'refund',
      amount: 149.99,
      description: 'Instant Store Credit Refund for RMA-2024-001 (+10% Bonus)',
      date: 'Aug 14, 2026',
      status: 'settled',
    },
    {
      id: 'tx-102',
      customerId: customers[1]?.id || '2',
      customerName: 'Michael Chen',
      type: 'debit',
      amount: 85.0,
      description: 'Redeemed wallet balance on Checkout #ORD-9820',
      date: 'Aug 13, 2026',
      status: 'settled',
    },
    {
      id: 'tx-103',
      customerId: customers[2]?.id || '3',
      customerName: 'Elena Rostova',
      type: 'bonus',
      amount: 25.0,
      description: 'Platinum Tier Birthday Credit Bonus',
      date: 'Aug 12, 2026',
      status: 'settled',
    },
    {
      id: 'tx-104',
      customerId: customers[3]?.id || '4',
      customerName: 'David Kim',
      type: 'credit',
      amount: 200.0,
      description: 'Corporate B2B Allowance Top-Up',
      date: 'Aug 10, 2026',
      status: 'settled',
    },
  ]);

  const totalOutstandingBalance = customers.reduce((sum, c) => sum + (c.walletBalance || 0), 0);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGrantCredit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    const amt = parseFloat(topUpAmount) || 0;
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      type: 'bonus',
      amount: amt,
      description: topUpReason,
      date: 'Just now',
      status: 'settled',
    };
    setTransactions([newTx, ...transactions]);
    selectedCustomer.walletBalance = (selectedCustomer.walletBalance || 0) + amt;
    setSelectedCustomer(null);
    showToast({
      type: 'success',
      title: 'Store Credit Granted',
      message: `Added $${amt.toFixed(2)} to ${selectedCustomer.name}'s wallet.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Customer Digital Wallets & Credit</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Store credit ledger, automated refund wallet credits, loyalty cashback top-ups, and balance adjustments.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (customers.length > 0) setSelectedCustomer(customers[0]);
            }}
            className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Grant Promotional Credit</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Outstanding Liability"
          value={`$${(totalOutstandingBalance + 420).toFixed(2)}`}
          change={8.4}
          icon={<Wallet className="w-4 h-4 text-[#5B6FF5]" />}
        />
        <StatCard
          title="Active Funded Wallets"
          value={customers.length}
          change={12.0}
          icon={<DollarSign className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Wallet Checkout Share"
          value="18.5% of GMV"
          change={4.2}
          icon={<CreditCard className="w-4 h-4 text-indigo-500" />}
        />
        <StatCard
          title="Reward Cashback Issued"
          value="$3,890.00"
          change={19.0}
          icon={<Gift className="w-4 h-4 text-amber-500" />}
        />
      </div>

      {/* Customer Wallets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customers Wallet Balances Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between">
            <div className="font-bold text-xs text-[#111827]">Customer Credit Balances</div>
            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] focus:outline-hidden focus:border-[#5B6FF5]"
              />
            </div>
          </div>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                <th className="p-3.5">Customer Profile</th>
                <th className="p-3.5">Account Tier</th>
                <th className="p-3.5">Available Balance</th>
                <th className="p-3.5 text-right">Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8F0]">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-[#F8F9FC] transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={cust.avatar}
                        alt={cust.name}
                        className="w-8 h-8 rounded-full object-cover border border-[#E5E8F0]"
                      />
                      <div>
                        <div className="font-bold text-[#111827]">{cust.name}</div>
                        <div className="text-[11px] text-[#6B7280]">{cust.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EEF2FF] text-[#5B6FF5]">
                      {cust.tier || 'Gold'} Tier
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-sm text-[#111827]">
                      ${(cust.walletBalance || 45.0).toFixed(2)}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold">Active & Spendable</div>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedCustomer(cust)}
                      className="px-2.5 py-1 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] text-[#5B6FF5] rounded-lg text-xs font-semibold"
                    >
                      Top Up / Adjust
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Live Wallet Activity Stream */}
        <div className="bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E8F0] pb-3">
            <div className="font-bold text-xs text-[#111827]">Recent Wallet Activity</div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Live Ledger
            </span>
          </div>

          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-3 bg-[#F8F9FC] rounded-xl border border-[#E5E8F0] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#111827]">{tx.customerName}</span>
                  <span
                    className={`font-mono font-bold text-xs ${
                      tx.type === 'debit' ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {tx.type === 'debit' ? '-' : '+'}${tx.amount.toFixed(2)}
                  </span>
                </div>
                <div className="text-[11px] text-[#4B5563]">{tx.description}</div>
                <div className="text-[10px] text-[#9CA3AF] flex items-center justify-between pt-1">
                  <span>{tx.date}</span>
                  <span className="capitalize font-bold text-[#5B6FF5]">{tx.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Credit Grant Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E5E8F0] shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5E8F0] pb-3">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#5B6FF5]" />
                <h3 className="font-bold text-sm text-[#111827]">Grant Store Credit</h3>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1 text-[#6B7280] hover:text-[#111827] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGrantCredit} className="space-y-4 text-xs">
              <div>
                <label className="text-xs font-bold text-[#111827]">Target Customer</label>
                <div className="p-3 bg-[#F8F9FC] border border-[#E5E8F0] rounded-xl flex items-center gap-3 mt-1">
                  <img
                    src={selectedCustomer.avatar}
                    alt={selectedCustomer.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-[#111827]">{selectedCustomer.name}</div>
                    <div className="text-[11px] text-[#6B7280]">{selectedCustomer.email}</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#111827]">Credit Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] mt-1 focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#111827]">Credit Grant Reason</label>
                <input
                  type="text"
                  required
                  value={topUpReason}
                  onChange={(e) => setTopUpReason(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs text-[#111827] mt-1 focus:bg-white focus:outline-hidden focus:border-[#5B6FF5]"
                  placeholder="e.g. VIP goodwill adjustment, promo giveaway"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E5E8F0]">
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="px-4 py-2 bg-white border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm"
                >
                  Disburse Credit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
