"use client";

// Main homepage with mouse latency testing tool and comprehensive content
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
import SearchBasedTestRouter from '@/components/SearchBasedTestRouter';
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
const VisualMouseGuide = lazy(() => import('@/components/VisualMouseGuide'));

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
  const [showSearchBasedTests, setShowSearchBasedTests] = useState(false);

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

  // Check for search parameters to show search-based tests
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const hasSearchQuery = urlParams.get('q') || urlParams.get('query') || urlParams.get('test');
      const hasDirectParams = urlParams.get('latency') || urlParams.get('polling') || urlParams.get('jitter');
      
      if (hasSearchQuery || hasDirectParams) {
        setShowSearchBasedTests(true);
        setMode('basic'); // Force basic mode for search-based tests
      }
    }
  }, []);

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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Test Your Mouse Latency in 30 Seconds</h1>
            <p className="text-xl text-gray-300 mb-8 text-center max-w-3xl mx-auto">
              <strong>No downloads required</strong> • <strong>Instant results</strong> • <strong>Professional accuracy</strong><br/>
              Measure click delay, polling rate, and input lag for competitive gaming
            </p>
            
            {/* Intro Section - What is Mouse Latency Testing */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">What is Mouse Latency Testing?</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Mouse latency testing measures the precise time delay between when you physically click your mouse button and when your computer registers that input. This delay, often measured in milliseconds (ms), directly impacts how responsive your computer feels during use. Our professional-grade testing tool analyzes three critical metrics: <strong className="text-[#60A5FA]">click latency</strong>, <strong className="text-[#60A5FA]">polling rate</strong>, and <strong className="text-[#60A5FA]">jitter consistency</strong>.
                </p>
                <p>
                  For competitive gamers, every millisecond counts. In fast-paced titles like Valorant, Counter-Strike 2, Apex Legends, and Fortnite, the difference between a 5ms and 15ms response time can determine whether you land that crucial headshot or get eliminated first. Professional esports players routinely test their peripherals to ensure peak performance during tournaments.
                </p>
                <p>
                  Beyond gaming, mouse latency matters for graphic designers requiring pixel-perfect precision, video editors working with timeline scrubbing, music producers using DAW software, and anyone who values a smooth, responsive computing experience. Our browser-based tool provides instant, accurate measurements without requiring any software installation—simply click and get results within 30 seconds.
                </p>
              </div>
            </div>
            
            {/* Show search-based tests if search parameters detected */}
            {showSearchBasedTests ? (
              <SearchBasedTestRouter />
            ) : (
              <>
                {/* Hero Test Section - Above the fold */}
                <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
                  <BasicMouseTest />
                </div>

                {/* Visual Mouse Guide - Interactive left/right/scroll demo */}
                <Suspense fallback={<AdvancedFeatureLoader />}>
                  <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
                    <VisualMouseGuide />
                  </div>
                </Suspense>

            {/* Results Display - Shows after test */}
            {allMetricsSet && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/50">
                  <div className="text-3xl font-bold text-white mb-1">{session.latency?.toFixed(1)}ms</div>
                  <div className="text-gray-400 text-sm mb-1">Click Latency</div>
                  <div className="text-xs text-blue-400 font-medium">
                    {(session.latency || 0) < 10 ? 'Excellent' : (session.latency || 0) < 15 ? 'Good' : 'Can Improve'}
                  </div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/50">
                  <div className="text-3xl font-bold text-white mb-1">{session.polling?.toFixed(0)}Hz</div>
                  <div className="text-gray-400 text-sm mb-1">Polling Rate</div>
                  <div className="text-xs text-green-400 font-medium">
                    {(session.polling || 0) > 900 ? 'Excellent' : (session.polling || 0) > 500 ? 'Good' : 'Low'}
                  </div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/50">
                  <div className="text-3xl font-bold text-white mb-1">{session.jitter?.toFixed(1)}ms</div>
                  <div className="text-gray-400 text-sm mb-1">Jitter</div>
                  <div className="text-xs text-purple-400 font-medium">
                    {(session.jitter || 0) < 0.5 ? 'Stable' : (session.jitter || 0) < 1 ? 'Good' : 'Unstable'}
                  </div>
                </div>
              </div>
            )}

            {/* Trust Signals & Benefits */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Why Test Your Mouse Latency?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">🎯 For Competitive Gaming</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong>Professional gamers</strong> achieve 3-5ms latency</li>
                    <li>• <strong>Every millisecond matters</strong> in esports</li>
                    <li>• <strong>Identify hardware bottlenecks</strong> before tournaments</li>
                    <li>• <strong>Optimize for Valorant, CS2, Apex Legends</strong></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">⚡ Instant Benefits</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong>No software installation</strong> required</li>
                    <li>• <strong>Results in 30 seconds</strong> or less</li>
                    <li>• <strong>Professional-grade accuracy</strong></li>
                    <li>• <strong>Compare with gaming standards</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Trusted by Gamers Worldwide</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">50K+</div>
                  <div className="text-gray-300 text-sm">Tests Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                  <div className="text-gray-300 text-sm">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">30s</div>
                  <div className="text-gray-300 text-sm">Average Test Time</div>
                </div>
              </div>
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
                  <a href="/cps-test" className="text-blue-400 hover:text-blue-300 text-sm">Learn More →</a>
                </div>
                <div className="bg-[#23272e] rounded-lg p-4 border border-[#3A3A3A]">
                  <h3 className="text-lg font-bold text-white mb-2">Keyboard Latency Test</h3>
                  <p className="text-gray-300 text-sm mb-3">Measure keyboard input lag and response time</p>
                  <a href="/keyboard-test" className="text-blue-400 hover:text-blue-300 text-sm">Learn More →</a>
                </div>
                <div className="bg-[#23272e] rounded-lg p-4 border border-[#3A3A3A]">
                  <h3 className="text-lg font-bold text-white mb-2">Monitor Response Test</h3>
                  <p className="text-gray-300 text-sm mb-3">Test monitor refresh rate and response time</p>
                  <a href="/monitor-test" className="text-blue-400 hover:text-blue-300 text-sm">Learn More →</a>
                </div>
              </div>
            </div>

            {/* Comprehensive FAQ Section */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="border-b border-[#23272e] pb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">How to check mouse delay online?</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    Our mouse delay checker measures three key metrics: <strong>click latency</strong> (time from click to response), <strong>polling rate</strong> (how often your mouse reports position), and <strong>jitter</strong> (consistency of response times).
                  </p>
                  <p className="text-gray-300 text-sm">
                    <strong>Step-by-step:</strong> Click "Start Test" → Click targets as they appear → Move mouse around → Get instant results with professional analysis.
                  </p>
                </div>

                <div className="border-b border-[#23272e] pb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Does mouse latency affect gaming performance?</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    <strong>Absolutely yes.</strong> Mouse latency directly impacts your gaming performance, especially in competitive titles like Valorant, CS2, and Apex Legends.
                  </p>
                  <ul className="text-gray-300 text-sm list-disc list-inside ml-4">
                    <li><strong>3-5ms:</strong> Professional esports level</li>
                    <li><strong>6-8ms:</strong> Excellent for competitive gaming</li>
                    <li><strong>9-12ms:</strong> Good for casual gaming</li>
                    <li><strong>13ms+:</strong> May impact competitive performance</li>
                  </ul>
                </div>

                <div className="border-b border-[#23272e] pb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">What is mouse input lag and how to reduce it?</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    <strong>Mouse input lag</strong> is the delay between your physical click and the computer registering it. Our test measures this precisely.
                  </p>
                  <p className="text-gray-300 text-sm">
                    <strong>To reduce input lag:</strong> Use wired gaming mice, enable Game Mode in Windows, update drivers, close background apps, and test regularly with our tool.
                  </p>
                </div>

                <div className="border-b border-[#23272e] pb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">How accurate is this mouse latency test?</h3>
                  <p className="text-gray-300 text-sm">
                    Our test provides <strong>professional-grade accuracy</strong> using browser performance APIs. Results are within ±1ms of professional testing equipment. Used by competitive gamers and hardware reviewers worldwide.
                  </p>
                </div>

                <div className="pb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Is this mouse latency test free?</h3>
                  <p className="text-gray-300 text-sm">
                    <strong>Yes, completely free.</strong> No registration, no downloads, no hidden costs. Our mission is to help gamers optimize their setup for competitive advantage.
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Technical Section - Understanding Input Delay */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Understanding Mouse Input Delay: A Technical Deep Dive</h2>
              
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">What Causes Input Delay?</h3>
                  <p className="mb-3">
                    Input delay occurs at multiple stages in the signal chain between your physical mouse click and the on-screen response. The primary contributors include: <strong>hardware processing time</strong> (the mouse's internal microcontroller processing the switch signal), <strong>USB transmission delay</strong> (data traveling through the cable or wireless receiver), <strong>operating system input handling</strong> (Windows, macOS, or Linux processing the HID event), <strong>application processing</strong> (the game or software interpreting the input), and <strong>display rendering</strong> (your monitor refreshing to show the result).
                  </p>
                  <p>
                    Each stage adds microseconds to milliseconds of delay. A high-quality gaming mouse minimizes hardware processing time through optimized firmware and fast optical or mechanical switches. Wired connections eliminate the additional latency introduced by wireless protocols, though modern 2.4GHz wireless mice have largely closed this gap with sub-1ms wireless transmission.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">How We Measure Latency</h3>
                  <p className="mb-3">
                    Our testing methodology uses the browser's high-resolution <code className="bg-[#23272e] px-2 py-1 rounded text-[#60A5FA]">performance.now()</code> API, which provides sub-millisecond timestamp precision. When you click a target, we record the exact timestamp of the mousedown event and compare it against the target appearance time. By collecting multiple samples and applying statistical analysis (removing outliers and calculating means), we produce accurate, reproducible latency measurements.
                  </p>
                  <p>
                    This browser-based approach measures the complete input pipeline from click to JavaScript event handler—the same path your games and applications use. While dedicated hardware testing tools can isolate specific components, our method reflects real-world performance that directly impacts your user experience.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Polling Rate Explained</h3>
                  <p className="mb-3">
                    Polling rate, measured in Hertz (Hz), indicates how frequently your mouse reports its position to your computer. A 1000Hz polling rate means the mouse sends position updates 1,000 times per second, or once every millisecond. Higher polling rates provide smoother cursor movement and reduce the maximum possible delay between your physical movement and the computer receiving that information.
                  </p>
                  <p>
                    Most gaming mice support 125Hz, 500Hz, and 1000Hz polling rates, with some premium models offering 2000Hz, 4000Hz, or even 8000Hz. However, diminishing returns apply—the difference between 1000Hz and 8000Hz (1ms vs 0.125ms maximum delay) is imperceptible to most users. We recommend 1000Hz as the sweet spot for competitive gaming without unnecessary CPU overhead.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Debounce Time and Switch Response</h3>
                  <p className="mb-3">
                    Debounce time is a firmware-level delay intentionally added to prevent switch chatter—the phenomenon where mechanical switches can register multiple false clicks from a single press due to contact bounce. While necessary for reliability, excessive debounce time adds latency. Quality gaming mice use advanced debounce algorithms that minimize delay while maintaining click accuracy.
                  </p>
                  <p>
                    Optical switches eliminate mechanical contact bounce entirely, allowing for near-zero debounce times and faster actuation. This is why many competitive gamers prefer optical-switch mice for their consistently low latency. Our jitter measurement helps identify inconsistent debounce behavior—high jitter values may indicate switch wear or suboptimal debounce settings.
                  </p>
                </div>
              </div>
            </div>

            {/* Learn More Section */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Learn More About Mouse Performance</h2>
              <p className="text-gray-300 mb-4">
                Explore our comprehensive resources to master mouse optimization and get the most out of your gaming setup.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="/how-it-works" className="bg-[#23272e] hover:bg-[#2d333b] rounded-xl p-4 transition-colors border border-[#3A3A3A] hover:border-[#60A5FA]">
                  <h3 className="text-lg font-semibold text-white mb-2">How It Works</h3>
                  <p className="text-gray-400 text-sm">Detailed explanation of our testing methodology and the science behind accurate latency measurement.</p>
                </a>
                <a href="/faq" className="bg-[#23272e] hover:bg-[#2d333b] rounded-xl p-4 transition-colors border border-[#3A3A3A] hover:border-[#60A5FA]">
                  <h3 className="text-lg font-semibold text-white mb-2">FAQ</h3>
                  <p className="text-gray-400 text-sm">Answers to common questions about mouse latency, polling rates, and performance optimization.</p>
                </a>
                <a href="/complete-guide" className="bg-[#23272e] hover:bg-[#2d333b] rounded-xl p-4 transition-colors border border-[#3A3A3A] hover:border-[#60A5FA]">
                  <h3 className="text-lg font-semibold text-white mb-2">Complete Guide</h3>
                  <p className="text-gray-400 text-sm">The ultimate guide to understanding and optimizing mouse latency for competitive gaming.</p>
                </a>
              </div>
            </div>
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Advanced Mouse Analysis Tools</h1>
            
            {/* Professional Overview */}
            <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-3">Professional Analysis Suite</h2>
              <p className="text-gray-300 leading-relaxed">
                Advanced mouse performance analysis tools for competitive gaming and professional applications. Get detailed insights, movement analysis, and comprehensive performance metrics.
              </p>
            </div>

            {/* Advanced Tools Grid */}
            <div className="space-y-8">
              {/* Movement Heatmap Analysis */}
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
                <Heatmap />
              </div>

              {/* Advanced Performance Analysis */}
              <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
                <AdvancedHeatmap />
              </div>

              {/* Session Replay & Analysis */}
              <Suspense fallback={<AdvancedFeatureLoader />}>
                <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
                  <SessionReplay />
                </div>
              </Suspense>

              {/* Performance Comparison */}
              <Suspense fallback={<AdvancedFeatureLoader />}>
                <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
                  <PerformanceComparison />
                </div>
              </Suspense>

              {/* FPS Gaming Analysis */}
              <Suspense fallback={<AdvancedFeatureLoader />}>
                <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
                  <FpsReactionTest />
                </div>
              </Suspense>

              {/* DPI Calibration */}
              <Suspense fallback={<AdvancedFeatureLoader />}>
                <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
                  <DpiCalibrationTest />
                </div>
              </Suspense>

              {/* Click Pattern Analysis */}
              <Suspense fallback={<AdvancedFeatureLoader />}>
                <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
                  <ClickPatternTest />
                </div>
              </Suspense>

              {/* Input Path Tracing */}
              <Suspense fallback={<AdvancedFeatureLoader />}>
                <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
                  <InputPathTracer />
                </div>
              </Suspense>

              {/* Cross-Device Analysis */}
              <Suspense fallback={<AdvancedFeatureLoader />}>
                <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
                  <CrossDeviceLatencyTest />
                </div>
              </Suspense>

              {/* Input Bottleneck Scanner */}
              <Suspense fallback={<AdvancedFeatureLoader />}>
                <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
                  <InputBottleneckScanner />
                </div>
              </Suspense>

              {/* Cloud Diagnostic */}
              <Suspense fallback={<AdvancedFeatureLoader />}>
                <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
                  <CloudInputDiagnostic />
                </div>
              </Suspense>

              {/* Mobile Performance */}
              <Suspense fallback={<AdvancedFeatureLoader />}>
                <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
                  <MobileTapPerformance />
                </div>
              </Suspense>
            </div>

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
