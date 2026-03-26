'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRageClick } from '@/hooks/useRageClick';

const MESSAGES = [
    'Easy there, tiger. 🐯',
    'That button has feelings, you know.',
    'Rage clicking won\'t make it faster.',
    'I admire the persistence.',
    'Try the Konami code instead? ↑↑↓↓←→←→BA',
];

export default function RageClickFeedback() {
    const isRaging = useRageClick({ threshold: 5, interval: 600 });
    const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

    return (
        <AnimatePresence>
            {isRaging && (
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[9995]
                     px-5 py-3 rounded-xl font-mono text-xs
                     bg-surface/95 border border-warm/30 text-warm
                     backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                     pointer-events-none"
                >
                    <motion.span
                        animate={{ x: [0, -3, 3, -2, 2, 0] }}
                        transition={{ duration: 0.4 }}
                    >
                        {message}
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
