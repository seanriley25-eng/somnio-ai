import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import InterpretationView from '@/app/components/InterpretationView';
import AdBlock from '@/app/components/AdBlock';
import type { Dream } from '@/lib/types';

type Params = { share_id: string };

async function loadDream(share_id: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('dreams')
    .select('share_id, title, narrative, symbols, insight, mood, created_at')
    .eq('share_id', share_id)
    .maybeSingle();
  return data as
    | (Pick<Dream, 'share_id' | 'title' | 'narrative' | 'symbols' | 'insight' | 'mood' | 'created_at'>)
    | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { share_id } = await params;
  const dream = await loadDream(share_id);
  if (!dream) return { title: 'Dream not found | Somnio' };

  const ogPath = `/api/og/${share_id}`;
  return {
    title: `${dream.title} | Somnio`,
    description: dream.insight.slice(0, 160),
    openGraph: {
      title: dream.title,
      description: dream.insight.slice(0, 160),
      images: [ogPath],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: dream.title,
      description: dream.insight.slice(0, 160),
      images: [ogPath],
    },
  };
}

export default async function DreamPage({ params }: { params: Promise<Params> }) {
  const { share_id } = await params;
  const dream = await loadDream(share_id);
  if (!dream) notFound();

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-block text-sm text-purple-300/80 hover:text-purple-200"
        >
          ← Interpret another dream
        </Link>
        <InterpretationView dream={dream} />
        <AdBlock size="banner" className="mt-12" />
      </div>
    </div>
  );
}
