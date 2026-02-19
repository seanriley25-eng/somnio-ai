'use client';

import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import AdBlock from '../components/AdBlock';

const blogPosts = [
  {
    id: 'lucid-dreaming-guide',
    title: 'A Beginner\'s Guide to Lucid Dreaming',
    excerpt: 'Learn how to become conscious in your dreams with three simple reality checks including finger through palm, reading text twice, and the nose pinch test.',
    date: '2024-02-18',
    readTime: '7 min read',
    category: 'Guides',
  },
  {
    id: 'dreaming-about-ex',
    title: 'Why Do We Dream About Our Exes?',
    excerpt: 'Uncover the psychological reasons behind these common dreams—from seeking closure and processing unresolved feelings to simply working through past versions of yourself.',
    date: '2024-02-17',
    readTime: '6 min read',
    category: 'Relationships',
  },
  {
    id: 'meaning-of-water-dreams',
    title: 'The Symbolic Meaning of Water in Dreams',
    excerpt: 'Explore how water represents emotions, the subconscious mind, and spiritual cleansing. Understand the difference between calm and turbulent water in your dreams.',
    date: '2024-02-16',
    readTime: '5 min read',
    category: 'Symbolism',
  },
  {
    id: 'how-to-remember-dreams',
    title: '5 Techniques to Remember Your Dreams',
    excerpt: 'Unlock your dream recall with actionable tips including dream journaling, consistent sleep schedules, and the powerful MILD technique.',
    date: '2024-02-15',
    readTime: '4 min read',
    category: 'Guides',
  },
  {
    id: 'psychology-of-nightmares',
    title: 'The Psychology of Nightmares',
    excerpt: 'Explore how nightmares are your brain\'s sophisticated way of processing fear and stress, and learn how to interpret their hidden meanings.',
    date: '2024-02-14',
    readTime: '6 min read',
    category: 'Psychology',
  },
  {
    id: 'science-of-recurring-dreams',
    title: 'The Science of Recurring Dreams',
    excerpt: 'Discover why certain dreams keep coming back and what your subconscious is trying to tell you through repetitive dreamscapes.',
    date: '2024-02-13',
    readTime: '5 min read',
    category: 'Science',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Dream Insights Blog
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore the fascinating world of dreams, sleep science, and the hidden messages from your subconscious.
          </p>
        </div>

        {/* Top Ad */}
        <AdBlock size="banner" className="mb-8" />

        {/* Blog Posts Grid */}
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block glass-strong p-6 hover:bg-purple-500/20 transition-all glow group"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="px-3 py-1 glass rounded-full text-purple-300">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-purple-300 group-hover:text-purple-200 transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-300 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center space-x-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                  <span className="font-medium">Read more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Ad */}
        <AdBlock size="banner" className="mt-8" />
      </div>
    </div>
  );
}
