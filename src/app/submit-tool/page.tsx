'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Send, CheckCircle, ExternalLink, Info, Loader2 } from 'lucide-react';

const CATEGORIES = [
  'AI Agents & Autonomous Agents', 'Text & Content Generation', 'Image Generation AI',
  'Video Generation AI', 'Vibe Coding / AI Dev Tools', 'SEO & Marketing AI',
  'Voice & Speech AI', 'PDF & Document AI', 'Meeting & Transcription AI',
  'Workflow & Automation AI', 'Data & Analytics', 'Chatbot Builders',
  'Research & Summarization', 'Education & Tutoring', 'Graphic Design',
  'Music & Audio', 'Social Media AI', 'Email & Outreach', 'Translation AI',
  'Presentations & Slides', 'Lead Generation', 'Vision & OCR',
  'Health & Wellness', 'Cybersecurity AI', 'Avatar & Talking Head',
  'Developer & API Tools', 'Prediction & Forecasting', 'Sustainability AI',
  'Gaming & Interactive', 'Personal Finance', 'Legal AI', 'HR & Recruitment',
  'Nonprofit AI', 'Customer Support', 'Knowledge Management',
  'E-commerce & Product', 'Podcast & Audio', 'Science & Research',
  'Photo Editing', 'Video Editing AI', 'Other',
];

const REQUIREMENTS = [
  'Must have a genuine free tier, free plan, or be open-source',
  'No "free trials" that require a credit card without showing a free plan',
  'Tool must be live and accessible — no coming-soon pages',
  'Must be an AI-powered tool (not just a regular SaaS)',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function SubmitToolPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      tool_name:       (form.elements.namedItem('tool_name')       as HTMLInputElement).value,
      tool_url:        (form.elements.namedItem('tool_url')        as HTMLInputElement).value,
      category:        (form.elements.namedItem('category')        as HTMLSelectElement).value,
      tagline:         (form.elements.namedItem('tagline')         as HTMLInputElement).value,
      free_tier:       (form.elements.namedItem('free_tier')       as HTMLInputElement).value,
      description:     (form.elements.namedItem('description')     as HTMLTextAreaElement).value,
      submitter_name:  (form.elements.namedItem('submitter_name')  as HTMLInputElement).value,
      submitter_email: (form.elements.namedItem('submitter_email') as HTMLInputElement).value,
    };

    try {
      const res = await fetch('/api/submit-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMsg(json.error ?? 'Submission failed. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Submit a Free AI Tool</h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
              We list tools that are genuinely free — no paywalls, no misleading trials.
              Reviewed and published within 48 hours.
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-12 grid gap-8">

          {/* Requirements */}
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-6 border border-blue-100 dark:border-blue-900">
            <h2 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-4">
              <Info className="w-5 h-5 text-blue-600" /> Submission Requirements
            </h2>
            <ul className="space-y-2">
              {REQUIREMENTS.map((req) => (
                <li key={req} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Success state */}
          {status === 'success' ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-10 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Submission Received!</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                We&apos;ll review your submission within 48 hours. If approved, the tool will appear on FreeAIHub.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="btn-secondary px-6 py-2.5 rounded-xl text-sm"
              >
                Submit Another Tool
              </button>
            </div>
          ) : (
            /* Form */
            <form
              id="submit-tool-form"
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm space-y-6"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tool Details</h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Tool Name <span className="text-red-500">*</span>
                  </label>
                  <input id="tool-name" name="tool_name" type="text" required
                    placeholder="e.g. ChatGPT" className="input w-full" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Website URL <span className="text-red-500">*</span>
                  </label>
                  <input id="tool-url" name="tool_url" type="url" required
                    placeholder="https://example.com" className="input w-full" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select id="tool-category" name="category" required
                  className="input w-full bg-white dark:bg-gray-800">
                  <option value="">Select a category…</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  One-line description <span className="text-red-500">*</span>
                </label>
                <input id="tool-tagline" name="tagline" type="text" required maxLength={100}
                  placeholder="e.g. AI chatbot for writing, coding, and analysis"
                  className="input w-full" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  What is free? <span className="text-red-500">*</span>
                </label>
                <input id="tool-free-tier" name="free_tier" type="text" required
                  placeholder="e.g. Unlimited GPT-3.5, 25 images/month, open-source self-host"
                  className="input w-full" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Full description
                </label>
                <textarea id="tool-description" name="description" rows={4}
                  placeholder="Describe the tool, its main features, and what makes the free tier useful…"
                  className="input w-full resize-none" />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Your name
                  </label>
                  <input id="submitter-name" name="submitter_name" type="text"
                    placeholder="Jane Smith" className="input w-full" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Your email
                  </label>
                  <input id="submitter-email" name="submitter_email" type="email"
                    placeholder="jane@example.com" className="input w-full" />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input id="confirm-free" name="confirm_free" type="checkbox" required
                  className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <label htmlFor="confirm-free" className="text-sm text-gray-600 dark:text-gray-400">
                  I confirm this tool has a genuine free tier with no credit card required and it is actively accessible.
                </label>
              </div>

              {status === 'error' && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-sm text-red-700 dark:text-red-400">
                  {errorMsg}
                </div>
              )}

              <button
                id="submit-tool-btn"
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full justify-center py-3.5 text-base rounded-xl gap-2 disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                ) : (
                  <><Send className="w-4 h-4" /> Submit for Review</>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                We review every submission within 48 hours. You&apos;ll receive a confirmation if accepted.
              </p>
            </form>
          )}

          {/* Sponsor note */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 text-center">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600" /> Want a Featured Listing?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Get your tool featured at the top of its category, included in our newsletter, and promoted across our channels.
            </p>
            <a href="mailto:hello@freeaihub.io?subject=Featured Listing Inquiry"
              className="btn-secondary px-6 py-2.5 rounded-xl text-sm">
              Contact for Sponsored Listing
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
