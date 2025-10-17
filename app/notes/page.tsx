import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

const APP_URL = 'https://notehub.example';
const OG_IMAGE = 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

export const metadata = {
  title: 'All notes – NoteHub',
  description: 'Browse all of your notes in one place.',
  url: `${APP_URL}/notes`,
  alternates: {
    canonical: `${APP_URL}/notes`,
  },
  openGraph: {
    title: 'All notes – NoteHub',
    description: 'Browse all of your notes in one place.',
    url: `${APP_URL}/notes`,
    siteName: 'NoteHub',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'All notes' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All notes – NoteHub',
    description: 'Browse all of your notes in one place.',
    images: [OG_IMAGE],
  },
} satisfies Metadata & { url: string };

export default function NotesPage() {
  redirect('/notes/filter/All');
}
