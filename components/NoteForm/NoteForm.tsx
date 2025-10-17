'use client';
import css from './NoteForm.module.css';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createNote } from '@/lib/api/notes';
import { getErrorMessage } from '@/lib/errors';
import type { NoteTag } from '@/types/note';
import { useNoteDraftStore, initialDraft, type NoteDraft } from '@/lib/store/noteStore';

const TAGS: readonly NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;

export default function NoteForm() {
  const router = useRouter();
  const qc = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      // invalidate lists and details
      qc.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created');
      clearDraft();
      router.back();
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement & { name: keyof NoteDraft };
    setDraft({ ...draft, [name]: value } as NoteDraft);
  };

  const handleSubmit = (formData: FormData) => {
    const title = String(formData.get('title') ?? '').trim();
    const content = String(formData.get('content') ?? '').trim();
    const tag = (String(formData.get('tag') ?? 'Todo') as NoteTag);
    if (!title) {
      toast.error('Title is required');
      return;
    }
    mutate({ title, content, tag });
  };

  const handleCancel = () => {
    router.back(); // do not clear draft on cancel
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          defaultValue={draft.title || initialDraft.title}
          onChange={handleChange}
          aria-required="true"
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          defaultValue={draft.content || initialDraft.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft.tag || initialDraft.tag}
          onChange={handleChange}
        >
          {TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" disabled={isPending} className={css.buttonPrimary}>
          {isPending ? 'Creating…' : 'Create'}
        </button>
        <button type="button" onClick={handleCancel} className={css.buttonSecondary}>
          Cancel
        </button>
      </div>
    </form>
  );
}
