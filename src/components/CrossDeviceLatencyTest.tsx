"use client";
import React, { useState, useRef } from "react";

interface DeviceResult {
  device: string;
  latencies: number[];
}

const NUM_ATTEMPTS = 10;

export default function CrossDeviceLatencyTest() {
  const [step, setStep] = useState<"setup" | "test" | "results">("setup");
  const [devices, setDevices] = useState<string[]>(["Device 1", "Device 2"]);
  const [currentDevice, setCurrentDevice] = useState(0);
  const [results, setResults] = useState<DeviceResult[]>([ { device: "Device 1", latencies: [] }, { device: "Device 2", latencies: [] } ]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [summary, setSummary] = useState<{ faster: string; percent: number } | null>(null);

  const getInstructionText = () => {
    if (step === "setup") {
      return "Name two devices you want to compare (e.g., 'Wired Mouse', 'Wireless Mouse'). Then, click 'Start Test' to begin.";
    }
    if (step === "test") {
      return `Testing now. Use your '${devices[currentDevice]}'. Click the button when it pulses.`;
    }
    if (step === "results") {
      return "Test complete! The results below show which device performed better. You can test again with different devices.";
    }
    return "Compare the latency between two different input devices.";
  };

  // Setup device names
  const handleDeviceName = (idx: number, name: string) => {
    setDevices((prev) => prev.map((d, i) => (i === idx ? name : d)));
    setResults((prev) => prev.map((r, i) => ({ ...r, device: i === idx ? name : r.device })));
  };

  // Start the test
  const startTest = () => {
    setStep("test");
    setAttempt(0);
    setResults([ { device: devices[0], latencies: [] }, { device: devices[1], latencies: [] } ]);
    setCurrentDevice(0);
    setWaiting(false);
    setSummary(null);
    setTimeout(() => {
      setWaiting(true);
      setStartTime(performance.now());
    }, Math.random() * 1000 + 500);
  };

  // Handle click for latency
  const handleClick = () => {
    if (!waiting || !startTime) return;
    const latency = performance.now() - startTime;
    setResults((prev) => prev.map((r, i) => i === currentDevice ? { ...r, latencies: [...r.latencies, latency] } : r));
    if (attempt + 1 >= NUM_ATTEMPTS * 2) {
      setStep("results");
      computeSummary();
      return;
    }
    setAttempt((a) => a + 1);
    setCurrentDevice((d) => 1 - d);
    setWaiting(false);
    setTimeout(() => {
      setWaiting(true);
      setStartTime(performance.now());
    }, Math.random() * 1000 + 500);
  };

  // Compute summary after test
  const computeSummary = () => {
    const avg1 = avg(results[0].latencies);
    const avg2 = avg(results[1].latencies);
    let faster = devices[0];
    let percent = 0;
    if (avg2 < avg1) {
      faster = devices[1];
      percent = ((avg1 - avg2) / avg1) * 100;
    } else {
      percent = ((avg2 - avg1) / avg2) * 100;
    }
    setSummary({ faster, percent: Math.abs(percent) });
  };

  // Utility
  function avg(arr: number[]) {
    if (!arr.length) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  // Reset
  const reset = () => {
    setStep("setup");
    setResults([ { device: devices[0], latencies: [] }, { device: devices[1], latencies: [] } ]);
    setAttempt(0);
    setCurrentDevice(0);
    setSummary(null);
  };

  return (
    <section className="bg-[#181c24] border border-[#23272e] rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8">
      <h2 className="text-2xl font-heading text-white mb-2">Cross-Device Latency Sync Test</h2>
      <p className="text-gray-400 text-sm mb-4 text-center max-w-md h-10 flex items-center justify-center">
        {getInstructionText()}
      </p>
      {step === "setup" && (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs mb-4">
          <input
            className="w-full px-4 py-2 rounded-lg border border-[#23272e] bg-[#10131a] text-white mb-2"
            value={devices[0]}
            onChange={e => handleDeviceName(0, e.target.value)}
            placeholder="Device 1 Name"
          />
          <input
            className="w-full px-4 py-2 rounded-lg border border-[#23272e] bg-[#10131a] text-white mb-2"
            value={devices[1]}
            onChange={e => handleDeviceName(1, e.target.value)}
            placeholder="Device 2 Name"
          />
          <button
            className="bg-[#60A5FA] text-black font-bold px-6 py-2 rounded-lg text-lg shadow hover:bg-[#4090e6] transition"
            onClick={startTest}
          >
            Start Test
          </button>
        </div>
      )}
      {step === "test" && (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs mb-4">
          <div className="text-white text-lg font-bold mb-2">{devices[currentDevice]}: Click when ready!</div>
          <button
            className={`bg-white text-black font-bold px-6 py-4 rounded-lg text-xl shadow border border-[#23272e] transition ${waiting ? 'animate-pulse' : 'opacity-50 cursor-not-allowed'}`}
            onClick={handleClick}
            disabled={!waiting}
          >
            {waiting ? 'CLICK!' : 'Wait...'}
          </button>
          <div className="flex gap-4 mt-4">
            <div className="text-gray-400 text-sm">Attempt: {Math.floor(attempt / 2) + 1} / {NUM_ATTEMPTS}</div>
            <div className="text-gray-400 text-sm">Device: {devices[currentDevice]}</div>
          </div>
        </div>
      )}
      {step === "results" && (
        <div className="w-full max-w-md mt-4">
          <h3 className="text-lg font-bold text-white mb-2">Results</h3>
          <table className="w-full text-left font-mono text-sm mb-4">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-1 px-2 text-gray-400">Device</th>
                <th className="py-1 px-2 text-gray-400">Latencies (ms)</th>
                <th className="py-1 px-2 text-gray-400">Average (ms)</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i} className="border-b border-gray-800">
                  <td className="py-1 px-2 text-white font-bold">{r.device}</td>
                  <td className="py-1 px-2 text-white">{r.latencies.map(l => l.toFixed(1)).join(", ")}</td>
                  <td className="py-1 px-2 text-[#60A5FA] font-bold">{avg(r.latencies).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {summary && (
            <div className="text-white text-lg font-bold mb-2">
              Faster Device: <span className="text-[#60A5FA]">{summary.faster}</span> ({summary.percent.toFixed(1)}% faster)
            </div>
          )}
          <button
            className="bg-[#60A5FA] text-black font-bold px-6 py-2 rounded-lg text-lg shadow hover:bg-[#4090e6] transition mt-2"
            onClick={reset}
          >
            Test Again
          </button>
        </div>
      )}
    </section>
  );
} 