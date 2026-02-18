'use client';

import Link from 'next/link';
import { Moon, BookOpen, Sparkles, FileText } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <Moon className="w-8 h-8 text-purple-400 group-hover:text-purple-300" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Somnio
            </span>
            <span className="px-2 py-0.5 text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-400/30 rounded-full">
              Beta
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/')
                  ? 'bg-purple-500/20 text-purple-300'
                  : 'text-gray-300 hover:text-purple-300 hover:bg-purple-500/10'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Dream Tracker</span>
            </Link>
            <Link
              href="/dictionary"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/dictionary')
                  ? 'bg-purple-500/20 text-purple-300'
                  : 'text-gray-300 hover:text-purple-300 hover:bg-purple-500/10'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Dictionary</span>
            </Link>
            <Link
              href="/blog"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/blog')
                  ? 'bg-purple-500/20 text-purple-300'
                  : 'text-gray-300 hover:text-purple-300 hover:bg-purple-500/10'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Blog</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
