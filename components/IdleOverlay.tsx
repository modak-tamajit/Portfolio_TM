'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIdleDetector } from '@/hooks/useIdleDetector';

export default function IdleOverlay() {
    const [isIdle, setIsIdle] = useState(false);

    useIdleDetector({
        timeout: 25000,
        onIdle: () => setIsIdle(true),
        onActive: () => setIsIdle(false),
    });

    return (
        <AnimatePresence>
            {isIdle && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9990] flex items-center justify-center pointer-events-none"
                    style={{ background: 'rgba(10, 10, 15, 0.75)' }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-center"
                    >
                        <p className="font-mono text-sm text-secondary/70 tracking-wide">
                            Still there… or just observing?
                        </p>
                        <p className="font-mono text-[10px] text-secondary/30 mt-3">
                            move your mouse or press any key
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
