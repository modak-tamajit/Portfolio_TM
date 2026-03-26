'use client';

import { useEffect } from 'react';

export default function ConsoleSecret() {
    useEffect(() => {
        console.log(
            '%c👀 Hey developer...',
            'font-size: 20px; font-weight: bold; color: #7c6af7; text-shadow: 0 0 10px rgba(124,106,247,0.5);'
        );
        console.log(
            '%cSince you\'re here:\n%cTry typing in the browser console: %cunlock("truth")',
            'font-size: 13px; color: #e4e4f0; font-family: "JetBrains Mono", monospace;',
            'font-size: 13px; color: #5a5a7a; font-family: "JetBrains Mono", monospace;',
            'font-size: 13px; color: #00ff88; font-weight: bold; font-family: "JetBrains Mono", monospace;'
        );
        console.log('%c─────────────────────────────────', 'color: #1e1e2e;');

        (window as unknown as Record<string, unknown>).unlock = (secret: string) => {
            if (secret === 'truth') {
                console.log('%c✓ Secret unlocked.', 'font-size: 14px; color: #00ff88; font-weight: bold;');
                console.log(
                    '%c"The best code is written at the intersection of curiosity and stubbornness.\nI don\'t build for the résumé. I build because the alternative — not building — feels worse.\nIf you read this far, you\'re one of my people."\n\n— Tamajit',
                    'font-size: 12px; color: #a899ff; font-style: italic; line-height: 1.6; font-family: "JetBrains Mono", monospace;'
                );
                console.log(
                    '%c🔑 Bonus: Try the Konami code (↑↑↓↓←→←→BA) or type "unlock soul" anywhere on the page.',
                    'font-size: 11px; color: #f7a06a;'
                );
                return '🔓 Truth revealed.';
            }
            console.log('%c✗ Unknown secret. Try: unlock("truth")', 'font-size: 12px; color: #ff5f57;');
            return '🔒 Locked.';
        };

        return () => {
            delete (window as unknown as Record<string, unknown>).unlock;
        };
    }, []);

    return null;
}
