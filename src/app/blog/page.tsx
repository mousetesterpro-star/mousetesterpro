import React from 'react';

const posts = [
  {
    title: 'Welcome to MouseTester Pro!',
    date: '2024-07-19',
    summary: 'We’re excited to launch our new mouse performance dashboard. Test your latency, polling rate, and jitter with pro-grade tools.'
  },
  {
    title: 'New Feature: Shareable Results',
    date: '2024-07-18',
    summary: 'You can now share your test results with friends or on social media. Just click “Copy Link” in your history or comparison cards!'
  },
  {
    title: 'Guides & FAQ Now Live',
    date: '2024-07-17',
    summary: 'Check out our new educational section for tips on optimizing your mouse and understanding performance metrics.'
  }
];

export default function BlogPage() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Blog & Updates</h1>
      <div className="space-y-6">
        {posts.map((post, idx) => (
          <div key={idx} className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-[#60A5FA]">{post.title}</h2>
              <span className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-300 text-base">{post.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 