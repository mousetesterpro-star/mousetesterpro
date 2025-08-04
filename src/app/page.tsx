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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center md:text-left">Mouse Performance Dashboard</h1>
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