import type { DreamMood } from './types';
import { createAdminClient } from './supabase/admin';

const STYLE_TAIL =
  'surreal dreamscape, painterly, soft ethereal lighting, impressionistic brushwork, rich atmospheric color, cinematic composition, no text, no watermarks';

const moodTail: Record<DreamMood, string> = {
  serene: 'cool blue palette, gentle light, calm stillness',
  hopeful: 'warm rose and violet palette, glowing dawn light',
  anxious: 'muted amber and deep umber, low fog, charged atmosphere',
  mysterious: 'deep indigo and violet, starlit shadows, soft haze',
  joyful: 'luminous gold and magenta, radiant bloom of light',
  melancholic: 'slate and muted silver, soft rain, distant light',
  transcendent: 'luminous violet and pink, radiant celestial glow',
};

// Generates an image via Replicate's FLUX schnell model, then uploads it to
// Supabase Storage under dreams/{share_id}.webp and returns the public URL.
// Returns null on any failure — interpretation should still ship without image.
export async function generateAndStoreDreamImage(
  imagePrompt: string,
  mood: DreamMood,
  shareId: string,
): Promise<string | null> {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    console.warn('[image] REPLICATE_API_TOKEN not set, skipping image generation');
    return null;
  }

  const prompt = `${imagePrompt.trim()} — ${moodTail[mood] ?? ''}, ${STYLE_TAIL}`;

  try {
    const res = await fetch(
      'https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Prefer: 'wait=30',
        },
        body: JSON.stringify({
          input: {
            prompt,
            aspect_ratio: '16:9',
            output_format: 'webp',
            output_quality: 85,
            num_outputs: 1,
            go_fast: true,
          },
        }),
      },
    );

    if (!res.ok) {
      console.error('[image] replicate request failed', res.status, await res.text());
      return null;
    }

    const prediction = (await res.json()) as {
      status: string;
      output?: string[] | string;
      error?: string | null;
    };

    if (prediction.status !== 'succeeded' || !prediction.output) {
      console.error('[image] replicate prediction not succeeded', prediction.status, prediction.error);
      return null;
    }

    const imageUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
    if (!imageUrl) return null;

    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) {
      console.error('[image] could not download generated image', imgRes.status);
      return null;
    }
    const buffer = Buffer.from(await imgRes.arrayBuffer());

    const admin = createAdminClient();
    const storagePath = `${shareId}.webp`;
    const { error: uploadError } = await admin.storage
      .from('dreams')
      .upload(storagePath, buffer, {
        contentType: 'image/webp',
        cacheControl: '31536000, immutable',
        upsert: true,
      });

    if (uploadError) {
      console.error('[image] storage upload failed', uploadError);
      return null;
    }

    const { data } = admin.storage.from('dreams').getPublicUrl(storagePath);
    return data.publicUrl;
  } catch (err) {
    console.error('[image] unexpected error', err);
    return null;
  }
}
