'use client';

import Link from 'next/link';
import { Moon, BookOpen, Sparkles, FileText, Notebook, LogOut, GraduationCap } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
      router.refresh();
    });

    return () => sub.subscription.unsubscribe();
  }, [router]);

  const isActive = (path: string) => pathname === path;

  const navLink = (href: string, label: string, Icon: React.ComponentType<{ className?: string }>) => (
    <Link
      href={href}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
        isActive(href)
          ? 'bg-purple-500/20 text-purple-300'
          : 'text-gray-300 hover:text-purple-300 hover:bg-purple-500/10'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <Moon className="w-8 h-8 text-purple-400 group-hover:text-purple-300" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Somnio
            </span>
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            {navLink('/', 'Dream', Sparkles)}
            {email && navLink('/dreams', 'Journal', Notebook)}
            {navLink('/dictionary', 'Dictionary', BookOpen)}
            {navLink('/glossary', 'Dream Dictionary', GraduationCap)}
            {navLink('/blog', 'Blog', FileText)}

            {email ? (
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-purple-300 hover:bg-purple-500/10 transition-all"
                  title={`Sign out ${email}`}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Sign out</span>
                </button>
              </form>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
