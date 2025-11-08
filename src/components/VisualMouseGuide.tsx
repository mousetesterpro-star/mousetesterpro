"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function VisualMouseGuide() {
  const [clicks, setClicks] = useState(0);
  const [scrolls, setScrolls] = useState(0);
  const [activeButton, setActiveButton] = useState<'left' | 'right' | 'scroll' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleLeftClick = (e: MouseEvent) => {
      e.preventDefault();
      setClicks(prev => prev + 1);
      setActiveButton('left');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setActiveButton(null), 300);
    };

    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setClicks(prev => prev + 1);
      setActiveButton('right');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setActiveButton(null), 300);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScrolls(prev => prev + 1);
      setActiveButton('scroll');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setActiveButton(null), 300);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('click', handleLeftClick);
      container.addEventListener('contextmenu', handleRightClick);
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('click', handleLeftClick);
        container.removeEventListener('contextmenu', handleRightClick);
        container.removeEventListener('wheel', handleWheel);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const resetCounts = () => {
    setClicks(0);
    setScrolls(0);
    setActiveButton(null);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white mb-4">🖱️ Mouse Guide</h2>
      
      <div
        ref={containerRef}
        className="relative w-full aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl border-2 border-[#0f3460] overflow-hidden mb-4 cursor-pointer"
        style={{ minHeight: '300px' }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 p-6">
          {/* Custom Mouse Icon with Visual Feedback */}
          <div className="relative mb-4 flex items-center justify-center">
            <div className="relative">
              {/* Mouse Body */}
              <div className="w-32 h-48 bg-[#2a2a3e] rounded-t-[60px] rounded-b-[20px] border-2 border-[#4a4a6e] relative overflow-hidden">
                {/* Left Button */}
                <div 
                  className={`absolute top-0 left-0 w-1/2 h-1/3 rounded-tl-[60px] border-r-2 border-[#4a4a6e] transition-all duration-200 ${
                    activeButton === 'left' ? 'bg-[#60A5FA] border-[#4090e6]' : 'bg-[#3a3a4e]'
                  }`}
                />
                
                {/* Right Button */}
                <div 
                  className={`absolute top-0 right-0 w-1/2 h-1/3 rounded-tr-[60px] border-l-2 border-[#4a4a6e] transition-all duration-200 ${
                    activeButton === 'right' ? 'bg-[#60A5FA] border-[#4090e6]' : 'bg-[#3a3a4e]'
                  }`}
                />
                
                {/* Scroll Wheel */}
                <div 
                  className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 w-2 h-8 rounded-full transition-all duration-200 ${
                    activeButton === 'scroll' ? 'bg-[#60A5FA] border-2 border-[#4090e6] h-10' : 'bg-[#5a5a7e] border-2 border-[#7a7a9e]'
                  }`}
                >
                  {/* Scroll wheel lines */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center gap-1">
                    <div className={`w-3 h-0.5 ${activeButton === 'scroll' ? 'bg-[#4090e6]' : 'bg-[#7a7a9e]'}`}></div>
                    <div className={`w-3 h-0.5 ${activeButton === 'scroll' ? 'bg-[#4090e6]' : 'bg-[#7a7a9e]'}`}></div>
                    <div className={`w-3 h-0.5 ${activeButton === 'scroll' ? 'bg-[#4090e6]' : 'bg-[#7a7a9e]'}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white">Try clicking and scrolling</h3>
          <p className="text-gray-300 max-w-md">
            Click left/right or scroll in this area to see your mouse activity
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