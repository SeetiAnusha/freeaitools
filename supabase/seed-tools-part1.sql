-- ============================================================
-- FreeAIHub — Tools Seed Part 1 (15 categories, 45 tools)
-- Categories: data-analytics, chatbot-builders, research-summarization,
--   education-tutoring, graphic-design, music-audio, social-media,
--   email-outreach, translation, presentations, lead-generation,
--   vision-ocr, health-wellness, cybersecurity, avatar-talking-head
-- Run AFTER schema.sql + seed.sql + seed-missing-categories.sql
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

  -- ── Data & Analytics (3) ─────────────────────────────────────
  ('data-analytics','julius-ai','Julius AI','Chat with your data using AI.',
   'Julius AI lets you upload CSV, Excel, or Google Sheets and ask questions in plain English. It auto-generates charts, runs statistical analysis, and explains insights. Free tier: 15 queries/month.',
   'https://julius.ai',null,true,'15 queries/mo','Free · Pro $22/mo',true,
   '{"data","analytics","csv"}',
   'Julius AI Free — Chat With Your Data & Auto-Generate Charts',
   'Analyse CSV and Excel data free with Julius AI. Ask questions, get charts instantly.'),

  ('data-analytics','obviously-ai','Obviously AI','No-code AI predictions from your data.',
   'Obviously AI builds and deploys machine-learning prediction models from your spreadsheet in minutes. No coding required. Free trial available.',
   'https://obviously.ai',null,true,'14-day trial','Free trial · Growth $75/mo',false,
   '{"predictions","no-code","ml"}',
   'Obviously AI Free — No-Code Machine Learning Predictions',
   'Build AI prediction models from spreadsheets free with Obviously AI.'),

  ('data-analytics','akkio','Akkio','AI analytics and forecasting for teams.',
   'Akkio turns business data into actionable AI predictions and dashboards. Connect your CRM or spreadsheet and build forecasting models without code. Free trial available.',
   'https://akkio.com',null,true,'14-day trial','Free trial · Starter $49/mo',false,
   '{"forecasting","dashboards","crm"}',
   'Akkio Free — AI Forecasting and Analytics Platform',
   'Build AI forecasting models from your business data free with Akkio.'),

  -- ── Chatbot Builders (3) ─────────────────────────────────────
  ('chatbot-builders','tidio','Tidio','AI chatbot for customer support.',
   'Tidio combines live chat with an AI chatbot called Lyro that answers up to 70% of customer questions automatically. Free plan: 50 Lyro AI conversations/month.',
   'https://tidio.com',null,true,'50 AI convos/mo','Free · Starter $29/mo',true,
   '{"chatbot","customer-support","livechat"}',
   'Tidio Free — AI Chatbot for Customer Support',
   'Add an AI chatbot to your site free with Tidio. 50 conversations/month.'),

  ('chatbot-builders','botpress','Botpress','Open-source AI chatbot builder.',
   'Botpress is a developer-friendly open-source platform for building AI chatbots with GPT integration, visual flows, and 100+ integrations. Free self-host or free cloud tier.',
   'https://botpress.com',null,true,'Unlimited (self-host)','Free · Plus $49/mo',false,
   '{"open-source","chatbot","gpt"}',
   'Botpress Free — Open-Source AI Chatbot Builder',
   'Build AI chatbots free with Botpress. Open-source, GPT-powered, no limits.'),

  ('chatbot-builders','landbot','Landbot','No-code chatbot builder for websites.',
   'Landbot lets you build conversational chatbots and landing pages visually — no code needed. Free plan includes 100 chats/month with WhatsApp and web embed.',
   'https://landbot.io',null,true,'100 chats/mo','Free · Starter $39/mo',false,
   '{"no-code","chatbot","whatsapp"}',
   'Landbot Free — No-Code Chatbot Builder for Websites',
   'Build website chatbots free with Landbot. 100 chats/month included.'),

  -- ── Research & Summarization (3) ─────────────────────────────
  ('research-summarization','perplexity','Perplexity AI','AI search engine with cited sources.',
   'Perplexity is an AI-powered search engine that gives direct answers with real-time web citations. Free tier offers unlimited basic searches and access to GPT-4o Mini.',
   'https://perplexity.ai',null,true,'Unlimited basic searches','Free · Pro $20/mo',true,
   '{"search","research","citations"}',
   'Perplexity AI Free — AI Search Engine With Cited Sources',
   'Research any topic free with Perplexity AI. Real-time answers with citations.'),

  ('research-summarization','elicit','Elicit','AI research assistant for papers.',
   'Elicit searches and summarises academic papers automatically. Find relevant studies, extract key findings, and build literature reviews without reading every paper. Free tier: 5,000 credits/month.',
   'https://elicit.com',null,true,'5,000 credits/mo','Free · Plus $10/mo',false,
   '{"academic","papers","literature"}',
   'Elicit Free — AI Research Assistant for Academic Papers',
   'Summarise academic papers and find research free with Elicit AI.'),

  ('research-summarization','scholarcy','Scholarcy','AI article summariser for students.',
   'Scholarcy reads research papers, reports, and book chapters and creates interactive summary flashcards. Free browser extension available with daily summaries.',
   'https://scholarcy.com',null,true,'Free browser extension','Free · Personal $9.99/mo',false,
   '{"summariser","flashcards","academic"}',
   'Scholarcy Free — AI Research Paper Summariser',
   'Summarise research papers free with Scholarcy AI. Browser extension available.'),

  -- ── Education & Tutoring (3) ─────────────────────────────────
  ('education-tutoring','khanmigo','Khanmigo','AI tutor by Khan Academy.',
   'Khanmigo is Khan Academy''s AI tutor powered by GPT-4. It guides students through math, science, and coding with Socratic questioning — never just giving answers. Free for students in US.',
   'https://khanacademy.org/khanmigo',null,true,'Free for US students','Free (US) · $4/mo elsewhere',true,
   '{"tutor","khan","education"}',
   'Khanmigo Free — AI Tutor by Khan Academy',
   'Get free AI tutoring with Khanmigo by Khan Academy. GPT-4 powered.'),

  ('education-tutoring','quizgecko','Quizgecko','AI quiz generator from any content.',
   'Quizgecko instantly generates quizzes, flashcards, and study notes from any text, PDF, video, or URL. Free tier: 10 questions per quiz, 3 quizzes/month.',
   'https://quizgecko.com',null,true,'3 quizzes/mo','Free · Pro $16/mo',false,
   '{"quiz","flashcards","study"}',
   'Quizgecko Free — AI Quiz Generator from Text and PDF',
   'Generate quizzes and flashcards free from any content with Quizgecko AI.'),

  ('education-tutoring','socratic','Socratic by Google','Homework helper by Google.',
   'Socratic is a free Google app that uses AI to help students understand homework across subjects. Snap a photo of any question and get step-by-step explanations.',
   'https://socratic.org',null,true,'Fully free','Free',false,
   '{"homework","google","mobile"}',
   'Socratic Free — AI Homework Helper by Google',
   'Solve any homework question free with Socratic by Google. Photo-based AI help.'),

  -- ── Graphic Design (3) ───────────────────────────────────────
  ('graphic-design','canva','Canva AI','AI-powered graphic design platform.',
   'Canva''s free plan includes Magic Write AI text generation, Text to Image, AI-powered background remover, and thousands of templates. The world''s most popular design tool.',
   'https://canva.com',null,true,'Free plan with AI tools','Free · Pro $14.99/mo',true,
   '{"design","templates","ai"}',
   'Canva AI Free — AI-Powered Graphic Design Platform',
   'Design stunning graphics free with Canva AI. Templates, text-to-image, and more.'),

  ('graphic-design','looka','Looka','AI logo and brand design.',
   'Looka uses AI to generate professional logos, brand kits, and marketing materials from your preferences. Preview logos free — download with a one-time payment.',
   'https://looka.com',null,true,'Preview logos free','Free preview · Logo $20 one-time',false,
   '{"logo","branding","identity"}',
   'Looka Free — AI Logo and Brand Design Generator',
   'Generate professional AI logos free to preview with Looka. Download from $20.'),

  ('graphic-design','leonardo-ai','Leonardo AI','AI image and asset generator for creatives.',
   'Leonardo AI generates high-quality images, game assets, and design elements using fine-tuned AI models. Free tier: 150 tokens/day (approx. 30 images).',
   'https://leonardo.ai',null,true,'150 tokens/day','Free · Apprentice $12/mo',false,
   '{"images","game-assets","creative"}',
   'Leonardo AI Free — AI Image and Asset Generator',
   'Generate AI images and game assets free with Leonardo AI. 150 tokens daily.'),

  -- ── Music & Audio (3) ────────────────────────────────────────
  ('music-audio','suno','Suno AI','Generate full songs from a text prompt.',
   'Suno creates complete songs — lyrics, melody, and vocals — from a simple text description. Free tier: 50 credits/day (~10 songs). Ideal for creators and content makers.',
   'https://suno.ai',null,true,'50 credits/day','Free · Pro $8/mo',true,
   '{"music","song","lyrics"}',
   'Suno AI Free — Generate Full AI Songs From Text',
   'Create complete AI songs free with Suno. 50 credits (10 songs) per day.'),

  ('music-audio','soundraw','Soundraw','Royalty-free AI music generator.',
   'Soundraw generates royalty-free music tracks from genre, mood, and tempo settings. Free plan lets you generate unlimited music — download requires a subscription.',
   'https://soundraw.io',null,true,'Unlimited generation','Free generate · Sub $16.99/mo',false,
   '{"royalty-free","music","generator"}',
   'Soundraw Free — Royalty-Free AI Music Generator',
   'Generate unlimited AI music free with Soundraw. Download royalty-free tracks.'),

  ('music-audio','loudme','Loudme AI','AI audio enhancer and mixer.',
   'Loudme uses AI to master, mix, and enhance audio files to professional quality. Upload any audio and get a polished, broadcast-ready result. Free tier: 3 files/month.',
   'https://loudme.ai',null,true,'3 files/mo','Free · Basic $9/mo',false,
   '{"mastering","audio","mixing"}',
   'Loudme AI Free — AI Audio Mastering and Enhancer',
   'Master and enhance audio free with Loudme AI. 3 files/month on free plan.'),

  -- ── Social Media AI (3) ──────────────────────────────────────
  ('social-media','buffer','Buffer AI','AI-powered social media scheduling.',
   'Buffer''s free plan lets you schedule 10 posts across 3 social channels with AI-powered caption suggestions and best-time-to-post recommendations.',
   'https://buffer.com',null,true,'10 posts/3 channels','Free · Essentials $6/mo',true,
   '{"scheduling","social","captions"}',
   'Buffer AI Free — Social Media Scheduling with AI',
   'Schedule social posts free with Buffer AI. AI captions and best-time suggestions.'),

  ('social-media','predis-ai','Predis AI','AI social media content creator.',
   'Predis AI generates social media posts, carousels, reels scripts, and ad creatives from a simple idea. Free tier: 15 posts/month across platforms.',
   'https://predis.ai',null,true,'15 posts/mo','Free · Starter $29/mo',false,
   '{"posts","carousel","reels"}',
   'Predis AI Free — AI Social Media Content Creator',
   'Generate social media posts and carousels free with Predis AI. 15 posts/month.'),

  ('social-media','taplio','Taplio','AI LinkedIn content and growth tool.',
   'Taplio helps you write viral LinkedIn posts, schedule content, and grow your personal brand with AI. Free trial: 7 days full access.',
   'https://taplio.com',null,true,'7-day trial','Free trial · Starter $39/mo',false,
   '{"linkedin","personal-brand","content"}',
   'Taplio Free — AI LinkedIn Content and Growth Tool',
   'Grow on LinkedIn free with Taplio AI. Write viral posts and schedule content.'),

  -- ── Email & Outreach (3) ─────────────────────────────────────
  ('email-outreach','mailmeteor','Mailmeteor','Free email marketing from Gmail.',
   'Mailmeteor lets you send personalised bulk emails directly from Gmail using AI-powered templates. Free plan: 75 emails/day — no external tool needed.',
   'https://mailmeteor.com',null,true,'75 emails/day','Free · Premium $9.99/mo',true,
   '{"email","gmail","bulk"}',
   'Mailmeteor Free — AI Email Marketing From Gmail',
   'Send 75 personalised emails/day free from Gmail with Mailmeteor.'),

  ('email-outreach','smartwriter','Smartwriter AI','AI cold email personalisation.',
   'Smartwriter generates hyper-personalised cold emails and LinkedIn messages by researching prospects automatically. Free trial: 5 credits.',
   'https://smartwriter.ai',null,true,'5 credits free','Free trial · Basic $49/mo',false,
   '{"cold-email","personalisation","outreach"}',
   'Smartwriter AI Free — AI Cold Email Personalisation',
   'Personalise cold emails with AI using Smartwriter. Free trial with 5 credits.'),

  ('email-outreach','instantly','Instantly','AI cold email campaign platform.',
   'Instantly lets you run unlimited cold email campaigns with AI-generated sequences, warmup, and analytics. Free plan: 50 active leads.',
   'https://instantly.ai',null,true,'50 active leads','Free · Growth $37/mo',false,
   '{"cold-email","campaigns","warmup"}',
   'Instantly Free — AI Cold Email Campaign Platform',
   'Run cold email campaigns free with Instantly AI. 50 active leads on free plan.'),

  -- ── Translation AI (3) ───────────────────────────────────────
  ('translation','deepl','DeepL','Best-in-class AI language translator.',
   'DeepL provides nuanced, context-aware translations in 31 languages — widely considered more accurate than Google Translate. Free tier: 500,000 characters/month via API.',
   'https://deepl.com',null,true,'500K chars/mo (API)','Free · Pro $8.74/mo',true,
   '{"translation","languages","api"}',
   'DeepL Free — Best AI Language Translator',
   'Translate text free with DeepL AI. 31 languages, 500K chars/month API free.'),

  ('translation','google-translate','Google Translate','Free AI translation by Google.',
   'Google Translate supports 133+ languages with text, voice, image, and document translation. Fully free with no limits on the web app. Powered by Google''s Neural Machine Translation.',
   'https://translate.google.com',null,true,'Unlimited (web app)','Free',false,
   '{"google","translation","133-languages"}',
   'Google Translate Free — AI Translation for 133+ Languages',
   'Translate any text free with Google Translate. 133+ languages, unlimited use.'),

  ('translation','simplish','Simplish','Simplify and translate complex text with AI.',
   'Simplish uses AI to simplify complicated documents into plain English and translates them simultaneously — great for legal, medical, and technical content.',
   'https://simplish.org',null,true,'Free basic use','Free · Pro $7/mo',false,
   '{"simplify","plain-english","documents"}',
   'Simplish Free — AI Text Simplifier and Translator',
   'Simplify complex text and translate it free with Simplish AI.'),

  -- ── Presentations & Slides (3) ───────────────────────────────
  ('presentations','gamma-app','Gamma','AI presentation builder from text.',
   'Gamma creates stunning presentations, documents, and websites from a one-line prompt. AI handles layout, images, and formatting automatically. Free: 400 AI credits on sign-up.',
   'https://gamma.app',null,true,'400 AI credits','Free · Plus $8/mo',true,
   '{"presentation","slides","ai"}',
   'Gamma Free — AI Presentation Builder From Text Prompt',
   'Create AI presentations from text free with Gamma. 400 credits on sign-up.'),

  ('presentations','beautiful-ai','Beautiful.ai','AI slide design automation.',
   'Beautiful.ai automatically adjusts slide layouts as you add content, keeping every slide design-perfect. Free plan: unlimited presentations with Beautiful.ai branding.',
   'https://beautiful.ai',null,true,'Unlimited (with branding)','Free · Pro $12/mo',false,
   '{"slides","design","auto-layout"}',
   'Beautiful.ai Free — AI Slide Design Automation',
   'Create beautiful slides automatically free with Beautiful.ai. Unlimited presentations.'),

  ('presentations','tome','Tome','AI storytelling and presentation tool.',
   'Tome generates narrative-driven presentations and documents from prompts. Built for founders, PMs, and marketers who need to communicate ideas visually. Free: 500 AI credits.',
   'https://tome.app',null,true,'500 AI credits','Free · Pro $16/mo',false,
   '{"storytelling","narrative","presentation"}',
   'Tome Free — AI Storytelling and Presentation Generator',
   'Build narrative presentations free with Tome AI. 500 credits on free plan.'),

  -- ── Lead Generation (3) ──────────────────────────────────────
  ('lead-generation','apollo','Apollo.io','AI-powered B2B lead database.',
   'Apollo.io gives access to 275M+ verified B2B contacts with AI-powered outreach sequences, email finder, and intent data. Free plan: 50 email credits/month.',
   'https://apollo.io',null,true,'50 email credits/mo','Free · Basic $59/mo',true,
   '{"b2b","contacts","email-finder"}',
   'Apollo.io Free — AI B2B Lead Generation Database',
   'Find B2B leads free with Apollo.io. 50 email credits/month on free plan.'),

  ('lead-generation','hunter','Hunter.io','Find and verify professional email addresses.',
   'Hunter.io finds professional email addresses by company domain and verifies their deliverability using AI. Free plan: 25 searches and 50 verifications/month.',
   'https://hunter.io',null,true,'25 searches/mo','Free · Starter $34/mo',false,
   '{"email-finder","verification","b2b"}',
   'Hunter.io Free — Find Professional Email Addresses',
   'Find and verify business emails free with Hunter.io. 25 searches/month.'),

  ('lead-generation','seamless-ai','Seamless AI','Real-time B2B contact finder.',
   'Seamless AI uses AI to find verified phone numbers and emails for any professional in real time. Free plan: 50 credits to find contacts and build prospect lists.',
   'https://seamless.ai',null,true,'50 credits free','Free · Basic $147/mo',false,
   '{"contacts","phone","b2b"}',
   'Seamless AI Free — Real-Time B2B Contact Finder',
   'Find verified B2B contacts free with Seamless AI. 50 credits on free plan.'),

  -- ── Vision & OCR (3) ─────────────────────────────────────────
  ('vision-ocr','adobe-acrobat-ocr','Adobe Acrobat OCR','Free online PDF OCR tool.',
   'Adobe Acrobat''s free online OCR converts scanned PDFs and images into searchable, editable text with high accuracy. Free for up to 2 conversions per month.',
   'https://www.adobe.com/acrobat/online/pdf-to-word.html',null,true,'2 conversions/mo','Free · Acrobat $14.99/mo',true,
   '{"ocr","pdf","scan"}',
   'Adobe Acrobat OCR Free — Convert Scanned PDF to Text',
   'Convert scanned PDFs to editable text free with Adobe Acrobat OCR.'),

  ('vision-ocr','google-cloud-vision','Google Cloud Vision','AI image recognition API.',
   'Google Cloud Vision detects objects, faces, text, labels, and explicit content in images. Free tier: 1,000 units/month per feature across the Vision API.',
   'https://cloud.google.com/vision',null,true,'1,000 units/mo','Free · Pay per use after',false,
   '{"api","vision","object-detection"}',
   'Google Cloud Vision Free — AI Image Recognition API',
   'Detect objects, text, and faces in images free with Google Cloud Vision API.'),

  ('vision-ocr','mathpix','Mathpix','AI OCR for math equations and STEM.',
   'Mathpix converts handwritten or printed math equations, chemistry structures, and scientific notation into LaTeX or MathML. Free tier: 20 snips/month.',
   'https://mathpix.com',null,true,'20 snips/mo','Free · Pro $4.99/mo',false,
   '{"math","latex","stem"}',
   'Mathpix Free — AI OCR for Math Equations and LaTeX',
   'Convert math equations to LaTeX free with Mathpix AI. 20 snips/month.'),

  -- ── Health & Wellness (3) ────────────────────────────────────
  ('health-wellness','youper','Youper','AI mental health and mood journal.',
   'Youper is an AI-powered emotional health assistant that tracks mood, runs CBT exercises, and provides therapy-inspired conversations. Free core features available.',
   'https://youper.ai',null,true,'Free core features','Free · Premium $9.99/mo',true,
   '{"mental-health","cbt","mood"}',
   'Youper Free — AI Mental Health and Mood Tracking App',
   'Track mood and improve mental health free with Youper AI CBT assistant.'),

  ('health-wellness','ada-health','Ada Health','AI symptom checker and health guide.',
   'Ada Health is an AI-powered symptom checker used by 12M+ people. Describe symptoms and get a personalised health assessment with possible causes. Completely free.',
   'https://ada.com',null,true,'Fully free','Free',false,
   '{"symptoms","health","checker"}',
   'Ada Health Free — AI Symptom Checker and Health Guide',
   'Check symptoms free with Ada Health AI. Used by 12 million people worldwide.'),

  ('health-wellness','wysa','Wysa','AI mental wellness chatbot.',
   'Wysa is an AI-powered chatbot for mental wellness that uses CBT, mindfulness, and DBT techniques. Free tier includes unlimited self-help exercises and mood tracking.',
   'https://wysa.io',null,true,'Unlimited self-help exercises','Free · Premium $29.99/mo',false,
   '{"mental-wellness","mindfulness","dbt"}',
   'Wysa Free — AI Mental Wellness Chatbot',
   'Improve mental wellness free with Wysa AI chatbot. CBT and mindfulness tools.'),

  -- ── Cybersecurity AI (3) ─────────────────────────────────────
  ('cybersecurity','virustotal','VirusTotal','Free AI-powered malware scanner.',
   'VirusTotal analyses files, URLs, IPs, and domains using 70+ antivirus scanners and AI. Completely free for file and URL scanning. Essential tool for security professionals.',
   'https://virustotal.com',null,true,'Unlimited scanning','Free · Enterprise pricing',true,
   '{"malware","virus","scanner"}',
   'VirusTotal Free — AI Malware and URL Scanner',
   'Scan files and URLs for malware free with VirusTotal. 70+ antivirus engines.'),

  ('cybersecurity','pentest-gpt','PentestGPT','AI penetration testing assistant.',
   'PentestGPT guides security professionals through penetration testing with step-by-step AI-generated attack chains, vulnerability analysis, and exploitation suggestions.',
   'https://pentestgpt.ai',null,true,'Free basic access','Free · Pro $20/mo',false,
   '{"pentest","security","hacking"}',
   'PentestGPT Free — AI Penetration Testing Assistant',
   'Run AI-guided penetration tests free with PentestGPT. Step-by-step guidance.'),

  ('cybersecurity','aikido-security','Aikido Security','AI-powered code security scanner.',
   'Aikido Security scans your code repositories for vulnerabilities, secrets, and misconfigurations using AI. Free for open-source and small teams: up to 3 repos.',
   'https://aikido.dev',null,true,'3 repos free','Free · Business $299/mo',false,
   '{"code-security","vulnerabilities","repos"}',
   'Aikido Security Free — AI Code Vulnerability Scanner',
   'Scan code for security vulnerabilities free with Aikido. Up to 3 repos.'),

  -- ── Avatar & Talking Head (3) ────────────────────────────────
  ('avatar-talking-head','heygen','HeyGen','AI talking avatar video generator.',
   'HeyGen creates professional talking-head videos using AI avatars and voice cloning. Upload a photo, type your script, and get a realistic AI spokesperson video. Free: 1 credit/month.',
   'https://heygen.com',null,true,'1 credit/mo (1 min video)','Free · Creator $29/mo',true,
   '{"avatar","talking-head","spokesperson"}',
   'HeyGen Free — AI Talking Avatar Video Generator',
   'Create AI avatar videos free with HeyGen. 1 minute/month on free plan.'),

  ('avatar-talking-head','d-id','D-ID','AI video from photos — talking portraits.',
   'D-ID animates still photos into talking, expressive video portraits using AI. Used for marketing, e-learning, and digital humans. Free trial: 5 minutes of video.',
   'https://d-id.com',null,true,'5 min trial','Free trial · Lite $5.9/mo',false,
   '{"digital-human","photo","animation"}',
   'D-ID Free — AI Talking Portrait and Video Generator',
   'Animate photos into talking videos free with D-ID. 5-minute free trial.'),

  ('avatar-talking-head','synthesia','Synthesia','Enterprise AI avatar video platform.',
   'Synthesia generates professional training and explainer videos using 160+ AI avatars and 130+ languages. No camera or studio needed. Free trial: 3-minute video.',
   'https://synthesia.io',null,true,'3 min free video','Free trial · Starter $22/mo',false,
   '{"training-videos","avatars","e-learning"}',
   'Synthesia Free — AI Avatar Video Generator | 160+ Avatars',
   'Create AI avatar videos in 130+ languages free with Synthesia trial.')

) as v(cat_slug, slug, name, tagline, description, website_url, affiliate_url,
       is_free, free_tier, pricing, featured, tags, meta_title, meta_desc)
on (cat.slug = v.cat_slug)
on conflict (slug) do nothing;

-- Refresh tool counts for affected categories
update categories c
set tool_count = (select count(*) from tools t where t.category_id = c.id)
where c.slug in (
  'data-analytics','chatbot-builders','research-summarization',
  'education-tutoring','graphic-design','music-audio',
  'social-media','email-outreach','translation',
  'presentations','lead-generation','vision-ocr',
  'health-wellness','cybersecurity','avatar-talking-head'
);
