-- ============================================================
-- FreeAIHub — Blog & Prompts Extension
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ============================================================
-- TABLE: blog_posts
-- ============================================================
create table if not exists blog_posts (
  id               uuid primary key default uuid_generate_v4(),
  slug             text unique not null,
  title            text not null,
  excerpt          text not null,           -- Short description (150-160 chars)
  content          text not null,           -- Full article content (markdown or HTML)
  category         text not null,           -- 'Guides', 'Comparisons', 'Lists', 'News'
  author_name      text default 'FreeAIHub Team',
  published_date   date not null default current_date,
  read_time        text default '5 min read',
  featured         boolean default false,   -- Show on homepage
  
  -- SEO fields
  seo_title        text,                    -- Custom <title> tag (max 60 chars)
  seo_description  text,                    -- Custom meta description (max 160 chars)
  seo_keywords     text[],                  -- Keywords for SEO
  
  -- Analytics
  views_count      int default 0,
  shares_count     int default 0,
  
  -- Status
  status           text default 'published', -- 'draft', 'published', 'archived'
  
  -- Metadata
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- Auto-update updated_at
create trigger blog_posts_updated_at
  before update on blog_posts
  for each row execute function update_updated_at_column();

-- ============================================================
-- TABLE: prompts
-- ============================================================
create table if not exists prompts (
  id               uuid primary key default uuid_generate_v4(),
  slug             text unique not null,
  title            text not null,
  prompt_text      text not null,           -- The actual prompt
  description      text not null,           -- What it does (100-200 chars)
  
  -- Categorization
  category         text not null,           -- 'Marketing', 'Coding', 'Writing', 'Design', etc.
  use_case         text,                    -- Specific use case
  ai_tool          text,                    -- 'ChatGPT', 'Claude', 'Gemini', 'Any'
  tags             text[] default '{}',     -- ['email', 'sales', 'b2b']
  
  -- Free vs Paid
  is_free          boolean default true,
  price            numeric(5,2),            -- null for free, e.g. 4.99 for paid
  
  -- Difficulty & Quality
  difficulty_level text default 'Beginner', -- 'Beginner', 'Intermediate', 'Advanced'
  
  -- Example & Instructions
  example_input    text,                    -- Example of how to use it
  example_output   text,                    -- What it generates
  instructions     text,                    -- How to use the prompt
  
  -- Analytics & Social Proof
  usage_count      int default 0,
  rating_avg       numeric(3,2) default 0,
  rating_count     int default 0,
  
  -- SEO
  seo_title        text,
  seo_description  text,
  
  -- Status
  status           text default 'published', -- 'draft', 'published', 'archived'
  featured         boolean default false,
  
  -- Metadata
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- Auto-update updated_at
create trigger prompts_updated_at
  before update on prompts
  for each row execute function update_updated_at_column();

-- ============================================================
-- TABLE: prompt_ratings (separate from tool ratings)
-- ============================================================
create table if not exists prompt_ratings (
  id          uuid primary key default uuid_generate_v4(),
  prompt_id   uuid references prompts(id) on delete cascade,
  ip_hash     text not null,
  rating      smallint check (rating between 1 and 5),
  comment     text,
  created_at  timestamptz default now(),
  unique(prompt_id, ip_hash)
);

-- Recalculate prompt rating after insert/update
create or replace function refresh_prompt_rating()
returns trigger language plpgsql as $$
begin
  update prompts
  set
    rating_avg   = (select round(avg(rating)::numeric, 2) from prompt_ratings where prompt_id = new.prompt_id),
    rating_count = (select count(*) from prompt_ratings where prompt_id = new.prompt_id)
  where id = new.prompt_id;
  return new;
end;
$$;

create trigger prompt_ratings_refresh
  after insert or update on prompt_ratings
  for each row execute function refresh_prompt_rating();

-- ============================================================
-- INDEXES (for performance)
-- ============================================================
create index if not exists idx_blog_posts_slug         on blog_posts(slug);
create index if not exists idx_blog_posts_category     on blog_posts(category);
create index if not exists idx_blog_posts_published    on blog_posts(published_date desc) where status = 'published';
create index if not exists idx_blog_posts_featured     on blog_posts(featured) where featured = true;

create index if not exists idx_prompts_slug            on prompts(slug);
create index if not exists idx_prompts_category        on prompts(category);
create index if not exists idx_prompts_is_free         on prompts(is_free);
create index if not exists idx_prompts_tags            on prompts using gin(tags);
create index if not exists idx_prompts_featured        on prompts(featured) where featured = true;

create index if not exists idx_prompt_ratings_prompt   on prompt_ratings(prompt_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
alter table blog_posts      enable row level security;
alter table prompts         enable row level security;
alter table prompt_ratings  enable row level security;

-- Anyone can read published blog posts
create policy "public read published blog posts"
  on blog_posts for select using (status = 'published');

-- Anyone can read published prompts
create policy "public read published prompts"
  on prompts for select using (status = 'published');

-- Anyone can insert prompt ratings
create policy "public insert prompt rating"
  on prompt_ratings for insert with check (true);

create policy "public read prompt ratings"
  on prompt_ratings for select using (true);

-- ============================================================
-- SEARCH FUNCTIONS
-- ============================================================

-- Full-text search for blog posts
create or replace function search_blog_posts(query text)
returns setof blog_posts language sql stable as $$
  select * from blog_posts
  where
    status = 'published' and
    to_tsvector('english', coalesce(title,'') || ' ' || coalesce(excerpt,'') || ' ' || coalesce(content,''))
    @@ plainto_tsquery('english', query)
  order by published_date desc
  limit 20;
$$;

-- Full-text search for prompts
create or replace function search_prompts(query text)
returns setof prompts language sql stable as $$
  select * from prompts
  where
    status = 'published' and
    to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,'') || ' ' || coalesce(prompt_text,''))
    @@ plainto_tsquery('english', query)
  order by featured desc, rating_avg desc, usage_count desc
  limit 50;
$$;

-- ============================================================
-- VIEW COUNTER FUNCTIONS
-- ============================================================

-- Increment blog post views
create or replace function increment_blog_views(post_slug text)
returns void language plpgsql as $$
begin
  update blog_posts 
  set views_count = views_count + 1 
  where slug = post_slug and status = 'published';
end;
$$;

-- Increment prompt usage
create or replace function increment_prompt_usage(prompt_slug text)
returns void language plpgsql as $$
begin
  update prompts 
  set usage_count = usage_count + 1 
  where slug = prompt_slug and status = 'published';
end;
$$;
