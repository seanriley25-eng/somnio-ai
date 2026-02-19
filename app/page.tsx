'use client';

import { useState } from 'react';
import { Sparkles, Brain, Eye, Lightbulb, TrendingUp } from 'lucide-react';
import DreamInput from './components/DreamInput';
import InterpretationView from './components/InterpretationView';
import DailyRitual from './components/DailyRitual';
import AdBlock from './components/AdBlock';

export default function Home() {
  const [interpretation, setInterpretation] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInterpret = async (dreamText: string) => {
    setIsAnalyzing(true);
    setInterpretation(null);

    // Simulate AI processing with stages
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock interpretation data
    const mockInterpretation = {
      narrative: `Your dream reveals a journey of transformation and self-discovery. The recurring themes of ${dreamText.toLowerCase().includes('water') ? 'water' : 'movement'} suggest you're navigating through emotional depths, seeking clarity in uncertain times.`,
      symbols: [
        {
          name: dreamText.toLowerCase().includes('flying') ? 'Flying' : 'Journey',
          meaning: dreamText.toLowerCase().includes('flying')
            ? 'Freedom, transcendence, and liberation from constraints'
            : 'Life path, personal growth, and exploration of the unknown'
        },
        {
          name: dreamText.toLowerCase().includes('water') ? 'Water' : 'Path',
          meaning: dreamText.toLowerCase().includes('water')
            ? 'Emotions, subconscious mind, and spiritual cleansing'
            : 'Direction, choices, and the journey ahead'
        },
        {
          name: 'Light',
          meaning: 'Awareness, hope, and illumination of truth'
        }
      ],
      insight: `This dream indicates you're at a pivotal moment of personal evolution. Your subconscious is processing recent changes and preparing you for new opportunities. Trust your intuition and embrace the transformative energy surrounding you.`
    };

    setInterpretation(mockInterpretation);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Unlock Your Subconscious.
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-purple-200 mb-6">
            Every Morning.
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Transform your dreams into insights. Our AI analyzes symbols, emotions, and patterns to reveal the hidden wisdom of your subconscious mind.
          </p>
        </div>

        {/* Top Ad Block */}
        <AdBlock size="banner" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {!interpretation && !isAnalyzing && (
              <DreamInput onInterpret={handleInterpret} />
            )}

            {isAnalyzing && (
              <div className="glass-strong p-12 text-center">
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative">
                    <Brain className="w-16 h-16 text-purple-400 animate-pulse" />
                    <Sparkles className="w-8 h-8 text-pink-400 absolute -top-2 -right-2 animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-purple-300">Analyzing your dream...</p>
                    <p className="text-gray-400">Mapping emotions and extracting symbols...</p>
                  </div>
                  <div className="w-64 h-1 bg-purple-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            )}

            {interpretation && (
              <>
                <InterpretationView interpretation={interpretation} />
                <button
                  onClick={() => {
                    setInterpretation(null);
                    setIsAnalyzing(false);
                  }}
                  className="w-full glass-strong p-4 text-purple-300 hover:bg-purple-500/20 rounded-lg transition-all"
                >
                  Interpret Another Dream
                </button>
              </>
            )}

            {/* Middle Ad Block */}
            <AdBlock size="rectangle" className="mx-auto" />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <DailyRitual />

            {/* Sidebar Ad Block */}
            <AdBlock size="sidebar" className="mt-8" />
          </div>
        </div>

        {/* Bottom Page Ad */}
        <AdBlock size="banner" className="mt-12" />
      </div>
    </div>
  );
}
