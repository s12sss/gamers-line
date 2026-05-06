const fs = require('fs');
const path = './src/data/isps.json';
let isps = JSON.parse(fs.readFileSync(path, 'utf8'));

const prices = {
  nuro_hikari_2g: 5200,
  nuro_hikari_10g: 6050,
  au_hikari_1g: 5610,
  au_hikari_10g: 6468,
  docomo_hikari_1g: 5720,
  docomo_hikari_10g: 6380,
  softbank_hikari_1g: 5720,
  softbank_hikari_10g: 6380,
  biglobe_hikari_1g: 5478,
  biglobe_hikari_10g: 6270,
  gamewith_hikari_1g: 6160,
  gamewith_hikari_10g: 7370,
  commufa_hikari_1g: 5940,
  commufa_hikari_10g: 6710,
  eo_hikari_1g: 5448,
  eo_hikari_10g: 6530,
  pikara_hikari_1g: 5720,
  pikara_hikari_10g: 7370,
  megaegg_hikari_1g: 4620,
  megaegg_hikari_10g: 6750
};

isps.forEach(isp => {
  if (prices[isp.id]) {
    isp.actual_monthly_fee_jpy = prices[isp.id];
  }
});

fs.writeFileSync(path, JSON.stringify(isps, null, 2));
console.log("Base prices updated.");
