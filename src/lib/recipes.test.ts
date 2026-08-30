import { describe, it, expect } from 'vitest';
import { formatMinutes, isoDuration, recipeJsonLd } from './recipes';

describe('formatMinutes', () => {
  it('formatMinutes_should_return_dash_when_zero', () => {
    expect(formatMinutes(0)).toBe('—');
  });

  it('formatMinutes_should_return_dash_when_negative_or_nan', () => {
    expect(formatMinutes(-5)).toBe('—');
    expect(formatMinutes(Number.NaN)).toBe('—');
  });

  it('formatMinutes_should_show_minutes_only_when_under_an_hour', () => {
    expect(formatMinutes(20)).toBe('20 min');
    expect(formatMinutes(59)).toBe('59 min');
  });

  it('formatMinutes_should_show_hours_only_when_on_the_hour', () => {
    expect(formatMinutes(60)).toBe('1 hr');
    expect(formatMinutes(120)).toBe('2 hr');
  });

  it('formatMinutes_should_show_hours_and_minutes_when_mixed', () => {
    expect(formatMinutes(75)).toBe('1 hr 15 min');
    expect(formatMinutes(150)).toBe('2 hr 30 min');
  });
});

describe('isoDuration', () => {
  it('isoDuration_should_return_PT0M_when_zero_or_invalid', () => {
    expect(isoDuration(0)).toBe('PT0M');
    expect(isoDuration(-10)).toBe('PT0M');
    expect(isoDuration(Number.NaN)).toBe('PT0M');
  });

  it('isoDuration_should_emit_minutes_only_when_under_an_hour', () => {
    expect(isoDuration(20)).toBe('PT20M');
  });

  it('isoDuration_should_emit_hours_only_when_on_the_hour', () => {
    expect(isoDuration(60)).toBe('PT1H');
  });

  it('isoDuration_should_emit_hours_and_minutes_when_mixed', () => {
    expect(isoDuration(75)).toBe('PT1H15M');
  });
});

describe('recipeJsonLd', () => {
  const entry = {
    id: 'test-recipe',
    collection: 'recipes',
    data: {
      title: 'Test Recipe',
      date: new Date('2026-08-30T00:00:00Z'),
      description: 'A test.',
      servings: 4,
      prepMinutes: 25,
      cookMinutes: 40,
      ingredients: ['a', 'b'],
      steps: ['first', 'second'],
      tags: ['croatian', 'seafood'],
      draft: false,
    },
  } as unknown as Parameters<typeof recipeJsonLd>[0];

  const ld = recipeJsonLd(entry, {
    url: 'https://example.com/recipes/test-recipe/',
    author: 'Nino Samac',
  });

  it('recipeJsonLd_should_set_schema_type_and_context', () => {
    expect(ld['@context']).toBe('https://schema.org');
    expect(ld['@type']).toBe('Recipe');
  });

  it('recipeJsonLd_should_map_durations_to_iso_8601', () => {
    expect(ld.prepTime).toBe('PT25M');
    expect(ld.cookTime).toBe('PT40M');
    expect(ld.totalTime).toBe('PT1H5M');
  });

  it('recipeJsonLd_should_number_instructions_from_one', () => {
    expect(ld.recipeInstructions).toEqual([
      { '@type': 'HowToStep', position: 1, text: 'first' },
      { '@type': 'HowToStep', position: 2, text: 'second' },
    ]);
  });

  it('recipeJsonLd_should_carry_ingredients_yield_and_keywords', () => {
    expect(ld.recipeIngredient).toEqual(['a', 'b']);
    expect(ld.recipeYield).toBe('4 servings');
    expect(ld.keywords).toBe('croatian, seafood');
  });

  it('recipeJsonLd_should_omit_image_when_not_provided', () => {
    expect('image' in ld).toBe(false);
  });

  it('recipeJsonLd_should_include_image_array_when_provided', () => {
    const withImage = recipeJsonLd(entry, {
      url: 'https://example.com/recipes/test-recipe/',
      author: 'Nino Samac',
      image: 'https://example.com/hero.jpg',
    });
    expect(withImage.image).toEqual(['https://example.com/hero.jpg']);
  });

  it('recipeJsonLd_should_omit_keywords_when_no_tags', () => {
    const noTags = recipeJsonLd(
      { ...entry, data: { ...entry.data, tags: [] } } as typeof entry,
      { url: 'https://example.com/x/', author: 'Nino Samac' },
    );
    expect('keywords' in noTags).toBe(false);
  });
});
