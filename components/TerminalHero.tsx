'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Terminal sequence ─── */
const LINES = [
  { text: '$ ./tamajit --init',                      type: 'command' },
  { text: '> Loading profile...',                    type: 'output'  },
  { text: '> Systems programmer. Frontend builder.', type: 'output'  },
  { text: '> Year 1 BCA. Built an OS.',              type: 'output'  },
  { text: '[READY]',                                 type: 'ready'   },
] as const;

type LineType = (typeof LINES)[number]['type'];

interface CompletedLine {
  text: string;
  type: LineType;
}

interface Props {
  onComplete: () => void;
}

const CHAR_INTERVAL   = 38;   // ms per character
const LINE_PAUSE      = 550;  // ms between lines
const INITIAL_DELAY   = 700;  // ms before typing starts

export default function TerminalHero({ onComplete }: Props) {
  const [completedLines, setCompletedLines] = useState<CompletedLine[]>([]);
  const [currentText, setCurrentText]       = useState('');
  const [done, setDone]                     = useState(false);

  /* Refs to avoid stale closures */
  const lineIdxRef = useRef(0);
  const charIdxRef = useRef(0);
  const timerRef   = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    function tick() {
      const idx  = lineIdxRef.current;
      const cIdx = charIdxRef.current;
      const target = LINES[idx].text;

      if (cIdx < target.length) {
        charIdxRef.current += 1;
        setCurrentText(target.slice(0, charIdxRef.current));
        timerRef.current = setTimeout(tick, CHAR_INTERVAL + Math.random() * 20);
      } else {
        /* Line complete — commit it */
        const finished: CompletedLine = { text: target, type: LINES[idx].type };
        setCompletedLines((prev) => [...prev, finished]);
        setCurrentText('');
        charIdxRef.current = 0;
        lineIdxRef.current += 1;

        if (lineIdxRef.current < LINES.length) {
          timerRef.current = setTimeout(tick, LINE_PAUSE);
        } else {
          /* All lines done */
          timerRef.current = setTimeout(() => {
            setDone(true);
            onComplete();
          }, 900);
        }
      }
    }

    timerRef.current = setTimeout(tick, INITIAL_DELAY);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Text colour per line type */
  const lineClass = (type: LineType) => {
    switch (type) {
      case 'command': return 'text-primary/90';
      case 'output':  return 'text-primary/60';
      case 'ready':   return 'text-tgreen font-medium tracking-widest';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-[540px] mx-auto"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border
                      bg-surface/80 rounded-t-xl">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs font-mono text-secondary select-none">
          tamajit@portfolio ~ %
        </span>
      </div>

      {/* Terminal body */}
      <div
        className="rounded-b-xl px-6 py-5 font-mono text-sm leading-7
                   bg-[#0d1117] border border-t-0 border-border
                   shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                   min-h-[160px]"
      >
        {/* Completed lines */}
        {completedLines.map((line, i) => (
          <div key={i} className={lineClass(line.type)}>
            {line.text}
          </div>
        ))}

        {/* Currently typing line */}
        {!done && (
          <div className="text-primary/90">
            {currentText}
            <span className="terminal-cursor" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
