"use client";
import React, { useState, useRef } from "react";

interface AttemptResult {
  drift: number;
  stddev: number;
  misses: number;
}

const NUM_BEATS = 16;
const BEAT_INTERVAL = 600; // ms (100 BPM)

export default function ClickPatternTest() {
  const [attempts, setAttempts] = useState<AttemptResult[]>([]);
  const [testActive, setTestActive] = useState(false);
  const [beatIdx, setBeatIdx] = useState(0);
  const [clickTimes, setClickTimes] = useState<number[]>([]);
  const [beatTimes, setBeatTimes] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start a new attempt
  const startAttempt = () => {
    setTestActive(true);
    setBeatIdx(0);
    setClickTimes([]);
    setBeatTimes([]);
    nextBeat(0, performance.now());
  };

  // Advance to next beat
  const nextBeat = (idx: number, start: number) => {
    if (idx >= NUM_BEATS) {
      setTestActive(false);
      analyzeAttempt();
      return;
    }
    setBeatIdx(idx);
    setBeatTimes((prev) => [...prev, performance.now()]);
    timerRef.current = setTimeout(() => nextBeat(idx + 1, start), BEAT_INTERVAL);
  };

  // Handle user click
  const handleClick = () => {
    if (!testActive) return;
    setClickTimes((prev) => [...prev, performance.now()]);
  };

  // Analyze attempt after all beats
  const analyzeAttempt = () => {
    if (!beatTimes.length) return;
    // For each beat, find the closest click
    let driftSum = 0;
    let driftSqSum = 0;
    let misses = 0;
    for (let i = 0; i < beatTimes.length; i++) {
      const beat = beatTimes[i];
      const closest = clickTimes.reduce((min, t) => Math.abs(t - beat) < Math.abs(min - beat) ? t : min, Infinity);
      const drift = Math.abs(closest - beat);
      if (drift > BEAT_INTERVAL / 2) {
        misses++;
      } else {
        driftSum += drift;
        driftSqSum += drift * drift;
      }
    }
    const n = beatTimes.length - misses;
    const avgDrift = n > 0 ? driftSum / n : 0;
    const stddev = n > 1 ? Math.sqrt((driftSqSum - n * avgDrift * avgDrift) / (n - 1)) : 0;
    setAttempts((prev) => [
      ...prev,
      {
        drift: avgDrift,
        stddev,
        misses,
      },
    ]);
  };

  // Cleanup timer on unmount
  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section className="bg-[#181c24] border border-[#23272e] rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8">
      <h2 className="text-2xl font-heading text-white mb-2">Click Timing Pattern Recognition</h2>
      <p className="text-gray-400 text-sm mb-4 text-center max-w-md">
        Click in rhythm with the metronome. Your timing drift, consistency, and missed beats will be measured. Try to keep your clicks as close to the beat as possible!
      </p>
      <div className="flex flex-col items-center mb-4">
        <div className="flex gap-1 mb-2">
          {Array.from({ length: NUM_BEATS }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full ${i === beatIdx && testActive ? 'bg-[#60A5FA]' : 'bg-gray-700'} transition`}
            />
          ))}
        </div>
        <button
          className={`bg-[#60A5FA] text-black font-bold px-6 py-2 rounded-lg text-lg shadow hover:bg-[#4090e6] transition mb-2 ${testActive ? 'animate-pulse' : ''}`}
          onClick={testActive ? handleClick : startAttempt}
        >
          {testActive ? 'Click to the Beat!' : 'Start Test'}
        </button>
      </div>
      {attempts.length > 0 && (
        <div className="w-full max-w-md mt-4">
          <h3 className="text-lg font-bold text-white mb-2">Results</h3>
          <table className="w-full text-left font-mono text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-1 px-2 text-gray-400">Attempt</th>
                <th className="py-1 px-2 text-gray-400">Avg Drift (ms)</th>
                <th className="py-1 px-2 text-gray-400">Consistency (stddev)</th>
                <th className="py-1 px-2 text-gray-400">Misses</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((a, i) => (
                <tr key={i} className="border-b border-gray-800">
                  <td className="py-1 px-2 text-white">{i + 1}</td>
                  <td className="py-1 px-2 text-[#60A5FA] font-bold">{a.drift.toFixed(1)}</td>
                  <td className="py-1 px-2 text-white">{a.stddev.toFixed(1)}</td>
                  <td className="py-1 px-2 text-white">{a.misses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
} 