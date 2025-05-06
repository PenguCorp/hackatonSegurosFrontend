import React from "react";
import { Layout } from "../../components/layout/Insights_layout";
import { CharacterizationForm } from "../../components/CharacterizationForm";
import { motion } from "framer-motion";

export const CharacterizationPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#003696] mb-2">
            Caracterización del Usuario
          </h2>
          <p className="text-slate-600 mb-6">
            Ayúdanos a conocerte mejor para personalizar tu experiencia.
          </p>
          <CharacterizationForm />
        </motion.div>
      </div>
    </Layout>
  );
};
