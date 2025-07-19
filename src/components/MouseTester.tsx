'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import LatencyTester from './LatencyTester';
import PollingRateVisualizer from './PollingRateVisualizer';
import JitterGraph from './JitterGraph';
import TipsPanel from './TipsPanel';

export default function MouseTester() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-[#161b22] rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-white mb-4 w-full text-left">Polling Rate</h2>
          <PollingRateVisualizer />
        </section>
        <section className="bg-[#161b22] rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-white mb-4 w-full text-left">Click Latency</h2>
          <LatencyTester />
        </section>
      </div>
      <section className="bg-[#161b22] rounded-lg p-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-white mb-4 w-full text-left">Jitter Analysis</h2>
        <JitterGraph />
      </section>
      <section className="bg-[#161b22] rounded-lg p-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-white mb-4 w-full text-left">Device Tuning Tips</h2>
        <TipsPanel />
      </section>
    </div>
  );
}