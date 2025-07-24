"use client";
import React, { useState } from "react";

function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      pixelRatio: window.devicePixelRatio,
    },
    vendor: navigator.vendor,
  };
}

function getMockStats() {
  // Replace with real stats from context if available
  return {
    latency: Math.random() * 10 + 5,
    polling: 1000 + Math.random() * 100,
    jitter: Math.random() * 0.5,
    fps: 60,
    timestamp: new Date().toISOString(),
  };
}

export default function CloudInputDiagnostic() {
  const [report, setReport] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const generateReport = () => {
    const device = getDeviceInfo();
    const stats = getMockStats();
    const reportObj = {
      device,
      stats,
      verdict: stats.latency < 10 ? "Excellent" : "Needs Improvement",
      advice: stats.latency < 10 ? "Your setup is optimal for gaming." : "Try using a wired mouse, closing background apps, or updating drivers.",
    };
    setReport(reportObj);
    setShowModal(true);
  };

  const handleCopy = () => {
    if (!report) return;
    navigator.clipboard.writeText(JSON.stringify(report, null, 2));
  };

  const handleDownload = () => {
    if (!report) return;
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `input-diagnostic-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="bg-[#181c24] border border-[#23272e] rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8">
      <h2 className="text-2xl font-heading text-white mb-2">Cloud Input Diagnostic Snapshot</h2>
      <p className="text-gray-400 text-sm mb-4 text-center max-w-md h-10 flex items-center justify-center">
        Click the button to generate a snapshot of your device and performance stats. This is useful for troubleshooting or sharing with support.
      </p>
      <button
        className="bg-[#60A5FA] text-black font-bold px-6 py-2 rounded-lg text-lg shadow hover:bg-[#4090e6] transition mb-4"
        onClick={generateReport}
      >
        Generate Diagnostic Snapshot
      </button>
      {showModal && report && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-[#181c24] rounded-2xl shadow-2xl p-8 max-w-lg w-full relative border border-[#23272e]">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-[#60A5FA] text-2xl font-bold focus:outline-none">×</button>
            <h3 className="text-xl font-bold text-white mb-2">Diagnostic Report</h3>
            <pre className="text-xs text-gray-200 bg-[#10131a] rounded p-2 overflow-x-auto max-h-64 mb-4">{JSON.stringify(report, null, 2)}</pre>
            <div className="flex gap-4">
              <button className="bg-[#60A5FA] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#4090e6] transition" onClick={handleCopy}>Copy JSON</button>
              <button className="bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition" onClick={handleDownload}>Download</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 