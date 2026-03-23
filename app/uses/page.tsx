'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const USES = [
  {
    category: 'Hardware',
    color: '#7c6af7',
    icon: '⊞',
    items: [
      { name: 'ASUS TUF Gaming A15',    detail: 'AMD Ryzen 7, 16GB RAM, RTX 3050 — the daily driver for everything' },
      { name: 'External 24" Monitor',   detail: '1080p, enough real estate to have code + docs + terminal side by side' },
      { name: 'Mechanical Keyboard',    detail: 'Tactile switches. The click matters when you type for 6 hours.' },
      { name: 'SHOP 24 CARE XXXL Bean Bag', detail: 'Where the real thinking happens. Not a joke.' },
    ],
  },
  {
    category: 'Development',
    color: '#00ff88',
    icon: '⌨',
    items: [
      { name: 'VS Code',         detail: 'Primary editor. Fast, extensible, and I know every shortcut by heart.' },
      { name: 'Xcode',           detail: 'For all Swift and SwiftUI work. Extracta lives here.' },
      { name: 'Windows Terminal',detail: 'With PowerShell 7 + custom prompt. Tabs save sanity.' },
      { name: 'Git + GitHub',    detail: 'Version control for everything. Even my notes.' },
      { name: 'GCC + Make',      detail: 'ForgeOS was built with these. Still trust them for C projects.' },
    ],
  },
  {
    category: 'VS Code Extensions',
    color: '#a899ff',
    icon: '⊡',
    items: [
      { name: 'Prettier',             detail: 'Auto-format on save. Non-negotiable.' },
      { name: 'ESLint',               detail: 'Catches the dumb mistakes before they become commits.' },
      { name: 'GitLens',              detail: 'Inline blame + history. Essential for understanding code you wrote 3 months ago.' },
      { name: 'Tailwind CSS IntelliSense', detail: 'Class autocomplete for Tailwind. Saves 20 minutes every session.' },
      { name: 'Error Lens',           detail: 'Inline error display. Faster feedback loop than the problems panel.' },
      { name: 'One Dark Pro',         detail: 'Theme. Clean, low-contrast, easy on the eyes at 2 AM.' },
    ],
  },
  {
    category: 'Apps & Productivity',
    color: '#f7a06a',
    icon: '◈',
    items: [
      { name: 'Notion',      detail: 'Everything: notes, project tracking, reading list, roadmap.' },
      { name: 'Figma',       detail: 'For UI mockups before touching code. Saves hours of layout rework.' },
      { name: 'Postman',     detail: 'API testing. Used heavily during PathPilot development.' },
      { name: 'TablePlus',   detail: 'GUI for PostgreSQL. Much friendlier than psql for data exploration.' },
      { name: 'Obsidian',    detail: 'Second brain for longer-form notes and linked ideas.' },
    ],
  },
  {
    category: 'Terminal Setup',
    color: '#00ff88',
    icon: '❯',
    items: [
      { name: 'PowerShell 7',   detail: 'Primary shell on Windows. Faster and cleaner than cmd.' },
      { name: 'Oh My Posh',     detail: 'Custom prompt with git branch, time, and exit code indicators.' },
      { name: 'WSL2 (Ubuntu)',  detail: 'Linux subsystem for anything that needs a real POSIX environment.' },
      { name: 'zsh + Oh My Zsh',detail: 'Inside WSL. autosuggestions + syntax highlighting always on.' },
    ],
  },
  {
    category: 'Learning & Research',
    color: '#7c6af7',
    icon: '◎',
    items: [
      { name: 'Coursera / Oracle Academy', detail: 'Formal certification path alongside self-study.' },
      { name: 'MDN Web Docs',              detail: 'First stop for anything browser/web related.' },
      { name: 'CS:APP (Bryant & O\'Hallaron)', detail: 'Computer Systems: A Programmer\'s Perspective. The systems bible.' },
      { name: 'Swift by Sundell',          detail: 'Best Swift blog. Practical, opinionated, well-written.' },
      { name: 'YouTube (low-level stuff)', detail: 'Low Level Learning, Jacob Sorber — for the systems deep dives.' },
    ],
  },
];

export default function UsesPage() {
  return (
    <div className="min-h-screen px-4 py-20 max-w-4xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16"
      >
        <span className="font-mono text-xs text-accent/60 tracking-widest uppercase">
          /uses
        </span>
        <h1 className="font-display font-extrabold text-5xl md:text-6xl tracking-tight
                       text-primary mt-3 leading-none">
          What I use
          <br />
          <span className="gradient-text">every single day.</span>
        </h1>
        <p className="mt-4 text-secondary font-body leading-7 max-w-lg">
          Hardware, software, extensions, and the bean bag where half the ideas happen.
          Inspired by <a href="https://uses.tech" target="_blank" rel="noopener noreferrer"
            className="text-accent/70 hover:text-accent underline underline-offset-4">uses.tech</a>.
        </p>
      </motion.div>

      <div className="space-y-14">
        {USES.map((section, si) => (
          <ScrollReveal key={section.category} delay={si * 0.05}>
            <div>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-lg" style={{ color: section.color }}>{section.icon}</span>
                <h2 className="font-display font-bold text-lg text-primary">{section.category}</h2>
                <div className="flex-1 h-px bg-border ml-2" />
              </div>

              {/* Items */}
              <div className="space-y-2">
                {section.items.map((item, ii) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ii * 0.05, duration: 0.4 }}
                    className="flex items-start gap-4 p-4 rounded-xl
                               border border-border bg-surface/40
                               hover:bg-surface-2 hover:border-border-bright
                               transition-all duration-200 group"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0
                                 transition-all duration-200 group-hover:scale-150"
                      style={{ backgroundColor: section.color }}
                    />
                    <div>
                      <div className="font-display font-semibold text-primary/90 text-sm mb-0.5">
                        {item.name}
                      </div>
                      <div className="text-secondary text-xs leading-5 font-body">
                        {item.detail}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.3} className="mt-20 pt-8 border-t border-border">
        <p className="font-mono text-xs text-secondary/40 text-center">
          Last updated: March 2026 · This page lives at{' '}
          <span className="text-accent/60">/uses</span>
        </p>
      </ScrollReveal>
    </div>
  );
}
