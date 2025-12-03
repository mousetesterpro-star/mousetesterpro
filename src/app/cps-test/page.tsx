// app/cps-test/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CPS Test - Clicks Per Second Testing | Mouse Tester Pro",
  description: "Learn about Clicks Per Second (CPS) testing for gaming performance. Measure your clicking speed and improve your gaming skills.",
  robots: "noindex, follow",
};

export default function CPSTestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Clicks Per Second (CPS) Test
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            Clicks Per Second (CPS) testing measures how many times you can click your mouse in one second. This metric is crucial for competitive gaming, especially in games requiring rapid clicking like Minecraft PvP, clicker games, and certain FPS scenarios.
          </p>
          <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6 text-left">
            <h2 className="text-2xl font-semibold text-white mb-4">Understanding CPS Testing</h2>
            <p className="text-gray-300 mb-4">
              CPS testing helps gamers understand their clicking speed and identify areas for improvement. Professional gamers typically achieve 8-12 CPS, while advanced players can reach 15+ CPS using techniques like butterfly clicking or drag clicking.
            </p>
            <h3 className="text-xl font-semibold text-white mb-3 mt-4">Why CPS Matters</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li><strong>Gaming Performance:</strong> Higher CPS can improve your performance in games requiring rapid clicking</li>
              <li><strong>Muscle Memory:</strong> Regular testing helps develop consistent clicking patterns</li>
              <li><strong>Hardware Optimization:</strong> Identifies if your mouse supports high-speed clicking</li>
              <li><strong>Competitive Edge:</strong> Every click counts in competitive gaming scenarios</li>
            </ul>
            <p className="text-gray-300">
              While we're currently focused on mouse latency testing, CPS testing is an important complementary tool for comprehensive mouse performance analysis. Our mouse latency test helps ensure each click is registered quickly, while CPS testing measures how many clicks you can perform.
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