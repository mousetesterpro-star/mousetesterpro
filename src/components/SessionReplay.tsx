"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import UserGuide from './UserGuide';

interface ReplayEvent {
  type: 'click' | 'move' | 'scroll' | 'key';
  x?: number;
  y?: number;
  timestamp: number;
  data?: any;
  pressure?: number;
}

interface SessionReplayData {
  events: ReplayEvent[];
  sessionId: string;
  startTime: number;
  duration: number;
  deviceInfo?: any;
  canvasWidth: number;
  canvasHeight: number;
}

export default function SessionReplay() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [replayData, setReplayData] = useState<SessionReplayData>({
    events: [],
    sessionId: '',
    startTime: 0,
    duration: 0,
    canvasWidth: 800,
    canvasHeight: 400
  });
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showCursor, setShowCursor] = useState(true);
  const [recordingQuality, setRecordingQuality] = useState<'high' | 'medium' | 'low'>('high');
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const playbackRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lastEventTime, setLastEventTime] = useState(0);
  const [eventThrottle, setEventThrottle] = useState(16); // 60fps

  // Start recording with improved setup
  const startRecording = useCallback(() => {
    setIsRecording(true);
    const rect = containerRef.current?.getBoundingClientRect();
    
    setReplayData({
      events: [],
      sessionId: `replay_${Date.now()}`,
      startTime: Date.now(),
      duration: 0,
      canvasWidth: rect?.width || 800,
      canvasHeight: rect?.height || 400
    });
    setLastEventTime(Date.now());
  }, []);

  // Stop recording with improved timing
  const stopRecording = useCallback(() => {
    setIsRecording(false);
    setReplayData(prev => ({
      ...prev,
      duration: Date.now() - prev.startTime
    }));
  }, []);

  // Enhanced event recording with throttling
  const recordEvent = useCallback((event: ReplayEvent) => {
    if (!isRecording) return;
    
    const now = Date.now();
    // Adjust throttle based on recording quality
    const throttle = recordingQuality === 'high' ? 8 : recordingQuality === 'medium' ? 16 : 32;
    if (now - lastEventTime < throttle) return;
    
    setReplayData(prev => ({
      ...prev,
      events: [...prev.events, event]
    }));
    setLastEventTime(now);
  }, [isRecording, lastEventTime, recordingQuality]);

  // Improved mouse event handlers
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isRecording) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    
    recordEvent({
      type: 'move',
      x,
      y,
      timestamp: Date.now()
    });
  }, [isRecording, recordEvent]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!isRecording) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    
    recordEvent({
      type: 'click',
      x,
      y,
      timestamp: Date.now()
    });
  }, [isRecording, recordEvent]);

  const handleScroll = useCallback((e: React.WheelEvent) => {
    if (!isRecording) return;
    
    recordEvent({
      type: 'scroll',
      timestamp: Date.now(),
      data: {
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        deltaX: e.deltaX,
        deltaY: e.deltaY,
        deltaZ: e.deltaZ
      }
    });
  }, [isRecording, recordEvent]);

  // Enhanced playback with better timing
  const startPlayback = useCallback(() => {
    if (replayData.events.length === 0) return;
    
    setIsPlaying(true);
    setCurrentEventIndex(0);
    
    const startTime = Date.now();
    let eventIndex = 0;
    
    const playNextEvent = () => {
      if (eventIndex >= replayData.events.length) {
        setIsPlaying(false);
        return;
      }
      
      const event = replayData.events[eventIndex];
      const eventTime = event.timestamp - replayData.startTime;
      const currentTime = Date.now() - startTime;
      
      if (currentTime >= eventTime / playbackSpeed) {
        // Execute event with improved accuracy
        if (event.type === 'move' && event.x !== undefined && event.y !== undefined) {
          if (cursorRef.current) {
            cursorRef.current.style.left = `${event.x}px`;
            cursorRef.current.style.top = `${event.y}px`;
            cursorRef.current.style.opacity = '1';
          }
        } else if (event.type === 'click' && event.x !== undefined && event.y !== undefined) {
          if (cursorRef.current) {
            cursorRef.current.style.left = `${event.x}px`;
            cursorRef.current.style.top = `${event.y}px`;
            // Add click animation
            cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
            setTimeout(() => {
              if (cursorRef.current) {
                cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
              }
            }, 100);
          }
        } else if (event.type === 'scroll' && event.data) {
          // Show scroll indicator
          if (cursorRef.current) {
            cursorRef.current.style.left = '50%';
            cursorRef.current.style.top = '50%';
            cursorRef.current.style.opacity = '1';
            cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1.2)';
            cursorRef.current.style.backgroundColor = '#10B981';
            cursorRef.current.style.borderColor = '#10B981';
            
            // Reset cursor after scroll animation
            setTimeout(() => {
              if (cursorRef.current) {
                cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorRef.current.style.backgroundColor = '#60A5FA';
                cursorRef.current.style.borderColor = 'white';
              }
            }, 200);
          }
        }
        
        eventIndex++;
        setCurrentEventIndex(eventIndex);
      }
      
      playbackRef.current = setTimeout(playNextEvent, 16); // ~60fps
    };
    
    playNextEvent();
  }, [replayData, playbackSpeed]);

  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
    if (playbackRef.current) {
      clearTimeout(playbackRef.current);
    }
  }, []);

  const pausePlayback = useCallback(() => {
    setIsPlaying(false);
    if (playbackRef.current) {
      clearTimeout(playbackRef.current);
    }
  }, []);

  // Reset session data
  const resetSession = useCallback(() => {
    setReplayData({
      events: [],
      sessionId: '',
      startTime: 0,
      duration: 0,
      canvasWidth: 800,
      canvasHeight: 400
    });
    setCurrentEventIndex(0);
    setIsPlaying(false);
    if (playbackRef.current) {
      clearTimeout(playbackRef.current);
    }
  }, []);

  // Enhanced export/import with better data structure
  const exportReplayData = useCallback(() => {
    const dataStr = JSON.stringify(replayData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `session_replay_${replayData.sessionId}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [replayData]);

  const importReplayData = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        setReplayData(data);
      } catch (error) {
        console.error('Failed to parse replay data:', error);
      }
    };
    reader.readAsText(file);
  }, []);

  // Enhanced statistics calculation
  const stats = useMemo(() => {
    const { events } = replayData;
    return {
      clicks: events.filter(e => e.type === 'click').length,
      movements: events.filter(e => e.type === 'move').length,
      scrolls: events.filter(e => e.type === 'scroll').length,
      duration: Math.round(replayData.duration / 1000)
    };
  }, [replayData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playbackRef.current) {
        clearTimeout(playbackRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Session Replay</h2>
          <UserGuide 
            title="Session Replay"
            content="Record your mouse movements, clicks, and scrolls, then replay them exactly as they happened. Perfect for analyzing your interaction patterns and sharing sessions."
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={recordingQuality}
            onChange={(e) => setRecordingQuality(e.target.value as any)}
            className="bg-[#23272e] text-white rounded-lg px-3 py-2 text-sm border border-[#3A3A3A]"
          >
            <option value="high">High Quality</option>
            <option value="medium">Medium Quality</option>
            <option value="low">Low Quality</option>
          </select>
          {!isRecording && !isPlaying && (
            <button
              onClick={startRecording}
              className="px-4 py-2 bg-[#60A5FA] text-white rounded-lg font-medium hover:bg-blue-600 text-sm"
            >
              Start Recording
            </button>
          )}
          {isRecording && (
            <button
              onClick={stopRecording}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 text-sm"
            >
              Stop Recording
            </button>
          )}
          {!isPlaying && replayData.events.length > 0 && (
            <button
              onClick={startPlayback}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 text-sm"
            >
              Play Replay
            </button>
          )}
          {isPlaying && (
            <button
              onClick={pausePlayback}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 text-sm"
            >
              Pause
            </button>
          )}
          {!isRecording && !isPlaying && replayData.events.length > 0 && (
            <button
              onClick={resetSession}
              className="px-4 py-2 bg-[#23272e] text-white rounded-lg font-medium hover:bg-gray-700 text-sm border border-[#3A3A3A]"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Recording Area */}
      <div 
        ref={containerRef}
        className="relative bg-[#0D0D0D] rounded-2xl border border-[#23272e] mb-6 h-[300px] sm:h-[400px] overflow-hidden"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onWheel={handleScroll}
      >
        {/* Recording indicator */}
        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#1A1A1A] rounded-lg p-2 border border-[#23272e]">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-500 text-sm font-medium">Recording...</span>
            <span className="text-gray-400 text-sm">Quality: {recordingQuality}</span>
            <div className="flex items-center gap-2 ml-2">
              <span className="text-sm text-gray-400">Events:</span>
              <span className="text-sm text-[#60A5FA] font-medium">
                {replayData.events.filter(e => e.type === 'move').length}M
              </span>
              <span className="text-sm text-red-400 font-medium">
                {replayData.events.filter(e => e.type === 'click').length}C
              </span>
              <span className="text-sm text-green-400 font-medium">
                {replayData.events.filter(e => e.type === 'scroll').length}S
              </span>
            </div>
          </div>
        )}

        {/* Enhanced Playback cursor */}
        {isPlaying && showCursor && (
          <div
            ref={cursorRef}
            className="absolute w-6 h-6 bg-[#60A5FA] rounded-full border-2 border-white pointer-events-none z-10 transition-all duration-100 shadow-lg"
            style={{
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 0 6px rgba(96, 165, 250, 0.7))',
              opacity: 0,
              left: '50%',
              top: '50%'
            }}
          />
        )}

        {/* Enhanced Recording content */}
        <div className="p-6 text-gray-300">
          <h3 className="text-lg font-semibold mb-4">
            {isRecording ? 'Recording Session...' : 'Session Replay Area'}
          </h3>
          <p className="text-sm">
            {isRecording 
              ? 'Move your mouse and click to record interactions. This will help analyze your mouse usage patterns.'
              : 'Import a session file or record a new session to see the replay functionality.'
            }
          </p>
        </div>
      </div>

      {/* Playback Controls */}
      {replayData.events.length > 0 && (
        <div className="bg-[#23272e] rounded-2xl p-4 mb-6 border border-[#3A3A3A]">
          <h3 className="text-lg font-semibold text-white mb-3">Playback Controls</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-gray-300 text-sm">Speed:</label>
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="bg-[#1A1A1A] text-white rounded-lg px-3 py-2 text-sm border border-[#3A3A3A]"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={4}>4x</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-gray-300 text-sm">Show Cursor:</label>
              <input
                type="checkbox"
                checked={showCursor}
                onChange={(e) => setShowCursor(e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="text-gray-300 text-sm">
              Event {currentEventIndex} / {replayData.events.length}
            </div>
          </div>
        </div>
      )}

      {/* Session Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#23272e] rounded-2xl p-4 border border-[#3A3A3A]">
          <div className="text-2xl font-bold text-[#60A5FA]">
            {stats.clicks}
          </div>
          <div className="text-gray-400 text-sm">Clicks</div>
        </div>
        <div className="bg-[#23272e] rounded-2xl p-4 border border-[#3A3A3A]">
          <div className="text-2xl font-bold text-cyan-400">
            {stats.movements}
          </div>
          <div className="text-gray-400 text-sm">Movements</div>
        </div>
        <div className="bg-[#23272e] rounded-2xl p-4 border border-[#3A3A3A]">
          <div className="text-2xl font-bold text-green-400">
            {stats.scrolls}
          </div>
          <div className="text-gray-400 text-sm">Scrolls</div>
        </div>
        <div className="bg-[#23272e] rounded-2xl p-4 border border-[#3A3A3A]">
          <div className="text-2xl font-bold text-white">
            {stats.duration}s
          </div>
          <div className="text-gray-400 text-sm">Duration</div>
        </div>
      </div>

      {/* Export/Import Controls */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={exportReplayData}
          disabled={replayData.events.length === 0}
          className="px-4 py-2 bg-[#60A5FA] text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Export Session
        </button>
        
        <label className="px-4 py-2 bg-[#23272e] text-white rounded-lg font-medium hover:bg-gray-700 cursor-pointer text-sm border border-[#3A3A3A]">
          Import Session
          <input
            type="file"
            accept=".json"
            onChange={importReplayData}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
} 