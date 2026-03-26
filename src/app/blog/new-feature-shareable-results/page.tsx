import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Share Your Mouse Test Results — New Feature | MouseTester Pro Blog',
  description: 'You can now share your mouse latency test results with a link. Compare results, post to forums, and get community feedback on your gaming setup.',
  openGraph: {
    title: 'Share Your Mouse Test Results — New Feature',
    description: 'You can now share your mouse latency test results with a link. Compare results, post to gaming forums, and get community feedback on your setup.',
    url: 'https://mousetesterpro.com/blog/new-feature-shareable-results',
    type: 'article',
    publishedTime: '2024-07-18T00:00:00.000Z',
    authors: ['Mouse Tester Pro'],
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Share Your Mouse Test Results — New Feature",
  "datePublished": "2024-07-18",
  "dateModified": "2025-01-15",
  "author": { "@type": "Organization", "name": "Mouse Tester Pro" },
  "publisher": { "@type": "Organization", "name": "Mouse Tester Pro", "url": "https://mousetesterpro.com" },
  "description": "How to use the shareable results feature in MouseTester Pro to compare your setup with others and get community input."
};

export default function NewFeatureShareableResults() {
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
          <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full">Feature</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          New: Share Your Mouse Test Results With a Link
        </h1>

        <div className="flex items-center text-gray-400 text-sm mb-8">
          <span>July 18, 2024</span>
          <span className="mx-2">•</span>
          <span>4 min read</span>
        </div>

        <p className="text-xl text-gray-300 leading-relaxed">
          You can now copy a link to your test results and share it anywhere. Compare setups with friends, post to gaming forums, or save your own results across sessions.
        </p>
      </header>

      <div className="prose prose-invert max-w-none space-y-8 text-gray-300 leading-relaxed">

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What This Feature Does</h2>
          <p>
            After you finish a mouse latency test session, you&apos;ll now see a &quot;Copy Link&quot; button in your results. Clicking it copies a unique URL that encodes your test data — your average latency, best result, polling rate, jitter readings, and the timestamp. Anyone with that link can open it and see your exact results, displayed in the same format as a live test.
          </p>
          <p className="mt-3">
            The link doesn&apos;t require the recipient to have an account or be logged in. It works like a read-only snapshot of your session. You can also bookmark it for yourself to compare against future tests — useful if you&apos;re tracking whether a driver update or USB port change improved your performance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why This Is Useful</h2>
          <p>
            The most common use case we had in mind: you&apos;re in a gaming community or Discord server debating whether a specific mouse is worth it. Instead of describing your numbers in text and hoping people believe you, you paste a link. They can see exactly what your setup produces — the average, the jitter, the polling rate consistency — without any ambiguity.
          </p>
          <p className="mt-3">
            It&apos;s also genuinely useful for hardware troubleshooting. If you&apos;re not sure whether something feels off with your mouse, run a couple of tests, share the links in a support forum or with a tech-savvy friend, and get a second set of eyes on the data. Describing &quot;it feels a bit slow sometimes&quot; is vague. A test result showing consistently high jitter spikes is something concrete that someone can actually help you diagnose.
          </p>
          <p className="mt-3">
            For content creators and reviewers, it&apos;s a quick way to embed verifiable data in a video description or article without needing to reproduce the exact test every time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Use It</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>Run a full test session — click through the full sequence until you see your results summary.</li>
            <li>Look for the <strong className="text-white">Copy Link</strong> button in the results panel — it&apos;s next to the main metrics display.</li>
            <li>Click it. The URL is copied to your clipboard automatically.</li>
            <li>Paste it anywhere — Discord, Reddit, Twitter, a support ticket, your notes app.</li>
          </ol>
          <p className="mt-4">
            The link is permanent. Your results won&apos;t disappear after a set time. Though we do recommend re-testing periodically since your setup can change — driver updates, different USB ports, and even ambient temperature can affect consistency.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">A Practical Example: Comparing Two Mice</h2>
          <p>
            Let&apos;s say you&apos;re deciding between two gaming mice and have access to both. Run a full test session with Mouse A, copy the link. Swap to Mouse B, run another session, copy that link. Now you have two permanent snapshots to compare side by side, or share with whoever is helping you decide.
          </p>
          <p className="mt-3">
            You can do the same for before/after driver updates, before/after switching from USB hub to direct connection, or wireless vs wired mode on the same mouse. The shareable link essentially turns each test session into a data point that you can reference and compare over time — without needing to screenshot your screen or copy numbers by hand.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Privacy Notes</h2>
          <p>
            Shared links don&apos;t contain any personal information. They encode your performance metrics and timestamp only. We don&apos;t associate shared results with user accounts because we don&apos;t have user accounts. What you share is exactly what it says on the tin: your mouse test results. Nothing identifiable about you or your system beyond the performance data is included.
          </p>
          <p className="mt-3">
            If you share a link publicly and later want it to go away: since there&apos;s no account system, we can&apos;t delete it from your end. If this is a concern, only share in private channels. For the vast majority of use cases — comparing gear with friends, posting in enthusiast communities — this isn&apos;t an issue at all.
          </p>
        </section>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 my-8 border border-[#3A3A3A]">
          <h3 className="text-xl font-bold text-white mb-4">Run a Test and Share Your Results</h3>
          <p className="text-gray-300 mb-6">
            Head to the test tool and try it out. The share button appears after your first completed session.
          </p>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Start a Test Session
          </Link>
        </div>
      </div>

      <footer className="mt-12 pt-8 border-t border-[#3A3A3A]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-gray-400 text-sm">Published by Mouse Tester Pro</p>
            <p className="text-gray-500 text-xs">July 18, 2024</p>
          </div>
          <Link href="/blog" className="text-[#60A5FA] hover:text-blue-400 font-medium">
            View All Articles →
          </Link>
        </div>
      </footer>
    </article>
  );
}
