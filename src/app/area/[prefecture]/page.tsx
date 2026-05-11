import { PREFECTURES, getPrefectureById } from '@/utils/prefectureData';
import { REGION_COVERAGE } from '@/utils/regionData';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ispsData from '@/data/isps.json';
import { ISP } from '@/utils/algorithm';
import { ShieldCheck, AlertTriangle, XCircle, MapPin, ExternalLink, AlertCircle } from 'lucide-react';
import TokyoMapWrapper from '@/components/TokyoMapWrapper';
import Breadcrumbs from '@/components/Breadcrumbs';

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
  
  // 該当するリージョンまたは全国対応のISPを抽出
  const localISPs = (ispsData as ISP[]).filter(isp => 
    isp.regions.includes(prefData.regionId) || isp.regions.includes('all')
  );

  const breadcrumbs = [
    { name: 'HOME', href: '/' },
    { name: 'エリアから探す', href: '/area' },
    { name: `${prefData.name}のゲーミング回線`, href: `/area/${prefecture}` }
  ];

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
            {prefData.name}にお住まいで「ApexやVALORANTでラグい…」と悩んでいる方向けに、地域限定の最強ローカル回線から定番の10Gプランまで、本当におすすめできる光回線だけを厳選しました。
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
                  <span className="font-mono text-[0.7rem] text-cyan tracking-[0.1em] uppercase">最強ローカル回線</span>
                  <div className="flex items-center gap-1.5 text-[1.1rem]">
                    <ShieldCheck className="w-5 h-5 text-emerald" />
                    <span className="text-emerald font-bold">{regionData.status.localIsp}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-cyan/5 border border-cyan/10">
              <div className="font-mono text-[0.65rem] tracking-[0.1em] text-cyan mb-2">// 専門家のアドバイス</div>
              <p className="text-sm text-text/90 leading-relaxed">
                {regionData.status.advice}
              </p>
            </div>
          </section>

          {/* ISP Ranking */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-cyan shadow-[0_0_10px_#00e5ff]" />
              {prefData.name}のおすすめ回線一覧
            </h2>
            
            <div className="grid gap-6">
              {localISPs.map((isp, idx) => (
                <div key={isp.id} className="relative p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row gap-8 items-center transition-all hover:bg-white/[0.07] hover:border-cyan/30">
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl font-black text-white/10 italic">0{idx + 1}</span>
                      <h4 className="text-2xl font-bold text-white">{isp.name}</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-xs text-text-muted mb-1">推測Ping値</div>
                        <div className="text-2xl font-bold text-emerald font-mono">{isp.avg_ping_ms}<span className="text-sm text-text-muted ml-1">ms</span></div>
                      </div>
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-xs text-text-muted mb-1.5">月額料金</div>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[0.6rem] text-text-muted px-1.5 py-0.5 bg-white/5 rounded leading-none">戸建</span>
                            <span className="text-lg font-bold text-cyan font-mono leading-none">¥{isp.actual_monthly_fee_jpy.toLocaleString()}〜</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[0.6rem] text-text-muted px-1.5 py-0.5 bg-white/5 rounded leading-none">ﾏﾝｼｮﾝ</span>
                            <span className="text-lg font-bold text-cyan font-mono leading-none">¥{isp.mansion_monthly_fee_jpy.toLocaleString()}〜</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6 md:mb-0">
                      {isp.badges?.map(badge => (
                        <span key={badge} className="px-3 py-1 bg-cyan/10 border border-cyan/20 text-cyan text-xs font-bold rounded-full">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex-shrink-0 flex flex-col gap-3">
                    <a href={isp.affiliateLink || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-cyan text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                      公式サイトを見る
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
