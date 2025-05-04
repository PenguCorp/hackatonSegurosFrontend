import React from "react";
import { Layout } from "../../components/layout/Layout";
import { CharacterizationForm } from "../../components/CharacterizationForm";
import { motion } from "framer-motion";

export const CharacterizationPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold tracking-tight mb-6">User Characterization</h2>
          <CharacterizationForm />
        </motion.div>
      </div>
    </Layout>
  );
};