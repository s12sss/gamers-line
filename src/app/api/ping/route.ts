import { NextResponse } from 'next/server';

// Edgeランタイムを指定（Vercelの最寄りCDNエッジで処理させるため超高速応答になる）
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  return new NextResponse('pong', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
