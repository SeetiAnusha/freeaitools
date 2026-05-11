-- ============================================================
-- FreeAIHub — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLE: categories
-- ============================================================
create table if not exists categories (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  name        text not null,
  description text,
  icon_name   text,           -- lucide icon name e.g. "Bot", "Video"
  tool_count  int  default 0,
  created_at  timestamptz default now()
);

-- ============================================================
-- TABLE: tools
-- ============================================================
create table if not exists tools (
  id                  uuid primary key default uuid_generate_v4(),
  slug                text unique not null,
  name                text not null,
  tagline             text,
  description         text,
  category_id         uuid references categories(id) on delete set null,
  website_url         text,
  affiliate_url       text,
  affiliate_commission numeric(5,2) default 0,   -- e.g. 30.00 means 30%
  is_free             boolean default true,
  free_tier_limits    text,                        -- "3 projects / month"
  pricing_detail      text,                        -- "Free · Pro $12/mo"
  logo_url            text,
  screenshot_url      text,
  featured            boolean default false,
  verified_free_date  date,
  rating_avg          numeric(3,2) default 0,
  rating_count        int default 0,
  click_count         int default 0,
  tags                text[] default '{}',
  meta_title          text,
  meta_description    text,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at_column()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger tools_updated_at
  before update on tools
  for each row execute function update_updated_at_column();

-- ============================================================
-- TABLE: ratings
-- ============================================================
create table if not exists ratings (
  id          uuid primary key default uuid_generate_v4(),
  tool_id     uuid references tools(id) on delete cascade,
  ip_hash     text not null,           -- sha256 of IP (never store raw IP)
  rating      smallint check (rating between 1 and 5),
  review_text text,
  created_at  timestamptz default now(),
  unique(tool_id, ip_hash)             -- one rating per IP per tool
);

-- After insert/update, recalculate tool's rating_avg and rating_count
create or replace function refresh_tool_rating()
returns trigger language plpgsql as $$
begin
  update tools
  set
    rating_avg   = (select round(avg(rating)::numeric, 2) from ratings where tool_id = new.tool_id),
    rating_count = (select count(*) from ratings where tool_id = new.tool_id)
  where id = new.tool_id;
  return new;
end;
$$;

create trigger ratings_refresh
  after insert or update on ratings
  for each row execute function refresh_tool_rating();

-- ============================================================
-- TABLE: clicks  (affiliate redirect tracking)
-- ============================================================
create table if not exists clicks (
  id         uuid primary key default uuid_generate_v4(),
  tool_id    uuid references tools(id) on delete cascade,
  ip_hash    text,
  referrer   text,
  user_agent text,
  created_at timestamptz default now()
);

-- After insert, increment tool click_count
create or replace function increment_click_count()
returns trigger language plpgsql as $$
begin
  update tools set click_count = click_count + 1 where id = new.tool_id;
  return new;
end;
$$;

create trigger clicks_increment
  after insert on clicks
  for each row execute function increment_click_count();

-- ============================================================
-- TABLE: saved_tools  (localStorage fallback / optional server sync)
-- ============================================================
create table if not exists saved_tools (
  id         uuid primary key default uuid_generate_v4(),
  session_id text not null,
  tool_id    uuid references tools(id) on delete cascade,
  created_at timestamptz default now(),
  unique(session_id, tool_id)
);

-- ============================================================
-- TABLE: newsletter_subscribers
-- ============================================================
create table if not exists newsletter_subscribers (
  id         uuid primary key default uuid_generate_v4(),
  email      text unique not null,
  confirmed  boolean default false,
  source     text default 'homepage',   -- 'homepage', 'tool-page', 'footer', etc.
  created_at timestamptz default now()
);

-- ============================================================
-- INDEXES (for performance)
-- ============================================================
create index if not exists idx_tools_category    on tools(category_id);
create index if not exists idx_tools_featured    on tools(featured) where featured = true;
create index if not exists idx_tools_tags        on tools using gin(tags);
create index if not exists idx_tools_slug        on tools(slug);
create index if not exists idx_categories_slug   on categories(slug);
create index if not exists idx_clicks_tool       on clicks(tool_id);
create index if not exists idx_ratings_tool      on ratings(tool_id);
create index if not exists idx_saved_session     on saved_tools(session_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
-- Public can read tools and categories
alter table tools                   enable row level security;
alter table categories              enable row level security;
alter table ratings                 enable row level security;
alter table clicks                  enable row level security;
alter table saved_tools             enable row level security;
alter table newsletter_subscribers  enable row level security;

-- Anyone can read published tools & categories
create policy "public read tools"
  on tools for select using (true);

create policy "public read categories"
  on categories for select using (true);

-- Anyone can insert a rating (one per IP enforced by unique constraint)
create policy "public insert rating"
  on ratings for insert with check (true);

create policy "public read ratings"
  on ratings for select using (true);

-- Anyone can insert clicks (for affiliate tracking)
create policy "public insert click"
  on clicks for insert with check (true);

-- Saved tools — users can manage their own session
create policy "session read saved"
  on saved_tools for select using (true);

create policy "session insert saved"
  on saved_tools for insert with check (true);

create policy "session delete saved"
  on saved_tools for delete using (true);

-- Newsletter — public insert only
create policy "public insert newsletter"
  on newsletter_subscribers for insert with check (true);

-- ============================================================
-- FUNCTION: search_tools  (full-text search fallback without Algolia)
-- ============================================================
create or replace function search_tools(query text)
returns setof tools language sql stable as $$
  select * from tools
  where
    to_tsvector('english', coalesce(name,'') || ' ' || coalesce(tagline,'') || ' ' || coalesce(description,''))
    @@ plainto_tsquery('english', query)
  order by featured desc, rating_avg desc
  limit 50;
$$;
