import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Layers,
  BarChart2,
  Workflow,
  CheckCircle2,
  Lock,
  Play,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [videoModalOpen, setVideoModalOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E5E8F0] px-6 lg:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1A1F36] text-white flex items-center justify-center font-bold text-xl shadow-md">
            <Sparkles className="w-6 h-6 text-[#5B6FF5]" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-[#111827]">
              OmniCommerce
            </span>
            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#5B6FF5]/10 text-[#5B6FF5]">
              Enterprise v4.2
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4B5563]">
          <a href="#features" className="hover:text-[#111827] transition-colors">
            Architecture
          </a>
          <a href="#stats" className="hover:text-[#111827] transition-colors">
            Performance
          </a>
          <a href="#solutions" className="hover:text-[#111827] transition-colors">
            B2B & Marketplace
          </a>
          <Link to="/support/kb" className="hover:text-[#111827] transition-colors">
            API Documentation
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-[#111827] hover:bg-[#F8F9FC] rounded-lg border border-[#E5E8F0] transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 text-sm font-medium text-white bg-[#5B6FF5] hover:bg-[#4557E0] rounded-lg shadow-sm transition-all"
          >
            Start Free Trial
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 pt-16 pb-20 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B6FF5]/10 text-[#5B6FF5] text-xs font-semibold mb-6">
          <Zap className="w-3.5 h-3.5" /> Next-Gen Enterprise E-Commerce Engine
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111827] max-w-4xl leading-[1.15]">
          The Enterprise Commerce Platform Built for Massive Scale
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#6B7280] max-w-2xl font-normal leading-relaxed">
          Multi-vendor marketplace, B2B quote engine, multi-warehouse fulfillment, automated fraud scoring, and headless APIs — unified in one ultra-fast command console.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/register"
            className="px-6 py-3.5 text-base font-semibold text-white bg-[#5B6FF5] hover:bg-[#4557E0] rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Start 14-Day Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setVideoModalOpen(true)}
            className="px-6 py-3.5 text-base font-semibold text-[#111827] bg-[#F8F9FC] hover:bg-[#E5E8F0] rounded-xl border border-[#E5E8F0] transition-all flex items-center gap-2"
          >
            <Play className="w-4 h-4 text-[#5B6FF5] fill-[#5B6FF5]" />
            <span>Watch Executive Tour</span>
          </button>
          <Link
            to="/dashboard"
            className="px-6 py-3.5 text-base font-semibold text-[#5B6FF5] bg-white hover:bg-[#F8F9FC] rounded-xl border border-[#5B6FF5]/30 transition-all flex items-center gap-2"
          >
            <span>Live Admin Demo</span>
          </Link>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-12 w-full rounded-2xl border border-[#E5E8F0] bg-white p-2 shadow-2xl overflow-hidden relative group">
          <div className="bg-[#1A1F36] rounded-xl p-4 sm:p-6 text-left text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-white/60 ml-2 font-mono">
                  https://admin.omnicommerce.io/dashboard/executive
                </span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                System Healthy (99.998% Uptime)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-xs text-white/60">30-Day GMV</div>
                <div className="text-2xl font-bold mt-1 text-white">$6,110,700</div>
                <div className="text-xs text-emerald-400 mt-1 font-semibold">+18.4% vs last month</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-xs text-white/60">Order Volume</div>
                <div className="text-2xl font-bold mt-1 text-white">19,800</div>
                <div className="text-xs text-emerald-400 mt-1 font-semibold">+9.2% velocity</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-xs text-white/60">Fraud Blocked</div>
                <div className="text-2xl font-bold mt-1 text-white">$142,300</div>
                <div className="text-xs text-indigo-400 mt-1 font-semibold">48 automated rules</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-xs text-white/60">Connected Gateways</div>
                <div className="text-2xl font-bold mt-1 text-white">11 Active</div>
                <div className="text-xs text-white/60 mt-1 font-mono">Stripe &bull; PayPal &bull; Razorpay</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section id="stats" className="border-y border-[#E5E8F0] bg-[#F8F9FC] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-[#111827]">50+</div>
            <div className="text-xs sm:text-sm text-[#6B7280] mt-1 font-medium">Native Integrations</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-[#111827]">160+</div>
            <div className="text-xs sm:text-sm text-[#6B7280] mt-1 font-medium">Database Entities</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-[#111827]">11</div>
            <div className="text-xs sm:text-sm text-[#6B7280] mt-1 font-medium">Payment Gateways</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-[#111827]">100%</div>
            <div className="text-xs sm:text-sm text-[#6B7280] mt-1 font-medium">Audited Codebase</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-[#111827]">Complete Architectural Capabilities</h2>
          <p className="text-[#6B7280] mt-3 text-base">
            Engineered from ground up to replace fragmented Shopify Plus, Magento, and custom stacks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-[#E5E8F0] bg-white shadow-card hover:border-[#5B6FF5]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#5B6FF5]/10 text-[#5B6FF5] flex items-center justify-center mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827]">Multi-Store & Regional Hubs</h3>
            <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
              Instantly spin up global, regional, or brand-specific storefronts with independent currencies, catalogs, and localized tax rules.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#E5E8F0] bg-white shadow-card hover:border-[#5B6FF5]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#5B6FF5]/10 text-[#5B6FF5] flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827]">B2B Quotes & Credit Accounts</h3>
            <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
              Support RFQs, corporate buyer hierarchies, Net 30/60 credit lines, and volume tiered price matrices with instant approval workflows.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#E5E8F0] bg-white shadow-card hover:border-[#5B6FF5]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#5B6FF5]/10 text-[#5B6FF5] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827]">AI Fraud & Risk Rules</h3>
            <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
              Real-time velocity tracking, Tor exit node detection, geo-distance anomaly scoring, and automated 3DS challenges.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#E5E8F0] bg-white shadow-card hover:border-[#5B6FF5]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#5B6FF5]/10 text-[#5B6FF5] flex items-center justify-center mb-4">
              <Workflow className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827]">Workflow Automation Engine</h3>
            <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
              Build event-triggered logic for order routing, stock reorders, VIP tier upgrades, and automated multi-channel messaging.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#E5E8F0] bg-white shadow-card hover:border-[#5B6FF5]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#5B6FF5]/10 text-[#5B6FF5] flex items-center justify-center mb-4">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827]">Executive Intelligence & BI</h3>
            <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
              Waterfall gross-to-net reconciliation, product velocity heatmaps, warehouse fulfillment SLA tracking, and vendor payouts.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#E5E8F0] bg-white shadow-card hover:border-[#5B6FF5]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#5B6FF5]/10 text-[#5B6FF5] flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827]">Enterprise RBAC & Audit Trails</h3>
            <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
              Granular permission matrix across 16 core modules, session management, IP restrictions, and immutable change logs.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="solutions" className="bg-[#F8F9FC] py-20 px-6 border-t border-[#E5E8F0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-[#111827]">Trusted by Global Commerce Leaders</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#E5E8F0] shadow-card">
              <p className="text-sm text-[#4B5563] leading-relaxed">
                "OmniCommerce replaced 4 disjointed apps with a unified multi-warehouse routing architecture. Our fulfillment SLA error rate dropped to near zero."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&q=80"
                  alt="VP Operations"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-semibold text-[#111827]">Elena Vance</div>
                  <div className="text-[11px] text-[#6B7280]">VP Operations, SoundWave Inc.</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E5E8F0] shadow-card">
              <p className="text-sm text-[#4B5563] leading-relaxed">
                "The B2B RFQ engine and credit terms module made corporate sales effortless. Our average B2B deal size grew by 42% in 90 days."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&q=80"
                  alt="Head of Commerce"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-semibold text-[#111827]">Marcus Brody</div>
                  <div className="text-[11px] text-[#6B7280]">Head of Commerce, Apex Direct</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E5E8F0] shadow-card">
              <p className="text-sm text-[#4B5563] leading-relaxed">
                "The workflow builder and fraud scoring stopped over $250k in synthetic identity fraud within our first quarter alone."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&q=80"
                  alt="CISO"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-semibold text-[#111827]">Sarah Jenkins</div>
                  <div className="text-[11px] text-[#6B7280]">CISO, Global Workspace Corp</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-[#1A1F36] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to Scale Your Enterprise Commerce?
          </h2>
          <p className="text-[#C8CEDE] text-base">
            Get instant access to the full dashboard, sandbox data, and pre-configured integrations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="px-6 py-3 bg-[#5B6FF5] hover:bg-[#4557E0] rounded-xl text-white font-semibold shadow-md transition-all"
            >
              Start Free Trial
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold border border-white/20 transition-all"
            >
              Explore Console
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 text-left shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-[#E5E8F0]">
              <h3 className="text-lg font-bold text-[#111827]">OmniCommerce Architecture Walkthrough</h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="text-[#9CA3AF] hover:text-[#111827] text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#5B6FF5]/10 text-[#5B6FF5] flex items-center justify-center mx-auto">
                <Play className="w-8 h-8 fill-[#5B6FF5]" />
              </div>
              <p className="text-sm text-[#4B5563] max-w-md mx-auto">
                Full platform walkthrough includes: multi-warehouse routing, returns QC station, B2B credit approval, and visual workflow automation.
              </p>
              <Link
                to="/dashboard"
                onClick={() => setVideoModalOpen(false)}
                className="inline-block px-5 py-2.5 bg-[#5B6FF5] text-white text-sm font-semibold rounded-lg shadow-sm"
              >
                Launch Interactive Demo Instead &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
