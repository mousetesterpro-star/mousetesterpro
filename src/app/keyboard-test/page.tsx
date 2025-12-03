// app/keyboard-test/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Keyboard Test - Keyboard Latency Testing | Mouse Tester Pro",
  description: "Learn about keyboard latency testing for gaming performance. Measure keyboard input lag, polling rate, and response time.",
  robots: "noindex, follow",
};

export default function KeyboardTestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Keyboard Latency Testing
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            Keyboard latency testing measures the delay between pressing a key and the computer registering that input. This is crucial for competitive gaming where every millisecond counts.
          </p>
          <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6 text-left">
            <h2 className="text-2xl font-semibold text-white mb-4">Understanding Keyboard Latency</h2>
            <p className="text-gray-300 mb-4">
              Keyboard latency, similar to mouse latency, affects your gaming performance. Professional gamers use keyboards with low latency (under 5ms) to ensure their inputs are registered as quickly as possible. Factors affecting keyboard latency include switch type (mechanical vs membrane), polling rate, and firmware optimization.
            </p>
            <h3 className="text-xl font-semibold text-white mb-3 mt-4">Key Testing Metrics</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li><strong>Key Press Latency:</strong> Time from physical key press to computer registration</li>
              <li><strong>Polling Rate:</strong> How frequently the keyboard reports key states (typically 125Hz, 250Hz, 500Hz, or 1000Hz)</li>
              <li><strong>Ghosting:</strong> Ability to register multiple simultaneous key presses</li>
              <li><strong>Rollover:</strong> Maximum number of keys that can be pressed simultaneously</li>
            </ul>
            <p className="text-gray-300">
              While we specialize in mouse latency testing, keyboard performance is equally important for competitive gaming. Our mouse testing methodology can be adapted for keyboard testing, measuring the complete input pipeline from key press to application response.
            </p>
          </div>
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