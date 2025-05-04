import React from 'react';
import { motion } from 'framer-motion';
import { User as UserIcon } from 'lucide-react';
import { Card } from '../ui/dashboard_card';
import { User } from '../../types';

interface ProfileCompletionProps {
  user: User;
}

export const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ user }) => {
  const completionPercentage = user.profileCompletionPercentage || 25;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="h-full">
        <Card.Header>
          <div className="flex items-center justify-between">
            <Card.Title className="text-lg">Completado del Perfil</Card.Title>
            <UserIcon size={20} className="text-[#003696]" />
          </div>
        </Card.Header>
        <Card.Content>
          <div className="relative pt-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-[#003696]">
                  {completionPercentage}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#003696]/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#003696]"
              ></motion.div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Complete su perfil para desbloquear más funciones
            </p>
          </div>
        </Card.Content>
      </Card>
    </motion.div>
  );
};