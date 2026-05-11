'use client';

import { useState, FormEvent } from 'react';
import { Mail, Loader2, CheckCircle, XCircle } from 'lucide-react';

interface NewsletterFormProps {
  id?: string;
  className?: string;
  inputClassName?: string;
  variant?: 'inline' | 'stacked';
  buttonLabel?: string;
  source?: string;
}

export default function NewsletterForm({
  id = 'newsletter-form',
  className = '',
  inputClassName = '',
  variant = 'inline',
  buttonLabel = 'Subscribe Free',
  source = 'homepage',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message ?? 'Welcome! You are now subscribed. 🎉');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 text-green-600 dark:text-green-400 ${className}`}>
        <CheckCircle className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium">{message}</p>
      </div>
    );
  }

  const isStacked = variant === 'stacked';

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={`${isStacked ? 'flex flex-col gap-3' : 'flex flex-col sm:flex-row gap-3'} ${className}`}
    >
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          id={`${id}-email`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading'}
          className={`input pl-10 w-full ${inputClassName}`}
          aria-label="Email address for newsletter"
        />
      </div>

      <button
        id={`${id}-submit`}
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary flex-shrink-0 px-8 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Subscribing…</>
        ) : buttonLabel}
      </button>

      {status === 'error' && (
        <p className="flex items-center gap-1.5 text-red-500 text-xs w-full">
          <XCircle className="w-4 h-4" /> {message}
        </p>
      )}
    </form>
  );
}
