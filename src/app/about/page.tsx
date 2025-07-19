import React from 'react';

export default function AboutPage() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-heading text-white mb-8 text-center">About MouseTester Pro</h1>
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
        <p className="text-base text-gray-300 mb-4">
          <span className="text-[#60A5FA] font-semibold">MouseTester Pro</span> is a next-generation mouse performance dashboard built for gamers, esports pros, and hardware enthusiasts. Our mission is to provide the most accurate, user-friendly, and visually stunning tool for testing mouse latency, polling rate, and jitter.
        </p>
        <ul className="list-disc list-inside text-gray-200 space-y-2 mb-4">
          <li>Industry-grade accuracy and real-time analysis</li>
          <li>Modern, gamer-focused design and UX</li>
          <li>Shareable results, leaderboards, and personalized stats</li>
          <li>Guides, tips, and educational content for all users</li>
        </ul>
        <p className="text-base text-gray-300">
          Whether you’re a competitive gamer or just want to optimize your setup, MouseTester Pro is your go-to tool for mouse performance insights.
        </p>
      </div>
    </section>
  );
} 