'use client';

import { Sparkles, Tag, Heart, Lightbulb } from 'lucide-react';

const DEMO_DREAM =
  'I was flying over a city but then started falling and couldn\'t find my way home';

const DEMO_SYMBOLS = [
  { symbol: 'Flying', meaning: 'freedom / ambition' },
  { symbol: 'Falling', meaning: 'loss of control' },
  { symbol: 'Home', meaning: 'security / self' },
];

const DEMO_THEME = 'Transition anxiety';

const DEMO_INSIGHT =
  'This dream often surfaces during periods of major life change. The flight represents a desire for elevated perspective; the fall signals uncertainty about whether you can sustain it. Your subconscious is working through the gap between aspiration and the fear of failure.';

export default function DemoPreview() {
  return (
    <div className="glass-strong p-8 space-y-6">
      {/* Section header */}
      <div className="flex items-center space-x-2 mb-2">
        <Sparkles className="w-5 h-5 text-pink-400" />
        <h3 className="text-lg font-semibold text-purple-300">See an example</h3>
      </div>

      {/* Dream input echo */}
      <div className="glass p-4 border border-purple-500/20">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Dream</p>
        <p className="text-gray-300 italic">&ldquo;{DEMO_DREAM}&rdquo;</p>
      </div>

      {/* Key symbols */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Tag className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-300 uppercase tracking-widest">Key Symbols</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {DEMO_SYMBOLS.map(({ symbol, meaning }) => (
            <span
              key={symbol}
              className="px-3 py-1.5 rounded-full glass border border-purple-400/30 text-sm"
            >
              <span className="text-purple-200 font-semibold">{symbol}</span>
              <span className="text-gray-400 mx-1">→</span>
              <span className="text-gray-300">{meaning}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Emotional theme */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Heart className="w-4 h-4 text-pink-400" />
          <span className="text-sm font-medium text-purple-300 uppercase tracking-widest">Emotional Theme</span>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-sm font-medium">
          {DEMO_THEME}
        </span>
      </div>

      {/* Insight */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-purple-300 uppercase tracking-widest">Insight</span>
        </div>
        <p className="text-gray-300 leading-relaxed">{DEMO_INSIGHT}</p>
      </div>

      {/* Caption */}
      <p className="text-xs text-gray-500 text-center pt-2 border-t border-purple-500/10">
        Example interpretation — try your own above
      </p>
    </div>
  );
}
