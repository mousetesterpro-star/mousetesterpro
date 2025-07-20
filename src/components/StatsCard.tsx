"use client";
import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/utils/supabaseClient';
import { useTestSession } from '@/context/TestSessionContext';

interface TestResult {
  id: string;
  created_at: string;
  latency: number;
  polling: number;
  jitter: number;
}

function calcAverage(arr: number[]) {
  if (!arr.length) return '-';
  return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);
}

function formatStat(val: number) {
  return typeof val === 'number' ? val.toFixed(2) : '-';
}

export default function StatsCard() {
  const [history, setHistory] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { resultsUpdated } = useTestSession();

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError(null);
      
      try {
        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
          setError('Database not configured. Stats will be available once database is set up.');
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
          .order('created_at', { ascending: true });
          
        if (error) {
          console.error('Error fetching stats:', error);
          setError('Failed to load stats from database');
          setHistory([]);
        } else {
          setHistory(data as TestResult[] || []);
        }
      } catch (err) {
        console.error('Error in fetchStats:', err);
        setError('Failed to load stats');
        setHistory([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, [resultsUpdated]);

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
        <h2 className="text-2xl font-heading text-white mb-2">Your Stats</h2>
        <div className="text-gray-400 text-sm">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
        <h2 className="text-2xl font-heading text-white mb-2">Your Stats</h2>
        <div className="text-red-400 text-sm">{error}</div>
      </section>
    );
  }

  if (!history.length) {
    return (
      <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
        <h2 className="text-2xl font-heading text-white mb-2">Your Stats</h2>
        <div className="text-gray-400 text-sm">No test data yet. Run some tests to see your stats here!</div>
      </section>
    );
  }

  const best = history.reduce((a, b) => (a.latency < b.latency ? a : b));
  const avgLatency = calcAverage(history.map(r => r.latency));
  const avgPolling = calcAverage(history.map(r => r.polling));
  const avgJitter = calcAverage(history.map(r => r.jitter));
  const recent = history[history.length - 1];

  return (
    <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
      <h2 className="text-2xl font-heading text-white mb-2">Your Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="bg-[#181c24] border border-[#23272e] rounded-xl p-4 flex flex-col items-center w-full min-w-0 overflow-x-auto">
          <div className="text-sm text-gray-400 mb-1 flex items-center">Best Latency</div>
          <div className="text-2xl md:text-3xl font-bold text-[#60A5FA] font-mono break-words truncate w-full text-center">{formatStat(best.latency)} ms</div>
          <div className="text-xs text-gray-500 mt-1 font-mono">Polling: {formatStat(best.polling)} Hz<br/>Jitter: {formatStat(best.jitter)} ms</div>
        </div>
        <div className="bg-[#181c24] border border-[#23272e] rounded-xl p-4 flex flex-col items-center w-full min-w-0 overflow-x-auto">
          <div className="text-sm text-gray-400 mb-1 flex items-center">Average</div>
          <div className="text-2xl md:text-3xl font-bold text-[#60A5FA] font-mono break-words truncate w-full text-center">{avgLatency} ms</div>
          <div className="text-xs text-gray-500 mt-1 font-mono">Polling: {avgPolling} Hz<br/>Jitter: {avgJitter} ms</div>
        </div>
        <div className="bg-[#181c24] border border-[#23272e] rounded-xl p-4 flex flex-col items-center w-full min-w-0 overflow-x-auto">
          <div className="text-sm text-gray-400 mb-1 flex items-center">Most Recent</div>
          <div className="text-2xl md:text-3xl font-bold text-[#60A5FA] font-mono break-words truncate w-full text-center">{formatStat(recent.latency)} ms</div>
          <div className="text-xs text-gray-500 mt-1 font-mono">Polling: {formatStat(recent.polling)} Hz<br/>Jitter: {formatStat(recent.jitter)} ms</div>
        </div>
      </div>
    </section>
  );
} 