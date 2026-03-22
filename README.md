<div align="center">

```
$ ./tamajit --init
> Loading portfolio...
> Phase 1 complete.
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

## Overview

A futuristic, interactive developer portfolio that leads with a terminal animation, features a macOS-style magnification dock, easter eggs, and a hidden blog. Built to feel like a product, not a template.

---

## Pages

| Route | Description | Access |
|---|---|---|
| `/` | Home — terminal hero, stats, tools strip | Public |
| `/about` | Story, skills grid, certifications | Public |
| `/projects` | ForgeOS, PathPilot, Extracta — expandable deep dives | Public |
| `/contact` | Contact form + social links | Public |
| `/now` | What I'm doing right now | Hidden |
| `/blog` | Shayari, photography, thoughts | Hidden |

---

## Easter Eggs

Three ways to reach the hidden pages:

```
Type "unlock soul"     → navigates to /blog
Konami code            → ↑ ↑ ↓ ↓ ← → ← → B A → navigates to /now
Type "about"           → navigates to /about
Type "projects"        → navigates to /projects
Type "contact"         → navigates to /contact
```

All triggered by keyboard input anywhere on the page — no click required.

---

## Tech Stack

```
Framework   →  Next.js 14 (App Router)
Styling     →  Tailwind CSS 3.4
Animation   →  Framer Motion 11
Language    →  TypeScript 5
Fonts       →  Syne · DM Sans · JetBrains Mono (Google Fonts)
Deployment  →  Vercel (recommended)
```

No unnecessary libraries. No UI component kits. Everything custom.

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
│   ├── layout.tsx            # Root layout + SEO metadata
│   └── globals.css           # Design system + CSS variables
├── components/
│   ├── Dock.tsx              # macOS-style magnification dock
│   ├── TerminalHero.tsx      # Typewriter terminal sequence
│   ├── EasterEgg.tsx         # Konami + word trigger listener
│   ├── MagneticButton.tsx    # Magnetic hover button
│   ├── ToolsStrip.tsx        # Infinite scrolling tools strip
│   └── ScrollReveal.tsx      # Framer Motion scroll animations
├── lib/
│   └── utils.ts              # cn(), clamp(), lerp()
├── public/
│   └── assets/
│       ├── images/           # profile.jpg
│       ├── projects/         # forgeos.png, pathpilot.png, extracta.png
│       ├── blog/             # photo-1.jpg, photo-2.jpg, photo-3.jpg
│       └── resume/           # tamajit-modak-resume.pdf
├── tailwind.config.ts
├── next.config.js
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

The site gracefully falls back to placeholder UI if images are missing, so it works before you add them.

---

## Deployment

**Recommended: Vercel**

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com) — it auto-detects Next.js and deploys on every push to `main`.

---

## Design System

```
Background    #0a0a0f    near black
Surface       #111118    card backgrounds
Accent        #7c6af7    purple — buttons, active states
Terminal      #00ff88    neon green — terminal elements only
Primary text  #e4e4f0    off-white
Secondary     #5a5a7a    muted text, labels
```

Fonts: **Syne** (headings) · **DM Sans** (body) · **JetBrains Mono** (terminal, labels)

---

## Roadmap

- [x] Phase 1 — Core portfolio, macOS dock, terminal hero, easter eggs
- [ ] Phase 2 — Interactive terminal, project deep pages, real contact API
- [ ] Phase 2 — Page transitions, `/uses` page, cursor follower
- [ ] Phase 2 — MDX blog posts, dynamic OG images, analytics

---

## Author

**Tamajit Modak**
Year 1 BCA Honours · Parul University · Vadodara

> "A curious heart, a poetic mind, and a plate full of stories — that's how I build my world."

[GitHub](https://github.com/modak-tamajit) · [LinkedIn](https://linkedin.com/in/tamajit-modak-76938b169) · [Instagram](https://instagram.com/am_modak) · [Email](mailto:modaktamajit999@gmail.com)

---

<div align="center">
  <sub>Built with Next.js · Deployed on Vercel · Phase 1 of 2</sub>
</div>
