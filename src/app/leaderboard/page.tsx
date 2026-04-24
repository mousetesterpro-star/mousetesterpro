"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

interface TestResult {
  id: string;
  created_at: string;
  latency: number;
  polling: number;
  jitter: number;
}

export default function LeaderboardPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      // Use PostgREST: group by anon_id, select min(latency) row per anon_id
      const { data, error } = await supabase
        .rpc('get_leaderboard_best_per_user')
        .limit(20);
      if (data) setResults(data as TestResult[]);
      setLoading(false);
    }
    fetchLeaderboard();
  }, []);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Mouse Latency Leaderboard</h1>
      <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
        See how your mouse performance compares to other gamers. The leaderboard shows the best latency result per user, ranked from fastest to slowest. Lower latency means faster response — competitive gamers aim for under 8ms.
      </p>

      {/* Leaderboard Table */}
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Top 20 Fastest Results</h2>
        {loading ? (
          <div className="text-gray-400 text-sm py-8 text-center">Loading leaderboard data...</div>
        ) : results.length === 0 ? (
          <div className="text-gray-400 text-sm py-8 text-center">
            <p className="mb-2">No leaderboard data yet.</p>
            <p>Run a <a href="/" className="text-[#60A5FA] underline hover:text-blue-400">mouse latency test</a> to see your results here and compete with other gamers!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-2 text-sm text-gray-400 font-medium">Rank</th>
                  <th className="py-2 px-2 text-sm text-gray-400 font-medium">User</th>
                  <th className="py-2 px-2 text-sm text-gray-400 font-medium">Latency <span className='text-[#60A5FA]'>(ms)</span></th>
                  <th className="py-2 px-2 text-sm text-gray-400 font-medium">Polling <span className='text-[#60A5FA]'>(Hz)</span></th>
                  <th className="py-2 px-2 text-sm text-gray-400 font-medium">Jitter <span className='text-[#60A5FA]'>(ms)</span></th>
                  <th className="py-2 px-2 text-sm text-gray-400 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {results.map((entry, idx) => (
                  <tr key={entry.id} className="border-b border-gray-800 hover:bg-[#23272e] transition-all">
                    <td className="py-2 px-2 text-lg font-bold text-[#60A5FA]">{idx + 1}</td>
                    <td className="py-2 px-2 text-white">Anonymous</td>
                    <td className="py-2 px-2 text-[#60A5FA] font-bold">{entry.latency.toFixed(2)}</td>
                    <td className="py-2 px-2 text-white">{entry.polling.toFixed(2)}</td>
                    <td className="py-2 px-2 text-white">{entry.jitter.toFixed(2)}</td>
                    <td className="py-2 px-2 text-gray-400 text-xs">{new Date(entry.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Static Educational Content — visible to Google crawler */}
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 md:p-8 space-y-6 text-gray-300">
        <h2 className="text-xl font-bold text-white mb-3">How the Leaderboard Works</h2>
        <p className="leading-relaxed">
          Every time you complete a mouse latency test on MouseTester Pro, your results are anonymously recorded. The leaderboard displays the single best result per user — your lowest measured click latency — ranked against everyone else. This gives you an honest picture of where your hardware and setup stand relative to the community.
        </p>

        <h3 className="text-lg font-semibold text-white mt-4">Understanding the Metrics</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong className="text-white">Latency (ms):</strong> The time between your physical click and the computer registering it. Lower is better. Elite gaming mice with optimized setups typically achieve 3–8ms.</li>
          <li><strong className="text-white">Polling Rate (Hz):</strong> How frequently your mouse reports its position. 1000Hz is the competitive standard — it means one report every millisecond.</li>
          <li><strong className="text-white">Jitter (ms):</strong> The variation in your timing consistency. Low jitter means your mouse responds predictably, which is essential for building reliable muscle memory in competitive gaming.</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mt-4">Tips to Climb the Leaderboard</h3>
        <p className="leading-relaxed">
          Your leaderboard ranking depends on both your hardware and your system configuration. To improve your results: plug your mouse directly into a rear motherboard USB port (avoid hubs), set your polling rate to 1000Hz in your mouse software, close background applications before testing, and disable USB selective suspend in Windows power settings. Check out our <a href="/blog/top-5-ways-reduce-mouse-latency" className="text-[#60A5FA] underline hover:text-blue-400">guide to reducing mouse latency</a> for a detailed walkthrough.
        </p>
      </div>
    </section>
  );
}