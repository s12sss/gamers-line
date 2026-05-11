"use client";

import { useState } from 'react';
import { ProviderDetail } from '@/data/providerDetails';
import { Check, X, ChevronRight } from 'lucide-react';
import ProviderRadarChart from './ProviderRadarChart';

type IspData = {
  id: string;
  name: string;
  max_speed_gbps: number;
  avg_ping_ms: number;
  actual_monthly_fee_jpy: number;
  mansion_monthly_fee_jpy: number;
  stability_score: number;
  cashback_text: string;
  affiliateLink: string;
  pros: string[];
  cons: string[];
};

import { RadarStats } from './ProviderRadarChart';

type CompareProvider = {
  slug: string;
  name: string;
  stats: RadarStats;
};

type Props = {
  detail: ProviderDetail;
  isps: IspData[];
  allProviders?: CompareProvider[];
};

export default function ProviderClientView({ detail, isps, allProviders }: Props) {
  // デフォルト表示を10G以外のプラン（1Gや2Gなど）にする
  const [activeIspId, setActiveIspId] = useState(
    isps.find(isp => !isp.id.includes('10g'))?.id || isps[0].id
  );
  
  const [compareSlug, setCompareSlug] = useState<string>('');
  const compareProvider = allProviders?.find(p => p.slug === compareSlug);

  const activeIsp = isps.find(isp => isp.id === activeIspId) || isps[0];

  return (
    <div>
      {/* Tabs */}
      {isps.length > 1 && (
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white/5 p-1.5 rounded-full border border-white/10">
            {isps.map(isp => {
              const is10G = isp.id.includes('10g') || isp.max_speed_gbps >= 10;
              const tabLabel = is10G ? '10Gプラン' : '1Gプラン';
              const isActive = activeIspId === isp.id;
              
              return (
                <button
                  key={isp.id}
                  onClick={() => setActiveIspId(isp.id)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    isActive 
                      ? 'text-black bg-cyan shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
                      : 'text-text-muted hover:text-white'
                  }`}
                >
                  {tabLabel}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Spec Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-cyan/30 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-text-muted text-xs font-bold tracking-widest mb-2 font-mono">AVG PING</div>
          <div className="text-4xl font-black text-cyan drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            {activeIsp.avg_ping_ms}<span className="text-lg text-text-muted ml-1">ms</span>
          </div>
        </div>
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald/30 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-text-muted text-xs font-bold tracking-widest mb-2 font-mono">MAX SPEED</div>
          <div className="text-4xl font-black text-emerald drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            {activeIsp.max_speed_gbps}<span className="text-lg text-text-muted ml-1">Gbps</span>
          </div>
        </div>
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-5 sm:p-6 relative overflow-hidden group hover:border-purple-500/30 transition-colors flex flex-col justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-text-muted text-xs font-bold tracking-widest mb-3 font-mono">MONTHLY FEE</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[0.6rem] text-text-muted px-1.5 py-0.5 bg-white/5 rounded leading-none shrink-0">戸建</span>
              <div className="text-2xl font-black text-purple-400 leading-none">
                <span className="text-xs mr-1 text-purple-400/80">¥</span>{activeIsp.actual_monthly_fee_jpy.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[0.6rem] text-text-muted px-1.5 py-0.5 bg-white/5 rounded leading-none shrink-0">ﾏﾝｼｮﾝ</span>
              <div className="text-2xl font-black text-purple-400 leading-none">
                <span className="text-xs mr-1 text-purple-400/80">¥</span>{activeIsp.mansion_monthly_fee_jpy.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-text-muted text-xs font-bold tracking-widest mb-2 font-mono">STABILITY</div>
          <div className="text-4xl font-black text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            {activeIsp.stability_score}<span className="text-lg text-text-muted ml-1">/100</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-12 px-2">
        <p className="text-[0.7rem] sm:text-xs text-text-muted/80 leading-relaxed">
          ※ <strong className="text-yellow-500/80">STABILITY（安定性スコア）</strong> は、Ping値の変動幅・パケットロスト率・夜間帯の混雑による速度低下率など、ゲーマーにとって致命的となる要素を総合的に評価した100点満点の独自指標です。
        </p>
        <p className="text-[0.7rem] sm:text-xs text-text-muted/80 leading-relaxed">
          ※ <strong className="text-purple-400/80">実質月額</strong> は各種キャンペーンを考慮した目安です。建物の設備や各社の期間限定キャンペーン・スマホセット割の適用状況により、実際の負担額は変動する場合があります。
        </p>
      </div>

      {/* Radar Chart */}
      {detail.stats && (
        <div className="bg-[#050505] border border-white/10 rounded-3xl p-6 sm:p-10 mb-16 relative overflow-hidden group hover:border-cyan/30 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-center mb-6 z-10 relative">
            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-widest text-cyan drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">
              総合ステータス
            </h3>
            <p className="text-sm text-text-muted mt-2">各項目の強み・弱みを独自に評価</p>
          </div>
          <div className="max-w-[500px] mx-auto relative z-10">
            <ProviderRadarChart 
              stats={detail.stats}
              compareStats={compareProvider?.stats}
              baseName={detail.name}
              compareName={compareProvider?.name}
            />

            {/* Compare Selector */}
            {allProviders && allProviders.length > 0 && (
              <div className="mt-6 flex flex-col items-center border-t border-white/10 pt-6">
                <label className="text-xs text-text-muted/70 mb-2 font-bold tracking-wider">COMPARE WITH</label>
                <select
                  className="bg-[#0a0a0a] border border-white/20 text-white rounded-full px-5 py-2.5 text-sm outline-none focus:border-cyan hover:border-cyan/50 transition-colors cursor-pointer text-center appearance-none"
                  value={compareSlug}
                  onChange={(e) => setCompareSlug(e.target.value)}
                >
                  <option value="">▼ 比較する回線を選択</option>
                  {allProviders.map(p => (
                    <option key={p.slug} value={p.slug}>{p.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pros & Cons */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-emerald/5 border border-emerald/20 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-emerald mb-6 flex items-center gap-2">
            <Check className="w-6 h-6" /> メリット
          </h3>
          <ul className="space-y-4">
            {activeIsp.pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-3 text-text-muted">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0 mt-2" />
                <span className="leading-relaxed">{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
            <X className="w-6 h-6" /> 注意点・デメリット
          </h3>
          <ul className="space-y-4">
            {activeIsp.cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-3 text-text-muted">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-2" />
                <span className="leading-relaxed">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detailed Body Content */}
      <div className="bg-[#050505] border border-white/10 rounded-3xl p-6 sm:p-12 mb-16 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {detail.bodyContent}
      </div>

      {/* Bottom CTA */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-cyan/20 to-emerald/20 border border-cyan/30 p-8 sm:p-12 text-center group">
        <div className="absolute inset-0 bg-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <p className="text-[#ffeb3b] font-bold text-sm sm:text-base mb-8 drop-shadow-md relative z-10">
          ＼ {activeIsp.cashback_text} ／
        </p>
        <a
          href={activeIsp.affiliateLink !== "#" ? activeIsp.affiliateLink : "#"}
          target={activeIsp.affiliateLink !== "#" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-cyan text-black font-black text-lg sm:text-xl rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] relative z-10"
        >
          {detail.name}のお申込みはこちら
          <ChevronRight className="w-6 h-6" />
        </a>
        {activeIsp.affiliateLink === "#" && (
          <p className="text-sm text-text-muted mt-4">※現在リンク準備中です</p>
        )}
      </div>
    </div>
  );
}
