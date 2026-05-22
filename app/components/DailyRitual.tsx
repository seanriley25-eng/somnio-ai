'use client';

import { TrendingUp, Archive, Flame, LogIn, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

// ---------------------------------------------------------------------------
// Global Dream Cloud — curated/static trending symbols.
// This is intentionally presented as site-wide aggregate data, not user data.
// ---------------------------------------------------------------------------
const globalDreamCloud = [
  { symbol: 'Flying',    trend: 'up',   count: '2.4k' },
  { symbol: 'Water',     trend: 'up',   count: '1.8k' },
  { symbol: 'Labyrinth', trend: 'same', count: '1.2k' },
  { symbol: 'Animals',   trend: 'down', count: '980'  },
  { symbol: 'Light',     trend: 'up',   count: '856'  },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type SymbolEntry = {
  symbol: string;
  date: string;
  emotion: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function relativeDate(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / 86_400_000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7)  return `${days} days ago`;
  if (days < 14) return '1 week ago';
  return `${Math.floor(days / 7)} weeks ago`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function DailyRitual() {
  // null = still checking auth; true/false = resolved
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [symbols, setSymbols] = useState<SymbolEntry[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      setAuthed(!!user);
      if (!user) return;

      setFetching(true);
      const { data: dreams } = await supabase
        .from('dreams')
        .select('symbols, mood, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (dreams) {
        const entries: SymbolEntry[] = dreams.flatMap((d) => {
          const syms = d.symbols as Array<{ name: string; meaning: string }>;
          if (!syms?.length) return [];
          return [{
            symbol: syms[0].name,
            date: relativeDate(d.created_at as string),
            emotion: capitalize(d.mood as string),
          }];
        });
        setSymbols(entries);
      }
      setFetching(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* Global Dream Cloud                                                  */}
      {/* ------------------------------------------------------------------ */}
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

      {/* ------------------------------------------------------------------ */}
      {/* Your Symbol Vault                                                   */}
      {/* ------------------------------------------------------------------ */}
      <div className="glass-strong p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Archive className="w-5 h-5 text-pink-400" />
          <h3 className="text-xl font-bold text-purple-300">Your Symbol Vault</h3>
        </div>

        {/* ── Loading / checking auth ── */}
        {(authed === null || fetching) && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass p-3 rounded-xl animate-pulse">
                <div className="h-3 bg-purple-500/20 rounded w-2/3 mb-2" />
                <div className="h-2 bg-purple-500/10 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* ── Anonymous: sign-in CTA ── */}
        {authed === false && !fetching && (
          <div className="flex flex-col items-center text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <LogIn className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-300 text-sm font-medium mb-1">
                Track your recurring symbols
              </p>
              <p className="text-gray-500 text-xs">
                Sign in to build a personal vault of the symbols appearing across your dreams.
              </p>
            </div>
            <Link
              href="/login"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-medium transition-all"
            >
              Sign in to get started
            </Link>
          </div>
        )}

        {/* ── Authenticated: has symbols ── */}
        {authed === true && !fetching && symbols.length > 0 && (
          <>
            <p className="text-sm text-gray-400 mb-4">
              Recently logged symbols from your dreams
            </p>
            <div className="space-y-3">
              {symbols.map((item, index) => (
                <div
                  key={index}
                  className="glass p-3 hover:bg-purple-500/10 transition-all cursor-pointer rounded-xl"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-200 font-medium">{item.symbol}</span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                  <span className="text-xs text-purple-400">{item.emotion}</span>
                </div>
              ))}
            </div>
            <Link
              href="/dreams"
              className="mt-4 flex items-center justify-center space-x-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
            >
              <span>View full journal</span>
              <span>→</span>
            </Link>
          </>
        )}

        {/* ── Authenticated: no dreams yet ── */}
        {authed === true && !fetching && symbols.length === 0 && (
          <div className="flex flex-col items-center text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-300 text-sm font-medium mb-1">
                Your vault is empty
              </p>
              <p className="text-gray-500 text-xs">
                Interpret your first dream to start tracking your personal symbols.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
