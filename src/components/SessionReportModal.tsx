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
    
    doc.setFontSize(9);
    doc.setTextColor(200, 200, 200);
    const dateText = `Generated on ${dateStr} at ${timeStr}`;
    const dateWidth = doc.getTextWidth(dateText);
    doc.text(dateText, 595 - dateWidth - 20, 40);
    
    // Main content area with better margins
    let y = 140;
    const leftMargin = 40;
    const rightMargin = 555;
    const contentWidth = rightMargin - leftMargin;
    
    // Title
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text('Performance Analysis Report', leftMargin, y);
    y += 35;
    
    // Performance metrics in a professional table format with borders
    const metricsTableTop = y - 10;
    const metricsTableHeight = 80;
    const metricsRowHeight = 20;
    
    // Table background
    doc.setFillColor(248, 249, 250);
    doc.rect(leftMargin, metricsTableTop, contentWidth, metricsTableHeight, 'F');
    
    // Table border
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(leftMargin, metricsTableTop, contentWidth, metricsTableHeight);
    
    // Header row background
    doc.setFillColor(230, 230, 230);
    doc.rect(leftMargin, metricsTableTop, contentWidth, metricsRowHeight, 'F');
    
    // Column dividers for metrics table
    const metricsCol1 = leftMargin + 120;
    const metricsCol2 = leftMargin + 250;
    const metricsCol3 = leftMargin + 380;
    
    doc.line(metricsCol1, metricsTableTop, metricsCol1, metricsTableTop + metricsTableHeight);
    doc.line(metricsCol2, metricsTableTop, metricsCol2, metricsTableTop + metricsTableHeight);
    doc.line(metricsCol3, metricsTableTop, metricsCol3, metricsTableTop + metricsTableHeight);
    
    // Table headers
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text('Metric', leftMargin + 10, metricsTableTop + 14);
    doc.text('Your Result', metricsCol1 + 10, metricsTableTop + 14);
    doc.text('Rating', metricsCol2 + 10, metricsTableTop + 14);
    doc.text('Industry Standard', metricsCol3 + 10, metricsTableTop + 14);
    
    // Table rows
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    // Latency row
    const latencyRating = session.latency < 10 ? 'Excellent' : session.latency < 15 ? 'Good' : 'Needs Improvement';
    const latencyColor = session.latency < 10 ? [0, 150, 0] : session.latency < 15 ? [255, 165, 0] : [220, 20, 60];
    const latencyRowY = metricsTableTop + metricsRowHeight + 14;
    doc.setTextColor(0, 0, 0);
    doc.text('Click Latency', leftMargin + 10, latencyRowY);
    doc.text(`${session.latency.toFixed(2)} ms`, metricsCol1 + 10, latencyRowY);
    doc.setTextColor(latencyColor[0], latencyColor[1], latencyColor[2]);
    doc.text(latencyRating, metricsCol2 + 10, latencyRowY);
    doc.setTextColor(0, 0, 0);
    doc.text('< 10ms', metricsCol3 + 10, latencyRowY);
    
    // Polling rate row
    const pollingRating = session.polling > 900 ? 'Excellent' : session.polling > 500 ? 'Good' : 'Needs Improvement';
    const pollingColor = session.polling > 900 ? [0, 150, 0] : session.polling > 500 ? [255, 165, 0] : [220, 20, 60];
    const pollingRowY = metricsTableTop + (metricsRowHeight * 2) + 14;
    doc.setTextColor(0, 0, 0);
    doc.text('Polling Rate', leftMargin + 10, pollingRowY);
    doc.text(`${session.polling} Hz`, metricsCol1 + 10, pollingRowY);
    doc.setTextColor(pollingColor[0], pollingColor[1], pollingColor[2]);
    doc.text(pollingRating, metricsCol2 + 10, pollingRowY);
    doc.setTextColor(0, 0, 0);
    doc.text('1000Hz', metricsCol3 + 10, pollingRowY);
    
    // Jitter row
    const jitterRating = session.jitter < 0.5 ? 'Excellent' : session.jitter < 1 ? 'Good' : 'Needs Improvement';
    const jitterColor = session.jitter < 0.5 ? [0, 150, 0] : session.jitter < 1 ? [255, 165, 0] : [220, 20, 60];
    const jitterRowY = metricsTableTop + (metricsRowHeight * 3) + 14;
    doc.setTextColor(0, 0, 0);
    doc.text('Jitter', leftMargin + 10, jitterRowY);
    doc.text(`${session.jitter.toFixed(2)} ms`, metricsCol1 + 10, jitterRowY);
    doc.setTextColor(jitterColor[0], jitterColor[1], jitterColor[2]);
    doc.text(jitterRating, metricsCol2 + 10, jitterRowY);
    doc.setTextColor(0, 0, 0);
    doc.text('< 0.5ms', metricsCol3 + 10, jitterRowY);
    
    y = metricsTableTop + metricsTableHeight + 20;
    
    // Overall Assessment
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('Overall Assessment', leftMargin, y);
    y += 25;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const assessment = getVerdict(session.latency, session.polling, session.jitter);
    
    // Split long text into multiple lines
    const splitText = doc.splitTextToSize(assessment, contentWidth - 20);
    doc.text(splitText, leftMargin, y);
    y += splitText.length * 15 + 20;
    
    // Recommendations section
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('Recommendations', leftMargin, y);
    y += 25;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const tips = getTips(session.latency, session.polling, session.jitter);
    
    tips.forEach((tip, i) => {
      const bulletText = `• ${tip}`;
      const splitTip = doc.splitTextToSize(bulletText, contentWidth - 40);
      doc.text(splitTip, leftMargin + 20, y);
      y += splitTip.length * 14 + 8;
    });
    y += 20;
    
    // Performance comparison with improved layout
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('Performance Comparison', leftMargin, y);
    y += 25;
    
    // Create a more structured comparison table
    const tableTop = y - 10;
    const tableHeight = 80;
    const rowHeight = 20;
    
    // Table background
    doc.setFillColor(248, 249, 250);
    doc.rect(leftMargin, tableTop, contentWidth, tableHeight, 'F');
    
    // Table border
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(leftMargin, tableTop, contentWidth, tableHeight);
    
    // Header row background
    doc.setFillColor(230, 230, 230);
    doc.rect(leftMargin, tableTop, contentWidth, rowHeight, 'F');
    
    // Column dividers
    const col1 = leftMargin + 120;
    const col2 = leftMargin + 220;
    const col3 = leftMargin + 320;
    const col4 = leftMargin + 420;
    
    doc.line(col1, tableTop, col1, tableTop + tableHeight);
    doc.line(col2, tableTop, col2, tableTop + tableHeight);
    doc.line(col3, tableTop, col3, tableTop + tableHeight);
    doc.line(col4, tableTop, col4, tableTop + tableHeight);
    
    // Header text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Benchmark', leftMargin + 10, tableTop + 14);
    doc.text('Latency', col1 + 10, tableTop + 14);
    doc.text('Polling Rate', col2 + 10, tableTop + 14);
    doc.text('Jitter', col3 + 10, tableTop + 14);
    doc.text('Overall', col4 + 10, tableTop + 14);
    
    // Data rows
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    // Your results row
    const yourRowY = tableTop + rowHeight + 14;
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Results', leftMargin + 10, yourRowY);
    doc.setFont('helvetica', 'normal');
    doc.text(`${session.latency.toFixed(1)} ms`, col1 + 10, yourRowY);
    doc.text(`${session.polling} Hz`, col2 + 10, yourRowY);
    doc.text(`${session.jitter.toFixed(1)} ms`, col3 + 10, yourRowY);
    
    // Calculate overall rating for your results
    const yourOverall = session.latency < 10 && session.polling > 900 && session.jitter < 0.5 ? 'Excellent' :
                       session.latency < 15 && session.polling > 500 ? 'Good' : 'Needs Work';
    const yourColor = yourOverall === 'Excellent' ? [0, 150, 0] : yourOverall === 'Good' ? [255, 165, 0] : [220, 20, 60];
    doc.setTextColor(yourColor[0], yourColor[1], yourColor[2]);
    doc.text(yourOverall, col4 + 10, yourRowY);
    
    // Professional benchmark row
    const proRowY = tableTop + (rowHeight * 2) + 14;
    doc.setTextColor(100, 100, 100);
    doc.text('Professional', leftMargin + 10, proRowY);
    doc.text(`${proBenchmarks.latency} ms`, col1 + 10, proRowY);
    doc.text(`${proBenchmarks.polling} Hz`, col2 + 10, proRowY);
    doc.text(`${proBenchmarks.jitter} ms`, col3 + 10, proRowY);
    doc.setTextColor(0, 150, 0);
    doc.text('Excellent', col4 + 10, proRowY);
    
    // Global average row
    const avgRowY = tableTop + (rowHeight * 3) + 14;
    doc.setTextColor(100, 100, 100);
    doc.text('Global Average', leftMargin + 10, avgRowY);
    doc.text(`${globalAvg.latency} ms`, col1 + 10, avgRowY);
    doc.text(`${globalAvg.polling} Hz`, col2 + 10, avgRowY);
    doc.text(`${globalAvg.jitter} ms`, col3 + 10, avgRowY);
    doc.setTextColor(255, 165, 0);
    doc.text('Good', col4 + 10, avgRowY);
    
    y = tableTop + tableHeight + 20;
    
    // Professional footer
    y = 750;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(leftMargin, y, rightMargin, y);
    
    y += 20;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
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