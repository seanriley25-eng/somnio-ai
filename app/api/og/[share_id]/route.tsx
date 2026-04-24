import { ImageResponse } from 'next/og';
import { createClient } from '@/lib/supabase/server';
import type { DreamMood } from '@/lib/types';

export const runtime = 'nodejs';

const moodTheme: Record<
  DreamMood,
  { from: string; to: string; accent: string; glow: string }
> = {
  serene: { from: '#0f172a', to: '#0ea5e9', accent: '#38bdf8', glow: 'rgba(56,189,248,0.35)' },
  hopeful: { from: '#4c1d95', to: '#ec4899', accent: '#f0abfc', glow: 'rgba(236,72,153,0.35)' },
  anxious: { from: '#0c0a09', to: '#7c2d12', accent: '#fb923c', glow: 'rgba(251,146,60,0.25)' },
  mysterious: { from: '#0a0a20', to: '#6d28d9', accent: '#c4b5fd', glow: 'rgba(167,139,250,0.35)' },
  joyful: { from: '#831843', to: '#f59e0b', accent: '#fde68a', glow: 'rgba(253,230,138,0.35)' },
  melancholic: { from: '#0f172a', to: '#475569', accent: '#94a3b8', glow: 'rgba(148,163,184,0.25)' },
  transcendent: { from: '#1e1b4b', to: '#f472b6', accent: '#fbcfe8', glow: 'rgba(244,114,182,0.4)' },
};

function firstSentence(text: string, maxLen = 220): string {
  const trimmed = text.trim().replace(/\s+/g, ' ');
  const match = trimmed.match(/^[^.!?]+[.!?]/);
  const snippet = match ? match[0] : trimmed;
  return snippet.length > maxLen ? snippet.slice(0, maxLen - 1).trimEnd() + '…' : snippet;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ share_id: string }> },
) {
  const { share_id } = await params;
  const supabase = await createClient();
  const { data: dream } = await supabase
    .from('dreams')
    .select('title, narrative, insight, mood, symbols, image_url')
    .eq('share_id', share_id)
    .maybeSingle();

  const title = dream?.title ?? 'A dream from Somnio';
  const narrative = dream?.narrative ?? '';
  const insight = dream?.insight ?? 'Unlock your subconscious. Every morning.';
  const mood = (dream?.mood as DreamMood) ?? 'mysterious';
  const symbols = (dream?.symbols as { name: string }[] | undefined) ?? [];
  const imageUrl = (dream?.image_url as string | null) ?? null;
  const theme = moodTheme[mood] ?? moodTheme.mysterious;
  const pullQuote = firstSentence(narrative || insight);

  const background = imageUrl
    ? {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        background: `radial-gradient(circle at 15% 10%, ${theme.glow} 0%, transparent 45%), radial-gradient(circle at 85% 90%, ${theme.glow} 0%, transparent 50%), linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 120%)`,
      };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
          color: '#f8fafc',
          fontFamily: 'Inter, system-ui, sans-serif',
          position: 'relative',
          ...background,
        }}
      >
        {/* Darkening gradient overlay so text is readable on any image */}
        {imageUrl && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(10,10,32,0.55) 0%, rgba(10,10,32,0.4) 40%, rgba(10,10,32,0.88) 100%)',
              display: 'flex',
            }}
          />
        )}

        {/* Header: brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            position: 'relative',
          }}
        >
          <div style={{ fontSize: 44 }}>🌙</div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 8,
              textTransform: 'uppercase',
            }}
          >
            Somnio
          </div>
        </div>

        {/* Center stack */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'flex-end',
            gap: 24,
            position: 'relative',
            paddingBottom: 8,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: theme.accent,
              textShadow: '0 1px 6px rgba(0,0,0,0.6)',
              display: 'block',
            }}
          >
            ◆ {mood} dream
          </div>

          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
              display: 'block',
              maxWidth: 1040,
              textShadow: '0 3px 20px rgba(0,0,0,0.7)',
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 18,
              maxWidth: 1000,
            }}
          >
            <div
              style={{
                width: 4,
                alignSelf: 'stretch',
                background: theme.accent,
                opacity: 0.85,
                borderRadius: 2,
              }}
            />
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.4,
                fontStyle: 'italic',
                display: 'block',
                fontWeight: 400,
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}
            >
              {pullQuote}
            </div>
          </div>
        </div>

        {/* Footer: symbols + URL */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
            borderTop: '1px solid rgba(255,255,255,0.25)',
            paddingTop: 26,
            position: 'relative',
          }}
        >
          {symbols.slice(0, 3).map((s) => (
            <div
              key={s.name}
              style={{
                padding: '10px 22px',
                borderRadius: 999,
                background: 'rgba(0,0,0,0.35)',
                border: '1px solid rgba(255,255,255,0.3)',
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              {s.name}
            </div>
          ))}
          <div
            style={{
              marginLeft: 'auto',
              fontSize: 22,
              opacity: 0.95,
              fontWeight: 600,
              letterSpacing: 1,
              textShadow: '0 1px 6px rgba(0,0,0,0.7)',
            }}
          >
            daily-dream.ai
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
