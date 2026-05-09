import { NextResponse } from 'next/server';

// 本番環境では、A8.net等のアフィリエイトリンクや
// microCMSから取得したURLにリダイレクトさせます。
// ここでは簡易的にテスト用のダミーURLへ転送します。
const AFFILIATE_LINKS: Record<string, string> = {
  nuro_hikari: 'https://example.com/a8/nuro',
  au_hikari: 'https://example.com/a8/au',
  docomo_hikari: 'https://example.com/a8/docomo',
  so_net_hikari: 'https://example.com/a8/sonet',
  game_with_hikari: 'https://gamewith-hikari.gamewith.co.jp/'
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await the params object in Next.js 15+ App Router
  const resolvedParams = await params;
  const targetId = resolvedParams.id;
  
  const redirectUrl = AFFILIATE_LINKS[targetId];

  if (!redirectUrl) {
    // 該当IDがない場合はトップページ等へ安全にフォールバック
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 302 一時的なリダイレクト（SEOのリンクジュースを渡さないためアフィリエイトは302が推奨）
  return NextResponse.redirect(redirectUrl, { status: 302 });
}
