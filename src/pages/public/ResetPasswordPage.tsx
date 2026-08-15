import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Sparkles, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ResetPasswordPage: React.FC = () => {
  const { token } = useParams();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast({ type: 'error', title: 'Mismatch', message: 'Passwords must match.' });
      return;
    }

    setSuccess(true);
    showToast({
      type: 'success',
      title: 'Password Updated',
      message: 'Your administrator password has been safely updated.',
    });

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col justify-center items-center px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#1A1F36] text-white flex items-center justify-center font-bold text-xl shadow-md">
          <Sparkles className="w-6 h-6 text-[#5B6FF5]" />
        </div>
        <span className="text-xl font-bold tracking-tight text-[#111827]">OmniCommerce</span>
      </div>

      <div className="bg-white max-w-md w-full rounded-2xl border border-[#E5E8F0] shadow-card p-8 text-left">
        {!success ? (
          <>
            <h2 className="text-2xl font-bold text-[#111827] tracking-tight">Set New Password</h2>
            <p className="text-xs text-[#6B7280] mt-1 font-mono">Token: {token || 'active-session-token'}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E5E8F0] rounded-lg text-sm text-[#111827] focus:border-[#5B6FF5] outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">Confirm New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E5E8F0] rounded-lg text-sm text-[#111827] focus:border-[#5B6FF5] outline-hidden font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#5B6FF5] hover:bg-[#4557E0] text-white text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Save New Password</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#111827]">Password Changed!</h3>
            <p className="text-xs text-[#6B7280]">Redirecting you to the sign-in console...</p>
          </div>
        )}
      </div>
    </div>
  );
};
