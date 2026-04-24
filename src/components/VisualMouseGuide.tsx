"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function VisualMouseGuide() {
  const [clicks, setClicks] = useState(0);
  const [scrolls, setScrolls] = useState(0);
  const [activeButton, setActiveButton] = useState<'left' | 'right' | 'scroll-up' | 'scroll-down' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        // Left click
      e.preventDefault();
      setClicks(prev => prev + 1);
      setActiveButton('left');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setActiveButton(null), 200);
      } else if (e.button === 2) {
        // Right click
      e.preventDefault();
      e.stopPropagation();
      setClicks(prev => prev + 1);
      setActiveButton('right');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setActiveButton(null), 200);
      }
    };

    const handleMouseUp = () => {
      if (activeButton === 'left' || activeButton === 'right') {
        setActiveButton(null);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScrolls(prev => prev + 1);
      
      if (e.deltaY < 0) {
        // Scroll up
        setActiveButton('scroll-up');
      } else {
        // Scroll down
        setActiveButton('scroll-down');
      }
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setActiveButton(null), 200);
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('contextmenu', handleContextMenu);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeButton]);

  const resetCounts = () => {
    setClicks(0);
    setScrolls(0);
    setActiveButton(null);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white mb-4">🖱️ Mouse Guide</h2>
      
      {/* Important Notice */}
      <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <div className="text-blue-400 text-xl mt-0.5">ℹ️</div>
          <div className="flex-1">
            <p className="text-blue-200 text-sm font-medium mb-1">Important: Test Area Only</p>
            <p className="text-blue-300/90 text-xs">
              This test only tracks clicks and scrolls <strong>inside the blue test area below</strong>. 
              Your mouse is working perfectly! 
              <br />
              <strong>Inside test area:</strong> See visual feedback on the mouse icon
              <br />
              <strong>Outside test area:</strong> Normal page scrolling works as usual
            </p>
          </div>
        </div>
      </div>
      
      <div
        ref={containerRef}
        className="relative w-full aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl border-2 border-[#0f3460] overflow-hidden mb-4 cursor-pointer"
        style={{ minHeight: '300px' }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 p-6">
          {/* Simple Mouse Design - Based on HTML version */}
          <div className="relative mb-4 flex items-center justify-center">
              {/* Mouse Body */}
            <div 
              className="relative w-40 h-72 mx-auto bg-[#1c1c1c] rounded-[80px] transition-all duration-200"
              style={{
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.8)'
              }}
            >
                {/* Left Button */}
                <div 
                className={`absolute top-0 left-0 w-1/2 h-[40%] rounded-tl-[80px] transition-all duration-200 ${
                  activeButton === 'left' 
                    ? 'bg-[#4caf50] shadow-[0_0_15px_#4caf50]' 
                    : 'bg-[#2a2a2a]'
                  }`}
                />
                
                {/* Right Button */}
                <div 
                className={`absolute top-0 right-0 w-1/2 h-[40%] rounded-tr-[80px] transition-all duration-200 ${
                  activeButton === 'right' 
                    ? 'bg-[#4caf50] shadow-[0_0_15px_#4caf50]' 
                    : 'bg-[#2a2a2a]'
                  }`}
                />
                
                {/* Scroll Wheel */}
                <div 
                className={`absolute top-[90px] left-1/2 transform -translate-x-1/2 w-5 h-12 rounded-[10px] transition-all duration-200 ${
                  activeButton === 'scroll-up'
                    ? 'bg-[#2196f3] shadow-[0_0_15px_#2196f3]'
                    : activeButton === 'scroll-down'
                    ? 'bg-[#ff9800] shadow-[0_0_15px_#ff9800]'
                    : 'bg-[#444]'
                }`}
              />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white">Move cursor here and interact</h3>
          <p className="text-gray-300 max-w-md text-sm">
            <strong>Click or scroll inside this blue area</strong> to see the mouse icon respond. 
            The counters below will track your activity.
            <br />
            <span className="text-gray-400 text-xs mt-2 block">
              Move cursor outside → Normal page scrolling works
            </span>
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