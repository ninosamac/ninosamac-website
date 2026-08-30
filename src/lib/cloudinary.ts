import { CLOUDINARY_CLOUD } from '../consts.ts';

const UPLOAD_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload`;

export interface CldOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'limit' | 'scale';
  gravity?: 'auto' | 'center';
  quality?: number | 'auto';
  /** Gaussian blur strength (Cloudinary `e_blur:N`, 1–2000). */
  blur?: number;
}

/** Build a Cloudinary delivery URL for a public ID with transformations. */
export function cldUrl(publicId: string, opts: CldOptions = {}): string {
  const t = ['f_auto', `q_${opts.quality ?? 'auto'}`];
  if (opts.width) t.push(`w_${opts.width}`);
  if (opts.height) t.push(`h_${opts.height}`);
  if (opts.crop) t.push(`c_${opts.crop}`);
  if (opts.gravity) t.push(`g_${opts.gravity}`);
  if (opts.blur) t.push(`e_blur:${opts.blur}`);
  return `${UPLOAD_BASE}/${t.join(',')}/${encodeURI(publicId)}`;
}

/** Widths (px) used to build responsive `srcset` strings. */
export const SRCSET_WIDTHS = [400, 600, 800, 1200, 1600, 2000] as const;

/** A `srcset` string across {@link SRCSET_WIDTHS} (or a custom width list). */
export function cldSrcset(
  publicId: string,
  opts: CldOptions = {},
  widths: readonly number[] = SRCSET_WIDTHS,
): string {
  return widths
    .map((w) => `${cldUrl(publicId, { ...opts, width: w })} ${w}w`)
    .join(', ');
}

/** Tiny, heavily-blurred URL for a blur-up placeholder behind a loading image. */
export function cldPlaceholder(publicId: string): string {
  return cldUrl(publicId, { width: 32, quality: 30, blur: 1200 });
}
