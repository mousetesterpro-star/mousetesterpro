"use client";
import React, { useState } from "react";

export default function CrossDeviceLatencyTest() {
  const [testActive, setTestActive] = useState(false);
  const [device1, setDevice1] = useState("Device 1");
  const [device2, setDevice2] = useState("Device 2");
  const [results, setResults] = useState<any>(null);
  const [currentTest, setCurrentTest] = useState<'device1' | 'device2' | null>(null);

  const startTest = () => {
    setTestActive(true);
    setCurrentTest('device1');
    setResults(null);
  };

  const completeDeviceTest = () => {
    if (currentTest === 'device1') {
      setCurrentTest('device2');
    } else {
      // Generate mock results
      const mockResults = {
        device1: {
          name: device1,
          latency: Math.round((Math.random() * 5 + 5) * 10) / 10,
          score: Math.round(Math.random() * 20 + 80)
        },
        device2: {
          name: device2,
          latency: Math.round((Math.random() * 5 + 5) * 10) / 10,
          score: Math.round(Math.random() * 20 + 80)
        }
      };
      
      setResults(mockResults);
      setTestActive(false);
      setCurrentTest(null);
    }
  };

  const resetTest = () => {
    setTestActive(false);
    setResults(null);
    setCurrentTest(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Cross-Device Comparison</h3>
        <p className="text-gray-400 text-sm">Compare mouse performance between two devices</p>
      </div>

      {!testActive && !results && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Device 1 Name</label>
              <input
                type="text"
                value={device1}
                onChange={(e) => setDevice1(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g., Wired Mouse"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Device 2 Name</label>
              <input
                type="text"
                value={device2}
                onChange={(e) => setDevice2(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g., Wireless Mouse"
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={startTest}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Start Comparison
            </button>
          </div>
        </div>
      )}

      {testActive && (
        <div className="text-center space-y-4">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block">
            Testing: {currentTest === 'device1' ? device1 : device2}
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-white mb-4">
              Use your <strong>{currentTest === 'device1' ? device1 : device2}</strong> and click the button below
            </p>
            <button
              onClick={completeDeviceTest}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-lg transition-colors"
            >
              Click to Test
            </button>
          </div>
        </div>
      )}

      {results && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <button
              onClick={resetTest}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Test Again
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">{results.device1.name}</h4>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-400">Latency:</span> <span className="text-white">{results.device1.latency}ms</span></div>
                <div><span className="text-gray-400">Score:</span> <span className="text-white">{results.device1.score}/100</span></div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">{results.device2.name}</h4>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-400">Latency:</span> <span className="text-white">{results.device2.latency}ms</span></div>
                <div><span className="text-gray-400">Score:</span> <span className="text-white">{results.device2.score}/100</span></div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <h4 className="text-white font-medium mb-2">Winner</h4>
            <p className="text-lg">
              <span className={results.device1.score > results.device2.score ? 'text-green-400' : 'text-blue-400'}>
                {results.device1.score > results.device2.score ? results.device1.name : results.device2.name}
              </span>
              <span className="text-gray-400"> performs better</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}