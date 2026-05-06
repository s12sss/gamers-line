export interface ISP {
  id: string;
  name: string;
  providerName?: string;
  type: string;
  max_speed_gbps: number;
  avg_ping_ms: number;
  avg_dl_speed_mbps: number;
  stability_score: number;
  actual_monthly_fee_jpy: number;
  vdsl_support: boolean;
  cashback_text: string;
  mobile_discount: string[];
  available_housing: string[];
  regions: string[];
  tags: string[];
  badges?: string[];
  description?: string;
  pros?: string[];
  cons?: string[];
  discounts?: { carrier: string; amount: number; name: string }[];
  affiliateLink?: string;
  detailLink?: string;
}
export interface UserAnswers {
  gameGenre: 'fps' | 'mmo' | 'casual' | '';
  housingType: 'house' | 'mansion_optical' | 'mansion_vdsl' | 'unknown' | '';
  mobileCarrier: 'docomo' | 'au' | 'softbank' | 'other' | '';
  priority: 'ping' | 'price' | 'balance' | '';
  region: string;
  requires10G: boolean;
}

function calculateScore(isp: ISP, answers: UserAnswers): number {
  let score = 0;
  
  // 1. 各項目の正規化（スコア化 0〜100）
  // Ping: 低いほど高得点 (基準50ms)
  const normPing = Math.max(0, (50 - isp.avg_ping_ms) / 50) * 100;
  // 料金: 安いほど高得点 (基準8000円)
  const normPrice = Math.max(0, (8000 - isp.actual_monthly_fee_jpy) / 8000) * 100;
  // 安定性: 0〜100
  const normStability = isp.stability_score;

  // 2. ゲームジャンルによる重み付け (Weight)
  let wPing = 0, wPrice = 0, wStability = 0;
  if (answers.gameGenre === 'fps') {
    wPing = 0.7; wPrice = 0.2; wStability = 0.1;
  } else if (answers.gameGenre === 'mmo') {
    wStability = 0.5; wPing = 0.3; wPrice = 0.2;
  } else {
    wPrice = 0.7; wPing = 0.1; wStability = 0.2;
  }

  // 重視ポイントによる微調整
  if (answers.priority === 'ping') wPing += 0.2;
  if (answers.priority === 'price') wPrice += 0.2;

  // 基本スコア計算
  score = (normPing * wPing) + (normPrice * wPrice) + (normStability * wStability);

  // 3. 特殊条件による加点・減点
  if (isp.mobile_discount.includes(answers.mobileCarrier)) {
    score += 15; // スマホ割ボーナス
  }

  // 運営が誠実にお勧めできる「NURO」と「GameWith」への特別ボーナス
  // （エリア判定等のハードフィルターは通過している前提なので、残っていればスコアを底上げする）
  if (isp.id.includes('nuro_hikari') || isp.id.includes('gamewith_hikari')) {
    score += 40; 
  }

  // 10Gペナルティ（大容量を求めていないのに10Gを選ぶのは過剰スペックで高額なため推奨しない）
  if (!answers.requires10G && isp.max_speed_gbps >= 10) {
    score -= 200; // 確実に1Gプランを下回らせる強力なペナルティ
  }

  return score;
}

export function recommendISPs(isps: ISP[], answers: UserAnswers): { isp: ISP, score: number }[] {
  // 1. ハードフィルター (絶対的な提供条件による足切り)
  let filteredISPs = isps.filter(isp => {
    // ユーザーがVDSLと答えた場合、VDSL対応していない回線（NURO等）を弾く
    if (answers.housingType === 'mansion_vdsl' && !isp.available_housing.includes('mansion_vdsl')) {
      return false;
    }
    // エリア対応していない回線を弾く
    if (answers.region && !isp.regions.includes(answers.region)) {
      return false;
    }
    // 10G希望の場合は、最大速度が10G未満のものを弾く
    if (answers.requires10G && isp.max_speed_gbps < 10) {
      return false;
    }
    return true;
  });

  // フォールバック1: 10G条件を外す
  if (filteredISPs.length === 0 && answers.requires10G) {
    filteredISPs = isps.filter(isp => {
      if (answers.housingType === 'mansion_vdsl' && !isp.available_housing.includes('mansion_vdsl')) return false;
      if (answers.region && !isp.regions.includes(answers.region)) return false;
      return true;
    });
  }

  // フォールバック2: 地域条件も外す
  if (filteredISPs.length === 0 && answers.region) {
    filteredISPs = isps.filter(isp => {
      if (answers.housingType === 'mansion_vdsl' && !isp.available_housing.includes('mansion_vdsl')) return false;
      return true;
    });
  }

  // フォールバック3: すべてのハードフィルターを外す（最低でも何かしら提案する）
  if (filteredISPs.length === 0) {
    filteredISPs = [...isps];
  }

  // 2. スコア計算とランキング
  return filteredISPs
    .map(isp => ({
      isp,
      score: Math.round(calculateScore(isp, answers))
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // トップ3
}
