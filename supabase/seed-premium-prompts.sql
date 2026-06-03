-- ============================================================
-- PREMIUM QUALITY AI PROMPTS - 15 Popular Niches
-- Production-ready prompts with SEO optimization
-- Run this AFTER blog-prompts-schema.sql
-- ============================================================

-- NICHE 1: Marketing & SEO
INSERT INTO prompts (
  slug, title, prompt_text, description, category, use_case, ai_tool, tags,
  is_free, difficulty_level, instructions, featured,
  seo_title, seo_description
) VALUES
('seo-content-gap-analyzer',
 'SEO Content Gap Analyzer + Content Brief Builder',
 'You are a senior SEO strategist. I want to outrank the top 5 results for this keyword: [TARGET KEYWORD].

Do the following in order:

1. COMPETITOR ANALYSIS
For each of the top 5 ranking pages, identify:
- Their core content angle (one sentence)
- Topics they cover well
- Topics they miss or undertreat
- Any outdated information or weak sections

2. CONTENT GAP SUMMARY
List the 5 most valuable subtopics that none of the top 5 pages cover thoroughly. For each gap, explain WHY it matters to the searcher.

3. CONTENT BRIEF
Write a brief for a [TARGET WORD COUNT]-word article that fills all identified gaps. Include:
- Recommended H1 title (under 60 characters, includes keyword)
- Recommended URL slug
- Ordered H2/H3 structure with 1-sentence purpose for each section
- 3 specific statistics or data points to find and include
- Target search intent: [INFORMATIONAL / TRANSACTIONAL / NAVIGATIONAL]
- One unique angle competitors have not used

4. OUTPUT FORMAT: Use clearly labeled sections. Be specific — no generic advice.',
 'Find SEO content gaps, reverse-engineer competitor rankings, and generate a complete content brief — all in one AI prompt run.',
 'Marketing',
 'SEO content strategy and competitor analysis',
 'ChatGPT',
 ARRAY['seo', 'content-strategy', 'competitor-analysis', 'content-brief'],
 true,
 'Advanced',
 '1. Replace [TARGET KEYWORD] with your focus keyword
2. Replace [TARGET WORD COUNT] with desired article length
3. Choose search intent type
4. Paste entire prompt into ChatGPT or Claude
5. Review output and refine',
 true,
 'AI Prompt for SEO Content Gap Analysis — Find Hidden Ranking Opportunities',
 'Use this AI prompt to find content gaps, reverse-engineer competitor rankings, and generate a complete content brief — all in one run.');

-- NICHE 2: E-Commerce
INSERT INTO prompts (
  slug, title, prompt_text, description, category, use_case, ai_tool, tags,
  is_free, difficulty_level, instructions, featured,
  seo_title, seo_description
) VALUES
('high-converting-product-description',
 'High-Converting Product Description Writer',
 'You are a conversion copywriter who has written product pages generating 6-figure monthly revenue.

Write a product description for: [PRODUCT NAME]
Target buyer: [DESCRIBE WHO BUYS THIS — e.g., busy moms, gym beginners, home cooks]
Primary keyword: [KEYWORD]
Tone: [e.g., friendly and casual / premium and authoritative / fun and energetic]

Deliver exactly this structure:

HEADLINE (under 10 words)
One bold statement of the transformation or result the buyer gets. Not a feature — a feeling or outcome.

OPENING (2 sentences)
Describe the problem the buyer has RIGHT NOW, in language they would actually use. Do not mention the product yet.

BENEFIT BULLETS (5 bullets)
Each bullet = one benefit + one specific reason it matters. Format: [Benefit] — [why this matters to the buyer].
Never lead a bullet with a feature name.

SPEC TABLE
Clean table: Feature | Spec | Why It Matters

TRUST LINE (1 sentence)
One social proof statement. Use: "Join [NUMBER]+ customers who [specific result]."

CTA
Action-oriented button text (4 words max) + one urgency line under it.

RULES: Every sentence must earn its place. Cut anything that doesn&apos;t move the buyer closer to purchasing.',
 'Write product descriptions that convert browsers into buyers using benefit-first writing, sensory language, and objection handling.',
 'E-Commerce',
 'Product description writing for Shopify, WooCommerce, Amazon',
 'ChatGPT',
 ARRAY['e-commerce', 'product-description', 'conversion', 'copywriting'],
 true,
 'Intermediate',
 '1. Fill in product name and target buyer details
2. Choose tone that matches your brand
3. Add primary SEO keyword
4. Paste into ChatGPT
5. Use output directly or customize',
 true,
 'AI Prompt for Shopify Product Descriptions That Actually Sell — Free Template',
 'Write product descriptions that convert browsers into buyers. This prompt uses benefit-first writing, sensory language, and objection handling.');

-- NICHE 3: Social Media
INSERT INTO prompts (
  slug, title, prompt_text, description, category, use_case, ai_tool, tags,
  is_free, difficulty_level, instructions, featured,
  seo_title, seo_description
) VALUES
('instagram-carousel-script',
 'Instagram Carousel Script — Save-Worthy Educational Post',
 'You are an Instagram content strategist who builds educational carousels that regularly hit 50,000+ saves.

Topic: [TOPIC]
Target audience: [WHO FOLLOWS THIS ACCOUNT — e.g., freelance designers, new parents, fitness beginners]
Goal of this post: [GET SAVES / GROW FOLLOWERS / DRIVE LINK-IN-BIO CLICKS]

Create a 10-slide carousel:

SLIDE 1 — HOOK
Headline: under 7 words. Must create a knowledge gap or challenge a common belief. No clickbait.
Visual note: describe the background color and single focal image.

SLIDES 2–8 — ONE INSIGHT PER SLIDE
For each slide:
- Headline: the insight in under 12 words (bold, large)
- Body: 1–2 sentences of explanation. Concrete, specific, no filler.
- Visual note: icon, illustration concept, or data visualization idea

SLIDE 9 — THE MISTAKE
One common mistake related to this topic. Why people make it. How to avoid it.

SLIDE 10 — CTA
"Save this for later." + One follow prompt tied directly to this topic (not generic).

CAPTION
- Line 1: repeat the slide 1 hook, slightly reworded
- Lines 2–4: expand the core idea in 2–3 sentences
- Hashtags: 6 targeted hashtags — 2 broad, 2 mid-size, 2 niche. No hashtag stuffing.

OUTPUT: Number each slide clearly. Keep all copy concise — this renders on mobile.',
 'Create Instagram carousels that get saved and shared. This prompt builds hook slides, educational content, and CTAs optimized for the algorithm.',
 'Social Media',
 'Instagram carousel content creation',
 'ChatGPT',
 ARRAY['instagram', 'social-media', 'carousel', 'viral-content'],
 true,
 'Intermediate',
 '1. Define your topic and target audience
2. Choose your post goal (saves/followers/clicks)
3. Paste prompt into ChatGPT
4. Design slides in Canva using the visual notes
5. Post and track saves',
 true,
 'AI Prompt for Viral Instagram Carousel Posts — Hook, Educate, Convert',
 'Create Instagram carousels that get saved and shared. This prompt builds hook slides, educational content, and CTAs optimized for the algorithm.');

-- NICHE 4: Email Marketing
INSERT INTO prompts (
  slug, title, prompt_text, description, category, use_case, ai_tool, tags,
  is_free, difficulty_level, instructions, featured,
  seo_title, seo_description
) VALUES
('email-welcome-sequence',
 '5-Email Welcome Sequence — Value-First, Conversion-Ready',
 'You are an email strategist. I need a 5-email welcome sequence for new subscribers.

Business type: [e.g., online course creator / SaaS / e-commerce brand / service business]
What subscribers signed up for: [LEAD MAGNET OR SIGNUP REASON]
End goal of the sequence: [SELL A PRODUCT / BOOK A CALL / BUILD TRUST BEFORE A LAUNCH]
Brand tone: [e.g., conversational and warm / direct and no-fluff / professional and clear]

For each email, provide:
- Subject line (under 48 characters — short enough for mobile preview)
- Preview text (under 85 characters — completes or contrasts the subject line)
- Opening line (the first sentence after "Hi [Name]," — must hook immediately)
- Body (150–200 words. Value-first. No corporate language. Write like a person.)
- Single CTA (one action only — button text + destination)
- P.S. line (plant a seed for the next email)

Email sequence:
Email 1 — Deliver what they signed up for. Warm welcome. No pitch.
Email 2 — Teach one high-value thing. Builds trust.
Email 3 — Share a short story or case study. Proof.
Email 4 — Address the #1 objection to [YOUR OFFER]. Soft introduce the offer.
Email 5 — Clear, confident offer. Deadline or scarcity if applicable.

IMPORTANT: Each email must work as a standalone piece. No "as I mentioned last email" connectors.',
 'Turn new subscribers into buyers with a value-first welcome sequence. This prompt builds each email with subject lines, hooks, and CTAs.',
 'Email Marketing',
 'Email automation and welcome sequences',
 'Claude',
 ARRAY['email-marketing', 'automation', 'welcome-sequence', 'conversion'],
 true,
 'Intermediate',
 '1. Define your business type and lead magnet
2. Set the end goal of the sequence
3. Choose brand tone
4. Paste into Claude or ChatGPT
5. Import to your email platform',
 false,
 'AI Prompt for a 5-Day Welcome Email Sequence — Free Template That Converts',
 'Turn new subscribers into buyers with a value-first welcome sequence. This prompt builds each email with subject lines, hooks, and CTAs.');

-- NICHE 5: YouTube
INSERT INTO prompts (
  slug, title, prompt_text, description, category, use_case, ai_tool, tags,
  is_free, difficulty_level, instructions, featured,
  seo_title, seo_description
) VALUES
('youtube-video-script-retention',
 'YouTube Video Script — Retention-Optimized with Hook System',
 'You are a YouTube scriptwriter whose videos consistently achieve 55%+ average view duration.

Channel niche: [NICHE]
Video topic: [SPECIFIC TOPIC]
Target video length: [DURATION — e.g., 8–10 minutes]
Viewer level: [BEGINNER / INTERMEDIATE / ADVANCED]
Primary goal: [GET SUBSCRIBERS / SELL A PRODUCT / BUILD AUTHORITY]

Write the complete script with these sections:

TITLE OPTIONS (3 choices)
Under 60 characters each. Includes a specific number or result. No misleading clickbait.

HOOK (first 45 seconds — this is the most important part)
- Pattern interrupt: unexpected statement, bold claim, or question that stops the viewer from clicking away
- Restate the promise: "In this video you&apos;ll learn exactly how to [specific outcome]"
- Credibility signal: one sentence on why you can deliver this

BODY — 3–4 SECTIONS
For each section:
- Timestamp label (e.g., "Section 1 — [0:45]")
- Retention checkpoint: a one-liner that teases what&apos;s coming 60 seconds ahead
- Core content: full script with spoken language, no bullet-list reading
- One visual/B-roll cue per section

CTA (final 30 seconds)
Ask for ONE thing only. Tie it directly to what they just learned.

DESCRIPTION (for YouTube)
- First 2 lines: keyword-rich summary (appears above "Show more")
- Timestamps for each section
- 8 relevant tags

IMPORTANT: Write this as spoken language — contractions, natural rhythm, no formal essay tone.',
 'Write YouTube scripts that hold attention from second 1 to the end. This prompt builds retention checkpoints, a pattern-interrupt hook, and a conversion CTA.',
 'YouTube',
 'YouTube video scriptwriting',
 'ChatGPT',
 ARRAY['youtube', 'video-script', 'content-creation', 'retention'],
 true,
 'Advanced',
 '1. Define your niche and specific topic
2. Set target length and viewer level
3. Choose your primary goal
4. Paste into ChatGPT
5. Record video following the script',
 true,
 'AI Prompt for YouTube Video Scripts — Hook, Retain, Convert Viewers',
 'Write YouTube scripts that hold attention from second 1 to the end. This prompt builds retention checkpoints, pattern-interrupt hooks, and conversion CTAs.');

-- NICHE 6: Pinterest
INSERT INTO prompts (
  slug, title, prompt_text, description, category, use_case, ai_tool, tags,
  is_free, difficulty_level, instructions, featured,
  seo_title, seo_description
) VALUES
('pinterest-pin-package',
 'Pinterest Pin Package — Title, Description & Board Strategy',
 'You are a Pinterest SEO specialist who manages accounts driving 2M+ monthly impressions.

Blog post or product to promote: [TITLE OR URL]
Primary topic: [TOPIC]
Target audience on Pinterest: [WHO SEARCHES FOR THIS — e.g., home decorators, budget travelers, new teachers]
Primary keyword to target: [KEYWORD]

Deliver this full package:

PIN TITLES (10 options)
Each title:
- Under 100 characters
- Leads with the primary keyword or a high-value synonym
- Uses a specific number, outcome, or time frame where natural
- No generic power words like "amazing" or "best" without context

PIN DESCRIPTIONS (3 options — one for each angle)
Each description:
- 150–200 characters
- Sentence 1: state the benefit or outcome directly
- Sentence 2: what they&apos;ll find when they click
- End with 2–3 hashtags (niche-specific, not broad)
- Include the primary keyword naturally — no keyword stuffing

BOARD STRATEGY
- 5 existing board names to pin to (descriptive, searchable names)
- 2 new board names to create (with suggested board description, 150 chars)

SEASONAL KEYWORDS
- 5 seasonal variations to use in [CURRENT MONTH / UPCOMING SEASON]

POSTING NOTES
- Best time to post (PST) for this niche
- Suggested repin frequency for this pin

FORMAT: Label every section clearly. Descriptions should read naturally — not like a keyword list.',
 'Drive consistent Pinterest traffic with keyword-rich pin titles and descriptions. Includes board strategy and seasonal keyword suggestions.',
 'Social Media',
 'Pinterest marketing and traffic generation',
 'ChatGPT',
 ARRAY['pinterest', 'seo', 'traffic', 'social-media'],
 true,
 'Intermediate',
 '1. Add your blog post or product URL
2. Define topic and target audience
3. Add primary keyword
4. Paste into ChatGPT
5. Use output to create pins in Canva',
 false,
 'AI Prompt: Generate Viral Pinterest Pin Titles, Descriptions & Strategy',
 'Drive consistent Pinterest traffic with keyword-rich pin titles and descriptions. Includes board strategy and seasonal keyword suggestions.');

-- NICHE 7: Sales Copy
INSERT INTO prompts (
  slug, title, prompt_text, description, category, use_case, ai_tool, tags,
  is_free, difficulty_level, instructions, featured,
  seo_title, seo_description
) VALUES
('landing-page-copy-framework',
 'Landing Page Copy — Full Framework with A/B Variants',
 'You are a direct-response copywriter. Your landing pages have generated over $2M in revenue across SaaS, courses, and e-commerce.

Product or service: [NAME AND ONE-LINE DESCRIPTION]
Target audience: [BE SPECIFIC — job title, life situation, main pain point]
Price point: [PRICE]
Main competitor they&apos;re probably considering: [COMPETITOR OR ALTERNATIVE]
Biggest objection to buying: [e.g., price, time, trust, "does this actually work?"]

Write the full landing page copy in this order:

HERO SECTION
- Primary headline: under 10 words, states the transformation (not the product)
- Subheadline: one sentence that clarifies HOW and for WHOM
- CTA button text: action verb + outcome (e.g., "Start building today")
- Under-button trust line: removes one friction point (e.g., "No credit card required")
- A/B VARIANT: alternative headline that leads with pain instead of gain

PROBLEM SECTION (3 pain points)
Write each in the customer&apos;s exact language — the words they use to describe this problem to a friend. No clinical descriptions.

SOLUTION SECTION
3 benefits. Format: [Bold benefit statement] → [One sentence explaining the specific mechanism].

SOCIAL PROOF BLOCK
- Testimonial template: [Name, Role/Location]: "[Result they got] + [specific detail that makes it believable]"
- Trust stat: "X customers / X reviews / X [relevant metric]"

OBJECTION HANDLER (address the one objection you listed above)
3 sentences. Acknowledge it. Reframe it. Resolve it.

FAQ (5 questions)
Only questions that block a sale. Answer each in under 60 words.

FINAL CTA SECTION
- Urgency or scarcity element (must be real — do not invent fake deadlines)
- Guarantee statement
- Final CTA button

RULES: No hype. No fake urgency. Every claim needs to be something you can prove.',
 'Write a complete landing page that converts at 5%+. Includes hero section, objection handling, social proof, and A/B test variants.',
 'Sales',
 'Landing page and sales page copywriting',
 'Claude',
 ARRAY['sales-copy', 'landing-page', 'conversion', 'copywriting'],
 true,
 'Advanced',
 '1. Fill in all product and audience details
2. Identify biggest objection honestly
3. Paste into Claude for nuanced copy
4. Use A/B variant for testing
5. Build page with copy',
 true,
 'AI Prompt for High-Converting Landing Pages — Full Copy Framework',
 'Write a complete landing page that converts at 5%+. Includes hero section, objection handling, social proof, and A/B test variants.');

-- NICHE 8: Coding
INSERT INTO prompts (
  slug, title, prompt_text, description, category, use_case, ai_tool, tags,
  is_free, difficulty_level, instructions, featured,
  seo_title, seo_description
) VALUES
('production-code-generator',
 'Production-Ready Code Generator with Review & Tests',
 'You are a senior software engineer with 10+ years writing production code. You prioritize readability, security, and maintainability over cleverness.

Language / Framework: [e.g., Python / FastAPI, JavaScript / React, Go / standard library]
Task: [DESCRIBE EXACTLY WHAT THE CODE SHOULD DO]
Inputs: [WHAT DOES THE FUNCTION/COMPONENT RECEIVE?]
Expected outputs: [WHAT SHOULD IT RETURN OR RENDER?]
Constraints: [e.g., must be under 50ms, no external libraries, must be accessible]

Deliver in this order:

1. IMPLEMENTATION
Write the complete code. Requirements:
- Meaningful variable names (no single letters except loop counters)
- Inline comments only where the logic is non-obvious — not on every line
- Proper error handling (don&apos;t swallow exceptions silently)
- Input validation where applicable
- No hardcoded credentials, URLs, or magic numbers (use constants)

2. CODE REVIEW
Review your own code as if you were a different engineer. List:
- 2–3 potential edge cases not yet handled
- 1 security consideration if applicable
- 1 performance note if applicable

3. TESTS
Write 5 test cases:
- 2 happy path (expected inputs)
- 2 edge cases (boundary values, empty inputs, unexpected types)
- 1 failure case (what should throw or fail gracefully)

4. USAGE EXAMPLE
One real-world usage snippet showing how to call or import this code.

OUTPUT FORMAT: Use code blocks with language syntax highlighting labels. Separate each section with a clear header.',
 'Write clean, production-ready code with built-in error handling, inline comments, and test cases. Works for any language or framework.',
 'Coding',
 'Code generation and development',
 'ChatGPT',
 ARRAY['coding', 'development', 'testing', 'production-code'],
 true,
 'Advanced',
 '1. Specify language/framework clearly
2. Describe exact task and inputs/outputs
3. Add any constraints
4. Paste into ChatGPT
5. Review code review section before using',
 true,
 'AI Prompt for Production-Ready Code — Generates, Reviews & Tests in One Run',
 'Write clean, production-ready code with built-in error handling, inline comments, and test cases. Works for any language or framework.');

-- NICHE 9: Real Estate
INSERT INTO prompts (
  slug, title, prompt_text, description, category, use_case, ai_tool, tags,
  is_free, difficulty_level, instructions, featured,
  seo_title, seo_description
) VALUES
('property-listing-description',
 'Property Listing Description — Story-Driven & SEO-Optimized',
 'You are a luxury real estate copywriter. Your listings sell 30% faster than market average because you write for buyers&apos; emotions, not just their checklists.

Property type: [e.g., 3-bed detached house, 2-bed condo, commercial unit]
Location: [CITY, NEIGHBORHOOD]
Key features: [LIST 5–7 STANDOUT FEATURES]
Target buyer: [e.g., young professional couple, growing family, downsizer, investor]
Price range: [PRICE]
5 local keywords to include naturally: [e.g., "Riverside Park", "top-rated schools", "walkable neighborhood"]

Write the listing description in this structure:

HEADLINE (under 15 words)
States the lifestyle this home enables — not just the specs. Example format: "[Location] home where [lifestyle promise]."

OPENING PARAGRAPH (3 sentences)
Sentence 1: Paint a scene. Put the reader inside the home at a specific time of day.
Sentence 2: Name the most emotionally compelling feature with a sensory detail.
Sentence 3: State the key practical benefit that matters most to the target buyer.

FEATURE HIGHLIGHTS (4–5 bullets)
Each bullet: [Room/Feature] — [sensory or lifestyle detail]. One sentence. No estate agent clichés ("cozy," "charming," "stunning" without evidence).

NEIGHBORHOOD PARAGRAPH (2–3 sentences)
Name specific local amenities (real ones based on the location you provided). Walking distance, commute time, school names if applicable.

CLOSING LINE + CTA (2 sentences)
Create urgency tied to scarcity (type of home, neighborhood, market) not a fake deadline. Invite action.

BANNED WORDS: cozy, charming, stunning, lovely, spacious (use a measurement instead), must-see, rare find. These are meaningless — replace with specifics.',
 'Write property descriptions that attract qualified buyers and rank in Zillow search. Uses lifestyle storytelling and hyperlocal details.',
 'Real Estate',
 'Property listing copywriting',
 'Claude',
 ARRAY['real-estate', 'property-listing', 'copywriting', 'seo'],
 true,
 'Intermediate',
 '1. Gather all property details and features
2. Research local amenities by name
3. Identify target buyer persona
4. Paste into Claude
5. Post to MLS, Zillow, or website',
 false,
 'AI Prompt for Real Estate Listings That Sell Faster — Emotional + SEO Copy',
 'Write property descriptions that attract qualified buyers and rank in Zillow search. Uses lifestyle storytelling and hyperlocal details.');

-- NICHE 10: HR & Recruitment
INSERT INTO prompts (
  slug, title, prompt_text, description, category, use_case, ai_tool, tags,
  is_free, difficulty_level, instructions, featured,
  seo_title, seo_description
) VALUES
('job-description-writer',
 'Job Description Writer — Attracts Top Talent, Reduces Bias',
 'You are an HR strategist and talent acquisition expert. You specialize in writing job descriptions that increase qualified applicant volume by 40% and pass DEI language audits.

Role title: [JOB TITLE]
Department: [DEPARTMENT]
Employment type: [FULL-TIME / PART-TIME / CONTRACT / REMOTE / HYBRID / ON-SITE]
Seniority level: [e.g., entry level, mid-level, senior, lead]
Core responsibilities: [LIST 5–7 KEY RESPONSIBILITIES]
Must-have qualifications: [LIST 3–5 GENUINE REQUIREMENTS]
Nice-to-have qualifications: [LIST 2–3 PREFERENCES]
Salary range: [RANGE — leaving this blank reduces applications by 30%]
Company culture in 3 words: [e.g., fast-paced, collaborative, mission-driven]

Deliver in this order:

1. JOB DESCRIPTION (ready to post)
- Company intro (2 sentences — lead with mission, not size or year founded)
- Role summary (3 sentences — what the person will own, not just do)
- Responsibilities (5–7 bullets — outcomes, not tasks. e.g., "Own X to achieve Y" not just "Manage X")
- Requirements (separate must-have from nice-to-have — this alone increases female applicants by 25%)
- What we offer (compensation, growth, culture — be specific)

2. BIAS AUDIT
Flag any language in the description that:
- Skews toward a specific gender (e.g., "rockstar," "ninja," "aggressive")
- Unnecessarily excludes candidates (e.g., degree requirements where experience would suffice)
- Creates unnecessary barriers (e.g., "10+ years" when 5 is realistic)
Provide corrected alternatives for each flag.

3. INTERVIEW QUESTION STARTERS (5 questions)
Structured, behavior-based questions tied to the must-have qualifications. Format: "Tell me about a time when you [competency-based scenario]..."',
 'Write job descriptions that draw in qualified candidates and reduce unconscious bias. Includes requirements audit and inclusive language check.',
 'HR',
 'Job description writing and talent acquisition',
 'ChatGPT',
 ARRAY['hr', 'recruiting', 'job-description', 'dei'],
 true,
 'Intermediate',
 '1. Fill in all role details honestly
2. Include salary range (critical!)
3. Paste into ChatGPT
4. Review bias audit carefully
5. Post to job boards',
 false,
 'AI Prompt for Job Descriptions That Attract Top Talent — Bias-Reduced Templates',
 'Write job descriptions that draw in qualified candidates and reduce unconscious bias. Includes requirements audit and inclusive language check.');

-- NICHE 11: Education
INSERT INTO prompts (
  slug, title, prompt_text, description, category, use_case, ai_tool, tags,
  is_free, difficulty_level, instructions, featured,
  seo_title, seo_description
) VALUES
('lesson-plan-builder',
 'Lesson Plan Builder — Differentiated & Outcome-Driven',
 'You are a curriculum designer with 15 years of classroom and instructional design experience. You build lessons where 90%+ of students meet the learning objective.

Subject: [SUBJECT]
Grade level or learner age: [GRADE / AGE]
Topic: [SPECIFIC TOPIC — not just "fractions," say "comparing fractions with unlike denominators"]
Lesson duration: [e.g., 45 minutes, 60 minutes, 90-minute block]
Class size: [NUMBER OF STUDENTS]
Prior knowledge assumed: [WHAT STUDENTS ALREADY KNOW]
Learning environment: [IN-PERSON / REMOTE / HYBRID]

Build a complete lesson plan:

LEARNING OBJECTIVE (1 sentence)
Format: "By the end of this lesson, students will be able to [observable, measurable action verb] [specific content] [under what conditions]."
No vague verbs like "understand" or "appreciate" — use: identify, calculate, compare, construct, explain, evaluate.

LESSON STRUCTURE
- Warm-up / Activate Prior Knowledge (5–10 min): one quick activity that surfaces what students already know
- Direct Instruction (10–15 min): core concept delivery with 2 concrete examples
- Guided Practice (10–15 min): teacher-led activity students do alongside
- Independent Practice (10–15 min): students work alone or in pairs
- Exit Ticket / Assessment (5 min): one question that proves mastery of the objective

MATERIALS LIST
Everything needed. Include free digital tool alternatives to physical materials.

DIFFERENTIATION
- Support (struggling learners): one accommodation
- Extension (advanced learners): one challenge that deepens — not just more of the same

COMMON MISCONCEPTION TO ADDRESS
One thing students frequently get wrong on this topic, and how to preemptively address it.',
 'Build complete lesson plans with learning objectives, activities, and assessments. Includes differentiation for mixed-ability classrooms.',
 'Education',
 'Lesson planning and curriculum design',
 'ChatGPT',
 ARRAY['education', 'lesson-plan', 'teaching', 'curriculum'],
 true,
 'Intermediate',
 '1. Be specific about topic (not just subject)
2. Fill in all timing and environment details
3. Paste into ChatGPT
4. Adapt materials to what you have available
5. Print or save to your lesson plan book',
 false,
 'AI Prompt for Lesson Plans — Differentiated, Outcome-Driven, Any Subject',
 'Build complete lesson plans with learning objectives, activities, and assessments. Includes differentiation for mixed-ability classrooms.');

-- NICHE 12: Restaurant & Food
INSERT INTO prompts (
  slug, title, prompt_text, description, category, use_case, ai_tool, tags,
  is_free, difficulty_level, instructions, featured,
  seo_title, seo_description
) VALUES
('menu-description-writer',
 'Menu Description Writer — Sensory Language That Increases Order Value',
 'You are a hospitality copywriter. Restaurants using your menu descriptions report 20–35% higher average order values because you make food irresistible on paper.

Restaurant name: [NAME]
Cuisine type: [e.g., Italian trattoria, modern Asian fusion, Southern BBQ, plant-based café]
Restaurant vibe / target diner: [e.g., date night fine dining, casual family, quick-service lunch crowd]
City/region: [LOCATION — to reference local ingredients or culture where relevant]

Write descriptions for these 5 menu items: [LIST ITEM NAMES + KEY INGREDIENTS]

For each item, deliver:

ITEM NAME (keep as-is or suggest a rename if the current name is bland)

DESCRIPTION (45–65 words)
Must include ALL of these:
- One specific cooking technique (e.g., slow-braised, wood-fired, hand-rolled — not just "cooked")
- One ingredient origin or provenance detail (e.g., "San Marzano tomatoes," "locally sourced honey")
- One texture word (e.g., charred, silky, crisp, yielding)
- One aroma or flavor word (e.g., fragrant, tangy, smoky, bright)
- One emotional or experiential word (e.g., nostalgic, comforting, bold, refined)

DIETARY TAGS (from: V / VG / GF / DF / N / H — only list if applicable)

SUGGESTED PAIRING (one drink or side, 1 line)

BANNED WORDS: delicious, tasty, yummy, amazing, mouth-watering, flavorful. These are empty — every dish on every menu uses them. Use specific language that only describes THIS dish.

BONUS: Flag which item should carry a "Chef&apos;s Recommendation" badge and explain why in one sentence.',
 'Write menu descriptions that make customers order more. Uses sensory language, ingredient storytelling, and origin details to increase average order value.',
 'Restaurant',
 'Menu copywriting and food description',
 'Claude',
 ARRAY['restaurant', 'menu', 'food', 'hospitality'],
 true,
 'Intermediate',
 '1. List 5 menu items with key ingredients
2. Describe restaurant vibe and target diner
3. Add local region for ingredient sourcing
4. Paste into Claude
5. Update menu with descriptions',
 false,
 'AI Prompt for Restaurant Menu Descriptions — Sensory Copy That Sells',
 'Write menu descriptions that make customers order more. Uses sensory language, ingredient storytelling, and origin details to increase average order value.');

-- NICHE 13: Course Creation
INSERT INTO prompts (
  slug, title, prompt_text, description, category, use_case, ai_tool, tags,
  is_free, difficulty_level, instructions, featured,
  seo_title, seo_description
) VALUES
('online-course-outline',
 'Online Course Outline — Structured for Completion & Sales',
 'You are an instructional designer and course launch strategist. Your course structures achieve 70%+ completion rates because you design for motivation, not just content delivery.

Course topic: [TOPIC]
Target student: [WHO IS THIS FOR — be specific about their current situation and desired outcome]
Transformation promise: [Where are they NOW → Where will they be AFTER completing this course?]
Format: [VIDEO / TEXT / LIVE COHORT / SELF-PACED]
Estimated total course length: [e.g., 4 weeks, 6 hours of content, 10 modules]
Price point: [PRICE]

Build the complete course outline:

COURSE PROMISE (1 sentence)
Format: "In [time frame], you will [specific, measurable outcome] — even if [biggest obstacle students fear]."

MODULE BREAKDOWN
For each module (aim for 5–7):
- Module title (engaging, outcome-focused — not "Module 1: Introduction")
- Learning objective (what students can DO after this module)
- 3–4 lesson titles
- One hands-on deliverable or exercise per module (students learn by doing, not watching)
- Estimated time to complete

QUICK WIN DESIGN NOTE
Module 1 must deliver a tangible result within the first 30 minutes. Describe what that quick win is and why it matters for completion rates and refund reduction.

BONUS STRUCTURE (2 bonuses)
Each bonus: title + one sentence on why it adds value without overlapping the core content.

SALES PAGE ELEMENTS
- Course headline (transformation-focused, under 12 words)
- 3 bullet points for "Who this is for"
- 3 bullet points for "Who this is NOT for" (this increases buyer confidence and reduces refunds)
- Pricing psychology recommendation: should this be one-time, payment plan, or subscription? Justify briefly.',
 'Structure a profitable online course with this AI prompt. Includes module breakdown, learning outcomes, quick-win design, and launch page copy.',
 'Course Creation',
 'Online course design and structure',
 'ChatGPT',
 ARRAY['course-creation', 'education', 'online-learning', 'instructional-design'],
 true,
 'Advanced',
 '1. Define clear transformation promise
2. Be honest about target student situation
3. Choose format and length
4. Paste into ChatGPT
5. Use outline to build course in Teachable, Thinkific, etc.',
 true,
 'AI Prompt for Online Course Outlines — Built for Completion Rates and Revenue',
 'Structure a profitable online course with this AI prompt. Includes module breakdown, learning outcomes, quick-win design, and launch page copy.');

-- NICHE 14: Ad Copy
INSERT INTO prompts (
  slug, title, prompt_text, description, category, use_case, ai_tool, tags,
  is_free, difficulty_level, instructions, featured,
  seo_title, seo_description
) VALUES
('meta-ad-copy-generator',
 'Meta Ad Copy Generator — 5 Variants with Hook Testing',
 'You are a Meta Ads specialist. Your ad accounts consistently achieve CTRs 3× above industry average because you test multiple psychological hooks before scaling.

Product or service: [NAME + ONE-LINE DESCRIPTION]
Target audience: [Demographics + key interest or behavior signal — e.g., women 28–45 interested in home organization]
Ad objective: [AWARENESS / TRAFFIC / CONVERSIONS / LEAD GEN]
Primary keyword or USP: [WHAT MAKES THIS BETTER THAN THE ALTERNATIVE?]
Offer or promotion: [e.g., 20% off, free trial, free shipping, free guide]
Landing page destination: [URL or describe the page]

Write 5 ad variants. Each variant uses a DIFFERENT psychological hook:

VARIANT 1 — PROBLEM-FIRST
Lead with the pain. Make the reader feel seen before introducing the solution.

VARIANT 2 — SOCIAL PROOF-FIRST
Lead with a result others have achieved. Specific number or outcome required.

VARIANT 3 — CURIOSITY GAP
Lead with an incomplete thought or surprising claim that demands the next sentence.

VARIANT 4 — DIRECT BENEFIT
No story, no setup. Lead immediately with what the reader gets.

VARIANT 5 — OBJECTION REVERSAL
Lead with the most common reason someone would NOT buy — then flip it.

For each variant, provide:
- Primary text (under 125 words, conversational, one emoji max)
- Headline (under 40 characters — this appears below the image)
- CTA button recommendation (choose the most relevant: Shop Now / Learn More / Sign Up / Get Offer)
- Visual concept (describe the image or video in 2 sentences)

COMPLIANCE NOTES: Flag any claim that would require substantiation under Meta&apos;s advertising policies. Suggest an alternative phrasing for anything flagged.',
 'Write Facebook and Instagram ads that stop the scroll. Generates 5 tested variants using different psychological hooks, all with compliant CTAs.',
 'Advertising',
 'Facebook and Instagram ad copywriting',
 'ChatGPT',
 ARRAY['facebook-ads', 'instagram-ads', 'ad-copy', 'paid-media'],
 true,
 'Advanced',
 '1. Fill in product and audience details
2. Choose ad objective
3. Add offer/promotion
4. Paste into ChatGPT
5. Test all 5 variants in Ads Manager',
 true,
 'AI Prompt for Facebook & Instagram Ad Copy — 5 Variants, High CTR',
 'Write Facebook and Instagram ads that stop the scroll. Generates 5 tested variants using different psychological hooks, all with compliant CTAs.');

-- NICHE 15: Customer Support
INSERT INTO prompts (
  slug, title, prompt_text, description, category, use_case, ai_tool, tags,
  is_free, difficulty_level, instructions, featured,
  seo_title, seo_description
) VALUES
('customer-support-templates',
 'Customer Support Response Templates — Empathetic & Brand-Consistent',
 'You are a customer experience strategist. You design support responses that resolve issues on first contact 85% of the time while increasing post-resolution satisfaction scores.

Company type: [e.g., e-commerce store, SaaS platform, restaurant, service business]
Brand tone: [e.g., warm and friendly / professional and efficient / empathetic and thorough]
Industry-specific constraint: [e.g., HIPAA compliant, FCA regulated, standard e-commerce]

Create 6 support email templates for these situations:

TEMPLATE 1 — ORDER OR SERVICE DELAY
Situation: Customer contacts you about a delay they didn&apos;t expect.
Goal: Acknowledge without over-apologizing. Give a clear ETA. Offer something tangible.

TEMPLATE 2 — REFUND APPROVED
Situation: Refund request is valid and being processed.
Goal: Confirm clearly. Set expectation on timeline. Leave a positive final impression.

TEMPLATE 3 — REFUND DECLINED
Situation: Request falls outside refund policy.
Goal: Decline firmly but empathetically. Offer at least one alternative. Do not be defensive.

TEMPLATE 4 — TECHNICAL ISSUE (troubleshooting)
Situation: Customer reports a bug or feature not working.
Goal: Acknowledge. Give 3 clearly numbered steps. Set a follow-up expectation.

TEMPLATE 5 — ANGRY OR ESCALATING CUSTOMER
Situation: Customer is upset and using strong language.
Goal: De-escalate without being dismissive. Avoid scripted-sounding phrases.

TEMPLATE 6 — PROACTIVE OUTREACH (service disruption)
Situation: You need to contact customers BEFORE they contact you about an issue.
Goal: Lead with ownership. Give clear timeline. Offer compensation if applicable.

FOR EACH TEMPLATE:
- Subject line
- Body (150 words max — clear, scannable, one action per email)
- Personalization tokens to include: [CUSTOMER_NAME], [ORDER_NUMBER], [AGENT_NAME]
- ONE phrase to avoid (common support cliché that undermines trust) + suggested replacement

RULE: Never use "Unfortunately" to open a negative message. It signals bad news before explaining, which increases frustration.',
 'Handle any customer issue with AI-generated templates. Covers complaints, refunds, delays, and escalations — all with brand voice consistency.',
 'Customer Support',
 'Customer service and support responses',
 'Claude',
 ARRAY['customer-support', 'customer-service', 'email-templates', 'cx'],
 true,
 'Intermediate',
 '1. Define company type and brand tone
2. Add any industry-specific constraints
3. Paste into Claude
4. Customize templates with your details
5. Save to help desk knowledge base',
 false,
 'AI Prompt for Customer Support Templates — Professional, Empathetic, On-Brand',
 'Handle any customer issue with AI-generated templates. Covers complaints, refunds, delays, and escalations — all with brand voice consistency.');

-- ============================================================
-- ALL 15 PREMIUM PROMPTS COMPLETE!
-- ============================================================
