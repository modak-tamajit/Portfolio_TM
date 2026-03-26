import { useEffect, useRef, useState } from 'react';

interface UseRageClickOptions {
    threshold?: number;  // clicks needed (default 5)
    interval?: number;   // max ms between clicks (default 600)
    cooldown?: number;   // ms before reset (default 3000)
}

export function useRageClick({
    threshold = 5,
    interval = 600,
    cooldown = 3000,
}: UseRageClickOptions = {}) {
    const [isRaging, setIsRaging] = useState(false);
    const clickTimesRef = useRef<number[]>([]);
    const cooldownRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        const handler = () => {
            const now = Date.now();
            clickTimesRef.current.push(now);

            // Keep only recent clicks within interval window
            clickTimesRef.current = clickTimesRef.current.filter(
                (t) => now - t < interval * threshold
            );

            if (clickTimesRef.current.length >= threshold) {
                // Check that last N clicks happened within interval of each other
                const recent = clickTimesRef.current.slice(-threshold);
                const span = recent[recent.length - 1] - recent[0];
                if (span < interval * (threshold - 1)) {
                    setIsRaging(true);
                    clickTimesRef.current = [];
                    clearTimeout(cooldownRef.current);
                    cooldownRef.current = setTimeout(() => setIsRaging(false), cooldown);
                }
            }
        };

        window.addEventListener('click', handler);
        return () => {
            window.removeEventListener('click', handler);
            clearTimeout(cooldownRef.current);
        };
    }, [threshold, interval, cooldown]);

    return isRaging;
}
