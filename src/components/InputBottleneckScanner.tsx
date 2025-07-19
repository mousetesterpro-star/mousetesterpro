"use client";
import React, { useEffect, useRef, useState } from "react";

const MAX_POINTS = 100;
const THROTTLE_THRESHOLD = 50; // ms, above this is considered throttled

function analyzeIntervals(intervals: number[]) {
  if (intervals.length < 2) return { throttled: false, avg: 0, spikes: 0 };
  const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
  const spikes = intervals.filter((i) => i > THROTTLE_THRESHOLD).length;
  return {
    throttled: spikes > intervals.length * 0.1,
    avg,
    spikes,
  };
}

export default function InputBottleneckScanner() {
  const [intervals, setIntervals] = useState<number[]>([]);
  const [lastTime, setLastTime] = useState<number | null>(null);
  const [focus, setFocus] = useState(true);
  const [warning, setWarning] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<{ throttled: boolean; avg: number; spikes: number }>({ throttled: false, avg: 0, spikes: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = () => {
      const now = performance.now();
      if (lastTime !== null) {
        setIntervals((prev) => {
          const next = [...prev, now - lastTime];
          return next.length > MAX_POINTS ? next.slice(-MAX_POINTS) : next;
        });
      }
      setLastTime(now);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [lastTime]);

  useEffect(() => {
    const onFocus = () => setFocus(true);
    const onBlur = () => setFocus(false);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  useEffect(() => {
    const a = analyzeIntervals(intervals);
    setAnalysis(a);
    if (!focus) {
      setWarning("Browser tab is not focused. Input events may be throttled.");
    } else if (a.throttled) {
      setWarning("Input events are being throttled or delayed. Try closing background tabs, disabling power saving, or using a different browser.");
    } else {
      setWarning(null);
    }
  }, [intervals, focus]);

  // Draw simple interval graph
  useEffect(() => {
    const canvas = containerRef.current?.querySelector("canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 400, 80);
    ctx.strokeStyle = "#60A5FA";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < intervals.length; i++) {
      const x = (i / MAX_POINTS) * 400;
      const y = 80 - Math.min(80, intervals[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }, [intervals]);

  return (
    <section className="bg-[#181c24] border border-[#23272e] rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8">
      <h2 className="text-2xl font-heading text-white mb-2">Browser-to-OS Input Bottleneck Scanner</h2>
      <p className="text-gray-400 text-sm mb-4 text-center max-w-md">
        Move your mouse rapidly. This tool detects if your browser or OS is throttling input events. Watch for spikes or warnings below.
      </p>
      <div ref={containerRef} className="w-full flex flex-col items-center mb-4">
        <canvas width={400} height={80} className="bg-[#10131a] rounded border border-[#23272e]" />
        <div className="text-gray-400 text-xs mt-2">Event interval graph (ms)</div>
      </div>
      <div className="w-full max-w-md mt-2">
        <div className="text-white text-sm mb-1">Average Interval: <span className="text-[#60A5FA] font-bold">{analysis.avg.toFixed(1)} ms</span></div>
        <div className="text-white text-sm mb-1">Spikes Detected: <span className="text-[#60A5FA] font-bold">{analysis.spikes}</span></div>
        {warning && <div className="text-yellow-400 font-bold mt-2">{warning}</div>}
        {!warning && <div className="text-green-400 font-bold mt-2">No bottlenecks detected!</div>}
        <ul className="text-gray-400 text-xs mt-2 list-disc list-inside">
          <li>Keep this tab focused for best results.</li>
          <li>Close background tabs or apps that may use CPU.</li>
          <li>Disable power saving or battery saver modes.</li>
          <li>Try a different browser if issues persist.</li>
        </ul>
      </div>
    </section>
  );
} 