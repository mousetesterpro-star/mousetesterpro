import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Welcome to MouseTester Pro — Why We Built It | MouseTester Pro Blog',
  description: 'The story behind MouseTester Pro: why we built a browser-based mouse latency tool, what problems it solves, and what makes it different from other testing tools.',
  openGraph: {
    title: 'Welcome to MouseTester Pro — Why We Built It',
    description: 'The story behind MouseTester Pro and why we built a free, browser-based mouse performance testing tool for gamers and professionals.',
    url: 'https://mousetesterpro.com/blog/welcome-to-mousetester-pro',
    type: 'article',
    publishedTime: '2024-07-19T00:00:00.000Z',
    authors: ['Mouse Tester Pro'],
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Welcome to MouseTester Pro — Why We Built It",
  "datePublished": "2024-07-19",
  "dateModified": "2025-01-15",
  "author": { "@type": "Organization", "name": "Mouse Tester Pro" },
  "publisher": { "@type": "Organization", "name": "Mouse Tester Pro", "url": "https://mousetesterpro.com" },
  "description": "The origin story of MouseTester Pro and the problem it was built to solve."
};

export default function WelcomeToMousetesterPro() {
  return (
    <article className="w-full max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="mb-12">
        <nav className="mb-6">
          <Link href="/blog" className="text-[#60A5FA] hover:text-blue-400 text-sm">
            ← Back to Blog
          </Link>
        </nav>

        <div className="mb-4">
          <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full">News</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Welcome to MouseTester Pro — Here&apos;s Why We Built It
        </h1>

        <div className="flex items-center text-gray-400 text-sm mb-8">
          <span>July 19, 2024</span>
          <span className="mx-2">•</span>
          <span>5 min read</span>
        </div>

        <p className="text-xl text-gray-300 leading-relaxed">
          Every tool starts with a frustration. Ours started with a simple question: why is it so hard to just check if your mouse is performing well?
        </p>
      </header>

      <div className="prose prose-invert max-w-none space-y-8 text-gray-300 leading-relaxed">

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">The Problem We Kept Running Into</h2>
          <p>
            If you&apos;ve ever tried to test your mouse&apos;s actual latency, you&apos;ve probably hit the same wall we did. Most testing options fall into one of two camps: overly simplistic tools that just count clicks per second, or complex desktop applications that require installation, specific operating system versions, and sometimes even administrator access just to run.
          </p>
          <p className="mt-3">
            Neither of those solved what we actually needed. We wanted to know: is my mouse responding quickly? Is the timing consistent? Is my polling rate actually what the spec sheet says? And we wanted to find that out in 60 seconds, without installing anything, and without needing to be a hardware engineer to interpret the results.
          </p>
          <p className="mt-3">
            That gap is what MouseTester Pro was built to fill.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What We Actually Built</h2>
          <p>
            MouseTester Pro is a browser-based mouse performance testing platform. The core tool uses the browser&apos;s high-resolution performance timer API — <code className="text-blue-300 bg-[#23272e] px-1 rounded">performance.now()</code> — which provides timing precision down to fractions of a millisecond. That&apos;s accurate enough to meaningfully distinguish between a 5ms click latency and a 12ms click latency, which is exactly the level of detail you need for gaming or hardware evaluation.
          </p>
          <p className="mt-3">
            Being browser-based wasn&apos;t a compromise — it was a deliberate design choice. It means the tool works on Windows, macOS, and Linux without any platform-specific builds. It means there&apos;s no installation step where something goes wrong. It means you can test on any machine in under a minute. And it measures the exact same input pipeline that browser-based games and web applications use, which makes the results directly relevant to real-world use.
          </p>
          <p className="mt-3">
            The tool covers the metrics that actually matter: click latency (with statistical averaging and outlier removal), polling rate measurement, and jitter analysis. Results are displayed in plain language with clear context for what the numbers mean — not just raw milliseconds that require a forum post to interpret.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Who We Built It For</h2>
          <p>
            There are a few groups of people we had in mind from day one.
          </p>
          <p className="mt-3">
            <strong className="text-white">Competitive gamers</strong> who suspect their gear is holding them back but can&apos;t pinpoint where. A quick latency test can confirm or rule out the mouse as the culprit, saving hours of forum research and trial-and-error.
          </p>
          <p className="mt-3">
            <strong className="text-white">Hardware reviewers and enthusiasts</strong> who want objective data when comparing mice. Reading the spec sheet tells you the polling rate the manufacturer claims. Testing tells you what the mouse actually delivers in practice.
          </p>
          <p className="mt-3">
            <strong className="text-white">Regular users</strong> who just notice something feels a bit off and want a simple sanity check. Sometimes a mouse starts developing inconsistent behavior as its switches wear out, and a latency test is the fastest way to confirm that suspicion before deciding whether to repair or replace.
          </p>
          <p className="mt-3">
            <strong className="text-white">IT professionals</strong> validating peripheral health across multiple machines, or troubleshooting input complaints from end users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What Makes This Different</h2>
          <p>
            We made a few deliberate decisions that separate MouseTester Pro from similar tools.
          </p>
          <p className="mt-3">
            First, no account required. No email, no password, no tracking. You open the tool and use it. We think the best tools get out of your way.
          </p>
          <p className="mt-3">
            Second, the results are contextualized. We don&apos;t just hand you a number and send you on your way. The results screen explains what your latency means for gaming, what&apos;s excellent versus concerning, and what you can do if you don&apos;t like what you see.
          </p>
          <p className="mt-3">
            Third, we publish our methodology. The testing approaches and calculations are explained — not hidden behind a &quot;proprietary algorithm.&quot; You can understand exactly what&apos;s being measured and why, which makes the results more trustworthy and useful.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What&apos;s Coming Next</h2>
          <p>
            We&apos;ve shipped the core testing suite, and we&apos;re actively working on more. On the roadmap: more detailed jitter visualization, a side-by-side comparison mode for testing two devices, and a result history feature so you can track how your mouse performs over time and spot degradation patterns early.
          </p>
          <p className="mt-3">
            We&apos;re also building out the educational side — guides, FAQs, and explainers on mouse technology that give you the context to actually understand what you&apos;re testing. Because a number without context is just a number.
          </p>
          <p className="mt-3">
            If you have feature requests or find something you think could be better, the contact page is always open. We read everything.
          </p>
        </section>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 my-8 border border-[#3A3A3A]">
          <h3 className="text-xl font-bold text-white mb-4">Try It Right Now</h3>
          <p className="text-gray-300 mb-6">
            No setup required. Open the tool and you&apos;ll have your first result in under a minute.
          </p>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Start Testing Your Mouse
          </Link>
        </div>
      </div>

      <footer className="mt-12 pt-8 border-t border-[#3A3A3A]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-gray-400 text-sm">Published by Mouse Tester Pro</p>
            <p className="text-gray-500 text-xs">July 19, 2024</p>
          </div>
          <Link href="/blog" className="text-[#60A5FA] hover:text-blue-400 font-medium">
            View All Articles →
          </Link>
        </div>
      </footer>
    </article>
  );
}
