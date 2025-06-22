'use client';

import { useState, useEffect, createContext, useContext } from 'react';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useThemeState = () => {
  // Initialize theme from DOM to prevent hydration mismatch
  const getInitialTheme = (): ThemeMode => {
    if (typeof window === 'undefined') return 'light';
    // Read from DOM attribute set by the script in layout.tsx
    const domTheme = document.documentElement.getAttribute('data-theme');
    return domTheme === 'dark' ? 'dark' : 'light';
  };

  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Sync state with DOM on mount
    const domTheme = document.documentElement.getAttribute('data-theme');
    if (domTheme && (domTheme === 'light' || domTheme === 'dark')) {
      setThemeState(domTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Update localStorage
      localStorage.setItem('theme', theme);
      // Update document class and attribute
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  return {
    theme,
    toggleTheme,
    setTheme,
    mounted
  };
}; 