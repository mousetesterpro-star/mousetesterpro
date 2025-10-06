"use client";
import React, { useState } from "react";

export default function InputBottleneckScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [results, setResults] = useState<any>(null);

  const startScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setResults(null);
    
    // Simulate scanning process
    setTimeout(() => {
      const mockResults = {
        issues: [
          { name: "Background Applications", status: "Good", description: "No heavy background processes detected" },
          { name: "Mouse Drivers", status: "Warning", description: "Consider updating mouse drivers" },
          { name: "System Performance", status: "Good", description: "System running smoothly" },
          { name: "USB Port", status: "Good", description: "Using optimal USB port" }
        ],
        overall: "Good",
        recommendations: [
          "Keep your mouse drivers updated",
          "Close unnecessary browser tabs",
          "Use a USB 3.0 port if available"
        ]
      };
      
      setResults(mockResults);
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  const resetScan = () => {
    setResults(null);
    setScanComplete(false);
    setIsScanning(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "text-green-400";
      case "Warning": return "text-yellow-400";
      case "Critical": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Input Bottleneck Scanner</h3>
        <p className="text-gray-400 text-sm">Scan your system for potential input performance issues</p>
      </div>

      <div className="flex justify-center gap-4">
        {!isScanning && !scanComplete && (
          <button
            onClick={startScan}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Start Scan
          </button>
        )}
        
        {isScanning && (
          <button disabled className="px-6 py-2 bg-gray-600 text-white rounded-lg font-medium">
            Scanning...
          </button>
        )}
        
        {scanComplete && (
          <button
            onClick={resetScan}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Scan Again
          </button>
        )}
      </div>

      {isScanning && (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-400 mt-2">Scanning system for bottlenecks...</p>
        </div>
      )}

      {results && (
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">Scan Results</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                results.overall === 'Good' ? 'bg-green-600 text-white' : 
                results.overall === 'Warning' ? 'bg-yellow-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {results.overall}
              </span>
            </div>
            
            <div className="space-y-3">
              {results.issues.map((issue: any, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                  <div>
                    <div className="text-white font-medium">{issue.name}</div>
                    <div className="text-gray-400 text-sm">{issue.description}</div>
                  </div>
                  <span className={getStatusColor(issue.status)}>
                    {issue.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <h5 className="text-white font-medium mb-2">Recommendations</h5>
            <ul className="space-y-1 text-sm">
              {results.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-gray-300">• {rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}