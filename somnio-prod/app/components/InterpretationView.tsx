'use client';

import { useState } from 'react';
import { BookOpen, Sparkles, Lightbulb, Share2, Download, ThumbsUp, ThumbsDown, X } from 'lucide-react';

interface Symbol {
  name: string;
  meaning: string;
}

interface InterpretationProps {
  interpretation: {
    narrative: string;
    symbols: Symbol[];
    insight: string;
  };
}

export default function InterpretationView({ interpretation }: InterpretationProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [voted, setVoted] = useState<'up' | 'down' | null>(null);

  const handleVote = (voteType: 'up' | 'down') => {
    setVoted(voteType === voted ? null : voteType);
  };

  const handleShare = (platform: string) => {
    const shareText = encodeURIComponent('Check out my dream interpretation from Somnio! 🌙✨');
    const shareUrl = encodeURIComponent(window.location.href);

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      instagram: 'https://www.instagram.com/',
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Share Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center space-x-2 px-6 py-3 glass-strong hover:bg-purple-500/20 rounded-lg text-purple-300 font-medium transition-all glow"
        >
          <Share2 className="w-5 h-5" />
          <span>Share Interpretation</span>
        </button>
      </div>

      {/* The Narrative */}
      <div className="glass-strong p-6 glow">
        <div className="flex items-center space-x-3 mb-4">
          <BookOpen className="w-6 h-6 text-purple-400" />
          <h3 className="text-2xl font-bold text-purple-300">The Narrative</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{interpretation.narrative}</p>
      </div>

      {/* Symbols */}
      <div className="glass-strong p-6 glow">
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="w-6 h-6 text-pink-400" />
          <h3 className="text-2xl font-bold text-purple-300">Symbols</h3>
        </div>
        <div className="grid gap-4">
          {interpretation.symbols.map((symbol, index) => (
            <div key={index} className="glass p-4 hover:bg-purple-500/10 transition-all">
              <h4 className="text-lg font-semibold text-purple-400 mb-2">{symbol.name}</h4>
              <p className="text-gray-400">{symbol.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Insight */}
      <div className="glass-strong p-6 glow bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="flex items-center space-x-3 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <h3 className="text-2xl font-bold text-purple-300">Deeper Insight</h3>
        </div>
        <p className="text-gray-300 leading-relaxed italic">{interpretation.insight}</p>
      </div>

      {/* Engagement Section */}
      <div className="glass-strong p-6 flex flex-col items-center space-y-4">
        <p className="text-gray-300 font-medium">Did this resonate?</p>
        <div className="flex space-x-4">
          <button
            onClick={() => handleVote('up')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
              voted === 'up'
                ? 'bg-green-500/30 text-green-300 border-2 border-green-400'
                : 'glass hover:bg-purple-500/20 text-gray-300'
            }`}
          >
            <ThumbsUp className="w-5 h-5" />
            <span>Yes</span>
          </button>
          <button
            onClick={() => handleVote('down')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
              voted === 'down'
                ? 'bg-red-500/30 text-red-300 border-2 border-red-400'
                : 'glass hover:bg-purple-500/20 text-gray-300'
            }`}
          >
            <ThumbsDown className="w-5 h-5" />
            <span>No</span>
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-strong p-8 max-w-md w-full space-y-6 relative glow">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold text-purple-300 text-center">Share Your Interpretation</h3>

            {/* Download Card Section */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-medium transition-all">
                <Download className="w-5 h-5" />
                <span>Download Card</span>
              </button>
              <p className="text-sm text-gray-400 text-center">Save as a beautiful shareable image</p>
            </div>

            <div className="border-t border-purple-500/30 pt-4">
              <p className="text-sm text-gray-400 text-center mb-4">Share on social media</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleShare('twitter')}
                  className="glass p-4 rounded-lg hover:bg-purple-500/20 transition-all group"
                  title="Share on X (Twitter)"
                >
                  <svg className="w-6 h-6 text-gray-300 group-hover:text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleShare('instagram')}
                  className="glass p-4 rounded-lg hover:bg-purple-500/20 transition-all group"
                  title="Share on Instagram"
                >
                  <svg className="w-6 h-6 text-gray-300 group-hover:text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="glass p-4 rounded-lg hover:bg-purple-500/20 transition-all group"
                  title="Share on Facebook"
                >
                  <svg className="w-6 h-6 text-gray-300 group-hover:text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
