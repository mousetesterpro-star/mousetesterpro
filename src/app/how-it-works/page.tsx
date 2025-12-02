import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Mouse Latency Testing Works | MouseTester Pro",
  description: "Learn the science behind mouse latency testing. Understand how we measure click delay, polling rate, and jitter with professional-grade accuracy.",
  keywords: [
    "how mouse latency testing works",
    "mouse latency measurement",
    "polling rate explained",
    "click latency science",
    "mouse performance testing methodology"
  ],
  openGraph: {
    title: "How Mouse Latency Testing Works | MouseTester Pro",
    description: "Learn the science behind mouse latency testing. Understand how we measure click delay, polling rate, and jitter with professional-grade accuracy.",
    url: "https://mousetesterpro.com/how-it-works",
    siteName: "Mouse Tester Pro",
    type: "article"
  }
};

export default function HowItWorksPage() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">How Mouse Latency Testing Works</h1>
      
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">The Science Behind Accurate Measurement</h2>
        <p className="text-gray-300 mb-4">
          Mouse latency testing is a precise science that requires understanding the complete signal chain from your physical input to the computer's response. At MouseTester Pro, we've developed a sophisticated testing methodology that provides professional-grade accuracy directly in your web browser—no software installation required.
        </p>
        <p className="text-gray-300 mb-4">
          Our testing approach measures what matters most: the real-world latency you experience during actual use. Rather than isolating individual components, we measure the complete input pipeline that games and applications use, giving you actionable data that directly reflects your computing experience.
        </p>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Understanding the Input Signal Chain</h2>
        <p className="text-gray-300 mb-4">
          When you click your mouse button, the signal travels through multiple stages before your computer responds. Understanding this chain helps you identify potential bottlenecks and optimize your setup for minimum latency.
        </p>
        
        <div className="space-y-4 mb-6">
          <div className="bg-[#23272e] rounded-xl p-4 border-l-4 border-[#60A5FA]">
            <h3 className="text-lg font-semibold text-white mb-2">Stage 1: Switch Actuation</h3>
            <p className="text-gray-300 text-sm">
              The physical mouse switch (mechanical or optical) detects your click. Mechanical switches use metal contacts that physically touch, while optical switches use infrared light beams. Optical switches typically offer faster actuation times (0.2ms vs 2-5ms for mechanical) because they don't require physical contact debouncing.
            </p>
          </div>
          
          <div className="bg-[#23272e] rounded-xl p-4 border-l-4 border-[#60A5FA]">
            <h3 className="text-lg font-semibold text-white mb-2">Stage 2: Microcontroller Processing</h3>
            <p className="text-gray-300 text-sm">
              The mouse's internal microcontroller (MCU) processes the switch signal, applies debounce filtering, and prepares the data packet for transmission. High-end gaming mice use faster MCUs with optimized firmware to minimize this processing time, typically achieving sub-millisecond processing.
            </p>
          </div>
          
          <div className="bg-[#23272e] rounded-xl p-4 border-l-4 border-[#60A5FA]">
            <h3 className="text-lg font-semibold text-white mb-2">Stage 3: Data Transmission</h3>
            <p className="text-gray-300 text-sm">
              For wired mice, data travels through the USB cable to your computer's USB controller. Wireless mice transmit via 2.4GHz radio or Bluetooth to a receiver. Modern wireless gaming mice achieve sub-1ms wireless latency, making them competitive with wired alternatives. The USB polling interval (determined by polling rate) affects maximum transmission delay.
            </p>
          </div>
          
          <div className="bg-[#23272e] rounded-xl p-4 border-l-4 border-[#60A5FA]">
            <h3 className="text-lg font-semibold text-white mb-2">Stage 4: Operating System Processing</h3>
            <p className="text-gray-300 text-sm">
              Your operating system's HID (Human Interface Device) driver receives the USB data and converts it into input events. Windows, macOS, and Linux each handle this differently, with various optimizations available. Game Mode in Windows, for example, prioritizes input processing to reduce OS-level latency.
            </p>
          </div>
          
          <div className="bg-[#23272e] rounded-xl p-4 border-l-4 border-[#60A5FA]">
            <h3 className="text-lg font-semibold text-white mb-2">Stage 5: Application Response</h3>
            <p className="text-gray-300 text-sm">
              Finally, the application (game, browser, or software) receives the input event and responds accordingly. Our testing measures up to this point—when the browser's JavaScript engine receives and processes the mousedown event, reflecting the complete real-world latency you experience.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Our Testing Methodology</h2>
        
        <div className="space-y-6 text-gray-300">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Click Latency Measurement</h3>
            <p className="mb-3">
              Our click latency test uses a reaction-time paradigm with randomized target appearances. When you start the test, targets appear at random positions after variable delays (1-3 seconds). We record the exact timestamp when the target appears using <code className="bg-[#23272e] px-2 py-1 rounded text-[#60A5FA]">performance.now()</code>, which provides sub-millisecond precision.
            </p>
            <p>
              When you click the target, we capture the mousedown event timestamp and calculate the difference. By collecting five samples and removing statistical outliers (the fastest and slowest clicks), we calculate a reliable average that represents your typical click latency. This methodology accounts for human reaction time variation while still revealing hardware performance characteristics.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Polling Rate Detection</h3>
            <p className="mb-3">
              Polling rate measurement works by tracking the time intervals between consecutive mousemove events. As you move your mouse, we record timestamps for each movement event the browser receives. By analyzing these intervals, we can calculate how frequently your mouse is reporting its position.
            </p>
            <p>
              A 1000Hz polling rate produces approximately 1ms intervals between events, while 500Hz produces 2ms intervals. We collect 50 movement samples and calculate the average interval, then convert to frequency (Hz). This method accurately detects your mouse's actual polling rate as experienced by applications.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Jitter Analysis</h3>
            <p className="mb-3">
              Jitter represents the consistency of your polling intervals—the standard deviation from the average. Low jitter indicates stable, predictable input timing, while high jitter suggests inconsistent performance that can affect precision in games and applications.
            </p>
            <p>
              We calculate jitter by measuring the variance in polling intervals. A jitter value under 0.5ms indicates excellent consistency, while values above 1ms may indicate USB bandwidth issues, driver problems, or hardware limitations. Consistent low jitter is often more important than raw polling rate for smooth, predictable input.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Why Browser-Based Testing?</h2>
        <p className="text-gray-300 mb-4">
          You might wonder why we chose browser-based testing over dedicated desktop software. The answer lies in accessibility and real-world relevance.
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
          <li><strong className="text-white">No Installation Required:</strong> Test instantly on any computer without downloading or installing software. Perfect for quickly checking a new mouse or testing on a friend's system.</li>
          <li><strong className="text-white">Cross-Platform Compatibility:</strong> Works identically on Windows, macOS, Linux, and ChromeOS. No platform-specific versions to maintain or compatibility issues to troubleshoot.</li>
          <li><strong className="text-white">Real-World Measurement:</strong> Browser input handling uses the same APIs that web games and applications use. Your results directly reflect performance in browser-based games and web applications.</li>
          <li><strong className="text-white">Always Up-to-Date:</strong> No software updates to download—you always use the latest version of our testing algorithms automatically.</li>
          <li><strong className="text-white">Privacy-Focused:</strong> No software running on your system means no background processes, no data collection beyond what you explicitly test, and no security concerns.</li>
        </ul>
        <p className="text-gray-300">
          While dedicated hardware testing tools can provide even more granular measurements (isolating USB latency, switch actuation time, etc.), our browser-based approach offers the best balance of accuracy, accessibility, and practical relevance for most users.
        </p>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Interpreting Your Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#23272e] rounded-xl p-4">
            <h3 className="text-lg font-semibold text-[#60A5FA] mb-2">Click Latency</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li><strong className="text-green-400">3-8ms:</strong> Excellent (Pro level)</li>
              <li><strong className="text-blue-400">9-12ms:</strong> Good (Competitive)</li>
              <li><strong className="text-yellow-400">13-20ms:</strong> Average (Casual)</li>
              <li><strong className="text-red-400">20ms+:</strong> High (May need optimization)</li>
            </ul>
          </div>
          <div className="bg-[#23272e] rounded-xl p-4">
            <h3 className="text-lg font-semibold text-[#60A5FA] mb-2">Polling Rate</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li><strong className="text-green-400">1000Hz+:</strong> Excellent</li>
              <li><strong className="text-blue-400">500Hz:</strong> Good</li>
              <li><strong className="text-yellow-400">250Hz:</strong> Acceptable</li>
              <li><strong className="text-red-400">125Hz:</strong> Low (Upgrade recommended)</li>
            </ul>
          </div>
          <div className="bg-[#23272e] rounded-xl p-4">
            <h3 className="text-lg font-semibold text-[#60A5FA] mb-2">Jitter</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li><strong className="text-green-400">&lt;0.5ms:</strong> Excellent stability</li>
              <li><strong className="text-blue-400">0.5-1ms:</strong> Good stability</li>
              <li><strong className="text-yellow-400">1-2ms:</strong> Moderate (Check USB)</li>
              <li><strong className="text-red-400">2ms+:</strong> High (Troubleshoot)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a 
          href="/" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Start Testing Now
        </a>
      </div>
    </section>
  );
}

