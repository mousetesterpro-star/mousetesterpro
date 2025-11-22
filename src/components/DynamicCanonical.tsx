// components/DynamicCanonical.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function DynamicCanonical() {
  const pathname = usePathname();

  useEffect(() => {
    // Remove any existing canonical tags
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Add new canonical tag
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `https://mousetesterpro.com${pathname}`;
    document.head.appendChild(canonical);

    return () => {
      canonical.remove();
    };
  }, [pathname]);

  return null;
}