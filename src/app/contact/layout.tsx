import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | MouseTester Pro',
  description: 'Get in touch with the MouseTester Pro team. Send us feedback, report issues, or ask questions about mouse latency testing and gaming performance optimization.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
