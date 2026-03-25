'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const SECTIONS = [
  {
    label:   'Building',
    icon:    '⊕',
    color:   '#f7a06a',
    content: 'Extracta — a native SwiftUI app that uses Apple\'s Vision framework for OCR and a local LLM pipeline to extract structured data from documents. Think invoices, ID cards, receipts: scan it, and get back clean JSON. It\'s the most humbling thing I\'ve built since ForgeOS.',
  },
  {
    label:   'Learning',
    icon:    '◈',
    color:   '#7c6af7',
    content: 'German — Duolingo streak intact, dignity not. Also going deep on Swift concurrency (async/await, actors, structured concurrency). And slowly working through fingerstyle guitar, which is nothing like debugging and also exactly like debugging.',
  },
  {
    label:   'Reading',
    icon:    '◎',
    color:   '#00ff88',
    content: 'The Pragmatic Programmer by Hunt & Thomas — less a book, more a reckoning. Every other page makes me want to rewrite something I built six months ago. Also dipping into Mirza Ghalib\'s collected works at night. The man had no compiler and still shipped.',
  },
  {
    label:   'Thinking about',
    icon:    '⊗',
    color:   '#a899ff',
    content: 'What a "local-first AI" actually means. I want to build a personal assistant that runs entirely offline — voice, vision, local LLM, persistent memory. No cloud, no subscription, no data leaving my machine. It\'s not a product idea. It\'s a conviction.',
  },
  {
    label:   'Listening to',
    icon:    '◰',
    color:   '#f7a06a',
    content: 'Arijit Singh when writing code that needs to feel something. Lo-fi hip-hop when I need the flow state. AR Rahman\'s older compositions when the world gets loud. And silence when a bug has me by the throat.',
  },
  {
    label:   'Leading',
    icon:    '◑',
    color:   '#00ff88',
    content: 'Google NXT Hub at Parul University — running workshops, connecting students to the broader tech ecosystem, and trying to make "community" mean something more than a WhatsApp group. It\'s equal parts exciting and exhausting, the way good things usually are.',
  },
];

export default function NowPage() {
  return (
    <div className="min-h-screen px-4 py-20 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-3"
      >
        <span className="font-mono text-xs text-accent/60 tracking-widest uppercase">
          hidden page · /now
        </span>
        <h1 className="font-display font-extrabold text-5xl md:text-6xl tracking-tight
                       text-primary mt-3 leading-none mb-4">
          What I&apos;m doing
          <br />
          <span className="gradient-text">right now.</span>
        </h1>
        <p className="text-secondary font-mono text-xs">
          Last updated: March 2026 · Inspired by{' '}
          <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer"
            className="text-accent/70 hover:text-accent underline underline-offset-4">
            nownownow.com
          </a>
        </p>
      </motion.div>

      <div className="mt-12 space-y-5">
        {SECTIONS.map((s, i) => (
          <ScrollReveal key={s.label} delay={i * 0.08}>
            <div className="p-6 rounded-2xl border border-border bg-surface/50
                            hover:bg-surface-2 hover:border-border-bright
                            transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-lg" style={{ color: s.color }}>{s.icon}</span>
                <span className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: s.color }}>
                  {s.label}
                </span>
              </div>
              <p className="text-primary/70 leading-7 font-body">{s.content}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.5} className="mt-16 pt-8 border-t border-border">
        <p className="font-mono text-xs text-secondary/50 text-center">
          You found this page. That&apos;s either the Konami code or very deliberate typing.
          Either way — welcome.
        </p>
      </ScrollReveal>
    </div>
  );
}
