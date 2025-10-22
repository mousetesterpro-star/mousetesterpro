"use client";
import React, { useState } from "react";

export default function CloudInputDiagnostic() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<any>(null);

  const generateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      const getBrowserInfo = () => {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        return 'Unknown Browser';
      };

      const mockReport = {
        device: {
          browser: getBrowserInfo(),
          platform: navigator.platform,
          screen: `${window.screen.width}x${window.screen.height}`,
          userAgent: navigator.userAgent.substring(0, 50) + '...',
        },
        performance: {
          latency: Math.round((Math.random() * 10 + 5) * 10) / 10,
          polling: Math.round(1000 + Math.random() * 100),
          jitter: Math.round((Math.random() * 0.5) * 100) / 100,
          fps: Math.round(60 + Math.random() * 60),
          memory: Math.round((Math.random() * 2 + 1) * 100) / 100,
        },
        rating: Math.random() > 0.5 ? "Good" : "Excellent",
        recommendations: [
          "Use a wired mouse for best performance",
          "Close unnecessary background applications",
          "Update your mouse drivers regularly",
          "Consider using a gaming mouse for better precision"
        ]
      };
      
      setReport(mockReport);
      setIsGenerating(false);
    }, 2000);
  };

  const copyReport = () => {
    if (report) {
      navigator.clipboard.writeText(JSON.stringify(report, null, 2));
      alert("Report copied to clipboard!");
    }
  };

  const resetReport = () => {
    setReport(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Cloud Diagnostic Report</h3>
        <p className="text-gray-400 text-sm">Generate a comprehensive performance report for your mouse setup</p>
      </div>

      <div className="flex justify-center gap-4">
        {!report && !isGenerating && (
          <button
            onClick={generateReport}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Generate Report
          </button>
        )}
        
        {isGenerating && (
          <button disabled className="px-6 py-2 bg-gray-600 text-white rounded-lg font-medium">
            Generating...
          </button>
        )}
        
        {report && (
          <div className="flex gap-4">
            <button
              onClick={copyReport}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Copy Report
            </button>
            <button
              onClick={resetReport}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              New Report
            </button>
          </div>
        )}
      </div>

      {isGenerating && (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-400 mt-2">Analyzing your system...</p>
        </div>
      )}

      {report && (
        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-medium text-lg">Diagnostic Report</h4>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              report.rating === 'Excellent' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
            }`}>
              {report.rating}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <h5 className="text-white font-medium mb-2">Device Info</h5>
              <div className="space-y-1 text-sm">
                <div><span className="text-gray-400">Browser:</span> <span className="text-white">{report.device.browser}</span></div>
                <div><span className="text-gray-400">Platform:</span> <span className="text-white">{report.device.platform}</span></div>
                <div><span className="text-gray-400">Screen:</span> <span className="text-white">{report.device.screen}</span></div>
                <div><span className="text-gray-400">User Agent:</span> <span className="text-white text-xs">{report.device.userAgent}</span></div>
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <h5 className="text-white font-medium mb-2">Performance</h5>
              <div className="space-y-1 text-sm">
                <div><span className="text-gray-400">Latency:</span> <span className="text-white">{report.performance.latency}ms</span></div>
                <div><span className="text-gray-400">Polling:</span> <span className="text-white">{report.performance.polling}Hz</span></div>
                <div><span className="text-gray-400">Jitter:</span> <span className="text-white">{report.performance.jitter}ms</span></div>
                <div><span className="text-gray-400">FPS:</span> <span className="text-white">{report.performance.fps}</span></div>
                <div><span className="text-gray-400">Memory:</span> <span className="text-white">{report.performance.memory}GB</span></div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <h5 className="text-white font-medium mb-2">Recommendations</h5>
            <ul className="space-y-1 text-sm">
              {report.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-gray-300">• {rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}