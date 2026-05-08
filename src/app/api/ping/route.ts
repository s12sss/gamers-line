import { NextResponse } from 'next/server';

// 常に最新の結果を返すためキャッシュを無効化
export const dynamic = 'force-dynamic';

export async function GET() {
  // ブラウザからのPing測定用エンドポイント
  // 応答速度のみを測るため、最小限のペイロードを返す
  return NextResponse.json(
    { status: 'ok', timestamp: Date.now() },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    }
  );
}
