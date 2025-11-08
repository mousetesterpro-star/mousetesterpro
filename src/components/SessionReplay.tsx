"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function SessionReplay() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [events, setEvents] = useState<{type: string, x: number, y: number, time: number, relativeTime: number}[]>([]);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const playbackRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = () => {
    const startTime = Date.now();
    setRecordingStartTime(startTime);
    setIsRecording(true);
    setEvents([]);
    setTestComplete(false);
    setCurrentEvent(0);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setTestComplete(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isRecording) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Throttle movement events to avoid too many updates
    setEvents(prev => {
      const now = Date.now();
      const relativeTime = now - recordingStartTime;
      const lastEvent = prev[prev.length - 1];
      
      // Limit to 60fps and keep last 100 events
      if (lastEvent && (now - lastEvent.time) < 16) return prev;
      
      return [...prev.slice(-100), {
        type: 'move',
        x,
        y,
        time: now,
        relativeTime
      }];
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isRecording) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const now = Date.now();
    const relativeTime = now - recordingStartTime;
    
    setEvents(prev => [...prev, {
      type: 'click',
      x,
      y,
      time: now,
      relativeTime
    }]);
  };

  const startPlayback = () => {
    if (events.length === 0) return;
    
    setIsPlaying(true);
    setCurrentEvent(0);
    
    // Clear any existing timeout
    if (playbackRef.current) {
      clearTimeout(playbackRef.current);
    }
    
    const playNextEvent = (index: number) => {
      if (index >= events.length) {
        setIsPlaying(false);
        setCurrentEvent(0);
        return;
      }
      
      setCurrentEvent(index);
      
      if (index < events.length - 1) {
        // Calculate delay based on relative time difference
        const delay = events[index + 1].relativeTime - events[index].relativeTime;
        // Clamp delay between 10ms and 200ms for smooth playback
        const playbackDelay = Math.min(Math.max(delay, 10), 200);
        
        playbackRef.current = setTimeout(() => {
          playNextEvent(index + 1);
        }, playbackDelay);
      } else {
        // Last event, wait a bit then stop
        playbackRef.current = setTimeout(() => {
          setIsPlaying(false);
          setCurrentEvent(0);
        }, 300);
      }
    };
    
    // Start playback immediately
    playNextEvent(0);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    setCurrentEvent(0);
    if (playbackRef.current) {
      clearTimeout(playbackRef.current);
      playbackRef.current = null;
    }
  };

  const resetTest = () => {
    setEvents([]);
    setTestComplete(false);
    setIsRecording(false);
    setIsPlaying(false);
    setCurrentEvent(0);
    setRecordingStartTime(0);
    if (playbackRef.current) {
      clearTimeout(playbackRef.current);
      playbackRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playbackRef.current) {
        clearTimeout(playbackRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Session Replay</h3>
        <p className="text-gray-400 text-sm">Record your mouse movements and replay them to analyze your patterns</p>
      </div>

      <div className="flex justify-center gap-4">
        {!isRecording && !testComplete && (
          <button
            onClick={startRecording}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Start Recording
          </button>
        )}
        
        {isRecording && (
          <button
            onClick={stopRecording}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Stop Recording
          </button>
        )}
        
        {testComplete && (
          <div className="flex gap-4">
            <button
              onClick={startPlayback}
              disabled={isPlaying}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              {isPlaying ? 'Playing...' : 'Play Replay'}
            </button>
            {isPlaying && (
              <button
                onClick={stopPlayback}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Stop Playback
              </button>
            )}
            <button
              onClick={resetTest}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Record Again
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        <div
          ref={containerRef}
          className="w-full h-96 bg-gray-900 border-2 border-gray-700 rounded-lg relative overflow-hidden"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        >
          {/* Movement trail - show all recorded events */}
          {events.map((event, index) => (
            <div
              key={index}
              className={`absolute rounded-full transition-opacity ${
                event.type === 'click' 
                  ? 'bg-red-500 w-3 h-3' 
                  : 'bg-blue-400 w-1 h-1'
              } ${
                isPlaying 
                  ? (index <= currentEvent ? 'opacity-100' : 'opacity-20')
                  : 'opacity-60'
              }`}
              style={{
                left: `${event.x}%`,
                top: `${event.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: event.type === 'click' ? 10 : 1
              }}
            />
          ))}
          
          {/* Current cursor position during playback */}
          {isPlaying && events[currentEvent] && (
            <div
              className="absolute w-6 h-6 bg-yellow-400 rounded-full border-2 border-white shadow-lg"
              style={{
                left: `${events[currentEvent].x}%`,
                top: `${events[currentEvent].y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
                transition: 'left 0.05s linear, top 0.05s linear'
              }}
            >
              <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
            </div>
          )}
          
          {/* Click indicator during playback */}
          {isPlaying && events[currentEvent] && events[currentEvent].type === 'click' && (
            <div
              className="absolute w-8 h-8 border-4 border-red-500 rounded-full animate-ping"
              style={{
                left: `${events[currentEvent].x}%`,
                top: `${events[currentEvent].y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 15
              }}
            />
          )}
          
          
          {/* Instructions */}
          {!isRecording && !testComplete && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-400 text-lg">Click "Start Recording" to begin</p>
            </div>
          )}
          
          {isRecording && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Recording...
            </div>
          )}
          
          {isPlaying && (
            <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Playing...
            </div>
          )}
        </div>
      </div>

      {testComplete && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">Recording Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Total Events:</span>
              <span className="text-white ml-2">{events.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Clicks:</span>
              <span className="text-white ml-2">{events.filter(e => e.type === 'click').length}</span>
            </div>
            <div>
              <span className="text-gray-400">Movements:</span>
              <span className="text-white ml-2">{events.filter(e => e.type === 'move').length}</span>
            </div>
            <div>
              <span className="text-gray-400">Duration:</span>
              <span className="text-white ml-2">
                {events.length > 1 ? Math.round((events[events.length - 1].time - events[0].time) / 1000) : 0}s
              </span>
            </div>
          </div>
          {events.length === 0 && (
            <p className="text-gray-400 text-sm mt-2">No events recorded. Try moving your mouse and clicking during recording.</p>
          )}
        </div>
      )}
    </div>
  );
}