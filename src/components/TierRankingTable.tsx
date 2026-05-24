import Link from 'next/link';
import { getRankedISPs, groupByTier, TIER_CONFIG, TIER_ORDER } from '@/utils/tierRanking';
import type { RankedISP, TierLabel } from '@/utils/tierRanking';

function formatYen(value: number) {
  return `¥${value.toLocaleString()}`;
}

function shortPlanName(name: string) {
  return name.replace(' 光', '').replace('ひかり', 'ひかり');
}

function getIspNote(isp: RankedISP, prefName?: string) {
  const price = `${formatYen(isp.monthlyFee)}/月`;
  const area = prefName ? `${prefName}で` : '';
  if (isp.tier === 'S') {
    return `${isp.ping}ms前後の低Pingと、混雑時間帯に崩れにくい安定感が強みです。${area}対戦ゲームの体感を重視するなら最優先で検討したい回線です。月額は${price}。`;
  }
  if (isp.tier === 'A') {
    return `低Pingと実測速度のバランスに優れた回線です。${area}エリアや建物条件が合えばメイン回線として検討しやすい水準です。月額は${price}。`;
  }
  if (isp.tier === 'B') {
    return `ゲーム用途でも利用できる水準です。${area}夜間の混雑やマンション配線で体感が変わるため、契約前に建物条件の確認をおすすめします。月額は${price}。`;
  }
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
