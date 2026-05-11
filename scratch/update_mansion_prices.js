const fs = require('fs');
const path = require('path');

const ispsPath = path.join(__dirname, '../src/data/isps.json');
const isps = require(ispsPath);

const mansionPrices = {
  'hi-ho_with_games_10g': 6160,
  'hi-ho_with_games_1g': 4840,
  'nuro_hikari_10g': 5700,
  'nuro_hikari_2g': 2750,
  'gamewith_hikari_10g': 6050,
  'gamewith_hikari_1g': 4840,
  'au_hikari_10g': 6468,
  'au_hikari_1g': 4180,
  'docomo_hikari_10g': 6380,
  'docomo_hikari_1g': 4400,
  'softbank_hikari_10g': 6380,
  'softbank_hikari_1g': 4180,
  'biglobe_hikari_10g': 6270,
  'biglobe_hikari_1g': 4378,
  'commufa_hikari_10g': 5940,
  'commufa_hikari_1g': 4070,
  'pikara_hikari_10g': 7370,
  'pikara_hikari_1g': 4400,
  'megaegg_hikari_10g': 6750,
  'megaegg_hikari_1g': 3520,
  'eo_hikari_10g': 6530,
  'eo_hikari_1g': 3326,
  'bbiq_hikari_10g': 6380,
  'bbiq_hikari_1g': 4290
};

const updatedIsps = isps.map(isp => {
  return {
    ...isp,
    mansion_monthly_fee_jpy: mansionPrices[isp.id] || isp.actual_monthly_fee_jpy
  };
});

fs.writeFileSync(ispsPath, JSON.stringify(updatedIsps, null, 2));
console.log('isps.json updated successfully.');
