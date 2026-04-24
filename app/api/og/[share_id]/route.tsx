import { ImageResponse } from 'next/og';
import { createClient } from '@/lib/supabase/server';
import type { DreamMood } from '@/lib/types';

export const runtime = 'nodejs';

const moodGradient: Record<DreamMood, [string, string]> = {
  serene: ['#1e3a8a', '#0ea5e9'],
  hopeful: ['#4c1d95', '#ec4899'],
  anxious: ['#1f2937', '#7c2d12'],
  mysterious: ['#0c0a1f', '#6d28d9'],
  joyful: ['#be185d', '#f59e0b'],
  melancholic: ['#1e293b', '#475569'],
  transcendent: ['#4c1d95', '#f472b6'],
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ share_id: string }> },
) {
  const { share_id } = await params;
  const supabase = await createClient();
  const { data: dream } = await supabase
    .from('dreams')
    .select('title, insight, mood, symbols')
    .eq('share_id', share_id)
    .maybeSingle();

  const title = dream?.title ?? 'A dream from Somnio';
  const insight = dream?.insight ?? 'Unlock your subconscious. Every morning.';
  const mood = (dream?.mood as DreamMood) ?? 'mysterious';
  const symbols = (dream?.symbols as { name: string }[] | undefined) ?? [];
  const [from, to] = moodGradient[mood] ?? moodGradient.mysterious;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
          color: '#f5f3ff',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
            }}
          >
            🌙
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>Somnio</div>
          <div
            style={{
              marginLeft: 'auto',
              fontSize: 18,
              textTransform: 'uppercase',
              letterSpacing: 3,
              opacity: 0.7,
            }}
          >
            {mood} dream
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              display: 'block',
              maxWidth: 1080,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              opacity: 0.9,
              display: 'block',
              maxWidth: 1000,
            }}
          >
            {insight.length > 180 ? insight.slice(0, 177) + '…' : insight}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {symbols.slice(0, 4).map((s) => (
            <div
              key={s.name}
              style={{
                padding: '8px 18px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.15)',
                fontSize: 20,
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
              opacity: 0.85,
              fontWeight: 500,
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
