/**
 * Main Application Entry Point
 * 
 * This file is the entry point for the React application.
 * It renders the root App component wrapped in StrictMode and ThemeProvider
 * to enable theme switching functionality throughout the application.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

// Create root and render the application
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);