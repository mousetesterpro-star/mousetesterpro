"use client";
import React, { useEffect, useState } from 'react';

function getOS() {
  const { userAgent } = window.navigator;
  if (/windows/i.test(userAgent)) return 'Windows';
  if (/mac/i.test(userAgent)) return 'macOS';
  if (/linux/i.test(userAgent)) return 'Linux';
  if (/android/i.test(userAgent)) return 'Android';
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'iOS';
  return 'Unknown';
}

function getBrowser() {
  const { userAgent } = window.navigator;
  if (/chrome|crios/i.test(userAgent) && !/edge|edg|opr|opera/i.test(userAgent)) return 'Chrome';
  if (/firefox|fxios/i.test(userAgent)) return 'Firefox';
  if (/safari/i.test(userAgent) && !/chrome|crios|edge|edg|opr|opera/i.test(userAgent)) return 'Safari';
  if (/edg/i.test(userAgent)) return 'Edge';
  if (/opr|opera/i.test(userAgent)) return 'Opera';
  return 'Unknown';
}

function getConnectionType() {
  // navigator.connection is not supported everywhere
  // @ts-ignore
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn && conn.effectiveType) return conn.effectiveType;
  return 'Unknown';
}

export default function DeviceInfoCard() {
  const [os, setOS] = useState('');
  const [browser, setBrowser] = useState('');
  const [connection, setConnection] = useState('');

  useEffect(() => {
    setOS(getOS());
    setBrowser(getBrowser());
    setConnection(getConnectionType());
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-semibold text-white mb-2">Device Info</h2>
      <ul className="text-white text-base space-y-2">
        <li><span className="text-gray-400">OS:</span> <span className="text-[#60A5FA] font-medium">{os}</span></li>
        <li><span className="text-gray-400">Browser:</span> <span className="text-[#60A5FA] font-medium">{browser}</span></li>
        <li><span className="text-gray-400">Connection:</span> <span className="text-[#60A5FA] font-medium">{connection}</span></li>
        <li><span className="text-gray-400">Mouse Model:</span> <span className="text-[#60A5FA] font-medium">Not available via browser</span></li>
        <li><span className="text-gray-400">DPI:</span> <span className="text-[#60A5FA] font-medium">Not available via browser</span></li>
      </ul>
      <div className="text-xs text-gray-500 mt-2">* Mouse model and DPI are not accessible to browsers for privacy and security reasons.</div>
    </section>
  );
} 