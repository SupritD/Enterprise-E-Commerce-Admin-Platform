import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Menu,
  ChevronRight,
  HelpCircle,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  Sparkles,
  Command,
  Store as StoreIcon,
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    sidebarCollapsed,
    setMobileMenuOpen,
    setSearchModalOpen,
    setNotificationsPanelOpen,
    unreadNotificationsCount,
    currentStore,
    user,
    logout,
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Generate dynamic breadcrumbs
  const pathParts = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathParts.map((part, index) => {
    const url = `/${pathParts.slice(0, index + 1).join('/')}`;
    const label = part
      .split(/[-_]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return { label, url, isLast: index === pathParts.length - 1 };
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      className={`sticky top-0 z-30 h-16 bg-white border-b border-[#E5E8F0] px-4 lg:px-6 flex items-center justify-between transition-all duration-200 ${
        sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'
      }`}
    >
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 -ml-2 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F8F9FC] lg:hidden"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Dynamic Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="hidden sm:flex items-center gap-1.5 text-xs text-[#6B7280] overflow-hidden"
        >
          <Link
            to="/dashboard"
            className="hover:text-[#111827] transition-colors font-medium flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5B6FF5]" />
            <span>Admin</span>
          </Link>

          {breadcrumbs.map((crumb) => (
            <React.Fragment key={crumb.url}>
              <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] flex-shrink-0" />
              {crumb.isLast ? (
                <span className="font-semibold text-[#111827] truncate max-w-[200px]">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.url}
                  className="hover:text-[#111827] transition-colors truncate max-w-[150px]"
                >
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right: Search, Store Badge, Notifications & Profile */}
      <div className="flex items-center gap-2.5">
        {/* Global Search Bar (Trigger Modal) */}
        <button
          onClick={() => setSearchModalOpen(true)}
          className="flex items-center gap-2.5 px-3 py-1.5 bg-[#F8F9FC] border border-[#E5E8F0] hover:border-[#5B6FF5]/50 rounded-lg text-xs text-[#6B7280] hover:text-[#111827] transition-all shadow-2xs group"
          title="Search anything (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#5B6FF5]" />
          <span className="hidden md:inline">Quick search or jump to...</span>
          <span className="inline md:hidden">Search</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-white border border-[#E5E8F0] rounded text-[#6B7280]">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Current Store Pill */}
        <Link
          to="/enterprise/stores"
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-medium text-[#111827] hover:bg-[#E5E8F0]/50 transition-colors"
          title="Current Store Instance"
        >
          <StoreIcon className="w-3.5 h-3.5 text-[#5B6FF5]" />
          <span className="max-w-[130px] truncate">{currentStore.name}</span>
        </Link>

        {/* Notifications Bell */}
        <button
          onClick={() => setNotificationsPanelOpen(true)}
          aria-label="Open notifications"
          className="relative p-2 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F8F9FC] transition-colors"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#5B6FF5] rounded-full ring-2 ring-white" />
          )}
        </button>

        {/* Help & Docs */}
        <Link
          to="/support/kb"
          aria-label="Knowledge base and docs"
          className="p-2 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F8F9FC] transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
        </Link>

        <div className="h-5 w-px bg-[#E5E8F0] mx-1" />

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#F8F9FC] transition-colors"
            aria-label="User menu"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover border border-[#E5E8F0]"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-[#111827] leading-tight">
                {user.name}
              </div>
            </div>
          </button>

          {profileDropdownOpen && (
            <div
              onMouseLeave={() => setProfileDropdownOpen(false)}
              className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E8F0] rounded-xl shadow-dropdown py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="px-4 py-2.5 border-b border-[#E5E8F0] bg-[#F8F9FC]">
                <div className="text-xs font-semibold text-[#111827]">{user.name}</div>
                <div className="text-[11px] text-[#6B7280] truncate">{user.email}</div>
                <div className="mt-1 inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" /> {user.role}
                </div>
              </div>

              <div className="py-1">
                <Link
                  to="/users/usr_admin_01"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-[#111827] hover:bg-[#F8F9FC]"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#6B7280]" />
                  <span>My Profile & Preferences</span>
                </Link>
                <Link
                  to="/security/sessions"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-[#111827] hover:bg-[#F8F9FC]"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#6B7280]" />
                  <span>Active Sessions & Security</span>
                </Link>
                <Link
                  to="/enterprise/stores"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-[#111827] hover:bg-[#F8F9FC]"
                >
                  <StoreIcon className="w-3.5 h-3.5 text-[#6B7280]" />
                  <span>Switch Storefront</span>
                </Link>
              </div>

              <div className="border-t border-[#E5E8F0] pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
