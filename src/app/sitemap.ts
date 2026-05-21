import { MetadataRoute } from 'next';
import { getColumnsList } from '@/libs/microcms';
import { PROVIDER_DETAILS } from '@/data/providerDetails';

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gamers-line.jp';

  // Fetch all column articles from microCMS
  const columns = await getColumnsList();

  const columnUrls: MetadataRoute.Sitemap = columns.map((col) => {
    const urlSlug = col.slug ? col.slug.replace(/^\//, '') : col.id;
    return {
      url: `${baseUrl}/column/${urlSlug}`,
      lastModified: col.updatedAt || col.publishedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    };
  });

  const prefectures = [
    'hokkaido','aomori','iwate','miyagi','akita','yamagata','fukushima',
    'tokyo','kanagawa','saitama','chiba','ibaraki','tochigi','gunma',
    'niigata','toyama','ishikawa','fukui','yamanashi','nagano',
    'aichi','shizuoka','gifu','mie',
    'osaka','hyogo','kyoto','shiga','nara','wakayama',
    'hiroshima','okayama','shimane','tottori','yamaguchi',
    'kagawa','ehime','kochi','tokushima',
    'fukuoka','saga','nagasaki','kumamoto','oita','miyazaki','kagoshima','okinawa',
  ];

  const areaUrls: MetadataRoute.Sitemap = prefectures.map((pref) => ({
    url: `${baseUrl}/area/${pref}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/diagnosis`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/provider`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/column`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/campaign`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/speedtest`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/area`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/vpn`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const providerUrls: MetadataRoute.Sitemap = Object.keys(PROVIDER_DETAILS).map((slug) => ({
    url: `${baseUrl}/provider/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticUrls, ...areaUrls, ...columnUrls, ...providerUrls];
}
