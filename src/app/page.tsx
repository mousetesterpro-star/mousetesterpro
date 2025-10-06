"use client";

import PollingRateCard from '@/components/PollingRateCard';
import ClickLatencyCard from '@/components/ClickLatencyCard';
import JitterAnalysisCard from '@/components/JitterAnalysisCard';
import TipsCard from '@/components/TipsCard';
import HistoryCard from '@/components/HistoryCard';
import DeviceInfoCard from '@/components/DeviceInfoCard';
import ComparisonCard from '@/components/ComparisonCard';
import StatsCard from '@/components/StatsCard';
import SessionReportModal from '@/components/SessionReportModal';
import BasicMouseTest from '@/components/BasicMouseTest';
import { useTestSession } from '@/context/TestSessionContext';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ContentAd } from '@/components/AdSense';

// Lazy load advanced components
const FpsReactionTest = lazy(() => import('@/components/FpsReactionTest'));
const DpiCalibrationTest = lazy(() => import('@/components/DpiCalibrationTest'));
const ClickPatternTest = lazy(() => import('@/components/ClickPatternTest'));
const InputPathTracer = lazy(() => import('@/components/InputPathTracer'));
const CrossDeviceLatencyTest = lazy(() => import('@/components/CrossDeviceLatencyTest'));
const InputBottleneckScanner = lazy(() => import('@/components/InputBottleneckScanner'));
const CloudInputDiagnostic = lazy(() => import('@/components/CloudInputDiagnostic'));
const MobileTapPerformance = lazy(() => import('@/components/MobileTapPerformance'));
const Heatmap = lazy(() => import('@/components/Heatmap')); // Lazy load Heatmap
const AdvancedHeatmap = lazy(() => import('@/components/AdvancedHeatmap'));
const SessionReplay = lazy(() => import('@/components/SessionReplay'));
const PerformanceComparison = lazy(() => import('@/components/PerformanceComparison'));

// Loading component for lazy-loaded features
const AdvancedFeatureLoader = () => (
  <div className="bg-[#181c24] border border-[#23272e] rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#60A5FA] mb-4"></div>
    <p className="text-gray-400 text-sm">Loading advanced feature...</p>
  </div>
);

function isCompleteSession(session: any): session is { latency: number; polling: number; jitter: number; device_info?: any } {
  return (
    typeof session.latency === 'number' &&
    typeof session.polling === 'number' &&
    typeof session.jitter === 'number'
  );
}

export default function Home() {
  const { session, resetSession, finalizeSession, finalized, startTest } = useTestSession();
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<'basic' | 'advanced'>('basic');

  useEffect(() => {
    if (finalized) {
      setShowModal(true);
    }
  }, [finalized]);

  // Auto-finalize session when all metrics are collected
  useEffect(() => {
    if (session.latency && session.polling && session.jitter && !finalized) {
      finalizeSession();
    }
  }, [session.latency, session.polling, session.jitter, finalized, finalizeSession]);

  const handleCloseModal = () => {
    setShowModal(false);
    // Don't reset session here - keep results visible after modal closes
  };

  const allMetricsSet = !!(session.latency && session.polling && session.jitter);

  return (
    <>
      <SessionReportModal isOpen={showModal} onClose={handleCloseModal} session={isCompleteSession(session) ? session : null} />
      <section id="test-area" className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-4">
        <div className="flex justify-center mb-4">
          <div className="inline-flex rounded-xl bg-[#10131a] border border-[#23272e] p-1">
            <button
              className={`px-6 py-2 rounded-lg font-bold text-lg transition ${mode === 'basic' ? 'bg-[#23272e] text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setMode('basic')}
              disabled={mode === 'basic'}
            >
              Basic
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-bold text-lg transition ${mode === 'advanced' ? 'bg-[#23272e] text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setMode('advanced')}
              disabled={mode === 'advanced'}
            >
              Advanced
            </button>
          </div>
        </div>
        {mode === 'basic' ? (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Mouse Performance Analysis Tool</h1>
            
            {/* Hero Test Section - Above the fold */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <BasicMouseTest />
            </div>

            {/* Results Display - Shows after test */}
            {allMetricsSet && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-4xl font-bold text-white">{session.latency?.toFixed(2)}ms</div>
                  <div className="text-blue-100 mt-2">Click Latency</div>
                  <div className="text-sm text-blue-200 mt-1">
                    {(session.latency || 0) < 10 ? 'Excellent' : (session.latency || 0) < 15 ? 'Good' : 'Can Improve'}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-4xl font-bold text-white">{session.polling?.toFixed(0)}Hz</div>
                  <div className="text-green-100 mt-2">Polling Rate</div>
                  <div className="text-sm text-green-200 mt-1">
                    {(session.polling || 0) > 900 ? 'Excellent' : (session.polling || 0) > 500 ? 'Good' : 'Low'}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-4xl font-bold text-white">{session.jitter?.toFixed(2)}ms</div>
                  <div className="text-purple-100 mt-2">Jitter</div>
                  <div className="text-sm text-purple-200 mt-1">
                    {(session.jitter || 0) < 0.5 ? 'Stable' : (session.jitter || 0) < 1 ? 'Good' : 'Unstable'}
                  </div>
                </div>
              </div>
            )}

            {/* Technical Overview */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-3">Performance Analysis</h2>
              <p className="text-gray-300 leading-relaxed">
                Measure <strong>input latency, polling rate, and jitter</strong> with precision instrumentation. This tool provides quantitative analysis of mouse performance characteristics for competitive gaming and professional applications. <strong>Browser-based testing</strong> with millisecond accuracy.
              </p>
            </div>

            {/* AdSense Header Ad */}
            <div className="mb-8">
              <ContentAd />
            </div>

            {/* Device Info - Compact */}
            <div className="grid grid-cols-1 gap-8 mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
                <DeviceInfoCard />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
                <StatsCard />
              </div>
            </div>

            {/* Advanced Details - Collapsible */}
            {allMetricsSet && (
              <details className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8 cursor-pointer">
                <summary className="text-xl font-bold text-white mb-4 cursor-pointer hover:text-blue-400 transition-colors">
                  View Detailed Analysis & Charts
                </summary>
                <div className="mt-6 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6">
                      <PollingRateCard />
                    </div>
                    <div className="p-6">
                      <ClickLatencyCard />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-8">
                    <div className="p-6">
                      <JitterAnalysisCard />
                    </div>
                  </div>
                </div>
              </details>
            )}

            {/* History & Comparison - Collapsible */}
            <details className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8 cursor-pointer">
              <summary className="text-xl font-bold text-white mb-4 cursor-pointer hover:text-blue-400 transition-colors">
                View Test History & Comparisons
              </summary>
              <div className="mt-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6">
                    <HistoryCard />
                  </div>
                  <div className="p-6">
                    <ComparisonCard />
                  </div>
                </div>
              </div>
            </details>

            {/* Optimization Guidelines */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Performance Optimization Guidelines</h2>
              <TipsCard />
            </div>  

            {/* Quick Navigation Links */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Quick Navigation</h2>
              <div className="flex flex-wrap gap-3">
                <a href="#what-is-mouse-latency" className="bg-[#23272e] hover:bg-[#3A3A3A] text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  What is Mouse Latency?
                </a>
                <a href="#how-to-test" className="bg-[#23272e] hover:bg-[#3A3A3A] text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  How to Test Mouse Delay?
                </a>
                <a href="#tips-to-reduce" className="bg-[#23272e] hover:bg-[#3A3A3A] text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Tips to Reduce Input Lag
                </a>
                <a href="#related-tools" className="bg-[#23272e] hover:bg-[#3A3A3A] text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Related Tools
                </a>
              </div>
            </div>

            {/* AdSense Content Ad */}
            <div className="mb-8">
              <ContentAd />
            </div>

            {/* Desktop Gaming Focus Section */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Desktop Mouse Testing Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Desktop Gaming Optimized</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• High-precision latency measurement for desktop gaming</li>
                    <li>• Desktop-optimized CPS (Clicks Per Second) test</li>
                    <li>• Polling rate analysis for gaming mice</li>
                    <li>• Input lag detection for competitive gaming</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Professional Results</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Instant desktop mouse performance analysis</li>
                    <li>• Compare with professional gaming standards</li>
                    <li>• Detailed jitter and response time metrics</li>
                    <li>• Desktop-specific optimization recommendations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* SEO Content Section - Comprehensive */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 id="what-is-mouse-latency" className="text-2xl font-bold text-white mb-6">What is Mouse Latency?</h2>
              <p className="text-gray-300 mb-4">
                Mouse latency, also known as input lag or click response time, measures how quickly your mouse responds to clicks. For <strong>desktop competitive gaming</strong>, even a few milliseconds can make the difference between winning and losing. Our <strong>desktop mouse latency test</strong> helps you identify if your current mouse is holding you back in games like Valorant, CS2, PUBG, or any competitive title.
              </p>
              
              <h3 id="how-to-test" className="text-xl font-bold text-white mb-4 mt-6">How to Test Mouse Delay?</h3>
              <p className="text-gray-300 mb-4">
                Our <strong>desktop mouse response time checker</strong> provides instant results by measuring three key metrics: click latency, polling rate, and jitter. Simply click the test button and perform the required actions. The <strong>desktop mouse input lag test</strong> tool will analyze your mouse performance and provide detailed results within seconds.
              </p>
              
              <h3 id="tips-to-reduce" className="text-xl font-bold text-white mb-4 mt-6">Tips to Reduce Input Lag</h3>
              <ul className="text-gray-300 mb-4 list-disc list-inside space-y-2">
                <li>Use a gaming mouse with high polling rate (1000Hz)</li>
                <li>Enable "Game Mode" in Windows settings</li>
                <li>Update mouse drivers regularly</li>
                <li>Use a wired connection instead of wireless</li>
                <li>Close unnecessary background applications</li>
                <li>Test your <strong>mouse click delay test</strong> regularly to monitor performance</li>
              </ul>
              
              <h3 className="text-xl font-bold text-white mb-4 mt-6">Why Mouse Latency Matters for Gaming</h3>
              <p className="text-gray-300 mb-4">
                Professional gamers typically aim for mouse latency under 8ms for optimal performance. Higher latency can significantly impact your gaming experience, especially in fast-paced competitive games. Our <strong>mouse latency test online</strong> helps you measure your current performance and compare it against professional standards.
              </p>
            </div>

            {/* Related Tools Section */}
            <div id="related-tools" className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Related Gaming Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-[#23272e] rounded-lg p-4 border border-[#3A3A3A]">
                  <h3 className="text-lg font-bold text-white mb-2">Mouse CPS Test</h3>
                  <p className="text-gray-300 text-sm mb-3">Test your clicks per second for gaming performance</p>
                  <a href="/cps-test" className="text-blue-400 hover:text-blue-300 text-sm">Coming Soon →</a>
                </div>
                <div className="bg-[#23272e] rounded-lg p-4 border border-[#3A3A3A]">
                  <h3 className="text-lg font-bold text-white mb-2">Keyboard Latency Test</h3>
                  <p className="text-gray-300 text-sm mb-3">Measure keyboard input lag and response time</p>
                  <a href="/keyboard-test" className="text-blue-400 hover:text-blue-300 text-sm">Coming Soon →</a>
                </div>
                <div className="bg-[#23272e] rounded-lg p-4 border border-[#3A3A3A]">
                  <h3 className="text-lg font-bold text-white mb-2">Monitor Response Test</h3>
                  <p className="text-gray-300 text-sm mb-3">Test monitor refresh rate and response time</p>
                  <a href="/monitor-test" className="text-blue-400 hover:text-blue-300 text-sm">Coming Soon →</a>
                </div>
              </div>
            </div>

            {/* FAQ Section for Rich Snippets */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div className="border-b border-[#23272e] pb-3">
                  <h3 className="text-lg font-semibold text-white mb-2">How to test mouse latency on desktop?</h3>
                  <p className="text-gray-300 text-sm">
                    Use our free desktop mouse latency test. Click start, perform the test, and get instant results showing your mouse response time, polling rate, and jitter analysis.
                  </p>
                </div>

                <div className="border-b border-[#23272e] pb-3">
                  <h3 className="text-lg font-semibold text-white mb-2">What is a good mouse latency for desktop gaming?</h3>
                  <p className="text-gray-300 text-sm">
                    For desktop gaming, aim for mouse latency under 8ms. Professional gamers achieve 3-5ms, while casual gaming is acceptable up to 12ms on desktop.
                  </p>
                </div>

                <div className="pb-3">
                  <h3 className="text-lg font-semibold text-white mb-2">How to test CPS (clicks per second) on desktop?</h3>
                  <p className="text-gray-300 text-sm">
                    Our desktop mouse tester includes a CPS test feature. Simply click rapidly in the designated area and get instant results showing your clicks per second performance.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Advanced dashboard: show advanced features */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center md:text-left">Advanced Mouse Testing Tools</h1>
            
            {/* Quick Intro for Advanced Mode */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <p className="text-gray-300 text-lg leading-relaxed">
                Advanced mouse testing tools for professional gamers and enthusiasts. Get detailed analytics, heatmaps, session replay, and performance comparisons.
              </p>
            </div>

            {/* Basic Mouse Heatmap */}
            <div className="mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 border border-[#3A3A3A]">
                <Heatmap />
              </div>
            </div>

            {/* Advanced Movement Heatmap */}
            <div className="mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 border border-[#3A3A3A]">
                <AdvancedHeatmap />
              </div>
            </div>

            {/* Session Replay */}
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 border border-[#3A3A3A]">
                  <SessionReplay />
                </div>
              </div>
            </Suspense>

            {/* Performance Comparison */}
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <PerformanceComparison />
              </div>
            </Suspense>

            {/* FPS Reaction Test */}
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <FpsReactionTest />
              </div>
            </Suspense>

            {/* DPI Calibration Test */}
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <DpiCalibrationTest />
              </div>
            </Suspense>

            {/* Click Pattern Test */}
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <ClickPatternTest />
              </div>
            </Suspense>

            {/* Input Path Tracer */}
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <InputPathTracer />
              </div>
            </Suspense>

            {/* Cross Device Latency Test */}
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <CrossDeviceLatencyTest />
              </div>
            </Suspense>

            {/* Input Bottleneck Scanner */}
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <InputBottleneckScanner />
              </div>
            </Suspense>

            {/* Cloud Input Diagnostic */}
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <CloudInputDiagnostic />
              </div>
            </Suspense>

            {/* Mobile Tap Performance */}
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <MobileTapPerformance />
              </div>
            </Suspense>

            {/* AdSense Content Ad */}
            <div className="mb-8">
              <ContentAd />
            </div>
          </>
        )}
      </section>
    </>
  );
}
