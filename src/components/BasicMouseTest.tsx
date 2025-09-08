"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TestResult {
  type: 'left-click' | 'right-click' | 'scroll';
  latency: number;
  timestamp: number;
  position?: { x: number; y: number };
  scrollDelta?: number;
}

export default function BasicMouseTest() {
  const [isTesting, setIsTesting] = useState(false);
  const [testType, setTestType] = useState<'left-click' | 'right-click' | 'scroll'>('left-click');
  const [results, setResults] = useState<TestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<TestResult | null>(null);
  const [testCount, setTestCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const testAreaRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);
  const testTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = useCallback(() => {
    setIsTesting(true);
    setCurrentTest(null);
    setTestCount(0);
    setResults([]);
    setShowResults(false);
    
    // Start the first test after a random delay
    scheduleNextTest();
  }, []);

  const scheduleNextTest = useCallback(() => {
    if (testCount >= 5) {
      finishTest();
      return;
    }

    // Random delay between 1-3 seconds
    const delay = Math.random() * 2000 + 1000;
    
    testTimeoutRef.current = setTimeout(() => {
      if (testType === 'scroll') {
        // For scroll test, show a visual indicator
        setCurrentTest({
          type: 'scroll',
          latency: 0,
          timestamp: Date.now()
        });
      } else {
        // For click tests, show target area
        setCurrentTest({
          type: testType,
          latency: 0,
          timestamp: Date.now()
        });
      }
      startTimeRef.current = Date.now();
    }, delay);
  }, [testCount, testType]);

  const handleClick = useCallback((e: React.MouseEvent, clickType: 'left-click' | 'right-click') => {
    if (!isTesting || !currentTest || currentTest.type !== clickType) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const endTime = Date.now();
    const latency = endTime - startTimeRef.current;
    
    const rect = testAreaRef.current?.getBoundingClientRect();
    const position = rect ? {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    } : undefined;
    
    const result: TestResult = {
      type: clickType,
      latency,
      timestamp: endTime,
      position
    };
    
    setResults(prev => [...prev, result]);
    setCurrentTest(null);
    setTestCount(prev => prev + 1);
    
    // Schedule next test
    setTimeout(scheduleNextTest, 500);
  }, [isTesting, currentTest, scheduleNextTest]);

  const handleScroll = useCallback((e: React.WheelEvent) => {
    if (!isTesting || !currentTest || currentTest.type !== 'scroll') return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const endTime = Date.now();
    const latency = endTime - startTimeRef.current;
    
    // Only count the first scroll event to avoid multiple registrations
    if (latency < 0) return;
    
    const result: TestResult = {
      type: 'scroll',
      latency,
      timestamp: endTime,
      scrollDelta: e.deltaY
    };
    
    setResults(prev => [...prev, result]);
    setCurrentTest(null);
    setTestCount(prev => prev + 1);
    
    // Schedule next test
    setTimeout(scheduleNextTest, 500);
  }, [isTesting, currentTest, scheduleNextTest]);

  const finishTest = useCallback(() => {
    setIsTesting(false);
    setCurrentTest(null);
    setShowResults(true);
    
    if (testTimeoutRef.current) {
      clearTimeout(testTimeoutRef.current);
    }
  }, []);

  const resetTest = useCallback(() => {
    setIsTesting(false);
    setCurrentTest(null);
    setResults([]);
    setTestCount(0);
    setShowResults(false);
    
    if (testTimeoutRef.current) {
      clearTimeout(testTimeoutRef.current);
    }
  }, []);

  const getAverageLatency = () => {
    if (results.length === 0) return 0;
    const sum = results.reduce((acc, result) => acc + result.latency, 0);
    return Math.round(sum / results.length);
  };

  const getBestLatency = () => {
    if (results.length === 0) return 0;
    return Math.min(...results.map(result => result.latency));
  };

  const getWorstLatency = () => {
    if (results.length === 0) return 0;
    return Math.max(...results.map(result => result.latency));
  };

  const getLatencyGrade = (latency: number) => {
    if (latency < 10) return { grade: 'A+', color: 'text-green-400', description: 'Excellent' };
    if (latency < 20) return { grade: 'A', color: 'text-green-400', description: 'Very Good' };
    if (latency < 30) return { grade: 'B', color: 'text-yellow-400', description: 'Good' };
    if (latency < 50) return { grade: 'C', color: 'text-orange-400', description: 'Average' };
    return { grade: 'D', color: 'text-red-400', description: 'Needs Improvement' };
  };

  useEffect(() => {
    return () => {
      if (testTimeoutRef.current) {
        clearTimeout(testTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Quick Mouse Test</h2>
        <div className="flex gap-2">
          <select
            value={testType}
            onChange={(e) => setTestType(e.target.value as any)}
            className="bg-[#23272e] text-white rounded px-3 py-1 text-sm"
            disabled={isTesting}
          >
            <option value="left-click">Left Click Test</option>
            <option value="right-click">Right Click Test</option>
            <option value="scroll">Scroll Test</option>
          </select>
          {!isTesting && !showResults && (
            <button
              onClick={startTest}
              className="px-4 py-2 bg-[#60A5FA] text-white rounded-lg font-semibold hover:bg-blue-600"
            >
              Start Test
            </button>
          )}
          {showResults && (
            <button
              onClick={resetTest}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700"
            >
              Test Again
            </button>
          )}
        </div>
      </div>

      {/* Test Area */}
             <div 
         ref={testAreaRef}
         className={`relative bg-[#0D0D0D] rounded-lg border-2 border-dashed mb-6 h-[250px] sm:h-[300px] flex items-center justify-center transition-all duration-300 ${
           isTesting && currentTest ? 'border-[#60A5FA] bg-[#0D0D0D]' : 'border-[#23272e]'
         }`}
        onMouseDown={(e) => handleClick(e, 'left-click')}
        onContextMenu={(e) => handleClick(e, 'right-click')}
        onWheel={handleScroll}
      >
        {!isTesting && !showResults && (
          <div className="text-center text-gray-400">
            <p className="text-lg mb-2">Click "Start Test" to begin</p>
            <p className="text-sm">Test your {testType.replace('-', ' ')} response time</p>
          </div>
        )}

                 {isTesting && currentTest && (
           <div className="text-center">
             {testType === 'scroll' ? (
               <div className="bg-[#60A5FA] text-white px-8 py-6 rounded-lg animate-pulse border-2 border-white">
                 <div className="text-4xl mb-2">🖱️</div>
                 <p className="text-xl font-bold mb-2">SCROLL NOW!</p>
                 <p className="text-sm">Scroll your mouse wheel up or down</p>
                 <div className="mt-3 text-xs opacity-75">
                   ⬆️ ⬇️
                 </div>
               </div>
             ) : (
               <div className="bg-red-500 text-white px-6 py-3 rounded-lg animate-pulse">
                 <p className="text-lg font-bold">CLICK NOW!</p>
                 <p className="text-sm">{testType === 'left-click' ? 'Left click here' : 'Right click here'}</p>
               </div>
             )}
           </div>
         )}

        {isTesting && !currentTest && (
          <div className="text-center text-gray-400">
            <p className="text-lg mb-2">Get ready...</p>
            <p className="text-sm">Test {testCount + 1} of 5</p>
          </div>
        )}

        {showResults && (
          <div className="text-center text-gray-400">
            <p className="text-lg mb-2">Test Complete!</p>
            <p className="text-sm">Check results below</p>
          </div>
        )}
      </div>

      {/* Results */}
      {showResults && results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Test Results</h3>
          
          {/* Summary Stats */}
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="bg-[#23272e] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#60A5FA]">{getAverageLatency()}ms</div>
              <div className="text-gray-400 text-sm">Average</div>
            </div>
            <div className="bg-[#23272e] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{getBestLatency()}ms</div>
              <div className="text-gray-400 text-sm">Best</div>
            </div>
            <div className="bg-[#23272e] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{getWorstLatency()}ms</div>
              <div className="text-gray-400 text-sm">Worst</div>
            </div>
            <div className="bg-[#23272e] rounded-lg p-4 text-center">
              <div className={`text-2xl font-bold ${getLatencyGrade(getAverageLatency()).color}`}>
                {getLatencyGrade(getAverageLatency()).grade}
              </div>
              <div className="text-gray-400 text-sm">Grade</div>
            </div>
          </div>

          {/* Individual Results */}
          <div className="bg-[#23272e] rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-3">Individual Results</h4>
            <div className="space-y-2">
              {results.map((result, index) => {
                const grade = getLatencyGrade(result.latency);
                return (
                  <div key={index} className="flex items-center justify-between p-2 bg-[#1A1A1A] rounded">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">#{index + 1}</span>
                      <span className="text-white">{result.type.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-bold ${grade.color}`}>{result.latency}ms</span>
                      <span className={`text-sm ${grade.color}`}>{grade.grade}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Analysis */}
          <div className="bg-[#23272e] rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-3">Performance Analysis</h4>
            <div className="text-gray-300 text-sm space-y-2">
              <p>
                <strong>Grade:</strong> {getLatencyGrade(getAverageLatency()).grade} - {getLatencyGrade(getAverageLatency()).description}
              </p>
              <p>
                <strong>Consistency:</strong> {getWorstLatency() - getBestLatency()}ms variation
              </p>
              <p>
                <strong>Recommendation:</strong> {
                  getAverageLatency() < 20 ? 'Excellent performance! Your mouse is well-optimized.' :
                  getAverageLatency() < 40 ? 'Good performance. Consider checking your mouse settings.' :
                  'Consider upgrading your mouse or checking for driver updates.'
                }
              </p>
            </div>
          </div>
        </div>
      )}

             {/* Instructions */}
       {!isTesting && !showResults && (
         <div className="bg-[#23272e] rounded-lg p-4">
           <h4 className="text-lg font-semibold text-white mb-2">How to Test</h4>
           <div className="text-gray-300 text-sm space-y-1">
             <p>• <strong>Left Click Test:</strong> Click the target when it appears</p>
             <p>• <strong>Right Click Test:</strong> Right-click the target when it appears</p>
             <p>• <strong>Scroll Test:</strong> When you see "SCROLL NOW!", scroll your mouse wheel up or down</p>
             <p>• Each test consists of 5 random trials with 1-3 second delays</p>
             <p>• Results show your average, best, and worst response times</p>
             <p>• <strong>Tip:</strong> Keep your finger ready on the mouse wheel for scroll tests</p>
           </div>
         </div>
       )}
    </div>
  );
}
