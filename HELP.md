# PORTFOLIO COMPONENT MAP
# ========================
# Quick reference for editing text, dates, and components.
# Every editable section is listed with its exact file + line area.
#
# Last updated: March 2026
# ─────────────────────────────────────────────────────────────────

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PAGE: HOME  →  app/page.tsx
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Stats strip (4 numbers under the hero)
  File:  app/page.tsx
  Look for:  const STATS = [
  Fields:    value (the number), label (text below it)
  Example:   { value: '~3,500', label: 'lines in ForgeOS' }

### Hero tagline
  File:  app/page.tsx
  Look for:  Built an OS before building my resumé.
  Change:    The <motion.p> line right below the name

### Sub-tagline (systems programmer · frontend...)
  File:  app/page.tsx
  Look for:  Systems programmer · Frontend engineer · Year 1 BCA

### Terminal welcome message
  File:  components/InteractiveTerminal.tsx
  Look for:  INITIAL_LINES
  Change:    The 'output' type lines at the top

### Terminal command: whoami response
  File:  components/InteractiveTerminal.tsx
  Look for:  const WHOAMI =
  Change:    The full string below it

### Terminal command: cat about.md response
  File:  components/InteractiveTerminal.tsx
  Look for:  if (arg === 'about.md')
  Change:    The content string in the push() call below it

### Terminal command: cat now.md response
  File:  components/InteractiveTerminal.tsx
  Look for:  if (arg === 'now.md')

### Tools scrolling strip (logos/names)
  File:  components/ToolsStrip.tsx
  Look for:  const TOOLS = [
  Change:    Add/remove tool names from the array

### Visitor stat counter
  File:  app/page.tsx
  Look for:  142 builders visited this week
  Change:    Update the number (mock for now, wire to Vercel Analytics API later)


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PAGE: ABOUT  →  app/about/page.tsx
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Learning timeline (years, titles, descriptions)
  File:  app/about/page.tsx
  Look for:  const TIMELINE = [
  Fields per entry:
    year   →  the year shown on the left  ← CHANGE THESE if wrong
    title  →  bold heading for that entry
    detail →  paragraph text
    tags   →  small tag pills shown below
    color  →  hex color for the dot and year label

  ⚠ KNOWN ISSUE: Check these years are correct for your story:
    '2013' → family computer (adjust if wrong)
    '2018' → HTML in school  (adjust if wrong)
    '2020' → Discovered C    (adjust if wrong)
    '2022' → Python + DB     (adjust if wrong)
    '2024' → ForgeOS         (adjust if wrong)
    '2025' → Swift/Extracta  (adjust if wrong)

### Story paragraphs (the long narrative text)
  File:  app/about/page.tsx
  Look for:  <article className="font-body ...">
  Change:    Each <p> block is one paragraph

### Quick facts sidebar (Location, Program, SGPA etc.)
  File:  app/about/page.tsx
  Look for:  { label: 'Location', value: 'Vadodara, Gujarat' }
  Change:    The value fields in the array below it

### Certifications list
  File:  app/about/page.tsx
  Look for:  const CERTS = [
  Change:    Add/remove strings from the array

### Profile image
  File:  public/assets/images/profile.jpg
  Action:    Replace this file with your actual photo (square crop)


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PAGE: PROJECTS  →  app/projects/page.tsx
##                    app/projects/[slug]/page.tsx
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Project cards on the listing page
  File:  app/projects/page.tsx
  Look for:  const PROJECTS = [
  Fields:    title, subtitle, status, color, year, stack, problem, built, decisions, impact

### Project deep-dive pages (ForgeOS / PathPilot / Extracta)
  File:  app/projects/[slug]/page.tsx
  Look for:  const PROJECTS = {  forgeos: { ... }, pathpilot: { ... }, extracta: { ... }
  Fields per project:
    title       →  project name
    subtitle    →  one-liner below title
    tagline     →  italic quote at top
    problem     →  "The Problem" section text
    built       →  "What I Built" section text
    decisions[] →  array of { title, detail } — technical decision cards
    lessons[]   →  array of strings — "What I learned" bullets
    impact      →  bottom impact box text
    codeSnippet →  the code shown in the terminal-style box
    architecture[] → array of { layer, desc } — architecture diagram rows
    github      →  GitHub URL for the button
    demo        →  live demo URL (set null if none)

### Project images
  Files:  public/assets/projects/forgeos.png
          public/assets/projects/pathpilot.png
          public/assets/projects/extracta.png
  Action: Replace with actual screenshots (16:9 ratio recommended)


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PAGE: CONTACT  →  app/contact/page.tsx
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Page headline + subtext
  File:  app/contact/page.tsx
  Look for:  Let&apos;s build
  Change:    The h1 and the <p> below it

### Social links (email, GitHub, LinkedIn, Instagram)
  File:  app/contact/page.tsx
  Look for:  const SOCIAL_LINKS = [
  Fields:    label, value (display text), href (URL), icon (symbol)

### Formspree endpoint
  File:  app/contact/page.tsx
  Look for:  const FORMSPREE_URL = 'https://formspree.io/f/XXXXXXXX'
  Action:    Replace XXXXXXXX with your real Formspree form ID
  Get ID at: https://formspree.io/new

### Availability badge text
  File:  app/contact/page.tsx
  Look for:  Open to internships & collaborations
  Change:    The text inside the tgreen badge


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PAGE: NOW  →  app/now/page.tsx
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### All "now" sections (Building, Learning, Reading...)
  File:  app/now/page.tsx
  Look for:  const SECTIONS = [
  Fields:    label, icon, color, content (the paragraph text)
  Change:    Update content strings to reflect what you're doing now

### Last updated date
  File:  app/now/page.tsx
  Look for:  Last updated: March 2026


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PAGE: BLOG  →  app/blog/page.tsx
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Shayari entries
  File:  app/blog/page.tsx
  Look for:  const SHAYARI = [
  Fields:    urdu (the Hindi/Urdu text), tr (English translation), note (small italic note)

### Photography captions + notes
  File:  app/blog/page.tsx
  Look for:  const PHOTOS = [
  Fields:    caption, note, src (image path), accent (hex color)

### Photo images
  Files:  public/assets/blog/photo-1.jpg
          public/assets/blog/photo-2.jpg
          public/assets/blog/photo-3.jpg
  Action: Replace with your actual photos

### Thought/essay entries
  File:  app/blog/page.tsx
  Look for:  title: 'On building things that don\'t exist yet'
  Change:    Edit the title, date, and content fields in the array


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PAGE: USES  →  app/uses/page.tsx
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### All equipment / tool sections
  File:  app/uses/page.tsx
  Look for:  const USES = [
  Fields per section:  category, color, icon, items[]
  Fields per item:     name, detail
  Change:    Update any item name or detail text freely


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PAGE: DASHBOARD  →  app/dashboard/page.tsx (private)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Password
  File:  app/dashboard/page.tsx
  Look for:  const DASHBOARD_PASSWORD = 'tamajit2026'
  Change:    The password string

### Mock stats data
  File:  app/dashboard/page.tsx
  Look for:  const STATS = [
  Change:    Update values to real analytics data later

### UTM links
  File:  app/dashboard/page.tsx
  Look for:  UTM Links
  Note:      Reference for /hire?utm_source=... tracking URLs


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PAGE: HIRE  →  app/hire/page.tsx
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Purpose
  Captures UTM parameters from incoming URLs and redirects to /contact.
  Usage: /hire?utm_source=linkedin&utm_medium=social


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## COMPONENT: DOCK (bottom navbar)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  File:  components/Dock.tsx
  Look for:  const NAV_ITEMS = [
  Change:    Add/remove nav items, change labels or hrefs
  Note:      Icons are inline SVGs — edit the SVG paths to change them
  Mobile:    Magnification disabled on touch devices, shows compact nav


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## COMPONENT: EASTER EGGS
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  File:  components/EasterEgg.tsx
  Look for:  const WORD_TRIGGERS = {
  Current triggers:
    'about'       → /about
    'projects'    → /projects
    'contact'     → /contact
    'now'         → /now
    'uses'        → /uses
    'unlock soul' → /blog
  Konami:  ↑↑↓↓←→←→BA  → /now
  Change:  Add new word: path pairs to the object

### Idle Mode
  File:  components/IdleOverlay.tsx
  Trigger:  25 seconds of inactivity
  Behavior: Dim overlay + "Still there… or just observing?"
  Hook:     hooks/useIdleDetector.ts (reusable, configurable timeout)

### Rage Click Detection
  File:  components/RageClickFeedback.tsx
  Trigger:  5+ rapid clicks anywhere on the page
  Behavior: Playful shake message (random from array)
  Hook:     hooks/useRageClick.ts (reusable, configurable threshold)

### Developer Mode
  File:  components/DevOverlay.tsx
  Trigger:  Type "/dev" anywhere
  Behavior: Overlay with tech stack, system info, debug lines
  Hook:     hooks/useKeySequence.ts (reusable, generic word detection)

### Night Mode
  File:  components/NightMode.tsx
  Trigger:  Auto (22:00–05:00) or type "night"
  Behavior: Softer dark theme + "Late night builder, huh?" toast

### Konami Code Enhancement
  File:  app/now/page.tsx
  Trigger:  Navigate to /now via Konami code (↑↑↓↓←→←→BA)
  Behavior: Retro mode — scanlines, CRT vignette, boot log, 3 exclusive hidden sections
  Normal:   /now without Konami shows clean page

### Console Secret
  File:  components/ConsoleSecret.tsx
  Trigger:  Open browser DevTools console
  Behavior: Styled greeting + global unlock("truth") function
  Secret:   Reveals a personal message from Tamajit

### Fake Bug (Controlled Glitch)
  File:  components/FakeBug.tsx
  Trigger:  ~1.5% chance per page load, 8–20s delay
  Behavior: Brief visual glitch (scanlines + color shift), auto-fixes in 1.5s
  Message:  "Relax. I break things on purpose."

### Time-Based Personality
  File:  components/TimePersonality.tsx
  Trigger:  Automatic, once per session
  Behavior: Greeting toast based on local time
  Messages: Morning → "Starting fresh" / Afternoon → "Building in progress" / Night → "Real devs"

### Copy Interaction
  File:  components/CopyToast.tsx
  Trigger:  User copies any text from the site
  Behavior: Toast — "Taking inspiration? I respect that."

### Scroll Depth Reward
  File:  components/ScrollReward.tsx
  Trigger:  Scrolling 90%+ of any page (once per session)
  Behavior: Reward message + random programming quote

### Smart Wrong Command
  File:  components/InteractiveTerminal.tsx
  Trigger:  Invalid command in terminal
  Behavior: "command not found... But curiosity found 👀"

### Easter Egg Hint Lines
  File:  components/HintLine.tsx
  Usage: Added on every page as subtle clues
  Config: text prop (the hint), opacity prop (default 0.3)


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## GLOBAL: DESIGN TOKENS & COLORS
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  File:  tailwind.config.ts
  Look for:  colors: {
  Tokens:
    bg           #0a0a0f   →  page background
    surface      #111118   →  card background
    surface-2    #16161f   →  hover state background
    surface-3    #1c1c28   →  deepest card layer
    border       #1e1e2e   →  default border
    border-bright #2e2e42  →  hover border
    primary      #e4e4f0   →  main text
    secondary    #5a5a7a   →  muted text / labels
    accent       #7c6af7   →  purple — buttons, active
    accent-light #a899ff   →  lighter purple — hover
    tgreen       #00ff88   →  neon green — terminal only
    warm         #f7a06a   →  warm orange — Extracta / blog


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## GLOBAL: FONTS
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  File:  app/layout.tsx
  Look for:  fonts.googleapis.com/css2?family=
  Current:
    Syne          →  headings  (font-display class)
    DM Sans       →  body text (font-body class)
    JetBrains Mono→  terminal / labels (font-mono class)
  To change a font: swap the family name in the Google Fonts URL


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## GLOBAL: SEO METADATA
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  File:  app/layout.tsx
  Look for:  export const metadata: Metadata = {
  Fields:    title, description, keywords[], openGraph{}, twitter{}
  Per-page:  Each app/[page]/layout.tsx has its own metadata export
  SEO files: app/sitemap.ts, app/robots.ts
  OG images: app/opengraph-image.tsx, app/about/opengraph-image.tsx, app/projects/opengraph-image.tsx
  Structured data: JSON-LD Person schema in layout.tsx <head>


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## GLOBAL: ANALYTICS & TRACKING
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Vercel Analytics:  <Analytics /> in app/layout.tsx
  Package:           @vercel/analytics
  Dashboard:         /dashboard (password-protected, mock data)
  UTM tracking:      /hire?utm_source=... → redirects to /contact


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## GLOBAL: SECURITY & DEPLOYMENT
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  File:  vercel.json
  HSTS:  Strict-Transport-Security with 2-year max-age, preload
  Also:  X-Content-Type-Options, X-Frame-Options, Referrer-Policy
  Note:  Vercel auto-handles HTTP → HTTPS redirect


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## REUSABLE HOOKS
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  hooks/useIdleDetector.ts   — tracks inactivity, fires onIdle/onActive
  hooks/useRageClick.ts      — detects rapid clicks, returns isRaging
  hooks/useKeySequence.ts    — detects typed words, fires callbacks


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ASSETS — WHERE TO PUT YOUR FILES
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  public/assets/images/profile.jpg              ← your profile photo
  public/assets/projects/forgeos.png            ← ForgeOS screenshot
  public/assets/projects/pathpilot.png          ← PathPilot screenshot
  public/assets/projects/extracta.png           ← Extracta screenshot
  public/assets/blog/photo-1.jpg                ← blog photo 1
  public/assets/blog/photo-2.jpg                ← blog photo 2
  public/assets/blog/photo-3.jpg                ← blog photo 3
  public/assets/resume/tamajit-modak-resume.pdf ← your resume


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## QUICK EDIT CHEATSHEET
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Fix a wrong year in timeline  →  app/about/page.tsx  →  TIMELINE array
  Change a stat number          →  app/page.tsx         →  STATS array
  Update "what I'm doing now"   →  app/now/page.tsx     →  SECTIONS array
  Add a new shayari             →  app/blog/page.tsx    →  SHAYARI array
  Add a new tool to the strip   →  components/ToolsStrip.tsx → TOOLS array
  Change nav items              →  components/Dock.tsx  →  NAV_ITEMS array
  Add an easter egg trigger     →  components/EasterEgg.tsx → WORD_TRIGGERS
  Change accent color globally  →  tailwind.config.ts   →  accent: '#7c6af7'
  Change dashboard password     →  app/dashboard/page.tsx → DASHBOARD_PASSWORD
  Change idle timeout           →  components/IdleOverlay.tsx → timeout: 25000
