
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import CRM from "./pages/CRM";
import StructuralAwareness from "./pages/StructuralAwareness";
import Login from "./pages/Login"; // Import the Login component
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import BimErpDashboard from './pages/BimErpDashboard';

import { HeroSection } from './components/sections/HeroSection';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <div>
          {isLoggedIn && (
            <header style={{ padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
              <nav>
                <Link to="/" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
                <Link to="/marketplace" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Marketplace</Link>
                <Link to="/crm" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>CRM</Link>
                <Link to="/structural" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Structural Awareness</Link>
              </nav>
            </header>
          )}
          <main style={{ padding: '1rem' }}>
            <Routes>
              <Route path="/" element={isLoggedIn ? <BimErpDashboard /> : <HeroSection />} />
              <Route path="/marketplace" element={isLoggedIn ? <Marketplace /> : <Navigate to="/login" />} />
              <Route path="/crm" element={isLoggedIn ? <CRM /> : <Navigate to="/login" />} />
              <Route path="/structural" element={isLoggedIn ? <StructuralAwareness /> : <Navigate to="/login" />} />
              <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};


export default App;
