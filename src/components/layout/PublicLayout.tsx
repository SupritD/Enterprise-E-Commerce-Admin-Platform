import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from '../common/ToastContainer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col justify-center">
      <Outlet />
      <ToastContainer />
    </div>
  );
};
