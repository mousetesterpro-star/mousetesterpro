"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function VisualMouseGuide() {
  const [clicks, setClicks] = useState(0);
  const [scrolls, setScrolls] = useState(0);
  const [leftClicks, setLeftClicks] = useState(0);
  const [rightClicks, setRightClicks] = useState(0);
  const [scrollUp, setScrollUp] = useState(0);
  const [scrollDown, setScrollDown] = useState(0);
  const [lastAction, setLastAction] = useState<'left' | 'right' | 'scroll' | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [clickRate, setClickRate] = useState(0);
  const [scrollRate, setScrollRate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start/Stop session tracking
  const startSession = () => {
    setIsActive(true);
    startTimeRef.current = Date.now();
    setSessionTime(0);
    
    intervalRef.current = setInterval(() => {
      setSessionTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  };

  const stopSession = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!isActive) return;
      
      setClicks(prev => prev + 1);
      setLeftClicks(prev => prev + 1);
      setLastAction('left');
      setTimeout(() => setLastAction(null), 1000);
    };

    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      if (!isActive) return;
      
      setClicks(prev => prev + 1);
      setRightClicks(prev => prev + 1);
      setLastAction('right');
      setTimeout(() => setLastAction(null), 1000);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isActive) return;
      
      setScrolls(prev => prev + 1);
      if (e.deltaY < 0) {
        setScrollUp(prev => prev + 1);
      } else {
        setScrollDown(prev => prev + 1);
      }
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
  }, [isActive]);

  // Calculate rates
  useEffect(() => {
    if (sessionTime > 0) {
      setClickRate(Math.round((clicks / sessionTime) * 60)); // clicks per minute
      setScrollRate(Math.round((scrolls / sessionTime) * 60)); // scrolls per minute
    }
  }, [clicks, scrolls, sessionTime]);

  const resetCounts = () => {
    setClicks(0);
    setScrolls(0);
    setLeftClicks(0);
    setRightClicks(0);
    setScrollUp(0);
    setScrollDown(0);
    setLastAction(null);
    setSessionTime(0);
    setClickRate(0);
    setScrollRate(0);
    stopSession();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Mouse Activity Monitor</h3>
        <p className="text-gray-400 text-sm">Track your mouse usage patterns and performance metrics</p>
      </div>

      <div className="flex justify-center gap-4">
        {!isActive ? (
          <button
            onClick={startSession}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            Start Monitoring
          </button>
        ) : (
          <button
            onClick={stopSession}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Stop Monitoring
          </button>
        )}
        <button
          onClick={resetCounts}
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
        >
          Reset All
        </button>
      </div>

      {isActive && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="font-mono text-lg">{formatTime(sessionTime)}</span>
          </div>
        </div>
      )}

      <div ref={containerRef} className="relative">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-32 h-20 bg-gray-700 rounded-2xl shadow-lg relative overflow-hidden">
              <div className={`absolute left-1 top-1 w-14 h-8 rounded-l-xl transition-all duration-200 ${
                lastAction === 'left' ? 'bg-blue-500' : 'bg-gray-600'
              }`}></div>
              <div className={`absolute right-1 top-1 w-14 h-8 rounded-r-xl transition-all duration-200 ${
                lastAction === 'right' ? 'bg-green-500' : 'bg-gray-600'
              }`}></div>
              <div className={`absolute left-1/2 top-1 transform -translate-x-1/2 w-2 h-6 rounded-full transition-all duration-200 ${
                lastAction === 'scroll' ? 'bg-purple-500' : 'bg-gray-500'
              }`}></div>
              <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
              }`}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{clicks}</div>
            <div className="text-gray-400 text-sm">Total Clicks</div>
            <div className="text-xs text-blue-400 mt-1">{clickRate}/min</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{scrolls}</div>
            <div className="text-gray-400 text-sm">Total Scrolls</div>
            <div className="text-xs text-purple-400 mt-1">{scrollRate}/min</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{leftClicks}</div>
            <div className="text-gray-400 text-sm">Left Clicks</div>
            <div className="text-xs text-blue-400 mt-1">Primary</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{rightClicks}</div>
            <div className="text-gray-400 text-sm">Right Clicks</div>
            <div className="text-xs text-green-400 mt-1">Context</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{scrollUp}</div>
            <div className="text-gray-400 text-sm">Scroll Up</div>
            <div className="text-xs text-cyan-400 mt-1">↑</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{scrollDown}</div>
            <div className="text-gray-400 text-sm">Scroll Down</div>
            <div className="text-xs text-orange-400 mt-1">↓</div>
          </div>
        </div>

        <div className="text-center">
          {isActive ? (
            <div className="space-y-2">
              <p className="text-green-400 text-sm font-medium">
                ✓ Monitoring Active - Click or scroll anywhere to track activity
              </p>
              <p className="text-gray-500 text-xs">
                Real-time tracking of mouse usage patterns and performance metrics
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-gray-500 text-sm">
                Click "Start Monitoring" to begin tracking your mouse activity
              </p>
              <p className="text-gray-600 text-xs">
                Track clicks, scrolls, rates, and usage patterns
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}