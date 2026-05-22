'use client';

import Link from 'next/link';
import { Moon, BookOpen, Sparkles, FileText, Info, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-purple-500/20 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <Moon className="w-8 h-8 text-purple-400 group-hover:text-purple-300" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Somnio
              </span>
            </Link>
            <p className="text-gray-400 text-sm text-center md:text-left">
              Unlock the secrets of your subconscious with AI-powered dream analysis.
            </p>
            <p className="text-gray-500 text-xs">
              &copy; {currentYear} Somnio. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-purple-300 font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-300 hover:text-purple-300 transition-colors group"
              >
                <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Home</span>
              </Link>
              <Link
                href="/dictionary"
                className="flex items-center space-x-2 text-gray-300 hover:text-purple-300 transition-colors group"
              >
                <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Dictionary</span>
              </Link>
              <Link
                href="/blog"
                className="flex items-center space-x-2 text-gray-300 hover:text-purple-300 transition-colors group"
              >
                <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Blog</span>
              </Link>
              <Link
                href="/about"
                className="flex items-center space-x-2 text-gray-300 hover:text-purple-300 transition-colors group"
              >
                <Info className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>About</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center space-x-2 text-gray-300 hover:text-purple-300 transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Contact</span>
              </Link>
            </nav>
          </div>

          {/* Submit AI Tools Badge */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <h3 className="text-purple-300 font-semibold text-sm uppercase tracking-wider">
              Featured On
            </h3>
            <a
              href="https://submitaitools.org"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            >
              <img
                src="https://submitaitools.org/static_submitaitools/images/submitaitools.png"
                alt="Submit AI Tools"
                style={{ borderRadius: '10px', width: '200px', height: '60px' }}
                className="border border-purple-500/20"
              />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-purple-500/10 space-y-3">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/about" className="text-gray-500 hover:text-purple-400 text-xs transition-colors">
              About
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-purple-400 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-purple-400 text-xs transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-purple-400 text-xs transition-colors">
              Contact
            </Link>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('somnio:open-cookie-prefs'))}
              className="text-gray-500 hover:text-purple-400 text-xs transition-colors cursor-pointer"
            >
              Cookie Preferences
            </button>
          </div>
          <p className="text-center text-gray-500 text-sm">
            Made with <span className="text-purple-400">✨</span> for dreamers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
