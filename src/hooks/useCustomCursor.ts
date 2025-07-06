/**
 * Custom Cursor Hook
 * 
 * This hook manages custom cursor functionality.
 * Currently configured to use the default system cursor by removing
 * the 'cursor-none' class from the body element.
 */

import { useEffect, useRef } from 'react';

export const useCustomCursor = () => {
  // Reference to the cursor element
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove cursor-none class from body to show default cursor
    document.body.classList.remove('cursor-none');
    
    return () => {
      // Clean up - this will be handled by the template's body class
    };
  }, []);

  return { cursorRef };
};