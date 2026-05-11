'use client';

import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

const STORAGE_KEY = 'freeaihub_saved_tools';

function getSavedIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function setSavedIds(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

interface SaveButtonProps {
  toolId: string;
  toolName: string;
  className?: string;
  showLabel?: boolean;
}

export default function SaveButton({ toolId, toolName, className = '', showLabel = false }: SaveButtonProps) {
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSaved(getSavedIds().includes(toolId));
  }, [toolId]);

  const toggle = () => {
    const ids = getSavedIds();
    const next = ids.includes(toolId) ? ids.filter((id) => id !== toolId) : [...ids, toolId];
    setSavedIds(next);
    setSaved(next.includes(toolId));
  };

  if (!mounted) return null;

  return (
    <button
      id={`save-btn-${toolId}`}
      onClick={toggle}
      aria-label={saved ? `Remove ${toolName} from saved` : `Save ${toolName}`}
      title={saved ? 'Remove from saved' : 'Save for later'}
      className={`inline-flex items-center gap-1.5 transition-all duration-200 rounded-lg p-1.5
                  ${saved
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30'
                    : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30'}
                  ${className}`}
    >
      {saved
        ? <BookmarkCheck className="w-4 h-4 fill-current" />
        : <Bookmark className="w-4 h-4" />}
      {showLabel && (
        <span className="text-xs font-medium">{saved ? 'Saved' : 'Save'}</span>
      )}
    </button>
  );
}

/** Hook to read all saved tool IDs reactively */
export function useSavedTools() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(getSavedIds());
    const handler = () => setIds(getSavedIds());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return ids;
}
