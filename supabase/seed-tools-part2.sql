-- ============================================================
-- FreeAIHub — Tools Seed Part 2 (15 categories, 45 tools)
-- Categories: developer-api, prediction-forecasting, sustainability-climate,
--   gaming-interactive, personal-finance, legal-ai, hr-recruitment,
--   nonprofit-social, customer-support, knowledge-management,
--   ecommerce-product, podcast-audio, science-research, photo-editing,
--   video-editing
-- Run AFTER seed.sql + seed-missing-categories.sql + seed-tools-part1.sql
-- ============================================================

with cat as (select id, slug from categories)
insert into tools (
  slug, name, tagline, description,
  category_id, website_url, affiliate_url,
  is_free, free_tier_limits, pricing_detail,
  featured, tags, meta_title, meta_description
)
select v.slug, v.name, v.tagline, v.description,
       cat.id, v.website_url, v.affiliate_url,
       v.is_free, v.free_tier, v.pricing,
       v.featured, v.tags::text[], v.meta_title, v.meta_desc
from cat
join (values

  -- ── Developer & API Tools (5) ─────────────────────────────────
  ('developer-api','hugging-face','Hugging Face','The GitHub of AI models and datasets.',
   'Hugging Face hosts 500,000+ open-source AI models, datasets, and Spaces. Deploy models via free Inference API with 30,000 requests/month.',
   'https://huggingface.co',null,true,'30K API requests/mo','Free · Pro $9/mo',true,
   '{"models","api","open-source"}','Hugging Face Free — AI Models and Inference API','Access 500K+ AI models free on Hugging Face. 30K API requests/month.'),

  ('developer-api','openai-api','OpenAI API','GPT-4o and DALL-E via API.',
   'OpenAI''s API gives developers access to GPT-4o, DALL-E, Whisper, and embeddings. New accounts get $5 free credit to start building AI-powered apps immediately.',
   'https://platform.openai.com',null,true,'$5 free credit','Pay-per-use after credit',false,
   '{"gpt","api","llm"}','OpenAI API Free — Build with GPT-4o and DALL-E','Start building with GPT-4o free. $5 credit for new OpenAI API accounts.'),

  ('developer-api','replicate','Replicate','Run AI models via a simple API.',
   'Replicate lets you run thousands of open-source AI models via a simple API call — image generation, LLMs, video, audio. Free tier: $0.01 credit on sign-up.',
   'https://replicate.com',null,true,'$0.01 free credit','Pay-per-use',false,
   '{"api","models","deployment"}','Replicate Free — Run AI Models via API','Run open-source AI models via API free with Replicate.'),

  ('developer-api','groq','Groq','Fastest LLM inference API — free tier.',
   'Groq delivers ultra-fast LLM inference for Llama 3, Mixtral, and Gemma models. Free tier: 14,400 requests/day with the fastest response times available anywhere.',
   'https://groq.com',null,true,'14,400 requests/day','Free · Pay-per-use after',false,
   '{"llm","fast","inference"}','Groq Free — Fastest LLM Inference API','Run Llama 3 and Mixtral free with Groq. 14,400 requests/day, ultra-fast.'),

  ('developer-api','anthropic-api','Anthropic API','Claude AI for developers.',
   'Anthropic''s API provides access to Claude 3 Haiku, Sonnet, and Opus. New accounts receive $5 free credit. Ideal for building safe, reliable AI applications.',
   'https://anthropic.com/api',null,true,'$5 free credit','Pay-per-use after credit',false,
   '{"claude","api","llm"}','Anthropic API Free — Build with Claude AI','Build AI apps with Claude free. $5 credit for new Anthropic API accounts.'),

  -- ── Prediction & Forecasting (3) ─────────────────────────────
  ('prediction-forecasting','pecan-ai','Pecan AI','No-code predictive analytics platform.',
   'Pecan AI automates predictive modeling for churn, LTV, and demand forecasting using your existing data warehouse. No data science skills needed. Free trial available.',
   'https://pecan.ai',null,true,'14-day trial','Free trial · Growth $950/mo',true,
   '{"churn","ltv","forecasting"}','Pecan AI Free — No-Code Predictive Analytics','Build churn and LTV predictions free with Pecan AI. No data science needed.'),

  ('prediction-forecasting','forecast-pro','Forecast Pro','AI demand forecasting software.',
   'Forecast Pro uses statistical AI models to automate demand forecasting for supply chain, inventory, and retail. Free trial: 30 days full access.',
   'https://forecastpro.com',null,true,'30-day trial','Free trial · Standard pricing',false,
   '{"demand","supply-chain","inventory"}','Forecast Pro Free — AI Demand Forecasting Software','Automate demand forecasting free with Forecast Pro. 30-day trial.'),

  ('prediction-forecasting','time-gpt','TimeGPT','Foundation model for time-series forecasting.',
   'TimeGPT by Nixtla is the first foundation model for time-series forecasting. Makes accurate predictions via API without training. Free tier: 5,000 rows/month.',
   'https://nixtla.io',null,true,'5,000 rows/mo','Free · Pay-per-use after',false,
   '{"time-series","api","forecasting"}','TimeGPT Free — AI Time-Series Forecasting API','Forecast time-series data free with TimeGPT. 5,000 rows/month free.'),

  -- ── Sustainability & Climate AI (3) ──────────────────────────
  ('sustainability-climate','climatiq','Climatiq','Carbon emission calculation API.',
   'Climatiq provides a real-time carbon emission factor API to calculate the carbon footprint of any activity — flights, shipping, energy, and more. Free tier: 250 calls/month.',
   'https://climatiq.io',null,true,'250 API calls/mo','Free · Starter $29/mo',true,
   '{"carbon","emissions","api"}','Climatiq Free — Carbon Emission Calculation API','Calculate carbon footprint free with Climatiq API. 250 calls/month.'),

  ('sustainability-climate','pachama','Pachama','AI carbon credit verification.',
   'Pachama uses satellite imagery and AI to verify the integrity of forest carbon credits. Free tools for understanding and tracking carbon offset projects.',
   'https://pachama.com',null,true,'Free project explorer','Enterprise pricing',false,
   '{"carbon-credits","forests","satellite"}','Pachama Free — AI Carbon Credit Verification','Verify carbon credits with AI using Pachama. Free project explorer.'),

  ('sustainability-climate','google-earth-engine','Google Earth Engine','AI geospatial analysis for environment.',
   'Google Earth Engine provides a cloud-based platform for planetary-scale geospatial analysis using satellite imagery and AI. Free for research and non-commercial use.',
   'https://earthengine.google.com',null,true,'Free for non-commercial','Free · Commercial pricing',false,
   '{"satellite","geospatial","environment"}','Google Earth Engine Free — AI Geospatial Analysis Platform','Analyse environmental satellite data free with Google Earth Engine.'),

  -- ── Gaming & Interactive AI (3) ──────────────────────────────
  ('gaming-interactive','inworld-ai','Inworld AI','AI NPCs and characters for games.',
   'Inworld AI creates dynamic AI-powered NPCs with personality, memory, and real-time conversation for games and virtual worlds. Free tier: 5,000 interactions/month.',
   'https://inworld.ai',null,true,'5,000 interactions/mo','Free · Pay-per-use after',true,
   '{"npc","game","characters"}','Inworld AI Free — AI NPCs and Characters for Games','Create AI-powered game NPCs free with Inworld AI. 5,000 interactions/month.'),

  ('gaming-interactive','scenario-gg','Scenario','AI game asset generator.',
   'Scenario generates consistent, style-matched 2D and 3D game assets — sprites, textures, characters — using fine-tuned AI models trained on your art style. Free: 100 generations/month.',
   'https://scenario.gg',null,true,'100 generations/mo','Free · Basic $15/mo',false,
   '{"assets","sprites","game-art"}','Scenario Free — AI Game Asset Generator','Generate consistent game assets free with Scenario AI. 100 generations/month.'),

  ('gaming-interactive','charisma-ai','Charisma AI','AI-powered interactive storytelling.',
   'Charisma AI enables developers to create branching, conversational story experiences powered by AI characters. Free tier for indie developers with up to 3 stories.',
   'https://charisma.ai',null,true,'3 stories free','Free · Indie $39/mo',false,
   '{"storytelling","interactive","characters"}','Charisma AI Free — AI Interactive Storytelling for Games','Build AI-powered story games free with Charisma AI. 3 stories included.'),

  -- ── Personal Finance AI (3) ──────────────────────────────────
  ('personal-finance','cleo','Cleo','AI financial assistant and budgeting app.',
   'Cleo is an AI chatbot that analyses your spending, creates budgets, and helps you save money with roast and hype modes. Free core features in the mobile app.',
   'https://web.meetcleo.com',null,true,'Free core features','Free · Plus $5.99/mo',true,
   '{"budgeting","spending","chatbot"}','Cleo Free — AI Financial Assistant and Budget Tracker','Track spending and budget free with Cleo AI. Funny and insightful.'),

  ('personal-finance','magnifi','Magnifi','AI investment research assistant.',
   'Magnifi is an AI-powered investment platform that lets you search and analyse investments using natural language. Free account with basic portfolio analysis.',
   'https://magnifi.com',null,true,'Basic portfolio analysis','Free · Premium $19.99/mo',false,
   '{"investing","portfolio","stocks"}','Magnifi Free — AI Investment Research Assistant','Research investments free with Magnifi AI. Natural language stock analysis.'),

  ('personal-finance','copilot-money','Copilot Money','AI personal finance tracker for Apple.',
   'Copilot Money connects all your accounts and uses AI to categorise transactions, detect subscriptions, and provide spending insights. Free 30-day trial.',
   'https://copilot.money',null,true,'30-day trial','Free trial · $8.99/mo',false,
   '{"spending","accounts","apple"}','Copilot Money Free — AI Personal Finance Tracker','Track all finances free with Copilot Money AI. 30-day trial included.'),

  -- ── Legal AI (3) ─────────────────────────────────────────────
  ('legal-ai','spellbook','Spellbook','AI contract drafting for lawyers.',
   'Spellbook integrates with Microsoft Word to draft and review contracts using GPT-4. Suggests missing clauses and identifies risky language. Free trial: 7 days.',
   'https://spellbook.legal',null,true,'7-day trial','Free trial · Basic $99/mo',true,
   '{"contracts","legal","word"}','Spellbook Free — AI Contract Drafting in Microsoft Word','Draft and review contracts free with Spellbook AI. 7-day trial.'),

  ('legal-ai','donotpay','DoNotPay','AI lawyer for consumer rights.',
   'DoNotPay uses AI to fight parking tickets, cancel subscriptions, sue companies in small claims court, and draft legal letters. Free access to basic features.',
   'https://donotpay.com',null,true,'Free basic features','Free · Pro $36/yr',false,
   '{"consumer","tickets","legal-letters"}','DoNotPay Free — AI Lawyer for Consumer Rights','Fight tickets and draft legal letters free with DoNotPay AI.'),

  ('legal-ai','harvey-ai','Harvey AI','AI for law firms and legal teams.',
   'Harvey AI is used by top law firms for legal research, contract analysis, due diligence, and regulatory compliance. Enterprise product with a free demo available.',
   'https://harvey.ai',null,true,'Free demo','Enterprise pricing',false,
   '{"law-firm","research","due-diligence"}','Harvey AI — Enterprise AI Legal Research Platform','AI legal research and contract analysis for law firms. Request a free demo.'),

  -- ── HR & Recruitment AI (3) ──────────────────────────────────
  ('hr-recruitment','paradox-ai','Paradox AI (Olivia)','AI recruiting assistant chatbot.',
   'Paradox''s Olivia AI automates candidate screening, interview scheduling, and FAQ answering via chat. Integrates with major ATS systems. Free demo available.',
   'https://paradox.ai',null,true,'Free demo','Enterprise pricing',true,
   '{"recruiting","screening","ats"}','Paradox AI Free — AI Recruiting Assistant Chatbot','Automate recruiting with Olivia AI chatbot. Request a free demo.'),

  ('hr-recruitment','manatal','Manatal','AI-powered ATS and recruiting software.',
   'Manatal is an AI recruitment platform with resume parsing, candidate scoring, and sourcing from 2,500+ job boards. Free trial: 14 days full access.',
   'https://manatal.com',null,true,'14-day trial','Free trial · Professional $15/mo',false,
   '{"ats","resume","hiring"}','Manatal Free — AI ATS and Recruiting Software','Hire faster free with Manatal AI ATS. 14-day trial, no credit card.'),

  ('hr-recruitment','findem','Findem','AI talent intelligence and sourcing.',
   'Findem uses AI to search across 750M+ people profiles for passive candidates and builds talent pipelines automatically. Free trial: 25 candidate credits.',
   'https://findem.ai',null,true,'25 candidate credits','Free trial · Enterprise pricing',false,
   '{"talent","sourcing","passive-candidates"}','Findem Free — AI Talent Intelligence and Sourcing','Source passive candidates free with Findem AI. 25 credits on trial.'),

  -- ── Nonprofit AI (3) ─────────────────────────────────────────
  ('nonprofit-social','techsoup','TechSoup AI Tools','Discounted AI tools for nonprofits.',
   'TechSoup provides nonprofits with discounted or free access to AI and technology tools from Microsoft, Google, Adobe, and others. Verify your nonprofit to access deals.',
   'https://techsoup.org',null,true,'Free after verification','Free (nonprofits)·Varies',true,
   '{"nonprofit","discounts","tools"}','TechSoup Free — AI and Tech Tools for Nonprofits','Get free AI tools for your nonprofit through TechSoup. Verify to access.'),

  ('nonprofit-social','google-for-nonprofits','Google for Nonprofits','Free Google tools for nonprofits.',
   'Google for Nonprofits gives eligible organisations free access to Google Workspace, Google Ad Grants ($10K/mo), YouTube Nonprofit, and Google Cloud credits.',
   'https://google.com/nonprofits',null,true,'Free for eligible nonprofits','Free (nonprofits)',false,
   '{"google","workspace","ad-grants"}','Google for Nonprofits — Free Google Tools and Ad Grants','Get $10K/month in free Google Ads and Workspace for your nonprofit.'),

  ('nonprofit-social','microsoft-nonprofit','Microsoft for Nonprofits','Free Microsoft 365 for nonprofits.',
   'Microsoft for Nonprofits provides free Microsoft 365, Azure credits, Dynamics 365, and LinkedIn for nonprofits. Up to 10 free Microsoft 365 Business Premium licenses.',
   'https://microsoft.com/en-us/nonprofits',null,true,'10 free licenses','Free (nonprofits)·Varies',false,
   '{"microsoft","office365","azure"}','Microsoft for Nonprofits — Free Microsoft 365 and Azure','Get free Microsoft 365 and Azure credits for your nonprofit.'),

  -- ── Customer Support AI (3) ──────────────────────────────────
  ('customer-support','intercom-fin','Intercom Fin AI','AI customer support agent by Intercom.',
   'Intercom''s Fin AI resolves up to 50% of support tickets instantly using your help content and GPT-4. Starts at $0.99 per resolution. Free trial with existing Intercom plan.',
   'https://intercom.com/fin',null,true,'Free trial (Intercom plan)','$0.99 per resolution',true,
   '{"support","tickets","gpt"}','Intercom Fin AI — AI Customer Support Agent','Resolve support tickets instantly free with Intercom Fin AI.'),

  ('customer-support','freshdesk','Freshdesk','Free AI helpdesk with Freddy AI.',
   'Freshdesk offers a forever-free helpdesk plan for up to 10 agents with Freddy AI for canned responses, article suggestions, and ticket prioritisation.',
   'https://freshdesk.com',null,true,'Free up to 10 agents','Free · Growth $15/agent/mo',false,
   '{"helpdesk","tickets","freddy"}','Freshdesk Free — AI Helpdesk for Customer Support','Run a free helpdesk with Freddy AI. Up to 10 agents always free.'),

  ('customer-support','crisp','Crisp','AI live chat and helpdesk platform.',
   'Crisp provides a free shared inbox, live chat, and basic AI chatbot for startups. Free plan: 2 seats, unlimited contacts, and a knowledge base with AI suggestions.',
   'https://crisp.chat',null,true,'2 seats free','Free · Pro $25/mo',false,
   '{"livechat","inbox","chatbot"}','Crisp Free — AI Live Chat and Helpdesk Platform','Add free AI live chat to your website with Crisp. 2 seats included.'),

  -- ── Knowledge Management AI (3) ──────────────────────────────
  ('knowledge-management','notion-ai','Notion AI','AI writing and knowledge base in Notion.',
   'Notion AI helps you write, summarise, translate, and organise knowledge inside Notion. Free Notion plan with AI add-on at $8/month per member.',
   'https://notion.so',null,true,'Free Notion (AI $8/mo add-on)','Free base · AI $8/mo',true,
   '{"notes","wiki","writing"}','Notion AI Free — AI Writing and Knowledge Management','Organise knowledge and write with AI free in Notion.'),

  ('knowledge-management','obsidian','Obsidian','AI-powered personal knowledge base.',
   'Obsidian is a free local-first Markdown note-taking app with AI plugins (via community) for semantic search, summarisation, and graph-based knowledge linking.',
   'https://obsidian.md',null,true,'Fully free (personal)','Free · Sync $8/mo',false,
   '{"notes","markdown","graph"}','Obsidian Free — AI Personal Knowledge Base App','Build a personal knowledge base free with Obsidian. Fully local.'),

  ('knowledge-management','guru','Guru','AI company knowledge base.',
   'Guru is an AI-powered knowledge management platform that surfaces the right answer at the right time inside Slack, email, or your helpdesk. Free for up to 3 users.',
   'https://getguru.com',null,true,'3 users free','Free · Builder $18/user/mo',false,
   '{"knowledge-base","slack","teams"}','Guru Free — AI Company Knowledge Management Platform','Build a searchable company knowledge base free with Guru AI. 3 users.'),

  -- ── E-commerce & Product AI (3) ──────────────────────────────
  ('ecommerce-product','describely','Describely','AI product description generator.',
   'Describely generates SEO-optimised product descriptions, titles, and meta tags for e-commerce at scale. Free tier: 30 product descriptions/month.',
   'https://describely.ai',null,true,'30 descriptions/mo','Free · Basic $19/mo',true,
   '{"product-descriptions","seo","ecommerce"}','Describely Free — AI Product Description Generator','Write SEO product descriptions free with Describely. 30/month free.'),

  ('ecommerce-product','visenze','ViSenze','AI visual search for e-commerce.',
   'ViSenze provides AI-powered visual search and product recommendations for online retailers. Customers snap a photo to find similar products. Free trial available.',
   'https://visenze.com',null,true,'Free trial','Free trial · Enterprise pricing',false,
   '{"visual-search","recommendations","retail"}','ViSenze Free — AI Visual Search for E-commerce','Add AI visual product search to your store free with ViSenze trial.'),

  ('ecommerce-product','clerk-io','Clerk.io','AI product recommendations and search.',
   'Clerk.io provides AI-powered product recommendations, search, and audience segmentation for e-commerce stores. Free trial: 14 days on any plan.',
   'https://clerk.io',null,true,'14-day trial','Free trial · Essential $39/mo',false,
   '{"recommendations","search","segmentation"}','Clerk.io Free — AI Product Recommendations for E-commerce','Add AI recommendations to your online store free with Clerk.io trial.'),

  -- ── Podcast & Audio AI (3) ───────────────────────────────────
  ('podcast-audio','descript','Descript','AI podcast editor — edit audio like text.',
   'Descript transcribes your podcast and lets you edit the audio by editing the transcript text. AI overdub corrects mistakes in your voice. Free: 1 hour transcription/month.',
   'https://descript.com',null,true,'1 hour transcription/mo','Free · Creator $24/mo',true,
   '{"podcast","transcription","editing"}','Descript Free — AI Podcast Editor. Edit Audio Like Text','Edit podcasts by editing text free with Descript. 1 hour/month free.'),

  ('podcast-audio','cleanvoice','Cleanvoice AI','AI filler word and silence remover.',
   'Cleanvoice automatically removes filler words (um, uh, like), mouth clicks, silences, and stutters from podcast recordings. Free trial: 30 minutes of audio.',
   'https://cleanvoice.ai',null,true,'30 min free trial','Free trial · $10/mo',false,
   '{"filler-words","podcast","audio"}','Cleanvoice AI Free — Remove Filler Words From Podcasts','Remove um, uh, and filler words from podcasts free with Cleanvoice AI.'),

  ('podcast-audio','podcastle','Podcastle','All-in-one AI podcast creation studio.',
   'Podcastle provides browser-based podcast recording, AI noise removal, transcription, and text-to-audio conversion. Free: 3 hours recording/month, unlimited AI transcription.',
   'https://podcastle.ai',null,true,'3 hrs recording/mo','Free · Solo $11.99/mo',false,
   '{"recording","transcription","studio"}','Podcastle Free — AI Podcast Recording and Editing Studio','Record and edit podcasts free with Podcastle AI. 3 hours/month.'),

  -- ── Science & Research AI (3) ────────────────────────────────
  ('science-research','consensus','Consensus','AI search engine for scientific research.',
   'Consensus searches 200M+ scientific papers and provides AI-synthesised answers with evidence. Free tier: 20 searches/month with full paper access.',
   'https://consensus.app',null,true,'20 searches/mo','Free · Premium $9.99/mo',true,
   '{"science","papers","evidence"}','Consensus Free — AI Search Engine for Scientific Papers','Search 200M+ research papers free with Consensus AI. Evidence-based answers.'),

  ('science-research','scite','Scite AI','AI citation analysis for research papers.',
   'Scite AI analyses how papers have been cited — supporting, contrasting, or mentioning — giving deeper context to scientific literature. Free: 10 searches/month.',
   'https://scite.ai',null,true,'10 searches/mo','Free · Individual $20/mo',false,
   '{"citations","papers","analysis"}','Scite AI Free — AI Citation Analysis for Research Papers','Analyse how papers are cited free with Scite AI. 10 searches/month.'),

  ('science-research','alphafold','AlphaFold','AI protein structure prediction by DeepMind.',
   'AlphaFold by DeepMind predicts 3D protein structures from amino acid sequences with near-experimental accuracy. The full database of 200M+ structures is freely accessible.',
   'https://alphafold.ebi.ac.uk',null,true,'Full database free','Free (open access)',false,
   '{"protein","biology","deepmind"}','AlphaFold Free — AI Protein Structure Prediction by DeepMind','Access 200M+ AI protein structure predictions free with AlphaFold.'),

  -- ── Photo Editing AI (3) ─────────────────────────────────────
  ('photo-editing','remove-bg','Remove.bg','Instant AI background removal.',
   'Remove.bg uses AI to remove image backgrounds in under 5 seconds. Free: remove backgrounds from up to 50 images per month at lower resolution via web app.',
   'https://remove.bg',null,true,'50 previews/mo','Free · Pay-per-image from $0.20',true,
   '{"background-removal","photos","editing"}','Remove.bg Free — AI Background Remover for Photos','Remove photo backgrounds free with Remove.bg. 50 previews/month.'),

  ('photo-editing','clipdrop','ClipDrop','Suite of AI photo editing tools by Stability.',
   'ClipDrop by Stability AI includes background removal, upscaling, cleanup, relight, and text-to-image — all free with watermark. Paid plan removes watermark.',
   'https://clipdrop.co',null,true,'Free with watermark','Free · Pro $13/mo',false,
   '{"upscaling","relight","cleanup"}','ClipDrop Free — AI Photo Editing Suite by Stability AI','Edit photos with AI free using ClipDrop. Background removal, upscale, and more.'),

  ('photo-editing','lensa-ai','Lensa AI','AI portrait and photo enhancement app.',
   'Lensa AI transforms photos into artistic portraits, removes blemishes, reshapes features, and applies AI filters. Free app with in-app purchases for Magic Avatars.',
   'https://prisma-ai.com/lensa',null,true,'Free app features','Free · Magic Avatars $7.99',false,
   '{"portraits","enhancement","mobile"}','Lensa AI Free — AI Portrait and Photo Enhancement App','Enhance photos and create AI portraits free with Lensa AI app.'),

  -- ── Video Editing AI (3) ─────────────────────────────────────
  ('video-editing','capcut','CapCut','Free AI video editor by ByteDance.',
   'CapCut is a free video editor with AI background removal, auto-captions, smart cutout, AI voiceover, and viral templates. Used by 200M+ creators worldwide.',
   'https://capcut.com',null,true,'Fully free','Free · Pro $9.99/mo',true,
   '{"video","captions","mobile"}','CapCut Free — AI Video Editor With Auto-Captions','Edit videos free with CapCut AI. Auto-captions, background removal, and more.'),

  ('video-editing','submagic','Submagic','AI auto-captions for short-form video.',
   'Submagic generates accurate, stylised auto-captions for YouTube Shorts, Reels, and TikToks in seconds using AI. Free tier: 3 videos/month.',
   'https://submagic.co',null,true,'3 videos/mo','Free · Pro $20/mo',false,
   '{"captions","shorts","reels"}','Submagic Free — AI Auto-Captions for Short-Form Video','Add AI captions to Reels and Shorts free with Submagic. 3 videos/month.'),

  ('video-editing','opus-clip','Opus Clip','AI repurposing of long video to short clips.',
   'Opus Clip uses AI to find the most engaging moments in long videos and automatically repurposes them into viral short clips for TikTok, Reels, and Shorts. Free: 60 min/month.',
   'https://opus.pro',null,true,'60 min/mo','Free · Starter $15/mo',false,
   '{"repurposing","clips","tiktok"}','Opus Clip Free — AI Video Repurposing for Short-Form Content','Turn long videos into short clips free with Opus Clip AI. 60 min/month.')

) as v(cat_slug, slug, name, tagline, description, website_url, affiliate_url,
       is_free, free_tier, pricing, featured, tags, meta_title, meta_desc)
on (cat.slug = v.cat_slug)
on conflict (slug) do nothing;

-- Refresh tool counts for all affected categories
update categories c
set tool_count = (select count(*) from tools t where t.category_id = c.id)
where c.slug in (
  'developer-api','prediction-forecasting','sustainability-climate',
  'gaming-interactive','personal-finance','legal-ai',
  'hr-recruitment','nonprofit-social','customer-support',
  'knowledge-management','ecommerce-product','podcast-audio',
  'science-research','photo-editing','video-editing'
);
