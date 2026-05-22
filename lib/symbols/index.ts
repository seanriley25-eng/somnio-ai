import type { DreamSymbol, SymbolCategory } from './types';
import teethFallingOut from './data/teeth-falling-out';
import flying from './data/flying';
import water from './data/water';
import snakes from './data/snakes';
import beingChased from './data/being-chased';

// ---------------------------------------------------------------------------
// Registry — add new symbols here as batches are added in Phase 2+
// ---------------------------------------------------------------------------
const ALL_SYMBOLS: DreamSymbol[] = [
  teethFallingOut,
  flying,
  water,
  snakes,
  beingChased,
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
