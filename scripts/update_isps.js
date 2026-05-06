const fs = require('fs');

const path = './src/data/isps.json';
let isps = JSON.parse(fs.readFileSync(path, 'utf8'));

// 1. Update AU
isps.forEach(isp => {
  if (isp.id.startsWith('au_hikari')) {
    isp.affiliateLink = 'https://px.a8.net/svt/ejp?a8mat=4B3K2L+48EZN6+42Y0+5ZMCH';
    isp.cashback_text = '最大94,000円還元キャンペーン中！';
  }
});

// 2. Split Docomo
const docomoIndex = isps.findIndex(i => i.id === 'docomo_hikari');
if (docomoIndex !== -1) {
  const docomoBase = isps.splice(docomoIndex, 1)[0];
  const link = 'https://px.a8.net/svt/ejp?a8mat=4B3K2L+4CL0VM+50+556VPT';
  const cb = '最大65,000円還元キャンペーン中！';
  
  const d1g = { ...docomoBase, id: 'docomo_hikari_1g', name: 'ドコモ光 (1ギガ)', affiliateLink: link, cashback_text: cb, max_speed_gbps: 1.0, actual_monthly_fee_jpy: 4400, stability_score: 75 };
  const d10g = { ...docomoBase, id: 'docomo_hikari_10g', name: 'ドコモ光 (10ギガ)', affiliateLink: link, cashback_text: cb, max_speed_gbps: 10.0, actual_monthly_fee_jpy: 6380, stability_score: 82, vdsl_support: false, tags: ['10G対応', ...docomoBase.tags.filter(t=>t!=='10G対応')] };
  
  isps.push(d10g, d1g);
}

// 3. Split SoftBank
const sbIndex = isps.findIndex(i => i.id === 'softbank_hikari');
if (sbIndex !== -1) {
  const sbBase = isps.splice(sbIndex, 1)[0];
  const link = 'https://px.a8.net/svt/ejp?a8mat=4B3K2L+4HXXBM+348K+1BP8ZM';
  const cb = '最大40,000円還元キャンペーン中！';
  
  const s1g = { ...sbBase, id: 'softbank_hikari_1g', name: 'ソフトバンク光 (1ギガ)', affiliateLink: link, cashback_text: cb, max_speed_gbps: 1.0, actual_monthly_fee_jpy: 4180, stability_score: 73 };
  const s10g = { ...sbBase, id: 'softbank_hikari_10g', name: 'ソフトバンク光 (10ギガ)', affiliateLink: link, cashback_text: cb, max_speed_gbps: 10.0, actual_monthly_fee_jpy: 6380, stability_score: 80, vdsl_support: false, tags: ['10G対応', ...sbBase.tags.filter(t=>t!=='10G対応')] };
  
  isps.push(s10g, s1g);
}

// 4. Add Commufa
const commufaLink = 'https://px.a8.net/svt/ejp?a8mat=4B3K2L+41V7ZM+42Y0+BX3J6';
const commufaBase = {
  providerName: '中部テレコミュニケーション', type: '独自回線', mobile_discount: ['au', 'uq_mobile'], available_housing: ['house', 'mansion_optical'],
  regions: ['tokai'], cashback_text: '最大93,000円還元キャンペーン中！',
  discounts: [{ carrier: 'au', amount: 1100, name: 'auスマートバリュー' }],
  tags: ['東海限定', '独自回線', '超低Ping'], badges: [], affiliateLink: commufaLink, detailLink: '/provider',
  description: '東海地方（愛知・岐阜・三重・静岡）限定の最強ゲーミング回線。自社独自の光ファイバー網を使用しているため、NURO光に匹敵する低Pingと安定性を誇ります。',
  pros: ['東海地方でトップクラスのPing値', 'au/UQスマホとのセット割あり', '独自回線のため夜間もラグりにくい'],
  cons: ['東海地方（一部長野等）でしか使えない', '解約時の撤去工事費に注意が必要']
};
isps.push({ ...commufaBase, id: 'commufa_hikari_1g', name: 'コミュファ光 (1ギガ)', max_speed_gbps: 1.0, avg_ping_ms: 11.0, avg_dl_speed_mbps: 600, actual_monthly_fee_jpy: 5170, stability_score: 90, vdsl_support: false });
isps.push({ ...commufaBase, id: 'commufa_hikari_10g', name: 'コミュファ光 (10ギガ)', max_speed_gbps: 10.0, avg_ping_ms: 8.0, avg_dl_speed_mbps: 1800, actual_monthly_fee_jpy: 5940, stability_score: 94, vdsl_support: false, tags: ['10G対応', ...commufaBase.tags] });

// 5. Add Pikara (Shikoku)
const pikaraLink = 'https://px.a8.net/svt/ejp?a8mat=4B3K2L+5QLFOY+348K+1ZGG0Y';
isps.push({
  id: 'pikara_hikari', name: 'ピカラ光', providerName: 'STNet', type: '独自回線', max_speed_gbps: 1.0, avg_ping_ms: 14.0, avg_dl_speed_mbps: 450,
  mobile_discount: ['au', 'uq_mobile'], available_housing: ['house', 'mansion_optical'], regions: ['shikoku'],
  actual_monthly_fee_jpy: 4620, stability_score: 88, vdsl_support: false, cashback_text: '最大30,000円還元キャンペーン中！',
  discounts: [{ carrier: 'au', amount: 1100, name: 'auスマートバリュー' }],
  tags: ['四国限定', '独自回線', 'auスマホ割'], badges: [], affiliateLink: pikaraLink, detailLink: '/provider',
  description: '四国地方（香川・徳島・高知・愛媛）にお住まいのゲーマーならコレ一択。四国電力グループの独自回線網を使用し、圧倒的な安定感を実現。',
  pros: ['四国エリアで最強の通信品質', '独自回線のため混雑に強い', '四国電力とのセット割でさらに安くなる'],
  cons: ['四国エリア外では使えない', 'マンションへの導入済み物件が少なめ']
});

// 6. Add Mega Egg (Chugoku)
const megaeggLink = 'https://px.a8.net/svt/ejp?a8mat=4B3K2L+5R6VAQ+348K+2BDR9U';
isps.push({
  id: 'megaegg_hikari', name: 'メガ・エッグ', providerName: 'エネルギア・コミュニケーションズ', type: '独自回線', max_speed_gbps: 1.0, avg_ping_ms: 15.0, avg_dl_speed_mbps: 400,
  mobile_discount: ['au', 'uq_mobile'], available_housing: ['house', 'mansion_optical'], regions: ['chugoku'],
  actual_monthly_fee_jpy: 4620, stability_score: 87, vdsl_support: false, cashback_text: '最大20,000円還元キャンペーン中！',
  discounts: [{ carrier: 'au', amount: 1100, name: 'auスマートバリュー' }],
  tags: ['中国地方限定', '独自回線', 'auスマホ割'], badges: [], affiliateLink: megaeggLink, detailLink: '/provider',
  description: '中国地方（広島・岡山・山口・島根・鳥取）のゲーマー定番回線。中国電力グループの独自ファイバーを利用しているため、夜間でも安定したPingを維持します。',
  pros: ['中国エリアで非常に高い安定性', '中国電力とのセットで永年割引', '独自回線ならではの低Ping'],
  cons: ['中国エリア外では使えない']
});

fs.writeFileSync(path, JSON.stringify(isps, null, 2));
console.log("Updated isps.json successfully.");
