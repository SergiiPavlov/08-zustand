import type { Metadata } from 'next';
import css from './not-found.module.css';

const APP_URL = 'https://notehub.example'; // replace with your deployment URL when available
const OG_IMAGE = 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

export const metadata = {
  title: '404 – Page not found | NoteHub',
  description: 'The page you are looking for does not exist.',
  url: `${APP_URL}/404`,
  alternates: {
    canonical: `${APP_URL}/404`,
  },
  openGraph: {
    title: '404 – Page not found | NoteHub',
    description: 'The page you are looking for does not exist.',
    url: `${APP_URL}/404`,
    siteName: 'NoteHub',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: '404 Not Found' }],
    type: 'website',
  },
} satisfies Metadata & { url: string };

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
