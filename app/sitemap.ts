import { MetadataRoute } from 'next';
import { getAllSymbols } from '@/lib/symbols/index';

const BASE_URL = 'https://daily-dreams.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const symbols = getAllSymbols();

  // ---------------------------------------------------------------------------
  // Symbol dictionary pages — one entry per symbol, priority 0.8
  // lastModified comes from the symbol's own lastUpdated field.
  // ---------------------------------------------------------------------------
  const symbolPages: MetadataRoute.Sitemap = symbols.map((symbol) => ({
    url: `${BASE_URL}/dictionary/${symbol.slug}`,
    lastModified: new Date(symbol.lastUpdated),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    // ── Core pages ──────────────────────────────────────────────────────────
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/dictionary`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // ── Static info pages ──────────────────────────────────────────────────
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date('2025-05-22'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date('2025-05-22'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date('2025-05-22'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date('2025-05-22'),
      changeFrequency: 'monthly',
      priority: 0.4,
    },

    // ── Blog posts ──────────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/blog/science-of-recurring-dreams`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog/psychology-of-nightmares`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog/how-to-remember-dreams`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog/meaning-of-water-dreams`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog/dreaming-about-ex`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog/lucid-dreaming-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // ── Symbol dictionary pages (generated from registry) ──────────────────
    ...symbolPages,
  ];
}
