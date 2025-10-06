"use client";
import React, { useState } from 'react';

interface TestResult {
  id: string;
  created_at: string;
  latency: number;
  polling: number;
  jitter: number;
}

interface HistoryItemProps {
  result: TestResult;
}

const HistoryItem = ({ result }: HistoryItemProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = `https://www.mousetesterpro.com/?latency=${result.latency}&polling=${result.polling}&jitter=${result.jitter}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-[#181c24] border border-[#23272e] rounded-xl p-4 flex justify-between items-center transition-all duration-200 hover:shadow-lg hover:border-[#60A5FA]">
      <div className="flex-1">
        <div className="text-sm text-gray-400 mb-1">
          {new Date(result.created_at).toLocaleDateString()} at {new Date(result.created_at).toLocaleTimeString()}
        </div>
        <div className="text-white font-mono">
          {result.latency.toFixed(2)}ms | {result.polling.toFixed(0)}Hz | {result.jitter.toFixed(2)}ms
        </div>
      </div>
      <button
        onClick={handleCopy}
        className="ml-4 px-3 py-1 bg-[#60A5FA] text-black text-sm rounded hover:bg-[#4090e6] transition"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default React.memo(HistoryItem); 