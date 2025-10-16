import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const APP_URL = 'https://notehub.example'; // replace with your deployment URL when available
const OG_IMAGE = 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'A simple and efficient notes app on Next.js',
  icons: { icon: '/icon.svg' },
  openGraph: {
    title: 'NoteHub',
    description: 'A simple and efficient notes app on Next.js',
    url: APP_URL,
    siteName: 'NoteHub',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'NoteHub' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NoteHub',
    description: 'A simple and efficient notes app on Next.js',
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main>{children}{modal}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
