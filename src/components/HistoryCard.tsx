"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useTestSession } from '@/context/TestSessionContext';

interface TestResult {
  id: string;
  created_at: string;
  latency: number;
  polling: number;
  jitter: number;
}

export default function HistoryCard() {
  const [history, setHistory] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const { resultsUpdated } = useTestSession();

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      let anon_id = '';
      if (typeof window !== 'undefined') {
        anon_id = localStorage.getItem('anon_id') || '';
      }
      if (!anon_id) {
        setHistory([]);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('test_results')
        .select('id,created_at,latency,polling,jitter')
        .eq('anon_id', anon_id)
        .order('created_at', { ascending: false });
      if (data) setHistory(data as TestResult[]);
      setLoading(false);
    }
    fetchHistory();
  }, [resultsUpdated]);

  const handleCopy = (result: TestResult, idx: number) => {
    const url = `${window.location.origin}/?latency=${result.latency}&polling=${result.polling}&jitter=${result.jitter}`;
    navigator.clipboard.writeText(url);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const shownHistory = expanded ? history : history.slice(0, 5);

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-heading text-white">Your Test History</h2>
          {history.length > 5 && (
            <button
              className="bg-[#23272e] text-[#60A5FA] font-bold px-4 py-2 rounded-lg hover:bg-[#10131a] transition ml-4"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
        <div className="text-gray-400 text-sm">Loading...</div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-heading text-white">Your Test History</h2>
        {history.length > 5 && (
          <button
            className="bg-[#23272e] text-[#60A5FA] font-bold px-4 py-2 rounded-lg hover:bg-[#10131a] transition ml-4"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <div className="text-gray-400 text-sm">No test history yet. Run some tests to see your results here!</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left mt-2 font-mono">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-2 text-sm text-gray-400 font-medium">Date</th>
                  <th className="py-2 px-2 text-sm text-gray-400 font-medium">Latency <span className='text-[#60A5FA]'>(ms)</span></th>
                  <th className="py-2 px-2 text-sm text-gray-400 font-medium">Polling <span className='text-[#60A5FA]'>(Hz)</span></th>
                  <th className="py-2 px-2 text-sm text-gray-400 font-medium">Jitter <span className='text-[#60A5FA]'>(ms)</span></th>
                  <th className="py-2 px-2 text-sm text-gray-400 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {shownHistory.map((result, idx) => (
                  <tr key={result.id} className="border-b border-gray-800 hover:bg-[#23272e] transition-all">
                    <td className="py-2 px-2 text-white text-sm">{new Date(result.created_at).toLocaleString()}</td>
                    <td className="py-2 px-2 text-[#60A5FA] font-bold">{result.latency.toFixed(2)}</td>
                    <td className="py-2 px-2 text-[#60A5FA] font-bold">{result.polling.toFixed(2)}</td>
                    <td className="py-2 px-2 text-[#60A5FA] font-bold">{result.jitter.toFixed(2)}</td>
                    <td className="py-2 px-2">
                      <button
                        onClick={() => handleCopy(result, idx)}
                        className="bg-white text-black px-3 py-1 rounded-lg font-medium text-xs hover:shadow transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
                      >
                        {copiedIdx === idx ? 'Link copied!' : 'Copy Link'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {history.length > 5 && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-[#23272e] text-[#60A5FA] font-bold px-4 py-2 rounded-lg hover:bg-[#10131a] transition"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? 'Show Less' : 'Show More'}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
} 