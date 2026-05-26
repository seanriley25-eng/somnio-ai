import type { DreamSymbol, SymbolCategory } from './types';
import teethFallingOut from './data/teeth-falling-out';
import flying from './data/flying';
import water from './data/water';
import snakes from './data/snakes';
import beingChased from './data/being-chased';
// Phase 2b — 15 new symbols
import falling from './data/falling';
import death from './data/death';
import naked from './data/naked';
import spiders from './data/spiders';
import cheating from './data/cheating';
import pregnancy from './data/pregnancy';
import fire from './data/fire';
import babies from './data/babies';
import ex from './data/ex';
import house from './data/house';
import school from './data/school';
import money from './data/money';
import blood from './data/blood';
import crying from './data/crying';
import hospital from './data/hospital';
// Phase 2c — 20 new symbols
import car from './data/car';
import drowning from './data/drowning';
import dogs from './data/dogs';
import cats from './data/cats';
import bears from './data/bears';
import wolves from './data/wolves';
import horses from './data/horses';
import ocean from './data/ocean';
import snow from './data/snow';
import tornado from './data/tornado';
import storms from './data/storms';
import earthquake from './data/earthquake';
import flood from './data/flood';
import lightning from './data/lightning';
import ghost from './data/ghost';
import zombies from './data/zombies';
import killing from './data/killing';
import wedding from './data/wedding';
import funeral from './data/funeral';
import mirror from './data/mirror';

// ---------------------------------------------------------------------------
// Registry — add new symbols here as batches are added in Phase 2+
// ---------------------------------------------------------------------------
const ALL_SYMBOLS: DreamSymbol[] = [
  teethFallingOut,
  flying,
  water,
  snakes,
  beingChased,
  // Phase 2b
  falling,
  death,
  naked,
  spiders,
  cheating,
  pregnancy,
  fire,
  babies,
  ex,
  house,
  school,
  money,
  blood,
  crying,
  hospital,
  // Phase 2c
  car,
  drowning,
  dogs,
  cats,
  bears,
  wolves,
  horses,
  ocean,
  snow,
  tornado,
  storms,
  earthquake,
  flood,
  lightning,
  ghost,
  zombies,
  killing,
  wedding,
  funeral,
  mirror,
];

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/** Full list of all symbols, sorted alphabetically by name. */
export function getAllSymbols(): DreamSymbol[] {
  return [...ALL_SYMBOLS].sort((a, b) => a.name.localeCompare(b.name));
}

/** Look up a symbol by its URL slug. Returns null if not found. */
export function getSymbolBySlug(slug: string): DreamSymbol | null {
  return ALL_SYMBOLS.find((s) => s.slug === slug) ?? null;
}

/**
 * Return the related symbols for a given symbol.
 * Falls back gracefully if a related slug is not yet in the registry.
 */
export function getRelatedSymbols(symbol: DreamSymbol): DreamSymbol[] {
  return symbol.relatedSymbols
    .map((slug) => getSymbolBySlug(slug))
    .filter((s): s is DreamSymbol => s !== null);
}

/** Return all symbols belonging to a given category. */
export function getSymbolsByCategory(category: SymbolCategory | string): DreamSymbol[] {
  return ALL_SYMBOLS.filter((s) => s.category === category).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

/** Return all distinct categories that have at least one symbol registered. */
export function getSymbolCategories(): SymbolCategory[] {
  const seen = new Set<SymbolCategory>();
  for (const s of ALL_SYMBOLS) seen.add(s.category);
  return [...seen].sort();
}

/** All slugs — used in generateStaticParams for the [slug] dynamic route. */
export function getAllSlugs(): string[] {
  return ALL_SYMBOLS.map((s) => s.slug);
}

/** Human-readable category labels for display. */
export const CATEGORY_LABELS: Record<SymbolCategory, string> = {
  actions: 'Actions',
  animals: 'Animals',
  body: 'Body',
  emotions: 'Emotions',
  nature: 'Nature',
  objects: 'Objects',
  people: 'People',
  places: 'Places',
  supernatural: 'Supernatural',
};
