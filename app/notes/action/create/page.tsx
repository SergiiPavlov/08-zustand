import type { Metadata } from 'next';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

const APP_URL = 'https://notehub.example';
const OG_IMAGE = 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

export const metadata = {
  title: 'Create note – NoteHub',
  description: 'Create a new note in your NoteHub.',
  url: `${APP_URL}/notes/action/create`,
  alternates: {
    canonical: `${APP_URL}/notes/action/create`,
  },
  openGraph: {
    title: 'Create note – NoteHub',
    description: 'Create a new note in your NoteHub.',
    url: `${APP_URL}/notes/action/create`,
    siteName: 'NoteHub',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Create note' }],
    type: 'website',
  },
} satisfies Metadata & { url: string };

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
