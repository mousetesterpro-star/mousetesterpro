"use client";

import React, { useState } from 'react';
import { useTestSession } from '@/context/TestSessionContext';

interface Benchmark {
  name: string;
  latency: number;
  polling: number;
  jitter: number;
  description: string;
}

const BENCHMARKS: Benchmark[] = [
  {
    name: 'Professional Gamer',
    latency: 4.0,
    polling: 1000,
    jitter: 0.8,
    description: 'Elite competitive gaming performance'
  },
  {
    name: 'Casual Gamer',
    latency: 8.0,
    polling: 500,
    jitter: 2.0,
    description: 'Standard gaming performance'
  },
  {
    name: 'Office Mouse',
    latency: 12.0,
    polling: 125,
    jitter: 4.0,
    description: 'Basic office mouse performance'
  }
];

export default function PerformanceComparison() {
  const { session } = useTestSession();
  const [selectedBenchmark, setSelectedBenchmark] = useState<Benchmark>(BENCHMARKS[0]);

  if (!session.latency || !session.polling || !session.jitter) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2">Performance Comparison</h3>
          <p className="text-gray-400 text-sm">Compare your mouse performance against industry benchmarks</p>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-400">Complete your mouse tests to compare with industry benchmarks</p>
        </div>
      </div>
    );
  }

  const calculateScore = (userValue: number, targetValue: number, isLowerBetter: boolean = true) => {
    const difference = Math.abs(userValue - targetValue);
    const maxDifference = isLowerBetter ? targetValue * 2 : targetValue;
    return Math.max(0, 100 - (difference / maxDifference) * 100);
  };

  const overallScore = Math.round(
    (calculateScore(session.latency, selectedBenchmark.latency) * 0.4 +
     calculateScore(session.polling, selectedBenchmark.polling, false) * 0.3 +
     calculateScore(session.jitter, selectedBenchmark.jitter) * 0.3)
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Performance Comparison</h3>
        <p className="text-gray-400 text-sm">Compare your mouse performance against industry benchmarks</p>
      </div>

      {/* Benchmark Selector */}
      <div className="flex justify-center">
        <select
          value={selectedBenchmark.name}
          onChange={(e) => {
            const benchmark = BENCHMARKS.find(b => b.name === e.target.value);
            if (benchmark) setSelectedBenchmark(benchmark);
          }}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
        >
          {BENCHMARKS.map((benchmark) => (
            <option key={benchmark.name} value={benchmark.name}>
              {benchmark.name}
            </option>
          ))}
        </select>
      </div>

      {/* Overall Score */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/50">
        <div className={`text-4xl font-bold ${getScoreColor(overallScore)} mb-2`}>
          {overallScore}%
        </div>
        <div className="text-gray-400 text-sm">
          vs {selectedBenchmark.name} benchmark
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
          <div className="text-2xl font-bold text-white mb-1">{session.latency.toFixed(1)}ms</div>
          <div className="text-gray-400 text-sm mb-1">Your Latency</div>
          <div className="text-xs text-gray-500">Target: {selectedBenchmark.latency}ms</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
          <div className="text-2xl font-bold text-white mb-1">{session.polling}Hz</div>
          <div className="text-gray-400 text-sm mb-1">Your Polling</div>
          <div className="text-xs text-gray-500">Target: {selectedBenchmark.polling}Hz</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
          <div className="text-2xl font-bold text-white mb-1">{session.jitter.toFixed(1)}ms</div>
          <div className="text-gray-400 text-sm mb-1">Your Jitter</div>
          <div className="text-xs text-gray-500">Target: {selectedBenchmark.jitter}ms</div>
        </div>
      </div>

      {/* Benchmark Info */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
        <h4 className="text-white font-medium mb-2">{selectedBenchmark.name}</h4>
        <p className="text-gray-400 text-sm">{selectedBenchmark.description}</p>
      </div>
    </div>
  );
} 