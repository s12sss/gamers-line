import { ISP, recommendISPs, UserAnswers } from './algorithm';

export interface DetailedAnswers {
  q1_genre: string[]; // fps, mmo, fighting, casual
  q2_frequency: string; // daily, weekend, rare
  q3_lag_annoyance: string; // high, medium, low
  q4_current_line: string; // optical, home_router, mobile, vdsl
  q5_connection: string; // wired, wifi, unknown
  q6_family: string; // yes, no
  q7_family_usage: string; // high, low
  q8_dl_stress: string; // high, low
  q9_streaming: string; // frequent, sometimes, never
  q10_vc: string; // frequent, sometimes, never
  q11_budget_priority: string; // spec, budget, balance
  q12_carrier: string; // docomo, au, softbank, rakuten, other
  q13_contract_years: string; // over3, 1to3, under1, unknown
  q14_router_type: string; // own, rental, unknown
  q15_goal: string; // win, enjoy, cheap
}

export interface GamerType {
  id: string;
  name: string;
  catchphrase: string;
  description: string;
  icon: string;
  color: string;
}

export interface DiagnosisResult {
  type: GamerType;
  advice: string[];
  recommendedISPs: { isp: ISP, score: number }[];
}

export const GAMER_TYPES: Record<string, GamerType> = {
  hardcore: {
    id: 'hardcore',
    name: '回線ガチ勢・求道者タイプ',
    catchphrase: '0.1ミリ秒の遅延すら許さないストイックな戦士',
    description: 'FPSや格ゲーなどで常に勝利を追求し、ラグによる敗北を何より嫌う生粋のゲーマーです。デバイスには妥協せず、環境構築にも余念がありません。あなたにとって回線は「インフラ」ではなく「武器」です。',
    icon: '⚔️',
    color: 'emerald'
  },
  enjoy: {
    id: 'enjoy',
    name: 'ワイワイ・エンジョイタイプ',
    catchphrase: '仲間との時間を大切にする平和主義者',
    description: 'VCを繋いで友達と楽しくプレイすることを第一とするタイプ。極限のPingよりも、「落ちない」「通話が途切れない」という安定性を重視します。コストと性能のバランス感覚に優れています。',
    icon: '🎮',
    color: 'cyan'
  },
  creator: {
    id: 'creator',
    name: '配信クリエイタータイプ',
    catchphrase: '世界へ発信するデジタルエンターテイナー',
    description: 'ゲームプレイだけでなく、配信や動画投稿も行うタイプ。下りの速度だけでなく「上り速度」の安定性が命です。家族と同居している場合、夜間の帯域制限が最大の敵になります。',
    icon: '🎙️',
    color: 'purple'
  },
  vulnerable: {
    id: 'vulnerable',
    name: '回線弱者・パケットロストの妖精',
    catchphrase: '理不尽なラグに泣かされ続ける悲しき存在',
    description: 'マンションのVDSLやWi-Fi、ホームルーターなど、ゲームには不向きな環境で戦い続けているタイプ。あなたのエイムが悪いのではなく、回線が悪い可能性が非常に高いです。環境を変えれば劇的に覚醒するポテンシャルを秘めています。',
    icon: '🧚',
    color: 'red'
  }
};

export function calculateDetailedDiagnosis(answers: DetailedAnswers, isps: ISP[]): DiagnosisResult {
  let typeId = 'enjoy';
  let isHardcore = false;
  
  // Determine Type
  if (answers.q4_current_line === 'vdsl' || answers.q4_current_line === 'home_router' || answers.q4_current_line === 'mobile') {
    typeId = 'vulnerable';
  } else if (answers.q9_streaming === 'frequent' || answers.q9_streaming === 'sometimes') {
    typeId = 'creator';
  } else if ((answers.q1_genre.includes('fps') || answers.q1_genre.includes('fighting')) && answers.q3_lag_annoyance === 'high' && answers.q15_goal === 'win') {
    isHardcore = true;
    typeId = 'hardcore';
  }

  // Generate Advice
  const advice: string[] = [];
  
  if (answers.q5_connection === 'wifi') {
    advice.push('現在Wi-Fiで接続しているようですが、オンラインゲーム（特にFPSや格ゲー）ではパケットロストによる致命的なラグの原因になります。回線を乗り換える前に、まずは「Cat6A」規格の有線LANケーブルで繋ぐだけで劇的に改善する可能性があります。');
  }
  
  if (answers.q4_current_line === 'home_router' || answers.q4_current_line === 'mobile') {
    advice.push('ホームルーター（置くだけWi-Fi）やモバイルルーターは電波で通信するため、どれだけ最新機種でも通信の抜け落ちが頻発します。ゲームを本気で楽しむなら、まずは「光回線」の導入が絶対条件です。');
  } else if (answers.q4_current_line === 'vdsl') {
    advice.push('マンション備え付けの「VDSL方式（電話線）」は、最大速度が100Mbpsに制限され、夜間はさらに遅くなります。もしマンションにNURO光などの独自回線が引けるなら、今すぐ乗り換えるべきです。');
  }

  if (answers.q14_router_type === 'rental' && typeId === 'hardcore') {
    advice.push('プロバイダからの無料レンタルルーターは性能が低いことが多いです。回線が良くてもルーターがボトルネックになるため、Wi-Fi6対応のゲーミングルーターへの投資をおすすめします。');
  }

  if (answers.q6_family === 'yes' && answers.q7_family_usage === 'high') {
    advice.push('ご家族と同居されており、同時にネットを使う機会が多いとのこと。一般的な光回線（フレッツ網）だと夜間に帯域を奪い合ってラグが発生しやすいため、NURO光やauひかりなどの「独自回線」を選ぶのが正解です。');
  }

  if (advice.length === 0) {
    advice.push('あなたのネット環境への意識は非常に高いです！すでに有線LANなどの基本対策はできているため、あとは回線そのもののスペック（Ping値）を底上げする「ゲーマー特化回線」への乗り換えが最後のピースになります。');
  }

  // Convert detailed answers to simple UserAnswers for the recommendation engine
  const simpleAnswers: UserAnswers = {
    gameGenre: answers.q1_genre.includes('fps') ? 'fps' : (answers.q1_genre.includes('mmo') ? 'mmo' : 'casual'),
    housingType: answers.q4_current_line === 'vdsl' ? 'mansion_vdsl' : 'house',
    mobileCarrier: ['docomo', 'au', 'softbank', 'other'].includes(answers.q12_carrier) ? answers.q12_carrier as any : 'other',
    priority: answers.q11_budget_priority === 'spec' ? 'ping' : (answers.q11_budget_priority === 'budget' ? 'price' : 'balance'),
    region: '', 
    requires10G: isHardcore || answers.q8_dl_stress === 'high'
  };

  const recommendedISPs = recommendISPs(isps, simpleAnswers);

  return {
    type: GAMER_TYPES[typeId],
    advice,
    recommendedISPs
  };
}
