import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simple Todo App',
  description: 'Next.js + Supabase で作るシンプルなTodoアプリ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        <main className="container mx-auto px-4 py-8 max-w-2xl">{children}</main>
      </body>
    </html>
  );
}
