-- ============================================================
-- FreeAIHub — Tool Submissions Table
-- Run this in Supabase SQL Editor
-- This stores user-submitted tools for admin review
-- ============================================================

create table if not exists tool_submissions (
  id              uuid primary key default uuid_generate_v4(),
  tool_name       text not null,
  tool_url        text not null,
  category        text not null,
  tagline         text not null,
  free_tier       text not null,
  description     text,
  submitter_name  text,
  submitter_email text,
  status          text default 'pending',   -- pending | approved | rejected
  admin_notes     text,
  created_at      timestamptz default now()
);

-- RLS: allow public insert (submissions), admin reads all
alter table tool_submissions enable row level security;

create policy "public submit tools"
  on tool_submissions for insert with check (true);

create policy "public read own submission"
  on tool_submissions for select using (true);

-- Index for admin review queue
create index if not exists idx_submissions_status on tool_submissions(status, created_at desc);
