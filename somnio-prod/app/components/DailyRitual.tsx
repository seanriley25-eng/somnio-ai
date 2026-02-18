'use client';

import { TrendingUp, Archive, Flame } from 'lucide-react';

const globalDreamCloud = [
  { symbol: 'Flying', trend: 'up', count: '2.4k' },
  { symbol: 'Water', trend: 'up', count: '1.8k' },
  { symbol: 'Labyrinth', trend: 'same', count: '1.2k' },
  { symbol: 'Animals', trend: 'down', count: '980' },
  { symbol: 'Light', trend: 'up', count: '856' },
];

const userSymbols = [
  { symbol: 'Ocean', date: '2 days ago', emotion: 'Peaceful' },
  { symbol: 'Forest', date: '5 days ago', emotion: 'Mysterious' },
  { symbol: 'Flying', date: '1 week ago', emotion: 'Liberated' },
];

export default function DailyRitual() {
  return (
    <div className="space-y-6">
      {/* Global Dream Cloud */}
      <div className="glass-strong p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-bold text-purple-300">Global Dream Cloud</h3>
        </div>
        <p className="text-sm text-gray-400 mb-4">
          Trending symbols people are dreaming about worldwide
        </p>
        <div className="space-y-3">
          {globalDreamCloud.map((item, index) => (
            <div
              key={index}
              className="glass p-3 flex items-center justify-between hover:bg-purple-500/10 transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-gray-200 font-medium">{item.symbol}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{item.count}</span>
                <span
                  className={`text-xs ${
                    item.trend === 'up'
                      ? 'text-green-400'
                      : item.trend === 'down'
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                >
                  {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Symbol Vault */}
      <div className="glass-strong p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Archive className="w-5 h-5 text-pink-400" />
          <h3 className="text-xl font-bold text-purple-300">Your Symbol Vault</h3>
        </div>
        <p className="text-sm text-gray-400 mb-4">Recently logged symbols from your dreams</p>
        <div className="space-y-3">
          {userSymbols.map((item, index) => (
            <div
              key={index}
              className="glass p-3 hover:bg-purple-500/10 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-200 font-medium">{item.symbol}</span>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
              <span className="text-xs text-purple-400">{item.emotion}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
