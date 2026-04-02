'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import ToolsStrip from '@/components/ToolsStrip';
import ScrollReveal from '@/components/ScrollReveal';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import HintLine from '@/components/HintLine';

/* ─── Stats ─── */
const STATS = [
  { value: '~3,500', label: 'lines in ForgeOS' },
  { value: '10+', label: 'certifications' },
  { value: '3', label: 'products shipped' },
  { value: '8.55', label: 'SGPA' },
];

export default function HomePage() {
  const [phase, setPhase] = useState<'terminal' | 'hero'>('terminal');
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 1000], [0, 250]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20">

      {/* ── Phase 1: Interactive Terminal ── */}
      <AnimatePresence mode="wait">
        {phase === 'terminal' && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col items-center"
          >
            <InteractiveTerminal />

            {/* Skip hint */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              onClick={() => setPhase('hero')}
              className="mt-6 font-mono text-xs text-secondary/40 hover:text-secondary/80
                         transition-colors duration-200 underline underline-offset-4"
            >
              skip to portfolio →
            </motion.button>
          </motion.div>
        )}

        {/* ── Phase 2: Hero content ── */}
        {phase === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center max-w-3xl w-full"
          >
            {/* Name with subtle scroll parallax */}
            <motion.div style={{ y: heroParallax }}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-extrabold text-4xl sm:text-6xl md:text-8xl tracking-tight
                           gradient-text leading-none mb-4"
              >
                TAMAJIT
                <br />
                MODAK
              </motion.h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-lg sm:text-xl md:text-2xl text-primary/80 font-semibold mb-3"
            >
              Built an OS before building my resumé.
            </motion.p>

            {/* Sub-tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="font-mono text-sm text-secondary tracking-wide mb-10"
            >
              Systems programmer · Frontend engineer · Year&nbsp;1&nbsp;BCA&nbsp;@&nbsp;Parul&nbsp;University
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5 }}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14 w-full sm:w-auto"
            >
              <MagneticButton
                as="a"
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                           bg-accent text-white font-display font-semibold text-sm
                           hover:bg-accent-light transition-colors duration-200
                           shadow-[0_0_30px_rgba(124,106,247,0.4)]
                           hover:shadow-[0_0_45px_rgba(124,106,247,0.6)]"
              >
                View Projects
                <ArrowRight />
              </MagneticButton>

              <MagneticButton
                as="a"
                href="/assets/resume/tamajit-modak-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                           bg-white/[0.05] text-primary/80 font-display font-semibold text-sm
                           border border-border hover:border-accent/40
                           hover:bg-white/[0.09] hover:text-primary
                           transition-all duration-200"
              >
                Download Resume
                <DownloadIcon />
              </MagneticButton>

              {/* Back to terminal */}
              <button
                onClick={() => setPhase('terminal')}
                className="font-mono text-xs text-secondary/50 hover:text-secondary/90
                           transition-colors duration-200 underline underline-offset-4"
              >
                ← open terminal
              </button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-px w-full max-w-xl
                         border border-border rounded-2xl overflow-hidden"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center py-5 bg-surface/60
                             hover:bg-surface-2 transition-colors duration-200"
                >
                  <span className="font-display font-bold text-2xl text-accent-light">
                    {s.value}
                  </span>
                  <span className="font-mono text-[10px] text-secondary mt-1 tracking-wide">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Visitor counter — pulled from Vercel Analytics API */}
            <VisitorCounter />

            {/* Easter egg hint */}
            <HintLine
              text="This portfolio has secrets. Some are hidden in plain sight."
              className="mt-10 text-center"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll hint — only in hero phase */}
      {phase === 'hero' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2
                     flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-secondary/50 tracking-widest uppercase">
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-secondary/30 to-transparent"
          />
        </motion.div>
      )}

      {/* Tools strip */}
      {phase === 'hero' && (
        <ScrollReveal className="w-full absolute bottom-0 left-0" delay={0.6}>
          <ToolsStrip />
        </ScrollReveal>
      )}
    </section>
  );
}

/* Dynamic Visitor Counter Component */
function VisitorCounter() {
  const [visitors, setVisitors] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.visitors === 'number') {
          setVisitors(data.visitors);
        }
      })
      .catch((err) => console.error('Failed to fetch visitors', err));
  }, []);

  if (visitors === null) {
      return (
        <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-5 font-mono text-[10px] text-secondary/30 tracking-wide animate-pulse"
      >
        loading metrics...
      </motion.p>
      );
  }

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="mt-5 font-mono text-[10px] text-secondary/50 tracking-wide"
    >
      {visitors.toLocaleString()} builders visited recently
    </motion.p>
  );
}

/* Micro icons */
const ArrowRight = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"
    className="w-4 h-4">
    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"
    className="w-4 h-4">
    <path d="M8 3v7M5 8l3 3 3-3M3 13h10"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
