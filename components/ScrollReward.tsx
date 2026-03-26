'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
    '"The best way to predict the future is to build it." — Alan Kay',
    '"First, solve the problem. Then, write the code." — John Johnson',
    '"Talk is cheap. Show me the code." — Linus Torvalds',
    '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
];

export default function ScrollReward() {
    const [show, setShow] = useState(false);
    const triggeredRef = useRef(false);
    const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);

    const checkScroll = useCallback(() => {
        if (triggeredRef.current) return;
        if (typeof window === 'undefined') return;

        const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
        const scrollHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        );
        const clientHeight = window.innerHeight || document.documentElement.clientHeight;
        const scrollableDistance = scrollHeight - clientHeight;

        if (scrollableDistance < 200) return;

        const progress = scrollTop / scrollableDistance;

        if (progress >= 0.85) {
            triggeredRef.current = true;
            try { sessionStorage.setItem('scroll_reward_shown', 'true'); } catch { }
            setShow(true);
            setTimeout(() => setShow(false), 6000);
        }
    }, []);

    useEffect(() => {
        try {
            if (sessionStorage.getItem('scroll_reward_shown')) {
                triggeredRef.current = true;
                return;
            }
        } catch { }

        window.addEventListener('scroll', checkScroll, { passive: true });
        window.addEventListener('resize', checkScroll, { passive: true });

        const interval = setInterval(checkScroll, 2000);
        const timeout = setTimeout(checkScroll, 1000);

        return () => {
            window.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [checkScroll]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[9994]
                     w-[90vw] max-w-sm px-5 py-4 rounded-2xl
                     bg-surface/95 border border-accent/15
                     backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.7)]
                     pointer-events-none text-center"
                >
                    <p className="font-mono text-[10px] text-tgreen tracking-widest uppercase mb-2">
                        You actually made it here. Respect.
                    </p>
                    <p className="font-body text-xs text-secondary/70 italic leading-5">
                        {quote}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
