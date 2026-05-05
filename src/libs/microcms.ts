import { createClient } from 'microcms-js-sdk';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  console.warn('MICROCMS_SERVICE_DOMAIN is not defined');
}

if (!process.env.MICROCMS_API_KEY) {
  console.warn('MICROCMS_API_KEY is not defined');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || 'dummy-domain',
  apiKey: process.env.MICROCMS_API_KEY || 'dummy-api-key',
});

// microCMSのAPIスキーマ型定義
export type Column = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  slug: string;
  category: string[];
  thumbnail?: { url: string; width: number; height: number };
  content: string;
};

// 一覧取得
export async function getColumnsList(tag?: string) {
  try {
    const queries: any = { orders: '-publishedAt' };
    if (tag) {
      queries.filters = `category[contains]${tag}`;
    }
    const data = await client.getList<Column>({
      endpoint: 'columns',
      queries,
    });
    return data.contents;
  } catch (error) {
    console.error('Failed to fetch columns:', error);
    return []; // まだAPIが作成されていない場合は空配列を返す
  }
}

// 詳細取得
export async function getColumnDetail(slug: string) {
  try {
    const data = await client.getList<Column>({
      endpoint: 'columns',
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
    });
    return data.contents[0] || null;
  } catch (error) {
    console.error(`Failed to fetch column ${slug}:`, error);
    return null;
  }
}
