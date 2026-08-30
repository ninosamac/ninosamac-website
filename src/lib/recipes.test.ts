import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { formatMinutes, isoDuration, recipeJsonLd } from './recipes.ts';

describe('formatMinutes', () => {
  it('formatMinutes_should_return_dash_when_zero', () => {
    assert.equal(formatMinutes(0), '—');
  });

  it('formatMinutes_should_return_dash_when_negative_or_nan', () => {
    assert.equal(formatMinutes(-5), '—');
    assert.equal(formatMinutes(Number.NaN), '—');
  });

  it('formatMinutes_should_show_minutes_only_when_under_an_hour', () => {
    assert.equal(formatMinutes(20), '20 min');
    assert.equal(formatMinutes(59), '59 min');
  });

  it('formatMinutes_should_show_hours_only_when_on_the_hour', () => {
    assert.equal(formatMinutes(60), '1 hr');
    assert.equal(formatMinutes(120), '2 hr');
  });

  it('formatMinutes_should_show_hours_and_minutes_when_mixed', () => {
    assert.equal(formatMinutes(75), '1 hr 15 min');
    assert.equal(formatMinutes(150), '2 hr 30 min');
  });
});

describe('isoDuration', () => {
  it('isoDuration_should_return_PT0M_when_zero_or_invalid', () => {
    assert.equal(isoDuration(0), 'PT0M');
    assert.equal(isoDuration(-10), 'PT0M');
    assert.equal(isoDuration(Number.NaN), 'PT0M');
  });

  it('isoDuration_should_emit_minutes_only_when_under_an_hour', () => {
    assert.equal(isoDuration(20), 'PT20M');
  });

  it('isoDuration_should_emit_hours_only_when_on_the_hour', () => {
    assert.equal(isoDuration(60), 'PT1H');
  });

  it('isoDuration_should_emit_hours_and_minutes_when_mixed', () => {
    assert.equal(isoDuration(75), 'PT1H15M');
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
    assert.equal(ld['@context'], 'https://schema.org');
    assert.equal(ld['@type'], 'Recipe');
  });

  it('recipeJsonLd_should_map_durations_to_iso_8601', () => {
    assert.equal(ld.prepTime, 'PT25M');
    assert.equal(ld.cookTime, 'PT40M');
    assert.equal(ld.totalTime, 'PT1H5M');
  });

  it('recipeJsonLd_should_number_instructions_from_one', () => {
    assert.deepEqual(ld.recipeInstructions, [
      { '@type': 'HowToStep', position: 1, text: 'first' },
      { '@type': 'HowToStep', position: 2, text: 'second' },
    ]);
  });

  it('recipeJsonLd_should_carry_ingredients_yield_and_keywords', () => {
    assert.deepEqual(ld.recipeIngredient, ['a', 'b']);
    assert.equal(ld.recipeYield, '4 servings');
    assert.equal(ld.keywords, 'croatian, seafood');
  });

  it('recipeJsonLd_should_omit_image_when_not_provided', () => {
    assert.equal('image' in ld, false);
  });

  it('recipeJsonLd_should_include_image_array_when_provided', () => {
    const withImage = recipeJsonLd(entry, {
      url: 'https://example.com/recipes/test-recipe/',
      author: 'Nino Samac',
      image: 'https://example.com/hero.jpg',
    });
    assert.deepEqual(withImage.image, ['https://example.com/hero.jpg']);
  });

  it('recipeJsonLd_should_omit_keywords_when_no_tags', () => {
    const noTags = recipeJsonLd(
      { ...entry, data: { ...entry.data, tags: [] } } as typeof entry,
      { url: 'https://example.com/x/', author: 'Nino Samac' },
    );
    assert.equal('keywords' in noTags, false);
  });
});
