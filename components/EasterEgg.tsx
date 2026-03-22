'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Konami Code ─── */
const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
];

/* ─── Word triggers ─── */
const WORD_TRIGGERS: Record<string, string> = {
  'about':       '/about',
  'projects':    '/projects',
  'contact':     '/contact',
  'now':         '/now',
  'unlock soul': '/blog',
};

const MAX_BUFFER = 20;

interface Toast {
  id:      number;
  message: string;
  color:   string;
}

let toastId = 0;

export default function EasterEgg() {
  const router     = useRouter();
  const bufferRef  = useRef<string[]>([]);
  const wordBufRef = useRef<string>('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, color = '#00ff88') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, color }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      /* ── Konami check ── */
      const key = e.key;
      bufferRef.current = [...bufferRef.current, key].slice(-KONAMI.length);
      if (
        bufferRef.current.length === KONAMI.length &&
        bufferRef.current.every((k, i) => k === KONAMI[i])
      ) {
        showToast('↑↑↓↓←→←→BA  · Unlocking /now…', '#a899ff');
        setTimeout(() => router.push('/now'), 900);
        bufferRef.current = [];
        return;
      }

      /* ── Word trigger check ── */
      if (key.length === 1 || key === ' ') {
        wordBufRef.current = (wordBufRef.current + (key === ' ' ? ' ' : key))
          .slice(-MAX_BUFFER)
          .toLowerCase();

        for (const [word, path] of Object.entries(WORD_TRIGGERS)) {
          if (wordBufRef.current.endsWith(word)) {
            if (word === 'unlock soul') {
              showToast('Soul unlocked. Navigating to /blog…', '#f7a06a');
              setTimeout(() => router.push(path), 1000);
            } else {
              showToast(`→ ${path}`, '#7c6af7');
              setTimeout(() => router.push(path), 400);
            }
            wordBufRef.current = '';
            break;
          }
        }
      }

      /* Clear buffer on Escape */
      if (key === 'Escape') {
        bufferRef.current  = [];
        wordBufRef.current = '';
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999]
                 flex flex-col items-center gap-2 pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0,  scale: 1   }}
            exit={  { opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="px-4 py-2 rounded-xl font-mono text-xs backdrop-blur-xl
                       bg-surface/90 border border-border
                       shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            style={{ color: t.color }}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
