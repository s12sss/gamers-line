const fs = require('fs');
const path = require('path');

const ispsPath = path.join(__dirname, '../src/data/isps.json');
const detailsPath = path.join(__dirname, '../src/data/providerDetails.tsx');

// 1. Update isps.json
const isps = require(ispsPath);

const bbiq10g = {
  "providerName": "株式会社QTnet",
  "type": "独自回線",
  "mobile_discount": ["au", "uq_mobile"],
  "available_housing": ["house", "mansion_optical"],
  "regions": ["kyushu"],
  "cashback_text": "最大30,000円還元！",
  "discounts": [{"carrier": "au", "amount": 1100, "name": "auスマートバリュー"}],
  "tags": ["九州限定", "独自回線", "低Ping"],
  "badges": ["九州エリアNo.1"],
  "affiliateLink": "https://px.a8.net/svt/ejp?a8mat=4B3K2L+54KEB6+348K+2Z861U",
  "detailLink": "/provider/bbiq",
  "description": "九州電力グループのQTnetが提供する九州エリア限定の独自回線。安定したPing値と速度で九州のゲーマーに絶大な人気を誇ります。",
  "pros": ["九州エリア限定の独自網で混雑に強く安定性が高い", "au・UQスマホとのセット割対応でお得", "九州ゲーマーの定番回線"],
  "cons": ["九州エリア以外では契約不可", "10Gプランの提供エリアが限定的"],
  "id": "bbiq_hikari_10g",
  "name": "BBIQ (10G)",
  "max_speed_gbps": 10,
  "avg_ping_ms": 12,
  "avg_dl_speed_mbps": 4500,
  "actual_monthly_fee_jpy": 6380,
  "stability_score": 93,
  "vdsl_support": false
};

const bbiq1g = {
  ...bbiq10g,
  "id": "bbiq_hikari_1g",
  "name": "BBIQ (1G)",
  "max_speed_gbps": 1,
  "avg_ping_ms": 15,
  "avg_dl_speed_mbps": 450,
  "actual_monthly_fee_jpy": 5500,
  "stability_score": 88
};

// Check if already exists to prevent duplicate
if (!isps.find(i => i.id === 'bbiq_hikari_10g')) {
  isps.push(bbiq10g);
  isps.push(bbiq1g);
  fs.writeFileSync(ispsPath, JSON.stringify(isps, null, 2));
  console.log('Added to isps.json');
} else {
  console.log('BBIQ already in isps.json');
}

// 2. Update providerDetails.tsx
let detailsContent = fs.readFileSync(detailsPath, 'utf8');

const bbiqDetails = `
  'bbiq': {
    slug: 'bbiq',
    name: 'BBIQ（ビビック）',
    catchphrase: '九州ゲーマーの特権。電力系ネットワークで圧倒的な安定感',
    heroDescription: '九州エリア（福岡・佐賀・長崎・熊本・大分・宮崎・鹿児島）にお住まいなら、九州電力グループのQTnetが提供する独自回線「BBIQ」が強力な選択肢となります。フレッツ光とは異なる独自の光ファイバー網を使用しているため、夜間の混雑時でもPingが安定しやすく、FPSや格闘ゲームにおいて絶大な威力を発揮します。',
    ispIds: ['bbiq_hikari_10g', 'bbiq_hikari_1g'],
    bodyContent: (
      <div className="space-y-12 text-text-muted leading-relaxed">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan font-mono text-xl">01.</span> なぜ九州ゲーマーはBBIQを選ぶべきなのか？
          </h2>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
            <h3 className="text-xl font-bold text-emerald mb-4">独自ファイバー網による「Pingの安定感」</h3>
            <p className="mb-4">
              BBIQ最大の強みは、九州電力のインフラ網を活用した「独自回線」であることです。全国規模の光コラボ回線にありがちな、利用者の集中による夜間のゴールデンタイムの速度低下・Pingスパイク（突発的なラグ）が起こりにくく、常に安定した環境でプレイが可能です。
            </p>
            <p>
              また、auやUQ mobileをお使いの方なら「auスマートバリュー」「自宅セット割」が適用されるため、ランニングコストも大幅に削減できます。
            </p>
          </div>
        </section>
      </div>
    )
  }
`;

if (!detailsContent.includes("'bbiq': {")) {
  // Replace the last }; with the new entry
  detailsContent = detailsContent.replace(/\s*};\s*$/, ",\n" + bbiqDetails + "\n};\n");
  fs.writeFileSync(detailsPath, detailsContent);
  console.log('Added to providerDetails.tsx');
} else {
  console.log('BBIQ already in providerDetails.tsx');
}
