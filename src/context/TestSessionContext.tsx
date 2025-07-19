"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { supabase } from "@/utils/supabaseClient";

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
}

const TestSessionContext = createContext<TestSessionContextType | undefined>(undefined);

export function useTestSession() {
  const ctx = useContext(TestSessionContext);
  if (!ctx) throw new Error("useTestSession must be used within TestSessionProvider");
  return ctx;
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

  const notifyResultsUpdated = () => setResultsUpdated((v) => v + 1);

  const saveSession = async (next: TestSession) => {
    if (next.latency && next.polling && next.jitter) {
      const anon_id = getAnonId();
      await supabase.from("test_results").insert([
        {
          latency: next.latency,
          polling: next.polling,
          jitter: next.jitter,
          device_info: next.device_info || null,
          anon_id,
        },
      ]);
      notifyResultsUpdated();
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
  };
  const finalizeSession = () => {
    if (session.latency && session.polling && session.jitter && !finalized) {
      saveSession(session);
      setFinalized(true);
    }
  };

  return (
    <TestSessionContext.Provider value={{ session, setLatency, setPolling, setJitter, resetSession, finalizeSession, finalized, resultsUpdated }}>
      {children}
    </TestSessionContext.Provider>
  );
} 