import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/out/', '/api/'], // Outbound affiliate redirect links shouldn't be indexed directly
    },
    sitemap: 'https://gamers-line.jp/sitemap.xml',
  };
}
