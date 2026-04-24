'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Moon, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/';

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === 'sending') return;

    setStatus('sending');
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (authError) {
      setStatus('error');
      setError(authError.message);
    } else {
      setStatus('sent');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-start justify-center">
      <div className="glass-strong p-8 max-w-md w-full space-y-6 glow">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Moon className="w-12 h-12 text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Sign in to Somnio
          </h1>
          <p className="text-gray-400 text-sm">
            We&apos;ll email you a magic link — no password needed.
          </p>
        </div>

        {status === 'sent' ? (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-200">
            <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Check your email.</p>
              <p className="text-sm text-green-300/80 mt-1">
                We just sent a sign-in link to <span className="font-mono">{email}</span>.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full glass p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!email.trim() || status === 'sending'}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <Mail className="w-5 h-5" />
              <span>{status === 'sending' ? 'Sending…' : 'Send magic link'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
