'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CopyToast() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handler = () => {
            setShow(true);
            setTimeout(() => setShow(false), 3000);
        };

        document.addEventListener('copy', handler);
        return () => document.removeEventListener('copy', handler);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[9995]
                     px-5 py-3 rounded-xl font-mono text-xs
                     bg-surface/95 border border-border text-secondary
                     backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                     pointer-events-none"
                >
                    Taking inspiration? I respect that. ✌️
                </motion.div>
            )}
        </AnimatePresence>
    );
}
