import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Play } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getRankedISPs, groupByTier, TIER_CONFIG, TIER_ORDER } from '@/utils/tierRanking';
import type { RankedISP, TierLabel } from '@/utils/tierRanking';

export const metadata: Metadata = {
  title: 'ゲーミング回線 Tier表 2025年版 | Gamer\'s Line',
  description: 'Ping・安定度・通信速度をもとにゲーマー視点でランク付け。SS〜Cまでの回線Tier表で、あなたの最適解を一発で判断できます。',
  alternates: { canonical: '/ranking' },
};

function ISPCard({ isp }: { isp: RankedISP }) {
  return (
    <Link
      href={isp.detailLink}
      className="group flex flex-col min-w-[148px] max-w-[160px] rounded-[14px] border border-white/10 bg-white/[0.035] p-3.5 transition-all duration-200 hover:border-cyan/30 hover:-translate-y-0.5 hover:bg-white/[0.06] shrink-0"
    >
      <div className="font-heading font-bold text-[0.82rem] leading-[1.35] text-white group-hover:text-cyan transition-colors mb-3 line-clamp-2">
        {isp.name}
      </div>
      <div className="flex flex-col gap-1.5 mb-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.05em]">PING</span>
          <span className="font-mono font-bold text-[0.78rem] text-cyan">{isp.ping}ms</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.05em]">安定</span>
          <span className="font-mono font-bold text-[0.78rem] text-emerald">{isp.stability}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.62rem] text-text-dim tracking-[0.05em]">速度</span>
          <span className="font-mono font-bold text-[0.78rem] text-white/70">{isp.speedGbps}G</span>
        </div>
      </div>
      <div className="mt-auto pt-2 border-t border-white/[0.06]">
        <span className="font-mono text-[0.68rem] text-text-muted">¥{isp.monthlyFee.toLocaleString()}/月</span>
      </div>
    </Link>
  );
}

function TierRow({ tier, isps }: { tier: TierLabel; isps: RankedISP[] }) {
  const cfg = TIER_CONFIG[tier];
  if (isps.length === 0) return null;

  return (
    <div
      className="flex gap-0 rounded-[16px] overflow-hidden border"
      style={{ borderColor: cfg.border, backgroundColor: cfg.bg }}
    >
      {/* Tier label */}
      <div
        className="flex items-center justify-center w-14 sm:w-16 shrink-0"
        style={{ backgroundColor: cfg.labelBg }}
      >
        <span
          className="font-heading font-black text-[1.6rem] sm:text-[2rem] tracking-tight"
          style={{ color: cfg.color }}
        >
          {tier}
        </span>
      </div>

      {/* Cards */}
      <div className="flex gap-3 p-3 sm:p-4 overflow-x-auto flex-1 scrollbar-hide">
        {isps.map(isp => (
          <ISPCard key={isp.id} isp={isp} />
        ))}
      </div>
    </div>
  );
}

export default function TierPage() {
  const allISPs = getRankedISPs();
  const grouped = groupByTier(allISPs);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">

      {/* Page Header */}
      <div className="relative z-10 px-4 sm:px-10 py-10 sm:py-[72px] max-w-[1100px] mx-auto w-full border-b border-white/10">
        <Breadcrumbs items={[
          { name: 'HOME', path: '/' },
          { name: 'Tier表', path: '/tier' },
        ]} />
        <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4 mt-4">
          GAMING LINE TIER
        </div>
        <h1 className="font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-4">
          ゲーミング回線<br />
          <span className="gradient-text">Tier 表 2025</span>
        </h1>
        <p className="text-text-muted text-[0.9rem] sm:text-base leading-[1.7]">
          Ping・安定度・通信速度をゲーマー視点でスコアリング。SS〜Cの5段階で回線の実力を判定しました。料金は参考表示です。
        </p>

        {/* Scoring criteria */}
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            { label: 'PING', weight: '45%', note: '低いほど有利' },
            { label: '安定度', weight: '40%', note: '接続品質の安定性' },
            { label: '速度', weight: '15%', note: '最大通信速度' },
          ].map(c => (
            <div key={c.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
              <span className="font-mono text-[0.65rem] text-cyan tracking-[0.08em]">{c.label}</span>
              <span className="font-mono text-[0.65rem] text-white/80 font-bold">{c.weight}</span>
              <span className="font-mono text-[0.6rem] text-text-dim">{c.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tier Table */}
      <div className="relative z-10 px-4 sm:px-10 py-10 sm:py-16 max-w-[1100px] mx-auto w-full">
        <div className="flex flex-col gap-3">
          {TIER_ORDER.map(tier => (
            <TierRow key={tier} tier={tier} isps={grouped[tier]} />
          ))}
        </div>

        {/* Caption */}
        <p className="mt-6 text-[0.75rem] text-text-dim leading-[1.6]">
          ※ スコアは当サイト独自の算出方法によるものです。Ping・安定度は計測環境により異なります。エリア対応や特典は各公式サイトでご確認ください。
        </p>
      </div>

      {/* Tier desc table */}
      <div className="relative z-10 px-4 sm:px-10 pb-10 max-w-[1100px] mx-auto w-full">
        <div className="rounded-[16px] border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="text-left px-4 py-3 font-mono text-[0.65rem] text-text-dim tracking-[0.1em] w-16">TIER</th>
                <th className="text-left px-4 py-3 font-mono text-[0.65rem] text-text-dim tracking-[0.1em]">評価</th>
                <th className="text-left px-4 py-3 font-mono text-[0.65rem] text-text-dim tracking-[0.1em] hidden sm:table-cell">スコア目安</th>
              </tr>
            </thead>
            <tbody>
              {TIER_ORDER.map((tier, i) => {
                const cfg = TIER_CONFIG[tier];
                const ranges: Record<string, string> = { SS: '92+', S: '80–91', A: '65–79', B: '50–64', C: '〜49' };
                return (
                  <tr key={tier} className={i < TIER_ORDER.length - 1 ? 'border-b border-white/[0.06]' : ''}>
                    <td className="px-4 py-3">
                      <span className="font-heading font-black text-base" style={{ color: cfg.color }}>{tier}</span>
                    </td>
                    <td className="px-4 py-3 text-text-muted text-[0.82rem]">{cfg.desc}</td>
                    <td className="px-4 py-3 font-mono text-[0.72rem] text-text-dim hidden sm:table-cell">{ranges[tier]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mx-4 sm:mx-10 mb-12 sm:mb-20 max-w-[1020px] lg:mx-auto p-6 sm:p-10 rounded-[20px] border border-cyan/20 bg-cyan/[0.04] flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="absolute -top-[60px] -right-[60px] w-[240px] h-[240px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />
        <div className="relative z-10 text-center sm:text-left">
          <h3 className="font-heading text-[1.1rem] sm:text-[1.25rem] font-bold tracking-tight mb-1.5">
            自分のエリアで使える<span className="gradient-text">S回線を確認</span>
          </h3>
          <p className="text-[0.85rem] text-text-muted">
            都道府県を選ぶだけ。対応エリアの上位回線をすぐに確認できます。
          </p>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
          <Link
            href="/area"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-cyan/30 text-cyan font-heading font-bold text-[0.9rem] hover:bg-cyan/10 transition-all w-full sm:w-auto"
          >
            エリアで絞り込む <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/diagnosis"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-cyan to-emerald text-black font-heading font-bold text-[0.9rem] hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,230,118,0.5)] transition-all w-full sm:w-auto"
          >
            <Play className="w-4 h-4 fill-black" />
            無料診断スタート
          </Link>
        </div>
      </div>

    </div>
  );
}
