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
import React, { useState, useEffect } from 'react';
import FpsReactionTest from '@/components/FpsReactionTest';
import DpiCalibrationTest from '@/components/DpiCalibrationTest';
import ClickPatternTest from '@/components/ClickPatternTest';
import InputPathTracer from '@/components/InputPathTracer';
import CrossDeviceLatencyTest from '@/components/CrossDeviceLatencyTest';
import InputBottleneckScanner from '@/components/InputBottleneckScanner';
import CloudInputDiagnostic from '@/components/CloudInputDiagnostic';
import MobileTapPerformance from '@/components/MobileTapPerformance';

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
            <div className="w-full flex justify-center my-2">
              {/* AdSense Placeholder: Insert your AdSense code here */}
              <div className="w-full max-w-xl h-24 bg-gray-900 rounded-xl flex items-center justify-center text-gray-400 text-sm border border-gray-800">
                Advertisement
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
            {/* Finish Test Button */}
            <div className="flex justify-center mb-8">
              <button
                className="bg-[#60A5FA] text-black font-bold px-6 py-3 rounded-lg text-lg shadow hover:bg-[#4090e6] transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={finalizeSession}
                disabled={!allMetricsSet || finalized}
              >
                Finish Test & View Report
              </button>
            </div>
            <div className="grid grid-cols-1 gap-8 mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <HistoryCard />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <ComparisonCard />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 flex flex-col">
                <TipsCard />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Advanced dashboard: show all basic cards plus advanced features */}
            <div className="mb-8">
              <FpsReactionTest />
            </div>
            <div className="mb-8">
              <DpiCalibrationTest />
            </div>
            <div className="mb-8">
              <ClickPatternTest />
            </div>
            <div className="mb-8">
              <InputPathTracer />
            </div>
            <div className="mb-8">
              <CrossDeviceLatencyTest />
            </div>
            <div className="mb-8">
              <InputBottleneckScanner />
            </div>
            <div className="mb-8">
              <CloudInputDiagnostic />
            </div>
            <div className="mb-8">
              <MobileTapPerformance />
            </div>
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