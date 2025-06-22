/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable dark mode via class strategy
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        'dark-bg': '#000000',
        'dark-surface': '#1f1f1f',
        'dark-surface-2': '#262626',
        'dark-border': '#424242',
        'dark-text': '#ffffffd9',
        'dark-text-secondary': '#ffffff73',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's reset to avoid conflicts with Ant Design
  },
} 