export type DreamSymbol = { name: string; meaning: string };

export type DreamMood =
  | 'serene'
  | 'hopeful'
  | 'anxious'
  | 'mysterious'
  | 'joyful'
  | 'melancholic'
  | 'transcendent';

export type Interpretation = {
  title: string;
  narrative: string;
  symbols: DreamSymbol[];
  insight: string;
  mood: DreamMood;
  image_prompt: string;
};

export type Dream = Omit<Interpretation, 'image_prompt'> & {
  id: string;
  share_id: string;
  dream_text: string;
  image_url: string | null;
  created_at: string;
};
