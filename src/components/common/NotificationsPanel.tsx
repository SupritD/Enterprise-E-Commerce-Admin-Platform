import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { X, CheckCheck, Bell, ShieldAlert, Package, ShoppingCart, RotateCcw, Building2, HelpCircle } from 'lucide-react';

export const NotificationsPanel: React.FC = () => {
  const {
    notificationsPanelOpen,
    setNotificationsPanelOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useApp();
  const [tab, setTab] = useState<'all' | 'unread'>('all');
  const navigate = useNavigate();

  if (!notificationsPanelOpen) return null;

  const displayList = tab === 'all' ? notifications : notifications.filter((n) => !n.read);

  const getIcon = (type: string) => {
    switch (type) {
      case 'security':
        return <ShieldAlert className="w-4 h-4 text-rose-500" />;
      case 'inventory':
        return <Package className="w-4 h-4 text-amber-500" />;
      case 'order':
        return <ShoppingCart className="w-4 h-4 text-emerald-500" />;
      case 'return':
        return <RotateCcw className="w-4 h-4 text-indigo-500" />;
      case 'vendor':
        return <Building2 className="w-4 h-4 text-blue-500" />;
      default:
        return <HelpCircle className="w-4 h-4 text-[#5B6FF5]" />;
    }
  };

  const handleClick = (notif: (typeof notifications)[0]) => {
    markNotificationAsRead(notif.id);
    navigate(notif.link);
    setNotificationsPanelOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white h-full shadow-modal flex flex-col transform transition-transform animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#5B6FF5]" />
            <h2 className="text-base font-semibold text-[#111827]">Notifications</h2>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={markAllNotificationsAsRead}
              title="Mark all as read"
              className="p-1.5 rounded-md text-[#6B7280] hover:text-[#111827] hover:bg-[#F8F9FC]"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
            <button
              onClick={() => setNotificationsPanelOpen(false)}
              aria-label="Close notification panel"
              className="p-1.5 rounded-md text-[#6B7280] hover:text-[#111827] hover:bg-[#F8F9FC]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-[#E5E8F0] px-4 bg-[#F8F9FC]">
          <button
            onClick={() => setTab('all')}
            className={`py-2 px-3 text-xs font-semibold border-b-2 -mb-px transition-colors ${
              tab === 'all'
                ? 'border-[#5B6FF5] text-[#5B6FF5]'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setTab('unread')}
            className={`py-2 px-3 text-xs font-semibold border-b-2 -mb-px transition-colors ${
              tab === 'unread'
                ? 'border-[#5B6FF5] text-[#5B6FF5]'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Unread ({notifications.filter((n) => !n.read).length})
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#E5E8F0]">
          {displayList.length === 0 ? (
            <div className="p-8 text-center text-[#9CA3AF]">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <div className="text-sm font-medium text-[#111827]">No notifications</div>
              <div className="text-xs mt-1">You're completely up to date.</div>
            </div>
          ) : (
            displayList.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleClick(notif)}
                className={`p-4 cursor-pointer hover:bg-[#F8F9FC] transition-colors flex items-start gap-3 ${
                  !notif.read ? 'bg-[#5B6FF5]/5' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E8F0] flex items-center justify-center flex-shrink-0 shadow-xs">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-[#111827] truncate">
                      {notif.title}
                    </span>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#5B6FF5] flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-[#4B5563] mt-0.5 leading-relaxed line-clamp-2">
                    {notif.description}
                  </p>
                  <span className="text-[10px] text-[#9CA3AF] mt-1 block">
                    {notif.time}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F8F9FC] border-t border-[#E5E8F0] text-center">
          <button
            onClick={() => {
              navigate('/logs/activity');
              setNotificationsPanelOpen(false);
            }}
            className="text-xs font-semibold text-[#5B6FF5] hover:underline"
          >
            View System Activity Logs &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
