import React from 'react';
import JitterGraph from './JitterGraph';

export default function JitterAnalysisCard() {
  return (
    <section className="bg-gradient-to-br from-[#181c24] to-[#10131a] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
      <h2 className="text-2xl font-heading text-white mb-4">Jitter Analysis</h2>
      <div className="w-full">
        <JitterGraph />
      </div>
    </section>
  );
} 