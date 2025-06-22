import '../styles/globals.css';
import ClientWrapper from '../components/ClientWrapper';

export const metadata = {
  title: 'Learning Site - Frontend Development',
  description: 'Personal learning site for frontend development roadmap and senior engineer path',
};

// Script to prevent theme flash - runs before React hydrates
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch (e) {
      // Fallback to light theme if there's any error
      document.documentElement.setAttribute('data-theme', 'light');
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script 
          dangerouslySetInnerHTML={{ __html: themeScript }} 
        />
      </head>
      <body suppressHydrationWarning>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
} 