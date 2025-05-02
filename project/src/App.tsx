import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { LogoutPage } from "./pages/LogoutPage";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes - redirect authenticated users to dashboard */}
            <Route element={<PublicRoute redirectAuthenticated={true} />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
            
            {/* Public routes - accessible by all */}
            <Route element={<PublicRoute />}>
              <Route path="/logout" element={<LogoutPage />} />
            </Route>
            
            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            
            {/* Redirect root to dashboard if authenticated, otherwise to login */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;