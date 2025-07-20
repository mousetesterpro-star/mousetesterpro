"use client";
import React, { useState, useRef } from "react";

interface TimelineEvent {
  label: string;
  timestamp: number;
}

export default function InputPathTracer() {
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [testActive, setTestActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Start a new trace
  const startTrace = () => {
    setTimeline([]);
    setTestActive(true);
    setStartTime(null);
  };

  // Handle mouse down event
  const handleMouseDown = () => {
    if (!testActive) return;
    const t0 = performance.now();
    setStartTime(t0);
    const events: TimelineEvent[] = [
      { label: "MouseDown", timestamp: t0 },
    ];
    // Input API receive (simulate minimal delay)
    setTimeout(() => {
      const t1 = performance.now();
      events.push({ label: "Input API", timestamp: t1 });
      // React handler
      const t2 = performance.now();
      events.push({ label: "React Handler", timestamp: t2 });
      // Next animation frame
      rafRef.current = requestAnimationFrame(() => {
        const t3 = performance.now();
        events.push({ label: "requestAnimationFrame", timestamp: t3 });
        // Simulate frame render
        setTimeout(() => {
          const t4 = performance.now();
          events.push({ label: "Frame Rendered", timestamp: t4 });
          setTimeline(events);
          setTestActive(false);
        }, 8); // ~1 frame at 120Hz
      });
    }, 0);
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Calculate relative times and max time for scaling
  const base = timeline.length > 0 ? timeline[0].timestamp : 0;
  const maxTime = timeline.length > 0 ? Math.max(...timeline.map(evt => evt.timestamp - base)) : 100;

  return (
    <section className="bg-[#181c24] border border-[#23272e] rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8">
      <h2 className="text-2xl font-heading text-white mb-2 text-center">Input Path Tracer (Event Timeline)</h2>
      <p className="text-gray-400 text-sm mb-4 text-center max-w-md">
        Click the button below to trace the journey of a mouse click from hardware to frame render. See the timing of each stage in the browser event pipeline.
      </p>
      <button
        className={`bg-[#60A5FA] text-black font-bold px-6 py-2 rounded-lg text-lg shadow hover:bg-[#4090e6] transition mb-4 ${testActive ? 'animate-pulse' : ''}`}
        onClick={testActive ? undefined : startTrace}
        disabled={testActive}
      >
        {testActive ? 'Waiting for Click...' : 'Start Trace'}
      </button>
      {testActive && (
        <div className="w-full flex flex-col items-center mb-4">
          <button
            className="bg-white text-black font-bold px-4 py-2 rounded-lg border border-[#23272e] shadow hover:bg-gray-200 transition"
            onMouseDown={handleMouseDown}
          >
            Click Me
          </button>
        </div>
      )}
      {timeline.length > 0 && (
        <div className="w-full max-w-2xl mt-4">
          <h3 className="text-lg font-bold text-white mb-4 text-center">Event Timeline</h3>
          <div className="space-y-3">
            {timeline.map((evt, i) => {
              const relativeTime = evt.timestamp - base;
              const positionPercentage = maxTime > 0 ? (relativeTime / maxTime) * 100 : 0;
              
              return (
                <div key={i} className="bg-[#23272e] rounded-lg p-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-gray-300 font-mono text-sm sm:text-base min-w-0 break-words">
                        {evt.label}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="h-3 bg-[#10131a] rounded-full relative overflow-hidden">
                        <div
                          className="h-3 bg-[#60A5FA] rounded-full transition-all duration-300"
                          style={{ 
                            width: '20px',
                            marginLeft: `${positionPercentage}%`,
                            transform: 'translateX(-50%)'
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="text-gray-400 font-mono text-xs sm:text-sm text-right">
                        +{relativeTime.toFixed(2)} ms
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-xs text-gray-500 text-center">
            Timeline shows the progression of a mouse click through the browser's event pipeline
          </div>
        </div>
      )}
    </section>
  );
} 