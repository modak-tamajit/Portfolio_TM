'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function HireRedirect() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        /* Capture UTM parameters into sessionStorage for later reference */
        const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
        const utmData: Record<string, string> = {};

        utmKeys.forEach((key) => {
            const value = searchParams.get(key);
            if (value) utmData[key] = value;
        });

        if (Object.keys(utmData).length > 0) {
            sessionStorage.setItem('utm_data', JSON.stringify(utmData));
        }

        /* Redirect to /contact */
        router.replace('/contact');
    }, [router, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <span className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                <p className="font-mono text-xs text-secondary/60">Redirecting…</p>
            </div>
        </div>
    );
}

export default function HirePage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <span className="font-mono text-xs text-secondary/40">Loading…</span>
                </div>
            }
        >
            <HireRedirect />
        </Suspense>
    );
}
