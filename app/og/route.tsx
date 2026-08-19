import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d0018 0%, #1a0035 50%, #0d0018 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle glow orb */}
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Moon icon placeholder */}
        <div
          style={{
            fontSize: '64px',
            marginBottom: '16px',
          }}
        >
          🌙
        </div>

        {/* H1: Somnio */}
        <div
          style={{
            fontSize: '96px',
            fontWeight: '900',
            background: 'linear-gradient(90deg, #a855f7, #ec4899, #a855f7)',
            backgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '-2px',
            marginBottom: '8px',
          }}
        >
          Somnio
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#d8b4fe',
            marginBottom: '24px',
            letterSpacing: '1px',
          }}
        >
          AI Dream Interpreter
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '22px',
            color: '#9ca3af',
            marginBottom: '48px',
            fontStyle: 'italic',
          }}
        >
          Unlock your subconscious. Every morning.
        </div>

        {/* Divider */}
        <div
          style={{
            width: '120px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)',
            marginBottom: '24px',
          }}
        />

        {/* Footer */}
        <div
          style={{
            fontSize: '16px',
            color: '#6b7280',
            letterSpacing: '1px',
          }}
        >
          Powered by Claude AI · daily-dreams.ai
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
