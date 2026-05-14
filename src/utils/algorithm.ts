export interface ISP {
  id: string;
  hidden?: boolean;
  name: string;
  providerName?: string;
  type: string;
  max_speed_gbps: number;
  avg_ping_ms: number;
  avg_dl_speed_mbps: number;
  stability_score: number;
  actual_monthly_fee_jpy: number;
  mansion_monthly_fee_jpy: number;
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
  gameGenre: 'fps' | 'fighting' | 'mmo' | 'moba' | 'casual' | '';
  housingType: 'house' | 'mansion_optical' | 'mansion_vdsl' | 'unknown' | '';
  mobileCarrier: 'docomo' | 'au' | 'softbank' | 'other' | '';
  wantsDiscount?: boolean;
  playFrequency: 'everyday' | 'often' | 'weekend' | '';
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
  if (answers.gameGenre === 'fps' || answers.gameGenre === 'fighting') {
    wPing = 0.7; wPrice = 0.2; wStability = 0.1;
  } else if (answers.gameGenre === 'mmo' || answers.gameGenre === 'moba') {
    wStability = 0.5; wPing = 0.3; wPrice = 0.2;
  } else {
    wPrice = 0.7; wPing = 0.1; wStability = 0.2;
  }

  // プレイ頻度による微調整
  if (answers.playFrequency === 'everyday') {
    wPing += 0.1; wStability += 0.1; // 毎日やるなら品質重視
  } else if (answers.playFrequency === 'weekend') {
    wPrice += 0.1; // たまにしかやらないなら価格重視
  }

  // 重視ポイントによる微調整
  if (answers.priority === 'ping') wPing += 0.2;
  if (answers.priority === 'price') wPrice += 0.2;

  // 基本スコア計算
  score = (normPing * wPing) + (normPrice * wPrice) + (normStability * wStability);

  // 特殊条件による加点・減点
  // ユーザーがセット割を希望している場合のみ加点する
  if (answers.wantsDiscount !== false && isp.mobile_discount.includes(answers.mobileCarrier)) {
    // 料金重視でない場合（性能重視・バランス）はセット割の重要度を下げる
    score += (answers.priority !== 'price') ? 3 : 15;
  }

  // BBIQのアフィリエイト防衛ロジック：マンションの申し込みは公式のみとなり報酬が発生しないため、マンションユーザーには一切提案しない（他社へ誘導する）
  if (isp.id.includes('bbiq_hikari')) {
    if (answers.housingType === 'mansion_optical' || answers.housingType === 'mansion_vdsl') {
      score -= 1000;
    }
  }

  // 10G条件の処理（ハードフィルターではなくスコア加減点で調整）
  if (answers.requires10G) {
    if (isp.max_speed_gbps >= 10) {
      score += 150; // 10G希望なら10G対応回線に大幅加点し上位に出やすくする
    } else {
      score += 0; // 1Gプランも排除はしないが加点はしない
    }
  } else {
    // 10Gペナルティ（大容量を求めていないのに10Gを選ぶのは過剰スペックで高額なため推奨しない）
    if (isp.max_speed_gbps >= 10) {
      score -= 200; // 確実に1Gプランを下回らせる強力なペナルティ
    }
  }

  return score;
}

export function recommendISPs(isps: ISP[], answers: UserAnswers): { isp: ISP, score: number }[] {
  // 1. ハードフィルター (絶対的な提供条件による足切り)
  let filteredISPs = isps.filter(isp => !isp.hidden).filter(isp => {
    // ユーザーがVDSLと答えた場合、VDSL対応していない回線（NURO等）を弾く
    if (answers.housingType === 'mansion_vdsl' && !isp.available_housing.includes('mansion_vdsl')) {
      return false;
    }
    // エリア対応していない回線を弾く
    if (answers.region && !isp.regions.includes(answers.region)) {
      return false;
    }
    return true;
  });



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
  const scored = filteredISPs
    .map(isp => ({
      isp,
      score: Math.round(calculateScore(isp, answers))
    }))
    .sort((a, b) => b.score - a.score);

  // 3. プロバイダ単位で重複排除（一番スコアが高いプランのみ残す）
  const uniqueRecommendations: { isp: ISP, score: number }[] = [];
  const seenBaseNames = new Set<string>();

  for (const item of scored) {
    const baseName = item.isp.name.replace(/\s*\([0-9]+G\)/i, '').trim();
    if (!seenBaseNames.has(baseName)) {
      seenBaseNames.add(baseName);
      uniqueRecommendations.push(item);
      if (uniqueRecommendations.length === 3) break;
    }
  }

  return uniqueRecommendations;
}
