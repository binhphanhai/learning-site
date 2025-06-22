'use client';

import React from 'react';
import { ThemeContext, useThemeState } from '../hooks/useTheme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, toggleTheme, setTheme, mounted } = useThemeState();

  // Always render children, but provide default theme if not mounted yet
  const contextValue = mounted 
    ? { theme, toggleTheme, setTheme }
    : { theme: 'light' as const, toggleTheme, setTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
} 