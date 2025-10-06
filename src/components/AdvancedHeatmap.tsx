"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useTestSession } from '@/context/TestSessionContext';
import UserGuide from './UserGuide';

interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
  type: 'click' | 'hover' | 'movement';
  timestamp: number;
  pressure?: number;
}

interface HeatmapData {
  points: HeatmapPoint[];
  sessionId: string;
  timestamp: number;
  deviceInfo?: any;
  canvasWidth: number;
  canvasHeight: number;
}

export default function AdvancedHeatmap() {
  const { session } = useTestSession();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [heatmapData, setHeatmapData] = useState<HeatmapData>({
    points: [],
    sessionId: '',
    timestamp: Date.now(),
    canvasWidth: 800,
    canvasHeight: 400
  });
  const [viewMode, setViewMode] = useState<'movement' | 'clicks' | 'hovers' | 'comparison'>('movement');
  const [comparisonData, setComparisonData] = useState<HeatmapData | null>(null);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [recordingQuality, setRecordingQuality] = useState<'high' | 'medium' | 'low'>('high');

  // Mouse tracking with improved accuracy
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverStartTime, setHoverStartTime] = useState(0);
  const [lastMoveTime, setLastMoveTime] = useState(0);
  const [moveThrottle, setMoveThrottle] = useState(16); // 60fps

  // Performance insights with better analysis
  const [performanceInsights, setPerformanceInsights] = useState<string[]>([]);
  const [heatmapIntensity, setHeatmapIntensity] = useState(1);

  // Start recording with improved setup
  const startRecording = useCallback(() => {
    setIsRecording(true);
    const canvas = canvasRef.current;
    const rect = containerRef.current?.getBoundingClientRect();
    
    setHeatmapData({
      points: [],
      sessionId: `session_${Date.now()}`,
      timestamp: Date.now(),
      canvasWidth: rect?.width || 800,
      canvasHeight: rect?.height || 400
    });
    setLastMoveTime(Date.now());
  }, []);

  // Stop recording with analysis
  const stopRecording = useCallback(() => {
    setIsRecording(false);
    analyzePerformance();
  }, []);

  // Reset heatmap data
  const resetHeatmap = useCallback(() => {
    setHeatmapData({
      points: [],
      sessionId: '',
      timestamp: Date.now(),
      canvasWidth: 800,
      canvasHeight: 400
    });
    setPerformanceInsights([]);
    setComparisonData(null);
    setViewMode('movement');
  }, []);

  // Enhanced performance analysis
  const analyzePerformance = useCallback(() => {
    const insights: string[] = [];
    const { points } = heatmapData;

    if (points.length === 0) return;

    const clicks = points.filter(p => p.type === 'click');
    const hovers = points.filter(p => p.type === 'hover');
    const movements = points.filter(p => p.type === 'movement');

    // Enhanced click accuracy analysis
    if (clicks.length > 0) {
      const clickSpread = calculateSpread(clicks);
      const avgClickDistance = calculateAverageDistance(clicks);
      
      if (clickSpread > 100) {
        insights.push('High click spread detected - consider adjusting mouse sensitivity');
      }
      if (avgClickDistance < 10) {
        insights.push('Very precise clicking - high accuracy achieved');
      }
    }

    // Enhanced hover analysis
    if (hovers.length > 0) {
      const avgHoverTime = hovers.reduce((sum, p) => sum + p.intensity, 0) / hovers.length;
      const hoverCount = hovers.length;
      
      if (avgHoverTime > 3000) {
        insights.push('Long hover times - consider faster decision making');
      }
      if (hoverCount > 10) {
        insights.push('Multiple hover points - suitable for precision tasks');
      }
    }

    // Enhanced movement analysis
    if (movements.length > 0) {
      const movementEfficiency = calculateMovementEfficiency(movements);
      const movementSpeed = calculateMovementSpeed(movements);
      
      if (movementEfficiency < 0.5) {
        insights.push('Inefficient movement patterns - practice smoother cursor control');
      }
      if (movementSpeed > 500) {
        insights.push('Fast movement detected - suitable for quick reactions');
      }
    }

    // Overall session quality
    const totalEvents = points.length;
    const sessionDuration = (Date.now() - heatmapData.timestamp) / 1000;
    const eventsPerSecond = totalEvents / sessionDuration;
    
    if (eventsPerSecond > 50) {
      insights.push('High activity session - strong engagement detected');
    }

    setPerformanceInsights(insights);
  }, [heatmapData]);

  // Improved calculation functions
  const calculateSpread = (points: HeatmapPoint[]) => {
    if (points.length < 2) return 0;
    
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    return Math.sqrt(
      Math.pow(Math.max(...xs) - Math.min(...xs), 2) +
      Math.pow(Math.max(...ys) - Math.min(...ys), 2)
    );
  };

  const calculateAverageDistance = (points: HeatmapPoint[]) => {
    if (points.length < 2) return 0;
    
    let totalDistance = 0;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      totalDistance += Math.sqrt(
        Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)
      );
    }
    return totalDistance / (points.length - 1);
  };

  const calculateMovementEfficiency = (movements: HeatmapPoint[]) => {
    if (movements.length < 2) return 1;
    
    let totalDistance = 0;
    let directDistance = 0;
    
    for (let i = 1; i < movements.length; i++) {
      const prev = movements[i - 1];
      const curr = movements[i];
      totalDistance += Math.sqrt(
        Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)
      );
    }
    
    const first = movements[0];
    const last = movements[movements.length - 1];
    directDistance = Math.sqrt(
      Math.pow(last.x - first.x, 2) + Math.pow(last.y - first.y, 2)
    );
    
    return directDistance / totalDistance;
  };

  const calculateMovementSpeed = (movements: HeatmapPoint[]) => {
    if (movements.length < 2) return 0;
    
    const totalDistance = movements.reduce((sum, point, index) => {
      if (index === 0) return 0;
      const prev = movements[index - 1];
      return sum + Math.sqrt(
        Math.pow(point.x - prev.x, 2) + Math.pow(point.y - prev.y, 2)
      );
    }, 0);
    
    const duration = (movements[movements.length - 1].timestamp - movements[0].timestamp) / 1000;
    return totalDistance / duration; // pixels per second
  };

  // Improved mouse event handlers with throttling
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isRecording) return;
    
    const now = Date.now();
    if (now - lastMoveTime < moveThrottle) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    
    setMousePosition({ x, y });
    setLastMoveTime(now);
    
    // Add movement point with improved accuracy
    setHeatmapData(prev => ({
      ...prev,
      points: [...prev.points, {
        x,
        y,
        intensity: heatmapIntensity * (recordingQuality === 'high' ? 1.5 : recordingQuality === 'medium' ? 1 : 0.7),
        type: 'movement',
        timestamp: now
      }]
    }));
  }, [isRecording, lastMoveTime, moveThrottle, heatmapIntensity, recordingQuality]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    setHoverStartTime(Date.now());
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (isRecording && hoverStartTime > 0) {
      const hoverDuration = Date.now() - hoverStartTime;
      if (hoverDuration > 300) { // Reduced threshold for better accuracy
        setHeatmapData(prev => ({
          ...prev,
          points: [...prev.points, {
            x: mousePosition.x,
            y: mousePosition.y,
            intensity: hoverDuration / 1000,
            type: 'hover',
            timestamp: Date.now()
          }]
        }));
      }
    }
  }, [isRecording, hoverStartTime, mousePosition]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!isRecording) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    
    setHeatmapData(prev => ({
      ...prev,
      points: [...prev.points, {
        x,
        y,
        intensity: 4, // Higher intensity for clicks
        type: 'click',
        timestamp: Date.now()
      }]
    }));
  }, [isRecording]);

  // Improved heatmap rendering with better performance
  const renderHeatmap = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container with proper scaling
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    }

    // Clear canvas and draw background
    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = canvas.width / dpr;
    const canvasHeight = canvas.height / dpr;
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw a visible background to verify canvas is working
    ctx.fillStyle = 'rgba(13, 13, 13, 0.8)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Add a subtle grid pattern to make canvas more visible
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    const gridSize = 50;
    
    for (let x = 0; x < canvasWidth; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();
    }
    
    for (let y = 0; y < canvasHeight; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
      ctx.stroke();
    }

    const { points } = heatmapData;
    const filteredPoints = points.filter(p => {
      if (viewMode === 'movement') return p.type === 'movement';
      if (viewMode === 'clicks') return p.type === 'click';
      if (viewMode === 'hovers') return p.type === 'hover';
      return true;
    });

    // Enhanced heatmap rendering with better colors and blending
    filteredPoints.forEach(point => {
      // Ensure point coordinates are within canvas bounds
      const x = Math.max(0, Math.min(point.x, canvasWidth));
      const y = Math.max(0, Math.min(point.y, canvasHeight));
      
      // Adjust intensity based on point type and recording quality
      let baseIntensity = point.intensity;
      if (point.type === 'click') baseIntensity = Math.max(2, baseIntensity);
      if (point.type === 'hover') baseIntensity = Math.max(1.5, baseIntensity);
      
      const alpha = Math.min(baseIntensity * 0.6, 0.95);
      const radius = point.type === 'click' ? 25 : point.type === 'hover' ? 30 : 15;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      
      if (point.type === 'click') {
        gradient.addColorStop(0, `rgba(255, 50, 50, ${alpha})`);
        gradient.addColorStop(0.3, `rgba(255, 100, 100, ${alpha * 0.7})`);
        gradient.addColorStop(0.7, `rgba(255, 150, 150, ${alpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 200, 200, 0)');
      } else if (point.type === 'hover') {
        gradient.addColorStop(0, `rgba(0, 200, 255, ${alpha})`);
        gradient.addColorStop(0.3, `rgba(50, 150, 255, ${alpha * 0.7})`);
        gradient.addColorStop(0.7, `rgba(100, 100, 255, ${alpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(150, 100, 255, 0)');
      } else {
        gradient.addColorStop(0, `rgba(100, 200, 255, ${alpha})`);
        gradient.addColorStop(0.3, `rgba(150, 200, 255, ${alpha * 0.5})`);
        gradient.addColorStop(0.7, `rgba(200, 220, 255, ${alpha * 0.2})`);
        gradient.addColorStop(1, 'rgba(220, 240, 255, 0)');
      }
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw comparison data with different colors
    if (comparisonData && viewMode === 'comparison') {
      comparisonData.points.forEach(point => {
        const alpha = Math.min(point.intensity * 0.3, 0.7);
        const radius = point.type === 'click' ? 15 : 8;
        
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
        gradient.addColorStop(0, `rgba(255, 255, 0, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(255, 200, 0, ${alpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 150, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  }, [heatmapData, viewMode, comparisonData]);

  // Optimized rendering with useMemo
  useEffect(() => {
    renderHeatmap();
  }, [renderHeatmap]);

  // Initialize canvas on mount and handle resize
  useEffect(() => {
    const handleResize = () => {
      renderHeatmap();
    };

    // Initial render with a small delay to ensure container is ready
    const timer = setTimeout(() => {
      renderHeatmap();
    }, 100);

    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [renderHeatmap]);

  // Export/Import with improved data structure
  const exportHeatmapData = useCallback(() => {
    const dataStr = JSON.stringify(heatmapData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `heatmap_${heatmapData.sessionId}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [heatmapData]);

  const importHeatmapData = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        setComparisonData(data);
        setViewMode('comparison');
      } catch (error) {
        console.error('Failed to parse heatmap data:', error);
      }
    };
    reader.readAsText(file);
  }, []);

  // Enhanced statistics calculation
  const stats = useMemo(() => {
    const { points } = heatmapData;
    return {
      clicks: points.filter(p => p.type === 'click').length,
      hovers: points.filter(p => p.type === 'hover').length,
      movements: points.filter(p => p.type === 'movement').length,
      duration: Math.round((Date.now() - heatmapData.timestamp) / 1000)
    };
  }, [heatmapData]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Advanced Movement Heatmap</h2>
          <UserGuide 
            title="Advanced Movement Heatmap"
            content="Track your mouse movements, clicks, and hover patterns to analyze your interaction behavior. Start recording and move your mouse around to see the heatmap visualization."
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
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
              isRecording 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-[#60A5FA] text-white hover:bg-blue-600'
            }`}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
          {!isRecording && heatmapData.points.length > 0 && (
            <button
              onClick={resetHeatmap}
              className="px-4 py-2 bg-[#23272e] text-white rounded-lg font-medium hover:bg-gray-700 text-sm border border-[#3A3A3A]"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['movement', 'clicks', 'hovers', 'comparison'].map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode as any)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === mode
                ? 'bg-[#60A5FA] text-white'
                : 'bg-[#23272e] text-gray-300 hover:text-white border border-[#3A3A3A]'
            }`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {/* Heatmap Canvas */}
      <div 
        ref={containerRef}
        className="relative bg-[#0D0D0D] rounded-2xl border border-[#23272e] mb-6 overflow-hidden h-[300px] sm:h-[400px]"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          style={{ display: 'block' }}
        />
        
        {/* Legend */}
        <div className="absolute top-4 right-4 bg-[#1A1A1A] rounded-lg p-3 text-sm border border-[#23272e]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-[#60A5FA] rounded"></div>
            <span className="text-gray-300">Movement</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-300">Clicks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-400 rounded"></div>
            <span className="text-gray-300">Hovers</span>
          </div>
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#1A1A1A] rounded-lg p-2 border border-[#23272e]">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-500 text-sm font-medium">Recording...</span>
            <span className="text-gray-400 text-sm">Quality: {recordingQuality}</span>
          </div>
        )}
      </div>

      {/* Performance Insights */}
      {performanceInsights.length > 0 && showAnnotations && (
        <div className="bg-[#23272e] rounded-2xl p-4 mb-6 border border-[#3A3A3A]">
          <h3 className="text-lg font-semibold text-white mb-3">Performance Insights</h3>
          <div className="space-y-2">
            {performanceInsights.map((insight, index) => (
              <div key={index} className="text-gray-300 text-sm flex items-center gap-2">
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={exportHeatmapData}
          disabled={heatmapData.points.length === 0}
          className="px-4 py-2 bg-[#60A5FA] text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Export Data
        </button>
        
        <label className="px-4 py-2 bg-[#23272e] text-white rounded-lg font-medium hover:bg-gray-700 cursor-pointer text-sm border border-[#3A3A3A]">
          Import for Comparison
          <input
            type="file"
            accept=".json"
            onChange={importHeatmapData}
            className="hidden"
          />
        </label>

        <button
          onClick={() => setShowAnnotations(!showAnnotations)}
          className="px-4 py-2 bg-[#23272e] text-white rounded-lg font-medium hover:bg-gray-700 text-sm border border-[#3A3A3A]"
        >
          {showAnnotations ? 'Hide' : 'Show'} Annotations
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#23272e] rounded-2xl p-4 border border-[#3A3A3A]">
          <div className="text-2xl font-bold text-[#60A5FA]">
            {stats.clicks}
          </div>
          <div className="text-gray-400 text-sm">Clicks</div>
        </div>
        <div className="bg-[#23272e] rounded-2xl p-4 border border-[#3A3A3A]">
          <div className="text-2xl font-bold text-cyan-400">
            {stats.hovers}
          </div>
          <div className="text-gray-400 text-sm">Hovers</div>
        </div>
        <div className="bg-[#23272e] rounded-2xl p-4 border border-[#3A3A3A]">
          <div className="text-2xl font-bold text-blue-400">
            {stats.movements}
          </div>
          <div className="text-gray-400 text-sm">Movements</div>
        </div>
        <div className="bg-[#23272e] rounded-2xl p-4 border border-[#3A3A3A]">
          <div className="text-2xl font-bold text-white">
            {stats.duration}s
          </div>
          <div className="text-gray-400 text-sm">Duration</div>
        </div>
      </div>
    </div>
  );
} 