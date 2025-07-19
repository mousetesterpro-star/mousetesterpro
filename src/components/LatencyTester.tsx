'use client';

import { useState, useCallback } from 'react';
import { useTestSession } from '@/context/TestSessionContext';

export default function LatencyTester() {
  const [latency, setLatencyLocal] = useState<number | null>(null);
  const [waitingForClick, setWaitingForClick] = useState(false);
  const { setLatency } = useTestSession();

  const startTest = useCallback(() => {
    setWaitingForClick(true);
    setLatencyLocal(null);
    const delay = Math.random() * 2000 + 1000; // 1-3s delay

    setTimeout(() => {
      const startTime = performance.now();

      const clickHandler = () => {
        const endTime = performance.now();
        const result = endTime - startTime;
        setLatencyLocal(result);
        setLatency(result);
        setWaitingForClick(false);
        document.removeEventListener('mousedown', clickHandler);
      };

      document.addEventListener('mousedown', clickHandler);
    }, delay);
  }, [setLatency]);

  return (
    <div className="flex flex-col items-center justify-center h-full py-8">
      <button
        onClick={startTest}
        disabled={waitingForClick}
        className="bg-white text-black font-bold py-3 px-6 rounded-lg shadow-md disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition duration-200 ease-in-out border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
      >
        {waitingForClick ? 'Click the Circle!' : 'Start Latency Test'}
      </button>
      {latency !== null && (
        <p className="text-5xl font-extrabold mt-8 text-white">{(latency).toFixed(2)} ms</p>
      )}
      {waitingForClick && (
        <div className="mt-8 w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center animate-pulse cursor-pointer border-2 border-gray-400"
             onClick={() => document.dispatchEvent(new MouseEvent('mousedown'))}>
          <span className="text-black text-xs font-semibold">CLICK ME</span>
        </div>
      )}
    </div>
  );
}