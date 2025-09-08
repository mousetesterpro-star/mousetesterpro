"use client";

import React, { useState, useRef, useEffect } from 'react';

interface UserGuideProps {
  title: string;
  content: string;
  className?: string;
}

export default function UserGuide({ title, content, className = "" }: UserGuideProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'bottom'>('top');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Calculate tooltip position to avoid cutoff
  useEffect(() => {
    if (isVisible && buttonRef.current && tooltipRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const tooltipHeight = tooltipRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Check if tooltip would be cut off at the top
      const spaceAbove = buttonRect.top;
      const spaceBelow = viewportHeight - buttonRect.bottom;
      
      // Position tooltip where there's more space
      if (spaceAbove < tooltipHeight + 20 && spaceBelow > spaceAbove) {
        setTooltipPosition('bottom');
      } else {
        setTooltipPosition('top');
      }
    }
  }, [isVisible]);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        ref={buttonRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="w-6 h-6 bg-[#60A5FA] text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-blue-600 transition-colors"
        title="Click for help"
      >
        ?
      </button>
      
      {isVisible && (
        <div 
          ref={tooltipRef}
          className={`absolute left-1/2 transform -translate-x-1/2 z-50 ${
            tooltipPosition === 'top' 
              ? 'bottom-full mb-2' 
              : 'top-full mt-2'
          }`}
        >
          <div className="bg-[#1A1A1A] border border-[#23272e] rounded-lg p-4 shadow-xl max-w-96 lg:max-w-[32rem]">
            <div className="text-white font-semibold mb-3 text-base">{title}</div>
            <div className="text-gray-300 text-sm leading-relaxed">
              {content}
            </div>
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-transparent ${
              tooltipPosition === 'top' 
                ? 'top-full border-t-4 border-t-[#1A1A1A]' 
                : 'bottom-full border-b-4 border-b-[#1A1A1A]'
            }`}></div>
          </div>
        </div>
      )}
    </div>
  );
}
