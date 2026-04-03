
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
