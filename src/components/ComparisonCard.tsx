"use client";
import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/utils/supabaseClient';
import { useTestSession } from '@/context/TestSessionContext';
import CopyBestResultButton from './CopyBestResultButton';

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
  const [error, setError] = useState<string | null>(null);
  const { resultsUpdated } = useTestSession();

  useEffect(() => {
    async function fetchBest() {
      setLoading(true);
      setError(null);
      
      try {
        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
          setError('Database not configured. Comparison will be available once database is set up.');
          setUserBest(null);
          setLoading(false);
          return;
        }

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
          
        if (error) {
          console.error('Error fetching best result:', error);
          setError('Failed to load best result from database');
          setUserBest(null);
        } else {
          setUserBest(data && data.length > 0 ? data[0] as TestResult : null);
        }
      } catch (err) {
        console.error('Error in fetchBest:', err);
        setError('Failed to load best result');
        setUserBest(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBest();
  }, [resultsUpdated]);

  if (loading && !userBest) {
    return (
      <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
        <h2 className="text-2xl font-heading text-white mb-2">Compare Your Results</h2>
        <div className="text-gray-400 text-sm">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
        <h2 className="text-2xl font-heading text-white mb-2">Compare Your Results</h2>
        <div className="text-red-400 text-sm">{error}</div>
      </section>
    );
  }

  if (!userBest) {
    return (
      <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
        <h2 className="text-2xl font-heading text-white mb-2">Compare Your Results</h2>
        <div className="text-gray-400 text-sm">No test data yet. Run some tests to see your best results here!</div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
      <h2 className="text-2xl font-heading text-white mb-2">Compare Your Results</h2>
      <div className="bg-[#181c24] border border-[#23272e] rounded-xl p-4 mb-4">
        <div className="text-sm text-gray-400 mb-2">Your Best Result</div>
        <div className="text-2xl font-bold text-[#60A5FA] font-mono mb-2">{userBest.latency.toFixed(2)} ms</div>
        <div className="text-xs text-gray-500 font-mono">
          Polling: {userBest.polling.toFixed(0)} Hz | Jitter: {userBest.jitter.toFixed(2)} ms
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Achieved on {new Date(userBest.created_at).toLocaleDateString()}
        </div>
      </div>
      <CopyBestResultButton bestResult={userBest} />
    </section>
  );
} 