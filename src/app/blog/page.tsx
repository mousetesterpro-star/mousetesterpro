import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gaming Mouse Blog | Tips, Guides & Performance Insights",
  description: "Expert gaming mouse guides, performance tips, and latency optimization advice. Learn how to improve your gaming setup and reduce input lag.",
  openGraph: {
    title: "Gaming Mouse Blog | Tips, Guides & Performance Insights",
    description: "Expert gaming mouse guides, performance tips, and latency optimization advice. Learn how to improve your gaming setup and reduce input lag.",
    url: "https://mousetesterpro.com/blog",
    siteName: "Mouse Tester Pro",
    type: "website"
  }
};

const blogPosts = [
  {
    id: "mouse-test-latency",
    title: "Mouse Test Latency - Free Online Tool 2025 | Instant Results",
    description: "Free mouse test latency tool with instant results. Test your gaming mouse performance online with accurate measurements. Professional-grade testing for competitive gaming.",
    date: "2025-01-15",
    readTime: "5 min read",
    category: "Gaming"
  },
  {
    id: "top-5-ways-reduce-mouse-latency",
    title: "Top 5 Ways to Reduce Mouse Latency",
    description: "Learn the most effective methods to reduce mouse latency and improve your gaming performance. From hardware upgrades to software optimizations.",
    date: "2025-01-15",
    readTime: "5 min read",
    category: "Performance"
  },
  {
    id: "why-input-lag-matters-gamers",
    title: "Why Input Lag Matters for Gamers",
    description: "Understanding the impact of input lag on competitive gaming and how even small improvements can give you a significant advantage.",
    date: "2025-01-10",
    readTime: "4 min read",
    category: "Gaming"
  },
  {
    id: "mouse-latency-vs-response-time",
    title: "Mouse Latency vs Response Time: Key Differences",
    description: "Explore the differences between mouse latency and response time, and why both metrics are crucial for optimal gaming performance.",
    date: "2025-01-05",
    readTime: "6 min read",
    category: "Education"
  },
  {
    id: "how-to-test-mouse-latency",
    title: "How to Test Mouse Latency: Complete Guide for Gamers",
    description: "Learn how to test mouse latency accurately. Complete guide for gamers to measure click response time, improve gaming performance, and optimize mouse settings.",
    date: "2024-08-04",
    readTime: "5 min read",
    category: "How To"
  },
  {
    id: "mouse-jitter-vs-polling-rate",
    title: "Mouse Jitter vs Polling Rate: What Affects Gaming Performance?",
    description: "Understand the difference between mouse jitter and polling rate. Learn how these factors affect gaming performance and how to optimize your mouse settings.",
    date: "2024-08-04",
    readTime: "6 min read",
    category: "Education"
  }
];

export default function BlogPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Gaming Mouse Blog
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Expert guides, performance tips, and insights to help you optimize your gaming setup and reduce input lag for competitive advantage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(0, 3).map((post) => (
          <article key={post.id} className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 border border-[#3A3A3A] hover:border-[#60A5FA] transition-all duration-300">
            <div className="mb-4">
        <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          {post.category}
        </span>
            </div>
            <h2 className="text-xl font-bold text-white mb-3 hover:text-[#60A5FA] transition-colors">
              <Link href={`/blog/${post.id}`}>
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
              {post.description}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <Link
              href={`/blog/${post.id}`}
              className="inline-block mt-4 text-[#60A5FA] hover:text-blue-400 font-medium text-sm transition-colors"
            >
              Read More →
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-6">Ready to Test Your Mouse?</h2>
        <p className="text-gray-300 mb-8">
          Use our free mouse latency test to measure your current performance and see how it compares to professional standards.
        </p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block"
        >
          Start Mouse Latency Test
        </Link>
      </div>

      {/* All Blog Posts List */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">All Articles</h2>
        <div className="space-y-4">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block bg-[#1A1A1A] rounded-xl p-6 border border-[#3A3A3A] hover:border-[#60A5FA] transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#60A5FA] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {post.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 md:flex-col md:items-end">
                  <span>{post.readTime}</span>
                  <span className="text-[#60A5FA] group-hover:text-blue-400 font-medium">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}