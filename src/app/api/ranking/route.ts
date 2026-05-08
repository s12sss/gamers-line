import { NextResponse } from 'next/server';
import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || process.env.REDISCLOUD_URL || process.env.KV_URL;
const redis = redisUrl ? new Redis(redisUrl) : null;

export const dynamic = 'force-dynamic';

const LEADERBOARD_KEY = 'gamers_line_leaderboard';

export async function GET() {
  if (!redis) {
    return NextResponse.json({ 
      rankings: [
        { id: '1', name: 'ダミープレイヤー', isp: 'hi-ho ひかり with games', plan: '10G', ping: 8, speed: 1200, tier: 'GOD', date: new Date().toISOString() },
        { id: '2', name: 'テスト太郎', isp: 'NURO光', plan: '2G', ping: 12, speed: 600, tier: 'MASTER', date: new Date().toISOString() },
      ],
      mock: true
    });
  }

  try {
    const results = await redis.zrange(LEADERBOARD_KEY, 0, 49);
    const rankings = results.map((item) => JSON.parse(item));
    return NextResponse.json({ rankings, mock: false });
  } catch (error) {
    console.error('Failed to fetch rankings:', error);
    return NextResponse.json({ error: 'Failed to fetch rankings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!redis) {
    return NextResponse.json({ success: true, mock: true, percentile: 10 });
  }

  try {
    const body = await request.json();
    const { name, isp, plan, ping, speed, tier } = body;

    if (!name || typeof ping !== 'number' || typeof speed !== 'number') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const entry = {
      id: crypto.randomUUID(),
      name: name.substring(0, 20),
      isp: isp || '不明',
      plan: plan || '不明',
      ping,
      speed,
      tier,
      date: new Date().toISOString()
    };

    const memberStr = JSON.stringify(entry);

    // スコアを登録
    await redis.zadd(LEADERBOARD_KEY, ping, memberStr);

    // 登録した直後の自身の順位を取得 (0-indexed)
    const rank = await redis.zrank(LEADERBOARD_KEY, memberStr);
    
    // 全体の登録者数を取得
    const total = await redis.zcard(LEADERBOARD_KEY);

    // パーセンタイルの計算 (例: rank=0, total=100 なら上位1%, rank=50なら上位51%)
    let percentile = 1;
    if (rank !== null && total > 0) {
      percentile = Math.max(1, Math.round(((rank) / total) * 100));
    }

    return NextResponse.json({ success: true, entry, percentile, total });
  } catch (error) {
    console.error('Failed to submit ranking:', error);
    return NextResponse.json({ error: 'Failed to submit ranking' }, { status: 500 });
  }
}
