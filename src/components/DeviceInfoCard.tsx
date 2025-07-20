"use client";
import React, { useEffect, useState } from 'react';

function getOS() {
  if (typeof window === 'undefined') return 'Unknown';
  const { userAgent } = window.navigator;
  if (/windows/i.test(userAgent)) return 'Windows';
  if (/mac/i.test(userAgent)) return 'macOS';
  if (/linux/i.test(userAgent)) return 'Linux';
  if (/android/i.test(userAgent)) return 'Android';
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'iOS';
  return 'Unknown';
}

function getBrowser() {
  if (typeof window === 'undefined') return 'Unknown';
  const { userAgent } = window.navigator;
  if (/chrome|crios/i.test(userAgent) && !/edge|edg|opr|opera/i.test(userAgent)) return 'Chrome';
  if (/firefox|fxios/i.test(userAgent)) return 'Firefox';
  if (/safari/i.test(userAgent) && !/chrome|crios|edge|edg|opr|opera/i.test(userAgent)) return 'Safari';
  if (/edg/i.test(userAgent)) return 'Edge';
  if (/opr|opera/i.test(userAgent)) return 'Opera';
  return 'Unknown';
}

function getConnectionInfo() {
  if (typeof window === 'undefined') {
    return {
      type: 'Unknown',
      speed: 'Unknown',
      latency: 'Unknown',
      effectiveType: null
    };
  }

  // @ts-ignore - Network Information API
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (conn) {
    const type = conn.type || 'unknown';
    const effectiveType = conn.effectiveType || 'unknown';
    const downlink = conn.downlink || 0;
    const rtt = conn.rtt || 0;
    
    // Determine connection type more accurately
    let connectionType = 'Unknown';
    if (type === 'wifi') connectionType = 'WiFi';
    else if (type === 'cellular') connectionType = 'Mobile';
    else if (type === 'ethernet') connectionType = 'Ethernet';
    else if (type === 'bluetooth') connectionType = 'Bluetooth';
    else if (type === 'none') connectionType = 'Offline';
    else if (effectiveType) connectionType = `${effectiveType.toUpperCase()}`;
    
    return {
      type: connectionType,
      speed: downlink > 0 ? `${downlink.toFixed(1)} Mbps` : 'Unknown',
      latency: rtt > 0 ? `${rtt}ms` : 'Unknown',
      effectiveType: effectiveType !== 'unknown' ? effectiveType.toUpperCase() : null
    };
  }
  
  // Fallback detection
  return {
    type: 'Unknown',
    speed: 'Unknown',
    latency: 'Unknown',
    effectiveType: null
  };
}

function getDeviceInfo() {
  if (typeof window === 'undefined') {
    return {
      cores: 'Unknown',
      memory: 'Unknown',
      screen: { width: 0, height: 0, ratio: 1 },
      isMobile: false,
      platform: 'Unknown'
    };
  }

  const { userAgent, platform, hardwareConcurrency } = navigator;
  
  // CPU cores
  const cores = hardwareConcurrency || 'Unknown';
  
  // Memory (if available) - use optional chaining and type assertion
  const memory = (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : 'Unknown';
  
  // Screen info
  const screen = {
    width: window.screen.width,
    height: window.screen.height,
    ratio: window.devicePixelRatio || 1
  };
  
  // Check if mobile
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent);
  
  return {
    cores,
    memory,
    screen,
    isMobile,
    platform: platform || 'Unknown'
  };
}

export default function DeviceInfoCard() {
  const [os, setOS] = useState('');
  const [browser, setBrowser] = useState('');
  const [connection, setConnection] = useState<any>({});
  const [device, setDevice] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDeviceInfo = () => {
      try {
        setOS(getOS());
        setBrowser(getBrowser());
        setConnection(getConnectionInfo());
        setDevice(getDeviceInfo());
      } catch (error) {
        console.error('Error loading device info:', error);
        // Set fallback values
        setOS('Unknown');
        setBrowser('Unknown');
        setConnection({ type: 'Unknown', speed: 'Unknown', latency: 'Unknown' });
        setDevice({ cores: 'Unknown', memory: 'Unknown', screen: { width: 0, height: 0, ratio: 1 }, isMobile: false });
      } finally {
        setLoading(false);
      }
    };

    // Load immediately without timeout
    loadDeviceInfo();
  }, []);

  if (loading) {
    return (
      <section>
        <h2 className="text-2xl font-semibold text-white mb-2">Device Info</h2>
        <div className="text-gray-400 text-sm">Loading device information...</div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold text-white mb-2">Device Info</h2>
      <ul className="text-white text-base space-y-2">
        <li><span className="text-gray-400">OS:</span> <span className="text-[#60A5FA] font-medium">{os}</span></li>
        <li><span className="text-gray-400">Browser:</span> <span className="text-[#60A5FA] font-medium">{browser}</span></li>
        <li><span className="text-gray-400">Connection:</span> <span className="text-[#60A5FA] font-medium">{connection.type}</span></li>
        {connection.speed !== 'Unknown' && (
          <li><span className="text-gray-400">Speed:</span> <span className="text-[#60A5FA] font-medium">{connection.speed}</span></li>
        )}
        {connection.latency !== 'Unknown' && (
          <li><span className="text-gray-400">Latency:</span> <span className="text-[#60A5FA] font-medium">{connection.latency}</span></li>
        )}
        {device.cores !== 'Unknown' && (
          <li><span className="text-gray-400">CPU Cores:</span> <span className="text-[#60A5FA] font-medium">{device.cores}</span></li>
        )}
        {device.memory !== 'Unknown' && (
          <li><span className="text-gray-400">Memory:</span> <span className="text-[#60A5FA] font-medium">{device.memory}</span></li>
        )}
        <li><span className="text-gray-400">Screen:</span> <span className="text-[#60A5FA] font-medium">{device.screen.width}×{device.screen.height} ({device.screen.ratio}x)</span></li>
        <li><span className="text-gray-400">Device:</span> <span className="text-[#60A5FA] font-medium">{device.isMobile ? 'Mobile' : 'Desktop'}</span></li>
        <li><span className="text-gray-400">Mouse Model:</span> <span className="text-[#60A5FA] font-medium">Not available via browser</span></li>
        <li><span className="text-gray-400">DPI:</span> <span className="text-[#60A5FA] font-medium">Not available via browser</span></li>
      </ul>
      <div className="text-xs text-gray-500 mt-2">* Mouse model and DPI are not accessible to browsers for privacy and security reasons.</div>
    </section>
  );
} 