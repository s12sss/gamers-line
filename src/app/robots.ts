import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/out/',
        '/_next/static/media/',
      ],
    },
    sitemap: 'https://gamers-line.jp/sitemap.xml',
  };
}
