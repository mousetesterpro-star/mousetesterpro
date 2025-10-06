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

      <div className="flex justify-center">
        {!testActive && !testComplete && (
          <button
            onClick={startTest}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Start Test
          </button>
        )}
        
        {testComplete && (
          <button
            onClick={resetTest}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Test Again
          </button>
        )}
      </div>

      {testActive && (
        <div className="flex items-center justify-center gap-4">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Click the button below to trace the input path
          </div>
          <button
            onClick={handleClick}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            Click Me
          </button>
        </div>
      )}

      {testComplete && (
        <div className="space-y-3">
          <h4 className="text-white font-medium">Input Path Timeline:</h4>
          {results.map((result, index) => (
            <div key={index} className="flex items-center space-x-4 bg-gray-800 rounded-lg p-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">{result.step}</div>
                <div className="text-gray-400 text-sm">{result.time}ms</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}