import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/notes';
import NoteDetailsClient from './NoteDetails.client';

interface NoteDetailsPageProps {
  params: { id: string };
}

const APP_URL = 'https://notehub.example';
const OG_IMAGE = 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

export async function generateMetadata({ params }: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = params;
  try {
    const note = await fetchNoteById(id);
    const title = `Note: ${note.title} – NoteHub`;
    const description = note.content.slice(0, 100);
    const url = `${APP_URL}/notes/${encodeURIComponent(id)}`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: 'NoteHub',
        images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: note.title }],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [OG_IMAGE],
      },
    };
  } catch {
    return {
      title: 'Note – NoteHub',
      description: 'Note details',
    };
  }
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const { id } = params;
  const numericId = Number(id);
  const keyId = Number.isFinite(numericId) ? numericId : id;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', { id: keyId }],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
