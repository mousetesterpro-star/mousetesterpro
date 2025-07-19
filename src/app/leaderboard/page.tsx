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
    <section className="w-full max-w-3xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Leaderboard</h1>
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
        {loading ? (
          <div className="text-gray-400 text-sm">Loading...</div>
        ) : results.length === 0 ? (
          <div className="text-gray-400 text-sm">No leaderboard data yet. Run some tests to see your results here!</div>
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
    </section>
  );
} 