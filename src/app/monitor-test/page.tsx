// app/monitor-test/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Monitor Test - Display Performance Testing | Mouse Tester Pro",
  description: "Learn about monitor testing for gaming performance. Measure refresh rate, response time, and display latency.",
  robots: "noindex, follow",
};

export default function MonitorTestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Monitor Performance Testing
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            Monitor testing measures display performance metrics that directly impact your gaming experience. Understanding your monitor's refresh rate, response time, and input lag helps optimize your complete gaming setup.
          </p>
          <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6 text-left">
            <h2 className="text-2xl font-semibold text-white mb-4">Understanding Monitor Performance</h2>
            <p className="text-gray-300 mb-4">
              Your monitor is the final link in the input chain. Even with a low-latency mouse and keyboard, a slow monitor can add significant delay. Competitive gamers use high refresh rate monitors (144Hz, 240Hz, or 360Hz) with low response times (1-5ms) to minimize total system latency.
            </p>
            <h3 className="text-xl font-semibold text-white mb-3 mt-4">Key Monitor Metrics</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li><strong>Refresh Rate:</strong> How many times per second the display updates (Hz). Higher is better for smooth motion</li>
              <li><strong>Response Time:</strong> Time for pixels to change color (GtG - Gray to Gray). Lower is better</li>
              <li><strong>Input Lag:</strong> Delay between receiving a signal and displaying it. Critical for competitive gaming</li>
              <li><strong>Motion Blur:</strong> Blurring during fast motion. Can be reduced with high refresh rates</li>
            </ul>
            <p className="text-gray-300">
              While we focus on mouse latency testing, monitor performance completes the picture. A low-latency mouse paired with a high refresh rate monitor provides the best competitive gaming experience. Our mouse latency test helps ensure your input device is optimized, while monitor testing ensures your display isn't adding unnecessary delay.
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