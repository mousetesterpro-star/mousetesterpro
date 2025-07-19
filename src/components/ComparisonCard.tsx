"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useTestSession } from '@/context/TestSessionContext';

const benchmarks = {
  avg: { latency: 15, polling: 500, jitter: 0.5 },
  pro: { latency: 8, polling: 1000, jitter: 0.1 },
};

interface TestResult {
  id: string;
  created_at: string;
  latency: number;
  polling: number;
  jitter: number;
}

export default function ComparisonCard() {
  const [userBest, setUserBest] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { resultsUpdated } = useTestSession();

  useEffect(() => {
    async function fetchBest() {
      setLoading(true);
      let anon_id = '';
      if (typeof window !== 'undefined') {
        anon_id = localStorage.getItem('anon_id') || '';
      }
      if (!anon_id) {
        setUserBest(null);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('test_results')
        .select('id,created_at,latency,polling,jitter')
        .eq('anon_id', anon_id)
        .order('latency', { ascending: true })
        .limit(1);
      if (data && data.length > 0) setUserBest(data[0] as TestResult);
      setLoading(false);
    }
    fetchBest();
  }, [resultsUpdated]);

  const handleCopy = () => {
    if (!userBest) return;
    const url = `${window.location.origin}/?latency=${userBest.latency}&polling=${userBest.polling}&jitter=${userBest.jitter}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
        <h2 className="text-2xl font-heading text-white mb-2">Compare Your Results</h2>
        <div className="text-gray-400 text-sm">Loading...</div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
      <h2 className="text-2xl font-heading text-white mb-2">Compare Your Results</h2>
      {!userBest ? (
        <div className="text-gray-400 text-sm">No test data yet. Run some tests to see your comparison here!</div>
      ) : (
        <>
          <table className="w-full text-left mt-2">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-2 text-sm text-gray-400 font-medium">Metric</th>
                <th className="py-2 px-2 text-sm text-[#60A5FA] font-medium">Your Best</th>
                <th className="py-2 px-2 text-sm text-gray-400 font-medium">Global Avg</th>
                <th className="py-2 px-2 text-sm text-gray-400 font-medium">Pro Benchmark</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-2 px-2 text-white">Latency (ms)</td>
                <td className="py-2 px-2 text-[#60A5FA] font-bold">{userBest.latency.toFixed(2)}</td>
                <td className="py-2 px-2 text-white">{benchmarks.avg.latency}</td>
                <td className="py-2 px-2 text-white">{benchmarks.pro.latency}</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 px-2 text-white">Polling (Hz)</td>
                <td className="py-2 px-2 text-[#60A5FA] font-bold">{userBest.polling.toFixed(2)}</td>
                <td className="py-2 px-2 text-white">{benchmarks.avg.polling}</td>
                <td className="py-2 px-2 text-white">{benchmarks.pro.polling}</td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-white">Jitter (ms)</td>
                <td className="py-2 px-2 text-[#60A5FA] font-bold">{userBest.jitter.toFixed(2)}</td>
                <td className="py-2 px-2 text-white">{benchmarks.avg.jitter}</td>
                <td className="py-2 px-2 text-white">{benchmarks.pro.jitter}</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={handleCopy}
            className="mt-4 bg-white text-black px-4 py-2 rounded-lg font-medium text-sm hover:shadow transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
            disabled={!userBest}
          >
            {copied ? 'Link copied!' : 'Copy Link'}
          </button>
          <div className="text-xs text-gray-500 mt-2">Benchmarks are for illustration. Pro values reflect top-tier gaming mice and users.</div>
        </>
      )}
    </section>
  );
} 