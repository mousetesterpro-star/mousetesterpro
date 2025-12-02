import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Complete Guide to Mouse Latency | MouseTester Pro",
  description: "The ultimate guide to understanding and optimizing mouse latency for competitive gaming. Learn about polling rate, jitter, switches, and performance optimization.",
  keywords: [
    "mouse latency guide",
    "gaming mouse optimization",
    "reduce input lag guide",
    "polling rate optimization",
    "competitive gaming mouse setup"
  ],
  openGraph: {
    title: "Complete Guide to Mouse Latency | MouseTester Pro",
    description: "The ultimate guide to understanding and optimizing mouse latency for competitive gaming. Learn about polling rate, jitter, switches, and performance optimization.",
    url: "https://mousetesterpro.com/complete-guide",
    siteName: "Mouse Tester Pro",
    type: "article"
  }
};

export default function CompleteGuidePage() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">The Complete Guide to Mouse Latency</h1>
      <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
        Everything you need to know about mouse performance, from basic concepts to advanced optimization techniques for competitive gaming.
      </p>

      {/* Table of Contents */}
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Table of Contents</h2>
        <nav className="space-y-2">
          <a href="#introduction" className="block text-[#60A5FA] hover:text-blue-400 transition-colors">1. Introduction to Mouse Latency</a>
          <a href="#key-metrics" className="block text-[#60A5FA] hover:text-blue-400 transition-colors">2. Key Performance Metrics Explained</a>
          <a href="#hardware" className="block text-[#60A5FA] hover:text-blue-400 transition-colors">3. Hardware Factors That Affect Latency</a>
          <a href="#software" className="block text-[#60A5FA] hover:text-blue-400 transition-colors">4. Software and System Optimization</a>
          <a href="#testing" className="block text-[#60A5FA] hover:text-blue-400 transition-colors">5. How to Test Your Mouse Properly</a>
          <a href="#optimization" className="block text-[#60A5FA] hover:text-blue-400 transition-colors">6. Step-by-Step Optimization Guide</a>
          <a href="#troubleshooting" className="block text-[#60A5FA] hover:text-blue-400 transition-colors">7. Troubleshooting Common Issues</a>
          <a href="#conclusion" className="block text-[#60A5FA] hover:text-blue-400 transition-colors">8. Conclusion and Best Practices</a>
        </nav>
      </div>

      {/* Section 1: Introduction */}
      <div id="introduction" className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction to Mouse Latency</h2>
        <p className="text-gray-300 mb-4">
          In the world of competitive gaming, every millisecond counts. Mouse latency—the delay between your physical input and the computer's response—can mean the difference between landing a crucial headshot and being eliminated. But mouse latency isn't just about gaming; it affects anyone who values a responsive, precise computing experience.
        </p>
        <p className="text-gray-300 mb-4">
          Understanding mouse latency requires looking at the complete signal chain: from the moment your finger presses the mouse button, through the mouse's internal processing, across the USB connection, into the operating system's input handling, and finally to the application's response. Each stage introduces some amount of delay, and optimizing each stage contributes to a faster, more responsive experience.
        </p>
        <p className="text-gray-300">
          This guide will walk you through everything you need to know about mouse latency—what causes it, how to measure it, and most importantly, how to minimize it for peak performance. Whether you're a competitive esports player, a professional creative, or simply someone who appreciates smooth input response, this guide will help you get the most out of your mouse.
        </p>
      </div>

      {/* Section 2: Key Metrics */}
      <div id="key-metrics" className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">2. Key Performance Metrics Explained</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-[#60A5FA] mb-2">Click Latency</h3>
            <p className="text-gray-300">
              Click latency measures the time from physical button press to computer registration, typically ranging from 3-20ms depending on your mouse and system. Professional gaming mice achieve 3-8ms, while standard office mice may reach 15-25ms. This metric directly impacts your reaction time in games—lower is always better. Our testing tool measures click latency by timing your response to visual targets, providing an accurate real-world measurement of your input delay.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-[#60A5FA] mb-2">Polling Rate</h3>
            <p className="text-gray-300">
              Polling rate indicates how frequently your mouse reports its position, measured in Hertz (Hz). A 1000Hz polling rate means 1,000 updates per second, with a maximum 1ms delay between updates. Most gaming mice support 125Hz, 500Hz, and 1000Hz, with some premium models offering up to 8000Hz. For competitive gaming, 1000Hz provides the optimal balance of responsiveness and system efficiency. Higher rates offer diminishing returns—the difference between 1000Hz and 8000Hz is only 0.875ms maximum delay reduction.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-[#60A5FA] mb-2">Jitter</h3>
            <p className="text-gray-300">
              Jitter measures the consistency of your polling intervals—the variation from the expected timing. Even with 1000Hz polling, actual intervals might vary: 0.9ms, 1.1ms, 0.95ms, etc. This inconsistency is jitter. Low jitter (under 0.5ms) means predictable, stable input that your muscle memory can rely on. High jitter (above 2ms) creates unpredictable input behavior that can affect precision. Jitter often indicates USB bandwidth issues, driver problems, or hardware limitations.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Hardware */}
      <div id="hardware" className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">3. Hardware Factors That Affect Latency</h2>
        
        <div className="space-y-4 text-gray-300">
          <p>
            <strong className="text-white">Switch Type:</strong> The mouse switch is where your click journey begins. Mechanical switches use metal contacts that require debounce filtering (2-8ms delay) to prevent false clicks. Optical switches use light-based actuation with near-zero debounce (0.2ms), making them inherently faster. Both types can perform well, but optical switches offer a slight latency advantage.
          </p>
          <p>
            <strong className="text-white">Microcontroller (MCU):</strong> Your mouse's brain processes switch signals and prepares data for transmission. High-end gaming mice use faster MCUs with optimized firmware, achieving sub-millisecond processing. Budget mice may use slower processors with less optimized code, adding 1-3ms of processing delay.
          </p>
          <p>
            <strong className="text-white">Connection Type:</strong> Wired USB connections provide the most reliable, lowest-latency path to your computer. Modern 2.4GHz wireless technology has largely closed the gap, with premium wireless mice achieving sub-1ms wireless latency. Bluetooth adds significant latency (10-30ms) and should be avoided for gaming. Always use the dedicated 2.4GHz receiver when available.
          </p>
          <p>
            <strong className="text-white">Sensor:</strong> While the sensor primarily affects tracking accuracy and maximum speed, some sensors have faster processing than others. Modern gaming sensors from PixArt, Razer, and Logitech are all highly optimized with negligible processing delay. Sensor choice matters more for tracking performance than latency.
          </p>
          <p>
            <strong className="text-white">Cable Quality:</strong> For wired mice, cable quality doesn't affect latency (electrical signals travel at near-light speed), but cable drag can affect your physical movement. Lightweight, flexible cables or paracord replacements improve the feel without changing latency.
          </p>
        </div>
      </div>

      {/* Section 4: Software */}
      <div id="software" className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">4. Software and System Optimization</h2>
        
        <div className="space-y-4 text-gray-300">
          <p>
            <strong className="text-white">Drivers:</strong> Always install manufacturer-specific drivers rather than relying on generic Windows drivers. Manufacturer drivers are optimized for your specific mouse and often include performance modes, polling rate settings, and firmware updates. Download directly from the manufacturer's website to ensure authenticity.
          </p>
          <p>
            <strong className="text-white">Windows Settings:</strong> Disable "Enhance pointer precision" (pointer acceleration) in Windows mouse settings—this adds processing delay and makes movement unpredictable. Enable Windows Game Mode to prioritize input processing. In Power Options, set USB selective suspend to "Disabled" to prevent power-saving delays.
          </p>
          <p>
            <strong className="text-white">Background Applications:</strong> Close unnecessary programs that consume CPU resources. Antivirus real-time scanning, cloud sync services, and browser tabs all compete for system resources. For competitive gaming sessions, minimize background processes to ensure maximum input priority.
          </p>
          <p>
            <strong className="text-white">USB Configuration:</strong> Connect your mouse directly to a motherboard USB port rather than through a hub. USB 3.0 ports often have better controllers than USB 2.0. Avoid sharing USB controllers with high-bandwidth devices like external drives. Some motherboards have dedicated "gaming" USB ports with optimized polling.
          </p>
        </div>
      </div>

      {/* Section 5: Testing */}
      <div id="testing" className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">5. How to Test Your Mouse Properly</h2>
        
        <div className="space-y-4 text-gray-300">
          <p>
            Accurate testing requires controlled conditions. Before testing, close unnecessary applications, ensure your mouse is fully charged (if wireless), and position your receiver close to your mouse. Warm up with a few practice clicks to get into a consistent rhythm.
          </p>
          <p>
            <strong className="text-white">Testing Protocol:</strong> Our tool guides you through a standardized testing procedure. First, you'll complete click latency trials—clicking targets as they appear at random positions. Then, you'll perform movement sampling by moving your mouse around the test area. The tool collects multiple samples and applies statistical analysis to produce reliable results.
          </p>
          <p>
            <strong className="text-white">Interpreting Results:</strong> Don't focus on a single test—run 3-5 tests and look at the average. Some variation is normal due to human reaction time differences. Compare your results against the benchmarks: under 10ms click latency is excellent, 1000Hz polling rate is optimal, and under 0.5ms jitter indicates stable performance.
          </p>
          <p>
            <strong className="text-white">Comparative Testing:</strong> To compare mice or configurations, test each under identical conditions. Same time of day, same system state, same testing procedure. This controls for variables and reveals true performance differences.
          </p>
        </div>
      </div>

      {/* Section 6: Optimization */}
      <div id="optimization" className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">6. Step-by-Step Optimization Guide</h2>
        
        <ol className="space-y-4 text-gray-300 list-decimal list-inside">
          <li className="pl-2">
            <strong className="text-white">Update Everything:</strong> Install the latest mouse drivers, firmware, and Windows updates. Manufacturers regularly release optimizations that reduce latency.
          </li>
          <li className="pl-2">
            <strong className="text-white">Configure Polling Rate:</strong> Set your mouse to 1000Hz in the manufacturer's software. This is the sweet spot for most users.
          </li>
          <li className="pl-2">
            <strong className="text-white">Disable Pointer Acceleration:</strong> In Windows Settings → Devices → Mouse → Additional mouse options → Pointer Options, uncheck "Enhance pointer precision."
          </li>
          <li className="pl-2">
            <strong className="text-white">Enable Game Mode:</strong> Press Win+G or go to Settings → Gaming → Game Mode and enable it.
          </li>
          <li className="pl-2">
            <strong className="text-white">Optimize USB:</strong> Connect to a motherboard USB 3.0 port. In Device Manager, find your USB controller and disable power management.
          </li>
          <li className="pl-2">
            <strong className="text-white">Reduce Background Load:</strong> Use Task Manager to identify and close unnecessary startup programs and background processes.
          </li>
          <li className="pl-2">
            <strong className="text-white">Test and Verify:</strong> Run our latency test before and after each change to measure improvement.
          </li>
        </ol>
      </div>

      {/* Section 7: Troubleshooting */}
      <div id="troubleshooting" className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">7. Troubleshooting Common Issues</h2>
        
        <div className="space-y-4">
          <div className="bg-[#23272e] rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-2">High Latency (20ms+)</h3>
            <p className="text-gray-300 text-sm">Check for outdated drivers, USB hub usage, high CPU load, or power-saving settings. Try a different USB port. If wireless, ensure receiver is close and battery is charged.</p>
          </div>
          <div className="bg-[#23272e] rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-2">High Jitter (2ms+)</h3>
            <p className="text-gray-300 text-sm">Usually indicates USB bandwidth issues. Disconnect other USB devices, try a different port, or check for driver conflicts. Wireless interference can also cause jitter.</p>
          </div>
          <div className="bg-[#23272e] rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Low Polling Rate</h3>
            <p className="text-gray-300 text-sm">Verify polling rate is set correctly in mouse software. Some USB ports or hubs limit polling rate. Generic Windows drivers may not support high polling rates—install manufacturer drivers.</p>
          </div>
          <div className="bg-[#23272e] rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Inconsistent Results</h3>
            <p className="text-gray-300 text-sm">Close background applications, especially those with real-time scanning or syncing. Ensure consistent testing conditions. Some variation is normal—focus on averages across multiple tests.</p>
          </div>
        </div>
      </div>

      {/* Section 8: Conclusion */}
      <div id="conclusion" className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">8. Conclusion and Best Practices</h2>
        
        <div className="space-y-4 text-gray-300">
          <p>
            Optimizing mouse latency is a combination of choosing the right hardware and configuring your system properly. While the differences might seem small—a few milliseconds here and there—they compound into a noticeably more responsive experience, especially in competitive gaming where split-second reactions matter.
          </p>
          <p>
            <strong className="text-white">Key Takeaways:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Aim for under 10ms click latency, 1000Hz polling rate, and under 0.5ms jitter</li>
            <li>Use manufacturer drivers and keep firmware updated</li>
            <li>Disable pointer acceleration and enable Game Mode</li>
            <li>Connect directly to motherboard USB 3.0 ports</li>
            <li>Minimize background processes during gaming</li>
            <li>Test regularly to verify performance and catch issues early</li>
          </ul>
          <p>
            Remember that mouse latency is just one component of total system latency. For the best experience, pair a low-latency mouse with a high refresh rate monitor, optimized game settings, and a capable system. Use our testing tool regularly to monitor your setup and ensure you're always performing at your best.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4">
        <a 
          href="/" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Test Your Mouse Now
        </a>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/how-it-works" className="text-[#60A5FA] hover:text-blue-400 transition-colors">How It Works</a>
          <span className="text-gray-600">•</span>
          <a href="/faq" className="text-[#60A5FA] hover:text-blue-400 transition-colors">FAQ</a>
          <span className="text-gray-600">•</span>
          <a href="/guides" className="text-[#60A5FA] hover:text-blue-400 transition-colors">More Guides</a>
        </div>
      </div>
    </section>
  );
}

