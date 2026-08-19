import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import { getAllGlossarySlugs, getGlossarySymbolBySlug } from '@/lib/glossary';
import AdBlock from '@/app/components/AdBlock';

// ---------------------------------------------------------------------------
// Static generation — pre-render all 5 symbol pages at build time
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return getAllGlossarySlugs().map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Per-page SEO metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const symbol = getGlossarySymbolBySlug(slug);
  if (!symbol) return {};

  return {
    title: symbol.metaTitle,
    description: symbol.metaDescription,
    keywords: [
      `${symbol.title.toLowerCase()} dream`,
      `${symbol.title.toLowerCase()} dream meaning`,
      `${symbol.title.toLowerCase()} dream interpretation`,
      `what does dreaming about ${symbol.title.toLowerCase()} mean`,
      'dream symbolism',
      'dream interpretation guide',
      'dream dictionary',
    ],
    openGraph: {
      title: symbol.metaTitle,
      description: symbol.metaDescription,
      type: 'article',
      images: [{ url: '/og', width: 1200, height: 630, alt: symbol.metaTitle }],
    },
    alternates: {
      canonical: `/glossary/${slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default async function GlossarySymbolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const symbol = getGlossarySymbolBySlug(slug);

  if (!symbol) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back navigation */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="/glossary"
            className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dream Dictionary</span>
          </Link>
        </div>

        {/* Top Ad */}
        <AdBlock size="banner" className="mb-8" />

        {/* Article */}
        <article className="glass-strong p-8 space-y-8 glow">
          {/* Article header */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 glass rounded-full text-purple-300 text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Dream Symbol</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {symbol.title}
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              {symbol.teaser}
            </p>
          </div>

          {/* Introduction */}
          <div className="border-t border-purple-500/30 pt-6">
            {symbol.intro.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-gray-300 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Main sections */}
          <div className="space-y-8">
            {symbol.sections.map((section, i) => (
              <div key={i} className="space-y-4">
                <h2 className="text-2xl font-bold text-purple-300">
                  {section.heading}
                </h2>
                {section.body.split('\n\n').map((paragraph, j) => (
                  <p key={j} className="text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Reflection section */}
          <div className="border-t border-purple-500/30 pt-6 space-y-4">
            <h2 className="text-2xl font-bold text-purple-300">
              Questions to Reflect On
            </h2>
            <p className="text-gray-400 text-sm">
              Sit with these after you wake. The answers often arrive before you expect them.
            </p>
            <ul className="space-y-3">
              {symbol.reflections.map((reflection, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-gray-300 leading-relaxed">{reflection}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="border-t border-purple-500/30 pt-6 text-center space-y-4">
            <p className="text-gray-300">
              Want a personalized interpretation of your specific dream?
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg text-white font-medium transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Interpret My Dream with AI</span>
            </Link>
          </div>
        </article>

        {/* Bottom Ad */}
        <AdBlock size="banner" className="mt-8" />

        {/* Navigation footer */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/glossary"
            className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dream Dictionary</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Try the Dream Interpreter</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
