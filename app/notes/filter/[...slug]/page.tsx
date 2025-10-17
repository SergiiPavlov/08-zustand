import type { Metadata } from 'next';
import NotesClient from './Notes.client';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/notes';
import type { NoteTag } from '@/types/note';

const TAGS: readonly NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;
const APP_URL = 'https://notehub.example';
const OG_IMAGE = 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

interface NotesFilterPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: NotesFilterPageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const tag = slug[0] ?? 'All';
  const title = tag === 'All' ? 'All notes – NoteHub' : `Notes tagged: ${tag} – NoteHub`;
  const description = tag === 'All' ? 'Browse all notes' : `Browse notes filtered by tag: ${tag}`;
  const url = `${APP_URL}/notes/filter/${encodeURIComponent(tag)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'NoteHub',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export default async function NotesFilterPage({ params }: NotesFilterPageProps) {
  const { slug = [] } = await params;
  const initialTag = slug[0] ?? 'All';

  // 'All' не відправляємо на бекенд
  const tagForQuery = TAGS.includes(initialTag as NoteTag) ? (initialTag as NoteTag) : undefined;

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['notes', { search: '', tag: tagForQuery, page: 1, perPage: 12 }],
    queryFn: () =>
      fetchNotes({
        search: '',
        page: 1,
        perPage: 12,
        tag: tagForQuery,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient initialTag={initialTag} />
    </HydrationBoundary>
  );
}
