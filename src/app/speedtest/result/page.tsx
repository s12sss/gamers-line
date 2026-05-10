import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Props = {
  searchParams: Promise<{ ping?: string; tier?: string; dl?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const ping = resolvedParams.ping || '??';
  const tier = resolvedParams.tier || 'UNRANKED';
  const dl = resolvedParams.dl || '0';
  
  const ogImageUrl = `https://gamers-line.jp/api/og/speedtest.png?ping=${ping}&tier=${tier}&dl=${dl}`;

  return {
    title: `私の回線ランクは【${tier}】でした！ | Gamer's Line`,
    description: `ゲーマー向け回線診断でスピードテストを実施しました。Ping: ${ping}ms`,
    openGraph: {
      title: `私の回線ランクは【${tier}】でした！ | Gamer's Line`,
      description: `ゲーマー向け回線診断でスピードテストを実施しました。Ping: ${ping}ms`,
      images: [ogImageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: `私の回線ランクは【${tier}】でした！ | Gamer's Line`,
      description: `ゲーマー向け回線診断でスピードテストを実施しました。Ping: ${ping}ms`,
      images: [ogImageUrl],
    },
  };
}

export default async function SpeedtestResultPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const ping = resolvedParams.ping || '??';
  const tier = resolvedParams.tier || 'UNRANKED';
  const dl = resolvedParams.dl || '0';

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan/20 blur-[50px] pointer-events-none" />
        
        <h1 className="font-heading text-2xl font-bold mb-2">測定結果のシェア完了！</h1>
        <p className="text-text-muted mb-8 text-sm">
          Ping: <span className="text-white font-bold">{ping}ms</span> / ダウンロード: <span className="text-white font-bold">{dl}Mbps</span> / 階級: <span className="text-cyan font-bold">{tier}</span>
        </p>

        <Link 
          href="/speedtest"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cyan text-black font-bold text-sm transition-all hover:scale-105 w-full"
        >
          <ArrowLeft className="w-4 h-4" />
          スピードテスト画面に戻る
        </Link>
      </div>
    </div>
  );
}
