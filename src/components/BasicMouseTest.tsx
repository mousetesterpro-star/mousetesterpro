"use client";

import React, { useState, useRef, useCallback } from 'react';
import { useTestSession } from '@/context/TestSessionContext';

export default function BasicMouseTest() {
  const [testState, setTestState] = useState<'idle' | 'ready' | 'testing' | 'waiting' | 'complete'>('idle');
  const [testStep, setTestStep] = useState(0);
  const [results, setResults] = useState<{latency: number}[]>([]);
  const [countdown, setCountdown] = useState(3);
  const [showTarget, setShowTarget] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [clickCount, setClickCount] = useState(0);
  const [movementSamples, setMovementSamples] = useState(0);
  
  const testAreaRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);
  const pollingDataRef = useRef<number[]>([]);
  const { setLatency, setPolling, setJitter, startTest: contextStartTest } = useTestSession();

  const MAX_CLICKS = 5;
  const MAX_MOVEMENT_SAMPLES = 50;

  const generateRandomPosition = () => {
    const padding = 80;
    const x = padding + Math.random() * (100 - 2 * padding);
    const y = padding + Math.random() * (100 - 2 * padding);
    return { x, y };
  };

  const startClickTest = () => {
    setTestState('ready');
    setTestStep(0);
    setResults([]);
    setClickCount(0);
    setMovementSamples(0);
    pollingDataRef.current = [];
    contextStartTest();
    
    let count = 3;
    setCountdown(count);
    const countdownInterval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(countdownInterval);
        startNextClickTrial();
      }
    }, 1000);
  };

  const startNextClickTrial = () => {
    if (clickCount >= MAX_CLICKS) {
      startMovementTest();
      return;
    }

    setTestState('waiting');
    const delay = 1000 + Math.random() * 2000;
    setTimeout(() => {
      setTargetPosition(generateRandomPosition());
      setShowTarget(true);
      startTimeRef.current = performance.now();
      setTestState('testing');
    }, delay);
  };

  const handleTargetClick = () => {
    if (testState !== 'testing' || !showTarget) return;
    
    const latency = performance.now() - startTimeRef.current;
    setResults(prev => [...prev, { latency }]);
    setShowTarget(false);
    setClickCount(prev => prev + 1);
    
    setTimeout(() => {
      startNextClickTrial();
    }, 500);
  };

  const startMovementTest = () => {
    setTestStep(1);
    setTestState('ready');
    setMovementSamples(0);
    
    setTimeout(() => {
      setTestState('testing');
    }, 1500);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (testState !== 'testing' || testStep !== 1) return;
    
    const now = Date.now();
    if (pollingDataRef.current.length > 0) {
      const lastTime = pollingDataRef.current[pollingDataRef.current.length - 1];
      const interval = now - lastTime;
      if (interval > 0 && interval < 100) {
        pollingDataRef.current.push(now);
      }
    } else {
      pollingDataRef.current.push(now);
    }
    
    setMovementSamples(prev => {
      const newCount = prev + 1;
      if (newCount >= MAX_MOVEMENT_SAMPLES) {
        finishTest();
      }
      return newCount;
    });
  }, [testState, testStep]);

  const finishTest = () => {
    setTestState('complete');
    setTestStep(2);
    
    const avgLatency = results.reduce((sum, r) => sum + r.latency, 0) / results.length;
    
    const intervals: number[] = [];
    for (let i = 1; i < pollingDataRef.current.length; i++) {
      intervals.push(pollingDataRef.current[i] - pollingDataRef.current[i - 1]);
    }
    const avgInterval = intervals.reduce((sum, val) => sum + val, 0) / intervals.length;
    const pollingRate = 1000 / avgInterval;
    
    const mean = avgInterval;
    const squareDiffs = intervals.map(val => Math.pow(val - mean, 2));
    const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / squareDiffs.length;
    const jitter = Math.sqrt(avgSquareDiff);
    
    setLatency(Number(avgLatency.toFixed(2)));
    setPolling(Number(pollingRate.toFixed(0)));
    setJitter(Number(jitter.toFixed(4)));
  };

  const getProgressPercentage = () => {
    if (testStep === 0) {
      return (clickCount / MAX_CLICKS) * 50;
    } else if (testStep === 1) {
      return 50 + (movementSamples / MAX_MOVEMENT_SAMPLES) * 50;
    }
    return 100;
  };

  const getInstructionText = () => {
    if (testState === 'idle') {
      return 'Start the test to measure your mouse performance';
    } else if (testState === 'ready' && countdown > 0) {
      return `Get ready... ${countdown}`;
    } else if (testState === 'waiting') {
      return 'Wait for the target...';
    } else if (testState === 'testing' && testStep === 0) {
      return `Click the target! (${clickCount}/${MAX_CLICKS})`;
    } else if (testState === 'ready' && testStep === 1) {
      return 'Now move your mouse around the area';
    } else if (testState === 'testing' && testStep === 1) {
      return `Keep moving your mouse... (${Math.floor(movementSamples / MAX_MOVEMENT_SAMPLES * 100)}%)`;
    } else if (testState === 'complete') {
      return 'Test complete! Check your results below.';
    }
    return '';
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white mb-4">Quick Mouse Test</h2>
      
      <div className="bg-[#23272e] rounded-xl p-4 mb-4">
        <p className="text-white text-lg font-semibold text-center">
          {getInstructionText()}
        </p>
      </div>

      {testState !== 'idle' && testState !== 'complete' && (
        <div className="mb-4">
          <div className="w-full bg-[#23272e] rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm text-center mt-2">
            {Math.floor(getProgressPercentage())}% complete
          </p>
        </div>
      )}

      <div
        ref={testAreaRef}
        onMouseMove={handleMouseMove}
        className="relative w-full aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl border-2 border-[#0f3460] overflow-hidden cursor-crosshair mb-4"
        style={{ minHeight: '400px' }}
      >
        {testState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center space-y-6">
              <div className="text-6xl">🎯</div>
              <h3 className="text-2xl font-bold text-white">Ready to test your mouse?</h3>
              <p className="text-gray-300 max-w-md mx-auto">
                This test measures your click latency, polling rate, and mouse consistency in under 30 seconds.
              </p>
              <button
                onClick={startClickTest}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Test
              </button>
            </div>
          </div>
        )}

        {testState === 'ready' && countdown > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl font-bold text-white animate-pulse">
              {countdown}
            </div>
          </div>
        )}

        {testState === 'waiting' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl text-gray-400 animate-pulse">
              Wait for it...
            </div>
          </div>
        )}

        {showTarget && testState === 'testing' && testStep === 0 && (
          <div
            className="absolute w-20 h-20 -ml-10 -mt-10 cursor-pointer"
            style={{
              left: `${targetPosition.x}%`,
              top: `${targetPosition.y}%`,
            }}
            onClick={handleTargetClick}
          >
            <div className="w-full h-full bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">!</span>
            </div>
          </div>
        )}

        {testState === 'testing' && testStep === 1 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin mx-auto"></div>
              <p className="text-xl text-white font-semibold">
                Move your mouse around the screen
              </p>
            </div>
          </div>
        )}

        {testState === 'complete' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Test Complete</h3>
              <p className="text-gray-300">
                Analysis results are displayed below
              </p>
              <button
                onClick={startClickTest}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Run New Test
              </button>
            </div>
          </div>
        )}
      </div>

      {testState === 'idle' && (
        <div className="bg-[#23272e] rounded-xl p-4">
          <h4 className="text-white font-semibold mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Test Procedure
          </h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• <strong>Phase 1:</strong> Click targets as they appear to measure click latency</li>
            <li>• <strong>Phase 2:</strong> Move mouse to measure polling rate and jitter</li>
            <li>• <strong>Analysis:</strong> Results are calculated and displayed below</li>
          </ul>
        </div>
      )}
    </div>
  );
}