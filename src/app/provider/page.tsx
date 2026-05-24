"use client";

import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";
import ispsData from "@/data/isps.json";
import Tooltip from "@/components/Tooltip";
import { PROVIDER_DETAILS } from "@/data/providerDetails";
import AffiliateLink from "@/components/AffiliateLink";

type ProviderCard = {
  key: string;
  slug: string;
  name: string;
  providerName: string;
  representative: any;
  plans: any[];
  pingText: string;
  feeText: string;
  speedText: string;
  bestPing: number;
  has10G: boolean;
  hasStandard: boolean;
  areaNote: string | null;
  description: string;
  pros: string[];
  cons: string[];
};

const getProviderKey = (isp: any) => isp.detailLink || `/provider/${isp.id.split('_')[0]}`;

const getProviderSlug = (key: string) => key.replace(/^\/provider\//, '');

const getBaseProviderName = (name: string) => name.replace(/\s*\((?:10G|2G|1G)\)\s*$/i, '');

const formatPlanLabel = (speed: number) => `${speed}G`;

const formatYen = (value: number) => `¥${value.toLocaleString()}`;

const formatCarrier = (carrier: string) => {
  if (carrier === 'SoftBank') return 'SoftBank';
  if (carrier === 'au') return 'au';
  if (carrier === 'docomo') return 'docomo';
  return carrier;
};

const formatNumberRange = (values: number[], suffix = '') => {
  const sorted = Array.from(new Set(values)).sort((a, b) => a - b);
  if (sorted.length === 0) return '—';
  if (sorted.length === 1) return `${sorted[0]}${suffix}`;
  return `${sorted[0]}〜${sorted[sorted.length - 1]}${suffix}`;
};

const formatYenRange = (values: number[]) => {
  const sorted = Array.from(new Set(values)).sort((a, b) => a - b);
  if (sorted.length === 0) return '—';
  if (sorted.length === 1) return formatYen(sorted[0]);
  return `${formatYen(sorted[0])}〜${formatYen(sorted[sorted.length - 1])}`;
};

const getAreaNote = (key: string, plans: any[]) => {
  const has10G = plans.some(plan => plan.max_speed_gbps >= 10);
  if (!has10G) return null;
  if (key.includes('/gamewith')) return '10Gはフレッツ光クロス提供エリアのみ';
  if (key.includes('/nuro')) return '10Gは提供エリア・建物設備の確認が必要';
  if (key.includes('/au')) return '10Gは一部エリアの戸建て中心';
  return '10Gは提供エリア・建物設備により利用できない場合あり';
};

const getMergedCopy = (key: string, representative: any, plans: any[]) => {
  if (plans.length === 1) {
    return {
      description: representative.description,
      pros: representative.pros || [],
      cons: representative.cons || [],
    };
  }

  if (key.includes('/nuro')) {
    return {
      description: 'NURO光は2G/10Gを選べる独自回線。低PingとSoftBankスマホ割が強みで、コスパ重視なら2G、配信や家族利用まで余裕を見たいなら10Gが候補です。',
      pros: [
        '平均11〜12msの低Ping',
        '2G/10Gから用途で選べる',
        'SoftBankスマホとのセット割が使える',
      ],
      cons: [
        'VDSLマンション不可',
        '提供エリア・建物設備の確認が必要',
        '10Gはエリアや設備により申し込めない場合がある',
      ],
    };
  }

  if (key.includes('/gamewith')) {
    return {
      description: 'GameWith光はゲーム向けの専用帯域を使える回線。標準的に使うなら1G、配信・大容量DL・家族利用まで見たいなら10Gが候補です。',
      pros: [
        'ゲーム向け専用帯域で混雑に強い',
        '1G/10Gから用途で選べる',
        'VDSLマンションでも候補に入る',
      ],
      cons: [
        'スマホとのセット割がない',
        '月額料金はやや高め',
        '10Gはフレッツ光クロス提供エリアのみ',
      ],
    };
  }

  return {
    description: representative.description,
    pros: representative.pros || [],
    cons: representative.cons || [],
  };
};

const buildProviderCards = (items: any[]): ProviderCard[] => {
  const grouped = new Map<string, any[]>();

  items.forEach((isp) => {
    const key = getProviderKey(isp);
    grouped.set(key, [...(grouped.get(key) || []), isp]);
  });

  return Array.from(grouped.entries()).map(([key, plans]) => {
    const sortedPlans = [...plans].sort((a, b) => a.max_speed_gbps - b.max_speed_gbps);
    const fastestPlan = [...plans].sort((a, b) => b.max_speed_gbps - a.max_speed_gbps)[0];
    const representative = fastestPlan || plans[0];
    const mergedCopy = getMergedCopy(key, representative, sortedPlans);

    return {
      key,
      slug: getProviderSlug(key),
      name: getBaseProviderName(representative.name),
      providerName: representative.providerName,
      representative,
      plans: sortedPlans,
      pingText: formatNumberRange(plans.map(plan => plan.avg_ping_ms), ' ms'),
      feeText: formatYenRange(plans.map(plan => plan.actual_monthly_fee_jpy)),
      speedText: sortedPlans.map(plan => formatPlanLabel(plan.max_speed_gbps)).join(' / '),
      bestPing: Math.min(...plans.map(plan => plan.avg_ping_ms)),
      has10G: plans.some(plan => plan.max_speed_gbps >= 10),
      hasStandard: plans.some(plan => plan.max_speed_gbps < 10),
      areaNote: getAreaNote(key, plans),
      ...mergedCopy,
    };
  });
};


export default function ProviderPage() {
  const providerCards = buildProviderCards((ispsData as any[]).filter((isp: any) => !isp.hidden));
  const filteredCards = providerCards;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Page Header */}
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 sm:px-10 pt-10 pb-8 sm:pt-16 sm:pb-12 overflow-hidden">
        <div className="absolute -top-[60px] -right-[80px] w-[400px] h-[300px] bg-[radial-gradient(ellipse,rgba(0,229,255,0.08),transparent_70%)] blur-[40px] pointer-events-none" />
        <div className="relative z-10 font-mono text-[0.7rem] text-cyan tracking-[0.2em] uppercase opacity-70 mb-4">
          PROVIDER FEATURE
        </div>
        <h1 className="relative z-10 font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-4">
          光回線別<br />
          <span className="gradient-text">徹底特集</span>
        </h1>
        <p className="text-sm text-text-muted max-w-[500px] leading-[1.7]">
          各回線の特徴・強み・弱みをゲーマー目線で深堀り。<br className="hidden sm:block" />
          申し込み前に必ず確認すべき情報を網羅。
        </p>
      </div>

      <div className="max-w-[1100px] mx-auto w-full px-4 sm:px-10">
        <div className="h-px w-full bg-white/10" />
      </div>

      {/* ISP List Section */}
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 sm:px-10 pt-10 sm:pt-12 pb-24 flex flex-col gap-8">
        
        <div className="flex flex-col gap-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">主要プロバイダ詳細一覧</h2>
        </div>
        
        <div className="flex items-center justify-end mb-4">
          <span className="text-[0.65rem] sm:text-[0.7rem] text-white/50 border border-white/10 px-3 py-1.5 rounded-md bg-white/5 font-mono tracking-wider">
            ※表示料金は「戸建て」の標準月額です。マンションにお住まいの場合や、各社のキャンペーン適用で実際の負担額はさらに下がります。
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {filteredCards.map((card, index) => {
            const isp = card.representative;
            const isFirst = index === 0;
            const borderClass = isFirst ? 'border-cyan/25' : 'border-white/10';
            const bgClass = isFirst ? 'bg-cyan/[0.03]' : 'bg-white/[0.035]';
            const shadowClass = isFirst ? 'hover:shadow-[0_24px_64px_rgba(0,0,0,0.4),0_0_30px_rgba(0,229,255,0.07)]' : 'hover:shadow-[0_24px_64px_rgba(0,0,0,0.4),0_0_30px_rgba(255,255,255,0.05)]';
            
            return (
              <div key={card.key} className={`flex flex-col rounded-[24px] border ${borderClass} ${bgClass} transition-all duration-300 hover:border-cyan/30 hover:-translate-y-1 ${shadowClass} animate-[fadeUp_0.5s_ease_both]`} style={{ animationDelay: `${index * 100}ms` }}>
                <div className="p-7 sm:p-8 pb-6 border-b border-white/10 relative">
                  {isFirst && (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(0,229,255,0.1),transparent_60%)] rounded-t-[24px] pointer-events-none" />
                  )}
                  {!isFirst && (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(255,255,255,0.03),transparent_60%)] rounded-t-[24px] pointer-events-none" />
                  )}
                  
                  <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <div className="font-heading text-[1.4rem] sm:text-[1.5rem] font-bold tracking-tight leading-tight break-keep">{card.name}</div>
                      <div className="text-[0.75rem] text-text-muted">{card.providerName}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      {isp.type === '独自回線' && (
                        <span className="px-3 py-1 rounded-full bg-cyan/10 text-cyan border border-cyan/25 font-mono text-[0.6rem] font-bold tracking-[0.1em] whitespace-nowrap">独自回線</span>
                      )}
                      {isp.type === '専用帯域' && (
                        <span className="px-3 py-1 rounded-full bg-purple-400/10 text-purple-400 border border-purple-400/25 font-mono text-[0.6rem] font-bold tracking-[0.1em] whitespace-nowrap">専用帯域</span>
                      )}
                      {isp.regions && isp.regions.length <= 3 && (
                        <span className="px-3 py-1 rounded-full bg-emerald/10 text-emerald border border-emerald/25 font-mono text-[0.6rem] font-bold tracking-[0.1em] whitespace-nowrap">地方限定</span>
                      )}
                    </div>
                  </div>

                  <div className="relative z-10 flex gap-6 flex-wrap mt-6">
                    {card.plans.length === 1 && (
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[0.7rem] text-white/75 tracking-[0.1em] uppercase"><Tooltip text="データが往復する時間の遅延を示す指標。FPSでは15ms以下が理想的とされます。">平均Ping</Tooltip></span>
                        <span className={`font-mono font-bold text-[1.3rem] leading-none ${card.bestPing <= 15 ? 'text-emerald drop-shadow-[0_0_14px_rgba(0,230,118,0.4)]' : card.bestPing <= 20 ? 'text-cyan' : 'text-amber-500'}`}>{card.pingText}</span>
                      </div>
                    )}
                    {card.plans.length === 1 && (
                      <>
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[0.7rem] text-white/75 tracking-[0.1em] uppercase"><Tooltip text="標準月額（税込）です。キャンペーンや割引適用で実際の負担額は変動します。詳細は公式サイトをご確認ください。">月額料金</Tooltip></span>
                          <span className="font-mono font-bold text-[1.1rem] sm:text-[1.2rem] leading-none text-text mt-0.5">{card.feeText}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[0.7rem] text-white/75 tracking-[0.1em] uppercase"><Tooltip text="理論上の最も速い通信速度のこと。実際の速度とは異なる場合が多いです。">最大速度</Tooltip></span>
                          <span className={`font-mono font-bold text-[1.3rem] leading-none text-cyan ${card.has10G ? 'drop-shadow-[0_0_14px_rgba(0,229,255,0.4)]' : ''}`}>{card.speedText}</span>
                        </div>
                      </>
                    )}
                    {/*
                    {isp.cashback_text && isp.cashback_text !== "キャンペーンなし" && (
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[0.7rem] text-white/75 tracking-[0.1em] uppercase"><Tooltip text="開通後に受け取れる還元額の目安です。受取時期や適用条件は回線ごとに異なります。">キャッシュバック</Tooltip></span>
                        <span className="font-mono font-bold text-[1.1rem] leading-none text-purple-400 drop-shadow-[0_0_14px_rgba(192,132,252,0.4)]">{isp.cashback_text}</span>
                      </div>
                    )}
                    */}
                    {card.plans.length === 1 && isp.discounts && isp.discounts.length > 0 && (
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[0.65rem] text-white/75 tracking-[0.05em] uppercase">{formatCarrier(isp.discounts[0].carrier)}利用で</span>
                        <span className="font-mono font-bold text-[1.3rem] leading-none text-emerald drop-shadow-[0_0_14px_rgba(0,230,118,0.4)]">-¥{isp.discounts[0].amount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {card.plans.length > 1 && (
                    <div className="relative z-10 mt-5 rounded-2xl border border-white/10 bg-black/20 p-3">
                      <div className="grid grid-cols-[58px_1fr_1fr_1fr] gap-2 px-2 pb-2 font-mono text-[0.62rem] tracking-[0.08em] text-white/45">
                        <span>プラン</span>
                        <span>Ping</span>
                        <span>月額</span>
                        <span>スマホ割</span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {card.plans.map((plan) => (
                          <div key={plan.id} className="grid grid-cols-[58px_1fr_1fr_1fr] gap-2 rounded-xl bg-white/[0.035] px-2 py-2 text-[0.78rem]">
                            <span className="font-mono font-bold text-cyan">{formatPlanLabel(plan.max_speed_gbps)}</span>
                            <span className="font-mono text-emerald">{plan.avg_ping_ms}ms</span>
                            <span className="font-mono text-text">{formatYen(plan.actual_monthly_fee_jpy)}</span>
                            <span className="font-mono text-emerald leading-snug">
                              {plan.discounts?.[0] ? (
                                <>
                                  <span className="block text-[0.62rem] text-white/55">{formatCarrier(plan.discounts[0].carrier)}で</span>
                                  <span>-¥{plan.discounts[0].amount.toLocaleString()}</span>
                                </>
                              ) : '—'}
                            </span>
                          </div>
                        ))}
                      </div>
                      {card.areaNote && (
                        <p className="mt-2 px-2 text-[0.72rem] leading-relaxed text-amber-500/85">
                          ※ {card.areaNote}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 p-6 sm:p-8 pt-6 flex flex-col gap-5">
                  <p className="text-[0.875rem] text-text/90 leading-[1.75]">
                    {card.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-emerald mb-1">// メリット</div>
                      {card.pros.map((pro: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-[0.82rem] text-text/80 leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0 mt-1.5" />{pro}</div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-red-400 mb-1">// デメリット</div>
                      {card.cons.map((con: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-[0.82rem] text-text/80 leading-[1.5]"><span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />{con}</div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {[
                      isp.avg_ping_ms <= 15 ? '低Ping' : null,
                      isp.vdsl_support ? 'VDSL対応' : null,
                      isp.regions && isp.regions.length >= 8 ? '全国対応' : null,
                      isp.regions && isp.regions.length <= 3 ? '地域限定' : null,
                      isp.type === '専用帯域' ? 'ゲーム専用帯域' : null,
                      isp.mobile_discount && isp.mobile_discount.length > 0 ? 'スマホ割あり' : null,
                    ].filter(Boolean).map(tag => (
                      <span key={tag} className="px-[11px] py-1 bg-white/[0.04] border border-white/10 rounded-full text-[0.72rem] text-text-muted font-mono">#{tag}</span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2.5 mt-4">
                    {isp.affiliateLink !== "#" ? (
                      <div className="flex flex-col gap-1 items-center w-full">
                        <span className="text-[0.65rem] font-bold text-[#ffeb3b] tracking-tight bg-black/40 px-2 py-0.5 rounded-full border border-[#ffeb3b]/30 shadow-[0_0_10px_rgba(255,235,59,0.1)] w-full text-center whitespace-nowrap overflow-hidden text-ellipsis">
                          ＼ {isp.cashback_text} ／
                        </span>
                        <AffiliateLink href={isp.affiliateLink} ispName={isp.name} ispId={isp.id} className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-cyan text-black font-heading font-bold text-[0.875rem] transition-all hover:bg-cyan/80 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                          お申し込みはこちら <ChevronRight className="w-3.5 h-3.5" />
                        </AffiliateLink>
                      </div>
                    ) : (
                      <span className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-cyan/30 text-black/50 font-heading font-bold text-[0.875rem] cursor-not-allowed">
                        準備中 <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                      </span>
                    )}
                    {/* 評判・詳細ページへのリンク */}
                    {Object.keys(PROVIDER_DETAILS).includes(isp.id.split('_')[0]) && (
                      <Link href={`/provider/${isp.id.split('_')[0]}`} className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl border border-white/10 text-text-muted font-medium text-[0.825rem] transition-all hover:border-cyan/30 hover:text-text hover:bg-cyan/5">
                        評判・詳細を見る
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* Diag CTA */}
        <div className="mt-14 p-6 sm:p-10 rounded-[20px] border border-cyan/20 bg-cyan/[0.04] flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div className="absolute -top-[40px] -right-[40px] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 text-center sm:text-left">
            <h3 className="font-heading text-[1.15rem] font-bold tracking-tight mb-1.5">
              どれが自分に合う？<span className="gradient-text">30秒で分かります</span>
            </h3>
            <p className="text-[0.83rem] text-text-muted leading-[1.5]">
              住居タイプ・キャリア・予算を入力するだけ。完全無料・登録不要。
            </p>
          </div>
          <Link
            href="/diagnosis"
            className="relative z-10 shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan to-emerald text-black font-heading font-bold text-[0.9rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(0,230,118,0.35)] w-full sm:w-auto"
          >
            <Play className="w-4 h-4 fill-black" />
            無料診断スタート
          </Link>
        </div>

      </div>
    </div>
  );
}
