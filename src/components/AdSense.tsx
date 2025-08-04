'use client';

import React, { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'banner';
  className?: string;
  style?: React.CSSProperties;
}

export default function AdSense({ adSlot, adFormat = 'auto', className = '', style = {} }: AdSenseProps) {
  useEffect(() => {
    try {
      // Push the command to Google AdSense
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

  const getAdStyle = () => {
    switch (adFormat) {
      case 'banner':
        return { display: 'block', textAlign: 'center' as const, overflow: 'hidden' };
      case 'rectangle':
        return { display: 'block', textAlign: 'center' as const };
      case 'fluid':
        return { display: 'block', textAlign: 'center' as const };
      default:
        return { display: 'block', textAlign: 'center' as const };
    }
  };

  // Show placeholder until AdSense is approved
  const showPlaceholder = true; // Set to false when AdSense is approved

  if (showPlaceholder) {
    return (
      <div className={`ad-container ${className}`} style={style}>
        <div className="w-full h-24 bg-gray-900 rounded-xl flex items-center justify-center text-gray-400 text-sm border border-gray-800">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Advertisement</div>
            <div className="text-xs text-gray-600">AdSense Pending Approval</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={getAdStyle()}
        data-ad-client="ca-pub-1310810766620297"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Specific ad components for different placements
export function HeaderAd() {
  return (
    <div className="w-full flex justify-center mb-4">
      <AdSense 
        adSlot="1234567890" // Replace with your actual ad slot ID
        adFormat="banner"
        className="w-full max-w-4xl"
      />
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="w-full flex justify-center my-4">
      <AdSense 
        adSlot="1234567891" // Replace with your actual ad slot ID
        adFormat="rectangle"
        className="w-full max-w-xs"
      />
    </div>
  );
}

export function ContentAd() {
  return (
    <div className="w-full flex justify-center my-6">
      <AdSense 
        adSlot="1234567892" // Replace with your actual ad slot ID
        adFormat="auto"
        className="w-full max-w-2xl"
      />
    </div>
  );
}

export function FooterAd() {
  return (
    <div className="w-full flex justify-center mt-6">
      <AdSense 
        adSlot="1234567893" // Replace with your actual ad slot ID
        adFormat="banner"
        className="w-full max-w-4xl"
      />
    </div>
  );
} 