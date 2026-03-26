import type { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Hire Tamajit Modak',
    description: 'Interested in working together? Let\'s talk.',
    robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
