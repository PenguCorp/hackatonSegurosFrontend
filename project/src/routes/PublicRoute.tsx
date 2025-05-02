import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PublicRouteProps {
  redirectAuthenticated?: boolean;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  redirectAuthenticated = false,
}) => {
  const { isAuthenticated } = useAuth();
  
  // Redirect authenticated users to dashboard if redirectAuthenticated is true
  if (redirectAuthenticated && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Render child routes
  return <Outlet />;
};