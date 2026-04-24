import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Moon } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import type { Dream } from '@/lib/types';

export const metadata = {
  title: 'Your Dreams | Somnio',
};

export default async function DreamsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/dreams');
  }

  const { data: dreams } = await supabase
    .from('dreams')
    .select('share_id, title, mood, created_at')
    .order('created_at', { ascending: false });

  const list =
    (dreams as Pick<Dream, 'share_id' | 'title' | 'mood' | 'created_at'>[] | null) ?? [];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Your Dream Journal
            </h1>
            <p className="text-gray-400 mt-2">
              {list.length === 0
                ? 'Your first dream will appear here once you interpret one.'
                : `${list.length} ${list.length === 1 ? 'dream' : 'dreams'} so far — patterns will emerge over time.`}
            </p>
          </div>
          <Link
            href="/"
            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg text-white font-semibold transition-all"
          >
            New dream
          </Link>
        </div>

        {list.length === 0 ? (
          <div className="glass-strong p-12 text-center space-y-4">
            <Moon className="w-12 h-12 text-purple-400 mx-auto opacity-70" />
            <p className="text-gray-300">
              Nothing here yet. Head to the homepage and tell Somnio about a recent dream.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {list.map((d) => (
              <li key={d.share_id}>
                <Link
                  href={`/dream/${d.share_id}`}
                  className="block glass-strong p-5 hover:bg-purple-500/10 transition-all"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-widest text-purple-400/80 mb-1">
                        {d.mood}
                      </p>
                      <h2 className="text-xl font-semibold text-purple-200 truncate">
                        {d.title}
                      </h2>
                    </div>
                    <time className="text-sm text-gray-500 whitespace-nowrap">
                      {new Date(d.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
