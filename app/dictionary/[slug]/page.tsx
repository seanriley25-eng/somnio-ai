import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, Sparkles, ChevronRight } from 'lucide-react';
import {
  getAllSlugs,
  getSymbolBySlug,
  getRelatedSymbols,
} from '@/lib/symbols/index';
import { CATEGORY_LABELS } from '@/lib/symbols/index';
import AdBlock from '@/app/components/AdBlock';

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Per-page metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const symbol = getSymbolBySlug(slug);
  if (!symbol) return {};

  const title = `Dreaming About ${symbol.name} — Meanings & Symbolism | Somnio`;
  const description =
    `${symbol.quickMeaning} ` +
    `This guide covers Jungian and Freudian interpretations, ` +
    `${symbol.commonMeanings.length} common dream scenarios, cultural perspectives, ` +
    `and frequently asked questions about the ${symbol.name.toLowerCase()} dream symbol.`;

  const keywords = [
    symbol.name.toLowerCase(),
    `${symbol.name.toLowerCase()} dream`,
    `${symbol.name.toLowerCase()} dream meaning`,
    `${symbol.name.toLowerCase()} dream interpretation`,
    `dreaming about ${symbol.name.toLowerCase()}`,
    `what does dreaming about ${symbol.name.toLowerCase()} mean`,
    'dream meaning',
    'dream interpretation',
    'dream symbolism',
    ...symbol.aliases,
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: `https://daily-dream.ai/dictionary/${symbol.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-block text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 font-medium">
      {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-white mb-4 border-b border-purple-500/20 pb-3">
      {children}
    </h2>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function SymbolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const symbol = getSymbolBySlug(slug);
  if (!symbol) notFound();

  const related = getRelatedSymbols(symbol);

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <Link href="/dictionary" className="hover:text-purple-400 transition-colors">
            Dream Dictionary
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href={`/dictionary?category=${symbol.category}`}
            className="hover:text-purple-400 transition-colors"
          >
            {CATEGORY_LABELS[symbol.category]}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-300">{symbol.name}</span>
        </nav>

        {/* ── Hero ── */}
        <header className="glass rounded-2xl p-8 border border-purple-500/20 mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-purple-400 flex-shrink-0" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {symbol.name}
              </h1>
            </div>
            <CategoryBadge category={symbol.category} />
          </div>
          <p className="text-xl text-gray-200 leading-relaxed mb-4">
            {symbol.quickMeaning}
          </p>
          {symbol.aliases.length > 0 && (
            <p className="text-sm text-gray-500">
              Also searched as:{' '}
              <span className="text-gray-400">
                {symbol.aliases.slice(0, 3).join(', ')}
              </span>
            </p>
          )}
        </header>

        {/* ── Top ad ── */}
        <AdBlock size="banner" className="mb-10" />

        {/* ── Introduction ── */}
        <section className="glass rounded-2xl p-8 border border-purple-500/20 mb-8">
          <SectionHeading>What It Means to Dream About {symbol.name}</SectionHeading>
          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {symbol.introduction}
          </div>
        </section>

        {/* ── Common Meanings ── */}
        <section className="glass rounded-2xl p-8 border border-purple-500/20 mb-8">
          <SectionHeading>Common Dream Scenarios &amp; Interpretations</SectionHeading>
          <div className="space-y-6">
            {symbol.commonMeanings.map((item, i) => (
              <div key={i} className="border-l-2 border-purple-500/40 pl-5">
                <p className="text-purple-300 font-semibold mb-1 italic">
                  {item.context}
                </p>
                <p className="text-gray-300 leading-relaxed">{item.interpretation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mid-page ad ── */}
        <AdBlock size="rectangle" className="mb-8 mx-auto" />

        {/* ── Jungian ── */}
        <section className="glass rounded-2xl p-8 border border-purple-500/20 mb-8">
          <SectionHeading>Jungian Perspective</SectionHeading>
          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {symbol.jungian}
          </div>
        </section>

        {/* ── Freudian ── */}
        <section className="glass rounded-2xl p-8 border border-purple-500/20 mb-8">
          <SectionHeading>Freudian Perspective</SectionHeading>
          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {symbol.freudian}
          </div>
        </section>

        {/* ── Cultural ── */}
        <section className="glass rounded-2xl p-8 border border-purple-500/20 mb-8">
          <SectionHeading>Cultural Perspectives</SectionHeading>
          <div className="space-y-6">
            {symbol.cultural.map((item, i) => (
              <div key={i}>
                <h3 className="text-purple-300 font-semibold mb-2">{item.tradition}</h3>
                <p className="text-gray-300 leading-relaxed">{item.meaning}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="glass rounded-2xl p-8 border border-purple-500/20 mb-8">
          <SectionHeading>Frequently Asked Questions</SectionHeading>
          <div className="space-y-6">
            {symbol.faq.map((item, i) => (
              <div key={i}>
                <h3 className="text-white font-semibold mb-2">{item.q}</h3>
                <p className="text-gray-300 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Schema.org FAQ markup ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: symbol.faq.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            }),
          }}
        />

        {/* ── CTA ── */}
        <div className="glass rounded-2xl p-8 border border-purple-400/30 mb-8 text-center">
          <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Had a dream involving {symbol.name}?
          </h2>
          <p className="text-gray-300 mb-6">
            General symbol meanings are just the beginning. Somnio uses Claude AI to interpret
            your specific dream — taking into account the unique details, emotions, and context
            that make your dream yours.
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Get a personalised interpretation →</span>
          </Link>
        </div>

        {/* ── Related symbols ── */}
        {related.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Related Dream Symbols</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/dictionary/${rel.slug}`}
                  className="glass rounded-xl p-5 border border-purple-500/20 hover:border-purple-400/50 hover:bg-purple-500/10 transition-all group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-purple-300 font-semibold group-hover:text-purple-200 transition-colors">
                      {rel.name}
                    </h3>
                    <CategoryBadge category={rel.category} />
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">{rel.quickMeaning}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Back to dictionary ── */}
        <div className="text-center">
          <Link
            href="/dictionary"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-purple-300 transition-colors text-sm"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span>Back to Dream Dictionary</span>
          </Link>
        </div>

        {/* ── Bottom ad ── */}
        <AdBlock size="banner" className="mt-10" />
      </div>
    </main>
  );
}
