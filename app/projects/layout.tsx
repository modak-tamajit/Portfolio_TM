import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Projects',
  description: 'ForgeOS, PathPilot, and Extracta — real projects with real decisions.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
