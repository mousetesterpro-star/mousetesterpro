"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '@/utils/supabaseClient';

interface TestSession {
  latency?: number;
  polling?: number;
  jitter?: number;
  device_info?: any;
}

interface TestSessionContextType {
  session: TestSession;
  setLatency: (latency: number) => void;
  setPolling: (polling: number) => void;
  setJitter: (jitter: number) => void;
  resetSession: () => void;
  finalizeSession: () => void;
  finalized: boolean;
  resultsUpdated: number;
  isTesting: boolean;
  startTest: () => void;
}

const TestSessionContext = createContext<TestSessionContextType | undefined>(undefined);

export function useTestSession() {
  const context = useContext(TestSessionContext);
  if (context === undefined) {
    throw new Error('useTestSession must be used within a TestSessionProvider');
  }
  return context;
}

function getAnonId() {
  if (typeof window === 'undefined') return '';
  let anonId = localStorage.getItem('anon_id');
  if (!anonId) {
    anonId = crypto.randomUUID();
    localStorage.setItem('anon_id', anonId);
  }
  return anonId;
}

export function TestSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<TestSession>({});
  const [finalized, setFinalized] = useState(false);
  const [resultsUpdated, setResultsUpdated] = useState(0);
  const [isTesting, setIsTesting] = useState(false);

  const notifyResultsUpdated = () => setResultsUpdated((v) => v + 1);
  const startTest = () => {
    resetSession();
    setIsTesting(true);
  };

  const saveSession = async (next: TestSession) => {
    if (next.latency && next.polling && next.jitter) {
      try {
        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
          console.warn('Database not configured. Test results will not be saved.');
          return;
        }

        const anon_id = getAnonId();
        const { error } = await supabase.from("test_results").insert([
          {
            latency: next.latency,
            polling: next.polling,
            jitter: next.jitter,
            device_info: next.device_info || null,
            anon_id,
          },
        ]);
        
        if (error) {
          console.error('Error saving test results:', error);
        } else {
          notifyResultsUpdated();
        }
      } catch (error) {
        console.error('Error in saveSession:', error);
      }
    }
  };

  const setLatency = (latency: number) => {
    setSession((prev) => finalized ? prev : { ...prev, latency });
  };
  const setPolling = (polling: number) => {
    setSession((prev) => finalized ? prev : { ...prev, polling });
  };
  const setJitter = (jitter: number) => {
    setSession((prev) => finalized ? prev : { ...prev, jitter });
  };
  const resetSession = () => {
    setSession({});
    setFinalized(false);
    setIsTesting(false);
  };
  const finalizeSession = () => {
    if (session.latency && session.polling && session.jitter && !finalized) {
      saveSession(session);
      setFinalized(true);
      setIsTesting(false);
    }
  };

  return (
    <TestSessionContext.Provider value={{ session, setLatency, setPolling, setJitter, resetSession, finalizeSession, finalized, resultsUpdated, isTesting, startTest }}>
      {children}
    </TestSessionContext.Provider>
  );
} 