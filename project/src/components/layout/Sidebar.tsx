// SidebarResponsive.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Calculator, HelpCircle, LogOut, Globe, BarChart3, User, Radio, Menu } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleNavigation = (key: string, path: string) => {
    setSelectedItem(key);
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="text-white bg-[#003366] p-2 rounded-md shadow"
        >
          <Menu size={24} />
        </button>
      </div>

      <aside className="hidden md:flex flex-col w-64 h-screen bg-[#003366] border-r border-[#003696]/10 fixed">
        <SidebarContent
          selectedItem={selectedItem}
          handleNavigation={handleNavigation}
          logout={logout}
        />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed top-0 left-0 z-40 w-64 h-full bg-[#003366] shadow-lg md:hidden"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
          >
            <SidebarContent
              selectedItem={selectedItem}
              handleNavigation={handleNavigation}
              logout={logout}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

interface SidebarContentProps {
  selectedItem: string;
  handleNavigation: (key: string, path: string) => void;
  logout: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ selectedItem, handleNavigation, logout }) => {
  const items = [
    { key: 'home', label: 'Panel Principal', icon: Home, path: '/panelControl' },
    { key: 'platin', label: 'Platin', icon: Radio, path: '/platin' },
    { key: 'caracterization', label: 'Caracterización', icon: User, path: '/caracterizacion' },
    { key: 'financialCalculator', label: 'Calculadora Fin.', icon: Calculator, path: '/panelControl' }
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="p-6 border-b border-[#003696]/10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Globe size={24} className="text-[#00BFFF]" />
            GlobalSeguros
          </h2>
        </div>

        <nav className="p-4 space-y-1">
          {items.map(({ key, label, icon: Icon, path }) => (
            <button
              key={key}
              onClick={() => handleNavigation(key, path)}
              className={`w-full flex items-center justify-start p-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedItem === key
                  ? 'bg-[#00BFFF]/30 text-white'
                  : 'text-white hover:bg-[#00BFFF]/20 hover:text-[#00BFFF]'
              }`}
            >
              <Icon size={20} className="mr-3 text-[#00BFFF]" />
              <span className="whitespace-nowrap">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="px-4 pb-4 border-t border-[#003696]/10 space-y-2">
        <a className="flex items-center p-2 rounded-lg text-white hover:bg-[#00BFFF]/20 hover:text-[#00BFFF] transition-colors cursor-pointer">
          <HelpCircle size={20} className="mr-3 text-[#00BFFF]" />
          Ayuda y Soporte
        </a>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          icon={<LogOut size={18} />}
          className="text-white hover:text-[#00BFFF]"
        >
          <span className="hidden sm:inline">Cerrar Sesión</span>
        </Button>
      </div>
    </div>
  );
};