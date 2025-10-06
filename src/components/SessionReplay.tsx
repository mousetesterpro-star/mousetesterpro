"use client";

import React, { useState, useRef } from 'react';

export default function SessionReplay() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [events, setEvents] = useState<{type: string, x: number, y: number, time: number}[]>([]);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const playbackRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = () => {
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
    
    setEvents(prev => [...prev.slice(-20), {
      type: 'move',
      x,
      y,
      time: Date.now()
    }]);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isRecording) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setEvents(prev => [...prev, {
      type: 'click',
      x,
      y,
      time: Date.now()
    }]);
  };

  const startPlayback = () => {
    if (events.length === 0) return;
    
    setIsPlaying(true);
    setCurrentEvent(0);
    
    const playNextEvent = (index: number) => {
      if (index >= events.length) {
        setIsPlaying(false);
        return;
      }
      
      setCurrentEvent(index);
      
      if (index < events.length - 1) {
        const delay = events[index + 1].time - events[index].time;
        playbackRef.current = setTimeout(() => {
          playNextEvent(index + 1);
        }, Math.min(delay, 100)); // Cap at 100ms for smooth playback
      } else {
        setTimeout(() => {
          setIsPlaying(false);
        }, 500);
      }
    };
    
    playNextEvent(0);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    if (playbackRef.current) {
      clearTimeout(playbackRef.current);
    }
  };

  const resetTest = () => {
    setEvents([]);
    setTestComplete(false);
    setIsRecording(false);
    setIsPlaying(false);
    setCurrentEvent(0);
  };

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
          {/* Movement trail */}
          {events.slice(0, currentEvent + 1).map((event, index) => (
            <div
              key={index}
              className={`absolute w-1 h-1 rounded-full ${
                event.type === 'click' ? 'bg-red-500' : 'bg-blue-400'
              } opacity-60`}
              style={{
                left: `${event.x}%`,
                top: `${event.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
          
          {/* Current cursor position during playback */}
          {isPlaying && events[currentEvent] && (
            <div
              className="absolute w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-pulse"
              style={{
                left: `${events[currentEvent].x}%`,
                top: `${events[currentEvent].y}%`,
                transform: 'translate(-50%, -50%)'
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
                {events.length > 0 ? Math.round((events[events.length - 1].time - events[0].time) / 1000) : 0}s
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}