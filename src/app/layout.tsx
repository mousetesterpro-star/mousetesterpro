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
  title: "Mouse Latency Test | Accurate Online Tool",
  description: "Test mouse latency, input lag, and click delay instantly online. Accurate, free, and easy-to-use tool for gamers & tech users.",
  keywords: [
    "mouse test latency",
    "mouse latency test",
    "mouse click latency test online",
    "free mouse latency test",
    "instant mouse latency test",
    "accurate mouse latency test",
    "mouse latency test 2025",
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
    title: "Mouse Latency Test | Accurate Online Tool",
    description: "Test mouse latency, input lag, and click delay instantly online. Accurate, free, and easy-to-use tool for gamers & tech users.",
    url: "https://mouse-tester-pro.vercel.app",
    siteName: "Mouse Tester Pro",
    images: [
      {
        url: "https://mouse-tester-pro.vercel.app/og-image.png",
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
    title: "Mouse Latency Test | Accurate Online Tool",
    description: "Test mouse latency, input lag, and click delay instantly online. Accurate, free, and easy-to-use tool for gamers & tech users.",
    images: [
      "https://mouse-tester-pro.vercel.app/og-image.png"
    ],
    site: "@MouseTesterPro",
    creator: "@MouseTesterPro"
  },
  other: {
    'google-site-verification': 'VuktZVfop_TtmjmC2sfWPPIxZtK5ovyB8wKHpY4OFfY',
    'google-adsense-account': 'ca-pub-1310810766620297',
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
        <meta name="google-adsense-account" content="ca-pub-1310810766620297" />
        <meta httpEquiv="Content-Security-Policy" content="
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com;
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
          font-src 'self' https://fonts.gstatic.com;
          img-src 'self' data: https: blob:;
          connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://pagead2.googlesyndication.com https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.doubleclick.net https://*.googlesyndication.com;
          frame-src 'self' https://*.google.com https://*.doubleclick.net https://*.googlesyndication.com;
          object-src 'none';
          base-uri 'self';
          form-action 'self';
        " />
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
                  name: 'What is mouse latency?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Mouse latency, also known as input lag or click response time, measures how quickly your mouse responds to clicks. For competitive gaming, even a few milliseconds can make the difference between winning and losing. Our mouse latency test online helps you identify if your current mouse is holding you back in games like Valorant, CS2, PUBG, or any competitive title.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'How to test mouse latency online?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Our mouse response time checker provides instant results by measuring three key metrics: click latency, polling rate, and jitter. Simply click the test button and perform the required actions. The test mouse input lag tool will analyze your mouse performance and provide detailed results within seconds.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Does latency affect gaming?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, mouse latency significantly affects gaming performance. Professional gamers typically aim for mouse latency under 8ms for optimal performance. Higher latency can impact your gaming experience, especially in fast-paced competitive games. Our mouse latency test online helps you measure your current performance and compare it against professional standards.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'How to reduce mouse input lag?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'To reduce mouse input lag: use a gaming mouse with high polling rate (1000Hz), enable Game Mode in Windows settings, update mouse drivers regularly, use a wired connection instead of wireless, close unnecessary background applications, and test your mouse click delay test regularly to monitor performance.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'What is a good mouse latency for gaming?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'A good mouse latency for gaming is typically under 8ms. Professional gamers and competitive players aim for the lowest possible latency to gain an advantage in fast-paced games. Our mouse latency test online helps you measure your current performance and determine if your mouse meets gaming standards.'
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
              '@type': 'WebPage',
              name: 'Mouse Latency Test | Accurate Online Tool',
              description: 'Test mouse latency, input lag, and click delay instantly online. Accurate, free, and easy-to-use tool for gamers & tech users.',
              url: 'https://mouse-tester-pro.vercel.app',
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
                    item: 'https://mouse-tester-pro.vercel.app'
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Mouse Latency Test',
                    item: 'https://mouse-tester-pro.vercel.app'
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
        strategy="lazyOnload"
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