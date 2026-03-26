'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import ScrollReveal from '@/components/ScrollReveal';
import HintLine from '@/components/HintLine';

const SECTIONS = [
  {
    label: 'Building',
    icon: '⊕',
    color: '#f7a06a',
    content: 'Extracta — a native SwiftUI app that uses Apple\'s Vision framework for OCR and a local LLM pipeline to extract structured data from documents. Think invoices, ID cards, receipts: scan it, and get back clean JSON. It\'s the most humbling thing I\'ve built since ForgeOS.',
  },
  {
    label: 'Learning',
    icon: '◈',
    color: '#7c6af7',
    content: 'German — Duolingo streak intact, dignity not. Also going deep on Swift concurrency (async/await, actors, structured concurrency). And slowly working through fingerstyle guitar, which is nothing like debugging and also exactly like debugging.',
  },
  {
    label: 'Reading',
    icon: '◎',
    color: '#00ff88',
    content: 'The Pragmatic Programmer by Hunt & Thomas — less a book, more a reckoning. Every other page makes me want to rewrite something I built six months ago. Also dipping into Mirza Ghalib\'s collected works at night. The man had no compiler and still shipped.',
  },
  {
    label: 'Thinking about',
    icon: '⊗',
    color: '#a899ff',
    content: 'What a "local-first AI" actually means. I want to build a personal assistant that runs entirely offline — voice, vision, local LLM, persistent memory. No cloud, no subscription, no data leaving my machine. It\'s not a product idea. It\'s a conviction.',
  },
  {
    label: 'Listening to',
    icon: '◰',
    color: '#f7a06a',
    content: 'Arijit Singh when writing code that needs to feel something. Lo-fi hip-hop when I need the flow state. AR Rahman\'s older compositions when the world gets loud. And silence when a bug has me by the throat.',
  },
  {
    label: 'Leading',
    icon: '◑',
    color: '#00ff88',
    content: 'Google NXT Hub at Parul University — running workshops, connecting students to the broader tech ecosystem, and trying to make "community" mean something more than a WhatsApp group. It\'s equal parts exciting and exhausting, the way good things usually are.',
  },
];

/* ─── Konami-exclusive hidden log entries ─── */
const KONAMI_LOG = [
  '> system.access: KONAMI_CODE detected',
  '> auth.level: ELEVATED → developer_mode',
  '> rendering: retro_scanlines enabled',
  '> hidden_sections: 3 unlocked',
  '> message: "You found me. Not many do."',
  '> uptime: since 2024 · still running',
  '> mood: caffeinated',
  '> secret: the portfolio has 7 layers',
];

const KONAMI_REVEALS = [
  {
    label: 'What I actually think about at 3 AM',
    content: 'Whether the code I write today will matter in 10 years. Whether building things from scratch is romantic or reckless. Whether Ghalib would have been a systems programmer. The answer is always: probably.',
  },
  {
    label: 'Unpublished project ideas',
    content: 'A CLI that generates poetry from git commit history. A terminal-based meditation app with procedural ambient sound. An OS that boots into a journal instead of a desktop. None of these will make money. All of them keep me up at night.',
  },
  {
    label: 'A note to the curious',
    content: 'If you found this through the Konami code, you\'re the kind of person I want to build things with. Reach out. Seriously. The email is real, the inbox is open, and I reply to everyone who types ↑↑↓↓.',
  },
];

function NowContent() {
  const searchParams = useSearchParams();
  const isKonami = searchParams.get('konami') === '1';

  return (
    <div className={`min-h-screen px-4 py-20 max-w-3xl mx-auto relative ${isKonami ? 'konami-mode' : ''}`}>

      {/* ─── Konami: Scanline overlay ─── */}
      {isKonami && (
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none z-[100]"
          style={{
            background: 'repeating-linear-gradient(0deg, rgba(0,255,136,0.03) 0px, rgba(0,255,136,0.03) 1px, transparent 1px, transparent 3px)',
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* ─── Konami: Retro boot sequence ─── */}
      <AnimatePresence>
        {isKonami && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12 p-5 rounded-2xl border border-tgreen/20 bg-[#0d1117]
                       font-mono text-xs leading-6 overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-tgreen animate-pulse" />
              <span className="text-tgreen/60 tracking-widest uppercase text-[10px]">
                Konami Access · Authenticated
              </span>
            </div>
            {KONAMI_LOG.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12, duration: 0.3 }}
                className="text-tgreen/70"
              >
                {line}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Page header ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-3"
      >
        <span className="font-mono text-xs text-accent/60 tracking-widest uppercase">
          {isKonami ? '↑↑↓↓←→←→BA · unlocked' : 'hidden page · /now'}
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight
                       text-primary mt-3 leading-none mb-4">
          What I&apos;m doing
          <br />
          <span className={isKonami ? 'text-tgreen' : 'gradient-text'}>right now.</span>
        </h1>
        <p className="text-secondary font-mono text-xs">
          Last updated: March 2026 · Inspired by{' '}
          <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer"
            className="text-accent/70 hover:text-accent underline underline-offset-4">
            nownownow.com
          </a>
        </p>
      </motion.div>

      {/* ─── Regular sections ─── */}
      <div className="mt-12 space-y-5">
        {SECTIONS.map((s, i) => (
          <ScrollReveal key={s.label} delay={i * 0.08}>
            <div className={`p-6 rounded-2xl border transition-all duration-300 ${isKonami
              ? 'border-tgreen/10 bg-[#0d1117]/60 hover:bg-[#0d1117]/80 hover:border-tgreen/25'
              : 'border-border bg-surface/50 hover:bg-surface-2 hover:border-border-bright'
              }`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-lg" style={{ color: isKonami ? '#00ff88' : s.color }}>{s.icon}</span>
                <span className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: isKonami ? '#00ff88' : s.color }}>
                  {s.label}
                </span>
              </div>
              <p className="text-primary/70 leading-7 font-body">{s.content}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* ─── Konami: Exclusive hidden sections ─── */}
      <AnimatePresence>
        {isKonami && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 space-y-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px flex-1 bg-tgreen/20" />
              <span className="font-mono text-[10px] text-tgreen/40 tracking-widest uppercase">
                Exclusive · Konami Only
              </span>
              <div className="h-px flex-1 bg-tgreen/20" />
            </div>

            {KONAMI_REVEALS.map((section, i) => (
              <motion.div
                key={section.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
                className="p-6 rounded-2xl border border-tgreen/15 bg-[#0d1117]/40
                           hover:bg-[#0d1117]/70 hover:border-tgreen/30
                           transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-tgreen">◆</span>
                  <span className="font-mono text-xs tracking-widest uppercase text-tgreen/80">
                    {section.label}
                  </span>
                </div>
                <p className="text-primary/60 leading-7 font-body italic">{section.content}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Footer ─── */}
      <ScrollReveal delay={0.5} className="mt-16 pt-8 border-t border-border">
        <p className="font-mono text-xs text-secondary/50 text-center">
          {isKonami
            ? 'You unlocked the full /now experience. Few ever see this.'
            : "You found this page. That's either the Konami code or very deliberate typing. Either way — welcome."}
        </p>
        <HintLine
          text="There's one more room. You haven't found it yet."
          className="mt-4 text-center"
        />
      </ScrollReveal>

      {/* ─── Konami: CRT vignette (subtle edge darkening) ─── */}
      {isKonami && (
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none z-[99]"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      )}
    </div>
  );
}

export default function NowPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <NowContent />
    </Suspense>
  );
}
