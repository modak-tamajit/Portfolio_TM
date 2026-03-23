'use client';

import { useState, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';

/* ─────────────────────────────────────────────
   FORMSPREE
   1. Go to https://formspree.io/new
   2. Create a free form
   3. Replace XXXXXXXX with your form ID
───────────────────────────────────────────── */
const FORMSPREE_URL = 'https://formspree.io/f/XXXXXXXX';

const SOCIAL_LINKS = [
  { label: 'Email',     value: 'modaktamajit999@gmail.com',    href: 'mailto:modaktamajit999@gmail.com',                icon: '✉' },
  { label: 'GitHub',    value: '@modak-tamajit',               href: 'https://github.com/modak-tamajit',               icon: '⊕' },
  { label: 'LinkedIn',  value: 'tamajit-modak-76938b169',      href: 'https://linkedin.com/in/tamajit-modak-76938b169',icon: '◈' },
  { label: 'Instagram', value: '@am_modak',                    href: 'https://instagram.com/am_modak',                 icon: '◎' },
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(FORMSPREE_URL, {
        method:  'POST',
        body:    new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        formRef.current?.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="min-h-screen px-4 py-20 max-w-5xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16"
      >
        <span className="font-mono text-xs text-tgreen tracking-widest uppercase">
          04 / Contact
        </span>
        <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight
                       text-primary mt-3 leading-none">
          Let&apos;s build
          <br />
          <span className="gradient-text">something real.</span>
        </h1>
        <p className="mt-5 text-secondary font-body leading-7 max-w-lg">
          Whether it&apos;s an internship, a collaboration, a weird side-project idea, or
          you just want to talk about operating systems at 2 AM — I&apos;m reachable.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-[1fr_1.4fr] gap-12">

        {/* ── Left: social links ── */}
        <ScrollReveal direction="left">
          <div className="space-y-5">
            <p className="text-secondary font-mono text-xs tracking-widest uppercase mb-6">
              Find me at
            </p>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl group
                           border border-border bg-surface/50
                           hover:border-accent/40 hover:bg-surface-2
                           transition-all duration-200"
              >
                <span className="text-xl text-accent mt-0.5 group-hover:scale-110
                                 transition-transform duration-200 inline-block">
                  {link.icon}
                </span>
                <div>
                  <div className="text-xs font-mono text-secondary mb-0.5">{link.label}</div>
                  <div className="text-primary/80 text-sm font-medium break-all">{link.value}</div>
                </div>
              </a>
            ))}

            <div className="flex items-center gap-3 mt-8 p-4 rounded-xl
                            border border-tgreen/20 bg-tgreen/5">
              <span className="w-2 h-2 rounded-full bg-tgreen animate-pulse" />
              <span className="font-mono text-xs text-tgreen">
                Open to internships &amp; collaborations
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Right: form ── */}
        <ScrollReveal direction="right" delay={0.1}>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Name"  name="name"  placeholder="Your name"      required />
              <FormField label="Email" name="email" placeholder="your@email.com" required type="email" />
            </div>

            <FormField label="Subject" name="subject" placeholder="What's this about?" required />

            <div>
              <label className="block font-mono text-xs text-secondary tracking-wider uppercase mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={6}
                required
                placeholder="Tell me what you're building, what you need, or just say hi…"
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border
                           text-primary/90 font-body text-sm placeholder:text-secondary/40
                           focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20
                           resize-none transition-all duration-200"
              />
            </div>

            <MagneticButton
              as="button"
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl
                         font-display font-semibold text-sm text-white
                         bg-accent hover:bg-accent-light
                         shadow-[0_0_30px_rgba(124,106,247,0.3)]
                         hover:shadow-[0_0_45px_rgba(124,106,247,0.5)]
                         transition-all duration-200 disabled:opacity-60"
            >
              {status === 'sending' ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
              ) : status === 'sent' ? (
                <>✓ Sent! I&apos;ll get back to you soon.</>
              ) : status === 'error' ? (
                <>Something went wrong — email me directly.</>
              ) : (
                <>Send it →</>
              )}
            </MagneticButton>

            <p className="text-[11px] font-mono text-secondary/50 text-center">
              No spam, no subscriptions. Just a conversation.
            </p>
          </form>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.3}>
        <div className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <span className="font-display font-bold text-lg gradient-text">Tamajit Modak</span>
          <span className="font-mono text-xs text-secondary/50">
            Built with Next.js · Tailwind · Framer Motion
          </span>
        </div>
      </ScrollReveal>
    </div>
  );
}

function FormField({ label, name, type = 'text', placeholder, required }: {
  label: string; name: string; type?: string; placeholder: string; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name}
        className="block font-mono text-xs text-secondary tracking-wider uppercase mb-2">
        {label}
      </label>
      <input
        id={name} name={name} type={type} placeholder={placeholder} required={required}
        className="w-full px-4 py-3 rounded-xl bg-surface border border-border
                   text-primary/90 font-body text-sm placeholder:text-secondary/40
                   focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20
                   transition-all duration-200"
      />
    </div>
  );
}
