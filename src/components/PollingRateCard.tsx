import React from 'react';
import PollingRateVisualizer from './PollingRateVisualizer';

export default function PollingRateCard() {
  return (
    <section className="bg-[#181c24] border border-[#23272e] rounded-2xl shadow-lg p-4 md:p-6 mb-2">
      <h2 className="text-2xl font-heading text-white mb-4">Polling Rate</h2>
      <div className="w-full">
        <PollingRateVisualizer />
      </div>
    </section>
  );
} 