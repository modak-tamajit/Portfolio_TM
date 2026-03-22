'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const SECTIONS = [
  {
    label:   'Building',
    icon:    '⊕',
    color:   '#f7a06a',
    content: 'Extracta — a native SwiftUI document intelligence app. Using Apple Vision framework for OCR + a local LLM pipeline for structuring extracted data. It\'s slow, humbling, and exactly the right kind of hard.',
  },
  {
    label:   'Learning',
    icon:    '◈',
    color:   '#7c6af7',
    content: 'German (slowly — it\'s fighting back). Also deepening my Swift knowledge, specifically around Combine and async/await patterns. And picking up guitar chords between commits.',
  },
  {
    label:   'Reading',
    icon:    '◎',
    color:   '#00ff88',
    content: 'The Pragmatic Programmer by Hunt & Thomas. It\'s less a programming book and more a philosophy of craft. Also some Urdu poetry collections when the code stops making sense.',
  },
  {
    label:   'Thinking about',
    icon:    '⊗',
    color:   '#a899ff',
    content: 'How AI will change the value of deep technical knowledge. My bet: it makes systems literacy more valuable, not less — because someone still needs to understand what the black box is doing.',
  },
  {
    label:   'Listening to',
    icon:    '◰',
    color:   '#f7a06a',
    content: 'Arijit Singh when writing. Instrumental lo-fi when coding. Silence when debugging.',
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
