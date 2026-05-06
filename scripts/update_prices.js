const fs = require('fs');
const path = './src/data/isps.json';
let isps = JSON.parse(fs.readFileSync(path, 'utf8'));

// Price map
const prices = {
  nuro_hikari_2g: 5500,
  nuro_hikari_10g: 6050,
  gamewith_hikari: 4400,
  au_hikari_1g: 3740,
  au_hikari_10g: 6468,
  biglobe_hikari_1g: 4379,
  biglobe_hikari_10g: 6270,
  docomo_hikari_1g: 4180,
  docomo_hikari_10g: 5940,
  softbank_hikari_1g: 4180,
  softbank_hikari_10g: 6930,
  commufa_hikari_1g: 5170,
  commufa_hikari_10g: 5940,
  pikara_hikari: 3740,
  megaegg_hikari: 4070
};

// Update prices for existing ISPs
isps.forEach(isp => {
  if (prices[isp.id]) {
    isp.actual_monthly_fee_jpy = prices[isp.id];
  }
});

// 1. Split GameWith
const gwIndex = isps.findIndex(i => i.id === 'gamewith_hikari');
if (gwIndex !== -1) {
  const gwBase = isps.splice(gwIndex, 1)[0];
  const gw1g = { ...gwBase, id: 'gamewith_hikari_1g', name: 'GameWith光 (1ギガ)', max_speed_gbps: 1.0, actual_monthly_fee_jpy: 4400 };
  const gw10g = { ...gwBase, id: 'gamewith_hikari_10g', name: 'GameWith光 (10ギガ)', max_speed_gbps: 10.0, avg_ping_ms: 10, avg_dl_speed_mbps: 1500, actual_monthly_fee_jpy: 6700, stability_score: 95, tags: ['10G対応', ...gwBase.tags] };
  isps.push(gw1g, gw10g);
}

// 2. Split Pikara
const pikaraIndex = isps.findIndex(i => i.id === 'pikara_hikari');
if (pikaraIndex !== -1) {
  const pikaraBase = isps.splice(pikaraIndex, 1)[0];
  const p1g = { ...pikaraBase, id: 'pikara_hikari_1g', name: 'ピカラ光 (1ギガ)', actual_monthly_fee_jpy: 3740 };
  const p10g = { ...pikaraBase, id: 'pikara_hikari_10g', name: 'ピカラ光 (10ギガ)', max_speed_gbps: 10.0, avg_ping_ms: 11, avg_dl_speed_mbps: 1100, actual_monthly_fee_jpy: 5720, stability_score: 91, tags: ['10G対応', ...pikaraBase.tags] };
  isps.push(p1g, p10g);
}

// 3. Split MegaEgg
const megaeggIndex = isps.findIndex(i => i.id === 'megaegg_hikari');
if (megaeggIndex !== -1) {
  const megaeggBase = isps.splice(megaeggIndex, 1)[0];
  const m1g = { ...megaeggBase, id: 'megaegg_hikari_1g', name: 'メガ・エッグ (1ギガ)', actual_monthly_fee_jpy: 4070 };
  const m10g = { ...megaeggBase, id: 'megaegg_hikari_10g', name: 'メガ・エッグ (10ギガ)', max_speed_gbps: 10.0, avg_ping_ms: 12, avg_dl_speed_mbps: 1050, actual_monthly_fee_jpy: 5720, stability_score: 90, tags: ['10G対応', ...megaeggBase.tags] };
  isps.push(m1g, m10g);
}

// 4. Add eo Hikari (Kansai)
const eoBase = {
  providerName: '株式会社オプテージ', type: '独自回線', mobile_discount: ['au', 'uq_mobile', 'mineo'], available_housing: ['house', 'mansion_optical'],
  regions: ['kansai'], cashback_text: '高額キャッシュバックキャンペーン実施中！',
  discounts: [{ carrier: 'au', amount: 1100, name: 'auスマートバリュー' }],
  tags: ['関西限定', '独自回線', '超低Ping'], badges: [], affiliateLink: '#', detailLink: '/provider',
  description: '関西地方（大阪・京都・兵庫・奈良・滋賀・和歌山）で圧倒的なシェアを誇る独自回線。NURO光と同等の低遅延で、関西ゲーマーのド定番です。',
  pros: ['関西エリア最強クラスのPing値', '独自ファイバー網で混雑しにくい', 'au・UQスマホのセット割対応'],
  cons: ['関西エリア外では使えない', 'マンションの設備によっては契約できない']
};

isps.push({ ...eoBase, id: 'eo_hikari_1g', name: 'eo光 (1ギガ)', max_speed_gbps: 1.0, avg_ping_ms: 13, avg_dl_speed_mbps: 550, actual_monthly_fee_jpy: 5605, stability_score: 89, vdsl_support: false });
isps.push({ ...eoBase, id: 'eo_hikari_10g', name: 'eo光 (10ギガ)', max_speed_gbps: 10.0, avg_ping_ms: 10, avg_dl_speed_mbps: 1400, actual_monthly_fee_jpy: 6635, stability_score: 93, vdsl_support: false, tags: ['10G対応', ...eoBase.tags] });

fs.writeFileSync(path, JSON.stringify(isps, null, 2));
console.log("Prices and ISPs updated.");
