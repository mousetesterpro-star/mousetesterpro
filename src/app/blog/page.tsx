import React from 'react';
import { posts } from './posts';

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
            <a href={`/blog/${post.slug}`} className="inline-block mt-2 text-[#60A5FA] underline hover:text-white font-medium">Read More</a>
          </div>
        ))}
      </div>
    </section>
  );
} 