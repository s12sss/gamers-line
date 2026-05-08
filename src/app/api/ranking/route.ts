import { NextResponse } from 'next/server';
import Redis from 'ioredis';

// Vercel marketplaceのOfficial Redis Cloudなどから提供されるURL
const redisUrl = process.env.REDIS_URL || process.env.REDISCLOUD_URL || process.env.KV_URL;

// 接続設定 (URLがあれば接続、なければローカルモック用)
const redis = redisUrl ? new Redis(redisUrl) : null;

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
    // ioredis では zrange にパラメータを渡してJSON文字列の配列を取得する
    const results = await redis.zrange(LEADERBOARD_KEY, 0, 49);
    // JSON文字列の配列をオブジェクトにパース
    const rankings = results.map((item) => JSON.parse(item));
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
      name: name.substring(0, 20),
      isp: isp || 'unknown',
      ping,
      speed,
      tier,
      date: new Date().toISOString()
    };

    // ioredis では zadd に (key, score, member) の順で渡す
    await redis.zadd(LEADERBOARD_KEY, ping, JSON.stringify(entry));

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error('Failed to submit ranking:', error);
    return NextResponse.json({ error: 'Failed to submit ranking' }, { status: 500 });
  }
}
