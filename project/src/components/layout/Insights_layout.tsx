import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
};