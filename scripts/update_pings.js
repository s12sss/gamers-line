const fs = require('fs');
const path = './src/data/isps.json';
let isps = JSON.parse(fs.readFileSync(path, 'utf8'));

const pings = {
  nuro_hikari_2g: 10,
  nuro_hikari_10g: 7,
  au_hikari_1g: 15,
  au_hikari_10g: 12,
  docomo_hikari_1g: 21,
  docomo_hikari_10g: 16,
  softbank_hikari_1g: 22,
  softbank_hikari_10g: 17,
  biglobe_hikari_1g: 20,
  biglobe_hikari_10g: 16,
  gamewith_hikari_1g: 12,
  gamewith_hikari_10g: 9,
  commufa_hikari_1g: 12,
  commufa_hikari_10g: 8,
  pikara_hikari_1g: 14,
  pikara_hikari_10g: 11,
  megaegg_hikari_1g: 15,
  megaegg_hikari_10g: 12,
  eo_hikari_1g: 13,
  eo_hikari_10g: 10
};

isps.forEach(isp => {
  if (pings[isp.id]) {
    isp.avg_ping_ms = pings[isp.id];
  }
});

fs.writeFileSync(path, JSON.stringify(isps, null, 2));
console.log("Ping values updated.");
