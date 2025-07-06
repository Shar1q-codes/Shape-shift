/**
 * Vite Configuration
 * 
 * This file configures the Vite build tool for the application.
 * It sets up plugins and optimization settings for the development
 * and production builds.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Configure plugins
  plugins: [react()],
  
  // Optimization settings
  optimizeDeps: {
    // Exclude certain dependencies from optimization
    exclude: ['lucide-react'],
  },
});