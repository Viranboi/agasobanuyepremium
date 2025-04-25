import { Icons } from '@/components/icons';
import { env } from '@/env.mjs';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  author: env.NEXT_PUBLIC_SITE_NAME,
  slogan: 'Watch TV Shows & Movies Online.',
  description:
    'Watch movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.',
  keywords: [
    'watch movies',
    'movies online',
    'watch TV',
    'TV online',
    'TV shows online',
    'watch TV shows',
    'stream movies',
    'stream tv',
    'instant streaming',
    'watch online',
    'movies',
    'watch TV online',
    'no download',
    'full length movies',
    env.NEXT_PUBLIC_SITE_NAME,
  ],
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/images/hero.jpg`,

  socialLinks: [
    {
      title: 'Facebook',
      href: `${env.NEXT_PUBLIC_FACEBOOK}`,
      icon: Icons.facebook,
    },
    {
      title: 'Instagram',
      href: `${env.NEXT_PUBLIC_INSTAGRAM}`,
      icon: Icons.instagram,
    },
    {
      title: 'Twitter', // Added Twitter link
      href: `${env.NEXT_PUBLIC_TWITTER}`, // The Twitter link from environment variable
      icon: Icons.twitter, // Add a twitter icon if available
    },
  ],

  footerItems: [
    // Footer items can be added here
  ],

  mainNav: [
    {
      title: 'Home',
      href: '/home',
    },
    {
      title: 'Trending',
      href: '/tv-shows',
    },
    {
      title: 'Adult',
      href: '/Adult',
    },
    // Other main navigation items
  ],
};
