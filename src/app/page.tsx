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
  const { session, resetSession, finalizeSession, finalized } = useTestSession();
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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center md:text-left">Free Mouse Latency Tester - Professional Gaming Mouse Performance Test Tool</h1>
            
            {/* SEO-Optimized Intro Section */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <p className="text-gray-300 text-lg leading-relaxed">
                Test your mouse latency, click speed, and polling rate instantly with our free online mouse performance tester. Whether you're a competitive gamer in India, a professional esports player in the US, a gaming enthusiast in Europe, or a mobile gamer in Asia, our advanced mouse testing tool provides accurate, real-time results. No downloads required - test your mouse performance directly in your browser and get detailed insights into your gaming peripheral's responsiveness for optimal gaming performance worldwide.
              </p>
            </div>

            {/* FAQ-Style SEO Headers */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">What is Mouse Latency and Why Does It Matter for Competitive Gaming?</h2>
              <p className="text-gray-300 mb-4">
                Mouse latency, also known as click response time, measures how quickly your mouse responds to clicks. For competitive gaming in India, US, Europe, and worldwide, even a few milliseconds can make the difference between winning and losing. Our free mouse latency tester helps you identify if your current mouse is holding you back in games like Valorant, CS2, PUBG, or any competitive title.
              </p>
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">How to Test Mouse Polling Rate and Jitter for Better Gaming Performance</h2>
              <p className="text-gray-300 mb-4">
                Polling rate determines how often your mouse reports its position to your computer. Higher polling rates (1000Hz) provide smoother tracking, while jitter measures consistency. Use our mouse polling rate test to see if your gaming mouse is performing optimally for competitive play, whether you're gaming in India, the US, or anywhere globally.
              </p>
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Which Mouse Latency is Best for Gaming in 2024?</h2>
              <p className="text-gray-300 mb-4">
                Professional gamers worldwide typically aim for mouse latency under 8ms for optimal performance. Our mouse latency tester helps you measure your current performance and compare it against professional standards. Whether you're gaming in India, competing in US tournaments, or playing in European leagues, accurate mouse testing is crucial for competitive advantage.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <DeviceInfoCard />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <StatsCard />
              </div>
            </div>
            {/* Responsive Ad Slot (between Device Info/Stats and main cards) */}
            <ContentAd />
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

            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">How to Improve Mouse Performance for Competitive Gaming</h2>
              <p className="text-gray-300 mb-4">
                Start by testing your current mouse latency and polling rate. If results show high latency or inconsistent polling, consider upgrading to a gaming mouse with better sensors. Our free mouse performance tester helps you make informed decisions about your gaming peripherals, regardless of your location or gaming setup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <HistoryCard />
              </div>
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <ComparisonCard />
              </div>
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Free Mouse Testing Tools vs Paid Software - Which is Better?</h2>
              <p className="text-gray-300 mb-4">
                Our free online mouse latency tester provides professional-grade accuracy without expensive software. Test your mouse performance instantly, get detailed reports, and compare results with other gamers worldwide. No registration or download required - accessible to gamers everywhere.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <TipsCard />
              </div>
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Mouse Latency Test Results - What Do the Numbers Mean?</h2>
              <p className="text-gray-300 mb-4">
                Our mouse testing tool measures three key metrics: Click Latency (response time), Polling Rate (update frequency), and Jitter (consistency). Lower latency numbers indicate better performance, while higher polling rates provide smoother tracking for competitive gaming across all regions and gaming communities.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Advanced dashboard: show all basic cards plus advanced features */}
            <Suspense fallback={<AdvancedFeatureLoader />}>
                <div className="mb-8">
                    <Heatmap />
                </div>
            </Suspense>
            <ContentAd />
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <FpsReactionTest />
              </div>
            </Suspense>
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <DpiCalibrationTest />
              </div>
            </Suspense>
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <ClickPatternTest />
              </div>
            </Suspense>
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <InputPathTracer />
              </div>
            </Suspense>
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <CrossDeviceLatencyTest />
              </div>
            </Suspense>
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <InputBottleneckScanner />
              </div>
            </Suspense>
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <CloudInputDiagnostic />
              </div>
            </Suspense>
            <Suspense fallback={<AdvancedFeatureLoader />}>
              <div className="mb-8">
                <MobileTapPerformance />
              </div>
            </Suspense>
            <ContentAd />
            {/* Placeholder for more advanced features */}
            <div className="bg-[#181c24] border border-[#23272e] rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8">
              <h2 className="text-xl font-bold text-white mb-2">More Advanced Features Coming Soon</h2>
              <p className="text-gray-400 text-sm">Stay tuned for more next-gen mouse testing tools!</p>
            </div>
            {/* You can also show all basic cards here if you want, or only advanced ones */}
          </>
        )}
      </section>
    </>
  );
}