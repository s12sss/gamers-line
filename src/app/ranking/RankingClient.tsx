'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Gauge, MapPin, ShieldCheck, Signal, SlidersHorizontal, Wallet } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Tooltip from '@/components/Tooltip';
import { PREFECTURES } from '@/utils/prefectureData';
import { getRankedISPs, groupByTier, TIER_CONFIG, TIER_ORDER } from '@/utils/tierRanking';
import type { RankedISP, TierLabel } from '@/utils/tierRanking';
import AffiliateLink from '@/components/AffiliateLink';

function formatYen(value: number) {
  return `¥${value.toLocaleString()}`;
}

function shortPlanName(name: string) {
  return name.replace(' 光', '').replace('ひかり', 'ひかり');
}

const ISP_NOTES: Record<string, string> = {
  nuro_hikari_10g: 'ソニー系の独自ダークファイバー網を使った10Gプラン。NTT回線と物理的に異なる経路のため夜間でも混雑しにくく、平均Ping11msは国内トップクラス。ソニー製ルーター無料付属。',
  nuro_hikari_2g: 'NURO光のスタンダードプラン（最大2Gbps）。10Gより月額を抑えつつ独自ダークファイバー網の安定性はそのまま。ソフトバンク・ワイモバイルユーザーはスマホ代割引も適用可。',
  gamewith_hikari_10g: 'ゲーム特化プロバイダが提供する専用帯域の10Gプラン。一般ユーザーと帯域を共有しない設計で夜間の安定性が高い。ゲームに必要な通信を優先するトラフィック制御を採用。',
  gamewith_hikari_1g: 'GameWith運営のゲーム特化プロバイダ（1Gプラン）。専用帯域で夜間でもPingが安定しやすく、全国対応で利用しやすい。フレッツ光コラボ系の中では信頼性が高い選択肢。',
  'hi-ho_with_games_10g': 'ゲーマー向けに特化した専用帯域の10Gプラン。ピーク時でも帯域が保証されやすく、10G回線の中ではPing値が安定している。IPV6対応でオンラインゲームの遅延軽減にも有効。',
  'hi-ho_with_games_1g': 'hi-hoのゲーミング特化プラン（1G）。専用帯域による安定性が強みで、全国どこでも申し込めるのが使いやすい。夜間のPing悪化を避けたい場合の選択肢として有力。',
  au_hikari_10g: 'KDDIが独自に敷設した光回線の10Gプラン。NTT网と異なる独自インフラのため安定性が高く、auスマホユーザーはスマホセット割で月額を大幅に圧縮できる。',
  au_hikari_1g: 'KDDI独自インフラの1Gプラン。auまたはUQモバイルとのセット割で実質月額を下げやすく、コスパと安定性のバランスが取れた回線。独自回線なので夜間でも品質が落ちにくい。',
  docomo_hikari_10g: 'NTTフレッツ光コラボの10Gプラン。ドコモユーザーはスマホ割（最大1,100円/月）が適用可能。光コラボのため混雑時の安定性はauやNURO系より劣るが、全国どこでも使えるのが強み。',
  docomo_hikari_1g: 'フレッツ光コラボのスタンダードプラン。ドコモスマホ割が使えるため、ドコモユーザーの実質負担は抑えやすい。コスパ優先でドコモまとめ割を活用したい方向け。',
  softbank_hikari_10g: 'ソフトバンク系フレッツ光コラボの10Gプラン。おうち割光セットでSoftBank・ワイモバイルのスマホ代が毎月最大1,100円割引。平均Ping15msは光コラボ系の中では優秀な水準。',
  softbank_hikari_1g: 'ソフトバンク光の標準プラン。スマホ割の適用でキャリアまとめ割のコスパが高い。光コラボ系のため混雑時間帯はPingが上がることもあるが、割引込みの実質月額は競争力がある。',
  biglobe_hikari_10g: 'フレッツ光コラボの10Gプラン。大手ISPの安定した運用実績があり、au・UQモバイルとのセット割（月最大1,100円）にも対応。対戦ゲームよりも総合的な快適さ重視向け。',
  biglobe_hikari_1g: 'ビッグローブ光の1Gプラン。キャリア系の中では料金が抑えめで、サポートの手厚さが強み。ゲームより動画・テレワーク中心ならコスパよく使える。',
  commufa_hikari_10g: '中部電力グループが東海エリア（愛知・岐阜・三重・静岡・長野）限定で展開する独自回線の10Gプラン。エリア内では平均Ping14msを安定維持。専用インフラによる混雑耐性が高い。',
  commufa_hikari_1g: 'コミュファ光の1Gプラン（東海・長野エリア限定）。独自回線の安定性と料金の安さが特徴。エリア内ならNURO光と並ぶ低Ping・高安定の選択肢で、月額5,170円はコスパ優秀。',
  pikara_hikari_10g: '四国電力グループが四国エリア限定で展開する独自回線（10G）。NTT網を使わない独自インフラで夜間の安定性が高い。四国エリアではトップクラスのゲーミング回線候補。',
  pikara_hikari_1g: 'ピカラ光の1Gプラン（四国限定）。独自インフラによる安定性が強みで料金も競争力がある。四国エリアのゲーム用途ではNTT系コラボより優先して検討したい。',
  megaegg_hikari_10g: '中国電力グループが中国エリア（広島・岡山・山口・島根・鳥取）限定で提供する独自回線（10G）。エリア内では安定した通信品質が期待できる。',
  megaegg_hikari_1g: 'メガ・エッグの1Gプラン（中国エリア限定）。独自回線の安定性はあるが、Ping値は他の独自回線より若干高め。一般用途・配信メインなら十分な選択肢。',
  eo_hikari_10g: '関西電力グループが関西・福井限定で展開する独自回線の10Gプラン。NTT網を使わない設計で夜間でもPingが安定しやすく、auスマホユーザーへのセット割引も対応。',
  eo_hikari_1g: 'eo光の1Gプラン（関西・福井限定）。独自回線でありながらコスパが高く、1Gプランでも夜間Ping一桁の報告が多い。au・UQ・mineoユーザーはさらなる割引が適用可能。',
  bbiq_hikari_10g: '九州電力グループが九州エリア限定で提供する独自回線（10G）。エリア内では安定した品質だが、Ping値はNURO光やコミュファ光と比べると高め。九州エリアでの有力な選択肢。',
  bbiq_hikari_1g: 'BBIQの1Gプラン（九州限定）。独自インフラの安定性があり、エリア内では信頼できる選択肢。Pingはやや高めなため、FPS重視よりも総合的な快適さ重視の方に向いている。',
};

function getIspNote(isp: RankedISP) {
  const specific = ISP_NOTES[isp.id];
  if (specific) return specific;
  const price = `${formatYen(isp.monthlyFee)}/月`;
  if (isp.tier === 'S') return `${isp.ping}ms前後の低Pingと混雑耐性が強みです。対戦ゲームの体感を重視するなら最優先で検討したい回線です。月額は${price}。`;
  if (isp.tier === 'A') return `低Pingと実測速度のバランスに優れた回線です。エリアや建物条件が合えばメイン回線として検討しやすい水準です。月額は${price}。`;
  if (isp.tier === 'B') return `ゲーム用途でも利用できる水準です。夜間の混雑やマンション配線で体感が変わるため、建物条件の確認をおすすめします。月額は${price}。`;
  return `一般的な用途では候補になりますが、ゲーム目的では上位Tierを優先して比較したい回線です。月額は${price}。`;
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
      <div className="overflow-x-auto">
        <div className="flex min-h-[138px] gap-3 bg-[#151715] p-3 md:flex-wrap md:p-4">
          {isps.length > 0 ? (
            isps.map(isp => <TierCard key={isp.id} isp={isp} tierColor={cfg.labelBg} />)
          ) : (
            <div className="flex items-center text-sm text-text-dim">この条件では該当なし</div>
          )}
        </div>
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
              <div className="flex shrink-0 items-start gap-4">
                <div className="text-right">
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/40">Score</div>
                  <div className="font-mono text-[1.4rem] font-black leading-none text-cyan">{isp.score}</div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <AffiliateLink
                    href={isp.affiliateLink}
                    ispName={isp.name}
                    ispId={isp.id}
                    className="inline-flex items-center justify-center gap-1 rounded-[8px] bg-cyan px-4 py-2 text-[0.76rem] font-bold text-black transition-all hover:bg-cyan/80 hover:shadow-[0_0_16px_rgba(0,229,255,0.4)]"
                  >
                    申込む
                  </AffiliateLink>
                  <Link href={isp.detailLink} className="text-center text-[0.68rem] text-white/40 hover:text-white/70 transition-colors">
                    詳細を見る
                  </Link>
                </div>
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
                <Tooltip text="オンラインゲームで重要な応答速度。低いほどラグを感じにくくなります。">Ping値</Tooltip>・<Tooltip text="夜間帯や混雑時でも通信品質を維持しやすいかを評価します。">安定性</Tooltip>・<Tooltip text="実測速度と最大速度をもとに、配信や大容量DLへの余裕を確認します。">速度</Tooltip>・料金の4軸でゲーマー目線に評価。<br className="hidden sm:block" />
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
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {([
              { icon: Gauge,      name: 'Ping',  desc: '応答速度。低いほどラグが少ない',    color: 'text-emerald' },
              { icon: ShieldCheck,name: '安定性', desc: '夜間・混雑時の通信品質維持',       color: 'text-cyan'    },
              { icon: Signal,     name: '速度',   desc: '実測ダウンロード速度の高さ',       color: 'text-cyan'    },
              { icon: Wallet,     name: '料金',   desc: '月額の安さ・コスパ',              color: 'text-white/60'},
            ] as const).map(item => (
              <div key={item.name} className="flex items-start gap-2 rounded-[8px] border border-white/[0.08] bg-white/[0.02] px-3 py-2.5">
                <item.icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${item.color}`} />
                <div>
                  <div className={`text-[0.72rem] font-bold ${item.color}`}>{item.name}</div>
                  <div className="text-[0.68rem] leading-[1.5] text-white/45">{item.desc}</div>
                </div>
              </div>
            ))}
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
