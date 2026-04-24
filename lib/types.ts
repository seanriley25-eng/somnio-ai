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
};

export type Dream = Interpretation & {
  id: string;
  share_id: string;
  dream_text: string;
  created_at: string;
};
