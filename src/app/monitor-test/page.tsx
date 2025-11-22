// app/monitor-test/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Monitor Test - Coming Soon | Mouse Tester Pro",
  description: "Monitor refresh rate and response time test coming soon. Test your display performance for gaming optimization.",
  robots: "noindex, follow",
};

export default function MonitorTestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Monitor Test Coming Soon
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            We're creating a professional monitor testing suite to measure refresh rate, response time, and display performance for gaming enthusiasts.
          </p>
          <p className="text-gray-500">
            Features will include: Refresh rate detection, response time measurement, ghosting and motion blur tests, dead pixel checker, and color accuracy testing.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Try Mouse Latency Test
          </Link>

          <div className="text-gray-500 text-sm">
            or check out our <Link href="/guides" className="text-blue-400 hover:underline">guides</Link> and <Link href="/blog" className="text-blue-400 hover:underline">blog</Link>
          </div>
        </div>
      </div>
    </div>
  );
}