import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

export const LogoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();

    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#003366] to-[#005599] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 space-y-6 text-center"
      >
        <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
          <LogOut className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#003366]">Sesión finalizada</h2>
        <p className="text-slate-600 text-sm">
          ¡Gracias por usar GlobalSeguros! Serás redirigido al inicio de sesión en unos segundos...
        </p>
      </motion.div>
    </div>
  );
};