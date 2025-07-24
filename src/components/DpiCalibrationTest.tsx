"use client";
import React, { useRef, useState } from "react";

interface AttemptResult {
  drift: number;
  overshoot: number;
  undershoot: number;
  stability: number;
}

const CANVAS_SIZE = 400;
const TARGET_RADIUS = 18;
const PATH_LENGTH = 300;
const MOVE_DURATION = 3000; // ms

function getPathPoints(start: { x: number; y: number }, end: { x: number; y: number }, steps: number) {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    points.push({
      x: start.x + (end.x - start.x) * t,
      y: start.y + (end.y - start.y) * t,
    });
  }
  return points;
}

export default function DpiCalibrationTest() {
  const [attempts, setAttempts] = useState<AttemptResult[]>([]);
  const [testActive, setTestActive] = useState(false);
  const [targetPos, setTargetPos] = useState<{ x: number; y: number } | null>(null);
  const [path, setPath] = useState<{ x: number; y: number }[]>([]);
  const [userPath, setUserPath] = useState<{ x: number; y: number }[]>([]);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const getInstructionText = () => {
    if (testActive) {
      return "Follow the moving target as closely as possible with your mouse.";
    }
    if (attempts.length > 0) {
      return "Calibration complete. Check your results below or start a new test.";
    }
    return "When you're ready, click 'Start Calibration'. A target will appear and move along a path. Follow it with your mouse.";
  };

  // Start a new attempt
  const startAttempt = () => {
    setUserPath([]);
    setTestActive(true);
    setProgress(0);
    // Random start/end points
    const margin = TARGET_RADIUS + 20;
    const start = {
      x: Math.random() * (CANVAS_SIZE - 2 * margin) + margin,
      y: Math.random() * (CANVAS_SIZE - 2 * margin) + margin,
    };
    const angle = Math.random() * 2 * Math.PI;
    const end = {
      x: start.x + Math.cos(angle) * PATH_LENGTH,
      y: start.y + Math.sin(angle) * PATH_LENGTH,
    };
    const clampedEnd = {
      x: Math.max(margin, Math.min(CANVAS_SIZE - margin, end.x)),
      y: Math.max(margin, Math.min(CANVAS_SIZE - margin, end.y)),
    };
    const points = getPathPoints(start, clampedEnd, 100);
    setPath(points);
    setTargetPos(points[0]);
    startTimeRef.current = performance.now();
    animateTarget(points, 0);
  };

  // Animate the moving target
  const animateTarget = (points: { x: number; y: number }[], idx: number) => {
    if (idx >= points.length) {
      setTestActive(false);
      setTargetPos(null);
      analyzeAttempt();
      return;
    }
    setTargetPos(points[idx]);
    setProgress(idx / (points.length - 1));
    animationRef.current = window.setTimeout(() => animateTarget(points, idx + 1), MOVE_DURATION / points.length);
  };

  // Track user mouse path
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!testActive) return;
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    setUserPath((prev) => [
      ...prev,
      {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    ]);
  };

  // Analyze attempt after target finishes
  const analyzeAttempt = () => {
    if (!path.length || !userPath.length) return;
    // Drift: average distance from user path to ideal path
    let driftSum = 0;
    let overshoot = 0;
    let undershoot = 0;
    let stabilitySum = 0;
    const minLen = Math.min(path.length, userPath.length);
    for (let i = 0; i < minLen; i++) {
      const dx = userPath[i].x - path[i].x;
      const dy = userPath[i].y - path[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      driftSum += dist;
      if (dist > TARGET_RADIUS) overshoot++;
      if (dist < TARGET_RADIUS / 2) undershoot++;
      if (i > 0) {
        const dx2 = userPath[i].x - userPath[i - 1].x;
        const dy2 = userPath[i].y - userPath[i - 1].y;
        stabilitySum += Math.sqrt(dx2 * dx2 + dy2 * dy2);
      }
    }
    const drift = driftSum / minLen;
    const stability = stabilitySum / (minLen - 1);
    setAttempts((prev) => [
      ...prev,
      {
        drift,
        overshoot,
        undershoot,
        stability,
      },
    ]);
  };

  // Draw path, target, and user path
  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    // Draw ideal path
    if (path.length > 1) {
      ctx.strokeStyle = "#60A5FA";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }
      ctx.stroke();
    }
    // Draw user path
    if (userPath.length > 1) {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(userPath[0].x, userPath[0].y);
      for (let i = 1; i < userPath.length; i++) {
        ctx.lineTo(userPath[i].x, userPath[i].y);
      }
      ctx.stroke();
    }
    // Draw moving target
    if (targetPos) {
      ctx.beginPath();
      ctx.arc(targetPos.x, targetPos.y, TARGET_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = "#60A5FA";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }, [path, userPath, targetPos]);

  // Cleanup animation on unmount
  React.useEffect(() => {
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, []);

  return (
    <section className="bg-[#181c24] border border-[#23272e] rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8">
      <h2 className="text-2xl font-heading text-white mb-2">DPI Accuracy Calibration Tool</h2>
      <p className="text-gray-400 text-sm mb-4 text-center max-w-md h-10 flex items-center justify-center">
        {getInstructionText()}
      </p>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="bg-[#10131a] rounded-xl border border-[#23272e] mb-4 cursor-crosshair"
        onMouseMove={handleMouseMove}
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <button
        className="bg-[#60A5FA] text-black font-bold px-6 py-2 rounded-lg text-lg shadow hover:bg-[#4090e6] transition mb-4"
        onClick={startAttempt}
        disabled={testActive}
      >
        {testActive ? "Test Running..." : "Start Calibration"}
      </button>
      {attempts.length > 0 && (
        <div className="w-full max-w-md mt-4">
          <h3 className="text-lg font-bold text-white mb-2">Results</h3>
          <table className="w-full text-left font-mono text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-1 px-2 text-gray-400">Attempt</th>
                <th className="py-1 px-2 text-gray-400">Drift (px)</th>
                <th className="py-1 px-2 text-gray-400">Overshoot</th>
                <th className="py-1 px-2 text-gray-400">Undershoot</th>
                <th className="py-1 px-2 text-gray-400">Stability</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((a, i) => (
                <tr key={i} className="border-b border-gray-800">
                  <td className="py-1 px-2 text-white">{i + 1}</td>
                  <td className="py-1 px-2 text-[#60A5FA] font-bold">{a.drift.toFixed(1)}</td>
                  <td className="py-1 px-2 text-white">{a.overshoot}</td>
                  <td className="py-1 px-2 text-white">{a.undershoot}</td>
                  <td className="py-1 px-2 text-white">{a.stability.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
} 