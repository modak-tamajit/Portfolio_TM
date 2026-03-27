'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import PageTransition from '@/components/PageTransition';

export default function Dashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for auth
        if (typeof window !== 'undefined' && localStorage.getItem('dashboard_auth') === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetch('/api/analytics')
                .then(res => res.json())
                .then(data => {
                    setStats(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch stats:', err);
                    setLoading(false);
                });
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const correctPassword = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || 'hireme';
        
        if (password === correctPassword) {
            localStorage.setItem('dashboard_auth', 'true');
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Incorrect password. Hint: Try "hireme"');
        }
    };

    if (!isAuthenticated) {
        return (
            <PageTransition>
                <div className="min-h-screen flex items-center justify-center px-4">
                    <motion.form 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleLogin}
                        className="flex flex-col items-center gap-6 max-w-sm w-full p-8 border border-border bg-surface/30 rounded-2xl backdrop-blur-md"
                    >
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent/10 mb-2">
                            <LockIcon />
                        </div>
                        <div className="text-center">
                            <h1 className="font-display text-2xl font-bold text-primary mb-2">Private Dashboard</h1>
                            <p className="font-mono text-xs text-secondary/60">Enter password to view analytics</p>
                        </div>

                        <div className="w-full flex justify-center flex-col gap-2">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password..."
                                className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 font-mono text-sm text-primary focus:outline-none focus:border-accent transition-colors"
                                autoFocus
                            />
                            {error && <p className="font-mono text-[10px] text-red-400 self-start">{error}</p>}
                        </div>

                        <MagneticButton
                            as="button"
                            className="w-full py-3 rounded-xl bg-primary text-bg font-display font-semibold text-sm hover:scale-[1.02] transition-transform"
                        >
                            Unlock
                        </MagneticButton>
                    </motion.form>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="min-h-screen pt-24 pb-12 px-6 max-w-5xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <motion.h1 
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                            className="font-display text-4xl font-bold text-primary mb-2"
                        >
                            Analytics
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                            className="font-mono text-xs text-secondary"
                        >
                            <span className="text-accent">●</span> Live data from Vercel Web Analytics
                        </motion.p>
                    </div>

                    <motion.button
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        onClick={() => { localStorage.removeItem('dashboard_auth'); setIsAuthenticated(false); }}
                        className="font-mono text-xs text-secondary/50 hover:text-red-400 transition-colors underline underline-offset-4"
                    >
                        Lock Dashboard
                    </motion.button>
                </header>

                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <span className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {/* Total Visitors Card */}
                        <div className="md:col-span-3 lg:col-span-1 p-6 rounded-2xl border border-border bg-surface/20 flex flex-col gap-4">
                            <h2 className="font-mono text-xs text-secondary uppercase tracking-wider">Total Visitors</h2>
                            <p className="font-display text-5xl font-bold text-primary">
                                {stats?.visitors?.toLocaleString() || 0}
                            </p>
                            {stats?.mockData && <p className="font-mono text-[10px] text-yellow-500/80 mt-auto pt-4 border-t border-border/50">Showing mock data. Configure API tokens.</p>}
                        </div>

                        {/* Top Pages */}
                        <div className="lg:col-span-1 p-6 rounded-2xl border border-border bg-surface/20">
                            <h2 className="font-mono text-xs text-secondary uppercase tracking-wider mb-6">Top Pages</h2>
                            <div className="flex flex-col gap-4">
                                {stats?.topPages?.map((page: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <span className="font-mono text-sm text-primary/80 truncate pr-4">{page.path}</span>
                                        <span className="font-mono text-sm text-secondary">{page.views?.toLocaleString()}</span>
                                    </div>
                                ))}
                                {(!stats?.topPages || stats?.topPages.length === 0) && (
                                    <p className="font-mono text-sm text-secondary/40">No data available.</p>
                                )}
                            </div>
                        </div>

                        {/* Top Referrers */}
                        <div className="lg:col-span-1 p-6 rounded-2xl border border-border bg-surface/20">
                            <h2 className="font-mono text-xs text-secondary uppercase tracking-wider mb-6">Top Referrers</h2>
                            <div className="flex flex-col gap-4">
                                {stats?.referrers?.map((ref: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between gap-4">
                                        <span className="font-mono text-sm text-primary/80 truncate">{ref.referrer || 'Direct'}</span>
                                        <span className="font-mono text-sm text-secondary shrink-0">{ref.views?.toLocaleString()}</span>
                                    </div>
                                ))}
                                {(!stats?.referrers || stats?.referrers.length === 0) && (
                                    <p className="font-mono text-sm text-secondary/40">No data available.</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </PageTransition>
    );
}

const LockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-accent">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0110 0v4"></path>
    </svg>
);
