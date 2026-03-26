'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FakeBug() {
    const [isGlitching, setIsGlitching] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const roll = Math.random();
        if (roll > 0.015) return;

        const delay = 8000 + Math.random() * 12000;
        const timer = setTimeout(() => {
            setIsGlitching(true);
            setTimeout(() => {
                setIsGlitching(false);
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 3500);
            }, 1500);
        }, delay);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {isGlitching && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9989] pointer-events-none"
                    >
                        <div className="absolute inset-0 overflow-hidden">
                            {[15, 35, 55, 72, 88].map((top) => (
                                <motion.div
                                    key={top}
                                    animate={{ x: [0, -4, 6, -2, 0], opacity: [0, 1, 0.8, 1, 0] }}
                                    transition={{ duration: 1.5, ease: 'linear' }}
                                    className="absolute left-0 right-0 h-[2px] bg-accent/20"
                                    style={{ top: `${top}%` }}
                                />
                            ))}
                        </div>
                        <motion.div
                            animate={{ x: [0, 3, -2, 1, 0] }}
                            transition={{ duration: 0.3, repeat: 3 }}
                            className="absolute inset-0 mix-blend-screen opacity-[0.04]"
                            style={{
                                background: 'linear-gradient(90deg, rgba(255,0,0,0.3), transparent, rgba(0,0,255,0.3))',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[9995]
                       px-5 py-3 rounded-xl font-mono text-xs
                       bg-surface/95 border border-accent/20 text-accent-light
                       backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                       pointer-events-none"
                    >
                        Relax. I break things on purpose.
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
