import { PREFECTURES, getPrefectureById, type Prefecture } from '@/utils/prefectureData';
import { REGION_COVERAGE, CoverageStatus } from '@/utils/regionData';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ShieldCheck, AlertTriangle, XCircle, MapPin, Play } from 'lucide-react';
import TierRankingTable from '@/components/TierRankingTable';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

function getPrefectureDescription(prefName: string, region: { name: string; status: CoverageStatus }): string {
  const { status } = region;

  const nueroText = status.hasNuro === 'COVERED'
    ? `${prefName}ではNURO光が広くサービス提供されており、独自インフラによる低Ping（平均12ms前後）がゲーマーに人気です。`
    : status.hasNuro === 'LIMITED'
    ? `${prefName}はNURO光の提供エリアが一部地域に限られます。申し込み前に公式サイトでのエリア確認が必須です。`
    : `${prefName}はNURO光の提供エリア外ですが、GameWith光など全国対応のゲーミング回線で十分カバーできます。`;

  const strongLocalIsps = ['eo光', 'コミュファ光'];
  const localText = status.localIsp
    ? strongLocalIsps.includes(status.localIsp)
      ? `${region.name}エリア限定で「${status.localIsp}」が提供されています。独自インフラによる低Pingと夜間の安定性が高く評価されており、エリア内なら最優先で検討する価値があります。`
      : `${region.name}エリアには地域回線「${status.localIsp}」も提供されています。ただしPing値・安定性ではNURO光・GameWith光を優先して比較することをおすすめします。`
    : '';

  const tenGText = status.has10G === 'AVAILABLE'
    ? `10Gプランも広く普及しており、4K配信や大人数でのプレイにも対応できる環境が整っています。`
    : status.has10G === 'LIMITED'
    ? `10Gプランは一部エリアから順次拡大中です。`
    : '';

  return `${prefName}のゲーマー向け光回線事情を解説します。${nueroText}${localText ? ' ' + localText : ''}${tenGText ? ' ' + tenGText : ''}回線選びに迷ったら、下の無料診断ツールで住居タイプとキャリアを入力するだけで最適解が見つかります。`;
}

function getPrefectureFaqs(prefData: Prefecture, region: { name: string; status: CoverageStatus }) {
  const prefName = prefData.name;
  const { status } = region;

  const nuroAnswer = prefData.faqNuro ?? (
    status.hasNuro === 'COVERED'
      ? `はい、${prefName}ではNURO光が広く対応しています。独自インフラによる低Ping（平均12ms前後）が特徴で、FPS・TPSゲームに最適です。ただし集合住宅（マンション）には対応していないため、戸建てにお住まいの方向けです。`
      : status.hasNuro === 'LIMITED'
      ? `${prefName}は一部エリアでNURO光が使えますが、対応地域が限られます。まず公式サイトでエリア確認を行うことをおすすめします。`
      : `残念ながら${prefName}はNURO光の提供エリア外です。代わりにGameWith光やauひかりなど全国対応のゲーミング回線を検討してください。`
  );

  const mansionAnswer = prefData.faqMansion ?? (
    status.localIsp
      ? `${prefName}のマンション向けには、まず建物の配線方式（光配線 or VDSL）の確認が重要です。${region.name}エリアでは「${status.localIsp}」がマンションにも対応しており安定性が高く評価されています。GameWith光やauひかりも選択肢として有力です。`
      : `${prefName}のマンション向けには、建物の配線タイプを先に確認することが重要です。光配線対応であればGameWith光やauひかりが安定しており、VDSL環境でも使えます。ゲーミング特化プロバイダを選ぶことで遅延は最小化できます。`
  );

  const fpsAnswer = prefData.faqFps ?? (
    status.hasNuro === 'COVERED'
      ? `${prefName}でFPSにおすすめなのはNURO光（平均Ping 12ms前後）です。戸建て専用のため、マンションにお住まいの場合はGameWith光やauひかりが次点となります。いずれも有線LAN（Cat6以上）での接続が前提です。`
      : `${prefName}でFPS・TPSにおすすめなのは、GameWith光や${status.localIsp ? status.localIsp : 'auひかり'}です。Ping値の低さと夜間の安定性を重視して選びましょう。Wi-Fiより有線LANでの接続が勝率に直結します。`
  );

  return [
    { q: `${prefName}でNURO光は使えますか？`, a: nuroAnswer },
    { q: `${prefName}のマンション住まいにおすすめの光回線は？`, a: mansionAnswer },
    { q: `${prefName}でVALORANT・Apexに最適な回線は？`, a: fpsAnswer },
    {
      q: `${prefName}で10Gプランは必要ですか？`,
      a: `一般的なオンラインゲームには1Gbpsプランで十分です。ただし4K配信・実況を同時に行う場合や家族で複数デバイスを使う場合は10Gプランへのアップグレードを検討してください。Ping値はプラン速度より回線の種類（独自インフラ vs 光コラボ）の影響が大きいです。`,
    },
  ];
}

type Props = {
  params: Promise<{ prefecture: string }>;
};

export async function generateStaticParams() {
  return PREFECTURES.map((p) => ({
    prefecture: p.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { prefecture } = await params;
  const prefData = getPrefectureById(prefecture);
  
  if (!prefData) {
    return { title: 'Not Found' };
  }

  return {
    title: `【2026年最新】${prefData.name}でおすすめのゲーミング回線・Ping値比較 | Gamer's Line`,
    description: `${prefData.name}にお住まいのゲーマー必見！FPSやMMOでラグを無くすための最強の光回線を徹底比較。10Gプランの対応状況や、${prefData.name}特有のローカル回線情報も網羅しています。`,
    alternates: {
      canonical: `/area/${prefecture}`,
    },
    openGraph: {
      title: `${prefData.name}でおすすめのゲーミング回線・Ping値比較`,
      description: `${prefData.name}でラグを無くすための最強の光回線を徹底比較。`,
      url: `https://gamers-line.jp/area/${prefecture}`,
    }
  };
}

const renderStatusIcon = (status: 'AVAILABLE' | 'COVERED' | 'LIMITED' | 'UNAVAILABLE') => {
  switch (status) {
    case 'AVAILABLE':
    case 'COVERED':
      return <ShieldCheck className="w-5 h-5 text-emerald" />;
    case 'LIMITED':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case 'UNAVAILABLE':
      return <XCircle className="w-5 h-5 text-red-500" />;
  }
};

const renderStatusText = (status: 'AVAILABLE' | 'COVERED' | 'LIMITED' | 'UNAVAILABLE') => {
  switch (status) {
    case 'AVAILABLE': return <span className="text-emerald font-bold">提供エリア内</span>;
    case 'COVERED': return <span className="text-emerald font-bold">提供エリア内</span>;
    case 'LIMITED': return <span className="text-yellow-500 font-bold">一部エリア対応</span>;
    case 'UNAVAILABLE': return <span className="text-red-500 font-bold">エリア外</span>;
  }
};

export default async function PrefecturePage({ params }: Props) {
  const { prefecture } = await params;
  const prefData = getPrefectureById(prefecture);

  if (!prefData) {
    notFound();
  }

  const regionData = REGION_COVERAGE[prefData.regionId];

  const breadcrumbs = [
    { name: 'HOME', path: '/' },
    { name: 'エリアから探す', path: '/area' },
    { name: `${prefData.name}のゲーミング回線`, path: `/area/${prefData.id}` }
  ];

  const prefDesc = getPrefectureDescription(prefData.name, regionData);
  const faqs = getPrefectureFaqs(prefData, regionData);
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Breadcrumbs */}
      <div className="pt-24 px-4 sm:px-10 max-w-[1100px] mx-auto">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 mb-12">
        <div className="text-center mb-10">
          <h1 className="font-heading text-[1.75rem] sm:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-emerald">
              {prefData.name}
            </span>
            のゲーミング回線 徹底比較
          </h1>
          <p className="text-text-muted text-sm sm:text-base max-w-2xl mx-auto leading-[1.7]">
            {prefData.name}にお住まいで「ApexやVALORANTでラグい…」と悩んでいる方向けに、地域対応の回線から定番の10Gプランまで、本当におすすめできる光回線だけを厳選しました。
          </p>
          <p className="text-text-muted/80 text-sm max-w-2xl mx-auto leading-[1.8] mt-4">
            {prefData.gamingNote}
          </p>
          <p className="text-text-muted/60 text-sm max-w-2xl mx-auto leading-[1.8] mt-2">
            {prefDesc}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Status Box */}
          <section className="bg-black border border-white/10 rounded-[20px] p-6 sm:p-8 relative overflow-hidden">
            <div className="flex items-center gap-2 pb-4 border-b border-white/10 mb-6">
              <MapPin className="w-5 h-5 text-cyan" />
              <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight">
                {prefData.name}（{regionData.name}エリア）の回線事情
              </h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[0.7rem] text-white/75 tracking-[0.1em] uppercase">10Gプラン</span>
                <div className="flex items-center gap-1.5 text-[1rem]">
                  {renderStatusIcon(regionData.status.has10G)}
                  {renderStatusText(regionData.status.has10G)}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[0.7rem] text-white/75 tracking-[0.1em] uppercase">NURO光</span>
                <div className="flex items-center gap-1.5 text-[1rem]">
                  {renderStatusIcon(regionData.status.hasNuro)}
                  {renderStatusText(regionData.status.hasNuro)}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[0.7rem] text-white/75 tracking-[0.1em] uppercase">GameWith光</span>
                <div className="flex items-center gap-1.5 text-[1rem]">
                  {renderStatusIcon(regionData.status.hasGameWith)}
                  {renderStatusText(regionData.status.hasGameWith)}
                </div>
              </div>
              {regionData.status.localIsp && (
                <div className="flex flex-col gap-1 col-span-2 sm:col-span-3 mt-2">
                  <span className="font-mono text-[0.7rem] text-cyan tracking-[0.1em] uppercase">地域限定回線</span>
                  <div className="flex items-center gap-1.5 text-[1.1rem]">
                    <ShieldCheck className="w-5 h-5 text-emerald" />
                    <span className="text-emerald font-bold">{regionData.status.localIsp}</span>
                  </div>
                </div>
              )}
            </div>

            {prefData.coverageNote && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-3">
                <div className="font-mono text-[0.65rem] tracking-[0.1em] text-white/40 mb-2">// {prefData.name}のエリア特性</div>
                <p className="text-sm text-text-muted leading-relaxed">
                  {prefData.coverageNote}
                </p>
              </div>
            )}
            <div className="p-4 rounded-xl bg-cyan/5 border border-cyan/10">
              <div className="font-mono text-[0.65rem] tracking-[0.1em] text-cyan mb-2">// 専門家のアドバイス</div>
              <p className="text-sm text-text/90 leading-relaxed">
                {regionData.status.advice}
              </p>
            </div>
          </section>

          {/* Diagnosis CTA */}
          <section className="rounded-[20px] bg-cyan/5 border border-cyan/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-mono text-[0.65rem] text-cyan tracking-[0.2em] uppercase mb-1">// 無料診断</div>
              <p className="font-heading font-bold text-lg text-white">{prefData.name}に最適な回線を30秒で診断</p>
              <p className="text-sm text-text-muted mt-1">住居タイプ・スマホキャリアを選ぶだけで最適解が見つかります</p>
            </div>
            <Link href="/diagnosis" className="shrink-0 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-cyan text-black font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,229,255,0.3)] w-full sm:w-auto justify-center">
              <Play className="w-4 h-4 fill-black" />
              無料診断スタート
            </Link>
          </section>

          {/* ISP Ranking */}
          <div>
            <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-3">RANKING</div>
            <h2 className="font-heading text-2xl font-bold mb-6 text-white">
              {prefData.name}のおすすめ回線<span className="gradient-text">ランキング</span>
            </h2>
            <TierRankingTable regionId={prefData.regionId} prefName={prefData.name} showExplanation />
          </div>
          {/* FAQ */}
          <section>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <h2 className="font-heading text-xl sm:text-2xl font-bold mb-6">
              {prefData.name}の光回線 よくある質問
            </h2>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white/5 border border-white/10 rounded-[16px] overflow-hidden hover:border-cyan/30 transition-all">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-sm text-white list-none [&::-webkit-details-marker]:hidden">
                    <span className="flex gap-3">
                      <span className="text-cyan font-mono shrink-0">Q.</span>
                      {faq.q}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0 ml-4 group-open:rotate-180 transition-transform duration-300 text-cyan text-xs">▼</span>
                  </summary>
                  <div className="px-5 pb-5 pt-2 text-text-muted text-sm leading-[1.7] border-t border-white/5 flex gap-3">
                    <span className="text-emerald font-mono font-bold mt-0.5 shrink-0">A.</span>
                    <div>{faq.a}</div>
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
