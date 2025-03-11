import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import React from 'react';
import BimErpDashboard from './pages/BimErpDashboard';
import Marketplace from "./pages/Marketplace";
import CRM from "./pages/CRM";
import StructuralAwareness from "./pages/StructuralAwareness";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { HeroSection } from './components/sections/HeroSection';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Create a client
const queryClient = new QueryClient();

// Navigation component with authentication
const Navigation = () => {
  const { isAuthenticated, logout, user } = useAuth();
  
  if (!isAuthenticated) return null;
  
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-white hover:text-gray-300">Dashboard</Link>
          <Link to="/marketplace" className="text-white hover:text-gray-300">Marketplace</Link>
          <Link to="/crm" className="text-white hover:text-gray-300">CRM</Link>
          <Link to="/structural" className="text-white hover:text-gray-300">Structural Awareness</Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">{user?.name} ({user?.roles.join(', ')})</span>
          <button 
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={isAuthenticated ? <BimErpDashboard /> : <HeroSection />} />
          <Route path="/marketplace" element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          } />
          <Route path="/crm" element={
            <ProtectedRoute>
              <CRM />
            </ProtectedRoute>
          } />
          <Route path="/structural" element={
            <ProtectedRoute>
              <StructuralAwareness />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
