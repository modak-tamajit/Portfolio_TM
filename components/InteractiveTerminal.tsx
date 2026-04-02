'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import useSound from 'use-sound';
import { Volume2, VolumeX } from 'lucide-react';

/* ─────────────────────────────────────────────
   COMMAND REGISTRY
───────────────────────────────────────────── */
const HELP_TEXT = `
Available commands:

  help              show this message
  ls                list all sections
  ls projects       list projects
  cat about.md      read about me
  cat now.md        what I'm doing now
  open forgeos      go to ForgeOS project
  open pathpilot    go to PathPilot project
  open extracta     go to Extracta project
  open github       open GitHub profile
  open linkedin     open LinkedIn profile
  clear             clear terminal
  whoami            who is Tamajit?
  pwd               current location
  date              current date
  echo <text>       repeat after me
`.trim();

const WHOAMI = `tamajit-modak — systems programmer, frontend builder, Year 1 BCA.
Built an OS before building a resumé. Currently engineering Extracta in Swift.
Community Lead @ Google NXT Hub, Parul University.`;

interface Line {
  type: 'input' | 'output' | 'error' | 'success';
  content: string;
}

const INITIAL_LINES: Line[] = [
  { type: 'output', content: 'Welcome to the interactive shell. Type `help` to get started.' },
  { type: 'output', content: '─────────────────────────────────────────' },
];

export default function InteractiveTerminal() {
  const [lines, setLines] = useState<Line[]>(INITIAL_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [isMin, setIsMin] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Sound design
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [playTyping] = useSound('https://actions.google.com/sounds/v1/impacts/wood_hit_metal.ogg', { volume: 0.1, interrupt: true });

  // Load sound preference
  useEffect(() => {
    const saved = localStorage.getItem('terminal-sound');
    if (saved !== null) setIsSoundOn(saved === 'true');
  }, []);

  const toggleSound = () => {
    const next = !isSoundOn;
    setIsSoundOn(next);
    localStorage.setItem('terminal-sound', String(next));
  };

  /* Auto-scroll to bottom on new output */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const push = (line: Line) => setLines((prev) => [...prev, line]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const parts = cmd.split(/\s+/);
    const base = parts[0];
    const arg = parts.slice(1).join(' ');

    /* Log input */
    push({ type: 'input', content: raw.trim() });

    /* Add to history */
    setHistory((h) => [raw.trim(), ...h].slice(0, 50));
    setHistIdx(-1);

    /* ── Commands ── */
    if (!cmd) return;

    switch (base) {
      case 'help':
        push({ type: 'output', content: HELP_TEXT });
        break;

      case 'clear':
        setLines(INITIAL_LINES);
        break;

      case 'whoami':
        push({ type: 'success', content: WHOAMI });
        break;

      case 'pwd':
        push({ type: 'output', content: '/home/tamajit/portfolio' });
        break;

      case 'date':
        push({ type: 'output', content: new Date().toUTCString() });
        break;

      case 'ls':
        if (arg === 'projects') {
          push({ type: 'output', content: 'drwxr-xr-x  forgeos/\ndrwxr-xr-x  pathpilot/\ndrwxr-xr-x  extracta/' });
        } else {
          push({ type: 'output', content: 'home/\nabout/\nprojects/\ncontact/\nnow/\nblog/' });
        }
        break;

      case 'cat':
        if (arg === 'about.md') {
          push({
            type: 'output',
            content:
              '# Tamajit Modak\n\nBengali. Systems programmer. Year 1 BCA at Parul University.\nBuilt ForgeOS — a ~3,500 line terminal OS in C11.\nCurrently building Extracta in Swift.\nCommunity Lead @ Google NXT Hub.\n\nAsk me about: C, Swift, Next.js, operating systems, chai.',
          });
        } else if (arg === 'now.md') {
          push({
            type: 'output',
            content:
              '# Now\n\nBuilding: Extracta (SwiftUI + Vision framework)\nLearning: German, guitar\nReading: The Pragmatic Programmer\nThinking about: AI and the value of systems literacy',
          });
        } else if (arg) {
          push({ type: 'error', content: `cat: ${arg}: No such file or directory` });
        } else {
          push({ type: 'error', content: 'cat: missing operand. Try `cat about.md`' });
        }
        break;

      case 'open':
        if (arg === 'forgeos') {
          push({ type: 'success', content: 'Opening ForgeOS project page…' });
          setTimeout(() => router.push('/projects/forgeos'), 600);
        } else if (arg === 'pathpilot') {
          push({ type: 'success', content: 'Opening PathPilot project page…' });
          setTimeout(() => router.push('/projects/pathpilot'), 600);
        } else if (arg === 'extracta') {
          push({ type: 'success', content: 'Opening Extracta project page…' });
          setTimeout(() => router.push('/projects/extracta'), 600);
        } else if (arg === 'github') {
          push({ type: 'success', content: 'Opening GitHub…' });
          setTimeout(() => window.open('https://github.com/modak-tamajit', '_blank'), 400);
        } else if (arg === 'linkedin') {
          push({ type: 'success', content: 'Opening LinkedIn…' });
          setTimeout(() => window.open('https://linkedin.com/in/tamajit-modak-76938b169', '_blank'), 400);
        } else {
          push({ type: 'error', content: `open: unknown target '${arg}'. Try: forgeos, pathpilot, extracta, github, linkedin` });
        }
        break;

      case 'echo':
        push({ type: 'output', content: arg || '' });
        break;

      default:
        push({ type: 'error', content: `command not found: ${base}\nBut curiosity found 👀 — type 'help' to see what's possible.` });
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isSoundOn && e.key.length === 1 && e.key !== 'Enter') {
      playTyping();
    }
    
    if (e.key === 'Enter') {
      if (isSoundOn) playTyping();
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      /* Basic tab completion */
      const COMPLETIONS = [
        'help', 'ls', 'ls projects', 'cat about.md', 'cat now.md',
        'open forgeos', 'open pathpilot', 'open extracta', 'open github', 'open linkedin',
        'clear', 'whoami', 'pwd', 'date', 'echo ',
      ];
      const match = COMPLETIONS.find((c) => c.startsWith(input) && c !== input);
      if (match) setInput(match);
    }
  };

  const lineColor = (type: Line['type']) => {
    switch (type) {
      case 'input': return 'text-primary/90';
      case 'output': return 'text-primary/60';
      case 'success': return 'text-tgreen';
      case 'error': return 'text-red-400/80';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[580px] mx-auto px-1 sm:px-0"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border
                      bg-surface/90 rounded-t-xl">
        {/* Traffic lights */}
        <button
          onClick={() => setLines(INITIAL_LINES)}
          className="w-3 h-3 rounded-full bg-[#ff5f57] hover:opacity-80 transition-opacity"
          title="Clear"
        />
        <button
          onClick={() => setIsMin((v) => !v)}
          className="w-3 h-3 rounded-full bg-[#febc2e] hover:opacity-80 transition-opacity"
          title="Minimise"
        />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs font-mono text-secondary select-none">
          tamajit@portfolio ~ %
        </span>
        <div className="ml-auto flex items-center gap-3">
          <button 
            onClick={toggleSound} 
            className="text-secondary/40 hover:text-secondary/80 transition-colors"
            title={isSoundOn ? "Mute typing sound" : "Enable typing sound"}
          >
            {isSoundOn ? <Volume2 size={12} /> : <VolumeX size={12} />}
          </button>
          <span className="text-[10px] font-mono text-secondary/40">
            interactive shell v2
          </span>
        </div>
      </div>

      {/* Terminal body */}
      <AnimatePresence initial={false}>
        {!isMin && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              className="rounded-b-xl bg-[#0d1117] border border-t-0 border-border
                         shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Output area */}
              <div className="px-3 sm:px-5 pt-3 sm:pt-4 pb-2 font-mono text-xs sm:text-sm leading-6 sm:leading-7
                              max-h-[200px] sm:max-h-[280px] overflow-y-auto">
                {lines.map((line, i) => (
                  <div key={i} className={lineColor(line.type)}>
                    {line.type === 'input' && (
                      <span className="text-tgreen mr-2 select-none">❯</span>
                    )}
                    <span className="whitespace-pre-wrap">{line.content}</span>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input row */}
              <div className="flex items-center gap-2 px-3 sm:px-5 pb-3 sm:pb-4 pt-1 font-mono text-xs sm:text-sm border-t border-border/40">
                <span className="text-tgreen select-none">❯</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="type a command…"
                  className="flex-1 bg-transparent text-primary/90 outline-none
                             placeholder:text-secondary/30 caret-tgreen"
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
