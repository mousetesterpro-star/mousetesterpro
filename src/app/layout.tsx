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
  title: "Free Mouse Latency Tester 2024 | Click Speed Test Online | Gaming Mouse Performance Tool",
  description: "Test your mouse latency, click speed & polling rate FREE online. Professional gaming mouse performance tester for gamers worldwide. Get instant results, compare scores & optimize your setup. No download required.",
  keywords: [
    "free mouse latency tester",
    "mouse click speed test online",
    "gaming mouse performance test",
    "mouse polling rate test",
    "mouse jitter test free",
    "mouse latency tester India",
    "gaming mouse test India",
    "free mouse performance tool India",
    "online mouse testing tool India",
    "mouse accuracy test free India",
    "mouse latency tester US",
    "gaming mouse test America",
    "mouse latency tester UK",
    "gaming mouse test England",
    "mouse latency tester Canada",
    "gaming mouse test Canada",
    "mouse latency tester Australia",
    "gaming mouse test Australia",
    "mouse latency tester Germany",
    "gaming mouse test Deutschland",
    "mouse latency tester Brazil",
    "gaming mouse test Brasil",
    "how to test mouse latency for gaming",
    "best mouse latency for competitive gaming",
    "free mouse performance tester online",
    "gaming mouse click speed test",
    "mouse polling rate vs latency gaming",
    "mouse latency test for Valorant India",
    "gaming mouse performance test free online",
    "competitive gaming mouse test",
    "esports mouse performance tool",
    "mouse response time test",
    "gaming peripheral test free"
  ],
  openGraph: {
    title: "Free Mouse Latency Tester 2024 - Professional Gaming Mouse Performance Test Tool",
    description: "Test your mouse latency, click speed & polling rate FREE online. Professional gaming mouse performance tester for gamers worldwide. Get instant results, compare scores & optimize your setup.",
    images: [
      {
        url: "/og-image.png",
        alt: "Professional mouse latency tester dashboard with real-time performance metrics, polling rate graphs, and gaming-focused interface - accessible worldwide"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Mouse Latency Tester 2024 - Professional Gaming Mouse Performance Test Tool",
    description: "Test your mouse latency, click speed & polling rate FREE online. Professional gaming mouse performance tester for gamers worldwide.",
    images: [
      "/og-image.png"
    ],
    site: "@MouseTesterPro"
  },
  other: {
    'google-site-verification': 'VuktZVfop_TtmjmC2sfWPPIxZtK5ovyB8wKHpY4OFfY',
    'google-adsense-account': 'ca-pub-1310810766620297',
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
        <meta name="google-adsense-account" content="ca-pub-1310810766620297" />
        <link rel="canonical" href="https://mouse-tester-pro.vercel.app" />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Mouse Tester Pro',
              url: 'https://mouse-tester-pro.vercel.app',
              description: 'Test your mouse latency, click speed & polling rate FREE online. Professional gaming mouse performance tester for gamers worldwide.',
              applicationCategory: 'Productivity',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock'
              },
              potentialAction: {
                '@type': 'UseAction',
                target: 'https://mouse-tester-pro.vercel.app',
                name: 'Test Mouse Latency'
              },
              hasPart: [
                {
                  '@type': 'SoftwareApplication',
                  name: 'Click Latency Test',
                  description: 'Measure mouse response time and click accuracy'
                },
                {
                  '@type': 'SoftwareApplication',
                  name: 'Polling Rate Test',
                  description: 'Test mouse polling rate and jitter analysis'
                },
                {
                  '@type': 'SoftwareApplication',
                  name: 'Mobile Tap Test',
                  description: 'Test touch screen response time and accuracy'
                }
              ],
              sameAs: [
                'https://github.com/shashi123454/MouseTesterPro',
                'https://twitter.com/MouseTesterPro'
              ]
            }) 
          }} 
        />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is Mouse Latency and Why Does It Matter for Competitive Gaming?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Mouse latency, also known as click response time, measures how quickly your mouse responds to clicks. For competitive gaming in India, US, Europe, and worldwide, even a few milliseconds can make the difference between winning and losing. Our free mouse latency tester helps you identify if your current mouse is holding you back in games like Valorant, CS2, PUBG, or any competitive title.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'How to Test Mouse Polling Rate and Jitter for Better Gaming Performance?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Polling rate determines how often your mouse reports its position to your computer. Higher polling rates (1000Hz) provide smoother tracking, while jitter measures consistency. Use our mouse polling rate test to see if your gaming mouse is performing optimally for competitive play, whether you\'re gaming in India, the US, or anywhere globally.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Which Mouse Latency is Best for Gaming in 2024?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Professional gamers worldwide typically aim for mouse latency under 8ms for optimal performance. Our mouse latency tester helps you measure your current performance and compare it against professional standards. Whether you\'re gaming in India, competing in US tournaments, or playing in European leagues, accurate mouse testing is crucial for competitive advantage.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'How to Improve Mouse Performance for Competitive Gaming?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Start by testing your current mouse latency and polling rate. If results show high latency or inconsistent polling, consider upgrading to a gaming mouse with better sensors. Our free mouse performance tester helps you make informed decisions about your gaming peripherals, regardless of your location or gaming setup.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Free Mouse Testing Tools vs Paid Software - Which is Better?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Our free online mouse latency tester provides professional-grade accuracy without expensive software. Test your mouse performance instantly, get detailed reports, and compare results with other gamers worldwide. No registration or download required - accessible to gamers everywhere.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Mouse Latency Test Results - What Do the Numbers Mean?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Our mouse testing tool measures three key metrics: Click Latency (response time), Polling Rate (update frequency), and Jitter (consistency). Lower latency numbers indicate better performance, while higher polling rates provide smoother tracking for competitive gaming across all regions and gaming communities.'
                  }
                }
              ]
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
              image: 'https://mouse-tester-pro.vercel.app/og-image.png',
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
                  url: 'https://mouse-tester-pro.vercel.app'
                },
                {
                  '@type': 'HowToStep',
                  name: 'Run the Click Latency Test',
                  text: 'Click the start button and perform the click latency test to measure response time.',
                  url: 'https://mouse-tester-pro.vercel.app'
                },
                {
                  '@type': 'HowToStep',
                  name: 'Test Polling Rate',
                  text: 'Use the polling rate test to measure how often your mouse reports position.',
                  url: 'https://mouse-tester-pro.vercel.app'
                },
                {
                  '@type': 'HowToStep',
                  name: 'Analyze Jitter Results',
                  text: 'Review the jitter analysis to understand consistency of your mouse performance.',
                  url: 'https://mouse-tester-pro.vercel.app'
                },
                {
                  '@type': 'HowToStep',
                  name: 'Compare Results',
                  text: 'Compare your results with professional standards and other gamers worldwide.',
                  url: 'https://mouse-tester-pro.vercel.app'
                }
              ]
            }) 
          }} 
        />
      </head>
      {/* Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1310810766620297"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
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