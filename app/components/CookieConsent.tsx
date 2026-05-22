'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Cookie, ChevronDown, ChevronUp } from 'lucide-react';

type ConsentChoice = 'accepted' | 'rejected' | 'custom';

interface ConsentPrefs {
  analytics: boolean;
  advertising: boolean;
}

const STORAGE_KEY = 'somnio_cookie_consent';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

function applyConsent(prefs: ConsentPrefs) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: prefs.advertising ? 'granted' : 'denied',
      ad_user_data: prefs.advertising ? 'granted' : 'denied',
      ad_personalization: prefs.advertising ? 'granted' : 'denied',
      analytics_storage: prefs.analytics ? 'granted' : 'denied',
    });
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [customPrefs, setCustomPrefs] = useState<ConsentPrefs>({
    analytics: true,
    advertising: true,
  });

  useEffect(() => {
    // Show banner on first visit; re-apply stored consent on return visits.
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      }
      const parsed = JSON.parse(stored) as { prefs: ConsentPrefs };
      applyConsent(parsed.prefs);
    } catch {
      setVisible(true);
    }
  }, []);

  // Allow the footer "Cookie Preferences" button to reopen the panel.
  useEffect(() => {
    const handler = () => {
      setShowCustomize(false);
      setVisible(true);
    };
    window.addEventListener('somnio:open-cookie-prefs', handler);
    return () => window.removeEventListener('somnio:open-cookie-prefs', handler);
  }, []);

  function save(prefs: ConsentPrefs, choice: ConsentChoice) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, prefs, savedAt: Date.now() }));
    } catch {
      // localStorage blocked — silently continue
    }
    applyConsent(prefs);
    setVisible(false);
  }

  function acceptAll() {
    save({ analytics: true, advertising: true }, 'accepted');
  }

  function rejectAll() {
    save({ analytics: false, advertising: false }, 'rejected');
  }

  function saveCustom() {
    save(customPrefs, 'custom');
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6"
    >
      <div className="max-w-3xl mx-auto glass-strong border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-900/40 p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Cookie className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <h2 className="text-white font-semibold text-base">Cookie Preferences</h2>
          </div>
          <button
            onClick={rejectAll}
            aria-label="Reject all and close"
            className="text-gray-400 hover:text-gray-200 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          We use essential cookies to keep you signed in, and optional cookies for analytics and
          personalised ads (Google AdSense). See our{' '}
          <Link href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
            Privacy Policy
          </Link>{' '}
          for details. You can change your preference at any time.
        </p>

        {/* Customize panel */}
        {showCustomize && (
          <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-4 mb-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Essential cookies</p>
                <p className="text-gray-400 text-xs">Authentication session. Always active.</p>
              </div>
              <span className="text-green-400 text-xs font-semibold">Always on</span>
            </div>
            <div className="border-t border-purple-500/10" />
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-white text-sm font-medium">Analytics cookies</p>
                <p className="text-gray-400 text-xs">Help us understand how the site is used.</p>
              </div>
              <button
                role="switch"
                aria-checked={customPrefs.analytics}
                onClick={() =>
                  setCustomPrefs((p) => ({ ...p, analytics: !p.analytics }))
                }
                className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${
                  customPrefs.analytics ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                    customPrefs.analytics ? 'left-5' : 'left-1'
                  }`}
                />
              </button>
            </label>
            <div className="border-t border-purple-500/10" />
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-white text-sm font-medium">Advertising cookies</p>
                <p className="text-gray-400 text-xs">
                  Personalised ads via Google AdSense. Helps keep Somnio free.
                </p>
              </div>
              <button
                role="switch"
                aria-checked={customPrefs.advertising}
                onClick={() =>
                  setCustomPrefs((p) => ({ ...p, advertising: !p.advertising }))
                }
                className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${
                  customPrefs.advertising ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                    customPrefs.advertising ? 'left-5' : 'left-1'
                  }`}
                />
              </button>
            </label>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={acceptAll}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-medium transition-all"
          >
            Accept all
          </button>
          <button
            onClick={rejectAll}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-purple-500/40 text-gray-300 hover:text-white hover:border-purple-400 text-sm font-medium transition-all"
          >
            Reject non-essential
          </button>
          <button
            onClick={() => setShowCustomize((v) => !v)}
            className="flex items-center space-x-1 px-4 py-2.5 rounded-xl text-gray-400 hover:text-purple-300 text-sm transition-all"
          >
            <span>Customize</span>
            {showCustomize ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {showCustomize && (
            <button
              onClick={saveCustom}
              className="px-5 py-2.5 rounded-xl bg-purple-700/60 hover:bg-purple-700 text-white text-sm font-medium transition-all"
            >
              Save preferences
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
