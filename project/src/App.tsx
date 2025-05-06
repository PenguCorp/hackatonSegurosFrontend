import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { LogoutPage } from "./pages/LogoutPage";
import { CharacterizationPage } from "./pages/Dashboard/CharacterizationPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { DashboardFullPage } from "./pages/Dashboard/DashboardFullPage";
import { PlatinChatPage } from "./pages/Dashboard/PlatinChatPage";
import { PublicHomePage } from "./pages/HomePage"; // 👈 tu nueva página pública

const RootRedirect = () => {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/panelControl" : "/home"} replace />;
};

function AppRoutes() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<RootRedirect />} />

        {/* Public Home */}
        <Route path="/home" element={<PublicHomePage />} />
        
        {/* Public Modal login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/panelControl" element={<DashboardFullPage />} />
          <Route path="/platin" element={<PlatinChatPage />} />
          <Route path="/caracterizacion" element={<CharacterizationPage />} />
        </Route>

        {/* Logout now redirects to /home */}
        <Route path="/logout" element={<LogoutPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      {/* Modal rendering over existing content */}
      {background && <Routes><Route path="/login" element={<LoginPage />} /></Routes>}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;