'use client';

import React from 'react';
import { ConfigProvider, theme } from 'antd';
import ThemeProvider from './ThemeProvider';
import { ThemeContext } from '../hooks/useTheme';

interface ClientWrapperProps {
  children: React.ReactNode;
}

function AntdConfigProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Consumer>
      {(themeContext) => {
        if (!themeContext) {
          // Fallback to light theme if context is not available
          return (
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#1890ff',
                  borderRadius: 6,
                },
              }}
            >
              {children}
            </ConfigProvider>
          );
        }

        const { theme: currentTheme } = themeContext;

        const lightTheme = {
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 6,
            colorBgContainer: '#ffffff',
            colorBgElevated: '#ffffff',
            colorBgLayout: '#f5f5f5',
            colorText: '#000000d9',
            colorTextSecondary: '#00000073',
            colorTextTertiary: '#00000040',
            colorTextQuaternary: '#00000026',
            colorBorder: '#d9d9d9',
            colorBorderSecondary: '#f0f0f0',
            colorSplit: '#f0f0f0',
            colorFill: '#f5f5f5',
            colorFillSecondary: '#fafafa',
            colorFillTertiary: '#f5f5f5',
            colorFillQuaternary: '#f0f0f0',
          },
        };

        const darkTheme = {
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 6,
            colorBgContainer: '#1f1f1f',
            colorBgElevated: '#262626',
            colorBgLayout: '#000000',
            colorText: '#ffffffd9',
            colorTextSecondary: '#ffffff73',
            colorTextTertiary: '#ffffff40',
            colorTextQuaternary: '#ffffff26',
            colorBorder: '#424242',
            colorBorderSecondary: '#303030',
            colorSplit: '#303030',
            colorFill: '#262626',
            colorFillSecondary: '#1f1f1f',
            colorFillTertiary: '#262626',
            colorFillQuaternary: '#303030',
          },
        };

        return (
          <ConfigProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
            {children}
          </ConfigProvider>
        );
      }}
    </ThemeContext.Consumer>
  );
}

// Minimal loading component that matches the theme
function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-color, #ffffff)',
      color: 'var(--text-color, #000000d9)',
      transition: 'background-color 0.2s ease, color 0.2s ease'
    }}>
      <div style={{
        width: '24px',
        height: '24px',
        border: '2px solid #1890ff',
        borderTop: '2px solid transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading screen during hydration to prevent flash
  if (!mounted) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <AntdConfigProvider>
        {children}
      </AntdConfigProvider>
    </ThemeProvider>
  );
} 