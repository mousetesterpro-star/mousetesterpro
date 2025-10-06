"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function AdvancedHeatmap() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [clicks, setClicks] = useState<{x: number, y: number}[]>([]);
  const [movements, setMovements] = useState<{x: number, y: number}[]>([]);
  const [testComplete, setTestComplete] = useState(false);

  const startTest = () => {
    setIsRecording(true);
    setClicks([]);
    setMovements([]);
    setTestComplete(false);
  };

  const stopTest = () => {
    setIsRecording(false);
    setTestComplete(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isRecording) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMovements(prev => [...prev.slice(-50), {x, y}]);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isRecording) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setClicks(prev => [...prev, {x, y}]);
  };

  const resetTest = () => {
    setClicks([]);
    setMovements([]);
    setTestComplete(false);
    setIsRecording(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Mouse Movement Heatmap</h3>
        <p className="text-gray-400 text-sm">Move your mouse around and click to create a heatmap of your activity</p>
      </div>

      <div className="flex justify-center gap-4">
        {!isRecording && !testComplete && (
          <button
            onClick={startTest}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Start Test
          </button>
        )}
        
        {isRecording && (
          <button
            onClick={stopTest}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Stop Test
          </button>
        )}
        
        {testComplete && (
          <button
            onClick={resetTest}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Test Again
          </button>
        )}
      </div>

      <div className="relative">
        <div
          ref={canvasRef}
          className="w-full h-96 bg-gray-900 border-2 border-gray-700 rounded-lg relative overflow-hidden"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        >
          {/* Movement trail */}
          {movements.map((move, index) => (
            <div
              key={index}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
              style={{
                left: `${move.x}%`,
                top: `${move.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
          
          {/* Click points */}
          {clicks.map((click, index) => (
            <div
              key={index}
              className="absolute w-3 h-3 bg-red-500 rounded-full border-2 border-white"
              style={{
                left: `${click.x}%`,
                top: `${click.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
          
          {/* Instructions */}
          {!isRecording && !testComplete && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-400 text-lg">Click "Start Test" to begin</p>
            </div>
          )}
          
          {isRecording && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Recording...
            </div>
          )}
        </div>
      </div>

      {testComplete && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">Test Results</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Total Clicks:</span>
              <span className="text-white ml-2">{clicks.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Movement Points:</span>
              <span className="text-white ml-2">{movements.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}