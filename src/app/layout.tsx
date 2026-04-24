import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { TestSessionProvider } from "@/context/TestSessionContext";
import Footer from '@/components/Footer';
// Google Fonts imports for Orbitron and IBM Plex Mono
import { Orbitron, IBM_Plex_Mono } from "next/font/google";
import Script from 'next/script';
import DynamicCanonical from "@/components/DynamicCanonical";

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
  title: "Mouse Latency Test - Check Input Delay For Free",
  description: "Test mouse latency instantly - no download needed! Get accurate click delay results in seconds. Perfect for gaming performance optimization.",
  keywords: [
    "mouse latency test",
    "mouse click latency test online",
    "free mouse latency test",
    "gaming mouse performance test",
    "mouse polling rate test",
    "mouse jitter test",
    "mouse response time test",
    "input lag test",
    "click speed test",
    "competitive gaming mouse test",
    "mouse debounce test",
    "mouse accuracy test"
  ],
  openGraph: {
    title: "Desktop Mouse Latency Test [2026] | Free Gaming Mouse Tester",
    description: "Test mouse latency on desktop instantly. Free gaming mouse tester with CPS test, polling rate & input lag analysis. Professional results in seconds.",
    url: "https://mousetesterpro.com",
    siteName: "Mouse Tester Pro",
    images: [
      {
        url: "https://mousetesterpro.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Professional mouse latency tester dashboard with real-time performance metrics, polling rate graphs, and gaming-focused interface"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Desktop Mouse Latency Test [2026] | Free Gaming Mouse Tester",
    description: "Test mouse latency on desktop instantly. Free gaming mouse tester with CPS test, polling rate & input lag analysis. Professional results in seconds.",
    images: [
      "https://mousetesterpro.com/og-image.png"
    ],
    site: "@MouseTesterPro",
    creator: "@MouseTesterPro"
  },
  other: {
    'google-site-verification': 'Mk-_ipPpCWLnAYDW9V_Rp6P8BIwGURE8Vvceebi47Uw',
    'google-adsense-account': 'ca-pub-7765938871336081',
    'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    'referrer': 'origin-when-cross-origin',
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://tpc.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://tpc.googlesyndication.com" />
        <meta name="google-adsense-account" content="ca-pub-7765938871336081" />
        {/*<link rel="canonical" href="https://mousetesterpro.com" />*/}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['WebSite', 'SoftwareApplication'],
              name: 'Mouse Tester Pro',
              alternateName: 'MouseTesterPro',
              url: 'https://mousetesterpro.com',
              description: 'Test your mouse latency, click speed & polling rate FREE online. Professional gaming mouse performance tester for gamers worldwide.',
              applicationCategory: 'UtilitiesApplication',
              operatingSystem: 'Any',
              browserRequirements: 'Requires JavaScript. Requires HTML5.',
              inLanguage: 'en-US',
              isAccessibleForFree: true,
              author: {
                '@type': 'Organization',
                name: 'Mouse Tester Pro'
              },
              publisher: {
                '@type': 'Organization',
                name: 'Mouse Tester Pro',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://mousetesterpro.com/logo.webp'
                }
              },
              screenshot: {
                '@type': 'ImageObject',
                url: 'https://mousetesterpro.com/og-image.png',
                description: 'Mouse Tester Pro interface showing latency test results'
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock'
              },
              featureList: 'Mouse Latency Test, Polling Rate Test, Jitter Analysis, Click Speed Test, Response Time Measurement, Performance Leaderboard',
              keywords: 'mouse latency test, polling rate, input lag, gaming mouse test, CPS test, jitter test',
              potentialAction: {
                '@type': 'UseAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://mousetesterpro.com',
                  actionPlatform: [
                    'http://schema.org/DesktopWebPlatform',
                    'http://schema.org/MobileWebPlatform'
                  ]
                },
                name: 'Test Mouse Latency'
              },
              hasPart: [
                {
                  '@type': 'SoftwareApplication',
                  name: 'Click Latency Test',
                  description: 'Measure mouse response time and click accuracy',
                  applicationCategory: 'UtilitiesApplication',
                  operatingSystem: 'Any'
                },
                {
                  '@type': 'SoftwareApplication',
                  name: 'Polling Rate Test',
                  description: 'Test mouse polling rate and jitter analysis',
                  applicationCategory: 'UtilitiesApplication',
                  operatingSystem: 'Any'
                },
                {
                  '@type': 'SoftwareApplication',
                  name: 'Mobile Tap Test',
                  description: 'Test touch screen response time and accuracy',
                  applicationCategory: 'UtilitiesApplication',
                  operatingSystem: 'Any'
                }
              ],
              sameAs: [
                'https://github.com/shashi123454/MouseTesterPro',
                'https://twitter.com/MouseTesterPro'
              ]
            })
          }}
        />
        {/* FAQPage JSON-LD removed from root layout — lives only in /faq/page.tsx */}
        {/* Having it here caused GSC "duplicate FAQPage" error across all pages */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Mouse Latency Test | Accurate Online Tool',
              description: 'Test mouse latency, input lag, and click delay instantly online. Accurate, free, and easy-to-use tool for gamers & tech users.',
              url: 'https://mousetesterpro.com',
              mainEntity: {
                '@type': 'SoftwareApplication',
                name: 'Mouse Latency Test',
                description: 'Free online tool to test mouse latency, input lag, and click delay',
                applicationCategory: 'ProductivityApplication',
                operatingSystem: 'Web Browser',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD'
                }
              },
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://mousetesterpro.com'
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Mouse Latency Test',
                    item: 'https://mousetesterpro.com'
                  }
                ]
              }
            }) 
          }} 
        />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: 'How to Test Mouse Latency for Gaming',
              description: 'Complete guide on testing mouse latency, polling rate, and jitter for competitive gaming performance.',
              image: 'https://mousetesterpro.com/og-image.png',
              totalTime: 'PT5M',
              estimatedCost: {
                '@type': 'MonetaryAmount',
                currency: 'USD',
                value: '0'
              },
              step: [
                {
                  '@type': 'HowToStep',
                  name: 'Open the Mouse Latency Tester',
                  text: 'Visit our free online mouse latency tester tool.',
                  url: 'https://mousetesterpro.com'
                },
                {
                  '@type': 'HowToStep',
                  name: 'Run the Click Latency Test',
                  text: 'Click the start button and perform the click latency test to measure response time.',
                  url: 'https://mousetesterpro.com'
                },
                {
                  '@type': 'HowToStep',
                  name: 'Test Polling Rate',
                  text: 'Use the polling rate test to measure how often your mouse reports position.',
                  url: 'https://mousetesterpro.com'
                },
                {
                  '@type': 'HowToStep',
                  name: 'Analyze Jitter Results',
                  text: 'Review the jitter analysis to understand consistency of your mouse performance.',
                  url: 'https://mousetesterpro.com'
                },
                {
                  '@type': 'HowToStep',
                  name: 'Compare Results',
                  text: 'Compare your results with professional standards and other gamers worldwide.',
                  url: 'https://mousetesterpro.com'
                }
              ]
            }) 
          }} 
        />

      </head>
      {/* Google AdSense - loaded via Script component */}
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7765938871336081"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-WRB3MPGMNK"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WRB3MPGMNK');
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
        <DynamicCanonical />
        <TestSessionProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </TestSessionProvider>
      </body>
    </html>
  );
}
