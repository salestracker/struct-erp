import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Use environment variable to determine the base
const base = import.meta.env.VITE_BASENAME || "/"; // environment variable set up

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={base}>
    <App />
  </BrowserRouter>
);