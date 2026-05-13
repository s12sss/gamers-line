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
  category: string[];
  thumbnail?: { url: string; width: number; height: number };
  content: string;
  slug?: string;
};

// 一覧取得
export async function getColumnsList(tag?: string) {
  try {
    const queries: any = { orders: '-publishedAt', limit: 100 };
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

// ページネーション付き一覧取得（コラム一覧ページで使用）
const COLUMNS_PER_PAGE = 30;

export async function getColumnsPage(page: number = 1, tag?: string) {
  try {
    const offset = (page - 1) * COLUMNS_PER_PAGE;
    const queries: any = {
      orders: '-publishedAt',
      limit: COLUMNS_PER_PAGE,
      offset,
    };
    if (tag) {
      queries.filters = `category[contains]${tag}`;
    }
    const data = await client.getList<Column>({
      endpoint: 'columns',
      queries,
    });
    return {
      contents: data.contents,
      totalCount: data.totalCount,
      totalPages: Math.ceil(Math.min(data.totalCount, 210) / COLUMNS_PER_PAGE),
      currentPage: page,
    };
  } catch (error) {
    console.error('Failed to fetch columns page:', error);
    return { contents: [], totalCount: 0, totalPages: 0, currentPage: 1 };
  }
}

// 詳細取得
export async function getColumnDetail(slugOrId: string) {
  try {
    // 1. まずカスタムのslugフィールドで検索する（/あり・なし両方に対応）
    const searchSlug = slugOrId.startsWith('/') ? slugOrId : `/${slugOrId}`;
    const searchSlugNoSlash = searchSlug.replace(/^\//, '');
    
    const listData = await client.getList<Column>({
      endpoint: 'columns',
      queries: {
        filters: `slug[equals]${searchSlug}[or]slug[equals]${searchSlugNoSlash}[or]slug[equals]/${searchSlugNoSlash}`
      }
    });

    if (listData.contents.length > 0) {
      return listData.contents[0];
    }

    // 2. 見つからなければ従来のcontentIdとして取得を試みる
    const data = await client.get<Column>({
      endpoint: 'columns',
      contentId: slugOrId,
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch column ${slugOrId}:`, error);
    return null;
  }
}
