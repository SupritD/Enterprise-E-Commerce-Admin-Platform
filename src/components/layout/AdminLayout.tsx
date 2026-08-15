import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
import { NotificationsPanel } from '../common/NotificationsPanel';
import { ToastContainer } from '../common/ToastContainer';
import { useApp } from '../../context/AppContext';

export const AdminLayout: React.FC = () => {
  const { sidebarCollapsed } = useApp();

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col font-sans text-[#111827]">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Sticky Top Bar */}
      <TopBar />

      {/* Main Content Area */}
      <main
        className={`flex-1 transition-all duration-200 ${
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'
        }`}
      >
        <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
          <Outlet />
        </div>
      </main>

      {/* Modals & Overlays */}
      <GlobalSearchModal />
      <NotificationsPanel />
      <ToastContainer />
    </div>
  );
};
