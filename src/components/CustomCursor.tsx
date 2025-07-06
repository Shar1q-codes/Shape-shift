/**
 * Custom Cursor Component
 * 
 * This component manages custom cursor behavior across the application.
 * Currently configured to use the default system cursor by returning null.
 * The useCustomCursor hook handles cursor-related side effects.
 */

import React from 'react';
import { useCustomCursor } from '../hooks/useCustomCursor';

const CustomCursor: React.FC = () => {
  // Initialize custom cursor hook (handles cursor setup/cleanup)
  const { cursorRef } = useCustomCursor();

  // Return null to render nothing - uses default system cursor
  // This approach allows for easy switching between custom and default cursors
  return null;
};

export default CustomCursor;