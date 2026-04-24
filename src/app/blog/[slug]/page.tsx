import React from 'react';
import { notFound } from 'next/navigation';
import { posts } from '../posts';
import type { Metadata } from 'next';
import Link from 'next/link';

// Generate metadata dynamically for each blog post slug
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts.find((p: { slug: string }) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | MouseTester Pro Blog`,
    description: post.summary || `Read ${post.title} on the MouseTester Pro blog.`,
    openGraph: {
      title: post.title,
      description: post.summary || `Read ${post.title} on the MouseTester Pro blog.`,
      url: `https://mousetesterpro.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: ['Mouse Tester Pro'],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Find the post by slug
  const post = posts.find((p: { slug: string }) => p.slug === params.slug);
  if (!post) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": { "@type": "Organization", "name": "Mouse Tester Pro" },
    "publisher": { "@type": "Organization", "name": "Mouse Tester Pro", "url": "https://mousetesterpro.com" },
    "description": post.summary || post.title,
  };

  return (
    <article className="w-full max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="mb-12">
        <nav className="mb-6">
          <Link href="/blog" className="text-[#60A5FA] hover:text-blue-400 text-sm">
            ← Back to Blog
          </Link>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>

        <div className="flex items-center text-gray-400 text-sm mb-8">
          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        {post.summary && (
          <p className="text-xl text-gray-300 leading-relaxed">
            {post.summary}
          </p>
        )}
      </header>

      <div className="bg-[#1A1A1A] rounded-2xl p-6 my-8 border border-[#3A3A3A]">
        <h3 className="text-xl font-bold text-white mb-4">Test Your Mouse Now</h3>
        <p className="text-gray-300 mb-6">
          Ready to check your mouse performance? No setup required — get results in under a minute.
        </p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block"
        >
          Start Mouse Latency Test
        </Link>
      </div>

      <footer className="mt-12 pt-8 border-t border-[#3A3A3A]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-gray-400 text-sm">Published by Mouse Tester Pro</p>
            <p className="text-gray-500 text-xs">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <Link href="/blog" className="text-[#60A5FA] hover:text-blue-400 font-medium">
            View All Articles →
          </Link>
        </div>
      </footer>
    </article>
  );
}