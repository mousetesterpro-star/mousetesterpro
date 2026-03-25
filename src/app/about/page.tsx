import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About MouseTester Pro — How and Why We Built It',
  description: 'Learn about MouseTester Pro: the team behind it, why we built a free browser-based mouse latency testing tool, and our approach to privacy-first, no-registration tools.',
  openGraph: {
    title: 'About MouseTester Pro — How and Why We Built It',
    description: 'The story behind MouseTester Pro: a free, browser-based mouse latency tester built for gamers and hardware enthusiasts.',
    url: 'https://mousetesterpro.com/about',
    siteName: 'Mouse Tester Pro',
    type: 'website',
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mouse Tester Pro",
  "url": "https://mousetesterpro.com",
  "description": "Free browser-based mouse latency testing tool for gamers, hardware enthusiasts, and professionals.",
  "foundingDate": "2024",
};

export default function AboutPage() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h1 className="text-3xl md:text-4xl font-heading text-white mb-8 text-center">About MouseTester Pro</h1>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Why We Built This</h2>
        <p className="text-base text-gray-300 mb-4">
          The idea for <span className="text-[#60A5FA] font-semibold">MouseTester Pro</span> came from a frustrating afternoon trying to figure out why a gaming mouse that supposedly had great specs still felt sluggish in practice. Every testing tool we found was either too primitive (click counter, nothing more), too complex (required installation and system access), or buried behind a sign-up wall. None of them just answered the simple question: how fast is this mouse actually responding?
        </p>
        <p className="text-base text-gray-300 mb-4">
          That gap felt completely unnecessary. Modern browsers have high-resolution performance timers that can measure input events with sub-millisecond accuracy. You don&apos;t need a desktop application or special hardware to get meaningful latency data — you just need the right implementation. So that&apos;s what we built.
        </p>
        <p className="text-base text-gray-300">
          The tool launched in mid-2024 with the core metrics: click latency, polling rate, and jitter. We&apos;ve been building on it since — adding educational guides, a comprehensive FAQ, and features like shareable result links — based on what users actually find useful.
        </p>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Our Technology</h2>
        <p className="text-base text-gray-300 mb-4">
          The latency measurements use the browser&apos;s <code className="text-blue-300 bg-[#23272e] px-1 rounded text-sm">performance.now()</code> API, which provides timing precision down to fractions of a millisecond — more than enough to distinguish meaningful differences in mouse performance. When you click the test area, we record timestamps at the moment of each input event and compute the intervals.
        </p>
        <p className="text-base text-gray-300 mb-4">
          We run statistical filtering on each session to remove outliers caused by natural human timing variation. What you see in your results is a cleaned dataset — your real hardware performance, not noise from the edges of your reaction time distribution.
        </p>
        <p className="text-base text-gray-300">
          Being browser-based is intentional. It means the tool works across Windows, macOS, and Linux without any installation. It works on any browser. And critically — it measures the same input pipeline that web games and browser applications use, making the results directly relevant to real-world performance rather than isolated hardware benchmarks.
        </p>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-3 mb-4">
          <li><strong className="text-white">Click Latency Testing:</strong> Measures the full click-to-response chain with statistical averaging and outlier removal</li>
          <li><strong className="text-white">Polling Rate Analysis:</strong> Real-time measurement of how consistently your mouse reports position updates</li>
          <li><strong className="text-white">Jitter Detection:</strong> Identifies inconsistencies in polling timing that affect aim stability in competitive games</li>
          <li><strong className="text-white">Shareable Results:</strong> Copy a link to your test session and share it anywhere — forums, Discord, support tickets</li>
          <li><strong className="text-white">Educational Resources:</strong> Guides and FAQs that explain what your results mean and what to do about them</li>
          <li><strong className="text-white">Zero friction:</strong> No downloads, no accounts, no tracking. Open the tool and use it.</li>
        </ul>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Who Uses MouseTester Pro</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-[#60A5FA] mb-2">Competitive Gamers</h3>
            <p className="text-gray-300 text-sm">
              Players in FPS, MOBA, and fighting games who need to verify their setup is performing at spec before ranked matches or tournaments. When a few milliseconds of latency can decide a duel, knowing your baseline matters.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#60A5FA] mb-2">Hardware Reviewers & Enthusiasts</h3>
            <p className="text-gray-300 text-sm">
              Tech enthusiasts and content creators who want to back up their impressions with objective numbers. Manufacturer specs tell you what the mouse claims — our tool tells you what it actually delivers.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#60A5FA] mb-2">Creative Professionals</h3>
            <p className="text-gray-300 text-sm">
              Graphic designers, video editors, and other precision-heavy workflows where mouse consistency affects output quality. High jitter disrupts fine cursor control in ways that aren&apos;t always obvious until you measure it.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#60A5FA] mb-2">General Troubleshooters</h3>
            <p className="text-gray-300 text-sm">
              Anyone who suspects their mouse is wearing out, underperforming, or behaving oddly. A three-minute test session answers the question &quot;is it my gear or is it me?&quot; definitively.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Our Values</h2>
        <p className="text-gray-300 mb-4">
          We keep it simple: the tool is free, requires no account, and collects no personal data. We publish our testing methodology openly so you can understand exactly what&apos;s being measured. We don&apos;t have a premium upsell or a freemium gate — the full tool is available to everyone, always.
        </p>
        <p className="text-gray-300">
          We also try to be honest about what the tool can and can&apos;t measure. Browser-based testing has genuine advantages but also real limitations, and we explain both. If you need something the tool doesn&apos;t do, we&apos;d rather tell you than oversell what we have.
        </p>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Get Started</h2>
        <p className="text-gray-300 mb-4">
          Ready to test? Head to our <a href="/" className="text-[#60A5FA] hover:text-blue-400 underline">homepage</a> to start immediately, or check the <a href="/complete-guide" className="text-[#60A5FA] hover:text-blue-400 underline">Complete Guide</a> for a thorough walkthrough of everything the tool measures and why.
        </p>
        <p className="text-gray-300">
          Have a question not covered in the <a href="/faq" className="text-[#60A5FA] hover:text-blue-400 underline">FAQ</a>? <a href="/contact" className="text-[#60A5FA] hover:text-blue-400 underline">Contact us</a> directly — we read everything.
        </p>
      </div>
    </section>
  );
}