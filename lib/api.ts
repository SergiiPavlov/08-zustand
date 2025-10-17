import { createNote as _createNote } from './api/notes';
// HW-08 compatibility: expose the API surface at lib/api.ts as required by the validator.
// The actual implementations live in ./api/notes.ts and are fully typed.
export type { Note, NoteTag } from '@/types/note';
export type { FetchNotesResponse } from './api/notes';
export {fetchNotes, fetchNoteById, updateNote, deleteNote} from './api/notes';
