'use client';

import { Sparkles, TrendingUp, Target } from 'lucide-react';

interface AdBlockProps {
  size: 'banner' | 'sidebar' | 'rectangle';
  className?: string;
}

const sizeClasses = {
  banner: 'w-full h-28',
  sidebar: 'w-full h-72',
  rectangle: 'w-full h-56',
};

export default function AdBlock({ size, className = '' }: AdBlockProps) {
  return (
    <div
      className={`${sizeClasses[size]} ${className} glass-strong border-2 border-purple-400/40 flex flex-col items-center justify-center space-y-3 rounded-xl relative overflow-hidden group hover:border-purple-400/60 transition-all`}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-purple-600/10 opacity-50 group-hover:opacity-70 transition-opacity" />

      {/* Sparkle effect in corner */}
      <Sparkles className="absolute top-3 right-3 w-5 h-5 text-purple-400/40 animate-pulse" />

      <div className="relative z-10 flex flex-col items-center space-y-3">
        <div className="flex items-center space-x-3">
          <Target className="w-7 h-7 text-purple-400" />
          <TrendingUp className="w-7 h-7 text-pink-400" />
        </div>

        <div className="text-center">
          <p className="text-base font-bold text-purple-300 mb-1">Sponsored Content</p>
          <p className="text-sm text-purple-400/80">Premium Advertisement Placement</p>
        </div>

        {size === 'banner' && (
          <div className="px-4 py-1.5 bg-purple-500/20 rounded-full">
            <span className="text-xs text-purple-300 font-medium">High Visibility Zone</span>
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
    </div>
  );
}
