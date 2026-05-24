import type { Metadata } from 'next';
import RankingClient from './RankingClient';
import { getRankedISPs } from '@/utils/tierRanking';

export const metadata: Metadata = {
  title: 'ゲーミング回線ランキング・Tier表 | Gamer\'s Line',
  description: 'Ping・安定性・通信速度を基準に、ゲーム用途の光回線をTier表で比較。料金は参考情報として掲載しています。',
  alternates: { canonical: '/ranking' },
};

export default function RankingPage() {
  const isps = getRankedISPs();
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ゲーミング回線 最強ランキング',
    description: 'Ping・安定性・速度・料金の4軸で評価したゲーミング光回線ランキング',
    itemListElement: isps.map((isp, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: isp.name,
      url: `https://gamers-line.jp${isp.detailLink}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <RankingClient />
    </>
  );
}
