# PORTFOLIO ROADMAP — TAMAJIT MODAK
# ====================================
# Full 10-phase build plan from MVP to GOAT-level
# Free backends only. All phases deployable on Vercel.
#
# Status key:
#   ✅  Complete + deployed
#   🔄  Built locally, committing soon
#   📋  Planned
# ─────────────────────────────────────────────────────

## ✅ PHASE 1 — Core Portfolio
   Status:   DEPLOYED on Vercel
   Branch:   main

   What was built:
   - macOS-style floating dock with magnification
   - Terminal hero animation (typewriter sequence)
   - Home page with stats strip + tools scroll
   - About page with story + skills + certifications
   - Projects page with expandable accordion cards
   - Contact page with social links
   - /now hidden page
   - /blog hidden page (shayari, photos, thoughts)
   - Easter egg system (word triggers + Konami code)
   - Framer Motion scroll reveal animations
   - Glassmorphism design system
   - Full SEO metadata + OG tags

   Files added:
   - app/page.tsx
   - app/about/page.tsx
   - app/projects/page.tsx
   - app/contact/page.tsx
   - app/now/page.tsx
   - app/blog/page.tsx
   - app/layout.tsx
   - app/globals.css
   - components/Dock.tsx
   - components/TerminalHero.tsx
   - components/EasterEgg.tsx
   - components/MagneticButton.tsx
   - components/ToolsStrip.tsx
   - components/ScrollReveal.tsx
   - tailwind.config.ts


## 🔄 PHASE 2 — Interactivity & Polish
   Status:   Built locally · Commit tomorrow

   What was built:
   - InteractiveTerminal — live shell you can type into
     Commands: help, ls, ls projects, cat about.md, cat now.md,
               open forgeos/pathpilot/extracta, open github/linkedin,
               clear, whoami, pwd, date, echo, tab completion
   - Home page updated — terminal-first, then hero reveal
   - Project deep-dive pages — /projects/[slug]
     (ForgeOS, PathPilot, Extracta each have full pages with:
      architecture diagram, code snippet, decisions, lessons, impact)
   - Contact form wired to Formspree (real email delivery)
     ⚠ Replace XXXXXXXX in app/contact/page.tsx with your form ID
     Get it at: https://formspree.io/new
   - PageTransition component — smooth fade between routes
   - CursorFollower — glow + dot that follows mouse (desktop only)
   - /uses page — hardware, dev tools, extensions, terminal setup
   - About page — learning timeline replacing skills tag grid
   - EasterEgg updated — added 'uses' word trigger

   Files added/changed:
   - components/InteractiveTerminal.tsx   (NEW)
   - components/PageTransition.tsx        (NEW)
   - components/CursorFollower.tsx        (NEW)
   - components/EasterEgg.tsx             (UPDATED)
   - app/page.tsx                         (UPDATED)
   - app/contact/page.tsx                 (UPDATED — real Formspree)
   - app/about/page.tsx                   (UPDATED — timeline)
   - app/layout.tsx                       (UPDATED — transitions + cursor)
   - app/projects/[slug]/page.tsx         (NEW)
   - app/projects/[slug]/layout.tsx       (NEW)
   - app/uses/page.tsx                    (NEW)
   - app/uses/layout.tsx                  (NEW)
   - HELP.md                              (NEW — component map)
   - ROADMAP.md                           (NEW — this file)

   Commit message:
   feat: phase 2 — interactive terminal, project deep pages,
   page transitions, cursor follower, /uses, Formspree contact


## 📋 PHASE 3 — Content & Credibility
   Priority:  🔴 HIGH — do this before sharing the link widely
   Effort:    ~3 hours

   Tasks:
   ─ Drop real assets into public/assets/:
       profile.jpg           (square, min 600×600px)
       projects/forgeos.png  (screenshot or mockup, 16:9)
       projects/pathpilot.png
       projects/extracta.png
       blog/photo-1.jpg      (your photography)
       blog/photo-2.jpg
       blog/photo-3.jpg
       resume/tamajit-modak-resume.pdf

   ─ Fix timeline years in app/about/page.tsx → TIMELINE array
     (see HELP.md → PAGE: ABOUT for exact location)

   ─ Update app/now/page.tsx with current real info
     (what you're building, reading, listening to right now)

   ─ Write 2–3 real blog entries in app/blog/page.tsx
     Suggested topics:
       "How I built ForgeOS" (this will get shared)
       "What Year 1 of BCA actually looks like"
       One shayari you actually wrote

   ─ Verify all social links and email are correct

   Commit message:
   content: phase 3 — real assets, timeline fixes, blog entries


## 📋 PHASE 4 — Easter Egg Hints + SEO
   Priority:  🔴 HIGH
   Effort:    ~4 hours

   Part A — Easter Egg Hints System
   ─────────────────────────────────
   Add subtle, mysterious hints across pages so viewers
   discover easter eggs on their own. Never reveal everything
   at once — the mystery is the point.

   Home page hint:
     A faint line at the bottom of the hero:
     "This portfolio has secrets. Some are hidden in plain sight."
     Shown with low opacity, no further detail.

   About page hint:
     Inside the story text, add a line that reads:
     "I leave breadcrumbs in my work. Always have."
     (subtle nod, not explicit)

   Projects page hint:
     A small line under the ForgeOS card:
     "If you know the sequence, you know where this goes."
     (hints at Konami without naming it)

   Contact page hint:
     After the social links, a tiny line:
     "↑↑↓↓ — if that means anything to you, try it."
     (clear enough for gamers, mysterious to everyone else)

   /now page hint (discovered after digging):
     "There's one more room. You haven't found it yet."
     (hints at /blog without naming it)

   Blog page (once found):
     A congratulations message at the top:
     "You found the soul of this portfolio."

   Implementation:
     Add a <HintLine> component — takes text + opacity
     Used inline in each page, styled as font-mono text-[10px]
     text-secondary/30, barely visible unless you're looking

   Part B — SEO
   ─────────────
   ─ Add app/sitemap.ts — auto-generates sitemap.xml
   ─ Add app/robots.ts  — robots.txt with correct rules
   ─ Add JSON-LD structured data in layout.tsx
     (Person schema: name, url, jobTitle, sameAs links)
   ─ Dynamic OG images:
       app/opengraph-image.tsx        (home)
       app/about/opengraph-image.tsx
       app/projects/opengraph-image.tsx
   ─ Add <link rel="canonical"> per page

   Commit message:
   feat: phase 4 — easter egg hints system + SEO (sitemap, OG images, JSON-LD)


## 📋 PHASE 5 — Analytics & Dashboard
   Priority:  🟡 MEDIUM
   Effort:    ~3 hours
   Backend:   Vercel Analytics (free) + Umami (free self-host optional)

   Tasks:
   ─ Enable Vercel Analytics:
       npm install @vercel/analytics
       Add <Analytics /> to app/layout.tsx
       Free, zero config, GDPR-compliant

   ─ Add a private /dashboard page:
       Shows: total visitors, top pages, top referrers
       Powered by Vercel Analytics API
       Protected by a simple password or hidden URL
       This page itself is a talking point in interviews

   ─ Add UTM parameter support:
       /hire?utm_source=linkedin
       /hire?utm_source=cold-email
       Track which outreach channel converts

   ─ Add "last visited" stat to homepage (fun, optional):
       "X developers visited this week"
       Pulled from Vercel Analytics API

   Commit message:
   feat: phase 5 — analytics, private dashboard, UTM tracking


## 📋 PHASE 6 — AI Chatbot (Google AI Studio · Free)
   Priority:  🔴 HIGH — most impressive single feature
   Effort:    ~5 hours
   Backend:   Google AI Studio (Gemini Flash) — FREE 1500 req/day
              Next.js API route on Vercel — FREE
              Upstash Redis rate limiting — FREE 10k req/day

   What it is:
   A "Talk to Tamajit" floating chatbot in the bottom-right corner.
   The bot is fed a system prompt that IS you — your projects, your
   story, your voice, your answers to recruiter questions.
   It answers as if it's you, not as a generic AI.

   Setup steps:
   1. Get free API key: https://aistudio.google.com/apikey
   2. Add to .env.local:  GEMINI_API_KEY=your_key_here
   3. Get Upstash Redis:  https://upstash.com (free tier)
      Add: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN

   Files to create:
   - app/api/chat/route.ts          (Gemini API + rate limiting)
   - components/ChatBot.tsx         (floating UI widget)
   - lib/chatbot-prompt.ts          (your personal system prompt)

   System prompt covers:
   - Who you are, your background, personality
   - ForgeOS, PathPilot, Extracta details
   - Your skills, certifications, SGPA
   - How to contact you, what you're looking for
   - Fun facts (Bengali, shayari, guitar, chai)
   - Deflect questions it shouldn't answer

   UI:
   - Small floating button bottom-right (not bottom-center — dock is there)
   - Opens into a compact chat window
   - "Ask me anything" placeholder
   - Suggested starter questions: "What did you build?",
     "Are you available for internships?", "Tell me about ForgeOS"
   - Typing indicator while Gemini responds
   - Remembers conversation within session

   Rate limiting:
   - 10 messages per IP per hour via Upstash Redis
   - Prevents API key abuse
   - Graceful error: "Come back in a bit — or just email me."

   Commit message:
   feat: phase 6 — AI chatbot powered by Gemini Flash (free tier)


## 📋 PHASE 7 — Performance & PWA
   Priority:  🟡 MEDIUM
   Effort:    ~4 hours

   Tasks:
   ─ Replace all <img> tags with next/image for optimization
   ─ Add loading="lazy" and blur placeholders
   ─ Run Lighthouse audit, fix issues until score is 90+
   ─ Add PWA support:
       public/manifest.json          (app name, icons, theme)
       public/sw.js                  (service worker)
       Add <link rel="manifest"> in layout.tsx
   ─ Add install prompt component:
       Shows "Add to home screen" after 30s on mobile
       Dismissable, never shown again after dismiss
   ─ Subset fonts — only load weights actually used

   Commit message:
   perf: phase 7 — next/image, PWA manifest, Lighthouse 90+


## 📋 PHASE 8 — Micro-interactions & Polish
   Priority:  🟡 MEDIUM — the "designers stop and stare" phase
   Effort:    ~6 hours

   Tasks:
   ─ Scroll-linked parallax on hero name (subtle Y offset)
   ─ Force-graph skills visualization on About page
     (nodes connected by category, animates on scroll)
   ─ Sound design (optional, off by default):
       Subtle keyboard typing on terminal input
       Soft click on dock icons
       Toggle in settings
   ─ Confetti burst on contact form submit
   ─ GitHub activity heatmap on About page
     (live data from GitHub API, no auth needed for public repos)
   ─ Spotify "now playing" widget in footer
     (Spotify free API — shows what you're listening to)
   ─ Last GitHub commit line in footer:
     "Last commit: [message] · [time ago]"
     Pulled from GitHub API

   Extra pages:
   ─ /resume  — full resume as a designed webpage
                Print-to-PDF button included
                Cleaner for recruiters than a PDF download
   ─ /stack   — visual diagram of every tech you've used
                Grouped by category
                One-line opinion on each tool
   ─ /hire    — focused page for recruiters
                Availability status, what you want,
                stipend range, direct contact
                URL to share on LinkedIn specifically

   Commit message:
   feat: phase 8 — micro-interactions, GitHub stats, Spotify widget,
   /resume, /stack, /hire pages


## 📋 PHASE 9 — ForgeOS Live Demo (WebAssembly)
   Priority:  🟢 AMBITIOUS — the legendary feature
   Effort:    ~2 days
   Prerequisite: ForgeOS source code is clean and buildable

   What it is:
   Compile ForgeOS to WebAssembly using Emscripten.
   Embed a real running terminal in /projects/forgeos.
   Recruiters can type actual commands in the OS you built,
   inside the browser, with no install.

   Steps:
   1. Install Emscripten SDK
   2. Compile ForgeOS: emcc forgeos.c -o forgeos.js
      with -s WASM=1 and appropriate flags
   3. Create a <ForgeOSEmbed> React component
      wrapping the Emscripten output
   4. Embed in /projects/forgeos page
      below the architecture section
   5. Add fallback for browsers that don't support WASM

   This will:
   - Get posted on Hacker News / Reddit organically
   - Be the single most impressive portfolio feature
     any recruiter has ever seen from a Year 1 student
   - Make every other portfolio look like a template

   Commit message:
   feat: phase 9 — ForgeOS compiled to WebAssembly, live demo in browser


## 📋 PHASE 10 — Versioning & Time Capsule
   Priority:  🟢 LONG-TERM — do after Phase 9
   Effort:    ~3 hours

   Tasks:
   ─ /v1 route:
       Preserve the Phase 1 portfolio exactly as it was
       Linked from footer: "See where this started →"
   ─ /changelog page:
       Every phase documented with date, what changed, why
       Written in your voice, not a dry list
       Shows growth over time — that's the real portfolio
   ─ "Last updated" on homepage with relative time
   ─ Build-in-public thread:
       Twitter/LinkedIn thread documenting all 10 phases
       "I built my portfolio in 10 phases, here's each one"
       Links to the live site at each phase
       This thread will outperform the portfolio itself for traffic
   ─ Testimonials section on About page:
       1–2 quotes from professors, hackathon judges, collaborators
       Even one real quote adds massive social proof

   Commit message:
   feat: phase 10 — changelog, /v1 archive, build-in-public


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TECH STACK SUMMARY
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   Framework    Next.js 14+ (App Router)
   Styling      Tailwind CSS
   Animation    Framer Motion
   Language     TypeScript
   Fonts        Syne · DM Sans · JetBrains Mono
   Hosting      Vercel (free tier)
   Forms        Formspree (free tier)
   Analytics    Vercel Analytics (free)
   AI Chatbot   Google AI Studio — Gemini Flash (free · 1500 req/day)
   Rate Limit   Upstash Redis (free · 10k req/day)
   Repo         github.com/modak-tamajit/Portfolio


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## RECOMMENDED BUILD ORDER
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   Today         →  Commit Phase 2, deploy
   This week     →  Phase 3 (real content — biggest ROI)
   Next week     →  Phase 4 (hints + SEO — discoverability)
   Week after    →  Phase 6 (AI chatbot — most impressive)
   Month 2       →  Phase 5 + 7 (analytics + performance)
   Month 2-3     →  Phase 8 (polish layer)
   When ready    →  Phase 9 (ForgeOS WASM — the legendary one)
   Ongoing       →  Phase 10 (versioning + build in public)


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## UI/UX UPGRADE SUGGESTIONS
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   These can be added to any phase or as quick wins anytime:

   QUICK WINS (under 1 hour each):
   ─ Add reading time estimate on blog posts
   ─ Add "copy code" button on all code snippets
   ─ Add smooth scroll-to-top button (appears after scrolling 400px)
   ─ Add keyboard shortcut overlay: press ? to show all shortcuts
   ─ Add focus mode: press F to hide dock + distractions
   ─ Improve mobile dock: reduce gap, ensure thumb reach

   MEDIUM EFFORT (2–4 hours):
   ─ Project card hover: subtle 3D tilt effect (perspective transform)
   ─ About page: photo with a subtle noise/grain overlay for texture
   ─ Home page: name text with a very subtle scanline effect
   ─ Add a "theme" toggle — not light/dark, but accent color switcher
     (Purple / Green / Orange — changes accent across the whole site)
   ─ Terminal: add syntax highlighting for code output
   ─ Add page progress bar at top (thin line showing scroll %)

   LARGER UPGRADES (Phase 8 territory):
   ─ Force-graph skills visualization (D3.js)
   ─ GitHub contribution heatmap (live API data)
   ─ Spotify now playing in footer
   ─ Sound design layer (opt-in, off by default)
   ─ Scroll-linked hero parallax
   ─ 3D card flip on project cards (front: summary, back: stack)
