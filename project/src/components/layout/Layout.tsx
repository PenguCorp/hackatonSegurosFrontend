import React from "react";
import { Navbar } from "./Navbar";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-24 pb-12"
      >
        {children}
      </motion.main>
      <footer className="py-6 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} UserProfile. All rights reserved.
        </div>
      </footer>
    </div>
  );
};