'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface ISP {
  id: string;
  name: string;
  avg_ping_ms: number;
  actual_monthly_fee_jpy: number;
  mansion_monthly_fee_jpy: number;
  badges?: string[];
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
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <div className="text-xs text-text-muted mb-1">推測Ping値</div>
            <div className="text-2xl font-bold text-emerald font-mono">
              {isp.avg_ping_ms}<span className="text-sm text-text-muted ml-1">ms</span>
            </div>
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
        <div className="flex flex-wrap gap-2">
          {isp.badges?.map(badge => (
            <span key={badge} className="px-3 py-1 bg-cyan/10 border border-cyan/20 text-cyan text-xs font-bold rounded-full">
              {badge}
            </span>
          ))}
        </div>
      </div>
      <div className="w-full md:w-auto flex-shrink-0">
        <a
          href={isp.affiliateLink || '#'}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-cyan text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,229,255,0.3)] w-full"
        >
          公式サイトを見る
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export default function ISPTabs({ standardISPs, tenGISPs }: Props) {
  const [activeTab, setActiveTab] = useState<'standard' | '10g'>('standard');
  const current = activeTab === 'standard' ? standardISPs : tenGISPs;

  return (
    <section>
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
