import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Vercel KV (Upstash Redis) の接続設定
// 環境変数が設定されていない場合（ローカル等）はモックを返すようにする
const redis = (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
  ? new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
  : null;

export const dynamic = 'force-dynamic';

const LEADERBOARD_KEY = 'gamers_line_leaderboard';

export async function GET() {
  if (!redis) {
    return NextResponse.json({ 
      rankings: [
        { id: '1', name: 'ダミープレイヤー', isp: 'hi-ho_with_games_10g', ping: 8, speed: 1200, tier: 'GOD', date: new Date().toISOString() },
        { id: '2', name: 'テスト太郎', isp: 'nuro_hikari_2g', ping: 12, speed: 600, tier: 'MASTER', date: new Date().toISOString() },
      ],
      mock: true
    });
  }

  try {
    // Ping値が低い（良い）順に上位50件を取得
    // ZADD で ping をスコアとして保存するため、zrange を使用
    const rankings = await redis.zrange(LEADERBOARD_KEY, 0, 49);
    return NextResponse.json({ rankings, mock: false });
  } catch (error) {
    console.error('Failed to fetch rankings:', error);
    return NextResponse.json({ error: 'Failed to fetch rankings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!redis) {
    return NextResponse.json({ success: true, mock: true });
  }

  try {
    const body = await request.json();
    const { name, isp, ping, speed, tier } = body;

    if (!name || typeof ping !== 'number' || typeof speed !== 'number') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const entry = {
      id: crypto.randomUUID(),
      name: name.substring(0, 20), // 念のため文字数制限
      isp: isp || 'unknown',
      ping,
      speed,
      tier,
      date: new Date().toISOString()
    };

    // Ping値をスコアとして Sorted Set に追加
    await redis.zadd(LEADERBOARD_KEY, { score: ping, member: entry });

    // リーダーボードが大きくなりすぎないように、上位1000件を残して削除（任意）
    // await redis.zremrangebyrank(LEADERBOARD_KEY, 1000, -1);

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error('Failed to submit ranking:', error);
    return NextResponse.json({ error: 'Failed to submit ranking' }, { status: 500 });
  }
}
