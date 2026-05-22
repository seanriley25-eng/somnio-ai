'use client';

interface AdBlockProps {
  size: 'banner' | 'sidebar' | 'rectangle';
  className?: string;
}

// These dimensions match standard IAB ad sizes so the page layout won't shift
// when real <ins class="adsbygoogle"> tags are swapped in after AdSense approval.
const sizeClasses = {
  banner: 'w-full h-28',
  sidebar: 'w-full h-72',
  rectangle: 'w-full h-56',
};

/**
 * Ad slot placeholder.
 *
 * Intentionally invisible — no borders, no labels, no placeholder text.
 * Keeps the layout dimensions stable so there's zero reflow when real ad
 * units replace this component after AdSense approval.
 *
 * DO NOT add visible text or decorative styling here; "Sponsored Content"
 * copy on an empty slot is a known AdSense review rejection signal.
 */
export default function AdBlock({ size, className = '' }: AdBlockProps) {
  return (
    <div
      className={`${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    />
  );
}
