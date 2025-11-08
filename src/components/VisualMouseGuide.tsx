"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function VisualMouseGuide() {
  const [clicks, setClicks] = useState(0);
  const [scrolls, setScrolls] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = () => {
      setClicks(prev => prev + 1);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScrolls(prev => prev + 1);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('click', handleClick);
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('click', handleClick);
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const resetCounts = () => {
    setClicks(0);
    setScrolls(0);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white mb-4">🖱️ Mouse Guide</h2>
      
      <div
        ref={containerRef}
        className="relative w-full aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl border-2 border-[#0f3460] overflow-hidden mb-4"
        style={{ minHeight: '300px' }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 p-6">
          <div className="text-6xl mb-4">🖱️</div>
          <h3 className="text-xl font-bold text-white">Try clicking and scrolling</h3>
          <p className="text-gray-300 max-w-md">
            Click anywhere or scroll in this area to see your mouse activity
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-[#23272e] rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-[#60A5FA] mb-1">{clicks}</div>
          <div className="text-gray-400 text-sm">Clicks</div>
        </div>
        <div className="bg-[#23272e] rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-[#60A5FA] mb-1">{scrolls}</div>
          <div className="text-gray-400 text-sm">Scrolls</div>
        </div>
      </div>

      <button
        onClick={resetCounts}
        className="w-full bg-[#23272e] hover:bg-[#3A3A3A] text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Reset Count
      </button>
    </div>
  );
}