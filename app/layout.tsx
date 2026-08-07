import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import Providers from '@/components/Providers';
import Sidebar from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata = { title: 'iconelectro – SolarBot Admin' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-[var(--bg)] p-4 md:p-6">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}