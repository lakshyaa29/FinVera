import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { UserStateProvider } from '../context/UserStateContext';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FinVera — Master Money & Simulated Investing',
  description:
    'Learn money by doing. Master cash flow, banking, credit, and investing with bite-sized lessons, interactive financial engines, and simulated portfolio practice.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F8F8F3] text-[#171717] font-sans selection:bg-[#70E000] selection:text-[#171717]">
        <UserStateProvider>{children}</UserStateProvider>
      </body>
    </html>
  );
}
