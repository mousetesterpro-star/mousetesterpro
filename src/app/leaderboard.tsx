import React from 'react';

const mockLeaderboard = [
  { rank: 1, name: 'Anonymous', latency: 8.2, polling: 1000, jitter: 0.12 },
  { rank: 2, name: 'Anonymous', latency: 9.1, polling: 990, jitter: 0.15 },
  { rank: 3, name: 'Anonymous', latency: 10.0, polling: 980, jitter: 0.18 },
  { rank: 4, name: 'Anonymous', latency: 10.5, polling: 970, jitter: 0.20 },
  { rank: 5, name: 'Anonymous', latency: 11.2, polling: 960, jitter: 0.22 },
];

export default function LeaderboardPage() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Leaderboard</h1>
      <div className="bg-[#1A1A1A] rounded-2xl shadow-sm p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-2 text-sm text-gray-400 font-medium">Rank</th>
              <th className="py-2 px-2 text-sm text-gray-400 font-medium">User</th>
              <th className="py-2 px-2 text-sm text-gray-400 font-medium">Best Latency <span className='text-[#60A5FA]'>(ms)</span></th>
              <th className="py-2 px-2 text-sm text-gray-400 font-medium">Best Polling <span className='text-[#60A5FA]'>(Hz)</span></th>
              <th className="py-2 px-2 text-sm text-gray-400 font-medium">Best Jitter <span className='text-[#60A5FA]'>(ms)</span></th>
            </tr>
          </thead>
          <tbody>
            {mockLeaderboard.map((entry) => (
              <tr key={entry.rank} className="border-b border-gray-800 hover:bg-[#23272e] transition-all">
                <td className="py-2 px-2 text-lg font-bold text-[#60A5FA]">{entry.rank}</td>
                <td className="py-2 px-2 text-white">{entry.name}</td>
                <td className="py-2 px-2 text-white">{entry.latency}</td>
                <td className="py-2 px-2 text-white">{entry.polling}</td>
                <td className="py-2 px-2 text-white">{entry.jitter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
} 