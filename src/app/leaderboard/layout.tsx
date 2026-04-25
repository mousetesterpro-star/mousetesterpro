import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/leaderboard' },
  title: 'Mouse Latency Leaderboard | Top Test Results | MouseTester Pro',
  description: 'See the fastest mouse latency test results from gamers worldwide. Compare your mouse performance against the community leaderboard and find out where your setup ranks.',
};

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
