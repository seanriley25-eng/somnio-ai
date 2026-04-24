import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { interpretDream, type PastDream } from '@/lib/claude';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'sign_in_required' }, { status: 401 });
  }

  const { dream_text } = (await request.json()) as { dream_text?: string };
  const trimmed = dream_text?.trim();
  if (!trimmed) {
    return NextResponse.json({ error: 'dream_text is required' }, { status: 400 });
  }
  if (trimmed.length > 5000) {
    return NextResponse.json({ error: 'dream_text too long' }, { status: 400 });
  }

  const { data: past } = await supabase
    .from('dreams')
    .select('dream_text, title, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const interpretation = await interpretDream(trimmed, (past as PastDream[]) ?? []);

  const { data: inserted, error: insertError } = await supabase
    .from('dreams')
    .insert({
      user_id: user.id,
      dream_text: trimmed,
      title: interpretation.title,
      narrative: interpretation.narrative,
      symbols: interpretation.symbols,
      insight: interpretation.insight,
      mood: interpretation.mood,
    })
    .select('share_id')
    .single();

  if (insertError || !inserted) {
    return NextResponse.json(
      { error: insertError?.message ?? 'insert_failed' },
      { status: 500 },
    );
  }

  return NextResponse.json({ share_id: inserted.share_id });
}
