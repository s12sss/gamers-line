'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ChevronRight, Gauge, MapPin, ShieldCheck, Signal, SlidersHorizontal } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { PREFECTURES } from '@/utils/prefectureData';
import { getRankedISPs, groupByTier, TIER_CONFIG, TIER_ORDER } from '@/utils/tierRanking';
import type { RankedISP, TierLabel } from '@/utils/tierRanking';

function formatYen(value: number) {
  return `¥${value.toLocaleString()}`;
}

function shortPlanName(name: string) {
  return name.replace(' 光', '').replace('ひかり', 'ひかり');
}

function getIspNote(isp: RankedISP) {
  const price = `${formatYen(isp.monthlyFee)}/月`;
  if (isp.tier === 'S') {
    return `${isp.ping}ms前後の低Pingと、混雑時間帯に崩れにくい安定感が強みです。月額は${price}。料金よりも対戦ゲームでの体感を重視する場合に候補になります。`;
  }
  if (isp.tier === 'A') {
    return `低Pingと実測速度のバランスに優れた回線です。エリアや建物条件が合えば、メイン回線として検討しやすい水準です。月額は${price}。`;
  }
  if (isp.tier === 'B') {
    return `ゲーム用途でも利用できる水準です。ただし夜間の混雑やマンション配線で体感が変わるため、契約前に建物条件の確認が必要です。月額は${price}。`;
  }
  return `一般的な用途では候補になりますが、ゲーム目的では上位Tierを優先して比較したい回線です。月額は${price}。速度や安定性は住環境によって差が出ます。`;
}

function TierCard({ isp, tierColor }: { isp: RankedISP; tierColor: string }) {
  return (
    <Link
      href={isp.detailLink}
      className="group relative min-w-[210px] max-w-[232px] overflow-hidden rounded-[10px] border border-white/14 bg-[#0b0f12] p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/40 hover:bg-[#10161a]"
    >
      <div className="absolute inset-x-0 top-0 h-[3px] opacity-90" style={{ backgroundColor: tierColor }} />
      <div className="flex min-h-[44px] items-start justify-between gap-3">
        <div className="font-heading text-[0.92rem] font-bold leading-[1.35] text-white transition-colors group-hover:text-cyan">
          {shortPlanName(isp.name)}
        </div>
        <div className="shrink-0 text-right">
          <div className="font-mono text-[0.58rem] uppercase tracking-[0.08em] text-white/70">Score</div>
          <div className="font-mono text-[0.86rem] font-black text-cyan">{isp.score}</div>
        </div>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full" style={{ width: `${isp.score}%`, backgroundColor: tierColor }} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <div className="rounded-[7px] bg-white/[0.075] px-2 py-1.5">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.08em] text-white/60">Ping</div>
          <div className="font-mono text-[0.78rem] font-bold text-emerald">{isp.ping}ms</div>
        </div>
        <div className="rounded-[7px] bg-white/[0.075] px-2 py-1.5">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.08em] text-white/60">安定</div>
          <div className="font-mono text-[0.78rem] font-bold text-white">{isp.stabilityRating}/5</div>
        </div>
        <div className="rounded-[7px] bg-white/[0.075] px-2 py-1.5">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.08em] text-white/60">速度</div>
          <div className="font-mono text-[0.78rem] font-bold text-cyan">{isp.speedRating}/5</div>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between border-t border-white/[0.06] pt-2">
        <span className="text-[0.7rem] font-medium text-white/60">月額目安</span>
        <span className="font-mono text-[0.8rem] font-bold text-white">{formatYen(isp.monthlyFee)}</span>
      </div>
    </Link>
  );
}

function TierRow({ tier, isps }: { tier: TierLabel; isps: RankedISP[] }) {
  const cfg = TIER_CONFIG[tier];

  return (
    <section className="grid overflow-hidden rounded-[2px] border border-black bg-[#151715] md:grid-cols-[92px_1fr]">
      <div className="flex items-center justify-center border-b border-black px-4 py-4 md:border-b-0 md:border-r" style={{ backgroundColor: cfg.labelBg }}>
        <div className="font-heading text-[2rem] font-black leading-none" style={{ color: cfg.color }}>{tier}</div>
      </div>
      <div className="grid min-h-[138px] grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-3 bg-[#151715] p-3 md:p-4">
        {isps.length > 0 ? (
          isps.map(isp => <TierCard key={isp.id} isp={isp} tierColor={cfg.labelBg} />)
        ) : (
          <div className="flex items-center text-sm text-text-dim">この条件では該当なし</div>
        )}
      </div>
    </section>
  );
}

function TierExplanation({ tier, isps }: { tier: TierLabel; isps: RankedISP[] }) {
  if (isps.length === 0) return null;
  const cfg = TIER_CONFIG[tier];

  return (
    <section className="rounded-[14px] border border-white/10 bg-white/[0.02] p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-heading text-xl font-bold text-white">
              <span className="text-2xl" style={{ color: cfg.labelBg }}>{tier}</span> Tier の回線
            </h2>
          </div>
          <p className="mt-2 text-sm leading-[1.7] text-text-muted">{cfg.desc}</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {isps.map(isp => (
          <article key={isp.id} className="rounded-[10px] border border-white/[0.08] bg-[#060a0f]/80 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-heading text-base font-bold text-white">{isp.name}</h3>
                <div className="mt-1 text-[0.72rem] text-text-dim">{isp.providerName}</div>
              </div>
              <div className="flex shrink-0 items-center gap-5">
                <div className="text-right">
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/40">Score</div>
                  <div className="font-mono text-[1.4rem] font-black leading-none text-cyan">{isp.score}</div>
                </div>
                <Link href={isp.detailLink} className="inline-flex items-center gap-1 rounded-[8px] border border-cyan/30 bg-cyan/[0.08] px-3 py-1.5 text-[0.72rem] font-bold text-cyan transition-all hover:bg-cyan/20 hover:border-cyan/60">
                  詳細 →
                </Link>
              </div>
            </div>
            <p className="mt-3 text-[0.86rem] leading-[1.75] text-text-muted">{getIspNote(isp)}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="rounded-[8px] bg-white/[0.06] p-2">
                <div className="text-[0.65rem] font-medium text-white/50">Ping</div>
                <div className="font-mono text-sm font-bold text-emerald">{isp.ping}ms</div>
              </div>
              <div className="rounded-[8px] bg-white/[0.06] p-2">
                <div className="text-[0.65rem] font-medium text-white/50">安定性</div>
                <div className="font-mono text-sm font-bold text-white">{isp.stabilityRating}/5</div>
              </div>
              <div className="rounded-[8px] bg-white/[0.06] p-2">
                <div className="text-[0.65rem] font-medium text-white/50">速度評価</div>
                <div className="font-mono text-sm font-bold text-cyan">{isp.speedRating}/5</div>
              </div>
              <div className="rounded-[8px] bg-white/[0.06] p-2">
                <div className="text-[0.65rem] font-medium text-white/50">月額</div>
                <div className="font-mono text-sm font-bold text-white/85">{formatYen(isp.monthlyFee)}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function RankingClient() {
  const [prefectureId, setPrefectureId] = useState('');
  const selectedPrefecture = PREFECTURES.find(pref => pref.id === prefectureId);
  const regionFilter = selectedPrefecture?.regionId;

  const rankedISPs = useMemo(() => getRankedISPs(regionFilter), [regionFilter]);
  const grouped = useMemo(() => groupByTier(rankedISPs), [rankedISPs]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative z-10 border-b border-white/10 px-4 py-10 sm:px-10 sm:py-14">
        <div className="mx-auto max-w-[1180px]">
          <Breadcrumbs items={[
            { name: 'HOME', path: '/' },
            { name: '回線ランキング', path: '/ranking' },
          ]} />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4">
                RANKING
              </div>
              <h1 className="font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-4">
                ゲーミング回線<br />
                <span className="gradient-text">最強ランキング</span>
              </h1>
              <p className="text-sm text-text-muted max-w-[500px] leading-[1.7]">
                Ping値・安定性・速度・料金の4軸でゲーマー目線に評価。<br className="hidden sm:block" />
                総合スコアでS〜Cにランク化しています。
              </p>
            </div>

            <div className="rounded-[14px] border border-cyan/20 bg-cyan/[0.04] p-5">
              <label htmlFor="prefecture" className="mb-3 flex items-center gap-2 text-[0.8rem] font-bold text-cyan">
                <MapPin className="h-4 w-4" /> 都道府県で絞り込み
              </label>
              <select
                id="prefecture"
                value={prefectureId}
                onChange={event => setPrefectureId(event.target.value)}
                className="h-12 w-full rounded-[10px] border border-white/20 bg-background px-3 text-sm font-bold text-white outline-none transition-colors focus:border-cyan/60"
              >
                <option value="">全国で見る</option>
                {PREFECTURES.map(pref => (
                  <option key={pref.id} value={pref.id}>{pref.name}</option>
                ))}
              </select>
              <p className="mt-3 text-[0.78rem] leading-[1.7] text-white/60">
                {selectedPrefecture ? `${selectedPrefecture.name}で提供対象となる回線を表示しています。` : '都道府県を選ぶと、提供対象外の回線を除外できます。'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1180px] px-4 py-10 sm:px-10 sm:py-14">
        <section className="mb-8 grid gap-3 md:grid-cols-3">
          {[
            { icon: Gauge, title: 'Ping', body: 'オンラインゲームで重要な応答速度。低いほどラグを感じにくくなります。' },
            { icon: ShieldCheck, title: '安定性', body: '夜間帯や混雑時でも通信品質を維持しやすいかを評価します。' },
            { icon: Signal, title: '通信速度', body: '実測速度と最大速度をもとに、配信や大容量DLへの余裕を確認します。' },
          ].map(item => (
            <div key={item.title} className="rounded-[12px] border border-white/10 bg-white/[0.025] p-4">
              <item.icon className="mb-3 h-5 w-5 text-cyan" />
              <h2 className="font-heading text-base font-bold text-white">{item.title}</h2>
              <p className="mt-1 text-[0.82rem] leading-[1.7] text-text-muted">{item.body}</p>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <div className="font-mono text-[0.68rem] tracking-[0.16em] text-cyan">TIER BOARD</div>
              <h2 className="mt-1 font-heading text-2xl font-bold text-white">回線Tier表</h2>
            </div>
            <div className="hidden items-center gap-2 text-[0.78rem] text-text-dim sm:flex">
              <SlidersHorizontal className="h-4 w-4" />
              {rankedISPs.length}件表示
            </div>
          </div>
          <p className="mb-4 rounded-[8px] border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.78rem] leading-[1.8] text-text-muted">
            ※表示料金は戸建ての標準月額です。マンションや各社キャンペーン適用で実際の負担額は変わります。<br />
            ※総合スコアはGamer&apos;s Lineの独自算出値（Ping値45%・安定性25%・速度15%・料金15%）です。
          </p>
          <div className="space-y-3">
            {TIER_ORDER.map(tier => (
              <TierRow key={tier} tier={tier} isps={grouped[tier]} />
            ))}
          </div>
        </section>

        <div className="space-y-5">
          {TIER_ORDER.map(tier => (
            <TierExplanation key={tier} tier={tier} isps={grouped[tier]} />
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[16px] border border-cyan/20 bg-cyan/[0.04] px-6 py-5 sm:px-8 sm:py-6">
          <div>
            <p className="font-heading font-bold text-white">どれが自分に合う？<span className="gradient-text">30秒で分かります</span></p>
            <p className="mt-1 text-[0.82rem] text-text-muted">住居タイプ・キャリア・重視するポイントを入力するだけ。完全無料・登録不要。</p>
          </div>
          <Link
            href="/diagnosis"
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-emerald px-6 py-3 font-heading font-bold text-black text-[0.9rem] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,230,118,0.4)] transition-all w-full sm:w-auto"
          >
            ▶ 無料診断スタート
          </Link>
        </div>
      </main>
    </div>
  );
}
