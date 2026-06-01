import ispsData from '@/data/isps.json';

export type TierLabel = 'S' | 'A' | 'B' | 'C';

interface RawISP {
  id: string;
  name: string;
  providerName: string;
  type: string;
  max_speed_gbps: number;
  avg_ping_ms: number;
  avg_dl_speed_mbps?: number;
  actual_monthly_fee_jpy: number;
  stability_score: number;
  regions: string[];
  detailLink?: string;
  affiliateLink?: string;
  description?: string;
  pros?: string[];
  cons?: string[];
  hidden?: boolean;
}

export interface RankedISP {
  id: string;
  name: string;
  providerName: string;
  type: string;
  tier: TierLabel;
  score: number;
  ping: number;
  stability: number;
  stabilityRating: number;
  speedGbps: number;
  speedRating: number;
  downloadMbps: number;
  monthlyFee: number;
  detailLink: string;
  affiliateLink: string;
  regions: string[];
  description: string;
  pros: string[];
  cons: string[];
}

const DOWNLOAD_MIN = 250;
const DOWNLOAD_MAX = 1000;

function normalize(value: number, min: number, max: number, invert = false): number {
  const clamped = Math.min(Math.max(value, min), max);
  const normalized = ((clamped - min) / (max - min)) * 100;
  return invert ? 100 - normalized : normalized;
}

function calcSpecScore(isp: RawISP): number {
  const isDedicatedBandwidth = isp.type === '専用帯域' || isp.id.startsWith('gamewith') || isp.id.startsWith('hi-ho');
  const normPing = Math.max(0, Math.min(100, ((50 - isp.avg_ping_ms) / 40) * 100));
  const normSpeed = Math.min(100, (isp.avg_dl_speed_mbps ?? 0) / 10);
  const normPrice = Math.max(0, Math.min(100, ((8000 - isp.actual_monthly_fee_jpy) / 4000) * 90 + 10));
  const pingBonus = isp.avg_ping_ms < 20 ? 5 : 0;
  const dedicatedBonus = isDedicatedBandwidth ? 3 : 0;
  const gameWithBonus = isp.id.startsWith('gamewith') ? 3 : 0;

  return Math.min(
    100,
    normPing * 0.45 +
      isp.stability_score * 0.25 +
      normSpeed * 0.15 +
      normPrice * 0.15 +
      pingBonus +
      dedicatedBonus +
      gameWithBonus,
  );
}

function calcSpeedRating(isp: RawISP): number {
  const actualSpeedScore = normalize(isp.avg_dl_speed_mbps ?? 0, DOWNLOAD_MIN, DOWNLOAD_MAX);
  const planHeadroom = isp.max_speed_gbps >= 10 ? 100 : isp.max_speed_gbps >= 2 ? 78 : 58;
  const speedScore = actualSpeedScore * 0.7 + planHeadroom * 0.3;

  if (speedScore >= 92) return 5;
  if (speedScore >= 78) return 4;
  if (speedScore >= 62) return 3;
  if (speedScore >= 46) return 2;
  return 1;
}

function calcStabilityRating(isp: RawISP): number {
  const stabilityScore = Math.min(Math.max(isp.stability_score + (isp.type === '専用帯域' ? 4 : 0), 0), 100);
  if (stabilityScore >= 94) return 5;
  if (stabilityScore >= 86) return 4;
  if (stabilityScore >= 76) return 3;
  if (stabilityScore >= 66) return 2;
  return 1;
}

function getTier(score: number): TierLabel {
  if (score >= 90) return 'S';
  if (score >= 85) return 'A';
  if (score >= 75) return 'B';
  return 'C';
}

export function getRankedISPs(regionFilter?: string): RankedISP[] {
  return (ispsData as RawISP[])
    .filter(isp => !isp.hidden)
    .filter(isp => !regionFilter || isp.regions.includes(regionFilter))
    .map(isp => {
      const roundedScore = Math.round(calcSpecScore(isp));
      return {
        id: isp.id,
        name: isp.name,
        providerName: isp.providerName,
        type: isp.type,
        tier: getTier(roundedScore),
        score: roundedScore,
        ping: isp.avg_ping_ms,
        stability: isp.stability_score,
        stabilityRating: calcStabilityRating(isp),
        speedGbps: isp.max_speed_gbps,
        speedRating: calcSpeedRating(isp),
        downloadMbps: isp.avg_dl_speed_mbps ?? 0,
        monthlyFee: isp.actual_monthly_fee_jpy,
        detailLink: isp.detailLink || `/provider/${isp.id}`,
        affiliateLink: isp.affiliateLink || '#',
        regions: isp.regions || [],
        description: isp.description || '',
        pros: isp.pros || [],
        cons: isp.cons || [],
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function groupByTier(isps: RankedISP[]): Record<TierLabel, RankedISP[]> {
  const result: Record<TierLabel, RankedISP[]> = { S: [], A: [], B: [], C: [] };
  isps.forEach(isp => result[isp.tier].push(isp));
  return result;
}

export const TIER_CONFIG: Record<TierLabel, {
  color: string;
  bg: string;
  border: string;
  labelBg: string;
  label: string;
  desc: string;
}> = {
  S: {
    color: '#00E5FF',
    bg: 'rgba(0,229,255,0.08)',
    border: 'rgba(0,229,255,0.3)',
    labelBg: '#00E5FF',
    label: '最高クラス',
    desc: '低Ping・安定性・速度の総合評価が特に高い回線。ゲーム用途で優先して比較したい枠。',
  },
  A: {
    color: '#00E676',
    bg: 'rgba(0,230,118,0.07)',
    border: 'rgba(0,230,118,0.28)',
    labelBg: '#00E676',
    label: '優秀',
    desc: 'ゲーム用途で十分強い。エリアや建物条件が合えば主力として検討しやすい。',
  },
  B: {
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.07)',
    border: 'rgba(167,139,250,0.25)',
    labelBg: '#a78bfa',
    label: '標準以上',
    desc: '普段使いは問題ないが、対戦ゲームでは混雑時間や建物条件の確認をしたい。',
  },
  C: {
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.06)',
    border: 'rgba(251,191,36,0.22)',
    labelBg: '#fbbf24',
    label: '要検討',
    desc: '一般用途では候補になるが、ゲーム用途では上位Tierを優先して比較したい。',
  },
};

export const TIER_ORDER: TierLabel[] = ['S', 'A', 'B', 'C'];
