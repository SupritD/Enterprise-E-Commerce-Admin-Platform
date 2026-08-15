import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingCart,
  RotateCcw,
  Users,
  Building2,
  Share2,
  Megaphone,
  CreditCard,
  Truck,
  Headphones,
  BarChart3,
  Globe2,
  ShieldCheck,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  Store as StoreIcon,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface NavGroup {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  subItems?: Array<{ title: string; path: string; badge?: string }>;
  path?: string;
}

export const Sidebar: React.FC = () => {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen,
    currentStore,
    stores,
    setCurrentStore,
    user,
    logout,
  } = useApp();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    dashboards: true,
    catalog: false,
    inventory: false,
    orders: true,
    returns: false,
    customers: false,
    vendors: false,
    marketing: false,
    enterprise: false,
    support: false,
    security: false,
    system: false,
  });

  const [storeMenuOpen, setStoreMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const navGroups: NavGroup[] = [
    {
      id: 'dashboards',
      title: 'Dashboards',
      icon: LayoutDashboard,
      subItems: [
        { title: 'Executive Overview', path: '/dashboard' },
        { title: 'Revenue Analytics', path: '/dashboard/revenue' },
        { title: 'Operations & SLAs', path: '/dashboard/operations' },
        { title: 'Marketing Metrics', path: '/dashboard/marketing' },
        { title: 'Inventory Health', path: '/dashboard/inventory' },
        { title: 'Vendor Marketplace', path: '/dashboard/vendors' },
      ],
    },
    {
      id: 'catalog',
      title: 'Catalog',
      icon: Package,
      subItems: [
        { title: 'All Products', path: '/catalog/products' },
        { title: 'Add New Product', path: '/catalog/products/new' },
        { title: 'Attributes & Values', path: '/catalog/attributes' },
        { title: 'Collections & Smart Rules', path: '/catalog/collections' },
        { title: 'Categories Tree', path: '/catalog/categories' },
        { title: 'Brands & Manufacturers', path: '/catalog/brands' },
        { title: 'Suppliers & Vendors', path: '/catalog/suppliers' },
        { title: 'Product Reviews', path: '/catalog/reviews' },
        { title: 'Media Library', path: '/catalog/media' },
        { title: 'Bulk Import / Export', path: '/catalog/import' },
      ],
    },
    {
      id: 'inventory',
      title: 'Inventory',
      icon: Boxes,
      subItems: [
        { title: 'Stock Overview', path: '/inventory' },
        { title: 'Warehouse Hubs', path: '/inventory/warehouses' },
        { title: 'Multi-Warehouse Matrix', path: '/inventory/multi-warehouse' },
        { title: 'Stock Transfers', path: '/inventory/transfers' },
        { title: 'Stock Adjustments', path: '/inventory/adjustments' },
        { title: 'Purchase Orders', path: '/inventory/purchase-orders' },
        { title: 'Inventory Audits', path: '/inventory/audits' },
      ],
    },
    {
      id: 'orders',
      title: 'Orders',
      icon: ShoppingCart,
      badge: '3 New',
      subItems: [
        { title: 'All Orders', path: '/orders' },
        { title: 'Draft Orders', path: '/orders/draft' },
        { title: 'Manual / Phone Order', path: '/orders/manual/new' },
        { title: 'Invoices Generator', path: '/orders/invoices' },
        { title: 'Packing Slips', path: '/orders/packing-slips' },
        { title: 'Shipping Labels Queue', path: '/orders/shipping-labels' },
        { title: 'Order Activity Timeline', path: '/orders/timeline' },
      ],
    },
    {
      id: 'returns',
      title: 'Returns & RMA',
      icon: RotateCcw,
      badge: '2 QC',
      subItems: [
        { title: 'Return Requests (RMA)', path: '/returns' },
        { title: 'Approvals Queue', path: '/returns/approvals' },
        { title: 'QC Inspection Station', path: '/returns/inspection' },
        { title: 'Refund Processing', path: '/returns/refunds' },
        { title: 'Exchanges & Credits', path: '/returns/exchanges' },
      ],
    },
    {
      id: 'customers',
      title: 'Customers',
      icon: Users,
      subItems: [
        { title: 'All Customers', path: '/customers' },
        { title: 'Customer Groups', path: '/customers/groups' },
        { title: 'Audience Segments', path: '/customers/segments' },
        { title: 'Store Wallets', path: '/customers/wallets' },
        { title: 'Wishlists & Registries', path: '/customers/wishlists' },
      ],
    },
    {
      id: 'vendors',
      title: 'Vendors',
      icon: Building2,
      subItems: [
        { title: 'All Vendors', path: '/vendors' },
        { title: 'Vendor Approval Queue', path: '/vendors/approval' },
        { title: 'Vendor Products', path: '/vendors/products' },
        { title: 'Vendor Orders', path: '/vendors/orders' },
        { title: 'Payouts & Settlement', path: '/vendors/payouts' },
        { title: 'Commissions Engine', path: '/vendors/commissions' },
      ],
    },
    {
      id: 'affiliates',
      title: 'Affiliates',
      icon: Share2,
      subItems: [
        { title: 'Affiliate Accounts', path: '/affiliates' },
        { title: 'Referral Tracking', path: '/affiliates/referrals' },
        { title: 'Tracking Links', path: '/affiliates/links' },
        { title: 'Affiliate Commissions', path: '/affiliates/commissions' },
        { title: 'Payout Batches', path: '/affiliates/payouts' },
      ],
    },
    {
      id: 'marketing',
      title: 'Marketing',
      icon: Megaphone,
      subItems: [
        { title: 'Coupons & Promos', path: '/marketing/coupons' },
        { title: 'Discount Rules Engine', path: '/marketing/discounts' },
        { title: 'Flash Sales Drops', path: '/marketing/flash-sales' },
        { title: 'Omnichannel Campaigns', path: '/marketing/campaigns' },
        { title: 'Loyalty & Reward Tiers', path: '/marketing/loyalty' },
        { title: 'Referral Program', path: '/marketing/referral' },
        { title: 'Abandoned Cart Recovery', path: '/marketing/abandoned-cart' },
        { title: 'Upsell & Cross-Sell', path: '/marketing/upsell' },
      ],
    },
    {
      id: 'finance',
      title: 'Payments & Tax',
      icon: CreditCard,
      subItems: [
        { title: 'Payment Gateways', path: '/payments/gateways' },
        { title: 'Transaction Ledger', path: '/payments/transactions' },
        { title: 'Refund Audit Logs', path: '/payments/refunds' },
        { title: 'Tax Classes & Rates', path: '/tax/classes' },
        { title: 'GST & VAT Compliance', path: '/tax/gst' },
        { title: 'Tax Reports', path: '/tax/reports' },
      ],
    },
    {
      id: 'shipping',
      title: 'Shipping',
      icon: Truck,
      subItems: [
        { title: 'Shipping Zones & Rates', path: '/shipping/zones' },
        { title: 'Shipping Rules', path: '/shipping/rules' },
        { title: 'Carrier Integrations', path: '/shipping/carriers' },
        { title: 'Real-time Tracking', path: '/shipping/tracking' },
      ],
    },
    {
      id: 'support',
      title: 'Support Desk',
      icon: Headphones,
      badge: '1 Open',
      subItems: [
        { title: 'Support Tickets', path: '/support/tickets' },
        { title: 'Knowledge Base', path: '/support/kb' },
        { title: 'Live Chat Agent', path: '/support/chat' },
        { title: 'Contact Forms', path: '/support/contact-forms' },
        { title: 'Notification Templates', path: '/notifications/email' },
      ],
    },
    {
      id: 'reports',
      title: 'Analytics & Reports',
      icon: BarChart3,
      subItems: [
        { title: 'Sales Performance', path: '/reports/sales' },
        { title: 'Product & SKU Velocity', path: '/reports/products' },
        { title: 'Inventory Valuation', path: '/reports/inventory' },
        { title: 'Vendor Performance', path: '/reports/vendors' },
        { title: 'Custom Report Builder', path: '/reports/custom' },
      ],
    },
    {
      id: 'enterprise',
      title: 'Enterprise & B2B',
      icon: Globe2,
      subItems: [
        { title: 'Multi-Store Manager', path: '/enterprise/stores' },
        { title: 'B2B Corporate Accounts', path: '/enterprise/b2b/companies' },
        { title: 'Quote Requests (RFQ)', path: '/enterprise/b2b/rfq' },
        { title: 'Workflow Automations', path: '/enterprise/workflows' },
        { title: 'AI Fraud Detection', path: '/enterprise/fraud' },
        { title: 'Headless Storefront API', path: '/enterprise/headless' },
        { title: 'ERP & CRM Integrations', path: '/enterprise/integrations/erp' },
      ],
    },
    {
      id: 'security',
      title: 'Users & Security',
      icon: ShieldCheck,
      subItems: [
        { title: 'Team Users', path: '/users' },
        { title: 'Roles & Permissions', path: '/roles' },
        { title: '2FA Policy Enforcement', path: '/security/2fa' },
        { title: 'Active Sessions', path: '/security/sessions' },
        { title: 'IP Access Allowlist', path: '/security/ip-restrictions' },
        { title: 'API Access Tokens', path: '/security/api-tokens' },
        { title: 'Login & Security Logs', path: '/logs/login' },
        { title: 'Activity Audit Trail', path: '/logs/activity' },
      ],
    },
    {
      id: 'system',
      title: 'System & Config',
      icon: Settings,
      subItems: [
        { title: 'Store Identity & General', path: '/system/settings' },
        { title: 'Queue & Async Workers', path: '/system/queue' },
        { title: 'Cache & Redis Manager', path: '/system/cache' },
        { title: 'Scheduled Cron Jobs', path: '/system/cron' },
        { title: 'Automated Backups', path: '/system/backups' },
        { title: 'Webhooks Dispatcher', path: '/system/webhooks' },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-[#1A1F36] text-[#C8CEDE] border-r border-[#252D4A] flex flex-col transition-all duration-200 ${
          sidebarCollapsed ? 'w-[72px]' : 'w-[260px]'
        } ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#252D4A] flex-shrink-0 bg-[#1A1F36]">
          <NavLink
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 min-w-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5B6FF5] to-[#8B9AFE] flex items-center justify-center text-white font-bold text-lg shadow-sm flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <div className="text-sm font-bold text-white tracking-wide truncate">
                  OmniCommerce
                </div>
                <div className="text-[10px] text-[#8B9AFE] font-semibold uppercase tracking-wider">
                  Enterprise Core
                </div>
              </div>
            )}
          </NavLink>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-[#C8CEDE] hover:text-white hover:bg-[#252D4A] transition-colors"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronsRight className="w-4 h-4" />
            ) : (
              <ChevronsLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Store Context Switcher */}
        {!sidebarCollapsed && (
          <div className="px-3 py-2.5 border-b border-[#252D4A] bg-[#161B2E] relative">
            <button
              onClick={() => setStoreMenuOpen(!storeMenuOpen)}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-[#212740] hover:bg-[#28304F] transition-colors border border-[#2E3658] text-left"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={currentStore.logo}
                  alt={currentStore.name}
                  className="w-6 h-6 rounded-md object-cover border border-white/10 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white truncate">
                    {currentStore.name}
                  </div>
                  <div className="text-[10px] text-[#8B9AFE] font-mono truncate">
                    {currentStore.currency} &bull; {currentStore.domain}
                  </div>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#C8CEDE] flex-shrink-0 ml-1" />
            </button>

            {/* Dropdown Menu */}
            {storeMenuOpen && (
              <div className="absolute top-full left-3 right-3 mt-1 bg-[#212740] border border-[#2E3658] rounded-xl shadow-dropdown py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8B9AFE] border-b border-[#2E3658]">
                  Select Workspace
                </div>
                {stores.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setCurrentStore(s);
                      setStoreMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors hover:bg-[#28304F] ${
                      currentStore.id === s.id
                        ? 'text-[#5B6FF5] font-semibold bg-[#28304F]/60'
                        : 'text-[#C8CEDE]'
                    }`}
                  >
                    <span className="truncate">{s.name}</span>
                    <span className="text-[10px] font-mono text-[#8B9AFE]">{s.currency}</span>
                  </button>
                ))}
                <div className="border-t border-[#2E3658] mt-1 pt-1">
                  <NavLink
                    to="/enterprise/stores"
                    onClick={() => setStoreMenuOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#8B9AFE] hover:text-white"
                  >
                    <StoreIcon className="w-3.5 h-3.5" />
                    <span>Manage All Stores</span>
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Item Tree */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          {navGroups.map((group) => {
            const Icon = group.icon;
            const isOpen = openGroups[group.id];
            const hasActiveChild = group.subItems?.some((item) =>
              location.pathname === item.path ||
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
            );

            if (sidebarCollapsed) {
              return (
                <div key={group.id} className="relative group/tooltip">
                  <button
                    onClick={() => {
                      if (group.subItems && group.subItems.length > 0) {
                        navigate(group.subItems[0].path);
                      }
                    }}
                    className={`w-full h-10 rounded-xl flex items-center justify-center transition-colors ${
                      hasActiveChild
                        ? 'bg-[#5B6FF5] text-white shadow-sm'
                        : 'text-[#C8CEDE] hover:bg-white/10 hover:text-white'
                    }`}
                    title={group.title}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                </div>
              );
            }

            return (
              <div key={group.id} className="space-y-0.5">
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    hasActiveChild
                      ? 'text-white bg-white/10'
                      : 'text-[#C8CEDE] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${
                        hasActiveChild ? 'text-[#5B6FF5]' : 'text-[#8B9AFE]'
                      }`}
                    />
                    <span className="truncate">{group.title}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {group.badge && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#5B6FF5] text-white">
                        {group.badge}
                      </span>
                    )}
                    {isOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 text-[#C8CEDE]/70" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-[#C8CEDE]/70" />
                    )}
                  </div>
                </button>

                {isOpen && group.subItems && (
                  <div className="pl-6 pr-1 py-1 space-y-0.5 border-l border-white/10 ml-4">
                    {group.subItems.map((item) => {
                      const isActive =
                        location.pathname === item.path ||
                        (item.path !== '/dashboard' &&
                          location.pathname.startsWith(item.path) &&
                          item.path !== '/catalog/products' &&
                          item.path !== '/orders' &&
                          item.path !== '/customers' &&
                          item.path !== '/vendors');

                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive: directActive }) =>
                            `flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                              directActive || isActive
                                ? 'bg-[#5B6FF5] text-white font-medium shadow-xs'
                                : 'text-[#C8CEDE]/80 hover:text-white hover:bg-white/5'
                            }`
                          }
                        >
                          <span className="truncate">{item.title}</span>
                          {item.badge && (
                            <span className="text-[10px] px-1 bg-white/20 rounded">
                              {item.badge}
                            </span>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* External Storefront Link */}
          <div className="pt-2">
            <NavLink
              to="/storefront"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-[#8B9AFE] hover:bg-white/5 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-emerald-400" />
                {!sidebarCollapsed && <span>Live Storefront Demo</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                  LIVE
                </span>
              )}
            </NavLink>
          </div>
        </nav>

        {/* User Footer Profile */}
        <div className="p-3 border-t border-[#252D4A] bg-[#161B2E]">
          <div className="flex items-center justify-between gap-2">
            <NavLink
              to="/users/usr_admin_01"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 min-w-0 flex-1 hover:opacity-80 transition-opacity"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-white/20 flex-shrink-0"
              />
              {!sidebarCollapsed && (
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white truncate">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-[#8B9AFE] truncate">{user.role}</div>
                </div>
              )}
            </NavLink>

            <button
              onClick={handleLogout}
              title="Sign out of console"
              className="p-1.5 rounded-lg text-[#C8CEDE] hover:text-rose-400 hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
