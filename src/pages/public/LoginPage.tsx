import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sparkles, Eye, EyeOff, Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, showToast } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('alex.vance@omnicommerce.io');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [require2FA, setRequire2FA] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your administrator email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email.toLowerCase().includes('lock') || password === 'wrong') {
        setError('Invalid credentials or account is temporarily locked due to multiple attempts.');
        return;
      }

      if (require2FA) {
        showToast({
          type: 'info',
          title: '2FA Challenge Required',
          message: 'Please enter the 6-digit authentication token from your authenticator app.',
        });
        navigate('/2fa');
      } else {
        login(email);
        showToast({
          type: 'success',
          title: 'Welcome Back',
          message: `Signed in as ${email}.`,
        });
        navigate('/dashboard');
      }
    }, 600);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login('alex.vance@omnicommerce.io');
      setLoading(false);
      showToast({
        type: 'success',
        title: 'Single Sign-On Success',
        message: 'Authenticated via Google Workspace SSO.',
      });
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left side: Premium branding & feature highlights (60% on desktop) */}
      <div className="hidden md:flex md:w-3/5 bg-[#1A1F36] text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#5B6FF5]/20 via-transparent to-transparent pointer-events-none" />

        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5B6FF5] to-[#8B9AFE] flex items-center justify-center text-white font-bold text-xl shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight">OmniCommerce</span>
            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#5B6FF5]/30 text-[#8B9AFE]">
              Core Enterprise
            </span>
          </div>
        </div>

        <div className="max-w-md z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-[#8B9AFE]">
            <ShieldCheck className="w-4 h-4" /> Enterprise Multi-Tenant Security
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
            Single Control Console for Global Scale Commerce
          </h1>
          <p className="text-[#C8CEDE] text-sm leading-relaxed">
            Manage multi-region inventory, multi-vendor commission splits, automated returns QC, and B2B quote approvals with real-time enterprise observability.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
            <div>
              <div className="text-lg font-bold text-white">99.99%</div>
              <div className="text-[#C8CEDE]/80">Core Uptime SLA</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">&lt; 40ms</div>
              <div className="text-[#C8CEDE]/80">API Gateway Latency</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-[#C8CEDE]/60 z-10">
          &copy; 2026 OmniCommerce Systems Inc. Protected by SOC2 Type II compliance.
        </div>
      </div>

      {/* Right side: Login Form (40% on desktop) */}
      <div className="w-full md:w-2/5 p-8 sm:p-12 flex flex-col justify-center max-w-lg mx-auto">
        <div className="mb-8">
          <div className="md:hidden flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#1A1F36] text-white flex items-center justify-center font-bold text-sm">
              <Sparkles className="w-4 h-4 text-[#5B6FF5]" />
            </div>
            <span className="font-bold text-[#111827]">OmniCommerce</span>
          </div>

          <h2 className="text-2xl font-bold text-[#111827] tracking-tight">Sign in to your store</h2>
          <p className="text-sm text-[#6B7280] mt-1.5">
            Enter your administrative credentials to access the console.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@yourcompany.com"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E5E8F0] rounded-lg text-sm text-[#111827] focus:border-[#5B6FF5] focus:ring-2 focus:ring-[#5B6FF5]/20 outline-hidden transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-[#111827]">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-[#5B6FF5] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-white border border-[#E5E8F0] rounded-lg text-sm text-[#111827] focus:border-[#5B6FF5] focus:ring-2 focus:ring-[#5B6FF5]/20 outline-hidden transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#111827]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#E5E8F0] text-[#5B6FF5] focus:ring-[#5B6FF5]"
              />
              <span className="text-xs text-[#6B7280]">Remember this device (30 days)</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-xs text-[#6B7280]">
              <input
                type="checkbox"
                checked={require2FA}
                onChange={(e) => setRequire2FA(e.target.checked)}
                className="rounded border-[#E5E8F0] text-[#5B6FF5]"
              />
              <span>Test 2FA Flow</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#5B6FF5] hover:bg-[#4557E0] text-white text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E8F0]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-[#9CA3AF] font-semibold tracking-wider">
              Or continue with
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 px-4 bg-white hover:bg-[#F8F9FC] text-[#111827] text-sm font-semibold rounded-lg border border-[#E5E8F0] transition-colors flex items-center justify-center gap-2 shadow-2xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Single Sign-On (Google Workspace)</span>
        </button>

        <div className="mt-8 text-center text-xs text-[#6B7280]">
          Don't have an enterprise store instance?{' '}
          <Link to="/register" className="font-semibold text-[#5B6FF5] hover:underline">
            Set up your store &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
