'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function NoteCreateModal() {
  const router = useRouter();
  const handleClose = () => router.back();

  return (
    <Modal isOpen onClose={handleClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ margin: 0 }}>Create note</h2>
        <NoteForm />
      </div>
    </Modal>
  );
}
