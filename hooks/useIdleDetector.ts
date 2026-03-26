import { useEffect, useRef, useCallback } from 'react';

interface UseIdleDetectorOptions {
    timeout?: number;       // ms before idle (default 25000)
    onIdle?: () => void;
    onActive?: () => void;
}

export function useIdleDetector({
    timeout = 25000,
    onIdle,
    onActive,
}: UseIdleDetectorOptions = {}) {
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const isIdleRef = useRef(false);

    const resetTimer = useCallback(() => {
        if (isIdleRef.current) {
            isIdleRef.current = false;
            onActive?.();
        }
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            isIdleRef.current = true;
            onIdle?.();
        }, timeout);
    }, [timeout, onIdle, onActive]);

    useEffect(() => {
        const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
        events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
        resetTimer(); // start timer

        return () => {
            events.forEach((e) => window.removeEventListener(e, resetTimer));
            clearTimeout(timerRef.current);
        };
    }, [resetTimer]);
}
