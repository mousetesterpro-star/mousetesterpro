import React from 'react';
import { notFound } from 'next/navigation';
import { posts } from '../posts';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Find the post by slug
  const post = posts.find((p: { slug: string }) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
      <div className="text-xs text-gray-400 mb-8">{new Date(post.date).toLocaleDateString()}</div>
      <article className="prose prose-invert max-w-none text-gray-200 whitespace-pre-line">
        {post.content}
      </article>
      <a href="/blog" className="inline-block mt-8 text-[#60A5FA] underline hover:text-white font-medium">← Back to Blog</a>
    </section>
  );
} 