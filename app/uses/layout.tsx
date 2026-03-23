import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '/uses · Setup & Tools',
  description: 'The hardware, software, and tools Tamajit Modak uses daily.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
