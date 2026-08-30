export const SITE_TITLE = 'Nino Samac';

// Cloudinary account that hosts the travel galleries. Images are referenced by
// public ID and transformed via delivery URLs (see src/lib/cloudinary.ts).
// The cloud name is public (it appears in every delivery URL); the API
// key/secret are not used by the static build and must not live in the repo.
export const CLOUDINARY_CLOUD = 'kantyokv';

export const SITE_DESCRIPTION =
  'Senior software developer in Zagreb — mobile banking and telecommunications, ' +
  'now focused on AI-powered development. CV, blog, travel photography, and recipes.';

export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/cv', label: 'CV' },
  { href: '/blog', label: 'Blog' },
  { href: '/recipes', label: 'Recipes' },
  { href: '/travel', label: 'Travel' },
];

export const SOCIAL_LINKS: NavItem[] = [
  { href: 'https://github.com/ninosamac', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/ninosamac', label: 'LinkedIn' },
  { href: 'https://www.vinoigitare.com', label: 'vinoigitare' },
];
