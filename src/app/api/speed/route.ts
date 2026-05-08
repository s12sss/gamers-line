import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // ダウンロード速度測定用のエンドポイント
  // 約1MBのランダムな文字列データを生成して返す
  const size = 1024 * 1024; // 1MB
  // 圧縮を避けるためランダムっぽい文字列を生成
  // (実際のランダム生成は重いので、固定のチャンクを繰り返す)
  const chunk = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  const repeatCount = Math.ceil(size / chunk.length);
  const data = chunk.repeat(repeatCount).substring(0, size);

  return new NextResponse(data, {
    headers: {
      'Content-Type': 'text/plain',
      'Content-Length': size.toString(),
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
