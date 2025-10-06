"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function MouseTest() {
  const [clicks, setClicks] = useState(0);
  const [scrolls, setScrolls] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClick = () => {
      setClicks(prev => prev + 1);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScrolls(prev => prev + 1);
      
      // Show scroll animation
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    // Add event listeners to the entire window
    window.addEventListener('click', handleClick);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const resetCounts = () => {
    setClicks(0);
    setScrolls(0);
    setIsScrolling(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated Mouse SVG */}
        <div className="relative">
          <svg
            width="200"
            height="120"
            viewBox="0 0 200 120"
            className="mx-auto"
          >
            {/* Mouse Body */}
            <ellipse
              cx="100"
              cy="60"
              rx="80"
              ry="50"
              fill="#f3f4f6"
              stroke="#374151"
              strokeWidth="2"
            />
            
            {/* Left Click Area */}
            <ellipse
              cx="70"
              cy="50"
              rx="25"
              ry="20"
              fill="#3b82f6"
              stroke="#1d4ed8"
              strokeWidth="1"
              className="transition-all duration-200"
            />
            
            {/* Right Click Area */}
            <ellipse
              cx="130"
              cy="50"
              rx="25"
              ry="20"
              fill="#f3f4f6"
              stroke="#374151"
              strokeWidth="1"
            />
            
            {/* Scroll Wheel */}
            <rect
              x="95"
              y="35"
              width="10"
              height="30"
              rx="5"
              fill="#6b7280"
              stroke="#374151"
              strokeWidth="1"
            />
            
            {/* Scroll Wheel Texture */}
            <line x1="100" y1="40" x2="100" y2="60" stroke="#9ca3af" strokeWidth="1" />
            <line x1="100" y1="45" x2="100" y2="55" stroke="#9ca3af" strokeWidth="1" />
            
            {/* Animated Scroll Arrows */}
            {isScrolling && (
              <>
                {/* Up Arrow */}
                <g className="animate-bounce">
                  <polygon
                    points="100,25 95,35 105,35"
                    fill="#3b82f6"
                    stroke="#1d4ed8"
                    strokeWidth="1"
                  />
                </g>
                
                {/* Down Arrow */}
                <g className="animate-bounce" style={{ animationDirection: 'reverse' }}>
                  <polygon
                    points="100,95 95,85 105,85"
                    fill="#3b82f6"
                    stroke="#1d4ed8"
                    strokeWidth="1"
                  />
                </g>
              </>
            )}
            
            {/* Mouse Cable */}
            <line
              x1="20"
              y1="60"
              x2="0"
              y2="60"
              stroke="#6b7280"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">The Test:</h1>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
            <span className="text-lg font-medium text-gray-700">Clicks:</span>
            <span className="text-2xl font-bold text-blue-600">{clicks}</span>
          </div>
          
          <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
            <span className="text-lg font-medium text-gray-700">Scrolls:</span>
            <span className="text-2xl font-bold text-blue-600">{scrolls}</span>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetCounts}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Reset
        </button>

        {/* Instructions */}
        <div className="text-sm text-gray-500 space-y-1">
          <p>Click anywhere to increment clicks</p>
          <p>Scroll anywhere to increment scrolls</p>
        </div>
      </div>
    </div>
  );
}
