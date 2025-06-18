import '../styles/globals.css';
import ClientWrapper from '../components/ClientWrapper';

export const metadata = {
  title: 'Learning Site - Frontend Development',
  description: 'Personal learning site for frontend development roadmap and senior engineer path',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
} 