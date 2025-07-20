import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <Link 
          href="/" 
          className="bg-[#60A5FA] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#4090e6] transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
} 