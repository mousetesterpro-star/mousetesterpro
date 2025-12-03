import React from 'react';

export default function AboutPage() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-heading text-white mb-8 text-center">About MouseTester Pro</h1>
      
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
        <p className="text-base text-gray-300 mb-4">
          <span className="text-[#60A5FA] font-semibold">MouseTester Pro</span> is a next-generation mouse performance dashboard built for gamers, esports professionals, and hardware enthusiasts. Our mission is to provide accurate, user-friendly tools for testing mouse latency, polling rate, and jitter—helping users optimize their setup for peak performance.
        </p>
        <p className="text-base text-gray-300">
          We believe that understanding your hardware's performance is the first step toward improvement. Whether you're a competitive gamer aiming for that crucial millisecond advantage or a professional seeking precision in your work, MouseTester Pro provides the insights you need.
        </p>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-3 mb-4">
          <li><strong className="text-white">Accurate Testing:</strong> Browser-based mouse latency testing using high-resolution performance APIs</li>
          <li><strong className="text-white">Comprehensive Metrics:</strong> Measure click latency, polling rate, and jitter consistency</li>
          <li><strong className="text-white">Real-Time Analysis:</strong> Instant results with detailed breakdowns and visualizations</li>
          <li><strong className="text-white">Educational Resources:</strong> Guides, FAQs, and technical explanations to help you understand mouse performance</li>
          <li><strong className="text-white">Performance Tracking:</strong> Save and compare your test results over time</li>
          <li><strong className="text-white">Free and Accessible:</strong> No downloads, no registration required—test instantly in your browser</li>
        </ul>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Who We Serve</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-[#60A5FA] mb-2">Competitive Gamers</h3>
            <p className="text-gray-300 text-sm">
              Professional and aspiring esports players who need to optimize their input latency for competitive advantage. Every millisecond counts in fast-paced games like Valorant, CS2, and Apex Legends.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#60A5FA] mb-2">Hardware Enthusiasts</h3>
            <p className="text-gray-300 text-sm">
              Tech enthusiasts and reviewers who want to evaluate mouse performance objectively. Compare different mice, test firmware updates, and verify manufacturer claims.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#60A5FA] mb-2">Creative Professionals</h3>
            <p className="text-gray-300 text-sm">
              Graphic designers, video editors, and music producers who require precise input for their work. Low latency improves workflow efficiency and precision.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#60A5FA] mb-2">Casual Users</h3>
            <p className="text-gray-300 text-sm">
              Anyone who wants to understand their mouse performance or troubleshoot input lag issues. Our tool is accessible to users of all technical levels.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Our Approach</h2>
        <p className="text-gray-300 mb-4">
          We believe in transparency, accuracy, and user education. Our testing methodology is explained in detail, and we provide comprehensive guides to help you understand not just what your results mean, but how to improve them.
        </p>
        <p className="text-gray-300">
          MouseTester Pro is built with modern web technologies to ensure fast, reliable performance across all devices and browsers. We're committed to continuous improvement based on user feedback and technological advances.
        </p>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Get Started</h2>
        <p className="text-gray-300 mb-4">
          Ready to test your mouse? Head to our <a href="/" className="text-[#60A5FA] hover:text-blue-400 underline">homepage</a> to start testing, or explore our <a href="/complete-guide" className="text-[#60A5FA] hover:text-blue-400 underline">Complete Guide</a> to learn more about mouse latency optimization.
        </p>
        <p className="text-gray-300">
          Have questions? Check out our <a href="/faq" className="text-[#60A5FA] hover:text-blue-400 underline">FAQ</a> or <a href="/contact" className="text-[#60A5FA] hover:text-blue-400 underline">contact us</a> directly.
        </p>
      </div>
    </section>
  );
} 