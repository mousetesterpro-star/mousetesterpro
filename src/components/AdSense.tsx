'use client';

import React from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'banner';
  className?: string;
  style?: React.CSSProperties;
}

// AdSense ads are disabled until approval is received and real slot IDs are configured.
// The AdSense verification script is loaded in layout.tsx for the approval process.
// Once approved, replace the placeholder slot IDs below with your real ones and
// set ADSENSE_APPROVED to true.
const ADSENSE_APPROVED = false;

export default function AdSense({ adSlot, adFormat = 'auto', className = '', style = {} }: AdSenseProps) {
  if (!ADSENSE_APPROVED) return null;

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' as const }}
        data-ad-client="ca-pub-7765938871336081"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Ad placement components — all return null until AdSense is approved.
// Replace slot IDs with real ones from your AdSense dashboard after approval.
export function HeaderAd() {
  return <AdSense adSlot="REPLACE_WITH_REAL_SLOT_ID" adFormat="banner" className="w-full max-w-4xl" />;
}

export function SidebarAd() {
  return <AdSense adSlot="REPLACE_WITH_REAL_SLOT_ID" adFormat="rectangle" className="w-full max-w-xs" />;
}

export function ContentAd() {
  return <AdSense adSlot="REPLACE_WITH_REAL_SLOT_ID" adFormat="auto" className="w-full max-w-2xl" />;
}

export function FooterAd() {
  return <AdSense adSlot="REPLACE_WITH_REAL_SLOT_ID" adFormat="banner" className="w-full max-w-4xl" />;
} 