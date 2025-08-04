import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { TestSessionProvider } from "@/context/TestSessionContext";
import Footer from '@/components/Footer';
// Google Fonts imports for Orbitron and IBM Plex Mono
import { Orbitron, IBM_Plex_Mono } from "next/font/google";
import Script from 'next/script';

const orbitron = Orbitron({ 
  subsets: ["latin"], 
  weight: ["700", "800"],
  display: 'swap',
  preload: true
});
const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ["latin"], 
  weight: ["400", "700"],
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: "Ultimate Mouse Performance Tester for Gamers, Streamers, and Hardware Enthusiasts",
  description: "Test mouse latency, polling rate & jitter like a pro. Built for gamers, developers & streamers. Real-time graphs, leaderboard & session analytics.",
  keywords: [
    "mouse latency tester",
    "polling rate test",
    "mouse jitter analysis",
    "gaming mouse performance",
    "click latency measurement",
    "mouse accuracy test",
    "input lag tester",
    "mouse response time",
    "gaming peripheral test",
    "mouse sensitivity calibration",
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
  },
  other: {
    'google-site-verification': 'VuktZVfop_TtmjmC2sfWPPIxZtK5ovyB8wKHpY4OFfY',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Mouse Tester Pro',
              url: 'https://mousetester.pro',
              description: 'Ultimate Mouse Performance Tester for Gamers, Streamers, and Hardware Enthusiasts. Test mouse latency, polling rate & jitter like a pro. Real-time graphs, leaderboard & session analytics.',
              sameAs: [
                'https://github.com/shashi123454/MouseTesterPro',
                'https://twitter.com/MouseTesterPro'
              ]
            }) 
          }} 
        />
      </head>
      {/* Google AdSense - Uncomment when approved */}
      {/* <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1310810766620297"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      /> */}
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-1XXFLDM2LL"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1XXFLDM2LL');
          `}
      </Script>
      {/* Performance Monitoring */}
      <Script id="web-vitals" strategy="afterInteractive">
        {`
          // Simple performance monitoring
          if (typeof window !== 'undefined') {
            window.addEventListener('load', () => {
              setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                  console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
                }
              }, 0);
            });
          }
        `}
      </Script>
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