import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Settings } from 'lucide-react';
import { User as UserType } from '../../types';

interface DashboardHeaderProps {
  user: UserType;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#003696]">
          Hola, {user.name.split(' ')[0]}
        </h1>
        <p className="text-slate-600 mt-1">
          Bienvenido a tu panel de anualidad
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center">
          <Bell size={18} />
        </button>

        <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center">
          <Settings size={18} />
        </button>

        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#003696]"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#003696] flex items-center justify-center text-white">
            <User size={18} />
          </div>
        )}
      </div>
    </motion.div>
  );
};