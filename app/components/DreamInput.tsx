'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sparkles, Brain, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const DRAFT_KEY = 'somnio_dream_draft';

export default function DreamInput() {
  const router = useRouter();
  const [dreamText, setDreamText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const draft = sessionStorage.getItem(DRAFT_KEY);
    if (draft) setDreamText(draft);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = dreamText.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      sessionStorage.setItem(DRAFT_KEY, trimmed);
      router.push('/login?next=/');
      return;
    }

    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ dream_text: trimmed }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Request failed (${res.status})`);
      }

      const { share_id } = (await res.json()) as { share_id: string };
      sessionStorage.removeItem(DRAFT_KEY);
      router.push(`/dream/${encodeURIComponent(share_id)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-strong p-8 glow">
      {submitting ? (
        <div className="flex flex-col items-center space-y-6 py-8">
          <div className="relative">
            <Brain className="w-16 h-16 text-purple-400 animate-pulse" />
            <Sparkles className="w-8 h-8 text-pink-400 absolute -top-2 -right-2 animate-bounce" />
          </div>
          <div className="space-y-2 text-center">
            <p className="text-xl font-semibold text-purple-300">Listening to your dream...</p>
            <p className="text-gray-400">Mapping symbols and drawing on your past dreams...</p>
          </div>
          <div className="w-64 h-1 bg-purple-900/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"
              style={{ width: '70%' }}
            ></div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="dream"
              className="block text-xl font-semibold text-purple-300 mb-3"
            >
              Describe Your Dream
            </label>
            <textarea
              id="dream"
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
              placeholder="I was walking through a forest of glowing trees when suddenly..."
              rows={8}
              maxLength={5000}
              className="w-full glass p-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              required
            />
            <p className="mt-2 text-sm text-gray-400">
              Be as detailed as possible. Include emotions, colors, people, and any recurring themes.
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!dreamText.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 glow transition-all"
          >
            <Sparkles className="w-5 h-5" />
            <span>Interpret My Dream</span>
          </button>
        </form>
      )}
    </div>
  );
}
