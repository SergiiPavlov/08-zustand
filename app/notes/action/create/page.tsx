import type { Metadata } from 'next';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
  title: 'Create note – NoteHub',
  description: 'Create a new note in your NoteHub.',
  openGraph: {
    title: 'Create note – NoteHub',
    description: 'Create a new note in your NoteHub.',
    url: 'https://notehub.example/notes/action/create',
    siteName: 'NoteHub',
    images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg', width: 1200, height: 630, alt: 'Create note' }],
    type: 'website',
  },
};

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
