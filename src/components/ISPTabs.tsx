'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import AffiliateLink from './AffiliateLink';

interface ISP {
  id: string;
  name: string;
  type?: string;
  avg_ping_ms: number;
  avg_dl_speed_mbps?: number;
  stability_score?: number;
  actual_monthly_fee_jpy: number;
  mansion_monthly_fee_jpy: number;
  regions?: string[];
  affiliateLink?: string;
}

interface Props {
  standardISPs: ISP[];
  tenGISPs: ISP[];
}

function ISPCard({ isp, idx }: { isp: ISP; idx: number }) {
  return (
    <div className="relative p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row gap-8 items-center transition-all hover:bg-white/[0.07] hover:border-cyan/30">
      <div className="flex-1 w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl font-black text-white/10 italic">0{idx + 1}</span>
          <h4 className="text-2xl font-bold text-white">{isp.name}</h4>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <div className="text-xs text-text-muted mb-1">推測Ping値</div>
            <div className="text-2xl font-bold text-emerald font-mono">
              {isp.avg_ping_ms}<span className="text-sm text-text-muted ml-1">ms</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col gap-2.5">
            <div>
              <div className="text-xs text-text-muted mb-1">速度</div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => {
                  const spd = isp.avg_dl_speed_mbps ?? 0;
                  const stars = spd >= 900 ? 5 : spd >= 700 ? 4 : spd >= 500 ? 3 : spd >= 300 ? 2 : 1;
                  return <span key={i} className={`text-sm ${i < stars ? 'text-emerald' : 'text-white/15'}`}>★</span>;
                })}
              </div>
            </div>
            <div>
              <div className="text-xs text-text-muted mb-1">安定性</div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => {
                  const s = isp.stability_score ?? 0;
                  const stars = s >= 90 ? 5 : s >= 80 ? 4 : s >= 70 ? 3 : s >= 60 ? 2 : 1;
                  return <span key={i} className={`text-sm ${i < stars ? 'text-cyan' : 'text-white/15'}`}>★</span>;
                })}
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <div className="text-xs text-text-muted mb-1.5">月額料金</div>
            <div className="text-lg font-bold text-cyan font-mono leading-none">¥{isp.actual_monthly_fee_jpy.toLocaleString()}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            isp.avg_ping_ms <= 15 ? { label: '#低Ping', color: 'text-cyan border-cyan/20 bg-cyan/10' } : isp.avg_ping_ms <= 20 ? { label: '#Ping良好', color: 'text-cyan/70 border-cyan/10 bg-cyan/5' } : null,
            isp.stability_score && isp.stability_score >= 90 ? { label: '#安定性抜群', color: 'text-emerald border-emerald/20 bg-emerald/10' } : null,
            isp.avg_dl_speed_mbps && isp.avg_dl_speed_mbps >= 900 ? { label: '#高速', color: 'text-white/60 border-white/10 bg-white/5' } : null,
            isp.type === '専用帯域' ? { label: '#ゲーム専用帯域', color: 'text-purple-400 border-purple-400/20 bg-purple-400/10' } : null,
            isp.type === '独自回線' ? { label: '#独自回線', color: 'text-white/60 border-white/10 bg-white/5' } : null,
            isp.regions && isp.regions.length <= 3 ? { label: '#地域限定', color: 'text-amber-400 border-amber-400/20 bg-amber-400/10' } : null,
          ].filter(Boolean).map(tag => tag && (
            <span key={tag.label} className={`px-3 py-1 border text-xs font-mono rounded-full ${tag.color}`}>
              {tag.label}
            </span>
          ))}
        </div>
      </div>
      <div className="w-full md:w-auto flex-shrink-0">
        <AffiliateLink
          href={isp.affiliateLink || '#'}
          ispName={isp.name}
          ispId={isp.id}
          className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-cyan text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,229,255,0.3)] w-full"
        >
          公式サイトを見る
          <ExternalLink className="w-4 h-4" />
        </AffiliateLink>
      </div>
    </div>
  );
}

export default function ISPTabs({ standardISPs, tenGISPs }: Props) {
  const [activeTab, setActiveTab] = useState<'standard' | '10g'>('standard');
  const current = activeTab === 'standard' ? standardISPs : tenGISPs;

  return (
    <section>
      {/* 注記 */}
      <p className="text-[0.7rem] text-text-muted mb-4">※表示料金は戸建ての標準月額です。マンションや各社キャンペーン適用で実際の負担額はさらに下がります。</p>

      {/* タブ */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('standard')}
          className={`px-5 py-2.5 rounded-full text-sm font-bold font-mono tracking-wider transition-all ${
            activeTab === 'standard'
              ? 'bg-cyan text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]'
              : 'border border-white/10 text-text-muted hover:border-cyan/30 hover:text-white'
          }`}
        >
          標準プラン
        </button>
        <button
          onClick={() => setActiveTab('10g')}
          className={`px-5 py-2.5 rounded-full text-sm font-bold font-mono tracking-wider transition-all ${
            activeTab === '10g'
              ? 'bg-cyan text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]'
              : 'border border-white/10 text-text-muted hover:border-cyan/30 hover:text-white'
          }`}
        >
          10G プラン
        </button>
      </div>

      {/* ISPリスト */}
      <div className="grid gap-6">
        {current.length > 0 ? (
          current.map((isp, idx) => (
            <ISPCard key={isp.id} isp={isp} idx={idx} />
          ))
        ) : (
          <p className="text-text-muted text-sm py-8 text-center border border-white/10 rounded-2xl">
            このエリアでは現在対応プランがありません。
          </p>
        )}
      </div>
    </section>
  );
}
