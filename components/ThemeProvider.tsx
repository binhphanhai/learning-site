'use client';

import React from 'react';
import { ThemeContext, useThemeState } from '../hooks/useTheme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, toggleTheme, setTheme, mounted } = useThemeState();

  // Prevent hydration mismatch by always providing consistent values
  // The theme script in layout.tsx ensures the DOM is correct before React hydrates
  const contextValue = { 
    theme: mounted ? theme : 'light' as const, 
    toggleTheme, 
    setTheme 
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
} 