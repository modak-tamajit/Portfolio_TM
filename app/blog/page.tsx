'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import HintLine from '@/components/HintLine';
import Image from 'next/image';

import photo1 from '@/public/assets/blog/photo-1.jpg';
import photo2 from '@/public/assets/blog/photo-2.jpg';
import photo3 from '@/public/assets/blog/photo-3.jpg';

/* ─── Shayari / poetry entries ─── */
const SHAYARI = [
  {
    id: 1,
    urdu: 'जो टूटा नहीं, उसने लड़ाई देखी नहीं\nजो रोया नहीं, उसने रात की गहराई नहीं',
    tr: 'One who never broke, has never truly fought.\nOne who never wept, knows not the depth of night.',
    note: 'Written at 2 AM after a memory allocator kept segfaulting. The bug and the line arrived together.',
  },
  {
    id: 2,
    urdu: 'Code भी शायरी है,\nहर function एक बात कहता है जो लोग नहीं सुनते।',
    tr: 'Code too is poetry —\nevery function says something people don\'t listen to.',
    note: 'The day I realized good variable names are a love language.',
  },
  {
    id: 3,
    urdu: 'मंज़िल का पता नहीं,\nपर रास्ते पे जो मिला — वो मुझसे बेहतर था।',
    tr: 'I don\'t know where I\'m going,\nbut who I met along the way was better than my destination.',
    note: 'For the mentors, builders, and 3 AM coffee cups.',
  },
  {
    id: 4,
    urdu: 'Binary में दुनिया देखता हूँ,\nपर दिल अभी भी analog है।',
    tr: 'I see the world in binary,\nbut the heart is still analog.',
    note: 'Every developer\'s quiet contradiction.',
  },
  {
    id: 5,
    urdu: 'धूप माँगी थी थोड़ी सी,\nमिल गया पूरा आसमान।\nशिकायत भी क्या करूँ —\nनसीब था मेहरबान।',
    tr: 'I asked for just a little sunlight,\nand was given the whole sky.\nWhat is there even to complain about —\nfate was generous.',
    note: 'Written the evening I got my SGPA. Didn\'t expect 8.55.',
  },
];

/* ─── Photography moments ─── */
const PHOTOS = [
  {
    id: 1,
    caption: 'First light through a hostel window',
    note: 'There\'s something about the first hour of the day that belongs only to you. Before the notifications. Before the compiler errors.',
    src: photo1,
    accent: '#f7a06a',
  },
  {
    id: 2,
    caption: 'Terminal at 3 AM',
    note: 'Green text on black screen. The most honest thing I know. It never lies about what you gave it.',
    src: photo2,
    accent: '#00ff88',
  },
  {
    id: 3,
    caption: 'Old tea stall, Vadodara',
    note: 'The best conversations happen where WiFi is bad and chai is strong. This place has seen more ideas than most offices.',
    src: photo3,
    accent: '#7c6af7',
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
        animate={{ opacity: 1, y: 0 }}
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

        {/* Congratulations — discovered the soul */}
        <HintLine
          text="You found the soul of this portfolio."
          opacity={0.5}
          className="mt-6"
        />
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
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
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
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
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
                    <Image
                      src={p.src}
                      alt={p.caption}
                      className="w-full h-full object-cover"
                      placeholder="blur"
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
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl space-y-8"
          >
            {[
              {
                title: 'How I built ForgeOS',
                date: 'February 2026',
                content: 'The idea started with a question I couldn\'t shake: what actually happens when a computer boots? Not the Wikipedia version — the real version. What is a process? How does memory get divided? If I wrote a shell, would I understand what it\'s talking to?\n\nSo I started building. First semester, BCA Honours, Parul University. Most of my classmates were still getting comfortable with printf().\n\nForgeOS is a terminal operating system written in C11. Around 3,500 lines in the final count. It has a memory allocator (no malloc — I wrote my own), a round-robin process scheduler, a minimal file system, and an interactive shell with a handful of built-in commands. It compiles with GCC and runs on x86.\n\nThe hardest part wasn\'t the code. It was the debugging. When something breaks in user-space, you have error messages, stack traces, a debugger that mostly works. When something breaks in your own OS, you have silence. A blank screen. A system that simply refuses to continue. You learn very quickly that assumptions are expensive.\n\nI spent three days on a pointer alignment bug that was causing random crashes in the allocator. Three days of printf-debugging at the most primitive level — writing to memory-mapped I/O, checking register values, reading Intel manuals at 2 AM. When I finally found it, I didn\'t feel triumph. I felt something quieter. Like I\'d been allowed past a door I didn\'t know existed.\n\nForgeOS taught me that complexity isn\'t a property of a system. It\'s a property of your understanding. Build from zero and the confusion slowly becomes architecture. I\'d recommend it to any developer who wants to know what they\'re actually doing.',
              },
              {
                title: 'What Year 1 of BCA actually looks like',
                date: 'December 2025',
                content: 'People have strong opinions about computer science degrees. Some say they\'re essential. Others say they\'re obsolete. I think both camps are arguing about a different thing than what I\'m actually doing.\n\nYear 1 at Parul University is a mix. Some courses are foundational and genuinely good — discrete mathematics, data structures, the C programming labs. Others are dated, moving slowly toward relevance. This is true of most degree programs. It isn\'t a reason to disengage. It\'s a reason to do parallel work.\n\nI enrolled in September 2025. By October I was already running the Google NXT Hub chapter, organizing workshops for students who wanted more than what the timetable offered. By November I had ForgeOS on GitHub. By December I had an SGPA of 8.55 and had started Extracta in Swift.\n\nThe curriculum teaches you discipline and fundamentals. The extracurricular work — the projects, the community, the certifications — teaches you everything else. Neither is sufficient alone. I needed the structure of a degree to force me into subjects I\'d have skipped. And I needed the freedom of side projects to feel like myself.\n\nWhat Year 1 actually looks like: late nights, strong chai, long debugging sessions, a whiteboard covered in pseudocode, and the occasional afternoon where you sit under a tree and wonder if any of this is going where you think it is.\n\nIt is. You just can\'t see the destination yet. That\'s the point.',
              },
              {
                title: 'On building things that don\'t exist yet',
                date: 'March 2026',
                content: 'The most interesting work is always in the space between "this would be useful" and "this has never been built." That gap is uncomfortable. It means no tutorials, no Stack Overflow answers, no documentation older than six months. Just you, the problem, and whatever you\'ve internalized over years of making mistakes.\n\nForgeOS lived in that gap. Extracta lives there now. My long-term project — a fully offline personal AI assistant with voice, vision, local LLM, and persistent memory — will live there too, someday.\n\nI think the developers who will matter most in the next decade aren\'t the ones who can use the most tools. They\'re the ones who can build where there are no tools yet. That requires something different from skill. It requires comfort with not knowing. With being wrong repeatedly and specifically. With the long, quiet stretches between breakthroughs.\n\nI\'m a first-year student. I don\'t have the answers. But I\'ve already learned what the question feels like. That\'s enough to keep going.',
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
