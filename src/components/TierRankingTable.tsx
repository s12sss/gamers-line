import Link from 'next/link';
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
  au_hikari_10g: 'KDDIが独自に敷設した光回線の10Gプラン。NTT網と異なる独自インフラのため安定性が高く、auスマホユーザーはスマホセット割で月額を大幅に圧縮できる。',
  au_hikari_1g: 'KDDI独自インフラの1Gプラン。auまたはUQモバイルとのセット割で実質月額を下げやすく、コスパと安定性のバランスが取れた回線。独自回線なので夜間でも品質が落ちにくい。',
  docomo_hikari_10g: 'NTTフレッツ光コラボの10Gプラン。ドコモユーザーはスマホ割（最大1,100円/月）が適用可能。光コラボのため混雑時の安定性はauやNURO系より劣るが、全国どこでも使えるのが強み。',
  docomo_hikari_1g: 'フレッツ光コラボのスタンダードプラン。ドコモスマホ割が使えるため、ドコモユーザーの実質負担は抑えやすい。ゲーム専用帯域はないが、コスパ優先ならドコモ系は整理しやすい選択肢。',
  softbank_hikari_10g: 'ソフトバンク系フレッツ光コラボの10Gプラン。おうち割光セットでSoftBank・ワイモバイルのスマホ代が毎月最大1,100円割引。平均Ping15msは光コラボ系の中では優秀な水準。',
  softbank_hikari_1g: 'ソフトバンク光の標準プラン。スマホ割の適用でキャリアまとめ割のコスパが高い。光コラボ系のため混雑時間帯はPingが上がることもあるが、割引込みの実質月額は競争力がある。',
  biglobe_hikari_10g: 'フレッツ光コラボの10Gプラン。大手ISPの安定した運用実績があり、サポート体制も充実。au・UQモバイルとのセット割（月最大1,100円）も対応。対戦ゲームよりも総合的な快適さ重視向け。',
  biglobe_hikari_1g: 'ビッグローブ光の1Gプラン。キャリア系の中では料金が抑えめで、サポートの手厚さが強み。ゲームよりも動画視聴・テレワーク中心なら十分な性能。Ping値は光コラボ標準レベル。',
  commufa_hikari_10g: '中部電力グループが東海エリア（愛知・岐阜・三重・静岡・長野）限定で展開する独自回線の10Gプラン。エリア内では平均Ping14msを安定維持。専用インフラによる混雑耐性が高い。',
  commufa_hikari_1g: 'コミュファ光の1Gプラン（東海・長野エリア限定）。独自回線ゆえの安定性と料金の安さが特徴。エリア内ならNURO光と並ぶ低Ping・高安定の選択肢で、5,170円/月はコスパ優秀。',
  pikara_hikari_10g: '四国電力グループが四国エリア限定で展開する独自回線（10G）。NTT망を使わない独自インフラで夜間の安定性が高い。四国エリアではトップクラスのゲーミング回線候補。',
  pikara_hikari_1g: 'ピカラ光の1Gプラン（四国限定）。独自インフラによる安定性が強みで、料金もエリア内では競争力がある。ゲーム用途では同エリアのNTT系コラボより優先して検討したい。',
  megaegg_hikari_10g: '中国電力グループが中国エリア（広島・岡山・山口・島根・鳥取）限定で提供する独自回線（10G）。エリア内では安定した通信品質が期待できるが、Ping値は他の独自回線より若干高め。',
  megaegg_hikari_1g: 'メガ・エッグの1Gプラン（中国エリア限定）。独自回線の安定性はあるが、Ping値は中国エリアの地理的特性もありやや高め。一般用途・配信メインなら十分な選択肢。',
  eo_hikari_10g: '関西電力グループが関西・福井限定で展開する独自回線の10Gプラン。NTT망を使わない設計で夜間でもPingが安定しやすく、auスマホユーザーへのセット割引も対応。',
  eo_hikari_1g: 'eo光の1Gプラン（関西・福井限定）。独自回線でありながらコスパが高く、1Gプランでも夜間Ping一桁の報告が多い。au・UQ・mineoユーザーはさらなる割引が適用可能。',
  bbiq_hikari_10g: '九州電力グループが九州エリア限定で提供する独自回線（10G）。エリア内では安定した品質だが、Ping値はNURO光やコミュファ光と比べると高め。九州エリアでの選択肢として有力。',
  bbiq_hikari_1g: 'BBIQの1Gプラン（九州限定）。独自インフラの安定性があり、エリア内では信頼できる選択肢。Pingはやや高めなため、FPS重視よりも総合的な快適さ重視の方に向いている。',
};

function getIspNote(isp: RankedISP, prefName?: string) {
  const specific = ISP_NOTES[isp.id];
  if (specific) {
    const areaPrefix = prefName ? `${prefName}での利用を検討中なら、` : '';
    return `${areaPrefix}${specific}`;
  }
  const price = `${formatYen(isp.monthlyFee)}/月`;
  const area = prefName ? `${prefName}で` : '';
  if (isp.tier === 'S') return `${isp.ping}ms前後の低Pingと混雑耐性が強みです。${area}対戦ゲームの体感を重視するなら最優先で検討したい回線です。月額は${price}。`;
  if (isp.tier === 'A') return `低Pingと実測速度のバランスに優れた回線です。${area}エリアや建物条件が合えばメイン回線として検討しやすい水準です。月額は${price}。`;
  if (isp.tier === 'B') return `ゲーム用途でも利用できる水準です。${area}夜間の混雑やマンション配線で体感が変わるため、建物条件の確認をおすすめします。月額は${price}。`;
  return `一般的な用途では候補になりますが、${area}ゲーム目的では上位Tierを優先して比較したい回線です。月額は${price}。`;
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

function TierExplanation({ tier, isps, prefName }: { tier: TierLabel; isps: RankedISP[]; prefName?: string }) {
  if (isps.length === 0) return null;
  const cfg = TIER_CONFIG[tier];
  return (
    <section className="rounded-[14px] border border-white/10 bg-white/[0.02] p-4 sm:p-6">
      <div className="mb-4">
        <h3 className="font-heading text-xl font-bold text-white">
          <span className="text-2xl" style={{ color: cfg.labelBg }}>{tier}</span> Tier の回線{prefName ? `（${prefName}）` : ''}
        </h3>
        <p className="mt-2 text-sm leading-[1.7] text-text-muted">{cfg.desc}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {isps.map(isp => (
          <article key={isp.id} className="rounded-[10px] border border-white/[0.08] bg-[#060a0f]/80 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-heading text-base font-bold text-white">{isp.name}</h4>
                <div className="mt-1 text-[0.72rem] text-text-dim">{isp.providerName}</div>
              </div>
              <div className="flex shrink-0 items-center gap-4">
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
            <p className="mt-3 text-[0.86rem] leading-[1.75] text-text-muted">{getIspNote(isp, prefName)}</p>
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

export default function TierRankingTable({
  regionId,
  prefName,
  showExplanation = false,
}: {
  regionId?: string;
  prefName?: string;
  showExplanation?: boolean;
}) {
  const isps = getRankedISPs(regionId);
  const grouped = groupByTier(isps);
  return (
    <div>
      <div className="space-y-1.5">
        {TIER_ORDER.map(tier => (
          <TierRow key={tier} tier={tier} isps={grouped[tier]} />
        ))}
      </div>
      {showExplanation && (
        <div className="mt-10 space-y-5">
          {TIER_ORDER.map(tier => (
            <TierExplanation key={tier} tier={tier} isps={grouped[tier]} prefName={prefName} />
          ))}
        </div>
      )}
    </div>
  );
}
