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
  if (latency < 10 && polling > 900 && jitter < 0.2) return 'Excellent for FPS gaming!';
  if (latency < 15 && polling > 500) return 'Good for most games.';
  if (latency < 25) return 'Usable, but could be improved.';
  return 'High latency—try optimizing your setup.';
}

function getTips(latency: number, polling: number, jitter: number) {
  const tips = [];
  if (latency > 15) tips.push('Try a wired connection for lower latency.');
  if (polling < 500) tips.push('Increase your mouse polling rate in settings.');
  if (jitter > 0.5) tips.push('Close background apps and use a quality mousepad.');
  if (tips.length === 0) tips.push('Your setup is already optimized!');
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
    // Draw pure black header bar
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 595, 80, 'F');
    // Add PNG logo and site name on the same line
    const logoX = 40;
    const logoY = 22;
    const logoSize = 48;
    doc.addImage('/logo.png', 'PNG', logoX, logoY, logoSize, logoSize);
    const textX = logoX + logoSize + 16; // 16pt gap after logo
    let y = logoY + 32; // Vertically center text with logo
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#fff');
    doc.setFontSize(22);
    const mainText = 'MouseTester';
    doc.text(mainText, textX, y);
    const mainTextWidth = doc.getTextWidth(mainText);
    doc.setTextColor('#A0A0A0');
    doc.text('Pro', textX + mainTextWidth + 8, y); // 8pt gap after main text
    y += 40;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#A0A0A0');
    doc.setFontSize(16);
    doc.text('Session Report', textX, y);
    y += 32;
    doc.setFontSize(12);
    doc.text(`Latency: ${session.latency.toFixed(2)} ms`, textX, y);
    y += 20;
    doc.text(`Polling: ${session.polling} Hz`, textX, y);
    y += 20;
    doc.text(`Jitter: ${session.jitter.toFixed(2)} ms`, textX, y);
    y += 32;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Verdict:', textX, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(getVerdict(session.latency, session.polling, session.jitter), textX + 65, y);
    y += 32;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Personalized Tips:', textX, y);
    y += 20;
    doc.setFont('helvetica', 'normal');
    getTips(session.latency, session.polling, session.jitter).forEach((tip, i) => {
      doc.text(`- ${tip}`, textX + 20, y + i * 18);
    });
    y += getTips(session.latency, session.polling, session.jitter).length * 18 + 24;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Pro/Global Comparison:', textX, y);
    y += 20;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Pro: ${proBenchmarks.latency} ms / ${proBenchmarks.polling} Hz / ${proBenchmarks.jitter} ms`, textX, y);
    y += 18;
    doc.text(`Global Avg: ${globalAvg.latency} ms / ${globalAvg.polling} Hz / ${globalAvg.jitter} ms`, textX, y);
    // Footer
    doc.setDrawColor('#23272e');
    doc.setLineWidth(1);
    doc.line(40, 780, 555, 780);
    doc.setFontSize(10);
    doc.setTextColor('#888');
    doc.text('Mouse Tester Pro — https://mousetester.pro', 40, 795);
    doc.save('session-report.pdf');
  };

  const handleShareLink = () => {
    if (!session) return;
    const url = `${window.location.origin}/?latency=${session.latency}&polling=${session.polling}&jitter=${session.jitter}`;
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