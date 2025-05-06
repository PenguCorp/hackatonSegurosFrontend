import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContextType, User } from "../types";
import api from "../utils/api";

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API call for login
const loginApi = async (email: string, password: string): Promise<User> => {
  try {
    const response = await api.post("/auth", { email, password });
    return response.data;
  } catch (error) {
    if ((error as any).response?.status === 401) {
      throw new Error("Credenciales incorrectas");
    }
    throw new Error("Ha ocurrido un error al iniciar sesión");
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check for saved authentication on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userData = await loginApi(email, password);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error desconocido");
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
    error,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};