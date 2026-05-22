export type SymbolCategory =
  | 'body'
  | 'nature'
  | 'objects'
  | 'people'
  | 'actions'
  | 'animals'
  | 'emotions'
  | 'places'
  | 'supernatural';

export interface DreamSymbol {
  /** URL-safe identifier, e.g. "teeth-falling-out" */
  slug: string;

  /** Human-readable display name, e.g. "Teeth Falling Out" */
  name: string;

  /** Alternate phrasings users commonly search, e.g. ["losing teeth", "broken teeth"] */
  aliases: string[];

  category: SymbolCategory;

  /** One-sentence summary for cards and meta descriptions (<120 chars) */
  quickMeaning: string;

  /** 200–300 word introductory paragraph rendered at the top of the symbol page */
  introduction: string;

  /** 5–7 scenario-specific interpretations */
  commonMeanings: {
    context: string;
    interpretation: string;
  }[];

  /** 200–300 words on the Jungian analytical-psychology perspective */
  jungian: string;

  /** 200–300 words on the Freudian psychoanalytic perspective */
  freudian: string;

  /** 3–5 cultural readings from distinct traditions */
  cultural: {
    tradition: string;
    meaning: string;
  }[];

  /** Slugs of 4–6 thematically related symbols for cross-linking */
  relatedSymbols: string[];

  /** 3–5 FAQs surfaced by common search queries */
  faq: {
    q: string;
    a: string;
  }[];

  /** Estimated monthly search volume string, e.g. "27K/mo" */
  searchVolumeEstimate: string;

  /** ISO 8601 date string, e.g. "2025-05-22" */
  lastUpdated: string;
}
