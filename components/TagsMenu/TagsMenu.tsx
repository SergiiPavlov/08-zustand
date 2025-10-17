'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './TagsMenu.module.css';
import type { NoteTag } from '@/types/note';

const NOTE_TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
const ALL_TAG = 'All';

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuId = 'tags-menu';
  const tags: (NoteTag | typeof ALL_TAG)[] = [ALL_TAG, ...NOTE_TAGS];

  // Автозакрытие при смене маршрута
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Закрытие по клику вне меню
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  return (
    <div className={css.menuContainer} ref={containerRef}>
      <button
        type="button"
        className={css.menuButton}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen(prev => !prev)}
      >
        Notes ▾
      </button>

      {isOpen && (
        <ul id={menuId} className={css.menuList} role="menu">
          {tags.map(tag => (
            <li key={tag} className={css.menuItem} role="none">
              <Link
                href={tag === ALL_TAG ? '/notes' : `/notes/filter/${encodeURIComponent(String(tag))}`}
                className={css.menuLink}
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {tag === ALL_TAG ? 'All notes' : tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
