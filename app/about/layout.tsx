import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'About',
  description: 'Bengali systems programmer. Builds OSes before resumés. Year 1 BCA student at Parul University.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
