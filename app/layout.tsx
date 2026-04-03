import type { Metadata, Viewport } from 'next';
import './globals.css';
import Dock from '@/components/Dock';
import EasterEgg from '@/components/EasterEgg';
import CursorFollower from '@/components/CursorFollower';
import PageTransition from '@/components/PageTransition';
import { Analytics } from '@vercel/analytics/react';
import IdleOverlay from '@/components/IdleOverlay';
import RageClickFeedback from '@/components/RageClickFeedback';
import DevOverlay from '@/components/DevOverlay';
import NightMode from '@/components/NightMode';
import ConsoleSecret from '@/components/ConsoleSecret';
import FakeBug from '@/components/FakeBug';
import TimePersonality from '@/components/TimePersonality';
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});
import CopyToast from '@/components/CopyToast';
import ScrollReward from '@/components/ScrollReward';
import ChatBot from '@/components/ChatBot';
import PWAPrompt from '@/components/PWAPrompt';
import Footer from '@/components/Footer';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
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
      <body suppressHydrationWarning className={`bg-bg text-primary font-body noise min-h-screen ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
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
          <div className="flex flex-col min-h-screen">
            <main className="relative z-10 flex-grow pb-28">{children}</main>
            <Footer />
          </div>
        </PageTransition>

        <Dock />
        <EasterEgg />
        <IdleOverlay />
        <RageClickFeedback />
        <DevOverlay />
        <NightMode />
        <ConsoleSecret />
        <FakeBug />
        <TimePersonality />
        <CopyToast />
        <ScrollReward />
        <ChatBot />
        <PWAPrompt />
        <Analytics />
      </body>
    </html>
  );
}
