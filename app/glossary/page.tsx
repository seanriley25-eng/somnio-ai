import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { getAllGlossarySymbols } from '@/lib/glossary';
import AdBlock from '../components/AdBlock';

export const metadata: Metadata = {
  title: 'Dream Symbol Dictionary & Glossary | Dream Meaning Guide | Somnio',
  description:
    'Explore our dream symbol glossary — a comprehensive dream meaning guide covering the most common dream symbols. Understand the psychology, history, and interpretation of your dreams.',
  keywords: [
    'dream symbol dictionary',
    'dream meaning glossary',
    'dream interpretation guide',
    'dream symbols explained',
    'common dream meanings',
    'dream dictionary',
    'dream symbolism',
    'what do dreams mean',
  ],
  openGraph: {
    title: 'Dream Symbol Dictionary & Glossary | Somnio',
    description:
      'A comprehensive guide to the most common dream symbols — psychology, cultural history, and interpretation.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: '/glossary',
  },
};

const symbols = getAllGlossarySymbols();

export default function GlossaryPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full text-purple-300 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Dream Symbol Dictionary</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Dream Meaning Glossary
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            A comprehensive guide to the most common and psychologically significant dream symbols.
            Each entry explores the psychology, history, cultural meaning, and personal significance of
            the symbols your sleeping mind reaches for.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg text-white font-medium transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Interpret Your Dream with AI</span>
            </Link>
          </div>
        </div>

        {/* Top Ad */}
        <AdBlock size="banner" className="mb-8" />

        {/* Symbol List */}
        <div className="space-y-4">
          {symbols.map((symbol) => (
            <Link
              key={symbol.slug}
              href={`/glossary/${symbol.slug}`}
              className="block glass-strong p-6 hover:bg-purple-500/20 transition-all glow group"
            >
              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1 space-y-2">
                  <h2 className="text-2xl font-bold text-purple-300 group-hover:text-purple-200 transition-colors">
                    {symbol.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {symbol.teaser}
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center pt-1">
                  <ArrowRight className="w-5 h-5 text-purple-400 group-hover:text-purple-300 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Ad */}
        <AdBlock size="banner" className="mt-8" />

        {/* CTA */}
        <div className="mt-12 glass-strong p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-purple-300">
            Had a dream that isn&apos;t in this glossary?
          </h2>
          <p className="text-gray-300">
            Use our AI dream interpreter for a personalized analysis of any dream symbol, narrative,
            or experience.
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg text-white font-medium transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Try the Dream Interpreter</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
