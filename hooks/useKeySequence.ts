import { useEffect, useRef } from 'react';

interface UseKeySequenceOptions {
    sequences: Record<string, () => void>;  // word → callback
    maxBuffer?: number;
}

export function useKeySequence({
    sequences,
    maxBuffer = 30,
}: UseKeySequenceOptions) {
    const bufferRef = useRef('');

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;

            if (key.length === 1 || key === ' ') {
                bufferRef.current = (
                    bufferRef.current + (key === ' ' ? ' ' : key)
                )
                    .slice(-maxBuffer)
                    .toLowerCase();

                for (const [word, callback] of Object.entries(sequences)) {
                    if (bufferRef.current.endsWith(word.toLowerCase())) {
                        callback();
                        bufferRef.current = '';
                        break;
                    }
                }
            }

            if (key === 'Escape') {
                bufferRef.current = '';
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [sequences, maxBuffer]);
}
