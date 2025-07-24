"use client";
import React, { useEffect, useRef, useState } from 'react';
import h337 from 'heatmap.js';

const Heatmap = () => {
  const heatmapContainerRef = useRef<HTMLDivElement>(null);
  const heatmapInstanceRef = useRef<any>(null);
  const [isHeatmapActive, setIsHeatmapActive] = useState(false);

  // Initialize heatmap instance
  useEffect(() => {
    if (heatmapContainerRef.current && !heatmapInstanceRef.current) {
      const heatmap = h337.create({
        container: heatmapContainerRef.current,
        radius: 40,
        maxOpacity: 0.7,
        minOpacity: 0.1,
        blur: .95,
      });
      heatmapInstanceRef.current = heatmap;
    }
  }, []);

  // Add event listeners when testing starts
  useEffect(() => {
    const container = heatmapContainerRef.current;
    if (!container || !isHeatmapActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (heatmapInstanceRef.current) {
        const rect = container.getBoundingClientRect();
        heatmapInstanceRef.current.addData({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          value: 1,
        });
      }
    };

    const handleMouseClick = (e: MouseEvent) => {
      if (heatmapInstanceRef.current) {
        const rect = container.getBoundingClientRect();
        heatmapInstanceRef.current.addData({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          value: 5, // Clicks have a higher value
        });
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleMouseClick);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleMouseClick);
    };
  }, [isHeatmapActive]);

  const startHeatmap = () => {
    if (heatmapInstanceRef.current) {
      const canvas = heatmapInstanceRef.current._renderer.canvas;
      const ctx = canvas.getContext('2d');
      if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      heatmapInstanceRef.current.setData({ max: 0, data: [] });
    }
    setIsHeatmapActive(true);
  };
  
  const stopHeatmap = () => {
      setIsHeatmapActive(false);
  }

  return (
    <div className="bg-[#181c24] border border-[#23272e] rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Mouse Heatmap</h2>
        <p className="text-gray-400 text-sm mb-4">
          {isHeatmapActive ? "Move and click your mouse in the area below to generate the heatmap." : "Click 'Start Heatmap' to begin."}
        </p>
        <div 
          ref={heatmapContainerRef}
          className="relative w-full h-80 bg-black/20 rounded-lg border-2 border-dashed border-gray-600 cursor-crosshair"
          style={{ pointerEvents: isHeatmapActive ? 'auto' : 'none', opacity: isHeatmapActive ? 1 : 0.5 }}
        />
        <div className="flex gap-4 mt-4">
            <button
                onClick={startHeatmap}
                disabled={isHeatmapActive}
                className="bg-green-500 text-white font-bold px-6 py-2 rounded-lg text-lg shadow hover:bg-green-600 transition disabled:opacity-50"
            >
                Start Heatmap
            </button>
            <button
                onClick={stopHeatmap}
                disabled={!isHeatmapActive}
                className="bg-red-500 text-white font-bold px-6 py-2 rounded-lg text-lg shadow hover:bg-red-600 transition disabled:opacity-50"
            >
                Stop Heatmap
            </button>
        </div>
    </div>
  );
};

export default Heatmap; 