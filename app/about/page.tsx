import type { Metadata } from 'next';
import Link from 'next/link';
import { Moon, Brain, Sparkles, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About daily-dreams.ai — AI Dream Interpretation',
  description:
    'daily-dreams.ai is an AI-powered dream interpretation tool operated by Farallone Media LLC. Learn how we use Claude AI and FLUX image generation to explore your dreams.',
  openGraph: {
    title: 'About daily-dreams.ai — AI Dream Interpretation',
    description:
      'daily-dreams.ai is an AI-powered dream interpretation tool operated by Farallone Media LLC. Learn how we use Claude AI and FLUX image generation to explore your dreams.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Moon className="w-12 h-12 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            About Somnio
          </h1>
          <p className="text-xl text-gray-300">
            AI-powered dream interpretation rooted in depth psychology and cultural tradition.
          </p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          {/* What is Somnio */}
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0" />
              <h2 className="text-2xl font-semibold text-white">What Is Somnio?</h2>
            </div>
            <p className="mb-4">
              Somnio (Latin for <em>I dream</em>) is an AI-powered dream interpretation platform
              designed for curious minds who want to understand the stories their sleeping brain
              tells. Each night our minds weave together memories, emotions, fears, and desires
              into vivid narratives. Somnio gives you a structured, thoughtful space to record
              those narratives and explore what they might mean.
            </p>
            <p>
              Beyond simple keyword lookups, Somnio generates a full narrative interpretation of
              your dream, identifies recurring symbolic themes, and produces a unique AI-generated
              image that captures the dream's emotional atmosphere — giving you something visual to
              anchor your reflection.
            </p>
          </section>

          {/* Who it's for */}
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-6 h-6 text-purple-400 flex-shrink-0" />
              <h2 className="text-2xl font-semibold text-white">Who It&apos;s For</h2>
            </div>
            <p className="mb-4">
              Somnio is for anyone who has woken up from a vivid dream and wondered what it meant —
              the journaler who wants to deepen their self-reflection practice, the psychology
              enthusiast curious about symbolic imagery, the creative writer looking for subconscious
              material, or simply the person haunted by a recurring nightmare who wants a framework
              for understanding it.
            </p>
            <p>
              You don&apos;t need a background in psychology to use Somnio. The platform meets you
              where you are: describe your dream in plain language, and Somnio does the interpretive
              work — surfacing connections you might not have noticed on your own.
            </p>
          </section>

          {/* Philosophy */}
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold text-white mb-4">
              The Philosophy Behind Dream Interpretation
            </h2>
            <p className="mb-4">
              Dream interpretation is among the oldest intellectual traditions in human history.
              Somnio&apos;s approach draws on several established schools of thought:
            </p>
            <ul className="space-y-3 mb-4 pl-4">
              <li>
                <strong className="text-purple-300">Jungian (Analytical Psychology):</strong>{' '}
                Carl Jung proposed that dreams express the unconscious through universal archetypes —
                the Shadow, the Anima/Animus, the Self — and that recurring symbols hold personal
                meaning worth exploring. Somnio&apos;s symbolic analysis is heavily influenced by
                Jung&apos;s framework of individuation and the collective unconscious.
              </li>
              <li>
                <strong className="text-purple-300">Freudian (Psychoanalytic):</strong>{' '}
                Sigmund Freud&apos;s foundational work <em>The Interpretation of Dreams</em> (1899)
                established that dreams are a form of wish fulfillment and that manifest content
                (what we remember) conceals latent content (underlying desires and conflicts).
                Somnio considers emotional context and narrative tension through this lens.
              </li>
              <li>
                <strong className="text-purple-300">Cross-Cultural Traditions:</strong>{' '}
                Indigenous traditions, ancient Egyptian dream temples, Islamic <em>ru&apos;ya</em>{' '}
                interpretation, and East Asian oneiromancy all treat dreams as meaningful signals
                from a deeper layer of experience. Somnio draws on this breadth to avoid
                Eurocentric bias in symbolic readings.
              </li>
            </ul>
            <p>
              Somnio does not privilege one school over another. Instead, it synthesizes these
              frameworks to offer interpretations that are richer and more nuanced than any single
              tradition alone could provide.
            </p>
          </section>

          {/* How the AI works */}
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold text-white mb-4">How the AI Works</h2>
            <p className="mb-4">
              Somnio uses two AI systems working in concert:
            </p>
            <ul className="space-y-3 mb-4 pl-4">
              <li>
                <strong className="text-purple-300">Claude Haiku 4.5 (Anthropic):</strong>{' '}
                A large language model that reads your dream description, identifies key symbols and
                emotional themes, cross-references established dream interpretation frameworks, and
                generates a written interpretation. Claude has been instructed to remain grounded in
                recognised psychological and cultural traditions rather than inventing meanings.
              </li>
              <li>
                <strong className="text-purple-300">FLUX schnell (Replicate):</strong>{' '}
                A state-of-the-art image diffusion model that transforms the emotional and visual
                essence of your dream into a unique piece of digital art. This image is intended as
                a reflective artefact, not a literal depiction.
              </li>
            </ul>
            <p>
              Dream descriptions and their interpretations are stored in your personal journal so
              you can track recurring themes over time. Your data is held securely in Supabase and
              is never sold to third parties. See our{' '}
              <Link href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
                Privacy Policy
              </Link>{' '}
              for full details.
            </p>
          </section>

          {/* Who built it + disclaimer */}
          <section className="glass rounded-2xl p-8 border border-purple-500/20">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-purple-400 flex-shrink-0" />
              <h2 className="text-2xl font-semibold text-white">Built By & Important Disclaimer</h2>
            </div>
            <p className="mb-4">
              daily-dreams.ai is operated by <strong>Farallone Media LLC</strong>. Somnio is
              designed as a thoughtful tool for self-reflection and creative exploration{' '}
              using AI-powered dream interpretation{' '}
              rooted in depth psychology and cultural tradition. It is not a clinical service.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <p className="text-yellow-200 text-sm font-medium mb-1">Important</p>
              <p className="text-yellow-100/80 text-sm">
                Somnio is <strong>not a substitute for professional mental health care</strong>.
                Dream interpretation is a tool for self-reflection, not medical or psychological
                diagnosis. If you are experiencing distressing recurring nightmares, sleep disorders,
                or mental health concerns, please consult a licensed therapist or healthcare
                provider. If you are in crisis, please contact a crisis helpline in your country.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center pt-4">
            <p className="text-gray-400 mb-6">
              Questions, feedback, or press enquiries?{' '}
              <Link href="/contact" className="text-purple-400 hover:text-purple-300 underline">
                Get in touch
              </Link>
              .
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Interpret a Dream</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
