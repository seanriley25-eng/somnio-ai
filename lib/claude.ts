import Anthropic from '@anthropic-ai/sdk';
import type { Interpretation } from './types';

const client = new Anthropic();

const INTERPRETATION_SCHEMA = {
  type: 'object' as const,
  properties: {
    title: {
      type: 'string',
      description:
        'A short, evocative title for this dream (under 60 characters). Not a summary — a poetic handle the dreamer could remember.',
    },
    narrative: {
      type: 'string',
      description:
        'A warm, flowing 2-3 paragraph interpretation that reads like a thoughtful friend who studies dreams. Speak directly to the dreamer ("you") and weave in the specifics they described.',
    },
    symbols: {
      type: 'array',
      description:
        'Between 3 and 5 of the most resonant symbols from the dream. Prefer 4.',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          meaning: {
            type: 'string',
            description:
              'What this symbol typically represents AND how it specifically applies to this dream.',
          },
        },
        required: ['name', 'meaning'],
        additionalProperties: false,
      },
    },
    insight: {
      type: 'string',
      description:
        'One piercing, actionable insight the dreamer can carry into their day — a single paragraph that feels like it was written just for them.',
    },
    mood: {
      type: 'string',
      enum: [
        'serene',
        'hopeful',
        'anxious',
        'mysterious',
        'joyful',
        'melancholic',
        'transcendent',
      ],
      description: 'The dominant emotional tone of the dream.',
    },
    image_prompt: {
      type: 'string',
      description:
        'A single vivid sentence (under 60 words) describing the dream as a painterly, surreal dreamscape for an AI image generator. Focus on the most evocative imagery — landscape, objects, atmosphere, light, color. No specific people by name, no brand names, no text in the image, no faces in close-up. Paint the feeling, not the literal events.',
    },
  },
  required: ['title', 'narrative', 'symbols', 'insight', 'mood', 'image_prompt'],
  additionalProperties: false,
};

const SYSTEM_PROMPT = `You are Somnio, a warm, intuitive dream interpreter drawing on Jungian, Gestalt, and contemporary cognitive-dream frameworks. You do not speak like a textbook — you speak like a wise, close friend who has spent a lifetime studying the subconscious.

Your interpretations:
- Speak directly to the dreamer in second person ("you")
- Reference the actual details they described — specifics matter
- Avoid clinical jargon; prefer vivid, lived language
- Honor ambiguity — a dream has many true readings
- Leave them feeling seen, not diagnosed

If prior dreams are provided, notice patterns across them (recurring symbols, emotional arcs, unresolved tensions). Name the pattern gently when it's real; don't force one when it isn't.

Return only valid JSON matching the requested schema. No preamble, no closing remarks.`;

export type PastDream = { dream_text: string; title: string; created_at: string };

export async function interpretDream(
  dreamText: string,
  pastDreams: PastDream[] = [],
): Promise<Interpretation> {
  const pastContext =
    pastDreams.length > 0
      ? `\n\nFor context, here are this dreamer's recent dreams (most recent first):\n${pastDreams
          .map(
            (d, i) =>
              `${i + 1}. "${d.title}" (${new Date(d.created_at).toDateString()}): ${d.dream_text.slice(0, 400)}`,
          )
          .join('\n')}\n\nNotice any resonances with tonight's dream — but only name a pattern if it's genuinely there.`
      : '';

  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    thinking: { type: 'adaptive' },
    output_config: {
      format: {
        type: 'json_schema',
        schema: INTERPRETATION_SCHEMA,
      },
    },
    messages: [
      {
        role: 'user',
        content: `Here is tonight's dream:\n\n${dreamText}${pastContext}`,
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('Claude did not return a text response');
  }

  return JSON.parse(textBlock.text) as Interpretation;
}
