"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function VisualMouseGuide() {
  const [clicks, setClicks] = useState(0);
  const [scrolls, setScrolls] = useState(0);
  const [lastAction, setLastAction] = useState<'left' | 'right' | 'scroll' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setClicks(prev => prev + 1);
      setLastAction('left');
      setTimeout(() => setLastAction(null), 1000);
    };

    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      setClicks(prev => prev + 1);
      setLastAction('right');
      setTimeout(() => setLastAction(null), 1000);
    };

    const handleWheel = (e: WheelEvent) => {
      setScrolls(prev => prev + 1);
      setLastAction('scroll');
      setTimeout(() => setLastAction(null), 1000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('click', handleClick);
      container.addEventListener('contextmenu', handleRightClick);
      container.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (container) {
        container.removeEventListener('click', handleClick);
        container.removeEventListener('contextmenu', handleRightClick);
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const resetCounts = () => {
    setClicks(0);
    setScrolls(0);
    setLastAction(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Mouse Activity Monitor</h3>
        <p className="text-gray-400 text-sm">Track your mouse usage in real-time</p>
      </div>

      <div ref={containerRef} className="relative">
        {/* Improved Mouse Design */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Mouse Body - More realistic shape */}
            <div className="w-40 h-24 bg-gray-800 rounded-3xl shadow-xl relative overflow-hidden border border-gray-600">
              {/* Mouse Surface Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-800 rounded-3xl"></div>
              
              {/* Left Click Area */}
              <div className={`absolute left-2 top-2 w-16 h-10 rounded-l-2xl transition-all duration-300 ${
                lastAction === 'left' ? 'bg-blue-500 shadow-lg shadow-blue-500/30' : 'bg-gray-700 hover:bg-gray-600'
              }`}>
                <div className="absolute inset-0 rounded-l-2xl bg-gradient-to-b from-gray-600 to-gray-700 opacity-50"></div>
              </div>
              
              {/* Right Click Area */}
              <div className={`absolute right-2 top-2 w-16 h-10 rounded-r-2xl transition-all duration-300 ${
                lastAction === 'right' ? 'bg-green-500 shadow-lg shadow-green-500/30' : 'bg-gray-700 hover:bg-gray-600'
              }`}>
                <div className="absolute inset-0 rounded-r-2xl bg-gradient-to-b from-gray-600 to-gray-700 opacity-50"></div>
              </div>
              
              {/* Scroll Wheel - More detailed */}
              <div className={`absolute left-1/2 top-2 transform -translate-x-1/2 w-4 h-12 rounded-full transition-all duration-300 ${
                lastAction === 'scroll' ? 'bg-purple-500 shadow-lg shadow-purple-500/30' : 'bg-gray-600'
              }`}>
                <div className="absolute inset-1 bg-gray-400 rounded-full flex flex-col items-center justify-center gap-1">
                  <div className="w-1 h-2 bg-gray-700 rounded-full"></div>
                  <div className="w-1 h-2 bg-gray-700 rounded-full"></div>
                  <div className="w-1 h-2 bg-gray-700 rounded-full"></div>
                </div>
              </div>
              
              {/* Status LED */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full shadow-sm"></div>
              
              {/* Mouse Cable */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-2 bg-gray-600 rounded-full"></div>
              </div>
              
              {/* Subtle Side Grip Texture */}
              <div className="absolute right-1 top-4 w-1 h-16 bg-gray-600 opacity-30 rounded-full"></div>
              <div className="absolute right-2 top-4 w-0.5 h-16 bg-gray-600 opacity-20 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Stats Display */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{clicks}</div>
            <div className="text-gray-400 text-sm">Total Clicks</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{scrolls}</div>
            <div className="text-gray-400 text-sm">Total Scrolls</div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <button
            onClick={resetCounts}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            Reset Counters
          </button>
        </div>

        {/* Simple Instructions */}
        <div className="text-center mt-4">
          <p className="text-gray-500 text-sm">
            Click or scroll anywhere in this area to test your mouse
          </p>
        </div>
      </div>
    </div>
  );
}