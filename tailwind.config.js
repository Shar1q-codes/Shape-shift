/**
 * Tailwind CSS Configuration
 * 
 * This file configures Tailwind CSS for the application.
 * It defines content paths, dark mode settings, and theme extensions
 * including custom shadow configurations for neumorphic design.
 */

/** @type {import('tailwindcss').Config} */
export default {
  // Files to scan for class usage
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  
  // Enable dark mode with class strategy (vs media query)
  darkMode: 'class',
  
  theme: {
    extend: {
      // Custom shadow configurations for various design styles
      boxShadow: {
        // Neumorphism light mode shadows
        'neumorphism': '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
        'neumorphism-inset': 'inset 8px 8px 16px #bebebe, inset -8px -8px 16px #ffffff',
        'neumorphism-pressed': 'inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff',
        
        // Neumorphism dark mode shadows
        'neumorphism-dark': '12px 12px 24px #0f0f0f, -12px -12px 24px #3f3f3f, 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'neumorphism-inset-dark': 'inset 12px 12px 24px #0f0f0f, inset -12px -12px 24px #3f3f3f, inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'neumorphism-pressed-dark': 'inset 8px 8px 16px #0a0a0a, inset -8px -8px 16px #2a2a2a, inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
        
        // Inner shadow variations
        'inner-lg': 'inset 0 10px 15px -3px rgba(0, 0, 0, 0.1), inset 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'inner-md': 'inset 0 4px 6px -1px rgba(0, 0, 0, 0.1), inset 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'inner-sm': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'inner-xs': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        
        // Pressed state shadows
        'xl-pressed': 'inset 0 20px 25px -5px rgba(0, 0, 0, 0.1), inset 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'md-pressed': 'inset 0 4px 6px -1px rgba(0, 0, 0, 0.1), inset 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};