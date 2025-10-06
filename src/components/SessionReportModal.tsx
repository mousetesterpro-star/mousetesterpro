"use client";
import React from 'react';
import jsPDF from 'jspdf';

interface SessionReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: {
    latency: number;
    polling: number;
    jitter: number;
    device_info?: any;
  } | null;
  proBenchmarks?: { latency: number; polling: number; jitter: number };
  globalAvg?: { latency: number; polling: number; jitter: number };
}

const defaultPro = { latency: 8, polling: 1000, jitter: 0.1 };
const defaultAvg = { latency: 15, polling: 500, jitter: 0.5 };

function getVerdict(latency: number, polling: number, jitter: number) {
  if (latency < 10 && polling > 900 && jitter < 0.2) return 'Your mouse performance is excellent and suitable for competitive gaming. All metrics are within professional standards.';
  if (latency < 15 && polling > 500) return 'Your mouse performance is good for most gaming scenarios. Minor optimizations could further improve your competitive edge.';
  if (latency < 25) return 'Your mouse performance is acceptable but has room for improvement. Consider the recommendations below to optimize your setup.';
  return 'Your mouse performance indicates significant optimization opportunities. Following the recommendations below will substantially improve your gaming experience.';
}

function getTips(latency: number, polling: number, jitter: number) {
  const tips = [];
  if (latency > 15) tips.push('Use a wired USB connection instead of wireless to reduce input latency');
  if (polling < 500) tips.push('Increase your mouse polling rate to 1000Hz in your mouse software settings');
  if (jitter > 0.5) tips.push('Close unnecessary background applications and use a high-quality mouse pad');
  if (latency > 10) tips.push('Enable "Game Mode" in Windows settings to reduce system latency');
  if (polling < 1000) tips.push('Update your mouse drivers and firmware to the latest version');
  if (jitter > 0.3) tips.push('Ensure your mouse sensor is clean and use a compatible surface');
  if (tips.length === 0) tips.push('Your mouse setup is already optimized for peak performance');
  return tips;
}

export default function SessionReportModal({ isOpen, onClose, session, proBenchmarks = defaultPro, globalAvg = defaultAvg }: SessionReportModalProps) {
  if (!isOpen || !session) return null;
  const { latency, polling, jitter, device_info } = session;
  const verdict = getVerdict(latency, polling, jitter);
  const tips = getTips(latency, polling, jitter);
  const [copied, setCopied] = React.useState(false);

  const handleExportPDF = () => {
    if (!session) return;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    
    // Professional header with gradient effect
    doc.setFillColor(13, 13, 13); // Dark background
    doc.rect(0, 0, 595, 100, 'F');
    
    // Logo and branding
    const logoX = 50;
    const logoY = 25;
    const logoSize = 50;
    doc.addImage('/logo.png', 'PNG', logoX, logoY, logoSize, logoSize);
    
    // Company name with professional styling
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Mouse Tester Pro', logoX + logoSize + 20, logoY + 30);
    
    // Subtitle
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(160, 160, 160);
    doc.setFontSize(14);
    doc.text('Professional Mouse Performance Analysis', logoX + logoSize + 20, logoY + 50);
    
    // Date and time
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const timeStr = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text(`Generated on ${dateStr} at ${timeStr}`, 400, 40);
    
    // Main content area
    let y = 140;
    const leftMargin = 50;
    const rightMargin = 545;
    
    // Title
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(20);
    doc.text('Performance Analysis Report', leftMargin, y);
    y += 40;
    
    // Performance metrics in a professional table format
    doc.setFillColor(240, 240, 240);
    doc.rect(leftMargin, y - 10, rightMargin - leftMargin, 80, 'F');
    
    // Table headers
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text('Metric', leftMargin + 20, y + 10);
    doc.text('Your Result', leftMargin + 200, y + 10);
    doc.text('Rating', leftMargin + 350, y + 10);
    doc.text('Industry Standard', leftMargin + 450, y + 10);
    
    // Table rows
    y += 25;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    
    // Latency row
    const latencyRating = session.latency < 10 ? 'Excellent' : session.latency < 15 ? 'Good' : 'Needs Improvement';
    const latencyColor = session.latency < 10 ? [0, 150, 0] : session.latency < 15 ? [255, 165, 0] : [220, 20, 60];
    doc.setTextColor(0, 0, 0);
    doc.text('Click Latency', leftMargin + 20, y);
    doc.text(`${session.latency.toFixed(2)} ms`, leftMargin + 200, y);
    doc.setTextColor(latencyColor[0], latencyColor[1], latencyColor[2]);
    doc.text(latencyRating, leftMargin + 350, y);
    doc.setTextColor(0, 0, 0);
    doc.text('< 10ms', leftMargin + 450, y);
    
    y += 20;
    
    // Polling rate row
    const pollingRating = session.polling > 900 ? 'Excellent' : session.polling > 500 ? 'Good' : 'Needs Improvement';
    const pollingColor = session.polling > 900 ? [0, 150, 0] : session.polling > 500 ? [255, 165, 0] : [220, 20, 60];
    doc.setTextColor(0, 0, 0);
    doc.text('Polling Rate', leftMargin + 20, y);
    doc.text(`${session.polling} Hz`, leftMargin + 200, y);
    doc.setTextColor(pollingColor[0], pollingColor[1], pollingColor[2]);
    doc.text(pollingRating, leftMargin + 350, y);
    doc.setTextColor(0, 0, 0);
    doc.text('1000Hz', leftMargin + 450, y);
    
    y += 20;
    
    // Jitter row
    const jitterRating = session.jitter < 0.5 ? 'Excellent' : session.jitter < 1 ? 'Good' : 'Needs Improvement';
    const jitterColor = session.jitter < 0.5 ? [0, 150, 0] : session.jitter < 1 ? [255, 165, 0] : [220, 20, 60];
    doc.setTextColor(0, 0, 0);
    doc.text('Jitter', leftMargin + 20, y);
    doc.text(`${session.jitter.toFixed(2)} ms`, leftMargin + 200, y);
    doc.setTextColor(jitterColor[0], jitterColor[1], jitterColor[2]);
    doc.text(jitterRating, leftMargin + 350, y);
    doc.setTextColor(0, 0, 0);
    doc.text('< 0.5ms', leftMargin + 450, y);
    
    y += 60;
    
    // Overall Assessment
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text('Overall Assessment', leftMargin, y);
    y += 25;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    const assessment = getVerdict(session.latency, session.polling, session.jitter);
    doc.text(assessment, leftMargin, y);
    y += 40;
    
    // Recommendations section
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text('Recommendations', leftMargin, y);
    y += 25;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    const tips = getTips(session.latency, session.polling, session.jitter);
    tips.forEach((tip, i) => {
      doc.text(`• ${tip}`, leftMargin + 20, y + i * 18);
    });
    y += tips.length * 18 + 30;
    
    // Performance comparison
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text('Performance Comparison', leftMargin, y);
    y += 25;
    
    // Comparison table
    doc.setFillColor(248, 249, 250);
    doc.rect(leftMargin, y - 10, rightMargin - leftMargin, 50, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Benchmark', leftMargin + 20, y + 10);
    doc.text('Latency', leftMargin + 150, y + 10);
    doc.text('Polling', leftMargin + 250, y + 10);
    doc.text('Jitter', leftMargin + 350, y + 10);
    
    y += 20;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    // Your results
    doc.setTextColor(0, 0, 0);
    doc.text('Your Results', leftMargin + 20, y);
    doc.text(`${session.latency.toFixed(1)}ms`, leftMargin + 150, y);
    doc.text(`${session.polling}Hz`, leftMargin + 250, y);
    doc.text(`${session.jitter.toFixed(1)}ms`, leftMargin + 350, y);
    
    y += 15;
    
    // Pro benchmark
    doc.setTextColor(100, 100, 100);
    doc.text('Professional', leftMargin + 20, y);
    doc.text(`${proBenchmarks.latency}ms`, leftMargin + 150, y);
    doc.text(`${proBenchmarks.polling}Hz`, leftMargin + 250, y);
    doc.text(`${proBenchmarks.jitter}ms`, leftMargin + 350, y);
    
    y += 15;
    
    // Global average
    doc.text('Global Average', leftMargin + 20, y);
    doc.text(`${globalAvg.latency}ms`, leftMargin + 150, y);
    doc.text(`${globalAvg.polling}Hz`, leftMargin + 250, y);
    doc.text(`${globalAvg.jitter}ms`, leftMargin + 350, y);
    
    // Professional footer
    y = 750;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(leftMargin, y, rightMargin, y);
    
    y += 20;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text('Mouse Tester Pro - Professional Mouse Performance Analysis', leftMargin, y);
    doc.text('https://www.mousetesterpro.com', rightMargin - doc.getTextWidth('https://www.mousetesterpro.com'), y);
    
    // Save the PDF
    doc.save(`mouse-performance-report-${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}.pdf`);
  };

  const handleShareLink = () => {
    if (!session) return;
    const url = `https://www.mousetesterpro.com/?latency=${session.latency}&polling=${session.polling}&jitter=${session.jitter}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-[#181c24] rounded-2xl shadow-2xl p-8 max-w-lg w-full relative border border-[#23272e]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-[#60A5FA] text-2xl font-bold focus:outline-none">×</button>
        <h2 className="text-2xl font-heading text-white mb-4">Session Report</h2>
        <div className="mb-4">
          <div className="flex justify-between text-lg font-mono text-gray-200 mb-2">
            <span>Latency:</span> <span className="font-bold text-[#60A5FA]">{latency.toFixed(2)} ms</span>
          </div>
          <div className="flex justify-between text-lg font-mono text-gray-200 mb-2">
            <span>Polling:</span> <span className="font-bold text-[#60A5FA]">{polling} Hz</span>
          </div>
          <div className="flex justify-between text-lg font-mono text-gray-200 mb-2">
            <span>Jitter:</span> <span className="font-bold text-[#60A5FA]">{jitter.toFixed(2)} ms</span>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-lg font-semibold text-white mb-1">Verdict:</div>
          <div className="text-[#60A5FA] font-bold">{verdict}</div>
        </div>
        <div className="mb-4">
          <div className="text-lg font-semibold text-white mb-1">Personalized Tips:</div>
          <ul className="list-disc list-inside text-gray-200 space-y-1">
            {tips.map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </div>
        <div className="mb-4">
          <div className="text-lg font-semibold text-white mb-1">Pro/Global Comparison:</div>
          <div className="flex flex-col gap-1 text-sm text-gray-300">
            <div>Pro: <span className="text-[#60A5FA]">{proBenchmarks.latency} ms / {proBenchmarks.polling} Hz / {proBenchmarks.jitter} ms</span></div>
            <div>Global Avg: <span className="text-[#60A5FA]">{globalAvg.latency} ms / {globalAvg.polling} Hz / {globalAvg.jitter} ms</span></div>
          </div>
        </div>
        {device_info && (
          <div className="mb-4">
            <div className="text-lg font-semibold text-white mb-1">Device Info:</div>
            <pre className="text-xs text-gray-400 bg-[#10131a] rounded p-2 overflow-x-auto">{JSON.stringify(device_info, null, 2)}</pre>
          </div>
        )}
        <div className="flex gap-4 mt-6">
          <button onClick={handleExportPDF} className="bg-[#60A5FA] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#4090e6] transition">Export PDF</button>
          <button onClick={handleShareLink} className="bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition">{copied ? 'Copied!' : 'Share Link'}</button>
        </div>
      </div>
    </div>
  );
} 