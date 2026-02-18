'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import AdBlock from '../../components/AdBlock';

export default function RecurringDreamsPost() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>

        {/* Top Ad */}
        <AdBlock size="banner" className="mb-8" />

        {/* Article Header */}
        <article className="glass-strong p-8 space-y-6 glow">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="px-3 py-1 glass rounded-full text-purple-300">
                Science
              </span>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>February 13, 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Science of Recurring Dreams
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Have you ever experienced the same dream multiple times? Recurring dreams are one of the most fascinating phenomena in sleep science, offering unique insights into our subconscious mind.
            </p>
          </div>

          <div className="border-t border-purple-500/30 pt-6 space-y-6 text-gray-300 leading-relaxed">
            <h2 className="text-2xl font-bold text-purple-300 mt-8">What Are Recurring Dreams?</h2>
            <p>
              Recurring dreams are dreams that repeat themselves with little variation in story or theme. These dreams can be pleasant, neutral, or nightmarish, and they often persist for weeks, months, or even years. Research suggests that between 60-75% of adults have experienced recurring dreams at some point in their lives.
            </p>

            <h2 className="text-2xl font-bold text-purple-300 mt-8">The Psychology Behind Repetition</h2>
            <p>
              According to dream researchers, recurring dreams often indicate unresolved conflicts or persistent life situations. Your subconscious mind may be attempting to work through emotional challenges, process traumatic experiences, or highlight areas of your life that need attention.
            </p>
            <p>
              Dr. Deirdre Barrett, a dream researcher at Harvard Medical School, suggests that recurring dreams function as a rehearsal mechanism. Your brain may be practicing responses to challenging situations or working through complex emotional scenarios in a safe, simulated environment.
            </p>

            <h2 className="text-2xl font-bold text-purple-300 mt-8">Common Themes in Recurring Dreams</h2>
            <p>
              Studies have identified several universal themes that frequently appear in recurring dreams:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Being chased or pursued</li>
              <li>Falling from great heights</li>
              <li>Appearing in public without clothing</li>
              <li>Teeth falling out</li>
              <li>Being unprepared for an examination</li>
              <li>Flying or floating</li>
              <li>Being trapped or unable to move</li>
            </ul>
            <p>
              While these themes are common, their specific meaning varies based on individual experiences and emotional context.
            </p>

            <h2 className="text-2xl font-bold text-purple-300 mt-8">The Neuroscience Perspective</h2>
            <p>
              From a neuroscience standpoint, recurring dreams may be related to how memories are consolidated during sleep. The hippocampus and amygdala—brain regions crucial for memory and emotion—show increased activity during REM sleep when most vivid dreams occur.
            </p>
            <p>
              When you experience recurring dreams, your brain may be strengthening neural pathways related to specific memories or emotional experiences. This repetition might serve an adaptive function, helping you prepare for real-world challenges or integrate important life lessons.
            </p>

            <h2 className="text-2xl font-bold text-purple-300 mt-8">Breaking the Cycle</h2>
            <p>
              If recurring dreams are causing distress, several techniques can help:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Dream journaling:</strong> Writing down your dreams can help identify patterns and triggers</li>
              <li><strong>Lucid dreaming practice:</strong> Learning to recognize when you're dreaming allows you to consciously alter dream narratives</li>
              <li><strong>Imagery rehearsal therapy:</strong> Mentally rehearsing alternative dream endings while awake</li>
              <li><strong>Addressing underlying stress:</strong> Working on real-life issues that may be manifesting in your dreams</li>
            </ul>

            <h2 className="text-2xl font-bold text-purple-300 mt-8">Embracing the Message</h2>
            <p>
              Rather than viewing recurring dreams as a nuisance, consider them a gift from your subconscious mind. These dreams are your brain's way of saying, "Pay attention—this matters." By exploring the emotions, symbols, and themes in your recurring dreams, you can gain valuable insights into your inner world and work toward resolution.
            </p>
            <p>
              The next time you experience a recurring dream, take a moment to reflect on what your subconscious might be trying to communicate. Your dreams are speaking—are you listening?
            </p>
          </div>

          {/* Share Button */}
          <div className="border-t border-purple-500/30 pt-6 flex justify-center">
            <button className="flex items-center space-x-2 px-6 py-3 glass hover:bg-purple-500/20 rounded-lg text-purple-300 font-medium transition-all">
              <Share2 className="w-5 h-5" />
              <span>Share this article</span>
            </button>
          </div>
        </article>

        {/* Bottom Ad */}
        <AdBlock size="banner" className="mt-8" />

        {/* Related Articles Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-purple-300 mb-6">Continue Reading</h3>
          <Link
            href="/blog"
            className="glass-strong p-6 block hover:bg-purple-500/20 transition-all text-center"
          >
            <p className="text-purple-400 hover:text-purple-300 font-medium">
              View all articles →
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
