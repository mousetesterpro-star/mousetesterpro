"use client";
import React, { useRef, useState } from "react";

interface AttemptResult {
  reactionTime: number;
  aimDeviation: number;
}

const CANVAS_SIZE = 400;
const TARGET_RADIUS = 24;

function getRandomPosition() {
  const margin = TARGET_RADIUS + 10;
  return {
    x: Math.random() * (CANVAS_SIZE - 2 * margin) + margin,
    y: Math.random() * (CANVAS_SIZE - 2 * margin) + margin,
  };
}

export default function FpsReactionTest() {
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<AttemptResult[]>([]);
  const [aimPath, setAimPath] = useState<{ x: number; y: number }[]>([]);
  const [testActive, setTestActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Start a new attempt
  const startAttempt = () => {
    setAimPath([]);
    setTestActive(true);
    const pos = getRandomPosition();
    setTarget(pos);
    setTimeout(() => {
      setStartTime(performance.now());
    }, Math.random() * 1000 + 500); // random delay before target appears
  };

  // Handle mouse move for aim path
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!testActive) return;
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    setAimPath((prev) => [
      ...prev,
      {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    ]);
  };

  // Handle click on canvas
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!testActive || !target || startTime === null) return;
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const dx = clickX - target.x;
    const dy = clickY - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const reactionTime = performance.now() - startTime;
    setAttempts((prev) => [
      ...prev,
      {
        reactionTime,
        aimDeviation: distance,
      },
    ]);
    setTestActive(false);
    setTarget(null);
    setStartTime(null);
  };

  // Draw target and aim path
  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    // Draw aim path
    if (aimPath.length > 1) {
      ctx.strokeStyle = "#60A5FA";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(aimPath[0].x, aimPath[0].y);
      for (let i = 1; i < aimPath.length; i++) {
        ctx.lineTo(aimPath[i].x, aimPath[i].y);
      }
      ctx.stroke();
    }
    // Draw target
    if (target) {
      ctx.beginPath();
      ctx.arc(target.x, target.y, TARGET_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = "#60A5FA";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }, [target, aimPath, testActive]);

  return (
    <section className="bg-[#181c24] border border-[#23272e] rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8">
      <h2 className="text-2xl font-heading text-white mb-2">FPS Click Reaction Test</h2>
      <p className="text-gray-400 text-sm mb-4 text-center max-w-md">
        A target will appear at a random spot. Move your mouse and click the target as quickly and accurately as possible. Your aim path and reaction time will be tracked.
      </p>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="bg-[#10131a] rounded-xl border border-[#23272e] mb-4 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onClick={handleCanvasClick}
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <button
        className="bg-[#60A5FA] text-black font-bold px-6 py-2 rounded-lg text-lg shadow hover:bg-[#4090e6] transition mb-4"
        onClick={startAttempt}
        disabled={testActive}
      >
        {testActive ? "Test Running..." : "Start Test"}
      </button>
      {attempts.length > 0 && (
        <div className="w-full max-w-md mt-4">
          <h3 className="text-lg font-bold text-white mb-2">Results</h3>
          <table className="w-full text-left font-mono text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-1 px-2 text-gray-400">Attempt</th>
                <th className="py-1 px-2 text-gray-400">Reaction (ms)</th>
                <th className="py-1 px-2 text-gray-400">Aim Deviation (px)</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((a, i) => (
                <tr key={i} className="border-b border-gray-800">
                  <td className="py-1 px-2 text-white">{i + 1}</td>
                  <td className="py-1 px-2 text-[#60A5FA] font-bold">{a.reactionTime.toFixed(1)}</td>
                  <td className="py-1 px-2 text-white">{a.aimDeviation.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
} 