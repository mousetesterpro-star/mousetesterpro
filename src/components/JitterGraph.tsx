'use client';

import { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { useTestSession } from '@/context/TestSessionContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MAX_DATA_POINTS = 100;

export default function JitterGraph() {
  const [jitter, setJitter] = useState(0);
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Jitter (ms)',
        data: [],
        borderColor: '#e6edf3', // Monochrome white
        backgroundColor: 'rgba(230, 237, 243, 0.08)',
        tension: 0.3,
        fill: true,
      },
    ],
  });

  const { setJitter: setJitterContext } = useTestSession();
  const timestamps = useRef<number[]>([]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const now = performance.now();
      timestamps.current.push(now);

      if (timestamps.current.length > MAX_DATA_POINTS) {
        timestamps.current.shift();
      }

      if (timestamps.current.length > 10) { // Only set after 10 moves for stability
        const interval1 = timestamps.current[timestamps.current.length - 1] - timestamps.current[timestamps.current.length - 2];
        const interval2 = timestamps.current[timestamps.current.length - 2] - timestamps.current[timestamps.current.length - 3];
        const currentJitter = Math.abs(interval1 - interval2);
        setJitter(currentJitter);
        setJitterContext(currentJitter);

        setChartData((prevData: any) => ({
          labels: [...prevData.labels, new Date().toLocaleTimeString()].slice(-MAX_DATA_POINTS),
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data, currentJitter].slice(-MAX_DATA_POINTS),
            },
          ],
        }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setJitterContext]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    layout: {
      padding: 0,
    },
    backgroundColor: 'transparent',
    elements: {
      point: {
        borderWidth: 0,
      },
      line: {
        borderWidth: 2,
      },
    },
    scales: {
      x: {
        ticks: { display: false },
        grid: { color: 'rgba(255,255,255,0.08)' },
      },
      y: {
        min: 0,
        grid: { color: 'rgba(255,255,255,0.08)' },
        ticks: { color: '#e6edf3' },
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full h-80 bg-transparent border-none">
      <div className="text-5xl font-extrabold mb-4 text-white">{jitter.toFixed(4)} ms</div>
      <div className="w-full h-full bg-transparent border-none">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}