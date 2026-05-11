'use client';

import { useState, useEffect } from 'react';
import { supabase, type Tool, type Category } from '@/lib/supabase';
import {
  LogOut, RefreshCw, Eye, TrendingUp, Users, Database,
  Plus, ChevronRight, Inbox, CheckCircle, XCircle, Clock,
} from 'lucide-react';

const ADMIN_KEY = 'freeaihub_admin_authed';

/* ─── Submission type ─────────────────────────────────────── */
interface Submission {
  id:              string;
  tool_name:       string;
  tool_url:        string;
  category:        string;
  tagline:         string;
  free_tier:       string;
  description:     string | null;
  submitter_name:  string | null;
  submitter_email: string | null;
  status:          'pending' | 'approved' | 'rejected';
  created_at:      string;
}

/* ─── Login Gate ───────────────────────────────────────────── */
function LoginGate({ onAuth }: { onAuth: () => void }) {
  const [pwd, setPwd]     = useState('');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/auth', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ password: pwd }),
    });
    if (res.ok) {
      sessionStorage.setItem(ADMIN_KEY, '1');
      onAuth();
    } else {
      setError('Incorrect password.');
      setPwd('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Database className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-xs text-gray-400">FreeAIHub — enter your ADMIN_PASSWORD</p>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <input
              id="admin-password"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Enter admin password"
              required
              className="input w-full"
            />
            <p className="text-xs text-gray-400 mt-1">Set via <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">ADMIN_PASSWORD</code> in your .env.local</p>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button id="admin-login-btn" type="submit" className="btn-primary w-full justify-center py-3">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Stat Card ────────────────────────────────────────────── */
function StatCard({ label, value, icon: Icon, color }: {
  label: string; value: string | number; icon: React.ElementType; color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

/* ─── Submission row ───────────────────────────────────────── */
function SubmissionRow({ sub, onAction }: {
  sub: Submission;
  onAction: (id: string, status: 'approved' | 'rejected') => void;
}) {
  const [busy, setBusy] = useState(false);

  const act = async (status: 'approved' | 'rejected') => {
    setBusy(true);
    await supabase.from('tool_submissions').update({ status }).eq('id', sub.id);
    onAction(sub.id, status);
    setBusy(false);
  };

  const statusBadge = {
    pending:  'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    approved: 'bg-green-50  text-green-700  dark:bg-green-900/30  dark:text-green-400',
    rejected: 'bg-red-50    text-red-700    dark:bg-red-900/30    dark:text-red-400',
  }[sub.status];

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
      <td className="px-4 pl-6 py-4">
        <p className="font-semibold text-sm text-gray-900 dark:text-white">{sub.tool_name}</p>
        <a href={sub.tool_url} target="_blank" rel="noopener noreferrer"
          className="text-xs text-blue-500 hover:underline truncate block max-w-[150px]">
          {sub.tool_url}
        </a>
      </td>
      <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-400">{sub.category}</td>
      <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-400 max-w-[120px] truncate">{sub.free_tier}</td>
      <td className="px-4 py-4 text-xs text-gray-400">
        {sub.submitter_name || '—'}<br />
        <span className="text-[11px]">{sub.submitter_email || ''}</span>
      </td>
      <td className="px-4 py-4 text-xs text-gray-400">
        {new Date(sub.created_at).toLocaleDateString()}
      </td>
      <td className="px-4 py-4">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge}`}>
          {sub.status}
        </span>
      </td>
      <td className="px-4 py-4">
        {sub.status === 'pending' && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => act('approved')}
              disabled={busy}
              title="Approve"
              className="p-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-400 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => act('rejected')}
              disabled={busy}
              title="Reject"
              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 transition-colors"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

/* ─── Main Dashboard ───────────────────────────────────────── */
function Dashboard() {
  const [tools, setTools]             = useState<Tool[]>([]);
  const [categories, setCategories]   = useState<Category[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading]         = useState(true);
  const [tab, setTab]                 = useState<'tools' | 'submissions'>('tools');

  const load = async () => {
    setLoading(true);
    const [{ data: t }, { data: c }, { data: s }] = await Promise.all([
      supabase.from('tools').select('*, categories(name)').order('created_at', { ascending: false }).limit(25),
      supabase.from('categories').select('*').order('name'),
      supabase.from('tool_submissions').select('*').order('created_at', { ascending: false }),
    ]);
    setTools((t ?? []) as Tool[]);
    setCategories((c ?? []) as Category[]);
    setSubmissions((s ?? []) as Submission[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    window.location.reload();
  };

  const handleSubmissionAction = (id: string, status: 'approved' | 'rejected') => {
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status } : s));
  };

  const totalClicks    = tools.reduce((s, t) => s + (t.click_count ?? 0), 0);
  const featuredCount  = tools.filter((t) => t.featured).length;
  const pendingCount   = submissions.filter((s) => s.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top bar */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Database className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 dark:text-white">FreeAIHub Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <button id="admin-refresh" onClick={load} className="btn-ghost text-sm gap-1.5" title="Refresh">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button id="admin-logout" onClick={logout} className="btn-ghost text-sm gap-1.5 text-red-500">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Tools"     value={tools.length}               icon={Database}   color="bg-blue-600" />
          <StatCard label="Categories"      value={categories.length}          icon={Eye}        color="bg-purple-600" />
          <StatCard label="Total Clicks"    value={totalClicks.toLocaleString()} icon={TrendingUp} color="bg-green-600" />
          <StatCard label="Pending Reviews" value={pendingCount}               icon={Inbox}      color={pendingCount > 0 ? 'bg-amber-500' : 'bg-gray-400'} />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setTab('tools')}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              tab === 'tools'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Database className="w-4 h-4 inline mr-1.5" />
            Tools ({tools.length})
          </button>
          <button
            onClick={() => setTab('submissions')}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors relative ${
              tab === 'submissions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Inbox className="w-4 h-4 inline mr-1.5" />
            Submissions
            {pendingCount > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold bg-amber-500 text-white rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
        </div>

        {/* ── Tools tab ── */}
        {tab === 'tools' && (
          <>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="font-bold text-gray-900 dark:text-white">Recent Tools (last 25)</h2>
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-primary text-xs px-4 py-2 rounded-xl gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Tool in Supabase
                </a>
              </div>

              {loading ? (
                <div className="p-8 text-center text-gray-400">Loading…</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                      <tr>
                        {['Name', 'Category', 'Free Tier', 'Rating', 'Clicks', 'Featured', 'View'].map((h) => (
                          <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 first:pl-6">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                      {tools.map((tool) => (
                        <tr key={tool.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-4 pl-6 py-3">
                            <span className="font-semibold text-sm text-gray-900 dark:text-white">{tool.name}</span>
                            <p className="text-xs text-gray-400 truncate max-w-[150px]">{tool.slug}</p>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                            {(tool.categories as unknown as Category)?.name ?? '—'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 max-w-[120px] truncate">
                            {tool.free_tier_limits ?? '—'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                            {tool.rating_avg > 0 ? `${tool.rating_avg.toFixed(1)} (${tool.rating_count})` : '—'}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
                            {tool.click_count ?? 0}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              tool.featured
                                ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500'
                            }`}>
                              {tool.featured ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <a href={`/tools/${tool.slug}`} target="_blank"
                              className="text-blue-600 dark:text-blue-400 hover:underline text-xs flex items-center gap-0.5">
                              View <ChevronRight className="w-3 h-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Categories grid */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 dark:text-white mb-4">Categories ({categories.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <a key={cat.id} href={`/category/${cat.slug}`} target="_blank"
                    className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group">
                    <p className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {cat.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{cat.tool_count} tools</p>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── Submissions tab ── */}
        {tab === 'submissions' && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">Tool Submissions</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Review, approve, or reject user-submitted tools. Approved tools must be manually added to Supabase.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5 text-yellow-500" /> {pendingCount} pending
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-400">Loading…</div>
            ) : submissions.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <Inbox className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No submissions yet</p>
                <p className="text-sm mt-1">Share your Submit Tool page to start receiving submissions.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      {['Tool', 'Category', 'Free Tier', 'Submitter', 'Date', 'Status', 'Action'].map((h) => (
                        <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 first:pl-6">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {submissions.map((sub) => (
                      <SubmissionRow key={sub.id} sub={sub} onAction={handleSubmissionAction} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

/* ─── Page with Auth Gate ──────────────────────────────────── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem(ADMIN_KEY) === '1') setAuthed(true);
  }, []);
  return authed ? <Dashboard /> : <LoginGate onAuth={() => setAuthed(true)} />;
}
