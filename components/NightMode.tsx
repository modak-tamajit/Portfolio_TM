'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeySequence } from '@/hooks/useKeySequence';

export default function NightMode() {
    const [showToast, setShowToast] = useState(false);
    const [isNight, setIsNight] = useState(false);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 22 || hour < 5) {
            activateNight();
        }
    }, []);

    const activateNight = () => {
        if (isNight) return;
        setIsNight(true);
        document.documentElement.setAttribute('data-night', 'true');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
    };

    useKeySequence({ sequences: { 'night': activateNight } });

    return (
        <AnimatePresence>
            {showToast && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed top-8 left-1/2 -translate-x-1/2 z-[9996]
                     px-5 py-3 rounded-xl font-mono text-xs
                     bg-surface/95 border border-accent/20 text-accent-light
                     backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                     pointer-events-none"
                >
                    🌙 Late night builder, huh?
                </motion.div>
            )}
        </AnimatePresence>
    );
}
