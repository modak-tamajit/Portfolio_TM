'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

/* ─── Shayari / poetry entries ─── */
const SHAYARI = [
  {
    id:   1,
    urdu: 'जो टूटा नहीं, उसने लड़ाई देखी नहीं\nजो रोया नहीं, उसने रात की गहराई नहीं',
    tr:   'One who never broke, has never truly fought.\nOne who never wept, knows not the depth of night.',
    note: 'Written at 2 AM after a memory allocator kept segfaulting.',
  },
  {
    id:   2,
    urdu: 'Code भी शायरी है,\nहर function एक बात कहता है जो लोग नहीं सुनते।',
    tr:   'Code too is poetry —\nevery function says something people don\'t listen to.',
    note: 'The day I realized good variable names are a love language.',
  },
  {
    id:   3,
    urdu: 'मंज़िल का पता नहीं,\nपर रास्ते पे जो मिला — वो मुझसे बेहतर था।',
    tr:   'I don\'t know where I\'m going,\nbut who I met along the way was better than my destination.',
    note: 'For the mentors, builders, and 3 AM coffee cups.',
  },
  {
    id:   4,
    urdu: 'Binary में दुनिया देखता हूँ,\nपर दिल अभी भी analog है।',
    tr:   'I see the world in binary,\nbut the heart is still analog.',
    note: 'Every developer\'s quiet contradiction.',
  },
];

/* ─── Photography moments ─── */
const PHOTOS = [
  {
    id:      1,
    caption: 'First light through a hostel window',
    note:    'There\'s something about the first hour of the day that belongs only to you.',
    src:     '/assets/blog/photo-1.jpg',
    accent:  '#f7a06a',
  },
  {
    id:      2,
    caption: 'Terminal at 3 AM',
    note:    'Green text on black screen. The most honest thing I know.',
    src:     '/assets/blog/photo-2.jpg',
    accent:  '#00ff88',
  },
  {
    id:      3,
    caption: 'Old tea stall, Vadodara',
    note:    'The best conversations happen where WiFi is bad and chai is strong.',
    src:     '/assets/blog/photo-3.jpg',
    accent:  '#7c6af7',
  },
];

type Tab = 'shayari' | 'photos' | 'thoughts';

export default function BlogPage() {
  const [tab, setTab] = useState<Tab>('shayari');

  return (
    <div className="min-h-screen px-4 py-20 max-w-4xl mx-auto">

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <span className="font-mono text-xs text-warm/80 tracking-widest uppercase">
          hidden page · /blog
        </span>
        <h1 className="font-display font-extrabold text-5xl md:text-6xl tracking-tight
                       text-primary mt-3 leading-none">
          The other
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #f7a06a 0%, #e87040 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            half of me.
          </span>
        </h1>
        <p className="mt-4 text-secondary font-body leading-7 max-w-lg">
          The side that doesn&apos;t write code. Shayari, photographs, half-formed thoughts.
          You unlocked this — so you get to see all of it.
        </p>
      </motion.div>

      {/* Tab switcher */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-1 p-1 rounded-2xl bg-surface border border-border w-fit mb-12"
      >
        {(['shayari', 'photos', 'thoughts'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              'px-5 py-2.5 rounded-xl text-sm font-mono capitalize transition-all duration-200',
              tab === t
                ? 'bg-surface-3 text-primary border border-border-bright shadow-sm'
                : 'text-secondary hover:text-primary/70',
            ].join(' ')}
          >
            {t}
          </button>
        ))}
      </motion.div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {tab === 'shayari' && (
          <motion.div
            key="shayari"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            exit={  { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {SHAYARI.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 0.08}>
                <div className="p-6 rounded-2xl border border-border bg-surface/60
                                hover:bg-surface-2 hover:border-warm/30
                                transition-all duration-300 h-full flex flex-col gap-4">
                  {/* Urdu / Hindi text */}
                  <p className="font-body text-primary/90 text-lg leading-9 whitespace-pre-line">
                    {s.urdu}
                  </p>

                  {/* Divider */}
                  <div className="w-8 h-px bg-warm/30" />

                  {/* Translation */}
                  <p className="font-body italic text-secondary leading-7 text-sm">
                    &ldquo;{s.tr}&rdquo;
                  </p>

                  {/* Personal note */}
                  <p className="font-mono text-xs text-secondary/50 mt-auto pt-2 border-t border-border">
                    {s.note}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </motion.div>
        )}

        {tab === 'photos' && (
          <motion.div
            key="photos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            exit={  { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {PHOTOS.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.1}>
                <div className="rounded-2xl overflow-hidden border border-border">
                  {/* Photo area */}
                  <div
                    className="w-full aspect-[16/9] bg-surface-2 flex items-center
                                justify-center relative overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      alt={p.caption}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement!;
                        parent.style.background = `radial-gradient(circle at 30% 50%, ${p.accent}15, #111118)`;
                        const div = document.createElement('div');
                        div.className = 'flex flex-col items-center justify-center gap-3 w-full h-full';
                        div.innerHTML = `
                          <span style="font-size:3rem;opacity:0.15">◎</span>
                          <span style="font-family:var(--font-jetbrains);font-size:0.7rem;color:#5a5a7a;letter-spacing:0.15em;text-transform:uppercase">
                            photo · add ${p.src}
                          </span>
                        `;
                        parent.appendChild(div);
                      }}
                    />
                  </div>

                  {/* Caption */}
                  <div className="px-6 py-5 bg-surface/50 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display font-semibold text-primary mb-1">{p.caption}</p>
                      <p className="font-body text-secondary/70 text-sm italic">{p.note}</p>
                    </div>
                    <span className="font-mono text-xs text-secondary/40 flex-shrink-0 mt-1">
                      #{String(p.id).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.3}>
              <p className="text-center font-mono text-xs text-secondary/40">
                More on Instagram:{' '}
                <a href="https://instagram.com/am_modak" target="_blank" rel="noopener noreferrer"
                  className="text-accent/60 hover:text-accent underline underline-offset-4">
                  @am_modak
                </a>
              </p>
            </ScrollReveal>
          </motion.div>
        )}

        {tab === 'thoughts' && (
          <motion.div
            key="thoughts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            exit={  { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl space-y-8"
          >
            {[
              {
                title:   'On building things that don\'t exist yet',
                date:    'March 2026',
                content: 'The most interesting work is always in the space between "this would be useful" and "this has never been built." That gap is uncomfortable. It means no tutorials, no Stack Overflow answers, no documentation. Just you, the problem, and whatever you\'ve internalized over years of making mistakes.\n\nForgeOS lived in that gap. Extracta lives there now. I think all the best work does.',
              },
              {
                title:   'Why I still write shayari in 2025',
                date:    'January 2026',
                content: 'Code is precise. It does exactly what you tell it. Shayari is the opposite — it means seventeen things at once, and half of them the writer didn\'t intend. I need both. Precision to build. Ambiguity to feel.\n\nI\'m a Bengali who writes in Hindi and codes in C. I contain multitudes. I\'m fine with that.',
              },
              {
                title:   'The thing about being Year 1',
                date:    'November 2025',
                content: 'People expect first-year students to be lost. Sometimes I am. But building ForgeOS taught me that the expectations you carry about yourself matter more than the ones others have for you.\n\nI\'m not ahead of schedule. I\'m just on a different schedule. And that\'s mine to keep.',
              },
            ].map((t, i) => (
              <ScrollReveal key={t.title} delay={i * 0.1}>
                <article className="pb-8 border-b border-border last:border-none">
                  <span className="font-mono text-xs text-secondary/50">{t.date}</span>
                  <h2 className="font-display font-bold text-xl text-primary mt-1 mb-4">
                    {t.title}
                  </h2>
                  <p className="font-body text-primary/70 leading-8 whitespace-pre-line">
                    {t.content}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
