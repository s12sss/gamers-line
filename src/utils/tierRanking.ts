import ispsData from '@/data/isps.json';

export type TierLabel = 'SS' | 'S' | 'A' | 'B' | 'C';

const PING_MIN = 11;
const PING_MAX = 29;

function calcScore(isp: any): number {
  const pingScore = (PING_MAX - isp.avg_ping_ms) / (PING_MAX - PING_MIN) * 100;
  const stabScore = isp.stability_score;
  const speedScore = isp.max_speed_gbps >= 10 ? 100 : 40;
  return pingScore * 0.45 + stabScore * 0.40 + speedScore * 0.15;
}

function getTier(score: number): TierLabel {
  if (score >= 92) return 'SS';
  if (score >= 80) return 'S';
  if (score >= 65) return 'A';
  if (score >= 50) return 'B';
  return 'C';
}

export interface RankedISP {
  id: string;
  name: string;
  tier: TierLabel;
  score: number;
  ping: number;
  stability: number;
  speedGbps: number;
  monthlyFee: number;
  detailLink: string;
  affiliateLink: string;
  regions: string[];
}

export function getRankedISPs(regionFilter?: string): RankedISP[] {
  return (ispsData as any[])
    .filter(isp => !isp.hidden)
    .filter(isp => !regionFilter || isp.regions.includes(regionFilter))
    .map(isp => {
      const score = calcScore(isp);
      return {
        id: isp.id,
        name: isp.name,
        tier: getTier(score),
        score: Math.round(score),
        ping: isp.avg_ping_ms,
        stability: isp.stability_score,
        speedGbps: isp.max_speed_gbps,
        monthlyFee: isp.actual_monthly_fee_jpy,
        detailLink: isp.detailLink || `/provider/${isp.id}`,
        affiliateLink: isp.affiliateLink || '#',
        regions: isp.regions || [],
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function groupByTier(isps: RankedISP[]): Record<TierLabel, RankedISP[]> {
  const result: Record<TierLabel, RankedISP[]> = { SS: [], S: [], A: [], B: [], C: [] };
  isps.forEach(isp => result[isp.tier].push(isp));
  return result;
}

export const TIER_CONFIG: Record<TierLabel, {
  color: string;
  bg: string;
  border: string;
  labelBg: string;
  desc: string;
}> = {
  SS: {
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.06)',
    border: 'rgba(251,191,36,0.25)',
    labelBg: 'rgba(251,191,36,0.15)',
    desc: '最強。ゲーム環境のベストアンサー',
  },
  S: {
    color: '#00E5FF',
    bg: 'rgba(0,229,255,0.04)',
    border: 'rgba(0,229,255,0.2)',
    labelBg: 'rgba(0,229,255,0.12)',
    desc: '性能十分。ほぼすべての用途で選択肢になる',
  },
  A: {
    color: '#00E676',
    bg: 'rgba(0,230,118,0.04)',
    border: 'rgba(0,230,118,0.18)',
    labelBg: 'rgba(0,230,118,0.12)',
    desc: '実用的。普通のゲームならストレスなし',
  },
  B: {
    color: '#7a7a9a',
    bg: 'rgba(255,255,255,0.025)',
    border: 'rgba(255,255,255,0.08)',
    labelBg: 'rgba(255,255,255,0.06)',
    desc: '標準的。FPS競技には物足りない場合も',
  },
  C: {
    color: '#3a3a5a',
    bg: 'rgba(0,0,0,0.1)',
    border: 'rgba(255,255,255,0.05)',
    labelBg: 'rgba(255,255,255,0.03)',
    desc: 'ゲーム用途には非推奨',
  },
};

export const TIER_ORDER: TierLabel[] = ['SS', 'S', 'A', 'B', 'C'];
