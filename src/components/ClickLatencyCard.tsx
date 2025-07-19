import React from 'react';
import LatencyTester from './LatencyTester';

export default function ClickLatencyCard() {
  return (
    <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
      <h2 className="text-2xl font-heading text-white mb-4">Click Latency</h2>
      <div className="w-full">
        <LatencyTester />
      </div>
    </section>
  );
} 