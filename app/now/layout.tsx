import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '/now · What I\'m doing right now',
  description: 'What Tamajit Modak is doing right now.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
