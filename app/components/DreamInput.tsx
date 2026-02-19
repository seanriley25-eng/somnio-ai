'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface DreamInputProps {
  onInterpret: (dreamText: string) => void;
}

export default function DreamInput({ onInterpret }: DreamInputProps) {
  const [dreamText, setDreamText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dreamText.trim()) {
      onInterpret(dreamText);
    }
  };

  return (
    <div className="glass-strong p-8 glow">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="dream" className="block text-xl font-semibold text-purple-300 mb-3">
            Describe Your Dream
          </label>
          <textarea
            id="dream"
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            placeholder="I was walking through a forest of glowing trees when suddenly..."
            rows={8}
            className="w-full glass p-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            required
          />
          <p className="mt-2 text-sm text-gray-400">
            Be as detailed as possible. Include emotions, colors, people, and any recurring themes.
          </p>
        </div>

        <button
          type="submit"
          disabled={!dreamText.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 glow transition-all"
        >
          <Sparkles className="w-5 h-5" />
          <span>Interpret My Dream</span>
        </button>
      </form>
    </div>
  );
}
