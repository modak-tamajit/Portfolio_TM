'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeySequence } from '@/hooks/useKeySequence';

const TECH_STACK = [
    { label: 'Framework', value: 'Next.js 14.2 (App Router)' },
    { label: 'Styling', value: 'Tailwind CSS 3.4' },
    { label: 'Animation', value: 'Framer Motion 11' },
    { label: 'Language', value: 'TypeScript 5' },
    { label: 'Fonts', value: 'Syne · DM Sans · JetBrains Mono' },
    { label: 'Analytics', value: 'Vercel Analytics' },
    { label: 'Deployment', value: 'Vercel' },
];

const DEBUG_LINES = [
    '> All systems nominal',
    '> Easter eggs: 13 active',
    '> Hidden pages: /now, /blog, /dashboard',
    '> Konami code: armed ✓',
    '> Word triggers: 6 registered',
    `> Built: ${new Date().toISOString().split('T')[0]}`,
    '> Bundle: optimized',
    '> Performance: 💯',
];

export default function DevOverlay() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = useCallback(() => setIsOpen((v) => !v), []);

    useKeySequence({ sequences: { '/dev': toggle } });

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9992] flex items-center justify-center p-4"
                    style={{ background: 'rgba(10, 10, 15, 0.85)' }}
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full max-w-lg rounded-2xl border border-border
                       bg-surface/95 backdrop-blur-2xl overflow-hidden
                       shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-tgreen animate-pulse" />
                                <span className="font-mono text-xs text-tgreen tracking-widest uppercase">
                                    Developer Mode
                                </span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="font-mono text-xs text-secondary hover:text-primary transition-colors"
                            >
                                ESC
                            </button>
                        </div>

                        <div className="px-5 py-4 border-b border-border/50">
                            <h3 className="font-mono text-[10px] text-secondary/60 tracking-widest uppercase mb-3">
                                Tech Stack
                            </h3>
                            <div className="space-y-1.5">
                                {TECH_STACK.map((item) => (
                                    <div key={item.label} className="flex items-center justify-between">
                                        <span className="font-mono text-xs text-secondary">{item.label}</span>
                                        <span className="font-mono text-xs text-primary/70">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="px-5 py-4">
                            <h3 className="font-mono text-[10px] text-secondary/60 tracking-widest uppercase mb-3">
                                System
                            </h3>
                            <div className="space-y-1 font-mono text-[11px] text-tgreen/70">
                                {DEBUG_LINES.map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                    >
                                        {line}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="px-5 py-3 border-t border-border/40">
                            <p className="font-mono text-[10px] text-secondary/30 text-center">
                                Type /dev again or press ESC to close
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
