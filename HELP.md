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
## COMPONENT: DOCK (bottom navbar)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  File:  components/Dock.tsx
  Look for:  const NAV_ITEMS = [
  Change:    Add/remove nav items, change labels or hrefs
  Note:      Icons are inline SVGs — edit the SVG paths to change them


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
