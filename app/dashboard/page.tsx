'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DASHBOARD_PASSWORD = 'tamajit2026';

/* ─── Mock analytics data ─── */
const STATS = [
    { label: 'Total Visitors', value: '2,847', change: '+12.4%', color: '#7c6af7' },
    { label: 'Page Views', value: '8,312', change: '+8.7%', color: '#00ff88' },
    { label: 'Avg. Session', value: '2m 41s', change: '+3.2%', color: '#f7a06a' },
    { label: 'Bounce Rate', value: '34.2%', change: '-2.1%', color: '#a899ff' },
];

const TOP_PAGES = [
    { path: '/', views: 3420, pct: 100 },
    { path: '/projects', views: 2180, pct: 64 },
    { path: '/about', views: 1640, pct: 48 },
    { path: '/contact', views: 890, pct: 26 },
    { path: '/uses', views: 420, pct: 12 },
    { path: '/now', views: 67, pct: 2 },
    { path: '/blog', views: 23, pct: 1 },
];

const TOP_REFERRERS = [
    { source: 'github.com', visits: 812, color: '#e4e4f0' },
    { source: 'linkedin.com', visits: 634, color: '#0a66c2' },
    { source: 'google.com', visits: 421, color: '#00ff88' },
    { source: 'twitter.com', visits: 198, color: '#1da1f2' },
    { source: 'direct', visits: 782, color: '#7c6af7' },
];

const RECENT_ACTIVITY = [
    { time: '2 min ago', event: 'Visitor from San Francisco viewed /projects', color: '#7c6af7' },
    { time: '8 min ago', event: 'Visitor from Bangalore triggered Konami code → /now', color: '#00ff88' },
    { time: '15 min ago', event: 'Visitor from Berlin viewed /about', color: '#f7a06a' },
    { time: '22 min ago', event: 'Visitor via LinkedIn viewed /contact', color: '#a899ff' },
    { time: '31 min ago', event: 'Visitor typed "unlock soul" → /blog', color: '#f7a06a' },
    { time: '1 hr ago', event: 'Visitor from Tokyo viewed /projects → ForgeOS', color: '#00ff88' },
];

export default function DashboardPage() {
    const [authed, setAuthed] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === DASHBOARD_PASSWORD) {
            setAuthed(true);
            setError(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    if (!authed) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-sm"
                >
                    <div className="text-center mb-8">
                        <span className="font-mono text-xs text-secondary/50 tracking-widest uppercase">
                            private
                        </span>
                        <h1 className="font-display font-extrabold text-3xl text-primary mt-2">
                            Dashboard
                        </h1>
                        <p className="font-mono text-xs text-secondary mt-2">
                            Enter the password to continue.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            autoFocus
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border
                         text-primary/90 font-mono text-sm placeholder:text-secondary/40
                         focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20
                         transition-all duration-200"
                        />

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl font-display font-semibold text-sm text-white
                         bg-accent hover:bg-accent-light transition-colors duration-200
                         shadow-[0_0_30px_rgba(124,106,247,0.3)]"
                        >
                            {error ? 'Wrong password' : 'Unlock →'}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-20 max-w-6xl mx-auto">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10"
            >
                <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-accent/60 tracking-widest uppercase">
                        private · /dashboard
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-tgreen animate-pulse" />
                        <span className="font-mono text-xs text-tgreen">Live</span>
                    </span>
                </div>
                <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight
                       text-primary leading-none">
                    Analytics <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="mt-3 text-secondary font-mono text-xs">
                    Mock data · Connect Vercel Analytics API for real numbers
                </p>
            </motion.div>

            {/* Stats cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
                {STATS.map((stat) => (
                    <div
                        key={stat.label}
                        className="p-5 rounded-2xl border border-border bg-surface/60
                       hover:bg-surface-2 transition-all duration-300"
                    >
                        <span className="font-mono text-[10px] tracking-widest uppercase text-secondary">
                            {stat.label}
                        </span>
                        <div className="flex items-end gap-2 mt-2">
                            <span className="font-display font-extrabold text-3xl text-primary">
                                {stat.value}
                            </span>
                            <span
                                className="font-mono text-xs mb-1"
                                style={{ color: stat.change.startsWith('+') ? '#00ff88' : '#f7a06a' }}
                            >
                                {stat.change}
                            </span>
                        </div>
                        <div className="mt-3 h-1 rounded-full bg-surface-3 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '65%' }}
                                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                                className="h-full rounded-full"
                                style={{ background: stat.color }}
                            />
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Main grid */}
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">

                {/* Top pages */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="p-6 rounded-2xl border border-border bg-surface/60"
                >
                    <h2 className="font-display font-bold text-lg text-primary mb-5">Top Pages</h2>
                    <div className="space-y-3">
                        {TOP_PAGES.map((page, i) => (
                            <div key={page.path} className="flex items-center gap-3">
                                <span className="font-mono text-xs text-secondary/50 w-4 text-right">
                                    {i + 1}
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-mono text-sm text-primary/80">{page.path}</span>
                                        <span className="font-mono text-xs text-secondary">
                                            {page.views.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${page.pct}%` }}
                                            transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: 'easeOut' }}
                                            className="h-full rounded-full"
                                            style={{
                                                background: i === 0
                                                    ? 'linear-gradient(90deg, #7c6af7, #a899ff)'
                                                    : i < 3
                                                        ? '#7c6af7'
                                                        : '#2e2e42',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right column */}
                <div className="space-y-6">

                    {/* Top referrers */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="p-6 rounded-2xl border border-border bg-surface/60"
                    >
                        <h2 className="font-display font-bold text-lg text-primary mb-5">Top Referrers</h2>
                        <div className="space-y-3">
                            {TOP_REFERRERS.map((ref) => (
                                <div
                                    key={ref.source}
                                    className="flex items-center justify-between py-2 border-b border-border/40 last:border-none"
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="w-2 h-2 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: ref.color }}
                                        />
                                        <span className="font-mono text-sm text-primary/80">{ref.source}</span>
                                    </div>
                                    <span className="font-mono text-xs text-secondary">{ref.visits}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* UTM tracking */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="p-6 rounded-2xl border border-border bg-surface/60"
                    >
                        <h2 className="font-display font-bold text-lg text-primary mb-3">UTM Links</h2>
                        <p className="font-mono text-xs text-secondary mb-4">Track outreach channels</p>
                        <div className="space-y-2">
                            {[
                                { label: 'LinkedIn', url: '/hire?utm_source=linkedin' },
                                { label: 'Cold Email', url: '/hire?utm_source=cold-email' },
                                { label: 'Twitter', url: '/hire?utm_source=twitter' },
                            ].map((link) => (
                                <div
                                    key={link.label}
                                    className="flex items-center justify-between py-2 px-3 rounded-lg
                             bg-surface-2 border border-border/40"
                                >
                                    <span className="font-mono text-xs text-primary/70">{link.label}</span>
                                    <span className="font-mono text-[10px] text-secondary/50 break-all">{link.url}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 p-6 rounded-2xl border border-border bg-surface/60"
            >
                <h2 className="font-display font-bold text-lg text-primary mb-5">Recent Activity</h2>
                <div className="space-y-4">
                    {RECENT_ACTIVITY.map((activity, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="flex-shrink-0 flex flex-col items-center mt-1">
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: activity.color }}
                                />
                                {i < RECENT_ACTIVITY.length - 1 && (
                                    <div className="w-px h-8 bg-border mt-1" />
                                )}
                            </div>
                            <div className="flex-1 pb-1">
                                <p className="font-body text-sm text-primary/70 leading-6">{activity.event}</p>
                                <span className="font-mono text-[10px] text-secondary/40">{activity.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Footer */}
            <div className="mt-10 text-center">
                <p className="font-mono text-[10px] text-secondary/30">
                    This dashboard is a talking point, not just a tool.
                </p>
            </div>
        </div>
    );
}
