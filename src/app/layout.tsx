import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { TestSessionProvider } from "@/context/TestSessionContext";
import Footer from '@/components/Footer';
// Google Fonts imports for Orbitron and IBM Plex Mono
import { Orbitron, IBM_Plex_Mono } from "next/font/google";
import Head from 'next/head';

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700", "800"] });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Ultimate Mouse Performance Tester for Gamers, Streamers, and Hardware Enthusiasts",
  description: "Test mouse latency, polling rate & jitter like a pro. Built for gamers, developers & streamers. Real-time graphs, leaderboard & session analytics.",
  keywords: [
    // Gamer & Esports
    "mouse latency test for gaming",
    "gaming mouse performance tester",
    "polling rate checker for gamers",
    "eSports mouse tuning tool",
    "best mouse settings for CS:GO / Valorant / Fortnite",
    "pro gamer mouse test site",
    "click latency for FPS games",
    "wired vs wireless mouse performance",
    "gaming mouse accuracy test",
    "competitive mouse analyzer",
    // Streamers & Content Creators
    "mouse testing for streamers",
    "OBS input lag test tools",
    "test gaming mouse while streaming",
    "optimize latency for live streams",
    "streamer gear benchmark",
    "gaming gear review tool",
    "mouse benchmark tool for YouTubers",
    "live latency graph overlay",
    // Developers & Hardware Testers
    "browser mouse latency tool",
    "web-based polling rate graph",
    "JavaScript mouse input analysis",
    "USB polling analyzer online",
    "hardware latency measurement tools",
    "click latency with performance.now",
    "dev tools for mouse testing",
    "create mouse test with HTML5",
    // Advanced Benchmark & DIY Tech
    "jitter test for gaming mouse",
    "advanced polling analysis",
    "test mouse drift pattern",
    "best port for gaming mouse",
    "USB port latency comparison",
    "benchmark gaming peripherals",
    "mouse test with Supabase backend",
    "multi-mouse side-by-side testing",
    "gamer mouse scoring system",
    "input lag testing online",
    // Community Features / SEO Boosters
    "global mouse test leaderboard",
    "pro gaming gear scoreboard",
    "share mouse test session",
    "best gaming mouse by latency",
    "wireless vs wired mouse leaderboard",
    "test my mouse and compare globally",
    "submit your gear performance",
    "gaming mouse stats tracker",
    // Long-Tail SEO
    "How to test your gaming mouse latency online",
    "Browser-based polling rate graph for competitive gaming",
    "Best mouse performance test tools in 2025",
    "Compare gaming mouse jitter stability without software",
    "How to test mouse click delay on browser",
    "Measure mouse drift and click accuracy",
    "Does USB port affect mouse latency?"
  ],
  openGraph: {
    title: "Pro-Level Mouse Performance Tester – Latency, Polling, Jitter & More",
    description: "Level up your gear testing. Get real-time mouse metrics with advanced tools built for gamers, creators, and hardware pros.",
    images: [
      {
        url: "/og-image.png",
        alt: "Dark neon-style dashboard UI with polling rate graph, latency meter, and score breakdown card — designed like a competitive gaming HUD."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro-Level Mouse Performance Tester – Latency, Polling, Jitter & More",
    description: "Level up your gear testing. Get real-time mouse metrics with advanced tools built for gamers, creators, and hardware pros.",
    images: [
      "/og-image.png"
    ],
    site: "@MouseTesterPro"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Mouse Tester Pro',
          url: 'https://mousetester.pro',
          description: 'Ultimate Mouse Performance Tester for Gamers, Streamers, and Hardware Enthusiasts. Test mouse latency, polling rate & jitter like a pro. Real-time graphs, leaderboard & session analytics.',
          sameAs: [
            'https://github.com/shashi123454/MouseTesterPro',
            'https://twitter.com/MouseTesterPro'
          ]
        }) }} />
      </Head>
      <body className={`${orbitron.className} ${ibmPlexMono.className} bg-[#0D0D0D] min-h-screen flex flex-col`}>
        <TestSessionProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </TestSessionProvider>
      </body>
    </html>
  );
}