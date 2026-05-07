import TokyoAreaHero from '@/components/TokyoAreaHero';
import ispsData from '@/data/isps.json';
import { ISP } from '@/utils/algorithm';
import { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: '東京都のゲーマー向け最強光回線 | Gamer\'s Line',
  description: '東京（23区・多摩）で利用可能な、Ping値特化型の最強ゲーミング光回線を厳選比較。',
};

export default function TokyoAreaPage() {
  // 関東（kanto）または全国（all）対応のISPのみを抽出
  const tokyoISPs = (ispsData as ISP[]).filter(isp => 
    isp.region.includes('kanto') || isp.region.includes('all')
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <TokyoAreaHero />
      
      <div className="max-w-4xl mx-auto px-4 mt-12 sm:mt-20 space-y-16">
        <section>
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">東京都で引けるおすすめゲーミング回線</h2>
            <p className="text-text-muted leading-relaxed">
              東京都内は通信インフラが最も整っているため、ほぼ全ての光回線が契約可能です。
              しかし、マンションの設備（VDSL方式など）によっては希望の回線が引けない場合もあります。
              ここでは、Ping値が安定している東京エリアのトップティア回線を厳選しました。
            </p>
          </div>
          
          <div className="grid gap-6">
            {tokyoISPs.map((isp, idx) => (
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
                      <div className="text-xs text-text-muted mb-1">月額料金</div>
                      <div className="text-2xl font-bold text-cyan font-mono">¥{isp.actual_monthly_fee_jpy.toLocaleString()}</div>
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

        <section className="p-8 rounded-3xl bg-cyan/5 border border-cyan/20">
          <h3 className="text-xl font-bold mb-4 text-cyan">💡 東京エリアの回線選びのコツ</h3>
          <ul className="space-y-4 text-sm sm:text-base text-text-muted">
            <li className="flex gap-3">
              <span className="text-emerald font-bold">1.</span>
              <span><strong>NURO光の提供エリアが最も広い：</strong> 東京はNURO光の恩恵を最も受けやすい地域です。戸建てはもちろん、多くのマンションに「NURO光 for マンション」の設備が導入されています。</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald font-bold">2.</span>
              <span><strong>10Gプランの普及率が日本一：</strong> 23区内であれば、多くのプロバイダで10Gプラン（超高速通信）が選択可能です。本格的にFPSをやるなら10Gプランを優先的に検討しましょう。</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald font-bold">3.</span>
              <span><strong>VDSL問題に注意：</strong> 古いマンションの場合、光回線と謳っていても建物内が「VDSL（電話線）」で上限100Mbpsになっているケースが多々あります。契約前に必ず管理会社に配線方式を確認してください。</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
