"use client";
import React, { useRef, useState } from "react";

// Utility for mobile detection
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

export default function MobileTapPerformance() {
  // Tap Delay Test
  const [tapDelay, setTapDelay] = useState<number | null>(null);
  const [tapTestActive, setTapTestActive] = useState(false);
  const tapStartRef = useRef<number | null>(null);

  // Multi-Touch Jitter
  const [multiJitter, setMultiJitter] = useState<number[]>([]);
  const [multiTestActive, setMultiTestActive] = useState(false);

  // Swipe-to-frame
  const [swipeDelays, setSwipeDelays] = useState<number[]>([]);
  const [swipeTestActive, setSwipeTestActive] = useState(false);
  const swipeStartRef = useRef<number | null>(null);

  // Tap Delay Test logic
  const startTapTest = () => {
    setTapTestActive(true);
    setTapDelay(null);
    setTimeout(() => {
      tapStartRef.current = performance.now();
      setTapTestActive(false);
    }, Math.random() * 1000 + 500);
  };
  const handleTap = () => {
    if (tapStartRef.current) {
      setTapDelay(performance.now() - tapStartRef.current);
      tapStartRef.current = null;
    }
  };

  // Multi-Touch Jitter logic
  const startMultiTest = () => {
    setMultiTestActive(true);
    setMultiJitter([]);
  };
  const handleMultiTouch = (e: React.TouchEvent) => {
    if (!multiTestActive) return;
    const now = performance.now();
    setMultiJitter((prev) => [...prev, now]);
    if (multiJitter.length > 10) setMultiTestActive(false);
  };

  // Swipe-to-frame logic
  const startSwipeTest = () => {
    setSwipeTestActive(true);
    setSwipeDelays([]);
  };
  const handleSwipe = (e: React.TouchEvent) => {
    if (!swipeTestActive) return;
    if (e.touches.length === 1 && swipeStartRef.current === null) {
      swipeStartRef.current = performance.now();
    } else if (e.touches.length === 0 && swipeStartRef.current !== null) {
      setSwipeDelays((prev) => [...prev, performance.now() - swipeStartRef.current!]);
      swipeStartRef.current = null;
      if (swipeDelays.length > 5) setSwipeTestActive(false);
    }
  };

  if (!isMobile()) {
    return (
      <section className="bg-[#181c24] border border-[#23272e] rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8">
        <h2 className="text-2xl font-heading text-white mb-2">Mobile Tap Performance Suite</h2>
        <p className="text-gray-400 text-sm mb-4 text-center max-w-md">
          This suite is designed for mobile devices. Please open this page on your phone or tablet to use these tests.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-[#181c24] border border-[#23272e] rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8">
      <h2 className="text-2xl font-heading text-white mb-2">Mobile Tap Performance Suite</h2>
      <p className="text-gray-400 text-sm mb-4 text-center max-w-md">
        Test your mobile tap latency, multi-touch jitter, and swipe-to-frame rendering delay. Great for mobile gamers!
      </p>
      {/* Tap Delay Test */}
      <div className="w-full max-w-xs mb-6 flex flex-col items-center">
        <h3 className="text-lg font-bold text-white mb-2">Tap Delay Test</h3>
        <p className="text-gray-400 text-xs mb-2 text-center">Click 'Start', then tap the circle as soon as it pulses.</p>
        <button
          className="bg-[#60A5FA] text-black font-bold px-6 py-2 rounded-lg text-lg shadow hover:bg-[#4090e6] transition mb-2"
          onClick={startTapTest}
          disabled={tapTestActive}
        >
          {tapTestActive ? "Wait..." : "Start Tap Test"}
        </button>
        <div
          className={`w-full min-w-0 max-w-xs h-32 rounded-full flex items-center justify-center text-xl font-bold ${tapTestActive ? 'bg-[#60A5FA] text-black animate-pulse' : 'bg-[#10131a] text-white border border-[#23272e]'} break-words text-center overflow-x-auto`}
          onTouchStart={handleTap}
        >
          {tapTestActive ? "TAP!" : tapDelay !== null ? `${tapDelay.toFixed(1)} ms` : ""}
        </div>
      </div>
      {/* Multi-Touch Jitter Test */}
      <div className="w-full max-w-xs mb-6 flex flex-col items-center">
        <h3 className="text-lg font-bold text-white mb-2">Multi-Touch Jitter Test</h3>
        <p className="text-gray-400 text-xs mb-2 text-center">Start the test, then tap with multiple fingers at the same time.</p>
        <button
          className="bg-[#60A5FA] text-black font-bold px-6 py-2 rounded-lg text-lg shadow hover:bg-[#4090e6] transition mb-2"
          onClick={startMultiTest}
          disabled={multiTestActive}
        >
          {multiTestActive ? "Testing..." : "Start Multi-Touch Test"}
        </button>
        <div
          className="w-full min-w-0 max-w-xs h-32 rounded-xl flex items-center justify-center text-xl font-bold bg-[#10131a] text-white border border-[#23272e] break-words text-center overflow-x-auto"
          onTouchStart={handleMultiTouch}
        >
          {multiTestActive ? `${multiJitter.length}/10` : multiJitter.length > 0 ? `Jitter: ${multiJitter.length > 1 ? (multiJitter[multiJitter.length-1] - multiJitter[0]).toFixed(1) : "-"} ms` : ""}
        </div>
      </div>
      {/* Swipe-to-Frame Rendering Delay */}
      <div className="w-full max-w-xs mb-6 flex flex-col items-center">
        <h3 className="text-lg font-bold text-white mb-2">Swipe-to-Frame Delay</h3>
        <p className="text-gray-400 text-xs mb-2 text-center">Start the test, then perform a quick swipe across the box below.</p>
        <button
          className="bg-[#60A5FA] text-black font-bold px-6 py-2 rounded-lg text-lg shadow hover:bg-[#4090e6] transition mb-2"
          onClick={startSwipeTest}
          disabled={swipeTestActive}
        >
          {swipeTestActive ? "Testing..." : "Start Swipe Test"}
        </button>
        <div
          className="w-full min-w-0 max-w-xs h-32 rounded-xl flex items-center justify-center text-xl font-bold bg-[#10131a] text-white border border-[#23272e] break-words text-center overflow-x-auto"
          onTouchStart={handleSwipe}
          onTouchEnd={handleSwipe}
        >
          {swipeTestActive ? `${swipeDelays.length}/6` : swipeDelays.length > 0 ? `Avg: ${(swipeDelays.reduce((a, b) => a + b, 0) / swipeDelays.length).toFixed(1)} ms` : ""}
        </div>
      </div>
    </section>
  );
} 