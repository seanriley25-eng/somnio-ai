'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen, ChevronRight } from 'lucide-react';
import { getAllSymbols, getSymbolsByCategory, getSymbolCategories, CATEGORY_LABELS } from '@/lib/symbols/index';
import AdBlock from '../components/AdBlock';
import type { SymbolCategory } from '@/lib/symbols/types';

const ALL_SYMBOLS = getAllSymbols();
const ALL_CATEGORIES = getSymbolCategories();

// ---------------------------------------------------------------------------
// Category tab pill
// ---------------------------------------------------------------------------
function CategoryTab({
  label,
  active,
  onClick,
  count,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
        active
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
          : 'glass border border-purple-500/20 text-gray-300 hover:border-purple-400/50 hover:text-purple-300'
      }`}
    >
      <span>{label}</span>
      <span
        className={`text-xs px-1.5 py-0.5 rounded-full ${
          active ? 'bg-white/20 text-white' : 'bg-purple-500/20 text-purple-300'
        }`}
      >
        {count}
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Symbol card
// ---------------------------------------------------------------------------
function SymbolCard({ symbol }: { symbol: ReturnType<typeof getAllSymbols>[0] }) {
  return (
    <Link
      href={`/dictionary/${symbol.slug}`}
      className="glass-strong rounded-xl p-5 border border-purple-500/20 hover:border-purple-400/50 hover:bg-purple-500/10 transition-all group flex flex-col"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2 min-w-0">
          <BookOpen className="w-4 h-4 text-purple-400 flex-shrink-0" />
          <h2 className="text-lg font-bold text-purple-300 group-hover:text-purple-200 transition-colors truncate">
            {symbol.name}
          </h2>
        </div>
        <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/20">
          {CATEGORY_LABELS[symbol.category]}
        </span>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 flex-1">
        {symbol.quickMeaning}
      </p>

      <div className="mt-3 flex items-center space-x-1 text-xs text-purple-400 group-hover:text-purple-300 transition-colors">
        <span>Full interpretation</span>
        <ChevronRight className="w-3 h-3" />
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function DictionaryPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<SymbolCategory | 'all'>('all');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    const base =
      activeCategory === 'all'
        ? ALL_SYMBOLS
        : getSymbolsByCategory(activeCategory);

    if (!q) return base;

    return base.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.quickMeaning.toLowerCase().includes(q) ||
        s.aliases.some((a) => a.toLowerCase().includes(q)),
    );
  }, [search, activeCategory]);

  const totalByCategory = useMemo(
    () =>
      Object.fromEntries(
        ALL_CATEGORIES.map((c) => [c, getSymbolsByCategory(c).length]),
      ),
    [],
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Dream Symbol Dictionary
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A-Z guide to dream meanings — Jungian, Freudian, and cross-cultural interpretations
            for the symbols your sleeping mind keeps returning to.
          </p>
        </div>

        {/* ── Top ad ── */}
        <AdBlock size="banner" className="mb-8" />

        {/* ── Search ── */}
        <div className="glass-strong rounded-2xl p-4 mb-6 border border-purple-500/20">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="search"
              placeholder="Search symbols (e.g. 'snake', 'water', 'falling')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full glass rounded-xl pl-12 pr-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── Category tabs ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          <CategoryTab
            label="All"
            active={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            count={ALL_SYMBOLS.length}
          />
          {ALL_CATEGORIES.map((cat) => (
            <CategoryTab
              key={cat}
              label={CATEGORY_LABELS[cat]}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(activeCategory === cat ? 'all' : cat)}
              count={totalByCategory[cat] ?? 0}
            />
          ))}
        </div>

        {/* ── Results count ── */}
        {(search || activeCategory !== 'all') && (
          <p className="text-gray-500 text-sm mb-4">
            {filtered.length === 0
              ? 'No symbols found'
              : `${filtered.length} symbol${filtered.length === 1 ? '' : 's'} found`}
            {activeCategory !== 'all' && ` in ${CATEGORY_LABELS[activeCategory]}`}
            {search && ` matching "${search}"`}
          </p>
        )}

        {/* ── Symbol grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {filtered.map((symbol) => (
              <SymbolCard key={symbol.slug} symbol={symbol} />
            ))}
          </div>
        ) : (
          <div className="glass-strong rounded-2xl p-12 text-center mb-10">
            <p className="text-gray-400 text-lg mb-2">
              No symbols found
              {search ? ` matching "${search}"` : ''}
              {activeCategory !== 'all' ? ` in ${CATEGORY_LABELS[activeCategory]}` : ''}.
            </p>
            <p className="text-gray-500 text-sm">
              We&apos;re adding new symbols every week.{' '}
              <button
                onClick={() => { setSearch(''); setActiveCategory('all'); }}
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Browse all symbols
              </button>{' '}
              or{' '}
              <Link href="/" className="text-purple-400 hover:text-purple-300 underline">
                interpret a dream directly
              </Link>
              .
            </p>
          </div>
        )}

        {/* ── Bottom ad ── */}
        <AdBlock size="banner" />

        {/* ── CTA ── */}
        <div className="mt-10 glass rounded-2xl p-8 border border-purple-500/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Can&apos;t find your symbol?
          </h2>
          <p className="text-gray-300 mb-6">
            Describe your dream to Somnio and our AI will identify and interpret the specific
            symbols in your dream — no dictionary lookup needed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all"
          >
            <span>Interpret my dream →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
