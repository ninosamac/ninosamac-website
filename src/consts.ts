export const SITE_TITLE = 'Nino Samac';

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
