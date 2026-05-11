'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface RatingWidgetProps {
  toolId: string;
  toolName: string;
  currentAvg?: number;
  currentCount?: number;
}

const SESSION_KEY = 'freeaihub_ratings';

function getStoredRating(toolId: string): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = JSON.parse(localStorage.getItem(SESSION_KEY) ?? '{}');
    return stored[toolId] ?? null;
  } catch { return null; }
}

function storeRating(toolId: string, rating: number) {
  const stored = JSON.parse(localStorage.getItem(SESSION_KEY) ?? '{}');
  stored[toolId] = rating;
  localStorage.setItem(SESSION_KEY, JSON.stringify(stored));
}

export default function RatingWidget({ toolId, toolName, currentAvg = 0, currentCount = 0 }: RatingWidgetProps) {
  const [hover, setHover] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [avg, setAvg] = useState(currentAvg);
  const [count, setCount] = useState(currentCount);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = getStoredRating(toolId);
    if (stored) setSelected(stored);
  }, [toolId]);

  const submit = async (rating: number) => {
    if (submitting || selected !== null) return;
    setSubmitting(true);

    // Simple anonymous IP hash via a fingerprint
    const ipHash = await crypto.subtle
      .digest('SHA-256', new TextEncoder().encode(navigator.userAgent + Date.now().toString().slice(0, -4)))
      .then((buf) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join(''));

    const { error } = await supabase.from('ratings').insert({
      tool_id: toolId,
      ip_hash: ipHash,
      rating,
    });

    if (error) {
      if (error.code === '23505') {
        setMessage('You have already rated this tool.');
      } else {
        setMessage('Could not save rating. Please try again.');
      }
    } else {
      setSelected(rating);
      storeRating(toolId, rating);
      setAvg(((avg * count) + rating) / (count + 1));
      setCount(count + 1);
      setMessage('Thanks for your rating! 🎉');
    }
    setSubmitting(false);
  };

  const display = hover || selected || Math.round(avg);

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {selected ? 'Your rating' : `Rate ${toolName}`}
      </p>

      {/* Star selector */}
      <div
        className="flex gap-1"
        role="group"
        aria-label={`Rate ${toolName}`}
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            id={`rating-star-${toolId}-${star}`}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            disabled={selected !== null || submitting}
            onClick={() => submit(star)}
            onMouseEnter={() => setHover(star)}
            className="disabled:cursor-default transition-transform duration-100 hover:scale-110 active:scale-95"
          >
            <Star
              className={`w-7 h-7 transition-colors duration-100
                ${star <= display
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-300 dark:text-gray-600'}`}
            />
          </button>
        ))}
      </div>

      {/* Current rating summary */}
      {count > 0 && (
        <p className="text-xs text-gray-500">
          {avg.toFixed(1)} / 5.0 &bull; {count} {count === 1 ? 'rating' : 'ratings'}
        </p>
      )}

      {message && (
        <p className={`text-xs font-medium ${message.startsWith('Could') ? 'text-red-500' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
