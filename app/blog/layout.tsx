import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'The other side',
  description: 'Shayari, photographs, and thoughts.',
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
