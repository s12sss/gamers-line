import { Metadata } from 'next';
import RedirectToSpeedtest from './RedirectToSpeedtest';

type Props = {
  searchParams: Promise<{ ping?: string; tier?: string; dl?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const ping = resolvedParams.ping || '??';
  const tier = resolvedParams.tier || 'UNRANKED';
  const dl = resolvedParams.dl || '0';

  const ogImageUrl = `https://gamers-line.jp/og-image/speedtest.png?ping=${ping}&tier=${tier}&dl=${dl}`;

  return {
    title: `私の回線ランクは【${tier}】でした！ | Gamer's Line`,
    description: `Ping: ${ping}ms / DL: ${dl}Mbps — ゲーマー回線ランク診断の結果です。あなたのランクは？`,
    openGraph: {
      title: `私の回線ランクは【${tier}】でした！ | Gamer's Line`,
      description: `Ping: ${ping}ms / DL: ${dl}Mbps — ゲーマー回線ランク診断の結果です。あなたのランクは？`,
      images: [ogImageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: `私の回線ランクは【${tier}】でした！ | Gamer's Line`,
      description: `Ping: ${ping}ms / DL: ${dl}Mbps — ゲーマー回線ランク診断の結果です。あなたのランクは？`,
      images: [ogImageUrl],
    },
  };
}

export default async function SpeedtestResultPage() {
  return <RedirectToSpeedtest />;
}
