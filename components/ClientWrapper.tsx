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

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <ThemeProvider>
      <AntdConfigProvider>
        {children}
      </AntdConfigProvider>
    </ThemeProvider>
  );
} 