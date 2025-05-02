import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Layout } from "../components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

export const LogoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  useEffect(() => {
    // Log the user out
    logout();
    
    // Redirect to login after a brief delay
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [logout, navigate]);
  
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="space-y-2">
              <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <LogOut className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl text-center">You've been logged out</CardTitle>
            </CardHeader>
            
            <CardContent>
              <p className="text-center text-slate-500 dark:text-slate-400">
                Thank you for using our application. You will be redirected to the login page shortly.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};