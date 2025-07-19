export default function TipsPanel() {
  return (
    <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed text-gray-200">
      <li><span className="font-semibold underline">USB Port:</span> Connect your mouse to a <span className="font-bold">USB 3.0 port</span> (often blue) for optimal data transfer and reduced latency.</li>
      <li><span className="font-semibold underline">VSync:</span> <span className="font-bold">Disable Vertical Sync (VSync)</span> in your graphics card settings and in-game. This can significantly reduce input lag.</li>
      <li><span className="font-semibold underline">Drivers & Firmware:</span> Always ensure your mouse drivers and firmware are <span className="font-bold">up to date</span>. Visit the manufacturer’s official website.</li>
      <li><span className="font-semibold underline">Windows Settings:</span> For Windows users, disable <span className="font-bold">"Enhance pointer precision"</span> in Mouse Properties for raw, unfiltered input.</li>
      <li><span className="font-semibold underline">Background Apps:</span> Close unnecessary background applications and processes that consume CPU resources, which can impact performance.</li>
      <li><span className="font-semibold underline">Polling Rate:</span> Set your mouse to its <span className="font-bold">highest stable polling rate</span> (e.g., 1000Hz) for the most frequent updates.</li>
    </ul>
  );
}