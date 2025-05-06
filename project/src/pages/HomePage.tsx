import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { LoginModal } from "./LoginModal";

interface Message {
  sender: "user" | "platin";
  text: string;
}

export const PublicHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([{
    sender: "platin",
    text: "¡Hola! Soy Platin 🐧, tu asesor en educación financiera. ¿En qué puedo ayudarte hoy?"
  }]);
  const [showLogin, setShowLogin] = useState(false);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages: Message[] = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages(prev => [...prev, {
        sender: "platin",
        text: "Gracias por tu interés. Puedes iniciar sesión para una experiencia más personalizada."
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#002a5a] to-[#004b8d] text-white px-8 py-10 flex flex-col">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow">GlobalSeguros</h1>
        <Button variant="ghost" className="border border-white text-white hover:bg-white hover:text-[#002a5a]" onClick={() => setShowLogin(true)}>
          Iniciar Sesión
        </Button>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <section className="max-w-xl">
          <motion.h2 className="text-4xl font-extrabold mb-6 leading-snug" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Asegura tu futuro <br />con confianza 🛡️
          </motion.h2>
          <motion.p className="text-lg text-slate-100 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
            En <span className="font-semibold text-white">GlobalSeguros</span> te ayudamos a planificar tu retiro con soluciones digitales, rentas voluntarias y asesoría de nuestra IA: <span className="font-semibold">Platin 🐧</span>.
          </motion.p>
          <ul className="list-disc pl-5 space-y-3 text-slate-100 text-base">
            <li>Simulaciones de ahorro personalizadas</li>
            <li>Seguimiento de metas financieras</li>
            <li>Asesoría digital 24/7 con Platin</li>
          </ul>
        </section>

        <motion.section 
          className="backdrop-blur-md bg-white/70 text-slate-900 rounded-2xl shadow-xl p-6 flex flex-col h-[600px] w-full max-w-2xl mx-auto border border-slate-200" 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-[#003366] mb-4">Habla con Platin 🐧</h3>
          <div className="flex-1 overflow-y-auto space-y-3 p-4 rounded-lg bg-white/50 border border-slate-200">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`max-w-[75%] px-4 py-2 rounded-lg text-sm shadow-sm ${msg.sender === "user" ? "bg-blue-100 ml-auto text-right" : "bg-white text-left border border-slate-300"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1"
            />
            <Button onClick={handleSend}>Enviar</Button>
          </div>
        </motion.section>
      </main>

      <footer className="mt-16 text-center text-sm text-slate-300">
        &copy; {new Date().getFullYear()} GlobalSeguros. Todos los derechos reservados.
      </footer>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />

    </div>
  );
};
