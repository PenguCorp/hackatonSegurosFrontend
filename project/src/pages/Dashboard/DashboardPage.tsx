import React from "react";
import { Layout } from "../../components/layout/Layout";
import { CharacterizationForm } from "./CharacterizationForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { useAuth } from "../../context/AuthContext";
import { User, BarChart4, Activity } from "lucide-react";
import { motion } from "framer-motion";

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold tracking-tight mb-3">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Welcome back, {user?.name || user?.email}! Here's your profile dashboard.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Profile Completion</CardTitle>
                  <User size={20} className="text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        25%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-900/30">
                    <div
                      style={{ width: "25%" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Complete your profile to unlock more features
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Activity</CardTitle>
                  <Activity size={20} className="text-teal-500" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No activities recorded yet
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">User Stats</CardTitle>
                  <BarChart4 size={20} className="text-purple-500" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Statistics will appear as you interact with the system
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold tracking-tight mb-6">User Profile</h2>
          <CharacterizationForm />
        </motion.div>
      </div>
    </Layout>
  );
};