<div align="center">

```
$ ./tamajit --init
> Loading portfolio...
> Phase 6 complete.
[READY]
```

# Tamajit Modak — Portfolio

**Personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?style=flat-square&logo=framer)](https://www.framer.com/motion)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)

[Live Site](https://tamajit.dev) · [GitHub](https://github.com/modak-tamajit) · [LinkedIn](https://linkedin.com/in/tamajit-modak-76938b169)

</div>

---

## Features

A futuristic, interactive developer portfolio built to feel like a product — not a template.

- 🖥 **Terminal Hero** — typewriter animation → interactive shell with real commands
- 🎯 **macOS-style Dock** — magnification navbar with spring physics (touch-optimized)
- 📱 **Fully Responsive** — engineered for 320px+ with `clamp()` fonts, fluid layouts, and touch-safe interactions
- ✨ **Micro-interactions** — magnetic buttons, cursor follower, scroll reveals, page transitions
- 🔒 **Private Dashboard** — password-gated analytics view (mock data, ready for Vercel Analytics API)
- 📊 **Vercel Analytics** — built-in tracking, UTM support via `/hire?utm_source=...`
- 🔍 **SEO Optimized** — sitemap, robots.txt, JSON-LD, dynamic OG images, canonical URLs
- 🛡 **HTTPS Enforced** — HSTS, security headers, Vercel auto-redirect

---

## Pages

| Route | Description | Access |
|---|---|---|
| `/` | Home — terminal hero, stats, tools strip | Public |
| `/about` | Story, timeline, skills grid, certifications | Public |
| `/projects` | ForgeOS, PathPilot, Extracta — expandable deep dives | Public |
| `/contact` | Contact form + social links | Public |
| `/uses` | Hardware, software, terminal setup | Public |
| `/dashboard` | Private analytics dashboard | Password |
| `/hire` | UTM tracking redirect → /contact | Hidden |
| `/now` | What I'm doing right now | Easter Egg |
| `/blog` | Shayari, photography, thoughts | Easter Egg |

---

## Easter Eggs 🥚

This portfolio has **13 hidden interactions**. Some are triggered, some are earned, and some just… happen.

#### ⌨️ Keyboard Triggers
| What to do | Hint |
|---|---|
| Type `unlock soul` | Opens a door you didn't know existed |
| `↑↑↓↓←→←→BA` | The classic. You know what this is. |
| Type `/dev` | For those who read source code |
| Type `night` | Best tried after midnight |
| Type any page name | The site is always listening |

#### 🧠 Behavioral
| What to do | Hint |
|---|---|
| Stop moving for 25s | The site notices your absence |
| Click too many times | It has opinions about that |
| Scroll to the very bottom | A reward for the patient |
| Copy any text | It knows. |
| Type a wrong command | Curiosity is never punished here |

#### 🔧 Developer-Only
| What to do | Hint |
|---|---|
| Open the browser console | Someone left you a message |
| Run `unlock("truth")` in console | A personal note, if you're worthy |

#### 🌙 Ambient
| What to do | Hint |
|---|---|
| Visit at different times of day | The site has moods |
| Get lucky (~1% chance) | Not everything is deterministic |

> *"There are things that happen on their own — at certain times, at certain odds."*

---

## Tech Stack

```
Framework   →  Next.js 14 (App Router)
Styling     →  Tailwind CSS 3.4
Animation   →  Framer Motion 11
Language    →  TypeScript 5
Fonts       →  Syne · DM Sans · JetBrains Mono (Google Fonts)
Analytics   →  Vercel Analytics
Deployment  →  Vercel (HTTPS enforced)
```

No unnecessary libraries. No UI component kits. Everything custom.

---

## Developer Features

Type `/dev` anywhere to open the developer overlay:

- Full tech stack breakdown
- System status and debug info
- Easter egg count and state
- Build metadata

Three reusable hooks power the easter egg system:

```
hooks/useIdleDetector.ts   — configurable inactivity detection
hooks/useRageClick.ts      — rapid click pattern recognition
hooks/useKeySequence.ts    — keyboard word trigger engine
```

---

## Project Structure

```
tamajit-portfolio/
├── app/
│   ├── page.tsx              # Home — terminal hero + stats
│   ├── about/page.tsx        # About — story + skills
│   ├── projects/page.tsx     # Projects — expandable cards
│   ├── contact/page.tsx      # Contact — form + social links
│   ├── now/page.tsx          # /now page (hidden)
│   ├── blog/page.tsx         # Blog — shayari + photos (hidden)
│   ├── dashboard/page.tsx    # Private analytics dashboard
│   ├── hire/page.tsx         # UTM tracking redirect
│   ├── sitemap.ts            # Auto-generated sitemap
│   ├── robots.ts             # Crawler rules
│   ├── layout.tsx            # Root layout + SEO + components
│   └── globals.css           # Design system + responsive base
├── components/
│   ├── Dock.tsx              # macOS dock (touch-optimized)
│   ├── TerminalHero.tsx      # Typewriter terminal sequence
│   ├── InteractiveTerminal.tsx # Full interactive shell
│   ├── EasterEgg.tsx         # Konami + word trigger listener
│   ├── IdleOverlay.tsx       # 25s idle mode
│   ├── RageClickFeedback.tsx # Rage click detection
│   ├── DevOverlay.tsx        # /dev developer mode
│   ├── NightMode.tsx         # Late-night personality
│   ├── HintLine.tsx          # Subtle hint text
│   ├── MagneticButton.tsx    # Magnetic hover button
│   ├── ToolsStrip.tsx        # Infinite scrolling tools
│   ├── ScrollReveal.tsx      # Scroll animations
│   ├── CursorFollower.tsx    # Custom cursor (desktop)
│   └── PageTransition.tsx    # Page transitions
├── hooks/
│   ├── useIdleDetector.ts    # Idle tracking hook
│   ├── useRageClick.ts       # Rage click hook
│   └── useKeySequence.ts     # Key sequence hook
├── lib/
│   └── utils.ts              # cn(), clamp(), lerp()
├── public/assets/
├── vercel.json               # HSTS + security headers
├── tailwind.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/modak-tamajit/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm run start
```

---

## Assets Setup

After cloning, drop your real files into `public/assets/`:

```
public/assets/images/profile.jpg                  ← your profile photo (square)
public/assets/projects/forgeos.png                ← ForgeOS screenshot (16:9)
public/assets/projects/pathpilot.png              ← PathPilot screenshot (16:9)
public/assets/projects/extracta.png               ← Extracta screenshot (16:9)
public/assets/blog/photo-1.jpg                    ← photography #1
public/assets/blog/photo-2.jpg                    ← photography #2
public/assets/blog/photo-3.jpg                    ← photography #3
public/assets/resume/tamajit-modak-resume.pdf     ← your latest resume
```

The site gracefully falls back to placeholder UI if images are missing.

---

## Deployment

**Recommended: Vercel**

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) — it auto-detects Next.js and deploys on every push to `main`.

### HTTPS

- Vercel enforces HTTPS and auto-redirects HTTP → HTTPS
- `vercel.json` adds HSTS headers (2-year max-age, preload)
- All external URLs in the codebase use `https://`
- Security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`

---

## Design System

```
Background    #0a0a0f    near black
Surface       #111118    card backgrounds
Accent        #7c6af7    purple — buttons, active states
Terminal      #00ff88    neon green — terminal elements only
Primary text  #e4e4f0    off-white
Secondary     #5a5a7a    muted text, labels
Warm          #f7a06a    warm orange — accents
```

Fonts: **Syne** (headings) · **DM Sans** (body) · **JetBrains Mono** (terminal, labels)

---

## Notes

- See `HELP.md` for a full component map and editing guide
- See `ROADMAP.md` for upcoming features
- The dashboard uses mock data — connect Vercel Analytics API (Pro plan) for real numbers
- Easter eggs are modular — add new ones by creating a component + hook

---

## Author

**Tamajit Modak**
Year 1 BCA Honours · Parul University · Vadodara

> "A curious heart, a poetic mind, and a plate full of stories — that's how I build my world."

[GitHub](https://github.com/modak-tamajit) · [LinkedIn](https://linkedin.com/in/tamajit-modak-76938b169) · [Instagram](https://instagram.com/am_modak) · [Email](mailto:modaktamajit999@gmail.com)

---

<div align="center">
  <sub>Built with Next.js · Deployed on Vercel · Phase 6</sub>
</div>
