'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Check, Settings } from 'lucide-react';

type ConsentState = 'accepted' | 'rejected' | 'pending';

const STORAGE_KEY = 'freeaihub_cookie_consent';

export default function CookieConsent() {
  const [state, setState] = useState<ConsentState | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState | null;
    setState(stored ?? 'pending');
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setState('accepted');
    // Enable GA4 if present
    if (typeof window !== 'undefined' && (window as Window & { gtag?: Function }).gtag) {
      (window as Window & { gtag?: Function }).gtag?.('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      });
    }
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setState('rejected');
  };

  // Only show banner while pending
  if (state !== 'pending') return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-50
                 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100
                 dark:border-gray-800 p-5 animate-slide-up"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
          <Cookie className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">We use cookies</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
            We use cookies to improve your experience and analyse site usage.
            {' '}
            <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="mb-4 space-y-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
          <p><strong className="text-gray-700 dark:text-gray-300">Essential:</strong> Always active — needed for the site to work.</p>
          <p><strong className="text-gray-700 dark:text-gray-300">Analytics:</strong> Help us understand how you use the site (Google Analytics).</p>
          <p><strong className="text-gray-700 dark:text-gray-300">Marketing:</strong> Not used — we don&apos;t run ad tracking.</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          id="cookie-accept"
          onClick={accept}
          className="flex-1 btn-primary py-2.5 text-sm rounded-xl"
        >
          <Check className="w-3.5 h-3.5" /> Accept
        </button>
        <button
          id="cookie-reject"
          onClick={reject}
          className="flex-1 py-2.5 text-sm rounded-xl font-semibold border border-gray-200
                     dark:border-gray-700 text-gray-600 dark:text-gray-400
                     hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-3.5 h-3.5 inline mr-1" />Decline
        </button>
        <button
          id="cookie-details"
          onClick={() => setShowDetails(!showDetails)}
          className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                     text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          aria-label="Cookie details"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
