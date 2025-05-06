import React, { useState } from "react";
import { Layout } from "../../components/layout/Insights_layout";
import { motion } from "framer-motion";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

interface Message {
  sender: "user" | "platin";
  text: string;
}

export const PlatinChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{
    sender: "platin",
    text: "¡Hola! Soy Platin, tu pingüino asesor en educación financiera 🐧💼 ¿En qué puedo ayudarte hoy?"
  }]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages: Message[] = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulación de respuesta de Platin
    setTimeout(() => {
      setMessages(prev => [...prev, {
        sender: "platin",
        text: "¡Gracias por tu mensaje! Estoy aquí para ayudarte con tus ahorros, metas o lo que necesites saber sobre rentas voluntarias."
      }]);
    }, 1000);
  };

  return (
    <Layout>
      <div className="w-full h-[calc(100vh-4rem)] px-6 py-6 flex flex-col">
        <div className="text-2xl font-semibold text-[#003366] mb-4">Chatea con Platin 🐧</div>
        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${msg.sender === "user" ? "bg-blue-100 ml-auto text-right" : "bg-white text-left border"}`}
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
          />
          <Button onClick={handleSend}>Enviar</Button>
        </div>
      </div>
    </Layout>
  );
};