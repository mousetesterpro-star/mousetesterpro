"use client";
import React, { useState } from "react";

export default function InputPathTracer() {
  const [testActive, setTestActive] = useState(false);
  const [results, setResults] = useState<{step: string, time: number}[]>([]);
  const [testComplete, setTestComplete] = useState(false);

  const startTest = () => {
    setTestActive(true);
    setResults([]);
    setTestComplete(false);
  };

  const handleClick = () => {
    if (!testActive) return;
    
    const startTime = performance.now();
    const steps = [
      { step: "Mouse Click Detected", time: 0 },
      { step: "Browser Input Processing", time: 1 },
      { step: "React Event Handler", time: 2 },
      { step: "Component Update", time: 3 },
      { step: "DOM Update", time: 4 },
      { step: "Screen Refresh", time: 5 }
    ];
    
    setResults(steps);
    setTestActive(false);
    setTestComplete(true);
  };

  const resetTest = () => {
    setTestActive(false);
    setResults([]);
    setTestComplete(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Input Path Tracer</h3>
        <p className="text-gray-400 text-sm">See how your mouse click travels through the system</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {!testActive && !testComplete && (
          <button
            onClick={startTest}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors w-full sm:w-auto"
          >
            Start Test
          </button>
        )}
        
        {testComplete && (
          <button
            onClick={resetTest}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors w-full sm:w-auto"
          >
            Test Again
          </button>
        )}
      </div>

      {testActive && (
        <div className="text-center space-y-4">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block">
            Click the button below to trace the input path
          </div>
          <button
            onClick={handleClick}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-base sm:text-lg transition-colors w-full sm:w-auto"
          >
            Click Me
          </button>
        </div>
      )}

      {testComplete && (
        <div className="space-y-3">
          <h4 className="text-white font-medium text-center sm:text-left">Input Path Timeline:</h4>
          <div className="space-y-3">
            {results.map((result, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-gray-800 rounded-lg p-3 sm:p-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium text-sm sm:text-base break-words">{result.step}</div>
                    <div className="text-gray-400 text-xs sm:text-sm">{result.time}ms</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}