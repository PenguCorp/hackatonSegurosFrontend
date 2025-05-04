import React, { useState } from 'react';
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Home, Calculator, HelpCircle, LogOut, Globe, BarChart3, User, Radio } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isCharacterizationOpen, setIsCharacterizationOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('home');

  const handleOpenCharacterization = () => {
    setIsCharacterizationOpen(true);
    setSelectedItem('caracterization');
    navigate('/caracterizacion');
  };

  const motionProps = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4 },
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-[#003366] border-r border-[#003696]/10 fixed">
      <div className="p-4 border-b border-[#003696]/10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold flex items-center text-white">
          <Globe size={24} className="mr-2 text-[#00BFFF]" />
          GlobalSeguros
        </h2>
        </motion.div>
        
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <motion.li {...motionProps}>
            <a
              className={`flex items-center p-2 rounded-lg ${selectedItem === 'home' ? 'bg-[#00BFFF]/30 text-white' : 'text-white hover:bg-[#00BFFF]/20 hover:text-[#00BFFF]'} font-medium`}
              onClick={() => setSelectedItem('home')}
            >
              <Home size={20} className="mr-3 text-[#00BFFF]" />
              Panel Principal
            </a>
          </motion.li>
          <motion.li {...motionProps}>
            <a
              className={`flex items-center p-2 rounded-lg ${selectedItem === 'calculator' ? 'bg-[#00BFFF]/30 text-white' : 'text-white hover:bg-[#00BFFF]/20 hover:text-[#00BFFF]'}`}
              onClick={() => setSelectedItem('calculator')}
            >
              <Calculator size={20} className="mr-3 text-[#00BFFF]" />
              Calculadora Financiera
            </a>
          </motion.li>
          <motion.li {...motionProps}>
            <a
              className={`flex items-center p-2 rounded-lg ${selectedItem === 'statistics' ? 'bg-[#00BFFF]/30 text-white' : 'text-white hover:bg-[#00BFFF]/20 hover:text-[#00BFFF]'}`}
              onClick={() => setSelectedItem('statistics')}
            >
              <BarChart3 size={20} className="mr-3 text-[#00BFFF]" />
              Estadísticas
            </a>
          </motion.li>
          <motion.li {...motionProps}>
            <a
              className={`flex items-center p-2 rounded-lg ${selectedItem === 'platin' ? 'bg-[#00BFFF]/30 text-white' : 'text-white hover:bg-[#00BFFF]/20 hover:text-[#00BFFF]'}`}
              onClick={() => setSelectedItem('platin')}
            >
              <Radio size={20} className="mr-3 text-[#00BFFF]" />
              Platin
            </a>
          </motion.li>
          <motion.li {...motionProps}>
            <a
              onClick={handleOpenCharacterization}
              className={`flex items-center p-2 rounded-lg ${selectedItem === 'caracterization' ? 'bg-[#00BFFF]/30 text-white' : 'text-white hover:bg-[#00BFFF]/20 hover:text-[#00BFFF]'}`}
            >
              <User size={20} className="mr-3 text-[#00BFFF]" />
              Caracterización
            </a>
          </motion.li>
        </ul>
      </nav>
      <div className="p-4 border-t border-[#003696]/10">
        <ul className="space-y-2">
          <motion.li {...motionProps}>
            <a className="flex items-center p-2 rounded-lg text-white hover:bg-[#00BFFF]/20 hover:text-[#00BFFF] transition-colors">
              <HelpCircle size={20} className="mr-3 text-[#00BFFF]" />
              Ayuda y Soporte
            </a>
          </motion.li>
          <motion.li {...motionProps}>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              icon={<LogOut size={18} />}
            >
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </Button>
          </motion.li>
        </ul>
      </div>
    </aside>
  );
};