"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useTestSession } from '@/context/TestSessionContext';
import UserGuide from './UserGuide';

interface Benchmark {
  name: string;
  category: 'pro' | 'amateur' | 'casual';
  latency: number;
  polling: number;
  jitter: number;
  description: string;
  color: string;
}

interface ComparisonResult {
  latencyScore: number;
  pollingScore: number;
  jitterScore: number;
  overallScore: number;
  recommendations: string[];
  benchmark: Benchmark;
  performanceLevel: 'excellent' | 'good' | 'average' | 'needs_improvement';
}

const BENCHMARKS: Benchmark[] = [
  {
    name: 'Professional Gamer',
    category: 'pro',
    latency: 3.8,
    polling: 1000,
    jitter: 0.6,
    description: 'Elite competitive gaming performance - tournament level',
    color: 'text-green-400'
  },
  {
    name: 'Esports Player',
    category: 'pro',
    latency: 5.2,
    polling: 1000,
    jitter: 1.0,
    description: 'High-level competitive gaming - semi-pro level',
    color: 'text-blue-400'
  },
  {
    name: 'Advanced Gamer',
    category: 'amateur',
    latency: 7.0,
    polling: 500,
    jitter: 1.8,
    description: 'Skilled gaming performance - experienced player',
    color: 'text-yellow-400'
  },
  {
    name: 'Casual Gamer',
    category: 'casual',
    latency: 10.5,
    polling: 125,
    jitter: 3.2,
    description: 'Standard gaming performance - regular player',
    color: 'text-orange-400'
  },
  {
    name: 'Office Mouse',
    category: 'casual',
    latency: 15.0,
    polling: 125,
    jitter: 6.0,
    description: 'Basic office mouse performance - non-gaming',
    color: 'text-red-400'
  }
];

export default function PerformanceComparison() {
  const { session } = useTestSession();
  const [selectedBenchmark, setSelectedBenchmark] = useState<Benchmark>(BENCHMARKS[0]);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);

  const comparisonResult = useMemo((): ComparisonResult | null => {
    if (!session.latency || !session.polling || !session.jitter) {
      return null;
    }

    const { latency, polling, jitter } = session;
    const benchmark = selectedBenchmark;

    // Enhanced score calculation with better weighting
    const latencyScore = Math.max(0, 100 - Math.abs(latency - benchmark.latency) * 8);
    const pollingScore = Math.max(0, 100 - Math.abs(polling - benchmark.polling) / 8);
    const jitterScore = Math.max(0, 100 - Math.abs(jitter - benchmark.jitter) * 15);
    
    const overallScore = (latencyScore * 0.4 + pollingScore * 0.3 + jitterScore * 0.3);

    // Enhanced recommendations with more specific advice
    const recommendations: string[] = [];
    
    if (latency > benchmark.latency + 3) {
      recommendations.push('🖱️ Consider upgrading to a gaming mouse with better sensor (PixArt 3360/3389)');
    }
    if (polling < benchmark.polling) {
      recommendations.push('⚡ Enable higher polling rate in mouse software (1000Hz recommended)');
    }
    if (jitter > benchmark.jitter + 1.5) {
      recommendations.push('🎯 Practice smooth mouse movements and reduce sensitivity for better control');
    }
    if (latency > 12) {
      recommendations.push('🔧 Check USB port - use USB 3.0/3.1 for better performance');
    }
    if (polling < 500) {
      recommendations.push('📈 Upgrade to a mouse with 1000Hz polling rate for competitive gaming');
    }
    if (latency < 5 && polling >= 1000 && jitter < 1) {
      recommendations.push('🏆 Excellent performance! Your setup is tournament-ready');
    }

    // Determine performance level
    let performanceLevel: 'excellent' | 'good' | 'average' | 'needs_improvement';
    if (overallScore >= 90) performanceLevel = 'excellent';
    else if (overallScore >= 75) performanceLevel = 'good';
    else if (overallScore >= 50) performanceLevel = 'average';
    else performanceLevel = 'needs_improvement';

    return {
      latencyScore,
      pollingScore,
      jitterScore,
      overallScore,
      recommendations,
      benchmark,
      performanceLevel
    };
  }, [session, selectedBenchmark]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-blue-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 50) return 'Average';
    return 'Needs Improvement';
  };

  const getPerformanceLevelColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'average': return 'text-yellow-400';
      case 'needs_improvement': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (!session.latency || !session.polling || !session.jitter) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Performance Comparison</h2>
        <div className="text-gray-400 text-center py-8">
          Complete your mouse tests to compare with industry benchmarks
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">Performance Comparison</h2>
          <UserGuide 
            title="Performance Comparison"
            content="Compare your mouse performance against industry benchmarks. See how you stack up against professional gamers, casual gamers, and office users."
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
            className="px-4 py-2 bg-[#23272e] text-white rounded-lg font-medium hover:bg-gray-700"
          >
            {showDetailedAnalysis ? 'Hide' : 'Show'} Detailed Analysis
          </button>
          <button
            onClick={() => setShowRecommendations(!showRecommendations)}
            className="px-4 py-2 bg-[#23272e] text-white rounded-lg font-medium hover:bg-gray-700"
          >
            {showRecommendations ? 'Hide' : 'Show'} Recommendations
          </button>
        </div>
      </div>

      {/* Enhanced Benchmark Selector */}
      <div className="mb-6">
        <label className="block text-gray-300 text-sm mb-2">Compare against:</label>
        <select
          value={selectedBenchmark.name}
          onChange={(e) => {
            const benchmark = BENCHMARKS.find(b => b.name === e.target.value);
            if (benchmark) setSelectedBenchmark(benchmark);
          }}
          className="bg-[#23272e] text-white rounded-lg px-4 py-2 w-full border border-[#3A3A3A]"
        >
          {BENCHMARKS.map((benchmark) => (
            <option key={benchmark.name} value={benchmark.name}>
              {benchmark.name} - {benchmark.description}
            </option>
          ))}
        </select>
      </div>

      {comparisonResult && (
        <>
          {/* Enhanced Overall Score */}
          <div className="bg-[#23272e] rounded-lg p-6 mb-6 border border-[#3A3A3A]">
            <div className="text-center">
              <div className={`text-5xl font-bold ${getScoreColor(comparisonResult.overallScore)}`}>
                {Math.round(comparisonResult.overallScore)}%
              </div>
              <div className={`text-xl font-semibold ${getPerformanceLevelColor(comparisonResult.performanceLevel)} mb-2`}>
                {getScoreLabel(comparisonResult.overallScore)}
              </div>
              <div className="text-gray-400 text-sm mb-2">
                vs {selectedBenchmark.name} benchmark
              </div>
              <div className={`text-sm font-medium ${getPerformanceLevelColor(comparisonResult.performanceLevel)}`}>
                Performance Level: {comparisonResult.performanceLevel.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          </div>

          {/* Enhanced Score Breakdown */}
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#23272e] rounded-lg p-4 border border-[#3A3A3A]">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(comparisonResult.latencyScore)}`}>
                  {Math.round(comparisonResult.latencyScore)}%
                </div>
                <div className="text-gray-300 text-sm mb-1">Latency Score</div>
                <div className="text-gray-400 text-xs">
                  Your: {session.latency.toFixed(1)}ms | Target: {selectedBenchmark.latency}ms
                </div>
              </div>
            </div>
            
            <div className="bg-[#23272e] rounded-lg p-4 border border-[#3A3A3A]">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(comparisonResult.pollingScore)}`}>
                  {Math.round(comparisonResult.pollingScore)}%
                </div>
                <div className="text-gray-300 text-sm mb-1">Polling Score</div>
                <div className="text-gray-400 text-xs">
                  Your: {session.polling}Hz | Target: {selectedBenchmark.polling}Hz
                </div>
              </div>
            </div>
            
            <div className="bg-[#23272e] rounded-lg p-4 border border-[#3A3A3A]">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(comparisonResult.jitterScore)}`}>
                  {Math.round(comparisonResult.jitterScore)}%
                </div>
                <div className="text-gray-300 text-sm mb-1">Jitter Score</div>
                <div className="text-gray-400 text-xs">
                  Your: {session.jitter.toFixed(1)}ms | Target: {selectedBenchmark.jitter}ms
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Recommendations */}
          {comparisonResult.recommendations.length > 0 && showRecommendations && (
            <div className="bg-[#23272e] rounded-lg p-4 mb-6 border border-[#3A3A3A]">
              <h3 className="text-lg font-semibold text-white mb-3">Improvement Recommendations</h3>
              <div className="space-y-3">
                {comparisonResult.recommendations.map((recommendation, index) => (
                  <div key={index} className="text-gray-300 text-sm flex items-start gap-3 p-2 bg-[#1A1A1A] rounded">
                    <span className="text-lg">{recommendation.split(' ')[0]}</span>
                    <span>{recommendation.split(' ').slice(1).join(' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Detailed Analysis */}
          {showDetailedAnalysis && (
            <div className="bg-[#23272e] rounded-lg p-4 mb-6 border border-[#3A3A3A]">
              <h3 className="text-lg font-semibold text-white mb-3">Detailed Analysis</h3>
              
              <div className="space-y-4">
                {/* Enhanced Latency Analysis */}
                <div className="bg-[#1A1A1A] rounded-lg p-3">
                  <h4 className="text-[#60A5FA] font-semibold mb-2">Latency Analysis</h4>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div>Your latency: <span className="text-white font-semibold">{session.latency.toFixed(1)}ms</span></div>
                    <div>Benchmark: <span className="text-white font-semibold">{selectedBenchmark.latency}ms</span></div>
                    <div>Difference: <span className={session.latency > selectedBenchmark.latency ? 'text-red-400' : 'text-green-400'}>
                      {session.latency > selectedBenchmark.latency ? '+' : ''}{(session.latency - selectedBenchmark.latency).toFixed(1)}ms
                    </span></div>
                    {session.latency > selectedBenchmark.latency + 5 && (
                      <div className="text-yellow-400 text-xs mt-1">⚠️ High latency detected - consider hardware upgrade</div>
                    )}
                    {session.latency < selectedBenchmark.latency && (
                      <div className="text-green-400 text-xs mt-1">✅ Excellent latency performance!</div>
                    )}
                  </div>
                </div>

                {/* Enhanced Polling Analysis */}
                <div className="bg-[#1A1A1A] rounded-lg p-3">
                  <h4 className="text-[#60A5FA] font-semibold mb-2">Polling Rate Analysis</h4>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div>Your polling: <span className="text-white font-semibold">{session.polling}Hz</span></div>
                    <div>Benchmark: <span className="text-white font-semibold">{selectedBenchmark.polling}Hz</span></div>
                    <div>Difference: <span className={session.polling < selectedBenchmark.polling ? 'text-red-400' : 'text-green-400'}>
                      {session.polling < selectedBenchmark.polling ? '-' : '+'}{Math.abs(session.polling - selectedBenchmark.polling)}Hz
                    </span></div>
                    {session.polling < 500 && (
                      <div className="text-yellow-400 text-xs mt-1">⚠️ Low polling rate - upgrade recommended for gaming</div>
                    )}
                    {session.polling >= 1000 && (
                      <div className="text-green-400 text-xs mt-1">✅ Excellent polling rate for competitive gaming!</div>
                    )}
                  </div>
                </div>

                {/* Enhanced Jitter Analysis */}
                <div className="bg-[#1A1A1A] rounded-lg p-3">
                  <h4 className="text-[#60A5FA] font-semibold mb-2">Jitter Analysis</h4>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div>Your jitter: <span className="text-white font-semibold">{session.jitter.toFixed(1)}ms</span></div>
                    <div>Benchmark: <span className="text-white font-semibold">{selectedBenchmark.jitter}ms</span></div>
                    <div>Difference: <span className={session.jitter > selectedBenchmark.jitter ? 'text-red-400' : 'text-green-400'}>
                      {session.jitter > selectedBenchmark.jitter ? '+' : ''}{(session.jitter - selectedBenchmark.jitter).toFixed(1)}ms
                    </span></div>
                    {session.jitter > selectedBenchmark.jitter + 2 && (
                      <div className="text-yellow-400 text-xs mt-1">⚠️ High jitter - practice smooth movements</div>
                    )}
                    {session.jitter < selectedBenchmark.jitter && (
                      <div className="text-green-400 text-xs mt-1">✅ Excellent jitter control!</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Benchmark Info */}
          <div className="bg-[#0D0D0D] rounded-lg p-4 border border-[#3A3A3A]">
            <h3 className="text-lg font-semibold text-white mb-2">About {selectedBenchmark.name}</h3>
            <p className="text-gray-300 text-sm mb-3">{selectedBenchmark.description}</p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Target Latency</div>
                <div className="text-white font-semibold">{selectedBenchmark.latency}ms</div>
              </div>
              <div>
                <div className="text-gray-400">Target Polling</div>
                <div className="text-white font-semibold">{selectedBenchmark.polling}Hz</div>
              </div>
              <div>
                <div className="text-gray-400">Target Jitter</div>
                <div className="text-white font-semibold">{selectedBenchmark.jitter}ms</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 