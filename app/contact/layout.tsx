import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Contact',
  description: "Reach out for internships, collaborations, or a conversation about operating systems.",
  alternates: { canonical: '/contact' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
