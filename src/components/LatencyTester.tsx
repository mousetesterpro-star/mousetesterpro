'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { useTestSession } from '@/context/TestSessionContext';

export default function LatencyTester() {
  const [latency, setLatencyLocal] = useState<number | null>(null);
  const [waitingForClick, setWaitingForClick] = useState(false);
  const { setLatency } = useTestSession();
  const startTimeRef = useRef<number | null>(null);

  const clickHandler = useCallback(() => {
    if (startTimeRef.current) {
      const endTime = performance.now();
      const result = endTime - startTimeRef.current;
      setLatencyLocal(result);
      setLatency(result);
      setWaitingForClick(false);
      startTimeRef.current = null;
      document.removeEventListener('mousedown', clickHandler);
    }
  }, [setLatency]);

  const startTest = useCallback(() => {
    setWaitingForClick(true);
    setLatencyLocal(null);
    const delay = Math.random() * 2000 + 1000; // 1-3s delay

    setTimeout(() => {
      startTimeRef.current = performance.now();
      document.addEventListener('mousedown', clickHandler);
    }, delay);
  }, [clickHandler]);

  const buttonText = useMemo(() => 
    waitingForClick ? 'Click the Circle!' : 'Start Latency Test', 
    [waitingForClick]
  );

  const buttonClasses = useMemo(() => 
    "bg-white text-black font-bold py-3 px-6 rounded-lg shadow-md disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition duration-200 ease-in-out border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white",
    []
  );

  const latencyDisplay = useMemo(() => 
    latency !== null ? `${latency.toFixed(2)} ms` : null,
    [latency]
  );

  return (
    <div className="flex flex-col items-center justify-center h-full py-8">
      <button
        onClick={startTest}
        disabled={waitingForClick}
        className={buttonClasses}
      >
        {buttonText}
      </button>
      {latencyDisplay && (
        <p className="text-5xl font-extrabold mt-8 text-white">{latencyDisplay}</p>
      )}
      {waitingForClick && (
        <div 
          className="mt-8 w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center animate-pulse cursor-pointer border-2 border-gray-400"
          onClick={() => document.dispatchEvent(new MouseEvent('mousedown'))}
        >
          <span className="text-black text-xs font-semibold">CLICK ME</span>
        </div>
      )}
    </div>
  );
}