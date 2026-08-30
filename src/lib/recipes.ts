import type { CollectionEntry } from 'astro:content';

/**
 * Human-readable duration from a whole number of minutes.
 * 0 -> "—", 20 -> "20 min", 60 -> "1 hr", 75 -> "1 hr 15 min".
 */
export function formatMinutes(total: number): string {
  if (!Number.isFinite(total) || total <= 0) return '—';
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  const parts: string[] = [];
  if (hours) parts.push(`${hours} hr`);
  if (minutes) parts.push(`${minutes} min`);
  return parts.join(' ');
}

/**
 * ISO 8601 duration for schema.org (`prepTime`, `cookTime`, `totalTime`).
 * 0 -> "PT0M", 20 -> "PT20M", 75 -> "PT1H15M".
 */
export function isoDuration(total: number): string {
  if (!Number.isFinite(total) || total <= 0) return 'PT0M';
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return `PT${hours ? `${hours}H` : ''}${minutes ? `${minutes}M` : ''}`;
}

interface JsonLdContext {
  url: string;
  image?: string;
  author: string;
}

/** Build a schema.org/Recipe JSON-LD object for a recipe entry. */
export function recipeJsonLd(
  entry: CollectionEntry<'recipes'>,
  { url, image, author }: JsonLdContext,
) {
  const { data } = entry;
  const totalMinutes = data.prepMinutes + data.cookMinutes;

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: data.title,
    description: data.description,
    url,
    datePublished: data.date.toISOString().slice(0, 10),
    author: { '@type': 'Person', name: author },
    ...(image ? { image: [image] } : {}),
    recipeYield: `${data.servings} servings`,
    prepTime: isoDuration(data.prepMinutes),
    cookTime: isoDuration(data.cookMinutes),
    totalTime: isoDuration(totalMinutes),
    recipeIngredient: data.ingredients,
    recipeInstructions: data.steps.map((text, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text,
    })),
    ...(data.tags.length ? { keywords: data.tags.join(', ') } : {}),
  };
}
