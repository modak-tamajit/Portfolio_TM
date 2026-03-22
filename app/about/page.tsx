'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';

/* ─── Skill categories ─── */
const SKILLS = [
  {
    category: 'Languages',
    items: ['C / C++', 'Python', 'Swift', 'TypeScript', 'SQL', 'Bash'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'SwiftUI', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Systems',
    items: ['Linux', 'POSIX', 'Memory Mgmt', 'GCC / Make', 'x86 Basics'],
  },
  {
    category: 'Data',
    items: ['PostgreSQL', 'SQLite', 'REST APIs', 'FastAPI', 'Core ML'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Xcode', 'Figma', 'Notion'],
  },
  {
    category: 'Learning',
    items: ['German', 'Kung Fu', 'Guitar', 'Photography', 'Shayari'],
  },
];

/* ─── Certifications ─── */
const CERTS = [
  'Oracle', 'Microsoft', 'Linux Foundation',
  'IBM', 'HP', 'Apple', 'Google', 'Deloitte', 'Capabl India',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen px-4 py-20 max-w-5xl mx-auto">

      {/* ── Page header ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16"
      >
        <span className="font-mono text-xs text-tgreen tracking-widest uppercase">
          01 / About
        </span>
        <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight
                       text-primary mt-3 leading-none">
          A curious mind
          <br />
          <span className="gradient-text">with a C compiler.</span>
        </h1>
      </motion.div>

      {/* ── Story + Avatar ── */}
      <div className="grid md:grid-cols-[1fr_280px] gap-12 mb-20">

        <ScrollReveal direction="left">
          <article className="font-body text-primary/70 leading-8 text-[1.05rem] space-y-6">
            <p>
              It started on a summer afternoon — maybe eight years old — watching my father
              navigate through menus on an old family computer, loading up retro games I
              couldn't name. I remember thinking the machine was{' '}
              <em className="text-primary/90 not-italic">alive</em>. My father
              noticed the look on my face and slid the keyboard toward me with three words:
              <span className="text-accent font-mono"> "Try it yourself."</span>
            </p>

            <p>
              That moment never really ended. School taught me HTML, then I found C, and C
              changed everything. I stopped caring about making things{' '}
              <em className="text-primary/90 not-italic">look good</em> and started
              asking how they <em className="text-primary/90 not-italic">work</em>.
              Why does memory exist? What actually happens when a process starts? Can I build
              one myself?
            </p>

            <p>
              The answer to that last question was{' '}
              <a
                href="https://github.com/modak-tamajit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tgreen underline underline-offset-4 hover:text-tgreen/80 transition-colors"
              >
                ForgeOS
              </a>
              — a terminal operating system I built from scratch in C11. Around
              3,500 lines. Memory manager, scheduler, file system, custom shell. Written
              during my first year of college, when most people were still learning{' '}
              <code className="font-mono text-sm text-secondary">printf()</code>.
            </p>

            <p>
              Now I'm at Parul University completing my BCA Honours. The systems work
              continues, but so does Swift — I'm building{' '}
              <span className="text-warm font-medium">Extracta</span>, a native iOS/macOS
              app that uses Apple's Vision framework to extract structured data from documents.
              I also serve as Community Lead at Google NXT Hub, because I believe good ideas
              should spread.
            </p>

            <p>
              When I'm not writing code, I'm writing shayari, taking photographs of ordinary
              moments, learning guitar, or trying to convince myself that German grammar makes
              sense. I'm a Bengali with a poetic streak and an obsession with building things
              that shouldn't exist yet.
            </p>

            <p className="text-secondary font-mono text-sm italic border-l-2 border-accent/40 pl-4">
              "A curious heart, a poetic mind, and a plate full of stories — that's how I
              build my world."
            </p>
          </article>
        </ScrollReveal>

        {/* Avatar + quick facts */}
        <ScrollReveal direction="right" delay={0.15}>
          <div className="flex flex-col gap-5">
            {/* Profile image / avatar */}
            <div
              className="w-full aspect-square rounded-2xl overflow-hidden
                         border border-border bg-surface-2
                         flex items-center justify-center
                         shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              {/* Replace src with actual profile.jpg */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/profile.jpg"
                alt="Tamajit Modak"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement!;
                  parent.innerHTML = `
                    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;height:100%;">
                      <span style="font-family:var(--font-syne);font-size:4rem;font-weight:800;background:linear-gradient(135deg,#e4e4f0,#a899ff,#7c6af7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">TM</span>
                      <span style="font-family:var(--font-jetbrains);font-size:0.65rem;color:#5a5a7a;letter-spacing:0.15em;">TAMAJIT MODAK</span>
                    </div>
                  `;
                }}
              />
            </div>

            {/* Quick facts */}
            <div className="space-y-2">
              {[
                { label: 'Location', value: 'Vadodara, Gujarat' },
                { label: 'Program',  value: 'BCA Honours · Parul University' },
                { label: 'Year',     value: '1st year (2025–2029)' },
                { label: 'SGPA',     value: '8.55' },
                { label: 'Role',     value: 'Community Lead · Google NXT Hub' },
              ].map((f) => (
                <div key={f.label}
                  className="flex justify-between py-2 border-b border-border/60 text-sm">
                  <span className="font-mono text-secondary text-xs">{f.label}</span>
                  <span className="text-primary/80 font-medium text-xs text-right">{f.value}</span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3 flex-wrap">
              {[
                { label: 'GitHub',   href: 'https://github.com/modak-tamajit'                         },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/tamajit-modak-76938b169'           },
                { label: 'Email',    href: 'mailto:modaktamajit999@gmail.com'                          },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-mono
                             bg-surface border border-border
                             text-secondary hover:text-primary hover:border-accent/40
                             transition-all duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Skills Grid ── */}
      <ScrollReveal>
        <div className="mb-16">
          <h2 className="font-display font-bold text-2xl text-primary mb-8">
            What I work with
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILLS.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="p-5 rounded-2xl border border-border bg-surface/50
                           hover:border-accent/30 hover:bg-surface-2
                           transition-all duration-300 group"
              >
                <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2.5 py-1 rounded-md
                                 bg-surface-3 border border-border/60
                                 text-secondary/80 font-mono
                                 group-hover:border-border-bright
                                 transition-colors duration-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ── Certifications strip ── */}
      <ScrollReveal>
        <div className="mb-16">
          <h2 className="font-display font-bold text-2xl text-primary mb-6">
            Certifications
          </h2>
          <div className="flex flex-wrap gap-3">
            {CERTS.map((cert) => (
              <span
                key={cert}
                className="px-4 py-2 rounded-xl text-sm font-mono
                           border border-border bg-surface/50 text-secondary
                           hover:border-accent/40 hover:text-primary
                           transition-all duration-200 cursor-default"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ── CTA ── */}
      <ScrollReveal>
        <div className="flex flex-wrap gap-4">
          <MagneticButton
            as="a"
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                       bg-accent text-white font-display font-semibold text-sm
                       hover:bg-accent-light transition-colors duration-200
                       shadow-[0_0_30px_rgba(124,106,247,0.3)]"
          >
            See my projects →
          </MagneticButton>
          <MagneticButton
            as="a"
            href="mailto:modaktamajit999@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                       border border-border bg-surface/50 text-primary/80 font-display font-semibold text-sm
                       hover:border-accent/40 hover:bg-surface-2 transition-all duration-200"
          >
            Let's talk →
          </MagneticButton>
        </div>
      </ScrollReveal>
    </div>
  );
}
