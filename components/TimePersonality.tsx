'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function getTimeGreeting(): { message: string; emoji: string } {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return { message: 'Starting fresh, I see.', emoji: '☀️' };
    if (hour >= 12 && hour < 17) return { message: 'Building in progress…', emoji: '⚡' };
    if (hour >= 17 && hour < 21) return { message: 'The golden hours of focus.', emoji: '🌅' };
    return { message: 'This is where real devs are made.', emoji: '🌙' };
}

export default function TimePersonality() {
    const [greeting, setGreeting] = useState<{ message: string; emoji: string } | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('time_greeting_shown')) return;
        sessionStorage.setItem('time_greeting_shown', 'true');

        const g = getTimeGreeting();
        setGreeting(g);

        const showTimer = setTimeout(() => setShow(true), 3000);
        const hideTimer = setTimeout(() => setShow(false), 7500);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    if (!greeting) return null;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="fixed top-6 left-1/2 -translate-x-1/2 z-[9994]
                     px-5 py-3 rounded-xl font-mono text-xs
                     bg-surface/95 border border-border text-secondary
                     backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                     pointer-events-none"
                >
                    {greeting.emoji} {greeting.message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
