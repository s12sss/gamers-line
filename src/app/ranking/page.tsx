import type { Metadata } from 'next';
import RankingClient from './RankingClient';

export const metadata: Metadata = {
  title: 'ゲーミング回線ランキング・Tier表 | Gamer\'s Line',
  description: 'Ping・安定性・通信速度を基準に、ゲーム用途の光回線をTier表で比較。料金は参考情報として掲載しています。',
  alternates: { canonical: '/ranking' },
};

export default function RankingPage() {
  return <RankingClient />;
}
