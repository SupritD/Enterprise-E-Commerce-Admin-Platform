import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Users, Plus, ShieldCheck, Key, Mail, Lock, CheckCircle2, UserPlus } from 'lucide-react';

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  mfaStatus: boolean;
  lastLogin: string;
  status: 'active' | 'pending' | 'suspended';
  avatar: string;
}

export const UsersListPage: React.FC = () => {
  const { showToast } = useApp();

  const [users, setUsers] = useState<StaffUser[]>([
    { id: 'u_1', name: 'Alex Vance', email: 'alex.vance@omnicommerce.io', role: 'Super Administrator', team: 'Platform Engineering', mfaStatus: true, lastLogin: '10 mins ago', status: 'active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&q=80' },
    { id: 'u_2', name: 'Marcus Sterling', email: 'marcus.s@omnicommerce.io', role: 'Inventory Director', team: 'Supply Chain Operations', mfaStatus: true, lastLogin: '2 hours ago', status: 'active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80' },
    { id: 'u_3', name: 'Elena Rostova', email: 'elena.r@omnicommerce.io', role: 'Head of Customer Experience', team: 'Support Operations', mfaStatus: true, lastLogin: '35 mins ago', status: 'active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80' },
    { id: 'u_4', name: 'Devon Miles', email: 'devon.m@omnicommerce.io', role: 'Finance & Tax Officer', team: 'Accounting & Compliance', mfaStatus: false, lastLogin: 'Yesterday', status: 'active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80' },
  ]);

  const [inviteModal, setInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Store Administrator');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    setUsers([
      ...users,
      {
        id: `u_${Date.now()}`,
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: inviteRole,
        team: 'Operations',
        mfaStatus: false,
        lastLogin: 'Never',
        status: 'pending',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&q=80',
      },
    ]);

    setInviteModal(false);
    setInviteEmail('');
    showToast({ type: 'success', title: 'Invitation Dispatched', message: `Sent magic setup link to ${inviteEmail}.` });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Staff & Team Management</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Admin team directory, multi-factor authentication compliance, role assignment, and access revocation.
          </p>
        </div>

        <button
          onClick={() => setInviteModal(true)}
          className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Invite Team Member</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E8F0] shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8F9FC] border-b border-[#E5E8F0] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="p-4">User</th>
              <th className="p-4">Assigned Role</th>
              <th className="p-4">Team</th>
              <th className="p-4">2FA Status</th>
              <th className="p-4">Last Active</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E8F0]">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-[#F8F9FC] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-[#E5E8F0]" />
                    <div>
                      <div className="font-bold text-[#111827]">{u.name}</div>
                      <div className="text-[11px] text-[#6B7280]">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-semibold text-[#111827]">{u.role}</td>
                <td className="p-4 text-[#4B5563]">{u.team}</td>
                <td className="p-4">
                  {u.mfaStatus ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Enforced</span>
                    </span>
                  ) : (
                    <span className="text-amber-600 font-medium text-[11px]">Pending Setup</span>
                  )}
                </td>
                <td className="p-4 font-mono text-[11px] text-[#6B7280]">{u.lastLogin}</td>
                <td className="p-4">
                  <StatusBadge status={u.status} />
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => showToast({ type: 'info', title: 'Edit Permissions', message: `Editing role permissions for ${u.name}` })}
                    className="px-3 py-1 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {inviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[#E5E8F0]">
              <h3 className="text-base font-bold text-[#111827]">Invite Staff Member</h3>
              <button onClick={() => setInviteModal(false)} className="text-[#9CA3AF]">✕</button>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block font-semibold text-[#111827] mb-1">Corporate Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="colleague@omnicommerce.io"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Role & Permission Tier</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E8F0] rounded-lg"
                >
                  <option value="Super Administrator">Super Administrator (Full Root Access)</option>
                  <option value="Store Administrator">Store Administrator</option>
                  <option value="Inventory Manager">Inventory & Supply Chain Manager</option>
                  <option value="Customer Support Lead">Customer Support & RMA Lead</option>
                  <option value="Finance & Tax Auditor">Finance & Tax Auditor (Read-Only)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setInviteModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#5B6FF5] text-white font-semibold rounded-lg">Send Invitation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
