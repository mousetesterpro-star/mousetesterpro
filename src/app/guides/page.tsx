import React from 'react';

export default function GuidesPage() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Guides & FAQ</h1>
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Understanding Mouse Performance</h2>
        <p className="text-base text-gray-300 mb-4">Mouse performance is critical for gaming, design, and productivity. Here’s what you need to know about latency, polling rate, and jitter.</p>
        <ul className="list-disc list-inside text-gray-200 space-y-2">
          <li><span className="text-[#60A5FA] font-semibold">Latency:</span> The time it takes for your mouse click or movement to be registered by your computer. Lower latency means faster response.</li>
          <li><span className="text-[#60A5FA] font-semibold">Polling Rate:</span> How often your mouse reports its position to your computer (measured in Hz). Higher polling rates (e.g., 1000Hz) mean more frequent updates and smoother tracking.</li>
          <li><span className="text-[#60A5FA] font-semibold">Jitter:</span> Variability in the polling interval. Lower jitter means more consistent performance and less input lag.</li>
        </ul>
      </div>
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Optimizing Your Mouse for Gaming</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-2">
          <li>Use a wired connection for the lowest latency and jitter.</li>
          <li>Set your mouse to its highest stable polling rate (e.g., 1000Hz).</li>
          <li>Disable "Enhance pointer precision" in Windows for raw input.</li>
          <li>Keep your mouse drivers and firmware up to date.</li>
          <li>Use a high-quality mousepad for consistent tracking.</li>
          <li>Close unnecessary background apps to reduce system latency.</li>
        </ul>
      </div>
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">FAQ</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">What is a good latency for gaming?</h3>
          <p className="text-gray-300">A latency below 10ms is considered excellent for gaming. Most users should aim for under 15ms.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">Does polling rate really matter?</h3>
          <p className="text-gray-300">Yes! A higher polling rate (e.g., 1000Hz) means your mouse updates more frequently, resulting in smoother and more responsive tracking.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">Why can’t the site detect my mouse model or DPI?</h3>
          <p className="text-gray-300">For privacy and security, browsers do not expose mouse model or DPI information to websites.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">How can I reduce input lag?</h3>
          <p className="text-gray-300">Use a wired mouse, close background apps, disable VSync in games, and keep your drivers up to date.</p>
        </div>
        {/* Advanced Test FAQs */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">What is the FPS Click Reaction Test?</h3>
          <p className="text-gray-300">This test simulates a gaming scenario where you must click on targets as quickly and accurately as possible. It measures your reaction time and aim precision, helping you train for FPS games.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">How does the DPI Accuracy Calibration Tool work?</h3>
          <p className="text-gray-300">You follow a moving target with your mouse. The tool measures how closely your path matches the ideal line, helping you tune your DPI and hand stability for better accuracy.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">What is the Click Timing Pattern Recognition test?</h3>
          <p className="text-gray-300">This test checks your ability to click in rhythm with a metronome. It measures timing drift and consistency, useful for rhythm games and improving muscle memory.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">What does the Input Path Tracer show?</h3>
          <p className="text-gray-300">It visualizes the journey of a mouse click from hardware to browser rendering, showing the timing of each stage. Great for developers and advanced troubleshooting.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">How does the Cross-Device Latency Sync Test work?</h3>
          <p className="text-gray-300">You alternate clicks between two devices (e.g., wired and wireless mouse) to compare their latency side-by-side. The tool shows which device is faster and by how much.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">What is the Input Bottleneck Scanner?</h3>
          <p className="text-gray-300">This tool detects if your browser or OS is throttling input events, which can cause lag. It provides a real-time graph and actionable tips to fix bottlenecks.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">What does the Cloud Input Diagnostic Snapshot do?</h3>
          <p className="text-gray-300">It generates a shareable report with your mouse stats, device info, and tuning advice. Great for support, forums, or debugging with the community.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#60A5FA]">How do I use the Mobile Tap Performance Suite?</h3>
          <p className="text-gray-300">Open the site on your phone or tablet to test tap latency, multi-touch jitter, and swipe delay. Perfect for mobile gamers and touchscreen device users.</p>
        </div>
      </div>
    </section>
  );
} 