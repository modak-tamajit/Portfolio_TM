import type { Metadata, Viewport } from 'next';
import './globals.css';
import Dock from '@/components/Dock';
import EasterEgg from '@/components/EasterEgg';
import CursorFollower from '@/components/CursorFollower';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  metadataBase: new URL('https://tamajitmodak.com'),
  title: {
    default: 'Tamajit Modak — Systems Programmer & Builder',
    template: '%s · Tamajit Modak',
  },
  description:
    'Year 1 BCA student who built a terminal OS in C, engineers Swift apps, and wires full-stack products. Deeply curious. Always building.',
  keywords: ['Tamajit Modak', 'systems programmer', 'Swift developer', 'ForgeOS', 'BCA student', 'Parul University', 'portfolio'],
  authors: [{ name: 'Tamajit Modak', url: 'https://github.com/modak-tamajit' }],
  creator: 'Tamajit Modak',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website', locale: 'en_IN',
    title: 'Tamajit Modak — Systems Programmer & Builder',
    description: 'Year 1 BCA. Built an OS from scratch. Currently building Extracta in Swift.',
    siteName: 'Tamajit Modak',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tamajit Modak',
    description: 'Systems programmer. Builder. Curious human.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Tamajit Modak',
              url: 'https://tamajitmodak.com',
              jobTitle: 'Systems Programmer & Builder',
              sameAs: [
                'https://github.com/modak-tamajit',
                'https://linkedin.com/in/tamajit-modak-76938b169',
                'https://instagram.com/am_modak',
              ],
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Parul University',
              },
              knowsAbout: ['C', 'Swift', 'Systems Programming', 'Operating Systems', 'React', 'Next.js'],
            }),
          }}
        />
      </head>
      <body className="bg-bg text-primary font-body noise min-h-screen">
        {/* Ambient background glow */}
        <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[40%] w-[900px] h-[700px] bg-accent/[0.04] rounded-full blur-[140px]" />
          <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-tgreen/[0.02] rounded-full blur-[120px]" />
        </div>

        {/* Grid pattern */}
        <div aria-hidden="true" className="fixed inset-0 bg-grid pointer-events-none z-0" />

        {/* Custom cursor — desktop only */}
        <CursorFollower />

        {/* Page content with transitions */}
        <PageTransition>
          <main className="relative z-10 pb-28">{children}</main>
        </PageTransition>

        <Dock />
        <EasterEgg />
      </body>
    </html>
  );
}
