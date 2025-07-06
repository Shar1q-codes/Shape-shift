/**
 * ESLint Configuration File
 * 
 * This file configures ESLint for a TypeScript React project.
 * It sets up linting rules, plugins, and file patterns to ensure code quality.
 */

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Ignore patterns - files/directories to exclude from linting
  { ignores: ['dist'] },
  
  // Main configuration object
  {
    // Extend base configurations for JavaScript and TypeScript
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    
    // File patterns to apply this configuration to
    files: ['**/*.{ts,tsx}'],
    
    // Language options for the linter
    languageOptions: {
      ecmaVersion: 2020,           // ECMAScript version to support
      globals: globals.browser,    // Global variables available in browser environment
    },
    
    // Plugins to enhance linting capabilities
    plugins: {
      'react-hooks': reactHooks,         // React Hooks specific rules
      'react-refresh': reactRefresh,     // React Fast Refresh compatibility
    },
    
    // Specific linting rules
    rules: {
      // Apply recommended React Hooks rules
      ...reactHooks.configs.recommended.rules,
      
      // Ensure components are properly exported for React Fast Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);