import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CLOUDINARY_CLOUD } from '../consts.ts';
import { cldUrl, cldSrcset, cldPlaceholder, SRCSET_WIDTHS } from './cloudinary.ts';

const BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload`;

describe('cldUrl', () => {
  it('cldUrl_should_apply_auto_format_and_quality_by_default', () => {
    assert.equal(cldUrl('trip/photo'), `${BASE}/f_auto,q_auto/trip/photo`);
  });

  it('cldUrl_should_append_width_crop_gravity_and_quality_transforms', () => {
    assert.equal(
      cldUrl('trip/photo', { width: 800, crop: 'fill', gravity: 'auto', quality: 70 }),
      `${BASE}/f_auto,q_70,w_800,c_fill,g_auto/trip/photo`,
    );
  });

  it('cldUrl_should_keep_slashes_but_encode_spaces_in_the_public_id', () => {
    assert.equal(cldUrl('trips/split 2026/pier'), `${BASE}/f_auto,q_auto/trips/split%202026/pier`);
  });

  it('cldUrl_should_add_blur_transform_when_requested', () => {
    assert.ok(cldUrl('x', { blur: 500 }).includes('e_blur:500'));
  });
});

describe('cldSrcset', () => {
  it('cldSrcset_should_emit_one_entry_per_default_width_with_w_descriptor', () => {
    const parts = cldSrcset('trip/photo').split(', ');
    assert.equal(parts.length, SRCSET_WIDTHS.length);
    assert.equal(parts[0], `${BASE}/f_auto,q_auto,w_400/trip/photo 400w`);
    assert.ok(parts.every((p, i) => p.endsWith(`${SRCSET_WIDTHS[i]}w`)));
  });

  it('cldSrcset_should_honour_a_custom_width_list_and_pass_through_options', () => {
    assert.equal(
      cldSrcset('p', { crop: 'fill' }, [100, 200]),
      `${BASE}/f_auto,q_auto,w_100,c_fill/p 100w, ${BASE}/f_auto,q_auto,w_200,c_fill/p 200w`,
    );
  });
});

describe('cldPlaceholder', () => {
  it('cldPlaceholder_should_request_a_tiny_blurred_low_quality_image', () => {
    const url = cldPlaceholder('trip/photo');
    assert.ok(url.includes('w_32'));
    assert.ok(url.includes('q_30'));
    assert.ok(url.includes('e_blur:'));
  });
});
