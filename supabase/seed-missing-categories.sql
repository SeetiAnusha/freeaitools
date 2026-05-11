-- ============================================================
-- FreeAIHub — Add Missing 30 Categories
-- Run this in Supabase SQL Editor AFTER schema.sql and seed.sql
-- This adds the remaining 30 categories to reach the full 40
-- ============================================================

-- ── ADD MISSING 30 CATEGORIES ──────────────────────────────────────────
insert into categories (slug, name, description, icon_name) values
  ('data-analytics',         'Data & Analytics',           'AI tools for data analysis, visualization, and business intelligence.', 'BarChart2'),
  ('chatbot-builders',       'Chatbot Builders',            'Build custom AI chatbots and conversational agents without code.',      'MessageSquare'),
  ('research-summarization', 'Research & Summarization',    'AI tools for research, document summarization, and knowledge discovery.','BookOpen'),
  ('education-tutoring',     'Education & Tutoring',        'AI-powered learning, tutoring, flashcards, and educational tools.',    'GraduationCap'),
  ('graphic-design',         'Graphic Design',              'AI design tools for logos, banners, brand assets, and visuals.',       'Palette'),
  ('music-audio',            'Music & Audio',               'AI music generation, audio editing, mixing, and sound design tools.',  'Music'),
  ('social-media',           'Social Media AI',             'AI tools for social media content creation and scheduling.',           'Share2'),
  ('email-outreach',         'Email & Outreach',            'AI email writing, cold outreach, and email marketing tools.',          'Mail'),
  ('translation',            'Translation AI',              'AI-powered language translation, localization, and multilingual tools.','Languages'),
  ('presentations',          'Presentations & Slides',      'AI tools for creating presentations, pitch decks, and slide shows.',   'Presentation'),
  ('lead-generation',        'Lead Generation',             'AI tools for finding, qualifying, and converting sales leads.',        'Target'),
  ('vision-ocr',             'Vision & OCR',                'AI image recognition, optical character recognition, and computer vision.','ScanSearch'),
  ('health-wellness',        'Health & Wellness',           'AI tools for health tracking, fitness coaching, and mental wellness.', 'HeartPulse'),
  ('cybersecurity',          'Cybersecurity AI',            'AI-powered security scanning, threat detection, and protection tools.','ShieldCheck'),
  ('avatar-talking-head',    'Avatar & Talking Head',       'AI avatar creation, digital humans, and talking head video generation.','UserCircle'),
  ('developer-api',          'Developer & API Tools',       'AI APIs, SDKs, developer tools, and AI infrastructure platforms.',    'Cpu'),
  ('prediction-forecasting', 'Prediction & Forecasting',    'AI tools for demand forecasting, predictions, and business analytics.','LineChart'),
  ('sustainability-climate', 'Sustainability AI',           'AI tools for climate action, sustainability analysis, and green tech.','Leaf'),
  ('gaming-interactive',     'Gaming & Interactive',        'AI tools for game development, NPCs, and interactive experiences.',   'Gamepad2'),
  ('personal-finance',       'Personal Finance',            'AI tools for budgeting, investing, financial planning, and tax help.', 'PiggyBank'),
  ('legal-ai',               'Legal AI',                    'AI tools for legal research, contract review, and compliance checks.', 'Scale'),
  ('hr-recruitment',         'HR & Recruitment',            'AI tools for hiring automation, resume screening, and HR management.', 'Users'),
  ('nonprofit-social',       'Nonprofit AI',                'AI tools tailored for nonprofits and social impact organizations.',   'Heart'),
  ('customer-support',       'Customer Support',            'AI chatbots, helpdesk tools, and automated customer service platforms.','Headphones'),
  ('knowledge-management',   'Knowledge Management',        'AI tools for wikis, knowledge bases, documentation, and note-taking.','Brain'),
  ('ecommerce-product',      'E-commerce & Product',        'AI tools for online stores, product descriptions, and sales optimization.','ShoppingBag'),
  ('podcast-audio',          'Podcast & Audio',             'AI tools for podcast recording, editing, transcription, and distribution.','Podcast'),
  ('science-research',       'Science & Research',          'AI tools for scientific research, lab automation, and data analysis.', 'FlaskConical'),
  ('photo-editing',          'Photo Editing',               'AI-powered photo enhancement, background removal, and retouching.',   'ImagePlus'),
  ('video-editing',          'Video Editing AI',            'AI tools for video editing, color grading, subtitles, and effects.',  'FilmIcon')
on conflict (slug) do nothing;


-- ── AUTO-UPDATE tool_count TRIGGER ────────────────────────────────────
-- This ensures categories.tool_count stays accurate whenever tools
-- are inserted, deleted, or moved between categories.

create or replace function update_category_tool_count()
returns trigger language plpgsql as $$
begin
  -- On INSERT or UPDATE: refresh count for the new category
  if (TG_OP = 'INSERT') or (TG_OP = 'UPDATE' and new.category_id is not null) then
    update categories
    set tool_count = (select count(*) from tools where category_id = new.category_id)
    where id = new.category_id;
  end if;

  -- On DELETE or category change: refresh count for the old category
  if (TG_OP = 'DELETE') or
     (TG_OP = 'UPDATE' and old.category_id is not null and old.category_id is distinct from new.category_id) then
    update categories
    set tool_count = (select count(*) from tools where category_id = old.category_id)
    where id = old.category_id;
  end if;

  return coalesce(new, old);
end;
$$;

-- Drop trigger if it exists from a previous run, then recreate
drop trigger if exists tools_update_category_count on tools;

create trigger tools_update_category_count
  after insert or update of category_id or delete on tools
  for each row execute function update_category_tool_count();


-- ── BACKFILL EXISTING tool_count VALUES ───────────────────────────────
-- Recalculates tool_count for all categories based on existing tools rows.
update categories c
set tool_count = (select count(*) from tools t where t.category_id = c.id);


-- ── VERIFY RESULTS ────────────────────────────────────────────────────
-- Run this select to confirm all 40 categories are present:
select slug, name, tool_count
from categories
order by name;
