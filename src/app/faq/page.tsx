import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mouse Latency FAQ - Frequently Asked Questions | MouseTester Pro",
  description: "Get answers to common questions about mouse latency, polling rate, jitter, and gaming performance. Expert explanations for gamers and professionals.",
  keywords: [
    "mouse latency FAQ",
    "polling rate questions",
    "gaming mouse FAQ",
    "input lag explained",
    "mouse performance questions"
  ],
  openGraph: {
    title: "Mouse Latency FAQ - Frequently Asked Questions | MouseTester Pro",
    description: "Get answers to common questions about mouse latency, polling rate, jitter, and gaming performance. Expert explanations for gamers and professionals.",
    url: "https://mousetesterpro.com/faq",
    siteName: "Mouse Tester Pro",
    type: "website"
  }
};

export default function FAQPage() {
  const faqs = [
    {
      question: "What exactly is mouse latency and why does it matter?",
      answer: `Mouse latency, also called input lag or click delay, is the time between when you physically click your mouse button and when your computer registers that input. It's measured in milliseconds (ms). For competitive gaming, low latency is crucial because it directly affects your reaction time in-game. A 10ms difference might seem insignificant, but in fast-paced shooters like Valorant or CS2, it can determine whether you land a shot or get eliminated. Professional esports players typically aim for latency under 8ms. Beyond gaming, low latency improves the responsiveness of any precision work—graphic design, video editing, music production, and general productivity all benefit from faster input response.`
    },
    {
      question: "What is polling rate and what polling rate should I use?",
      answer: `Polling rate measures how frequently your mouse reports its position to your computer, expressed in Hertz (Hz). A 1000Hz polling rate means 1,000 position updates per second, or one update every millisecond. Higher polling rates provide smoother cursor movement and reduce the maximum possible delay between your movement and the computer receiving it. For gaming, we recommend 1000Hz as the optimal balance between performance and system resources. While some mice offer 2000Hz, 4000Hz, or even 8000Hz, the practical difference is minimal for most users—the jump from 1000Hz to 8000Hz only reduces maximum delay from 1ms to 0.125ms. Most competitive gamers use 1000Hz without any disadvantage.`
    },
    {
      question: "What is jitter and how does it affect my gaming performance?",
      answer: `Jitter refers to the inconsistency in timing between mouse position updates. Even if your mouse has a 1000Hz polling rate, the actual intervals between updates might vary—sometimes 0.8ms, sometimes 1.2ms, sometimes 1.0ms. This variation is jitter. High jitter creates unpredictable input behavior that can affect aim precision in games. When your mouse has consistent timing (low jitter), your muscle memory works more effectively because the input response is predictable. A jitter value under 0.5ms is excellent, while anything above 2ms may indicate issues with your USB connection, drivers, or mouse hardware that should be addressed.`
    },
    {
      question: "Why is my wireless mouse showing higher latency than expected?",
      answer: `Modern wireless gaming mice using 2.4GHz technology typically achieve latency comparable to wired mice—often under 1ms wireless transmission delay. However, several factors can increase wireless latency: interference from other 2.4GHz devices (WiFi routers, Bluetooth devices, other wireless peripherals), distance from the receiver, low battery affecting transmission power, or using Bluetooth mode instead of the dedicated 2.4GHz receiver. To optimize wireless performance: place the receiver close to your mouse (ideally within 20cm using an extension cable), reduce 2.4GHz interference, ensure batteries are charged, and always use the dedicated receiver rather than Bluetooth for gaming.`
    },
    {
      question: "How accurate is browser-based latency testing compared to hardware testing?",
      answer: `Browser-based testing like MouseTester Pro measures real-world latency as experienced by web applications—the complete signal chain from click to JavaScript event. While dedicated hardware testing tools (like those using high-speed cameras or specialized USB analyzers) can isolate specific components with higher precision, browser testing offers several advantages: it requires no installation, works across all platforms, and measures the same input path that browser games and web applications use. Our testing methodology using the performance.now() API provides sub-millisecond accuracy, which is sufficient for comparing mice and identifying performance issues. For most users, browser-based testing provides all the information needed to evaluate and optimize mouse performance.`
    },
    {
      question: "What causes high latency and how can I reduce it?",
      answer: `High latency can stem from multiple sources: outdated or generic mouse drivers (install manufacturer drivers), USB hub usage (connect directly to motherboard USB ports), high system load (close background applications), power saving settings (disable USB selective suspend), Windows pointer acceleration (disable "Enhance pointer precision"), and the mouse hardware itself. To reduce latency: use a wired connection or high-quality 2.4GHz wireless, set polling rate to 1000Hz, update drivers and firmware, connect to USB 3.0 ports, enable Windows Game Mode, disable unnecessary startup programs, and consider upgrading to a gaming mouse with optimized firmware if your current mouse consistently shows high latency.`
    },
    {
      question: "Does my monitor's refresh rate affect mouse latency test results?",
      answer: `Your monitor's refresh rate doesn't directly affect the latency measurements from our test—we measure input processing time, not display time. However, your monitor does affect how quickly you perceive the response. A 60Hz monitor updates every 16.7ms, while a 144Hz monitor updates every 6.9ms, and a 240Hz monitor updates every 4.2ms. This means even with a 1ms mouse latency, you might wait up to 16.7ms on a 60Hz monitor before seeing the result on screen. For the complete input-to-display chain, both mouse latency and monitor refresh rate matter. Competitive gamers often pair low-latency mice with high refresh rate monitors to minimize total system latency.`
    },
    {
      question: "Why do my test results vary between attempts?",
      answer: `Some variation in test results is normal and expected. Human reaction time naturally varies by 10-50ms between attempts based on attention, fatigue, and anticipation. Our testing methodology accounts for this by collecting multiple samples and removing outliers. However, if you see large variations (more than 20ms difference between tests), it may indicate: inconsistent system performance (background processes consuming resources), USB bandwidth issues (other devices sharing the USB controller), driver instability, or wireless interference. For the most consistent results, test with minimal background applications running, use a wired connection if possible, and take multiple tests to establish a reliable baseline.`
    },
    {
      question: "What's the difference between click latency and response time?",
      answer: `These terms are often used interchangeably but can refer to different measurements. Click latency specifically measures the delay from physical button press to computer registration—what our test measures. Response time can refer to this same measurement or, in the context of monitors, the time it takes for a pixel to change from one color to another (typically gray-to-gray, or GtG). Mouse response time in manufacturer specifications usually indicates click latency. When evaluating total system responsiveness, you need to consider: mouse click latency + system processing time + monitor response time + monitor input lag. Each component contributes to the overall delay between your action and seeing the result.`
    },
    {
      question: "Should I use a mouse bungee or paracord cable for better latency?",
      answer: `Mouse bungees and paracord cables don't directly affect latency—they're about cable management and feel. A mouse bungee holds your cable elevated, reducing drag and preventing the cable from catching on your desk edge. Paracord cables are lightweight, flexible replacements for stock rubber cables. Neither changes the electrical signal transmission speed. However, they can indirectly improve performance by reducing physical resistance that might affect your aim consistency. If cable drag is causing you to compensate your movements, eliminating that drag could improve your effective accuracy. For pure latency reduction, focus on polling rate, drivers, and USB connection quality instead.`
    },
    {
      question: "How do optical switches compare to mechanical switches for latency?",
      answer: `Optical switches generally offer lower and more consistent latency than mechanical switches. Mechanical switches use metal contacts that physically touch when pressed, which can cause contact bounce—brief false signals as the contacts settle. Mouse firmware applies debounce filtering to prevent registering these false clicks, adding 2-8ms of delay. Optical switches use infrared light beams interrupted by the switch mechanism, eliminating contact bounce entirely and allowing near-zero debounce times (0.2ms typical). This makes optical switches faster and more consistent. However, the difference (roughly 2-6ms) is at the edge of human perception. Many professional gamers still use mechanical switches successfully—the difference matters most at the highest competitive levels.`
    },
    {
      question: "Can software or drivers reduce my mouse latency?",
      answer: `Yes, proper software configuration can significantly impact latency. Key optimizations include: installing manufacturer-specific drivers instead of generic Windows drivers, updating mouse firmware to the latest version, setting polling rate to 1000Hz in mouse software, disabling Windows "Enhance pointer precision" (pointer acceleration), enabling Windows Game Mode, disabling USB selective suspend in power settings, and closing unnecessary background applications. Some gaming mice also offer firmware-level optimizations like "high performance" modes that prioritize latency over battery life (for wireless) or reduce internal processing. Always download drivers and firmware directly from the manufacturer's website to ensure you have the latest optimizations.`
    }
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Frequently Asked Questions</h1>
      <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
        Expert answers to common questions about mouse latency, polling rate, jitter, and gaming performance optimization.
      </p>
      
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-start">
              <span className="text-[#60A5FA] mr-3 text-2xl font-bold">{index + 1}.</span>
              {faq.question}
            </h2>
            <p className="text-gray-300 leading-relaxed pl-8">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Still Have Questions?</h2>
        <p className="text-gray-300 mb-4">
          Can't find the answer you're looking for? We're here to help. Check out our other resources or get in touch with us directly.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="/how-it-works" 
            className="bg-[#23272e] hover:bg-[#2d333b] text-white font-medium py-2 px-6 rounded-xl transition-colors border border-[#3A3A3A]"
          >
            How It Works
          </a>
          <a 
            href="/complete-guide" 
            className="bg-[#23272e] hover:bg-[#2d333b] text-white font-medium py-2 px-6 rounded-xl transition-colors border border-[#3A3A3A]"
          >
            Complete Guide
          </a>
          <a 
            href="/contact" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a 
          href="/" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Test Your Mouse Now
        </a>
      </div>
    </section>
  );
}

