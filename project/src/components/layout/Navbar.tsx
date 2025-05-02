import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../ui/Button";
import { Moon, Sun, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 backdrop-blur-md bg-white/75 dark:bg-slate-900/75 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="text-xl font-bold text-blue-600 dark:text-blue-400"
            >
              <span className="flex items-center">
                <User size={24} className="mr-2" />
                UserProfile
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              icon={darkMode ? <Sun size={18} /> : <Moon size={18} />}
            />

            {isAuthenticated ? (
              <>
                <span className="hidden md:inline text-sm text-slate-600 dark:text-slate-300">
                  Hello, {user?.nombre || user?.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  icon={<LogOut size={18} />}
                >
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </nav>
  );
};