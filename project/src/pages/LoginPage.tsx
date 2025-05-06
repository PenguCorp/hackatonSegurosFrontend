import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Mail, Lock, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setShowModal(false);
      navigate("/caracterizacion");
    } catch (err) {
      // error handled in context
    }
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
          >
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/home");
              }}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
            >
              <X size={20} />
            </button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[#003366]">Bienvenido a GlobalSeguros</h1>
              <p className="text-sm text-slate-600 mt-1">Ingresa para continuar</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm p-3 bg-red-100 text-red-600 rounded-md mt-4">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <Input
                label="Correo electrónico"
                type="email"
                id="email"
                placeholder="usuario@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={<Mail size={18} />}
              />
              <Input
                label="Contraseña"
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                icon={<Lock size={18} />}
              />
              <p className="text-xs text-right text-[#00BFFF] cursor-pointer hover:underline">
                ¿Olvidaste tu contraseña?
              </p>
              <Button
                type="submit"
                fullWidth
                variant="primary"
                isLoading={isLoading}
              >
                {isLoading ? "Ingresando..." : "Iniciar sesión"}
              </Button>
            </form>

            <div className="text-center text-xs text-slate-400 mt-4">
              Accede con: <strong>user@example.com</strong> / <strong>12345</strong>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};