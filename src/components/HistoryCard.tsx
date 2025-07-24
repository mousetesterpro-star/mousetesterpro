"use client";
import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/utils/supabaseClient';
import { useTestSession } from '@/context/TestSessionContext';
import HistoryItem from './HistoryItem'; // Import the new component

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
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const { resultsUpdated } = useTestSession();

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      setError(null);
      
      try {
        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
          setError('Database not configured. History will be available once database is set up.');
          setHistory([]);
          setLoading(false);
          return;
        }

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
          
        if (error) {
          console.error('Error fetching history:', error);
          setError('Failed to load history from database');
          setHistory([]);
        } else {
          setHistory(data as TestResult[] || []);
        }
      } catch (err) {
        console.error('Error in fetchHistory:', err);
        setError('Failed to load history');
        setHistory([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchHistory();
  }, [resultsUpdated]);

  const shownHistory = expanded ? history : history.slice(0, 5);

  if (loading && !history.length) {
    return (
      <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
        <h2 className="text-2xl font-heading text-white mb-2">Test History</h2>
        <div className="text-gray-400 text-sm">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
        <h2 className="text-2xl font-heading text-white mb-2">Test History</h2>
        <div className="text-red-400 text-sm">{error}</div>
      </section>
    );
  }

  if (!history.length) {
    return (
      <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
        <h2 className="text-2xl font-heading text-white mb-2">Test History</h2>
        <div className="text-gray-400 text-sm">No test history yet. Run some tests to see your results here!</div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
      <h2 className="text-2xl font-heading text-white mb-2">Test History</h2>
      <div className="space-y-3">
        {shownHistory.map((result) => (
          <HistoryItem key={result.id} result={result} />
        ))}
        {history.length > 5 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full py-2 text-[#60A5FA] hover:text-[#4090e6] transition"
          >
            {expanded ? 'Show Less' : `Show ${history.length - 5} More`}
          </button>
        )}
      </div>
    </section>
  );
} 