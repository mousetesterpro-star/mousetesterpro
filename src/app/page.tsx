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
    resetSession();
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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center md:text-left">Mouse Latency Test (Free & Accurate)</h1>
            
            {/* Quick Intro - Keep it short and focused on the tool */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <p className="text-gray-300 text-lg leading-relaxed">
                Test your gaming mouse performance with <strong>instant results</strong>. Get accurate measurements for latency, polling rate, and jitter. <strong>No download required</strong> - professional-grade results in seconds.
              </p>
              
              {/* Prominent CTA Button */}
              <div className="mt-6 text-center">
                <button 
                  onClick={() => {
                    startTest();
                    const testArea = document.getElementById('test-area');
                    if (testArea) testArea.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Mouse Latency Test Now
                </button>
              </div>
            </div>

            {/* AdSense Header Ad */}
            <div className="mb-8">
              <ContentAd />
            </div>

            <div className="grid grid-cols-1 gap-8 mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <DeviceInfoCard />
              </div>
            </div>
            
            {/* Quick Mouse Test Section */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <BasicMouseTest />
            </div>
            <div className="grid grid-cols-1 gap-8 mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <StatsCard />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <PollingRateCard />
              </div>
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <ClickLatencyCard />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <JitterAnalysisCard />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <HistoryCard />
              </div>
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <ComparisonCard />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <TipsCard />
              </div>
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

            {/* SEO Content Section - Comprehensive */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 id="what-is-mouse-latency" className="text-2xl font-bold text-white mb-6">What is Mouse Latency?</h2>
              <p className="text-gray-300 mb-4">
                Mouse latency, also known as input lag or click response time, measures how quickly your mouse responds to clicks. For competitive gaming, even a few milliseconds can make the difference between winning and losing. Our <strong>mouse latency test online</strong> helps you identify if your current mouse is holding you back in games like Valorant, CS2, PUBG, or any competitive title.
              </p>
              
              <h3 id="how-to-test" className="text-xl font-bold text-white mb-4 mt-6">How to Test Mouse Delay?</h3>
              <p className="text-gray-300 mb-4">
                Our <strong>mouse response time checker</strong> provides instant results by measuring three key metrics: click latency, polling rate, and jitter. Simply click the test button and perform the required actions. The <strong>test mouse input lag</strong> tool will analyze your mouse performance and provide detailed results within seconds.
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
                  <h3 className="text-lg font-semibold text-white mb-2">What is mouse latency?</h3>
                  <p className="text-gray-300 text-sm">
                    Mouse latency is the time delay between when you move or click your mouse and when the action appears on screen. Lower latency means better responsiveness for gaming.
                  </p>
                </div>

                <div className="border-b border-[#23272e] pb-3">
                  <h3 className="text-lg font-semibold text-white mb-2">What is a good mouse latency for gaming?</h3>
                  <p className="text-gray-300 text-sm">
                    For competitive gaming, aim for latency under 10ms. Professional gamers typically achieve 3-8ms, while casual gaming is acceptable up to 15ms.
                  </p>
                </div>

                <div className="pb-3">
                  <h3 className="text-lg font-semibold text-white mb-2">How to reduce mouse latency?</h3>
                  <p className="text-gray-300 text-sm">
                    Use a gaming mouse with high polling rate (1000Hz), connect via USB 3.0, close background programs, and ensure your mouse drivers are updated.
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